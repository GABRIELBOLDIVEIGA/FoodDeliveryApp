import { ChevronLeftCircle, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Configs from "src/components/Configs/Configs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "src/components/ui/AlertDialog/AlertDialog";
import { Button } from "src/components/ui/Button/Button";
import { Card } from "src/components/ui/Card/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/Form/Form";
import { Input } from "src/components/ui/Input/Input";
import useRegisterUser from "./form/RegisterUser";
import { useContext } from "react";
import { LanguageContext } from "src/context/language/LanguageContenxt";

const RegisterUser = () => {
  const { form, submit, loading, showAlert, setShowAlert } = useRegisterUser();
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  return (
    <section className="p-2 bg-background">
      <div className="flex justify-between items-center">
        <Link to="/login">
          <ChevronLeftCircle className="dark:text-primary" />
        </Link>
        <Configs className="pb-2" />
      </div>

      <p className="text-center text-xl text-primary font-bold py-2 ">
        {t("registerUser.title")}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col gap-2"
        >
          <Card className="p-2 dark:border-none">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.email.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.password.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("registerUser.password.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("registerUser.confirmPassword.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t(
                        "registerUser.confirmPassword.placeholder",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-2 dark:border-none">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.phoneNumber.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.phoneNumber.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.document.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.document.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-2 dark:border-none">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.zipCode.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.zipCode.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.neighbourhood.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.neighbourhood.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.street.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.street.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.city.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.city.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("registerUser.number.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("registerUser.number.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Button className="flex gap-2">
            {loading && <Loader />}
            {t("registerUser.buttonSubmit")}
            {loading && <div className="w-[24px] h-[24px]"></div>}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showAlert ? true : false}>
        <AlertDialogContent className="w-[95%]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showAlert?.success ? "Sucesso" : "Erro!"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showAlert?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {showAlert?.success ? (
              <AlertDialogAction
                onClick={() => {
                  setShowAlert(undefined);
                  navigate("/login");
                }}
              >
                {t("registerUser.buttonOk")}
              </AlertDialogAction>
            ) : (
              <AlertDialogCancel
                onClick={() => {
                  setShowAlert(undefined);
                }}
              >
                {t("registerUser.buttonCancel")}
              </AlertDialogCancel>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default RegisterUser;
