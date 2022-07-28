import { defineStore } from "pinia";
import data from "../../data.json";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      currentUser: data.currentUser,
      userChanging: false,
      profiles: [
        {
          name: "amyrobson",
          pic: require("../assets/images/avatars/image-amyrobson.png"),
        },
        {
          name: "maxblagun",
          pic: require("../assets/images/avatars/image-maxblagun.png"),
        },
        {
          name: "ramsesmiron",
          pic: require("../assets/images/avatars/image-ramsesmiron.png"),
        },
        {
          name: "juliusomo",
          pic: require("../assets/images/avatars/image-juliusomo.png"),
        },
      ],
    };
  },
  getters: {
    pic: (state) =>
      require(`../assets/images/avatars/image-${state.currentUser.username}.png`),
  },
  actions: {
    getCurrentUserPicture() {
      this.pic = require(`../assets/images/avatars/image-${this.currentUser.username}.png`);
    },
    changeCurrentProfile(profile) {
      this.currentUser = {
        image: {
          png: `./images/avatars/image-${profile.name}.png`,
          webp: `./images/avatars/image-${profile.name}.webp`,
        },
        username: `${profile.name}`,
      };

      this.userChanging = true;
      setTimeout(() => {
        this.userChanging = false;
      }, 700);
    },
  },
});
