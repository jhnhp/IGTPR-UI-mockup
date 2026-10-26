/**
 * IGTPR Mockup UI - Layout Bersama (dipakai semua halaman)
 *
 * Merender sidebar, header (notifikasi + ganti role), banner role, dan footer
 * ke dalam placeholder berikut di setiap halaman:
 *   <div id="app-sidebar"></div>   <div id="app-header"></div>
 *   <div id="app-role-banner"></div>   <div id="app-footer"></div>
 *
 * Judul header diambil dari atribut <body data-title="...">.
 * Halaman dapat bereaksi terhadap pergantian role dengan mendaftarkan
 *   IGT.onRoleChange = function(role) { ... };
 * Role aktif disimpan di localStorage agar tetap sama saat pindah halaman.
 */

var IGT = window.IGT || {};
window.IGT = IGT;

var ROLE_STORAGE_KEY = 'igtpr-mockup-role';
var currentActiveRole = 'superadmin';
window.ROLE_LOCK_PROVINCE = null;
window.ROLE_LOCK_KABUPATEN = null;
window.ROLE_LOCK_DIREKTORAT = null;

/* ----------------------------------------------------
   1b. Role Switcher Simulation System
---------------------------------------------------- */
var ROLE_CONFIG = {
    'superadmin': {
        name: 'Admin ATR/BPN',
        roleTitle: 'Superadministrator',
        badgeText: 'Superadmin (Pusat)',
        badgeClass: 'bg-primary',
        desc: 'Akses penuh seluruh data nasional (38 provinsi) dan semua modul.',
        lockText: 'Akses Terbuka',
        alertBarClass: '',
        avatar: 'assets/img/profile.png'
    },
    'sppr': {
        name: 'Admin Ditjen SPPR',
        roleTitle: 'Admin Direktorat SPPR',
        badgeText: 'Admin Ditjen SPPR',
        badgeClass: 'bg-info text-white',
        desc: 'Akses Admin: Data di dashboard otomatis terfilter khusus tema dan direktorat pengampu di lingkungan Ditjen SPPR.',
        lockText: 'Filter SPPR Aktif',
        alertBarClass: 'is-sppr',
        avatar: 'assets/img/profile.png'
    },
    'kanwil-diy': {
        name: 'Admin Kanwil DIY',
        roleTitle: 'Admin Kanwil BPN D.I. Yogyakarta',
        badgeText: 'Admin Kanwil DIY',
        badgeClass: 'bg-warning text-dark',
        desc: 'Akses Admin: Otomatis terfilter lokasi D.I. Yogyakarta. Terkunci dan tidak dapat melihat data wilayah provinsi lain.',
        lockText: 'Wilayah Terkunci (DIY)',
        alertBarClass: 'is-kanwil',
        avatar: 'assets/img/profile.png'
    },
    'kantah-gunungkidul': {
        name: 'Admin Kantah GK',
        roleTitle: 'Admin Kantah Kab. Gunungkidul',
        badgeText: 'Admin Kantah Gunungkidul',
        badgeClass: 'bg-success text-white',
        desc: 'Akses Admin: Otomatis terfilter lokasi Kab. Gunungkidul. Terkunci dan tidak dapat melihat data wilayah lain.',
        lockText: 'Wilayah Terkunci (Gunungkidul)',
        alertBarClass: 'is-kantah',
        avatar: 'assets/img/profile.png'
    },
    'operator': {
        name: 'Direktorat ATR/BPN',
        roleTitle: 'Operator',
        badgeText: 'Operator',
        badgeClass: 'bg-secondary text-white',
        desc: 'Akses Operator: Dashboard menampilkan peta, Data Saya (status unggahan IGT & derivatif), dan Statistik IGT.',
        lockText: 'Data Milik Sendiri',
        alertBarClass: 'is-operator',
        avatar: 'assets/img/profile.png'
    },
    'umum': {
        name: 'Pengguna Umum',
        roleTitle: 'Umum',
        badgeText: 'Umum',
        badgeClass: 'bg-dark text-white',
        desc: 'Akses Umum: Dashboard menampilkan peta, Data Saya (status unggahan derivatif), dan Statistik IGT.',
        lockText: 'Data Milik Sendiri',
        alertBarClass: 'is-umum',
        avatar: 'assets/img/profile.png'
    }
};


