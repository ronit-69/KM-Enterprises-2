import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import styled from 'styled-components';
import { 
  FaTruckMoving, FaWater, FaCogs, 
  FaChartLine, FaLightbulb, FaHandshake, FaPhone, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';
import { 
  MdConstruction, MdCleaningServices, MdLocalShipping,
  MdSafetyDivider, MdEco, MdGroups, MdContactMail 
} from 'react-icons/md';
import { GiFarmer, GiWaterTank, GiForklift } from 'react-icons/gi';
import { RiPlantFill } from 'react-icons/ri';

// Import images (you'll need to add these to your project)
import ceoImage from './images/ceo.jpg';
import ctoImage from './images/cto.jpg';
import cfoImage from './images/cfo.jpg';
import landDevImage from './images/land-dev.jpg';
import pipelineImage from './images/pipeline.jpg';
import forkliftImage from './images/forklift.jpg';
import safetyImage from './images/safety.jpg';
import contactImage from './images/contact.jpg';

// Styled Components
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  max-width: 100vw;
  overflow-x: hidden;
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, #1a3a1f 0%, #2d6a4f 100%);
  color: white;
  text-align: center;
  padding-top: 8rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  margin-bottom: 3rem;
  text-align: center;
  color: ${props => props.color || '#2d6a4f'};
  position: relative;
  display: inline-block;
  align-self: center;
  font-weight: 700;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 5px;
    background: ${props => props.underlineColor || '#2d6a4f'};
    border-radius: 3px;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  margin: 1rem;
  text-align: center;
  transition: all 0.4s ease;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 180px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const IconContainer = styled(motion.div)`
  font-size: 3.5rem;
  color: #2d6a4f;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: rgba(45, 106, 79, 0.1);
  border-radius: 50%;
`;

const ServiceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const TeamMemberCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  text-align: center;
  transition: all 0.4s ease;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
`;

const MemberImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  margin-bottom: 1.5rem;
  border: 5px solid #2d6a4f;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(26, 58, 31, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: #90e0ef;
    transition: width 0.3s ease;
    border-radius: 3px;
  }

  &:hover::after {
    width: 100%;
  }
`;




const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.15;
`;

const ServiceList = styled(motion.ul)`
  columns: 2;
  margin: 3rem auto;
  max-width: 900px;
  list-style-type: none;
  padding: 0;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceListItem = styled(motion.li)`
  margin-bottom: 1.5rem;
  padding: 1.2rem;
  position: relative;
  font-size: 1.1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: #2d6a4f;
    border-radius: 5px 0 0 5px;
  }

  svg {
    margin-right: 1rem;
    color: #2d6a4f;
    font-size: 1.5rem;
  }
`;

const Footer = styled.footer`
  background: #1a3a1f;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Button = styled(motion.button)`
  background: #2d6a4f;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  &:hover {
    background: #1b4332;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const ContactForm = styled(motion.form)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(90deg, #1a3a1f, #2d6a4f);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: ${props => props.full ? '1 / -1' : 'auto'};

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #1a3a1f;
  }

  input, textarea, select {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #2d6a4f;
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.2);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255,255,255,0.2);
  }

  svg {
    font-size: 1.8rem;
    color: white;
    background: rgba(255,255,255,0.2);
    padding: 1rem;
    border-radius: 50%;
  }

  div {
    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }
    p {
      margin: 0;
      opacity: 0.9;
    }
  }
`;

const SafetyFeature = styled(motion.div)`
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255,255,255,0.15);
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
  }

  ul {
    margin-top: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 1rem;
      position: relative;
      padding-left: 2rem;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #90e0ef;
        font-weight: bold;
      }
    }
  }
`;

const FeatureHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
  filter: blur(30px);
  z-index: -1;
`;

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const bounce = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};



