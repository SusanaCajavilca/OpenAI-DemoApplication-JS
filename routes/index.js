var express = require('express');
var router = express.Router();
//const axios = require('axios'); - discarded
const { HfInference } = require('@huggingface/inference'); 
require('dotenv').config();  // Load environment variables

const API_KEY = process.env.HUGGING_FACE_API_KEY;

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const MODEL_URL = 'facebook/blenderbot-3B';

const MODEL_URL1 = 'microsoft/GODEL-v1_1-large-seq2seq';
const MODEL_URL2 = 'facebook/blenderbot-3B';
const MODEL_URL3 = 'gpt2-medium';
const MODEL_URL4 = 'google/gemma-2-2b-it';

const MODEL_URL5 = 'google/gemma-2-2b-it';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Demo Application' });
});


// example 1 - code in index.js - start
// POST route to handle the Hugging Face API call
router.post('/generate-prediction', async (req, res) => {
  const { prompt } = req.body;  // Get the prompt from the frontend request

  try {
    // Make the API request using HfInference
    const generatedText = await hf.textGeneration({
      model: MODEL_URL,   // Model name or path
      inputs: prompt,     // The user input
      parameters: {       // Optional parameters for tuning
        max_length: 50,   // Adjust length of the generated text
      },
    });

    // Send the generated text back to the frontend
    res.json({ generatedText: generatedText.generated_text });

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
      fetchAnswer(MODEL_URL1, userQuestion),
      fetchAnswer(MODEL_URL2, userQuestion),
      fetchAnswer(MODEL_URL3, userQuestion),
      fetchAnswer(MODEL_URL4, userQuestion)
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
    const response = await hf.textGeneration({
      model: modelUrl,      // Use the model URL variable
      inputs: userQuestion, // The user's question
      parameters: {          
        max_length: 50,      // Set a max length for the response 
        num_return_sequences: 1, // Return one generated sequence
        repetition_penalty: 1.2,  
      }
    });

    return response.generated_text || 'No response from model.';
  } catch (error) {
    console.error('Error fetching from model:', error);
    return 'Error generating answer.';
  }
}
// example 2 - code in index.js - end


// example 3 - code in index.js - start
// POST route to handle the Hugging Face API call for generating a story
router.post('/generate-story', async (req, res) => {
  
  const { prompt } = req.body; // Get the prompt from the frontend request

  try {
    // Make the API request using Hugging Face Inference API
    const response = await hf.textGeneration({
      model: MODEL_URL5,
      inputs: prompt,
      parameters: {
        max_length: 100, // Set a max length for the response
        num_return_sequences: 1,
        temperature: 0.8, // Controls randomness
        top_p: 0.9 // Nucleus sampling
      }
    });

    // Get the generated text from the response
    const generatedText = response.generated_text || "Sorry, I couldn't generate a story for you.";

    // Send the generated text back to the frontend
    res.json({ generatedText });

  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }

});
// example 3 - code in index.js - end


module.exports = router;
