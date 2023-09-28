import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { TraingleIcon } from "../../../../../svg";

export default function ChatMessages() {
  const { messages } = useSelector((state: any) => state.chat);
  const { user } = useSelector((state: any) => state.user);
  const endRef: any = useRef();
 useEffect(() => {
    scrollToUserBottom();
  }, [messages]);
  const scrollToUserBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return ( 
    <div
      className="mb-[60px] bg-[url('https://petbest.co.il/wp-content/uploads/2021/01/%D7%97%D7%AA%D7%95%D7%9C-%D7%A1%D7%99%D7%91%D7%99%D7%A8%D7%99.jpg')]
    bg-cover bg-no-repeat
    "
    >
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {messages &&
          messages.map((message: any) => (
            <Message
              message={message}
              key={message._id}
              me={user.id === message.sender._id}
            />
          ))}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
}
  


// import React, { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import Message from "./Message";

// export default function ChatMessages() {
//   const [catImage, setCatImage] = useState<string | null>(null);
//   const { messages } = useSelector((state: any) => state.chat);
//   const { user } = useSelector((state: any) => state.user);
//   const endRef: any = useRef();

//   useEffect(() => {
//     fetch("https://api.thecatapi.com/v1/images/search")
//       .then(response => response.json())
//       .then(data => {
//         if (data && data.length > 0) {
//           setCatImage(data[0].url);
//         }
//       });
//   }, []);

//   useEffect(() => {
//     scrollToUserBottom();
//   }, [messages]);

//   const scrollToUserBottom = () => {
//     endRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   return ( 
//     <div
//       className="mb-[60px] bg-cover bg-no-repeat"
//       style={{ backgroundImage: `url(${catImage})` }}
//     >
//       <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
//         {messages &&
//           messages.map((message: any) => (
//             <Message
//               message={message}
//               key={message._id}
//               me={user.id === message.sender._id}
//             />
//           ))}
//         <div className="mt-2" ref={endRef}></div>
//       </div>
//     </div>
//   );
// }
