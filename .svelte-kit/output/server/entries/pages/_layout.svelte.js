import { c as create_ssr_component, s as subscribe, b as add_attribute } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let navOpen = false;
  let navEl;
  $$unsubscribe_page();
  return ` <nav class="navbar"${add_attribute("this", navEl, 0)}><div class="nav-container"><a href="/" class="nav-logo" aria-label="Grayson McClead — Home" data-svelte-h="svelte-1jksg6a"><span class="logo-bracket">&lt;</span><span class="logo-name">grayson.dev</span><span class="logo-bracket">/&gt;</span></a> <div class="${["nav-menu", ""].join(" ").trim()}" id="navMenu" role="navigation" aria-label="Main navigation"><a href="/" class="${["nav-link", $page.url.pathname === "/" ? "active" : ""].join(" ").trim()}"${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)}>About</a> <a href="/blog" class="${["nav-link", $page.url.pathname.startsWith("/blog") ? "active" : ""].join(" ").trim()}"${add_attribute(
    "aria-current",
    $page.url.pathname.startsWith("/blog") ? "page" : void 0,
    0
  )}>Blog</a> <a href="/contact" class="${["nav-link", $page.url.pathname === "/contact" ? "active" : ""].join(" ").trim()}"${add_attribute("aria-current", $page.url.pathname === "/contact" ? "page" : void 0, 0)}>Contact</a></div> <button class="${["nav-toggle", ""].join(" ").trim()}" aria-label="Toggle navigation menu"${add_attribute("aria-expanded", String(navOpen), 0)} aria-controls="navMenu"><span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span></button></div></nav> ${slots.default ? slots.default({}) : ``} <footer class="footer" data-svelte-h="svelte-wid1ib"><div class="footer-inner"><p class="footer-text">© 2026 Grayson McClead. Crafted with care and a lot of coffee.</p> <nav class="footer-links" aria-label="Footer"><a href="/">Blog</a> <a href="/about">About</a> <a href="/contact">Contact</a></nav></div></footer>`;
});
export {
  Layout as default
};
