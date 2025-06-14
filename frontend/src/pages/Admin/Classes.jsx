import React, { useState, useEffect } from "react";
import Sidebar from "./SIdebar";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ClassesContainer,
  Content,
  ClassesContent,
  ClassHeader,
  ClassList,
  ClassItem,
  ClassInfo,
  ClassActions,
  AddClassButton,
  SecondaryButton,
  AddClassForm,
  AddClassInput,
  AddClassSelect,
  EmptyState,
   ClassTable,
  TableHeader,
  TableRow,
  TableCell,
  LoadingSpinner
} from '../../styles/ClassesStyles';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [newNiveauName, setNewNiveauName] = useState('');
  const [newClassNiveau, setNewClassNiveau] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [editClassName, setEditClassName] = useState('');
  const [editClassNiveau, setEditClassNiveau] = useState('');

  // Fetch classes from API
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/class');
      setClasses(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des classes');
      console.error('Error fetching classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNiveaux = async () => {
    try {
    const response = await axios.get('http://localhost:4000/api/v1/niveaux');
        setNiveaux(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des niveaux');
      console.error('Error fetching niveaux:', error);
    }
  };
  

  useEffect(() => {
    fetchClasses();
    fetchNiveaux();
  }, []);

  // Add new class
  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!newClassName.trim() || !newClassNiveau) return;

    try {
      const response = await axios.post('http://localhost:4000/api/v1/class', {
        name: newClassName,
        niveau: newClassNiveau
      });
      setClasses([...classes, response.data.class]);
      setNewClassName('');
      setNewClassNiveau('');
      toast.success('Classe ajoutée avec succès');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout');
      console.error('Error adding class:', error);
    }
  };

  // Update class
  const handleUpdateClass = async (e) => {
    e.preventDefault();
    if (!editClassName.trim() || !editClassNiveau) return;

    try {
      const response = await axios.put(`http://localhost:4000/api/v1/class/${editingClass._id}`, {
        name: editClassName,
        niveau: editClassNiveau
      });
      setClasses(classes.map(cls => 
        cls._id === editingClass._id ? response.data.class : cls
      ));
      cancelEdit();
      toast.success('Classe modifiée avec succès');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification');
      console.error('Error updating class:', error);
    }
  };

  // Delete class
  const handleDeleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/class/${classId}`);
      setClasses(classes.filter(cls => cls._id !== classId));
      toast.success('Classe supprimée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error('Error deleting class:', error);
    }
  };

  // Start editing
  const startEdit = (classItem) => {
    setEditingClass(classItem);
    setEditClassName(classItem.name);
    setEditClassNiveau(classItem.niveau?._id || '');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingClass(null);
    setEditClassName('');
    setEditClassNiveau('');
  };

  return (
    <ClassesContainer>  
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassHeader>Gestion des Classes</ClassHeader>
          <AddClassForm
  onSubmit={async (e) => {
    e.preventDefault();
    if (!newNiveauName.trim()) return;
    try {
      const response = await axios.post('http://localhost:4000/api/v1/niveaux', {
        name: newNiveauName,
      });
      setNiveaux([...niveaux, response.data.niveau]);
      setNewNiveauName('');
      toast.success('Niveau ajouté avec succès');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'ajout du niveau');
      console.error('Erreur ajout niveau:', error);
    }
  }}
>
  <AddClassInput
    type="text"
    value={newNiveauName}
    onChange={(e) => setNewNiveauName(e.target.value)}
    placeholder="Saisir un nouveau niveau"
    required
  />
  <AddClassButton type="submit">Ajouter le niveau</AddClassButton>
</AddClassForm>
          {/* Add Class Form */}
          <AddClassForm onSubmit={handleAddClass}>
            <AddClassInput 
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="Saisir le nom de la classe"
              required
            />
            <AddClassSelect
              value={newClassNiveau}
              onChange={(e) => setNewClassNiveau(e.target.value)}
              required
            >
              <option value="">Sélectionner un niveau</option>
              {niveaux.map((niveau) => (
                <option key={niveau._id} value={niveau._id}>
                  {niveau.name}
                </option>
              ))}
            </AddClassSelect>
            <AddClassButton type="submit">Ajouter la classe</AddClassButton>
          </AddClassForm>

          {/* Edit Class Form (shown when editing) */}
          {editingClass && (
            <AddClassForm onSubmit={handleUpdateClass}>
              <AddClassInput 
                type="text"
                value={editClassName}
                onChange={(e) => setEditClassName(e.target.value)}
                placeholder="Modifier le nom de la classe"
                required
              />
              <AddClassSelect
                value={editClassNiveau}
                onChange={(e) => setEditClassNiveau(e.target.value)}
                required
              >
                <option value="">Sélectionner un niveau</option>
                {niveaux.map((niveau) => (
                  <option key={niveau._id} value={niveau._id}>
                    {niveau.name}
                  </option>
                ))}
              </AddClassSelect>
              <AddClassButton type="submit">Enregistrer</AddClassButton>
              <SecondaryButton type="button" onClick={cancelEdit}>
                Annuler
              </SecondaryButton>
            </AddClassForm>
          )}

          {/* Classes List */}
          {isLoading ? (
            <LoadingSpinner />
          ) : classes.length === 0 ? (
            <EmptyState>Aucune classe disponible</EmptyState>
          ) : (
            
  <ClassTable>
    <thead>
      <tr>
        <TableHeader>Nom de la classe</TableHeader>
        <TableHeader>Niveau</TableHeader>
        <TableHeader>Actions</TableHeader>
      </tr>
    </thead>
    <tbody>
      {classes.map((classItem) => (
        <TableRow key={classItem._id}>
          <TableCell>{classItem.name}</TableCell>
          <TableCell>{classItem.niveau?.name || 'Niveau non défini'}</TableCell>
          <TableCell>
            <ClassActions>
              <SecondaryButton onClick={() => startEdit(classItem)}>
                Modifier
              </SecondaryButton>
              <SecondaryButton 
                onClick={() => handleDeleteClass(classItem._id)}
                danger
              >
                Supprimer
              </SecondaryButton>
            </ClassActions>
          </TableCell>
        </TableRow>
      ))}
    </tbody>
  </ClassTable>


          )}
        </ClassesContent>
      </Content>
    </ClassesContainer>  
  );
};

export default Classes;