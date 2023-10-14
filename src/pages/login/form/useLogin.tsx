import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginFormType } from "./type"
import loginSchema from './schema';
import useAuth from "src/context/auth/useAuth";

const useLogin = () => {
  const { login, response, loading, error } = useAuth();

  const { handleSubmit, register, formState: { errors } } = useForm({ criteriaMode: "all", mode: "onBlur", resolver: zodResolver(loginSchema) })

  const handleLogin = (data: any) => {
    login(data);
  }

  return { handleSubmit, handleLogin, register, loading, error, errors }
}

export default useLogin