"use client";
import { Hamburger, Heart, Home, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/store/useCartStore";

type Props = {};

const Navmenu = (props: Props) => {
  const [activeTab, setActiveTab] = useState("home");
  const {items} = useCartStore()
  const router = useRouter();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      link: "/",
    },
    {
      id: "menu",
      label: "Menu",
      icon: Hamburger,
      link: "/menu",
    },
    {
      id: "cart",
      label: "My Cart",
      icon: ShoppingBag,
      link: "/cart",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      link: "/login",
    },
  ];
  return (
    <nav
      className="fixed bottom-1 mx-4 left-0 right-0 bg-white border-2 border-[#EBF4F1] px-6 py-1 shadow-lg z-50 rounded-2xl md:hidden"
      role="navigation"
      aria-label="Primary"
      style={{
        // add the device safe-area inset if available, fallback to 0.25rem
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.25rem)",
      }}
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                router.push(item.link);
              }}
              className="relative flex flex-col items-center gap-1 min-w-[60px] py-1 transition-colors"
            >
              {item.id === 'cart' && (
                <Badge
                  className="absolute top-0 right-0 w-4 h-4 p-0 text-[10px] flex items-center justify-center z-50"
                >
                  {items.length}
                </Badge>
              )}
              <Icon
                className={`w-6 h-6 ${
                  isActive ? "text-gray-900" : "text-gray-400"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />

              <span
                className={`text-xs ${
                  isActive ? "text-gray-900 font-medium" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navmenu;
