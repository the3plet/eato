"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Truck } from "lucide-react";
import { currentUser } from "@/data/mockData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/mockType";
import { useCartStore } from "@/store/useCartStore";
import { Badge } from "../ui/badge";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const { items } = useCartStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="w-full h-fit p-3 md:p-4 flex justify-between items-center sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      {/* left: logo/title */}
      <button
        className="flex items-center gap-1 group"
        onClick={() => router.push("/")}
      >
        <div className="relative">
          <Image
            src={logo}
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full -rotate-12 group-hover:rotate-0 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-[#369570]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-[#369570] to-[#2d7a5c] bg-clip-text text-transparent">
          Eato
        </h1>
      </button>

      {/* center nav - visible only on large screens */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/"
          className="text-sm lg:text-base font-medium text-gray-600 hover:text-[#369570] transition-colors relative group"
        >
          Home
          {" "}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#369570] group-hover:w-full transition-all duration-300" />
        </Link>
        <Link
          href="/menu"
          className="text-sm lg:text-base font-medium text-gray-600 hover:text-[#369570] transition-colors relative group"
        >
          Menu
          {" "}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#369570] group-hover:w-full transition-all duration-300" />
        </Link>
        <Link
          href="/cart"
          className="relative text-sm lg:text-base font-medium text-gray-600 hover:text-[#369570] transition-colors group"
        >
          My Cart
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-6 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-[#369570] hover:bg-[#2d7a5c] border-2 border-white">
              {items.length}
            </Badge>
          )}
          {" "}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#369570] group-hover:w-full transition-all duration-300" />
        </Link>
        <Link
          href="/profile"
          className="text-sm lg:text-base font-medium text-gray-600 hover:text-[#369570] transition-colors relative group"
        >
          Profile
          {" "}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#369570] group-hover:w-full transition-all duration-300" />
        </Link>
      </nav>

      {/* right: delivery info */}
      <div className="ml-auto flex items-center gap-2 bg-linear-to-br from-[#369570]/10 to-[#2d7a5c]/5 px-2 sm:px-3 py-2 rounded-xl border border-[#369570]/20">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-lg flex items-center justify-center shrink-0">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium leading-tight">Deliver to</p>
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-800 truncate max-w-20 sm:max-w-[120px] md:max-w-[200px]">
            {user?.defaultAddress ?? currentUser?.defaultAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
