/*!
* Start Bootstrap - Bare v5.0.2 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project



// gsap.to(".nameBox", { duration: 2.5, ease: "back.out(1.7)", x: 20, y: 180, position: 'absolute', top: 0, opacity: 1 });


gsap.set(".ball", { xPercent: -50, yPercent: -50 });

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.35;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

gsap.ticker.add(() => {

    // adjust speed for higher refresh monitors
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});


// 


gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
const sections = document.querySelectorAll(".page-content__section");
const marquees = document.querySelectorAll(".marquee div");
let marqueeText = "";

const updateMarqueeText = () => {
    [...marquees].forEach((marquee) => {
        marquee.classList.add("active");
        marquee.addEventListener("transitionend", () => {
            marquee.classList.remove("active");
            marquee.innerText = `${marqueeText} 😎 `.repeat(20);
        });
    });
};

const updateBgColor = (color) =>
    document.documentElement.style.setProperty("--color-background", color);

const setActiveSection = (section) => {
    marqueeText = section.querySelector("h2").textContent;
    [...sections].forEach((section) => section.classList.remove("active"));
    section.classList.add("active");
    !prefersReducedMotion.matches && updateBgColor(section.dataset.bgColor);
    updateMarqueeText();
};

if (!prefersReducedMotion.matches) {
    gsap.to(".marquee div", {
        scrollTrigger: {
            trigger: ".page-content",
            scrub: 0.25,
            start: "top bottom",
            end: "bottom top",
            ease: "power2"
        },
        xPercent: 50
    });
}

gsap.utils.toArray(".page-content__section h2").forEach((heading) => {
    ScrollTrigger.create({
        trigger: heading,
        start: "top center",
        end: "bottom 200px",
        toggleActions: "play reset play reset",
        ease: "power2",
        onEnter: () =>
            marqueeText !== heading.textContent &&
            setActiveSection(heading.parentElement),
        onEnterBack: () =>
            marqueeText !== heading.textContent &&
            setActiveSection(heading.parentElement)
    });
});

window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}


$(document).ready(function () {

    $(".filter-button").click(function () {
        var value = $(this).attr('data-filter');

        if (value == "all") {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else {
            //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
            //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');

        }
    });

    if ($(".filter-button").removeClass("active")) {
        $(this).removeClass("active");
    }
    $(this).addClass("active");

});