const createKeyMapper = () => {
  return {
    map: new Map(),
    addMapping(keystring, callback) {
      this.map.set(keystring, callback);
    },
    listenOn(window) {
      window.document.addEventListener('keydown', (event) => {
        const key = event.code;
        if (this.map.has(key)) {
          this.map.get(key)();
        }
      });
    }
  };
};

export default createKeyMapper;
