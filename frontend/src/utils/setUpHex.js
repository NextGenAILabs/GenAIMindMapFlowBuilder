import { customAlphabet } from 'nanoid';

// Function to generate a 24-character hex ID
function generateHexId() {
  const hexAlphabet = '0123456789abcdef'; // Hexadecimal characters
  const nanoid24Hex = customAlphabet(hexAlphabet, 24); // Custom nanoid generator
  return nanoid24Hex(); // Generate and return the ID
}

export default generateHexId