import { useState } from "react";
import FileValidationMananager from "../components/FileValidationManager/filevalidationmanager";
import { StatementRecordValidationResult } from "../../../shared/types";
import { StatementRecordList } from "../components/StatementRecordList/statementrecordlist";

const Home = () => {
  const [statementRecords, setStatementRecords] =
    useState<StatementRecordValidationResult>({ errors: [], records: [] });

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Rabobank Customer Statement Validator
      </h1>
      <FileValidationMananager onValidate={setStatementRecords} />
      <div>
        <StatementRecordList validationResult={statementRecords} />
      </div>
    </div>
  );
};

export default Home;
