"use client"
import generateAuthPseToken from '@/lib/pse-auth-token';
import { BankList } from '@/types/bank-list';
import React from 'react'

export default function useBankList() {
  const [bankList, setBankList] = React.useState<BankList>({
    banks: [],
  });

  const getBankList = async () => {
    const token = generateAuthPseToken();
    const response = await fetch(
      "https://noccapi-stg.paymentez.com/banks/PSE",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": token,
        },
      }
    );

    if (!response.ok) {
      console.log(response);
    }

    const b: BankList = await response.json();
    setBankList(b);
  };

React.useEffect(()=>{
    getBankList()
},[])

return bankList
}
