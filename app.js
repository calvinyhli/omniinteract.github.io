/* Content lives in site-config.js; this file renders it and manages interaction. */
'use strict';
const config = window.OMNIINTERACT_CONFIG;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
};
function rich(node, text = '') {
  String(text).split(/(\*\*[^*]+\*\*)/g).forEach(part => {
    node.append(part.startsWith('**') && part.endsWith('**') ? el('strong', '', part.slice(2, -2)) : document.createTextNode(part));
  });
  return node;
}
function safeURL(value) {
  if (!value || typeof value !== 'string') return '';
  try { return ['http:', 'https:', 'file:'].includes(new URL(value, document.baseURI).protocol) ? value : ''; }
  catch { return ''; }
}
const resourceNames = {paper: 'Paper', arxiv: 'ArXiv', code: 'Code'};
function resourceIcon(name) {
  if (name === 'arxiv') { const icon = el('span', 'arxiv-icon', 'arXiv'); icon.setAttribute('aria-hidden', 'true'); return icon; }
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  icon.setAttribute('aria-hidden', 'true'); icon.classList.add(name === 'paper' ? 'paper-icon' : 'github-icon');
  icon.setAttribute('viewBox', name === 'paper' ? '0 0 384 512' : '0 0 16 16');
  path.setAttribute('d', name === 'paper'
    ? 'M369.9 97.9 286 14C277 5 264.8 0 252.1 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34ZM256 51.8l80.1 80.2H256V51.8ZM336 464H48V48h160v96c0 17.7 14.3 32 32 32h96v288Z'
    : 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z');
  icon.append(path); return icon;
}
function resourceLinks(container, prefix) {
  for (const name of ['paper', 'arxiv', 'code']) {
    const url = safeURL(config.resources[name]);
    const link = el('a', `resource-button${name === 'paper' ? ' primary' : ''}`);
    link.id = `${prefix}-${name}`;
    link.append(resourceIcon(name), el('span', '', resourceNames[name]));
    if (url) {link.href = url;link.target = '_blank';link.rel = 'noopener';}
    else {link.setAttribute('role', 'link');link.setAttribute('aria-disabled', 'true');link.setAttribute('aria-label', `${resourceNames[name]} (Coming soon)`);link.title = `${resourceNames[name]} (Coming soon)`;}
    container.append(link);
  }
}
function pendingResources() {
  const missing = ['arxiv', 'code'].filter(name => !safeURL(config.resources[name])).map(name => resourceNames[name]);
  return missing.length ? `${missing.join(' and ')} coming soon.` : '';
}
function heroActions(container) {
  const method = el('a', 'resource-button primary', 'Method Overview');method.id = 'hero-method';method.href = '#method';
  const arrow = el('span', '', '↓');arrow.setAttribute('aria-hidden', 'true');method.append(arrow);
  method.addEventListener('click', () => document.getElementById('method-framework-tab')?.click());container.append(method);
  for (const name of ['arxiv', 'code']) {
    const url = safeURL(config.resources[name]);
    const label = name === 'arxiv' ? 'Arxiv' : url ? 'Code' : 'Code (coming soon)';
    const link = el('a', 'resource-button', label);link.id = `hero-${name}`;
    if (name === 'code') link.prepend(resourceIcon('code'));
    if (url) {link.href = url;link.target = '_blank';link.rel = 'noopener';}
    else {link.setAttribute('role', 'link');link.setAttribute('aria-disabled', 'true');link.tabIndex = 0;link.title = `${resourceNames[name]} (Coming soon)`;link.setAttribute('aria-label', link.title);}
    container.append(link);
  }
}
function configureVideo(video, media, auto = true) {
  const source = el('source'); source.src = safeURL(media.src); video.replaceChildren(source);
  const poster = safeURL(media.poster); if (poster) video.poster = poster; else video.removeAttribute('poster');
  video.setAttribute('aria-label', media.alt || media.title || 'OmniInteract demonstration');
  video.playsInline = true; video.controls = true; video.preload = 'none';
  video.loop = auto; video.muted = auto; video.defaultMuted = auto;
  video.dataset.autoplay = String(auto);
}
const figureDialog = document.getElementById('figure-dialog');
const enlargedImage = document.getElementById('enlarged-figure');
const figureTitle = document.getElementById('figure-dialog-title');
function mediaNode(media, title, auto = true) {
  if (!media || !safeURL(media.src)) return el('div');
  if (media.type === 'video') {
    const wrap = el('div', 'video-frame'); const video = el('video', 'demo-video');
    configureVideo(video, media, auto); wrap.append(video);
    if (!media.caption) return wrap;
    const figure = el('figure', 'media-figure');figure.append(wrap, rich(el('figcaption'), media.caption));return figure;
  }
  const figure = el('figure', 'media-figure');
  const button = el('button', 'image-button'); button.type = 'button';button.setAttribute('aria-label', `Enlarge ${title || media.alt || 'figure'}`);
  const img = el('img'); img.src = safeURL(media.src);img.alt = media.alt || title || '';img.loading = 'lazy';
  if (media.width) img.width = media.width;if (media.height) img.height = media.height;
  const hint = el('span', 'zoom-hint', 'Enlarge');hint.append(el('span', '', '↗'));hint.setAttribute('aria-hidden', 'true');
  button.append(img, hint);
  button.addEventListener('click', () => {enlargedImage.src = safeURL(media.src);enlargedImage.alt = img.alt;figureTitle.textContent = title || media.alt || 'Figure';figureDialog.showModal();});
  figure.append(button); if (media.caption) figure.append(rich(el('figcaption'), media.caption));return figure;
}
function demoBanner(item) {
  const banner = el('div', 'demo-banner');
  const logoURL = safeURL(config.hero.logo);
  if (logoURL) {
    const brand = el('span', 'demo-banner-brand');const logo = el('img');
    logo.src = logoURL;logo.alt = config.project.name;logo.width = 2172;logo.height = 724;
    brand.append(logo);banner.append(brand);
  } else banner.append(el('span', 'demo-banner-brand-name', config.project.name));
  const copy = el('div', 'demo-banner-copy');
  copy.append(el('span', 'demo-banner-title', item.title));
  if (item.banner?.description) copy.append(el('span', 'demo-banner-description', item.banner.description));
  banner.append(copy);
  if (item.banner?.label) banner.append(el('span', 'demo-banner-label', item.banner.label));
  return banner;
}
function heading(section, shell, solo = false) {
  const head = el('div', `section-heading${solo ? ' solo' : ''}`);
  const h2 = el('h2', '', section.title);h2.id = `${section.id}-title`;head.append(h2);
  if (section.description) head.append(rich(el('p'), section.description));shell.append(head);
}
function topLine(section, shell) {
  const row = el('div', 'section-topline');row.append(el('span', 'section-kicker', section.kicker));
  const context = {overview:'Research overview',gallery:'Physical hardware',feature:'Physical hardware · case study',method:'Retargeting & policy learning',comparison:'Qualitative comparison',results:'Simulation experiments',resources:'Paper & implementation'};
  row.append(el('span', 'section-context', context[section.type] || ''));shell.append(row);
}
function tabs(id, items, label, render, shell) {
  const list = el('div', 'tab-list'); list.setAttribute('role', 'tablist');list.setAttribute('aria-label', label);
  const panels = el('div', 'tab-panels'); const buttons = [];const panelNodes = [];
  const activate = (index, focus = false) => {
    buttons.forEach((button, n) => {button.setAttribute('aria-selected', String(n === index));button.tabIndex = n === index ? 0 : -1;panelNodes[n].hidden = n !== index;if (n !== index) panelNodes[n].querySelectorAll('video').forEach(v => v.pause());});
    if (focus) {buttons[index].focus();buttons[index].scrollIntoView({block:'nearest',inline:'nearest'});}
  };
  items.forEach((item, index) => {
    const token = `${id}-${item.id || index}`;
    const button = el('button', 'tab-button');button.type = 'button';button.id = `${token}-tab`;button.setAttribute('role', 'tab');button.setAttribute('aria-controls', `${token}-panel`);
    button.append(el('span', 'tab-index', `${String(index + 1).padStart(2, '0')} / ${item.category || (id === 'method' ? 'Method' : 'Interaction')}`),el('span', 'tab-label', item.label || item.title));
    const panel = el('div', 'tab-panel');panel.id = `${token}-panel`;panel.setAttribute('role', 'tabpanel');panel.setAttribute('aria-labelledby', button.id);panel.tabIndex = 0;
    render(item, panel, index, items.length);buttons.push(button);panelNodes.push(panel);list.append(button);panels.append(panel);
    button.addEventListener('click', () => activate(index));
    button.addEventListener('keydown', event => {
      let next;if (event.key === 'ArrowRight') next = (index + 1) % items.length;else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;else if (event.key === 'Home') next = 0;else if (event.key === 'End') next = items.length - 1;
      if (next !== undefined) {event.preventDefault();activate(next, true);}
    });
  });
  shell.append(list, panels);if (items.length) activate(0);
}
const renderers = {
  overview(s, shell) {
    const layout = el('div', 'overview-columns');
    const abstract = el('div', 'abstract');const title = el('h2', '', s.title || 'Abstract');title.id = `${s.id}-title`;abstract.append(title);
    const copy = el('div', 'abstract-copy');copy.tabIndex = 0;copy.setAttribute('role', 'region');copy.setAttribute('aria-labelledby', title.id);copy.setAttribute('aria-describedby', 'abstract-scroll-hint');
    for (const text of s.abstract || []) copy.append(rich(el('p'), text));abstract.append(copy);
    const hint = el('p', 'abstract-scroll-hint', 'Scroll to read the full abstract ↓');hint.id = 'abstract-scroll-hint';abstract.append(hint);
    const projectVideo = el('div', 'overview-project-video');projectVideo.append(el('h3', '', 'Project video'));
    const video = el('video');video.id = 'full-video';configureVideo(video, config.fullVideo, false);
    if (safeURL(config.fullVideo.captions)) {const track = el('track');track.kind = 'captions';track.src = safeURL(config.fullVideo.captions);track.srclang = config.fullVideo.captionLanguage || 'en';track.label = config.fullVideo.captionLabel || 'English';video.append(track);}
    const frame = el('div', 'video-frame full-video');frame.append(video);projectVideo.append(frame);
    const note = el('div', 'video-note');const link = el('a', 'text-link', 'Download video ↗');link.href = safeURL(config.fullVideo.src);link.download = config.fullVideo.downloadName || 'OmniInteract_Demo.mp4';note.append(link);projectVideo.append(note);
    layout.append(abstract, projectVideo);shell.append(layout);
  },
  gallery(s, shell) {
    heading(s, shell);
    const stories = el('div', 'demo-stories');
    s.items.filter(i => i.enabled !== false).forEach((item, i) => {
      const row = el('article', 'demo-story');row.id = `${s.id}-${item.id}`;
      const title = el('h3', '', item.title);title.id = `${row.id}-title`;row.setAttribute('aria-labelledby', title.id);
      const media = el('div', 'demo-story-media');media.append(mediaNode(item.media, item.title));
      if (item.media?.type === 'video' && item.banner !== false) media.querySelector('.video-frame')?.append(demoBanner(item));
      const copy = el('div', 'demo-story-copy');
      copy.append(el('p', 'demo-story-label', `${String(i + 1).padStart(2, '0')} / ${item.category || 'Physical demonstration'}`),title,rich(el('p'), item.description));
      if (item.note) copy.append(el('p', 'media-note', item.note));
      row.append(media, copy);stories.append(row);
    });
    shell.append(stories);
  },
  feature(s, shell) {
    const row = el('div', 'feature-layout');const copy = el('div', 'feature-copy');const title = el('h2', '', s.title);title.id = `${s.id}-title`;copy.append(title,rich(el('p'), s.description));
    if (s.note || s.media?.note) copy.append(el('p', 'feature-note', s.note || s.media?.note));row.append(copy,mediaNode(s.media, s.title));shell.append(row);
  },
  method(s, shell) {
    heading(s, shell);
    tabs(s.id, s.tabs.filter(i => i.enabled !== false), 'Explore the method', (item, panel) => {
      const head = el('div', 'method-panel-head');head.append(el('h3', '', item.title),rich(el('p'), item.description));panel.append(head);
      if (item.layout === 'policy-comparison') {
        const layout = el('div', 'policy-comparison-layout');
        const diagram = el('div', 'policy-diagram');(item.media || []).forEach(m => diagram.append(mediaNode(m, item.title)));
        const videos = el('div', 'policy-video-stack');
        for (const comparison of item.comparisons || []) {
          const card = el('div', `policy-video policy-video-${comparison.id}`);
          const title = el('h4', '', comparison.title);title.id = `${s.id}-${item.id}-${comparison.id}-title`;
          card.setAttribute('role', 'group');card.setAttribute('aria-labelledby', title.id);
          card.append(title, mediaNode(comparison.media, comparison.title));videos.append(card);
        }
        layout.append(diagram, videos);panel.append(layout);return;
      }
      const media = item.media || [];const grid = el('div', `media-grid${media.length > 1 ? ' multiple' : ''}`);media.forEach(m => grid.append(mediaNode(m, item.title)));panel.append(grid);
    }, shell);
  },
  comparison(s, shell) {heading(s, shell);shell.append(mediaNode(s.media, s.title));},
  results(s, shell) {
    heading(s, shell);const row = el('div', 'stats-row');
    for (const stat of s.stats || []) {const item = el('div', 'stat');item.append(el('span', 'stat-value', stat.value),el('span', 'stat-label', stat.label),el('span', 'stat-detail', stat.detail));row.append(item);}shell.append(row);
    const figure = el('div', 'results-figure');figure.append(mediaNode(s.media, s.title));shell.append(figure);
    const details = el('details', 'result-table-details');details.append(el('summary', '', 'View the reported simulation results'));
    const wrap = el('div', 'table-scroll');const table = el('table');table.append(el('caption', 'visually-hidden', 'Success rate in simulation across interaction repertoire sizes.'));
    const thead = el('thead');const tr = el('tr');for (const name of ['Interaction motions','OmniInteract','MLP distillation','From-scratch RL']) {const th = el('th', '', name);th.scope = 'col';tr.append(th);}thead.append(tr);table.append(thead);
    const tbody = el('tbody');for (const item of s.rows || []) {const tr = el('tr');for (const key of ['motions','omni','mlp','rl']) tr.append(el('td', '', `${item[key]}${key === 'motions' ? '' : '%'}`));tbody.append(tr);}table.append(tbody);wrap.append(table);details.append(wrap);shell.append(details);
  },
  resources(s, shell) {
    const title = el('h2', '', s.title);title.id = `${s.id}-title`;shell.append(title);
    if (s.bibtex) {
      const citation = el('div', 'citation');citation.id = 'citation';
      const block = el('div', 'citation-code-block');const pre = el('pre');pre.tabIndex = 0;pre.setAttribute('aria-label', 'Paper citation in BibTeX format');pre.append(el('code', '', s.bibtex));
      const copy = el('button', 'citation-copy');copy.type = 'button';copy.dataset.state = 'idle';copy.setAttribute('aria-label', 'Copy BibTeX');
      copy.innerHTML = '<svg class="citation-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><svg class="citation-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>';
      const tooltip = el('span', 'citation-copy-tooltip', 'Copy BibTeX');tooltip.setAttribute('aria-hidden', 'true');copy.append(tooltip);
      const status = el('p', 'visually-hidden');status.setAttribute('role', 'status');status.setAttribute('aria-live', 'polite');
      let reset;
      copy.addEventListener('click', async () => {
        clearTimeout(reset);
        try {await navigator.clipboard.writeText(s.bibtex);copy.dataset.state = 'copied';tooltip.textContent = 'Copied!';status.textContent = 'BibTeX copied.';}
        catch {copy.dataset.state = 'error';tooltip.textContent = 'Select the text to copy';status.textContent = 'Copy failed. Select the citation text to copy.';}
        reset = setTimeout(() => {copy.dataset.state = 'idle';tooltip.textContent = 'Copy BibTeX';status.textContent = '';}, 2000);
      });
      block.append(pre, copy);citation.append(block, status);shell.append(citation);
    }
  }
};
function renderProject() {
  const p = config.project;
  document.getElementById('project-name').textContent = p.name;
  document.getElementById('project-subtitle').textContent = p.subtitle.replace('Whole-Body', 'Whole-\u2060Body');
  for (const id of ['project-logo', 'nav-logo']) {const image = document.getElementById(id);image.src = safeURL(config.hero.logo);image.alt = p.name;}
  document.getElementById('hero-eyebrow').textContent = config.hero.eyebrow || '';
  document.getElementById('hero-description').textContent = config.hero.description || '';
  for (const author of p.authors) {const span = el('span', 'author', author.name);span.append(el('sup', '', author.affiliations));document.getElementById('authors').append(span);}
  for (const institution of p.affiliations) {
    const text = el('span');text.append(el('sup', '', institution.id),document.createTextNode(institution.name));document.getElementById('affiliations').append(text);
    const logo = el(safeURL(institution.url) ? 'a' : 'div', 'institution');logo.dataset.institution = institution.id;if (logo.tagName === 'A') {logo.href = safeURL(institution.url);logo.target = '_blank';logo.rel = 'noopener';logo.setAttribute('aria-label', institution.name);}
    if (safeURL(institution.logo)) {const img = el('img', institution.wideLogo ? 'wide-logo' : '');img.src = safeURL(institution.logo);img.alt = institution.name;logo.append(img);if (!institution.wideLogo) logo.append(el('span', 'institution-name', institution.shortName || institution.name));}
    else logo.append(el('span', 'institution-name', institution.shortName || institution.name));document.getElementById('institution-band').append(logo);
  }
  document.getElementById('author-note').textContent = p.authorNote;
  heroActions(document.getElementById('hero-resources'));document.getElementById('resource-status').textContent = safeURL(config.resources.arxiv) ? '' : 'ArXiv link coming soon.';
  const navPaper = document.getElementById('nav-paper');if (safeURL(config.resources.paper)) navPaper.href = safeURL(config.resources.paper);else navPaper.hidden = true;
  const hero = document.getElementById('hero-video');configureVideo(hero, config.hero);hero.controls = false;hero.preload = 'metadata';
  document.getElementById('hero-caption').textContent = config.hero.caption;
  document.querySelector('.hero-backdrop').style.backgroundImage = `url(${JSON.stringify(safeURL(config.hero.poster))})`;
}
renderProject();
const navLabels = {overview:'Overview', gallery:'Demos', method:'Method', results:'Results', resources:'Cite'};
const visibleSections = config.sections.filter(s => s.enabled !== false && renderers[s.type]);
for (const s of visibleSections) {
  const section = el('section', `content-section section-${s.type}`);section.id = s.id;section.setAttribute('aria-labelledby', `${s.id}-title`);const shell = el('div', 'section-shell');if (s.type !== 'resources') topLine(s, shell);renderers[s.type](s, shell);section.append(shell);document.getElementById('content-sections').append(section);
  if (navLabels[s.type]) {const a = el('a', '', navLabels[s.type]);a.href = `#${s.id}`;document.getElementById('site-nav').append(a);}
}
// Preserve a working entry into the content even after a section is hidden or reordered.
for (const a of document.querySelectorAll('a[href="#overview"]')) if (!document.getElementById('overview') && visibleSections[0]) a.href = `#${visibleSections[0].id}`;
const menuToggle = document.querySelector('.menu-toggle');const nav = document.getElementById('site-nav');
function closeMenu() {nav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded', 'false');menuToggle.setAttribute('aria-label', 'Open navigation');}
menuToggle.addEventListener('click', () => {const open = !nav.classList.contains('is-open');nav.classList.toggle('is-open', open);menuToggle.setAttribute('aria-expanded', String(open));menuToggle.setAttribute('aria-label', `${open ? 'Close' : 'Open'} navigation`);});
nav.addEventListener('click', e => {if (e.target.closest('a')) closeMenu();});document.addEventListener('keydown', e => {if (e.key === 'Escape' && nav.classList.contains('is-open')) {closeMenu();menuToggle.focus();}});
const header = document.getElementById('site-header');function updateHeader() {header.classList.toggle('is-scrolled', scrollY > 40);}window.addEventListener('scroll', updateHeader, {passive:true});updateHeader();
const navLinks = [...nav.querySelectorAll('a')];const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) navLinks.forEach(link => {if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');else link.removeAttribute('aria-current');});
}, {rootMargin:'-15% 0px -55% 0px'});visibleSections.forEach(s => sectionObserver.observe(document.getElementById(s.id)));

// Play only visible, active media; native controls remain available for deliberate playback.
const videos = [...document.querySelectorAll('video')];let fullVideoPlaying = false;
function videoVisible(video) {const box = video.getBoundingClientRect();const visible = Math.max(0, Math.min(box.bottom, innerHeight) - Math.max(0, box.top));return video.getClientRects().length > 0 && box.height > 0 && visible / box.height > .2;}
function canAutoplay(video) {return video.dataset.autoplay === 'true' && !reducedMotion.matches && !document.hidden && video.dataset.userPaused !== 'true' && !fullVideoPlaying && videoVisible(video);}
function loadVideo(video) {if (!video.dataset.prepared) {video.dataset.prepared = 'true';video.preload = 'metadata';video.load();}}
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(({target:video,isIntersecting}) => {if (isIntersecting) {loadVideo(video);if (canAutoplay(video)) video.play().catch(() => {});}else video.pause();});
}, {threshold:[0,.25]});
videos.forEach(video => {
  videoObserver.observe(video);
  ['pointerdown','keydown'].forEach(type => video.addEventListener(type, () => {video.dataset.userAction = String(Date.now());}));
  video.addEventListener('pause', () => {if (Date.now() - Number(video.dataset.userAction || 0) < 650) video.dataset.userPaused = 'true';if (video.id === 'full-video') {fullVideoPlaying = false;videos.forEach(other => {if (other !== video && canAutoplay(other)) other.play().catch(() => {});});}});
  video.addEventListener('play', () => {if (Date.now() - Number(video.dataset.userAction || 0) < 650) delete video.dataset.userPaused;if (video.id === 'full-video') {fullVideoPlaying = true;videos.forEach(other => {if (other !== video) other.pause();});}});
});
const heroVideo = document.getElementById('hero-video');const heroToggle = document.getElementById('hero-toggle');
function updateHeroToggle() {heroToggle.replaceChildren(document.createTextNode(heroVideo.paused ? 'Play ' : 'Pause '),el('span', '', heroVideo.paused ? '▶' : 'Ⅱ'));heroToggle.setAttribute('aria-label', `${heroVideo.paused ? 'Play' : 'Pause'} background video`);}
heroVideo.addEventListener('play', updateHeroToggle);heroVideo.addEventListener('pause', updateHeroToggle);
heroToggle.addEventListener('click', () => {if (heroVideo.paused) {delete heroVideo.dataset.userPaused;heroVideo.play().catch(updateHeroToggle);}else {heroVideo.dataset.userPaused = 'true';heroVideo.pause();}updateHeroToggle();});updateHeroToggle();
document.addEventListener('visibilitychange', () => {videos.forEach(video => {if (document.hidden) video.pause();else if (canAutoplay(video)) video.play().catch(() => {});});});
reducedMotion.addEventListener('change', () => {videos.forEach(video => {if (reducedMotion.matches && video.dataset.autoplay === 'true') video.pause();else if (canAutoplay(video)) video.play().catch(() => {});});});
document.querySelector('.dialog-close').addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', event => {if (event.target === figureDialog) {const r = figureDialog.getBoundingClientRect();if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) figureDialog.close();}});
