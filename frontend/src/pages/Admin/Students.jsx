import React, { useState, useEffect } from "react";
import Sidebar from "./SIdebar";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  StudentList,
  StudentItem,
  AddStudentForm,
  AddStudentInput,
  AddStudentButton,
  FormStep,
  StepNavigation,
  StepButton,
  FormSection,
  FormSectionTitle,
  AddStudentSelect,
  AddStudentLabel,
  ExportButton,
  PhotoPreview,
  SearchBar,
  ActionButtons,
} from "../../styles/StudentsStyles";
import { Modal } from 'antd';

const Students = () => {
  // États
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // État pour stocker les classes
  const [niveaux, setNiveaux] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [studentType, setStudentType] = useState("nouveau");
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loadingClasses, setLoadingClasses] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    photoIdentite: null,
    nom: "",
    prenom: "",
    matricule: "",
    cne: "",
    dateNaissance: "",
    lieuNaissance: "",
    ancienneEcoleNom: "",
    ancienneEcoleType: "",
    ancienneEcoleStatut: "",
    parentsExistants: false,
    frereSoeurRecherche: "",
    parent1Nom: "",
    parent1Prenom: "",
    parent1Telephone: "",
    parent1Profession: "",
    parent2Nom: "",
    parent2Prenom: "",
    parent2Telephone: "",
    parent2Profession: "",
    contactUrgenceNom: "",
    contactUrgenceTelephone: "",
    adresse: "",
    allergies: "",
    maladiesChroniques: "",
    besoinsSpeciaux: "",
    groupeSanguin: "",
    niveau: "",
    classe: "",
    anneeScolaire: "2024-2025",
    fraisPayes: false
  });

  // Fonctions API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students');
      setStudents(response.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des étudiants');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try { 
      const response = await axios.get('http://localhost:4000/api/v1/class');
      setClasses(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des classes');
      console.error('Error fetching classes:', error);
    } finally {
      setLoadingClasses(false);
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
/*
  const createStudent = async (studentData) => {
    try {
      const formData = new FormData();
      Object.entries(studentData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await axios.post(
      'http://localhost:4000/api/v1/students',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la création';
    }
  };*/
  const createStudent = async (studentData) => {
  try {
    const formData = new FormData();

    Object.entries(studentData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        console.log("formData value ok for key value",key,value);
        formData.append(key, value);
      }else
      {
        console.log("formData value Nok for key value",key,value);

      }
    });
    console.log("formData",formData);
    const response = await axios.post(
      'http://localhost:4000/api/v1/students',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'étudiant:', error);
    throw new Error(error.response?.data?.message || 'Erreur lors de la création de l\'étudiant');
  }
};

  const updateStudent = async (id, studentData) => {
    try {
      const formData = new FormData();
      Object.entries(studentData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await axios.put(`http://localhost:4000/api/v1/students/${id}`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour';
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/students/${id}`);
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la suppression';
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchNiveaux();
  }, []);

  // Gestion du formulaire
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "photoIdentite" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  // Validation par étape
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.nom && formData.prenom && formData.dateNaissance && formData.lieuNaissance;
      case 2:
        return formData.parent1Nom && formData.parent1Prenom && formData.parent1Telephone;
      case 3:
        return formData.adresse;
      case 4:
        return formData.niveau && formData.anneeScolaire;
      default:
        return false;
    }
  };

  const validateAge = (date) => {
    const naissance = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - naissance.getFullYear();
    const m = today.getMonth() - naissance.getMonth();
    const bornBeforeApril = naissance.getMonth() < 3 || 
                          (naissance.getMonth() === 3 && naissance.getDate() <= 31);

    if (m < 0 || (m === 0 && today.getDate() < naissance.getDate())) {
      return (age - 1) >= 6 || ((age - 1) === 5 && bornBeforeApril);
    }
    return age >= 6 || (age === 5 && bornBeforeApril);
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error("Veuillez remplir tous les champs obligatoires de cette étape");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (studentType === "nouveau" && !validateAge(formData.dateNaissance)) {
      toast.error("L'élève doit avoir au moins 6 ans ou 5 ans avant le 31 mars pour une première inscription.");
      return;
    }

    if (!validateStep(4)) {
      toast.error("Veuillez compléter tous les champs obligatoires");
      return;
    }

    if (!formData.fraisPayes) {
      toast.error("Les frais de scolarité doivent être payés avant validation.");
      return;
    }

    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent._id, formData);
        toast.success("Élève mis à jour avec succès !");
      } else {
        await createStudent(formData);
        toast.success("Élève inscrit avec succès !");
      }
      setIsModalVisible(false);
      fetchStudents();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      ...student,
      niveau: student.niveau?._id || student.niveau, // Gère à la fois l'objet peuplé et l'ID
      photoIdentite: null
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
      try {
        await deleteStudent(id);
        toast.success("Élève supprimé avec succès");
        fetchStudents();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const downloadPDF = async (studentId, studentName) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/students/pdf/${studentId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${studentName}_fiche_inscription.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Erreur lors du téléchargement du PDF');
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.nom} ${student.prenom}`.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsHeader>
          <h2>Liste des étudiants</h2>
          <button onClick={() => {
            setStudentType("nouveau");
            setFormData({
              photoIdentite: null,
              nom: "",
              prenom: "",
              matricule: "",
              cne: "",
              dateNaissance: "",
              lieuNaissance: "",
              ancienneEcoleNom: "",
              ancienneEcoleType: "",
              ancienneEcoleStatut: "",
              parentsExistants: false,
              frereSoeurRecherche: "",
              parent1Nom: "",
              parent1Prenom: "",
              parent1Telephone: "",
              parent1Profession: "",
              parent2Nom: "",
              parent2Prenom: "",
              parent2Telephone: "",
              parent2Profession: "",
              contactUrgenceNom: "",
              contactUrgenceTelephone: "",
              adresse: "",
              allergies: "",
              maladiesChroniques: "",
              besoinsSpeciaux: "",
              groupeSanguin: "",
              niveau: "",
              classe: "",
              anneeScolaire: "2024-2025",
              fraisPayes: false
            });
            setCurrentStep(1);
            setPreviewPhoto(null);
            setSelectedStudent(null);
            setIsModalVisible(true);
          }}>
            Ajouter un étudiant
          </button >
          <SearchBar
            type="text"
            placeholder="Rechercher un étudiant"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </StudentsHeader>

        <StudentList>
          {loading ? (
            <p>Chargement...</p>
          ) : filteredStudents.length === 0 ? (
            <p>Aucun étudiant trouvé.</p>
          ) : (
            filteredStudents.map((student) => (
              <StudentItem key={student._id}>
                <div>
                  <strong>{student.nom} {student.prenom}</strong><br />
                  Classe : {student.classe ? student.classe.nom : "Non assignée"}<br />
                  Année : {student.anneeScolaire}
                </div>
                <ActionButtons>
                  <button onClick={() => handleEdit(student)}>Modifier</button>
                  <button onClick={() => handleDelete(student._id)}>Supprimer</button>
                  <button onClick={() => downloadPDF(student._id, student.nom)}>PDF</button>
                </ActionButtons>
              </StudentItem>
            ))
          )}
        </StudentList>

        <Modal
          title={selectedStudent ? "Modifier l'étudiant" : "Ajouter un étudiant"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <AddStudentForm onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <FormSection>
                <FormSectionTitle>Informations personnelles</FormSectionTitle>
                <AddStudentLabel>Photo d'identité</AddStudentLabel>
                <AddStudentInput type="file" name="photoIdentite" accept="image/*" onChange={handleChange} />
                {previewPhoto && <PhotoPreview src={previewPhoto} alt="Preview" />}
                <AddStudentInput type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                <AddStudentInput type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
                <AddStudentInput type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} required />
                <AddStudentInput type="text" name="lieuNaissance" placeholder="Lieu de naissance" value={formData.lieuNaissance} onChange={handleChange} required />
              </FormSection>
            )}

            {currentStep === 2 && (
              <FormSection>
                <FormSectionTitle>Informations parents</FormSectionTitle>
                <AddStudentInput type="text" name="parent1Nom" placeholder="Nom parent 1" value={formData.parent1Nom} onChange={handleChange} required />
                <AddStudentInput type="text" name="parent1Prenom" placeholder="Prénom parent 1" value={formData.parent1Prenom} onChange={handleChange} required />
                <AddStudentInput type="tel" name="parent1Telephone" placeholder="Téléphone parent 1" value={formData.parent1Telephone} onChange={handleChange} required />
                <AddStudentInput type="text" name="parent1Profession" placeholder="Profession parent 1" value={formData.parent1Profession} onChange={handleChange} />
                {/* Même chose pour parent 2 */}
                <AddStudentInput type="text" name="parent2Nom" placeholder="Nom parent 2" value={formData.parent2Nom} onChange={handleChange} />
                <AddStudentInput type="text" name="parent2Prenom" placeholder="Prénom parent 2" value={formData.parent2Prenom} onChange={handleChange} />
                <AddStudentInput type="tel" name="parent2Telephone" placeholder="Téléphone parent 2" value={formData.parent2Telephone} onChange={handleChange} />
                <AddStudentInput type="text" name="parent2Profession" placeholder="Profession parent 2" value={formData.parent2Profession} onChange={handleChange} />
              </FormSection>
            )}

            {currentStep === 3 && (
              <FormSection>
                <FormSectionTitle>Adresse et informations médicales</FormSectionTitle>
                <AddStudentInput type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required />
                <AddStudentInput type="text" name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
                <AddStudentInput type="text" name="maladiesChroniques" placeholder="Maladies chroniques" value={formData.maladiesChroniques} onChange={handleChange} />
                <AddStudentInput type="text" name="besoinsSpeciaux" placeholder="Besoins spéciaux" value={formData.besoinsSpeciaux} onChange={handleChange} />
                <AddStudentInput type="text" name="groupeSanguin" placeholder="Groupe sanguin" value={formData.groupeSanguin} onChange={handleChange} />
              </FormSection>
            )}

            {currentStep === 4 && (
              <FormSection>
                <FormSectionTitle>Inscription scolaire</FormSectionTitle>
                <AddStudentLabel>Niveau</AddStudentLabel>
                <AddStudentSelect name="niveau" value={formData.niveau} onChange={handleChange} required style={{ color: 'black', backgroundColor: 'white' }}>
                  <option value="">Sélectionnez un niveau</option>
                  {niveaux.map((niveau) => (
                    <option key={niveau._id} value={niveau._id}>{niveau.name}</option>
                  ))}
                </AddStudentSelect>

                <AddStudentLabel>Classe</AddStudentLabel>
                <AddStudentSelect name="classe" value={formData.classe} onChange={handleChange} required>
                  <option value="">Sélectionnez une classe</option>
                  {classes.map((classe) => (
                    <option key={classe._id} value={classe._id}>{classe.name}</option>
                  ))}
                </AddStudentSelect>
                <AddStudentLabel>Identifiants</AddStudentLabel>
                <AddStudentInput type="text" name="cne" placeholder="cne" value={formData.cne} onChange={handleChange} />
                <AddStudentInput type="text" name="matricule" placeholder="matricule" value={formData.matricule} onChange={handleChange} />

                <AddStudentInput type="text" name="anneeScolaire" placeholder="Année scolaire" value={formData.anneeScolaire} onChange={handleChange} required />

                <label>
                  <input
                    type="checkbox"
                    name="fraisPayes"
                    checked={formData.fraisPayes}
                    onChange={handleChange}
                  />
                  Frais de scolarité payés
                </label>
              </FormSection>
            )}

            <StepNavigation>
              {currentStep > 1 && <StepButton type="button" onClick={prevStep}>Précédent</StepButton>}
              {currentStep < 4 && <StepButton type="button" onClick={nextStep}>Suivant</StepButton>}
              {currentStep === 4 && <AddStudentButton type="submit">{selectedStudent ? "Modifier" : "Ajouter"}</AddStudentButton>}
            </StepNavigation>
          </AddStudentForm>
        </Modal>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
