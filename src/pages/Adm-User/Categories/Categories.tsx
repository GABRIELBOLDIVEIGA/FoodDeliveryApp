import { useEffect, useState } from "react"
import Header from "../Header/Header"
import { deliveryInstance } from "src/services/deliveryInstance"
import { Category, categorySchema } from "src/validator/category/categorySchema"
import { Card } from "src/components/ui/Card/Card"

export const Categories = () => {
  const [categories, setCategories] = useState<Array<Category>>()

  useEffect(() => {
    deliveryInstance.get('/category')
    .then((res) => { 
      const parse = categorySchema.array().safeParse(res.data);
      if(parse.success) {
        setCategories(parse.data)
      } else {
        console.log(parse) 
      }
    })
    .catch((err) => { console.log(err)})
    .finally(() => {})
  },[])

  return (
    <section>
      <Header />
      <div className="border border-red-600 pt-20">
      {categories?.map((category) => (
        <Card key={category._id}>
          <p>{category.name}</p>
        </Card>
      ))}
      </div>
      
    </section>
  )
}