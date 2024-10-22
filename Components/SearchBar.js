import { CgSearch } from 'react-icons/cg';

export default function SearchBar({ placeholder }) {
  return (
    <div className="relative flex items-center w-4/6">
      <input
        className="w-full h-8 pl-10 pr-3 rounded-full border-none outline-none focus:ring focus:ring-green-500 transition-all"
        type="text"
        placeholder={placeholder}
      />
      <button className="absolute rounded-full p-2 flex justify-center items-center">
        <CgSearch className="text-xl" />
      </button>
    </div>
  );
}
