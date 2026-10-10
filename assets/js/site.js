const COD_SITE = {
  pages: {
    atlas: {
      key: 'atlas',
      title: 'Atlas',
      name: 'Atlas',
      kicker: 'Incoming Intel',
      desc: 'Atlas for video-games information, all in one place',
      hero: '/assets/images/key-art/COD-Franchise.png',
      file: 'md/Atlas.md',
      quote: '“For guiding users in search of fun.”',
      badge: 'info'
    },
    mw: {
      key: 'mw',
      title: '<img src="/assets/images/logos/IW8-logo.svg">',
      name: 'Modern Warfare',
      kicker: 'Odin',
      desc: 'Grounded combat and fast-paced action.',
      hero: '/assets/images/key-art/ModernWarfare.jpg',
      file: 'md/MW.md',
      quote: '“We get dirty and the world stays clean. That`s the mission.”',
      badge: 'IW8'
    },
    mwii: {
      key: 'mwii',
      title: '<img src="/assets/images/logos/Cortez-logo.svg">',
      name: 'Modern Warfare II',
      kicker: 'Cortez',
      desc: 'Unprecedented global conflict and high-stakes infiltration tactics.',
      hero: '/assets/images/key-art/ModernWarfare-II.jpg',
      file: 'md/MWII.md',
      quote: '“Be careful who you trust, Sergeant. People you know can hurt you the most.”',
      badge: 'IW9'
    },
    mwiii: {
      key: 'mwiii',
      title: '<img src="/assets/images/logos/Jupiter-logo.svg">',
      name: 'Modern Warfare III',
      kicker: 'Jupiter',
      desc: 'Adapt or die in a fight against the ultimate threat.',
      hero: '/assets/images/key-art/ModernWarfare-III.jpg',
      file: 'md/MWIII.md',
      quote: '“Take this to hell with you, Captain... Never bury your enemies alive.”',
      badge: 'IW9-Jup'
    },
    cw: {
      key: 'cw',
      title: '<img src="/assets/images/logos/T9-logo.svg">',
      name: 'Black Ops: Cold War',
      kicker: 'Zeus',
      desc: 'Descend into the dark center of a global conspiracy to destabilize the global balance of power.',
      hero: '/assets/images/key-art/ColdWar.jpg',
      file: 'md/CW.md',
      quote: '“And now the training is complete. We just need to give the subject a name.”',
      badge: 'T9'
    },
    vg: {
      key: 'vg',
      title: '<img src="/assets/images/logos/S4-logo.svg">',
      name: 'Vanguard',
      kicker: 'Fore',
      desc: 'Rise on every front.',
      hero: '/assets/images/key-art/Vanguard.jpg',
      file: 'md/VG.md',
      quote: '“Ever heard of Vanguard? I created Vanguard.”',
      badge: 'S4'
    },
    bo6: {
      key: 'bo6',
      title: '<img src="/assets/images/logos/Cerberus-logo.svg">',
      name: 'Black Ops 6',
      kicker: 'Cerberus',
      desc: 'Forced to go rogue. Hunted from within.',
      hero: '/assets/images/key-art/BlackOps-6.jpg',
      file: 'md/BO6.md',
      quote: '“I got a message for Woods, tell him: Bishop takes Rook”',
      badge: 'T10'
    },
    bo7: {
      key: 'bo7',
      title: '<img src="/assets/images/logos/Saturn-logo.svg">',
      name: 'Black Ops 7',
      kicker: 'Saturn',
      desc: 'Embrace the madness.',
      hero: '/assets/images/key-art/BlackOps-7.jpg',
      file: 'md/BO7.md',
      quote: '“Sorry, Mason. Playing the good guy only gets you so far.”',
      badge: 'IW9-Sat'
    }
  },

  nav: [
    { key: 'atlas', label: 'Atlas' },
    { key: 'mw', label: 'MW', icon: 'assets/images/icons/IW8-icon.svg' },
    { key: 'mwii', label: 'MWII', icon: 'assets/images/icons/Cortez-icon.svg' },
    { key: 'mwiii', label: 'MWIII', icon: 'assets/images/icons/Jupiter-icon.svg' },
    { key: 'cw', label: 'CW', icon: 'assets/images/icons/T9-icon.svg' },
    { key: 'vg', label: 'VG', icon: 'assets/images/icons/S4-icon.svg' },
    { key: 'bo6', label: 'BO6', icon: 'assets/images/icons/Cer-icon.svg' },
    { key: 'bo7', label: 'BO7', icon: 'assets/images/icons/Sat-icon.svg' }
  ]
};

