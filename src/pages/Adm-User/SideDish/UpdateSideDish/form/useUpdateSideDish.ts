import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDeliveryInstance } from "src/services/deliveryInstance";
import { SideDish, sideDishValidator } from "src/validator/sideDish/sideDishValidator";
import { sideDishSchema } from "../../schema/sideDishSchema";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateSideDish = () => {
  const params = useParams<{ id: string }>();
  const { deliveryInstance } = useDeliveryInstance()
  const form = useForm<SideDish>({
    mode: 'onBlur',
    resolver: zodResolver(sideDishSchema),
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    deliveryInstance
      .get(`/sideDish/${params.id}`)
      .then((res) => {
        console.log(res.data)
        const parse = sideDishValidator.safeParse(res.data);
        if (parse.success) {
          form.setValue('name', parse.data.name)
          form.setValue('avaliable', parse.data.avaliable)
          form.setValue('description', parse.data.description)
          form.setValue('price', parse.data.price)
        } else {
          console.error(parse);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true)
        setMessage(err.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params])

  const submit = (data: SideDish) => {
    setLoading(true);
    deliveryInstance
      .put(`/sideDish/${params.id}`, data)
      .then((res) => {
        const parse = sideDishValidator.safeParse(res.data);
        if (parse.success) {
          setMessage("UpdateSideDish.alert.success.message")
          // navigate(`/adm/sideDish/${parse.data._id}`);
        } else {
          console.error(parse);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true)
        setMessage(err.message)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteSideDish = () => {
    setLoading(true);
    deliveryInstance
      .delete(`/sideDish/${params.id}`)
      .then(() => {
        navigate(-1)
      })
      .catch((err) => {
        console.error(err);
        setError(true)
        setMessage(err.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const resetAlert = () => {
    setMessage(undefined)
    setError(false)
  }

  return { form, submit, loading, resetAlert, message, error, deleteSideDish };

}