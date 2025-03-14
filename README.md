# Repo Name OpenAI-DemoApplication-JS


## Important  Information PLEASE READ!!

Due to limitations of using a free tier in huggingFace.com, **it might be necessary to click at least 4 - 6 times** in order to get the AI generated content in each example. Sometimes the API key and the model selected will not load at the first time of executing.

## Link Live Site: 


## Preliminary Steps

1- Create an account in https://huggingface.co/

2- Click on the image of account, go to Access Tokens

3- Create an access token, copy and store the api key generated

4- Conceive the idea to display (3 examples in one page)

5- Select the models of text generation : review the docs related


## Models Used

Review docs in   https://huggingface.co/docs/api-inference/index

Review Text Generation in  https://huggingface.co/docs/api-inference/tasks/text-generation

Models used

1- facebook/blenderbot-3B              :   https://huggingface.co/facebook/blenderbot-3B

2- microsoft/GODEL-v1_1-large-seq2seq  :   https://huggingface.co/microsoft/GODEL-v1_1-large-seq2seq

3- gpt2-medium                         :   https://huggingface.co/openai-community/gpt2-medium

4- google/gemma-2-2b-it                :   https://huggingface.co/google/gemma-2-2b-it


## Project Steps

(npm start   - to check on http://localhost:3000/ during the coding)

1- Create the folder to store the project. Then run in Terminal the following commands:

2- npx express-generator --view=hbs

3- npm install

4- npm audit fix --force

5- npm install axios

6- npm install dotenv

7- Create a .env file and store the api key from hugging face

8- require('dotenv').config(); add this line on the top of app.js

9- Create the skeleton of the html code in index.hbs

10- Link the script.js to the index.hbs

11- SubSteps for each Example 1 / 2 / 3

 a)- Update the html code in index.hbs for the section

 b)- Add the code inside script.js inside javascripts

 c)- Add the code for example  in routes > index.js

 d)- test it

 12- Polish the styling with bootstrap and css

 13- Update the public repo content

 14- Host page on a live site using Render
