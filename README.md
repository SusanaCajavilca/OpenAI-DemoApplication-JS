# Team Hugging Face 😃

# Demo Application 📖 📖

## Important  Information PLEASE READ!!

Due to limitations of using a free tier in huggingFace.com, **it might be necessary to wait a minute or so** in order to get the AI generated content. 

## Members

1. Susana Cajavilca Turco
2. Emilio Sebastian Conde Ludena
3. Avneet Kaur
4. Toshit Narwal

## Link Live Site:   https://openai-huggingface-demoapplication.onrender.com


## Preliminary Steps

1- Create an account in https://huggingface.co/

2- Click on the image of your account, go to Access Tokens

3- Create an Access token, copy and store the api key generated

4- Select the models of text generation : review the docs related to them


## Models Used

Review docs in   https://huggingface.co/docs/api-inference/index

Review Text Generation in  https://huggingface.co/docs/api-inference/tasks/text-generation

Models used

1- facebook/blenderbot-3B              :   https://huggingface.co/facebook/blenderbot-3B

2- microsoft/GODEL-v1_1-large-seq2seq  :   https://huggingface.co/microsoft/GODEL-v1_1-large-seq2seq

3- gpt2-medium                         :   https://huggingface.co/openai-community/gpt2-medium

4- distilgpt2                          :   https://huggingface.co/distilbert/distilgpt2

*the model google/gemma-2-2b-it was replaced today April 17th by distilgpt2 because google/gemma is asking data/access permission for its use*


## Project Steps

(npm start   - to check on http://localhost:3000/ during the coding)

1- Create the folder to store the project. Then run in Terminal the following commands:

2- npx express-generator --view=hbs

3- npm install

4- npm audit fix --force

5- npm install @huggingface/inference

6- npm install dotenv

7- Create a .env file and store the api key from hugging face

8- require('dotenv').config();  -> add this line on the top of app.js

9- Create the skeleton of the html code in index.hbs

10- Link the script.js to the index.hbs

11- SubSteps for each Example 1 / 2 / 3

 a)- Update the html code in index.hbs  for the section

 b)- Add the code inside script.js inside javascripts

 c)- Add the code for example  in routes > index.js

 d)- test it

 12- Complete html code in layout.hbs and polish the styling with bootstrap and css

 13- Update the public repo content

 14- Host page on a live site using Render
