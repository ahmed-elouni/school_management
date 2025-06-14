import React, { useState, useEffect } from 'react';
import Sidebar from './SIdebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PerformanceContainer,
  Content,
  PerformanceContent,
  PerformanceHeader,
  PerformanceCard,
  PerformanceGrid,
  MetricCard,
  MetricValue,
  MetricLabel,
  StudentTable,
  TableHeader,
  TableRow,
  TableCell,
  SubjectChart,
  ClassSelector,
  LoadingSpinner,
  EmptyState,
  FilterContainer,
  SearchInput,
  TermSelector
} from '../../styles/PerformanceStyles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Performance = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [classes, setClasses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [subjectData, setSubjectData] = useState([]);
  const [disciplineData, setDisciplineData] = useState([]);

  useEffect(() => {
    fetchSchoolData();
    fetchClasses();
    fetchTerms();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedTerm) {
      fetchClassPerformance();
      fetchDisciplinePerformance();
      fetchSubjectPerformance();
    }
  }, [selectedClass, selectedTerm]);

  const fetchSchoolData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/performance/school');
      setSchoolData(response.data);
    } catch (error) {
      toast.error("Échec du chargement des données de performance de l'école");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class');
      setClasses(response.data.classes || []);
      if (response.data.classes.length > 0) {
        setSelectedClass(response.data.classes[0]._id);
      }
    } catch (error) {
      toast.error('Échec du chargement des classes');
    }
  };

  const fetchTerms = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/trimestres');
      setTerms(response.data || []);
      if (response.data.length > 0) {
        setSelectedTerm(response.data[0]._id);
      }
    } catch (error) {
      toast.error('Échec du chargement des trimestres');
    }
  };

  const fetchClassPerformance = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:4000/api/v1/performance/class/${selectedClass}?term=${selectedTerm}`);
      setStudents(response.data.students || []);
    } catch (error) {
      toast.error('Échec du chargement de la performance de la classe');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDisciplinePerformance = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/performance/disciplines/${selectedClass}?term=${selectedTerm}`);
      setDisciplineData(response.data.disciplines || []);
    } catch (error) {
      toast.error('Échec du chargement des données par discipline');
    }
  };

  const fetchSubjectPerformance = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/performance/subjects/${selectedClass}?term=${selectedTerm}`);
      setSubjectData(response.data.subjects || []);
    } catch (error) {
      toast.error('Échec du chargement des données par matière');
    }
  };

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPerformanceColor = (score) => {
    if (score >= 16) return '#4CAF50';
    if (score >= 12) return '#8BC34A';
    if (score >= 8) return '#FFC107';
    return '#F44336';
  };

  const prepareDisciplineChartData = () => {
    return disciplineData.map(discipline => ({
      name: discipline.name,
      moyenne: discipline.averageScore,
      tauxReussite: discipline.passRate
    }));
  };

  const getCurrentTermName = () => {
    const term = terms.find(t => t._id === selectedTerm);
    return term ? term.nom : 'Trimestre';
  };

  return (
    <PerformanceContainer>
      <Sidebar />
      <Content>
        <PerformanceContent>
          <PerformanceHeader>Tableau de Bord de Performance - {getCurrentTermName()}</PerformanceHeader>

          <PerformanceCard>
            <h2>Performance Globale de l'École</h2>
            {schoolData ? (
              <PerformanceGrid>
                <MetricCard>
                  <MetricValue>{schoolData.averageScore?.toFixed(2) || 'N/A'}</MetricValue>
                  <MetricLabel>Moyenne Générale</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{schoolData.totalStudents ?? 'N/A'}</MetricValue>
                  <MetricLabel>Élèves</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{schoolData.passRate ?? 'N/A'}%</MetricValue>
                  <MetricLabel>Taux de Réussite</MetricLabel>
                </MetricCard>
                <MetricCard>
                  <MetricValue>{schoolData.topClass ?? 'N/A'}</MetricValue>
                  <MetricLabel>Meilleure Classe</MetricLabel>
                </MetricCard>
              </PerformanceGrid>
            ) : (
              <LoadingSpinner />
            )}
          </PerformanceCard>

          <PerformanceCard>
            <FilterContainer>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <ClassSelector
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  {classes.map(cls => (
                    <option key={cls._id} value={cls._id}>{cls.name}</option>
                  ))}
                </ClassSelector>

                <TermSelector
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                >
                  {terms.map(term => (
                    <option key={term._id} value={term._id}>
                      {term.nom} ({new Date(term.dateDebut).getFullYear()})
                    </option>
                  ))}
                </TermSelector>
              </div>

              <SearchInput
                type="text"
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FilterContainer>
          </PerformanceCard>

          {disciplineData.length > 0 && (
            <PerformanceCard>
              <h2>Performance par Discipline</h2>
              <SubjectChart>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={prepareDisciplineChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => name === 'tauxReussite' ? [`${value}%`, 'Taux de Réussite'] : [value, 'Moyenne']} />
                    <Legend />
                    <Bar dataKey="moyenne" fill="#4a90e2" name="Moyenne" />
                    <Bar dataKey="tauxReussite" fill="#4CAF50" name="Taux de Réussite (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </SubjectChart>
            </PerformanceCard>
          )}

          {subjectData.length > 0 && (
            <PerformanceCard>
              <h2>Performance par Matière</h2>
              <SubjectChart>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={subjectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => name === 'passRate' ? [`${value}%`, 'Taux de Réussite'] : [value, 'Moyenne']} />
                    <Legend />
                    <Bar dataKey="averageScore" fill="#4a90e2" name="Moyenne" />
                    <Bar dataKey="passRate" fill="#4CAF50" name="Taux de Réussite (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </SubjectChart>
            </PerformanceCard>
          )}

          <PerformanceCard>
            <h2>Performance des Élèves</h2>
            {isLoading ? (
              <LoadingSpinner />
            ) : filteredStudents.length === 0 ? (
              <EmptyState>Aucun élève trouvé</EmptyState>
            ) : (
              <StudentTable>
                <TableHeader>
                  <TableCell>Élève</TableCell>
                  <TableCell>Moyenne</TableCell>
                  <TableCell>Rang</TableCell>
                  <TableCell>Disciplines</TableCell>
                  <TableCell>Évolution</TableCell>
                </TableHeader>
                {filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.firstName} {student.lastName}</TableCell>
                    <TableCell>
                      <div style={{
                        backgroundColor: getPerformanceColor(student.averageScore),
                        color: 'white',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '12px',
                        display: 'inline-block'
                      }}>
                        {typeof student.averageScore === 'number' ? student.averageScore.toFixed(2) : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>{student.rank ?? 'N/A'}</TableCell>
                    <TableCell>
                      {Array.isArray(student.topDisciplines) ? student.topDisciplines.map(d => d.name).join(', ') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {student.trend === 'up' ? (
                        <span style={{ color: '#4CAF50' }}>↑ Amélioration</span>
                      ) : student.trend === 'down' ? (
                        <span style={{ color: '#F44336' }}>↓ Baisse</span>
                      ) : (
                        <span>→ Stable</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </StudentTable>
            )}
          </PerformanceCard>
        </PerformanceContent>
      </Content>
    </PerformanceContainer>
  );
};

export default Performance;
