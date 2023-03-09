const XMessage = class {
  /** @type {string} */
  static type = "XMessage";
  /** @type {string} */
  static version = "1.0.0";

  /** @member {string} */
  #type;
  /** @member {string} */
  #version;
  /** @member {number} */
  #time;

  /** @member {string} */
  #context;
  /** @member {*} */
  #data;
  /** @member {Object} */
  #options;

  /**
   * @param {string} context
   * @param {*} [data]
   * @param {Object} [options]
   */
  constructor (context, data = {}, options = {}) {
    this.type = XMessage.type;
    this.version = XMessage.version;
    this.time = Date.now();

    this.context = context;
    this.data = data;
    this.options = options;
  }


  /** @member {string} */
  get type () { return this.#type; }
  set type (type) { this.#type = type; }

  /** @member {string} */
  get version () { return this.#version; }
  set version (version) { this.#version = version; }

  /** @member {number} */
  get time () { return this.#time; }
  set time (time) { this.#time = time; }


  /** @member {string} */
  get context () { return this.#context; }
  set context (context) { this.#context = context; }

  /** @member {*} */
  get data () { return this.#data; }
  set data (data) { this.#data = data; }

  /** @member {Object} */
  get options () { return this.#options; }
  set options (options) { this.#options = options; }


  /**
   * @returns {Object}
   */
  toJSON () {
    return {
      type: this.type,
      version: this.version,
      time: this.time,

      context: this.context,
      data: this.data,
      options: this.options
    };
  }
};


export default XMessage;