// [role, ikon, judul, keterangan] untuk menu Ganti Role di tombol user
var ROLE_PILIHAN = [
    ['superadmin', 'ri-shield-keyhole-line', 'Superadmin', 'Pusat • Full Access'],
    ['sppr', 'ri-compass-3-line', 'Admin Direktorat SPPR', 'Admin Ditjen SPPR'],
    ['kanwil-diy', 'ri-map-pin-user-line', 'Admin Kanwil DIY', 'Admin Kanwil'],
    ['kantah-gunungkidul', 'ri-building-line', 'Admin Kantah Gunung Kidul', 'Admin Kantah'],
    ['operator', 'ri-user-line', 'Operator', 'Operator Direktorat'],
    ['umum', 'ri-team-line', 'Umum', 'Pengguna Umum']
];

function showRoleAccessToast(message) {
    $('.igt-role-toast').remove();
    var toastHtml = '<div class="igt-role-toast">'
        + '<i class="ri-lock-fill text-warning" style="font-size: 16px;"></i>'
        + '<span>' + message + '</span>'
        + '</div>';
    $('body').append(toastHtml);
    setTimeout(function() {
        $('.igt-role-toast').fadeOut(300, function() { $(this).remove(); });
    }, 3200);
}

function updateSidebarProfile(role) {
    var cfg = ROLE_CONFIG[role] || ROLE_CONFIG['superadmin'];
    $('#sidebar-user-name, #topbar-user-name').text(cfg.name);
    $('#sidebar-user-role, #topbar-user-role').text(cfg.roleTitle);
    if (cfg.avatar) {
        $('#sidebar-user-avatar, #topbar-user-avatar').attr('src', cfg.avatar);
    }
}

function updateRoleAlertBanner(role) {
    var $bar = $('#igt-role-alert-bar');
    if (role === 'superadmin') {
        $bar.slideUp(200);
        return;
    }
    var cfg = ROLE_CONFIG[role] || ROLE_CONFIG['superadmin'];
    $bar.removeClass('is-sppr is-kanwil is-kantah is-operator is-umum').addClass(cfg.alertBarClass);
    $('#igt-role-alert-badge').text(cfg.badgeText).attr('class', 'badge ' + cfg.badgeClass);
    $('#igt-role-alert-desc').text(cfg.desc);
    $('#igt-role-alert-lock-text').text(cfg.lockText);
    $bar.slideDown(250);
}

