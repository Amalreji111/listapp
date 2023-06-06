export function generateUniqueID(): string {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10;
    let id = '';
  
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      id += alphanumericChars.charAt(randomIndex);
    }
  
    return id;
  }
  // Utility function to check if a string is valid
export const validString = (value: string): boolean => {
    // Define your string validation logic here
    // For example, checking if it contains only alphabetic characters
    const regex = /^[A-Za-z]+$/;
    return regex.test(value);
  };
 export const validNoNumbers = (value: string): boolean => {
  return !/\d/.test(value);
};
  // Utility function to check if a number is valid
 export  const validNumberString = (value: string): boolean => {
    // Check if the string is empty
    if (value.trim() === '') {
      return false;
    }
  
    // Check if the string is a valid number
    return !isNaN(Number(value));
  };
  
  // Utility function to check if a string doesn't start with a number
 export  const doesntStartWithNumber = (value: string): boolean => {
    // Define your logic to check if the string doesn't start with a number
    const regex = /^[^0-9]/;
    return regex.test(value);
  };
  
  // Utility function to check if a string contains certain characters
 export  const containsCertainCharacters = (value: string, characters: string[]): boolean => {
    // Define your logic to check if the string contains certain characters
    const regex = new RegExp(`[${characters.join('')}]`);
    return regex.test(value);
  };
 export  const validMinLength = (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  };
   export  const validMaxLength = (value: string, maxLength: number): boolean => {
    return value.length <= maxLength;
  };
  