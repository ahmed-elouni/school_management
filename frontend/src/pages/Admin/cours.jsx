import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, Table, Tag, Divider, Checkbox, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import SIdebar from "./SIdebar";
import axios from 'axios';
import {
    ClassesContainer,
    Content,
    ClassesContent,
    ClassHeader,
    ClassList,
    ClassItem,
    AddClassButton,
    AddClassForm,
    AddClassInput
} from '../../styles/ClassesStyles';

const { Option } = Select;

const MatieresDisciplines = () => {
  // États pour les données
  const [matieres, setMatieres] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [affectations, setAffectations] = useState([]);
  const [loading, setLoading] = useState({
    matieres: false,
    disciplines: false,
    niveaux: false,
    affectations: false
  });

  // États pour les formulaires
  const [newMatiere, setNewMatiere] = useState('');
  const [newDiscipline, setNewDiscipline] = useState({ matiereId: '', nom: '' });
  const [newAffectation, setNewAffectation] = useState({ 
    disciplineId: null, 
    niveauId: '', 
    coefficient: '' 
  });
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [selectedNiveaux, setSelectedNiveaux] = useState([]);

  // Chargement initial des données
  useEffect(() => {
    fetchMatieres();
    fetchDisciplines();
    fetchNiveaux();
    fetchAffectations();
  }, []);

  // Fonctions pour récupérer les données depuis l'API
  const fetchMatieres = async () => {
    setLoading(prev => ({...prev, matieres: true}));
    try {
      const response = await axios.get('http://localhost:4000/api/v1/matieres');
      setMatieres(response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des matières');
    } finally {
      setLoading(prev => ({...prev, matieres: false}));
    }
  };

  const fetchDisciplines = async () => {
    setLoading(prev => ({...prev, disciplines: true}));
    try {
      const response = await axios.get('http://localhost:4000/api/v1/disciplines');
      setDisciplines(response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des disciplines');
    } finally {
      setLoading(prev => ({...prev, disciplines: false}));
    }
  };

  const fetchNiveaux = async () => {
    setLoading(prev => ({...prev, niveaux: true}));
    try {
      const response = await axios.get('http://localhost:4000/api/v1/niveaux');
      setNiveaux(response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des niveaux');
    } finally {
      setLoading(prev => ({...prev, niveaux: false}));
    }
  };

  const fetchAffectations = async () => {
    setLoading(prev => ({...prev, affectations: true}));
    try {
      const response = await axios.get('http://localhost:4000/api/v1/affectations');
      setAffectations(response.data);
    } catch (error) {
      message.error('Erreur lors du chargement des affectations');
    } finally {
      setLoading(prev => ({...prev, affectations: false}));
    }
  };

  // Ajouter une nouvelle matière
  const handleAddMatiere = async () => {
    if (!newMatiere.trim()) {
      message.warning('Veuillez entrer un nom de matière');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/matieres', {
        name: newMatiere
      });
      setMatieres([...matieres, response.data]);
      setNewMatiere('');
      message.success('Matière ajoutée avec succès');
    } catch (error) {
      message.error(error.response?.data?.message || 'Erreur lors de l\'ajout de la matière');
    }
  };

  // Ajouter une nouvelle discipline
  const handleAddDiscipline = async () => {
    if (!newDiscipline.matiereId || !newDiscipline.nom.trim()) {
      message.warning('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/disciplines', {
        matiereId: newDiscipline.matiereId,
        name: newDiscipline.nom
      });
      
      setDisciplines([...disciplines, {
        id: response.data._id,
        matiere: matieres.find(m => m._id === response.data.matiereId)?.name,
        nom: response.data.name
      }]);
      
      setNewDiscipline({ matiereId: '', nom: '' });
      message.success('Discipline ajoutée avec succès');
    } catch (error) {
      message.error(error.response?.data?.message || 'Erreur lors de l\'ajout de la discipline');
    }
  };

  // Ajouter une nouvelle affectation
  const handleAddAffectation = async () => {
    if (!newAffectation.disciplineId || !newAffectation.niveauId || !newAffectation.coefficient) {
      message.warning('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/affectations', {
        disciplineId: newAffectation.disciplineId,
        niveauId: newAffectation.niveauId,
        coefficient: newAffectation.coefficient
      });

      // Pour optimiser les performances, on pourrait juste ajouter la nouvelle affectation
      // Mais ici on recharge toutes les affectations pour être sûr d'avoir les données à jour
      await fetchAffectations();
      
      setNewAffectation({ disciplineId: null, niveauId: '', coefficient: '' });
      message.success('Affectation ajoutée avec succès');
    } catch (error) {
      message.error(error.response?.data?.message || 'Erreur lors de l\'ajout de l\'affectation');
    }
  };

  // Supprimer une affectation
  const handleDeleteAffectation = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/affectations/${id}`);
      setAffectations(affectations.filter(a => a.id !== id));
      message.success('Affectation supprimée avec succès');
    } catch (error) {
      message.error('Erreur lors de la suppression de l\'affectation');
    }
  };

  // Colonnes du tableau des disciplines
  const disciplineColumns = [
    {
      title: 'Matière',
      dataIndex: 'matiere',
      key: 'matiere',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Discipline',
      dataIndex: 'nom',
      key: 'nom'
    }
  ];

  // Colonnes du tableau des affectations
  const affectationColumns = [
    {
      title: 'Discipline',
      key: 'discipline',
      render: (_, record) => {
        const discipline = disciplines.find(d => d.id === record.disciplineId);
        return discipline ? `${discipline.matiere} - ${discipline.nom}` : '';
      }
    },
    {
      title: 'Niveau',
      key: 'niveau',
      render: (_, record) => {
        const niveau = niveaux.find(n => n._id === record.niveauId);
        return niveau ? niveau.name : '';
      }
    },
    {
      title: 'Coefficient',
      dataIndex: 'coefficient',
      key: 'coefficient'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button 
          danger 
          type="text" 
          icon={<DeleteOutlined />} 
          onClick={() => handleDeleteAffectation(record.id)}
        />
      )
    }
  ];

  return (
    <ClassesContainer>  
      <SIdebar />
      <Content>
        <ClassesContent>
          <ClassHeader>Gestion des Matières et Disciplines</ClassHeader>
          
          {/* Section Matières */}
          <Divider orientation="left">Matières</Divider>
          <AddClassForm>
            <AddClassInput
              placeholder="Nouvelle matière"
              value={newMatiere}
              onChange={(e) => setNewMatiere(e.target.value)}
              disabled={loading.matieres}
            />
            <AddClassButton 
              type="primary" 
              onClick={handleAddMatiere}
              loading={loading.matieres}
            >
              Ajouter Matière
            </AddClassButton>
          </AddClassForm>

          {/* Section Disciplines */}
          <Divider orientation="left">Disciplines</Divider>
          <AddClassForm>
            <Select
              placeholder="Sélectionner une matière"
              style={{ width: 200, marginRight: 16 }}
              value={newDiscipline.matiereId || undefined}
              onChange={(value) => setNewDiscipline({ ...newDiscipline, matiereId: value })}
              loading={loading.matieres}
            >
              {matieres.map(matiere => (
                <Option key={matiere._id} value={matiere._id}>{matiere.name}</Option>
              ))}
            </Select>
            <AddClassInput
              placeholder="Nom de la discipline"
              value={newDiscipline.nom}
              onChange={(e) => setNewDiscipline({ ...newDiscipline, nom: e.target.value })}
              disabled={loading.disciplines}
            />
            <AddClassButton 
              type="primary" 
              onClick={handleAddDiscipline}
              loading={loading.disciplines}
            >
              Ajouter Discipline
            </AddClassButton>
          </AddClassForm>

          {/* Section Affectation Disciplines/Niveaux */}
          <Divider orientation="left">Affectation Disciplines/Niveaux</Divider>
          
          <ClassList>
            <h4>Sélectionner les Disciplines:</h4>
            <Checkbox.Group
              options={disciplines.map(d => ({
                label: `${d.matiere} - ${d.nom}`,
                value: d.id
              }))}
              onChange={setSelectedDisciplines}
            />
          </ClassList>

          <ClassList>
            <h4>Sélectionner les Niveaux:</h4>
            <Checkbox.Group
              options={niveaux.map(n => ({
                label: n.name,
                value: n._id
              }))}
              onChange={setSelectedNiveaux}
            />
          </ClassList>

          <AddClassForm>
            <AddClassInput
              type="number"
              placeholder="Coefficient"
              value={newAffectation.coefficient}
              onChange={(e) => setNewAffectation({ ...newAffectation, coefficient: e.target.value })}
              disabled={loading.affectations}
            />
            <AddClassButton 
              type="primary" 
              onClick={handleAddAffectation}
              disabled={!selectedDisciplines.length || !selectedNiveaux.length}
              loading={loading.affectations}
            >
              Affecter
            </AddClassButton>
          </AddClassForm>

          {/* Tableau des Affectations */}
          <Table
            columns={affectationColumns}
            dataSource={affectations}
            rowKey="id"
            bordered
            style={{ marginTop: 16 }}
            loading={loading.affectations}
          />
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default MatieresDisciplines;