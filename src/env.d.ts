/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly GOOGLE_USER: string;
    readonly GOOGLE_USER_CLIENT_ID: string;
    readonly GOOGLE_USER_CLIENT_SECRET: string;
    readonly GOOGLE_USER_REFRESH_TOKEN: string;
    readonly EMAIL_SENDER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}