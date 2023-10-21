import { Card } from "src/components/ui/Card/Card"
import { Form } from "src/components/ui/Form/Form"
import { useOrder } from "./form/useOrder"
import { Button } from "src/components/ui/Button/Button"

const Cart = () => {
  const { form, handleSubmitOrder } = useOrder()

  return (
    <section className="p-4">

      <Card className="bg-background p-4 border-border">
        <h1>Confira sua lista de produtos</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitOrder)} className="flex">

            <Button className="w-full">Finalizar perdido</Button>
          </form>
        </Form>
      </Card>
    </section>
  )
}

export default Cart