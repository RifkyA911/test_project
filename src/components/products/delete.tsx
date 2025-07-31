import { ProductsProps } from "@/app/data/products";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DeleteProduct = ({
	product,
	onDeleteProduct,
}: {
	product: ProductsProps;
	onDeleteProduct: (id: string) => void;
}) => {
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant={"destructive"}>Delete</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{" "}
							Apakah anda yakin ingin menghapus produk ini?
						</AlertDialogTitle>
						<AlertDialogDescription>
							{product.nama}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => onDeleteProduct(product.id)}
						>
							Hapus
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
