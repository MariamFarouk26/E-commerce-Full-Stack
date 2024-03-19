import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Section = styled.section`
  overflow-x: hidden;
  background-image: url('assets/img/banner/b14.png');
  background-position: 20% 30%;
  background-color: #041e42;
  padding: 40px 0; /* Remove padding on the sides, let Bootstrap handle it */
`;

const NewsText = styled.div`
margin-top: 10px;
  font-family: 'Spartan', sans-serif;
  margin-bottom: 10px; /* Add some space between sections */
`;

const H4 = styled.h4`
  color: white;
  font-weight: 800;
`;

const P = styled.p`
 color: #818ea0;
  font-size: 10px;
   font-weight: 600
`;


const Input = styled.input`
  height: 3.125rem;
  padding: 0 1.25em;
  
  font-size: 14px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 3px;
  outline: none;
  margin-top: 20px;
  margin-bottom: 5px; /* Add some space between input and button */
`;

const Button = styled.button`
    height: 3.125rem;
    margin-top: 20px;
  background-color: #088178;
  color: #fff;
  white-space: nowrap;
  border-radius: 2px;
  padding: 2px 30px;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background-color: #065c68;
  }
`;

const Newsletter = () => {
  const [t, i18n] = useTranslation();

  return (
    <Section  className=" container-fluid  " dir={`${i18n.language}`==='en'?"ltr":"rtl"}>
      <div className="row justify-content-evenly">
        <NewsText className="col-md-5 col-xsm-12">
          <H4>{t('Sign Up For Newsletter')}</H4>
          <P >
          {t('Get E-mail updates about our latest shop and')} <span style={{ color: '#ffbd27' }}>{t('special offers.')}</span>
          </P>
        </NewsText>
        <form className="col-md-5 col-xsm-12 d-flex mx-5">
          <Input type="text" placeholder={t('Your email address')} />
          <Link to="/signup">
            <Button>
            {t('Sign up')}
            </Button>
          </Link>
        </form>
      </div>
    </Section>
  );
};

export default memo(Newsletter);
