import { gsap } from 'gsap';
import { ScrollTrigger }  from 'gsap/ScrollTrigger';
import luge from '@waaark/luge';
import './animacions.js';

gsap.registerPlugin(ScrollTrigger);
window.luge = luge;

// Disable transitions for same-page hash navigation
luge.emitter.on('beforePageFetch', (data) => {
  const hash = window.location.hash;
  if (hash && data.url === window.location.pathname) {
    data.options = data.options || {};
    data.options.transition = false;
  }
});

document.addEventListener("DOMContentLoaded", function () {

  // 🔹 PAGE SETUP + TRANSITIONS
  const bodyTag = document.querySelector("body");
  if (bodyTag) {
    bodyTag.setAttribute("data-transition-wrapper", "true");
    bodyTag.setAttribute("data-lg-page", "home");
  }
  const menuTemplate = document.querySelector(".page-template-menu");
  if (menuTemplate) {
    menuTemplate.setAttribute("data-lg-page", "menu");
  }

  luge.transition.add("in", "default", (page, done) => {
    gsap.from(page, {
      opacity: 0.8,
      backgroundColor: '#fff',
      ease: "power1.in",
      duration: 0.3,
      onComplete: done
    });
  });
  luge.transition.add("out", "default", (page, done) => {
    gsap.to(page, {
      opacity: 0,
      ease: "power1.out",
      backgroundColor: '#fff',
      duration: 0.5,
      onComplete: done
    });
  });

  // 🔹 HOME + MENU TRANSITIONS
  luge.transition.add("out", "home", (page, done) => {
    gsap.to(page, {
      backgroundColor: '#fff',
      opacity: 0,
      ease: "power1.out",
      duration: 0.5,
      onComplete: done
    });
  });
  luge.transition.add("in", "home", (page, done) => {
    gsap.from(page, {
      backgroundColor: '#fff',
      opacity: 0,
      ease: "power1.in",
      duration: 0.5,
      onComplete: done
    });
  });
  luge.transition.add("in", "menu", (page, done) => {
    gsap.from(page, {
      backgroundColor: '#fff',
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
      onComplete: done
    });
  });
  luge.transition.add("out", "menu", (page, done) => {
    gsap.to(page, {
      ease: "power1.out",
      opacity: 0,
      backgroundColor: '#fff',
      duration: 0.5,
      onComplete: done
    });
  });

  // 🔹 REVEAL CONFIG
  const revealConfig = {
    tlsReveal: { x: "-140vw", duration: 1.5, ease: "power2.out" },
    tlsLeftReveal: { x: "140vw", duration: 1.3, ease: "power2.out" },
    tlsToTop: { y: "100vh", duration: 1, ease: "power2.in" },
    tlsScale: { scale: 1.1, duration: 0.7, ease: "power2.in" },
    tlsFade: { opacity: 0, duration: 2, ease: "power2.in" }
  };
  Object.keys(revealConfig).forEach((key) => {
    const element = document.querySelector(`[data-lg-reveal="${key}"]`);
    if (element) {
      luge.reveal.add("in", key, (el) => gsap.from(el, revealConfig[key]));
    }
  });
// ================================================================
// 🔹 FIRST-ONLY USER-SCROLL FOLDING ACCORDION (180deg arrow + fix on finish)
// ================================================================
function pdsInitScrollAccordion() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("[Accordion] GSAP or ScrollTrigger not found");
    return;
  }

  const wrapper = document.querySelector(".pds-scroll-accordion-wrapper");
  const items = gsap.utils.toArray(".pds-scroll-accordion-item");

  if (!wrapper || !items.length) return;

  const ARROW_DURATION = 0.3;
  let scrollTriggerInstance = null;
  let isScrollAnimating = false;

  const data = items.map(item => {
    const title = item.querySelector(".pds-scroll-accordion-title");
    const content = item.querySelector(".pds-scroll-accordion-content");
    const arrow = item.querySelector(".pds-scroll-arrow");
    const style = content ? getComputedStyle(content) : { paddingTop: "0px", paddingBottom: "0px" };
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;
    const titleH = title ? title.offsetHeight : 0;
    const contentH = content ? content.scrollHeight : 0;
    const fullH = titleH + contentH + paddingTop + paddingBottom;

    item._pds = { item, title, content, arrow, titleH, contentH, paddingTop, paddingBottom, fullH };
    return item._pds;
  });

  // Open all items initially
  data.forEach(d => {
    d.item.style.height = d.fullH + "px";
    d.item.classList.add("open");
    if (d.title) {
      d.title.setAttribute("tabindex", "0");
      d.title.setAttribute("role", "button");
      d.title.setAttribute("aria-expanded", "true");
    }
    if (d.arrow) gsap.set(d.arrow, { rotation: 180, transformOrigin: "50% 50%" });
  });

  // Build a single timeline with proportionally scaled durations
  const totalContentHeight = data.reduce((sum, d) => sum + d.contentH, 0);
  const tl = gsap.timeline({ paused: true });

  let cumulativeProgress = 0;
  data.forEach(d => {
    const step = d.contentH / totalContentHeight;

    tl.to(d.content, { height: 0, paddingTop: 0, paddingBottom: 0, ease: "power1.inOut" }, cumulativeProgress);
    tl.to(d.item, { height: d.titleH, ease: "power1.inOut" }, cumulativeProgress);
    if (d.arrow) tl.to(d.arrow, { rotation: 0, ease: "power1.inOut", transformOrigin: "50% 50%" }, cumulativeProgress);

    tl.add(() => {
      d.item.classList.remove("open");
      if (d.title) d.title.setAttribute("aria-expanded", "false");
    }, cumulativeProgress);

    cumulativeProgress += step;
  });

  // ScrollTrigger linked to timeline
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: wrapper,
    pin: true,
    pinSpacer: true,
    start: "top top",
    end: () => "+=" + wrapper.scrollHeight,
    scrub: true,
    animation: tl,
    onUpdate: (self) => {
      isScrollAnimating = self.progress > 0 && self.progress < 1;
    },
    onLeave: () => {
      isScrollAnimating = false;
    },
    onEnterBack: () => {
      isScrollAnimating = true;
    }
  });

  // Enable click toggle - but prevent during scroll animation
  data.forEach(d => {
    const handler = () => {
      // CRITICAL FIX: Don't allow manual toggling during scroll animation
      if (isScrollAnimating) {
        return;
      }

      const isOpen = d.item.classList.contains("open");
      
      // Kill any ongoing animations on this element before starting new ones
      gsap.killTweensOf([d.content, d.item, d.arrow]);

      if (isOpen) {
        gsap.to(d.content, { height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.3, ease: "power1.inOut", overwrite: "auto" });
        gsap.to(d.item, { height: d.titleH, duration: 0.3, ease: "power1.inOut", overwrite: "auto" });
        if (d.arrow) gsap.to(d.arrow, { rotation: 0, duration: ARROW_DURATION, ease: "power1.inOut", overwrite: "auto" });
        d.item.classList.remove("open");
        d.title.setAttribute("aria-expanded", "false");
      } else {
        gsap.to(d.content, { height: d.contentH, paddingTop: d.paddingTop, paddingBottom: d.paddingBottom, duration: 0.3, ease: "power1.inOut", overwrite: "auto" });
        gsap.to(d.item, { height: d.fullH, duration: 0.3, ease: "power1.inOut", overwrite: "auto" });
        if (d.arrow) gsap.to(d.arrow, { rotation: 180, duration: ARROW_DURATION, ease: "power1.inOut", overwrite: "auto" });
        d.item.classList.add("open");
        d.title.setAttribute("aria-expanded", "true");
      }
    };

    d.title.addEventListener("click", handler);
    d.title.addEventListener("keydown", ev => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        handler(ev);
      }
    });
  });
}

