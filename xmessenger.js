/**
 * Version: 1.0.0
 * Date: 2023-03-09
 */
const XMessenger = class {
  /** @type {WebSocket} */
  #socket;
  /** @type {Object} */
  #settings;
  /** @type {Object.<string, Function>} */
  #contexts;

  /**
   * @param {WebSocket} socket
   * @param {Object} [settings]
   * @param {Object.<string, Function>} [contexts]
   */
  constructor (socket, settings = {}, contexts = {}) {
    this.socket = socket;
    this.settings = settings;
    this.contexts = contexts;
  }


  /** @type {WebSocket} */
  get socket () { return this.#socket; }
  set socket (socket) { this.#socket = socket; }

  /** @type {Object} */
  get settings () { return this.#settings; }
  set settings (settings) {
    const defaults = {
      transmit: true,
      receive: true
    };

    this.#settings = { ...defaults, ...settings };
  }

  /** @type {Object.<string, Function>} */
  get contexts () { return this.#contexts; }
  set contexts (contexts) {
    const defaults = {
      void: (/* data, options */) => { /* void */ }
    };

    this.#contexts = { ...defaults, ...contexts };
  }


  /**
   * @param {string} context
   * @returns {Function}
   */
  getContext (context) { return (this.contexts[context] ?? this.contexts.void); }

  /**
   * @param {string} context
   * @param {Function} run
   * @returns {undefined}
   */
  setContext (context, run) { this.contexts[context] = run; }


  /**
   * @param {XMessage} xmessage
   * @returns {undefined}
   */
  send (xmessage) {
    if (this.settings.transmit) this.socket.send( JSON.stringify(xmessage) );
  }

  /**
   * @param {XMessage} xmessage
   * @returns {*}
   */
  message (xmessage) {
    if (this.settings.receive) {
      return this.getContext(xmessage.context)(
        xmessage.data,
        xmessage.options
      );
    }
  }
};


export default XMessenger;
