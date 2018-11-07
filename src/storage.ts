import { PublicData } from "./data";

const LOCALSTORAGE_NAME = "__SAVED_PASSWORDS";

export function setLocalStorage(saved: PublicData[]): void {
  const stringified = JSON.stringify(saved);
  window.localStorage.setItem(LOCALSTORAGE_NAME, stringified);
}

export function getLocalStorage(): PublicData[] {
  try {
    return fixLocalStorage(
      window.localStorage.getItem(LOCALSTORAGE_NAME) || "[]"
    );
  } catch (err) {
    // window.localStorage.clear();
    return [];
  }
}

function fixLocalStorage(localstorage: string): PublicData[] {
  const local = localstorage || "[]";
  const parsed = JSON.parse(local);
  let saved = [];
  if (!Array.isArray(parsed)) {
    throw new Error("saved passwords in localstorage is not an array");
  }
  return parsed;
}
