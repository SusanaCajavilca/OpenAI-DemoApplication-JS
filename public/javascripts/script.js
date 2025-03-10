//********************************* */ section 2 - 1st example
const predictionButton = document.getElementById('predictionButton');
const predictionText = document.getElementById('predictionText');

// Set up an event listener for when the button is clicked
predictionButton.addEventListener('click', async () => {
  try {
    // Show loading message before request
    predictionText.innerText = "Generating your prediction...";

    // Send request to the server to get the prediction
    const response = await fetch('/generate-prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: 'What my future behold is' })  // Prompt to get a personal prediction
    });

    const data = await response.json();

    // Update the prediction text with the response from the server
    predictionText.innerText = data.generatedText;
  } catch (error) {
    console.error('Error generating prediction:', error);
    predictionText.innerText = "Sorry, something went wrong. Please try again.";
  }
});
//********************************* */ section 2 - 1st example

//********************************* */ section 3 - 2nd example
const getAnswersButton = document.getElementById('getAnswersButton');
const answer1 = document.getElementById('answer1').querySelector('.answer-text');
const answer2 = document.getElementById('answer2').querySelector('.answer-text');
const answer3 = document.getElementById('answer3').querySelector('.answer-text');
const answer4 = document.getElementById('answer4').querySelector('.answer-text');

// Set up an event listener for when the "Get answers" button is clicked
getAnswersButton.addEventListener('click', async () => {
  // Get the user's question
  const userQuestion = document.getElementById('userQuestion').value;

  // Check if the input is empty
  if (!userQuestion.trim()) {
    alert('Please enter a question!');
    return;
  }

  // Show loading message for all answers
  answer1.innerText = "Generating answer...";
  answer2.innerText = "Generating answer...";
  answer3.innerText = "Generating answer...";
  answer4.innerText = "Generating answer...";

  try {
    // Call the server route that will handle fetching answers
    const response = await fetch('/get-model-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: userQuestion })
    });

    const data = await response.json();

    // Update the answers with the response from each model
    answer1.innerText = data.answer1 || 'No response from Model 1.';
    answer2.innerText = data.answer2 || 'No response from Model 2.';
    answer3.innerText = data.answer3 || 'No response from Model 3.';
    answer4.innerText = data.answer4 || 'No response from Model 4.';

  } catch (error) {
    console.error('Error generating answers:', error);
    answer1.innerText = "Sorry, something went wrong. Please try again.";
    answer2.innerText = "Sorry, something went wrong. Please try again.";
    answer3.innerText = "Sorry, something went wrong. Please try again.";
    answer4.innerText = "Sorry, something went wrong. Please try again.";
  }
});
//********************************* */ section 3 - 2nd example

//********************************* */ section 4 - 3rd example
const generateStoryBtn = document.getElementById('generateStoryBtn');
const generatedStory = document.getElementById('generatedStory');
const storyPrompt = document.getElementById('storyPrompt');

// Set up an event listener for when the button is clicked
generateStoryBtn.addEventListener('click', async () => {
  const promptText = storyPrompt.value.trim();

  // Check if the prompt is not empty
  if (!promptText) {
    generatedStory.innerHTML = "<p>Please enter a story prompt to generate a story.</p>";
    return;
  }

  try {
    // Show a loading message before making the request
    generatedStory.innerHTML = "<p>Generating your story...</p>";

    // Send request to the server to generate the story
    const response = await fetch('/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: promptText })  // Sending the prompt to the server
    });

    const data = await response.json();

    // Check if the response contains the generated story
    if (data.generatedText) {
      generatedStory.innerHTML = `<p>${data.generatedText}</p>`;
    } else {
      generatedStory.innerHTML = "<p>Sorry, something went wrong. Please try again.</p>";
    }
  } catch (error) {
    console.error('Error generating story:', error);
    generatedStory.innerHTML = "<p>Sorry, something went wrong. Please try again.</p>";
  }
});
