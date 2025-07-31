"use client";
import { useEffect, useState } from "react";
import { products, ProductsProps } from "../data/products";
import { FaStar } from "react-icons/fa";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiThumbsUp } from "react-icons/ti";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductSkeleton } from "@/components/products/Skeleton";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import uuid4 from "uuid4";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteProduct } from "@/components/products/delete";
import { ModalProduct } from "@/components/products/modal";

interface ProductProps {}

const ProductPage: React.FC<ProductProps> = () => {
	const [lists, setLists] = useState<ProductsProps[] | null>(null);
	const [listsBuffer, setListsBuffer] = useState<ProductsProps[] | null>(
		null
	);
	const [inputValue, setInputValue] = useState("");
	const [debouncedInputValue, setDebouncedInputValue] = useState("");
	const [sortType, setSortType] = useState("asc");
	const [sortBy, setSortBy] = useState("harga");
	const [contextSubmit, setContextSubmit] = useState<"add" | "edit">("add");

	useEffect(() => {
		setLists(products);
		setListsBuffer(products);
	}, []);

	// ------------------------------- search debounce -------------------------------
	const handleInputOnChange = (e: any) => {
		setInputValue(e.target.value ?? "??");
	};

	useEffect(() => {
		const delayInputTimeoutId = setTimeout(() => {
			setDebouncedInputValue(inputValue);
		}, 300);
		return () => clearTimeout(delayInputTimeoutId);
	}, [inputValue, 500]);

	useEffect(() => {
		if (lists) {
			setLists(
				lists.filter((list) => {
					return list.nama
						.toLowerCase()
						.includes(debouncedInputValue.toLowerCase());
				})
			);
		}
		if (debouncedInputValue == "" && listsBuffer) setLists(listsBuffer);
	}, [debouncedInputValue]);

	// ------------------------------- sort -------------------------------
	useEffect(() => {
		if (lists) {
			setLists((list) => {
				const dataToSort = [...(list as any)];
				dataToSort.sort((a, b) => {
					if (sortBy == "harga") {
						return sortType == "asc"
							? Number(a.harga) - Number(b.harga)
							: Number(b.harga) - Number(a.harga);
					} else {
						return sortType == "asc"
							? Number(a.stok) - Number(b.stok)
							: Number(b.stok) - Number(a.stok);
					}
				});
				// console.log("dataToSort", dataToSort);
				return dataToSort;
			});
		}
	}, [sortBy, sortType]);

	// ------------------------------- form -------------------------------
	const onEditProduct = (product: ProductsProps) => {
		setContextSubmit("edit");
		console.log("clicked edit");
		form.setValue("id", product.id);
		form.setValue("nama", product.nama);
		form.setValue("harga", String(product.harga));
		form.setValue("stok", String(product.stok));
	};

	const onDeleteProduct = (id: string) => {
		if (!lists) return;
		setLists(lists.filter((list) => !list.id.includes(id)));
	};

	// ------------------------------- form -------------------------------

	const FormSchema = z.object({
		id: z.string(),
		nama: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		harga: z.string().min(3).max(16),
		stok: z.string(),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			id: uuid4(),
			nama: "",
			harga: "1000",
			stok: "10",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		const getProducts = [...(lists ?? [])];
		let checkDuplicateValue = false;
		if (contextSubmit == "add" && getProducts.length > 0 && data.nama) {
			getProducts.map((list) => {
				if (
					list.nama.toLocaleLowerCase() ==
					data.nama.toLocaleLowerCase()
				) {
					console.log("⚠️ same");
					return (checkDuplicateValue = true);
				}
			});
		}

		if (contextSubmit == "add" && checkDuplicateValue) {
			console.log("⛔ duplicated name value");
			return;
		}

		if (contextSubmit == "add") {
			const newData: ProductProps = {
				id: uuid4(),
				nama: data.nama,
				harga: data.harga,
				stok: data.stok,
				diskon: 110.0,
				star: 5,
				pict: "/images/1.jpg",
				category: "Homecraft",
				description:
					"lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et",
			};
			setLists((list: any) => [...list, newData]);
			console.log("✅ sent");
		} else if (contextSubmit == "edit") {
			console.log("data.id", data.id);
			const tempProducts = [...(lists as any)];
			const indexProduct = tempProducts.findIndex((list) => {
				console.log("list.id", list.id);
				return list.id === data.id;
			});
			console.log("indexProduct", indexProduct);
			// if (indexProduct) {
			tempProducts[indexProduct]["nama"] = data.nama;
			tempProducts[indexProduct]["harga"] = parseFloat(data.harga);
			tempProducts[indexProduct]["stok"] = parseFloat(data.stok);
			console.log("tempProducts", tempProducts);
			setLists(tempProducts);
			console.log("✅ sent");
			// }
			// setLists((data: any) => {
			//     data.map((item)=>{
			//         return item.id===data.id ?
			//     })
			// });
		}
	}

	return (
		<main className="p-4 flex flex-col gap-4 w-full">
			<div className="flex flex-col gap-4">
				{/* {debouncedInputValue} */}
				<div className="flex gap-4">
					<Input
						type="text"
						placeholder="Cari"
						onChange={handleInputOnChange}
					/>
					<div className="flex gap-4 justify-end w-full">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">Sortir</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>
									Panel Position
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuRadioGroup
									value={sortType}
									onValueChange={setSortType}
								>
									<DropdownMenuRadioItem value="asc">
										Terendah
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="desc">
										Tertinggi
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
								<DropdownMenuSeparator />
								<DropdownMenuRadioGroup
									value={sortBy}
									onValueChange={setSortBy}
								>
									<DropdownMenuRadioItem value="harga">
										Harga
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="stok">
										Stok
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setContextSubmit("add");
									}}
								>
									Tambah
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
									>
										<DialogHeader>
											<DialogTitle>
												Tambah Produk
											</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 my-4">
											<FormField
												control={form.control}
												name="id"
												render={({ field }) => (
													<FormItem className="hidden">
														<FormLabel>
															id
														</FormLabel>
														<FormControl>
															<Input
																placeholder="shadcn"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="nama"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Nama
														</FormLabel>
														<FormControl>
															<Input
																required
																placeholder="shadcn"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="harga"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Harga
														</FormLabel>
														<FormControl>
															<Input
																required
																placeholder="shadcn"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="stok"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Stok
														</FormLabel>
														<FormControl>
															<Input
																required
																placeholder="shadcn"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button variant="outline">
													Cancel
												</Button>
											</DialogClose>
											<Button
												disabled={
													form.formState.isSubmitting
												}
												type="submit"
											>
												Save changes
											</Button>
										</DialogFooter>
									</form>
								</Form>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
					{!lists
						? [1, 2, 3, 4, 5, 6].map((id) => (
								<ProductSkeleton key={id} />
						  ))
						: lists.map((list) => (
								<Card key={list.id} className="bg-gray-50">
									<CardHeader>
										<CardTitle className="bg-red-400 p-2 font-medium text-white">
											{list.category}
										</CardTitle>
										{/* <CardDescription>
									Card Description
								</CardDescription> */}
										<CardAction>
											<TiThumbsUp className="text-lg" />
										</CardAction>
									</CardHeader>
									<CardContent className="space-y-2">
										<div className="min-h-[200px]">
											<Image
												src={list.pict}
												alt="Product Image"
												width={200}
												height={200}
											/>
										</div>
										<div className="flex gap-4 justify-self-center my-4">
											<div className="line-through">
												diskon:{" "}
												{list.harga.toLocaleString(
													"en-US",
													{
														style: "currency",
														currency: "USD",
													}
												)}
											</div>
											<div>
												harga:{" "}
												{list.diskon.toLocaleString(
													"en-US",
													{
														style: "currency",
														currency: "USD",
													}
												)}
											</div>
										</div>
										<div>{list.nama}</div>
										<div>Stok: {list.stok}</div>
										<div className="rating">
											{[1, 2, 3, 4, 5].map((id) => (
												<FaStar key={id} />
											))}
										</div>
										<p className="text-sm">
											{list.description}
										</p>
									</CardContent>
									<CardFooter className="flex gap-4">
										<ModalProduct
											context="edit"
											form={form}
											product={list}
											onSubmit={onSubmit}
											onClickProduct={onEditProduct}
										/>
										<DeleteProduct
											product={list}
											onDeleteProduct={onDeleteProduct}
										/>
									</CardFooter>
								</Card>
						  ))}
				</div>
			</div>
		</main>
	);
};

export default ProductPage;
