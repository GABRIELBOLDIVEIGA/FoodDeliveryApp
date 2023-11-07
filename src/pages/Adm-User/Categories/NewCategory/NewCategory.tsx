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
import { Input } from 'src/components/ui/Input/Input';
import { Textarea } from 'src/components/ui/Textarea/Textarea';
import { Button } from 'src/components/ui/Button/Button';
import { Loader } from 'lucide-react';
import { useNewCategory } from './form/useNewCategory';
import { useContext } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';

const NewCategory = () => {
  const { t } = useContext(LanguageContext);
  const { form, submit, loading } = useNewCategory();

  return (
    <section>
      <Header title="New Category" />

      <div className="pt-20 p-2">
        <Card className="border-border p-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('newCategory.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('newCategory.name.placeholder')}
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
                    <FormLabel>{t('newCategory.description.label')}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder={t('newCategory.description.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} className="flex gap-2">
                {loading && <Loader className="animate-spin" />}
                {t('newCategory.buttonSubmit')}
                {loading && <div className="w-[24px] h-[24px]"></div>}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
};

export default NewCategory;
