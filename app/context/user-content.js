import { useContext, createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export function AuthContextProvider () {
  const [firebase_user, loading, error] = useAuthState(auth);

  return (<AuthContext.Provider value={{firebase_user, loading}}></AuthContext.Provider>)

}