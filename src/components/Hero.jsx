import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding-left: 10rem;
    min-height: 86vh;

  }
`

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    max-width: 1000px;
    gap: 3rem;
  }
`

const TextContent = styled.div`
  flex: 1;
  max-width: 500px;
  text-align: center;
`

const ProfileImage = styled(motion.img)`
  width: 400px;
  height: 400px;
  margin-right: 50px;
  border-radius: 20%;
  object-fit: cover ;
  border: 4px solid ${props => props.theme.secondary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-right: 0;
    margin: 0 auto;
  }

  @media (min-width: 1024px) {
    width: 280px;
    height: 280px;
    margin-right: 0;
  }
`

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.secondary};
  
  @media (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }

  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }
`

const AnimatedDescription = styled(motion.div)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    text-align: center;
    justify-content: center;
  }
`

const TypewriterText = styled.span`
  background: linear-gradient(135deg, ${props => props.theme.secondary} 0%, ${props => props.theme.secondary}80 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.5rem;
  background: ${props => props.theme.secondary};
  margin-left: 2px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.secondary};
  font-size: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

const FloatingElements = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.secondary};
  border-radius: 50%;
  opacity: 0.2;
`

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    "Computer Science Student",
    "Web Developer",
    "Problem Solver",
    "Creative Thinker",
    "Tech Enthusiast"
  ]

  const currentText = texts[currentTextIndex]
  const displayText = currentText.substring(0, currentCharIndex)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1)
        } else {
          setIsDeleting(false)
          setCurrentTextIndex(prev => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [currentCharIndex, isDeleting, currentText, currentTextIndex, texts.length])

  const floatingElements = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
  }))

  return (
    <HeroSection id="hero">
      <FloatingElements>
        {floatingElements.map((element) => (
          <FloatingElement
            key={element.id}
            initial={{ x: `${element.x}%`, y: `${element.y}%` }}
            animate={{
              y: [`${element.y}%`, `${element.y + 10}%`, `${element.y}%`],
              scale: [element.scale, element.scale + 0.2, element.scale],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </FloatingElements>
      
      <HeroContent>
        <TextContent>
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Abhishek R
          </Name>
          
          <AnimatedDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TypewriterText>{displayText}</TypewriterText>
            <Cursor />
          </AnimatedDescription>
        </TextContent>

        <ProfileImage
          src="src\assets\1.png" // Add your image path here
          alt="Profile"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </HeroContent>
    </HeroSection>
  )
}

export default Hero 