import React from 'react';

import styled from 'styled-components';
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
    font-weight: 600
`;


const ContactDetailsSection = styled.div`
  font-family: 'Spartan', sans-serif;
  justify-content: space-evenly;
  width: 100%; /* Make sure the section takes 100% width */
  box-sizing: border-box; 
`;


const DetailsSpan = styled.span`
  
  font-size: 12px;
`;

const DetailsH2 = styled.h2`
  font-size: 20px;
  font-weight: 700;
  padding: 15px 0;
`;

const DetailsH3 = styled.h3`
  font-size: 14px;
  padding-bottom: 10px;
  font-weight: 600;
`;

const DetailsList = styled.li`
  list-style: none;
`;



const DetailsParagraph = styled.p`
  font-size: 12px;
`;

const MapWrapper = styled.div`
  height: 400px;
  marign:10px
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 85%;
`;



const ContactUs = () => {
    return (
        <div>
            <Section  className=" container-fluid  ">
                <Text className="row justify-content-evenly">
                <H2>#let's_talk</H2>
                <P>LEAVE A MESSAGE, we love to hear from you!</P>
                </Text>
            </Section>

            <div className='container-fulid'>
            <ContactDetailsSection className='row my-4 ' style={{ "textAlign": "left"}}>
            <div className="col-sm-5 my-5">
                <DetailsSpan>GET IN TOUCH</DetailsSpan>
                <DetailsH2>Visit one of our agency locations or contact us today</DetailsH2>
                <DetailsH3>Head Office</DetailsH3>
                <div>
                <DetailsList>
                <DetailsParagraph >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg> 
                    El-Hossary street 6 of October</DetailsParagraph>
                </DetailsList>
                <DetailsList>
                <DetailsParagraph> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
                    contact@example.com</DetailsParagraph>
                </DetailsList>
                <DetailsList>
                    <DetailsParagraph>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg> +02 012 3456 789</DetailsParagraph>
                </DetailsList>
                <DetailsList>
                    <DetailsParagraph>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                        Monday to Saturday: 9.00am to 16.00pm</DetailsParagraph>
                </DetailsList>
                </div>
            </div>

            <MapWrapper className=" col-sm-6 my-4">
                <MapIframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.2423840385436!2d30.942208276117807!3d29.97246342197664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145857edb3339829%3A0xedb8fcc700e78162!2sHosary%20square!5e0!3m2!1sen!2seg!4v1690744315613!5m2!1sen!2seg"
                width="600"
                height="450"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></MapIframe>
            </MapWrapper>
            </ContactDetailsSection>

            
         
            <FormDetailsSection  className='row justify-content-evenly '>
                <Form className='col-md-5 my-3'>
                    <FormSpan>LEAVE A MESSAGE</FormSpan>
                    <FormH2>we love to hear from you</FormH2>
                    <FormInput type="text" placeholder="Your Name" />
                    <FormInput type="text" placeholder="E-mail" />
                    <FormInput type="text" placeholder="Subject" />
                    <FormTextarea placeholder="Your Message" />
                    <FormButton className="normal">Submit</FormButton>
                </Form>

                <div className="col-md-3 my-3 ">
                    <PeopleDetails>
                    <PeopleImg src="assets/img/people/1.png" />
                    <PeopleParagraph>
                        <PeopleParagraphSpan>John Doe</PeopleParagraphSpan> Senior Marketing Manager <br /> Phone: +01 2345 6789 <br /> Email: Contact@example.com
                    </PeopleParagraph>
                    </PeopleDetails>

                    <PeopleDetails>
                    <PeopleImg src="assets/img/people/2.png" />
                    <PeopleParagraph>
                        <PeopleParagraphSpan>William Smith</PeopleParagraphSpan> Senior Marketing Manager <br /> Phone: +01 2345 6789 <br /> Email: Contact@example.com
                    </PeopleParagraph>
                    </PeopleDetails>

                    <PeopleDetails>
                    <PeopleImg src="assets/img/people/3.png" />
                    <PeopleParagraph>
                        <PeopleParagraphSpan>Emma Stone</PeopleParagraphSpan> Senior Marketing Manager <br /> Phone: +01 2345 6789 <br /> Email: Contact@example.com
                    </PeopleParagraph>
                    </PeopleDetails>
                </div>
             </FormDetailsSection>
             </div>
        </div>
    );
}

export default ContactUs;

const FormDetailsSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 30px;
  padding: 80px;
  border: 1px solid #e1e1e1;
`;

const Form = styled.form`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Spartan', sans-serif;
`;

const FormSpan = styled.span`
  font-size: 12px;
`;

const FormH2 = styled.h2`
  font-size: 26px;
  line-height: 35px;
  padding: 20px 0;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size:10px
  outline: none;
  margin-bottom: 20px;
  border: 1px solid #e1e1e1;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  outline: none;
  margin-bottom: 20px;
  border: 1px solid #e1e1e1;
`;

const FormButton = styled.button`
  background-color: #088178 !important;
  color: #fff !important;
  padding:8px 25px ;
  border:none;
  cursor: pointer;
  border-radius:5px;
  &:hover {
    opacity: .9;
  }
`;


const PeopleDetails = styled.div`
  padding-bottom: 25px;
  display: flex;
  align-items: flex-start;
`;

const PeopleImg = styled.img`
  width: 65px;
  height: 65px;
  object-fit: cover;
  margin-right: 15px;
`;

const PeopleParagraph = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 25px;
  text-align:left;
`;

const PeopleParagraphSpan = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;