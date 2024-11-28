import Decimal from "decimal.js";
import { z } from "zod";
import { StatementRecord } from "@customer-statement-processor/shared";

const RawXMLRecordSchema = z.object({
  reference: z
    .string()
    .min(1, { message: "Reference is required" })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Reference must be a valid number",
    }),
  accountNumber: z.string().min(1, { message: "Account Number is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startBalance: z
    .string()
    .min(1, { message: "Start Balance is required" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Start Balance must be a valid number",
    }),
  mutation: z
    .string()
    .min(1, { message: "Mutation is required" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Mutation must be a valid number",
    }),
  endBalance: z
    .string()
    .min(1, { message: "End Balance is required" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "End Balance must be a valid number",
    }),
});

export const RawXMLRecordArraySchema = z.object({
  records: z.object({ record: z.array(RawXMLRecordSchema) }),
});

export type RawXMLRecord = z.infer<typeof RawXMLRecordSchema>;

export const transformXMLRecord = (
  rawRecord: RawXMLRecord,
): StatementRecord => {
  return {
    reference: parseInt(rawRecord.reference),
    accountNumber: rawRecord.accountNumber,
    description: rawRecord.description,
    startBalance: new Decimal(rawRecord.startBalance),
    mutation: new Decimal(rawRecord.mutation),
    endBalance: new Decimal(rawRecord.endBalance),
  };
};
