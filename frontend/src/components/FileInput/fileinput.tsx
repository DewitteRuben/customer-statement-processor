import { useState } from "react";

type FileInputProps = {
  onFileSelect?: (file: File | null) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const FileInput: React.FC<FileInputProps> = ({ onFileSelect, ...rest }) => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (onFileSelect) {
        onFileSelect(selectedFile);
      }
    }
  };

  const onHandleClearFile = () => {
    setFile(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div className="flex gap-6 items-center">
      {file && (
        <section className="relative">
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
          <span
            onClick={onHandleClearFile}
            className="absolute -top-3 -right-2 hover:cursor-pointer"
          >
            X
          </span>
        </section>
      )}
      {!file && (
        <label
          htmlFor="file_input"
          role="button"
          className="p-4 border-dotted border-2 border-orange-600"
        >
          Click to upload a file
          <input
            className="hidden"
            id="file_input"
            onChange={onFileChange}
            type="file"
            {...rest}
          />
        </label>
      )}
    </div>
  );
};

export default FileInput;
