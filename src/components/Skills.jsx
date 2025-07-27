import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase } from 'react-icons/fa'
import { SiTypescript, SiMongodb, SiExpress, SiRedux, SiStyledcomponents } from 'react-icons/si'

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 2rem 2rem; // Reduced from 4rem to 2rem
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

const SkillsContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.secondary};
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
`

const SkillCard = styled(motion.div)`
  background-color: ${props => props.theme.primary};
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const SkillIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.secondary};
`

const SkillName = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.secondary};
`

const SkillLevel = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.background};
  border-radius: 4px;
  overflow: hidden;
`

const SkillLevelBar = styled(motion.div)`
  height: 100%;
  background-color: ${props => props.theme.secondary};
  border-radius: 4px;
`

const skills = [
  { name: 'React', icon: <FaReact />, level: 90 },
  { name: 'JavaScript', icon: <FaJs />, level: 85 },
  { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
  { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
  { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
  { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
  { name: 'Express', icon: <SiExpress />, level: 80 },
  { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
  { name: 'Redux', icon: <SiRedux />, level: 80 },
  { name: 'Git', icon: <FaGitAlt />, level: 85 },
  { name: 'Styled Components', icon: <SiStyledcomponents />, level: 90 },
  { name: 'SQL', icon: <FaDatabase />, level: 75 },
]

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <SkillsSection id="skills" ref={ref}>
      <SkillsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>My Skills</Title>
        <SkillsGrid>
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkillIcon>{skill.icon}</SkillIcon>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>
                <SkillLevelBar
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </SkillLevel>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  )
}

export default Skills 