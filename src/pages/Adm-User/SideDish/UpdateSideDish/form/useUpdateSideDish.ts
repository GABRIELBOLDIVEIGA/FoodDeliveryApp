import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDeliveryInstance } from "src/services/deliveryInstance";
import { SideDish, sideDishValidator } from "src/validator/sideDish/sideDishValidator";
import { sideDishSchema } from "../../schema/sideDishSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUpdateSideDish = () => {
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
      .put('/sideDish', data)
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

}