import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../firebase';
const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export  function AuthContextProvider({ children }) {
    const [curruntUser,setCurruntUser]=useState();
    const [loading,setLoading]=useState(true);

    function signup(email,password){
      return  createUserWithEmailAndPassword(auth,email,password);
    }
    function login(email,password)
    {
      return  signInWithEmailAndPassword(auth,email,password);
    }

    function logout(){
       return signOut(auth);
    }

    function resetPassword(email){
     return sendPasswordResetEmail(auth,email);
    }

    function updateEmailFun(email)
    {
        return updateEmail(curruntUser,email);
    }
    function updatePasswordFun(password){
      return updatePassword(curruntUser,password)
    }


  useEffect(()=>{
   const unsuscribe= onAuthStateChanged(auth,(user)=>{
       setCurruntUser(user);
       setLoading(false);
    })
    return unsuscribe;

    
  },[])



    const value={
        curruntUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmailFun,
        updatePasswordFun
    }



    return (
        <AuthContext.Provider value={value}>
            { !loading  && children}
        </AuthContext.Provider>
    );
}
