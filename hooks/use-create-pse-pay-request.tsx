import generateAuthPseToken from "@/lib/pse-auth-token";
import { useSmartISPStore } from "@/stores/smartisp-store";
import { PseFormSchema } from "@/types/pse";
import React from "react";
import { z } from "zod";
import useIpAddress from "./use-ip-address";

export default function useCreatePsePaymentRequest() {
  const { ipAddress } = useIpAddress();
  const { subscriber, invoice } = useSmartISPStore((state) => state);

  const createPsePaymentRequest = async (
    data: z.infer<typeof PseFormSchema>
  ): Promise<void> => {
    const payload = {
      carrier: {
        id: "PSE",
        extra_params: {
          bank_code: "1022",
          response_url: "https://thanks.red-planet.com.co/",
          origin_account: {
            application_code: "DV-REDPNETPSE-STG-CO-LTP",
            account_number: data.org_account_number,
            account_type: data.org_account_type,
            account_nit: data.org_account_nit,
          },
          destination_account: {
            account_number: "084200089575",
            account_type: "CC",
            account_identification: "900601506",
            account_identification_type: "NIT",
            account_bank_code: "1051",
          },
          user: {
            name: "Red Planet",
            type: data.user_type,
            type_fis_number: data.user_type_fis_number,
            fiscal_number: data.org_account_nit,
            ip_address: ipAddress,
          },
          split: {
            transactions: [
              {
                application_code: "DV-REDPNETPSEH-STG-CO-LTP",
                amount: (Number(invoice?.total_pay) / 3).toString(),
                vat: invoice?.iva,
              },
              {
                application_code: "DV-REDPNETPSEH2-STG-CO-LTP",
                amount: (Number(invoice?.total_pay) / 3).toString(),
                vat: invoice?.iva,
              },
              {
                application_code: "DV-REDPNETPSEH3-STG-CO-LTP",
                amount: (Number(invoice?.total_pay) / 3).toString(),
                vat: invoice?.iva,
              },
            ],
          },
        },
      },
      user: {
        id: `${subscriber?.type === "subscriber" ? subscriber?.data.user.id : ""}`,
        email: `${subscriber?.type === "subscriber" ? subscriber?.data.user.email : ""}`,
        phone_number: `${subscriber?.type === "subscriber" ? subscriber?.data.user.phone : ""}`,
      },
      order: {
        dev_reference: invoice?.num_bill,
        amount: Number(invoice?.total_pay),
        vat: invoice?.iva,
        description: `Pago factura #${invoice?.num_bill}`,
      },
    };

    try {
      const token = await generateAuthPseToken();
      const request = await fetch("https://noccapi-stg.paymentez.com/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": token,
        },
        body: JSON.stringify(payload),
      });

      if (!request.ok) {
        console.error("Failed to create PSE payment request:", request);
      } else {
        const responseData = await request.json();
        console.log("PSE payment request successful:", responseData);
      }
    } catch (error) {
      console.error("Error creating PSE payment request:", error);
    }
  };

  return { createPsePaymentRequest };
}