/* ----------------------------------------------------
   1c. Sidebar Navigasi per Role
---------------------------------------------------- */
// Susunan mengikuti Examples/Usulan-Navbar.png
var NAV_DASHBOARD_ADMIN = { label: 'Dashboard', items: [['ri-bar-chart-2-line', 'Dashboard', 'index.html']] };
var NAV_DATA_IGT = { label: 'Data IGT', items: [
    ['ri-folder-line', 'Kompilasi Data', 'kompilasi-data.html'],
    ['ri-building-2-line', 'Integrasi Data', 'integrasi-data.html'],
    ['ri-map-2-line', 'Peta IGT'],
    ['ri-group-line', 'Self Assessment']
] };
var NAV_DERIVATIF_ADMIN = [
    ['ri-list-check', 'List Data Derivatif'],
    ['ri-upload-cloud-2-line', 'Unggah Data Derivatif', 'unggah-derivatif.html'],
    ['ri-checkbox-circle-line', 'Verifikasi Derivatif']
];
var NAV_PER_ROLE = {
    'superadmin': [
        NAV_DASHBOARD_ADMIN,
        NAV_DATA_IGT,
        { label: 'Master Data IGT', items: [
            ['ri-user-star-line', 'Ketua Tim'],
            ['ri-stack-line', 'Layer IGT'],
            ['ri-database-2-line', 'Atribut Data'],
            ['ri-file-list-3-line', 'Metadata'],
            ['ri-focus-3-line', 'Target Data IGT Master'],
            ['ri-map-pin-line', 'Baseline'],
            ['ri-file-text-line', 'Data Lainnya']
        ] },
        { label: 'Data Derivatif', items: NAV_DERIVATIF_ADMIN.concat([
            ['ri-stack-line', 'Layer Derivatif'],
            ['ri-database-2-line', 'Atribut Layer Derivatif']
        ]) },
        { label: 'Style Peta', items: [
            ['ri-palette-line', 'SLD'],
            ['ri-palette-line', 'SLD Derivatif'],
            ['ri-image-line', 'Symbology']
        ] },
        { label: 'Analisis & Layanan', items: [
            ['ri-stack-fill', 'Tumpang Susun'],
            ['ri-node-tree', 'Model Builder QGIS'],
            ['ri-global-line', 'Web Service']
        ] },
        { label: 'Pengguna & Akses', items: [
            ['ri-user-settings-line', 'User Management'],
            ['ri-shield-keyhole-line', 'Role Management'],
            ['ri-shield-user-line', 'Direktorat']
        ] },
        { label: 'Konten Portal', items: [['ri-home-gear-line', 'CMS Landing Page', null, true]] }
    ],
    'operator': [
        NAV_DASHBOARD_ADMIN,
        NAV_DATA_IGT,
        { label: 'Data Derivatif', items: [['ri-upload-cloud-2-line', 'Unggah Data Derivatif', 'unggah-derivatif.html']] }
    ],
    'umum': [
        NAV_DASHBOARD_ADMIN,
        { label: 'Data IGT', items: [
            ['ri-map-2-line', 'Peta IGT'],
            ['ri-group-line', 'Self Assessment']
        ] },
        { label: 'Data Derivatif', items: [['ri-upload-cloud-2-line', 'Unggah Data Derivatif', 'unggah-derivatif.html']] }
    ]
};
NAV_PER_ROLE['sppr'] = NAV_PER_ROLE['kanwil-diy'] = NAV_PER_ROLE['kantah-gunungkidul'] = [
    NAV_DASHBOARD_ADMIN,
    NAV_DATA_IGT,
    { label: 'Data Derivatif', items: NAV_DERIVATIF_ADMIN }
];

// item: [ikon, label, href halaman (opsional, default '#'), punya submenu (opsional)]
// Menu aktif = item yang href-nya sama dengan nama file halaman saat ini.
function renderSidebarNav(role) {
    var grup = NAV_PER_ROLE[role] || NAV_PER_ROLE['superadmin'];
    var halaman = (location.pathname.split('/').pop() || 'index.html');
    var html = grup.map(function(g) {
        return '<div class="igt-nav__grup"><div class="igt-nav__label">' + g.label + ' <i class="ri-arrow-down-s-line"></i></div>'
            + g.items.map(function(it) {
                var href = it[2] || '#';
                var aktif = href === halaman ? ' is-active' : '';
                return '<a href="' + href + '" class="igt-nav__item' + aktif + '"><i class="' + it[0] + '"></i> ' + it[1]
                    + (it[3] ? '<i class="ri-arrow-right-s-line igt-nav__sub"></i>' : '') + '</a>';
            }).join('')
            + '</div>';
    }).join('');
    $('#igt-nav').html(html);
}

/* ----------------------------------------------------
   1. Sidebar & Mobile Toggle
---------------------------------------------------- */
function initSidebar() {
    $('#menuSidebar').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-show');
    });

    $(document).on('click', function(e) {
        if ($(window).width() < 992) {
            if (!$(e.target).closest('.sidebar, #menuSidebar').length) {
                $('body').removeClass('sidebar-show');
            }
        }
    });

    $('.nav-sidebar .nav-item').on('click', function() {
        $('.nav-sidebar .nav-link').removeClass('active');
        $(this).children('.nav-link').addClass('active');
    });

    $('#sidebarFooterMenu').on('click', function(e) {
        e.preventDefault();
        $('.sidebar-footer-menu').slideToggle(200);
    });
}

