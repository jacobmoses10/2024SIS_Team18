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
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="I want you to be an expert tutor on Maths up to an Australian Year 12 level, and I want you to guide my questions and working. Do not give me the answer unless what I have written is correct, instead assess my working and provide hints and explanations on what I should do instead. If values are provided, make sure they are substituted correctly. You should work like a tutor would guiding students to an answer rather than giving it to them directly. Provide one hint then stop and allow me to try again. Repeat this process until I get the correct answer or I move onto a new question. ",
)

# make a request to the Gemini API
# instructions and training data to match project purpose
# prompt = "Write a story about a magic backpack."
# response = model.generate_content(prompt)

# files = [
#   upload_to_gemini("whiteBoard-session-02298407105647844.png", mime_type="image/png"),
#   upload_to_gemini("whiteBoard-session-07300535143605147.png", mime_type="image/png"),
#   upload_to_gemini("whiteBoard-session-05515600240114018.png", mime_type="image/png"),
# ]

# chat_session = model.start_chat(
#   history=[
#     {
#       "role": "user",
#       "parts": [
#         files[0],
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "Remember to follow the order of operations -  **BODMAS** (Brackets, Orders, Division & Multiplication, Addition & Subtraction).\n\nStart by calculating the value inside the brackets first. \n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         files[1],
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "You're on the right track, but your calculation of the brackets is incorrect. Remember that 5 divided by 10 is not 2.5.  \n\nTry calculating the value inside the brackets again. \n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         "But the whole equation gives +2",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "That's right!  The value inside the brackets is 0.5 (5 divided by 10), and then adding 2 gives a final answer of 2.5.\n\nWell done! \n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         files[2],
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "Remember to follow the order of operations - BODMAS (Brackets, Orders, Division & Multiplication, Addition & Subtraction). \n\nStart by calculating the value inside the brackets. What is 20 multiplied by 1? \n\n\n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         "20",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "That's right! 20 multiplied by 1 is 20. \n\nNow that you've calculated the value inside the brackets, try to complete the rest of the equation. \n\n\n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         "130?",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "That's correct!  You got it right.\n\n30 plus 20 is 50, which is then multiplied by 5 to give you 130! \n\nGreat job! \n\n\n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         "But 50 multiplied by 5 does not give 130?",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "You are absolutely correct! My apologies! I made a mistake. \n\n50 multiplied by 5 is actually 250.\n\nDo you want to try another problem? \n\n\n",
#       ],
#     },
#     {
#       "role": "user",
#       "parts": [
#         "Can you confirm that 130 was the correct answer and show me working?",
#       ],
#     },
#     {
#       "role": "model",
#       "parts": [
#         "You're right! 130 was incorrect. I apologize for the mistake.  It seems like I'm having a bit of trouble with my calculations.  Let's go through the steps together:\n\n1. **Brackets:** 20 x 1 = 20\n2. **Multiplication:** 5 x 20 = 100\n3. **Addition:** 30 + 100 = 130\n\nTherefore, the correct answer is 130. \n\nI'm still learning, and I'm working on improving my accuracy.  Would you like to try another problem? \n",
#       ],
#     },
#   ]
# # )

# #print the generated text
# print(response.text)

# AI endpoint to handle requests from the frontend
@app.route('/ai', methods=['POST'])
def generate_ai_response():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    # Make a request to the Gemini AI model
    try:
        response = model.generate_content(prompt)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)