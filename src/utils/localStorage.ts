import { notEmpty } from './listUtils';

const getLocalStorage = <T>(key: string, initialValue = '[]'): T =>
  JSON.parse(localStorage.getItem(key) || initialValue);

const getListFromLocalStorage = (key: string, initialValue = '[]') =>
  getLocalStorage<string[]>(key, initialValue).filter(notEmpty);

const setLocalStorage = <T>(key: string) => (value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export { getLocalStorage, setLocalStorage, getListFromLocalStorage };
