import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { deliveryInstance } from 'src/services/deliveryInstance';
import { productValidator } from 'src/validator/product/productValidator';
import { Product, productSchema } from '../../schema/productSchema';

const useUpdateProduct = () => {
  const form = useForm<Product>({
    mode: 'all',
    resolver: zodResolver(productSchema),
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
          form.setValue('name', parse.data.name);
          form.setValue('avaliable', parse.data.avaliable);
          form.setValue('description', parse.data.description);
          form.setValue('price', parse.data.price);
          form.setValue('category', parse.data.category._id);
          form.setValue('promotionalPrice', parse.data.promotionalPrice);
          form.setValue('activePromotion', parse.data.activePromotion);
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
    console.log('[Produto Atualizado] - ', data);

    deliveryInstance
      .put(`/product/${params.id}`, data)
      .then(() => {
        navigate('/adm/products');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
