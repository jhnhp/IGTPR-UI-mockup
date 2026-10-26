/**
 * IGTPR Mockup UI - Halaman Kompilasi Data & Integrasi Data
 * Daftar IGT renaksi (akordeon): ringkasan target/realisasi + tabel berkas per IGT.
 * Jenis halaman dari <body data-halaman="kompilasi|integrasi">.
 * Filter status awal dari URL, mis. kompilasi-data.html?status=revisi-perbaikan
 */

var HALAMAN_DATA = {
    kompilasi: {
        judul: 'Data Kompilasi',
        status: ['Terkompilasi', 'Terupload', 'Revisi Perbaikan'],
        belum: ['Terupload'],
        realisasi: ['Terkompilasi', 'Terintegrasi'],
        kolomTambahan: false,
        judulVerifikasi: 'Verifikasi Data Kompilasi',
        cek: ['Sistem Proyeksi', 'Skala / Batas Administrasi Wilayah', 'Kode Referensi', 'Meta Data', 'Attribut Data']
    },
    integrasi: {
        judul: 'Integrasi Data',
        status: ['Terkompilasi', 'Terintegrasi'],
        belum: ['Terkompilasi'],
        realisasi: ['Terintegrasi'],
        kolomTambahan: true,
        judulVerifikasi: 'Verifikasi Data Integrasi',
        cek: ['Kesesuaian Unsur IGD', 'Konsistensi Attribut', 'Konsistensi Topologi', 'Kelengkapan Metadata', 'Cakupan Wilayah']
    }
};

var WARNA_STATUS_IGT = { 'Terintegrasi': 'hijau', 'Terkompilasi': 'tosca', 'Terupload': 'biru', 'Revisi Perbaikan': 'merah' };

var kompState = { jenis: document.body.getAttribute('data-halaman'), status: '', cari: '', tab: 'Renaksi', terbuka: {} };

function berkasHalaman() {
    return (ambilDataSaya(currentActiveRole).igt || []);
}

function daftarIgtRenaksi() {
    var lihat = {};
    return ((window.MOCKUP_DATA && window.MOCKUP_DATA.targetIgt) || []).filter(function(t) {
        if (t.tahun !== 2026 || lihat[t.igt]) return false;
        lihat[t.igt] = true;
        return true;
    });
}

