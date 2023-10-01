const BASE_URL = "http://localhost:4000/";

const getApi = async (url = "") => {
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

export default getApi;
