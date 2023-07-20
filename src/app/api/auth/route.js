import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async req => {
    const body = await req.json();

    console.log('envLocal:', process.env.jwt_secret)

    const secret = new TextEncoder().encode(process.env.jwt_secret);
    const alg = 'HS256';

    // create jwt
    const token = await new SignJWT(body)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('90d')
        .sign(secret)

    console.log('route:', token)

    // token set in cookie 
    cookies().set({
        name: 'jwt-token',
        value: `Bearer ${token}`,
        secure: true,
        httpOnly: true
    })

    return NextResponse.json({message: 'Token has been Created'})
}