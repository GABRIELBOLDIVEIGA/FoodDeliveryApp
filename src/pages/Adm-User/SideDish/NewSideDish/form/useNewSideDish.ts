import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDeliveryInstance } from "src/services/deliveryInstance";
import { sideDishValidator, SideDish } from "src/validator/sideDish/sideDishValidator";
import { sideDishSchema } from "../../schema/sideDishSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useNewSideDish = () => {
  const { deliveryInstance } = useDeliveryInstance()
  const form = useForm<SideDish>({
    mode: 'onBlur',
    resolver: zodResolver(sideDishSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (data: SideDish) => {
    console.log("[SideDish] - ", data)
    setLoading(true);
    deliveryInstance
      .post('/sideDish', data)
      .then((res) => {
        console.log(res.data)
        const parse = sideDishValidator.safeParse(res.data.body);
        if (parse.success) {
          navigate(`/adm/sideDish/${parse.data._id}`);
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