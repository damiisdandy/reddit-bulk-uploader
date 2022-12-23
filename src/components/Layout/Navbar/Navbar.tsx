import { BsReddit } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="px-4 py-2 border-b-2 bg-white">
      <div className="flex items-center gap-2">
        <BsReddit className="text-4xl text-brand-100" />
        <p className="text-lg font-bold">Reddit Ads</p>
      </div>
    </div>
  );
}
