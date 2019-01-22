import { notEmpty } from "./listUtils";

const getLocalStorage = (key: string, initialValue = "[]") =>
  JSON.parse(localStorage.getItem(key) || initialValue);

const getListFromLocalStorage = (key: string, initialValue = "[]") =>
  getLocalStorage(key, initialValue).filter(notEmpty);

const setLocalStorage = <T>(key: string) => (value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export { getLocalStorage, setLocalStorage, getListFromLocalStorage };
