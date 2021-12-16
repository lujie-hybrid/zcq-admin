import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";

// 初始化样式
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// elementui的引入
import "@/plugins/elementui";

// 全局样式
import "@/styles/index.scss";

// 接口api的引入
import Api from "@a";
Vue.use(Api);

// 通用组件的注册
import BaseComp from "@comp";
Vue.use(BaseComp);

// filter的引入
import "@u/filter";

// 权限的引入
import "@/permission";

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
