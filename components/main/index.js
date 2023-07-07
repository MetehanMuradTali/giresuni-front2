import React from 'react'
import Admin from "./admin.js"
import User from "./user.js"
import { cookies } from 'next/headers';
import { verifyJwtToken } from '../../libs/auth'

async function index({pageNumber}){

  async function fromServer(){
    const cookieList = cookies();

    const {value:token} = cookieList.get("token") ?? {value:null};
    const verifiedToken = await verifyJwtToken(token);
    return verifiedToken;
}
const Auth=await fromServer()
  return (
    <>
    {Auth?.role =="admin" ? <Admin pageNumber={pageNumber}/> : <User pageNumber={pageNumber}/>}
    </>
    )
}

export default index