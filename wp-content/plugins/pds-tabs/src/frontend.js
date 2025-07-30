// build/frontend.js

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.gutenberghub-tabs-container');

  containers.forEach(container => {
    const buttons  = container.querySelectorAll('.wp-block-ghub-tab-button');
    const contents = container.querySelectorAll('.wp-block-ghub-tab-content');

    if (!buttons.length || !contents.length) {
      console.warn('PDS Tabs: missing buttons or contents', container);
      return;
    }

    const activation   = container.dataset.activation === 'true';
    const duration     = Number(container.dataset.autoSlideDuration) || 5000;
    const pauseOnHover = container.dataset.pauseHover === 'true';

    let current     = 0;
    let isPaused    = false;
    let timer;
    let touchStartX = 0;
    const threshold = 50; // Minimum swipe distance in px

    const activateTab = idx => {
      buttons.forEach(b => b.classList.remove('gutenberghub-active-tab'));
      contents.forEach(c => {
        c.classList.remove('gutenberghub-active-tab', 'slide-in');
        void c.offsetWidth;
      });
      buttons[idx].classList.add('gutenberghub-active-tab');
      contents[idx].classList.add('gutenberghub-active-tab');
      requestAnimationFrame(() => contents[idx].classList.add('slide-in'));
      current = idx;
    };

    const nextTab = () => {
      if (isPaused) return;
      activateTab((current + 1) % buttons.length);
    };

    const prevTab = () => {
      if (isPaused) return;
      activateTab((current - 1 + buttons.length) % buttons.length);
    };

    const startAuto = () => {
      if (!activation) return;
      clearInterval(timer);
      timer = setInterval(nextTab, duration);
    };

    const stopAuto = () => clearInterval(timer);

    // Button click resets auto
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        activateTab(idx);
        if (activation) startAuto();
      });
    });

    // Pause on hover
    if (activation && pauseOnHover) {
      container.addEventListener('mouseenter', () => { isPaused = true; });
      container.addEventListener('mouseleave', () => { isPaused = false; });
    }

    // Touch events for swipe
    container.addEventListener('touchstart', e => {
      isPaused = true;
      touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > threshold) {
        if (diffX < 0) {
          nextTab();
        } else {
          prevTab();
        }
      }
      isPaused = false;
      if (activation) startAuto();
    });

    // Initial activation and auto-start
    activateTab(current);
    if (activation) startAuto();
  });
});
