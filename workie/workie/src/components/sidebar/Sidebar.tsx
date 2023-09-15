import React, { useState } from "react";
import { SidebarHeader } from "./header/index";
import { Notifications } from "./notifications";
import { Conversations } from "./conversations";
import Search from "./search/Search";
import SearchResults from "./search/SearchResults";
import { ContactIcon } from "../../svg";

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // console.log(searchResults);

  return (
    <div className="flex0030 max-w-[30%] h-full select-none sticky left-0 ">
      {/*Sidebar Header*/}
      <SidebarHeader />
      {/*Notifications */}
      <Notifications />
      {/*Search*/}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          {/*Search results*/}
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            
          />
        </>
      ) : (
        <>
          {/*Conversations*/}
          <Conversations />
        </>
      )}
    </div>
  );
}

