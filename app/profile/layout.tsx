import Header from "@/components/home/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="hidden md:flex">
        <Header />
      </div>
      {children}
    </div>
  );
}
