import { Api } from './Api';

const uriIVR = '/IVR/Calls';
const IVRCallsExpiryInMinutes = 60; //minutes

export class ApiIVRCalls extends Api {
  async callIVR(params = {}) {
    let customer;
    try {
      const response = await this._getCached(uriIVR, params, IVRCallsExpiryInMinutes, true);

      
      const call = response.find(item => item.call_Id === 1);

      customer = call;
    } catch (err) {}
    return customer;
  }
}

const apiIVRCalls = new ApiIVRCalls();
export default apiIVRCalls;
