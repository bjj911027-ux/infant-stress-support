const page = document.querySelector('#page');
const navigation = document.querySelector('.nav');
const menu = navigation.querySelector('.menu-toggle');
const siteTitle = document.title;
const siteTools = document.querySelector('.site-tools');
const audioSource = document.body.dataset.audioSrc;
if (audioSource) {
  const soundMarkup = document.querySelector('#optional-sound').content.cloneNode(true);
  document.querySelector('.site-footer').append(soundMarkup.querySelector('#music-credit'));
  document.body.append(soundMarkup.querySelector('#background-audio'));
  siteTools.append(soundMarkup);
}
const audio = document.querySelector('#background-audio');
const soundControl = document.querySelector('#sound');
const soundInfo = document.querySelector('.sound-info');
const scenarioGuide = document.querySelector('#scenario-guide');
const supportResources = document.querySelector('#support-resources');
document.querySelector('#about-guide .disclosure-copy').append(supportResources.content.cloneNode(true));
const artwork = (name, className = '') =>
  `<img class="art ${className}" src="assets/illustrations/${name}.webp" alt="" draggable="false">`;
const link = (label, route, kind = 'text-link', arrow = '↗') =>
  `<a class="${kind}" href="#${route}">${label}<span aria-hidden="true">${arrow}</span></a>`;
const paragraphs = (copy) => copy.map((line) => `<p>${line}</p>`).join('');

const markPaths = {
  rays: 'M5 22q3-3 6-4 M16 16q3-5 4-9 M25 20q5-4 11-5',
  star: 'M20 3l4 9 10 1-8 6 2 10-9-5-9 5 2-10-7-7 10-1z',
  spark: 'M14 4c-1 7-2 11-9 13 7 1 8 4 9 10 1-6 4-9 10-11-6-1-9-5-10-12 M29 8l3-3 M29 23l5 2',
};
const mark = (shape, placement) =>
  `<svg class="ink-mark ${placement}" viewBox="0 0 40 32" aria-hidden="true" focusable="false"><path d="${markPaths[shape]}"/></svg>`;

const guideItems = [
  {
    route: 'result',
    tone: 'aqua',
    copy: [
      'If your baby is beginning to settle, stay nearby and keep offering support.',
      'Follow their cues. If they become more upset, you can offer more help or make the moment simpler.',
    ],
  },
  {
    route: 'r2',
    tone: '',
    copy: [
      'If your baby is not settling yet, try making the moment simpler.',
      'Reduce extra stimulation when possible, stay close, and give them some time before adding another challenge.',
    ],
  },
  {
    route: 'r3',
    tone: 'peach',
    copy: [
      'After a stressful event is over, your baby may still need time and support to settle.',
      'Offer closeness and return to familiar people, routines, or surroundings when possible.',
    ],
  },
  {
    route: 'r4',
    tone: '',
    copy: [
      'When stress is still happening, reduce what you realistically can.',
      'Look for one avoidable demand, disruption, or source of stimulation that could wait or change.',
      'Some stressors are outside your control.',
    ],
  },
  {
    route: 'r5',
    tone: 'sage',
    copy: [
      'Some situations are too ongoing or too heavy for one person to carry alone.',
      'Family, trusted people, childcare, health care, and community resources can all be part of supporting your family.',
    ],
  },
];

const prompts = [
  ['Ask one person for one specific kind of help.', 'Think of one task or need that someone you trust could share with you.'],
  ['Let another trusted adult share one part of the caregiving today.', "A partner, family member, friend, or other trusted caregiver can be part of your baby's circle of support."],
  ['Keep one familiar routine simple today.', 'Choose one part of the day that can stay familiar, even if other things feel unsettled.'],
  ["Take one non-urgent demand off today's list.", 'If something can safely wait, you do not have to carry it today.'],
  ['Reach out to one person you trust.', 'You do not need a long conversation. A small connection is enough.'],
  ['Use one practical support that is available to you.', 'If food, housing, transportation, childcare, health care, or another daily need is adding pressure, consider one person, service, or resource that could help.'],
  ['Make one part of the next few hours more predictable.', 'It might be a familiar feeding, bedtime, play, or caregiving routine.'],
  ['If the stress keeps feeling heavy, tell someone who supports your family.', "That might be someone you trust, a childcare provider, your baby's health care provider, or a community service."],
];

let sound = 'off';
let playRequest = null;
let soundUnavailable = false;
const soundError = "Sound isn't available right now. That is okay. Everything in the guide works without it.";
const soundStates = {
  off: ['Sound off', ['Play', 'playing']],
  playing: ['Sound on', ['Pause', 'paused'], ['Turn off', 'off']],
  paused: ['Sound paused', ['Resume', 'playing'], ['Turn off', 'off']],
};

if (audio) audio.volume = 0.22;

function soundControls() {
  return soundStates[sound].slice(1).map(([label, state]) =>
    `<button type="button" data-sound="${state}">${label}</button>`).join('');
}

