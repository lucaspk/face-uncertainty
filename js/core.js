(() => {
  const existing = window.FaceUncertainty;
  if (existing && typeof existing === 'object') return;

  window.FaceUncertainty = {
    version: '1.0.0',
    DEBUG: false,
    data: null,
    utils: null,
    storage: null,
    gamification: null,
    app: null
  };
})();
