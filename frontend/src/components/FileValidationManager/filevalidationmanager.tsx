import { useState } from "react";
import FileInput from "../FileInput/fileinput";
import Button from "../Button/button";
import statementProcessorApi, {
  StatementProcessorAPIError,
} from "../../api/api";
import { StatementRecordValidationResult } from "@customer-statement-processor/shared";

type FileValidationMananagerProps = {
  onValidate?: (statementRecords: StatementRecordValidationResult) => void;
};

const FileValidationMananager: React.FC<FileValidationMananagerProps> = ({
  onValidate,
}) => {
  const [file, setFile] = useState<File | null>();

  const onValidateClick = async () => {
    if (!file) return;

    try {
      const data = await statementProcessorApi.validate(file);
      if (onValidate) {
        onValidate(data);
      }
    } catch (error) {
      if (error instanceof StatementProcessorAPIError) {
        alert(`An error has occurred: ${error.message}`);
        return;
      }

      alert("Failed to reach validation service");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <FileInput
          onFileSelect={setFile}
          name="statement_record"
          accept=".csv, .xml"
        />
      </div>
      <Button
        onClick={onValidateClick}
        disabled={!file}
        text="Validate records"
      />
    </div>
  );
};

export default FileValidationMananager;
