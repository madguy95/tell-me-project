// loader.js
import Vue from "vue";
import Loader from "../components/Loader/Loader";

const LoaderConstructor = Vue.extend(Loader);
let loaderInstance;

export default {
  install(Vue) {
    function showLoader({ opacity = 0.6, isFullPage = true } = {}) {
      if (!loaderInstance) {
        loaderInstance = new LoaderConstructor({
          el: document.createElement("div"),
        });
        document.body.appendChild(loaderInstance.$el);
      }
      loaderInstance.opacity = opacity;
      loaderInstance.isFullPage = isFullPage;
      loaderInstance.visible = true;
    }

    function hideLoader() {
      if (loaderInstance) {
        loaderInstance.visible = false;
      }
    }

    Vue.prototype.$showGlobalLoader = showLoader;
    Vue.prototype.$hideGlobalLoader = hideLoader;
  },
};
