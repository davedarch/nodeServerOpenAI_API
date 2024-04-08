const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openAIKey = process.env.OPENAI_API_KEY; // Secure your API key

app.post('/chat-message', async (req, res) => {
  try {
    // Constructing the messages array with the user's prompt
    const messages = [{ role: "user", content: req.body.prompt }];

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("Message:", response.data.choices[0].message.content);
    console.log("Full Response:", JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).send('An error occurred while fetching the response from OpenAI.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
