// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function () {
    // Set current date and year
    setCurrentDate();
    setCurrentYear();

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

// ===== PHASE NAVIGATION =====
// Function to populate other phase pages (you can expand this)
function createPhasePages() {
    // Phase data structure
    const phases = {
        1: {
            title: "Foundation & Core Features",
            status: "completed",
            description: "Basic app structure and essential finance features that form the foundation of the application.",
            features: [
                {
                    title: "Splash Screen",
                    description: "Branded loading screen with app logo and initial loading animation.",
                    tags: ["UI/UX", "Android"]
                },
                {
                    title: "User Authentication",
                    description: "Secure login and signup system with Supabase Auth, including email verification.",
                    tags: ["Security", "Supabase"]
                },
                {
                    title: "Dashboard",
                    description: "Main dashboard with financial overview, quick stats, and navigation to all features.",
                    tags: ["Analytics", "Overview"]
                },
                {
                    title: "Finance Management",
                    description: "Core finance tracking including income, expenses, and basic budgeting.",
                    tags: ["Core Feature", "Finance"]
                },
                {
                    title: "Business Setup Wizard",
                    description: "Step-by-step guide for users to set up their business profile and initial settings.",
                    tags: ["Onboarding", "Setup"]
                },
                {
                    title: "Business View Screen",
                    description: "Detailed view of business finances with summary and quick access to all business data.",
                    tags: ["Business", "Overview"]
                }
            ]
        },
        2: {
            title: "Data Management & Editing",
            status: "in-progress",
            description: "Enhanced data manipulation and user experience for better financial control.",
            features: [
                {
                    title: "Dedicated Budget Edit Screens",
                    description: "Comprehensive interface for creating, editing, and managing budgets with visual indicators.",
                    status: "in-progress",
                    tags: ["Editing", "UI"]
                },
                {
                    title: "Ledger Editing Functionality",
                    description: "Advanced ledger management with batch editing, filtering, and search capabilities.",
                    status: "in-progress",
                    tags: ["Data", "Management"]
                },
                {
                    title: "Transaction Categorization",
                    description: "Smart categorization of transactions with customizable categories and rules.",
                    status: "planned",
                    tags: ["Automation", "Organization"]
                },
                {
                    title: "Data Export (CSV/PDF)",
                    description: "Export financial data in multiple formats for reporting and accounting purposes.",
                    status: "planned",
                    tags: ["Export", "Reporting"]
                }
            ]
        },
        3: {
            title: "Advanced Features",
            status: "planned",
            description: "Advanced analytics and business tools for comprehensive financial management.",
            features: [
                {
                    title: "Financial Reports & Analytics",
                    description: "Generate detailed financial reports with charts, graphs, and insights.",
                    status: "planned",
                    tags: ["Analytics", "Reporting"]
                },
                {
                    title: "Multi-business Support",
                    description: "Manage multiple businesses from a single account with separate finances.",
                    status: "planned",
                    tags: ["Multi-tenant", "Business"]
                },
                {
                    title: "Invoice Generation",
                    description: "Create and send professional invoices directly from the app.",
                    status: "planned",
                    tags: ["Invoicing", "Billing"]
                },
                {
                    title: "Expense Tracking Enhancements",
                    description: "Advanced expense tracking with receipt scanning and categorization.",
                    status: "planned",
                    tags: ["Expenses", "Tracking"]
                }
            ]
        },
        4: {
            title: "Scaling & Platform Expansion",
            status: "future",
            description: "Growing the app ecosystem and expanding to new platforms.",
            features: [
                {
                    title: "iOS Version Development",
                    description: "Native iOS application for iPhone and iPad users.",
                    status: "future",
                    tags: ["iOS", "Cross-platform"]
                },
                {
                    title: "Web Dashboard Version",
                    description: "Full-featured web application for desktop access.",
                    status: "future",
                    tags: ["Web", "Dashboard"]
                },
                {
                    title: "Team Collaboration Features",
                    description: "Multi-user access with role-based permissions for businesses.",
                    status: "future",
                    tags: ["Collaboration", "Teams"]
                },
                {
                    title: "API for Third-party Integrations",
                    description: "Public API for developers to build integrations with other tools.",
                    status: "future",
                    tags: ["API", "Integration"]
                }
            ]
        }
    };

    // You can use this data to dynamically generate phase pages if needed
    console.log('Phase data loaded. Use this to populate phase2.html, phase3.html, phase4.html');
    return phases;
}

// Initialize phase data
const allPhases = createPhasePages();

// ===== HELPER FUNCTION TO CREATE PHASE PAGES =====
// Call this function when creating phase pages
function generatePhasePage(phaseNumber) {
    const phase = allPhases[phaseNumber];
    if (!phase) return null;

    // This function returns HTML structure for a phase page
    // You can implement this if you want to dynamically generate pages
    console.log(`Generate HTML for Phase ${phaseNumber}: ${phase.title}`);
    return phase;
}

// Export phase data if needed for other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allPhases };
}
// ===== ADDITIONAL FUNCTIONS FOR PHASE PAGES =====

// Initialize phase-specific features
function initializePhaseFeatures() {
    // Add progress bar animations
    animateDetailedProgressBars();

    // Add phase-specific event listeners
    setupPhaseInteractions();

    // Update any phase-specific content
    updatePhaseContent();
}

function animateDetailedProgressBars() {
    const detailedBars = document.querySelectorAll('.current-progress .progress-fill');

    detailedBars.forEach(bar => {
        const width = bar.style.width || '0%';
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1.5s ease-in-out';
        }, 500);
    });
}

function setupPhaseInteractions() {
    // Add click handlers for feature cards if needed
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.closest('a')) {
                this.classList.toggle('expanded');
            }
        });
    });

    // Update navigation based on current page
    updateNavigationState();
}

function updatePhaseContent() {
    // Update any dynamic content based on URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const phase = urlParams.get('phase');

    if (phase) {
        console.log(`Loading phase ${phase} specific content`);
        // You can add phase-specific content updates here
    }
}

function updateNavigationState() {
    // Highlight current phase in navigation if needed
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-card');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current');
        }
    });
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Existing initialization
    setCurrentDate();
    setCurrentYear();
    initializeProgressBars();
    animateCardsOnScroll();

    // New phase-specific initialization
    initializePhaseFeatures();

    // Log for debugging
    console.log('Roadmap website initialized successfully');
    console.log('Current phase pages:', {
        phase1: 'Completed',
        phase2: 'In Progress',
        phase3: 'Planned',
        phase4: 'Future'
    });
});