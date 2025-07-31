"use client";
import { Badge } from "@/components/ui/badge";
import { TanstackTable } from "@/components/home/table";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export interface PokemonProps {
	name: string;
	url: string;
}
export interface PokemonAbilitiesProps {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
}

export default function Home() {
	const [pokemons, setPokemons] = useState<null | PokemonProps[]>(null);
	const [abilities, setAbilities] = useState<PokemonAbilitiesProps[]>([]);

	useEffect(() => {
		// const req =
		axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
			console.log("res", res.data.results);
			setPokemons(res.data.results);
		});
		// const res = req.data.data.results;
		// console.log("resres", res);
		// const get_columns = useMemo<ColumnDef<PokemonProps, any>[]>(
		// 	() => [
		// 		{
		// 			accessorKey: "name",
		// 			cell: (info) => info.getValue(),
		// 		},
		// 		{
		// 			accessorFn: (row) => row.url,
		// 			id: "url",
		// 			cell: (info) => info.getValue(),
		// 			header: () => <span>URL</span>,
		// 		},
		// 	],
		// 	[]
		// );
		// setColumns(get_columns);
	}, []);

	const fetchDetail = (name: string) => {
		axios.get("https://pokeapi.co/api/v2/pokemon/" + name).then((res) => {
			console.log("res", res.data.abilities);
			setAbilities(res.data.abilities);
		});
	};

	// const columns = pokemons.map((data) => {});

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				{!pokemons ? (
					<>Loading</>
				) : (
					<>
						<Table>
							<TableCaption>
								A list of your recent invoices.
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">
										No
									</TableHead>
									<TableHead>Nama</TableHead>
									<TableHead>URL</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{pokemons.map((pokemon, i) => (
									<TableRow key={pokemon.name}>
										<TableCell className="font-medium">
											{i}
										</TableCell>
										<TableCell>{pokemon.name}</TableCell>
										<TableCell>{pokemon.url}</TableCell>
										<TableCell>
											<Dialog>
												<DialogTrigger
													onClick={() =>
														fetchDetail(
															pokemon.name
														)
													}
												>
													Detail
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>
															{pokemon.name}
														</DialogTitle>
														<DialogDescription></DialogDescription>
														<div className="flex gap-2">
															{abilities.length >
																0 &&
																abilities.map(
																	(
																		ability
																	) => (
																		<Badge
																			key={
																				ability
																					.ability
																					.name
																			}
																		>
																			{
																				ability
																					.ability
																					.name
																			}
																		</Badge>
																	)
																)}
														</div>
													</DialogHeader>
												</DialogContent>
											</Dialog>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{/* {columns.length > 0 && (
							<TanstackTable columns={columns} />
						)} */}
					</>
				)}
			</main>
		</div>
	);
}
