const express = require("express");
const app = express();
const port = 3100;
const fs = require("fs");
const path = require("path");

(() => {
  const files = fs.readdirSync("./files");

  let groupedFiles = {};
  files.forEach((x) => {
    const ext = x.split(".").pop();

    if (!groupedFiles[ext]) {
      groupedFiles[ext] = [];
    }
    groupedFiles[ext].push(x);
  });

  for (const ext in groupedFiles) {
    const folderPath = path.join("./files", ext);
    // console.log(folderPath,'    PATH')
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    groupedFiles[ext].forEach((file) => {
      const oldPath = path.join("./files", file);
      const newPath = path.join(folderPath, file);
      // fs.renameSync(oldPath, newPath);
    });
  }

  //   console.log(groupedFiles, "   extension");
  //   console.log(files, "   files");
})();

app.get("/", (req, res) => {
  res.send("<h1>Testing</h1>");
});

app.listen(port, () => {
  console.log(`Listening to this ${port} port`);
});
