import axios from "axios";
import { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import { tokenToString } from "typescript";


interface UserResponse {}

interface SearchProps {
  searchLength: number;
  setSearchResults: (data: UserResponse[]) => void;
}

export default function Search({ searchLength, setSearchResults }: SearchProps) {
  const [show, setShow] = useState(false);


  const handleSearch = async (e:any) => {
    console.log(e.target.value)
    if (e.target.value && e.key === "Enter") {
      try {
        const response = await axios.get("/api/v1/auth/getToken");
        const token = response.data;
        console.log(token)
        console.log(`/api/v1/user/?search=${e.target.value}`)
        const { data } = await axios.get(
          `/api/v1/user/?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(data);
        console.log(data)
        
      } catch (error: any) {
        console.log(error);
        console.log(error.response?.data?.error?.message);
        setSearchResults([]);
      }
    }
  };


   return (
    <div className="h-[49px] py-1.5">
      {/*Container*/}
      <div className="px-[10px]">
        {/*Search input container*/}
        <div className="flex items-center gap-x-2">
          <div className="  w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center cursor-pointer"
              onClick={()=>setSearchResults([])}>
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="search or start a new chat "
              className="input border-none "
              onFocus={() => setShow(true)}
              onBlur={() => searchLength == 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
            <button className="dark:bg-dark_bg_2 border-0 btn">
              <FilterIcon className={"dark:fill-dark_svg_1"} />
          </button>
        </div>
      </div>
    </div>
  );
}
