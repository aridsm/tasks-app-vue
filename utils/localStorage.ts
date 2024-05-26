export function getFromLocalStorage(key: string) {
  if (window) {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : undefined;
  }

  return undefined;
}

export function setToLocalStorage(key: string, value: Object & { id: number }) {
  let localStorageItem = getFromLocalStorage(key) || [value];

  if (localStorageItem) {
    const index = localStorageItem.findIndex(
      (item: any) => item.id === value.id
    );

    if (index >= 0) {
      localStorageItem.splice(index, 1, value);
    } else {
      localStorageItem.push(value);
    }
  }

  localStorageItem = JSON.stringify(localStorageItem);
  localStorage.setItem(key, localStorageItem);
}

export function setArrayToLocalStorage(key: string, arr: any[]) {
  const arrayJSON = JSON.stringify(arr);

  localStorage.setItem(key, arrayJSON);
}

export function removeFromLocalStorage(key: string, id: number) {
  let localStorageItem = getFromLocalStorage(key);

  if (localStorageItem) {
    const index = localStorageItem.findIndex((item: any) => item.id === id);

    if (index >= 0) {
      localStorageItem.splice(index, 1);
    }

    localStorageItem = JSON.stringify(localStorageItem);
    localStorage.setItem(key, localStorageItem);
  }
}

export function clearFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
