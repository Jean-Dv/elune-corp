import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

const OAuth2Client = new OAuth2(import.meta.env.GOOGLE_USER_CLIENT_ID, import.meta.env.GOOGLE_USER_CLIENT_SECRET, "https://developers.google.com/oauthplayground")
OAuth2Client.setCredentials({ refresh_token: import.meta.env.GOOGLE_USER_REFRESH_TOKEN })

const res = (
    body: string,
    { status, statusText, headers }: { status?: number; statusText?: string; headers?: Headers }
) => new Response(body, { status, statusText, headers });

export const POST: APIRoute = async ({ params, request }) => {
    const { name, email, message } = await request.json()
    if (!name) {
        return res(JSON.stringify({ message: "Name is required" }), { status: 400, statusText: "Bad Request" })
    }
    if (!email) {
        return res(JSON.stringify({ message: "Email is required" }), { status: 400, statusText: "Bad Request" })
    }
    const accessToken = (await OAuth2Client.getAccessToken()).token
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: import.meta.env.GOOGLE_USER,
                clientId: import.meta.env.GOOGLE_USER_CLIENT_ID,
                clientSecret: import.meta.env.GOOGLE_USER_CLIENT_SECRET,
                refreshToken: import.meta.env.GOOGLE_USER_REFRESH_TOKEN,
                accessToken: accessToken?.toString()
            }
        })
        await transporter.sendMail(
            {
                from: `Elune form contact <${import.meta.env.EMAIL_SENDER}>`,
                to: [
                    "jean.valencia01@proton.me",
                    "elunecorporation@gmail.com"
                ],
                subject: "Nuevo mensaje de contactanos",
                html: `<h1>Nombre:${name}</h1><p>Email:${email}</p><p>Mensaje:${message}</p>`
            }
        )
        return res(JSON.stringify({ message: "Message send!" }), { status: 200, statusText: "OK" })
    } catch (error) {
        console.log(error)
        return res(JSON.stringify({ message: "Error sending message" }), { status: 500, statusText: "Internal Server Error" })
    }


}