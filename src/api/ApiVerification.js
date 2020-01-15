import { Api } from './Api';

const uriVerify = '/customer/verify';
const settingsExpiryInMinutes = 60; //minutes

export class ApiVerification extends Api {
  async retrieveVerifyQuestions(params = {}) {
    //Function under construction
    let verificationQuestion;
    try {
      const response = await this._getCached(uriVerify, params, settingsExpiryInMinutes, true);
      erificationQuestion = response.data;
    } catch (err) {}
    return settings;
  }

  async checkVerificationTelephoneCode(TelephoneCode) {
    let verificationStatus;
    const params = { TelephoneCode };
    const uriVerify = '/customer/verify/telephoneCode';

    try {
      const response = await this._get(uriVerify, params);
      verificationStatus = response.data;
    } catch (err) {}
    return verificationStatus;
  }
  async checkVerificationMiddleName(middlename) {
    let verificationStatus;
    const params = { middlename };
    const uriVerify = '/customer/verify/middlename';

    try {
      const response = await this._get(uriVerify, params);
      verificationStatus = response.data;
    } catch (err) {}
    return verificationStatus;
  }

  async checkVerificationSecurityCode(SecurityCode) {
    let verificationStatus;
    const params = { SecurityCode };
    const uriVerify = '/customer/verify/securityCode';

    try {
      const response = await this._get(uriVerify, params);
      verificationStatus = response.data;
    } catch (err) {}
    return verificationStatus;
  }
}

const apiSettingsConfig = new ApiSettingsConfig();
export default apiSettingsConfig;
