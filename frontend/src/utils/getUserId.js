export function getCookie(name) {
  const cookieArray = document.cookie.split("; ");
  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePair = cookieArray[i].split("=");
    if (name === cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