function updateSound(state, unavailable = false) {
  if (sound === state && soundUnavailable === unavailable) return;
  sound = state;
  soundUnavailable = unavailable;
  const actions = soundControl.querySelector('.sound-actions');
  const restoreFocus = actions.contains(document.activeElement);
  soundControl.querySelector('.sound-state').textContent = soundStates[sound][0];
  document.querySelector('.sound-error').textContent = unavailable ? soundError : '';
  actions.innerHTML = soundControls();
  if (restoreFocus) actions.querySelector('button').focus();
}

function stopSound(unavailable = false) {
  playRequest = null;
  if (audio.hasAttribute('src')) {
    audio.pause();
    if (unavailable) {
      audio.removeAttribute('src');
      audio.load();
    } else {
      audio.currentTime = 0;
    }
  }
  updateSound('off', unavailable);
}

async function playSound() {
  if (playRequest) return;
  const request = {};
  playRequest = request;
  if (!audio.hasAttribute('src')) audio.src = audioSource;
  try {
    await audio.play();
    if (playRequest !== request) return;
    playRequest = null;
    updateSound(audio.paused ? 'paused' : 'playing');
  } catch {
    if (playRequest === request) stopSound(true);
  }
}

function home() {
  return `<section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">A gentle guide for stressful moments with your baby</p>
      <h1>Stress <br>happens.</h1>
      <p class="hero-lead"><strong>You do not have to prevent every hard moment.</strong></p>
      <p>Babies respond to new, frustrating, and stressful experiences. What matters is having support, some predictability, and time to settle again.</p>
      <div class="primary-entry">
        <a class="home-cta" href="#scenario">
          <span>Help me with a situation</span>
          <span class="home-cta-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" focusable="false">
              <path d="M5 17c7-2 15-2 22-1 M19 9q4 4 8 7-4 3-8 8"/>
            </svg>
          </span>
        </a>
        <p>Start with what is happening right now and get a few simple ideas.</p>
      </div>
    </div>
    <figure class="hero-art">
      <img class="hero-photo" src="assets/images/baby-01.jpg" alt="A caregiver cups a baby's face in their hands.">
    </figure>
  </section>
  <section class="other-entries" aria-label="More ways to use the guide">
    <div class="guide-entry">
      ${link('See the Quick Guide', 'guide')}
      <p>Skip the questions and see the main ideas in one place.</p>
    </div>
    <div class="support-entry">
      ${artwork('note')}
      <div>
        ${link('A little support for me', 'support')}
        <p>Take one small idea for yourself today.</p>
      </div>
    </div>
  </section>`;
}

function scenario() {
  return `<section class="scene">
    <div class="scene-intro">
      <h1>What’s happening right now?</h1>
      <p>There is no right answer and no score.</p>
      <p>Choose the situation that feels closest to what is happening. We will offer a few ideas that may fit this moment.</p>
    </div>
    <ul class="destinations">
      ${situations.map(({ title, example, art, route, tone }) => `
        <li class="destination">
          <a href="#${route}">
            <span class="destination-art" data-tone="${tone}">${artwork(art)}</span>
            <span class="destination-copy"><strong>${title}</strong><span>${example}</span></span>
          </a>
        </li>`).join('')}
    </ul>
    <p class="scene-note"><strong>Not sure which one fits?</strong><br>Choose the closest option. You can always come back and try another path.</p>
  </section>`;
}

function question(route) {
  const { title, intro, choices } = questions[route];
  const bridge = situations.find((situation) => situation.route === route);
  const heading = bridge ? 'h2' : 'h1';
  return `<div class="question-layout${bridge ? ' has-recognition' : ''}">
      ${bridge ? `<section class="recognition" data-tone="${bridge.tone}">
        <div>
          <h1>${bridge.heading}</h1>
          <p>${bridge.recognition}</p>
        </div>
        ${artwork(bridge.art, 'recognition-art')}
        ${mark('rays', 'recognition-mark')}
      </section>` : ''}
      <section class="reading question">
        <${heading}>${title}</${heading}>
        ${intro ? `<p>${intro}</p>` : ''}
        <ul class="answers">${choices.map(([label, target]) => `<li>${link(label, target, 'answer', '→')}</li>`).join('')}</ul>
        ${link('Try another situation', 'scenario', 'text-link', '↶')}
      </section>
    </div>`;
}