/* ----------------------------------------------------
   1d. Template Layout
---------------------------------------------------- */
function templateSidebar() {
    return '<div class="sidebar">'
        + '<div class="sidebar-header">'
        + '<a href="index.html" class="sidebar-logo igt-logo"><img src="assets/img/geoportalLogo.png" alt="Logo" width="40"><span>Geoportal IGT-PR</span></a>'
        + '</div>'
        + '<div id="sidebarMenu" class="sidebar-body"><nav class="igt-nav" id="igt-nav"></nav></div>'
        + '<div class="sidebar-footer">'
        + '<div class="sidebar-footer-top">'
        + '<div class="sidebar-footer-thumb"><img id="sidebar-user-avatar" src="assets/img/profile.png" alt="Avatar"></div>'
        + '<div class="sidebar-footer-body"><h6><a href="#" id="sidebar-user-name">Admin ATR/BPN</a></h6><p id="sidebar-user-role">Superadministrator</p></div>'
        + '<a id="sidebarFooterMenu" href="#" class="dropdown-link"><i class="ri-arrow-down-s-line"></i></a>'
        + '</div>'
        + '<div class="sidebar-footer-menu" style="display: none;"><nav class="nav">'
        + '<a href="javascript:void(0)" id="sidebar-reset-role"><i class="ri-restart-line"></i> Reset ke Superadmin</a>'
        + '<a href="javascript:void(0)"><i class="ri-logout-box-r-line"></i> Log Out</a>'
        + '</nav></div>'
        + '</div>'
        + '</div>';
}

function templateHeader(judul) {
    var opsi = ROLE_PILIHAN.map(function(r) {
        return '<a href="#" class="igt-role-opsi" data-role="' + r[0] + '"><i class="' + r[1] + ' igt-role-opsi__ikon"></i>'
            + '<span><strong>' + r[2] + '</strong><small>' + r[3] + '</small></span><i class="ri-check-line igt-role-opsi__cek"></i></a>';
    }).join('');
    return '<div class="header-main px-3 px-lg-4">'
        + '<a id="menuSidebar" href="#" class="menu-link me-3 me-lg-4"><i class="ri-menu-2-fill"></i></a>'
        + '<div class="me-auto d-flex align-items-center"><h4 class="igt-header-judul mb-0 fw-bold text-dark d-none d-md-block">' + judul + '</h4></div>'
        + '<div class="dropdown dropdown-notification ms-3 ms-xl-4 position-relative">'
        + '<a href="#" class="dropdown-link position-relative" data-bs-toggle="dropdown" data-bs-auto-close="outside">'
        + '<i class="ri-notification-3-line igt-header-ikon"></i><span class="badge bg-primary rounded-pill position-absolute igt-header-badge">10</span></a>'
        + '<div class="dropdown-menu dropdown-menu-end mt-2">'
        + '<div class="dropdown-menu-header p-3 border-bottom"><h6 class="dropdown-menu-title mb-0 fw-bold">Notifikasi</h6></div>'
        + '<ul class="list-group list-group-flush" id="notif"><li class="list-group-item p-3 text-muted small">10 notifikasi baru pada sistem.</li></ul>'
        + '</div></div>'
        + '<div class="dropdown dropdown-profile ms-3 ms-xl-4">'
        + '<a href="#" class="dropdown-link" data-bs-toggle="dropdown" data-bs-auto-close="outside"><div class="avatar online"><img id="topbar-user-avatar" src="assets/img/profile.png" alt="Avatar"></div></a>'
        + '<div class="dropdown-menu dropdown-menu-end mt-2 p-3 igt-profile-menu">'
        + '<h6 class="mb-1 text-dark fw-semibold" id="topbar-user-name">Admin ATR/BPN</h6>'
        + '<p class="text-muted small mb-2" id="topbar-user-role">Administrator</p>'
        + '<div class="border-top pt-2 pb-2"><div class="igt-role-opsi__label">Ganti Role (Simulasi)</div>' + opsi + '</div>'
        + '<div class="border-top pt-2"><a href="javascript:void(0)" class="text-danger text-decoration-none small"><i class="ri-logout-box-r-line"></i> Log Out</a></div>'
        + '</div></div>'
        + '</div>';
}

