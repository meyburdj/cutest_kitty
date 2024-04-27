import { NextRequest, NextResponse } from 'next/server';

interface CatRequestBody {
    email: string;
    password: string;
}


export async function POST(request: NextRequest) {
    try {
        const body: CatRequestBody = await request.json();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        const backendRes = await fetch(`${process.env.BACKEND_API_URL}/cats`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (backendRes.ok) {
            const data = await backendRes.json();
            return new NextResponse(JSON.stringify(data), { status: 200 });
        } else {
            const errorData = await backendRes.text();
            return new NextResponse(errorData, { status: backendRes.status });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
