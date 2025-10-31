import Header from "@/components/home/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="hidden md:flex w-screen bg-green-700">
        <Header />
      </div>
      {children}
    </div>
  );
}
