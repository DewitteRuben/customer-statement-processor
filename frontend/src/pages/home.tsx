import { useState } from "react";
import FileValidationMananager from "../components/FileValidationManager/filevalidationmanager";
import { StatementRecordValidationResult } from "@customer-statement-processor/shared";
import { StatementRecordList } from "../components/StatementRecordList/statementrecordlist";

const Home = () => {
  const [statementRecords, setStatementRecords] =
    useState<StatementRecordValidationResult>({ errors: [], records: [] });

  return (
    <div className="container mx-auto flex flex-col items-center mt-6">
      <h1 className="text-3xl font-bold mb-4">Customer Statement Validator</h1>
      <FileValidationMananager onValidate={setStatementRecords} />
      <div className="mt-6">
        <StatementRecordList validationResult={statementRecords} />
      </div>
    </div>
  );
};

export default Home;
