import React from "react";
import Script from "next/script";
import { useSmartISPStore } from "@/stores/smartisp-store";
import UsePaymentez from "@/hooks/use-paymentez";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Card() {
  const [paymentCheckout, setPaymentCheckout] = React.useState<any>(null);
  const { subscriber, invoice, setInvoice, setSubscriber } = useSmartISPStore(
    (state) => state
  );
  const data = UsePaymentez({
    locale: "es",
    order: {
      amount: invoice?.total_pay,
      description: `Payment for ${invoice?.num_bill}`,
      vat: 0,
      dev_reference: `${invoice?.num_bill}`,
      installments_type: 0,
    },
    user: {
      id: `${invoice?.client_id}`,
      email: `${
        subscriber?.type == "subscriber" ? subscriber?.data.user.email : ""
      }`
    },
  });
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.paymentez.com/ccapi/sdk/payment_checkout_3.0.0.min.js";
    script.async = true;

    script.onload = () => {
      // @ts-expect-error: external
      const paymentCheckout = new PaymentCheckout.modal({
        env_mode: "stg", // `prod`, `stg`, `local` to change environment. Default is `stg`
        onOpen: function () {
          console.log("Checkout open");
        },
        onClose: function () {
          setSubscriber(null);
          setInvoice(null);
        },
        onResponse: function (response: any) {
          console.log(response);
        },
      });

      setPaymentCheckout(paymentCheckout);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data);
  return (
    <React.Fragment>
      {subscriber?.type == "subscriber" && (
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={() => {
              paymentCheckout.open({
                reference: data?.reference,
              });
            }}
            className="bg-transparent w-30 h-16"
            variant={"ghost"}
          >
            <Image
              src="/cards.png"
              alt="card logo"
              width={150}
              height={150}
              className="w-full h-full"
            />
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
