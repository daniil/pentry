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