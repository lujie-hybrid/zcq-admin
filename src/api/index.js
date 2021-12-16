import camelCase from "lodash/camelCase";

const install = (Vue) => {
  let result = {};
  const requireComponent = require.context(
    // 其组件目录的相对路径
    "./modules",
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /\w+\.js$/
  );

  requireComponent.keys().forEach((fileName) => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 获取组件的 PascalCase 命名
    const componentName = camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    );
    result[componentName] = componentConfig.default || componentConfig;
    Vue.prototype.$api = result;
  });
};

export default {
  install,
};
