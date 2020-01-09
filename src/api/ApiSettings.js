import { Api } from './Api';

const uriDesktopSettings = '/desktop/v1';
const settingsExpiryInMinutes = 60; //minutes

export class ApiSettingsConfig extends Api {
  async settings(params = {}) {
    console.log("Settings have been called")
    let settings;
    try {
      const response = await this._getCached(
        uriDesktopSettings,
        params,
        settingsExpiryInMinutes,
        true
      );
      console.log("Settings have been called")
      settings = response.data;
    } catch (err) {}
    return settings;
  }
}

const apiSettingsConfig = new ApiSettingsConfig();
export default apiSettingsConfig;