window.addEventListener("load", pdsInitScrollAccordion);

  // ================================================================
  // 🔹 COUNTERS
  // ================================================================
  if (document.querySelector(".numberCount")) {
    gsap.utils.toArray(".numberCount").forEach(el => {
      const finalValue = parseInt(el.textContent.trim(), 10);
      el.textContent = "0"; 

      gsap.to(el, {
        textContent: finalValue,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true
        }
      });
    });
  }

  if (document.querySelector(".FloatCount")) {
    gsap.utils.toArray(".FloatCount").forEach(el => {
      let textVal = el.textContent.trim().replace(',', '.');
      const finalValue = parseFloat(textVal);
      el.textContent = "0.00"; 

      gsap.to(el, {
        textContent: finalValue,
        duration: 2,
        ease: "power1.out",
        modifiers: {
          textContent: value => parseFloat(value).toFixed(2)
        },
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true
        }
      });
    });
  }

  // ================================================================
  // 🔹 TEXT ANIMATIONS
  // ================================================================
  if (document.querySelector(".moveText")) {
    gsap.utils.toArray(".moveText").forEach(element => {
      gsap.to(element, {
        x: "0%",
        ease: "power1.in",
        scrollTrigger: {
          trigger: element,
          start: "top 96%",
          end: "top 65%",
          scrub: true
        }
      });
    });
  }

  if (document.querySelector(".moveTextFade")) {
    gsap.utils.toArray(".moveTextFade").forEach(element => {
      gsap.to(element, {
        x: "0%",
        opacity: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          end: "top 65%",
          scrub: true
        }
      });
    });
  }

  if (document.querySelector(".moveFade")) {
    gsap.utils.toArray(".moveFade").forEach(element => {
      gsap.to(element, {
        opacity: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "top 65%",
          scrub: true
        }
      });
    });
  }

  if (document.querySelector(".moveTextLeft")) {
    gsap.utils.toArray(".moveTextLeft").forEach(element => {
      gsap.to(element, {
        x: "0%",
        ease: "power1.in",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 70%",
          scrub: true
        }
      });
    });
  }

});
