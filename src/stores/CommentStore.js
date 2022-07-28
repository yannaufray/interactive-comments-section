import { defineStore } from "pinia";
import comments from "../../data.json";

export const useCommentStore = defineStore("CommentStore", {
  state: () => {
    return {
      comments,
    };
  },
});
