import Header from "@/components/home/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="hidden lg:flex">
        <Header />
      </div>
      {children}
    </div>
  );
}
