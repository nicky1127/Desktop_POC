import { Api } from './Api';

const uriIVR= '/IVR/Calls';
const IVRCallsExpiryInMinutes = 60; //minutes

export class ApiIVRCalls extends Api {
  async callsIVR(params = {}) {
    let calls;
    try {
      const response = await this._getCached(
        uriIVR,
        params,
        IVRCallsExpiryInMinutes,
        true
      );
      calls = response;
    } catch (err) {}
    return calls;
  }
}

const apiIVRCalls = new ApiIVRCalls();
export default apiIVRCalls;