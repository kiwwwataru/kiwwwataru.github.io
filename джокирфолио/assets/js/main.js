/**
 * jokerfolio — PORTFOLIO SCRIPT
 * Обработка анимации иконок стека, плавной навигации, фильтрации проектов и скачивания резюме.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
  initHorizontalNavigation();
  initOrbitQuickJump();
  initPortfolioFilters();

});

/* ==========================================================================
   1. HERO FLYOUT ANIMATION (ВЫЛЕТ ЛОГОТИПОВ ИЗ-ЗА КУПОЛА)
   ========================================================================== */
function initHeroAnimation() {
  const badges = document.querySelectorAll('.orbit-badge-figma');

  // Плавный вылет иконок технологий при загрузке
  setTimeout(() => {
    badges.forEach((badge, idx) => {
      setTimeout(() => {
        badge.classList.add('is-visible');
      }, idx * 110);
    });

    // Запуск легкого покачивания после завершения вылета
    setTimeout(() => {
      badges.forEach((badge) => badge.classList.add('is-floating'));
    }, 1100);
  }, 200);
}

/* ==========================================================================
   2. ГОРИЗОНТАЛЬНАЯ НАВИГАЦИЯ & SCROLLSPY
   ========================================================================== */
function initHorizontalNavigation() {
  const navLinks = document.querySelectorAll('.nav-pill-btn');
  const sections = document.querySelectorAll('section[id]');

  // ScrollSpy — подсветка активного пункта меню
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Плавная прокрутка к целевому разделу
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   3. КЛИК ПО ИКОНКЕ СТЕКА В HERO ДЛЯ ПЕРЕХОДА К КАРТОЧКЕ
   ========================================================================== */
function initOrbitQuickJump() {
  const orbitBadges = document.querySelectorAll('.orbit-badge-figma');
  orbitBadges.forEach((badge) => {
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      const tech = badge.getAttribute('data-tech');
      const targetCard = document.getElementById(`card-${tech}`);
      if (targetCard) {
        const targetY = targetCard.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
        targetCard.style.borderColor = '#FD853A';
        targetCard.style.boxShadow = '0 0 30px rgba(253, 133, 58, 0.4)';
        setTimeout(() => {
          targetCard.style.borderColor = '';
          targetCard.style.boxShadow = '';
        }, 1400);
      }
    });
  });
}

/* ==========================================================================
   4. ФИЛЬТРАЦИЯ ПРОЕКТОВ ПО КАТЕГОРИЯМ
   ========================================================================== */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.portfolio-card-figma');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.textContent.trim().toLowerCase();

      projectCards.forEach((card) => {
        if (filterValue === 'все' || filterValue === 'all') {
          card.style.display = 'flex';
          card.style.opacity = '1';
          return;
        }

        const tags = Array.from(card.querySelectorAll('.portfolio-tag'))
          .map((t) => t.textContent.trim().toLowerCase());

        let matched = false;
        if (filterValue === 'лендинги' || filterValue === 'landing page') {
          matched = tags.includes('canvas') || tags.includes('css grid') || tags.includes('html5');
        } else if (filterValue === 'spa') {
          matched = tags.includes('react') || tags.includes('typescript');
        } else {
          matched = tags.some((t) => t.includes(filterValue));
        }

        if (matched) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

    });
  });
}
}

