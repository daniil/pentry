export const sortStringValueAsc = (data, key) => {
  data.sort((a, b) => {
    const aClean = a[key].toLowerCase();
    const bClean = b[key].toLowerCase();
    if (aClean < bClean) return -1;
    if (aClean > bClean) return 1;
    return 0;
  });
  return data;
}

export const trimObjValues = obj => {
  return Object.entries(obj).reduce((acc, [objKey, objVal]) => {
    return { ...acc, [objKey]: objVal.trim() };
  }, {});
}