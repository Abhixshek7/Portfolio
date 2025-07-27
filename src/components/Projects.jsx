import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'

const ProjectsSection = styled.section`
  padding: 2rem 2rem; // Reduced from 4rem to 2rem
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`

const ProjectsContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  height: 86vh;
`

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.secondary};
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.primary};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.secondary}20;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent,
      ${props => props.theme.primary}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`

const ProjectContent = styled.div`
  padding: 1.5rem;
`

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.secondary};
`

const ProjectDescription = styled.p`
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  line-height: 1.6;
`

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const Tag = styled.span`
  background-color: ${props => props.theme.secondary}20;
  color: ${props => props.theme.secondary};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
`

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.background};
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const Link = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.secondary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.theme.secondary};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.background};
  }
`

const projects = [
  {
    id: 1,
    title: "Project 1",
    shortDescription: "A brief description of project 1",
    fullDescription: "A detailed description of project 1, including technologies used and challenges faced.",
    githubLink: "https://github.com",
    projectLink: "https://project1.com",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/path-to-image1.jpg"
  },
  {
    id: 2,
    title: "Project 2",
    shortDescription: "A brief description of project 2",
    fullDescription: "A detailed description of project 2, including technologies used and challenges faced.",
    githubLink: "https://github.com",
    projectLink: "https://project2.com",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
    image: "/path-to-image2.jpg"
  },
  // Add more projects as needed
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <ProjectsSection id="projects" ref={ref}>
      <ProjectsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>My Projects</Title>
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectImage />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.shortDescription}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ProjectTags>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        <AnimatePresence>
          {selectedProject && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <ModalContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton onClick={() => setSelectedProject(null)}>
                  <FaTimes />
                </CloseButton>
                <ProjectTitle>{selectedProject.title}</ProjectTitle>
                <ProjectDescription>{selectedProject.fullDescription}</ProjectDescription>
                <ProjectTags>
                  {selectedProject.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ProjectTags>
                <LinksContainer>
                  <Link
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> View Code
                  </Link>
                  <Link
                    href={selectedProject.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </Link>
                </LinksContainer>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </ProjectsContainer>
    </ProjectsSection>
  )
}

export default Projects 