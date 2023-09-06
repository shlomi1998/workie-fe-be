import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Contact} from "./index";

type SearchResultsProps = {
  searchResults: any[];
  setSearchResults: (results: any[]) => any;
};

export default function SearchResults({ searchResults, setSearchResults }: SearchResultsProps) {
  // ... rest of the code remains unchanged

  return (
    <div className="w-full convos scrollbar">
      <div>
        {/*Heading*/}
        <div className=" flex flex-col px-4 pt-4">
          <span className="text-2xl  pb-2 w-full text-green_2">Contacts</span>
        </div>
        {/*Results*/}
        <ul>
          {searchResults &&
            searchResults.map((user) => (
              <Contact
                contact={user}
                key={user._id}
                setSearchResults={setSearchResults}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
