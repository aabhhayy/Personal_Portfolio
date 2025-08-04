// Data
const projectsData = [
    {
        id: 1,
        title: "Social Media Sentiment Analysis",
        description: "Analyzed 3,000+ social media posts to classify sentiments (Positive: 42%, Neutral: 36%, Negative: 22%) with interactive Power BI dashboard featuring real-time filtering.",
        technologies: ["Power BI", "DAX", "Excel", "Power Query"],
        githubUrl: "https://github.com/aabhhayy/Social-Medai-Sentiment-Analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        year: "2025",
        category: "analytics"
    },
    {
        id: 2,
        title: "Employee Attendance Dashboard",
        description: "Interactive Power BI dashboard tracking 100+ employees' attendance with star schema modeling, advanced DAX logic, and SVG-enhanced KPI cards for HR automation.",
        technologies: ["Power BI", "DAX", "SVG", "Power Query"],
        githubUrl: "https://github.com/aabhhayy/Employee-Attendance-Analysis",
        image: "https://raw.githubusercontent.com/aabhhayy/Employee-Attendance-Analysis/main/emp_att_analytics.jpg",
        year: "2025",
        category: "powerbi"
    },
    {
        id: 3,
        title: "Live Weather Forecast Dashboard",
        description: "Real-time Power BI weather dashboard using live JSON API for 8+ Indian cities with custom labels, null handling, and Figma-designed UI background.",
        technologies: ["Power BI", "DAX", "JSON API", "Figma"],
        githubUrl: "https://github.com/aabhhayy/Weather-Forecast",
        image: "https://raw.githubusercontent.com/aabhhayy/Weather-Forecast/main/Dashboard-image.png",
        year: "2025",
        category: "powerbi"
    }
];

const skillsData = {
    programming: [
        { name: "Python", level: 85 },
        { name: "SQL", level: 90 }
    ],
    visualization: [
        { name: "Power BI", level: 95 },
        { name: "MS Excel", level: 88 },
        { name: "Google Sheets", level: 82 }
    ],
    ml: [
        { name: "NumPy", level: 80 },
        { name: "Pandas", level: 85 },
        { name: "Matplotlib", level: 78 }
    ]
};

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const downloadResumeBtn = document.getElementById('download-resume');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjects();
    initializeSkills();
    initializeScrollAnimations();
    initializeContactForm();
    initializeResumeDownload();
    initializeScrollIndicator();
});

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .hero-buttons a[href^="#"], .footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Update active nav link
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Projects
function initializeProjects() {
    renderProjects(projectsData);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filter = btn.getAttribute('data-filter');
            const filteredProjects = filter === 'all' 
                ? projectsData 
                : projectsData.filter(project => project.category === filter);
            
            renderProjects(filteredProjects);
        });
    });
}

function renderProjects(projects) {
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card fade-in">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag ${getTechClass(tech)}">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-footer">
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-details">
                        View Details <i class="fas fa-external-link-alt"></i>
                    </a>
                    <span class="project-year">${project.year}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.project-card.fade-in').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

function getTechClass(tech) {
    const techClasses = {
        'Power BI': 'powerbi',
        'DAX': 'dax',
        'Excel': 'excel',
        'Python': 'python',
        'SQL': 'sql'
    };
    return techClasses[tech] || '';
}

// Skills
function initializeSkills() {
    renderSkillBars('programming-skills', skillsData.programming, 'var(--primary-color)');
    renderSkillBars('visualization-skills', skillsData.visualization, 'var(--accent-color)');
    renderSkillBars('ml-skills', skillsData.ml, 'var(--accent-green)');

    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

function renderSkillBars(containerId, skills, color) {
    const container = document.getElementById(containerId);
    container.innerHTML = skills.map(skill => `
        <div class="skill-bar">
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="skill-progress">
                <div class="skill-fill" data-level="${skill.level}" style="background: ${color}"></div>
            </div>
        </div>
    `).join('');
}

function animateSkillBars(container) {
    const skillFills = container.querySelectorAll('.skill-fill');
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            const level = fill.getAttribute('data-level');
            fill.style.width = `${level}%`;
        }, index * 200);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in class to elements that should animate
    document.querySelectorAll('.about-content, .section-header, .timeline-item, .cert-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form data
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    }

    if (errors.length > 0) {
        showToast(errors[0], 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Resume Download
function initializeResumeDownload() {
    downloadResumeBtn.addEventListener('click', () => {
        // Create a downloadable resume content
        const resumeContent = generateResumeContent();
        downloadTextFile(resumeContent, 'Abhay_Tayal_Resume.txt');
        showToast('Resume downloaded successfully!', 'success');
    });
}

function generateResumeContent() {
    return `
ABHAY TAYAL
Data Analyst & Visualization Expert

Contact Information:
Email: abhaytayal2005@gmail.com
Phone: +91 9997961808
Location: Haridwar, Uttarakhand, India
GitHub: https://github.com/aabhhayy
LinkedIn: https://linkedin.com/in/abhay-tayal

EDUCATION
College Of Engineering Roorkee
B.Tech in Computer Science Engineering (2023-2027)
CGPA: 7.4

EXPERIENCE
Data Analyst Intern | Deloitte (Virtual Experience Program via Forage) | May 2025
• Completed Deloitte virtual internship simulating real-world analytics projects
• Cleaned and transformed 10,000+ records across 3 datasets using Excel and Power Query, improving data accuracy by 95%
• Built 5+ interactive Power BI dashboards featuring KPIs like Revenue Growth, Customer Retention Rate, and Profit Margins
• Analyzed 12-month trends to deliver actionable insights for a simulated retail client

PROJECTS
1. Social Media Sentiment Analysis - Power BI Project
   • Analyzed 3,000+ social media posts to classify sentiments (Positive: 42%, Neutral: 36%, Negative: 22%)
   • Built interactive Power BI dashboard with slicers, pie charts, bar graphs, and KPI cards
   • Tools Used: Power BI, DAX, Excel, Power Query

2. Employee Attendance Dashboard - Power BI Visualization Project
   • Designed interactive Power BI dashboard to track 100+ employees' attendance
   • Applied advanced DAX logic with SVG-enhanced KPI cards and dynamic filtering
   • Tools Used: Power BI, DAX, SVG, Power Query

3. Live Weather Forecast Dashboard - Real-time Power BI Project
   • Built real-time Power BI weather dashboard using live JSON API covering 8+ Indian cities
   • Applied advanced DAX logic for null handling and optimized data modeling
   • Tools Used: Power BI, DAX, Power Query, JSON API, Figma

CERTIFICATIONS
• Data Analytics Virtual Internship – Deloitte (via Forage) - May 2025
• Business Analyst Virtual Internship – Tata Group (via Forage) - July 2025
• Data Analyst Roadmap Certificate – OneRoadmap - 2025
• Pizza Sales Analysis Project Certificate – Explore-in Academy - 2025

TECHNICAL SKILLS
Programming Languages: Python, SQL
Visualization Tools: Power BI, MS Excel, Google Sheets
ML Libraries: NumPy, Pandas, Matplotlib
Core Competencies: Problem-Solving, Decision-Making, Team Management, Data Analysis, Data Visualization

INTERESTS
Enjoy taking casual portraits of strangers and clicking nature moments that catch my eye.
    `.trim();
}

function downloadTextFile(content, filename) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set content
    toastMessage.textContent = message;
    
    // Set type and icon
    toast.className = `toast ${type}`;
    if (type === 'success') {
        toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
        toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    showToast('An error occurred. Please refresh the page.', 'error');
});

// Browser Compatibility
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
}