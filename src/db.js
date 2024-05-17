import path from "node:path";
import fs from "node:fs/promises";

export { getDB, saveDB, insertDB };

const DB_PATH = path.join(path.dirname(import.meta.dirname), "db.json");

const getDB = async () => {
  const db = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
  return db;
};

const saveDB = async db => {
  const jsonDB = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, jsonDB);
  return jsonDB;
};

const insertDB = async note => {
  const db = await getDB();
  db.notes.push(note);
  const newSavedDB = await saveDB(db);

  return newSavedDB;
};
