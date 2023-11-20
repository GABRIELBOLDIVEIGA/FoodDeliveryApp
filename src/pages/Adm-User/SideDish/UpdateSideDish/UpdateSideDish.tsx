import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from 'src/components/ui/AlertDialog/AlertDialog';
import Header from '../../Header/Header';
import { Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { useParams } from 'react-router-dom';

export const UpdateSideDish = () => {
  const { t } = useContext(LanguageContext);
  const params = useParams<{ id: string }>();
  return (
    <section>
      <Header translateKey="UpdateSideDish.title" type="back">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%] rounded-lg border-border">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t('UpdateSideDish.alert.title')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t('UpdateSideDish.alert.message')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-secondary-foreground">
                {t('UpdateSideDish.alert.btnCancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                // onClick={() => deleteProduct(params.id ? params.id : '')}
              >
                {t('UpdateSideDish.alert.btnConfirm')}
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
                    <FormLabel>{t('NewSideDish.avaliable.label')}</FormLabel>
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
                    <FormLabel>{t('NewSideDish.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('NewSideDish.name.placeholder')}
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
                    <FormLabel>{t('NewSideDish.description.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('NewSideDish.description.placeholder')}
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
                    <FormLabel>{t('NewSideDish.price.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('NewSideDish.price.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonSubmit
                loading={loading}
                translateKey="NewProduct.btnSubmit"
              />
            </form>
          </Form>
        </Card>
    </section>
    </section>
  );
};
