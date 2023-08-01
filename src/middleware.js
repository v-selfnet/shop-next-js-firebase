import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export const middleware = async req => {
    const {pathname} = req.nextUrl;
    const isPath = path => pathname.startsWith(path);
    try {
        let cookie = req.cookies.get('jwt-token')?.value;

        if (!cookie || !cookie.startsWith('Bearer')) {
            throw new Error('Invalide Token')
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(cookie.split('Bearer ')[1], secret)
        if(isPath('/login') || isPath('/signup')){
            return NextResponse.redirect(new('/', req.url));
        }
        return NextResponse.next();
        
    } catch (error) {
        if(isPath('/login') || isPath('/signup')){
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL(`/login?redirectUrl=${pathname}`, req.url));
    }
}

export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
}