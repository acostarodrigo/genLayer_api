const fs = require("fs");
const os = require("os");
const moment = require("moment");
const { Blob } = require("buffer");
const { PinataSDK } = require("pinata");
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const tmpDir = os.tmpdir();

const submitFileToIPFS = async (file) => {
  const tmpZip = `${tmpDir}/${file.name}`;
  const buffer = Buffer.from(file.data, "base64");
  fs.writeFileSync(tmpZip, buffer);
  const blob = new Blob([fs.readFileSync(tmpZip)]);

  const upload = await pinata.upload
    .file(blob)
    .addMetadata({
      name: file.name,
      keyValues: {
        whimsey: 100,
      },
    })
    .group(process.env.PINATA_GROUP);
  const fileHash = upload.IpfsHash;
  const metadata = {
    name: "Rodrigo Acosta",
    image: `ipfs://${fileHash}`,
    description: "Full stack exam",
  };
  const response = await pinata.upload.json(metadata, {
    groupId: process.env.PINATA_GROUP,
  });
  return response.IpfsHash;
};

module.exports = { submitFileToIPFS };
