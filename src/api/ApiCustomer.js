import { Api } from './Api';

const uriCustomer = '/customer/Info';
const settingsExpiryInMinutes = 60; //minutes

export class ApiCustomer extends Api {
  async customerInfo(params = {}) {
    let customer;
    try {
      const response = await this._getCached(uriCustomer, params, settingsExpiryInMinutes, true);
      customer = response.data;
    } catch (err) {}
    return customer;
  }
}

const apiCustomer = new ApiCustomer();
export default apiCustomer;