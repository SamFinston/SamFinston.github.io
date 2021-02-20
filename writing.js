"use strict";

let header;
let icon;
let headerActive = false;
let dropdownOpen = false;
let dropdown;

const init = () => {
    // Nav Bar init
    let content = document.querySelector("#navigation");
    header = document.querySelector("header");

    icon = document.querySelector("#hamburger");
    icon.addEventListener("click", toggleDropdown);
    dropdown = document.querySelector("#top-nav-mobile");
    let dropDownLinks = document.querySelectorAll("#top-nav-mobile>a");
    for (let link of dropDownLinks) {
        link.addEventListener("click", closeDropdown);
    };
    document.querySelector("#initials").addEventListener("click", closeDropdown);
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
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    dropdown.style.top = '-165px';
    dropdown.style.opacity = '0';
    dropdownOpen = false;
};

window.onload = init;
