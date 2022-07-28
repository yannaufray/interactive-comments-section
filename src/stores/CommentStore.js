import { defineStore } from "pinia";
import data from "../../data.json";

export const useCommentStore = defineStore("CommentStore", {
  state: () => {
    return {
      comments: data.comments,
    };
  },
});
