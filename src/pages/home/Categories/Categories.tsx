import { useContext, useEffect, useState } from "react";
import { Button } from "src/components/ui/Button/Button";
import { deliveryInstance } from "src/services/deliveryInstance";
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { Link } from "react-router-dom";
import { Category, categoriesSchema } from "src/validator/categorySchema";

const Categories = () => {
  const { t } = useContext(LanguageContext);
  const [categories, setCategories] = useState<Array<Category>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deliveryInstance
      .get("/category/category/query?page=1&limit=3")
      .then((res) => {
        const categories = categoriesSchema.safeParse(res.data);
        setCategories(categories.success ? categories.data : undefined);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="pt-6">
      <div className="flex justify-between items-center tracking-wider pb-4">
        <p className="font-bold">{t("categoriesHome.title")}</p>
        <Link to="/restricted/categories">
          <Button variant="link" className="font-semibold">
            {t("categoriesHome.link")}
          </Button>
        </Link>
      </div>

      <div className="flex w-full gap-2 ">
        {loading && (
          <div className="w-full flex">
            {[1, 2, 3].map((index) => {
              return (
                <div
                  key={index}
                  className="w-1/3 flex flex-col gap-3 justify-center items-center rounded-md "
                >
                  <div className="w-[110px] h-[60px] rounded-md shadow-md animate-pulse bg-secondary-foreground"></div>
                  <div className="w-[110px] h-[15px] rounded-md shadow-md animate-pulse bg-secondary-foreground"></div>
                </div>
              );
            })}
          </div>
        )}

        {!loading &&
          categories?.map((category, index) => {
            return (
              <div key={index} className=" w-1/3">
                <div className="flex justify-center items-center rounded-md ">
                  <img
                    src={category?.img}
                    className="h-[60px] rounded-md shadow-md"
                  />
                </div>
                <p className="text-center font-semibold pt-2">
                  {category.name}
                </p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Categories;
