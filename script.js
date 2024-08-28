// // //
"use strict";

// Modal window✅✅✅
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault(); // example: ektu nich theke nav bar er "open accounts" e click korlam eta by default upore jump korbe karon ete "a" tag use korchi so eta k thik korar jonno e.preventDefault() method/function use korte hobe

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

// easiar way(forEach)
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
// ⛔️⛔️⛔️

// Smooth Scrolling✅✅✅
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" }); // scrollIntoView method/function
});
// ⛔️⛔️⛔️

// Event Delegation-- Page Navigation✅✅✅
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // ekhane nav__links class holo common
  // console.log(e.target);
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    // console.log("link");
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
// ⛔️⛔️⛔️

// Building the Tab Component✅✅✅
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Bad practice
// tabs.forEach((t) => t.addEventListener("click", () => console.log("meow")));

// Good practice for DRY(common parent k dhora)
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  // ignore any clicks where the result is null
  if (!clicked) return; // guard clause(immediately finish this function)

  // Remove active classes for both tab and content area
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Active Tab
  clicked.classList.add("operations__tab--active");

  // Active content area
  // console.log(clicked.dataset.tab); // tab refers to the data-tab attribute. dataset is used to access the custom data attributes like data-tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
// ⛔️⛔️⛔️

// Passing arguments to event handler-- menu fade animation✅✅✅
const nav = document.querySelector(".nav");

// The opposite of mouseenter is mouseleave, and the opposite of the mouseover is mouseout

// For DRY we use handleHover function
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  // console.log(this);

  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this; // condition holo emon j jeta te click korbo seta bade baki der jonno
    });
    logo.style.opacity = this;
  }
};

// sexy way🤩🤩
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// ⛔️⛔️⛔️

// Intersection observer API✅✅✅
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  // console.log(entries);
  const [entry] = entries; // destructuring
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // when 0% of the header is visible, then we want something to happen
  // rootMargin: "-90px", // Shrinks the viewport by 90 pixels on all sides, making it effectively smaller, mind that nav bar er height kintu 90px
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// ⛔️⛔️⛔️

// Reveal sections✅✅✅
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target); // unobserve method/function stops tracking an element’s visibility
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
// ⛔️⛔️⛔️

// Lazy loading images✅✅✅
// It's for performance
const imgTargets = document.querySelectorAll("img[data-src]"); // img[data-src] selects all <img> elements that have a data-src attribute
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    // The load event triggers when the targeted element (like an image or script) has fully loaded. “Fully loaded” means that the entire content of the element (like an image, script, or document) has been completely downloaded and is ready to be used or displayed
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // exactly 200px before any of the images is loaded(before we reach them). if an image is positioned at 1200px, the observer will detect it and trigger loading when the viewport is at 1000px (200px before the image is actually visible)
});

imgTargets.forEach((img) => imgObserver.observe(img));
// ⛔️⛔️⛔️

// Slider Component✅✅✅
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector(".dots");

  // const slider = document.querySelector(".slider");
  // slider.style.transform = "scale(0.4) translateX(-800px)";
  // slider.style.overflow = "visible";

  // Functions
  // 0%, 100%, 200%, 300%.....
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  const goToSlide = function (slide) {
    // for DRY
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`) // easy just think the logic
    );
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // go to the next-slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    // -100%, 0%, 100%, 200%.....
    goToSlide(curSlide);

    activateDot(curSlide);
  };

  // go th the previous-slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    // .....-200%, -100%, 0%, 100%
    goToSlide(curSlide);

    activateDot(curSlide);
  };

  // init for understanding the situation
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Button event
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // Keyboard event
  document.addEventListener("keydown", function (e) {
    // console.log(e);

    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  // Fot Dots

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // console.log("hehehe");

      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset; // better(destructuring)
      // console.log(slide);

      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider(); // sobgulo k tader own fucntion er moddhe rakha good practice
// ⛔️⛔️⛔️
