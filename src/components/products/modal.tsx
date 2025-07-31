import { ProductsProps } from "@/app/data/products";
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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
	female = "female",
	male = "male",
	other = "other",
}

interface IFormInput {
	firstName: string;
	gender: GenderEnum;
}

interface ModalProductProps {
	context: "add" | "edit";
	form: any;
	product: ProductsProps;
	onSubmit: any;
	onClickProduct: (product: ProductsProps) => void;
	isOpen?: boolean;
}
export const ModalProduct: React.FC<ModalProductProps> = ({
	context,
	form,
	product,
	onSubmit,
	onClickProduct,
	isOpen,
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"outline"}
					onClick={() => onClickProduct(product)}
				>
					Ubah
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Ubah Produk</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 my-4">
							<FormField
								control={form.control}
								name="id"
								render={({ field }) => (
									<FormItem className="hidden">
										<FormLabel>id</FormLabel>
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
										<FormLabel>Nama</FormLabel>
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
										<FormLabel>Harga</FormLabel>
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
										<FormLabel>Stok</FormLabel>
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
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button
									disabled={form.formState.isSubmitting}
									type="submit"
								>
									Save changes
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
