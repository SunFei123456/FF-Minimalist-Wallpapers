import { create } from "zustand";
const useUserStore = create((set) => ({
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
  setUserInfo: (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    set({ userInfo });
  }, 
}));
// 导出 useUserStore
export { useUserStore };
