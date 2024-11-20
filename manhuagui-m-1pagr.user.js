// ==UserScript==
// @name         Manhuagui Mobile 1Pager
// @version      1.0.0
// @description  Manhuagui Mobile 1Pager
// @author       Yu-Jen Lin
// @match        https://m.manhuagui.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
(function () {
  'use strict';

  const head = document.getElementsByTagName('head')[0];
  const exGlobalStyle = document.createElement('style');
  const M = [
    // Ensure the manga image fits the full viewport height
    [
      [
        "#manga > img",
      ], c => `${c}{
          max-height: 100vh !important; /* Fit within viewport height */
          max-width: 100vw !important;  /* Fit within viewport width */
          height: auto !important;      /* Maintain aspect ratio */
          width: auto !important;       /* Maintain aspect ratio */
          margin: auto;                 /* Center horizontally */
          display: block;               /* Ensure the image behaves as a block element */
          position: absolute;           /* Position the image absolutely */
          top: 50%;                     /* Move the top edge to the middle */
          left: 50%;                    /* Move the left edge to the middle */
          transform: translate(-50%, -50%); /* Offset by half its width and height to center it */
      }`
    ],
    // Center align the manga container
    [
      [
        "#manga",
      ], c => `${c}{text-align: center}`
    ],
    // Default hidden state for header, navigation, main-bar, action-list, and footer
    [
      [
        "header",
        ".main-nav",
        ".main-bar",
        "footer",
        ".action-list"
      ], c => `${c}{
          position: absolute;
          left: 0;
          right: 0;
          visibility: hidden;
          opacity: 0;
          pointer-events: none; /* Prevent interaction when hidden */
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 9999;
      }`
    ],
    // Position header and stack elements below it
    [
      [
        "header"
      ], c => `${c}{top: 0;}`
    ],
    [
      [
        ".main-nav"
      ], c => `${c}{top: 42px; /* Positioned below header */}`
    ],
    [
      [
        ".main-bar"
      ], c => `${c}{top: 74px; /* Positioned below navigation */}`
    ],
    // Position footer at the bottom
    [
      [
        "footer"
      ], c => `${c}{bottom: 0;}`
    ],
    // Position action-list directly above the footer
    [
      [
        ".action-list"
      ], c => `${c}{bottom: 40px; /* Positioned directly above footer */}`
    ]
  ];

  exGlobalStyle.type = 'text/css';
  exGlobalStyle.innerHTML = M.map(p => p[0].map(p[1]).join("\n")).join("\n");
  head.appendChild(exGlobalStyle);

  // Add hover zones
  const body = document.body;

  const topZone = document.createElement('div');
  topZone.className = 'hover-zone-top';
  topZone.style.position = 'absolute';
  topZone.style.left = '0';
  topZone.style.right = '0';
  topZone.style.top = '0';
  topZone.style.height = '112px';
  topZone.style.zIndex = '10000';
  topZone.style.pointerEvents = 'auto';
  body.insertBefore(topZone, body.firstChild);

  const bottomZone = document.createElement('div');
  bottomZone.className = 'hover-zone-bottom';
  bottomZone.style.position = 'absolute';
  bottomZone.style.left = '0';
  bottomZone.style.right = '0';
  bottomZone.style.bottom = '0';
  bottomZone.style.height = '70px';
  bottomZone.style.zIndex = '10000';
  bottomZone.style.pointerEvents = 'auto';
  body.appendChild(bottomZone);

  // Helper function to show elements
  function showElements(elements) {
    elements.forEach(el => {
      el.style.visibility = 'visible';
      el.style.opacity = '1';
      el.style.zIndex = '10001';
      el.style.pointerEvents = 'auto';
    });
  }

  // Helper function to hide elements
  function hideElements(elements) {
    elements.forEach(el => {
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
      el.style.zIndex = '0';
      el.style.pointerEvents = 'none';
    });
  }

  // Get references to the elements
  const header = document.querySelector('header');
  const mainNav = document.querySelector('.main-nav');
  const mainBar = document.querySelector('.main-bar');
  const footer = document.querySelector('footer');
  const actionList = document.querySelector('.action-list');

  const topElements = [header, mainNav, mainBar].filter(Boolean);
  const bottomElements = [footer, actionList].filter(Boolean);

  // Add hover behavior to top zone
  topZone.addEventListener('mouseenter', () => showElements(topElements));
  topZone.addEventListener('mouseleave', () => hideElements(topElements));

  // Add hover behavior to bottom zone
  bottomZone.addEventListener('mouseenter', () => showElements(bottomElements));
  bottomZone.addEventListener('mouseleave', () => hideElements(bottomElements));

  // Add hover behavior to the elements themselves to keep them visible
  topElements.forEach(el => {
    el.addEventListener('mouseenter', () => showElements(topElements));
    el.addEventListener('mouseleave', () => hideElements(topElements));
  });
  bottomElements.forEach(el => {
    el.addEventListener('mouseenter', () => showElements(bottomElements));
    el.addEventListener('mouseleave', () => hideElements(bottomElements));
  });
})();