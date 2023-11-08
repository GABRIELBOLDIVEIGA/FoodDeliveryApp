import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/Form/Form"
import Header from "../../Header/Header"
import useNewProduct from "./form/useNewProduct"
import { Card } from "src/components/ui/Card/Card"
import { Input } from "src/components/ui/Input/Input"
import ButtonSubmit from "src/components/ButtonSubmit/ButtonSubmit"
import { Textarea } from "src/components/ui/Textarea/Textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/Select/Select"
import { useEffect, useState } from "react"
import { deliveryInstance } from "src/services/deliveryInstance"
import { Category, categoryValidator } from "src/validator/category/categoryValidator"
import { Switch } from "src/components/ui/Switch/Switch"

const NewProduct = () => {
  const { form, submit, loading } = useNewProduct();
  const [categories, setCategories] = useState<Array<Category>>()

  useEffect(() => {
    deliveryInstance.get('/category')
    .then((res) => { 
      const parse = categoryValidator.array().safeParse(res.data);
      if(parse.success) {
        setCategories(parse.data) 
      } else {
         console.log(parse)
      }
    })
    .catch((err) => { console.log(err) })
  },[])

  return (
    <section>
      <Header translateKey="NewProduct.title" type='back' />

      <section className="pt-20 px-2">
        <Card className="border-border p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-2">
            <FormField
                control={form.control}
                name="avaliable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg py-2">
                    <FormLabel>Product Avaliable</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Product Description" { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField 
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder="R$ 00.00" { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator text='Category' />
              
              <FormField 
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotional Price</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem value={category._id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator text='Promotion' />
            
              <FormField 
                control={form.control}
                name="promotionalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotional Price</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder="R$ 00.00" { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activePromotion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg py-2">
                    <FormLabel>Active Promotion</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <ButtonSubmit loading={loading} translateKey="NewProduct.btnSubmit" />
            </form>
          </Form>
        </Card>
      </section>
      
    </section>
  )
}

export default NewProduct


type Props = {
  text: string;
}
const Separator = ({ text }: Props) => {

  return (
    <div className="flex items-center gap-2 pt-6">
      <div className="border-b border-border w-full" />
      <p className="w-max">{text}</p>
      <div className="border-b border-border w-full" />
    </div>
  )
}