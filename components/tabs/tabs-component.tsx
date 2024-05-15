"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DocumentForm from "./document-form";
import InvoiceForm from "./invoice-form";
import { useSmartISPStore } from "@/stores/smartisp-store";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SmartISPInvoice } from "@/types/smartisp";
import { Button } from "../ui/button";

export function TabsComponent() {
  const subscriber = useSmartISPStore((state) => state.subscriber);
  const setSubscriber = useSmartISPStore((state) => state.setSubscriber);
  const setInvoice = useSmartISPStore((state) => state.setInvoice);

  const handleChange = (value: string) => {
    const invoice: SmartISPInvoice = JSON.parse(value);
    setInvoice(invoice)
  };

  return (
    <Tabs defaultValue="document" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="document">
          Documento
        </TabsTrigger>
        <TabsTrigger value="invoice">
          Factura
        </TabsTrigger>
      </TabsList>
      <TabsContent value="document">
        {subscriber ? (
          <Card>
            <CardHeader>
              <CardTitle>Facturas</CardTitle>
              <CardDescription>
                {subscriber.user.name} - {subscriber.user.dni}
              </CardDescription>
            </CardHeader>
            <CardContent>
            <RadioGroup onValueChange={handleChange}>
            {subscriber.user.invoices
              .filter((invoice) => invoice.status !== 1)
              .map((invoice) => {
                return (
                  <div
                    key={invoice.id}
                    className="flex items-center space-x-2 bg-gray-100 rounded-lg p-4 shadow-md text-sm"
                  >
                    <RadioGroupItem
                      value={JSON.stringify(invoice)}
                      id={invoice.num_bill}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-600">Número de Factura:</p>
                        <p className="font-semibold">{invoice.num_bill}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total a Pagar:</p>
                        <p className="font-semibold">${invoice.total_pay}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pagar Antes:</p>
                        <p className="font-semibold">
                          {invoice.expiration_date}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <Button className="bg-[#5e1774]" onClick={() => setSubscriber(null)}>Realizar otra busqueda</Button>
          </RadioGroup>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Buscar por documento</CardTitle>
              <CardDescription>
                Ingresu tu numero de documento ó nit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Documento Component */}
              <DocumentForm />
            </CardContent>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="invoice">
        <Card>
          <CardHeader>
            <CardTitle>Buscar por factura</CardTitle>
            <CardDescription>Ingresa tu numero de factura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Invoice Component */}
            <InvoiceForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
