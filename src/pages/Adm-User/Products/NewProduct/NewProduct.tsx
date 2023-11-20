import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form/Form';
import Header from '../../Header/Header';
import useNewProduct from './form/useNewProduct';
import { Card } from 'src/components/ui/Card/Card';
import { Input } from 'src/components/ui/Input/Input';
import ButtonSubmit from 'src/components/ButtonSubmit/ButtonSubmit';
import { Textarea } from 'src/components/ui/Textarea/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select/Select';
import { useContext, useEffect, useState } from 'react';
import { deliveryInstanceOLD } from 'src/services/deliveryInstance';
import {
  Category,
  categoryValidator,
} from 'src/validator/category/categoryValidator';
import { Switch } from 'src/components/ui/Switch/Switch';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import { Separator } from 'src/components/Separator/Separator';

const NewProduct = () => {
  const { form, submit, loading } = useNewProduct();
  const [categories, setCategories] = useState<Array<Category>>();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    deliveryInstanceOLD
      .get('/category')
      .then((res) => {
        const parse = categoryValidator.array().safeParse(res.data);
        if (parse.success) {
          setCategories(parse.data);
        } else {
          console.log(parse);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <Header translateKey="NewProduct.title" type="back" />

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
                    <FormLabel>{t('NewProduct.avaliable.label')}</FormLabel>
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
                    <FormLabel>{t('NewProduct.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('NewProduct.name.placeholder')}
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
                    <FormLabel>{t('NewProduct.description.label')}</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={t('NewProduct.description.placeholder')}
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
                    <FormLabel>{t('NewProduct.price.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('NewProduct.price.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator text={t('NewProduct.separator.category')} />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('NewProduct.category.label')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('NewProduct.category.placeholder')}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator text={t('NewProduct.separator.promotion')} />

              <FormField
                control={form.control}
                name="promotionalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('NewProduct.promotionalPrice.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t(
                          'NewProduct.promotionalPrice.placeholder'
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
                name="activePromotion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg py-2">
                    <FormLabel>
                      {t('NewProduct.activePromotion.label')}
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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

export default NewProduct;
