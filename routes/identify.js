const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/identify', async (req, res) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: 'Email or phoneNumber is required' });
    }

    try {
        const [existingContacts] = await pool.query(
            `SELECT * FROM Contact WHERE email = ? OR phoneNumber = ?`,
            [email, phoneNumber]
        );

        if (existingContacts.length === 0) {
            const [newContact] = await pool.query(
                `INSERT INTO Contact (email, phoneNumber, linkPrecedence) VALUES (?, ?, 'primary')`,
                [email, phoneNumber]
            );

            return res.json({
                contact: {
                    primaryContactId: newContact.insertId,
                    emails: [email].filter(Boolean),
                    phoneNumbers: [phoneNumber].filter(Boolean),
                    secondaryContactIds: []
                }
            });
        }
        let primaryContact = existingContacts.find(c => c.linkPrecedence === 'primary') || existingContacts[0];
        let emails = new Set(existingContacts.map(c => c.email).filter(Boolean));
        let phoneNumbers = new Set(existingContacts.map(c => c.phoneNumber).filter(Boolean));
        let secondaryContactIds = existingContacts.filter(c => c.linkPrecedence === 'secondary').map(c => c.id);
        if (!emails.has(email) || !phoneNumbers.has(phoneNumber)) {
            const [newSecondary] = await pool.query(
                `INSERT INTO Contact (email, phoneNumber, linkedId, linkPrecedence) VALUES (?, ?, ?, 'secondary')`,
                [email, phoneNumber, primaryContact.id]
            );

            secondaryContactIds.push(newSecondary.insertId);
            if (email) emails.add(email);
            if (phoneNumber) phoneNumbers.add(phoneNumber);
        }
        res.json({
            contact: {
                primaryContactId: primaryContact.id,
                emails: Array.from(emails),
                phoneNumbers: Array.from(phoneNumbers),
                secondaryContactIds
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
