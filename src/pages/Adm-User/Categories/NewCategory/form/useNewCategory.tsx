import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';
import { Category, categorySchema } from '../../schema/categorySchema';
import { categoryValidator as categoryValidator } from 'src/validator/category/categoryValidator';

export const useNewCategory = () => {
  const form = useForm<Category>({
    mode: 'all',
    resolver: zodResolver(categorySchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (data: Category) => {
    setLoading(true);

    deliveryInstanceOLD
      .post(`/category`, data)
      .then((res) => {
        console.log(res.data);
        const parse = categoryValidator.safeParse(res.data);
        if (parse.success) {
          navigate(`/adm/category/${res.data._id}`);
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
