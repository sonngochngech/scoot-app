/* eslint-disable no-restricted-globals */
self.onmessage = function(e) {
  const { query, options } = e.data;
  
  function normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/gi, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  const normalizedQuery = normalizeText(query);
  const filtered = options.filter(option =>
    normalizeText(option.name).includes(normalizedQuery)
  );
  
  self.postMessage(filtered);
};
