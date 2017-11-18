/**
 * Gets a cookie.
 * @param {*} cname Cookie to obtain.
 */
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

/**
 * Adds or updates the value of a cookie.
 * @param {*} cname Cookie name.
 * @param {*} cvalue Cookie value.
 */
export function setCookie(cname, cvalue) {
  let expires = ";expires=";

  let now = new Date();
  let time = now.getTime();
  let expireTime = time + 43200000; //12 hours
  now.setTime(expireTime);

  expires += now.toGMTString();

  document.cookie = cname + "=" + cvalue + expires;
}

/**
 * Deletes a cookie.
 * @param {*} cname Cookie name to delete.
 */
export function deleteCookie(cname) {
  document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}