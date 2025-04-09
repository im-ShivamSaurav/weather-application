import React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  onSearch: (query: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ onSearch, query, setQuery }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query.trim());
       // Optional: Clear input after search
    }
  };

  return (
    <div className="w-full pt-[14vh] px-4 pb-6 relative">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto px-2"
      >
        <div
          className="flex items-center justify-between px-5 py-3 rounded-full 
                     bg-white/50 dark:bg-white/5 backdrop-blur-md 
                     ring-1 ring-gray-400 dark:ring-white/20 shadow-md
                     focus-within:ring-2 focus-within:ring-blue-400 
                     dark:focus-within:ring-blue-300 transition duration-300"
        >
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-gray-800 dark:text-white 
                       placeholder:text-gray-600 dark:placeholder:text-gray-300 
                       focus:outline-none text-base sm:text-lg"
          />
          <button type="submit">
            <FiSearch className="text-gray-700 dark:text-white text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
