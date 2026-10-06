const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  primaryNav?.classList.toggle('nav-open', !isOpen);
});

const profiles = {
  read: { title: 'Read-heavy', throughput: '37.2', latency: '0.8', bars: [28, 53, 76, 90, 96, 92] },
  mixed: { title: 'Balanced mix', throughput: '24.6', latency: '1.1', bars: [24, 48, 72, 84, 82, 77] },
  write: { title: 'Write-heavy', throughput: '18.4', latency: '1.6', bars: [21, 43, 61, 72, 70, 64] }
};

const profileButtons = document.querySelectorAll('[data-profile]');
profileButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const profile = profiles[button.dataset.profile];
    if (!profile) return;
    profileButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelector('#profile-title').textContent = profile.title;
    document.querySelector('#throughput').innerHTML = `${profile.throughput}<span> M</span>`;
    document.querySelector('#latency').innerHTML = `${profile.latency}<span> ms</span>`;
    document.querySelectorAll('.chart-bar').forEach((bar, index) => {
      bar.style.setProperty('--bar', `${profile.bars[index]}%`);
    });
    document.querySelector('#benchmark-chart').setAttribute('aria-label', `${profile.title} throughput by concurrency: ${profile.bars.join(', ')} percent of chart scale`);
  });
});

const examples = {
  node: {
    label: 'JAVASCRIPT',
    code: "import { createClient } from 'redis';\n\nconst client = createClient({ url: 'redis://localhost:6380' });\nawait client.connect();\n\nawait client.set('greeting', 'hello, kestrel');\nconsole.log(await client.get('greeting'));"
  },
  python: {
    label: 'PYTHON',
    code: "import redis\n\nclient = redis.Redis(host='localhost', port=6380, decode_responses=True)\n\nclient.set('greeting', 'hello, kestrel')\nprint(client.get('greeting'))"
  }
};

document.querySelectorAll('.client-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const example = examples[tab.dataset.language];
    if (!example) return;
    document.querySelectorAll('.client-tab').forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
    const code = document.querySelector('#client-code code');
    code.textContent = example.code;
    document.querySelector('#client-code').setAttribute('aria-labelledby', tab.id);
    document.querySelector('#code-language-label').textContent = example.label;
  });
});

document.querySelectorAll('[data-copy], [data-copy-target]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = button.dataset.copyTarget ? document.querySelector(`#${button.dataset.copyTarget} code`)?.textContent : button.dataset.copy;
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target);
      button.textContent = 'Copied';
      window.setTimeout(() => { button.textContent = 'Copy'; }, 1400);
    } catch {
      button.textContent = 'Select to copy';
      window.setTimeout(() => { button.textContent = 'Copy'; }, 1400);
    }
  });
});
