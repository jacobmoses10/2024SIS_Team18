import os
import google.generativeai as genai
from dotenv import load_dotenv
from PIL import Image
import io

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
print(f"Loaded API Key: {GEMINI_API_KEY}")

if GEMINI_API_KEY is None:
    raise ValueError("GEMINI_API_KEY is not set in the .env file or could not be loaded")

# Configure the Google Generative AI library
genai.configure(api_key=GEMINI_API_KEY)

# Choose the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

# Function to send text prompt
def generate_story(prompt):
    response = model.generate_content(prompt)
    print(response.text)


def generate_hint(prompt, imgpath, displayname):
    sample_file = genai.upload_file(path=imgpath,
                                display_name=displayname)
    print(f"Uploaded file '{sample_file.display_name}' as: {sample_file.uri}")
    file = genai.get_file(name=sample_file.name)
    response = model.generate_content([file, prompt])
    print (response.text)


# Example usage for text generation
#prompt = "Write a story about a magic backpack."
#generate_story(prompt)

generate_hint ("give me a hint to solve this", "Backend\\1.png", "simple_test")



