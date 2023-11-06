import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { deliveryInstance } from "src/services/deliveryInstance"
import { Category, categorySchema } from "src/validator/category/categorySchema"

export const useNewCategory = () => {
  const form = useForm<Category>({ mode: 'all', resolver: zodResolver(categorySchema) })
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = (data: Category) => {
    setLoading(true)
    const data2 = { name: data.name, description: data.description }

    deliveryInstance.put(`/category/${params.id}`, data2)
    .then((res) => { 
      console.log(res.data)
    })
    .catch((err) => { console.log(err) })
    .finally(() => { setLoading(false); navigate(-1) })
  }

  return { form, submit, loading }
}
