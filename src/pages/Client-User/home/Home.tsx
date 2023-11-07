import Header from 'src/pages/Client-User/Home/Header/Header';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';
import DailyDeal from './DailyDeal/DailyDeal';

const Home = () => {
  return (
    <div className="bg-background">
      <Header />
      <div className="px-4 py-24">
        <Banner />

        <Categories />

        <DailyDeal />
      </div>
    </div>
  );
};

export default Home;
