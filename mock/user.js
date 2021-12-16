const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
  },
};

module.exports = [
  // user login
  {
    url: "/user/login",
    type: "post",
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect.",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // get user info
  {
    url: "/user/info.*",
    type: "get",
    response: () => {
      const info = users["admin-token"];

      return {
        code: 20000,
        data: info,
      };
    },
  },

  // user logout
  {
    url: "/user/logout",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },

  // get user routers
  {
    url: "/user/routers",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: [],
      };
    },
  },
];
