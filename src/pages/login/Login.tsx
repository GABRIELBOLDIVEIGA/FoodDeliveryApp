
import { Button } from "src/components/ui/Button/Button"
import { Card } from "src/components/ui/Card/Card"
import { Input } from "src/components/ui/Input/Input"
import { Label } from "src/components/ui/Label/Label"
import useLogin from "./form/useLogin"
import { useContext, useEffect, useState } from 'react';
import { Loader2 } from "lucide-react"
import { AuthContext } from "src/context/auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "src/components/ui/AlertDialog/AlertDialog"

const Login = () => {
  const { handleSubmit, handleLogin, register, loading, error, errors } = useLogin()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (error)
      setAlert(true)
  }, [error])

  useEffect(() => {
    if (user) {
      navigate("/restricted/home")
    }
  }, [user, navigate]);


  return (
    <div className="h-full w-full px-4 flex flex-col ">
      <div className="border-[10px] border-primary rounded-full w-[100px] h-[100px] fixed self-end translate-x-12 -translate-y-7"></div>

      <h1 className="font-bold text-center text-2xl py-10 text-primary">BEM VINDO</h1>

      <Card className="bg-secondary-foreground p-4">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <Label className="text-primary font-semibold">E-mail</Label>
            <Input placeholder="insira seu email" className="text-secondary" {...register("email")} />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <Label className="text-primary font-semibold">Senha</Label>
            <Input type="password" placeholder="insira sua senha" className="text-secondary" {...register("password")} />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
          </div>

          <Button type="submit" className="w-full font-bold mt-6 gap-2">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Card>

      <div className="flex justify-between pt-20">
        <Button >Criar conta</Button>
        <Button variant="link">Esqueceu sua senha?</Button>
      </div>

      <div className="fixed bottom-0 translate-y-10 -translate-x-12 border-[10px] border-primary rounded-full w-[100px] h-[100px]"></div>

      <AlertDialog open={alert}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{error?.message}</AlertDialogTitle>
            <AlertDialogDescription>
              {error?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlert(!alert)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default Login