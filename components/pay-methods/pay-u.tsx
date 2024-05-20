'use client'
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useSmartISPStore } from "@/stores/smartisp-store";
import usePayU from "@/hooks/use-payu";

export default function PayU() {
  const { subscriber, invoice } = useSmartISPStore((state) => state);
  const { signature, payU } = usePayU(invoice);
  return (
    <React.Fragment>
      {subscriber?.type=="subscriber" && invoice && (
        <form
          method="post"
          action="https://checkout.payulatam.com/ppp-web-gateway-payu/"
        >
          {/* ADD merchantId & accountId*/}
          <input
            name="merchantId"
            type="hidden"
            value={payU.merchantID}
          />
          <input name="accountId" type="hidden" value={payU.accountID} />
          <input
            name="description"
            type="hidden"
            value="Pago de Factura - Redplanet"
          />
          <input name="referenceCode" type="hidden" value={invoice.num_bill} />
          <input name="amount" type="hidden" value={invoice.total_pay} />
          <input name="tax" type="hidden" value="0" />
          <input name="taxReturnBase" type="hidden" value="0" />
          <input name="currency" type="hidden" value="COP" />
          <input name="signature" type="hidden" value={signature} />
          <input name="test" type="hidden" value="0" />
          <input
            name="buyerEmail"
            type="hidden"
            value={subscriber.data.user.email}
          />
          <input
            name="responseUrl"
            type="hidden"
            value="https://thanks.red-planet.com.co/"
          />
          <input
            name="confirmationUrl"
            type="hidden"
            value="https://thanks.red-planet.com.co/"
          />
          <Button
            className="bg-transparent w-30 h-16"
            variant={"ghost"}
            type="submit"
          >
            <Image
              src="/payu.png"
              alt="logo payu"
              width={180}
              height={180}
              className="w-full h-full object-contain"
            />
          </Button>
        </form>
      )}
    </React.Fragment>
  );
}
