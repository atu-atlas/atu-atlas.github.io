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
      kicker: 'Odin Collection',
      desc: 'Grounded combat and fast-paced action across several huge environments.',
      hero: '/assets/images/key-art/ModernWarfare.jpg',
      file: 'md/MW.md',
      quote: '“We get dirty and the world stays clean. That`s the mission.”',
      badge: 'IW8'
    },
    mwii: {
      key: 'mwii',
      title: '<img src="/assets/images/logos/Cortez-logo.svg">',
      name: 'Modern Warfare II',
      kicker: 'Cortez Collection',
      desc: 'Unprecedented global conflict and high-stakes infiltration tactics with cutting-edge equipment.',
      hero: '/assets/images/key-art/ModernWarfare-II.jpg',
      file: 'md/MWII.md',
      quote: '“Be careful who you trust, Sergeant. People you know can hurt you the most.”',
      badge: 'IW9'
    },
    mwiii: {
      key: 'mwiii',
      title: '<img src="/assets/images/logos/Jupiter-logo.svg">',
      name: 'Modern Warfare III',
      kicker: 'Jupiter Collection',
      desc: 'Adapt or die in a fight against the ultimate threat. Time to settle old scores and start new ones.',
      hero: '/assets/images/key-art/ModernWarfare-III.jpg',
      file: 'md/MWIII.md',
      quote: '“Take this to hell with you, Captain... Never bury your enemies alive.”',
      badge: 'Jupiter'
    },
    cw: {
      key: 'cw',
      title: '<img src="/assets/images/logos/T9-logo.svg">',
      name: 'Black Ops: Cold War',
      kicker: 'Zeus Collection',
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
      kicker: 'Fore Collection',
      desc: 'Rise on every front with reactive environments, mysterious entities, and harrowing stories.',
      hero: '/assets/images/key-art/Vanguard.jpg',
      file: 'md/VG.md',
      quote: '“Ever heard of Vanguard? I created Vanguard.”',
      badge: 'S4'
    }
  },

  nav: [
    { key: 'home', label: 'News' },
    { key: 'atlas', label: 'Atlas' },
    { key: 'mw', label: 'MW', icon: 'assets/images/icons/IW8-icon.svg' },
    { key: 'mwii', label: 'MWII', icon: 'assets/images/icons/Cortez-icon.svg' },
    { key: 'mwiii', label: 'MWIII', icon: 'assets/images/icons/Jupiter-icon.svg' },
    { key: 'cw', label: 'CW', icon: 'assets/images/icons/T9-icon.svg' },
    { key: 'vg', label: 'VG', icon: 'assets/images/icons/S4-icon.svg' }
  ]
};

function renderNav(activeKey = 'home') {
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
  const links = COD_SITE.nav.map(renderLink).join('');

  nav.innerHTML = `
    <div class="cod-nav-inner">
      <div class="brand">
        <div>
         <img  class="brand-logo" src="/assets/images/icons/Atlas.png"></img>
      </div>
      <div class="nav-links">${links}</div>
      <div class="nav-actions">
      </div>
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Open navigation">☰</button>
    </div>

    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-stack">
        ${links}
    </div>
  `;

  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }
}

function isHomePage() {
  return document.getElementById('home-root') !== null;
}

function rootPrefix() {
  return isHomePage() ? './' : '../';
}

