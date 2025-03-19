export function hasLetter(password: string): boolean {
    let hasLetter = false;
  
    for (const character of password) {
      if (character >= 'A' && character <= 'Z') {
        hasLetter = true;
      }
      if (character >= 'a' && character <= 'z') {
        hasLetter = true;
      }
    }
  
    return hasLetter;
  }
  
  export function hasNumber(password: string): boolean {
    let hasNumber = false;
  
    for (const character of password) {
      if (character >= '0' && character <= '9') {
        hasNumber = true;
      }
    }
  
    return hasNumber;
  }

  export function containsInvalidCharacters(str: string): boolean {
    const regex = /^[a-zA-Z\s'-]*$/;
    return !regex.test(str);
  }