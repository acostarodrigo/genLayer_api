const { request } = require("express");
const myLogger = () => {
  return (req, res, next) => {
    console.log("Incomming ->  " + req.url);
    next();
  };
};

module.exports = { myLogger };
