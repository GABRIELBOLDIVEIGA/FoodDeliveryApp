import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { deliveryInstance } from "src/services/deliveryInstance";
import { Product, productValidator } from "src/validator/product/productValidator";

const useUpdateProduct = () => {
  const form = useForm<Product>({
    mode: 'all',
    resolver: zodResolver(productValidator),
  });
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    deliveryInstance
      .get(`product/${params.id}`)
      .then((res) => {
        const parse = productValidator.safeParse(res.data);
        if (parse.success) {
          console.log(parse.data)
          form.setValue('name', parse.data.name);    
        } else {
          console.log(parse);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (data: Product) => {
    setLoading(true);
    const data2 = { name: data.name, description: data.description };

    deliveryInstance
      .put(`/product/${params.id}`, data2)
      .then(() => { navigate('/adm/products') })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { setLoading(false) });
  };

  const deleteProduct = (id: string) => {
    deliveryInstance
      .delete(`/product/${id}`)
      .then(() => {
        navigate('/adm/products');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { form, submit, loading, setLoading, deleteProduct };
};

export default useUpdateProduct;
