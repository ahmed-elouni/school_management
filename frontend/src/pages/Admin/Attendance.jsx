// Attendance.js
import React, { useState, useEffect } from 'react';
import Sidebar from './SIdebar';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  RadioGroup,
  RadioLabel
} from '../../styles/AttendanceStyles';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, [selectedClass]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class');
      setClasses(response.data.classes);
      if (response.data.classes.length > 0 && !selectedClass) {
        setSelectedClass(response.data.classes[0].id);
      }
    } catch (error) {
      toast.error('Failed to load classes');
    }
  };

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const url = selectedClass 
        ? `http://localhost:4000/api/v1/students?classId=${selectedClass}`
        : 'http://localhost:4000/api/v1/students';
      const response = await axios.get(url);
      setStudents(response.data.students);
      initializeAttendanceData(response.data.students);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeAttendanceData = (students) => {
    const initialData = students.map(student => ({
      studentId: student.id,
      name: `${student.firstName} ${student.lastName}`,
      status: 'present',
      class: student.class
    }));
    setAttendanceData(initialData);
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => 
      prev.map(item => 
        item.studentId === studentId ? { ...item, status } : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        date: selectedDate,
        classId: selectedClass,
        records: attendanceData.map(item => ({
          studentId: item.studentId,
          status: item.status
        }))
      };

      await axios.post('http://localhost:4000/api/v1/attendance', payload);
      toast.success('Attendance saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save attendance');
    }
  };

  const filteredStudents = attendanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#4CAF50';
      case 'absent': return '#F44336';
      case 'excused': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

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
              
              <ClassSelector
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </ClassSelector>
              
              <SearchInput
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterContainer>

            <RadioGroup>
              <RadioLabel>
                <input
                  type="radio"
                  name="statusFilter"
                  checked={filterStatus === 'all'}
                  onChange={() => setFilterStatus('all')}
                />
                Tous
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="statusFilter"
                  checked={filterStatus === 'present'}
                  onChange={() => setFilterStatus('present')}
                />
                Présents
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="statusFilter"
                  checked={filterStatus === 'absent'}
                  onChange={() => setFilterStatus('absent')}
                />
                Absents
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="statusFilter"
                  checked={filterStatus === 'excused'}
                  onChange={() => setFilterStatus('excused')}
                />
                Excusés
              </RadioLabel>
            </RadioGroup>

            {isLoading ? (
              <div>Chargement...</div>
            ) : (
              <AttendanceList>
                {filteredStudents.map(student => (
                  <AttendanceItem key={student.studentId}>
                    <StudentInfo>
                      <StudentName>{student.name}</StudentName>
                      <span>Classe: {student.class}</span>
                    </StudentInfo>
                    
                    <StatusOptions>
                      <StatusButton 
                        active={student.status === 'present'}
                        color="#4CAF50"
                        onClick={() => handleStatusChange(student.studentId, 'present')}
                      >
                        Présent
                      </StatusButton>
                      <StatusButton 
                        active={student.status === 'absent'}
                        color="#F44336"
                        onClick={() => handleStatusChange(student.studentId, 'absent')}
                      >
                        Absent
                      </StatusButton>
                      <StatusButton 
                        active={student.status === 'excused'}
                        color="#FF9800"
                        onClick={() => handleStatusChange(student.studentId, 'excused')}
                      >
                        Excusé
                      </StatusButton>
                    </StatusOptions>
                  </AttendanceItem>
                ))}
              </AttendanceList>
            )}
          </AttendanceCard>

          <SubmitButton onClick={handleSubmit}>
            Enregistrer les Présences
          </SubmitButton>
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default Attendance;