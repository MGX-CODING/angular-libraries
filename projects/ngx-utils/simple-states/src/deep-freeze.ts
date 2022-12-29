/**
 * Deeply frozes an object
 * @param target Target to freeze
 * @returns The frozen target, for convenience purposes
 */
export function deepFreeze(target: any) {
  Object.freeze(target);
  for (const key in target) {
    const value = target[key];

    if (typeof value === 'object') {
      deepFreeze(value);
      if (Array.isArray(value)) for (const sub of value) deepFreeze(sub);
    }
  }

  return target;
}
