
export const findKeys = async (data) => {
    let response = {};
    const calledUrl = domains[domain] + url;
    try {
      response = await axios.post(calledUrl, data, options);
      CreateLog(response, calledUrl);
    } catch (err) {
      ScreenError(calledUrl,err);
    }
    return response;
  };