const { exec } = require("child_process");

const runCommand = async (command) => {
  return new Promise((res, rej) =>
    exec(command, (err, stdout, stderr) => {
      try {
        if (err) {
          res(
            "There was an error creating folder, check if there is already a folder at this path"
          );
          // rej(err);
          return;
        }
        if (stderr) {
          console.log("here2");
          console.log("error in running command");
          res(`std err : ${stderr}`);
        }
      } catch (e) {
        console.log("here3");
        rej(e);
      }
      console.log("here4");
      res(stdout);
    })
  );
};

const getDevices = () =>
  Promise.all([
    runCommand("adb devices"),
    runCommand("adb shell getprop ro.product.manufacturer"),
    runCommand("adb shell getprop ro.product.model"),
  ]);

const getContent = (path) =>
  runCommand(`adb shell ls -l ${path.replace(/ /g, "\\\\ ")}`);

const createFolder = (path, folderName) =>
  runCommand(
    `adb shell mkdir ${path.replace(/ /g, "\\\\ ")}/${folderName.replace(
      / /g,
      "\\\\ "
    )}`
  );

const moveFile = (moveFromPath, moveToPath) =>
  runCommand(
    `adb shell mv ${moveFromPath.replace(/ /g, "\\\\ ")} ${moveToPath.replace(
      / /g,
      "\\\\ "
    )}`
  );

module.exports = {
  commands: {
    getDevices: getDevices,
    getContent: getContent,
    createFolder: createFolder,
    moveFile: moveFile,
  },
};
