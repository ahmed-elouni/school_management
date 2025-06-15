import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Button, Select, message } from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  FilePdfOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import SIdebar from "./SIdebar";
import axios from 'axios';

// Styles
const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 24px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const StyledSelect = styled(Select)`
  min-width: 200px;
  border-radius: 4px;
`;

const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TimeTableHeader = styled.thead`
  background-color: #3498db;
  color: white;
`;

const TimeTableHeaderCell = styled.th`
  padding: 12px;
  text-align: center;
  border: 1px solid #e8e8e8;
  font-weight: 500;
`;

const TimeTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TimeTableCell = styled.td`
  padding: 12px;
  border: 1px solid #e8e8e8;
  text-align: center;
  cursor: pointer;
  height: 60px;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9f7fe;
  }

  &.has-course {
    background-color: #e3f2fd;
    font-weight: 500;
  }
`;

const CourseInfo = styled.div`
  font-size: 12px;
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px;
  overflow: hidden;
  line-height: 1.3;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    background-color: #3498db;
    color: white;
  }
  
  .ant-modal-title {
    color: white;
  }
`;

const { Option } = Select;

const EmploiDuTemps = () => {
  // États
  const [niveau, setNiveau] = useState('');
  const [classe, setClasse] = useState('');
  const [anneeScolaire, setAnneeScolaire] = useState('2024-2025');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [duree, setDuree] = useState('1h');
  const [salle, setSalle] = useState('');
  const [professeur, setProfesseur] = useState('');
  const [matiere, setMatiere] = useState('');
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // États pour les données chargées
  const [niveaux, setNiveaux] = useState([]);
  const [classes, setClasses] = useState([]);
  const [salles, setSalles] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Données statiques
  const anneesScolaires = ['2022-2023', '2023-2024', '2024-2025'];
  const heures = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  // Charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        
        // Récupérer les données depuis les APIs
        const [niveauxRes, classesRes, sallesRes, professeursRes, matieresRes] = await Promise.all([
          axios.get('http://localhost:4000/api/v1/niveaux'),
          axios.get('http://localhost:4000/api/v1/class'),
          axios.get('http://localhost:4000/api/v1/salles'),
          axios.get('http://localhost:4000/api/v1/teachers'),
          axios.get('http://localhost:4000/api/v1/matieres')
        ]);
        
        setNiveaux(niveauxRes.data.niveaux || []);
        setClasses(classesRes.data.classes || []);
        setSalles(sallesRes.data.salles || []);
        setProfesseurs(professeursRes.data.teachers || []);
        setMatieres(matieresRes.data.matieres || []);
        
      } catch (error) {
        console.error('Erreur API:', error);
        message.error(`Erreur lors du chargement des données: ${error.message}`);
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchData();
  }, []);

  // Filtrer les classes par niveau sélectionné
  const filteredClasses = classes.filter(c => c.niveau?._id === niveau);

  // Gestion des cellules du tableau
  const handleCellClick = (heure, jour) => {
    setSelectedCell({ heure, jour });
    setIsModalVisible(true);
  };

  // Ajouter un nouveau cours
  const handleOk = () => {
    if (!salle || !professeur || !matiere) {
      message.error('Veuillez remplir tous les champs');
      return;
    }

    const nouveauCours = {
      id: Date.now(),
      heure: selectedCell.heure,
      jour: selectedCell.jour,
      duree,
      salle: salles.find(s => s._id === salle)?.name || salle,
      professeur: professeurs.find(p => p._id === professeur)?.name || professeur,
      matiere: matieres.find(m => m._id === matiere)?.name || matiere
    };

    setCours([...cours, nouveauCours]);
    setIsModalVisible(false);
    resetForm();
    message.success('Cours ajouté avec succès');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setDuree('1h');
    setSalle('');
    setProfesseur('');
    setMatiere('');
  };

  // Supprimer un cours
  const deleteCourse = (id) => {
    setCours(cours.filter(course => course.id !== id));
    message.success('Cours supprimé avec succès');
  };

  // Vérifier si une cellule a un cours
  const hasCourse = (heure, jour) => {
    return cours.some(course => course.heure === heure && course.jour === jour);
  };

  // Afficher les infos du cours dans une cellule
  const getCourseInfo = (heure, jour) => {
    const course = cours.find(c => c.heure === heure && c.jour === jour);
    if (!course) return null;
    
    return (
      <CourseInfo>
        <div><strong>{course.matiere}</strong></div>
        <div>{course.professeur}</div>
        <div>{course.salle} ({course.duree})</div>
        <Button 
          type="text" 
          icon={<DeleteOutlined />} 
          onClick={(e) => {
            e.stopPropagation();
            deleteCourse(course.id);
          }}
          style={{ position: 'absolute', right: 2, top: 2 }}
        />
      </CourseInfo>
    );
  };

  // Exporter en PDF
  const exportToPDF = () => {
    if (cours.length === 0) {
      message.warning('Aucun cours à exporter');
      return;
    }

    const doc = new jsPDF();
    const currentNiveau = niveaux.find(n => n._id === niveau)?.name || niveau;
    const currentClasse = classes.find(c => c._id === classe)?.name || classe;

    doc.setFontSize(18);
    doc.text(`Emploi du temps - ${currentClasse || 'Toutes classes'}`, 105, 15, { align: 'center' });
    doc.text(`Niveau: ${currentNiveau} - Année scolaire: ${anneeScolaire}`, 105, 22, { align: 'center' });

    const tableData = cours.map(course => [
      course.jour,
      course.heure,
      course.matiere,
      course.professeur,
      course.salle,
      course.duree
    ]);

    doc.autoTable({
      startY: 30,
      head: [['Jour', 'Heure', 'Matière', 'Enseignant', 'Salle', 'Durée']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [52, 152, 219] },
      margin: { top: 30 }
    });

    doc.save(`EmploiDuTemps_${currentClasse}_${anneeScolaire}.pdf`);
  };

  // Exporter en Excel
  const exportToExcel = () => {
    if (cours.length === 0) {
      message.warning('Aucun cours à exporter');
      return;
    }

    const currentNiveau = niveaux.find(n => n._id === niveau)?.name || niveau;
    const currentClasse = classes.find(c => c._id === classe)?.name || classe;

    const data = [
      ['Jour', 'Heure', 'Matière', 'Enseignant', 'Salle', 'Durée'],
      ...cours.map(course => [
        course.jour,
        course.heure,
        course.matiere,
        course.professeur,
        course.salle,
        course.duree
      ])
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Emploi du temps');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `EmploiDuTemps_${currentClasse}_${anneeScolaire}.xlsx`);
  };

  // Valider l'emploi du temps
  const validerEmploiDuTemps = async () => {
    setLoading(true);
    
    try {
      if (!niveau || !classe || !anneeScolaire) {
        throw new Error('Veuillez sélectionner un niveau, une classe et une année scolaire');
      }

      if (cours.length === 0) {
        throw new Error('Veuillez ajouter au moins un cours');
      }

      // Préparer les données pour l'API
      const emploiDuTemps = {
        niveau: niveaux.find(n => n._id === niveau)?._id || niveau,
        classe: classes.find(c => c._id === classe)?._id || classe,
        anneeScolaire,
        cours: cours.map(c => ({
          jour: c.jour,
          heure: c.heure,
          duree: c.duree,
          salle: salles.find(s => s.name === c.salle)?._id || c.salle,
          professeur: professeurs.find(p => p.name === c.professeur)?._id || c.professeur,
          matiere: matieres.find(m => m.name === c.matiere)?._id || c.matiere
        })),
        dateCreation: new Date().toISOString()
      };

      // Envoyer à l'API
      const response = await axios.post('http://localhost:4000/api/v1/emplois-du-temps', emploiDuTemps);
      
      message.success('Emploi du temps validé et sauvegardé avec succès');
      exportToPDF();
      
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <SIdebar />
      <ContentContainer>
        <Header>
          <Title>Génération d'emploi du temps</Title>
        </Header>

        <FiltersContainer>
          <StyledSelect
            placeholder="Sélectionner un niveau"
            value={niveau}
            onChange={setNiveau}
            loading={loadingData}
          >
            {niveaux.map(n => (
              <Option key={n._id} value={n._id}>{n.name}</Option>
            ))}
          </StyledSelect>

          <StyledSelect
            placeholder="Sélectionner une classe"
            value={classe}
            onChange={setClasse}
            disabled={!niveau || loadingData}
            loading={loadingData}
          >
            {filteredClasses.map(c => (
              <Option key={c._id} value={c._id}>{c.name}</Option>
            ))}
          </StyledSelect>

          <StyledSelect
            placeholder="Année scolaire"
            value={anneeScolaire}
            onChange={setAnneeScolaire}
          >
            {anneesScolaires.map(a => (
              <Option key={a} value={a}>{a}</Option>
            ))}
          </StyledSelect>
        </FiltersContainer>

        <TimeTable>
          <TimeTableHeader>
            <TimeTableRow>
              <TimeTableHeaderCell>Heure</TimeTableHeaderCell>
              {jours.map(jour => (
                <TimeTableHeaderCell key={jour}>{jour}</TimeTableHeaderCell>
              ))}
            </TimeTableRow>
          </TimeTableHeader>
          <tbody>
            {heures.map(heure => (
              <TimeTableRow key={heure}>
                <TimeTableCell>{heure}</TimeTableCell>
                {jours.map(jour => (
                  <TimeTableCell 
                    key={`${heure}-${jour}`}
                    className={hasCourse(heure, jour) ? 'has-course' : ''}
                    onClick={() => handleCellClick(heure, jour)}
                  >
                    {hasCourse(heure, jour) && getCourseInfo(heure, jour)}
                  </TimeTableCell>
                ))}
              </TimeTableRow>
            ))}
          </tbody>
        </TimeTable>

        <ActionButtons>
          <Button 
            type="primary" 
            icon={<CheckOutlined />}
            onClick={validerEmploiDuTemps}
            loading={loading}
            style={{ backgroundColor: '#2ecc71', borderColor: '#2ecc71' }}
          >
            Valider l'emploi du temps
          </Button>

          <Button 
            type="primary" 
            icon={<FilePdfOutlined />}
            onClick={exportToPDF}
            style={{ backgroundColor: '#e74c3c', borderColor: '#e74c3c' }}
          >
            Exporter PDF
          </Button>

          <Button 
            type="primary" 
            icon={<FileExcelOutlined />}
            onClick={exportToExcel}
            style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}
          >
            Exporter Excel
          </Button>

          <Button 
            danger 
            icon={<CloseOutlined />}
            onClick={() => {
              setCours([]);
              message.info('Emploi du temps réinitialisé');
            }}
          >
            Réinitialiser
          </Button>
        </ActionButtons>

        <StyledModal
          title={`Ajouter un cours - ${selectedCell?.jour} ${selectedCell?.heure}`}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Ajouter"
          cancelText="Annuler"
        >
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Durée</label>
            <Select
              style={{ width: '100%' }}
              value={duree}
              onChange={setDuree}
            >
              <Option value="1h">1h</Option>
              <Option value="1h30min">1h30min</Option>
              <Option value="2h">2h</Option>
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Salle</label>
            <Select
              style={{ width: '100%' }}
              value={salle}
              onChange={setSalle}
              placeholder="Sélectionnez une salle"
              loading={loadingData}
            >
              {salles.map(s => (
                <Option key={s._id} value={s._id}>{s.name}</Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Enseignant</label>
            <Select
              style={{ width: '100%' }}
              value={professeur}
              onChange={setProfesseur}
              placeholder="Sélectionnez un enseignant"
              loading={loadingData}
            >
              {professeurs.map(p => (
                <Option key={p._id} value={p._id}>{p.name}</Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Matière</label>
            <Select
              style={{ width: '100%' }}
              value={matiere}
              onChange={setMatiere}
              placeholder="Sélectionnez une matière"
              loading={loadingData}
            >
              {matieres.map(m => (
                <Option key={m._id} value={m._id}>{m.name}</Option>
              ))}
            </Select>
          </div>
        </StyledModal>
      </ContentContainer>
    </MainContainer>
  );
};

export default EmploiDuTemps;