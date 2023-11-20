import { Card } from 'src/components/ui/Card/Card';
import Header from '../../Header/Header';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form/Form';
import { useNewSideDish } from './form/useNewSideDish';
import { Input } from 'src/components/ui/Input/Input';
import ButtonSubmit from 'src/components/ButtonSubmit/ButtonSubmit';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Switch } from 'src/components/ui/Switch/Switch';

export const NewSideDish = () => {
  const { form, loading, submit } = useNewSideDish();
  const { t } = useContext(LanguageContext);

  return (
    <section>
      <Header translateKey="NewSideDish.title" type="back" />

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
