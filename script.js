// Typing animation
const typingTexts = [
    "Full-Stack Developer",
    "Data Analyst",
    "AI Enthusiast",
    "Problem Solver"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typing-text');

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeText, speed);
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    mobileMenu.classList.add('hidden');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mobileMenu.classList.add('hidden');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up').forEach(el => {
    observer.observe(el);
});

// Skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate progress bars
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });

            // Animate circular progress
            const circularProgress = entry.target.querySelectorAll('.progress-circle');
            circularProgress.forEach(circle => {
                const progress = circle.getAttribute('data-progress');
                const circumference = 2 * Math.PI * 56;
                const offset = circumference - (progress / 100) * circumference;
                setTimeout(() => {
                    circle.style.strokeDasharray = `${circumference} ${circumference}`;
                    circle.style.strokeDashoffset = offset;
                }, 500);
            });
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Project modal data
const projectData = {
    'smartParking': {
        title: 'Smart Car Parking System',
        description: 'A real-time smart parking solution designed to reduce traffic congestion and optimize parking space usage using IoT sensors, Firebase, and a modern web interface with role-based access.',
        features: [
            'Real-time parking slot monitoring using IR sensors and ThingSpeak',
            'User authentication and role-based access (User & Management)',
            'Parking slot booking and cancellation system',
            'Dynamic fare and operational hour updates by management',
            'Live parking status visualization with Leaflet map',
        ],
        technologies: ['React.js', 'TypeScript', 'Node.js', 'Express', 'Firebase', 'ThingSpeak', 'ESP8266', 'IR sensor'],
        challenges: 'Integrating IoT-based real-time sensor data with the web app and maintaining synchronization across user and admin operations.',
        outcome: 'Deployed system successfully monitored parking slots in real time, reduced search time for parking by 40%, and improved overall user satisfaction.'
    }
    ,
    'expenseTracker': {
        title: 'Expense Tracker App',
        description: 'A mobile-first personal finance management app built using React Native, enabling users to efficiently track income, expenses, and view insights with intuitive charts and statistics.',
        features: [
            'User authentication with Firebase',
            'Add, edit, and delete income/expense entries',
            'Real-time sync with Firestore',
            'Categorized transaction tracking',
            'Weekly, monthly, and yearly statistics (Bar Chart)',
            'State-wise financial tips in multiple Indian languages'
        ],
        technologies: ['React Native', 'Firebase Authentication & Firestore', 'JavaScript', 'Gifted Charts', 'React Navigation', 'Expo', 'Cloudinary'],
        challenges: 'Managing real-time data synchronization with Firestore and rendering dynamic financial charts without performance lag.',
        outcome: 'The application runs successfully on Expo Go with full functionality, including real-time expense tracking, dynamic chart displays, and multi-language financial tips. It has been tested across multiple devices and is ready for further development and deployment.'
    },

    'placementPortal': {
        title: 'Placement Portal – Dept. of Management, CEG',
        description: 'An interactive web portal developed to streamline placement processes for 100+ students, featuring real-time data handling, secure admin access, and a fully responsive interface.',
        features: [
            'Student registration and data management',
            'Admin dashboard with secure authentication',
            'Real-time updates on placement announcements',
            'Mobile and desktop responsive UI',
            'Custom notifications for students',
            'Search and filtering of student profiles'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'Firebase'],
        challenges: 'Ensuring secure data access and providing a seamless user experience across devices.',
        outcome: 'Enhanced placement coordination efficiency and provided a centralized platform for students and admin interactions.'
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const project = projectData[projectId];

    if (project) {
        title.textContent = project.title;
        content.innerHTML = `
            <p class="text-gray-300 text-lg">${project.description}</p>
            
            <div>
                <h4 class="text-xl font-bold text-blue-400 mb-3">Key Features</h4>
                <ul class="list-disc list-inside text-gray-300 space-y-2">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h4 class="text-xl font-bold text-blue-400 mb-3">Technologies Used</h4>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<span class="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div>
                <h4 class="text-xl font-bold text-blue-400 mb-3">Challenges & Solutions</h4>
                <p class="text-gray-300">${project.challenges}</p>
            </div>
            
            <div>
                <h4 class="text-xl font-bold text-blue-400 mb-3">Outcome</h4>
                <p class="text-gray-300">${project.outcome}</p>
            </div>
            
            <div class="flex gap-4 pt-4">
                <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    View Live Demo
                </button>
                <button class="border border-blue-600 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    View Source Code
                </button>
            </div>
        `;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const button = event.target.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent! ✓';
            button.classList.remove('from-blue-600', 'to-purple-600');
            button.classList.add('from-green-600', 'to-green-600');

            event.target.reset();

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.classList.remove('from-green-600', 'to-green-600');
                button.classList.add('from-blue-600', 'to-purple-600');
            }, 3000);
        }, 2000);
    });
}

// Resume download
const downloadResumeBtn = document.getElementById('download-resume-btn');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        const resumeUrl = 'assets/resume.pdf'; // Replace with your actual resume path
        const a = document.createElement('a');
        a.href = resumeUrl;
        a.download = 'Ranjay_Singh_Resume.pdf'; // Rename as needed
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

// Initialize animations and event listeners on page load
window.addEventListener('load', () => {
    typeText();
    document.querySelector('#home .slide-in-up').classList.add('animate-in');
});

// Close modal when clicking outside
document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        closeProjectModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
        mobileMenu.classList.add('hidden');
    }
});