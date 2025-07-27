import React, { useState, createContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export const ThemeContext = createContext(null)

const lightTheme = {
  primary: '#E1D2B8',
  secondary: '#000000',
  background: '#F5EFE6',  // Changed from white to a warm light beige
  text: '#000000',
}

const darkTheme = {
  primary: '#000000',
  secondary: '#E1D2B8',
  background: '#1a1a1a',
  text: '#E1D2B8',
}

const AppContainer = styled.div`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  min-height: 90vh;
  transition: all 0.3s ease;
  width: 100%;
`

const MainContent = styled.div`
  padding-top: 0.5rem; // Reduced from 2rem to minimize top gap
  padding-bottom: 120px; // Account for bottom navbar with margin
  display: flex;
  flex-direction: column;
  gap: 1rem; // Reduced gap between sections
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  
  @media (min-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem; // Reduced from 2rem
    padding-bottom: 140px;
  }
`

const BrowserMockup = styled.div`
  background-color: ${props => props.theme.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-top: 0.5rem; // Reduced top margin
`

const BrowserHeader = styled.div`
  background-color: ${props => props.theme.secondary};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const BrowserButtons = styled.div`
  display: flex;
  gap: 8px;
`

const BrowserButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

const BrowserAddressBar = styled.div`
  background-color: ${props => 
    props.theme.mode === 'light' ? '#ffffff' : '#2a2a2a'};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  flex-grow: 1;
  color: ${props => props.theme.text};
  font-size: 0.9rem;
  font-family: monospace;
`

const Section = styled(motion.div)`
  min-height: ${props => props.isFooter ? 'auto' : '100vh'};
  width: 100%;
`

function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const sections = [
    { component: Hero, path: '/' },
    { component: About, path: '/about' },
    { component: Projects, path: '/projects' },
    { component: Skills, path: '/skills' },
    { component: Contact, path: '/contact' },
  ]

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={{ ...theme === 'light' ? lightTheme : darkTheme, mode: theme }}>
        <AppContainer>
          <Navbar />

          <MainContent>
            {sections.map((section, index) => (
              <BrowserMockup key={section.path}>
                <BrowserHeader>
                  <BrowserButtons>
                    <BrowserButton color="#FF5F56" />
                    <BrowserButton color="#FFBD2E" />
                    <BrowserButton color="#27C93F" />
                  </BrowserButtons>
                  <BrowserAddressBar>
                    portfolio.abhishek.dev{section.path}
                  </BrowserAddressBar>
                </BrowserHeader>
                <Section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <section.component />
                </Section>
              </BrowserMockup>
            ))}
          </MainContent>
        </AppContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App
