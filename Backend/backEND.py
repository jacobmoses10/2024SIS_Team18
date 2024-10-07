from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv

#load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

#get the API key from environment variables
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
print(f"Loaded API Key: {GEMINI_API_KEY}")

if GEMINI_API_KEY is None:
    raise ValueError("GEMINI_API_KEY is not set in the .env file or could not be loaded")

#configure the Google Generative AI library
genai.configure(api_key=GEMINI_API_KEY)

#choose the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

#make a request to the Gemini API
prompt = "Write a story about a magic backpack."
response = model.generate_content(prompt)

#print the generated text
print(response.text)

#current idea for setting up the ai with the chatbox:
#we build out the framework for the chatbox
#we make the output and user input appear into the chatbox
#have input get put throught the 'prompt'
