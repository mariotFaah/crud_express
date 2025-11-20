const fs = require("fs");

const dataDirectory = "datas";

function loadData(filename) {
  const filePath = `${dataDirectory}/${filename}.json`;
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Impossible de lire le fichier ${filename}.json :`, err);
  }
}

function saveData(filename, data) {
  const filePath = `${dataDirectory}/${filename}.json`;
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(
      `Impossible d'écrire dans le fichier ${filename}.json :`,
      err
    );
  }
}

function validateData(data, requiredKeys) {
  if (!data || typeof data !== "object") return false;
  const keys = Object.keys(data);
  if (keys.length !== requiredKeys.length) {
    return false;
  }
  for (const key of requiredKeys) {
    if (!data.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}


module.exports = { loadData, saveData, validateData };