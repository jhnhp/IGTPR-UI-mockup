/**
 * IGTPR Mockup UI - Halaman Kompilasi Data, Integrasi Data & Unggah Data Derivatif
 * Jenis halaman dari <body data-halaman="kompilasi|integrasi|derivatif">.
 * Filter status awal dari URL, mis. kompilasi-data.html?status=revisi-perbaikan
 */

var HALAMAN_DATA = {
    kompilasi: { sumber: 'igt', status: ['Terkompilasi', 'Terupload', 'Revisi Perbaikan'], daftar: STATUS_IGT },
    integrasi: { sumber: 'igt', status: ['Terintegrasi'], daftar: STATUS_IGT },
    derivatif: { sumber: 'derivatif', status: ['Disetujui', 'Menunggu Verifikasi', 'Ditolak'], daftar: STATUS_DERIVATIF }
};

var dataState = { jenis: document.body.getAttribute('data-halaman'), status: 'semua', cari: '' };

function barisData(d, i, cfg) {
    var st = cariStatus(cfg.daftar, d.status);
    var pil = '<span class="igt-status ' + st.kelas + '">' + d.status + '</span>';
    var catatan = '<span class="igt-data-catatan">' + (d.catatan || '-') + '</span>';
    if (cfg.sumber === 'derivatif') {
        return '<tr><td class="igt-table__no">' + (i + 1) + '</td><td><strong>' + d.layer + '</strong></td><td>' + d.sld + '</td>'
            + '<td>' + d.fitur.toLocaleString('id-ID') + ' fitur</td><td>' + d.tanggal + '</td><td>' + pil + '</td><td>' + catatan + '</td></tr>';
    }
    return '<tr><td class="igt-table__no">' + (i + 1) + '</td><td><strong>' + d.igt + '</strong></td><td>' + d.jenis + '</td>'
        + '<td>' + d.tanggal + '</td><td>' + pil + '</td><td>' + catatan + '</td></tr>';
}

function renderHalamanData() {
    var cfg = HALAMAN_DATA[dataState.jenis];
    if (!cfg) return;
    var semua = (ambilDataSaya(currentActiveRole)[cfg.sumber] || []).filter(function(d) {
        return cfg.status.indexOf(d.status) !== -1;
    });
    var q = dataState.cari;
    var list = semua.filter(function(d) {
        var cocokStatus = dataState.status === 'semua' || slugStatus(d.status) === dataState.status;
        var teks = (d.igt || d.layer || '') + ' ' + (d.catatan || '');
        return cocokStatus && (!q || teks.toLowerCase().indexOf(q) !== -1);
    });
    var kolom = $('.igt-table thead th').length;
    $('#data-body').html(list.length ? list.map(function(d, i) { return barisData(d, i, cfg); }).join('')
        : '<tr class="igt-data-kosong"><td colspan="' + kolom + '">Belum ada data.</td></tr>');
    $('#data-ringkas').text('Menampilkan ' + list.length + ' dari ' + semua.length + ' data');
    $('#data-tab .igt-segment__item').removeClass('is-active').filter('[data-status="' + dataState.status + '"]').addClass('is-active');
}

$(document).ready(function() {
    var m = /[?&]status=([^&]+)/.exec(location.search);
    if (m && $('#data-tab [data-status="' + decodeURIComponent(m[1]) + '"]').length) dataState.status = decodeURIComponent(m[1]);

    $('#data-tab').on('click', '.igt-segment__item', function() {
        dataState.status = $(this).attr('data-status');
        renderHalamanData();
    });
    $('#data-cari').on('input', function() {
        dataState.cari = $(this).val().trim().toLowerCase();
        renderHalamanData();
    });
    renderHalamanData();
});

IGT.onRoleChange = renderHalamanData;
