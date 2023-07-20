import { NextResponse } from "next/server";

export const POST = async req => {
    const res = new NextResponse(
        JSON.stringify({
            message: 'Logout Successfully!'
        })
    );

    res.cookies.set('jwt-token', '', {
        expires: new Date(Date.now(),)
    });
    return res;
}