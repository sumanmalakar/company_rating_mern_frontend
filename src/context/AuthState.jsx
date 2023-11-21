import React, { useState } from 'react'
import Context from './AuthContext'

const state = (props) => { 
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState("");
    const [id, setId] = useState("");
    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false)
  return (
   <Context.Provider value={{
    isAuthenticated, setIsAuthenticated,
    isAuthenticatedAdmin, setIsAuthenticatedAdmin,
    user, setUser,
    id, setId
   }}>
   {props.children}
   </Context.Provider>
  )
}

export default state