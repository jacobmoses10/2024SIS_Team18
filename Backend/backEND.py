import os
import google.generativeai as genai
from dotenv import load_dotenv

#load environment variables from .env file
load_dotenv()

#get the API key from environment variables
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

#configure the Google Generative AI library
genai.configure(api_key=GEMINI_API_KEY)

#choose the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

#make a request to the Gemini API
prompt = "Write a story about a magic backpack."
response = model.generate_content(prompt)

#pgitrint the generated text
print(response.text)
