import { auth, provider } from './init';
import {
  //normal login/sign up
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  //google login/sign up
  GoogleAuthProvider, signInWithPopup,
  sendPasswordResetEmail, 
}
  from "firebase/auth";

//Normal SignUp and Login Functions

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};



// Google SignUp and Login Functions 
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;

    return user; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}