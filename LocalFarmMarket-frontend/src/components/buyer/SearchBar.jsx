import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-container">
      <h2>Search Products</h2>
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
};

export default Search;
