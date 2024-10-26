// src/store.js
import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../plugins/firebaseConfig";
import {
  signInWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  signInAnonymously,
} from "firebase/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage
    testerInfo: JSON.parse(localStorage.getItem("testerInfo")) || {
      userType: "A",
      age: 18,
      gender: "M",
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // Save to localStorage
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
    setTesterInfo(state, testerInfo) {
      state.testerInfo = testerInfo
      localStorage.setItem("testerInfo", JSON.stringify(testerInfo))
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        let userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (auth.currentUser.isAnonymous) {
          userCredential = await linkWithCredential(
            auth.currentUser,
            EmailAuthProvider.credential(email, password)
          );
        }
        commit("setUser", userCredential.user);
      } catch (error) {
        console.error(error.message);
        throw error; // Handle errors in your component
      }
    },
    async loginAnonymously({ commit }) {
      try {
        let userCredential = await signInAnonymously(auth);
        commit("setUser", userCredential.user);
      } catch (error) {
        console.error(error.message);
        throw error; // Handle errors in your component
      }
    },

    async logout({ commit }) {
      await auth.signOut();
      commit("clearUser");
    },

    setTesterInfo({ commit }, testerInfo) {
      commit("setTesterInfo", testerInfo);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
  },
});
