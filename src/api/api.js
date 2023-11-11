const BASE_URL = "http://localhost:4000/";

export const getApi = async (url = "") => {
  try {
    let res = await fetch(BASE_URL + url);
    console.log(BASE_URL + url);
    let json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    console.log(e.message);
    return false;
  }
};
export const postApi = async (url = "", data) => {
  try {
    let res = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    console.log(e.message);
    return false;
  }
};
