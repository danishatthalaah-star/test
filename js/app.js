/**
 * STUDIO KARYA DIGITAL - APPLICATION LOGIC
 * Pure JavaScript (ES6+) for Local Browser & Vercel
 * Includes:
 * 1. CMS Pengaturan Profil & Kontak Saya (Khusus Administrator)
 * 2. Autentikasi Pengguna & Sesi (Admin & User Biasa)
 * 3. Router SPA Halaman Dinamis dengan Route Guard
 * 4. Formulir Kontak, Penyimpanan Pesan Lokal, & Pengunggah Foto
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Profile & Contact CMS Data Management ---
  const PROFILE_STORAGE_KEY = 'karya_custom_profile_data_v2';

  const BASE_FALLBACK_DATA = {
    fullName: "Abby Pratama",
    roleTitle: "Lead Web Architect & Developer",
    brandName: "PORTFOLIOSAYA",
    heroBadge: "Portofolio Pribadi & Pengembang Web",
    heroHeadline: "Membangun Solusi Web yang Efisien, Estetik, & Terarah",
    heroDesc: "Selamat datang di portofolio pribadi saya. Saya berfokus merancang antarmuka web yang intuitif dan berkinerja tinggi menggunakan teknologi standar web terbuka, siap menghadirkan pengalaman digital terbaik bagi setiap pengunjung.",
    aboutTitle: "Mendedikasikan Keahlian untuk Produk Digital Berkualitas",
    aboutBio1: "Saya percaya bahwa sebuah website tidak hanya harus enak dilihat, tetapi juga harus menyenangkan saat digunakan, andal, serta mudah dikelola. Dengan pendekatan semi-formal yang komunikatif, saya berkolaborasi erat untuk menerjemahkan gagasan digital Anda menjadi aplikasi nyata.",
    aboutBio2: "Fokus utama saya terletak pada arsitektur web modern yang bersih, efisiensi penulisan kode HTML dan JavaScript, serta penerapan prinsip estetika terang (light theme) yang jernih dan profesional.",
    skills: ["HTML5 Semantik", "Modern JavaScript", "UI/UX Design", "Light Theme System", "Web Performance", "Vercel Deployment"],
    contactIntro: "Untuk menjaga privasi bersama serta efisiensi penanganan pesan, saya tidak mencantumkan nomor telepon, alamat kantor fisik, maupun alamat surel langsung. Seluruh korespondensi proyek dan kolaborasi dilayani melalui formulir interaktif di bawah ini dan jejaring profesional resmi saya.",
    socialGithub: "@abby-pratama",
    socialLinkedin: "/in/abby-pratama",
    socialDribbble: "@abby-design",
    socialNetwork: "@abby_instagram",
    avatarUrl: "assets/images/team-1.svg"
  };

  const DEFAULT_PROFILE_DATA = (typeof window.PROFILE_CONFIG !== 'undefined' && window.PROFILE_CONFIG)
    ? { ...BASE_FALLBACK_DATA, ...window.PROFILE_CONFIG }
    : BASE_FALLBACK_DATA;

  function getProfileData() {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROFILE_DATA, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error(e);
    }
    return { ...DEFAULT_PROFILE_DATA };
  }

  function saveProfileData(newData) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newData));
    if (typeof window.PROFILE_CONFIG !== 'undefined') {
      window.PROFILE_CONFIG = { ...window.PROFILE_CONFIG, ...newData };
    }
    applyProfileDataToDOM(newData);
  }

  function applyProfileDataToDOM(data) {
    // 1. Navbar & Footer Brand
    const navBrandText = document.getElementById('navBrandText');
    if (navBrandText) {
      navBrandText.innerHTML = `${escapeHtml(data.brandName || 'PORTFOLIO')}<span style="color: var(--primary);">SAYA</span>`;
    }

    // 2. Halaman Utama (Beranda)
    const heroBadgeText = document.getElementById('heroBadgeText');
    if (heroBadgeText) heroBadgeText.textContent = data.heroBadge || 'Portofolio Pribadi';

    const heroHeadlineText = document.getElementById('heroHeadlineText');
    if (heroHeadlineText) {
      heroHeadlineText.innerHTML = `Membangun Solusi Web yang <span class="gradient-text">${escapeHtml(data.heroHeadline || 'Efisien, Estetik, & Terarah')}</span>`;
    }

    const heroDescText = document.getElementById('heroDescText');
    if (heroDescText) heroDescText.textContent = data.heroDesc;

    const heroPhotoName = document.getElementById('heroPhotoName');
    if (heroPhotoName) heroPhotoName.textContent = data.fullName;

    const heroPhotoRole = document.getElementById('heroPhotoRole');
    if (heroPhotoRole) heroPhotoRole.textContent = data.roleTitle;

    // 3. Halaman Profil
    const aboutTitleText = document.getElementById('aboutTitleText');
    if (aboutTitleText) aboutTitleText.textContent = data.aboutTitle;

    const aboutBio1Text = document.getElementById('aboutBio1Text');
    if (aboutBio1Text) aboutBio1Text.textContent = data.aboutBio1;

    const aboutBio2Text = document.getElementById('aboutBio2Text');
    if (aboutBio2Text) aboutBio2Text.textContent = data.aboutBio2;

    const profileCardName = document.getElementById('profileCardName');
    if (profileCardName) profileCardName.textContent = data.fullName;

    const profileCardRole = document.getElementById('profileCardRole');
    if (profileCardRole) profileCardRole.textContent = data.roleTitle;

    const profileCardBio = document.getElementById('profileCardBio');
    if (profileCardBio) profileCardBio.textContent = data.aboutBio1;

    // Skills Pills
    const profileSkillsContainer = document.getElementById('profileSkillsContainer');
    if (profileSkillsContainer && Array.isArray(data.skills)) {
      profileSkillsContainer.innerHTML = data.skills
        .map(skill => `<span class="skill-pill">${escapeHtml(skill)}</span>`)
        .join('');
    }

    // 4. Halaman Kontak
    const contactIntroText = document.getElementById('contactIntroText');
    if (contactIntroText) {
      contactIntroText.innerHTML = `Untuk menjaga privasi bersama serta efisiensi penanganan pesan, saya <strong>tidak mencantumkan nomor telepon, alamat kantor fisik, maupun alamat surel langsung</strong>. ${escapeHtml(data.contactIntro)}`;
    }

    const contactGithubHandle = document.getElementById('contactGithubHandle');
    if (contactGithubHandle) contactGithubHandle.textContent = data.socialGithub;

    const contactLinkedinHandle = document.getElementById('contactLinkedinHandle');
    if (contactLinkedinHandle) contactLinkedinHandle.textContent = data.socialLinkedin;

    const contactDribbbleHandle = document.getElementById('contactDribbbleHandle');
    if (contactDribbbleHandle) contactDribbbleHandle.textContent = data.socialDribbble;

    const contactSocialHandle = document.getElementById('contactSocialHandle');
    if (contactSocialHandle) contactSocialHandle.textContent = data.socialNetwork;
  }

  // Initial render of profile data
  applyProfileDataToDOM(getProfileData());

  // --- 1. Authentication & Session Management ---
  const AUTH_STORAGE_KEY = 'karya_auth_session_v1';
  
  function getAuthUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function setAuthUser(userObj, remember = true) {
    const json = JSON.stringify(userObj);
    if (remember) {
      localStorage.setItem(AUTH_STORAGE_KEY, json);
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, json);
    }
    updateNavAuthUI();
  }

  function clearAuthUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    updateNavAuthUI();
  }

  const navGuestActions = document.getElementById('navGuestActions');
  const navUserActions = document.getElementById('navUserActions');
  const navItemDashboard = document.getElementById('navItemDashboard');
  const navDashboardLink = document.getElementById('navDashboardLink');
  const navDashboardText = document.getElementById('navDashboardText');
  const navUserName = document.getElementById('navUserName');
  const navUserRole = document.getElementById('navUserRole');
  const navUserInitial = document.getElementById('navUserInitial');
  const navUserPill = document.getElementById('navUserPill');
  const btnLogout = document.getElementById('btnLogout');
  const profileAdminShortcutBanner = document.getElementById('profileAdminShortcutBanner');
  const btnQuickEditProfileTrigger = document.getElementById('btnQuickEditProfileTrigger');

  function updateNavAuthUI() {
    const user = getAuthUser();
    const currentProfile = getProfileData();

    if (user) {
      if (navGuestActions) navGuestActions.style.display = 'none';
      if (navUserActions) navUserActions.style.display = 'flex';
      if (navItemDashboard) navItemDashboard.style.display = 'block';

      const displayName = user.role === 'admin' 
        ? (currentProfile.fullName || 'Administrator') 
        : (user.name || user.username);

      if (navUserName) navUserName.textContent = displayName;
      const savedAv = getSavedAvatar();
      if (navUserInitial) {
        if (savedAv && savedAv !== DEFAULT_AVATAR) {
          navUserInitial.innerHTML = `<img src="${savedAv}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
          navUserInitial.style.padding = '0';
          navUserInitial.style.overflow = 'hidden';
        } else {
          navUserInitial.textContent = displayName.charAt(0).toUpperCase();
          navUserInitial.style.padding = '';
          navUserInitial.style.overflow = '';
        }
      }

      if (user.role === 'admin') {
        if (navUserRole) {
          navUserRole.textContent = 'Admin';
          navUserRole.className = 'role-badge role-admin';
        }
        if (navDashboardText) navDashboardText.textContent = 'Dashboard Admin';
        if (navDashboardLink) {
          navDashboardLink.setAttribute('data-target', 'page-admin-dashboard');
          navDashboardLink.setAttribute('data-navigate', 'page-admin-dashboard');
        }
        if (navUserPill) {
          navUserPill.onclick = () => navigateTo('page-admin-dashboard');
        }

        // Show Admin Shortcut on Profile Page
        if (profileAdminShortcutBanner) profileAdminShortcutBanner.style.display = 'flex';
        if (btnQuickEditProfileTrigger) btnQuickEditProfileTrigger.style.display = 'inline-flex';
      } else {
        if (navUserRole) {
          navUserRole.textContent = 'User';
          navUserRole.className = 'role-badge role-user';
        }
        if (navDashboardText) navDashboardText.textContent = 'Area Pengguna';
        if (navDashboardLink) {
          navDashboardLink.setAttribute('data-target', 'page-user-dashboard');
          navDashboardLink.setAttribute('data-navigate', 'page-user-dashboard');
        }
        if (navUserPill) {
          navUserPill.onclick = () => navigateTo('page-user-dashboard');
        }

        if (profileAdminShortcutBanner) profileAdminShortcutBanner.style.display = 'none';
        if (btnQuickEditProfileTrigger) btnQuickEditProfileTrigger.style.display = 'none';
      }
    } else {
      if (navGuestActions) navGuestActions.style.display = 'flex';
      if (navUserActions) navUserActions.style.display = 'none';
      if (navItemDashboard) navItemDashboard.style.display = 'none';
      if (navUserPill) navUserPill.onclick = null;
      if (profileAdminShortcutBanner) profileAdminShortcutBanner.style.display = 'none';
      if (btnQuickEditProfileTrigger) btnQuickEditProfileTrigger.style.display = 'none';
    }
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      clearAuthUser();
      navigateTo('page-home');
      showToast('Sesi Berakhir', 'Anda telah berhasil keluar dari akun.', 'info');
    });
  }

  // Quick jump from profile to Admin CMS
  const btnGoToCmsFromProfile = document.getElementById('btnGoToCmsFromProfile');
  if (btnGoToCmsFromProfile) {
    btnGoToCmsFromProfile.addEventListener('click', () => {
      navigateTo('page-admin-dashboard');
      const cmsCard = document.getElementById('cmsEditorCard');
      if (cmsCard) {
        cmsCard.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnQuickEditProfileTrigger) {
    btnQuickEditProfileTrigger.addEventListener('click', () => {
      navigateTo('page-admin-dashboard');
      const cmsCard = document.getElementById('cmsEditorCard');
      if (cmsCard) {
        cmsCard.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 2. Router & Page Navigation Controller ---
  const navLinks = document.querySelectorAll('.nav-link');
  const pageViews = document.querySelectorAll('.page-view');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const siteHeader = document.querySelector('.site-header');

  function navigateTo(pageId, updateHash = true) {
    const user = getAuthUser();

    // Route Protection
    if (pageId === 'page-admin-dashboard') {
      if (!user || user.role !== 'admin') {
        showToast('Akses Terbatas', 'Silakan masuk sebagai Administrator untuk membuka panel ini.', 'info');
        pageId = 'page-login';
        setLoginRoleTab('admin');
      }
    }

    if (pageId === 'page-user-dashboard') {
      if (!user) {
        showToast('Akses Terbatas', 'Silakan masuk terlebih dahulu untuk membuka area pengguna.', 'info');
        pageId = 'page-login';
        setLoginRoleTab('user');
      }
    }

    pageViews.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    navLinks.forEach(link => {
      if (link.getAttribute('data-target') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (navLinksContainer) {
      navLinksContainer.classList.remove('open');
    }

    if (updateHash) {
      const hashName = pageId.replace('page-', '');
      history.pushState(null, null, `#${hashName}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'page-admin-dashboard') {
      renderAdminDashboard();
      populateCmsForm();
    } else if (pageId === 'page-user-dashboard') {
      renderUserDashboard();
    }
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-navigate]');
    if (trigger) {
      e.preventDefault();
      const targetPageId = trigger.getAttribute('data-navigate');
      navigateTo(targetPageId);
    }
  });

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  function handleInitialRoute() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validRoutes = {
      'beranda': 'page-home',
      'home': 'page-home',
      'profil': 'page-profile',
      'profile': 'page-profile',
      'kontak': 'page-contact',
      'contact': 'page-contact',
      'masuk': 'page-login',
      'login': 'page-login',
      'admin': 'page-admin-dashboard',
      'dashboard-admin': 'page-admin-dashboard',
      'user': 'page-user-dashboard',
      'dashboard-user': 'page-user-dashboard'
    };

    if (hash && validRoutes[hash]) {
      navigateTo(validRoutes[hash], false);
    } else {
      navigateTo('page-home', false);
    }
  }

  window.addEventListener('popstate', handleInitialRoute);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // --- 3. Login Page Logic ---
  const roleTabUser = document.getElementById('roleTabUser');
  const roleTabAdmin = document.getElementById('roleTabAdmin');
  const loginRoleInput = document.getElementById('loginRole');
  const roleHintBadge = document.getElementById('roleHintBadge');
  const loginUsernameInput = document.getElementById('loginUsername');
  const loginPasswordInput = document.getElementById('loginPassword');
  const togglePasswordVisibility = document.getElementById('togglePasswordVisibility');
  const eyeIcon = document.getElementById('eyeIcon');
  const loginForm = document.getElementById('loginForm');
  const rememberMeCheck = document.getElementById('rememberMeCheck');

  const btnQuickDemoAdmin = document.getElementById('btnQuickDemoAdmin');
  const btnQuickDemoUser = document.getElementById('btnQuickDemoUser');

  function setLoginRoleTab(role) {
    if (role === 'admin') {
      if (roleTabAdmin) roleTabAdmin.classList.add('active');
      if (roleTabUser) roleTabUser.classList.remove('active');
      if (loginRoleInput) loginRoleInput.value = 'admin';
      if (roleHintBadge) {
        roleHintBadge.textContent = 'Role: Administrator';
        roleHintBadge.className = 'role-badge role-admin';
      }
      if (loginUsernameInput) loginUsernameInput.placeholder = 'Contoh: admin';
    } else {
      if (roleTabUser) roleTabUser.classList.add('active');
      if (roleTabAdmin) roleTabAdmin.classList.remove('active');
      if (loginRoleInput) loginRoleInput.value = 'user';
      if (roleHintBadge) {
        roleHintBadge.textContent = 'Role: User Biasa';
        roleHintBadge.className = 'role-badge role-user';
      }
      if (loginUsernameInput) loginUsernameInput.placeholder = 'Contoh: user';
    }
  }

  if (roleTabUser) roleTabUser.addEventListener('click', () => setLoginRoleTab('user'));
  if (roleTabAdmin) roleTabAdmin.addEventListener('click', () => setLoginRoleTab('admin'));

  if (togglePasswordVisibility && loginPasswordInput && eyeIcon) {
    togglePasswordVisibility.addEventListener('click', () => {
      const isPassword = loginPasswordInput.type === 'password';
      loginPasswordInput.type = isPassword ? 'text' : 'password';
      eyeIcon.innerHTML = isPassword 
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    });
  }

  function executeLogin(username, password, role, remember) {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();
    const currentProfile = getProfileData();

    if (role === 'admin') {
      if (cleanUsername === 'admin' && cleanPassword === 'admin123') {
        const userObj = {
          username: 'admin',
          name: currentProfile.fullName || 'Administrator',
          role: 'admin'
        };
        setAuthUser(userObj, remember);
        showToast('Login Berhasil', 'Selamat datang di Panel Kendali Administrator.', 'success');
        navigateTo('page-admin-dashboard');
        return true;
      } else {
        showToast('Kredensial Admin Salah', 'Gunakan Nama Pengguna: admin dan Kata Sandi: admin123', 'info');
        return false;
      }
    } else {
      if (cleanPassword === 'user123' || (cleanUsername === 'user' && cleanPassword === 'user123')) {
        const displayName = cleanUsername === 'user' ? 'Pengguna Terdaftar' : username.trim();
        const userObj = {
          username: cleanUsername,
          name: displayName,
          role: 'user'
        };
        setAuthUser(userObj, remember);
        showToast('Login Berhasil', `Selamat datang kembali, ${displayName}.`, 'success');
        navigateTo('page-user-dashboard');
        return true;
      } else {
        showToast('Kredensial User Salah', 'Gunakan Nama Pengguna: user dan Kata Sandi: user123', 'info');
        return false;
      }
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = loginRoleInput ? loginRoleInput.value : 'user';
      const username = loginUsernameInput.value;
      const password = loginPasswordInput.value;
      const remember = rememberMeCheck ? rememberMeCheck.checked : true;
      executeLogin(username, password, role, remember);
    });
  }

  if (btnQuickDemoAdmin) {
    btnQuickDemoAdmin.addEventListener('click', () => {
      setLoginRoleTab('admin');
      if (loginUsernameInput) loginUsernameInput.value = 'admin';
      if (loginPasswordInput) loginPasswordInput.value = 'admin123';
      executeLogin('admin', 'admin123', 'admin', true);
    });
  }

  if (btnQuickDemoUser) {
    btnQuickDemoUser.addEventListener('click', () => {
      setLoginRoleTab('user');
      if (loginUsernameInput) loginUsernameInput.value = 'user';
      if (loginPasswordInput) loginPasswordInput.value = 'user123';
      executeLogin('user', 'user123', 'user', true);
    });
  }

  // --- 4. CMS (Profil & Kontak) Editor Logic for Admin ---
  const cmsTabs = document.querySelectorAll('.cms-tab-btn');
  const cmsPanes = document.querySelectorAll('.cms-pane');
  const cmsProfileForm = document.getElementById('cmsProfileForm');
  const btnResetCmsDefault = document.getElementById('btnResetCmsDefault');
  const btnPreviewWebAfterSave = document.getElementById('btnPreviewWebAfterSave');
  const cmsSaveIndicator = document.getElementById('cmsSaveIndicator');

  // CMS Tabs Switching
  cmsTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      cmsTabs.forEach(b => b.classList.remove('active'));
      cmsPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPaneId = `pane-${btn.getAttribute('data-cms-tab')}`;
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  function populateCmsForm() {
    const data = getProfileData();
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('cmsFullName', data.fullName);
    setVal('cmsRoleTitle', data.roleTitle);
    setVal('cmsBrandName', data.brandName);
    setVal('cmsHeroBadge', data.heroBadge);
    setVal('cmsHeroHeadline', data.heroHeadline);
    setVal('cmsHeroDesc', data.heroDesc);

    setVal('cmsAboutTitle', data.aboutTitle);
    setVal('cmsAboutBio1', data.aboutBio1);
    setVal('cmsAboutBio2', data.aboutBio2);
    setVal('cmsSkills', Array.isArray(data.skills) ? data.skills.join(', ') : '');

    setVal('cmsContactIntro', data.contactIntro);
    setVal('cmsSocialGithub', data.socialGithub);
    setVal('cmsSocialLinkedin', data.socialLinkedin);
    setVal('cmsSocialDribbble', data.socialDribbble);
    setVal('cmsSocialNetwork', data.socialNetwork);
  }

  if (cmsProfileForm) {
    cmsProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      const rawSkills = getVal('cmsSkills');
      const parsedSkills = rawSkills
        ? rawSkills.split(',').map(s => s.trim()).filter(Boolean)
        : DEFAULT_PROFILE_DATA.skills;

      const updatedProfile = {
        fullName: getVal('cmsFullName') || DEFAULT_PROFILE_DATA.fullName,
        roleTitle: getVal('cmsRoleTitle') || DEFAULT_PROFILE_DATA.roleTitle,
        brandName: getVal('cmsBrandName') || DEFAULT_PROFILE_DATA.brandName,
        heroBadge: getVal('cmsHeroBadge') || DEFAULT_PROFILE_DATA.heroBadge,
        heroHeadline: getVal('cmsHeroHeadline') || DEFAULT_PROFILE_DATA.heroHeadline,
        heroDesc: getVal('cmsHeroDesc') || DEFAULT_PROFILE_DATA.heroDesc,
        aboutTitle: getVal('cmsAboutTitle') || DEFAULT_PROFILE_DATA.aboutTitle,
        aboutBio1: getVal('cmsAboutBio1') || DEFAULT_PROFILE_DATA.aboutBio1,
        aboutBio2: getVal('cmsAboutBio2') || DEFAULT_PROFILE_DATA.aboutBio2,
        skills: parsedSkills,
        contactIntro: getVal('cmsContactIntro') || DEFAULT_PROFILE_DATA.contactIntro,
        socialGithub: getVal('cmsSocialGithub') || DEFAULT_PROFILE_DATA.socialGithub,
        socialLinkedin: getVal('cmsSocialLinkedin') || DEFAULT_PROFILE_DATA.socialLinkedin,
        socialDribbble: getVal('cmsSocialDribbble') || DEFAULT_PROFILE_DATA.socialDribbble,
        socialNetwork: getVal('cmsSocialNetwork') || DEFAULT_PROFILE_DATA.socialNetwork
      };

      saveProfileData(updatedProfile);
      updateNavAuthUI();

      if (cmsSaveIndicator) {
        cmsSaveIndicator.style.display = 'inline-block';
        setTimeout(() => {
          cmsSaveIndicator.style.display = 'none';
        }, 4000);
      }

      showToast('Profil & Kontak Diperbarui', 'Seluruh perubahan nama, biografi, keahlian, dan kontak resmi telah disimpan dan diterapkan.', 'success');
    });
  }

  if (btnResetCmsDefault) {
    btnResetCmsDefault.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin mengembalikan seluruh nama, biografi, dan kontak ke data bawaan?')) {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
        applyProfileDataToDOM(DEFAULT_PROFILE_DATA);
        populateCmsForm();
        updateNavAuthUI();
        showToast('Data Direset', 'Semua data profil dan kontak telah dikembalikan ke standar awal.', 'info');
      }
    });
  }

  if (btnPreviewWebAfterSave) {
    btnPreviewWebAfterSave.addEventListener('click', () => {
      navigateTo('page-home');
      showToast('Pratinjau Beranda', 'Menampilkan hasil pembaruan profil di Halaman Utama.', 'info');
    });
  }

  // Generate downloadable profile-data.js content for Vercel deployment
  function generateProfileConfigCode(data, avatarUrl) {
    const configObj = {
      fullName: data.fullName,
      roleTitle: data.roleTitle,
      brandName: data.brandName,
      heroBadge: data.heroBadge,
      heroHeadline: data.heroHeadline,
      heroDesc: data.heroDesc,
      aboutTitle: data.aboutTitle,
      aboutBio1: data.aboutBio1,
      aboutBio2: data.aboutBio2,
      skills: data.skills,
      contactIntro: data.contactIntro,
      socialGithub: data.socialGithub,
      socialLinkedin: data.socialLinkedin,
      socialDribbble: data.socialDribbble,
      socialInstagram: data.socialNetwork,
      avatarUrl: avatarUrl || data.avatarUrl || "assets/images/team-1.svg"
    };

    return `/**
 * ===================================================================
 * KONFIGURASI DATA PROFIL & KONTAK SAYA (UNTUK PUBLISH VERCEL)
 * ===================================================================
 * File ini dibaca otomatis oleh website saat dibuka secara lokal
 * maupun setelah dipublish ke Vercel.
 */

