// About.jsx
import React from 'react';
import {
  PageContainer, HeroBanner, HeroText, 
  Section, SectionTitle, ReasonsGrid,
  ReasonCard, ReasonIcon, ReasonTitle, ReasonText
} from '../styles/aboutStyles';
import { FaBook, FaUserFriends, FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import bg2 from '../assets/bg2.jpg'; // une nouvelle image de bannière

const About = () => {
  return (
    <PageContainer>
      <HeroBanner style={{ backgroundImage: `url(${bg2})` }}>
        <HeroText>À propos de notre école</HeroText>
      </HeroBanner>

      <Section>
        <SectionTitle>Pourquoi choisir l'école La Gloire ?</SectionTitle>
        <ReasonsGrid>
          <ReasonCard>
            <ReasonIcon><FaBook /></ReasonIcon>
            <ReasonTitle>Programme pédagogique enrichi</ReasonTitle>
            <ReasonText>
              Un contenu scolaire rigoureux et adapté pour éveiller la curiosité des élèves.
            </ReasonText>
          </ReasonCard>

          <ReasonCard>
            <ReasonIcon><FaUserFriends /></ReasonIcon>
            <ReasonTitle>Accompagnement personnalisé</ReasonTitle>
            <ReasonText>
              Chaque élève est suivi avec attention pour garantir son épanouissement.
            </ReasonText>
          </ReasonCard>

          <ReasonCard>
            <ReasonIcon><FaChalkboardTeacher /></ReasonIcon>
            <ReasonTitle>Enseignants qualifiés</ReasonTitle>
            <ReasonText>
              Une équipe pédagogique engagée, passionnée et à l'écoute des enfants.
            </ReasonText>
          </ReasonCard>

          <ReasonCard>
            <ReasonIcon><FaStar /></ReasonIcon>
            <ReasonTitle>Ambiance conviviale</ReasonTitle>
            <ReasonText>
              Un cadre accueillant et sécurisé favorisant le bien-être et la réussite scolaire.
            </ReasonText>
          </ReasonCard>
        </ReasonsGrid>
      </Section>
    </PageContainer>
  );
};

export default About;
