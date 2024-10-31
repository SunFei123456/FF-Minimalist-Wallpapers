// 获取用户的id from localStorage
export const getUserId = () => {
  const uid = JSON.parse(localStorage.getItem("userInfo"))?.user_id;
  console.log("uid", uid);
  
  if(uid == undefined) return false;
  return uid;
};