import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="w-full hidden lg:flex bg-white border-t border-gray-200 p-3 gap-1 flex flex-col lg:flex-row lg:items-center lg:py-8 lg:px-12 lg:gap-6">
      <div className="  px-4 flex sm:flex-row items-center justify-between gap-4 lg:max-w-6xl lg:mx-auto lg:px-0 lg:gap-8 lg:items-center lg:justify-between">
        <div className="flex items-center gap-1 lg:gap-3">
          <Image src={logo} alt="Eato" className="w-8 h-8 rounded-full lg:w-12 lg:h-12" />
          <span className="text-lg font-semibold lg:text-2xl">Eato</span>
        </div>

        <nav className="flex gap-2 text-sm text-gray-600 lg:gap-6 lg:text-base">
          <Link href="/about" className="hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-900">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-gray-900">
            Terms
          </Link>
        </nav>

      </div>
        {/* <div className="flex justify-center text-xs text-gray-500">© {new Date().getFullYear()} Eato</div> */}
    </footer>
  );
}
