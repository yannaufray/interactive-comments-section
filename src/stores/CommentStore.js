import { defineStore } from "pinia";
import data from "../../data.json";
import { formatDistanceToNow } from "date-fns";
import { useAppStore } from "./AppStore";

export const useCommentStore = defineStore("CommentStore", {
  state: () => {
    return {
      comments: data.comments,
      answeredCommentId: null,
      userAnswered: "",
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
      // await fetch("http://localhost:5000/comments/", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(reply),
      // });
    },
    handleClickOnReply: function (answeredComment) {
      // Toggling off the bottom comment input box
      const appStore = useAppStore();

      // Ttoggling off if another click on 'reply' happens
      if (
        appStore.isReplying === true &&
        this.answeredCommentId === answeredComment.id
      ) {
        appStore.isReplying = false;
        return;
      }

      appStore.isReplying = true;
      // Setting id to display input box bellow the right comment
      this.answeredCommentId = answeredComment.id;

      // Setting userAnswered to get the @username tag
      this.userAnswered = answeredComment.user.username;
    },
    addReplyToComment: async function (reply) {
      // Updating the DOM

      this.comments.map((com) => {
        if (com.id === this.answeredCommentId) {
          com.replies.push(reply);
          // Updating the data with one more reply
          // this.patchComment(com);
        } else {
          com.replies.map((rep) => {
            if (rep.id === this.answeredCommentId) {
              rep.hasOwnProperty("replies")
                ? rep.replies.push(reply)
                : (rep.replies = [reply]);
            }
          });
        }
      });
    },
    deleteComment: async function (id) {
      const deleteCommentFromArr = function (arr, id) {
        arr.map((item) => {
          if (item.id === id) arr.splice(arr.indexOf(item), 1);
          if (item.replies) deleteCommentFromArr(item.replies, id);
        });
      };

      deleteCommentFromArr(this.comments, id);

      // The following works but just for top-level comments. For multiple-level arrays, we need recursion.
      // this.comments = this.comments.filter((el) => el.id !== id);
    },
  },
});
