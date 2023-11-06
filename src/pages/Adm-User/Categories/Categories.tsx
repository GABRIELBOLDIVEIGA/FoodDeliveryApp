import { useEffect, useState } from "react"
import Header from "../Header/Header"
import { deliveryInstance } from "src/services/deliveryInstance"
import { Category, categorySchema } from "src/validator/category/categorySchema"
import CardCategory from "src/components/CardCategory/CardCategory"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Categories = () => {
  const [categories, setCategories] = useState<Array<Category>>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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
    .finally(() => { setLoading(false); })
  },[])

  return (
    <section className="bg-background">
      <Header translateKey="categories.title" >
        <Plus onClick={() => navigate('/adm/create-new-category')} />
      </Header>
      <div className="flex flex-col gap-4 px-4 py-16">
        {loading &&
          [1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative shadow-md rounded-2xl animate-pulse bg-secondary h-[200px] w-full"
            ></div>
          ))}
        {categories?.map((category) => {
          return <CardCategory key={category._id} {...category} />;
        })}
      </div>
      
    </section>
  )
}