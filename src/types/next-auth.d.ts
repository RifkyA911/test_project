// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			name?: string;
			email?: string;
			username?: string;
		};
	}

	interface User {
		id: string;
		name?: string;
		email?: string;
		username?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		name?: string;
		email?: string;
		username?: string;
	}
}

export default NextAuth;
export * from "next-auth/client";
