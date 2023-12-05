import numberUtils from "./numberUtils";

interface encodedChar {
  value: number,
  prev: number,
  next: number
};

type encodedMessage = encodedChar[];

const { randomRange } = numberUtils();

/**
 * Checks if message is less than 144 characters 
 *
 * @param message- string to be encoded
 * @returns boolean- true if message is less than 144 characters, false if message is greater than 144 characters
 */
function lengthCheck(message: string): boolean {
  return message.length <= 143;
}

/**
 * Checks if message contains only alphanumeric characters, spaces, and punctuation
 * 
 * @param message- string to be encoded
 * @returns boolean- true if message contains only alphanumeric characters, spaces, and punctuation, false if message contains other characters
 */
function characterCheck(message: string): boolean {
  // regex variable for alphanumeric characters, spaces, and punctuation
  const regex = /^[a-zA-Z0-9\s\.\,\!\?\:\;\'\"\(\)\-\_\+\=\*\/\@\#\$\%\^\&\[\]\{\}\|\\\<\>\~\`]+$/;
  return regex.test(message);
}

/**
 * Validates message to be encoded
 * 
 * @param message- string to be encoded
 * @throws Error- if message is greater than 144 characters
 * @throws Error- if message contains characters other than alphanumeric characters, spaces, and punctuation
 * @returns boolean- true if all checks pass, false if any checks fail
 */
function validateMessage(message: string): boolean {
  const validLength = lengthCheck(message);
  const validCharacters = characterCheck(message);

  if (!validLength) throw new Error("Error: Message is too long.  Please limit your message to 144 characters.");
  if (!validCharacters) throw new Error("Error: Message contains invalid characters.  Please limit your message to alphanumeric characters, spaces, and punctuation.");
  
  return validLength && validCharacters;
}
/**
 * Encodes message into array of encodedChar objects
 * 
 * @param message- string to be encoded
 * @returns encodedList- array of encodedChar objects
 */
function toEncodedList(message: string): encodedChar[] {
  const encodedList: encodedChar[] = [];
  const hash = new Set(Array(255).fill(0).map((_, i) => i+1));
  let prev = 0;
  let next = 0;
  let value = 0;
  for (let i = 0; i < message.length; i++) {
    value = message.charCodeAt(i);
    prev = next;
    next = i !== message.length-1 ? randomRange(1, 255) : 0;
    while (hash.has(next)) {
      next = i !== message.length-1 ? randomRange(1, 255) : 0;
      if (hash.has(next)) hash.delete(next);
    }
    encodedList.push({ value, prev, next });
  }
  return encodedList;
}

export default function messageUtils(): {
  buildMessage: (message: string) => encodedMessage,
  sortEncodedList: (encodedList: encodedChar[]) => encodedChar[],
} {
  /**
   * Builds encoded message
   * 
   * @param message- string to be encoded
   * @returns encodedMessage- array of encodedChar objects or empty array if message is invalid
   */
  function buildMessage(message: string): encodedMessage {
    if (!validateMessage(message)) return [];
    return toEncodedList(message);
  }

  /**
   * Sorts encodedList by prev property
   * 
   * @param encodedList- array of encodedChar objects
   * @returns- sorted array of encodedChar objects
   */
  function sortEncodedList(encodedList: encodedChar[]): encodedChar[] {
    return encodedList.sort((a, b) => a.prev - b.prev);
  }

  return {
    buildMessage,
    sortEncodedList,
  }
}