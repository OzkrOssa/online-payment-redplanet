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
import { useSmartISPStore } from "@/stores/smartisp-store";

const documentSchema = z.object({
  document: z.string().min(1, { message: "Ingrese un documento valido." }),
});

export default function DocumentForm() {
  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: { document: "" },
  });

  const subscriber = useSmartISPStore((state) => state.subscriber);
  const fetchSubscriberByDni = useSmartISPStore(
    (state) => state.fetchSubscriberByDni
  );
  console.log(process.env.MY_VARIABLE);
  const onSubmit = (values: any) => {
    fetchSubscriberByDni(values.document);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="1018250916" {...field} />
              </FormControl>
              <FormMessage />
              {subscriber?.type == "error" && (
                <p className="text-red-500 text-sm font-medium">
                  No se encontro el usuario
                </p>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#5e1774]">
          Buscar
        </Button>
      </form>
    </Form>
  );
}
