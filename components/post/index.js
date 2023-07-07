import React from 'react'
import {User} from "./user"
import {Admin} from "./admin"
import { cookies } from 'next/headers'
import { verifyJwtToken } from '../../libs/auth'

const Post = async ({id}) => {
  async function fromServer(){
    const cookieList = cookies();

    const {value:token} = cookieList.get("token") ?? {value:null};
    const verifiedToken = await verifyJwtToken(token);
    return verifiedToken;
}
const Auth=await fromServer()
  const getPost = async (id) => {
      const res = await fetch("https://siir-sitesi-backend.onrender.com/Admin/Post",{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({id:id}),
                    cache:"no-store"
                  })
      const repo = await res.json()
      return <Admin Auth={Auth} post={repo.post}/>
    }
  
  return (
    <>
    {Auth?.role=="admin" ? getPost(id) : <User id={id} Auth={Auth}/>}
  </>
  )
}

export default Post

