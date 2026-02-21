// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function () {
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

    const observer = new IntersectionObserver(function (entries) {
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

    // Apply theme to section 1 on page load
    const section1 = document.querySelector('.phone-carousel-section');
    if (section1) {
        section1.style.backgroundColor = savedTheme === 'dark' ? '#1a1a1a' : '#005826';
    }

    // Only setup button if it exists (homepage only)
    if (themeToggle) {
        updateThemeButton(savedTheme);

        // Toggle theme on click
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);

            // Update section 1 color when theme toggles
            const section1 = document.querySelector('.phone-carousel-section');
            if (section1) {
                section1.style.backgroundColor = newTheme === 'dark' ? '#1a1a1a' : '#005826';
            }
        });

        function updateThemeButton(theme) {
            const themeIcon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-moon';
                themeToggle.title = 'Switch to Light Mode';
            } else {
                themeIcon.className = 'fas fa-sun';
                themeToggle.title = 'Switch to Dark Mode';
            }
        }
    }
}

// Simple test function
function testTheme() {
    console.log('Theme system working');
}

// ===== PHONE CAROUSEL FUNCTIONALITY =====
function initPhoneCarousel(container = document) {
    const screenImages = container.querySelectorAll('.screen-image');
    const descriptions = container.querySelectorAll('.description-content');
    const dots = container.querySelectorAll('.screen-dots .dot');
    const prevBtn = container.querySelector('#prevScreen');
    const nextBtn = container.querySelector('#nextScreen');

    if (!screenImages.length) return;

    let currentIndex = 0;
    let slideInterval;

    function showScreen(index) {
        // Update images (always safe to run)
        screenImages.forEach(img => img.classList.remove('active'));
        if (screenImages[index]) {
            screenImages[index].classList.add('active');
        }

        // Update descriptions (only if they exist)
        if (descriptions.length > 0) {
            descriptions.forEach(desc => desc.classList.remove('active'));
            if (descriptions[index]) {
                descriptions[index].classList.add('active');
            }
        }

        // Update dots (only if they exist)
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        currentIndex = index;
    }

    function nextScreen() {
        let newIndex = currentIndex + 1;
        if (newIndex >= screenImages.length) {
            newIndex = 0;
        }
        showScreen(newIndex);
    }

    function prevScreen() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = screenImages.length - 1;
        }
        showScreen(newIndex);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextScreen, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showScreen(index);
            startAutoSlide();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevScreen();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextScreen();
            startAutoSlide();
        });
    }

    // Pause on hover
    const carouselContainer = container.querySelector('.phone-carousel-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto slide
    startAutoSlide();
}

// Add to DOMContentLoaded
// At the bottom of script.js, replace:
// initPhoneCarousel();
// with:
if (document.querySelector('.screen-image')) {
    initPhoneCarousel();
}

// Add to your script.js
window.addEventListener('scroll', function () {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Force dark mode colors for section 1
function forceDarkModeColors() {
    const isDark = document.body.classList.contains('dark-mode');
    const section1 = document.querySelector('.phone-carousel-section');

    if (section1) {
        if (isDark) {
            section1.style.setProperty('background-color', '#1a1a1a', 'important');
        } else {
            section1.style.setProperty('background-color', '#005826', 'important');
        }
    }
}

// Force dark mode colors for section 1
function forceDarkModeColors() {
    const section1 = document.querySelector('.phone-carousel-section');
    if (!section1) return;

    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
        section1.style.setProperty('background-color', '#1a1a1a', 'important');
    } else {
        section1.style.setProperty('background-color', '#005826', 'important');
    }
}

// Phase 4 - Partnership Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const partnershipForm = document.getElementById('partnershipForm');
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                partnershipType: document.getElementById('partnershipType').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send this to your backend
            console.log('Partnership Inquiry:', formData);
            
            // Show success message (replace with your preferred notification)
            alert('Thank you for your partnership interest! We will contact you within 2-3 business days.');
            
            // Reset form
            partnershipForm.reset();
        });
    }
});

// Footer Contact Form - Google Apps Script Integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('footerContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('footerName').value;
            const email = document.getElementById('footerEmail').value;
            const message = document.getElementById('footerMessage').value;
            
            // Get button and status elements
            const submitBtn = this.querySelector('.footer-submit-btn');
            const btnText = this.querySelector('.btn-text');
            const btnLoader = this.querySelector('.btn-loader');
            const formStatus = this.querySelector('.form-status');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';
            
            // Prepare data for Google Apps Script
            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            formData.append('timestamp', new Date().toISOString());
            
            // Send to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbzcb7t382uPBwUB5dLwTBJCH4mx5Vy2X0N9umFuYH8MbWpDNxHqvhvsL-YLA1JwVRyZsw/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            })
            .then(() => {
                // Success (no-cors means we can't read response)
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent successfully! We\'ll respond within 24 hours.';
                formStatus.style.display = 'block';
                
                // Reset form
                contactForm.reset();
            })
            .catch((error) => {
                // Error
                console.error('Error:', error);
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Failed to send. Please email us directly at mybusinessappa@gmail.com';
                formStatus.style.display = 'block';
            })
            .finally(() => {
                // Reset button
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                
                // Hide status after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            });
        });
    }
});

