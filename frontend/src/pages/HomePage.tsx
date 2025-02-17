import Shelfsvg from "@/components/Shelfsvg";
import React from "react";
import { Link } from "react-router";

const HomePage: React.FC = () => {
  return (
    <div className="pagePadding min-h-screen flex justify-between">
      <div className="w-96  flex flex-col gap-4  mt-32  h-fit">
        <h1 className="text-4xl font-bold ">Find book reviews</h1>
        <p className="mt-2 text-lg text-foreground/60 ">
          BookShelf is a platform where you can find book reviews
        </p>

        <Link to={"/"} className="w-fit ">
          <button className="bg-[#7F56D9] hover:bg-[#6941c6] px-6 py-3 rounded-md text-lg text-white font-semibold transition-all ease-in-out duration-150 flex items-center justify-center">
            Explore
          </button>
        </Link>
      </div>

      <div>
        <Shelfsvg />
      </div>
    </div>
  );
};

export default HomePage;
