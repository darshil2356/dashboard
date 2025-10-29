function saveProductToStorage(product) {
  const STORAGE_KEY = "mockProducts";
  const saved = localStorage.getItem(STORAGE_KEY);
  let list = [];

  if (saved) {
    try {
      list = JSON.parse(saved);
    } catch {}
  }

  const index = list.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    list[index] = product; // update
  } else {
    list.push(product); // add new
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
