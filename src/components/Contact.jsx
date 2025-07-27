import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 2rem 2rem; // Reduced from 4rem to 2rem
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.secondary};
`

const ContactContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
`

const ContactLinks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  max-width: 600px;
  width: 100%;
`

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.secondary};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1.5rem 2rem;
  border: 2px solid ${props => props.theme.secondary};
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.primary};
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
`

const ContactIcon = styled.div`
  font-size: 1.5rem;
  min-width: 2rem;
  display: flex;
  justify-content: center;
`

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <ContactSection id="contact" ref={ref}>
      <ContactContainer
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>Get In Touch</Title>
        <ContactLinks
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ContactLink
            href="tel:+91 6353406625" // Add your phone number here
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            +91 6353406625 {/* Replace with your phone number */}
          </ContactLink>

          <ContactLink
            href="mailto:abhixshek20@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Abhishek,%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you.%0A%0ABest%20regards,"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            abhixshek20@gmail.com
          </ContactLink>

          <ContactLink
            href="https://github.com/your-github-username" // Add your GitHub profile URL here
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ContactIcon>
              <FaGithub />
            </ContactIcon>
            GitHub Profile
          </ContactLink>

          <ContactLink
            href="https://www.linkedin.com/in/abhishek-r-389998302/" // Add your LinkedIn profile URL here
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ContactIcon>
              <FaLinkedin />
            </ContactIcon>
            LinkedIn Profile
          </ContactLink>
        </ContactLinks>
      </ContactContainer>
    </ContactSection>
  )
}

export default Contact 