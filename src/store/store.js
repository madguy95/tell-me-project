// src/store.js
import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../plugins/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage
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
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", userCredential.user);
      } catch (error) {
        console.error(error.message);
        throw error; // Handle errors in your component
      }
    },
    logout({ commit }) {
      auth.signOut().then(() => {
        commit("clearUser");
      });
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
