import { create } from 'zustand';

const useStore = create((set) => ({
  theme: localStorage.getItem("theme") ?? "dark",

  setTheme: (value)=> set({theme: value }),
  
}));

export default useStore;