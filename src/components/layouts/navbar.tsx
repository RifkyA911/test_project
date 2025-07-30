"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
	const { data: session } = useSession();
	const pathname = usePathname();

	if (pathname.includes("/auth/login")) return null;

	return (
		<div className="container flex flex-wrap justify-between items-center mx-auto">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Item One</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink>Link</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
					{session?.user ? (
						<>
							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<div className="text-dark">
										Hi {session.user.name}
										Hi {session.user.username}
									</div>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<div
										className="text-dark"
										onClick={() => signOut()}
									>
										Log Out
									</div>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</>
					) : (
						<NavigationMenuItem>
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<div
									className="text-dark"
									onClick={() => signIn()}
								>
									Login
								</div>
							</NavigationMenuLink>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
