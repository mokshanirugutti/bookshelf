import ExploreSection from "@/components/ExploreSection";
import Shelfsvg from "@/components/illustrations/Shelfsvg";
import React from "react";


const HomePage: React.FC = () => {
  return (
    <div className="pagePadding min-h-screen w-full">
      <div className="flex md:justify-around  flex-col md:flex-row h-screen md:h-fit items-center pb-12">

      <div className="w-96  flex flex-col gap-4  mt-32  h-fit">
        <h1 className="text-4xl font-bold ">Find book reviews</h1>
        <p className="mt-2 text-lg text-foreground/60 ">
          BookShelf is a platform where you can find book reviews
        </p>

        <a  href="#explore"  className="w-fit ">
          <button className="bg-[#7F56D9] hover:bg-[#6941c6] px-6 py-2 rounded-md text-lg text-white font-semibold transition-all ease-in-out duration-150 flex items-center justify-center">
            Explore
          </button>
        </a>
      </div>

      <div >
        <Shelfsvg />
      </div>
      </div>

      <div id="explore">
        <ExploreSection/>

      </div>

      
    </div>
  );
};

export default HomePage;
