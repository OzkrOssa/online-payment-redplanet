import PayMethods from "@/components/pay-methods/pay-methods";
import { TabsComponent } from "@/components/tabs/tabs-component";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-row w-full justify-between relative">
        <div className="w-full md:w-1/2 flex flex-col items-center p-4">
          {/* Title */}
          <div className="font-semibold text-3xl md:text-6xl lg:text-6xl xl:text-8xl xl:text-left text-center p-10">
            ¡Paga tu factura Red Planet fácil y rápido!
          </div>

          {/* Tabs */}
          <TabsComponent />
          {/* Pay Methods */}
          <PayMethods />
        </div>
        <div className="hidden md:block absolute inset-0 items-center justify-center md:static md:w-1/2">
          <Image src="/laptop.png" alt="laptop" width={700} height={500} />
        </div>
      </div>
    </main>
  );
}
