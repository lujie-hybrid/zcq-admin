import { login, logout, getInfo } from "@a/modules/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((res) => {
          const user = res.data;
          if (res.roles && res.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            commit("SET_ROLES", res.roles);
          } else {
            commit("SET_ROLES", ["ROLE_DEFAULT"]);
          }
          commit("SET_NAME", user.userName);
          commit("SET_AVATAR", user.avatar);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 后端登出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 前端登出
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("SET_TOKEN", "");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
