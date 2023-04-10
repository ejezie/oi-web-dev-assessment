function getTokenFromCookie() {
  // Split the document.cookie string into individual cookies
  var cookies = document.cookie.split(";");

  // Loop through the cookies to find the one with the specified name
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    // Trim any leading or trailing spaces from the cookie string
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    console.log(document.cookie);

    // If the name matches, return the value of the cookie
    if (cookie.indexOf("token" + "=") == 0) {
      return cookie.substring("token".length + 1, cookie.length);
    }
  }

  // If the cookie isn't found, return null
  return null;
}

export default getTokenFromCookie;
