import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTableImport from "jspdf-autotable"; // importer autoTable et utiliser .default si nécessaire
const autoTable = autoTableImport.default || autoTableImport;

import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  StudentCard,
  StudentPhoto,
  StudentInfo,
  FilterBar,
  FilterSelect,
  SearchInput,
  ActionButton,
  PaginationContainer,
  ViewToggle,
  StudentsTable,
  TableHeader,
  TableRow
} from "../../styles/StudentListStyles";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);

  const [filters, setFilters] = useState({
    niveau: "",
    classe: "",
    searchQuery: "",
    page: 1,
    sortBy: "nom:asc"
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1
  });

  const [viewMode, setViewMode] = useState("grid");

  // Chargement initial des niveaux puis des étudiants
  const fetchInitialData = async () => {
    try {
      const levelsRes = await axios.get('http://localhost:4000/api/v1/niveaux');
      const levelsData = Array.isArray(levelsRes.data) ? levelsRes.data : [];
      setAvailableLevels(levelsData);
      await fetchStudents();
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Chargement des classes selon le niveau sélectionné
  useEffect(() => {
    const fetchClasses = async () => {
      if (filters.niveau) {
        try {
          const res = await axios.get(`http://localhost:4000/api/v1/students/by-level/${filters.niveau}`);
          const uniqueClasses = [...new Set(res.data.data.map(s => s.classe))];
          setAvailableClasses(uniqueClasses);
          // Reset classe et page à 1 uniquement si classe actuelle ne fait pas partie des classes disponibles
          setFilters(prev => ({
            ...prev,
            classe: uniqueClasses.includes(prev.classe) ? prev.classe : '',
            page: 1
          }));
        } catch (err) {
          console.error(err);
          setAvailableClasses([]);
          setFilters(prev => ({ ...prev, classe: '', page: 1 }));
        }
      } else {
        setAvailableClasses([]);
        setFilters(prev => ({ ...prev, classe: '', page: 1 }));
      }
    };
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.niveau]); // on désactive l'avertissement ESLint car on veut que ça se déclenche uniquement sur filters.niveau

  // Chargement des étudiants selon filtres
  const fetchStudents = async () => {
    try {
      const params = { ...filters };
      if (!params.niveau) delete params.niveau;
      if (!params.classe) delete params.classe;
      if (!params.searchQuery) delete params.searchQuery;

      const res = await axios.get("http://localhost:4000/api/v1/students/search", { params });
      setStudents(res.data.data);
      setPagination({
        total: res.data.total,
        pages: res.data.pages
      });
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des étudiants.');
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page, filters.niveau, filters.classe, filters.searchQuery, filters.sortBy]);

  // Gestion des filtres
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  // Gestion du tri
  const handleSortChange = (field) => {
    const [currentField, currentOrder] = filters.sortBy.split(':');
    let newOrder = 'asc';
    if (currentField === field) {
      newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    }
    setFilters(prev => ({ ...prev, sortBy: `${field}:${newOrder}`, page: 1 }));
  };

  // Calcul de l'âge (en années)
  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    if (isNaN(birth)) return '';
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // Export PDF
  const exportToPDF = async () => {
    if (!filters.niveau || !filters.classe) {
      alert("Veuillez sélectionner un niveau et une classe");
      return;
    }

    try {
      // Tentative export serveur
      const response = await axios.get(
        `/api/students/export-pdf/${filters.niveau}/${filters.classe}`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `eleves_${filters.niveau}_${filters.classe}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Erreur serveur, tentative en client-side:", err);
      // Fallback client-side
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(`Liste des élèves - ${filters.niveau} ${filters.classe}`, 105, 15, { align: 'center' });

      autoTable(doc, {
        startY: 25,
        head: [['Nom', 'Prénom', 'Classe', 'Âge']],
        body: students.map(student => [
          student.nom,
          student.prenom,
          student.classe,
          calculateAge(student.dateNaissance)
        ]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [52, 152, 219] }
      });

      doc.save(`eleves_${filters.niveau}_${filters.classe}.pdf`);
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <StudentsContainer>
      <Content>
        <StudentsContent>
          <StudentsHeader>
            <h2>Liste des Élèves</h2>

            <ViewToggle>
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                Grille
              </button>
              <button
                className={viewMode === 'table' ? 'active' : ''}
                onClick={() => setViewMode('table')}
              >
                Tableau
              </button>
            </ViewToggle>
          </StudentsHeader>

          <FilterBar>
            <div className="filters">
              <FilterSelect
                value={filters.niveau}
                onChange={e => handleFilterChange('niveau', e.target.value)}
              >
                <option value="">Tous les niveaux</option>
                {availableLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </FilterSelect>

              <FilterSelect
                value={filters.classe}
                onChange={e => handleFilterChange('classe', e.target.value)}
                disabled={!filters.niveau}
              >
                <option value="">Toutes les classes</option>
                {availableClasses.map(classe => (
                  <option key={classe} value={classe}>{classe}</option>
                ))}
              </FilterSelect>

              <SearchInput
                type="text"
                placeholder="Rechercher un élève..."
                value={filters.searchQuery}
                onChange={e => handleFilterChange('searchQuery', e.target.value)}
              />
            </div>

            <div className="actions">
              <ActionButton onClick={exportToPDF}>
                Exporter PDF
              </ActionButton>
            </div>
          </FilterBar>

          {viewMode === 'grid' ? (
            <div className="students-grid">
              {students.map(student => (
                <StudentCard key={student._id}>
                  {student.photoIdentite ? (
                    <StudentPhoto
                      src={`/uploads/${student.photoIdentite}`}
                      alt={`${student.prenom} ${student.nom}`}
                    />
                  ) : (
                    <div className="photo-placeholder">
                      {student.prenom?.charAt(0)}{student.nom?.charAt(0)}
                    </div>
                  )}
                  <StudentInfo>
                    <h3>{student.prenom} {student.nom}</h3>
                    <p>Classe: {student.classe}</p>
                    <p>Matricule: {student.matricule}</p>
                    <p>Âge: {calculateAge(student.dateNaissance)} ans</p>
                  </StudentInfo>
                </StudentCard>
              ))}
            </div>
          ) : (
            <StudentsTable>
              <TableHeader>
                <div onClick={() => handleSortChange('nom')}>
                  Nom {filters.sortBy.startsWith('nom') && (
                    <span>{filters.sortBy.endsWith('asc') ? '↑' : '↓'}</span>
                  )}
                </div>
                <div onClick={() => handleSortChange('prenom')}>
                  Prénom {filters.sortBy.startsWith('prenom') && (
                    <span>{filters.sortBy.endsWith('asc') ? '↑' : '↓'}</span>
                  )}
                </div>
                <div>Classe</div>
                <div>Matricule</div>
                <div onClick={() => handleSortChange('dateNaissance')}>
                  Âge {filters.sortBy.startsWith('dateNaissance') && (
                    <span>{filters.sortBy.endsWith('asc') ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHeader>

              {students.map(student => (
                <TableRow key={student._id}>
                  <div>{student.nom}</div>
                  <div>{student.prenom}</div>
                  <div>{student.classe}</div>
                  <div>{student.matricule}</div>
                  <div>{calculateAge(student.dateNaissance)} ans</div>
                </TableRow>
              ))}
            </StudentsTable>
          )}

          {pagination.pages > 1 && (
            <PaginationContainer>
              <button
                onClick={() => handleFilterChange('page', filters.page - 1)}
                disabled={filters.page === 1}
              >
                Précédent
              </button>

              <span>Page {filters.page} sur {pagination.pages}</span>

              <button
                onClick={() => handleFilterChange('page', filters.page + 1)}
                disabled={filters.page === pagination.pages}
              >
                Suivant
              </button>
            </PaginationContainer>
          )}
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default StudentList;
