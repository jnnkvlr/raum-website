const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine einrichten
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/impressum', (req, res) => {
  res.render('impressum');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});