function renderKompilasi() {
    var cfg = HALAMAN_DATA[kompState.jenis];
    var semua = berkasHalaman();
    var q = kompState.cari;
    var no = 0;

    var html = daftarIgtRenaksi().map(function(t) {
        var milikIgt = semua.filter(function(b) { return b.igt === t.igt; });
        var baris = milikIgt.filter(function(b) {
            return cfg.status.indexOf(b.status) !== -1 && (!kompState.status || b.status === kompState.status);
        });
        if (q && t.igt.toLowerCase().indexOf(q) === -1) return '';
        if (kompState.status && !baris.length) return '';
        no++;

        var belum = milikIgt.filter(function(b) { return cfg.belum.indexOf(b.status) !== -1; }).length;
        var real = milikIgt.filter(function(b) { return cfg.realisasi.indexOf(b.status) !== -1; }).length;
        var pct = t.target ? real / t.target * 100 : 0;
        var warna = pct >= 100 ? '#10b981' : (pct >= 50 ? '#fbbf24' : '#dc3545');
        var terbuka = kompState.terbuka[t.igt] || (kompState.status && baris.length);

        var kolom = '<th>Nama Direktorat</th><th>Nama IGT</th><th>Jenis Data</th><th>Tanggal Upload</th>'
            + (cfg.kolomTambahan ? '<th>Tanggal Terintegrasi</th>' : '') + '<th>Keterangan</th><th>Status</th><th>Aksi</th>'
            + (cfg.kolomTambahan ? '<th>Download</th>' : '');
        var isi = baris.map(function(b) {
            var idx = semua.indexOf(b);
            return '<tr><td><strong>' + esc(b.direktorat || '-') + '</strong></td><td>' + esc(b.igt) + '</td><td>' + esc(b.jenis) + '</td><td>' + esc(b.tanggal) + '</td>'
                + (cfg.kolomTambahan ? '<td>' + (b.status === 'Terintegrasi' ? esc(b.tanggal) : '-') + '</td>' : '')
                + '<td><small class="text-muted">' + esc(b.catatan) + '</small></td>'
                + '<td><span class="igt-pil igt-pil--' + WARNA_STATUS_IGT[b.status] + ' igt-pil--status">' + esc(b.status) + '</span></td>'
                + '<td><div class="igt-aksi">'
                + '<button type="button" class="igt-aksi__ikon igt-aksi--kuning" title="Verifikasi / Lihat" data-komp-aksi="verifikasi" data-idx="' + idx + '"><i class="ri-eye-line"></i></button>'
                + '<button type="button" class="igt-aksi__ikon igt-aksi--tosca" title="Riwayat" data-komp-aksi="riwayat" data-idx="' + idx + '"><i class="ri-history-line"></i></button>'
                + '<button type="button" class="igt-aksi__ikon igt-aksi--hijau" title="Berita Acara" data-komp-aksi="ba" data-idx="' + idx + '"><i class="ri-file-text-line"></i></button>'
                + '<button type="button" class="igt-aksi__ikon igt-aksi--biru" title="Edit Data (Superadmin)" data-komp-aksi="edit" data-idx="' + idx + '"><i class="ri-edit-line"></i></button>'
                + '<button type="button" class="igt-aksi__ikon igt-aksi--merah" title="Hapus" data-komp-aksi="hapus" data-idx="' + idx + '"><i class="ri-delete-bin-line"></i></button>'
                + '</div></td>'
                + (cfg.kolomTambahan ? '<td>' + (b.status === 'Terintegrasi'
                    ? '<div class="igt-aksi"><button type="button" class="igt-aksi__ikon igt-aksi--hijau" title="Unduh SHP" data-komp-aksi="unduh"><i class="ri-file-download-line"></i></button><button type="button" class="igt-aksi__ikon igt-aksi--hijau" title="Salin Link" data-komp-aksi="link"><i class="ri-link"></i></button></div>' : '-') + '</td>' : '')
                + '</tr>';
        }).join('');
        var jumlahKolom = cfg.kolomTambahan ? 9 : 7;

        return '<div class="igt-komp-item' + (terbuka ? ' is-open' : '') + '" data-igt="' + esc(t.igt) + '">'
            + '<div class="igt-komp-item__kepala">'
            + '<div class="igt-komp-item__judul"><strong>' + no + '. ' + esc(t.igt) + '</strong>'
            + '<div class="igt-komp-item__meta"><span class="text-danger">Data Belum Diproses: <b>' + belum + '</b></span>'
            + '<span class="text-primary">Target: <b>' + t.target + '</b></span>'
            + '<span class="text-success">Realisasi: <b>' + real + '</b></span>'
            + '<span class="text-dark">Satuan: <b>' + esc(t.satuan) + '</b></span></div></div>'
            + '<div class="igt-komp-item__persen">Persentase: ' + pct.toFixed(2) + '%'
            + '<div class="igt-komp-bar"><div style="width:' + Math.min(100, pct) + '%;background:' + warna + '">' + pct.toFixed(2) + '%</div></div></div>'
            + '<i class="ri-arrow-down-s-line igt-komp-item__panah"></i></div>'
            + '<div class="igt-komp-item__isi"><div class="igt-table-wrap"><table class="igt-table"><thead><tr>' + kolom + '</tr></thead><tbody>'
            + (isi || '<tr><td colspan="' + jumlahKolom + '" class="igt-table__empty">Belum ada berkas pada status ini.</td></tr>')
            + '</tbody></table></div><div class="igt-table-foot"><span class="igt-crud-info">Showing ' + (baris.length ? 1 : 0) + ' to ' + baris.length + ' of ' + baris.length + ' entries</span></div></div>'
            + '</div>';
    }).join('');

    $('#komp-daftar').html(html || '<div class="igt-table__empty">Tidak ada IGT yang sesuai filter.</div>');
}

function bukaVerifikasi(b) {
    var cfg = HALAMAN_DATA[kompState.jenis];
    bukaModal({
        judul: cfg.judulVerifikasi, lebar: 'modal-xl', simpan: 'Simpan Data', batal: 'Close', pesanSimpan: 'Hasil verifikasi disimpan',
        nilai: b,
        fields: [
            { tipe: 'judul', label: 'Data IGT' },
            { key: 'igt', label: 'Jenis IGT', tipe: 'info', lebar: 'setengah' },
            { key: 'direktorat', label: 'Direktorat', tipe: 'info', lebar: 'setengah' },
            { key: 'tanggal', label: 'Tanggal Upload', tipe: 'info', lebar: 'setengah' },
            { key: 'jenis', label: 'Jenis Data', tipe: 'info', lebar: 'setengah' },
            { label: 'File SHP', tipe: 'info', isi: (b.igt || '').toUpperCase().replace(/\s+/g, '_') + '.zip', lebar: 'setengah' },
            { label: 'File SLD Style', tipe: 'info', isi: 'SLD_' + (b.igt || '').toUpperCase().replace(/\s+/g, '_') + '.sld', lebar: 'setengah' },
            { key: 'catatan', label: 'Keterangan', tipe: 'info' },
            { tipe: 'judul', label: 'Pemeriksaan Data' },
            { tipe: 'cek', opsi: cfg.cek },
            { label: 'Catatan Revisi', tipe: 'textarea', placeholder: 'Isi bila data perlu diperbaiki operator' }
        ]
    });
}

