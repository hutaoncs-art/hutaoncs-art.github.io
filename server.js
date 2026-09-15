const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

const phonesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'phones.json'), 'utf-8'));

app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=300');
    }
  }
}));

app.get('/api/phones', (req, res) => {
  res.json({
    success: true,
    count: Object.values(phonesData.brands).reduce((acc, b) => acc + b.models.length, 0),
    brands: Object.keys(phonesData.brands),
    data: phonesData.brands
  });
});

app.get('/api/phones/:brand', (req, res) => {
  const brand = decodeURIComponent(req.params.brand);
  const brandData = phonesData.brands[brand];
  if (!brandData) {
    return res.status(404).json({ success: false, message: `Brand "${brand}" tidak ditemukan` });
  }
  res.json({
    success: true,
    brand,
    color: brandData.color,
    logo: brandData.logo,
    tagline: brandData.tagline,
    count: brandData.models.length,
    models: brandData.models
  });
});

app.get('/api/phones/search/:query', (req, res) => {
  const q = req.params.query.toLowerCase();
  const results = [];
  for (const [brand, data] of Object.entries(phonesData.brands)) {
    for (const model of data.models) {
      if (model.name.toLowerCase().includes(q) || model.type.toLowerCase().includes(q)) {
        results.push({ ...model, brand, brandColor: data.color });
      }
    }
  }
  res.json({ success: true, query: req.params.query, count: results.length, results });
});

app.listen(PORT, () => {
  console.log(`\n  🟢 Doxter Ponsel server running at:\n`);
  console.log(`     → http://localhost:${PORT}\n`);
  console.log(`  📱 API endpoints:`);
  console.log(`     → GET /api/phones           (all brands)`);
  console.log(`     → GET /api/phones/:brand    (models by brand)`);
  console.log(`     → GET /api/phones/search/:q (search models)\n`);
});
