import { pool } from "../config/database.js";

/*
 * Retries a database operation if it encounters DNS-related errors like ENOTFOUND or ECONNREFUSED
*/
const retryOperation = async (operation, retries = 8, delay = 2000) => {
  while (retries > 0) {
    try {
      return await operation();  // Attempt the database query and return immediately if successful
    } catch (error) {
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        console.error(`DNS resolution failed: ${error.message}. Retrying...`);
        retries -= 1;
        // Indicate that's it over if there's no tries left.
        if (retries === 0) {
          throw new Error('All retry attempts failed.');
        }
        await new Promise(resolve => setTimeout(resolve, delay));  // Wait 2 seconds before retrying
      } else {
        throw error;  // Non-DNS error, re-throw it
      }
    }
  }
};

const getStates = async (req, res) => {
  const query = `SELECT DISTINCT state FROM meets ORDER BY state`
  const operation = async () => {
    return await pool.query(query)
  } 
  try {
    const result = await retryOperation(operation)
    console.log(`Successfully fetched states!`);
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(`Error fetching states: ${error.stack}`);
    res.send(409).json({ message: error.message})
  }
}

const getMeets = async (req, res) => {
  const operation = async () => {
    return await pool.query(`SELECT * FROM meets ORDER BY state`)
  }
  try {
    const meets = await retryOperation(operation)
    console.log(`Successfully fetched meets!`);
    res.status(200).json(meets.rows)
  } catch (error) {
    console.log(`Error fetching meets: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

const getNumberOfMeetsForState = async (req, res, next) => {
  const countQuery = `SELECT COUNT(*) FROM meets WHERE state = $1`
  const values = [req.params.state] 
  const operation = async () => {
    return await pool.query(countQuery, values)
  }
  try {
    const results = await retryOperation(operation)
    req.numberOfMeets = results.rows[0].count
    next()
  } catch (error) {
    console.log('Error fetching meets by state: ', error.stack);
    res.status(409).json({ message: error.message })
  }
}

const getMeetsByState = async (req, res) => {
  const selectQuery = `SELECT * FROM meets WHERE state = $1`
  const state = [req.params.state]
  const operation = async () => {
    return await pool.query(selectQuery, state)
  } 
  try {
    const results = await retryOperation(operation)
    res.status(200).json({
      numberOfMeets:  req.numberOfMeets,
      meets: results.rows
    })
  } catch (error) { 
    console.log('Error fetching meets by state: ', error.stack);
    res.status(409).json({ message: error.message })
  }
}

const getMeetByID = async (req, res) => {
  const selectQuery = `SELECT * FROM meets WHERE id = $1`
  const values = [req.params.id]
  const operation = async () => {
    return await pool.query(selectQuery, values)
  }
  try {
    const results = await retryOperation(operation)
    res.status(200).json(results.rows)
  } catch (error) {
    log.error(`Error fetching meet by ID: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

export default {
  getStates,
  getMeets,
  getMeetsByState,
  getNumberOfMeetsForState,
  getMeetByID
}