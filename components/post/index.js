import React from 'react'
import { useAuth } from '../../hooks/auth'
import {User} from "./user"
import {Admin} from "./admin"


const Post = async ({id}) => {

  const Auth=await useAuth.fromServer() 
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