/**
 * IGTPR Mockup UI - Beranda: Filter data seluruh komponen
 */

/* ----------------------------------------------------
   4. Apply Filter to All Dashboard Components
---------------------------------------------------- */
var currentStatistikIgtMode = 'igt';

function getJenisIgt(namaIgt) {
    if (!namaIgt) return 'Pertanahan';
    var lower = String(namaIgt).toLowerCase();
    if (lower.indexOf('rdtr') !== -1 || lower.indexOf('rtrw') !== -1 || lower.indexOf('rtr') !== -1 || lower.indexOf('kkpr') !== -1 || lower.indexOf('ruang') !== -1) {
        return 'Tata Ruang';
    }
    return 'Pertanahan';
}

function updateStatistikIgtView(dataOverride) {
    var raw = dataOverride || window.MOCKUP_DATA.getDataByWilayah(currentProvince, currentKabupaten, currentDashboardYear);
    if (!raw) raw = window.MOCKUP_DATA.nasional;

    var mode = currentStatistikIgtMode || 'igt';
    var columns = [];
    var data = [];
    var defaultSort = 'igt';

    if (mode === 'provinsi') {
        columns = [
            { key: 'provinsi', label: 'Provinsi' },
            { key: 'jumlahIgt', label: 'Jumlah IGT' },
            { key: 'kabupaten', label: 'Kabupaten' },
            { key: 'bidang', label: 'Bidang' },
            { key: 'luas', label: 'Luas (Ha)' }
        ];
        data = raw.statistikIGTProvinsi || (window.MOCKUP_DATA.nasional ? window.MOCKUP_DATA.nasional.statistikIGTProvinsi : []) || [];
        defaultSort = 'provinsi';
    } else if (mode === 'kabupaten') {
        columns = [
            { key: 'kabupaten', label: 'Kabupaten/Kota' },
            { key: 'provinsi', label: 'Provinsi' },
            { key: 'jumlahIgt', label: 'Jumlah IGT' },
            { key: 'bidang', label: 'Bidang' },
            { key: 'luas', label: 'Luas (Ha)' }
        ];
        data = raw.statistikIGTKabupaten || (window.MOCKUP_DATA.nasional ? window.MOCKUP_DATA.nasional.statistikIGTKabupaten : []) || [];
        defaultSort = 'kabupaten';
    } else {
        columns = [
            { key: 'jenisIgt', label: 'Jenis IGT' },
            { key: 'igt', label: 'IGT' },
            { key: 'provinsi', label: 'Provinsi' },
            { key: 'kabupaten', label: 'Kabupaten' },
            { key: 'bidang', label: 'Bidang' },
            { key: 'luas', label: 'Luas (Ha)' }
        ];
        var rawItems = raw.statistikIGT || (window.MOCKUP_DATA.nasional ? window.MOCKUP_DATA.nasional.statistikIGT : []) || [];
        data = rawItems.map(function(item) {
            var jenis = item.jenisIgt || getJenisIgt(item.igt);
            return Object.assign({}, item, { jenisIgt: jenis });
        });
        defaultSort = 'igt';
    }

    renderTableSection('statistik-igt', data, columns, defaultSort, mode);
}

function applyDataFilter(namaProvinsi, namaKabupaten, tahun) {
    if (namaProvinsi !== undefined) currentProvince = namaProvinsi;
    if (namaKabupaten !== undefined) currentKabupaten = namaKabupaten;
    if (tahun !== undefined) currentDashboardYear = tahun || 'all';

    var thn = (tahun !== undefined) ? (tahun || 'all') : (currentDashboardYear || 'all');
    var data = window.MOCKUP_DATA.getDataByWilayah(namaProvinsi, namaKabupaten, thn);
    if (!data) return;

    // A. Render Ringkasan (Usulan & Kompilasi)
    var usulan = window.MOCKUP_DATA.getUsulanInputData(namaProvinsi, namaKabupaten, thn);
    renderUsulanInputData(usulan);

    var kompilasi = window.MOCKUP_DATA.getKompilasiIntegrasi ? window.MOCKUP_DATA.getKompilasiIntegrasi(namaProvinsi, namaKabupaten, thn) : data.kompilasiIntegrasi;
    renderKompilasiIntegrasi(kompilasi);

    // B. Render Leader Board
    renderLeaderBoard(data.leaderBoard);

    // C. Render All Section Tables
    updateStatistikIgtView(data);

    renderTableSection('statistik-derivatif', data.statistikDerivatif, [
        { key: 'layer', label: 'Layer Derivatif' },
        { key: 'provinsi', label: 'Provinsi' },
        { key: 'kabupaten', label: 'Kabupaten' },
        { key: 'bidang', label: 'Bidang' },
        { key: 'luas', label: 'Luas (Ha)' }
    ], 'layer');

    renderTableSection('aktivitas-log', data.aktivitasLog, [
        { key: 'user', label: 'Nama User' },
        { key: 'aktivitas', label: 'Aktivitas' },
        { key: 'waktu', label: 'Waktu' }
    ], 'waktu');
}
