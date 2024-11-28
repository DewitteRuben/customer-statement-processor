import { StatementRecord } from "../../../shared/types";

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

  parseCSV(file: Express.Multer.File): StatementRecord[] {
    throw new Error("not yet implemented");
  }

  parseXML(file: Express.Multer.File): StatementRecord[] {
    throw new Error("not yet implemented");
  }
}

const statementParser = new StatementRecordParser();

export default statementParser;
