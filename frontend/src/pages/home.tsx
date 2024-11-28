import FileValidationMananager from "../components/FileValidationManager/filevalidationmanager";

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-4">
        Rabobank Customer Statement Validator
      </h1>
      <FileValidationMananager />
    </div>
  );
};

export default Home;
