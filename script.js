'use strict';

//===========================================
// THEME MANAGEMENT - DARK/LIGHT MODE
//===========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add rotation animation
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0)';
        }, 300);
    }
}

// Event listener for theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme on page load
initTheme();

//===========================================
// SIDEBAR TOGGLE - CONTACT SECTION
//===========================================
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', function () {
        sidebar.classList.toggle('active');

        // Update button icon
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.className = 'fas fa-chevron-up';
        } else {
            icon.className = 'fas fa-chevron-down';
        }
    });
}

//===========================================
// PAGE NAVIGATION - ACADEMIC SECTIONS
//===========================================
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const contentSections = document.querySelectorAll('[data-page]');

function switchSection(sectionId) {
    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.querySelector(`[data-page="${sectionId}"]`);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update navigation buttons
    navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav-link') === sectionId) {
            link.classList.add('active');
        }
    });

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add click handlers to navigation buttons
if (navigationLinks.length > 0) {
    navigationLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-nav-link');
            switchSection(sectionId);
        });
    });
}

//===========================================
// CONTACT FORM HANDLING
//===========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            alert('✅ Thank you for your message! I will respond within 24 hours.');
            this.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 1500);
    });
}

//===========================================
// CERTIFICATE LINKS - VERIFICATION
//===========================================
const certLinks = document.querySelectorAll('.cert-verify-btn');

certLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            alert('🔗 Certificate verification link will be available soon.');
        }
    });
});

//===========================================
// PROJECT LINKS - EXTERNAL VALIDATION
//===========================================
const projectBtns = document.querySelectorAll('.project-btn');

projectBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
            alert('🔗 Project repository will be published soon.');
        }
    });
});

//===========================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
//===========================================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 50
    });
}

//===========================================
// INITIAL PAGE SETUP
//===========================================
document.addEventListener('DOMContentLoaded', function () {
    // Set default section to About
    let activeSectionFound = false;

    contentSections.forEach(section => {
        if (section.classList.contains('active')) {
            activeSectionFound = true;
        }
    });

    if (!activeSectionFound && contentSections.length > 0) {
        switchSection('about');
    }

    console.log('✅ Academic Portfolio | Shubham Gupta | LPU');
});

//===========================================
// MOBILE SIDEBAR AUTO-CLOSE
//===========================================
if (navigationLinks.length > 0 && sidebar) {
    navigationLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 1024 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                const icon = sidebarBtn?.querySelector('i');
                if (icon) icon.className = 'fas fa-chevron-down';
            }
        });
    });
}

//===========================================
// WINDOW RESIZE HANDLER
//===========================================
window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && sidebar) {
        sidebar.classList.remove('active');
        const icon = sidebarBtn?.querySelector('i');
        if (icon) icon.className = 'fas fa-chevron-down';
    }
});

//===========================================
// CUSTOM CURSOR EFFECT
//===========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));

// Optional hover effect on interactive elements
const interactables = document.querySelectorAll('a, button, input, textarea');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

//===========================================
// DATA PACKET BACKGROUND EFFECT
//===========================================
const canvas = document.createElement('canvas');
Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '-1',
    opacity: '0.6'
});
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let w, h;
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const packets = [];
const colorTheme = ['#ff003c', '#ff3300', '#ffb700']; // Red / Orange / Gold
const gridSize = 40; // matches background size

for (let i = 0; i < 70; i++) {
    const isHorizontal = Math.random() > 0.5;
    packets.push({
        x: isHorizontal ? Math.random() * w : Math.floor(Math.random() * (w / gridSize)) * gridSize,
        y: isHorizontal ? Math.floor(Math.random() * (h / gridSize)) * gridSize : Math.random() * h,
        len: Math.random() * 80 + 20,
        speed: Math.random() * 3 + 1,
        horizontal: isHorizontal,
        color: colorTheme[Math.floor(Math.random() * colorTheme.length)],
        direction: Math.random() > 0.5 ? 1 : -1
    });
}

function drawPackets() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    
    packets.forEach(p => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        let headX = p.x;
        let headY = p.y;
        
        if (p.horizontal) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + (p.len * p.direction), p.y);
            p.x += p.speed * p.direction;
            headX = p.x + (p.len * p.direction);
            
            if (p.direction === 1 && p.x > w) p.x = -p.len;
            else if (p.direction === -1 && p.x < -p.len) p.x = w + p.len;
        } else {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + (p.len * p.direction));
            p.y += p.speed * p.direction;
            headY = p.y + (p.len * p.direction);
            
            if (p.direction === 1 && p.y > h) p.y = -p.len;
            else if (p.direction === -1 && p.y < -p.len) p.y = h + p.len;
        }
        ctx.stroke();
        
        // Front glowing dot
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(headX, headY, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    requestAnimationFrame(drawPackets);
}
drawPackets();