function pageUrl(key) {
  const map = {
    home: '',
    atlas: 'Atlas/',
    mw: 'MW/',
    mwii: 'MWII/',
    mwiii: 'MWIII/',
    cw: 'CW/',
    vg: 'VG/'
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
  headings.forEach(h => {
    const id = slugify(h.textContent);
    if (id) h.id = id;
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

      [...container.querySelectorAll('.expand-btn')].forEach(btn => {
        btn.addEventListener('click', () => {
          const wrap = btn.closest('.command-text-wrap');
          if (!wrap) return;

          wrap.classList.toggle('expanded');
          const expanded = wrap.classList.contains('expanded');
          btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          btn.textContent = expanded ? 'Show less' : 'Show more';
        });
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
      const target = container.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
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
  if (!headings.length) {
    toc.innerHTML = '<div class="quick-list"><span>No sections detected.</span></div>';
    return;
  }
  toc.innerHTML = `<div class="toc-list">${headings.map(h => `
    <a href="#${h.id}">${h.textContent.replace(/\s+/g, ' ').trim()}</a>
  `).join('')}</div>`;
}

function extractPreview(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const paras = [...temp.querySelectorAll('p')].map(p => p.textContent.trim()).filter(Boolean);
  return paras[0] || '';
}

async function renderPage(pageKey) {
  showLoader();
  document.body.classList.remove(
    'theme-mw',
    'theme-mwii',
    'theme-mwiii',
    'theme-cw',
    'theme-vg',
    'theme-fn'
  );

  if (pageKey === 'mw') document.body.classList.add('theme-mw');
  else if (pageKey === 'mwii') document.body.classList.add('theme-mwii');
  else if (pageKey === 'mwiii') document.body.classList.add('theme-mwiii');
  else if (pageKey === 'cw') document.body.classList.add('theme-cw');
  else if (pageKey === 'vg') document.body.classList.add('theme-vg');
  else if (pageKey === 'fn') document.body.classList.add('theme-fn');
  const page = COD_SITE.pages[pageKey];
  renderNav(pageKey);
  const shell = document.getElementById('page-root');
  if (!shell || !page) return;

  const jumpLinks = ['overview', 'toc', 'main-content'];
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
      </div>
    </section>



      <div class="section-grid">
        <aside class="side-panel" id="toc-panel">
          <div id="toc" class="toc-list"><span>Loading…</span></div>
        </aside>

        <main class="content-panel" id="main-content">
          <div id="overview-cards" class="overview-grid"></div>
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

    const cards = document.getElementById('overview-cards');
    const h2s = [...content.querySelectorAll('h2')].slice(0, 3);
    const featureImages = [
      '/assets/images/blog/Feed-pic.jpg',
      '/assets/images/blog/Feed-pic-2.jpg',
      '/assets/images/blog/Feed-pic-3.jpg',
    ];

    cards.innerHTML = h2s.map((h, i) => {
      const p = h.nextElementSibling ? extractPreview(h.nextElementSibling.outerHTML) : page.desc;
      const image = featureImages[i % featureImages.length];
      return `
        <article class="feature-card" style="--card-image:url('${image}')">
          <div class="feature-inner">
            <div class="feature-kicker">${page.badge}</div>
            <div class="feature-title">${h.textContent}</div>
            <p class="feature-text">${escapeHtml((p || page.desc).slice(0, 140))}</p>
          </div>
        </article>
      `;
    }).join('');
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
    'theme-fn'
  );
  renderNav('home');
  const root = document.getElementById('home-root');
  if (!root) return;

  const gameCards = Object.values(COD_SITE.pages).map(page => `
    <a class="game-card" href="${pageUrl(page.key)}" style="display:block;">
      <div class="game-thumb" style="--card-image:url('${page.hero}')">
        <div class="game-tag">${page.name}</div>
      </div>
      <div class="game-body">
        <p>${page.desc}</p>
      </div>
    </a>
  `).join('');
  root.innerHTML = `
      <section class="home-panel" id="features">
        <div class="section-heading">
          <div>
            <h2>What's new?</h2>
            <p>News flash! You can read these</p>
          </div>
        </div>
        <div class="overview-grid">
          <article class="feature-card" style="--card-image:url('/assets/images/blog/feed-news-1.jpg')">
            <div class="feature-inner">
              <div class="feature-kicker" style="color:rgb(0, 255, 26)">Content</div>
              <div class="feature-title">New versions</div>
              <p class="feature-text">New versions listed for several titles.</p>
            </div>
          </article>
          <article class="feature-card" style="--card-image:url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3BlY3R4MGY5Z3pzdGkyY2VpMW81dnpvZGFqemVld3kxaWlodjNiaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BYAcxAAzaHCFaYWALw/giphy.gif')">
            <div class="feature-inner">
              <div class="feature-kicker" style="color:rgb(255, 247, 0)">Visuals</div>
              <div class="feature-title">GIFs</div>
              <p class="feature-text">Why staring at a picture, when you can watch it?</p>
            </div>
          </article>
          <article class="feature-card" style="--card-image:url('/assets/images/blog/feed-news-2.jpg')">
            <div class="feature-inner">
              <div class="feature-kicker" style="color:rgb(250, 90, 21)">Structure</div>
              <div class="feature-title">Stay frosty</div>
              <p class="feature-text">Cleaning stuff in preparation for something new.</p>
            </div>
          </article>
        </div>
      </section>
            <section class="home-panel" id="games">
        <div class="section-heading">
          <div>
            <h2>Page Info</h2>
            <p>Choose your favourite game for commands, events, camos, and other fun</p>
          </div>
        </div>
        <div class="card-grid">${gameCards}</div>
      </section>
    </div>
  `;
  hideLoader();
}