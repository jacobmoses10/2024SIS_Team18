![INKWISE](https://cdn.discordapp.com/attachments/1294244090292207617/1294244447688720427/inkwise_logo2.png?ex=670eebd2&is=670d9a52&hm=a966e45af2ccf871e70f510a3f33dc1891a3e077395f1a1cf4ebf53ee7e7c4b3&)

Try it out here → [inkwise.vercel.app](https://inkwise.vercel.app/)

---
Inkwise is an AI-powered whiteboard designed for students to use while they are studying. The key features include:

- A multi-device cloud-based whiteboard experience.
- An AI chatbot available to assist students and provide tips as they work.
- A wide variety of tools and features to allow students to be creative.

The goal is to provide students with assistance rather than answers, like a tutor would. This allows the user to learn and understand what they are studying.
 
Built for UTS Software Innovation Studio Spring 2024.

## Environment Setup
Create a `.env` file in the Frontend folder and add the following variables.
```
REACT_APP_FIREBASE_KEY=''
REACT_APP_FIREBASE_DOMAIN=''
REACT_APP_FIREBASE_PROJECT_ID=''
REACT_APP_FIREBASE_PROJECT_BUCKET=''
REACT_APP_FIREBASE_SENDER_ID=''
REACT_APP_FIREBASE_APP_ID=''
REACT_APP_FIREBASE_MEASUREMENT_ID=''
REACT_APP_GEMINI_KEY=''
```

## Run Locally
Running the frontend:
```
cd Frontend
npm i
npm start
```
