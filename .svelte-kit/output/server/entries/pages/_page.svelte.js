import { c as create_ssr_component, a as each, e as escape } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1bb811q_START -->${$$result.title = `<title>Grayson McClead â€” Full Stack Developer</title>`, ""}<meta name="description" content="Full Stack Developer with 5+ years of experience building scalable web applications with React, Angular, and .NET, based in Austin, TX."><!-- HEAD_svelte-1bb811q_END -->`, ""} <main> <section class="about-hero" aria-labelledby="about-name" data-svelte-h="svelte-zbxk5u"><div class="container"><div class="about-hero-grid"> <div class="portrait-side"><div class="portrait-frame"><img src="/profile.jpg" alt="Grayson McClead" class="portrait-photo"> <div class="portrait-corner-tl" aria-hidden="true"></div> <div class="portrait-corner-bl" aria-hidden="true"></div></div> <div class="portrait-deco" aria-hidden="true"></div> <div class="portrait-deco-2" aria-hidden="true"></div></div>  <div class="bio-side"><div><span class="bio-greeting">Hello, I&#39;m</span> <h1 class="bio-name" id="about-name">Grayson McClead</h1> <p class="bio-role">Full Stack Developer</p></div> <div class="bio-description"><p>I&#39;m a full stack developer with 5+ years of experience building scalable web applications across the
              JavaScript and .NET ecosystems. I work across the entire stack â€” from Angular and React frontends to
              ASP.NET and Node.js backends â€” with a strong focus on performance, clean architecture, and shipping
              things that actually matter.</p> <p>Currently at Sports Business Journal, where I&#39;ve led full CMS migrations, modernized legacy systems,
              and managed large-scale React and Angular codebases. I deploy production APIs through Azure pipelines
              and build polished interfaces using Kendo UI.</p> <p>Based in Austin, TX. Previously at Epsilon and McKesson, where I sharpened my skills across healthcare
              connectivity platforms, SPAs, and multi-tenant applications. Always open to interesting problems and
              conversations.</p></div> <div class="bio-actions"><a href="/contact" class="btn btn-primary">Get In Touch</a> <a href="/blog" class="btn btn-outline">Read the Blog</a></div></div></div></div></section>  <div class="about-sections"><div class="container"> <section class="timeline-section" aria-labelledby="experience-heading" data-svelte-h="svelte-83gid8"><div class="section-header"><span class="section-label">Experience</span> <h2 class="section-title" id="experience-heading">Career Timeline</h2> <div class="section-divider" aria-hidden="true"></div></div> <div class="timeline" role="list"><div class="timeline-item" role="listitem"><div class="timeline-dot" aria-hidden="true"></div> <div class="timeline-period">2021 â€” Present</div> <h3 class="timeline-role">Full Stack Developer</h3> <p class="timeline-company">Sports Business Journal â€” Charlotte, NC</p> <p class="timeline-desc">Modernized legacy systems by implementing React and Angular, significantly improving performance and
              scalability. Led a full CMS migration that enhanced editorial workflows across the platform. Solely
              managed and maintained a large-scale React codebase, developed robust ASP.NET Web APIs deployed via
              Azure pipelines, and leveraged Kendo UI to build polished Angular interfaces. Conducted code reviews
              and technical candidate evaluations.</p></div> <div class="timeline-item" role="listitem"><div class="timeline-dot" aria-hidden="true"></div> <div class="timeline-period">2019 â€” 2021</div> <h3 class="timeline-role">Full Stack Developer</h3> <p class="timeline-company">Epsilon â€” TX</p> <p class="timeline-desc">Designed and developed SPAs using React and HTML5/CSS3 for web and mobile platforms. Built RESTful
              APIs with Node.js and managed data with SQL Server. Created backend services for a healthcare
              connectivity platform and led integration of database components using SQL stored procedures.</p></div> <div class="timeline-item" role="listitem"><div class="timeline-dot" aria-hidden="true"></div> <div class="timeline-period">2018 â€” 2019</div> <h3 class="timeline-role">Jr. Full Stack Developer</h3> <p class="timeline-company">McKesson â€” TX</p> <p class="timeline-desc">Developed and deployed Node.js Web APIs on load-balanced instances. Built responsive UIs with React
              and Bootstrap, integrated RESTful services with client-side JavaScript validation, and contributed to
              multi-tenant applications using MySQL. Assisted in building internal tools with Python and Express.js.</p></div></div></section>  <section class="tech-section" aria-labelledby="tech-heading"><div class="section-header" data-svelte-h="svelte-i4768m"><span class="section-label">Toolbelt</span> <h2 class="section-title" id="tech-heading">Tech Stack</h2> <div class="section-divider" aria-hidden="true"></div></div> <div class="tech-grid" role="list">${each(
    [
      { emoji: "ðŸŸ¨", name: "JavaScript" },
      { emoji: "âš¡", name: "TypeScript" },
      { emoji: "ðŸŸ£", name: "C#" },
      { emoji: "âš›ï¸", name: "React" },
      { emoji: "ðŸ”º", name: "Angular" },
      { emoji: "ðŸŸ¢", name: "Node.js" },
      { emoji: "ðŸ—ï¸", name: "ASP.NET" },
      { emoji: "ðŸ˜", name: "PostgreSQL" },
      { emoji: "ðŸ—„ï¸", name: "SQL Server" },
      { emoji: "â˜ï¸", name: "Azure" },
      { emoji: "ðŸŒ¿", name: "Git" },
      { emoji: "ðŸ", name: "Python" }
    ],
    (tech) => {
      return `<div class="tech-card" role="listitem"><div class="tech-emoji" aria-hidden="true">${escape(tech.emoji)}</div> <div class="tech-name">${escape(tech.name)}</div> </div>`;
    }
  )}</div></section></div></div></main>`;
});
export {
  Page as default
};
