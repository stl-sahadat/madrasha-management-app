import fs from 'node:fs';
import path from 'node:path';

async function download(url, dest) {
  try {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const res = await fetch(url);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Downloaded ${url} -> ${dest} (${buffer.byteLength} bytes)`);
    } else {
      console.error(`Failed ${url}: ${res.status}`);
    }
  } catch (e) {
    console.error(`Error downloading ${url}:`, e);
  }
}

async function main() {
  await download('https://madrasha.hostzonebd.com/assets/fonts/tabler/tabler-icons.woff2?v2.4.0', 'public/assets/fonts/tabler/tabler-icons.woff2');
  await download('https://madrasha.hostzonebd.com/assets/fonts/tabler/tabler-icons.woff?v2.4.0', 'public/assets/fonts/tabler/tabler-icons.woff');
  await download('https://madrasha.hostzonebd.com/assets/fonts/tabler/tabler-icons.ttf?v2.4.0', 'public/assets/fonts/tabler/tabler-icons.ttf');
}

main();
