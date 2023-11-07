import { Outlet } from 'react-router-dom';

const BasePage = () => {
  return (
    <div className="w-screen h-screen relative bg-background text-secondary-foreground tracking-wide">
      {/* <div className="w-full h-full border border-red-600 absolute opacity-[4%] bg-doodles">
      </div> */}

      <div className="relative">
        <Outlet />
      </div>
    </div>
  );
};

export default BasePage;
