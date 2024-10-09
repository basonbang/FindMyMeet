import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);  // Get the filename of the current module
const __dirname = path.dirname(__filename);         // Get the directory of the current module
const rootDir = path.resolve(__dirname, '../../');  // go up 2 levels to the root directory, where .env is

// Loads environment variables from the .env file located in the root directory
dotenv.config({path: path.resolve(rootDir, './.env')});
