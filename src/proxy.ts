import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest){
const protectedPage=['/cart','/wishList']
const authPage=['/Login','/Register']
//cart, wishlist
//getpath
const pathName=req.nextUrl.pathname
//gettoken
const myToken=await getToken({
    req:req,
    secret:process.env.NEXTAUTH_SECRET,
    secureCookie:process.env.NODE_ENV  === 'production'


})

const accssToken=myToken?.token

if(!accssToken &&protectedPage.some((path)=>pathName.startsWith(path))){
return NextResponse.redirect(new URL('/Login',req.nextUrl))
}
// //if (accssToken &&authPage.some((path)=>pathName.startsWith(path))){
// return NextResponse.redirect(new URL('/',req.nextUrl))
// }
//return NextResponse.next()
}


export const config={
    matcher:[
        '/cart/:path*'//هيجيلك متغير//catch all segments
        ,'/wishList','/Login','/Register']
}