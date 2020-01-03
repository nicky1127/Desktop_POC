import { Api } from './Api';

const uriDesktopSettings = '/desktop/v1';
const settingsExpiryInMinutes = 60; //minutes

export class ApiSettingsConfig extends Api {
  async setting(params = {}) {
    let settings;
    try {
      const response = await this._getCached(
        uriDesktopSettings,
        params,
        settingsExpiryInMinutes,
        true
      );
      settings = response;
    } catch (err) {}
    return settings;
  }
}

const apiSettingsConfig = new ApiSettingsConfig();
export default apiSettingsConfig;
