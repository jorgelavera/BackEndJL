import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
// const __dirname = dirname(__filename);
// replace as it has a problem
const __dirname = "C:/backend/src"

export default __dirname;