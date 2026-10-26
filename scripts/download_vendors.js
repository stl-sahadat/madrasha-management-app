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
  const assets = [
    ['https://madrasha.hostzonebd.com/assets/vendor/bootstrap/bootstrap.min.css', 'public/assets/vendor/bootstrap/bootstrap.min.css'],
    ['https://madrasha.hostzonebd.com/assets/vendor/apexcharts/apexcharts.css', 'public/assets/vendor/apexcharts/apexcharts.css'],
    ['https://madrasha.hostzonebd.com/assets/vendor/animation/animate.min.css', 'public/assets/vendor/animation/animate.min.css'],
    ['https://madrasha.hostzonebd.com/assets/vendor/simplebar/simplebar.css', 'public/assets/vendor/simplebar/simplebar.css'],
    ['https://madrasha.hostzonebd.com/assets/vendor/apexcharts/apexcharts.min.js', 'public/assets/vendor/apexcharts/apexcharts.min.js'],
  ];

  for (const [url, dest] of assets) {
    await download(url, dest);
  }
}

main();
