/* Neon Cyber Tech — Interactivity: nav smooth scroll, chat, contact form
   Lightweight and accessible for CodeHS / GitHub Pages
*/

document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll for in-page nav links
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------------------------
     Chat widget
     --------------------------- */
  const openBtn = document.getElementById("open-chat");
  const chatBox = document.getElementById("chat-box");
  const closeBtn = document.getElementById("close-chat") || document.querySelector(".chat-close");
  const chatBody = document.getElementById("chat-body");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  // ensure elements exist
  if (!openBtn || !chatBody) return;

  // create close button if missing
  if (!closeBtn) {
    const cb = document.createElement('button');
    cb.className = 'chat-close';
    cb.innerText = '✕';
    cb.setAttribute('aria-label', 'Close chat');
    document.querySelector('.chat-header').appendChild(cb);
  }

  // toggles
  openBtn.addEventListener('click', () => {
    const box = document.getElementById('chat-box');
    if (box) box.classList.toggle('hidden');
    const exp = openBtn.getAttribute('aria-expanded') === 'true';
    openBtn.setAttribute('aria-expanded', String(!exp));
  });

  document.querySelectorAll('.chat-close').forEach(b => b.addEventListener('click', () => {
    const box = document.getElementById('chat-box');
    if (box) box.classList.add('hidden');
  }));

  // FAQ answers
  const faqs = [
    { keys: ['skills','skill','technologies','tech stack'], answer: "Active Directory, RHEL8, Bash, Python, JavaScript, DNS/DHCP/VLANs." },
    { keys: ['availability','available','hiring','hire'], answer: "I'm open to internships and early-career roles. Email jerellsmith02@gmail.com to discuss." },
    { keys: ['projects','github','repos'], answer: "See the Projects section for summaries. Message me and I will share repo links." },
    { keys: ['education','school','degree'], answer: "B.S. Computer Technology, Bowie State University (Expected May 2026)." },
    { keys: ['certification','ccna','mta'], answer: "I hold MTA and foundational Cisco certifications and am pursuing further credentials." }
  ];

  function postMessage(text, cls='bot-message') {
    const el = document.createElement('div');
    el.className = cls;
    el.textContent = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function findAnswer(msg) {
    const t = msg.toLowerCase();
    for (const f of faqs) {
      for (const k of f.keys) {
        if (t.includes(k)) return f.answer;
      }
    }
    return null;
  }

  const chatFormEl = document.getElementById('chat-form');
  if (chatFormEl) {
    chatFormEl.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const input = document.getElementById('chat-input');
      const txt = input.value.trim();
      if (!txt) return;
      postMessage(txt, 'user-message');
      const ans = findAnswer(txt);
      setTimeout(() => {
        if (ans) postMessage(ans);
        else postMessage("I'm still learning — please email me at jerellsmith02@gmail.com.");
      }, 350);
      input.value = '';
    });
  }

  /* ---------------------------
     Contact form (mailto fallback)
     --------------------------- */
  window.contactSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
      status.textContent = "Please complete all fields.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n---\n${name}\n${email}`);
    window.location.href = `mailto:jerellsmith02@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = "Opening your mail client...";
  };

});