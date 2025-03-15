/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

function Navbar({ title, onSearch, onAdd, children }) {
  const [filterBy, setFilterBy] = useState("name"); // Default filter option
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch && onSearch(e.target.value, filterBy);
  };

  return (
    <div className=" sticky mx-auto  max-w-screen-xl px-2.5 md:px-20 h-14 inset-x-0 top-0 z-30 w-full mb-20  backdrop-blur-lg transition-all  pt-10 flex items-center justify-between ">
      <h3 className="text-xl">{title}</h3>
      {children}
    </div>
  );
}

export default Navbar;
