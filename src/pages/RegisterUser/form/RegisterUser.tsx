import { useForm } from 'react-hook-form';
import { RegisterUser, registerUserSchema } from './registerUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { deliveryInstance } from 'src/services/deliveryInstance';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const useRegisterUser = () => {
  const form = useForm<RegisterUser>({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(registerUserSchema),
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<
    { success: boolean; message: string } | undefined
  >(undefined);
  const { t } = useContext(LanguageContext);

  const ZIP_CODE_watch = form.watch(['zipCode']);

  useEffect(() => {
    if (ZIP_CODE_watch.toString().length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${ZIP_CODE_watch}/json/`)
        .then((res) => {
          console.log(res.data);
          form.setValue('neighborhood', res.data.bairro);
          form.setValue('street', res.data.logradouro);
          form.setValue('city', res.data.localidade);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ZIP_CODE_watch]);

  const submit = (data: RegisterUser) => {
    console.log(data);
    setLoading(true);
    deliveryInstance
      .post('/user', data)
      .then((res) => {
        console.log(res.data);
        setShowAlert({
          success: true,
          message: t('registerUser.messageSuccess'),
        });
      })
      .catch((err) => {
        console.log(err);
        setShowAlert({
          success: false,
          message: t('registerUser.messageError'),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { form, submit, loading, showAlert, setShowAlert };
};

export default useRegisterUser;
