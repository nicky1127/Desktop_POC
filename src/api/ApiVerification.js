import { Api } from './Api';

const uriVerify = '/customer/verify/Questions';
const settingsExpiryInMinutes = 60; //minutes

export class ApiVerification extends Api {
  async getVerifyQuestion(params = {}) {
    //Function under construction
    let verificationQuestion;
    try {
      const response = await this._getCached(uriVerify, params, settingsExpiryInMinutes, true);
      const idRandom = Math.floor(Math.random() * 2) + 1; 
      console.log(idRandom);
      
      const call = response.find(item => item.id === idRandom);
      verificationQuestion = call;
    } catch (err) {}
    return verificationQuestion;
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

const apiVerification = new ApiVerification();
export default apiVerification;
