document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll
  document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Chat widget
  const openBtn = document.getElementById("open-chat");
  const chatBox = document.getElementById("chat-box");
  const closeBtn = document.getElementById("close-chat");
  const chatBody = document.getElementById("chat-body");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  if (openBtn && chatBox) {
    openBtn.addEventListener('click', () => {
      chatBox.classList.toggle('hidden');
      const exp = openBtn.getAttribute('aria-expanded') === 'true';
      openBtn.setAttribute('aria-expanded', String(!exp));
    });
  }

  if (closeBtn && chatBox) {
    closeBtn.addEventListener('click', () => {
      chatBox.classList.add('hidden');
      openBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // FAQ answers
  const faqs = [
    { keys: ['skills','skill','technologies','tech stack'], answer: "Active Directory, RHEL8, Bash, Python, JavaScript, DNS/DHCP/VLANs." },
    { keys: ['availability','available','hiring','hire'], answer: "I'm open to internships and early-career roles. Email jerellsmith02@gmail.com to discuss." },
    { keys: ['projects','github','repos'], answer: "See the Projects section for summaries. Message me and I will share repo links." },
    { keys: ['education','school','degree'], answer: "B.S. Computer Technology, Bowie State University (Expected May 2026)." },
    { keys: ['certification','ccna','mta'], answer: "I hold MTA and foundational Cisco certifications and am pursuing further credentials." },
    { keys: ['contact','email','phone'], answer: "You can email me at jerellsmith02@gmail.com or call at (240) 353-4873." },
    { keys: ['resume','cv'], answer: "You can view or download my resume in the Resume section." },
    { keys: ['linkedin','profile','network'], answer: "Check out my LinkedIn profile at http://www.linkedin.com/in/jerell-smith." },
    { keys: ['projects details','project','example project'], answer: "I have projects including an Ransomware Detection ML Model, LDAP server setup, and RHEL 8 Kickstart automation." },
    { keys: ['hobbies','interests','outside'], answer: "I enjoy exploring computer hardware, assembling/disassembling systems, and learning about cybersecurity and automation." },
    { keys: ['languages','coding','programming'], answer: "I code in Python, Bash, and JavaScript, with experience in automation scripts, ML projects, and Linux administration." },
    { keys: ['portfolio','website','this site'], answer: "You can explore my portfolio here, including projects, resume, and contact options." },
    { keys: ['linkedin help','how to connect'], answer: "You can connect via LinkedIn or send me an email to start a conversation." },
    { keys: ['questions about me','about you'], answer: "I'm Jerell Smith, a Computer Technology student passionate about networks, Linux, automation, and cybersecurity." }
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

  if (chatForm) {
    chatForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const txt = chatInput.value.trim();
      if (!txt) return;
      postMessage(txt, 'user-message');
      const ans = findAnswer(txt);
      setTimeout(() => {
        postMessage(ans ? ans : "I'm still learning — please email me at jerellsmith02@gmail.com.");
      }, 350);
      chatInput.value = '';
    });
  }

  // Contact form fallback
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
