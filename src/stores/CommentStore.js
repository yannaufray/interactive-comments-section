import { defineStore } from "pinia";
import data from "../../data.json";
import { formatDistanceToNow } from "date-fns";

export const useCommentStore = defineStore("CommentStore", {
  state: () => {
    return {
      comments: data.comments,
    };
  },
  getters: {},
  actions: {
    formattedDate: (comment) => {
      const date = new Date(comment.createdAt);
      return formatDistanceToNow(date, { addSuffix: true });
    },
    addNewComment: async function (reply) {
      // Updating the DOM
      this.comments.push(reply);

      // Posting the new data
      await fetch("http://localhost:5000/comments/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reply),
      });
    },
    addReplyToComment: async function (reply) {
      // Updating the DOM
      const comIndex = this.comments.findIndex(
        (com) => com.id === this.replyingId
      );
      this.comments[comIndex].replies.push(reply);

      // Updating the data with one more reply
      this.patchComment(this.comments[comIndex]);

      // Resets
      this.replying = false;
      this.replyingTo = undefined;
    },
    deleteComment: async function (id) {
      const comment = this.comments.find((com) => com.id === id);

      fetch(`http://localhost:5000/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      this.comments = this.comments.filter((el) => el.id !== id);
    },
    deleteReplyToComment: async function (id) {
      const comment = this.comments.find((com) =>
        com.replies.some((reply) => reply.id === id)
      );
      const toDeletedId = comment.replies.filter((el) => el.id === id);
      comment.replies.splice(comment.replies.indexOf(toDeletedId), 1);

      this.patchComment(comment);
    },
    patchComment: function (comment) {
      fetch(`http://localhost:5000/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(comment),
      });
    },
  },
});
