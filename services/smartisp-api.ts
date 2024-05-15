import { SmartISPPayment, SmartISPSubscriber, SmartISPInvoice, SmartISPPaymentResponse } from "@/types/smartisp";

export async function getUserByDni(dni: string): Promise<SmartISPSubscriber> {
  const url = `http://194.140.197.189/api/SmartIPS-v1/get-user/${dni}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getInvoicesFromUserID(userID: string): Promise<SmartISPInvoice[]> {
  const url = `http://194.140.197.189/api/SmartIPS-v1/getInvoiceCliente/${userID}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`error fetching invoices: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function getPaidsInvoicesFromUserID(userID: string): Promise<SmartISPInvoice[]> {
    const url = `http://194.140.197.189/api/SmartIPS-v1/InvoiceClientStatus1/${userID}`;

    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`error fetching paid invoices: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
}

export async function getUnpaidsInvoicesFromUserID(userID: string): Promise<SmartISPInvoice[]> {
    const url = `http://194.140.197.189/api/SmartIPS-v1/InvoiceClientStatus3/${userID}`;

    try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`error fetching unpaid invoices: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
}

export async function payInvoice(payload: SmartISPPayment): Promise<SmartISPPaymentResponse> {
    const url = `http://194.140.197.189/api/SmartIPS-v1/pagar_factura`;

    try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error(`error paying invoice: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
}