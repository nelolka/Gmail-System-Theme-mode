// ==UserScript==
// @name         Gmail Automatic Dark Mode
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Switches Gmail dark mode on and off automatically according to the system theme
// @author       Ed Qweqwe
// @match        *://mail.google.com/*
// @icon         https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico
// @updateURL    https://github.com/nelolka/Gmail-System-Theme-mode/raw/refs/heads/main/script.user.js
// @downloadURL  https://github.com/nelolka/Gmail-System-Theme-mode/raw/refs/heads/main/script.user.js
// @homepageURL  https://github.com/nelolka/Gmail-System-Theme-mode
// @supportURL   https://github.com/nelolka/Gmail-System-Theme-mode/issues/
// @source       https://github.com/nelolka/Gmail-System-Theme-mode
// @run-at       document-start
// ==/UserScript==

(function () {

  let escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
    createHTML: (to_escape) => to_escape
  })
  const style = document.createElement("style");
  style.innerHTML = escapeHTMLPolicy.createHTML(`
      html {
      filter: invert(1) hue-rotate(180deg);
      }

      img, video {
      filter: invert(1) hue-rotate(180deg);
      }

      img, svg {
      filter: invert(1) hue-rotate(180deg) !important;
      }

      .qj, .aEe  {
      filter: invert(1) hue-rotate(180deg) !important;
      }

      ::selection {
        background:rgb(0, 0, 0) !important;
        color: rgb(255, 255, 255) !important;
      }
    `);
  document.head.appendChild(style);

  function applyTheme(e) {
    style.disabled = !e.matches;
  }
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(mq);

  mq.addEventListener("change", applyTheme);
})();
