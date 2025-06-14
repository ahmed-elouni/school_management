app.get('/uploads/announcements/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'public/uploads/announcements', req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Fichier non trouvé' });
  }
});