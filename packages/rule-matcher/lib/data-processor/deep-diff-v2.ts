import { ICapturedChanges } from "../interface";

function compareObjects(oldValue: any, newValue: any): ICapturedChanges[] {
  const changes: ICapturedChanges[] = [];

  function compareArrays(path: string, arr1: any[], arr2: any[]): void {
    if (JSON.stringify(arr1) !== JSON.stringify(arr2)) {
      changes.push({
        name: path,
        previousValue: arr1,
        currentValue: arr2,
      });
    }
  }

  function isArrayOfStrings(arr: any[]): boolean {
    return arr.every((item) => typeof item === 'string');
  }

  function compareInnerObjects(oldObject: any, newObject: any, path: string): void {
    for (const key in oldObject) {
      const currentPath = path ? `${path}.${key}` : key;

      if (oldObject.hasOwnProperty(key)) {
        if (newObject.hasOwnProperty(key)) {
          if (Array.isArray(oldObject[key]) && Array.isArray(newObject[key])) {
            if (isArrayOfStrings(oldObject[key]) && isArrayOfStrings(newObject[key])) {
              compareArrays(currentPath, oldObject[key], newObject[key]);
            } else {
              compareInnerObjects(oldObject[key], newObject[key], currentPath);
            }
          } else if (
            typeof oldObject[key] === 'object' &&
            typeof newObject[key] === 'object'
          ) {
            compareInnerObjects(oldObject[key], newObject[key], currentPath);
          } else if (oldObject[key] !== newObject[key]) {
            changes.push({
              name: currentPath,
              previousValue: oldObject[key],
              currentValue: newObject[key],
            });
          }
        } else {
          changes.push({
            name: currentPath,
            previousValue: oldObject[key],
            currentValue: undefined,
          });
        }
      }
    }

    for (const key in newObject) {
      const currentPath = path ? `${path}.${key}` : key;

      if (newObject.hasOwnProperty(key) && !oldObject.hasOwnProperty(key)) {
        changes.push({
          name: currentPath,
          previousValue: undefined,
          currentValue: newObject[key],
        });
      }
    }
  }

  compareInnerObjects(oldValue, newValue, '');

  return changes;
}

export default compareObjects;
