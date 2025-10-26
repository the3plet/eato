import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import Faq from "@/components/home/Faq";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Navmenu from "@/components/home/Navmenu";
import Recommended from "@/components/home/Recommended";
import Searchbar from "@/components/home/Searchbar";
import TopResturants from "@/components/home/TopResturants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] font-sans dark:bg-black">
      <Header />
      
        <Searchbar />
        <Banner />
        <Categories />
        <TopResturants />
        <Recommended />
        <Faq />
    </div>
  );
}
