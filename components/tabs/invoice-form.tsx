"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const documentSchema = z.object({
  invoice: z.string().min(1, { message: "Ingrese una factura valida." }),
});

export default function InvoiceForm() {
  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: { invoice: "" },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="invoice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="4452636" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#5e1774]">Buscar</Button>
      </form>
    </Form>
  );
}
