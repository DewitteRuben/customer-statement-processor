import { StatementRecord } from "@customer-statement-processor/shared";
import { parse as CSVParser } from "csv-parse/sync";
import { RawCSVRecordArraySchema, transformCSVRecord } from "./csv";
import { RawXMLRecordArraySchema, transformXMLRecord } from "./xml";
import { XMLParser } from "fast-xml-parser";

export class StatementRecordParser {
  parse(file: Express.Multer.File): StatementRecord[] {
    switch (file.mimetype) {
      case "text/csv": {
        return this.parseCSV(file);
      }
      case "text/xml": {
        return this.parseXML(file);
      }
      default:
        throw new Error("unsupported mimetype");
    }
  }

  private parseCSV(file: Express.Multer.File): StatementRecord[] {
    const unvalidatedRecords = CSVParser(file.buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const records = RawCSVRecordArraySchema.parse(unvalidatedRecords);
    const transformedRecord = records.map(transformCSVRecord);

    return transformedRecord;
  }

  private parseXML(file: Express.Multer.File): StatementRecord[] {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      numberParseOptions: {
        eNotation: false,
        hex: false,
        leadingZeros: false,
        skipLike: new RegExp(".*"),
      },
    });

    const unvalidatedRecords = parser.parse(file.buffer);

    if (
      unvalidatedRecords?.records?.record !== undefined &&
      !Array.isArray(unvalidatedRecords.records.record)
    ) {
      unvalidatedRecords.records.record = [unvalidatedRecords.records.record];
    }

    const { records } = RawXMLRecordArraySchema.parse(unvalidatedRecords);
    const transformedRecords = records.record.map(transformXMLRecord);
    return transformedRecords;
  }
}

const statementRecordParser = new StatementRecordParser();

export default statementRecordParser;
