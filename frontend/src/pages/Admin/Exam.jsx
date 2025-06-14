import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Select, Input, message, Divider, Row, Col, Space } from 'antd';
import { SearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import useStyles from '../../styles/ExamStyles';
import SIdebar from "./SIdebar";
import axios from 'axios';

const { Option } = Select;

const Exam = () => {
  const classes = useStyles();

  // États pour les données
  const [eleves, setEleves] = useState([]);
  const [notes, setNotes] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [classesDisponibles, setClassesDisponibles] = useState([]);
  const [loading, setLoading] = useState({
    eleves: false,
    notes: false,
    disciplines: false,
    matieres: false
  });
  const [anneesScolaires, setAnneesScolaires] = useState([]);
  const [trimestres, setTrimestres] = useState([]);
  const [selectedAnnee, setSelectedAnnee] = useState(null);
  // États pour les filtres
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [selectedTrimestre, setSelectedTrimestre] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Charger les données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const anneesRes = await axios.get('http://localhost:4000/api/v1/annees-scolaires');
      setAnneesScolaires(anneesRes.data.data || []);
      
      // Charger les trimestres de l'année courante si elle existe
      const anneeCourante = anneesRes.data.data.find(a => a.isCurrent);
      if (anneeCourante) {
        setSelectedAnnee(anneeCourante._id);
        const trimestresRes = await axios.get(`http://localhost:4000/api/v1/trimestres/by-annee/${anneeCourante._id}`);
        setTrimestres(trimestresRes.data.data || []);
      }
        setLoading(prev => ({ ...prev, eleves: true }));
        const elevesRes = await axios.get('http://localhost:4000/api/v1/eleves');
        setEleves(elevesRes.data.eleves || []);
        const uniqueClasses = [...new Set(elevesRes.data.eleves.map(e => e.classe?.name))].filter(Boolean);
        setClassesDisponibles(uniqueClasses);

        setLoading(prev => ({ ...prev, notes: true }));
        const notesRes = await axios.get('http://localhost:4000/api/v1/notes');
        setNotes(notesRes.data.notes || []);

        setLoading(prev => ({ ...prev, disciplines: true }));
        const disciplinesRes = await axios.get('http://localhost:4000/api/v1/disciplines');
        setDisciplines(disciplinesRes.data.disciplines || []);

        setLoading(prev => ({ ...prev, matieres: true }));
        const matieresRes = await axios.get('http://localhost:4000/api/v1/matieres');
        setMatieres(matieresRes.data.matieres || []);

      } catch (error) {
        message.error('Erreur lors du chargement des données');
        console.error('Error:', error);
      } finally {
        setLoading({ eleves: false, notes: false, disciplines: false, matieres: false });
      }
    };

    fetchData();
  }, []);
  const handleAnneeChange = async (anneeId) => {
    setSelectedAnnee(anneeId);
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/trimestres/by-annee/${anneeId}`);
      setTrimestres(res.data.data || []);
      setSelectedTrimestre(null); // Réinitialiser le trimestre sélectionné
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Filtrer les élèves par classe sélectionnée
  const elevesFiltres = selectedClasse 
    ? eleves.filter(eleve => eleve.classe?.name === selectedClasse)
    : eleves;

  // Grouper les matières par discipline
  const matieresParDiscipline = disciplines.map(discipline => {
    const matieresDiscipline = matieres.filter(m => m._id === discipline.matiere?._id);
    return {
      discipline: discipline.name,
      matieres: matieresDiscipline
    };
  });

  // Préparer les données pour le tableau
  const prepareBulletinData = () => {
    return elevesFiltres.map(eleve => {
      const notesEleve = selectedTrimestre
        ? notes.filter(note => note.eleve?._id === eleve._id && note.trimestre === selectedTrimestre)
        : notes.filter(note => note.eleve?._id === eleve._id);
      
      // Créer un objet avec toutes les matières et leurs notes
      const matieresWithNotes = {};
      matieres.forEach(matiere => {
        const note = notesEleve.find(n => n.matiere?._id === matiere._id);
        matieresWithNotes[matiere.name] = note 
          ? { 
              note: note.note, 
              appreciation: note.appreciation, 
              id: note._id,
              matiereId: matiere._id,
              eleveId: eleve._id
            } 
          : { 
              note: '-', 
              appreciation: '-', 
              id: null,
              matiereId: matiere._id,
              eleveId: eleve._id
            };
      });

      return {
        key: eleve._id,
        eleveId: eleve._id,
        eleve: `${eleve.nom} ${eleve.prenom}`,
        classe: eleve.classe?.name || 'Non attribué',
        ...matieresWithNotes
      };
    });
  };

  const bulletinData = prepareBulletinData();

  // Colonnes dynamiques pour le tableau
  const getColumns = () => {
    const baseColumns = [
      {
        title: 'Élève',
        dataIndex: 'eleve',
        key: 'eleve',
        filteredValue: [searchText],
        onFilter: (value, record) => 
          record.eleve.toLowerCase().includes(value.toLowerCase()),
        fixed: 'left'
      },
      {
        title: 'Classe',
        dataIndex: 'classe',
        key: 'classe',
        fixed: 'left'
      }
    ];

    // Ajouter une colonne pour chaque discipline avec ses matières
    matieresParDiscipline.forEach(({ discipline, matieres }) => {
      baseColumns.push({
        title: discipline,
        key: discipline,
        children: matieres.map(matiere => ({
          title: matiere.name,
          key: matiere.name,
          render: (_, record) => (
            <div>
              <div>
                <Input 
                  value={record[matiere.name]?.note || ''}
                  onChange={(e) => handleNoteChange(
                    record.eleveId, 
                    matiere._id, 
                    'note', 
                    e.target.value,
                    record[matiere.name]?.id
                  )}
                  style={{ width: 60 }}
                />
              </div>
              <div>
                <Input 
                  value={record[matiere.name]?.appreciation || ''}
                  onChange={(e) => handleNoteChange(
                    record.eleveId, 
                    matiere._id, 
                    'appreciation', 
                    e.target.value,
                    record[matiere.name]?.id
                  )}
                  style={{ width: 120 }}
                />
              </div>
            </div>
          )
        }))
      });
    });

    // Ajouter la colonne d'export
    baseColumns.push({
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Button
          icon={<FilePdfOutlined />}
          onClick={() => exportBulletinComplet(record.eleveId)}
          size="small"
          disabled={!selectedTrimestre}
        >
          Bulletin
        </Button>
      )
    });

    return baseColumns;
  };

  // Gestion des changements de notes
  const handleNoteChange = async (eleveId, matiereId, field, value, noteId) => {
    try {
      let updatedNotes = [...notes];
      const noteData = {
        eleve: eleveId,
        matiere: matiereId,
        [field]: field === 'note' ? parseFloat(value) || 0 : value,
        trimestre: selectedTrimestre || 1
      };

      if (noteId) {
        // Mise à jour de la note existante
        const response = await axios.put(`http://localhost:4000/api/v1/notes/${noteId}`, noteData);
        const updatedNote = response.data.note;
        
        updatedNotes = updatedNotes.map(n => 
          n._id === noteId ? updatedNote : n
        );
      } else {
        // Création d'une nouvelle note
        const response = await axios.post('http://localhost:4000/api/v1/notes', noteData);
        const newNote = response.data.note;
        updatedNotes = [...updatedNotes, newNote];
      }

      setNotes(updatedNotes);
      message.success('Note enregistrée avec succès');
    } catch (error) {
      console.error('Error saving note:', error);
      message.error('Erreur lors de la sauvegarde de la note');
    }
  };

  // Exporter le bulletin complet d'un élève
  const exportBulletinComplet = async (eleveId) => {
    try {
      const eleve = eleves.find(e => e._id === eleveId);
      const trimestre = trimestres.find(t => t._id === selectedTrimestre);
      const annee = anneesScolaires.find(a => a._id === selectedAnnee);
      if (!eleve || !trimestre || !annee) {
        message.error('Données incomplètes');
        return;
      }

      // Récupérer les notes de l'élève pour le trimestre sélectionné
      const response = await axios.get(
        `http://localhost:4000/api/v1/notes/eleve/${eleveId}?trimestreId=${selectedTrimestre}`  );
              const notesEleve = response.data.notes || [];

      const doc = new jsPDF();
      
      // En-tête
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 128);
      doc.text(`BULLETIN SCOLAIRE - ${trimestre.nom.toUpperCase()}`, 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`École: ${eleve.ecole?.name || 'Non spécifié'}`, 20, 35);
      doc.text(`Année scolaire: ${annee.libelle}`, 20, 35);
      doc.text(`Classe: ${eleve.classe?.name || 'Non spécifié'}`, 20, 55);
      doc.text(`Élève: ${eleve.nom} ${eleve.prenom}`, 20, 65);
      
      // Parcourir les disciplines et leurs matières
      let startY = 80;
      
      matieresParDiscipline.forEach(({ discipline, matieres }) => {
        const notesDiscipline = matieres.map(matiere => {
          const note = notesEleve.find(n => n.matiere?._id === matiere._id);
          return {
            matiere: matiere.name,
            note: note ? note.note : '-',
            appreciation: note ? note.appreciation : '-'
          };
        });
        
        // Titre de la discipline
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text(discipline.toUpperCase(), 20, startY);
        startY += 10;
        
        // Tableau des notes de la discipline
        autoTable(doc, {
          startY: startY,
          head: [['Matière', 'Note', 'Appréciation']],
          body: notesDiscipline.map(item => [item.matiere, item.note, item.appreciation]),
          styles: {
            fontSize: 10,
            cellPadding: 3,
            textColor: [0, 0, 0]
          },
          headStyles: {
            fillColor: [200, 200, 255],
            textColor: [0, 0, 0]
          }
        });
        
        startY = doc.lastAutoTable.finalY + 10;
      });
      
      // Calcul des statistiques
      const notesValides = notesEleve
        .map(n => typeof n.note === 'number' ? n.note : parseFloat(n.note))
        .filter(n => !isNaN(n));
      
      if (notesValides.length > 0) {
        const moyenne = (notesValides.reduce((a, b) => a + b, 0) / notesValides.length).toFixed(2);
        
        doc.setFontSize(12);
        doc.text(`Moyenne générale: ${moyenne}`, 20, startY);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, startY);
        startY += 10;
        
        doc.text('Signature du professeur principal: ________________________', 20, startY + 10);
        doc.text('Signature du directeur: ________________________', 20, startY + 20);
      }
      
      // Enregistrement du PDF
      doc.save(`Bulletin_Trimestre${selectedTrimestre}_${eleve.nom}_${eleve.prenom}.pdf`);
      message.success('Bulletin généré avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      message.error('Erreur lors de la génération du bulletin');
    }
  };

  // Calcul des statistiques générales
  const getStats = async () => {
    if (!selectedClasse || !selectedTrimestre) {
      return { moyenne: '-', max: '-', min: '-' };
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/notes/eleve/${eleveId}?trimestreId=${selectedTrimestre}`
      );
      return response.data.stats || { moyenne: '-', max: '-', min: '-' };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { moyenne: '-', max: '-', min: '-' };
    }
  };

  const [stats, setStats] = useState({ moyenne: '-', max: '-', min: '-' });

  // Mettre à jour les statistiques quand les filtres changent
  useEffect(() => {
    if (selectedClasse && selectedTrimestre) {
      const fetchStats = async () => {
        const stats = await getStats();
        setStats(stats);
      };
      fetchStats();
    }
  }, [selectedClasse, selectedTrimestre, notes]);

  return (
    <div style={{ display: 'flex' }}>
      <SIdebar />
      
      <div className={classes.container} style={{ flex: 1, marginLeft: 200 }}>
        <Card title="Gestion des Bulletins" bordered={false}>
          <Divider orientation="left">Filtres</Divider>
          
          <Row gutter={16}>
            <Col span={8}>
              <Select
                placeholder="Choisir une classe"
                value={selectedClasse}
                onChange={setSelectedClasse}
                style={{ width: '100%' }}
                allowClear
                loading={loading.eleves}
              >
                {classesDisponibles.map(classe => (
                  <Option key={classe} value={classe}>
                    {classe}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
    <Select
      placeholder="Année scolaire"
      value={selectedAnnee}
      onChange={handleAnneeChange}
      style={{ width: '100%' }}
    >
      {anneesScolaires.map(annee => (
        <Option key={annee._id} value={annee._id}>
          {annee.libelle}
        </Option>
      ))}
    </Select>
  </Col>
  <Col span={6}>
    <Select
      placeholder="Trimestre"
      value={selectedTrimestre}
      onChange={setSelectedTrimestre}
      style={{ width: '100%' }}
      disabled={!selectedAnnee}
    >
      {trimestres.map(trimestre => (
        <Option key={trimestre._id} value={trimestre._id}>
          {trimestre.nom}
        </Option>
      ))}
    </Select>
  </Col>
            <Col span={8}>
              <Input
                placeholder="Rechercher un élève"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          <Divider orientation="left">Saisie des notes</Divider>
          
          {(selectedClasse && selectedTrimestre) && (
            <>
              <Table
                columns={getColumns()}
                dataSource={bulletinData}
                pagination={false}
                scroll={{ x: 'max-content' }}
                bordered
                loading={loading.notes || loading.disciplines || loading.matieres}
              />

              <Divider orientation="left">Statistiques de la classe</Divider>
              <div className={classes.stats}>
                <Space size="large">
                  <div><strong>Moyenne générale:</strong> {stats.moyenne}</div>
                  <div><strong>Note maximale:</strong> {stats.max}</div>
                  <div><strong>Note minimale:</strong> {stats.min}</div>
                </Space>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Exam;