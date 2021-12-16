import { constantRoutes } from "@/router";
import { getRouters } from "@a/modules/user";

// 路由懒加载
export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouters) {
  if (Array.isArray(asyncRouters)) {
    return asyncRouters.map((route) => {
      if (route.component) {
        route.component = loadView(route.component);
      }
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRouter(route.children);
      }
      return route;
    });
  } else {
    return [];
  }
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve) => {
      // 向后端请求路由数据
      getRouters().then((res) => {
        const sdata = JSON.parse(JSON.stringify(res.data));
        const routes = filterAsyncRouter(sdata);
        routes.push({ path: "*", redirect: "/404", hidden: true });
        commit("SET_ROUTES", routes);
        resolve(routes);
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
