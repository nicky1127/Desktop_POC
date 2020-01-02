import moment from 'moment';

let storage = {};

export class Cache {
  constructor(store = null) {
    this.store = store ? store : window.localStorage ? window.localStorage : null;
  }

  getItem(id) {
    let result = null;
    const val = this.store.getItem(id);

    if (val) {
      let { cache, expiryTimestamp } = JSON.parse(val);
      const now = moment();

      //check expiry
      if (0 === expiryTimestamp) {
      } else if (expiryTimestamp <= now.unix()) {
        cache = null;
        this.removeItem(id);
      }
      result = cache;
    }
    return result;
  }

  setItem(id, cache, expiryMinutes = 1440) {
    const expiryDate = moment().add(expiryMinutes, 'minutes');
    const expiryTimestamp = expiryMinutes ? expiryDate.unix() : 0;
    const val = { cache, expiryTimestamp };
    return this.store.setItem(id, JSON.stringify(val));
  }

  removeItem(id) {
    return this.store.removeItem(id);
  }

  clear() {
    return this.store.clear();
  }

  length() {
    if ('length' in this.store) {
      if (typeof this.store.length === 'function') {
        return this.store.length();
      } else {
        return this.store.length;
      }
    }
    return 0;
  }
  key(idx) {
    return this.store.key(idx);
  }
}

const store = window.localStorage;
const cache = new Cache(store);

export default cache;
