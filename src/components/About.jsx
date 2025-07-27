import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

const AboutContent = styled(motion.div)`
  max-width: 800px;
  text-align: center;
`

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.secondary};
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <AboutSection id="about" ref={ref}>
      <AboutContent
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>About Me</Title>
        <Description>
          I am a passionate Computer Science student with a strong interest in web development.
          My journey in programming began with a curiosity about how websites work, and since then,
          I've been constantly learning and improving my skills in both frontend and backend development.
        </Description>
        <Description>
          I enjoy creating responsive and user-friendly web applications using modern technologies
          like React, JavaScript, and various other tools in the web development ecosystem.
          When I'm not coding, you can find me exploring new technologies, contributing to open-source
          projects, or working on personal projects to enhance my skills.
        </Description>
      </AboutContent>
    </AboutSection>
  )
}

export default About 