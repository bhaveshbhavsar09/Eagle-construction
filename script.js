/* =========================================
   EAGLE CONSTRUCTION
   JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking a link */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =====================================
       HEADER ON SCROLL
    ===================================== */

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =====================================
       REVEAL ANIMATION
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================
       COUNTER ANIMATION
    ===================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.getAttribute("data-target"));

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 80));

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target;

                    return;

                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

        });

    }


    const statsSection =
        document.querySelector(".stats");

    const statsObserver = new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },
        {
            threshold: 0.3
        }
    );

    statsObserver.observe(statsSection);


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const serviceSelect =
        document.getElementById("service");

    document.querySelectorAll(".service-card a").forEach(link => {

        link.addEventListener("click", () => {

            serviceSelect.value =
                link.getAttribute("data-service") || "";

        });

    });

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value;


        if (!name || !phone || !message) {

            formMessage.textContent =
                "Please fill in all required fields.";

            return;

        }


        /*
            For a real website, connect this form
            to your backend, Formspree, PHP, Firebase,
            EmailJS, or another form service.
        */


        const whatsappMessage =
            `Hello Eagle Construction,%0A%0A` +
            `Name: ${encodeURIComponent(name)}%0A` +
            `Phone: ${encodeURIComponent(phone)}%0A` +
            `Project: ${encodeURIComponent(service)}%0A%0A` +
            `Requirements:%0A${encodeURIComponent(message)}`;


        const whatsappNumber =
            "919876543210";


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


        formMessage.textContent =
            "Thank you! Redirecting you to WhatsApp...";


        setTimeout(() => {

            window.open(
                whatsappURL,
                "_blank"
            );

            contactForm.reset();

        }, 1000);

    });


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const year =
        document.getElementById("year");

    year.textContent =
        new Date().getFullYear();

});
