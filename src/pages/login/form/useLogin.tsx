/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormType } from "./type";
import loginSchema from "./schema";
import { useContext } from "react";
import { AuthContext } from "src/context/auth/AuthContext";

const useLogin = () => {
  const { singin, loading, error } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormType>({
    criteriaMode: "all",
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: any) => {
    singin(data);
  };

  return { handleSubmit, handleLogin, register, loading, error, errors };
};

export default useLogin;
