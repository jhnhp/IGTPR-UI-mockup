/**
 * IGTPR Mockup UI - Beranda: State, inisialisasi halaman & penerapan role
 */

/*
 * Multi-Level Drilldown:
 * Level 1: Seluruh Indonesia (Nasional)
 * Level 2: Tingkat Provinsi (e.g. Jawa Tengah) -> Menampilkan batas kabupaten/kota
 * Level 3: Tingkat Kabupaten/Kota (e.g. Kab. Semarang, Kota Semarang, Banyumas, Karanganyar, Solo)
 */

var INDONESIA_BOUNDS = [[93.0, -12.8], [142.5, 7.5]];
var currentProvince = null;
var currentProvinceFeature = null;
var currentKabupaten = null;
var mapInstance = null;
var tableControllers = {};

function getFitBoundsPadding() {
    var w = window.innerWidth;
    return {
        top: 25,
        bottom: 60,
        left: w >= 1200 ? 220 : 30,
        right: 30
    };
}

$(document).ready(function() {
    initHeroMap();
    initUsulanModalEvents();
    applyDataFilter(null, null); // start at national level
    if (currentActiveRole !== 'superadmin') terapkanRoleBeranda(currentActiveRole);
});

// Dipanggil layout setiap kali role diganti
IGT.onRoleChange = terapkanRoleBeranda;

function applyRoleFilterToLeaderboard(rawData, kategori) {
    if (!rawData || !rawData.length) return rawData || [];

    // Seluruh role mengikuti tampilan Superadmin (Leaderboard & Tabel Detail Nasional)
    if (kategori === 'capaian-renaksi') {
        return rawData.filter(function(item) {
            var s = item.satker || item.direktorat || '';
            return s && s.indexOf('Kanwil') === -1 && s.indexOf('Kantah') === -1 && s.indexOf('Balai') === -1 && s.indexOf('Sekretariat Direktorat Jenderal SPPR') === -1;
        });
    }
    return rawData;
}

function terapkanRoleBeranda(role) {
    // Operator & Umum: tampilan sama, tetapi hanya peta dan Statistik IGT
    var isTerbatas = role === 'operator' || role === 'umum';
    $('.igt-ringkas-row, #leader-board, #statistik-derivatif, #aktivitas-log').toggle(!isTerbatas);
    renderDataSaya(role);

    if (isTerbatas) {
        applyRoleSuperadmin();
    } else if (role === 'superadmin') {
        applyRoleSuperadmin();
    } else if (role === 'sppr') {
        applyRoleSPPR();
    } else if (role === 'kanwil-diy') {
        applyRoleKanwilDIY();
    } else if (role === 'kantah-gunungkidul') {
        applyRoleKantahGunungKidul();
    }
}

function applyRoleSuperadmin() {
    window.ROLE_LOCK_PROVINCE = null;
    window.ROLE_LOCK_KABUPATEN = null;
    window.ROLE_LOCK_DIREKTORAT = null;

    $('#beranda-detail-wilayah-pilih').prop('disabled', false);
    resetKeSeluruhIndonesia();
    bukaDetailInformasi('Seluruh Indonesia', 'nasional', null);
    applyDataFilter(null, null, currentDashboardYear);
    updateLeaderBoardTable();
    updateLeaderBoardDetailTable();
    updateStatistikIgtView();
}

function applyRoleSPPR() {
    window.ROLE_LOCK_PROVINCE = null;
    window.ROLE_LOCK_KABUPATEN = null;
    window.ROLE_LOCK_DIREKTORAT = 'SPPR';

    $('#beranda-detail-wilayah-pilih').prop('disabled', false);

    // Open detail card with SPPR filter
    bukaDetailInformasi('Seluruh Indonesia', 'nasional', null);

    // Apply data filter with SPPR datasets
    applyDataFilter('sppr', null, currentDashboardYear);

    updateLeaderBoardTable();
    updateLeaderBoardDetailTable();
    updateStatistikIgtView();
}

function applyRoleKanwilDIY() {
    window.ROLE_LOCK_PROVINCE = 'Daerah Istimewa Yogyakarta';
    window.ROLE_LOCK_KABUPATEN = null;
    window.ROLE_LOCK_DIREKTORAT = null;

    var featDIY = findProvinceFeature('Daerah Istimewa Yogyakarta');
    if (featDIY) {
        zoomKeProvinsi(featDIY, 'Daerah Istimewa Yogyakarta');
    } else {
        bukaDetailInformasi('Daerah Istimewa Yogyakarta', 'provinsi', null);
        applyDataFilter('Daerah Istimewa Yogyakarta', null);
    }

    updateLeaderBoardTable();
    updateLeaderBoardDetailTable();
    updateStatistikIgtView();
}

function applyRoleKantahGunungKidul() {
    window.ROLE_LOCK_PROVINCE = 'Daerah Istimewa Yogyakarta';
    window.ROLE_LOCK_KABUPATEN = 'Gunungkidul';
    window.ROLE_LOCK_DIREKTORAT = null;

    var featDIY = findProvinceFeature('Daerah Istimewa Yogyakarta');
    currentProvince = 'Daerah Istimewa Yogyakarta';
    currentProvinceFeature = featDIY;

    var featGK = findKabupatenFeature('Gunungkidul', 'Daerah Istimewa Yogyakarta') || findKabupatenFeature('Gunung Kidul', 'Daerah Istimewa Yogyakarta');
    if (featGK) {
        zoomKeKabupaten(featGK, 'Gunungkidul');
    } else {
        bukaDetailInformasi('Gunungkidul', 'kabupaten', 'Daerah Istimewa Yogyakarta');
        applyDataFilter('Daerah Istimewa Yogyakarta', 'Gunungkidul');
    }

    $('#beranda-detail-wilayah-pilih').prop('disabled', true);

    updateLeaderBoardTable();
    updateLeaderBoardDetailTable();
    updateStatistikIgtView();
}
