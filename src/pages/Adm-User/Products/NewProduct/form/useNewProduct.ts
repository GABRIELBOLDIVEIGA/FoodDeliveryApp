import { useForm } from 'react-hook-form';
import { Product, productSchema } from '../../schema/productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productValidator } from 'src/validator/product/productValidator';

const useNewProduct = () => {
  const form = useForm<Product>({
    mode: 'onBlur',
    resolver: zodResolver(productSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (data: Product) => {
    console.log('[useNewProduct] - Submit => ', data);

    setLoading(true);
    deliveryInstanceOLD
      .post('/product', data)
      .then((res) => {
        const parse = productValidator.safeParse(res.data);
        if (parse.success) {
          navigate(`/adm/product/${parse.data._id}`);
        } else {
          console.log(parse);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { form, submit, loading };
};

export default useNewProduct;
