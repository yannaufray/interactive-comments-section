<template>
  <div class="new-comment">
    <div class="input-wrapper">
      <textarea
        placeholder="Add a comment..."
        class="comment-input"
        v-model="content"
      ></textarea>
    </div>
    <div class="send">
      <img :src="pic" alt="Profile pic" />
      <button @click="sendReply" class="btn-send">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: String,
      default: "Anonymous",
    },
    pic: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    sendReply: function () {
      if (this.content !== "") {
        this.$emit("send", this.content);
        this.content = "";
      }
    },
  },
};
</script>

<style scoped>
.new-comment {
  margin: 1rem;
  background-color: white;
  border-radius: 0.3rem;
}

.comment-input {
  margin: 1rem;
  border-radius: 0.3rem;
  width: 100%;
  padding: 1rem 1rem 2.5rem;
  border: 0.1rem solid hsl(223, 19%, 93%);
  resize: none;
}

.comment-input:focus {
  outline: none;
  border: 0.1rem solid var(--main-color);
}

.input-wrapper {
  padding-right: 2rem;
}

.send {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.send img {
  width: 2rem;
  height: 2rem;
}
</style>
