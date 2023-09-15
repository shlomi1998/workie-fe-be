
export const getConversationId = (user: any, users: any):any => {
  if (!users || users.length < 2) return null;
  return users[0]._id === user.id ? users[0]._id : users[1]._id;
};

export const getConversationName = (user: any, users: any):any => {
  if (!users || users.length < 2) return '';
  return users[0]._id === user.id ? users[0].firstName
  : users[1].firstName
  ;
};

export const getConversationPicture = (user: any, users: any):any => {
  if (!users || users.length < 2) return '';
  return users[0]._id === user.id ? users[0].ImageSource
  : users[1].ImageSource;
};

// export const checkOnlineStatus = (onlineUsers:any, user:any, users:any) => {
//   let convoId = getConversationId(user, users);
//   let check = onlineUsers.find((u:any) => u.userId === convoId);
//   return check ? true : false;
// };
