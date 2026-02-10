// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current date and year
    setCurrentDate();
    setCurrentYear();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Add any interactive functionality here
    initializeProgressBars();
    
    // Add subtle animations to cards
    animateCardsOnScroll();
});

// ===== UTILITY FUNCTIONS =====
function setCurrentDate() {
    const dateElements = document.querySelectorAll('#current-date');
    if (dateElements.length > 0) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        
        dateElements.forEach(el => {
            el.textContent = formattedDate;
        });
    }
}

function setCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
}

function initializeProgressBars() {
    // If we have animated progress bars, initialize them
    const progressBars = document.querySelectorAll('.progress-bar.animated .progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width || '0%';
        bar.style.width = '0%';
        
        // Animate after a short delay
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

function animateCardsOnScroll() {
    // Simple animation for cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.phase-card, .feature-card, .tech-card, .stat-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check saved theme and apply to page
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Only setup button if it exists (homepage only)
    if (themeToggle) {
        updateThemeButton(savedTheme);
        
        // Toggle theme on click
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
        });
        
        function updateThemeButton(theme) {
            const themeIcon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-moon';
                themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            } else {
                themeIcon.className = 'fas fa-sun';
                themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            }
        }
    }
}

// Simple test function
function testTheme() {
    console.log('Theme system working');
}