function bukaRiwayat(b) {
    bukaModal({
        judul: kompState.jenis === 'integrasi' ? 'Riwayat Integrasi' : 'Riwayat Kompilasi', simpan: false, batal: 'Close', lebar: 'modal-lg',
        isi: '<ul class="igt-riwayat">'
            + '<li><span class="igt-pil igt-pil--biru">Terupload</span><div><strong>' + esc(b.igt) + '</strong><small>' + esc(b.direktorat) + ' • ' + esc(b.tanggal) + '</small></div></li>'
            + (b.status !== 'Terupload' ? '<li><span class="igt-pil igt-pil--' + WARNA_STATUS_IGT[b.status] + '">' + esc(b.status) + '</span><div><strong>Diproses Admin IGT</strong><small>' + esc(b.catatan) + '</small></div></li>' : '')
            + '</ul>'
    });
}

$(document).ready(function() {
    var cfg = HALAMAN_DATA[kompState.jenis];
    if (!cfg) return;

    var m = /[?&]status=([^&]+)/.exec(location.search);
    if (m) {
        var slug = decodeURIComponent(m[1]);
        kompState.status = cfg.status.filter(function(s) { return slugStatus(s) === slug; })[0] || '';
    }

    $('#komp-status').html('<option value="">Semua Status</option>' + cfg.status.map(function(s) {
        return '<option' + (s === kompState.status ? ' selected' : '') + '>' + s + '</option>';
    }).join(''));

    $('#komp-tab').on('click', '.igt-segment__item', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active');
        kompState.tab = $(this).text();
        if (kompState.tab !== 'Renaksi') toastMockup('Kategori ' + kompState.tab + ' memakai daftar IGT yang sama pada mockup', 'info');
    });
    $('#komp-status').on('change', function() { kompState.status = $(this).val(); renderKompilasi(); });
    $('#komp-cari').on('input', function() { kompState.cari = $(this).val().trim().toLowerCase(); renderKompilasi(); });
    $('#komp-tahun').on('change', function() { toastMockup('Data tahun ' + $(this).val() + ' ditampilkan', 'info'); });

    $('#komp-daftar').on('click', '.igt-komp-item__kepala', function() {
        var $item = $(this).closest('.igt-komp-item');
        $item.toggleClass('is-open');
        kompState.terbuka[$item.attr('data-igt')] = $item.hasClass('is-open');
    });
    $('#komp-daftar').on('click', '[data-komp-aksi]', function(e) {
        e.stopPropagation();
        var aksi = $(this).attr('data-komp-aksi');
        var b = berkasHalaman()[parseInt($(this).attr('data-idx'), 10)];
        if (aksi === 'verifikasi') bukaVerifikasi(b);
        else if (aksi === 'riwayat') bukaRiwayat(b);
        else if (aksi === 'ba') toastMockup('Berita Acara dibuka (PDF)', 'info');
        else if (aksi === 'edit') bukaModal({ judul: 'Ubah Data Kompilasi (Superadmin)', lebar: 'modal-lg', simpan: 'Simpan Perubahan', nilai: b, fields: [
            { key: 'igt', label: 'Jenis IGT', tipe: 'info', lebar: 'setengah' }, { key: 'direktorat', label: 'Direktorat', tipe: 'info', lebar: 'setengah' },
            { key: 'tanggal', label: 'Tanggal Upload', tipe: 'teks', lebar: 'setengah' }, { key: 'jenis', label: 'Jenis Data', tipe: 'teks', lebar: 'setengah' },
            { label: 'SHP (Format zip)', tipe: 'file', accept: '.zip' }, { key: 'catatan', label: 'Keterangan (Opsional)', tipe: 'textarea' }] });
        else if (aksi === 'hapus') konfirmasiHapus({ _label: b.igt + ' — ' + b.direktorat });
        else if (aksi === 'unduh') toastMockup('Berkas SHP diunduh', 'info');
        else if (aksi === 'link') toastMockup('Link layanan disalin', 'info');
    });

    renderKompilasi();
});

IGT.onRoleChange = renderKompilasi;
