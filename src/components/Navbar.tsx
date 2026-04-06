import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('header');
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      event.preventDefault();
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);
      
      if (section) {
        setActiveSection(sectionId);
        
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        const navbar = document.querySelector('.navbar') as HTMLElement;
        const navbarHeight = navbar ? navbar.offsetHeight + 30 : 100;
        
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        const timeout = setTimeout(() => {
          setScrollTimeout(null);
        }, 1000);
        
        setScrollTimeout(timeout);
      }
    }
    
    setIsOpen(false);
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('header');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      
      if (scrollTimeout) {
        return;
      }
      
      if (scrollTop < 100) {
        setActiveSection('header');
        return;
      }
      
      const sections = ['home', 'schedule', 'venue', 'dress-code', 'rsvp', 'gallery'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      let currentSection = 'home';
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = sections[i];
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTimeout]);

  useEffect(() => {
    const updateSlidingBar = () => {
      const navMenu = document.querySelector('.navbar-menu') as HTMLElement;
      const activeLink = document.querySelector('.navbar-menu a.active') as HTMLElement;
      
      if (navMenu && activeLink) {
        const navMenuRect = navMenu.getBoundingClientRect();
        const activeLinkRect = activeLink.getBoundingClientRect();
        
        const left = activeLinkRect.left - navMenuRect.left;
        const width = activeLinkRect.width;
        
        navMenu.style.setProperty('--slider-left', `${left}px`);
        navMenu.style.setProperty('--slider-width', `${width}px`);
      }
    };

    const timer = setTimeout(updateSlidingBar, 50);
    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className={`navbar-brand ${activeSection === 'header' ? 'active' : ''}`}>
          <a href="#" onClick={handleBrandClick}>
            <span className="brand-text">Enchong's 50th</span>
            <span className="brand-date">May 1, 2026</span>
          </a>
        </div>
        
        <button className={`navbar-hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className="navbar-spacer"></div>
        
        <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <li>
            <a 
              href="#home" 
              onClick={handleNavClick}
              className={activeSection === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#schedule" 
              onClick={handleNavClick}
              className={activeSection === 'schedule' ? 'active' : ''}
            >
              Schedule
            </a>
          </li>
          <li>
            <a 
              href="#venue" 
              onClick={handleNavClick}
              className={activeSection === 'venue' ? 'active' : ''}
            >
              Venue
            </a>
          </li>
          <li>
            <a 
              href="#dress-code" 
              onClick={handleNavClick}
              className={activeSection === 'dress-code' ? 'active' : ''}
            >
              Dress Code
            </a>
          </li>
          <li>
            <a 
              href="#rsvp" 
              onClick={handleNavClick}
              className={activeSection === 'rsvp' ? 'active' : ''}
            >
              RSVP
            </a>
          </li>
          <li>
            <a 
              href="#gallery" 
              onClick={handleNavClick}
              className={activeSection === 'gallery' ? 'active' : ''}
            >
              Gallery
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
