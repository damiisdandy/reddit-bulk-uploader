import Uploader from "./components/Layout/Uploader/Uploader";

function App() {
  return (
    <div className="flex flex-col xl:flex-row items-start justify-center py-4 h-auto xl:h-[70vh] w-screen">
      <div className="w-full h-[inherit] flex flex-col items-center justify-center">
        <Uploader />
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default App;
