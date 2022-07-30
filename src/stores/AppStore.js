import { defineStore } from "pinia";

export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      replying: false,
    };
  },
});