function templateRoleBanner() {
    return '<div class="igt-role-alert-bar mb-3" id="igt-role-alert-bar" style="display: none;">'
        + '<div class="d-flex align-items-center gap-2 flex-wrap">'
        + '<i class="ri-shield-user-fill text-primary igt-role-alert-ikon"></i>'
        + '<span class="fw-bold text-dark igt-role-alert-judul">Role Aktif:</span>'
        + '<span class="badge bg-primary" id="igt-role-alert-badge">Superadmin</span>'
        + '<span class="text-secondary small" id="igt-role-alert-desc">Akses penuh seluruh data nasional</span>'
        + '</div>'
        + '<div class="d-flex align-items-center gap-2">'
        + '<span class="badge bg-light text-secondary border d-none d-sm-inline-flex align-items-center gap-1" id="igt-role-alert-lock-badge"><i class="ri-lock-line"></i> <span id="igt-role-alert-lock-text">Wilayah Terkunci</span></span>'
        + '<button type="button" class="btn btn-sm btn-outline-primary py-1 px-2.5 igt-role-alert-reset" id="igt-role-reset-top-btn"><i class="ri-restart-line me-1"></i> Kembali ke Superadmin</button>'
        + '</div>'
        + '</div>';
}

function templateFooter() {
    return '<div class="main-footer"><span>&copy; 2023 All Rights Reserved.</span><span>Created by: <a href="#">IGT ATR/BPN</a></span></div>';
}

/* ----------------------------------------------------
   1e. Role Aktif (dipakai lintas halaman)
---------------------------------------------------- */
function bacaRoleTersimpan() {
    try {
        var r = localStorage.getItem(ROLE_STORAGE_KEY);
        return ROLE_CONFIG[r] ? r : 'superadmin';
    } catch (e) {
        return 'superadmin';
    }
}

function simpanRole(role) {
    try { localStorage.setItem(ROLE_STORAGE_KEY, role); } catch (e) {}
}

// Perbarui seluruh elemen layout untuk role, lalu beri tahu halaman
function switchDashboardRole(role) {
    if (!ROLE_CONFIG[role]) role = 'superadmin';
    currentActiveRole = role;
    simpanRole(role);

    $('.igt-role-opsi').removeClass('is-active');
    $('.igt-role-opsi[data-role="' + role + '"]').addClass('is-active');
    renderSidebarNav(role);
    updateSidebarProfile(role);
    updateRoleAlertBanner(role);

    if (typeof IGT.onRoleChange === 'function') IGT.onRoleChange(role);
}

function initRoleSwitcher() {
    $(document).on('click', '.igt-nav__label', function() {
        $(this).closest('.igt-nav__grup').toggleClass('is-tutup');
    });
    // Menu tanpa halaman tujuan hanya diberi penanda aktif
    $(document).on('click', '.igt-nav__item[href="#"]', function(e) {
        e.preventDefault();
        $('.igt-nav__item').removeClass('is-active');
        $(this).addClass('is-active');
    });
    $(document).on('click', '.igt-role-opsi', function(e) {
        e.preventDefault();
        switchDashboardRole($(this).attr('data-role'));
    });
    $(document).on('click', '#igt-role-reset-top-btn, #sidebar-reset-role', function(e) {
        e.preventDefault();
        switchDashboardRole('superadmin');
    });
}

/* ----------------------------------------------------
   1f. Render Layout (langsung saat script dimuat)
---------------------------------------------------- */
(function renderLayout() {
    var judul = document.body.getAttribute('data-title') || 'Dashboard';
    $('#app-sidebar').replaceWith(templateSidebar());
    $('#app-header').replaceWith(templateHeader(judul));
    $('#app-role-banner').replaceWith(templateRoleBanner());
    $('#app-footer').replaceWith(templateFooter());

    // Tampilkan role tersimpan tanpa memanggil logika halaman (halaman yang menerapkannya saat siap)
    currentActiveRole = bacaRoleTersimpan();
    $('.igt-role-opsi[data-role="' + currentActiveRole + '"]').addClass('is-active');
    renderSidebarNav(currentActiveRole);
    updateSidebarProfile(currentActiveRole);
    if (currentActiveRole !== 'superadmin') updateRoleAlertBanner(currentActiveRole);

    initSidebar();
    initRoleSwitcher();
})();
