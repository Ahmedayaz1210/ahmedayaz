window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll(".nav .sidelist li a");
  const sections = document.querySelectorAll("section");

  document.querySelector("#btnNav").addEventListener("click", () => {
    nav.classList.toggle("sidebar--open");
    document.body.classList.toggle("no-scroll");
  });

  document.querySelector(".nav__overlay").addEventListener("click", () => {
    nav.classList.remove("sidebar--open");
    document.body.classList.remove("no-scroll");
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.currentTarget.getAttribute("href");
      scrollToSection(target);
      nav.classList.remove("sidebar--open");
      document.body.classList.remove("no-scroll");
      // Remove "active" class from all links
      links.forEach((link) => {
        link.classList.remove("active");
      });
      // Add "active" class to the clicked link
      link.classList.add("active");
    });
  });

  window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = `#${section.id}`;
      }
    });
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.currentTarget.getAttribute("href");
      scrollToSection(target);
    });
  });
});

function scrollToSection(target) {
  const section = document.querySelector(target);
  const offsetTop = section.offsetTop;
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
}

// side bar function end

