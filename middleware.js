import { verifyJwtToken } from "./libs/auth";
import { NextResponse } from "next/server";

const AUTH_PAGES = ['/Login','/Register']
const ADMIN_PAGES = ['/Admin/Create']

const isAuthPages = (url) => AUTH_PAGES.some(page => page.startsWith(url))
const isAdminPages = (url) => ADMIN_PAGES.some(page => page.startsWith(url))

export async function middleware(request){
    const {url, nextUrl,cookies} = request;
    const {value:token} = cookies.get('token') ?? {value: null}
    const is_verified= await verifyJwtToken(token)
    const hasVerifiedToken = token && is_verified;
    const isAuthPageRequested = isAuthPages(nextUrl.pathname);
    const isAdminPageRequested = isAdminPages(nextUrl.pathname);

    if(isAuthPageRequested){
        if(!hasVerifiedToken){
            const response= NextResponse.next();
            return response;
        }
        const response = NextResponse.redirect(new URL('/',url));
        return response;
    }   
    if(isAdminPageRequested){
        if(!hasVerifiedToken){
            const response = NextResponse.redirect(new URL('/Login',url));
            return response;
        }
        else if(hasVerifiedToken.role!="admin"){
            const response = NextResponse.redirect(new URL('/Login',url));
            return response;
        }
        const response= NextResponse.next();
        return response;
    } 
    if(!hasVerifiedToken){
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set("next",nextUrl.pathname)
        return NextResponse.redirect(new URL(`/Login?${searchParams}`,url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/Login','/Register','/Admin/Create']
}