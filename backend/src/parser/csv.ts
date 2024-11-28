import Decimal from "decimal.js";
import { z } from "zod";
import { StatementRecord } from "../../../shared/types";

export const RawCSVRecordSchema = z.object({
  Reference: z
    .string()
    .min(1, { message: "Reference is required" })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Reference must be a valid number",
    }),
  "Account Number": z
    .string()
    .min(1, { message: "Account Number is required" }),
  Description: z.string().min(1, { message: "Description is required" }),
  "Start Balance": z
    .string()
    .min(1, { message: "Start Balance is required" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Start Balance must be a valid number",
    }),
  Mutation: z
    .string()
    .min(1, { message: "Mutation is required" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Mutation must be a valid number",
    }),
  "End Balance": z
    .string()
    .min(1, { message: "End Balance is required" })
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "End Balance must be a valid number",
    }),
});

export const RawCSVRecordArraySchema = z.array(RawCSVRecordSchema);

export type RawCSVRecord = z.infer<typeof RawCSVRecordSchema>;

export const transformCSVRecord = (
  rawRecord: RawCSVRecord
): StatementRecord => {
  return {
    reference: parseInt(rawRecord.Reference),
    accountNumber: rawRecord["Account Number"],
    description: rawRecord.Description,
    startBalance: new Decimal(rawRecord["Start Balance"]),
    mutation: new Decimal(rawRecord.Mutation),
    endBalance: new Decimal(rawRecord["End Balance"]),
  };
};
