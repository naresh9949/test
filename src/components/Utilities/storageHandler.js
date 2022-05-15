const storage = window.localStorage;
//{}
const setLog = (data) => {
  var storeArray = [];
  if (!storage.getItem("log")) {
    storeArray.push(data);
    storage.setItem("log", JSON.stringify(storeArray));
  } else {
    try {
      JSON.parse(storage.getItem("log")).map((itm) => storeArray.push(itm));
      storeArray.push(data);
      if (storeArray.length < 100) {
        localStorage.setItem("log", JSON.stringify(storeArray));
      } else {
        storeArray.splice(0, 1);

        localStorage.setItem("log", JSON.stringify(storeArray));
        //console.log(arr);
      }
    } catch (e) {
      if (
        e.name === "QuotaExceededError" ||
        e.name === "QUOTA_EXCEEDED_ERR" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED"
      ) {
        storeArray.splice(0, 1);

        localStorage.setItem("log", JSON.stringify(storeArray));
      }
    }
  }
};

export const getLogs = () => {
  var storeArray = [];
  if (localStorage?.getItem("log") !== "") {
    JSON.parse(localStorage.getItem("log"))?.map((itm) => storeArray.push(itm));
  }
  return storeArray;
};

export const CreateLog = (response, url) => {
  let log_Object;
  try {
    log_Object = {
      header: {
        isSuccess: response.status === 200,
        EventID:
          (response.headers
            ? response.headers.eventid
              ? response.headers.eventid
              : "NO EVENT ID"
            : "NO HEADERS") +
          "  " +
          url,
        Error: response.status === 500,
      },
      date: new Date().toString(),
      CalledUrl: url,
    };
    setLog(log_Object);
  } catch (err) {
    console.log("Create Log", err);
  }
};

export const ScreenError = (url, err) => {
  let msg = err.response
    ? "Event ID: " +
      err.response.headers.eventid +
      " ERROR MESSAGE : " +
      err.response.data.error
    : "Non Existent Lambda";
  const log_Object = {
    header: {
      isSuccess: false,
      EventID: msg,
    },
    date: new Date().toString(),
    CalledUrl: url,
  };
  setLog(log_Object);
  
  if(err.response && (err.response.status === 403 || err.response.headers["x-amzn-errortype"]=="AuthorizerConfigurationException"))
    window.location.reload();
};


