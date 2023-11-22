import Header from '../Header/Header';
import CardCategory from 'src/components/CardCategory/CardCategory';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from './queries/useCategories';

export const Categories = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCategories();

  return (
    <section className="bg-background">
      <Header translateKey="categories.title">
        <Plus onClick={() => navigate('/adm/create-new-category')} />
      </Header>
      <div className="flex flex-col gap-4 px-4 py-20">
        {isLoading &&
          [1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative shadow-md rounded-2xl animate-pulse bg-secondary h-[200px] w-full"
            ></div>
          ))}
        {data?.map((category) => {
          return <CardCategory key={category._id} {...category} />;
        })}
      </div>
    </section>
  );
};
