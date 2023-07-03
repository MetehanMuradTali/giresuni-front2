import { verifyJwtToken } from "../../libs/auth";


const fromServer = async () =>{
    const cookies = (await import('next/headers')).cookies
    //const cookies = require("next/headers").cookies;
    const cookieList = cookies();

    const {value:token} = cookieList.get("token") ?? {value:null};
    const verifiedToken = await verifyJwtToken(token);
    return verifiedToken;
};

export function useAuth(){}

useAuth.fromServer=fromServer;