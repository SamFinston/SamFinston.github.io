"use strict";

// Project Carousel fields
let currentProgress;
let carousel;
let next;
let back;
let thumbnails;
let projects;

// Nav Bar fields
let offset;
let header;
let icon;
let headerActive = false;
let dropdownOpen = false;
let dropdown;

// Modal Fields
let fadeView;
let modalView;
let modalContent;

const init = () => {
    // Nav Bar init
    let content = document.querySelector("#navigation");
    offset = content.offsetTop;
    header = document.querySelector("header");

    icon = document.querySelector("#hamburger");
    icon.addEventListener("click", toggleDropdown);
    dropdown = document.querySelector("#top-nav-mobile");
    let dropDownLinks = document.querySelectorAll("#top-nav-mobile>a");
    for (let link of dropDownLinks) {
        link.addEventListener("click", closeDropdown);
    };
    document.querySelector("#initials").addEventListener("click", closeDropdown);

    window.onscroll = toggleHeader;

    // Projects init
    thumbnails = Array.from(document.querySelectorAll('.box'));
    for (let t of thumbnails) {
        t.addEventListener("click", openModal);
    }
    projects = [];
    fetchProjects();

    // Carousel init
    currentProgress = document.querySelector('#progress');
    carousel = document.querySelector('#carousel');
    carousel.scrollLeft = 0;
    next = document.querySelector('#next');
    back = document.querySelector('#back');

    carousel.addEventListener("scroll", function (e) {
        progress(e, carousel, currentProgress);
    });
    next.addEventListener("click", function (e) {
        scrollNext(e, carousel, 300);
    });
    back.addEventListener("click", function (e) {
        scrollPrevious(e, carousel, 300);
    });

    // Modal Init
    fadeView = document.querySelector('#fade');
    modalView = document.querySelector('#modal');
    modalContent = document.querySelector('#modal-content');
    fadeView.addEventListener("click", closeModal);
    document.querySelector('#exit').addEventListener("click", closeModal);
};

// Header Functions
const toggleHeader = () => {
    if (!headerActive && window.pageYOffset > offset) {
        header.classList.remove('inactive');
        header.style.opacity = '1';
        headerActive = true;
    } else if (headerActive && window.pageYOffset < offset) {
        header.classList.add('inactive');
        header.style.opacity = '0';
        if (dropdownOpen) closeDropdown()
        headerActive = false;
    }
};

const toggleDropdown = (e) => {
    if (dropdownOpen) closeDropdown(e);
    else openDropdown();
};

const openDropdown = () => {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    dropdown.style.top = '55px';
    dropdown.style.opacity = '1';
    dropdownOpen = true;
};

const closeDropdown = (e) => {
    if(e.target == modalView) return; // or exit button
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    dropdown.style.top = '-165px';
    dropdown.style.opacity = '0';
    dropdownOpen = false;
};

// Project Functions
const fetchProjects = () => {
    fetch("https://samfinston.github.io/projects.json")
        .then(response => {
            if (!response.ok) {
                console.log("failed to fetch project data");
                this.videoError = true;
                throw Error(`ERROR: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            for (let i = 0; i < thumbnails.length; i++) {
                thumbnails[i].src = json[i].thumbnail
                thumbnails[i].alt = json[i].name
                projects.push(json[i])
            }
        }).catch(function (error) {
            console.log(error);
        })
}

const openModal = (e) => {
    let index = thumbnails.indexOf(e.currentTarget);
    let project = projects[index];
    let viewModel = "";
    // if(project.video) {
    //     viewModel += `<iframe frameborder="0" allowfullscreen src="https://www.youtube-nocookie.com/embed/${project.video}"></iframe>`;
    // }
    if (project.name) {
        viewModel += `<h1>${project.name}</h1>`
    }
    if (project.description) {
        viewModel += `<p>${project.description}</p>`
    }
    if(project.links) {     
        for (const [key, value] of Object.entries(project.links)) {
            viewModel += `<a class="modal-link" target="blank" href="${value}">${key}</a>`;
        }
    }
    modalContent.innerHTML = viewModel;
    modalView.style.opacity = '1';
    fadeView.style.opacity = '1';
    modalView.scrollTop = 0;
    fadeView.classList.remove('inactive');
};

const closeModal = (e) => {
    if (e.target.closest('#modal') && !e.target.closest('#exit')) return;
    fadeView.style.opacity = '0';
    modalView.style.opacity = '0';
    let video = document.querySelector('iframe');
    if(video) video.src = null;
    fadeView.classList.add('inactive');
};

// Carousel Functions
const progress = (e, carousel, progress) => {
    let winScroll = carousel.scrollLeft;
    let width = carousel.scrollWidth - carousel.clientWidth;
    let scrolled = (winScroll / width) * 100;
    if (scrolled >= 100) scrolled = 99.99;
    progress.style.width = scrolled + "%";
};

const scrollNext = (e, carousel, amt) => {
    carousel.scrollBy({
        top: 0,
        left: amt,
        behaviour: 'smooth'
    })
}

const scrollPrevious = (e, carousel, amt) => {
    carousel.scrollBy({
        top: 0,
        left: -amt,
        behaviour: 'smooth'
    })
}

window.onload = init;
