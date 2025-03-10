var express = require('express');
var router = express.Router();
const axios = require('axios'); 
require('dotenv').config();  // Load environment variables

const API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-3B';

const API_URL1 = 'https://api-inference.huggingface.co/models/microsoft/GODEL-v1_1-large-seq2seq'
const API_URL2 = 'https://api-inference.huggingface.co/models/facebook/blenderbot-3B';
const API_URL3 = 'https://api-inference.huggingface.co/models/gpt2-medium';
const API_URL4 =  'https://api-inference.huggingface.co/models/google/gemma-2-2b-it';

const API_URL5 = 'https://api-inference.huggingface.co/models/google/gemma-2-2b-it';


const API_KEY = process.env.HUGGING_FACE_API_KEY;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Demo Application' });
});


// example 1 - code in index.js - start
// POST route to handle the Hugging Face API call
router.post('/generate-prediction', async (req, res) => {
  const { prompt } = req.body;  // Get the prompt from the frontend request

  try {
    // Make the API request to Hugging Face using axios
    const response = await axios.post(API_URL, 
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,  // Ensure your API_KEY is set correctly
          'Content-Type': 'application/json'
        }
      }
    );

    // Get the generated text from the response
    const generatedText = response.data[0]?.generated_text || "No prediction available.";

    // Send the generated text back to the frontend
    res.json({ generatedText });

  } catch (error) {
    console.error('Error generating prediction:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});
// example 1 - code in index.js - end

// example 2 - code in index.js - start
// Route to get answers from the models
router.post('/get-model-answers', async (req, res) => {
  const userQuestion = req.body.question;

  // Check if the question is empty
  if (!userQuestion) {
    return res.status(400).json({ error: 'No question provided' });
  }

  try {
    // Make requests to all 4 models in parallel
    const responses = await Promise.all([
      fetchAnswer(API_URL1, userQuestion),
      fetchAnswer(API_URL2, userQuestion),
      fetchAnswer(API_URL3, userQuestion),
      fetchAnswer(API_URL4, userQuestion)
    ]);

    // Send the answers back to the client
    res.json({
      answer1: responses[0],
      answer2: responses[1],
      answer3: responses[2],
      answer4: responses[3]
    });
  } catch (error) {
    console.error('Error fetching from models:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// Function to fetch answer from the Hugging Face API for a given model using axios
async function fetchAnswer(modelUrl, userQuestion) {
  try {
    const response = await axios.post(modelUrl, {
      inputs: userQuestion
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: {
        max_length: 20,  // Set a max length for the response 
        num_return_sequences: 1,  // Return one generated sequence
      }
    });

    // Assuming the response follows this structure: { 0: { generated_text: 'text here' } }
    if (response.data && response.data[0] && response.data[0].generated_text) {
      return response.data[0].generated_text;
    } else {
      return 'No response from model.';
    }
  } catch (error) {
    console.error('Error fetching from model:', error);
    return 'Error generating answer.';
  }
}
// example 2 - code in index.js - end


// example 3 - code in index.js - start
// POST route to handle the Hugging Face API call for generating a story
router.post('/generate-story', async (req, res) => {
  const { prompt } = req.body;  // Get the prompt from the frontend request

  try {
    // Make the API request to Hugging Face using axios
    const response = await axios.post(API_URL5, 
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,  // Ensure your API_KEY is set correctly
          'Content-Type': 'application/json'
        },
        params: {
          max_length: 50,  // Set a max length for the response (approx 80 words)
          num_return_sequences: 1,  // Return one generated sequence
        }
      }
    );

    // Get the generated text from the response
    const generatedText = response.data[0]?.generated_text || "Sorry, I couldn't generate a story for you.";

    // Send the generated text back to the frontend
    res.json({ generatedText });

  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});
// example 3 - code in index.js - end


module.exports = router;
