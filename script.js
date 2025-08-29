// Substance Wiki JavaScript
class SubstanceWiki {
    constructor() {
        this.substances = [];
        this.currentCategory = 'all';
        this.searchTimeout = null;
        this.init();
    }

    init() {
        this.loadSubstances();
        this.bindEvents();
        this.updateActiveSection();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
            searchInput.addEventListener('focus', this.showSearchResults.bind(this));
            searchInput.addEventListener('blur', () => {
                setTimeout(() => this.hideSearchResults(), 200);
            });
        }

        // Category filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterSubstances(category);
            });
        });

        // Hero buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.onclick) return; // Skip if onclick is already defined
                const text = e.target.textContent.toLowerCase();
                if (text.includes('browse')) {
                    this.showSection('substances');
                } else if (text.includes('safety')) {
                    this.showSection('safety');
                }
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', this.updateActiveSection.bind(this));

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    loadSubstances() {
        // Sample substance data - in a real application, this would come from an API
        this.substances = [
            {
                name: 'Psilocybin',
                category: 'psychedelics',
                description: 'A naturally occurring psychedelic compound found in certain mushrooms. Known for producing profound changes in perception, mood, and consciousness.',
                dosage: '1-3.5g dried',
                duration: '4-6 hours',
                roa: 'Oral'
            },
            {
                name: 'LSD',
                category: 'psychedelics',
                description: 'A potent hallucinogenic drug that produces significant alterations in perception, mood, and various cognitive processes.',
                dosage: '75-200μg',
                duration: '8-12 hours',
                roa: 'Oral/Sublingual'
            },
            {
                name: 'MDMA',
                category: 'stimulants',
                description: 'A psychoactive drug primarily used recreationally for its euphoric effects. Also being studied for therapeutic applications.',
                dosage: '75-125mg',
                duration: '3-5 hours',
                roa: 'Oral'
            },
            {
                name: 'Ketamine',
                category: 'dissociatives',
                description: 'A medication primarily used for anesthesia and pain management. Also has dissociative and antidepressant properties.',
                dosage: '20-75mg',
                duration: '45-90 min',
                roa: 'Intranasal/IM'
            },
            {
                name: 'THC',
                category: 'cannabinoids',
                description: 'The primary psychoactive compound in cannabis. Produces relaxation, euphoria, and altered perception.',
                dosage: '2.5-10mg',
                duration: '2-4 hours',
                roa: 'Oral/Inhalation'
            },
            {
                name: 'Alcohol',
                category: 'depressants',
                description: 'A central nervous system depressant that is widely consumed recreationally and culturally accepted in many societies.',
                dosage: '1-2 drinks',
                duration: '1-3 hours',
                roa: 'Oral'
            },
            {
                name: 'Caffeine',
                category: 'stimulants',
                description: 'A central nervous system stimulant that increases alertness and reduces fatigue. Commonly consumed in coffee, tea, and energy drinks.',
                dosage: '50-200mg',
                duration: '3-5 hours',
                roa: 'Oral'
            },
            {
                name: 'CBD',
                category: 'cannabinoids',
                description: 'A non-psychoactive compound found in cannabis with potential therapeutic benefits including anti-inflammatory and anxiolytic effects.',
                dosage: '10-40mg',
                duration: '4-6 hours',
                roa: 'Oral/Sublingual'
            },
            {
                name: 'DMT',
                category: 'psychedelics',
                description: 'A powerful psychedelic compound that produces intense but short-lived hallucinogenic experiences.',
                dosage: '15-40mg',
                duration: '10-30 min',
                roa: 'Vaporized'
            },
            {
                name: 'Benzodiazepines',
                category: 'depressants',
                description: 'A class of medications used to treat anxiety, insomnia, and seizures. They have sedative and muscle relaxant properties.',
                dosage: 'Varies',
                duration: '4-24 hours',
                roa: 'Oral'
            }
        ];

        this.renderSubstances();
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update URL
        history.pushState(null, null, `#${sectionId}`);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateActiveSection() {
        const hash = window.location.hash.substring(1);
        const section = hash || 'home';
        this.showSection(section);
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        
        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Debounce search
        this.searchTimeout = setTimeout(() => {
            if (query.length === 0) {
                this.hideSearchResults();
                return;
            }

            const results = this.substances.filter(substance => 
                substance.name.toLowerCase().includes(query) ||
                substance.description.toLowerCase().includes(query) ||
                substance.category.toLowerCase().includes(query)
            );

            this.displaySearchResults(results, query);
        }, 300);
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        
        if (!results.length) {
            searchResults.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: var(--text-light);">
                    No substances found for "${query}"
                </div>
            `;
        } else {
            searchResults.innerHTML = results.slice(0, 5).map(substance => `
                <div class="search-result-item" style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-light); cursor: pointer; transition: background 0.2s;" 
                     onmouseover="this.style.background='var(--bg-secondary)'" 
                     onmouseout="this.style.background='transparent'"
                     onclick="wiki.selectSubstance('${substance.name}')">
                    <div style="font-weight: 500; color: var(--text-primary);">${substance.name}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        ${substance.category} • ${substance.description.substring(0, 80)}...
                    </div>
                </div>
            `).join('');
            
            if (results.length > 5) {
                searchResults.innerHTML += `
                    <div style="padding: 0.75rem 1rem; text-align: center; color: var(--text-light); font-size: 0.875rem;">
                        +${results.length - 5} more results
                    </div>
                `;
            }
        }

        this.showSearchResults();
    }

    selectSubstance(substanceName) {
        this.showSection('substances');
        this.hideSearchResults();
        
        // Clear search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Highlight the selected substance
        setTimeout(() => {
            const substanceCards = document.querySelectorAll('.substance-card');
            substanceCards.forEach(card => {
                const nameElement = card.querySelector('.substance-name');
                if (nameElement && nameElement.textContent === substanceName) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.borderColor = 'var(--primary-color)';
                    card.style.boxShadow = 'var(--shadow-lg)';
                    
                    setTimeout(() => {
                        card.style.borderColor = '';
                        card.style.boxShadow = '';
                    }, 3000);
                }
            });
        }, 500);
    }

    showSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'block';
        }
    }

    hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    filterSubstances(category) {
        this.currentCategory = category;

        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.renderSubstances();
    }

    renderSubstances() {
        const grid = document.getElementById('substancesGrid');
        if (!grid) return;

        const filteredSubstances = this.currentCategory === 'all' 
            ? this.substances 
            : this.substances.filter(s => s.category === this.currentCategory);

        if (filteredSubstances.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No substances found in this category.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredSubstances.map(substance => `
            <div class="substance-card" onclick="wiki.showSubstanceDetails('${substance.name}')">
                <div class="substance-header">
                    <div class="substance-name">${substance.name}</div>
                    <span class="substance-category">${substance.category}</span>
                </div>
                <div class="substance-description">${substance.description}</div>
                <div class="substance-meta">
                    <span><i class="fas fa-pills"></i> ${substance.dosage}</span>
                    <span><i class="fas fa-clock"></i> ${substance.duration}</span>
                    <span><i class="fas fa-route"></i> ${substance.roa}</span>
                </div>
            </div>
        `).join('');
    }

    showSubstanceDetails(substanceName) {
        const substance = this.substances.find(s => s.name === substanceName);
        if (!substance) return;

        // Create modal or detailed view
        // For now, just show an alert with basic info
        alert(`${substance.name}\n\nCategory: ${substance.category}\nDescription: ${substance.description}\nDosage: ${substance.dosage}\nDuration: ${substance.duration}\nRoute: ${substance.roa}`);
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    formatDuration(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMin = minutes % 60;
            return remainingMin > 0 ? `${hours}h ${remainingMin}m` : `${hours}h`;
        }
    }

    getCategoryColor(category) {
        const colors = {
            'psychedelics': '#8b5cf6',
            'stimulants': '#ef4444',
            'depressants': '#3b82f6',
            'dissociatives': '#f59e0b',
            'cannabinoids': '#10b981'
        };
        return colors[category] || '#6b7280';
    }
}

// Global functions for onclick handlers
function showSection(sectionId) {
    wiki.showSection(sectionId);
}

// Initialize the wiki when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wiki = new SubstanceWiki();
});

// Handle navigation state
window.addEventListener('load', () => {
    if (window.wiki) {
        window.wiki.updateActiveSection();
    }
});

// Smooth scrolling for internal links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key to close search results
    if (e.key === 'Escape') {
        if (window.wiki) {
            window.wiki.hideSearchResults();
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Performance optimization: Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker registration for PWA functionality (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics and error tracking (placeholder)
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels to interactive elements
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.setAttribute('aria-label', 'Search substances');
        searchInput.setAttribute('role', 'searchbox');
    }

    // Add keyboard support for custom elements
    document.querySelectorAll('.substance-card, .feature-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
});

// Theme detection and handling
function detectTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);

// Initialize theme on load
detectTheme();