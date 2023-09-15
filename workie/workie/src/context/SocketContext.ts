import { createContext, Context } from "react";
import { Socket } from "socket.io-client";

// אם אתה לא יודע אילו פרופרטיס יהיו בsocket, אתה יכול להשתמש בכל סוג של Socket
const SocketContext: Context<Socket | undefined> = createContext<Socket | undefined>(undefined);

export default SocketContext;
