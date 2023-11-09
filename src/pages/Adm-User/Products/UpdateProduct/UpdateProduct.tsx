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
import { Loader, Trash2 } from 'lucide-react';
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
import { Button } from 'src/components/ui/Button/Button';
import { Textarea } from 'src/components/ui/Textarea/Textarea';
import { Input } from 'src/components/ui/Input/Input';
import { productValidator } from 'src/validator/product/productValidator';

const UpdateProduct = () => {
  const { form, deleteProduct, loading, submit, setLoading } =
    useUpdateProduct();
  const { t } = useContext(LanguageContext);
  const params = useParams<{ id: string }>();
  const [imgLoad, setImgLoad] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    deliveryInstance
      .get(`product/${params.id}`)
      .then((res) => {
        const parse = productValidator.safeParse(res.data);
        if (parse.success) {
          setPreview(parse.data.img);
        } else {
          console.log(parse);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

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
      <Header translateKey="UpdateProduct.title" type="back">
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

      <section className="pt-20">
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
                        rows={5}
                        placeholder={t('UpdateProduct.description.placeholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} className="flex gap-2">
                {loading && <Loader className="animate-spin" />}
                {t('UpdateProduct.buttonSubmit')}
                {loading && <div className="w-[24px] h-[24px]"></div>}
              </Button>
            </form>
          </Form>
        </Card>
      </section>
    </section>
  );
};

export default UpdateProduct;
