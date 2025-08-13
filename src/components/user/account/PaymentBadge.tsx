import React from "react";
import type { PaymentMethod } from "./types";

const PaymentBadge: React.FC<{ method: PaymentMethod }> = ({ method }) => (
  <div className="flex items-center space-x-4 text-text.secondary">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#2a2a2a]">
      <span className="text-xs uppercase">{method.brand}</span>
    </div>
    <div className="text-sm">
      <p className="mb-0.5 font-medium text-white">
        {method.brand.toUpperCase()} •••• {method.last4}
      </p>
      <p className="text-text.secondary">Срок {method.expiry}</p>
    </div>
  </div>
);

export default PaymentBadge;
