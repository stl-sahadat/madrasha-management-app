import fs from 'node:fs';

async function main() {
  const files = [
    'https://madrasha.hostzonebd.com/assets/js/pie_charts.js',
    'https://madrasha.hostzonebd.com/assets/js/area_charts.js',
    'https://madrasha.hostzonebd.com/assets/js/mixed.js',
    'https://madrasha.hostzonebd.com/assets/css/style.css'
  ];

  for (const url of files) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const fname = url.split('/').pop();
      fs.writeFileSync(`/tmp/${fname}`, text);
      console.log(`Fetched ${fname}: ${text.length} bytes`);
    } catch (e) {
      console.error(`Failed ${url}:`, e);
    }
  }
}

main();
