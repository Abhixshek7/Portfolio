import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../App'
import { FaMoon, FaSun, FaHome, FaUser, FaCode, FaTools, FaEnvelope, FaChevronDown } from 'react-icons/fa'

const NavWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.secondary}20;
  backdrop-filter: blur(10px);
  background-color: ${props => props.theme.primary}dd;
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: calc(100% - 2rem);
  max-width: 1100px;

  @media (min-width: 1448px) {
    bottom: 50%;
    left: 2rem;
    transform: translateY(50%);
    width: auto;
    max-width: none;
    border-radius: 20px;
    height: auto;
    min-height: 400px;
  }
`

const Nav = styled.nav`
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  @media (min-width: 1448px) {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1rem;
    width: auto;
    height: 100%;
  }
`

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 12px;
  background-color: ${props => props.isActive ? props.theme.secondary + '20' : 'transparent'};
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.secondary}10;
  }

  @media (min-width: 1448px) {
    padding: 1rem;
    gap: 0.75rem;
    width: 100%;
  }
`

const NavIcon = styled.div`
  font-size: 1.25rem;
  color: ${props => props.isActive ? props.theme.secondary : props.theme.secondary + '80'};
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.isActive ? props.theme.secondary : props.theme.secondary + '80'};
  text-align: center;
`

const ThemeDropdown = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.secondary}20;
  border-radius: 12px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  min-width: 120px;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 1001;

  @media (min-width: 1448px) {
    bottom: 50%;
    left: 100%;
    transform: translateY(50%);
    margin-bottom: 0;
    margin-left: 0.5rem;
  }
`

const ThemeOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.theme.secondary};
  font-size: 0.875rem;
  
  &:hover {
    background-color: ${props => props.theme.secondary}10;
  }
  
  ${props => props.isActive && `
    background-color: ${props.theme.secondary}20;
    font-weight: 600;
  `}
`

const ThemeIcon = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [activeSection, setActiveSection] = useState('home')
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Function to check if screen width is below 1448px
  const checkScreenSize = () => {
    const shouldBeMobile = window.innerWidth < 1448
    setIsMobileView(shouldBeMobile)
  }

  // Check screen size on mount and window resize
  useEffect(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 80 // Account for bottom navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      })
    }
    setActiveSection(id)
  }

  const handleThemeChange = (newTheme) => {
    if (newTheme !== theme) {
      toggleTheme()
    }
    setIsThemeDropdownOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, section: 'hero' },
    { id: 'about', label: 'About', icon: <FaUser />, section: 'about' },
    { id: 'projects', label: 'Projects', icon: <FaCode />, section: 'projects' },
    { id: 'skills', label: 'Skills', icon: <FaTools />, section: 'skills' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, section: 'contact' },
    { id: 'theme', label: 'Theme', icon: theme === 'light' ? <FaMoon /> : <FaSun />, action: () => setIsThemeDropdownOpen(!isThemeDropdownOpen) }
  ]

  // Apply mobile styles when screen width is below 1448px
  const mobileStyles = isMobileView ? {
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 2rem)',
    maxWidth: '1100px',
    borderRadius: '25px',
    height: 'auto',
    minHeight: 'auto'
  } : {}

  const navMobileStyles = isMobileView ? {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '0',
    padding: '0.75rem 1rem',
    width: '100%',
    height: 'auto'
  } : {}

  const navItemMobileStyles = isMobileView ? {
    padding: '0.5rem',
    gap: '0.25rem',
    width: 'auto'
  } : {}

  return (
    <NavWrapper style={mobileStyles}>
      <Nav style={navMobileStyles}>
        {navItems.map((item) => (
          <NavItem 
            key={item.id}
            isActive={activeSection === item.id}
            style={navItemMobileStyles}
            onClick={() => {
              if (item.action) {
                item.action()
              } else {
                scrollToSection(item.section)
              }
            }}
          >
            <NavIcon isActive={activeSection === item.id}>
              {item.icon}
            </NavIcon>
            <NavLabel isActive={activeSection === item.id}>
              {item.label}
            </NavLabel>
            
            {item.id === 'theme' && (
              <ThemeDropdown isOpen={isThemeDropdownOpen}>
                <ThemeOption 
                  isActive={theme === 'light'}
                  onClick={() => handleThemeChange('light')}
                >
                  <ThemeIcon><FaSun /></ThemeIcon>
                  Light
                </ThemeOption>
                <ThemeOption 
                  isActive={theme === 'dark'}
                  onClick={() => handleThemeChange('dark')}
                >
                  <ThemeIcon><FaMoon /></ThemeIcon>
                  Dark
                </ThemeOption>
              </ThemeDropdown>
            )}
          </NavItem>
        ))}
      </Nav>
    </NavWrapper>
  )
}

export default Navbar