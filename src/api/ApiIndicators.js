import { Api } from './Api';

const uriIndicators = '/Indicators/find';

export class ApiIndicators extends Api {
  async callIndicators(params = {}) {
    let indicatorObject;
    try {
      const response = await this._get(uriIndicators, params);
    } catch (err) {}
    return indicatorObject;
  }
}

const apiIndicators = new ApiIndicators();
export default apiIndicators;
