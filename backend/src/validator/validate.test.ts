import Decimal from "decimal.js";
import {
  hasUniqueReference,
  validateBalance,
  validateRecords,
} from "./validate";
import { StatementRecord } from "@customer-statement-processor/shared";

describe("Statement Record Validation", () => {
  describe("hasUniqueReference", () => {
    it("should return true for a unique reference", () => {
      const existingReferences = new Set([1, 2, 3]);
      const record: StatementRecord = {
        reference: 4,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100"),
        endBalance: new Decimal("110"),
        mutation: new Decimal("10"),
      };

      expect(hasUniqueReference(record, existingReferences)).toBe(true);
    });

    it("should return false for a duplicate reference", () => {
      const existingReferences = new Set([1, 2, 3]);
      const record: StatementRecord = {
        reference: 2,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100"),
        endBalance: new Decimal("110"),
        mutation: new Decimal("10"),
      };

      expect(hasUniqueReference(record, existingReferences)).toBe(false);
    });
  });

  describe("validateBalance", () => {
    it("should return true for correct balance calculation (positive)", () => {
      const record: StatementRecord = {
        reference: 1,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100.25"),
        endBalance: new Decimal("120.75"),
        mutation: new Decimal("20.5"),
      };

      expect(validateBalance(record)).toBe(true);
    });

    it("should return true for correct balance calculation (negative)", () => {
      const record: StatementRecord = {
        reference: 1,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100.25"),
        endBalance: new Decimal("79.75"),
        mutation: new Decimal("-20.50"),
      };

      expect(validateBalance(record)).toBe(true);
    });

    it("should return true for correct balance calculation", () => {
      const record: StatementRecord = {
        reference: 1,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100"),
        endBalance: new Decimal("110"),
        mutation: new Decimal("10"),
      };

      expect(validateBalance(record)).toBe(true);
    });

    it("should return false for an incorrect balance calculation (positive)", () => {
      const record: StatementRecord = {
        reference: 1,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100.25"),
        endBalance: new Decimal("120.75"),
        mutation: new Decimal("10.30"),
      };

      expect(validateBalance(record)).toBe(false);
    });

    it("should return false for an incorrect balance calculation (negative)", () => {
      const record: StatementRecord = {
        reference: 1,
        accountNumber: "",
        description: "",
        startBalance: new Decimal("100.25"),
        endBalance: new Decimal("120.75"),
        mutation: new Decimal("-10.30"),
      };

      expect(validateBalance(record)).toBe(false);
    });
  });

  describe("validateRecords", () => {
    it("should return empty array for valid records", () => {
      const records: StatementRecord[] = [
        {
          reference: 1,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("100"),
          endBalance: new Decimal("110"),
          mutation: new Decimal("10"),
        },
        {
          reference: 2,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("110"),
          endBalance: new Decimal("95"),
          mutation: new Decimal("-15"),
        },
      ];

      expect(validateRecords(records)).toHaveLength(0);
    });

    it("should detect duplicate references", () => {
      const records: StatementRecord[] = [
        {
          reference: 1,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("100"),
          endBalance: new Decimal("110"),
          mutation: new Decimal("10"),
        },
        {
          reference: 1,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("110"),
          endBalance: new Decimal("95"),
          mutation: new Decimal("-15"),
        },
      ];

      const errors = validateRecords(records);
      expect(errors).toHaveLength(2);
      expect(errors[0].type).toBe("reference");
      expect(errors[1].type).toBe("reference");
    });

    it("should detect balance calculation errors", () => {
      const records: StatementRecord[] = [
        {
          reference: 1,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("100"),
          endBalance: new Decimal("120"),
          mutation: new Decimal("10"),
        },
      ];

      const errors = validateRecords(records);
      expect(errors).toHaveLength(1);
      expect(errors[0].type).toBe("balance");
    });

    it("should detect both reference and balance errors", () => {
      const records: StatementRecord[] = [
        {
          reference: 1,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("100"),
          endBalance: new Decimal("120"),
          mutation: new Decimal("10"),
        },
        {
          reference: 1,
          accountNumber: "",
          description: "",
          startBalance: new Decimal("110"),
          endBalance: new Decimal("95"),
          mutation: new Decimal("-15"),
        },
      ];

      const errors = validateRecords(records);
      expect(errors).toHaveLength(3);
      expect(errors[0].type).toBe("reference");
      expect(errors[1].type).toBe("reference");
      expect(errors[2].type).toBe("balance");
    });
  });
});
