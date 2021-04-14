const unzipper = require("unzipper");
const fs = require("fs");
const argv = require('minimist')(process.argv.slice(2));
const generateBaseCode = async (dist) => {
  try {
    const exactZip = await unzipper.Open.file(`${__dirname}/base/service.zip`);
    const createdFiles = await Promise.all(
      exactZip.files.map(async (file) => {
        if (file.type === "Directory") {
          fs.mkdirSync(`${dist}/${file.path}`);
          return `[Directory] ${file.path}`;
        }
        if (file.type === "File") {
          let buf = await file.buffer()
          if (argv.service && file.path === "index.service.js") {
            let text = Buffer.from(buf, "utf-8").toString()
            if (argv.service) {
              text = text.replace("serviceName", argv.service)
            }
            if (argv.model) {
              text = text.replace('"modelName"', `"${argv.model}"`)
            }
            buf = Buffer.from(text)
          }
          fs.writeFileSync(`${dist}/${file.path}`, buf);
          return `[File] ${file.path}`;
        }
      })
    );
    return createdFiles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateBaseCode,
};
