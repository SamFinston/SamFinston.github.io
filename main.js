"use strict";

window.onload = init;

let offset;
let header;
let icon;
let dropDownItems;
let dropdownOpen = false

function init() {
    let content = document.querySelector(".navButton");
    offset = content.offsetTop;
    header = document.querySelector("header");

    icon = document.querySelector("#mobileIcon");
    dropDownItems = document.querySelector("#dropdown_items")
    document.querySelector("#hamburger").addEventListener("click", toggleDropdown);

    window.onscroll = toggleHeader;

    let navItems = document.querySelector("#dropdown_items").childNodes
    for(const link of navItems) {
        link.addEventListener("click", closeDropdown);
    }
}

function toggleHeader() {
    if (window.pageYOffset > offset) {
        header.classList.remove('fadeOut');
        header.classList.remove('inactive');
        header.classList.add('fadeIn');
    } else {
        header.classList.remove('fadeIn');
        header.classList.add('fadeOut');
        header.classList.add('inactive');
        if (dropdownOpen) closeDropdown()
    }
}

function toggleDropdown() {
    if (dropdownOpen) closeDropdown()
    else openDropdown()
}

function openDropdown() {
    dropdownOpen = true;

    header.classList.add('dropdown');

    dropDownItems.classList.remove('mobile_nav_inactive')
    dropDownItems.classList.add('mobile_nav_active')

    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
}

function closeDropdown() {
    dropdownOpen = false;

    header.classList.remove('dropdown');

    dropDownItems.classList.remove('mobile_nav_active')
    dropDownItems.classList.add('mobile_nav_inactive')

    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}
