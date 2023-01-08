const fs = require("fs").promises;
const constants = require("fs").promises;
const path = require("path");

// fs.open("newTestfile3.txt", "w", (res) => console.log("file creates"));
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const process = async (drive, filePath) => {
  const sourceDir = path.join(drive, filePath);
  console.log(sourceDir);
  // const sourceDir = "../../picTest/";
  const years = [];
  const files = await fs.readdir(sourceDir);
  for (const file of files) {
    if (file.includes(".jpg") || file.includes(".mp4")) {
      const filePath = path.resolve(sourceDir, file);
      const newName = path.resolve(
        sourceDir,
        "synced" + "\\" + "synced-" + file
      );
      console.log(newName);
      // console.log(filePath);
      const fileYear = file.slice(0, 4);
      const fileMonth = months[+file.slice(4, 6) - 1];
      // console.log(file + " ====> " + months[fileMonth - 1]);
      !years.includes(fileYear) && years.push(fileYear);
      const yearFolder = sourceDir + "\\" + fileYear;
      const monthFolder =
        sourceDir + "\\" + fileYear + "\\" + fileMonth + fileYear;
      await checkAndCreateFolder(sourceDir + "\\" + "synced");
      await checkAndCreateFolder(yearFolder);
      await checkAndCreateFolder(monthFolder);
      // console.log(path.resolve(monthFolder, file));
      try {
        await fs.copyFile(
          filePath,
          path.resolve(monthFolder, file),
          constants.COPYFILE_EXCL
        );
      } catch (e) {
        console.log(e);
        // console.log(file + " at " + filePath + " could not be copied");
      }
      await fs.rename(filePath, newName);
    }
  }
  console.log(years);
  return years;
};

const checkAndCreateFolder = async (path) => {
  try {
    await fs.stat(path);
    // console.log(fileYear + " -- " + dir.isDirectory());
  } catch (e) {
    await fs.mkdir(path);
  }
};

module.exports = { process };
