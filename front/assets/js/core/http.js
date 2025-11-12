

export const http = {
  async get(url) {
    const res = await fetch(`${API_URL}${url}`);
    if (!res.ok) {
      console.error(`❌ Error HTTP ${res.status}: ${res.statusText}`);
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`✅ GET ${url}`, data);
    return data;
  },

  async post(url, data) {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  },

  async put(url, data) {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  },

  async delete(url) {
    const res = await fetch(`${API_URL}${url}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  },
};
