import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTableImport from "jspdf-autotable";
import Sidebar from "./SIdebar";

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

const autoTable = autoTableImport.default || autoTableImport;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

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

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    fetchClassesByLevel(filters.niveau);
  }, [filters.niveau]);

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const fetchLevels = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/niveaux');
      setAvailableLevels(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur chargement niveaux", err);
      setError("Erreur lors du chargement des niveaux");
    }
  };

  const fetchClassesByLevel = async (niveauId) => {
    if (!niveauId) {
      setAvailableClasses([]);
      setFilters(prev => ({ ...prev, classe: "" }));
      return;
    }
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/class/by-level/${niveauId}`);
      setAvailableClasses(Array.isArray(res.data) ? res.data : []);
      setFilters(prev => ({ ...prev, classe: "", page: 1 }));
    } catch (err) {
      console.error("Erreur chargement classes", err);
      setAvailableClasses([]);
      setFilters(prev => ({ ...prev, classe: "", page: 1 }));
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.niveau) params.niveau = filters.niveau;
      if (filters.classe) params.classe = filters.classe;
      if (filters.searchQuery) params.searchQuery = filters.searchQuery;
      params.page = filters.page;
      params.sortBy = filters.sortBy;

      const res = await axios.get('http://localhost:4000/api/v1/students/search', { params });
      setStudents(res.data.data);
      setPagination({ total: res.data.total, pages: res.data.pages });
      setError(null);
    } catch (err) {
      console.error("Erreur chargement étudiants", err);
      setError("Erreur lors du chargement des étudiants.");
      setStudents([]);
    }
    setLoading(false);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleSortChange = (field) => {
    const [currentField, currentOrder] = filters.sortBy.split(":");
    const newOrder = currentField === field && currentOrder === "asc" ? "desc" : "asc";
    setFilters(prev => ({ ...prev, sortBy: `${field}:${newOrder}`, page: 1 }));
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const birth = new Date(birthDate);
    if (isNaN(birth)) return "";
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const exportToPDF = async () => {
    if (!filters.niveau || !filters.classe) {
      alert("Veuillez sélectionner un niveau et une classe");
      return;
    }

    try {
      const response = await axios.get(`/api/students/export-pdf/${filters.niveau}/${filters.classe}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `eleves_${filters.niveau}_${filters.classe}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Erreur serveur, tentative en client-side:", err);
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(`Liste des élèves - ${filters.niveau} ${filters.classe}`, 105, 15, { align: "center" });

      autoTable(doc, {
        startY: 25,
        head: [["Nom", "Prénom", "Classe", "Âge"]],
        body: students.map(s => [s.nom, s.prenom, s.classe?.name || "", calculateAge(s.dateNaissance)]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [52, 152, 219] }
      });

      doc.save(`eleves_${filters.niveau}_${filters.classe}.pdf`);
    }
  };

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>
            <h2>Liste des Élèves</h2>
            <ViewToggle>
              <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>Grille</button>
              <button className={viewMode === "table" ? "active" : ""} onClick={() => setViewMode("table")}>Tableau</button>
            </ViewToggle>
          </StudentsHeader>

          <FilterBar>
            <div className="filters">
              <FilterSelect value={filters.niveau} onChange={e => handleFilterChange("niveau", e.target.value)}>
                <option value="">Tous les niveaux</option>
                {availableLevels.map(level => <option key={level._id} value={level._id}>{level.name}</option>)}
              </FilterSelect>

              <FilterSelect value={filters.classe} onChange={e => handleFilterChange("classe", e.target.value)} disabled={!filters.niveau}>
                <option value="">Toutes les classes</option>
                {availableClasses.map(classe => <option key={classe._id} value={classe._id}>{classe.name}</option>)}
              </FilterSelect>

              <SearchInput type="text" placeholder="Rechercher un élève..." value={filters.searchQuery} onChange={e => handleFilterChange("searchQuery", e.target.value)} />
            </div>

            <div className="actions">
              <ActionButton onClick={exportToPDF}>Exporter PDF</ActionButton>
            </div>
          </FilterBar>

          {viewMode === "grid" ? (
            <div className="students-grid">
              {students.map(student => (
                <StudentCard key={student._id}>
                  {student.photoIdentite ? (
                    <StudentPhoto src={`/uploads/${student.photoIdentite}`} alt={`${student.prenom} ${student.nom}`} />
                  ) : (
                    <div className="photo-placeholder">{student.prenom?.charAt(0)}{student.nom?.charAt(0)}</div>
                  )}
                  <StudentInfo>
                    <h3>{student.prenom} {student.nom}</h3>
                    <p>Classe: {student.classe?.name}</p>
                    <p>Matricule: {student.matricule}</p>
                    <p>Âge: {calculateAge(student.dateNaissance)} ans</p>
                  </StudentInfo>
                </StudentCard>
              ))}
            </div>
          ) : (
            <StudentsTable>
              <TableHeader>
                <div onClick={() => handleSortChange("nom")}>Nom {filters.sortBy.startsWith("nom") && <span>{filters.sortBy.endsWith("asc") ? "↑" : "↓"}</span>}</div>
                <div onClick={() => handleSortChange("prenom")}>Prénom {filters.sortBy.startsWith("prenom") && <span>{filters.sortBy.endsWith("asc") ? "↑" : "↓"}</span>}</div>
                <div>Classe</div>
                <div>Matricule</div>
                <div onClick={() => handleSortChange("dateNaissance")}>Âge {filters.sortBy.startsWith("dateNaissance") && <span>{filters.sortBy.endsWith("asc") ? "↑" : "↓"}</span>}</div>
              </TableHeader>
              {students.map(student => (
                <TableRow key={student._id}>
                  <div>{student.nom}</div>
                  <div>{student.prenom}</div>
                  <div>{student.classe?.name}</div>
                  <div>{student.matricule}</div>
                  <div>{calculateAge(student.dateNaissance)} ans</div>
                </TableRow>
              ))}
            </StudentsTable>
          )}
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default StudentList;
