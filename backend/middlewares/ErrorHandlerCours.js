export const ErrorHandlerCours = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Erreur de validation',
        errors: Object.values(err.errors).map(e => e.message) 
      });
    }
    
    if (err.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplication détectée',
        field: Object.keys(err.keyPattern)[0]
      });
    }
    
    res.status(500).json({ message: 'Erreur serveur' });
  };