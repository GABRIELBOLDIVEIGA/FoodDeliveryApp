import { Card } from "src/components/ui/Card/Card";
import { useProfile } from "./form/useProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/Form/Form";
import { Input } from "src/components/ui/Input/Input";
import { Button } from "src/components/ui/Button/Button";
import Header from "./ProfileHeader/ProfileHeader";
import { Loader } from "lucide-react";
import { cn } from "src/lib/utils";
import { useContext } from "react";
import { LanguageContext } from "src/context/language/LanguageContenxt";

const Profile = () => {
  const { t } = useContext(LanguageContext);
  const { form, submitForm, loadingSubmit, loadingZipCode } = useProfile();

  return (
    <section className="bg-background">
      <Header />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-5 px-2 py-[72px]"
        >
          <Card className="p-2 border border-primary dark:border-border">
            <div className="flex justify-center -translate-y-5">
              <p className="min-w-max bg-primary rounded-full px-2 text-muted dark:text-secondary-foreground font-semibold shadow-md ">
                {t("profile.cardUserInfo.title")}
              </p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.cardUserInfo.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("profile.cardUserInfo.name.placeholder")}
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
                  <FormLabel>
                    {t("profile.cardUserInfo.document.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardUserInfo.document.placeholder",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("profile.cardUserInfo.phoneNumber.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardUserInfo.phoneNumber.placeholder",
                      )}
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
                  <FormLabel>{t("profile.cardUserInfo.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("profile.cardUserInfo.email.placeholder")}
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-2 border border-primary dark:border-border">
            <div className="flex justify-center -translate-y-5">
              <p className="min-w-max bg-primary rounded-full px-2 text-muted dark:text-secondary-foreground font-semibold shadow-md ">
                {t("profile.cardDeliveryAdrress.title")}
              </p>
            </div>

            <div className="w-full flex justify-center">
              <Loader
                className={cn("animate-spin ", !loadingZipCode && "sr-only")}
              />
            </div>

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("profile.cardDeliveryAdrress.zipCode.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardDeliveryAdrress.zipCode.placeholder",
                      )}
                      disabled={loadingZipCode}
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
                  <FormLabel>
                    {t("profile.cardDeliveryAdrress.city.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardDeliveryAdrress.city.placeholder",
                      )}
                      disabled={loadingZipCode}
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
                  <FormLabel>
                    {t("profile.cardDeliveryAdrress.neighbourhood.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardDeliveryAdrress.neighbourhood.placeholder",
                      )}
                      disabled={loadingZipCode}
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
                  <FormLabel>
                    {t("profile.cardDeliveryAdrress.street.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardDeliveryAdrress.city.placeholder",
                      )}
                      disabled={loadingZipCode}
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
                  <FormLabel>
                    {t("profile.cardDeliveryAdrress.number.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "profile.cardDeliveryAdrress.number.placeholder",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Button type="submit" className="flex gap-2" disabled={loadingSubmit}>
            <Loader
              className={cn("animate-spin", !loadingSubmit && "sr-only")}
            />
            {t("profile.buttonSubmit")}
            <div
              className={cn("w-[24px] h-[24px]", !loadingSubmit && "sr-only")}
            ></div>
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Profile;
