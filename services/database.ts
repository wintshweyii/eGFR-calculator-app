import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('ckd.db');

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS egfr_history (
      history_id INTEGER PRIMARY KEY NOT NULL,
      age INTEGER,
      sex TEXT,
      height REAL,
      height_unit TEXT,
      serum_creatinine REAL,
      creatinine_unit TEXT,
      egfr_result REAL,
      egfr_result_grade TEXT,
      calculation_method TEXT,
      created_at TEXT
    );
  `);
};