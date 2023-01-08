const path = require("path");
const fs = require("fs").promises;

const explorer = async (filePath) => {
  // const currentPath = path.join(__dirname, "../../../../../../../");
  const contents = [];
  const foldersOnly = [];

  const folderPath = path.join(filePath);
  // const folderPath = drive

  try {
    console.log(folderPath);
    const driveContents = await fs.readdir(folderPath);
    console.log(driveContents);
    for (const item of driveContents) {
      !item.includes(".") && foldersOnly.push(item);
      contents.push(item);
    }
    console.log(contents);
    return { contents: contents, foldersOnly: foldersOnly };
  } catch {
    return 0;
  }
};

module.exports = { explorer };
