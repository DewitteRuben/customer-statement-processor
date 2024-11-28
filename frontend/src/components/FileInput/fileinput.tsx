import { useState } from "react";

type FileInputProps = {
  onFileSelect?: (file: File) => void;
};

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
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

  return (
    <div className="flex gap-6 items-center">
      {file && (
        <section>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}
      <label
        htmlFor="file_input"
        role="button"
        className="p-12 border-dotted border-2 border-orange-600"
      >
        Drag & Drop or Click to upload a file
        <input
          className="hidden"
          id="file_input"
          onChange={onFileChange}
          type="file"
        />
      </label>
    </div>
  );
};

export default FileInput;
