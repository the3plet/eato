import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white lg:w-auto">
      <Spinner />
      <h1 className="flex">
        <p className="text-[#379570] font-bold">Eato{`  `} </p>{`  `} is preparing
      </h1>
    </div>
  );
}
