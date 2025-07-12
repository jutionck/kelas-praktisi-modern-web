// Kita disini akan membuat web api sederhana
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

// end point API atau URL => localhost:3000/message

// CORS
app.get('/message', (req, res) => {
  res.json({ message: 'Kelas Praktisi Web Menggunakan Teknologi JavaScript' });
  // res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
