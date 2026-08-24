const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeFolder(dir, maxWidth = 640, quality = 82) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await optimizeFolder(fullPath, maxWidth, quality);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue;

    const originalSize = stat.size;
    const tempPath = fullPath + '.tmp';

    try {
      const image = sharp(fullPath);
      const metadata = await image.metadata();

      let pipeline = sharp(fullPath);
      if (metadata.width && metadata.width > maxWidth) {
        pipeline = pipeline.resize(maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      if (ext === '.png') {
        // High quality compressed PNG with palette optimization for cards
        await pipeline
          .png({
            quality: quality,
            compressionLevel: 9,
            palette: true,
            effort: 7
          })
          .toFile(tempPath);
      } else {
        await pipeline
          .jpeg({
            quality: quality,
            mozjpeg: true
          })
          .toFile(tempPath);
      }

      const newStat = fs.statSync(tempPath);
      if (newStat.size < originalSize) {
        fs.unlinkSync(fullPath);
        fs.renameSync(tempPath, fullPath);
        console.log(`✓ Optimized ${file}: ${(originalSize / 1024 / 1024).toFixed(2)} MB ➜ ${(newStat.size / 1024).toFixed(1)} KB (-${((1 - newStat.size / originalSize) * 100).toFixed(0)}%)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`- Kept ${file} (already optimal)`);
      }
    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.error(`✗ Error optimizing ${file}:`, err.message);
    }
  }
}

async function run() {
  console.log('🚀 Starting Image Optimization Pipeline...');
  const start = Date.now();

  console.log('\n--- Optimizing Animal Cards ---');
  await optimizeFolder(path.join(__dirname, '../public/cards/animals'), 520, 80);

  console.log('\n--- Optimizing Special Cards ---');
  await optimizeFolder(path.join(__dirname, '../public/cards/specials'), 520, 80);

  console.log('\n--- Optimizing Question Cards ---');
  await optimizeFolder(path.join(__dirname, '../public/cards/questions'), 600, 80);

  console.log('\n--- Optimizing Backgrounds & Art Assets ---');
  await optimizeFolder(path.join(__dirname, '../public/images'), 1280, 80);
  await optimizeFolder(path.join(__dirname, '../src/assets'), 1280, 80);

  console.log(`\n🎉 Optimization complete in ${((Date.now() - start) / 1000).toFixed(1)}s!`);
}

run();