const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    
    // Reset form submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'core', 'additional', 'team', 'safety', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const coreServices = [
    {
      title: "Land Development & Subleasing",
      icon: <GiFarmer />,
      image: landDevImage,
      description: "We lease idle farmland from farmers, develop it, and sub-lease to companies needing large open yards, creating a win-win model for both farmers and industries.",
      benefits: [
        "Regular monthly income for farmers",
        "Ready-to-use developed land for businesses",
        "Container storage, logistics hubs, warehousing",
        "Sustainable land utilization"
      ]
    },
    {
      title: "Civil Contracts & Water Pipelines",
      icon: <GiWaterTank />,
      image: pipelineImage,
      description: "Specializing in civil infrastructure projects including site leveling, boundary walls, and water pipeline contracts for urban and rural areas.",
      benefits: [
        "Experienced manpower",
        "Modern equipment",
        "Efficient project delivery",
        "Quality assurance"
      ]
    },
    {
      title: "Forklift Rental Services",
      icon: <GiForklift />,
      image: forkliftImage,
      description: "Reliable forklift rental services for container yards, warehouses, and industrial areas with trained operators available.",
      benefits: [
        "Short-term and long-term rentals",
        "Well-maintained machines",
        "High safety standards",
        "24/7 support available"
      ]
    }
  ];

  const additionalServices = [
    { name: "Housekeeping & Cleaning Work", icon: <MdCleaningServices /> },
    { name: "Garbage Collection & Waste Management", icon: <MdCleaningServices /> },
    { name: "Dry Container Division Support", icon: <MdLocalShipping /> },
    { name: "Fumigation & Pest Control Services", icon: <MdSafetyDivider /> },
    { name: "Cargo & Carton Sorting", icon: <MdLocalShipping /> },
    { name: "Gardening & Outdoor Maintenance", icon: <RiPlantFill /> },
    { name: "Lashing & Chocking for Cargo Securing", icon: <MdSafetyDivider /> },
    { name: "Drinking Water Supply", icon: <FaWater /> },
    { name: "Tagger & Sticker Labeling Work", icon: <MdContactMail /> },
    { name: "Electrical Repair & Maintenance", icon: <FaCogs /> },
    { name: "Seal Cutting Services", icon: <FaCogs /> },
    { name: "Wrapping & Packaging Work", icon: <MdLocalShipping /> },
    { name: "General Civil Work (Painting, Repair)", icon: <MdConstruction /> },
    { name: "Transportation & Logistic Support", icon: <FaTruckMoving /> }
  ];

  const teamMembers = [
    {
      name: "Ronit Patil",
      position: "Founder & CEO",
      description: "Visionary leader with 15+ years experience in agri-infrastructure and industrial support services. Ronit founded KM Enterprises with a mission to bridge the gap between rural and industrial economies.",
      icon: <FaChartLine />,
      image: ceoImage
    },
    {
      name: "Harsh Patil",
      position: "Chief Technology Officer",
      description: "Technology strategist with expertise in operational automation and digital transformation. Aarav drives innovation across all KM Enterprises services.",
      icon: <FaLightbulb />,
      image: ctoImage
    },
    {
      name: "Mahendra Patil",
      position: "Chief Financial Officer",
      description: "Financial expert ensuring sustainable growth and fiscal responsibility. Priya oversees all financial operations and strategic investments.",
      icon: <FaHandshake />,
      image: cfoImage
    }
  ];

  const safetyFeatures = [
    {
      title: "Workplace Health & Safety",
      icon: <MdSafetyDivider />,
      items: [
        "Comprehensive safety training programs for all employees",
        "Regular equipment maintenance and safety audits",
        "Personal protective equipment (PPE) for all field staff",
        "Emergency response protocols and drills",
        "Hazard identification and risk assessment systems",
        "Compliance with all OSHA and local safety regulations"
      ]
    },
    {
      title: "Environmental Responsibility",
      icon: <MdEco />,
      items: [
        "Sustainable land development practices",
        "Waste reduction and recycling programs",
        "Energy-efficient equipment and vehicles",
        "Water conservation measures",
        "Eco-friendly cleaning and maintenance products",
        "Continuous improvement in environmental performance"
      ]
    },
    {
      title: "Employee Wellbeing",
      icon: <MdGroups />,
      items: [
        "Health insurance and wellness programs",
        "Regular health check-ups",
        "Ergonomic work environments",
        "Mental health support services",
        "Continuous skills development",
        "Fair wages and benefits"
      ]
    }
  ];

  return (
    <Container>
      <Navbar>
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    onClick={() => scrollTo('home')}
    style={{ cursor: 'pointer' }}
  >
    <img 
      src="/logo/km-logo-main.png" 
      alt="KM Enterprises"
      style={{ height: '50px' }}
    />
  </motion.div>
        <NavLinks>
          <NavLink 
            onClick={() => scrollTo('home')} 
            style={{ color: activeSection === 'home' ? '#90e0ef' : 'white' }}
            whileHover={{ color: '#90e0ef' }}
          >
            Home
          </NavLink>
          <NavLink 
            onClick={() => scrollTo('services')} 
            style={{ color: activeSection === 'services' ? '#90e0ef' : 'white' }}
            whileHover={{ color: '#90e0ef' }}
          >
            Services
          </NavLink>
          <NavLink 
            onClick={() => scrollTo('core')} 
            style={{ color: activeSection === 'core' ? '#90e0ef' : 'white' }}
            whileHover={{ color: '#90e0ef' }}
          >
            Core Services
          </NavLink>
          <NavLink 
            onClick={() => scrollTo('team')} 
            style={{ color: activeSection === 'team' ? '#90e0ef' : 'white' }}
            whileHover={{ color: '#90e0ef' }}
          >
            Our Team
          </NavLink>
          <NavLink 
            onClick={() => scrollTo('contact')} 
            style={{ color: activeSection === 'contact' ? '#90e0ef' : 'white' }}
            whileHover={{ color: '#90e0ef' }}
          >
            Contact
          </NavLink>
        </NavLinks>
      </Navbar>

      <HeroSection id="home">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            KM ENTERPRISES
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Innovating Agri-Industrial Solutions
          </Subtitle>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.3rem', lineHeight: '1.6' }}
          >
            Transforming idle farmland into productive industrial spaces while providing comprehensive 
            support services for businesses across sectors through sustainable and innovative solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('services')}
            >
              Explore Our Services
            </Button>
          </motion.div>
        </motion.div>
        <ParallaxBackground style={{ y: y1 }}>
          <BackgroundImage style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            opacity: 0.2
          }} />
        </ParallaxBackground>
      </HeroSection>

      <Section id="services" style={{ backgroundColor: '#f8f9fa' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <SectionTitle 
            color="#2d6a4f" 
            underlineColor="#2d6a4f"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Comprehensive Services
          </SectionTitle>
          <motion.p
            variants={fadeIn}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.2rem', lineHeight: '1.6' }}
          >
            KM Enterprises offers a wide range of specialized services to support businesses in agriculture, 
            infrastructure, and industrial sectors with reliable and efficient solutions.
          </motion.p>

          <ServiceGrid>
            {coreServices.map((service, index) => (
              <ServiceCard
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <ServiceImage image={service.image} />
                <IconContainer whileHover={{ rotate: 15, scale: 1.1 }}>
                  {service.icon}
                </IconContainer>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{service.title}</h3>
                <p style={{ marginBottom: '1.5rem' }}>{service.description}</p>
                <ul style={{ textAlign: 'left', marginTop: 'auto', width: '100%' }}>
                  {service.benefits.map((benefit, i) => (
                    <motion.li 
                      key={i} 
                      style={{ marginBottom: '0.8rem', position: 'relative', paddingLeft: '1.8rem' }}
                      whileHover={{ x: 5 }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: '#2d6a4f' }}>✓</span>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </motion.div>
      </Section>

      <Section id="core" style={{ backgroundColor: 'white' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <SectionTitle 
            color="#1a3a1f" 
            underlineColor="#1a3a1f"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Additional Support Services
          </SectionTitle>
          <motion.p
            variants={fadeIn}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.2rem', lineHeight: '1.6' }}
          >
            Beyond our core offerings, we provide these essential services to ensure your operations run smoothly and efficiently.
          </motion.p>

          <ServiceList>
            {additionalServices.map((service, index) => (
              <ServiceListItem
                key={index}
                variants={bounce}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ backgroundColor: 'rgba(45, 106, 79, 0.05)' }}
              >
                {service.icon}
                {service.name}
              </ServiceListItem>
            ))}
          </ServiceList>

          <motion.div
            variants={fadeIn}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <Button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
            >
              Get a Custom Service Quote
            </Button>
          </motion.div>
        </motion.div>
        <ParallaxBackground style={{ y: y2 }}>
          <BackgroundImage style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            opacity: 0.05 
          }} />
        </ParallaxBackground>
      </Section>

      <Section id="team" style={{ backgroundColor: '#f8f9fa' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <SectionTitle 
            color="#2d6a4f" 
            underlineColor="#2d6a4f"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Meet Our Leadership Team
          </SectionTitle>
          <motion.p
            variants={fadeIn}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.2rem', lineHeight: '1.6' }}
          >
            The visionary leaders driving KM Enterprises' mission to bridge agriculture and industry through innovative solutions.
          </motion.p>

          <ServiceGrid>
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <MemberImage image={member.image} />
                <IconContainer whileHover={{ rotate: 15, scale: 1.1 }}>
                  {member.icon}
                </IconContainer>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{member.name}</h3>
                <p style={{ 
                  color: '#2d6a4f', 
                  fontWeight: '600', 
                  margin: '0.5rem 0 1rem',
                  fontSize: '1.1rem'
                }}>
                  {member.position}
                </p>
                <p style={{ textAlign: 'center' }}>{member.description}</p>
              </TeamMemberCard>
            ))}
          </ServiceGrid>
        </motion.div>
      </Section>

      <Section id="safety" style={{ 
        background: `linear-gradient(rgba(26, 58, 31, 0.9), rgba(26, 58, 31, 0.9)), url(${safetyImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '6rem 2rem'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <SectionTitle 
            color="white" 
            underlineColor="#90e0ef"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Commitment to Safety & Sustainability
          </SectionTitle>
          <motion.p
            variants={fadeIn}
            style={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              fontSize: '1.2rem',
              lineHeight: '1.6'
            }}
          >
            At KM Enterprises, we prioritize the wellbeing of our employees, clients, and the environment through comprehensive programs and responsible practices.
          </motion.p>

          <div style={{ marginTop: '2rem' }}>
            {safetyFeatures.map((feature, index) => (
              <SafetyFeature
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <FeatureHighlight 
                  animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                  transition={{ 
                    duration: 10 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <h3>
                  {feature.icon}
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
                <ul>
                  {feature.items.map((item, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 10 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </SafetyFeature>
            ))}
          </div>
        </motion.div>
      </Section>

      <Section id="contact" style={{ 
        background: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${contactImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '6rem 2rem',
        minHeight: '80vh'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <SectionTitle color="#1a3a1f" underlineColor="#1a3a1f">
            Get In Touch
          </SectionTitle>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            style={{ 
              textAlign: 'center', 
              maxWidth: '800px', 
              margin: '0 auto 3rem', 
              fontSize: '1.2rem',
              lineHeight: '1.6'
            }}
          >
            Ready to discuss how we can support your business needs? Contact our team today for more information or to request a service quote.
          </motion.p>

          <AnimatePresence>
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  background: '#2d6a4f',
                  color: 'white',
                  padding: '3rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  maxWidth: '600px',
                  margin: '0 auto',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                }}
              >
                <motion.h3 
                  style={{ fontSize: '1.8rem', marginBottom: '1rem' }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Thank You!
                </motion.h3>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  Your message has been received. Our team will get back to you within 24 hours.
                </p>
                <Button
                  whileHover={{ scale: 1.05, backgroundColor: '#1a3a1f' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormSubmitted(false)}
                  style={{ backgroundColor: 'white', color: '#2d6a4f' }}
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <ContactForm
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
              >
                <FormGroup>
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="service">Service Interested In</label>
                  <select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="land-development">Land Development & Subleasing</option>
                    <option value="civil-contracts">Civil Contracts & Water Pipelines</option>
                    <option value="forklift-rental">Forklift Rental Services</option>
                    <option value="support-services">Support Services</option>
                    <option value="other">Other</option>
                  </select>
                </FormGroup>

                <FormGroup full>
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </FormGroup>

                <FormGroup full style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <Button
                    type="submit"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </Button>
                </FormGroup>
              </ContactForm>
            )}
          </AnimatePresence>
          <ContactInfo
  initial="hidden"
  whileInView="visible"
  variants={staggerContainer}
  viewport={{ once: true, amount: 0.2 }}
  style={{ marginTop: '4rem' }}
>
  <motion.h3
    variants={fadeIn}
    style={{ 
      textAlign: 'center', 
      color: '#1a3a1f', 
      fontSize: '1.8rem',
      marginBottom: '1.5rem'
    }}
  >
    Contact Information
  </motion.h3>
  
  <div style={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '1rem'
  }}>
    <ContactItem
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
    >
      <FaPhone />
      <div>
        <h3>Phone</h3>
        <p>+91 9619797676</p>
      </div>
    </ContactItem>

    <ContactItem
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
    >
      <FaEnvelope />
      <div>
        <h3>Email</h3>
        <p>mahendra20101976@gmail.com</p>
      </div>
    </ContactItem>

       <ContactItem
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
    >
    <FaMapMarkerAlt style={{ marginTop: '0.3rem' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Address</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <p style={{ flex: 1 }}>
            KM Enterprises Headquarters, Khopate, Navi Mumbai, Maharashtra, India
          </p>
          </div>
          </div>
          </ContactItem>

          <ContactItem
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
    >
              <iframe
            title="Pinned KM Location"
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d448.5858394960859!2d73.00167783299042!3d18.86510624820799!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1745160273696!5m2!1sen!2sin"
            width="300"
            height="150"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
       
    </ContactItem>
  </div>
</ContactInfo>


        </motion.div>
      </Section>

      <Footer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img 
    src="/logo/km-logo-main.png" 
    alt="KM Enterprises"
    style={{ height: '60px', marginBottom: '1.5rem' }}
  />
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            © {new Date().getFullYear()} KM Enterprises. All Rights Reserved.
          </p>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Bridging Agriculture and Industry Through Innovative Solutions
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            marginTop: '2rem'
          }}>
            <motion.a 
              href="#" 
              style={{ color: 'white', fontSize: '1.5rem' }}
              whileHover={{ y: -5, color: '#90e0ef' }}
            >
              <FaEnvelope />
            </motion.a>
            <motion.a 
              href="#" 
              style={{ color: 'white', fontSize: '1.5rem' }}
              whileHover={{ y: -5, color: '#90e0ef' }}
            >
              <FaPhone />
            </motion.a>
            <motion.a 
              href="#" 
              style={{ color: 'white', fontSize: '1.5rem' }}
              whileHover={{ y: -5, color: '#90e0ef' }}
            >
              <FaMapMarkerAlt />
            </motion.a>
          </div>
        </motion.div>
        <ParallaxBackground style={{ y: y1, rotate }}>
          <BackgroundImage style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            opacity: 0.1
          }} />
        </ParallaxBackground>
      </Footer>
    </Container>
  );
};

export default App;