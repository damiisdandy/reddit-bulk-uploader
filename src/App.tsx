import Print from "./components/Print/Print";
import Uploader from "./components/Uploader/Uploader";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const entities = useSelector((state: RootState) => state.entities);
  return (
    <div className="flex flex-col xl:flex-row items-start justify-center py-4 h-auto xl:h-[70vh] w-screen">
      <div className="w-full xl:w-1/2 h-[inherit] flex flex-col items-center justify-center xl:border-r-4 border-dashed">
        <Uploader />
      </div>
      <div
        className={`w-full xl:w-1/2 h-[inherit] flex items-center justify-center  flex-col overflow-y-scroll ${
          entities.length === 0
            ? "xl:items-center justify-center"
            : "xl:items-start xl:justify-start"
        }`}
      >
        {entities.length > 0 ? (
          <Print entities={entities} />
        ) : (
          <p className="text-gray-500 text-center w-full font-bold">
            Upload your CSV file to get started :)
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
