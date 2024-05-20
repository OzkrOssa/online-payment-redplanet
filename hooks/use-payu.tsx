import React from "react";
import { MD5 } from "crypto-js";
import { SmartISPInvoice } from "@/types/smartisp";

type PayUConfig = {
  apiKey?: string;
  merchantID?: string;
  accountID?: string;
}

export default function usePayU(invoice: SmartISPInvoice | null) {
  const [signature, setSignature] = React.useState("");
  const payU: PayUConfig = {
    apiKey: process.env.NEXT_PUBLIC_PAYU_API_KEY,
    accountID: process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID,
    merchantID: process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID
  }

  React.useEffect(() => {
    if (invoice) {
      const message = `${payU.apiKey}~${payU.merchantID}~${invoice?.num_bill}~${invoice?.total_pay}~COP`;
      const hash = MD5(message).toString();
      setSignature(hash);
    }
  }, [invoice, payU.apiKey, payU.merchantID]);
  return {
    signature,
    payU
  };
}