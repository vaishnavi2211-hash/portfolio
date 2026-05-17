
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:58px;left:0;right:0;background:rgba(13,15,20,0.97);padding:1.5rem 2rem;gap:1.25rem;border-bottom:1px solid rgba(255,255,255,0.07);z-index:99;';
  });
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => { navLinks.style.cssText = ''; });
  });
  // Intersection Observer for fade-up animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

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
      card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-4px)\`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = 'all 0.3s ease'; }, 500);
    });

    // Modal click event
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.project-link')) return; // Ignore if clicking a link inside
      
      const title = card.querySelector('.project-title').innerText;
      const number = card.querySelector('.project-number').innerText;
      const stack = card.querySelector('.project-stack').innerHTML;
      const details = projectDetails[number];
      
      modalTitle.innerText = title;
      
      if (details) {
        modalBody.innerHTML = \`
          <div class="modal-layout">
            <div>
              <p style="font-size: 15.5px; color: var(--text); padding-bottom: 0.5rem;">\${details.overview}</p>
              <div class="project-stack" style="margin-bottom: 2rem;">\${stack}</div>
              
              <div class="modal-section">
                <h4>Key Features</h4>
                <ul>\${details.features.map(f => \`<li>\${f}</li>\`).join('')}</ul>
              </div>
              
              <div class="modal-section">
                <h4>Architecture & Workflow</h4>
                <ul>\${details.architecture.map(a => \`<li>\${a}</li>\`).join('')}</ul>
              </div>
            </div>
            
            <div>
              <div class="modal-media" style="margin-bottom: 2rem;">
                <img src="\${details.image}" alt="\${title} Screenshot" onerror="this.style.display='none'">
              </div>
              
              <div class="modal-section">
                <h4>Challenges Solved</h4>
                <p>\${details.challenges}</p>
              </div>
              
              <div class="modal-section">
                <h4>My Contributions</h4>
                <p>\${details.contributions}</p>
              </div>
            </div>
          </div>
        \`;
      } else {
        const desc = card.querySelector('.project-desc').innerHTML;
        modalBody.innerHTML = \`<p>\${desc}</p><div class="project-stack">\${stack}</div>\`;
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

