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
      console.log(`Downloaded ${url} -> ${dest}`);
    } else {
      console.error(`Failed ${url}: ${res.status}`);
    }
  } catch (e) {
    console.error(`Error downloading ${url}:`, e);
  }
}

async function main() {
  await download(
    'https://madrasha.hostzonebd.com/storage/institute/sidelogo/kZvKJCWGaUTdn3y6ZSjepGWQoM2vD9wRM6iBLrRl.png',
    'public/storage/institute/sidelogo/kZvKJCWGaUTdn3y6ZSjepGWQoM2vD9wRM6iBLrRl.png'
  );
  await download(
    'https://madrasha.hostzonebd.com/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png',
    'public/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png'
  );
  await download(
    'https://madrasha.hostzonebd.com/assets/css/responsive.css',
    'public/assets/css/responsive.css'
  );
  await download(
    'https://madrasha.hostzonebd.com/assets/vendor/tabler-icons/tabler-icons.css',
    'public/assets/vendor/tabler-icons/tabler-icons.css'
  );
}

main();
