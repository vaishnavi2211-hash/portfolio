const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.cssText = open
    ? ''
    : 'display:flex;flex-direction:column;position:fixed;top:58px;left:0;right:0;background:rgba(13,15,20,0.97);padding:1.5rem 2rem;gap:1.25rem;border-bottom:1px solid rgba(255,255,255,0.07);z-index:99;';
});
// Smooth scroll and mobile nav close
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    navLinks.style.cssText = ''; // close mobile menu if open
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll-animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up, .slide-left, .slide-right, .stagger-item').forEach(el => observer.observe(el));

// Staggered animations setup
const staggerContainers = document.querySelectorAll('.stagger-container');
staggerContainers.forEach(container => {
  const items = container.querySelectorAll('.stagger-item');
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 100}ms`;
  });
});

// Scrollspy logic to highlight active section in navbar
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a');

function scrollSpy() {
  const scrollPos = window.scrollY || document.documentElement.scrollTop;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // offset for nav height + buffer
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navAnchorLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', scrollSpy);
document.addEventListener('DOMContentLoaded', scrollSpy);

// Typewriter Effect
const words = ["Frontend Developer", "Full Stack Developer", "AI Integration Specialist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
  if (!typewriterElement) return;
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 45 : 85;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400; // Pause before starting to type next word
  }

  setTimeout(type, typeSpeed);
}

// Initialize Typewriter on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});

// Project Details Data
const projectDetails = {
  '01': {
    overview: 'A full-stack diagnostic application designed to streamline medical report analysis using AI. It provides a seamless interface for users and lab partners to upload reports, get instant AI-driven insights, and manage patient data securely.',
    image: './assets/medical-platform.png',
    architecture: [
      'React frontend deployed on Vercel',
      'Node/Express backend hosted on Render',
      'PostgreSQL database for secure patient records',
      'Socket.io for real-time client-server communication'
    ],
    features: [
      'JWT-based secure authentication for Users and Lab Partners',
      'Direct integration with Google Gemini API for report analysis',
      'Real-time status updates via WebSockets',
      'Responsive, modern dark-themed UI'
    ],
    challenges: 'Handling real-time updates across multiple clients reliably and ensuring secure, structured prompts were sent to the Gemini API to avoid hallucinated medical advice.',
    contributions: 'Architected the full database schema, built the entire frontend application, implemented JWT auth, and wrote the AI integration layer on the backend.'
  },
  '02': {
    overview: 'A browser-based interactive simulation of autonomous robots operating within a warehouse grid. It visualizes pathfinding algorithms in real-time as robots navigate to dynamic targets.',
    image: './assets/warehouse-sim.png',
    architecture: [
      'Pure React.js state management without external physics engines',
      'Tailwind CSS for rapid grid and UI styling',
      'Custom Breadth-First Search (BFS) implementation'
    ],
    features: [
      'Dynamic obstacle generation',
      'Real-time pathfinding visualization',
      'Live dashboard tracking task completion and distance metrics',
      'Multi-robot collision avoidance logic'
    ],
    challenges: 'Optimizing the React rendering cycle to ensure the simulation ran at a smooth 60fps without unnecessary re-renders of the entire grid on every tick.',
    contributions: 'Developed the BFS pathfinding algorithm, designed the UI layout, and engineered the React state structure for optimal performance.'
  },
  '03': {
    overview: 'A centralized platform for discovering and interacting with various AI models. It acts as a unified interface to test prompts across different AI providers without managing multiple accounts.',
    image: './assets/model-hub.png',
    architecture: [
      'Modular React component architecture',
      'Integration with third-party REST APIs',
      'Tailwind CSS for consistent SaaS-style UI'
    ],
    features: [
      'Search and filter system for models across text, image, and audio',
      'Interactive prompt playground',
      'Dynamic API endpoint routing based on selected model',
      'Responsive design optimized for both desktop and mobile'
    ],
    challenges: 'Standardizing the data format from disparate third-party APIs so they could all be rendered by a unified set of UI components.',
    contributions: 'Designed the complete UI/UX, implemented the filtering system, and handled all API integration and error boundary handling.'
  },
  '04': {
    overview: 'A comprehensive data analysis project examining national electricity consumption trends over a multi-year period. The findings were published as an interactive dashboard and narrative story.',
    image: './assets/electricity-dashboard.png',
    architecture: [
      'Data cleaning pipeline built with Python and Pandas',
      'SQL for complex querying and aggregation',
      'Tableau for final visualization and dashboard creation',
      'GitHub Pages for public hosting of the project summary'
    ],
    features: [
      'Interactive map-based filters',
      'Calculated fields for year-over-year growth metrics',
      'Narrative Tableau Story guiding the user through insights',
      'Static companion website for project documentation'
    ],
    challenges: 'Cleaning highly unstructured raw datasets containing missing values and inconsistent region naming conventions before visualization could begin.',
    contributions: 'Wrote all Python scripts for data sanitization, designed the SQL queries for aggregation, and built the final Tableau dashboards and website from scratch.'
  }
};

// Modal & Tilt logic
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');

// Internship detail data
const internshipDetails = {
  'WebDezn': {
    role: 'React Developer Intern',
    company: 'WebDezn',
    date: '2024',
    bullets: [
      'Built and maintained interactive frontend modules using React.js and Tailwind CSS.',
      'Designed reusable UI components and connected them to backend services.',
      'Integrated external REST APIs and Google Gemini AI model services for diagnostic analysis.'
    ],
    tech: ['React.js', 'Tailwind CSS', 'REST APIs', 'AI Integration'],
    certificate: 'https://drive.google.com/file/d/1zD02TKqdkpcHMbkXAI2wyFU6prcnma-A/view?usp=sharing'
  },
  'Edunet Foundation': {
    role: 'AI & Data Analytics Intern',
    company: 'Edunet Foundation',
    date: '2024',
    bullets: [
      'Completed projects on real-world datasets using data preprocessing and cleaning techniques.',
      'Applied machine learning classification and regression models in Python.',
      'Gained hands-on experience in predictive modeling and visual analytics reporting.'
    ],
    tech: ['Python', 'Machine Learning', 'Data Preprocessing', 'Data Cleaning'],
    certificate: 'https://drive.google.com/file/d/121gHcHhmnJIloeBmTFbgRuCK2JnFzlOV/view?usp=sharing'
  },
  'SmartBridge': {
    role: 'Data Analytics Intern',
    company: 'SmartBridge',
    date: '2024',
    bullets: [
      'Conducted data analysis and wrangling tasks using SQL database queries and Pandas.',
      'Built analytical stories and interactive dashboards using Tableau.',
      'Identified trends in electricity consumption patterns and presented findings.'
    ],
    tech: ['Tableau', 'SQL', 'Python', 'Data Analytics'],
    certificate: 'https://drive.google.com/file/d/1t7C4HkR6vOOYJbCmWDWE1M9ek6NjNdAX/view?usp=sharing'
  }
};

// Click handler for internship list items
document.querySelectorAll('.exp-item').forEach(item => {
  item.addEventListener('click', () => {
    const companyEl = item.querySelector('.exp-company');
    if (!companyEl) return;
    const companyName = companyEl.textContent.trim();
    const details = internshipDetails[companyName];
    if (!details) return;

    modalTitle.innerText = details.role;
    modalBody.innerHTML = `
      <div class="modal-layout">
        <div>
          <h3 style="font-size: 17px; color: var(--accent); margin-bottom: 0.5rem;">${details.company}</h3>
          <p style="font-size: 13px; color: var(--text-3); font-family: var(--font-mono); margin-bottom: 1.5rem;">Internship &middot; ${details.date}</p>
          
          <div class="modal-section">
            <h4>Responsibilities & Achievements</h4>
            <ul class="exp-bullets" style="margin-left: 0; padding-left: 0;">
              ${details.bullets.map(b => `<li style="font-size: 14px; color: var(--text-2); margin-bottom: 8px; line-height: 1.6; list-style:none; padding-left: 1.2rem; position:relative;"><span style="position:absolute; left:0; color:var(--accent);">—</span>${b}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div>
          <div class="modal-section" style="margin-top: 1rem;">
            <h4>Technologies Used</h4>
            <div class="project-stack" style="margin-bottom: 2rem;">
              ${details.tech.map(t => `<span class="stack-tag">${t}</span>`).join('')}
            </div>
          </div>
          
          <div class="modal-section">
            <a class="btn-primary" href="${details.certificate}" target="_blank" rel="noopener" style="width: 100%; justify-content: center; text-decoration: none;">
              View Internship Certificate
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.project-card').forEach(card => {
  
  // 3D Tilt Effect
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // Max rotation 4deg
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

    const img = card.querySelector('.project-image img');
    if (img) {
      const panX = ((x - centerX) / centerX) * -8; // Pan up to 8px in opposite direction
      const panY = ((y - centerY) / centerY) * -8;
      img.style.transform = `scale(1.1) translate(${panX}px, ${panY}px)`;
      img.style.transition = 'none'; // Smooth instant update
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.transition = 'transform 0.5s ease';
    const img = card.querySelector('.project-image img');
    if (img) {
      img.style.transform = 'scale(1)';
      img.style.transition = 'transform 0.5s ease';
    }
    setTimeout(() => { 
      card.style.transition = 'all 0.3s ease'; 
      if (img) img.style.transition = 'opacity 0.3s, transform 0.5s';
    }, 500);
  });

  // Modal click event
  card.style.cursor = 'pointer';
  card.addEventListener('click', (e) => {
    if (e.target.closest('.project-link')) return; // Ignore if clicking a link inside
    
    const title = card.querySelector('.project-title').innerText;
    const number = card.querySelector('.project-number').innerText;
    const stack = card.querySelector('.project-stack').innerHTML;
    const details = projectDetails[number];
    
    // Extract all links from the card to render inside the modal
    const linksContainer = card.querySelector('.project-links');
    const projectLinksHTML = linksContainer ? Array.from(linksContainer.querySelectorAll('.project-link')).map(link => {
      const isGhost = link.classList.contains('ghost');
      const btnClass = isGhost ? 'btn-ghost' : 'btn-primary';
      return `
        <a class="${btnClass}" href="${link.href}" target="_blank" rel="noopener" style="flex: 1; min-width: 140px; justify-content: center; text-decoration: none; text-align: center; display: inline-flex; align-items: center; gap: 8px; font-weight: 500; font-size: 13.5px; padding: 11px 18px; border-radius: var(--radius-sm);">
          ${link.textContent.trim()}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 14px; height: 14px; flex-shrink: 0;"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      `;
    }).join('') : '';

    modalTitle.innerText = title;
    
    if (details) {
      modalBody.innerHTML = `
        <div class="modal-layout">
          <div>
            <p style="font-size: 15.5px; color: var(--text); padding-bottom: 0.5rem; line-height: 1.6;">${details.overview}</p>
            <div class="project-stack" style="margin-bottom: 2rem;">${stack}</div>
            
            <div class="modal-section">
              <h4>Key Features</h4>
              <ul>${details.features.map(f => `<li>${f}</li>`).join('')}</ul>
            </div>
            
            <div class="modal-section">
              <h4>Architecture &amp; Workflow</h4>
              <ul>${details.architecture.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>
          </div>
          
          <div>
            <div class="modal-media" style="margin-bottom: 2rem;">
              <img src="${details.image}" alt="${title} Screenshot" onerror="this.style.display='none'">
            </div>
            
            <div class="modal-section">
              <h4>Challenges Solved</h4>
              <p>${details.challenges}</p>
            </div>
            
            <div class="modal-section" style="margin-bottom: 1.5rem;">
              <h4>My Contributions</h4>
              <p>${details.contributions}</p>
            </div>

            ${projectLinksHTML ? `
            <div class="modal-section" style="margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 10px;">
              ${projectLinksHTML}
            </div>` : ''}
          </div>
        </div>
      `;
    } else {
      const desc = card.querySelector('.project-desc').innerHTML;
      modalBody.innerHTML = `<p>${desc}</p><div class="project-stack">${stack}</div>`;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Project Category Filter Handler
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filterVal = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      if (filterVal === 'all' || category.includes(filterVal)) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Interactive Mayura Stardust Background (Lord Krishna Inspired)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 180 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class PlexusParticle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2 + 0.8;
      // Oscillating alpha for twinkling effect
      this.alpha = Math.random() * 0.5 + 0.2;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.01 + Math.random() * 0.02;
      
      const rand = Math.random();
      if (rand < 0.35) {
        this.colorType = 'gold';
        this.baseColor = '255, 215, 0';
      } else if (rand < 0.7) {
        this.colorType = 'turquoise';
        this.baseColor = '0, 225, 217';
      } else {
        this.colorType = 'green';
        this.baseColor = '0, 230, 118';
      }
    }
    update() {
      // Normal drift
      this.x += this.vx;
      this.y += this.vy;

      // Twinkle angle
      this.angle += this.angleSpeed;
      this.alpha = 0.3 + Math.sin(this.angle) * 0.25;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Magnetic hover interaction: gravitate towards cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Smoothly pull particles closer
          this.x -= (dx / dist) * force * 0.65;
          this.y -= (dy / dist) * force * 0.65;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
      ctx.shadowBlur = this.radius * 2.5;
      ctx.shadowColor = `rgba(${this.baseColor}, ${this.alpha})`;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  function initPlexus() {
    particles = [];
    const particleDensity = 75;
    const count = Math.min(particleDensity, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < count; i++) {
      particles.push(new PlexusParticle());
    }
  }
  initPlexus();
  window.addEventListener('resize', initPlexus);

  function animatePlexus() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      
      // Link to other close particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.08 * (p1.alpha + p2.alpha) / 2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          // Interpolate stroke style color based on particle types
          let strokeColor = '0, 225, 217'; // default turquoise
          if (p1.colorType === 'gold' || p2.colorType === 'gold') {
            strokeColor = '255, 215, 0';
          }
          ctx.strokeStyle = `rgba(${strokeColor}, ${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      // Link directly to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.15 * p1.alpha;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 225, 217, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animatePlexus);
  }
  animatePlexus();
}



// Force scroll to top on refresh/load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  if (window.location.hash) {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, 50);
});

// Modal click handler for the nav-brand logo
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
  navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    
    modalTitle.innerText = "Developer Profile Card";
    modalBody.innerHTML = `
      <div class="developer-profile-modal" style="text-align: center; padding: 1.5rem 0;">
        <div class="modal-avatar" style="width: 110px; height: 110px; margin: 0 auto 1.5rem auto; border-radius: 50%; overflow: hidden; border: 2px solid var(--accent); box-shadow: 0 0 20px rgba(79,142,247,0.35); background: var(--bg3);">
          <img src="./assets/profile.jpg" alt="Vaishnavi" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 24px; color: var(--text); margin-bottom: 0.5rem; font-weight:500;">Durga Vaishnavi Seshapu</h2>
        <p style="font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.08em;">Frontend &middot; Full Stack &middot; AI Integration</p>
        
        <p style="font-size: 15px; color: var(--text-2); max-width: 460px; margin: 0 auto 2rem auto; line-height: 1.6;">
          "Passionate about building responsive, high-performance web applications, integrating conversational AI models, and deriving key insights through interactive data dashboards."
        </p>
        
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a class="btn-primary" href="https://drive.google.com/file/d/1jQFP4aX43Dct8ItaQOO3kCJ05IMRLRAa/view?usp=sharing" target="_blank" rel="noopener" style="text-decoration: none; padding: 8px 18px; font-size: 13.5px; display: inline-flex; align-items: center; gap: 6px;">
            Download Resume
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <a class="btn-ghost" href="https://github.com/vaishnavi2211-hash" target="_blank" rel="noopener" style="text-decoration: none; padding: 8px 18px; font-size: 13.5px;">
            GitHub Profile
          </a>
        </div>
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}
