export default function numberUtils(): {
  randomRange: (min: number, max: number) => number,
} {
  /**
   * Generates random number within range
   * 
   * @param min- minimum number in range
   * @param max- maximum number in range
   * @returns number- random number within range
   */
  function randomRange(min: number, max: number): number {
    // swap min and max if min is greater than max
    if (max < min) [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return {
    randomRange,
  }
}