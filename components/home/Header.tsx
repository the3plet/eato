import Image from "next/image";
import logo from "@/public/logo.png";
import { ChevronDown, MapPin, Truck } from "lucide-react";
import { currentUser } from "@/data/mockData";
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="w-full h-fit  p-2  pt-4 flex justify-between sticky top-0 z-50 bg-white  border-b border-gray-200 ">
      <div className="flex items-center  gap-1">
        <Image src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <h1 className="flex justify-start text-3xl font-bold">Eato</h1>
      </div>
      <div className="flex items-center gap-1 text-lg font-medium">
        <div className="text-xs">
          <div className="flex justify-end items-center gap-0.5">
            <Truck className="" size={12} />
            <p className=" flex items-center text-[#05140A]/50">Deliver to</p>
          </div>
          <p className="text-[#05140A]">{currentUser?.defaultAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
