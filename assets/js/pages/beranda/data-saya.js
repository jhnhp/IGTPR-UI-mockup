/**
 * IGTPR Mockup UI - Beranda: kartu "Data Saya" (Operator & Umum)
 * Grafik status data unggahan; tiap ruas/angka menuju halaman data terkait.
 */

function blokDataSaya(judul, data, daftarStatus) {
    var html = '<div class="igt-ds__blok"><div class="igt-ds__blok-kepala"><span class="igt-ds__blok-judul">' + judul + '</span>'
        + '<span class="igt-ds__total"><strong>' + data.length + '</strong>data</span></div>';
    if (!data.length) return html + '<div class="igt-ds__kosong">Belum ada data yang diunggah.</div></div>';

    var bar = '', rincian = '', perlu = null;
    daftarStatus.forEach(function(st) {
        var n = data.filter(function(d) { return d.status === st.label; }).length;
        var link = linkStatus(st);
        // Status bernilai 0 tetap ditampilkan sebagai ruas sangat tipis (seperti Usulan Input Data)
        bar += '<a href="' + link + '" class="igt-ds__ruas ' + st.kelas + (n ? '' : ' is-nol') + '"' + (n ? ' style="flex-grow:' + n + '"' : '')
            + ' title="' + st.label + ': ' + n + ' data (klik untuk rincian)"></a>';
        rincian += '<a href="' + link + '" class="igt-ds__item"><span class="igt-ds__titik igt-ds__ruas ' + st.kelas + '"></span><strong>' + n + '</strong>' + st.label + '</a>';
        if (st.perluTindakan && n) perlu = { n: n, link: link, label: st.label };
    });
    html += '<div class="igt-ds__bar">' + bar + '</div><div class="igt-ds__rincian">' + rincian + '</div>';
    if (perlu) {
        var teks = perlu.label === 'Ditolak' ? 'ditolak, perlu diunggah ulang' : 'perlu revisi';
        html += '<a href="' + perlu.link + '" class="igt-ds__peringatan"><i class="ri-error-warning-line"></i> ' + perlu.n + ' data ' + teks + '</a>';
    }
    return html + '</div>';
}

function renderDataSaya(role) {
    var tampil = role === 'operator' || role === 'umum';
    $('#data-saya').toggle(tampil);
    if (!tampil) return;
    var d = ambilDataSaya(role);
    var html = '';
    if (role === 'operator') html += blokDataSaya('Data IGT', d.igt, STATUS_IGT);
    html += blokDataSaya('Data Derivatif', d.derivatif, STATUS_DERIVATIF);
    $('#data-saya-isi').html(html);
}
