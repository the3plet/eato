import Image from "next/image";
import logo from "@/public/logo.png";
import { ChevronDown, MapPin, Truck } from "lucide-react";
import { currentUser } from "@/data/mockData";
import Link from "next/link";
type Props = {};

const Header = (props: Props) => {
  return (
  <div className="w-full h-fit p-2 pt-4 flex justify-between lg:items-center sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* left: logo/title */}
      <div className="flex items-center gap-0">
        <Image src={logo} alt="Logo" className="w-10 h-10 rounded-full -rotate-12" />
        <h1 className="flex justify-start text-3xl lg:text-4xl font-bold">Eato</h1>
      </div>

      {/* center nav - visible only on large screens */}
      <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground">Home</Link>
        <Link href="/menu" className="text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground">Menu</Link>
        <Link href="/cart" className="text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground">My Cart</Link>
        <Link href="/profile" className="text-sm lg:text-base font-medium text-muted-foreground hover:text-foreground">Profile</Link>
      </nav>

      {/* right: delivery info */}
      <div className="ml-auto flex items-center gap-1 text-base lg:text-lg font-medium">
        <div className="text-xs lg:text-sm">
          <div className="flex justify-end items-center gap-1">
            <Truck size={14} />
            <p className="flex items-center text-[#05140A]/50">Deliver to</p>
          </div>
          <p className="text-[#05140A]">{currentUser?.defaultAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
