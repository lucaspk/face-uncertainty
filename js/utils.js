(() => {
  const ns = window.FaceUncertainty || (window.FaceUncertainty = {});

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function safeJsonParse(text, fallback) {
    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function on(target, event, handler, options) {
    if (!target) return () => {};
    target.addEventListener(event, handler, options);
    return () => target.removeEventListener(event, handler, options);
  }

  ns.utils = {
    qs,
    qsa,
    byId,
    clamp,
    safeJsonParse,
    isPlainObject,
    on
  };
})();
