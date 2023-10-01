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

module.exports = {
  parseLsOutput: parseLsOutput,
};
