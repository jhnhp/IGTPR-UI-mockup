/**
 * IGTPR Mockup UI - Data unggahan pengguna (dipakai kartu "Data Saya" di Beranda
 * dan halaman Kompilasi Data / Integrasi Data / Unggah Data Derivatif)
 */

// Urutan status = urutan ruas grafik. halaman = tujuan saat ruas diklik.
var STATUS_IGT = [
    { label: 'Terintegrasi', kelas: 'is-terintegrasi', halaman: 'integrasi-data.html' },
    { label: 'Terkompilasi', kelas: 'is-terkompilasi', halaman: 'kompilasi-data.html' },
    { label: 'Terupload', kelas: 'is-terupload', halaman: 'kompilasi-data.html' },
    { label: 'Revisi Perbaikan', kelas: 'is-revisi', halaman: 'kompilasi-data.html', perluTindakan: true }
];
var STATUS_DERIVATIF = [
    { label: 'Disetujui', kelas: 'is-disetujui', halaman: 'unggah-derivatif.html' },
    { label: 'Menunggu Verifikasi', kelas: 'is-menunggu', halaman: 'unggah-derivatif.html' },
    { label: 'Ditolak', kelas: 'is-ditolak', halaman: 'unggah-derivatif.html', perluTindakan: true }
];

// Operator & Umum melihat data miliknya; role admin melihat seluruh unggahan.
function ambilDataSaya(role) {
    var semua = (window.MOCKUP_DATA && window.MOCKUP_DATA.dataSaya) || {};
    if (semua[role]) return semua[role];
    var gabung = { igt: [], derivatif: [] };
    Object.keys(semua).forEach(function(k) {
        gabung.igt = gabung.igt.concat(semua[k].igt || []);
        gabung.derivatif = gabung.derivatif.concat(semua[k].derivatif || []);
    });
    return gabung;
}

function cariStatus(daftar, label) {
    for (var i = 0; i < daftar.length; i++) if (daftar[i].label === label) return daftar[i];
    return { label: label, kelas: '' };
}

function slugStatus(label) {
    return String(label).toLowerCase().replace(/\s+/g, '-');
}

function linkStatus(st) {
    return st.halaman + '?status=' + slugStatus(st.label);
}
