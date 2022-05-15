import axios from "axios";
import { CreateLog,ScreenError } from "./storageHandler";

let options = { withCredentials: true, headers: { Authorization: "random" } };

const domains = {
  prcc : process.env.REACT_APP_PRCC,
  prssvl : process.env.REACT_APP_PRSSVL,
  prutils : process.env.REACT_APP_PRUTILS,
  wms : process.env.REACT_APP_WMS
}


export const Post = async (url, data,domain='prcc') => {
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

export const Patch = async (url, data,domain='prcc') => {
  let response = {};
  const calledUrl = domains[domain] + url;
  try {
    response = await axios.patch(calledUrl, data, options);
    CreateLog(response, calledUrl);
  } catch (err) {
    ScreenError(calledUrl,err);
  }
  return response;
};

export const Delete = async (url, data,domain='prcc') => {
  let response = {};
  const calledUrl = domains[domain] + url;
  try {
    response = await axios.delete(calledUrl, data, options);
    CreateLog(response, calledUrl);
  } catch (err) {
    ScreenError(calledUrl,err);
  }
  return response;
};


export const Get = async (url,domain='prcc') => { 

  let response = {};
  const calledUrl = domains[domain] + url;
  try {
    response = await axios.get(calledUrl, options);
    CreateLog(response,calledUrl);
  } catch (err) {
    ScreenError(calledUrl,err);
  }
  return response;
};


export const GetExcel = async (exporturl) => { 
  let response = {};
  try{
     response = await axios({
      method: "get",
      url: exporturl,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "random",
      },
      withCredentials : true
    });
    CreateLog(response,exporturl);
  }catch (err) {
    ScreenError(exporturl,err);
    throw err;
  }
  return response;
};

export const PostExcel = async (url,data) => {
  let response = {};
  try {
    response = await axios({
      method: "post",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data",Authorization: "random" },
      withCredentials : true
    });
    CreateLog(response, url);
  } catch (err) {
    ScreenError(url,err);
  }
  return response;
}








