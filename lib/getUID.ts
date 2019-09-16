import cookie from "cookie";

export default (cookiesString: string): string => {
  if (cookiesString) {
    const cookies = cookie.parse(cookiesString);

    return cookies.uid;
  }

  return "";
};
