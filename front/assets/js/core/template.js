export async function renderTemplate(path, data = {}) {
  const url = `assets/js/templates/${path}`;
  console.log('Cargando template:', url);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`❌ No se pudo cargar el template: ${url} (${res.status})`);
  }

  const content = await res.text();
  if (content.includes('<!DOCTYPE html>') && content.includes('<html')) {
    console.warn(`⚠️ Atención: el servidor devolvió index.html en vez de ${path}`);
  }

  let template = content;
  for (const [key, value] of Object.entries(data)) {
     if (Array.isArray(value)) continue; 
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    template = template.replace(regex, value ?? '');
  }

  const eachRegex = /{{#each (\w+)}}([\s\S]*?){{\/each}}/g;
  template = template.replace(eachRegex, (_, arrayKey, inner) => {
    if (!Array.isArray(data[arrayKey])) return '';
    return data[arrayKey].map(item => {
      let rendered = inner;
      for (const [k, v] of Object.entries(item)) {
        const regex = new RegExp(`{{\\s*${k}\\s*}}`, 'g');
        rendered = rendered.replace(regex, v ?? '');
      }
      return rendered;
    }).join('');
  });


  return template;
}
