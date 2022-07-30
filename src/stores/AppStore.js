import { defineStore } from "pinia";

export const useAppStore = defineStore("AppStore", {
  state: () => {
    return {
      isReplying: false,
      modalVisible: false,
      idToBeDeleted: null,
    };
  },
  actions: {
    displayDeleteModal(id) {
      this.idToBeDeleted = id;
      this.modalVisible = true;
    },
  },
});
