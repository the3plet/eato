import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 p-3 gap-1 flex flex-col">
      <div className="  px-4 flex sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <Image src={logo} alt="Eato" className="w-8 h-8 rounded-full" />
          <span className="text-lg font-semibold">Eato</span>
        </div>

        <nav className="flex gap-2 text-sm text-gray-600">
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
