"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useBankList from "@/hooks/use-bank-list";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import * as Select from "@/components/ui/select";
import * as Form from "@/components/ui/form";
import { identificationOptions } from "@/lib/constants";
import { PseFormSchema } from "@/types/pse";
import useCreatePsePaymentRequest from "@/hooks/use-create-pse-pay-request";
import { useSmartISPStore } from "@/stores/smartisp-store";

export default function Pse() {
  const [showModal, setShowModal] = React.useState(false);
  const { banks } = useBankList();
  const subscriber = useSmartISPStore((state) => state.subscriber);
  const form = useForm<z.infer<typeof PseFormSchema>>({
    resolver: zodResolver(PseFormSchema),
  });

  const { response, createPsePaymentRequest } = useCreatePsePaymentRequest();

  React.useEffect(() => {
    // Verifica si response existe y su estado es "pending"
    if (
      response &&
      response.transaction.status === "pending"
    ) {
      window.location.href = response.transaction.bank_url;
    }
  }, [response]);

  async function onSubmit(data: z.infer<typeof PseFormSchema>) {
    createPsePaymentRequest(data);
    setShowModal(false);
    form.reset();
  }

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      {subscriber?.type == "subscriber" && (
        <Button className="bg-transparent w-30 h-16" variant={"ghost"}>
          <Image
            src="/pse.png"
            alt="Pse"
            width={100}
            height={150}
            className="w-full h-full"
            onClick={handleClick}
          />
        </Button>
      )}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Realiza tu pago con cuenta bancaria
                  </h2>
                  {/* Botón de cerrar modal con ícono de X */}
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Cerrar modal"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Form.Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                      <Form.FormField
                        control={form.control}
                        name="bank"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Bancos</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Selecciona un banco" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                <Select.SelectGroup>
                                  <Select.SelectLabel>
                                    Bancos
                                  </Select.SelectLabel>
                                  {banks.map((bank) => (
                                    <Select.SelectItem
                                      key={bank.name}
                                      value={bank.code}
                                    >
                                      {bank.name}
                                    </Select.SelectItem>
                                  ))}
                                </Select.SelectGroup>
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_number"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Numero de cuenta</Form.FormLabel>
                            <Form.FormControl>
                              <Input placeholder="Cuenta" {...field} />
                            </Form.FormControl>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_type"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Tipo de cuenta</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Selecciona el tipo de cuenta" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                <Select.SelectItem value="CA">
                                  Cuenta Ahorros
                                </Select.SelectItem>
                                <Select.SelectItem value="CC">
                                  Cuenta Corriente
                                </Select.SelectItem>
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_username"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Nombre del titular</Form.FormLabel>
                            <Form.FormControl>
                              <Input placeholder="Titular" {...field} />
                            </Form.FormControl>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="user_type"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Tipo de persona</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Persona" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                <Select.SelectItem value="N">
                                  Natural
                                </Select.SelectItem>
                                <Select.SelectItem value="J">
                                  Juridica
                                </Select.SelectItem>
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="user_type_fis_number"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>
                              Tipo de identificación
                            </Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Identificación" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                {identificationOptions.map((it) => (
                                  <Select.SelectItem
                                    key={it.code}
                                    value={it.code}
                                  >
                                    {it.code} - {it.description}
                                  </Select.SelectItem>
                                ))}
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_nit"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Numero de documento</Form.FormLabel>
                            <Form.FormControl>
                              <Input placeholder="Documento" {...field} />
                            </Form.FormControl>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <div className="flex items-center justify-center mt-5">
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </Form.Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