function result(route) {
  const { title, art, tone, intro, actions, why, note, supportLink } = results[route];
  return `<article class="result">
    <header class="result-header">
      <div>
        <h1>${title}</h1>
        ${paragraphs(intro)}
      </div>
      <figure class="result-figure" data-tone="${tone}">${artwork(art, 'result-art')}</figure>
    </header>
    <div class="result-body">
      <div class="actions">${actions.map((action) => `
        <section>
          <h2>${action.title}</h2>
          ${paragraphs(action.paragraphs)}
          ${action.list ? `<ul>${action.list.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
        </section>`).join('')}</div>
      <details>
        <summary>Why might this help?</summary>
        <p>${why}</p>
      </details>
      ${note ? `<aside class="result-note">${note}</aside>` : ''}
      <nav class="next" aria-label="Next steps">
        ${link('See the Quick Guide', 'guide', 'primary', '→')}
        ${link('Try another situation', 'scenario', 'text-link', '↶')}
        ${supportLink ? link('A little support for me', 'support') : ''}
      </nav>
    </div>
  </article>`;
}

function guide() {
  return `<article class="quick-guide">
    <header class="guide-intro">
      <h1>Five things to remember when stress happens</h1>
      <p>You do not need to do all five.</p>
      <p>Choose what fits this moment and what is realistic for your family.</p>
    </header>
    ${guideItems.map(({ route, tone, copy }) => {
      const { title, art } = results[route];
      return `
      <section class="guide-band" data-tone="${tone}">
        <div class="guide-band-inner">
          <div class="guide-copy"><h2>${title}</h2>${paragraphs(copy)}</div>
          ${artwork(art)}
        </div>
      </section>`;
    }).join('')}
    <section class="closing" data-tone="aqua">
      <div>
        <h2>Stress is not always harmful.</h2>
        <p>A stress response is part of how the body handles challenges. What matters is the kind of stress, how long it lasts, and whether support and recovery are available.</p>
        <p>When stress happens, different moments may call for different kinds of support:</p>
        <p><strong>stay close and follow their lead, help them reset, reconnect and recover, lower the load, or bring in support.</strong></p>
        ${mark('star', 'closing-mark')}
      </div>
    </section>
  </article>`;
}

function support() {
  return `<section class="support">
    <header>
      <h1>You matter, too.</h1>
      <p>Caring for a baby can feel much harder when you are carrying a lot yourself.</p>
      <p>You deserve support too. You do not need to earn it by reaching a breaking point.</p>
    </header>
    <div class="note-stage" data-tone="peach">
      ${artwork('note', 'note-art')}
      ${mark('spark', 'note-mark')}
      <h2>Take one small idea for today.</h2>
      <p>This is not a prescription. It is simply one small option you might choose if it feels helpful.</p>
      <div id="prompt" class="prompt" aria-live="polite" aria-atomic="true"></div>
      <div class="next">
        <button type="button" class="primary" id="reveal">Give me one <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </section>`;
}

const views = { home, scenario, guide, support };
const isScenarioRoute = (route) => route === 'scenario' || Object.hasOwn(questions, route) || Object.hasOwn(results, route);
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
}

function render(moveFocus) {
  const hash = location.hash.slice(1);
  const route = Object.hasOwn(views, hash) || Object.hasOwn(questions, hash) || Object.hasOwn(results, hash) ? hash : 'home';
  const scenarioRoute = isScenarioRoute(route);
  if (audio && isScenarioRoute(page.dataset.route) && !scenarioRoute) stopSound();
  siteTools.hidden = !scenarioRoute;
  scenarioGuide.hidden = !scenarioRoute;
  if (soundInfo && page.dataset.route !== route) soundInfo.open = false;
  const active = scenarioRoute ? 'scenario' : route;
  for (const anchor of navigation.querySelectorAll('a')) {
    if (anchor.hash === `#${active}`) anchor.setAttribute('aria-current', 'page');
    else anchor.removeAttribute('aria-current');
  }
  const view = views[route] ?? (Object.hasOwn(questions, route) ? question : result);
  setMenu(false);
  page.dataset.route = route;
  page.innerHTML = view(route);
  if (route === 'r5') page.querySelector('.result-body').append(supportResources.content.cloneNode(true));
  const title = page.querySelector('h1');
  document.title = route === 'home' ? siteTitle : `${title.textContent.trim()} | Stress Happens`;
  if (moveFocus) {
    window.scrollTo(0, 0);
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  }
}

menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
navigation.addEventListener('click', (event) => {
  const anchor = event.target.closest('a');
  if (anchor && anchor.hash === location.hash && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

soundControl?.addEventListener('click', (event) => {
  const soundButton = event.target.closest('button[data-sound]');
  if (!soundButton) return;
  const action = soundButton.dataset.sound;
  if (action === 'playing') playSound();
  else if (action === 'paused') {
    audio.pause();
    updateSound('paused');
  } else stopSound();
});

page.addEventListener('click', (event) => {
  const reveal = event.target.closest('#reveal');
  if (reveal) {
    const prompt = document.querySelector('#prompt');
    const previous = Number(prompt.dataset.index ?? -1);
    const remaining = prompts.length - Number(previous >= 0);
    const draw = Math.floor(Math.random() * remaining);
    const index = previous >= 0 && draw >= previous ? draw + 1 : draw;
    const [title, description] = prompts[index];
    prompt.dataset.index = index;
    prompt.innerHTML = `<div class="note-paper"><h3>${title}</h3><p>${description}</p></div>`;
    reveal.innerHTML = 'Give me another <span aria-hidden="true">→</span>';
  }
});

audio?.addEventListener('error', () => {
  if (audio.error) stopSound(true);
});
audio?.addEventListener('pause', () => {
  if (sound === 'playing' && audio.paused) updateSound('paused');
});
audio?.addEventListener('ended', () => stopSound());

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('hashchange', () => render(true));
if (audio) window.addEventListener('pagehide', () => stopSound());
render(false);
