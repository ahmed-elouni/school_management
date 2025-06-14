// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer,
  LoginButton, HomeContainer, HeroSection, HeroContent,
  Title, Subtitle, Section, SectionTitle, SectionText,
  FooterContainer, FooterContent, FooterColumn, FooterTitle, FooterItem
} from '../styles/styles';
import bg from '../assets/bg.jpg';
import bg1 from '../assets/bg1.png';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/admin-signIn');
  };

  const handleRegisterClick = () => {
    navigate('/Admin-Register');
  };

  return (
    <>
      <Navbar>
        <Logo src={bg1} alt='Logo' />
        <NavigationLinks>
        <NavLink as={Link} to="/a-propos">À propos</NavLink>
          <NavLink as={Link} to="/contact">Contact</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Se Connecter</LoginButton>
        </ButtonsContainer>
      </Navbar>

      <HomeContainer>
        <HeroSection style={{ backgroundImage: `url(${bg})` }}>
          <HeroContent>
            <Title>Bienvenue à l'école La Gloire</Title>
            <Subtitle>Une éducation d’excellence pour un avenir prometteur</Subtitle>
            <ButtonsContainer>
              <LoginButton onClick={handleRegisterClick}>Inscription</LoginButton>
            </ButtonsContainer>
          </HeroContent>
        </HeroSection>

        <Section id="about">
          <SectionTitle>La Gloire </SectionTitle>
          <SectionText>
            L'école primaire privée La Gloire est un établissement d'enseignement reconnu pour son engagement envers l'excellence académique et le développement global des enfants. Fondée en 2019, l'école accueille des élèves de la maternelle au primaire, offrant un environnement éducatif bienveillant, stimulant et adapté aux besoins de chaque enfant.
          </SectionText>
        </Section>

        <Section>
          <SectionTitle>Notre Mission</SectionTitle>
          <SectionText>
            Offrir un enseignement de qualité favorisant l’éveil, la curiosité et le développement personnel des enfants dans un cadre sain et structurant.
          </SectionText>
        </Section>
      </HomeContainer>

      <FooterContainer id="contact">
        <FooterContent>
          <FooterColumn>
            <FooterTitle>Contact</FooterTitle>
            <FooterItem>📍 Avenue Le Grand Maghreb Arabe Sidi Alouane, Mahdia, Tunisie</FooterItem>
            <FooterItem>📞 +216 98 996 486</FooterItem>
            <FooterItem>✉️ lagloire.s.a2019@gmail.com</FooterItem>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Horaires</FooterTitle>
            <FooterItem>Lundi – Vendredi : 08h00 – 16h00</FooterItem>
            <FooterItem>Samedi : 08h00 – 13h00</FooterItem>
            <FooterItem>Dimanche : Fermé</FooterItem>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Liens utiles</FooterTitle>
            <FooterItem><a href="#about">À propos</a></FooterItem>
            <FooterItem><a href="contact">Contact</a></FooterItem>
            <FooterItem><a href="/Admin-Register" onClick={handleRegisterClick}>Inscription</a></FooterItem>
          </FooterColumn>
        </FooterContent>
      </FooterContainer>
    </>
  );
};

export default Home;