function renderNav(activeKey = 'atlas') {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const renderLink = (item) => `
    <a class="nav-link-item nav-link-${item.key} ${item.key === activeKey ? 'active' : ''}" href="${pageUrl(item.key)}">
      ${item.icon
      ? `<img class="nav-game-icon ${item.key === 'vg' ? 'nav-game-icon-vg' : ''}" src="${assetUrl(item.icon)}" alt="${item.label}">`
      : `<span>${item.label}</span>`
    }
    </a>
  `;
  const linksWithBrand = (() => {
    const items = [...COD_SITE.nav];
    const atlas = items.find(i => i.key === 'atlas');
    const others = items.filter(i => i.key !== 'atlas');

    const atlasHtml = atlas
      ? `
        <a class="nav-link-item nav-link-${atlas.key} ${atlas.key === activeKey ? 'active' : ''}" href="${pageUrl(atlas.key)}">
          <img class="nav-game-icon nav-game-icon--slightly-larger" style="transform: scale(1.08);" src="${assetUrl('assets/images/icons/Atlas.svg')}" alt="${atlas.label}">
        </a>
      `
      : '';
    const homeHtml = `
      <a class="nav-link-item nav-link-home ${activeKey === '' ? 'active' : ''}" href="${rootPrefix()}index.html">
        <span>Home</span>
      </a>
    `;

    const middleHtml = others.map(renderLink).join('');

    return [atlasHtml, homeHtml, middleHtml].join('');
  })();

  nav.innerHTML = `
    <div class="cod-nav-inner">
      <div class="nav-links">${linksWithBrand}</div>
      <div class="nav-actions">
        <button class="theme-toggle-btn nav-visibility-btn" id="nav-toggle" type="button" aria-label="Collapse navigation bar" aria-controls="site-nav" aria-expanded="true">Collapse</button>
        <button class="theme-toggle-btn" id="theme-toggle" type="button" aria-label="Toggle theme"></button>
      </div>
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Open navigation">☰</button>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-stack">
        ${linksWithBrand}
        <button class="theme-toggle-btn nav-visibility-btn mobile-nav-visibility-btn" id="nav-toggle-mobile" type="button" aria-label="Collapse navigation bar" aria-controls="site-nav" aria-expanded="true">Collapse</button>
        <button class="theme-toggle-btn mobile-theme-toggle" id="theme-toggle-mobile" type="button" aria-label="Toggle theme"></button>
      </div>
    </div>
  `;

  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  setupNavVisibilityButtons(nav);
  initTheme();
  setupThemeToggleButtons();
}

function setupNavVisibilityButtons(nav) {
  const toggleButtons = [
    document.getElementById('nav-toggle'),
    document.getElementById('nav-toggle-mobile'),
  ];
  const navInner = nav.querySelector('.cod-nav-inner');
  nav.classList.add('is-collapsed');
  let collapsedByClick = nav.classList.contains('is-collapsed');
  const setNavCollapsed = (collapsed) => {
    const currentWidth = navInner.getBoundingClientRect().width;
    if (!collapsed) {
      navInner.style.transition = 'none';
      navInner.style.width = '';
      nav.classList.remove('is-collapsed');
      toggleButtons.forEach((button) => {
        if (!button) return;
        button.textContent = '−';
        button.setAttribute('aria-label', 'Collapse navigation bar');
        button.setAttribute('aria-expanded', 'true');
      });
      navInner.getBoundingClientRect();
      navInner.style.transition = '';
      return;
    }

    navInner.style.transition = 'none';
    navInner.style.width = `${currentWidth}px`;
    nav.classList.add('is-collapsed');
    toggleButtons.forEach((button) => {
      if (!button) return;
      button.textContent = '+';
      button.setAttribute('aria-label', 'Expand navigation bar');
      button.setAttribute('aria-expanded', 'false');
    });

    const navLinks = navInner.querySelectorAll('.nav-link-item');
    const linkTransitions = [...navLinks].map((link) => link.style.transition);
    navLinks.forEach((link) => {
      link.style.transition = 'none';
    });
    navInner.style.width = '';
    const targetWidth = navInner.getBoundingClientRect().width;
    navLinks.forEach((link, index) => {
      link.style.transition = linkTransitions[index];
    });
    navInner.style.width = `${currentWidth}px`;
    navInner.getBoundingClientRect();
    navInner.style.transition = '';
    navInner.style.width = `${targetWidth}px`;

    if (Math.abs(currentWidth - targetWidth) < 1) {
      navInner.style.width = '';
      return;
    }
    const onTransitionEnd = (event) => {
      if (event.propertyName !== 'width') return;
      navInner.style.width = '';
      navInner.removeEventListener('transitionend', onTransitionEnd);
    };
    navInner.addEventListener('transitionend', onTransitionEnd);
  };

  toggleButtons.forEach((button) => {
    if (button) {
      button.textContent = '+';
      button.setAttribute('aria-label', 'Expand navigation bar');
      button.setAttribute('aria-expanded', 'false');
    }
    if (button) button.addEventListener('click', () => {
      collapsedByClick = !nav.classList.contains('is-collapsed');
      setNavCollapsed(collapsedByClick);
    });
  });
}