window.PROFILE_CONFIG = ${JSON.stringify(configObj, null, 2)};
`;
  }

  const btnDownloadProfileConfig = document.getElementById('btnDownloadProfileConfig');
  if (btnDownloadProfileConfig) {
    btnDownloadProfileConfig.addEventListener('click', () => {
      const data = getProfileData();
      const avatar = getSavedAvatar();
      const code = generateProfileConfigCode(data, avatar);

      const blob = new Blob([code], { type: 'application/javascript;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile-data.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('File Berhasil Diunduh', 'Timpa file profile-data.js ini ke dalam folder js/ sebelum di-upload ke Vercel!', 'success');
    });
  }

  const btnCopyProfileConfig = document.getElementById('btnCopyProfileConfig');
  if (btnCopyProfileConfig) {
    btnCopyProfileConfig.addEventListener('click', () => {
      const data = getProfileData();
      const avatar = getSavedAvatar();
      const code = generateProfileConfigCode(data, avatar);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          showToast('Kode Disalin', 'Kode konfigurasi berhasil disalin ke clipboard!', 'success');
        }).catch(() => {
          showToast('Info', 'Silakan unduh file secara langsung menggunakan tombol unduh.', 'info');
        });
      } else {
        showToast('Info', 'Silakan unduh file secara langsung menggunakan tombol unduh.', 'info');
      }
    });
  }

  // --- 5. Admin & User Dashboards Logic ---
  const adminTotalMessages = document.getElementById('adminTotalMessages');
  const adminMessagesTbody = document.getElementById('adminMessagesTbody');
  const btnClearAllAdminMessages = document.getElementById('btnClearAllAdminMessages');
  const btnRefreshAdminData = document.getElementById('btnRefreshAdminData');

  const userDashboardName = document.getElementById('userDashboardName');
  const userTotalSent = document.getElementById('userTotalSent');
  const userMessagesList = document.getElementById('userMessagesList');

  const adminMessageDetailModal = document.getElementById('adminMessageDetailModal');
  const modalMsgSender = document.getElementById('modalMsgSender');
  const modalMsgTime = document.getElementById('modalMsgTime');
  const modalMsgSubject = document.getElementById('modalMsgSubject');
  const modalMsgCategory = document.getElementById('modalMsgCategory');
  const modalMsgBody = document.getElementById('modalMsgBody');

  function renderAdminDashboard() {
    const list = loadSavedMessages();
    if (adminTotalMessages) adminTotalMessages.textContent = list.length;

    if (!adminMessagesTbody) return;

    if (list.length === 0) {
      adminMessagesTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2.5rem; color: #94A3B8;">
            <p style="font-size: 1rem; font-weight: 600; color: #64748B; margin-bottom: 0.35rem;">Belum ada pesan yang masuk</p>
            <p style="font-size: 0.85rem;">Pesan yang dikirimkan melalui formulir halaman kontak akan otomatis terdata di tabel ini.</p>
          </td>
        </tr>
      `;
      return;
    }

    adminMessagesTbody.innerHTML = list.map((item, idx) => `
      <tr>
        <td style="font-weight: 600; color: #64748B;">${idx + 1}</td>
        <td>
          <strong style="color: var(--text-main);">${escapeHtml(item.name)}</strong>
        </td>
        <td>
          <span class="tag">${escapeHtml(item.category || 'Umum')}</span>
        </td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${escapeHtml(item.subject)}
        </td>
        <td style="color: #64748B; font-size: 0.85rem;">${item.time}</td>
        <td>
          <div class="action-btn-group">
            <button class="btn btn-secondary btn-sm admin-view-btn" data-index="${idx}" title="Lihat isi lengkap pesan">
              Lihat
            </button>
            <button class="btn btn-secondary btn-sm admin-del-btn" data-index="${idx}" style="color: #EF4444; border-color: #FECACA;" title="Hapus pesan ini">
              Hapus
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    document.querySelectorAll('.admin-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const item = list[idx];
        if (item && adminMessageDetailModal) {
          modalMsgSender.textContent = item.name;
          modalMsgTime.textContent = item.time;
          modalMsgSubject.textContent = item.subject;
          modalMsgCategory.textContent = item.category || 'Konsultasi';
          modalMsgBody.textContent = item.message;
          openModal(adminMessageDetailModal);
        }
      });
    });

    document.querySelectorAll('.admin-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (confirm(`Apakah Anda yakin ingin menghapus pesan dari "${list[idx]?.name}"?`)) {
          deleteMessage(idx);
          renderAdminDashboard();
        }
      });
    });
  }

  if (btnClearAllAdminMessages) {
    btnClearAllAdminMessages.addEventListener('click', () => {
      const list = loadSavedMessages();
      if (list.length === 0) {
        showToast('Info', 'Tidak ada pesan untuk dikosongkan.', 'info');
        return;
      }
      if (confirm('Apakah Anda yakin ingin mengosongkan seluruh riwayat pesan masuk?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderAdminDashboard();
        renderInbox();
        showToast('Sukses', 'Seluruh pesan masuk telah berhasil dikosongkan.', 'success');
      }
    });
  }

  if (btnRefreshAdminData) {
    btnRefreshAdminData.addEventListener('click', () => {
      renderAdminDashboard();
      showToast('Data Diperbarui', 'Tabel data pesan berhasil disegarkan.', 'info');
    });
  }

  function renderUserDashboard() {
    const user = getAuthUser();
    if (user && userDashboardName) {
      userDashboardName.textContent = user.name || user.username;
    }

    const list = loadSavedMessages();
    if (userTotalSent) userTotalSent.textContent = list.length;

    if (!userMessagesList) return;

    if (list.length === 0) {
      userMessagesList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: var(--bg-subtle); border-radius: var(--radius-md);">
          <p style="font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Belum ada riwayat pesan yang Anda kirimkan.</p>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">Gunakan formulir kontak untuk mengirimkan konsultasi atau ide proyek.</p>
          <a href="#kontak" data-navigate="page-contact" class="btn btn-primary btn-sm">Buka Formulir Kontak</a>
        </div>
      `;
      return;
    }

    userMessagesList.innerHTML = list.map((item) => `
      <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; border-left: 4px solid var(--primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <strong style="color: var(--text-main); font-size: 1rem;">${escapeHtml(item.subject)}</strong>
            <span class="tag" style="margin-left: 0.5rem;">${escapeHtml(item.category || 'Konsultasi')}</span>
          </div>
          <span style="font-size: 0.8rem; color: #64748B;">${item.time}</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.5rem;">
          ${escapeHtml(item.message)}
        </p>
        <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: #059669; font-weight: 600;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Status: Tercatat dalam sistem
        </div>
      </div>
    `).join('');
  }

  // --- 6. Portfolio Projects Filter & Modal ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const projectsData = {
    'proj-1': {
      title: 'EduPortal Interaktif',
      category: 'Web App & Edukasi',
      description: 'Platform pembelajaran digital yang dirancang untuk mendukung interaksi belajar mengajar secara mandiri. Dilengkapi dengan modul latihan terstruktur dan visualisasi progres belajar.',
      features: ['Navigasi modul adaptif', 'Pencatat kemajuan mandiri', 'Tampilan responsif ramah layar tablet'],
      tech: ['HTML5', 'Modern CSS', 'JavaScript ES6+', 'Local Storage API']
    },
    'proj-2': {
      title: 'Lumina Design System',
      category: 'UI/UX & Desain',
      description: 'Panduan komponen antarmuka terstandarisasi untuk konsistensi produk digital. Berisi kumpulan token warna, tipografi, grid responsif, dan komponen tombol serta kartu.',
      features: ['Palet warna terkalibrasi', 'Aksesibilitas kontras tinggi', 'Dokumentasi interaktif'],
      tech: ['Figma Tokens', 'CSS Variables', 'Responsive Grid', 'Design Tokens']
    },
    'proj-3': {
      title: 'Analitika Bisnis Ringkas',
      category: 'Dashboard & Visualisasi',
      description: 'Dashboard visualisasi metrik performa operasional yang menyajikan ringkasan indikator utama bisnis secara cepat tanpa beban unduhan pustaka yang berat.',
      features: ['Diagram data SVG ringan', 'Tabel sortir dinamis', 'Ekspor ringkasan data'],
      tech: ['HTML5 Canvas', 'SVG Vector', 'JavaScript DOM', 'Flexbox & Grid']
    },
    'proj-4': {
      title: 'Katalog Produk Sentra',
      category: 'Web App & Portofolio',
      description: 'Aplikasi penjelajah produk lokal interaktif dengan sistem pencarian instan dan penyaring kategori tanpa memuat ulang halaman.',
      features: ['Filter instan real-time', 'Kartu produk interaktif', 'Modal pratinjau cepat'],
      tech: ['Vanilla JS', 'CSS Transitions', 'Structured Data']
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalCategory = document.getElementById('projectModalCategory');
  const projectModalDesc = document.getElementById('projectModalDesc');
  const projectModalFeatures = document.getElementById('projectModalFeatures');
  const projectModalTech = document.getElementById('projectModalTech');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      const data = projectsData[projId];
      if (data && projectModal) {
        projectModalTitle.textContent = data.title;
        projectModalCategory.textContent = data.category;
        projectModalDesc.textContent = data.description;

        projectModalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        projectModalTech.innerHTML = data.tech.map(t => `<span class="tag">${t}</span>`).join('');

        openModal(projectModal);
      }
    });
  });

  // --- 7. Interactive Contact Form & Local Inbox ---
  const contactForm = document.getElementById('contactForm');
  const inboxList = document.getElementById('inboxList');
  const inboxCount = document.getElementById('inboxCount');
  const STORAGE_KEY = 'karya_digital_messages_v1';

  function loadSavedMessages() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function saveMessageToStorage(msg) {
    const list = loadSavedMessages();
    list.unshift(msg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    renderInbox();
  }

  function renderInbox() {
    if (!inboxList || !inboxCount) return;
    const list = loadSavedMessages();
    inboxCount.textContent = list.length;

    if (list.length === 0) {
      inboxList.innerHTML = `
        <div class="inbox-empty">
          <p>Belum ada pesan yang tersimpan di sesi peramban ini.</p>
          <p style="font-size: 0.8rem; margin-top: 0.35rem; color: #94A3B8;">Pesan yang dikirimkan melalui formulir di samping akan tercatat secara lokal di sini.</p>
        </div>
      `;
      return;
    }

    inboxList.innerHTML = list.map((item, idx) => `
      <div class="inbox-item">
        <div class="inbox-item-top">
          <span>${escapeHtml(item.name)} <span style="font-size: 0.75rem; color: #64748B;">(${escapeHtml(item.category)})</span></span>
          <span class="inbox-item-time">${item.time}</span>
        </div>
        <div style="font-weight: 600; font-size: 0.82rem; margin-bottom: 2px; color: #1E293B;">
          ${escapeHtml(item.subject)}
        </div>
        <div class="inbox-item-snippet">
          ${escapeHtml(item.message)}
        </div>
        <div style="text-align: right; margin-top: 6px;">
          <button class="delete-msg-btn" data-index="${idx}" style="background: none; border: none; color: #EF4444; font-size: 0.75rem; cursor: pointer; text-decoration: underline;">Hapus Catatan</button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.delete-msg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        deleteMessage(index);
      });
    });
  }

  function deleteMessage(index) {
    const list = loadSavedMessages();
    list.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    renderInbox();
    showToast('Info', 'Catatan pesan berhasil dihapus dari peramban.', 'info');
  }

  if (contactForm) {
    const senderNameInput = document.getElementById('senderName');
    const user = getAuthUser();
    if (user && senderNameInput && !senderNameInput.value) {
      senderNameInput.value = user.name || user.username;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const categoryInput = document.getElementById('senderCategory');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput.value.trim();
      const category = categoryInput.value;
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !subject || !message) {
        showToast('Peringatan', 'Mohon lengkapi seluruh kolom formulir yang wajib diisi.', 'info');
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2 A 10 10 0 0 1 22 12"></path>
        </svg> Memproses...
      `;

      setTimeout(() => {
        const now = new Date();
        const timeFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ' ' + 
                              now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        saveMessageToStorage({
          name: name,
          category: category,
          subject: subject,
          message: message,
          time: timeFormatted
        });

        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        showToast('Pesan Berhasil Terkirim', `Terima kasih Bapak/Ibu ${name}. Pesan Anda telah saya terima.`, 'success');
      }, 700);
    });
  }

  // --- 8. Profile Photo Management (Upload, URL, & Presets) ---
  const photoModal = document.getElementById('photoModal');
  const photoUploadInput = document.getElementById('photoUploadInput');
  const photoUrlInput = document.getElementById('photoUrlInput');
  const btnApplyPhotoUrl = document.getElementById('btnApplyPhotoUrl');
  const resetPhotoBtn = document.getElementById('resetPhotoBtn');
  const modalPhotoPreview = document.getElementById('modalPhotoPreview');

  const AVATAR_KEY = 'karya_custom_user_avatar_v2';
  const DEFAULT_AVATAR = (typeof window.PROFILE_CONFIG !== 'undefined' && window.PROFILE_CONFIG && window.PROFILE_CONFIG.avatarUrl) 
    ? window.PROFILE_CONFIG.avatarUrl 
    : 'assets/images/team-1.svg';

  function getSavedAvatar() {
    return localStorage.getItem(AVATAR_KEY) || 
           localStorage.getItem('karya_custom_avatar_team-1') || 
           ((typeof window.PROFILE_CONFIG !== 'undefined' && window.PROFILE_CONFIG && window.PROFILE_CONFIG.avatarUrl) ? window.PROFILE_CONFIG.avatarUrl : DEFAULT_AVATAR);
  }

  function applyAvatarToAllElements(avatarUrl) {
    const url = avatarUrl || getSavedAvatar();
    
    // Update all synchronized avatar image elements
    document.querySelectorAll('.user-avatar-sync').forEach(img => {
      img.src = url;
    });

    const heroImg = document.getElementById('avatar-img-hero');
    if (heroImg) heroImg.src = url;

    const profileImg = document.getElementById('avatar-img-team-1');
    if (profileImg) profileImg.src = url;

    if (modalPhotoPreview) modalPhotoPreview.src = url;

    const navInitial = document.getElementById('navUserInitial');
    if (navInitial) {
      if (url && url !== DEFAULT_AVATAR) {
        navInitial.innerHTML = `<img src="${url}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        navInitial.style.padding = '0';
        navInitial.style.overflow = 'hidden';
      } else {
        const user = getAuthUser();
        const currentProfile = getProfileData();
        const displayName = user ? (user.role === 'admin' ? currentProfile.fullName : user.name || user.username) : 'A';
        navInitial.textContent = (displayName || 'A').charAt(0).toUpperCase();
        navInitial.style.padding = '';
        navInitial.style.overflow = '';
      }
    }
  }

  function setSavedAvatar(avatarUrl) {
    localStorage.setItem(AVATAR_KEY, avatarUrl);
    localStorage.setItem('karya_custom_avatar_team-1', avatarUrl);
    applyAvatarToAllElements(avatarUrl);
  }

  // Initial load of avatar
  applyAvatarToAllElements();

  // Open photo modal listeners
  document.querySelectorAll('.change-photo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalPhotoPreview) {
        modalPhotoPreview.src = getSavedAvatar();
      }
      openModal(photoModal);
    });
  });

  // Photo modal tab switching
  const photoTabs = document.querySelectorAll('.photo-tab-btn');
  const photoPanes = document.querySelectorAll('.photo-pane');

  photoTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      photoTabs.forEach(b => b.classList.remove('active'));
      photoPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabKey = btn.getAttribute('data-photo-tab');
      const targetPane = document.getElementById(`pane-photo-${tabKey}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 1. Upload from local file (Laptop / PC / HP)
  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Format Tidak Sesuai', 'Silakan pilih berkas gambar (JPG, PNG, WebP, atau SVG).', 'info');
        return;
      }

      if (file.size > 8 * 1024 * 1024) {
        showToast('Ukuran Terlalu Besar', 'Maksimal ukuran foto adalah 8MB.', 'info');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setSavedAvatar(dataUrl);
        showToast('Foto Berhasil Diperbarui', 'Foto profil Anda berhasil diunggah dan disimpan di peramban.', 'success');
        closeModal(photoModal);
        photoUploadInput.value = '';
      };
      reader.readAsDataURL(file);
    });
  }

  // 2. Apply photo from Web URL
  if (btnApplyPhotoUrl && photoUrlInput) {
    btnApplyPhotoUrl.addEventListener('click', () => {
      const url = photoUrlInput.value.trim();
      if (!url) {
        showToast('Peringatan', 'Silakan masukkan tautan (URL) gambar yang valid.', 'info');
        return;
      }

      // Preload test to verify image URL
      const tempImg = new Image();
      tempImg.onload = () => {
        setSavedAvatar(url);
        showToast('Foto Berhasil Diterapkan', 'Foto profil dari tautan web berhasil disimpan.', 'success');
        closeModal(photoModal);
        photoUrlInput.value = '';
      };
      tempImg.onerror = () => {
        showToast('Gagal Memuat Gambar', 'Tautan gambar tidak dapat diakses atau bukan format gambar valid.', 'info');
      };
      tempImg.src = url;
    });
  }

  // 3. Preset avatar character selection
  document.querySelectorAll('.preset-avatar-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-preset-src');
      if (src) {
        setSavedAvatar(src);
        showToast('Avatar Dipilih', 'Karakter avatar pilihan Anda berhasil diterapkan.', 'success');
        closeModal(photoModal);
      }
    });
  });

  // 4. Reset photo to default
  if (resetPhotoBtn) {
    resetPhotoBtn.addEventListener('click', () => {
      localStorage.removeItem(AVATAR_KEY);
      localStorage.removeItem('karya_custom_avatar_team-1');
      applyAvatarToAllElements(DEFAULT_AVATAR);
      showToast('Foto Direset', 'Foto profil dikembalikan ke gambar standar.', 'info');
      closeModal(photoModal);
    });
  }

  // --- 9. Modal Helpers ---
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // --- 10. Toast Notification System ---
  const toastContainer = document.getElementById('toastContainer');

  function showToast(title, message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${escapeHtml(title)}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 4500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialization
  updateNavAuthUI();
  handleInitialRoute();
  renderInbox();
});
