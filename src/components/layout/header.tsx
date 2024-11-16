"use client";
import { useHello } from "@/hooks/use-hello";
import Link from "next/link";
import { Suspense } from "react";

const Header = () => {
	const { data: hello } = useHello();

	return (
		<nav className="bg-white">
			<div className="container flex items-center justify-between  p-5">
				<Link className=" font-bold text-lg" href="/">
					NextHono
				</Link>
				<div className="flex flex-col items-end">
					<Link href={"/api/hello"} target="_blank">
						/api/hello
					</Link>

					<p className="text-nowrap">
						<Suspense fallback={<span>Loading...</span>}>
							<span>{hello.message}</span>
						</Suspense>
					</p>
				</div>
			</div>
		</nav>
	);
};

export default Header;