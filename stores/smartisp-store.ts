import { SmartISPInvoice, SmartISPSubscriber } from '@/types/smartisp';
import {create} from 'zustand';

type SubscriberState = {
  subscriber: SmartISPSubscriber | null;
  setSubscriber: (subscriber: SmartISPSubscriber) => void;
  fetchSubscriberByDni: (dni: string) => Promise<void>;
  invoice: SmartISPInvoice | null;
  setInvoice: (invoice: SmartISPInvoice) => void;
};

export const useSmartISPStore = create<SubscriberState>((set) => ({
  subscriber: null,
  setSubscriber: (subscriber) => set({ subscriber }),
  fetchSubscriberByDni: async (dni: string) => {
    const url = `http://194.140.197.189/api/SmartIPS-v1/get-user/${dni}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching subscriber: ${response.statusText}`);
      }
      const fetchedSubscriber: SmartISPSubscriber = await response.json();
      set({ subscriber: fetchedSubscriber });
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },
  invoice: null,
  setInvoice: (invoice) => set({ invoice })
}));
