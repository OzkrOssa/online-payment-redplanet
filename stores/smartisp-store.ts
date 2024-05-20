import {
  SmartISPInvoice,
  SmartISPSubscriber,
  SmartISPSubscriberResponse,
} from "@/types/smartisp";
import { create } from "zustand";

type SubscriberState = {
  subscriber: SmartISPSubscriberResponse | null;
  setSubscriber: (subscriber: SmartISPSubscriberResponse | null) => void;
  fetchSubscriberByDni: (dni: string) => Promise<void>;
  invoice: SmartISPInvoice | null;
  setInvoice: (invoice: SmartISPInvoice | null) => void;
};

export const useSmartISPStore = create<SubscriberState>((set) => ({
  subscriber: null,
  setSubscriber: (subscriber) => set({ subscriber }),
  fetchSubscriberByDni: async (dni: string) => {
    const url = `http://194.140.197.189/api/SmartIPS-v1/get-user/${dni}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("error", response.status);
      }

      const fetchedSubscriber = await response.json();
      if (fetchedSubscriber.success==false) {
        set({
          subscriber: {
            type: "error",
            data: fetchedSubscriber,
          },
        });
        return
      }
      if(fetchedSubscriber.user) {
        set({
          subscriber: {
            type: "subscriber",
            data: fetchedSubscriber,
          },
        });
        return
      }
      
    } catch (error) {
      set({
        subscriber: {
          type: "error",
          data: { success: false, message: `fetch error` },
        },
      });
    }
  },
  invoice: null,
  setInvoice: (invoice) => set({ invoice }),
}));
