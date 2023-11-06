const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const reload = require('reload');
const axios = require('axios'); // Add this line to use Axios for HTTP requests

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
    const formData = req.body;

    try {
        // Make a POST request to your Flask backend's /submit endpoint
        const response = await axios.post('http://127.0.0.1:5000/api/submit', formData);

        // Handle the response as needed
        if (response.status === 200) {
            console.log('Form submission successful on Flask backend');
        }

        // Respond to the client
        res.sendFile(__dirname + '/public/success.html')
    } catch (error) {
        console.error('Error submitting form to Flask backend:', error);
        res.status(500).json({ error: 'Failed to submit the form' });
    }

    
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server Has Started On Port: ${PORT}`);
});

reload(app);