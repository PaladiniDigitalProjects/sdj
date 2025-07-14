document.addEventListener('DOMContentLoaded', () => {
	const containers = document.querySelectorAll('[data-block="gutenberghub-tabs/tab-container"]');

	containers.forEach(container => {
		const buttons  = container.querySelectorAll('[data-block="gutenberghub-tabs/tab-button"]');
		const contents = container.querySelectorAll('[data-block="gutenberghub-tabs/tab-content"]');

		if (!buttons.length || !contents.length) return;

		const duration      = parseInt(container.dataset.autoDuration, 10) || 5000;
		const pauseOnHover  = container.dataset.pauseHover === 'true';

		let current   = 0;
		let isPaused  = false;
		let timer;

		const activate = idx => {
			buttons.forEach(b => b.classList.remove('is-active'));
			contents.forEach(c => c.classList.remove('is-active', 'slide-in'));

			buttons[idx].classList.add('is-active');
			contents[idx].classList.add('is-active', 'slide-in');
			current = idx;
		};

		const next = () => {
			if (isPaused) return;
			const nextIndex = (current + 1) % buttons.length;
			activate(nextIndex);
		};

		const startAuto = () => { timer = setInterval(next, duration); };
		const stopAuto  = () => { clearInterval(timer); };

		buttons.forEach((btn, idx) => {
			btn.addEventListener('click', () => {
				activate(idx);
				stopAuto();
				startAuto();
			});
		});

		if (pauseOnHover) {
			container.addEventListener('mouseenter', () => { isPaused = true; });
			container.addEventListener('mouseleave', () => { isPaused = false; });
		}

		// Kick off
		activate(current);
		startAuto();
	});
});
