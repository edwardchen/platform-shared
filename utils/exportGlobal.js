const exportGlobal = (path, obj) => {
  global[path] = obj;
};

export default exportGlobal;
