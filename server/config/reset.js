import './dotenv.js';  // Import dotenv to load the environment variables
import { pool } from "./database.js";
import meetsData from '../data/meets.json' assert { type: "json" }

console.log('DATABASE_URL:', process.env.DATABASE_URL);  // Log to verify the correct URL is loaded

const createMeetsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS meets;
    CREATE TABLE IF NOT EXISTS meets (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      state VARCHAR(20) NOT NULL,
      date VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      link TEXT
    )
  `
  try {
    console.log('Attempting to create the table...');
    const res = await pool.query(createTableQuery)
    console.log(`🍾 Created the meets table`);
  } catch (error) {
    console.log(`❌ Wasn't able to create the meets table, ${error.message}`);
  }
}

const seedMeetsTable = async () => {
  await createMeetsTable();

  meetsData.forEach((meet) => {
    const insertMeetQuery = `
      INSERT INTO meets (name, state, date, location, link) 
      VALUES ($1, $2, $3, $4, $5) 
      ON CONFLICT DO NOTHING
    `;
    const values = [
      meet.name,
      meet.state,
      meet.date,
      meet.location,
      meet.link || null,
    ];

    pool.query(insertMeetQuery, values, (err, res) => {
      if (err) {
        console.log(`❌ Wasn't able to insert meet ${meet.name}, ${err.message}`);
        return;
      } else {
        console.log(`✅ Inserted meet ${meet.name}`);
      }
    });
  });
};

seedMeetsTable()