import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { deliveryInstance } from 'src/services/deliveryInstance';
import { Category, categorySchema } from '../../schema/categorySchema';

export const useNewCategory = () => {
  const form = useForm<Category>({
    mode: 'all',
    resolver: zodResolver(categorySchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (data: Category) => {
    setLoading(true);

    deliveryInstance
      .post(`/category`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        navigate(-1);
      });
  };

  return { form, submit, loading };
};
