// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current navigation item
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Add animation to work items on scroll
const workItems = document.querySelectorAll('.work-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

workItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-out';
    observer.observe(item);
});

// Hobbies Carousel (Gallery Spinner)
const carouselImages = [
    'Spin/scooby.jpg',
    'Spin/TokyoTowerr.jpg',
    'Spin/capybara.jpg',
    'Spin/fuji.jpg',
    'Spin/gundam.jpg',
    'Spin/lib.jpg',
    'Spin/korea.jpg',
    'Spin/image0.jpg'
];
let carouselIndex = 0;
const carouselImg = document.getElementById('carousel-image');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');

function showCarouselImage(idx, spin=true) {
    carouselImg.classList.remove('spin');
    setTimeout(() => {
        carouselImg.src = carouselImages[idx];
        if (spin) carouselImg.classList.add('spin');
    }, 50);
    setTimeout(() => carouselImg.classList.remove('spin'), 700);
}

function nextCarouselImage() {
    carouselIndex = (carouselIndex + 1) % carouselImages.length;
    showCarouselImage(carouselIndex);
}

function prevCarouselImage() {
    carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
    showCarouselImage(carouselIndex);
}

if (leftBtn && rightBtn && carouselImg) {
    leftBtn.addEventListener('click', () => {
        prevCarouselImage();
    });
    rightBtn.addEventListener('click', () => {
        nextCarouselImage();
    });
    // Auto-spin every 3 seconds
    setInterval(() => {
        nextCarouselImage();
    }, 3000);
}

// Auto-slide for hobbies-strip (gallery) with rewind at end
window.addEventListener('DOMContentLoaded', () => {
    const strip = document.querySelector('.hobbies-strip');
    const images = strip ? Array.from(strip.querySelectorAll('img')) : [];
    if (!strip || images.length === 0) return;

    const visibleCount = 5; // Number of images visible at once (adjust as needed)
    const gap = 32; // px, matches gap: 2rem in CSS
    const imgWidth = images[0].clientWidth || 350; // fallback if not loaded
    const step = imgWidth + gap;
    let index = 0;
    let interval = 2200; // ms

    function slideTo(idx) {
        strip.style.transform = `translateX(${-idx * step}px)`;
    }

    function rewind() {
        strip.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
        strip.style.transform = `translateX(0px)`;
        index = 0;
    }

    function nextSlide() {
        if (index < images.length - visibleCount) {
            index++;
            slideTo(index);
        } else {
            // Rewind with a short pause
            setTimeout(() => {
                strip.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
                rewind();
            }, 600);
        }
    }

    // Ensure transition is always set
    strip.style.transition = 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)';

    setInterval(nextSlide, interval);
}); 