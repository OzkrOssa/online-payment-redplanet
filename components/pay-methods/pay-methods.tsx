"use client";
import { useSmartISPStore } from "@/stores/smartisp-store";
import React from "react";
import PayU from "./pay-u";
import Card from "./card";
import Pse from "./pse";

export default function PayMethods() {
  const invoice = useSmartISPStore((state) => state.invoice);

  return (
    <React.Fragment>
      {invoice?.id ? (
        <div className="mt-5">
          <p className="mb-10 text-xl font-medium">Métodos de pago</p>
          <div className="flex justify-center items-center">
            {/* PayU Component */}
            <PayU />
            {/* Card Component */}
            <Card />
            {/* Pse Component */}
            <Pse />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
