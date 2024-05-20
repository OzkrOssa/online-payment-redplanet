"use client";
import generateAuthCardToken from "@/lib/card-auth-token";
import React, { useEffect, useState } from "react";

export default function UsePaymentez(payload: any) {

  const [data, setData] = useState<any>(null);

  // Asegúrate de que esta función sea async si necesita esperar
  
  const fetchData = async () => {
    const token = generateAuthCardToken();
    if (token && payload) {
      try {
        const response = await fetch(
          "https://ccapi-stg.paymentez.com/v2/transaction/init_reference/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": token,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to initialize reference: ${response.statusText}`
          );
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}
