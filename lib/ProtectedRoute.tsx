'use client'
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
}

export default ProtectedRoute;
