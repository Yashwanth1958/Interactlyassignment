const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL Database setup
/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'contacts'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Create contacts table
db.query(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        mobile_number VARCHAR(255)
    )
`); */
app.get("/",(req,res)=>{res.send("hi")});
app.post('/createContact', (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (data_store === 'CRM') {
        const apiKey = 'S0K9gUiswrTG-C4C_a_Nww';
        axios.post('soluion-org.myfreshworks.com/crm/sales', {
            first_name,
            last_name,
            email,
            mobile_number
        }, {
            headers: { Authorization: `Token token=${apiKey}` }
        }).then(response => res.send(response.data))
          .catch(err => res.status(500).send(err));
    } else if (data_store === 'DATABASE') {
        const query = 'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)';
        db.query(query, [first_name, last_name, email, mobile_number], (err, result) => {
            if (err) throw err;
            res.send({ id: result.insertId });
        });
    } else {
        res.status(400).send('Invalid data_store value');
    }
});
app.post('/getContact', (req, res) => {
    const { contact_id, data_store } = req.body;

    if (data_store === 'CRM') {
        const apiKey = 'S0K9gUiswrTG-C4C_a_Nww';
    
        axios.get(`soluion-org.myfreshworks.com/crm/sales/${contact_id}`, {
            headers: { Authorization: `Token token=${apiKey}` }
        }).then(response => res.send(response.data))
          .catch(err => res.status(500).send(err));
    } else if (data_store === 'DATABASE') {
        const query = 'SELECT * FROM contacts WHERE id = ?';
        db.query(query, [contact_id], (err, result) => {
            if (err) throw err;
            res.send(result[0]);
        });
    } else {
        res.status(400).send('Invalid data_store value');
    }
});
app.post('/updateContact', (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    if (data_store === 'CRM') {
        const apiKey = 'S0K9gUiswrTG-C4C_a_Nww';
        
        axios.put(`soluion-org.myfreshworks.com/crm/sales/${contact_id}`, {
            email: new_email,
            mobile_number: new_mobile_number
        }, {
            headers: { Authorization: `Token token=${apiKey}` }
        }).then(response => res.send(response.data))
          .catch(err => res.status(500).send(err));
    } else if (data_store === 'DATABASE') {
        const query = 'UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?';
        db.query(query, [new_email, new_mobile_number, contact_id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(400).send('Invalid data_store value');
    }
});
app.post('/deleteContact', (req, res) => {
    const { contact_id, data_store } = req.body;

    if (data_store === 'CRM') {
        const apiKey = 'S0K9gUiswrTG-C4C_a_Nww';
    
        axios.delete(`soluion-org.myfreshworks.com/crm/sales/${contact_id}`, {
            headers: { Authorization: `Token token=${apiKey}` }
        }).then(response => res.send(response.data))
          .catch(err => res.status(500).send(err));
    } else if (data_store === 'DATABASE') {
        const query = 'DELETE FROM contacts WHERE id = ?';
        db.query(query, [contact_id], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(400).send('Invalid data_store value');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
