"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

export default function LoginForm() {
	const router = useRouter();
	const { setAllUserFields } = useUserStore();
	const [form, setForm] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email: form.email,
				password: form.password,
			});
			console.log("res", res);

			if (res?.ok) {
				// setAllUserFields({
				// 	name: res?.name ?? '',
				// 	username: res?.username ?? '',
				// 	email: res?.email ?? ''r
				// })
				router.push("/");
			} else {
				setErrorMsg(
					res?.error ?? "Terjadi kesalahan yang tidak diketahui."
				);
			}
		} catch (error: any) {
			setErrorMsg(error.message ?? "Terjadi kesalahan tak terduga.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<Card className="w-[380px]">
				<CardHeader>
					<CardTitle className="text-center">Login</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Input
						type="email"
						name="email"
						placeholder="Email"
						value={form.email}
						onChange={handleChange}
					/>
					<Input
						type="password"
						name="password"
						placeholder="Password"
						value={form.password}
						onChange={handleChange}
					/>
					{errorMsg && (
						<p className="text-red-500 text-sm text-center">
							{errorMsg}
						</p>
					)}
					<Button
						className="w-full"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? "Loading..." : "Login"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
