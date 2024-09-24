import { auth } from './init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};
