import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <Spinner />
      <p className="flex">
        <p className="text-[#379570] font-bold">Eato{`  `} </p> is preparing
      </p>
    </div>
  );
}
