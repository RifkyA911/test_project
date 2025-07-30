import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				if (!email || !password) {
					throw new Error("Email / password must be filled");
				}
				if (email === "admin@example.com" && password === "123456") {
					return {
						id: "1",
						name: "Admin_11",
						username: "admin",
						email,
					};
				}

				throw new Error("⛔ Invalid email or password");
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.username) {
				session.user.username = token.username;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
