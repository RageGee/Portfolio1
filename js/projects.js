document.addEventListener('DOMContentLoaded', () => {
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

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
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project card hover effects
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');

        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(100%)';
        });
    });

    // Pagination
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Stats counter animation
    const statCards = document.querySelectorAll('.stat-card');
    const statsSection = document.querySelector('#project-stats');

    const animateStats = () => {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            statCards.forEach(card => {
                const number = card.querySelector('h3');
                const target = parseInt(number.textContent);
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        number.textContent = Math.floor(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        number.textContent = target + '+';
                    }
                };

                updateCount();
            });
            window.removeEventListener('scroll', animateStats);
        }
    };

    window.addEventListener('scroll', animateStats);
}); 