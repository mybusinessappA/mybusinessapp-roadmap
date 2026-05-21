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

// Phase 4 - Partnership Form with Google Apps Script & Inline Status
document.addEventListener('DOMContentLoaded', function () {
    const partnershipForm = document.getElementById('partnershipForm');

    if (partnershipForm) {
        // Create status div if it doesn't exist
        let statusDiv = partnershipForm.querySelector('.form-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.className = 'form-status';
            partnershipForm.appendChild(statusDiv);
        }

        partnershipForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                partnershipType: document.getElementById('partnershipType').value,
                message: document.getElementById('message').value,
                type: 'Partnership Inquiry',
                timestamp: new Date().toISOString()
            };

            // Get submit button
            const submitBtn = partnershipForm.querySelector('.submit-button');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span class="button-icon">⏳</span> Sending...';
            submitBtn.disabled = true;

            // Clear and show status
            statusDiv.className = 'form-status';
            statusDiv.textContent = 'Sending your inquiry...';
            statusDiv.style.display = 'block';

            // Prepare data for Google Apps Script
            const formBody = new URLSearchParams();
            Object.keys(formData).forEach(key => {
                formBody.append(key, formData[key]);
            });

            // Send to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbzcb7t382uPBwUB5dLwTBJCH4mx5Vy2X0N9umFuYH8MbWpDNxHqvhvsL-YLA1JwVRyZsw/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            })
                .then(() => {
                    // Success
                    statusDiv.className = 'form-status success';
                    statusDiv.textContent = 'Thank you! We will contact you within 2-3 business days.';
                    partnershipForm.reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    statusDiv.className = 'form-status error';
                    statusDiv.textContent = 'Failed to send. Please email us directly at mybusinessappa@gmail.com';
                })
                .finally(() => {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Hide status after 8 seconds
                    setTimeout(() => {
                        statusDiv.style.display = 'none';
                    }, 8000);
                });
        });
    }
});

// Footer Contact Form - Google Apps Script Integration
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('footerContactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
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

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Simple mobile menu fix - place at bottom of page
(function () {
    console.log('Simple menu fix loaded');

    // Get elements
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.querySelector('.header-nav');

    if (!menuToggle || !headerNav) {
        console.log('Menu elements not found');
        return;
    }

    console.log('Menu elements found, attaching click handler');

    // Remove any existing listeners by cloning and replacing
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);

    // Add new click listener
    newMenuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('Menu clicked - toggling');

        // Toggle menu
        if (headerNav.classList.contains('active')) {
            headerNav.classList.remove('active');
            this.querySelector('i').className = 'fas fa-bars';
        } else {
            headerNav.classList.add('active');
            this.querySelector('i').className = 'fas fa-times';
        }
    });

    // Close when clicking links
    headerNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            headerNav.classList.remove('active');
            const icon = newMenuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    console.log('Menu fix complete');
})();

// ============ CHAT SYSTEM 1 ============
const chatIcon = document.getElementById('chatIcon');
const chatModal = document.getElementById('chatModal');
const closeChatBtn = document.getElementById('closeChatBtn');

chatIcon.addEventListener('click', () => {
    if (chatModal.classList.contains('hidden')) {
        chatModal.classList.remove('hidden');
    } else {
        chatModal.classList.add('hidden');
    }
});

closeChatBtn.addEventListener('click', () => {
    chatModal.classList.add('hidden');
});

// ============ CHAT SYSTEM ============

// Dynamically load Supabase
if (typeof supabase === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = function () {
        const SUPABASE_URL = 'https://gebqornquqcreangumol.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYnFvcm5xdXFjcmVhbmd1bW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjg1NTAsImV4cCI6MjA4NDY0NDU1MH0.7tOO6yQCBGqsg1V6cS5k5w652yt4BNtZIxQ2iojR_Lk';
        window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase loaded');

        // ✅ Call initChat AFTER Supabase is ready
        initChat();
    };
    document.head.appendChild(script);
} else {
    initChat();
}

