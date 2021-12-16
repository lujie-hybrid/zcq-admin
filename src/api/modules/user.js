import { postAction, getAction } from "../action";

export const login = (data) => postAction("/user/login", data);

export const getInfo = (params) => getAction("/user/info", params);

export const logout = (data) => postAction("/user/logout", data);

export const getRouters = (params) => getAction("/user/routers", params);
