// next-auth.d.ts
import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    idToken?: string;
    apiToken?: string;
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      googleId?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    apiToken?: string;
    googleId?: string;
    
  }
}
