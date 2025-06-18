import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceCard,
  DateSelector,
  ClassSelector,
  AttendanceList,
  AttendanceItem,
  StudentInfo,
  StudentName,
  StatusOptions,
  StatusButton,
  SubmitButton,
  FilterContainer,
  SearchInput,
} from '../../styles/AttendanceStyles';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const filters = {
    classe: selectedClass,
    searchQuery: searchTerm,
    page: 1,
    sortBy: 'nom:asc',
  };

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/class');
        setClasses(response.data || []);
      } catch {
        toast.error('Erreur lors du chargement des classes');
      }
    };
    fetchClasses();
  }, []);

  // Fetch students and attendance
  useEffect(() => {
    const fetchStudentsAndAttendance = async () => {
      if (!filters.classe) return;
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:4000/api/v1/students/search', {
          params: filters,
        });
        const studentsList = res.data.data || [];
        setStudents(studentsList);
        console.log('Fetched students:', studentsList);
        // Fetch attendance for selected date and class
        const attRes = await axios.get('http://localhost:4000/api/v1/attendance', {
          params: { date: selectedDate, classId: selectedClass },
        });
        const attendance = attRes.data.attendance;

        // Map students to attendance data, handle nested IDs
        const updatedAttendance = studentsList.map((student) => {
          const record = attendance?.records?.find(
            (r) =>
              r.studentId === student._id ||
              (r.studentId?._id && r.studentId._id === student._id)
          );
          return {
            studentId: student._id,
            // Utiliser prénom + nom dans la bonne casse
            name: `${student.prenom} ${student.nom}`,
            status: record?.status || 'present',
            className: student.classe?.name || 'N/A',
          };
        });
        setAttendanceData(updatedAttendance);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des étudiants ou de la présence.');
        setStudents([]);
        setAttendanceData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentsAndAttendance();
  }, [selectedClass, searchTerm, selectedDate]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status } : item))
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        date: selectedDate,
        classId: selectedClass,
        records: attendanceData.map((item) => ({
          studentId: item.studentId,
          status: item.status,
        })),
      };
      await axios.post('http://localhost:4000/api/v1/attendance', payload);
      toast.success('Présence enregistrée avec succès.');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("Erreur lors de l’enregistrement des présences.");
    }
  };

  const filteredStudents = attendanceData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>Gestion des Présences</AttendanceHeader>

          <AttendanceCard>
            <FilterContainer>
              <DateSelector
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <ClassSelector value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">-- Choisir une classe --</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </ClassSelector>

              <SearchInput
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterContainer>

            {isLoading ? (
              <div>Chargement des données...</div>
            ) : error ? (
              <div style={{ color: 'red' }}>{error}</div>
            ) : (
              <AttendanceList>
                {filteredStudents.map((student) => (
                  <AttendanceItem key={student.studentId}>
                    <StudentInfo>
                      <StudentName>Nom: {student.name}</StudentName>
                      <span>Classe: {student.className}</span>
                    </StudentInfo>

                    <StatusOptions>
                      {['present', 'absent', 'excused'].map((status) => (
                        <StatusButton
                          key={status}
                          active={student.status === status}
                          color={
                            status === 'present'
                              ? '#4CAF50'
                              : status === 'absent'
                              ? '#F44336'
                              : '#FF9800'
                          }
                          onClick={() => handleStatusChange(student.studentId, status)}
                        >
                          {status === 'present' ? 'Présent' : status === 'absent' ? 'Absent' : 'Excusé'}
                        </StatusButton>
                      ))}
                    </StatusOptions>
                  </AttendanceItem>
                ))}
              </AttendanceList>
            )}
          </AttendanceCard>

          <SubmitButton onClick={handleSubmit}>Enregistrer les Présences</SubmitButton>
        </AttendanceContent>
      </Content>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AttendanceContainer>
  );
};

export default Attendance;