function isHomePage() {
  return document.getElementById('home-root') !== null;
}

function getSavedTheme() {
  return window.localStorage.getItem('atlasTheme');
}

function saveTheme(theme) {
  window.localStorage.setItem('atlasTheme', theme);
}

function getPreferredTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function getCurrentTheme() {
  const saved = getSavedTheme();
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return getPreferredTheme();
}

function applyTheme(theme) {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
  saveTheme(theme);
  updateThemeToggleButtons(theme);
}

function updateThemeToggleButtons(theme) {
  const label = theme === 'light' ? '☀️' : '🌙';
  const title = theme === 'light' ? 'Light theme' : 'Dark theme';
  const buttons = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-mobile'),
  ];
  buttons.forEach((button) => {
    if (!button) return;
    button.textContent = label;
    button.title = title;
  });
}

function setupThemeToggleButtons() {
  const onToggle = () => {
    const current = getCurrentTheme();
    applyTheme(current === 'light' ? 'dark' : 'light');
  };

  const primary = document.getElementById('theme-toggle');
  const mobile = document.getElementById('theme-toggle-mobile');

  if (primary) primary.addEventListener('click', onToggle);
  if (mobile) mobile.addEventListener('click', onToggle);
}

function initTheme() {
  const theme = getCurrentTheme();
  applyTheme(theme);
}

function rootPrefix() {
  return isHomePage() ? './' : '../';
}

function pageUrl(key) {
  const map = {
    atlas: 'Atlas/',
    mw: 'MW/',
    mwii: 'MWII/',
    mwiii: 'MWIII/',
    cw: 'CW/',
    vg: 'VG/',
    bo6: 'BO6/',
    bo7: 'BO7/'
  };
  return rootPrefix() + map[key];
}

