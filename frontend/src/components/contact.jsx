// Contact.jsx
import React from 'react';
import {
  PageContainer, HeroBanner, HeroText,
  ContactSection, ContactGrid, ContactBlock,
  ContactTitle, ContactItem, ContactForm,
  FormGroup, FormInput, FormTextarea, FormButton, MapContainer
} from '../styles/contactStyles';
import bg3 from '../assets/bg3.jpg'; // nouvelle bannière

const Contact = () => {
  return (
    <PageContainer>
      <HeroBanner style={{ backgroundImage: `url(${bg3})` }}>
        <HeroText>Contactez-nous</HeroText>
      </HeroBanner>

      <ContactSection>
        <ContactGrid>
          <ContactBlock>
            <ContactTitle>Coordonnées</ContactTitle>
            <ContactItem>📍 Avenue Le Grand Maghreb Arabe, Sidi Alouane, Mahdia</ContactItem>
            <ContactItem>📞 +216 98 996 486</ContactItem>
            <ContactItem>✉️ lagloire.s.a2019@gmail.com</ContactItem>
            <ContactItem>🕒 Lundi à Samedi : 08h00 – 16h00</ContactItem>
          </ContactBlock>

          <ContactBlock>
            <ContactTitle>Envoyez-nous un message</ContactTitle>
            <ContactForm>
              <FormGroup>
                <FormInput type="text" placeholder="Nom complet" required />
              </FormGroup>
              <FormGroup>
                <FormInput type="email" placeholder="Adresse e-mail" required />
              </FormGroup>
              <FormGroup>
                <FormTextarea rows="4" placeholder="Votre message" required />
              </FormGroup>
              <FormButton type="submit">Envoyer</FormButton>
            </ContactForm>
          </ContactBlock>
        </ContactGrid>
      </ContactSection>
    </PageContainer>
  );
};

export default Contact;
