import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from 'src/context/auth/AuthContext';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';
import {
  Profile,
  profileValidator,
} from 'src/validator/profile/profileValidator';

export const useProfile = () => {
  const { user } = useContext(AuthContext);
  const form = useForm<Profile>({
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(profileValidator),
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const ref = useRef(false);

  const watchZipCode = form.watch(['zipCode']);

  useEffect(() => {
    deliveryInstanceOLD
      .get(`/user/${user?.userId}`)
      .then((res) => {
        const parse = profileValidator.safeParse(res.data);
        if (parse.success) {
          form.setValue('zipCode', parse.data.zipCode);
          form.setValue('city', parse.data.city);
          form.setValue('neighborhood', parse.data.neighborhood);
          form.setValue('street', parse.data.street);
          form.setValue('number', parse.data.number);

          form.setValue('phoneNumber', parse.data.phoneNumber);
          form.setValue('document', parse.data.document);
          form.setValue('name', parse.data.name);
          form.setValue('email', parse.data.email);
        } else {
          console.log(parse.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (watchZipCode.toString().length < 8) {
      ref.current = true;
    }

    if (watchZipCode.toString().length >= 8 && ref.current === true) {
      ref.current = false;
      setLoadingZipCode(true);
      axios
        .get(`https://viacep.com.br/ws/${watchZipCode.toString()}/json/`)
        .then((res) => {
          form.setValue('street', res.data.logradouro);
          form.setValue('neighborhood', res.data.bairro);
          form.setValue('city', res.data.localidade);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadingZipCode(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchZipCode]);

  const submitForm = (data: Profile) => {
    setLoadingSubmit(true);

    deliveryInstanceOLD
      .put(`/user/${user?.userId}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return { form, submitForm, loadingSubmit, loadingZipCode };
};
