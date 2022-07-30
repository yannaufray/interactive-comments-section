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
      this.modalVisible = true;
      this.idToBeDeleted = id;
    },
  },
});
