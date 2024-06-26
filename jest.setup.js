global.setImmediate =
  global.setImmediate ||
  ((fn, ...args) => {
    return setTimeout(fn, 0, ...args);
  });
