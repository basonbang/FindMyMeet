import { pool } from "../config/database.js";

const getStates = async (req, res) => {
  try {
    const query = `SELECT DISTINCT state FROM meets ORDER BY state`
    const states = await pool.query(query)
    res.status(200).json(states.rows)
  } catch (error) {
    console.log(`Error fetching states: ${error.stack}`);
    res.send(409).json({ message: error.message})
  }
}

const getMeets = async (req, res) => {
  try {
    console.log('Connecting  to the database...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const meets = await pool.query(`SELECT * FROM meets ORDER BY state`)
    res.status(200).json(meets.rows)
  } catch (error) {
    console.log(`Error fetching meets: ${error.stack}`);
    res.status(409).json({ message: error.message })
  }
}

const getNumberOfMeetsForState = async (req, res, next) => {
  
  try {
    console.log('Connecting  to the database...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const countQuery = `SELECT COUNT(*) FROM meets WHERE state = $1`
    const values = [req.params.state] 
    const results = await pool.query(countQuery, values)
    req.numberOfMeets = results.rows[0].count
    next()
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const getMeetsByState = async (req, res) => {
  try {
    const selectQuery = `SELECT * FROM meets WHERE state = $1`
    const state = [req.params.state]
    const results = await pool.query(selectQuery, state)
    res.status(200).json({
      numberOfMeets:  req.numberOfMeets,
      meets: results.rows
    })
  } catch (error) { 
    res.status(409).json({ message: error.message })
  }
}

export default {
  getStates,
  getMeets,
  getMeetsByState,
  getNumberOfMeetsForState
}