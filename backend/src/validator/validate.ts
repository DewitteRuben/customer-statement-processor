import { StatementRecord, StatementRecordError } from "../../../shared/types";

export const hasUniqueReference = (
  record: StatementRecord,
  existingReferences: Set<number>
): boolean => {
  return !existingReferences.has(record.reference);
};

export const validateBalance = (record: StatementRecord): boolean => {
  const expectedEndBalance = record.startBalance.plus(record.mutation);
  return expectedEndBalance.eq(record.endBalance);
};

export const validateRecords = (
  records: StatementRecord[]
): StatementRecordError[] => {
  const referenceSet = new Set<number>();
  const duplicateReferences = new Set<number>();
  const invalidBalanceRecords: StatementRecordError[] = [];

  for (const record of records) {
    if (referenceSet.has(record.reference)) {
      duplicateReferences.add(record.reference);
    }

    referenceSet.add(record.reference);

    if (!validateBalance(record)) {
      invalidBalanceRecords.push({ type: "balance", record });
    }
  }

  const duplicateReferenceRecords: StatementRecordError[] = records
    .filter((record) => duplicateReferences.has(record.reference))
    .map((record) => ({ record, type: "reference" }));

  return duplicateReferenceRecords.concat(invalidBalanceRecords);
};
