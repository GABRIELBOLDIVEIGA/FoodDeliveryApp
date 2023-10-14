
import { Button } from "src/components/Button/Button"
import { Card } from "src/components/shadcn/Card/Card"
import { Input } from "src/components/shadcn/Input/Input"
import { Label } from "src/components/shadcn/Label/Label"
import useLogin from "./form/useLogin"
import { useEffect } from 'react';

const Login = () => {
  const { handleSubmit, handleLogin, register, loading, error, errors } = useLogin()

  useEffect(() => {
    console.log(loading)
  }, [loading])

  return (
    <div className="h-full w-full px-4 flex flex-col ">
      <div className="border-[10px] border-primary rounded-full w-[100px] h-[100px] self-end translate-x-12 -translate-y-7"></div>

      <h1 className="font-bold text-center text-2xl pb-10 text-primary">BEM VINDO</h1>

      <Card className="bg-secondary-foreground p-4">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Label className="text-primary font-semibold">E-mail</Label>
          <Input placeholder="insira seu email" {...register("email")} />

          <Label className="text-primary font-semibold">Senha</Label>
          <Input type="password" placeholder="insira sua senha" {...register("password")} />

          <Button type="submit" className="w-full font-bold mt-6">Login</Button>
        </form>
      </Card>

      <div className="flex justify-between pt-20">
        <Button >Criar conta</Button>
        <Button variant="link">Esqueceu sua senha?</Button>
      </div>

      <div className="fixed bottom-10 -translate-x-12 border-[10px] border-primary rounded-full w-[100px] h-[100px]"></div>
    </div>
  )
}

export default Login