"use client";

import { useCartStore } from "@/store/useCartStore";
import CartItem from "@/components/cart/CartItem";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function Page() {
  const items = useCartStore((s) => s.items);

  return (
    <ProtectedRoute>
      <div className="p-4 md:p-8 lg:p-12 lg:max-w-6xl lg:mx-auto">
        <h2 className="text-lg font-semibold mb-4 lg:text-2xl lg:mb-6">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 lg:grid lg:grid-cols-[1fr,480px] lg:items-start lg:gap-8">
          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="text-muted-foreground">No items in cart</div>
            ) : (
              items.map((it) => <CartItem key={it.id} item={it} />)
            )}
          </div>

          <div className="lg:w-full">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
