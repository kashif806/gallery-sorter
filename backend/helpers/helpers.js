const parseLsOutput = (lsOutput) => {
  const lines = lsOutput.split("\n").filter(Boolean); // Split output into lines
  const entries = lines.map((line) => {
    const [permissions, , , , size, date, time, ...nameArray] =
      line.split(/\s+/);
    const name = nameArray.join(" ");
    const isDirectory = permissions.startsWith("d"); // Entries starting with 'd' are directories
    return {
      name,
      isDirectory,
      size,
      date: `${date} ${time}`,
    };
  });
  return entries;
};

const getFoldersAndFiles = (filesInfo, path, movingPath, folderName) => {
  const returnObject = { foldersToBeCreated: [], filesToBeMoved: [] };
  Object.keys(filesInfo.foldersToBeCreated).map(async (year) => {
    console.log(year);
    returnObject.foldersToBeCreated.push({
      path: movingPath + "/" + folderName,
      folderName: year,
    });
    // const createYearFolder = await commands.createFolder(
    //  ,
    //
    // );
    //create year folder
    Object.keys(filesInfo.foldersToBeCreated[year]).map(async (month) => {
      console.log(month + year);
      returnObject.foldersToBeCreated.push({
        path: movingPath + "/" + folderName + "/" + year,
        folderName: month + year,
      });
      // const createYearFolder = await commands.createFolder(
      //   movingPath + "/" + folderName + "/" + year,
      //   month + year
      // );
      //create month folder
      Object.values(filesInfo.foldersToBeCreated[year][month]).map(
        async (file) => {
          // copy file to the path
          const moveFromPath = path + "/" + file;
          const moveToPath =
            movingPath + "/" + folderName + "/" + year + "/" + month + year;
          returnObject.filesToBeMoved.push({ moveFromPath, moveToPath });
          // console.log(moveFromPath + " ------->>> " + moveToPath);
          // const copyingFiles = await commands.moveFile(
          //   moveFromPath,
          //   moveToPath
          // );
          // console.log(path + "/" + year + "/" + month + "/");
          // console.log(file);
        }
      );
    });
  });
  return returnObject;
};

const createFolders = async (foldersToCreate) => {
  const promises = [];

  await Promise.all(foldersToCreate);
  return "FoldersCreated";
};

module.exports = {
  parseLsOutput: parseLsOutput,
  createFolders: createFolders,
  getFoldersAndFiles: getFoldersAndFiles,
};
