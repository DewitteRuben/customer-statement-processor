import Decimal from "decimal.js";
import { Buffer } from "buffer";
import statementRecordParser from "./parser";

describe("StatementRecordParser CSV", () => {
  describe("Happy Path Tests", () => {
    it("should successfully parse a valid CSV file", () => {
      const mockCSVFile = {
        buffer:
          Buffer.from(`Reference,Account Number,Description,Start Balance,Mutation,End Balance
        1,NL12ABNA3214567890,Salary,1000.00,500.50,1500.50`),
        mimetype: "text/csv",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockCSVFile);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        reference: 1,
        accountNumber: "NL12ABNA3214567890",
        description: "Salary",
        startBalance: new Decimal("1000.00"),
        mutation: new Decimal("500.50"),
        endBalance: new Decimal("1500.50"),
      });
    });

    it("should handle CSV with multiple records", () => {
      const mockCSVFile = {
        buffer:
          Buffer.from(`Reference,Account Number,Description,Start Balance,Mutation,End Balance
        1,NL12ABNA3214567890,Salary,1000.00,500.50,1500.50
        2,NL87INGB4567890123,Expense,-500.00,-100.25,-600.25`),
        mimetype: "text/csv",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockCSVFile);
      expect(result).toHaveLength(2);
    });
  });

  describe("Validation Errors", () => {
    it("should throw error for CSV with missing required fields", () => {
      const mockCSVFile = {
        buffer:
          Buffer.from(`Reference,Account Number,Description,Start Balance,Mutation,End Balance
        ,NL12ABNA3214567890,Salary,1000.00,500.50,1500.50`),
        mimetype: "text/csv",
      } as Express.Multer.File;

      expect(() => statementRecordParser.parse(mockCSVFile)).toThrow(
        "Reference is required",
      );
    });

    it("should throw error for CSV with invalid number fields", () => {
      const mockCSVFile = {
        buffer:
          Buffer.from(`Reference,Account Number,Description,Start Balance,Mutation,End Balance
        abc,NL12ABNA3214567890,Salary,1000.00,500.50,1500.50`),
        mimetype: "text/csv",
      } as Express.Multer.File;

      expect(() => statementRecordParser.parse(mockCSVFile)).toThrow(
        "Reference must be a valid number",
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty CSV file", () => {
      const mockEmptyCSVFile = {
        buffer: Buffer.from(
          "Reference,Account Number,Description,Start Balance,Mutation,End Balance",
        ),
        mimetype: "text/csv",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockEmptyCSVFile);
      expect(result).toHaveLength(0);
    });

    it("should handle CSV with whitespace and extra formatting", () => {
      const mockCSVFile = {
        buffer:
          Buffer.from(`Reference,Account Number,Description,Start Balance,Mutation,End Balance
        1,  NL12ABNA3214567890  ,  Salary  ,1000.00,  500.50  ,1500.50`),
        mimetype: "text/csv",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockCSVFile);
      expect(result).toHaveLength(1);
      expect(result[0].accountNumber).toBe("NL12ABNA3214567890");
      expect(result[0].description).toBe("Salary");
    });
  });
});
