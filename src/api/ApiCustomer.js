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

  async getCustomerByAccount(Account_Number, Sort_Code) {
    let customer;
    const params = { Account_Number, Sort_Code };
    const uriCustomer = '/customer/Info/Account&Sort';
    try {
      const response = await this._get(uriCustomer, params);
      customer = response.data;
    } catch (err) {}
    return customer;
  }

  async getCustomerByPartyId(Party_Id) {
    let customer;
    const params = { Party_Id};
    const uriCustomer = '/customer/Info/PartyId';
    try {
      const response = await this._get(uriCustomer, params);
      customer = response.data;
    } catch (err) {}
    return customer;
  }

  async getIdentifiedCustomer(Name, DOB, Address, Postcode) {
    let customer;
    const params = { Name, DOB, Address, Postcode };
    const uriCustomer = '/customer/Info/findIdentified';
    try {
      const response = await this._get(uriCustomer, params);
      customer = response.data;
    } catch (err) {}
    return customer;
  }

  async getCustomerBySearch(Account_Number = {}, Sort_Code = {}, Surname = {}, Postcode = {}) {
    let customers;
    const params = { Account_Number, Sort_Code, Surname, Postcode };
    const uriCustomer = '/customer/Info/find';
    try {
      const response = await this._get(uriCustomer, params);
      customers = response;
    } catch (err) {}
    return customers;
  }

  async getCustomerAccounts(Party_Id = {}) {
    let accounts;
    const params = { Party_Id };
    const uriAccounts = '/customer/Info/accounts';
    try {
      const response = await this._get(uriAccounts, params);
      accounts = response;
    } catch (err) {}
    return accounts;
  }
}

const apiCustomer = new ApiCustomer();
export default apiCustomer;
