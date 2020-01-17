import { Api } from './Api';

const uriIVR = '/IVR/Calls';
const IVRCallsExpiryInMinutes = 60; //minutes

export class ApiIVRCalls extends Api {
  async callIVR(params = {}) {
    let customer;
    try {
      const response = await this._getCached(uriIVR, params, IVRCallsExpiryInMinutes, true);
      const idRandom = Math.floor(Math.random() * 3) + 1; 
      console.log(idRandom);
      
      const call = response.find(item => item.call_Id === idRandom);

      customer = call;
    } catch (err) {}
    return customer;
  }
}

const apiIVRCalls = new ApiIVRCalls();
export default apiIVRCalls;
