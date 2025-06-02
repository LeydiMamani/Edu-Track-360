const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/message', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            model: 'mistral',
            prompt: message,
            stream: false
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json({ reply: response.data.response.trim() });
    } catch (error) {
        console.error('Error con Ollama:', error);
        res.status(500).json({ reply: 'Error al procesar tu mensaje con Ollama.' });
    }
});

module.exports = router;
