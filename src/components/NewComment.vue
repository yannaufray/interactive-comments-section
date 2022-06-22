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
      <img src="../assets/images/avatars/image-amyrobson.png" alt="" />
      <button @click="sendReply" class="btn-send">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    sendReply: function () {
      const newReply = {
        content: this.content,
      };
      this.$emit("send", newReply);
    },
  },
};
</script>

<style>
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
  border: 0.1rem solid hsl(238, 40%, 52%);
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

.btn-send {
  padding: 0.8rem 1.5rem;
  background-color: hsl(238, 40%, 52%);
  border-radius: 0.5rem;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
}
</style>
