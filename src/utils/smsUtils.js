/**
 * Exact Bengali character counting formula matching madrasha.hostzonebd.com
 * Standard GSM SMS is 160 characters in English.
 * In Bengali (Unicode UCS-2), when the first Bengali character is encountered,
 * 91 characters are consumed (leaving 69 characters, meaning a 70-character SMS limit).
 */
export function countBengaliCharacters(text) {
  if (!text) return 0;
  let characterCount = 0;
  let firstBengaliEncountered = false;
  for (let i = 0; i < text.length; i++) {
    const isBengaliChar = text[i].match(/[\u0980-\u09FF\u09E6-\u09EF]/);
    if (isBengaliChar) {
      if (!firstBengaliEncountered) {
        characterCount += 91;
        firstBengaliEncountered = true;
      } else {
        characterCount++;
      }
    } else {
      characterCount++;
    }
  }
  return characterCount;
}

export function calculateRemainingCharacters(text, maxChars = 160) {
  const count = countBengaliCharacters(text);
  return {
    characterCount: count,
    remainingCharacters: maxChars - count,
    isOverLimit: maxChars - count < 0
  };
}

export const SMS_COST_PER_MESSAGE = 0.40;

export function calculateSmsCost(recipientCount, costPerSms = SMS_COST_PER_MESSAGE) {
  return +(recipientCount * costPerSms).toFixed(2);
}
