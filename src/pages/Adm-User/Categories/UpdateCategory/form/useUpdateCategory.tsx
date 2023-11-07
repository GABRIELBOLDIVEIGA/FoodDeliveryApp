import { useForm } from 'react-hook-form';
import { Category, categorySchema } from '../../schema/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { deliveryInstance } from 'src/services/deliveryInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useUpdateCategory = () => {
  const form = useForm<Category>({
    mode: 'all',
    resolver: zodResolver(categorySchema),
  });
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    deliveryInstance
      .get(`category/${params.id}`)
      .then((res) => {
        const parse = categorySchema.safeParse(res.data);
        if (parse.success) {
          form.setValue('name', parse.data.name);
          form.setValue('description', parse.data.description);
          form.setValue('img', parse.data.img);
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

  const submit = (data: Category) => {
    setLoading(true);
    const data2 = { name: data.name, description: data.description };

    deliveryInstance
      .put(`/category/${params.id}`, data2)
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

  const deleteCategory = (id: string) => {
    deliveryInstance
      .delete(`/category/${id}`)
      .then(() => {
        navigate('/adm/categories');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { form, submit, loading, deleteCategory };
};

export default useUpdateCategory;
