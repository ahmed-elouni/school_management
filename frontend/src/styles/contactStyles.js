import styled from 'styled-components';

export const PageContainer = styled.div``;

export const HeroBanner = styled.div`
  height: 50vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
  }
`;

export const HeroText = styled.h1`
  position: relative;
  z-index: 1;
  color: white;
  font-size: 40px;
`;

export const ContactSection = styled.section`
  padding: 80px 20px;
  background-color: #fff;
`;

export const ContactGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContactBlock = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ContactTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

export const ContactItem = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormInput = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 16px;
`;

export const FormTextarea = styled.textarea`
  padding: 10px;
  width: 100%;
  font-size: 16px;
`;

export const FormButton = styled.button`
  padding: 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const MapContainer = styled.div`
  margin: 60px auto 0;
  max-width: 1200px;
  height: 400px;
  border-top: 2px solid #eee;
`;
