import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const Section = styled.section`
  background-image: url('assets/img/about/banner.png');
  width: 100%;
  height: 40vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 14px;
`;

const Text = styled.div`
  margin-top: 20px;
  font-family: 'Spartan', sans-serif;
  margin-bottom: 20px; /* Add some space between sections */
`;

const H2 = styled.h2`
  color: white;
  font-weight: 800;
`;

const P = styled.p`
  color: #fff;
  font-size: 10px;
  font-weight: 600;
`;

const AboutAppSection = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 15px;

  a {
    text-decoration: none;
    color: #088178;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const VideoWrapper = styled.div`
  width: 70%;
  height: 100%;
  margin: 30px auto 30px auto;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const About = () => {

  var myEvent = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    myEvent = event;
  });

  async function handleApp() {
    if (!myEvent) {
      return;
    }
    await myEvent.prompt();
    myEvent = null;
  }

  return (
    <>
      <Section className="container-fluid">
        <Text className="row justify-content-evenly">
          <H2>#KnowUs</H2>
          <P>Lorem ipsum dolor sit amet consectetur</P>
        </Text>
      </Section>

      <div className="container-fluid my-4">
        <section className="row">
          <img
            className="col-md-6"
            src="assets/img/about/a6.jpg"
            alt="About Us"
          />
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2>Who We Are?</h2>
              <p>
                Our E-commerce platform is more than just a marketplace.
                it's a reflection of our commitment to bringing convenience,
                quality, and innovation to your doorstep. At{' '}
                <span style={{ color: 'darkblue', fontSize: '1.5rem' }}>
                  Cara
                </span>
                , we believe in redefining the shopping experience by offering
                a diverse range of products curated with meticulous attention
                to detail. Whether you're seeking everyday essentials or
                indulging in luxurious finds, we aim to cater to every need
                and desire. Our team is driven by a passion for customer
                satisfaction, ensuring that each interaction with our platform
                is seamless and enjoyable. With a dedication to excellence, we
                prioritize authenticity and transparency, fostering trust and
                loyalty among our valued customers. Beyond providing
                exceptional products, we strive to cultivate a community where
                individuals can explore, discover, and connect. Welcome to{' '}
                <span style={{ color: 'darkblue', fontSize: '1.5rem' }}>
                  Cara
                </span>
                . where shopping becomes an adventure, and every
              </p>
            </div>
          </div>
        </section>
      </div>

      <AboutAppSection>
        <Title>
          Download Our <Link to="#" onClick={handleApp}>App</Link>
        </Title>
        <VideoWrapper>
          <Video autoPlay muted loop src="assets/img/about/1.mp4"></Video>
        </VideoWrapper>
      </AboutAppSection>
    </>
  );
};

export default About;
