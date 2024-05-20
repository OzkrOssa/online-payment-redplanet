import { z } from "zod";

export const PseFormSchema = z.object({
    bank: z.string({
      required_error: "Selecciona un banco",
    }),
    org_account_number: z.string({
      required_error: "Ingresa el numero de cuenta",
    }),
    org_account_type: z.string({
      required_error: "Selecciona un tipo de cuenta",
    }),
    org_account_username: z.string({
      required_error: "Por favor ingresa el titular de la cuenta",
    }),
    user_type: z.string({
      required_error: "Selecciona el tipo de persona",
    }),
    user_type_fis_number: z.string({
      required_error: "Selecciona el tipo de documento",
    }),
    org_account_nit: z.string({
      required_error: "Ingresa el numero de documento del titular de la cuenta",
    }),
  });