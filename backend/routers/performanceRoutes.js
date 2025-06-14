import express from 'express';
import {
  getSchoolPerformance,
  getClassPerformance,
  getDisciplinePerformance,
  getSubjectPerformance,
  updatePerformance
} from '../controllers/performanceController.js';

const router = express.Router();

router.get('/school', getSchoolPerformance);
router.get('/class/:classId', getClassPerformance);
router.get('/disciplines/:classId', getDisciplinePerformance);
router.get('/subjects/:classId', getSubjectPerformance);
router.put('/:performanceId', updatePerformance);
router.get('/class/:classId', async (req, res) => {
  try {
    const { classId } = req.params;
    const { term } = req.query; // Maintenant l'ID du trimestre
    
    if (!term) {
      return res.status(400).json({ message: "L'ID du trimestre est requis" });
    }

    // Vérifiez que le trimestre existe
    const trimestreExists = await Trimestre.findById(term);
    if (!trimestreExists) {
      return res.status(404).json({ message: "Trimestre non trouvé" });
    }

    const performanceData = await getClassPerformance(classId, term);
    res.json(performanceData);

  } catch (error) {
    res.status(500).json({ 
      message: "Erreur serveur",
      error: error.message 
    });
  }
});

export default router;