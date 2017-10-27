/**
 * GoogleApi.js is a script tag compiler. Essentially, this utility module builds a Google 
 * Script tag link allowing us to describe the pieces of the Google API we want to load 
 * inusing a JS object and letting it build the endpoint string.
 * 
 * Reference: https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663 
 */

export const GoogleApi = function(opts) {
    opts = opts || {}
  
    const apiKey = opts.apiKey;
    const libraries = opts.libraries || [];
    const client = opts.client;
    const URL = 'https://maps.googleapis.com/maps/api/js';
  
    const googleVersion = '3.28';
    window.google = null;
    let channel = null;
    let language = null;
    let region = null;
  
    const url = () => {
      let url = URL;
      let params = {
        key: apiKey,
        callback: 'CALLBACK_NAME',
        libraries: libraries.join(','),
        client: client,
        v: googleVersion,
        channel: channel,
        language: language,
        region: region
      }
  
      let paramStr = Object.keys(params)
          .filter(k => !!params[k])
          .map(k => `${k}=${params[k]}`).join('&');
  
      return `${url}?${paramStr}`;
    }
  
    return url();
  }
  
  export default GoogleApi