function initChat() {
    let chatCurrentUser = null;
    let chatCurrentConversation = null;
    let chatMessagesSubscription = null;

    // DOM elements
    const chatEmailScreen = document.getElementById('chatEmailScreen');
    const chatInterface = document.getElementById('chatInterface');
    const chatEmailInput = document.getElementById('chatEmailInput');
    const chatVerifyBtn = document.getElementById('chatVerifyBtn');
    const chatEmailError = document.getElementById('chatEmailError');
    const chatCurrentUserEmailSpan = document.getElementById('chatCurrentUserEmail');
    const chatSwitchAccountBtn = document.getElementById('chatSwitchAccountBtn');
    const chatSearchInput = document.getElementById('chatSearchInput');
    const chatSearchResults = document.getElementById('chatSearchResults');
    const chatConversationList = document.getElementById('chatConversationList');
    const chatMessagesArea = document.getElementById('chatMessagesArea');
    const chatMessagesContainer = document.getElementById('chatMessagesContainer');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    // Check saved user
    const savedChatEmail = localStorage.getItem('chat_user_email');
    if (savedChatEmail) {
        chatEmailInput.value = savedChatEmail;
        verifyChatEmail(savedChatEmail);
    }

    chatVerifyBtn.addEventListener('click', () => {
        const email = chatEmailInput.value.trim().toLowerCase();
        if (!email) {
            chatEmailError.textContent = 'Please enter an email address';
            return;
        }
        verifyChatEmail(email);
    });

    async function verifyChatEmail(email) {
        chatEmailError.textContent = '';

        const { data, error } = await supabase
            .from('profiles')
            .select('id, email')
            .eq('email', email)
            .single();

        if (error || !data) {
            chatEmailError.innerHTML = 'User not registered, kindly <a href="#" id="chatDownloadLink">download the app and register</a>';
            document.getElementById('chatDownloadLink')?.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Redirect to app download page');
            });
            return;
        }

        chatCurrentUser = { id: data.id, email: data.email };
        // Request push notification permission
        if ('Notification' in window) {
            Notification.requestPermission();
        }

        // Register service worker and subscribe to push
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered');

                const vapidPublicKey = 'BASVduVa-1sqezTxaF7BlpGjSvPsduCLcbs2Qhn175wsACxRsQnDvgtazC2QpGEPDmQkY1-nOHpcmkqqnm2dKgU';

                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidPublicKey
                });

                // Save subscription to Supabase
                await supabase.from('push_subscriptions').upsert({
                    user_id: chatCurrentUser.id,
                    endpoint: subscription.endpoint,
                    p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
                    auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
                    updated_at: new Date().toISOString()
                });

                console.log('Push subscription saved');
            } catch (error) {
                console.error('Push setup failed:', error);
            }
        }

        localStorage.setItem('chat_user_email', chatCurrentUser.email);

        chatEmailScreen.classList.add('hidden');
        chatInterface.classList.remove('hidden');
        chatCurrentUserEmailSpan.textContent = chatCurrentUser.email;

        loadChatConversations();
        setupChatSearch();
    }

    function setupChatSearch() {
        let debounceTimer;
        chatSearchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value.trim().toLowerCase();
                if (query.length < 2) {
                    chatSearchResults.innerHTML = '';
                    return;
                }
                searchChatUsers(query);
            }, 300);
        });
    }

    async function searchChatUsers(query) {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, email')
            .ilike('email', `%${query}%`)
            .neq('id', chatCurrentUser.id)
            .limit(10);

        if (error || data.length === 0) {
            chatSearchResults.innerHTML = '<div class="user-item">No users found</div>';
            return;
        }

        chatSearchResults.innerHTML = data.map(user => `
        <div class="user-item" data-user-id="${user.id}" data-user-email="${user.email}">
            <div class="user-email">${user.email}</div>
            <div style="font-size:12px;color:#666;">Click to start conversation</div>
        </div>
    `).join('');

        document.querySelectorAll('#chatSearchResults .user-item').forEach(el => {
            el.addEventListener('click', () => {
                startChatConversation(el.dataset.userId, el.dataset.userEmail);
            });
        });
    }

    async function startChatConversation(otherUserId, otherUserEmail) {
        // Check existing conversation
        const { data: existingConv } = await supabase
            .from('participants')
            .select('conversation_id')
            .eq('user_id', chatCurrentUser.id);

        if (existingConv && existingConv.length > 0) {
            const convIds = existingConv.map(p => p.conversation_id);
            const { data: matching } = await supabase
                .from('participants')
                .select('conversation_id')
                .eq('user_id', otherUserId)
                .in('conversation_id', convIds);

            if (matching && matching.length > 0) {
                chatCurrentConversation = matching[0].conversation_id;
                loadChatMessages(chatCurrentConversation);
                chatSearchResults.innerHTML = '';
                chatSearchInput.value = '';
                return;
            }
        }

        // Create new conversation
        const { data: newConv, error } = await supabase
            .from('conversations')
            .insert({})
            .select()
            .single();

        if (error) return;

        await supabase.from('participants').insert([
            { conversation_id: newConv.id, user_id: chatCurrentUser.id },
            { conversation_id: newConv.id, user_id: otherUserId }
        ]);

        chatCurrentConversation = newConv.id;
        loadChatMessages(chatCurrentConversation);
        loadChatConversations();
        chatSearchResults.innerHTML = '';
        chatSearchInput.value = '';
    }

    async function loadChatConversations() {
        const { data, error } = await supabase
            .from('participants')
            .select(`
            conversation_id,
            conversations (
                id,
                messages (id, content, created_at, sender_id, read_at)
            )
        `)
            .eq('user_id', chatCurrentUser.id);

        if (error || !data || data.length === 0) {
            chatConversationList.innerHTML = '<div style="padding:20px;text-align:center;color:#666;">No conversations yet. Search for users above.</div>';
            return;
        }

        const conversations = data.map(p => {
            const conv = p.conversations;
            const messages = conv?.messages || [];
            const lastMessage = messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
            const unreadCount = messages.filter(m => m.sender_id !== chatCurrentUser.id && !m.read_at).length;
            return {
                id: conv.id,
                lastMessage: lastMessage?.content || 'No messages yet',
                lastMessageTime: lastMessage?.created_at,
                unreadCount
            };
        }).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

        chatConversationList.innerHTML = conversations.map(conv => `
        <div class="conversation-item" data-conv-id="${conv.id}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span>${conv.lastMessage.substring(0, 50)}</span>
                ${conv.unreadCount > 0 ? `<span class="unread-badge">${conv.unreadCount}</span>` : ''}
            </div>
            <div style="font-size:12px;color:#666;margin-top:4px;">${new Date(conv.lastMessageTime).toLocaleString()}</div>
        </div>
    `).join('');

        document.querySelectorAll('#chatConversationList .conversation-item').forEach(el => {
            el.addEventListener('click', () => {
                chatCurrentConversation = el.dataset.convId;
                loadChatMessages(chatCurrentConversation);
            });
        });
    }

    async function loadChatMessages(conversationId) {
        chatMessagesArea.classList.remove('hidden');

        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });

        if (!error) {
            renderChatMessages(data);

            // Mark unread as read
            const unreadMessages = data.filter(m => m.sender_id !== chatCurrentUser.id && !m.read_at);
            for (const msg of unreadMessages) {
                await supabase.from('messages').update({ read_at: new Date().toISOString() }).eq('id', msg.id);
            }
        }

        // Subscribe to new messages
        if (chatMessagesSubscription) {
            await chatMessagesSubscription.unsubscribe();
        }

        chatMessagesSubscription = supabase
            .channel(`chat_messages:${conversationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, (payload) => {
                if (payload.new.sender_id !== chatCurrentUser.id) {
                    const messageEl = createChatMessageElement(payload.new);
                    chatMessagesContainer.appendChild(messageEl);
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                    supabase.from('messages').update({ read_at: new Date().toISOString() }).eq('id', payload.new.id);
                }
            })
            .subscribe();
    }

    function renderChatMessages(messages) {
        chatMessagesContainer.innerHTML = '';
        messages.forEach(msg => {
            chatMessagesContainer.appendChild(createChatMessageElement(msg));
        });
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function createChatMessageElement(message) {
        const div = document.createElement('div');
        div.className = `message ${message.sender_id === chatCurrentUser.id ? 'message-sent' : 'message-received'}`;
        div.textContent = message.content;
        return div;
    }

    chatSendBtn.addEventListener('click', async () => {
        if (!chatCurrentConversation || !chatMessageInput.value.trim()) return;

        const content = chatMessageInput.value.trim();
        await supabase.from('messages').insert({
            conversation_id: chatCurrentConversation,
            sender_id: chatCurrentUser.id,
            content: content
        });
        chatMessageInput.value = '';
    });

    chatMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') chatSendBtn.click();
    });

    chatSwitchAccountBtn.addEventListener('click', () => {
        localStorage.removeItem('chat_user_email');
        chatCurrentUser = null;
        chatCurrentConversation = null;
        if (chatMessagesSubscription) chatMessagesSubscription.unsubscribe();
        chatEmailScreen.classList.remove('hidden');
        chatInterface.classList.add('hidden');
        chatEmailInput.value = '';
        chatSearchResults.innerHTML = '';
        chatConversationList.innerHTML = '';
        chatMessagesArea.classList.add('hidden');
    });
}
