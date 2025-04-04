// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get slider elements
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Set initial state
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(n) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Set current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Function to advance to the next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Function to go back to the previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Set up event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Set up event listeners for navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Function to start automatic slideshow
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Function to reset interval after manual navigation
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Start the slideshow
    startInterval();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .slide-content a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate position to scroll to (with header offset)
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                alert('Sila masukkan nama anda.');
                nameInput.focus();
                return false;
            }
            
            if (emailInput.value.trim() === '') {
                alert('Sila masukkan alamat e-mel anda.');
                emailInput.focus();
                return false;
            }
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                alert('Sila masukkan alamat e-mel yang sah.');
                emailInput.focus();
                return false;
            }
            
            if (subjectInput.value.trim() === '') {
                alert('Sila masukkan subjek mesej.');
                subjectInput.focus();
                return false;
            }
            
            if (messageInput.value.trim() === '') {
                alert('Sila masukkan mesej anda.');
                messageInput.focus();
                return false;
            }
            
            // If all validations pass, display success message
            // In a real site, you would send the form data to a server here
            alert('Terima kasih! Mesej anda telah dihantar.');
            contactForm.reset();
        });
    }
    
    // Sticky header effect
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});