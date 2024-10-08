import { pool } from "./database.js";

const getMeets = async (req, res) => {
  try {
    const meets = await pool.query(`SELECT * FROM meets GROUP BY state`)
    res.status(200).json(meets.rows)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const getNumberOfMeetsForState = async (req, res) => {
  try {
    const countQuery = `SELECT COUNT(*) FROM meets WHERE state = $1`
    const values = [req.params.state] 
    const results = await pool.query(countQuery, values)
    req.numberOfMeets = results.rows[0]
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

export {
  getMeets,
  getMeetsByState,
  getNumberOfMeetsForState
}