import React from 'react'
import { useAuth } from '../../hooks/auth'
import Admin from "./admin.js"
import User from "./user.js"

async function index({pageNumber}){
  
  const Auth=await useAuth.fromServer()
  return (
    <>
    {Auth?.role =="admin" ? <Admin pageNumber={pageNumber}/> : <User pageNumber={pageNumber}/>}
    </>
    )
}

export default index