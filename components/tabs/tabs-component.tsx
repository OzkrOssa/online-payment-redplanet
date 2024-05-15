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

export function TabsComponent() {
  
  return (
    <Tabs defaultValue="document" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="document">Documento</TabsTrigger>
        <TabsTrigger value="invoice">Factura</TabsTrigger>
      </TabsList>
      <TabsContent value="document">
        <Card>
          <CardHeader>
            <CardTitle>Buscar por documento</CardTitle>
            <CardDescription>
              Ingresu tu numero de documento ó nit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Documento Component */}
            <DocumentForm/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="invoice">
        <Card>
          <CardHeader>
            <CardTitle>Buscar por factura</CardTitle>
            <CardDescription>Ingresa tu numero de factura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Invoice Component */}
            <InvoiceForm/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
