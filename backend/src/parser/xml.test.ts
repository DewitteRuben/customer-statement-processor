import Decimal from "decimal.js";
import { Buffer } from "buffer";
import { ZodError } from "zod";
import statementRecordParser from "./parser";

export const isZodError = (value: unknown): value is ZodError =>
  value instanceof ZodError;

describe("StatementParser - XML Parsing", () => {
  describe("Happy Path", () => {
    it("should successfully parse a valid XML file", () => {
      const mockXMLFile = {
        buffer: Buffer.from(`<records>
          <record>
            <reference>1</reference>
            <accountNumber>NL12ABNA3214567890</accountNumber>
            <description>Salary</description>
            <startBalance>1000.00</startBalance>
            <mutation>500.50</mutation>
            <endBalance>1500.50</endBalance>
          </record>
        </records>`),
        mimetype: "text/xml",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockXMLFile);
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

    it("should handle XML with multiple records", () => {
      const mockXMLFile = {
        buffer: Buffer.from(`<records>
          <record reference="1">
            <accountNumber>NL12ABNA3214567890</accountNumber>
            <description>Salary</description>
            <startBalance>1000.00</startBalance>
            <mutation>500.50</mutation>
            <endBalance>1500.50</endBalance>
          </record>
          <record reference="2">
            <accountNumber>NL87INGB4567890123</accountNumber>
            <description>Expense</description>
            <startBalance>-500.00</startBalance>
            <mutation>-100.25</mutation>
            <endBalance>-600.25</endBalance>
          </record>
        </records>`),
        mimetype: "text/xml",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockXMLFile);
      expect(result).toHaveLength(2);
    });
  });

  // Validation Error Tests
  describe("Validation Errors", () => {
    it("should throw error for XML with missing required fields", () => {
      const mockXMLFile = {
        buffer: Buffer.from(`<records>
          <record reference="">
            <accountNumber>NL12ABNA3214567890</accountNumber>
            <description>Salary</description>
            <startBalance>1000.00</startBalance>
            <mutation>500.50</mutation>
            <endBalance>1500.50</endBalance>
          </record>
        </records>`),
        mimetype: "text/xml",
      } as Express.Multer.File;

      expect(() => statementRecordParser.parse(mockXMLFile)).toThrow(
        "Reference is required",
      );
    });

    it("should throw error for XML with invalid number fields", () => {
      const mockXMLFile = {
        buffer: Buffer.from(`<records>
          <record reference="abc">
            <accountNumber>NL12ABNA3214567890</accountNumber>
            <description>Salary</description>
            <startBalance>1000.00</startBalance>
            <mutation>500.50</mutation>
            <endBalance>1500.50</endBalance>
          </record>
        </records>`),
        mimetype: "text/xml",
      } as Express.Multer.File;

      expect(() => statementRecordParser.parse(mockXMLFile)).toThrow(
        "Reference must be a valid number",
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty XML file", () => {
      const mockEmptyXMLFile = {
        buffer: Buffer.from("<records></records>"),
        mimetype: "text/xml",
      } as Express.Multer.File;

      try {
        statementRecordParser.parse(mockEmptyXMLFile);
      } catch (error) {
        expect(isZodError(error));
      }
    });

    it("should handle an arbitrirary XML file", () => {
      const mockEmptyXMLFile = {
        buffer: Buffer.from("<test></test>"),
        mimetype: "text/xml",
      } as Express.Multer.File;

      try {
        statementRecordParser.parse(mockEmptyXMLFile);
      } catch (error) {
        expect(isZodError(error));
      }
    });

    it("should handle XML with extra XML attributes", () => {
      const mockXMLFile = {
        buffer: Buffer.from(`<records version="1.0">
          <record reference="1">
            <accountNumber>NL12ABNA3214567890</accountNumber>
            <description>Salary</description>
            <startBalance>1000.00</startBalance>
            <mutation>500.50</mutation>
            <endBalance>1500.50</endBalance>
          </record>
        </records>`),
        mimetype: "text/xml",
      } as Express.Multer.File;

      const result = statementRecordParser.parse(mockXMLFile);
      expect(result).toHaveLength(1);
    });
  });
});
