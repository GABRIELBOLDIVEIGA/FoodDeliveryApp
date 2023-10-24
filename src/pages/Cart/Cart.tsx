import { Card, CardHeader } from "src/components/ui/Card/Card"
import { Form } from "src/components/ui/Form/Form"
import { useOrder } from "./form/useOrder"
import { Button } from "src/components/ui/Button/Button"
import CardProduct from "src/components/CardProduct/CardProduct"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "src/context/cart/CartContext"
import { ProductCart } from "src/context/cart/schema/cartSchema"
import { deliveryInstance } from "src/services/deliveryInstance"
import { Product } from "src/validator/productSchema"
import { LanguageContext } from "src/context/language/LanguageContenxt"
import { Link, useNavigate } from "react-router-dom"
import { Check, ChevronLeftCircle } from "lucide-react"
import { currencyFormat } from "src/lib/intl/currencyFormt"
import { AuthContext } from "src/context/auth/AuthContext"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "src/components/ui/AlertDialog/AlertDialog"

const useSubmitOrder = () => {
	const { user } = useContext(AuthContext);
	const { products, total, resetCart } = useContext(CartContext);
	const [status, setStatus] = useState<{ status: number, message: string } | null>(null)

	const deliveryAddress = {
		zipCode: user?.zipCode,
		neighborhood: user?.neighborhood,
		street: user?.street,
		city: user?.city,
		number: user?.number
	}

	const order = {
		user: user?.userId,
		deliveryAddress: JSON.stringify(deliveryAddress),
		products: products,
		total: total
	}

	const submitOrder = () => {
		deliveryInstance.post('/order', order)
			.then((res) => {
				if (res.status === 201) {
					setStatus({ status: 201, message: "Pedido gerado com sucesso!" })
					resetCart()
				}
			})
			.catch((err) => {
				setStatus({ status: err.response.status, message: "Tivemos algum problema para enviar seu pedido..." })
			})
	}

	const resetStatus = () => {
		setStatus(null)
	}

	return { status, submitOrder, resetStatus }
}

const Cart = () => {
	const { user } = useContext(AuthContext);
	const { products, total } = useContext(CartContext);
	const { status, submitOrder, resetStatus } = useSubmitOrder();
	const navigate = useNavigate()

	useEffect(() => {
		console.log(status)
	}, [status])

	return (
		<section className="pb-[100px]">
			<Header />

			<div className="flex flex-col gap-2 pt-16 px-2">
				{products.map((product) => (
					<CartItem key={product.productID} {...product} />
				))}

				<div>
					{products.map((product) => (
						<div key={product.productID}>
							<div className="flex justify-between py-1">
								<p><span className="font-bold">{product.name}</span> {product.amount} uni.</p>
								<p>{currencyFormat(product.price * product.amount)}</p>
							</div>
						</div>
					))}
					<div className="flex justify-between py-1 border-t-2 ">
						<p className="font-bold">Total: </p>
						<p className="font-bold">{currencyFormat(total)}</p>
					</div>
				</div>
			</div>

			<Card className="bg-muted p-4 mx-2 mt-6 border-border ">
				<h1 className="text-center font-bold">Endereço de Entrega</h1>
				<div className="flex justify-between items-center gap-2">
					<div>
						<h2 className="text-lg font-semibold">{user?.name}</h2>
						<p>Rua: {user?.street}</p>
						<p>Bairro: {user?.neighborhood}</p>
						<p>Numero: {user?.number}</p>
						<p>Phone: {user?.number}</p>
					</div>
					<div className="bg-primary text-secondary shadow-md rounded-full p-2">
						<Check />
					</div>
				</div>
			</Card>

			<div className="w-full px-2 mt-6">
				<Button disabled={products.length === 0} onClick={() => submitOrder()} className="w-full">Finalizar</Button>
			</div>


			<AlertDialog open={status?.status ? true : false}>
				<AlertDialogTrigger asChild>
				</AlertDialogTrigger>
				<AlertDialogContent className="mx-2">
					<AlertDialogHeader>
						<AlertDialogTitle>{status?.message}</AlertDialogTitle>
						<AlertDialogDescription>
							{status?.status === 201 ? "Voltar para a Home" : "Tente outra vez"}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction onClick={() => {
							resetStatus()
							if (status?.status === 201) {
								navigate('/restricted/home')
							}
						}}>Continuar</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

		</section>
	)
}

export default Cart

const CartItem = (product: ProductCart) => {
	const [prod, setProd] = useState<Product>()

	useEffect(() => {
		deliveryInstance.get(`/product/${product.productID}`)
			.then((res) => { setProd(res.data) })
			.catch((err) => console.log(err))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{prod && <CardProduct {...prod} />}
		</>
	)
}

const Header = () => {
	const { t } = useContext(LanguageContext);
	return (
		<div className="fixed top-0 z-10 flex justify-between bg-background w-full shadow-md px-4 py-3">
			<Link to="/restricted/home">
				<ChevronLeftCircle className="text-primary" />
			</Link>
			<h3 className="font-bold tracking-wider">{t("cart.title")}</h3>
			<div className="w-[24px]"></div>
		</div>
	);
};