function assetUrl(path) {
  return rootPrefix() + path.replace(/^\.?\//, '');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch]);
}

function preprocessMarkdown(md) {
  const prefix = rootPrefix();

  return md
    .replace(/^!!! note\s+(.+)$/gm, () => `\n### Note\n`)
    .replace(/^!!! info\s+(.+)$/gm, () => `\n### Info\n`)
    .replace(/\{\d+%:\d+%\}/g, '')
    .replace(/\{\d+px:\d+px\}/g, '')
    .replace(/!\[\]\(\.\/images\//g, `![](${prefix}images/`)
    .replace(/\]\(\.\/images\//g, `](${prefix}images/`);
}

function transformRenderedContent(container) {
  const headings = [...container.querySelectorAll('h2, h3')];
  const usedIds = new Set();
  headings.forEach((h, index) => {
    const baseId = slugify(h.textContent) || `section-${index + 1}`;
    let id = baseId;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${baseId}-${suffix}`;
      suffix += 1;
    }
    usedIds.add(id);
    h.id = id;

    if (h.tagName === 'H2') {
      const anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = `#${id}`;
      anchor.setAttribute('aria-label', `Link to ${h.textContent.replace(/\s+/g, ' ').trim()}`);
      h.appendChild(anchor);
    }
  });

  [...container.querySelectorAll('li')].forEach((li, index) => {
    const code = li.querySelector('code');
    if (!code) return;

    const command = code.textContent.trim();
    if (command.length < 4) return;

    const clone = li.cloneNode(true);

    const codeInClone = clone.querySelector('code');
    if (codeInClone) codeInClone.remove();

    const descriptionHtml = clone.innerHTML
      .replace(/^(?:\s|<br\s*\/?>)+/i, '')
      .trim();

    const infoId = `command-info-${index}`;
    const hasDescription = descriptionHtml.length > 0;

    const card = document.createElement('div');
    card.className = 'command-card';
    card.innerHTML = `
      <div class="command-main">
        <div class="command-label-row">
          <div class="command-label">Command</div>
          ${hasDescription
        ? `<button class="command-info-btn" type="button" aria-expanded="false" data-info-target="${infoId}">i</button>`
        : ''
      }
        </div>

        <div class="command-text-wrap">
          <div class="command-text">${escapeHtml(command)}</div>
          <button class="expand-btn" type="button" aria-expanded="false">Show more</button>
        </div>

        ${hasDescription
        ? `<div class="command-info-pop" id="${infoId}" hidden>
                <div class="command-info-title">Info</div>
                <div class="command-info-body">${descriptionHtml}</div>
              </div>`
        : ''
      }
      </div>

      <button class="copy-btn command-copy" data-copy="${escapeHtml(command)}" aria-label="Copy command">
        <span class="copy-btn-text">Copy</span>
      </button>
    `;

    li.replaceWith(card);
  });

  [...container.querySelectorAll('.command-info-btn')].forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-info-target');
      const pop = document.getElementById(targetId);
      if (!pop) return;

      const isOpen = !pop.hasAttribute('hidden');

      [...container.querySelectorAll('.command-info-pop')].forEach(el => {
        el.setAttribute('hidden', '');
      });
      [...container.querySelectorAll('.command-info-btn')].forEach(el => {
        el.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        pop.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.command-card')) return;

    [...container.querySelectorAll('.command-info-pop')].forEach(el => {
      el.setAttribute('hidden', '');
    });
    [...container.querySelectorAll('.command-info-btn')].forEach(el => {
      el.setAttribute('aria-expanded', 'false');
    });
  });

  [...container.querySelectorAll('p code')].forEach(code => {
    const text = code.textContent.trim();
    if (text.length < 10 || text.includes(' ')) return;
    code.classList.add('inline-command');
  });

  [...container.querySelectorAll('a[href^="#"]')].forEach(link => {
    link.addEventListener('click', e => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      window.history.pushState(null, '', link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function convertEventTables(container) {
  const tables = [...container.querySelectorAll("table")];

  tables.forEach(table => {
    const headerRow = table.querySelector("tr");
    if (!headerRow) return;

    const headers = [...headerRow.querySelectorAll("th, td")].map(cell =>
      cell.textContent.trim()
    );

    const isEventTable =
      headers.includes("Name") &&
      headers.includes("Version") &&
      headers.includes("Icon") &&
      headers.includes("Full command");

    if (!isEventTable) return;

    const rows = [...table.querySelectorAll("tr")].filter(row =>
      row.querySelectorAll("td").length > 0
    );

    const grid = document.createElement("div");
    grid.className = "event-grid";

    rows.forEach(row => {
      const cells = [...row.querySelectorAll("td")];
      if (cells.length < 4) return;

      const name = cells[0]?.textContent?.trim() || "";
      const version = cells[1]?.textContent?.trim() || "";
      const iconImg = cells[2]?.querySelector("img");
      const commandCode = cells[3]?.querySelector("code");

      const icon = iconImg ? iconImg.src : "";
      const command = commandCode
        ? commandCode.textContent.trim()
        : (cells[3]?.textContent?.trim() || "");

      if (!name || !command) return;

      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <div class="event-header">
          ${icon
          ? `<img class="event-icon" src="${escapeHtml(icon)}" alt="${escapeHtml(name)} icon">`
          : `<div class="event-icon event-icon-placeholder"></div>`
        }
          <div>
            <div class="event-title">${escapeHtml(name)}</div>
            <div class="event-version">Version ${escapeHtml(version)}</div>
          </div>
        </div>

        <div class="event-command-wrap">
          <div class="event-command collapsed">${escapeHtml(command)}</div>
          <button class="expand-btn" type="button" aria-expanded="false">Show more</button>
        </div>

        <div class="event-footer">
          <button class="copy-btn command-copy" data-copy="${escapeHtml(command)}" aria-label="Copy command">
            <span class="copy-btn-text">Copy</span>
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    if (grid.children.length > 0) {
      table.replaceWith(grid);
    }
  });
}

function setupExpandableCommands(container) {
  const blocks = [
    ...container.querySelectorAll('.command-text'),
    ...container.querySelectorAll('.event-command')
  ];

  blocks.forEach(block => {
    const wrap = block.parentElement;
    if (!wrap) return;

    const btn = wrap.querySelector('.expand-btn');
    if (!btn) return;

    const lineHeight = parseFloat(getComputedStyle(block).lineHeight) || 24;
    const collapsedHeight = lineHeight * 3;


    block.classList.remove('expanded', 'is-truncated');
    block.classList.add('collapsed');
    btn.classList.remove('hidden');
    btn.textContent = 'Show more';
    btn.setAttribute('aria-expanded', 'false');

    requestAnimationFrame(() => {
      const fullHeight = block.scrollHeight;

      if (fullHeight <= collapsedHeight + 4) {
        block.classList.remove('collapsed');
        btn.classList.add('hidden');
        return;
      }

      block.classList.add('is-truncated');

      btn.addEventListener('click', () => {
        const expanded = block.classList.contains('expanded');

        if (expanded) {
          block.classList.remove('expanded');
          block.classList.add('collapsed');
          btn.textContent = 'Show more';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          block.classList.remove('collapsed');
          block.classList.add('expanded');
          btn.textContent = 'Show less';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
}

function setupCopyButtons(container) {
  [...container.querySelectorAll('.command-copy')].forEach(btn => {
    if (btn.dataset.copyBound === 'true') return;
    btn.dataset.copyBound = 'true';

    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);

        const textNode = btn.querySelector('.copy-btn-text');
        if (textNode) {
          const old = textNode.textContent;
          textNode.textContent = 'Copied';
          btn.classList.add('copied');

          setTimeout(() => {
            textNode.textContent = old;
            btn.classList.remove('copied');
          }, 1400);
        } else {
          const old = btn.textContent;
          btn.textContent = 'Copied';
          btn.classList.add('copied');

          setTimeout(() => {
            btn.textContent = old;
            btn.classList.remove('copied');
          }, 1400);
        }
      } catch {
        const textNode = btn.querySelector('.copy-btn-text');
        if (textNode) textNode.textContent = 'Copy failed';
      }
    });
  });
}


function buildTOC(container) {
  const toc = document.getElementById('toc');
  if (!toc) return;
  const headings = [...container.querySelectorAll('h2, h3')].filter(h => h.id);
  const sections = [];
  headings.forEach(heading => {
    if (heading.tagName === 'H2') {
      sections.push({ heading, children: [] });
    } else if (sections.length) {
      sections[sections.length - 1].children.push(heading);
    }
  });

  if (!sections.length) {
    toc.innerHTML = '<div class="quick-list"><span>No sections detected.</span></div>';
    return;
  }

  const list = document.createElement('div');
  list.className = 'toc-list';
  sections.forEach(({ heading, children }) => {
    const section = document.createElement('section');
    section.className = 'toc-section';

    const row = document.createElement('div');
    row.className = 'toc-section-row';
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.replace(/\s+/g, ' ').trim();
    row.appendChild(link);

    if (children.length) {
      const childList = document.createElement('div');
      childList.className = 'toc-subcategories';
      childList.hidden = true;
      const toggle = document.createElement('button');
      toggle.className = 'toc-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', `Expand ${link.textContent} subcategories`);
      toggle.setAttribute('aria-controls', `toc-children-${heading.id}`);

      childList.id = `toc-children-${heading.id}`;
      children.forEach(child => {
        const childLink = document.createElement('a');
        childLink.href = `#${child.id}`;
        childLink.textContent = child.textContent.replace(/\s+/g, ' ').trim();
        childList.appendChild(childLink);
      });

      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        toggle.setAttribute('aria-label', `${expanded ? 'Expand' : 'Collapse'} ${link.textContent} subcategories`);
        childList.hidden = expanded;
      });

      row.appendChild(toggle);
      section.append(row, childList);
    } else {
      section.appendChild(row);
    }

    list.appendChild(section);
  });
  toc.replaceChildren(list);
}

async function renderPage(pageKey) {
  showLoader();
  document.body.classList.remove(
    'theme-mw',
    'theme-mwii',
    'theme-mwiii',
    'theme-cw',
    'theme-vg',
    'theme-bo6',
    'theme-bo7'
  );

  if (pageKey === 'mw') document.body.classList.add('theme-mw');
  else if (pageKey === 'mwii') document.body.classList.add('theme-mwii');
  else if (pageKey === 'mwiii') document.body.classList.add('theme-mwiii');
  else if (pageKey === 'cw') document.body.classList.add('theme-cw');
  else if (pageKey === 'vg') document.body.classList.add('theme-vg');
  else if (pageKey === 'bo6') document.body.classList.add('theme-bo6');
  else if (pageKey === 'bo7') document.body.classList.add('theme-bo7');
  const page = COD_SITE.pages[pageKey];
  renderNav(pageKey);
  const shell = document.getElementById('page-root');
  if (!shell || !page) return;

  shell.innerHTML = `
    <section class="hero" style="--hero-image:url('${page.hero}')">
      <div class="hero-grid">
        <aside class="hero-rail">
        </aside>
        <div class="hero-copy">
          <div class="hero-kicker">${page.badge}</div>
          <h1 class="hero-title">${page.title}</h1>
          <p class="hero-desc">${page.desc}</p>
          <div class="hero-quote">${page.quote}</div>
        </div>
      </div>
    </section>

    <div class="section-grid">
        <aside class="side-panel" id="toc-panel">
          <div id="toc" class="toc-list"><span>Loading…</span></div>
        </aside>

        <main class="content-panel" id="main-content">
          <div id="content" class="article-content">
            <div class="loading-state"><div class="spinner"></div><div>Loading...</div></div>
          </div>
        </main>
      </div>
    </div>
  `;

  try {
    let raw = '';
    try {
      const candidates = [page.file, `./${page.file}`, `${window.location.pathname.replace(/[^/]*$/, '')}${page.file}`];
      let loaded = false;
      for (const candidate of candidates) {
        try {
          const res = await fetch(candidate);
          if (res.ok) {
            raw = await res.text();
            loaded = true;
            break;
          }
        } catch (_) { }
      }
      if (!loaded) throw new Error('Fetch failed');
    } catch (_) {
      const inline = document.getElementById(`md-inline-${page.key}`);
      if (!inline) throw _;
      raw = inline.textContent || inline.innerText || '';
    }
    const processed = preprocessMarkdown(raw);
    const html = marked.parse(processed, { breaks: true, gfm: true });
    const content = document.getElementById('content');
    content.innerHTML = html;

    transformRenderedContent(content);
    convertEventTables(content);
    setupExpandableCommands(content);
    buildTOC(content);
    setupCopyButtons(content);
    hideLoader();

    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  } catch (err) {
    document.getElementById('content').innerHTML = `<div class="error-state">Failed to load page content.</div>`;
    console.error(err);
  }
}

function showLoader() {
  const loader = document.getElementById("site-loader");
  if (loader) loader.classList.remove("hidden");
}

function hideLoader() {
  const loader = document.getElementById("site-loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 150);
}

function renderHome() {
  document.body.classList.remove(
    'theme-mw',
    'theme-mwii',
    'theme-mwiii',
    'theme-cw',
    'theme-vg',
    'theme-bo6',
    'theme-bo7'
  );
  renderNav('');
  const root = document.getElementById('home-root');
  if (!root) return;

  const heroImage = new URL(assetUrl('assets/images/key-art/COD-Franchise.png'), document.baseURI).href;
  const collections = Object.values(COD_SITE.pages).filter(page => page.key !== 'atlas');
  root.innerHTML = `
      <section class="hero home-hero" style="--hero-image:url('${heroImage}')">
        <div class="hero-grid home-hero-grid">
          <div class="hero-copy">
            <div class="hero-kicker">Community-driven</div>
            <h1 class="hero-title">Atlas</h1>
            <p class="hero-desc">Video-games information, all in one place.</p>
          <div class="home-actions">
              <a class="btn-cod home-action" href="${pageUrl('atlas')}">Explore Atlas <span aria-hidden="true">&#8594;</span></a>
              <a class="btn-cod-alt home-action" href="#collections">Browse collections</a>
            </div>
          </div>
        </div>
      </section>
      <section class="home-collections" id="collections" aria-labelledby="collections-title">
        <div class="section-heading">
          <div>
            <h2 id="collections-title">Game collections</h2>
            <p>♫ So many elements for you to consider ♫</p>
          </div>
          <a class="home-section-link" href="${pageUrl('atlas')}">Main Atlas <span aria-hidden="true">&#8594;</span></a>
        </div>
        <div class="card-grid home-collection-grid">
          ${collections.map(page => `
            <a class="game-card collection-${page.key}" href="${pageUrl(page.key)}">
              <div class="game-thumb" style="--card-image:url('${new URL(assetUrl(page.hero), document.baseURI).href}')">
                <span class="game-tag">${page.name}</span>
              </div>
              <div class="game-body">
                <span class="collection-kicker">${page.kicker}</span>
                <p>${page.desc}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
  `;
  hideLoader();
}

window.renderPage = renderPage;
window.renderHome = renderHome;