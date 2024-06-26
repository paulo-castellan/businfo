import axios from "axios";

const defaultParams = {
  service: "WFS",
  version: "2.0.0",
  request: "GetFeature",
  outputFormat: "application/json",
  srsname: "EPSG:4326",
};
const api = axios.create({
  baseURL: "http://geoserver.semob.df.gov.br/geoserver/semob/ows",
});

api.interceptors.request.use((req) => {
  if (!!req.params) Object.assign(req.params, defaultParams);
  if (!req.params) req.params = defaultParams;
  // console.log(req);
  return req;
});

// A way to capture requests responses, good for debug the code.
// api.interceptors.response.use((req) => {
//   console.log(req.data);
//   return req;
// });

export default api;
