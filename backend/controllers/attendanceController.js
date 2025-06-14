import { Attendance } from "../models/attendanceSchema.js";
import { Class } from "../models/classSchema.js";
import { Student } from "../models/studentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { date, classId, records } = req.body;

    // Validation
    if (!date || !classId || !records || !Array.isArray(records)) {
      return handleValidationError("Données de présence invalides", 400);
    }

    // Vérifier si la classe existe
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return handleValidationError("Classe non trouvée", 404);
    }

    // Vérifier les étudiants
    const studentIds = records.map(r => r.studentId);
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      return handleValidationError("Certains étudiants n'existent pas", 400);
    }

    // Créer ou mettre à jour la présence
    const attendance = await Attendance.findOneAndUpdate(
      { date, class: classId },
      {
        $set: { records },
        $setOnInsert: { date, class: classId }
      },
      { upsert: true, new: true }
    ).populate('records.studentId', 'firstName lastName');

    res.status(200).json({
      success: true,
      message: "Présences enregistrées avec succès",
      attendance
    });

  } catch (err) {
    if (err.code === 11000) {
      return handleValidationError("Une entrée de présence existe déjà pour cette date et classe", 400);
    }
    next(err);
  }
};

export const getAttendanceByDateAndClass = async (req, res, next) => {
  try {
    const { date, classId } = req.query;

    if (!date || !classId) {
      return handleValidationError("Date et classe sont requises", 400);
    }

    const attendance = await Attendance.findOne({ 
      date: new Date(date),
      class: classId 
    }).populate('records.studentId', 'firstName lastName class');

    if (!attendance) {
      return res.status(200).json({
        success: true,
        message: "Aucune donnée de présence trouvée",
        attendance: null
      });
    }

    res.status(200).json({
      success: true,
      attendance
    });

  } catch (err) {
    next(err);
  }
};

export const getClassAttendanceSummary = async (req, res, next) => {
  try {
    const { classId } = req.params;
    
    const summary = await Attendance.aggregate([
      { $match: { class: mongoose.Types.ObjectId(classId) } },
      { $unwind: "$records" },
      { 
        $group: {
          _id: "$records.studentId",
          present: { 
            $sum: { 
              $cond: [{ $eq: ["$records.status", "present"] }, 1, 0] 
            } 
          },
          absent: { 
            $sum: { 
              $cond: [{ $eq: ["$records.status", "absent"] }, 1, 0] 
            } 
          },
          excused: { 
            $sum: { 
              $cond: [{ $eq: ["$records.status", "excused"] }, 1, 0] 
            } 
          }
        }
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      {
        $project: {
          studentId: "$_id",
          studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
          class: "$student.class",
          present: 1,
          absent: 1,
          excused: 1,
          total: { $add: ["$present", "$absent", "$excused"] }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      summary
    });

  } catch (err) {
    next(err);
  }
};