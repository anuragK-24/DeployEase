const express = require("express");
const httpProxy = require("http-proxy");
// It is the http-proxy module, which is used to create a reverse proxy server

const app = express();
const PORT = 8000;

const BASE_PATH = ""; // base URL

const proxy = httpProxy.createProxy();
// It is used to create a reverse proxy server

app.use((req, res) => {
  const hostname = req.hostname;
  // It is used to get the hostname from the request a1.localhost:8000

  const subdomain = hostname.split(".")[0];
  // It is used to get the subdomain from the hostname which is here a1

  const resolvesTo = `${BASE_PATH}/${subdomain}`;
  // It is used to get the URL to which the request will be resolved

  return proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
  // It is used to resolve the request to the target URL
});

proxy.on("proxyReq", (proxyReq, req, res) => {
  const url = req.url;
  if (url === "/") proxyReq.path += "index.html";
});
// It is used to add index.html if the URL is /

app.listen(PORT, () => console.log(`Reverse Proxy Running...${PORT}`));
