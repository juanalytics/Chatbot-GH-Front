// src/lib/authConfig.ts
import { PublicClientApplication, Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "b4fa723e-c8be-4ea0-add2-a8ae7ed2b7d4", // Replace with your Azure AD Application (client) ID
    authority: "https://login.microsoftonline.com/577fc1d8-0922-458e-87bf-ec4f455eb600", // Or use "/common" for multi-tenant
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000"

},
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

// Create and export the MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);
