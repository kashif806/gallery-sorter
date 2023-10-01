const { exec } = require("child_process");

const runCommand = async (command) => {
  return new Promise((res, rej) =>
    exec(command, (err, stdout, stderr) => {
      if (err) {
        rej(err);
        return;
      }
      if (stderr) {
        console.log("error in running command");
        res(`std err : ${stderr}`);
      }
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
module.exports = {
  commands: { getDevices: getDevices, getContent: getContent },
};
