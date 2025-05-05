document.addEventListener('DOMContentLoaded', () => {
    // Project filtering
    const filterButtons = document.querySelectorAll('.featured-filters .filter-btn');
    const projectCards = document.querySelectorAll('.featured-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project card hover effects
    projectCards.forEach(card => {
        const image = card.querySelector('.featured-image img');
        const overlay = card.querySelector('.overlay');

        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });

    // Stats counter animation
    const statsSection = document.querySelector('.featured-stats');
    const statNumbers = document.querySelectorAll('.stat-content h3');

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };

            updateCount();
        });
    };

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Smooth scroll for view all button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}); 