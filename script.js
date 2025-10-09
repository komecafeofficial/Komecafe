// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
    if (mainNav.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function () {
        mainNav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Video Controls
const video = document.getElementById('kenkeyVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');

playPauseBtn.addEventListener('click', function () {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

muteBtn.addEventListener('click', function () {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        video.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// Scrolling Animations
function animateOnScroll() {
    const menuCards = document.querySelectorAll('.menu-card');
    const windowHeight = window.innerHeight;

    menuCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < windowHeight - 100) {
            card.classList.add('animate');
        }
    });
}

// Initial check and add scroll event listener
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Quick order buttons
document.querySelectorAll('.quick-order-btn').forEach(button => {
    button.addEventListener('click', function () {
        const packageId = this.getAttribute('data-package');
        const packagePrice = this.getAttribute('data-price');

        // Auto-fill the form
        document.getElementById('package').value = packageId;

        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');

        // Hide message after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);

        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

        // Highlight the selected package
        document.getElementById('package').focus();
    });
});

// Get directions button
document.getElementById('getDirections').addEventListener('click', function () {
    // Using approximate coordinates for Pantang Hospital Road
    const latitude = 5.6957;
    const longitude = -0.0910;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Open Google Maps with directions
            window.open(`https://www.google.com/maps/dir/${userLat},${userLng}/${latitude},${longitude}`, '_blank');
        }, function () {
            // Fallback if location access is denied
            window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
        });
    } else {
        // Fallback for browsers that don't support geolocation
        window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
    }
});

// Form submission handler
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const package = document.getElementById('package').options[document.getElementById('package').selectedIndex].text;
    const okro = document.getElementById('okro').checked ? 'Yes' : 'No';
    const address = document.getElementById('address').value;

    // Create WhatsApp message
    const message = `Hello Kome Cafe! I would like to place an order:%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Package: ${package}%0A` +
        `Okro: ${okro}%0A` +
        `Address: ${address}`;

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/233541678088?text=${message}`, '_blank');

    // Reset form
    document.getElementById('orderForm').reset();

    // Show confirmation
    alert('Your order is being processed! You will be redirected to WhatsApp to confirm your order.');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});