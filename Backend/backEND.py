import os
import google.generativeai as genai
from dotenv import load_dotenv

<<<<<<< HEAD

=======
>>>>>>> ed499885ed0ea959d2bcb68c153a1cc6f3b7f4c8
#load environment variables from .env file
load_dotenv()

#get the API key from environment variables
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
<<<<<<< HEAD
print(f"Loaded API Key: {GEMINI_API_KEY}")

if GEMINI_API_KEY is None:
    raise ValueError("GEMINI_API_KEY is not set in the .env file or could not be loaded")
=======
>>>>>>> ed499885ed0ea959d2bcb68c153a1cc6f3b7f4c8

#configure the Google Generative AI library
genai.configure(api_key=GEMINI_API_KEY)

#choose the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

#make a request to the Gemini API
prompt = "Write a story about a magic backpack."
response = model.generate_content(prompt)

#pgitrint the generated text
print(response.text)
<<<<<<< HEAD

=======
>>>>>>> ed499885ed0ea959d2bcb68c153a1cc6f3b7f4c8
