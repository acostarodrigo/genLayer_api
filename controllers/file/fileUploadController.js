const { request, response } = require("express");
const { submitFileToIPFS } = require("./fileUpload");

const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).json({ ok: false, data: "No file" });
  }
  const file = req.files.file;

  try {
    const message = await submitFileToIPFS(file);

    return res.status(200).json({
      ok: true,
      data: message,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status || 500).json({
      ok: false,
      data: error.toString(),
    });
  }
};

module.exports = {
  uploadFile,
};
