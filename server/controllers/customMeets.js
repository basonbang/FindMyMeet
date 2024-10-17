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

/**
 * Creates a new custom meet with provided data
 */
const createCustomMeet = async (req, res) => {
  // Extract data from request body
  const { plates, bar, rack, lifter_count, name, is_tested, price } = req.body
  const operation = async () => {
    return await pool.query(`
      INSERT INTO custom_meets (plates, bar, rack, lifter_count, name, is_tested, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [plates, bar, rack, lifter_count, name, is_tested, price]
    )
  }
  try {
    const result = await retryOperation(operation)
    console.log(`Successfully created custom meet!`);
    res.status(201).json(result.rows)  // Successfully created new resource
  } catch (error) {
    console.log(`Error creating custom meet: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

/**
 * Updates an existing custom meet with provided data
 */
const updateCustomMeet = async (req, res) => {
  // Extract data from request body
  const id = parseInt(req.params.id)
  const { plates, bar, rack, lifter_count, name, is_tested, price } = req.body
  const operation = async () => {
    return await pool.query(`
      UPDATE custom_meets SET plates = $1, bar = $2, rack = $3, lifter_count = $4, name = $5, is_tested = $6,
      price = $7 WHERE id = $8`,
      [plates, bar, rack, lifter_count, name, is_tested, price, id]
    )
  }
  try {
    const result = await retryOperation(operation)
    console.log(`Successfully updated custom meet!`);
    res.status(200).json(result.rows)  // Successfully updated existing resource resource
  } catch (error) {
    console.log(`Error updating custom meet: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

/**
 * Deletes an existing custom meet given it's ID
 */
const deleteCustomMeet = async (req, res) => {
  const id = parseInt(req.params.id)
  const operation = async () => {
    return await pool.query(`
      DELETE FROM custom_meets WHERE id = $1`, [id]
    )
  }
  try {
    const result = await retryOperation(operation)
    console.log(`Successfully deleted custom meet!`);
    res.status(200).json(result.rows)  // Successfully deleted existing resource
  } catch (error) {
    console.log(`Error deleting custom meet: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

/**
 * Gets all existing custom meets
 */
const getCustomMeets = async (req, res) => {
  const operation = async () => {
    return await pool.query(`SELECT * FROM custom_meets ORDER BY id DESC`)
  }
  try {
    const result = await retryOperation(operation)
    console.log(`Successfully fetched all custom meets!`);
    res.status(200).json(result.rows)
  } catch (error) {
    console.log(`Error getting all custom meets: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

/**
 * Gets a custom meet by it's ID
 */
const getCustomMeetByID = async (req, res) => {
  const selectQuery = `SELECT * FROM custom_meets WHERE id = $1`
  const id = parseInt(req.params.id)
  const operation = async () => {
    return await pool.query(selectQuery, [id])
  } 
  try {
    const results = await retryOperation(operation)
    res.status(200).json(results.rows[0])
  } catch (error) { 
    console.log('Error getting custom meet by ID: ', error.stack);
    res.status(409).json({ message: error.message })
  }
}

export default {
  createCustomMeet,
  updateCustomMeet,
  deleteCustomMeet,
  getCustomMeets,
  getCustomMeetByID
}