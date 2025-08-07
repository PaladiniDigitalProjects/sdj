document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.gutenberghub-tabs-container');

  containers.forEach(container => {
    const buttons = container.querySelectorAll('.wp-block-ghub-tab-button');
    const contents = container.querySelectorAll('.wp-block-ghub-tab-content');
    const buttonsContainer = container.querySelector('.wp-block-ghub-tab-buttons-container');
    if (!buttons.length || !contents.length || !buttonsContainer) return;

    const activation = container.dataset.activation === 'true';
    const duration = Number(container.dataset.autoSlideDuration) || 5000;
    const pauseOnHover = container.dataset.pauseHover === 'true';

    let current = 0;
    let isPaused = false;
    let timer;
    let touchStartX = 0;
    const threshold = 50;

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const activateTab = (newIdx, direction = 'right') => {
      if (newIdx === current) return;

      const outClass = direction === 'left' ? 'slide-out-right' : 'slide-out-left';
      const inClass = direction === 'left' ? 'slide-in-left' : 'slide-in-right';

      if (isMobile()) {
        buttonsContainer.classList.add(outClass);
        setTimeout(() => {
          buttonsContainer.classList.remove(outClass);
          current = newIdx;
        }, 400);
      } else {
        const oldPane = contents[current];
        const newPane = contents[newIdx];
        oldPane.classList.add(outClass);
        setTimeout(() => {
          oldPane.classList.remove(outClass, 'gutenberghub-active-tab');
          newPane.classList.add('gutenberghub-active-tab', inClass);
          current = newIdx;
        }, 400);
      }

      buttons.forEach(b => b.classList.remove('gutenberghub-active-tab'));
      buttons[newIdx].classList.add('gutenberghub-active-tab');
      buttons[newIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    };

    const nextTab = () => {
      if (!isPaused) activateTab((current + 1) % buttons.length, 'right');
    };

    const prevTab = () => {
      if (!isPaused) activateTab((current - 1 + buttons.length) % buttons.length, 'left');
    };

    const startAuto = () => {
      if (!activation) return;
      clearInterval(timer);
      timer = setInterval(nextTab, duration);
    };

    const stopAuto = () => clearInterval(timer);

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        activateTab(idx, idx > current ? 'right' : 'left');
        if (activation) startAuto();
      });
    });

    if (activation && pauseOnHover) {
      container.addEventListener('mouseenter', () => isPaused = true);
      container.addEventListener('mouseleave', () => isPaused = false);
    }

    container.addEventListener('touchstart', e => {
      isPaused = true;
      touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diffX) > threshold) {
        diffX < 0 ? nextTab() : prevTab();
      }
      isPaused = false;
      if (activation) startAuto();
    });
    // IntersectionObserver to handle autoplay only when in viewport
    if (activation) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isPaused = false;
            startAuto();
          } else {
            isPaused = true;
            stopAuto();
          }
        });
      }, {
        threshold: 0.5 // at least 50% of the container should be visible
      });

      observer.observe(container);
    }


    if (activation) startAuto();
  });
});
