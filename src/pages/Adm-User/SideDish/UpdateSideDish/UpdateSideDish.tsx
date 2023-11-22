import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'src/components/ui/AlertDialog/AlertDialog';
import Header from '../../Header/Header';
import { Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Card } from 'src/components/ui/Card/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form/Form';
import { Switch } from 'src/components/ui/Switch/Switch';
import { Input } from 'src/components/ui/Input/Input';
import ButtonSubmit from 'src/components/ButtonSubmit/ButtonSubmit';
import { useUpdateSideDish } from './form/useUpdateSideDish';
import { useNavigate } from 'react-router-dom';

export const UpdateSideDish = () => {
  const { t } = useContext(LanguageContext);
  const { form, submit, loading, resetAlert, message, error, deleteSideDish } =
    useUpdateSideDish();
  const navigate = useNavigate();

  return (
    <section>
      <Header translateKey="UpdateSideDish.title" type="back">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%] rounded-lg border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-primary-foreground">
                {t('UpdateSideDish.alert.delete.title')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t('UpdateSideDish.alert.delete.message')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-secondary-foreground">
                {t('UpdateSideDish.alert.delete.btnCancel')}
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteSideDish()}>
                {t('UpdateSideDish.alert.delete.btnConfirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Header>

      <section className="py-20 px-2">
        <Card className="border-border p-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="avaliable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg py-2">
                    <FormLabel>{t('UpdateSideDish.avaliable.label')}</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('UpdateSideDish.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('UpdateSideDish.name.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('UpdateSideDish.description.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'UpdateSideDish.description.placeholder'
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('UpdateSideDish.price.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('UpdateSideDish.price.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonSubmit
                loading={loading}
                translateKey="UpdateSideDish.btnSubmit"
              />
            </form>
          </Form>
        </Card>
      </section>

      <AlertDialog open={error || message ? true : false}>
        <AlertDialogContent className="w-[90%] rounded-lg border-border">
          <AlertDialogHeader>
            <AlertDialogDescription>
              {error ? message : t(`${message}`)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                error ? resetAlert() : navigate(-1);
              }}
            >
              {t('UpdateSideDish.alert.btnConfirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
