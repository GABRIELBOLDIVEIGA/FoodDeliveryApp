import { ChevronLeftCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { cn } from "src/lib/utils";
import { deliveryInstance } from "src/services/deliveryInstance";
import { Categories, Category, categoriesSchema } from "src/validator/categorySchema";

const Categories = () => {

  const [categories, setCategories] = useState<Categories>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    deliveryInstance
      .get("/category")
      .then((res) => {
        const parse = categoriesSchema.safeParse(res.data);
        setCategories(parse.success ? parse.data.reverse() : undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-background">
      <Header />

      <div className="flex flex-col gap-4 px-4 py-16">
        {loading &&
          [1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative shadow-md rounded-2xl animate-pulse bg-secondary h-[200px] w-full"
            >
            </div>
          ))
        }
        {categories?.map((category) => {
          return (
            <CardCategory key={category._id} {...category} />
          )
        })}
      </div>
    </section>
  )
}

export default Categories

const Header = () => {
  const { t } = useContext(LanguageContext)
  return (
    <div className="fixed top-0 z-10 flex justify-between bg-background w-full shadow-md px-4 py-3">
      <Link to="/restricted/home">
        <ChevronLeftCircle className="text-primary" />
      </Link>
      <h3 className="font-bold tracking-wider">{t('categories.title')}</h3>
      <div className="w-[24px]"></div>
    </div>
  )
}


const CardCategory = (category: Category) => {
  const [imgLoad, setImgLoad] = useState(false);

  return (
    <Link key={category._id} to={`/restricted/category/${category._id}`}>
      <div
        className={`relative shadow-md rounded-2xl overflow-hidden h-[200px] w-full`}
      >
        <p className="absolute bottom-0 w-full py-[6px] text-center text-secondary dark:text-secondary-foreground font-semibold bg-black bg-opacity-[0.6]">{category.name}</p>

        <div className={cn(
          "shadow-md rounded-2xl animate-pulse bg-secondary h-[200px] w-full", imgLoad && 'sr-only')}>
        </div>
        <img src={category.img} className="w-full" onLoad={() => setImgLoad(true)} />
      </div>
    </Link>
  )
}