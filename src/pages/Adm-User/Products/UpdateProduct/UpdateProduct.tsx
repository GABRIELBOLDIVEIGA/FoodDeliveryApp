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
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from 'src/context/language/LanguageContenxt';
import useUpdateProduct from './form/useUpdateProduct';
import { Card } from 'src/components/ui/Card/Card';
import { deliveryInstance } from 'src/services/deliveryInstance';
import _404FullHD from 'src/assets/404FullHD.jpg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form/Form';
import { cn } from 'src/lib/utils';
import { Textarea } from 'src/components/ui/Textarea/Textarea';
import { Input } from 'src/components/ui/Input/Input';
import {
  productValidator,
  Product,
} from 'src/validator/product/productValidator';
import { Switch } from 'src/components/ui/Switch/Switch';
import ButtonSubmit from 'src/components/ButtonSubmit/ButtonSubmit';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select/Select';
import {
  Category,
  categoryValidator,
} from 'src/validator/category/categoryValidator';
import { Separator } from 'src/components/Separator/Separator';

const UpdateProduct = () => {
  const { form, deleteProduct, loading, submit, setLoading } =
    useUpdateProduct();
  const { t } = useContext(LanguageContext);
  const params = useParams<{ id: string }>();
  const [imgLoad, setImgLoad] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [categories, setCategories] = useState<Array<Category>>();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    deliveryInstance
      .get(`product/${params.id}`)
      .then((res) => {
        const parse = productValidator.safeParse(res.data);
        if (parse.success) {
          setPreview(parse.data.img);
          setProduct(parse.data);
        } else {
          console.log(parse);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    deliveryInstance
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (file) {
      setLoading(true);
      setPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);

      deliveryInstance
        .post(`/product/upload-image/${params.id}`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <section>
      <Header translateKey={product?.name ? product.name : ' '} type="back">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90%] rounded-lg border-border">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t('UpdateProduct.alert.title')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t('UpdateProduct.alert.message')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-secondary-foreground">
                {t('UpdateProduct.alert.btnCancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteProduct(params.id ? params.id : '')}
              >
                {t('UpdateProduct.alert.btnConfirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Header>

      <section className="py-20">
        <Card className="p-2 border-border">
          <label htmlFor="banner-img">
            <div
              className={`shadow-md rounded-2xl overflow-hidden h-[200px] w-full`}
            >
              <div
                className={cn(
                  'shadow-md rounded-2xl animate-pulse bg-secondary h-[200px] w-full',
                  imgLoad && 'sr-only'
                )}
              ></div>
              <img
                src={preview}
                className="w-full h-full rounded-2xl"
                onLoad={() => setImgLoad(true)}
                onError={(ev) => {
                  ev.currentTarget.src = _404FullHD;
                }}
              />
              <input
                type="file"
                id="banner-img"
                className="sr-only"
                onChange={(ev) => {
                  if (ev.target.files) setFile(ev.target.files[0]);
                }}
              />
            </div>
          </label>

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
                    <FormLabel>{t('UpdateProduct.avaliable.label')}</FormLabel>
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
                    <FormLabel>{t('UpdateProduct.name.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('UpdateProduct.name.placeholder')}
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
                      {t('UpdateProduct.description.label')}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={t('UpdateProduct.description.placeholder')}
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
                    <FormLabel>{t('UpdateProduct.price.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('UpdateProduct.price.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator text={t('UpdateProduct.separator.category')} />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  const placeholder = categories?.find(
                    (category) => category._id === field.value
                  );
                  return (
                    <FormItem>
                      <FormLabel>{t('UpdateProduct.category.label')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={placeholder?.name} />
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
                  );
                }}
              />

              <Separator text={t('UpdateProduct.separator.promotion')} />

              <FormField
                control={form.control}
                name="promotionalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('UpdateProduct.promotionalPrice.label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t(
                          'UpdateProduct.promotionalPrice.placeholder'
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
                      {t('UpdateProduct.activePromotion.label')}
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
                translateKey="UpdateProduct.btnSubmit"
              />
            </form>
          </Form>
        </Card>
      </section>
    </section>
  );
};

export default UpdateProduct;
