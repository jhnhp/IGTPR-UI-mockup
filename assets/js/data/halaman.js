/**
 * IGTPR Mockup UI - Konfigurasi halaman tabel/CMS (dibaca assets/js/core/crud.js)
 * Struktur kolom, tombol, dan form mengikuti aplikasi asli (igtpr.exium.web.id/admin,
 * tangkapan layar di Examples/live/). Data bersifat dummy.
 */

var DAFTAR_DIREKTORAT = [
    'Direktorat Bina Pengadaan Dan Pencadangan Tanah',
    'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I',
    'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
    'Direktorat Hubungan Kelembagaan dan Pengaturan Layanan Pertanahan',
    'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan',
    'Direktorat Landreform',
    'Direktorat Pemberdayaan Tanah Masyarakat',
    'Direktorat Penanganan Perkara Pertanahan',
    'Direktorat Penanganan Sengketa Pertanahan',
    'Direktorat Penatagunaan Tanah',
    'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
    'Direktorat Pengukuran dan Pemetaan Kadastral',
    'Direktorat Penetapan Hak Atas Tanah dan Ruang',
    'Direktorat Survei dan Pemetaan Tematik'
];

var DAFTAR_IGT = [
    'Analisis Tanah Objek Reforma Agraria', 'Bidang Tanah', 'Data Potensi WP3WT', 'Desain Konsolidasi Tanah',
    'Hak Atas Tanah', 'Hak Ulayat', 'Indikasi Pelanggaran Pemanfaatan Ruang', 'Inventarisasi Tanah Kritis',
    'Kemampuan Tanah', 'Lahan Baku Sawah Nasional', 'Lahan Sawah Dilindungi', 'Neraca Penatagunaan Tanah',
    'Pemanfaatan Tanah', 'Penggunaan Tanah', 'Pertimbangan Teknis Pertanahan', 'RDTR Kabupaten/Kota',
    'RTRW Kabupaten', 'RTRW Kota', 'RTRW Provinsi', 'Zona Nilai Tanah'
];

// IGT + sub layer yang Atribut & SLD-nya terpisah (lihat Layer IGT), mis. "Zona Nilai Tanah › 2026"
var SUBLAYER_TERPISAH = { 'Zona Nilai Tanah': ['2025', '2026'], 'Inventarisasi Tanah Kritis': ['1:10.000', '1:50.000'] };
var DAFTAR_IGT_SUBLAYER = DAFTAR_IGT.reduce(function(hasil, igt) {
    return hasil.concat([igt], (SUBLAYER_TERPISAH[igt] || []).map(function(sub) { return igt + ' › ' + sub; }));
}, []);
var DAFTAR_LAYER_DERIVATIF = ['Coba Derivatif Bidang', 'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik', 'TES LAYER DERIVATIF BIDANG', 'TES LAYER DERIVATIF KAWASAN'];
var DAFTAR_BASELINE = ['Test Baseline Yogjakarta', 'Baseline Hak Atas Tanah 1', 'TEST ZNT BADUNG dari wfs staging volatil', 'Baseline bidang tanah berdasarkan wfs', 'BASELINE BIDANG TANAH'];
var WARNA_BASIS = { Bidang: 'biru', Kawasan: 'abu' };
var WARNA_STATUS_DERIVATIF = { 'Disetujui': 'hijau', 'Menunggu Verifikasi': 'kuning', 'Menunggu': 'kuning', 'Ditolak': 'merah', 'Kedaluwarsa': 'abu', 'Dihapus': 'abu' };
var CEK_DATA = ['Sistem Proyeksi', 'Konsistensi Attribut', 'Kesesuaian Unsur IGD', 'Konsistensi Topologi', 'Cakupan Wilayah'];

// Pasangan atribut-nilai dummy dari berkas metadata XML (ISO 19115)
function atributMetadata(b) {
    var id = (b.file || '').replace(/_metadata\.xml$/i, '').toUpperCase();
    return [
        ['MD_Metadata / fileIdentifier / CharacterString', id],
        ['MD_Metadata / language / LanguageCode / @codeList', 'http://www.loc.gov/standards/iso639-2/php/code_list.php'],
        ['MD_Metadata / language / LanguageCode / @codeListValue', 'ind'],
        ['MD_Metadata / language / LanguageCode / @codeSpace', 'ISO639-2'],
        ['MD_Metadata / language / LanguageCode', 'ind'],
        ['MD_Metadata / characterSet / MD_CharacterSetCode / @codeList', 'http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_CharacterSetCode'],
        ['MD_Metadata / characterSet / MD_CharacterSetCode / @codeListValue', 'utf8'],
        ['MD_Metadata / characterSet / MD_CharacterSetCode / @codeSpace', 'ISOTC211/19115'],
        ['MD_Metadata / characterSet / MD_CharacterSetCode', 'utf8'],
        ['MD_Metadata / hierarchyLevel / MD_ScopeCode / @codeList', 'http://www.isotc211.org/2005/resources/Codelist/gmxCodelists.xml#MD_ScopeCode'],
        ['MD_Metadata / hierarchyLevel / MD_ScopeCode / @codeListValue', 'dataset'],
        ['MD_Metadata / contact / CI_ResponsibleParty / organisationName / CharacterString', 'Kementerian ATR/BPN'],
        ['MD_Metadata / contact / CI_ResponsibleParty / contactInfo / CI_Contact / address / CI_Address / electronicMailAddress / CharacterString', 'metadata@contoh.go.id'],
        ['MD_Metadata / dateStamp / Date', '2026-03-12'],
        ['MD_Metadata / metadataStandardName / CharacterString', 'ISO 19115:2003/19139'],
        ['MD_Metadata / metadataStandardVersion / CharacterString', '1.0'],
        ['MD_Metadata / referenceSystemInfo / MD_ReferenceSystem / referenceSystemIdentifier / RS_Identifier / code / CharacterString', 'EPSG:4326'],
        ['MD_Metadata / identificationInfo / MD_DataIdentification / citation / CI_Citation / title / CharacterString', b.nama || '-'],
        ['MD_Metadata / identificationInfo / MD_DataIdentification / abstract / CharacterString', 'Data ' + (b.igt || '') + ' hasil kompilasi IGT-PR.'],
        ['MD_Metadata / identificationInfo / MD_DataIdentification / spatialRepresentationType / MD_SpatialRepresentationTypeCode', 'vector'],
        ['MD_Metadata / identificationInfo / MD_DataIdentification / topicCategory / MD_TopicCategoryCode', 'planningCadastre'],
        ['MD_Metadata / distributionInfo / MD_Distribution / distributionFormat / MD_Format / name / CharacterString', 'ESRI Shapefile']
    ];
}

function xmlMetadata(pasangan) {
    return '<?xml version="1.0" encoding="UTF-8"?>\n<gmd:MD_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco">\n'
        + pasangan.filter(function(p) { return p[0].indexOf('@') === -1; }).map(function(p) {
            var jalur = p[0].split(' / ').slice(1);
            return '  <!-- ' + jalur.join('/') + ' -->\n  <gmd:' + jalur[0] + '>' + p[1] + '</gmd:' + jalur[0] + '>';
        }).join('\n') + '\n</gmd:MD_Metadata>';
}

var AKSI_EDIT = { ikon: 'ri-edit-line', warna: 'kuning', judul: 'Edit Data', aksi: 'edit' };
var AKSI_HAPUS = { ikon: 'ri-delete-bin-line', warna: 'merah', judul: 'Hapus Data', aksi: 'hapus' };

function semuaDerivatif() {
    var semua = (window.MOCKUP_DATA && window.MOCKUP_DATA.dataSaya) || {};
    var hasil = [];
    Object.keys(semua).forEach(function(k) {
        var pemilik = k === 'operator' ? { pengunggah: 'Operator SPPR', satker: 'Direktorat Survei dan Pemetaan Tematik' }
            : (k === 'umum' ? { pengunggah: 'User Umum', satker: 'Pengguna Umum' } : {});
        (semua[k].derivatif || []).forEach(function(d) { hasil.push($.extend({}, pemilik, d)); });
    });
    return hasil;
}

var HALAMAN = {

    /* ================= DATA IGT ================= */
    'self-assessment': {
        judul: 'Self Assessment', breadcrumb: 'Data', tampilan: 'kosong',
        kosongTeks: 'Tambah Data (Upload File Terlebih Dahulu)',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        form: {
            tambah: 'Tambah Data', simpan: 'Terapkan', lebar: 'modal-xl',
            fields: [
                { tipe: 'judul', label: 'Data IGT' },
                { key: 'igt', label: 'Jenis IGT', tipe: 'pilih', opsi: DAFTAR_IGT, wajib: true, lebar: 'setengah' },
                { key: 'tanggal', label: 'Tanggal Upload', tipe: 'tanggal', wajib: true, lebar: 'setengah' },
                { label: 'SHP (Format zip)', tipe: 'file', accept: '.zip', lebar: 'setengah' },
                { label: 'SLD Style', tipe: 'pilih', opsi: ['SLD Bidang Tanah', 'SLD Hak Atas Tanah', 'SLD Kawasan'], wajib: true, lebar: 'setengah' },
                { label: 'Kategori Metadata', tipe: 'pilih', opsi: ['Metadata ISO 19115', 'Metadata SNI'], wajib: true, lebar: 'setengah' },
                { label: 'Keterangan', tipe: 'textarea', lebar: 'setengah' },
                { tipe: 'judul', label: 'Styling' },
                { label: 'Fill Color', tipe: 'warna', lebar: 'setengah' },
                { label: 'Outline Color', tipe: 'warna', nilai: '#1e3a6e', lebar: 'setengah' },
                { label: 'Kolom Referensi', tipe: 'pilih', opsi: ['NAMOBJ', 'KODE_DESA', 'NIB'], lebar: 'setengah' },
                { label: 'Jenis Kategori', tipe: 'pilih', opsi: ['Tunggal', 'Kategori', 'Bertingkat'], lebar: 'setengah' },
                { tipe: 'judul', label: 'Pemeriksaan Data' },
                { tipe: 'cek', opsi: CEK_DATA }
            ]
        }
    },

    /* ================= DATA DERIVATIF ================= */
    'layer-derivatif': {
        judul: 'Layer Derivatif', breadcrumb: 'Data Derivatif', kartu: 'Daftar Layer Derivatif',
        tombol: [{ label: 'Tambah Layer', aksi: 'tambah' }],
        kolom: [
            { key: 'nama', label: 'Nama Layer', tipe: 'judul', sub: 'kode' },
            { key: 'basis', label: 'Basis', tipe: 'html', render: function(b) {
                return badgeHtml(b.basis, WARNA_BASIS[b.basis]) + (b.baseline ? '<small class="d-block text-muted mt-1">' + esc(b.baseline) + '</small>' : '');
            } },
            { key: 'kedaluwarsa', label: 'Kedaluwarsa' },
            { key: 'kolom', label: 'Atribut / SLD', tipe: 'html', render: function(b) { return esc(b.kolom) + ' kolom<small class="d-block text-muted">' + esc(b.sld) + ' SLD</small>'; } },
            { key: 'menunggu', label: 'Pengajuan', tipe: 'html', render: function(b) { return esc(b.menunggu) + ' menunggu<small class="d-block text-muted">' + esc(b.disetujui) + ' disetujui</small>'; } }
        ],
        data: [
            { nama: 'Coba Derivatif Bidang', kode: 'derivatif_coba_derivatif_bidang', basis: 'Bidang', baseline: 'Baseline Hak Atas Tanah 1', kedaluwarsa: '30 hari', kolom: 21, sld: 1, menunggu: 1, disetujui: 2 },
            { nama: 'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik', kode: 'derivatif_dialog_kinerja_bidang_tanah', basis: 'Bidang', baseline: 'Test Baseline Yogjakarta', kedaluwarsa: '30 hari', kolom: 12, sld: 2, menunggu: 0, disetujui: 1 },
            { nama: 'TES LAYER DERIVATIF BIDANG', kode: 'derivatif_tes_layer_derivatif_bidang', basis: 'Bidang', baseline: 'Baseline bidang tanah berdasarkan wfs', kedaluwarsa: '7 hari', kolom: 10, sld: 1, menunggu: 0, disetujui: 1 },
            { nama: 'TES LAYER DERIVATIF KAWASAN', kode: 'derivatif_tes_layer_derivatif_kawasan', basis: 'Kawasan', kedaluwarsa: '30 hari', kolom: 9, sld: 1, menunggu: 2, disetujui: 5 }
        ],
        aksi: [
            AKSI_EDIT,
            { ikon: 'ri-database-2-line', warna: 'biru', judul: 'Atribut', aksi: 'link:atribut-layer-derivatif.html' },
            { ikon: 'ri-palette-line', warna: 'tosca', judul: 'SLD', aksi: 'link:sld-derivatif.html' },
            AKSI_HAPUS
        ],
        form: {
            tambah: 'Tambah Layer Derivatif', edit: 'Ubah Layer Derivatif', simpan: 'Simpan Layer', batal: 'Batal',
            fields: [
                { key: 'nama', label: 'Nama Layer', tipe: 'teks', wajib: true },
                { key: 'basis', label: 'Basis Data', tipe: 'pilih', opsi: ['Bidang', 'Kawasan'], wajib: true, lebar: 'setengah' },
                { key: 'baseline', label: 'Baseline', tipe: 'pilih', opsi: DAFTAR_BASELINE, wajib: true, lebar: 'setengah' },
                { key: 'kedaluwarsa', label: 'Masa Kedaluwarsa (hari)', tipe: 'angka', wajib: true, lebar: 'setengah' },
                { label: 'Kewenangan Akses', tipe: 'pilih-banyak', opsi: DAFTAR_DIREKTORAT },
                { key: 'keterangan', label: 'Keterangan', tipe: 'textarea' }
            ]
        }
    },

    'sld-derivatif': {
        judul: 'SLD Derivatif', breadcrumb: 'Data Derivatif', kartu: 'Daftar SLD Layer Derivatif',
        tombol: [{ label: 'Tambah SLD', aksi: 'tambah' }],
        filter: [{ key: 'layer', label: 'Layer Derivatif', semua: 'Pilih layer...', opsi: DAFTAR_LAYER_DERIVATIF, wajib: true, kosong: 'Pilih layer derivatif terlebih dahulu' }],
        kolom: [
            { label: '#', tipe: 'no', lebar: '48px' },
            { key: 'nama', label: 'Nama SLD', tipe: 'judul' },
            { key: 'keterangan', label: 'Keterangan' },
            { key: 'file', label: 'File Asli', tipe: 'file' }
        ],
        data: [
            { layer: 'Coba Derivatif Bidang', nama: 'coba', keterangan: 'SLD uji coba', file: 'coba_bidang.sld' },
            { layer: 'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik', nama: 'SLD Kinerja Bidang', keterangan: 'Kategori kinerja', file: 'kinerja_bidang.sld' },
            { layer: 'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik', nama: 'SLD Kinerja Tematik', keterangan: 'Tematik', file: 'kinerja_tematik.sld' },
            { layer: 'TES LAYER DERIVATIF BIDANG', nama: 'SLD BIDANG', keterangan: '-', file: 'bidang.sld' },
            { layer: 'TES LAYER DERIVATIF KAWASAN', nama: 'SLD KAWASAN', keterangan: '-', file: 'kawasan.sld' }
        ],
        aksi: [
            { ikon: 'ri-eye-line', warna: 'tosca', judul: 'Pratinjau', aksi: 'modal:pratinjau' },
            AKSI_EDIT, AKSI_HAPUS
        ],
        modal: {
            pratinjau: { judul: function(b) { return 'Pratinjau SLD — ' + b.nama; }, simpan: false, batal: 'Tutup', lebar: 'modal-md',
                isi: '<div class="igt-legenda-pratinjau"><span style="background:#93c5fd"></span> Kelas 1<span style="background:#1d4ed8"></span> Kelas 2<span style="background:#fbbf24"></span> Kelas 3</div>' }
        },
        form: {
            tambah: 'Tambah SLD Derivatif', edit: 'Ubah SLD Derivatif', simpan: 'Simpan SLD', simpanEdit: 'Simpan Perubahan', batal: 'Batal',
            fields: [
                { key: 'nama', label: 'Nama SLD', tipe: 'teks', wajib: true },
                { key: 'keterangan', label: 'Keterangan', tipe: 'textarea' },
                { key: 'file', label: 'Berkas SLD (.sld / .xml)', tipe: 'file', accept: '.sld,.xml', wajib: true },
                { tipe: 'catatan', label: 'Pratinjau legenda muncul setelah berkas SLD dipilih.' }
            ]
        }
    },

    'unggah-derivatif': {
        judul: 'Unggah Data Derivatif', breadcrumb: 'Data Derivatif', kartu: 'Daftar Unggahan Saya',
        info: 'Unggahan Anda diperiksa terlebih dahulu oleh Admin sebelum disetujui dan tayang di peta. Status pengajuan dapat dipantau pada daftar di bawah.',
        tombol: [{ label: 'Unggah Data Derivatif', ikon: 'ri-upload-cloud-2-line', aksi: 'tambah' }],
        filter: [{ key: 'status', label: 'Status', semua: 'Semua Status', opsi: ['Disetujui', 'Menunggu Verifikasi', 'Ditolak'], param: 'status' }],
        sumber: function(role) { return ambilDataSaya(role).derivatif || []; },
        kolom: [
            { key: 'layer', label: 'Layer Derivatif', tipe: 'judul', badgeSub: 'tipe', warnaBadgeSub: WARNA_BASIS },
            { key: 'sld', label: 'SLD Style' },
            { key: 'fitur', label: 'Fitur', tipe: 'html', render: function(b) { return esc(b.fitur.toLocaleString('id-ID')) + ' fitur'; } },
            { key: 'status', label: 'Status', tipe: 'status', warna: WARNA_STATUS_DERIVATIF },
            { key: 'berlaku', label: 'Masa Berlaku' },
            { key: 'tanggal', label: 'Tanggal' },
            { key: 'catatan', label: 'Keterangan / Catatan', tipe: 'html', render: function(b) { return '<small class="text-muted"><b>Catatan:</b> ' + esc(b.catatan) + '</small>'; } }
        ],
        aksi: [
            { teks: 'Pratinjau', ikon: 'ri-map-2-line', warna: 'biru', aksi: 'toast:Pratinjau peta data derivatif dibuka' },
            { teks: 'Hapus', ikon: 'ri-delete-bin-line', warna: 'merah', aksi: 'hapus' }
        ],
        form: {
            tambah: 'Unggah Data Derivatif', simpan: 'Unggah dan Tayangkan', batal: 'Batal',
            fields: [
                { key: 'layer', label: 'Layer Derivatif', tipe: 'pilih', opsi: DAFTAR_LAYER_DERIVATIF, wajib: true },
                { label: 'Berkas SHP (ZIP)', tipe: 'file', accept: '.zip', wajib: true },
                { tipe: 'catatan', label: 'Ringkasan Pemeriksaan SHP: pilih berkas untuk memeriksa kesesuaian atribut, lalu klik "Periksa / Atur Pemetaan Atribut".' },
                { key: 'sld', label: 'SLD Style', tipe: 'pilih', opsi: ['SLD KAWASAN', 'SLD BIDANG', 'coba'], wajib: true },
                { key: 'catatan', label: 'Keterangan', tipe: 'textarea', wajib: true }
            ]
        }
    },

    'verifikasi-derivatif': {
        judul: 'Verifikasi Data Derivatif', breadcrumb: 'Data Derivatif / Verifikasi Data Derivatif',
        deskripsi: 'Semua data derivatif dari dua sumber: pengajuan internal dan Layanan Publik.',
        tombolKepala: [{ label: 'Unggah Data Derivatif', ikon: 'ri-upload-cloud-2-line', aksi: 'link:unggah-derivatif.html' }],
        tabs: [
            { key: 'internal', label: 'Pengajuan Internal', ikon: 'ri-file-list-3-line', kartu: 'Pengajuan Operator, Umum, dan Admin', subKartu: 'Periksa kesesuaian atribut dan SLD sebelum data derivatif ditayangkan.' },
            { key: 'publik', label: 'Layanan Publik', ikon: 'ri-global-line', kartu: 'Pengajuan dari Layanan Publik', subKartu: 'Pengajuan masyarakat melalui portal Layanan Publik.',
                data: [
                    { pengunggah: 'Budi Santoso', satker: 'Masyarakat', layer: 'TES LAYER DERIVATIF KAWASAN', tipe: 'Kawasan', sld: 'SLD KAWASAN', fitur: 54, status: 'Menunggu Verifikasi', berlaku: '28 hari tersisa', tanggal: '24/10/2026' },
                    { pengunggah: 'CV Peta Nusantara', satker: 'Badan Usaha', layer: 'TES LAYER DERIVATIF BIDANG', tipe: 'Bidang', sld: 'SLD BIDANG', fitur: 230, status: 'Disetujui', berlaku: '30 hari', tanggal: '11/10/2026' }
                ] }
        ],
        filter: [{ key: 'status', label: 'Status', semua: 'Semua Status', opsi: ['Menunggu Verifikasi', 'Disetujui', 'Ditolak'] }],
        sumber: semuaDerivatif,
        kolom: [
            { key: 'pengunggah', label: 'Pengunggah', tipe: 'judul', sub: 'satker' },
            { key: 'layer', label: 'Layer Derivatif', tipe: 'judul', badgeSub: 'tipe', warnaBadgeSub: WARNA_BASIS },
            { key: 'sld', label: 'SLD Style' },
            { key: 'fitur', label: 'Fitur', tipe: 'html', render: function(b) { return esc(b.fitur.toLocaleString('id-ID')) + ' fitur'; } },
            { key: 'status', label: 'Status', tipe: 'status', warna: WARNA_STATUS_DERIVATIF },
            { key: 'berlaku', label: 'Masa Berlaku' },
            { key: 'tanggal', label: 'Tanggal' }
        ],
        aksi: [{ teks: 'Periksa', ikon: 'ri-eye-line', warna: 'biru', aksi: 'modal:periksa' }],
        modal: {
            periksa: {
                judul: 'Detail Pengajuan Derivatif', simpan: 'Simpan Keputusan Verifikasi', batal: 'Tutup', lebar: 'modal-lg', pesanSimpan: 'Keputusan verifikasi disimpan',
                fields: [
                    { key: 'pengunggah', label: 'Pengunggah', tipe: 'info', lebar: 'setengah' },
                    { key: 'layer', label: 'Layer Derivatif', tipe: 'info', lebar: 'setengah' },
                    { key: 'sld', label: 'SLD Style', tipe: 'info', lebar: 'setengah' },
                    { key: 'tanggal', label: 'Tanggal Pengajuan', tipe: 'info', lebar: 'setengah' },
                    { tipe: 'judul', label: 'Pemetaan Atribut' },
                    { tipe: 'catatan', label: 'NAMOBJ ← NAMA_OBJ (Text) · KODE ← KD_DESA (Text) · LUAS ← LUAS_HA (Double)' },
                    { tipe: 'judul', label: 'Tindakan Verifikasi' },
                    { label: 'Keputusan Verifikasi', tipe: 'radio', opsi: ['Setujui Pengajuan', 'Tolak Pengajuan'], wajib: true },
                    { label: 'Catatan Verifikasi', tipe: 'textarea' }
                ]
            }
        }
    },

    'list-data-derivatif': {
        judul: 'List Data Derivatif', breadcrumb: 'Data Derivatif / List Data Derivatif',
        deskripsi: 'Layer derivatif yang datanya sudah disahkan admin dan tayang di Geoportal. Layer ini dimuat ke QGIS melalui Plugin QGIS Geoportal IGT-PR.',
        tombolKepala: [{ label: 'Verifikasi Derivatif', ikon: 'ri-checkbox-circle-line', aksi: 'link:verifikasi-derivatif.html' }],
        kartu: 'Layer Derivatif Terverifikasi', subKartu: 'Satu baris per layer: seluruh batch yang disetujui sudah tergabung menjadi satu layer.',
        kolom: [
            { key: 'layer', label: 'Layer Derivatif', tipe: 'judul', badgeSub: 'tipe', warnaBadgeSub: WARNA_BASIS },
            { key: 'batch', label: 'Batch Tergabung', tipe: 'html', render: function(b) { return b.batch + ' batch'; } },
            { key: 'fitur', label: 'Total Fitur', tipe: 'html', render: function(b) { return b.fitur.toLocaleString('id-ID') + ' fitur'; } },
            { key: 'diverifikasi', label: 'Terakhir Diverifikasi' }
        ],
        data: [
            { layer: 'Coba Derivatif Bidang', tipe: 'Bidang', batch: 2, fitur: 44, diverifikasi: '21 Okt 2026, 11.08' },
            { layer: 'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik', tipe: 'Bidang', batch: 1, fitur: 37, diverifikasi: '20 Okt 2026, 23.35' },
            { layer: 'TES LAYER DERIVATIF BIDANG', tipe: 'Bidang', batch: 1, fitur: 46, diverifikasi: '14 Okt 2026, 03.21' },
            { layer: 'TES LAYER DERIVATIF KAWASAN', tipe: 'Kawasan', batch: 5, fitur: 22548, diverifikasi: '26 Okt 2026, 03.30' }
        ],
        aksi: [
            { teks: 'Pratinjau', ikon: 'ri-map-2-line', warna: 'biru', aksi: 'toast:Pratinjau peta layer derivatif dibuka' },
            { teks: 'Lihat Batch', ikon: 'ri-stack-line', warna: 'abu', aksi: 'modal:batch' }
        ],
        modal: {
            batch: {
                judul: function(b) { return 'Batch Penyusun Layer — ' + b.layer; }, simpan: false, batal: 'Tutup Daftar Batch', lebar: 'modal-xl',
                isi: function(b) {
                    var baris = '';
                    for (var i = 1; i <= b.batch; i++) {
                        baris += '<tr><td><strong>' + (i % 2 ? 'Operator Kadastral' : 'cobaoperator') + '</strong><small class="d-block text-muted">Direktorat Pengukuran dan Pemetaan Kadastral</small></td><td>' + esc(b.layer)
                            + '</td><td>SLD ' + esc(b.tipe.toUpperCase()) + '</td><td>' + Math.max(1, Math.round(b.fitur / b.batch)) + ' fitur</td><td>' + (20 - i) + ' Okt 2026</td><td>Batch ' + i + '</td></tr>';
                    }
                    return '<div class="igt-table-wrap"><table class="igt-table"><thead><tr><th>Pengunggah</th><th>Layer Derivatif</th><th>SLD Style</th><th>Fitur</th><th>Diverifikasi</th><th>Keterangan</th></tr></thead><tbody>' + baris + '</tbody></table></div>';
                }
            }
        }
    },

    /* ================= MASTER DATA IGT ================= */
    'ketua-tim': {
        judul: 'Ketua Tim', breadcrumb: 'Master Data IGT', tampilan: 'form', kartu: 'Setting Ketua Tim',
        subKartu: 'Data nama dan NIP Ketua Tim untuk Berita Acara kompilasi & integrasi.',
        form: { simpan: 'Submit Data', nilai: { nama: 'test direktorat', nip: '' }, fields: [
            { key: 'nama', label: 'Nama Ketua Tim', tipe: 'teks', wajib: true },
            { key: 'nip', label: 'NIP Ketua Tim', tipe: 'teks', wajib: true }
        ] }
    },

    'layer-igt': {
        judul: 'Layer IGT', breadcrumb: 'Master Data IGT', kartu: 'Data Layer IGT',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        filter: [{ key: 'direktorat', label: 'Filter Unit Kerja / Direktorat', semua: 'Semua Unit Kerja', opsi: DAFTAR_DIREKTORAT }],
        kolom: [
            { label: 'No', tipe: 'no', lebar: '56px' },
            { key: 'nama', label: 'Nama IGT', tipe: 'judul', sub: 'direktorat' },
            { label: 'Sub Layer', tipe: 'html', render: function(b) {
                var n = (b.sublayer && b.sublayer.nama) || [];
                return n.length ? '<span class="igt-pil igt-pil--biru">' + n.length + ' sublayer</span>' : '<span class="text-muted">Layer tunggal</span>';
            } },
            { key: 'basis', label: 'Basis', tipe: 'badge', warna: { Bidang: 'hijau', Kawasan: 'tosca' } }
        ],
        data: [
            { nama: 'Analisis Tanah Objek Reforma Agraria', direktorat: 'Direktorat Landreform', basis: 'Kawasan' },
            { nama: 'Bidang Tanah', direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal', basis: 'Bidang', sublayer: { nama: ['1:1.000', '1:2.500', '1:10.000'], samaInduk: true } },
            { nama: 'Data Potensi WP3WT', direktorat: 'Direktorat Penatagunaan Tanah', basis: 'Kawasan' },
            { nama: 'Desain Konsolidasi Tanah', direktorat: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', basis: 'Bidang' },
            { nama: 'Dialog Kinerja Tematik Derivatif', direktorat: 'Direktorat Survei dan Pemetaan Tematik', basis: 'Bidang' },
            { nama: 'Hak Atas Tanah', direktorat: 'Direktorat Penetapan Hak Atas Tanah dan Ruang', basis: 'Bidang' },
            { nama: 'Hak Ulayat', direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal', basis: 'Bidang' },
            { nama: 'Indikasi Pelanggaran Pemanfaatan Ruang', direktorat: 'Direktorat Penanganan Perkara Pertanahan', basis: 'Kawasan' },
            { nama: 'Inventarisasi Tanah Kritis', direktorat: 'Direktorat Penatagunaan Tanah', basis: 'Kawasan', sublayer: { nama: ['1:10.000', '1:50.000'], samaInduk: false } },
            { nama: 'Lahan Baku Sawah Nasional', direktorat: 'Direktorat Penatagunaan Tanah', basis: 'Kawasan', sublayer: { nama: ['2025', '2026'], samaInduk: true } },
            { nama: 'Lahan Sawah Dilindungi', direktorat: 'Direktorat Penatagunaan Tanah', basis: 'Kawasan' },
            { nama: 'Zona Nilai Tanah', direktorat: 'Direktorat Survei dan Pemetaan Tematik', basis: 'Bidang', sublayer: { nama: ['2025', '2026'], samaInduk: false } }
        ],
        rincian: function(b) {
            var sub = b.sublayer;
            if (!sub || !sub.nama.length) return null;
            var sama = sub.samaInduk;
            var tautan = function(href, teks) { return '<a href="' + href + '" class="igt-aksi__teks igt-aksi--biru">' + teks + '</a>'; };
            return '<div class="igt-crud-rincian__isi"><div class="igt-crud-rincian__judul">Rincian Sub Layer <span class="igt-pil igt-pil--' + (sama ? 'abu">Atribut & SLD sama dengan induk' : 'tosca">Atribut & SLD terpisah per sublayer') + '</span></div>'
                + '<table class="igt-table"><thead><tr><th class="igt-table__no">No</th><th>Nama Sublayer</th><th>Atribut</th><th>SLD</th><th>Aksi</th></tr></thead><tbody>'
                + sub.nama.map(function(n, i) {
                    return '<tr><td class="igt-table__no">' + (i + 1) + '</td><td><strong>' + esc(b.nama) + ' › ' + esc(n) + '</strong></td>'
                        + '<td>' + (sama ? '<span class="text-muted">Mengikuti induk</span>' : '<span class="igt-pil igt-pil--hijau">Atribut sendiri</span>') + '</td>'
                        + '<td>' + (sama ? '<span class="text-muted">Mengikuti induk</span>' : '<span class="igt-pil igt-pil--hijau">SLD sendiri</span>') + '</td>'
                        + '<td><div class="igt-aksi">' + (sama ? '' : tautan('atribut-data.html', 'Kelola Atribut') + tautan('sld.html', 'Kelola SLD'))
                        + '<button type="button" class="igt-aksi__ikon igt-aksi--kuning" title="Edit Sublayer" data-sub-edit="' + i + '"><i class="ri-edit-line"></i></button>'
                        + '<button type="button" class="igt-aksi__ikon igt-aksi--merah" title="Hapus Sublayer" data-sub-hapus-baris="' + i + '"><i class="ri-delete-bin-line"></i></button></div></td></tr>';
                }).join('') + '</tbody></table></div>';
        },
        aksi: [AKSI_EDIT, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Data IGT', edit: 'Ubah Data IGT', lebar: 'modal-lg',
            fields: [
                { key: 'direktorat', label: 'Nama Direktorat / Unit Kerja', tipe: 'pilih', opsi: DAFTAR_DIREKTORAT, wajib: true, placeholder: 'Pilih Direktorat PIC (unit pertama) dan opsi wilayah...' },
                { key: 'nama', label: 'Nama IGT', tipe: 'teks', wajib: true, placeholder: 'Masukan Nama IGT' },
                { label: 'Kategori IGT', tipe: 'pilih', opsi: ['IGT Pertanahan', 'IGT Tata Ruang'], wajib: true, lebar: 'setengah' },
                { label: 'Tipe IGT', tipe: 'pilih', opsi: ['IGT Dasar', 'IGT Tematik'], wajib: true, lebar: 'setengah' },
                { key: 'sublayer', tipe: 'sublayer' },
                { key: 'basis', label: 'Basis IGT', tipe: 'pilih', opsi: ['Bidang', 'Kawasan'], wajib: true, lebar: 'setengah' },
                { label: 'Baseline Referensi (Wajib jika basis Bidang)', tipe: 'pilih', opsi: DAFTAR_BASELINE, placeholder: 'Tidak menggunakan Baseline', lebar: 'setengah' },
                { label: 'Kewenangan Akses Layer IGT', tipe: 'pilih-banyak', opsi: DAFTAR_DIREKTORAT, bantuan: 'Kanwil dan Kantah bisa dicari lewat nama provinsi atau kabupaten/kota.' },
                { label: 'Kewenangan Akses Atribut Private', tipe: 'pilih-banyak', opsi: DAFTAR_DIREKTORAT },
                { label: 'Dokumen NSPK terkait produksi IGT (Opsional)', tipe: 'file', accept: '.pdf', lebar: 'setengah' },
                { label: 'Dokumen Penetapan IGT (Opsional)', tipe: 'file', accept: '.pdf', lebar: 'setengah' }
            ]
        }
    },

    'atribut-data': {
        judul: 'Atribut Data', breadcrumb: 'Master Data IGT', kartu: 'Data Atribut',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        filter: [{ key: 'igt', label: 'Filter IGT', semua: 'Semua IGT', opsi: DAFTAR_IGT_SUBLAYER }],
        kolom: [
            { key: 'kolom', label: 'Column', tipe: 'judul', sub: 'igt' },
            { key: 'keterangan', label: 'Keterangan' },
            { key: 'tipe', label: 'Type Data' },
            { key: 'panjang', label: 'Length' },
            { key: 'nullable', label: 'Nullable' }
        ],
        data: [
            { kolom: 'OBJECTID', igt: 'Analisis Tanah Objek Reforma Agraria', keterangan: 'Automated generated by system', tipe: 'Text/String', panjang: 250, nullable: 'Tidak' },
            { kolom: 'NAMOBJ', igt: 'Analisis Tanah Objek Reforma Agraria', keterangan: 'Klasifikasi khusus pada objek analisis tanah objek reforma agraria', tipe: 'Text/String', panjang: 250, nullable: 'Tidak' },
            { kolom: 'WADMPR', igt: 'Analisis Tanah Objek Reforma Agraria', keterangan: 'Nama provinsi berdasarkan Kementerian Dalam Negeri', tipe: 'Text/String', panjang: 50, nullable: 'Tidak' },
            { kolom: 'WADMKK', igt: 'Analisis Tanah Objek Reforma Agraria', keterangan: 'Nama kabupaten atau kota berdasarkan Kementerian Dalam Negeri', tipe: 'Text/String', panjang: 50, nullable: 'Tidak' },
            { kolom: 'WADMKC', igt: 'Analisis Tanah Objek Reforma Agraria', keterangan: 'Nama kecamatan berdasarkan Kementerian Dalam Negeri', tipe: 'Text/String', panjang: 50, nullable: 'Tidak' },
            { kolom: 'TGLSKPEL', igt: 'Analisis Tanah Objek Reforma Agraria', keterangan: 'Tanggal keluar surat keputusan pelepasan (dd/mm/yyyy)', tipe: 'Date', panjang: '-', nullable: 'Tidak' },
            { kolom: 'NIB', igt: 'Bidang Tanah', keterangan: 'Nomor Identifikasi Bidang', tipe: 'Text/String', panjang: 14, nullable: 'Tidak' },
            { kolom: 'LUASTERTUL', igt: 'Bidang Tanah', keterangan: 'Luas bidang tertulis (m²)', tipe: 'Double', panjang: '-', nullable: 'Ya' },
            { kolom: 'TIPEHAK', igt: 'Hak Atas Tanah', keterangan: 'Jenis hak atas tanah', tipe: 'Text/String', panjang: 30, nullable: 'Tidak' },
            { kolom: 'KELASZNT', igt: 'Zona Nilai Tanah', keterangan: 'Kelas nilai tanah per m²', tipe: 'Integer', panjang: '-', nullable: 'Tidak' },
            { kolom: 'NILAIZNT', igt: 'Zona Nilai Tanah', keterangan: 'Nilai tanah rata-rata (Rp/m²)', tipe: 'Double', panjang: '-', nullable: 'Ya' },
            { kolom: 'KELASZNT', igt: 'Zona Nilai Tanah › 2026', keterangan: 'Kelas nilai tanah per m² (skema 2026)', tipe: 'Integer', panjang: '-', nullable: 'Tidak' },
            { kolom: 'NIRZNT', igt: 'Zona Nilai Tanah › 2026', keterangan: 'Nilai indikasi rata-rata (Rp/m²), atribut baru 2026', tipe: 'Double', panjang: '-', nullable: 'Ya' }
        ],
        aksi: [AKSI_EDIT, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Atribut', edit: 'Ubah Atribut', lebar: 'modal-lg',
            fields: [
                { key: 'igt', label: 'Nama IGT', tipe: 'pilih', opsi: DAFTAR_IGT_SUBLAYER, wajib: true },
                { key: 'kolom', label: 'Column', tipe: 'teks', wajib: true, lebar: 'setengah' },
                { key: 'keterangan', label: 'Keterangan Column', tipe: 'teks', wajib: true, lebar: 'setengah' },
                { key: 'tipe', label: 'Type Data', tipe: 'pilih', opsi: ['Text/String', 'Integer', 'Double', 'Date'], wajib: true, lebar: 'setengah' },
                { key: 'panjang', label: 'Length', tipe: 'angka', wajib: true, lebar: 'setengah' },
                { key: 'nullable', label: 'Nullable', tipe: 'pilih', opsi: ['Ya', 'Tidak'], wajib: true, lebar: 'setengah' },
                { label: 'Tampilkan di WMS?', tipe: 'pilih', opsi: ['Ya', 'Tidak'], wajib: true, lebar: 'setengah' }
            ]
        }
    },

    'metadata': {
        judul: 'Metadata', breadcrumb: 'Master Data IGT', kartu: 'Data Berkas Metadata (XML)',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        filter: [{ key: 'igt', label: 'Filter IGT', semua: 'Semua IGT', opsi: DAFTAR_IGT }],
        kolom: [
            { key: 'nama', label: 'Nama Metadata', tipe: 'judul' },
            { key: 'igt', label: 'IGT Terkait' },
            { key: 'keterangan', label: 'Keterangan' },
            { key: 'file', label: 'File', tipe: 'file' }
        ],
        data: [
            { nama: 'Bidang Tanah Jawa Barat Bekasi', igt: 'Bidang Tanah', keterangan: '-', file: 'bidang_tanah_jawa_barat_kota_bekasi_metadata.xml' },
            { nama: 'Zona Nilai Tanah D.I. Yogyakarta', igt: 'Zona Nilai Tanah', keterangan: 'Metadata ZNT 2026', file: 'znt_diy_2026_metadata.xml' },
            { nama: 'Lahan Sawah Dilindungi Nasional', igt: 'Lahan Sawah Dilindungi', keterangan: '-', file: 'lsd_nasional_metadata.xml' }
        ],
        aksi: [
            { ikon: 'ri-download-2-line', warna: 'biru', judul: 'Unduh Berkas', aksi: 'toast:Berkas metadata diunduh' },
            { ikon: 'ri-upload-2-line', warna: 'hijau', judul: 'Upload Metadata Baru', aksi: 'edit' },
            { ikon: 'ri-edit-line', warna: 'kuning', judul: 'Edit Metadata', aksi: 'modal:editMetadata' },
            AKSI_HAPUS
        ],
        modal: {
            editMetadata: {
                judul: 'Preview Metadata', lebar: 'modal-xl', simpan: 'Simpan Perubahan', batal: 'Close', pesanSimpan: 'Perubahan metadata disimpan',
                tombolLain: '<button type="button" class="btn btn-outline-secondary me-auto" data-xml-mentah>Edit XML Mentah</button>',
                isi: function(b) {
                    var pasangan = atributMetadata(b);
                    return '<div class="igt-meta-info">' + pasangan.length + ' pasangan atribut dan nilai dari ' + esc(b.file) + '. Tekan Edit pada baris untuk memperbaiki nilainya.</div>'
                        + '<div class="igt-xml-tabel igt-table-wrap"><table class="igt-table igt-meta-tabel"><thead><tr><th>Atribut</th><th>Nilai</th><th class="text-center">Aksi</th></tr></thead><tbody>'
                        + pasangan.map(function(p) {
                            return '<tr><td><strong>' + esc(p[0]) + '</strong></td><td data-nilai>' + esc(p[1]) + '</td>'
                                + '<td class="text-center"><button type="button" class="igt-aksi__teks igt-aksi--kuning" data-nilai-edit><i class="ri-edit-line"></i> Edit</button></td></tr>';
                        }).join('') + '</tbody></table></div>'
                        + '<textarea class="form-control igt-xml-mentah d-none" rows="18" spellcheck="false">' + esc(xmlMetadata(pasangan)) + '</textarea>';
                }
            }
        },
        form: {
            tambah: 'Tambah Data Metadata', edit: 'Upload Metadata Baru', simpanEdit: 'Upload & Ganti Berkas',
            fields: [
                { key: 'nama', label: 'Nama Metadata', tipe: 'teks', wajib: true },
                { key: 'igt', label: 'IGT Terkait', tipe: 'pilih', opsi: DAFTAR_IGT, wajib: true },
                { key: 'keterangan', label: 'Keterangan', tipe: 'textarea' },
                { key: 'file', label: 'File Metadata (XML)', tipe: 'file', accept: '.xml', wajib: true }
            ]
        }
    },

    'target-master': {
        judul: 'Target Data IGT Master', breadcrumb: 'Master Data IGT', kartu: 'Target Data IGT Master',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        sumber: function() { return (window.MOCKUP_DATA && window.MOCKUP_DATA.targetIgt) || []; },
        filter: [{ key: 'tahun', label: 'Filter Tahun', semua: 'Semua Tahun', opsi: ['2026', '2025', '2024', '2023'] }],
        kolom: [
            { label: 'No', tipe: 'no', lebar: '56px' },
            { key: 'igt', label: 'Nama IGT', tipe: 'judul' },
            { key: 'target', label: 'Jumlah Target' },
            { key: 'satuan', label: 'Satuan' },
            { key: 'tahun', label: 'Tahun' }
        ],
        aksi: [AKSI_EDIT, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Data Target Master', edit: 'Ubah Data Master Target',
            fields: [
                { key: 'igt', label: 'Nama IGT', tipe: 'pilih', opsi: DAFTAR_IGT, wajib: true },
                { key: 'target', label: 'Jumlah Target', tipe: 'angka', wajib: true, lebar: 'setengah' },
                { key: 'satuan', label: 'Satuan', tipe: 'pilih', opsi: ['Bidang', 'Kawasan', 'Lokasi', 'Kabupaten/Kota', 'Provinsi'], wajib: true, lebar: 'setengah' },
                { key: 'tahun', label: 'Tahun', tipe: 'pilih', opsi: ['2023', '2024', '2025', '2026'], wajib: true }
            ]
        }
    },

    'baseline': {
        judul: 'Baseline', breadcrumb: 'Master Data IGT', kartu: 'Daftar Baseline',
        tombol: [{ label: 'Tambah Baseline', ikon: 'ri-add-line', aksi: 'tambah' }],
        kolom: [
            { label: 'No', tipe: 'no', lebar: '56px' },
            { key: 'nama', label: 'Nama Baseline' },
            { key: 'file', label: 'Nama File SHP / WFS' },
            { key: 'tanggal', label: 'Tanggal Dibuat' }
        ],
        data: [
            { nama: 'Test Baseline Yogjakarta', file: 'baseline:BIDANG_PERSIL_DIY', tanggal: '2026-10-19' },
            { nama: 'Baseline Hak Atas Tanah 1', file: 'volatil-master-layer-igt:TEST_BIDANG_TANAH', tanggal: '2026-10-13' },
            { nama: 'TEST ZNT BADUNG dari wfs staging volatil', file: 'volatil-master-layer-igt:TEST_ZNT_BADUNG', tanggal: '2026-10-11' },
            { nama: 'Baseline bidang tanah berdasarkan wfs', file: 'volatil-master-layer-igt:TEST_BIDANG_TANAH', tanggal: '2026-10-11' },
            { nama: 'BASELINE BIDANG TANAH', file: 'BASELIN 1', tanggal: '2026-08-13' }
        ],
        aksi: [
            { ikon: 'ri-map-2-line', warna: 'biru', judul: 'Lihat Peta', aksi: 'toast:Peta baseline dibuka' },
            { ikon: 'ri-upload-cloud-2-line', warna: 'hijau', judul: 'Upload SHP Batch Baru', aksi: 'modal:batch' },
            { ikon: 'ri-history-line', warna: 'tosca', judul: 'Riwayat Unggahan & Cakupan', aksi: 'modal:riwayat' },
            AKSI_HAPUS
        ],
        modal: {
            batch: { judul: 'Upload SHP Batch Baru', simpan: 'Upload', batal: 'Batal', lebar: 'modal-md', fields: [{ label: 'File SHP ZIP', tipe: 'file', accept: '.zip', wajib: true }] },
            riwayat: { judul: 'Riwayat Unggahan & Cakupan Baseline', simpan: false, batal: 'Tutup', lebar: 'modal-xl',
                isi: '<div class="igt-table-wrap"><table class="igt-table"><thead><tr><th>No</th><th>Tanggal</th><th>File</th><th>Provinsi / Kota</th><th>Status</th><th>Fitur</th><th>Ditambah</th><th>Diperbarui</th><th>Dilewati</th></tr></thead><tbody>'
                    + '<tr><td>1</td><td>2026-10-19</td><td>BIDANG_PERSIL_DIY.zip</td><td>D.I. Yogyakarta</td><td><span class="igt-pil igt-pil--hijau">Selesai</span></td><td>12.480</td><td>12.300</td><td>150</td><td>30</td></tr>'
                    + '<tr><td>2</td><td>2026-10-21</td><td>BIDANG_PERSIL_SLEMAN.zip</td><td>Kab. Sleman</td><td><span class="igt-pil igt-pil--hijau">Selesai</span></td><td>4.210</td><td>4.100</td><td>98</td><td>12</td></tr>'
                    + '</tbody></table></div>' }
        },
        form: {
            tambah: 'Tambah Baseline', simpan: 'Simpan', batal: 'Batal',
            fields: [
                { key: 'nama', label: 'Nama Baseline', tipe: 'teks', wajib: true },
                { label: 'Sumber Baseline', tipe: 'radio', opsi: ['File SHP (Format ZIP)', 'GeoServer / WFS'], nilai: 'File SHP (Format ZIP)', wajib: true },
                { label: 'File SHP (Format ZIP)', tipe: 'file', accept: '.zip' },
                { label: 'Alamat GeoServer / WFS', tipe: 'teks', placeholder: 'https://geoserver.atrbpn.go.id/wfs', lebar: 'setengah' },
                { label: 'Layer', tipe: 'pilih', opsi: ['baseline:BIDANG_PERSIL_DIY', 'volatil-master-layer-igt:TEST_BIDANG_TANAH'], lebar: 'setengah' }
            ]
        }
    },

    'data-lainnya': {
        judul: 'Data Lainnya', breadcrumb: 'Master Data IGT', kartu: 'Data Lainnya',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { key: 'tanggal', label: 'Tanggal Upload', tipe: 'judul' },
            { key: 'keterangan', label: 'Keterangan' },
            { key: 'kategori', label: 'Kategori' },
            { key: 'baseline', label: 'Baseline' },
            { key: 'file', label: 'Type', tipe: 'html', render: function(b) { return '<strong>' + esc(b.tipe) + '</strong> <span class="igt-sel-file"><i class="ri-download-2-line"></i>' + esc(b.file) + '</span>'; } }
        ],
        data: [
            { tanggal: '2026-10-22', keterangan: 'Kawasan Hutan Kementerian Kehutanan', kategori: 'external', baseline: '-', tipe: 'shp', file: 'Kawasan_Hutan_Kementerian_Kehutanan_4326' },
            { tanggal: '2026-10-16', keterangan: 'Izin Usaha Pertambangan', kategori: 'external', baseline: '-', tipe: 'shp', file: 'Izin Usaha Pertambangan - IUP' }
        ],
        aksi: [{ ikon: 'ri-map-2-line', warna: 'tosca', judul: 'Lihat di Peta', aksi: 'toast:Peta data lainnya dibuka' }, AKSI_EDIT, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Data Lainnya', edit: 'Ubah Data Lainnya',
            fields: [
                { key: 'tanggal', label: 'Tanggal Upload', tipe: 'tanggal', wajib: true, lebar: 'setengah' },
                { key: 'kategori', label: 'Kategori', tipe: 'pilih', opsi: ['external', 'internal'], wajib: true, lebar: 'setengah' },
                { key: 'keterangan', label: 'Keterangan', tipe: 'teks', wajib: true },
                { key: 'tipe', label: 'Type Data', tipe: 'pilih', opsi: ['shp', 'web service'], wajib: true, lebar: 'setengah' },
                { label: 'Jenis Web Service', tipe: 'pilih', opsi: ['WMS', 'WFS', 'ArcGIS REST'], lebar: 'setengah' },
                { label: 'Web Service URL', tipe: 'teks' },
                { label: 'Baseline (Opsional – pilih jika polygon SHP sama dengan baseline)', tipe: 'pilih', opsi: DAFTAR_BASELINE },
                { label: 'SHP (Format zip)', tipe: 'file', accept: '.zip', lebar: 'setengah' },
                { label: 'SLD', tipe: 'pilih', opsi: ['SLD Kawasan Hutan', 'SLD IUP'], wajib: true, lebar: 'setengah' }
            ]
        }
    },

    /* ================= STYLE PETA ================= */
    'sld': {
        judul: 'SLD', breadcrumb: 'Style Peta', kartu: 'Data SLD',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { key: 'nama', label: 'Nama SLD', tipe: 'judul' },
            { key: 'igt', label: 'IGT Terkait' },
            { key: 'keterangan', label: 'Keterangan' },
            { key: 'file', label: 'File', tipe: 'file' }
        ],
        data: [
            { nama: 'Data Potensi WP3WT', igt: 'Data Potensi WP3WT', keterangan: 'SLD Data Potensi WP3WT', file: 'Simbolisasi_SEBARANTORA_Updated' },
            { nama: 'Desain Konsolidasi Tanah', igt: 'Desain Konsolidasi Tanah', keterangan: 'Desain Konsolidasi Tanah', file: 'simbologi_desainkt' },
            { nama: 'Hak Atas Tanah', igt: 'Hak Atas Tanah', keterangan: 'SLD IGT Hak Atas Tanah', file: 'SIMBOLOGI_HAK_ATAS_TANAH' },
            { nama: 'Inventarisasi Tanah Kritis', igt: 'Inventarisasi Tanah Kritis', keterangan: 'SLD Inventarisasi Tanah Kritis', file: 'SIMBOLOGI_10K_AR_DJPA_TANAHKRITIS_2025' },
            { nama: 'Kemampuan Tanah', igt: 'Kemampuan Tanah', keterangan: 'SLD Kemampuan Tanah', file: 'sld_kemampuantanah' },
            { nama: 'Kesesuaian Kegiatan Pemanfaatan Ruang', igt: 'Kesesuaian Kegiatan Pemanfaatan Ruang', keterangan: 'SLD IGT Kesesuaian Kegiatan Pemanfaatan Ruang', file: 'sld_kkpr' },
            { nama: 'Lahan Baku Sawah', igt: 'Lahan Baku Sawah Nasional', keterangan: '-', file: 'LBS SLD' },
            { nama: 'Lokasi Pengembangan Pertanahan', igt: 'Lokasi Pengembangan Pertanahan', keterangan: 'Lokasi Pengembangan Pertanahan', file: 'simbologi_lokasipp' },
            { nama: 'Nilai Bidang Tanah', igt: 'Nilai Bidang Tanah', keterangan: 'Nilai Bidang Tanah', file: '_1K_AR_DJPTPP_NILAIBIDANGTANAH_2021' },
            { nama: 'NPGT', igt: 'Neraca Penatagunaan Tanah', keterangan: '-', file: '_25K_AR_DJPA_NPGT_2023' },
            { nama: 'Zona Nilai Tanah 2025', igt: 'Zona Nilai Tanah › 2025', keterangan: 'SLD ZNT sublayer 2025', file: 'sld_znt_2025' },
            { nama: 'Zona Nilai Tanah 2026', igt: 'Zona Nilai Tanah › 2026', keterangan: 'SLD ZNT sublayer 2026', file: 'sld_znt_2026' }
        ],
        aksi: [{ ikon: 'ri-eye-line', warna: 'tosca', judul: 'Preview SLD', aksi: 'modal:pratinjau' }, AKSI_EDIT, AKSI_HAPUS],
        modal: {
            pratinjau: { judul: function(b) { return 'Preview SLD — ' + b.nama; }, simpan: false, batal: 'Close', lebar: 'modal-md',
                isi: '<div class="igt-legenda-pratinjau"><span style="background:#bbf7d0"></span> Kelas Rendah<span style="background:#4ade80"></span> Kelas Sedang<span style="background:#15803d"></span> Kelas Tinggi</div>' }
        },
        form: {
            tambah: 'Tambah Data SLD', edit: 'Ubah Data SLD',
            fields: [
                { key: 'nama', label: 'Nama SLD', tipe: 'teks', wajib: true },
                { key: 'igt', label: 'IGT Terkait', tipe: 'pilih', opsi: DAFTAR_IGT_SUBLAYER },
                { key: 'keterangan', label: 'Keterangan', tipe: 'textarea' },
                { key: 'file', label: 'File SLD', tipe: 'file', accept: '.sld,.xml', wajib: true }
            ]
        }
    },

    'symbology': {
        judul: 'Symbology', breadcrumb: 'Style Peta', kartu: 'Data Symbology',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { key: 'layer', label: 'Layer IGT' },
            { key: 'atribut', label: 'Atribut Patokan' },
            { key: 'jumlah', label: 'Jumlah Berkas', tipe: 'html', render: function(b) { return b.jumlah + ' Files'; } },
            { key: 'keterangan', label: 'Keterangan' }
        ],
        data: [
            { layer: 'Pemanfaatan Tanah', atribut: 'PFNOBJRI', jumlah: 37, keterangan: '' },
            { layer: 'RTRW Kabupaten', atribut: 'NAMOBJ', jumlah: 26, keterangan: '' },
            { layer: 'RTRW Provinsi', atribut: 'NAMOBJ', jumlah: 29, keterangan: '' },
            { layer: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', atribut: 'SEKUSH', jumlah: 9, keterangan: '' }
        ],
        aksi: [
            { ikon: 'ri-eye-line', warna: 'tosca', judul: 'Preview', aksi: 'toast:Pratinjau symbology dibuka' },
            { ikon: 'ri-download-2-line', warna: 'biru', judul: 'Download ZIP', aksi: 'toast:Berkas ZIP symbology diunduh' },
            AKSI_EDIT, AKSI_HAPUS
        ],
        form: {
            tambah: 'Tambah Data Symbology', edit: 'Ubah Data Symbology', simpan: 'Simpan', batal: 'Tutup',
            fields: [
                { key: 'layer', label: 'Layer IGT', tipe: 'pilih', opsi: DAFTAR_IGT, wajib: true },
                { label: 'Gaya SLD', tipe: 'file', accept: '.zip', wajib: true, bantuan: 'Unggah kumpulan berkas SLD dalam format ZIP.' },
                { key: 'atribut', label: 'Atribut Patokan', tipe: 'teks', wajib: true },
                { key: 'keterangan', label: 'Keterangan', tipe: 'textarea' }
            ]
        }
    },

    /* ================= ANALISIS & LAYANAN ================= */
    'tumpang-susun': {
        judul: 'Tumpang Susun', breadcrumb: 'Analisis & Layanan', kartu: 'Data Tumpang Susun',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { key: 'igt', label: 'Nama IGT', tipe: 'judul' },
            { key: 'dengan', label: 'Tumpang Susun Dengan', tipe: 'judul' }
        ],
        data: [
            { igt: 'Bidang Tanah', dengan: 'RDTR Kabupaten/ Kota' },
            { igt: 'Bidang Tanah', dengan: 'RTRW Kabupaten' },
            { igt: 'Bidang Tanah', dengan: 'RTRW Kota' },
            { igt: 'Bidang Tanah', dengan: 'RTRW Provinsi' }
        ],
        aksi: [AKSI_EDIT, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Data Tumpang Susun', edit: 'Ubah Data Tumpang Susun', lebar: 'modal-md',
            fields: [
                { key: 'igt', label: 'Nama IGT', tipe: 'pilih', opsi: DAFTAR_IGT, wajib: true },
                { key: 'dengan', label: 'Tumpang Susun Dengan', tipe: 'pilih', opsi: DAFTAR_IGT, wajib: true }
            ]
        }
    },

    'model-builder': {
        judul: 'Model Builder QGIS', breadcrumb: 'Analisis & Layanan', kartu: 'Data Model Builder QGIS (.model3)',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { label: 'No', tipe: 'no', lebar: '56px' },
            { key: 'nama', label: 'Nama Model Builder' },
            { key: 'tujuan', label: 'Direktorat Tujuan', tipe: 'html', render: function(b) {
                return esc(b.tujuan) + (b.tambahan ? ' <span class="igt-pil igt-pil--biru">+' + b.tambahan + ' Direktorat</span>' : '');
            } },
            { key: 'keterangan', label: 'Keterangan' }
        ],
        data: [
            { nama: 'Intersect dan Join', tujuan: 'Sekretariat Direktorat Jenderal Penetapan Hak dan Pendaftaran Tanah', keterangan: 'Intersect dan Join' },
            { nama: 'Test Builder Analisis', tujuan: 'Direktorat Survei dan Pemetaan Tematik', tambahan: 28, keterangan: 'test' }
        ],
        aksi: [{ ikon: 'ri-search-eye-line', warna: 'kuning', judul: 'Detail / Edit', aksi: 'edit' }, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Model Builder', edit: 'Ubah Model Builder',
            fields: [
                { label: 'Direktorat yang Dituju', tipe: 'pilih-banyak', opsi: DAFTAR_DIREKTORAT, wajib: true },
                { key: 'nama', label: 'Nama Model Builder', tipe: 'teks', wajib: true },
                { key: 'keterangan', label: 'Keterangan', tipe: 'textarea' },
                { label: 'File Model Builder (.model3)', tipe: 'file', accept: '.model3', wajib: true }
            ]
        }
    },

    'web-service': {
        judul: 'Web Service', breadcrumb: 'Analisis & Layanan', tampilan: 'perbaikan',
        kartu: 'Halaman sedang dalam perbaikan',
        kosongTeks: 'Halaman Web Service pada aplikasi asli saat ini menampilkan "500 | Server Error". Tampilan akan ditambahkan setelah halaman aslinya tersedia.'
    },

    /* ================= PENGGUNA & AKSES ================= */
    'user-management': {
        judul: 'User Management', breadcrumb: 'Pengguna & Akses', kartu: 'Data User',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { key: 'nama', label: 'Nama & Email', tipe: 'html', render: function(b) {
                return '<div class="igt-sel-judul"><strong>' + esc(b.nama) + '</strong> ' + badgeHtml(b.akun, 'abu') + '<small>' + esc(b.email) + '</small></div>';
            } },
            { key: 'direktorat', label: 'Direktorat', tipe: 'html', render: function(b) {
                return b.direktorat ? esc(b.direktorat) + ' ' + badgeHtml(b.wilayah, { Pusat: 'gelap', Kanwil: 'biru', Kantah: 'hijau' }[b.wilayah]) : '-';
            } },
            { key: 'role', label: 'Role' }
        ],
        data: [
            { nama: 'Administrator', akun: 'Lokal', email: 'admin@contoh.go.id', direktorat: '', role: 'Superadmin' },
            { nama: 'User Umum', akun: 'Lokal', email: 'umum@contoh.id', direktorat: '', role: 'Umum' },
            { nama: 'Operator DIY', akun: 'Lokal', email: 'operator.diy@contoh.go.id', direktorat: 'Kantor Wilayah BPN Provinsi D.I. Yogyakarta', wilayah: 'Kanwil', role: 'Operator' },
            { nama: 'Rizky Pratama', akun: 'Lokal', email: 'rizky.pratama@contoh.go.id', direktorat: 'Direktorat Pengukuran dan Pemetaan Kadastral', wilayah: 'Pusat', role: 'Operator' },
            { nama: 'Admin Pusat 2', akun: 'Lokal', email: 'admin2@contoh.go.id', direktorat: '', role: 'Superadmin' },
            { nama: 'Nur Aini', akun: 'Lokal', email: 'nur.aini@contoh.go.id', direktorat: 'Kantor Pertanahan Kabupaten Gunungkidul', wilayah: 'Kantah', role: 'Operator' },
            { nama: 'Fajar Nugroho', akun: 'Lokal', email: 'fajar.nugroho@contoh.go.id', direktorat: 'Kantor Pertanahan Kabupaten Kulon Progo', wilayah: 'Kantah', role: 'Operator' },
            { nama: 'Dimas Saputra', akun: 'Lokal', email: 'dimas.saputra@contoh.go.id', direktorat: 'Kantor Pertanahan Kabupaten Bantul', wilayah: 'Kantah', role: 'Operator' },
            { nama: 'Operator SPPR', akun: 'SSO', email: 'operator.sppr@contoh.go.id', direktorat: 'Direktorat Survei dan Pemetaan Tematik', wilayah: 'Pusat', role: 'Operator' },
            { nama: 'Admin Ditjen SPPR', akun: 'SSO', email: 'admin.sppr@contoh.go.id', direktorat: 'Direktorat Survei dan Pemetaan Tematik', wilayah: 'Pusat', role: 'Admin' },
            { nama: 'Putri Maharani', akun: 'Lokal', email: 'putri.maharani@contoh.go.id', direktorat: 'Kantor Pertanahan Kota Yogyakarta', wilayah: 'Kantah', role: 'Operator' },
            { nama: 'Pengguna Umum 2', akun: 'Lokal', email: 'umum2@contoh.id', direktorat: '', role: 'Umum' }
        ],
        aksi: [AKSI_EDIT, { ikon: 'ri-shield-keyhole-line', warna: 'abu', judul: 'Reset MFA', aksi: 'toast:MFA pengguna direset' }, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Data User', edit: 'Ubah Data User',
            fields: [
                { key: 'role', label: 'Status Kewenangan Akses (Role)', tipe: 'pilih', opsi: ['Superadmin', 'Admin', 'Operator', 'Umum'], wajib: true, lebar: 'setengah' },
                { key: 'wilayah', label: 'Status Wilayah Kerja', tipe: 'pilih', opsi: ['Pusat', 'Kanwil', 'Kantah'], lebar: 'setengah' },
                { key: 'direktorat', label: 'Nomenklatur Wilayah Kerja (Satker)', tipe: 'pilih', opsi: DAFTAR_DIREKTORAT.concat(['Kantor Wilayah BPN Provinsi D.I. Yogyakarta', 'Kantor Pertanahan Kabupaten Gunungkidul']), wajib: true },
                { key: 'nama', label: 'Nama Lengkap', tipe: 'teks', wajib: true },
                { label: 'NIP (akun SSO)', tipe: 'teks', lebar: 'setengah' },
                { key: 'email', label: 'Email', tipe: 'email', wajib: true, lebar: 'setengah' },
                { label: 'Password (bila NIP kosong)', tipe: 'password' }
            ]
        }
    },

    'role-management': {
        judul: 'Role Management', breadcrumb: 'Pengguna & Akses', kartu: 'Daftar Role & Hak Akses Operasional',
        tombol: [{ label: 'Tambah Role', ikon: 'ri-add-line', aksi: 'tambah' }],
        kolom: [
            { key: 'nama', label: 'Nama Role', tipe: 'judul' },
            { key: 'akses', label: 'Hak Akses Operasional', tipe: 'chips' },
            { key: 'tipe', label: 'Tipe', tipe: 'html', render: function(b) {
                return b.tipe === 'Sistem' ? '<span class="igt-pil igt-pil--gelap"><i class="ri-lock-line"></i> Sistem</span>' : badgeHtml(b.tipe, 'biru');
            } },
            { key: 'pengguna', label: 'Pengguna', tipe: 'html', render: function(b) { return '<span class="igt-pil igt-pil--abu">' + b.pengguna + ' user</span>'; } }
        ],
        data: (function() {
            function akses(baca, tulis, wfs, verif) {
                return [{ label: 'Baca', aktif: baca, warna: 'biru' }, { label: 'Tulis', aktif: tulis, warna: 'hijau' }, { label: 'WFS', aktif: wfs, warna: 'tosca' }, { label: 'Verifikasi', aktif: verif, warna: 'kuning' }];
            }
            return [
                { nama: 'Admin', akses: akses(true, true, true, true), tipe: 'Bawaan', pengguna: 1 },
                { nama: 'Superadmin', akses: akses(true, true, true, true), tipe: 'Sistem', pengguna: 6 },
                { nama: 'Operator', akses: akses(true, true, false, false), tipe: 'Bawaan', pengguna: 13 },
                { nama: 'Umum', akses: akses(true, false, false, false), tipe: 'Sistem', pengguna: 3 }
            ];
        })(),
        terkunci: function(b) { return b.tipe === 'Sistem'; },
        aksi: [{ ikon: 'ri-edit-line', warna: 'kuning', judul: 'Edit Role', aksi: 'edit' }],
        form: {
            tambah: 'Tambah Role Baru', edit: 'Ubah Role & Hak Akses', simpan: 'Simpan Role', simpanEdit: 'Simpan Perubahan', batal: 'Batal', lebar: 'modal-md',
            fields: [
                { key: 'nama', label: 'Nama Role', tipe: 'teks', wajib: true },
                { tipe: 'judul', label: 'Hak Akses Operasional' },
                { label: 'Baca (WMS / Layer) - Dapat melihat katalog peta & layer', tipe: 'checkbox', nilai: true },
                { label: 'Tulis / Unggah - Dapat mengunggah data kompilasi & atribut', tipe: 'checkbox' },
                { label: 'WFS (Edit Spasial Direct) - Izin download fitur & edit geometri di QGIS', tipe: 'checkbox' },
                { label: 'Verifikasi & Berita Acara - Dapat memvalidasi & menerbitkan BA', tipe: 'checkbox' }
            ]
        }
    },

    'direktorat': {
        judul: 'Direktorat', breadcrumb: 'Pengguna & Akses', kartu: 'Data Direktorat',
        tombol: [{ label: 'Tambah Data', aksi: 'tambah' }],
        kolom: [
            { key: 'nama', label: 'Nama Direktorat', tipe: 'judul' },
            { key: 'pejabat', label: 'Nama Pejabat', tipe: 'html', render: function(b) {
                return '<div class="igt-sel-judul"><strong>' + esc(b.pejabat) + '</strong><small>NIP: ' + esc(b.nip) + '</small></div>';
            } }
        ],
        data: [
            { nama: 'Direktorat Bina Pengadaan Dan Pencadangan Tanah', pejabat: 'Ahmad Fauzi, S.T., M.Si.', nip: '197001011990031000' },
            { nama: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', pejabat: 'Dewi Lestari, S.T., M.Sc.', nip: '197101011991031001' },
            { nama: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', pejabat: 'Budi Santoso, S.T., M.Sc.', nip: '197201011992031002' },
            { nama: 'Direktorat Hubungan Kelembagaan dan Pengaturan Layanan Pertanahan', pejabat: 'Dr. Hendra Wijaya, M.Si.', nip: '197301011993031003' },
            { nama: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', pejabat: 'Rina Kartika, S.T.', nip: '197401011994031004' },
            { nama: 'Direktorat Landreform', pejabat: 'Agus Prasetyo, S.P., M.Sc.', nip: '197501011995031005' },
            { nama: 'Direktorat Pemberdayaan Tanah Masyarakat', pejabat: 'Sri Wahyuni, S.T., M.Si.', nip: '197601011996031006' },
            { nama: 'Direktorat Penanganan Perkara Pertanahan', pejabat: 'Joko Purnomo, S.H., M.T.', nip: '197701011997031007' },
            { nama: 'Direktorat Penanganan Sengketa Pertanahan', pejabat: 'Lukman Hakim, S.ST., M.H.', nip: '197801011998031008' },
            { nama: 'Direktorat Penatagunaan Tanah', pejabat: 'Yusuf Ramadhan, S.SiT., M.H.', nip: '197901011999031009' },
            { nama: 'Direktorat Pengukuran dan Pemetaan Kadastral', pejabat: 'Tri Handayani, S.Si., M.Sc.', nip: '198001011990031000' },
            { nama: 'Direktorat Survei dan Pemetaan Tematik', pejabat: 'Ir. Andi Saputra, M.T.', nip: '198101011991031001' }
        ],
        aksi: [AKSI_EDIT, AKSI_HAPUS],
        form: {
            tambah: 'Tambah Data Direktorat', edit: 'Ubah Data Direktorat',
            fields: [
                { key: 'nama', label: 'Nama Direktorat', tipe: 'teks', wajib: true },
                { label: 'Jenis Unit Kerja', tipe: 'pilih', opsi: ['Pusat', 'Kanwil', 'Kantah'], wajib: true },
                { label: 'Provinsi', tipe: 'pilih', opsi: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'D.I. Yogyakarta', 'Jawa Timur', 'Bali'], wajib: true, lebar: 'setengah' },
                { label: 'Kabupaten/Kota', tipe: 'pilih', opsi: ['Kota Yogyakarta', 'Kab. Sleman', 'Kab. Bantul', 'Kab. Gunungkidul', 'Kab. Kulon Progo'], wajib: true, lebar: 'setengah' },
                { label: 'Akses semua IGT (WFS dan atribut private), misalnya Pusdatin atau Admin Tematik', tipe: 'checkbox' },
                { tipe: 'judul', label: 'Pejabat' },
                { key: 'pejabat', label: 'Nama Pejabat', tipe: 'teks', wajib: true, lebar: 'setengah' },
                { key: 'nip', label: 'NIP Pejabat', tipe: 'teks', wajib: true, lebar: 'setengah' }
            ]
        }
    },

    /* ================= KONTEN PORTAL ================= */
    'cms-berita': {
        judul: 'Kelola Berita', breadcrumb: 'Konten Portal', kartu: 'Daftar Berita',
        tombol: [{ label: 'Tambah Berita', aksi: 'tambah' }],
        kolom: [
            { key: 'judul', label: 'Judul', lebar: '34%' },
            { key: 'slug', label: 'Slug', tipe: 'html', render: function(b) { return '<small class="text-muted">' + esc(b.slug) + '</small>'; } },
            { key: 'tanggal', label: 'Tanggal Publish' }
        ],
        data: [
            { judul: 'Antisipasi penumpukan berkas, Kementerian ATR/BPN uji coba layanan pengukuran terjadwal di 38 Kantor Pertanahan', slug: 'antisipasi-penumpukan-berkas-kementerian-atrbpn-uji-coba-layanan-pengukuran-terjadwal', tanggal: '08-08-2026 02:13' },
            { judul: 'Kementerian ATR/BPN Hadirkan Pengukuran Terjadwal, Beri Kepastian Waktu Layanan untuk Masyarakat', slug: 'kementerian-atrbpn-hadirkan-pengukuran-terjadwal-beri-kepastian-waktu-layanan', tanggal: '07-08-2026 23:47' },
            { judul: 'Dirjen SPPR Kementerian ATR/BPN di ICI 2025: Dukung Pembangunan Melalui Teknologi Pengukuran untuk Percepat Pemetaan Infrastruktur', slug: 'dirjen-sppr-kementerian-atrbpn-di-ici-2025-dukung-pembangunan-melalui-teknologi', tanggal: '07-08-2026 23:31' },
            { judul: 'Ditjen SPPR BPN Buka Pendaftaran Ujian Lisensi Calon Surveyor Berlisensi Khusus STPN Yogyakarta 2026', slug: 'ditjen-sppr-bpn-buka-pendaftaran-ujian-lisensi-calon-surveyor-berlisensi-khusus', tanggal: '07-08-2026 14:12' },
            { judul: 'Penyelenggaraan IGT Pertanahan dan Ruang Dalam Rangka Percepatan Transformasi Digital di Kementerian ATR/BPN', slug: 'penyelenggaraan-igt-pertanahan-dan-ruang-dalam-rangka-percepatan-transformasi-digital', tanggal: '07-08-2026 13:23' }
        ],
        aksi: [{ ikon: 'ri-eye-line', warna: 'tosca', judul: 'Preview Berita', aksi: 'modal:preview' }, AKSI_EDIT, AKSI_HAPUS],
        modal: {
            preview: { judul: 'Preview Berita', simpan: false, batal: 'Tutup', lebar: 'modal-lg',
                isi: function(b) {
                    return '<div class="igt-berita-preview"><span class="igt-pil igt-pil--biru">Berita Pengelolaan IGT</span><h4>' + esc(b.judul) + '</h4>'
                        + '<small class="text-muted">Oleh: Administrator • ' + esc(b.tanggal) + '</small><div class="igt-berita-preview__gambar"><i class="ri-image-line"></i></div>'
                        + '<p>Isi berita ditampilkan di sini sesuai konten yang ditulis pada editor.</p></div>';
                } }
        },
        form: {
            tambah: 'Form Berita', edit: 'Form Berita', simpan: 'Simpan', batal: 'Batal', lebar: 'modal-xl',
            fields: [
                { key: 'judul', label: 'Judul Berita', tipe: 'teks', wajib: true },
                { label: 'Gambar Thumbnail / Cover (Ukuran maks 2MB)', tipe: 'file', accept: 'image/*', bantuan: 'Gambar dipotong otomatis dengan rasio 2:1.' },
                { label: 'Konten', tipe: 'editor', wajib: true },
                { label: 'Status', tipe: 'pilih', opsi: ['Publish', 'Draft'], wajib: true, lebar: 'setengah' }
            ]
        }
    },

    'cms-poin-landing': {
        judul: 'Kelola Poin Landing Page', breadcrumb: 'Konten Portal', kartu: 'Daftar Poin Section',
        kolom: [
            { key: 'poin', label: 'Poin / Key' },
            { key: 'judul', label: 'Judul' },
            { key: 'konten', label: 'Konten Deskripsi', lebar: '52%' }
        ],
        data: [
            { poin: 'integrasi', judul: 'Integrasi', konten: 'Integrasi IGT Pertanahan dan Ruang dilaksanakan setelah IGT Pertanahan dan Ruang dinyatakan sesuai berdasarkan Berita Acara kompilasi IGT Pertanahan dan Ruang.' },
            { poin: 'kompilasi', judul: 'Kompilasi', konten: 'Kompilasi IGT Pertanahan dan Ruang merupakan kegiatan pengumpulan data IGT Pertanahan dan Ruang yang dimiliki oleh Unit Produksi di Kementerian ATR/BPN.' },
            { poin: 'sinkronisasi', judul: 'Sinkronisasi', konten: 'Sinkronisasi bertujuan menyelaraskan IGT di Kementerian ATR/BPN. Proses ini meliputi tiga tahap: identifikasi, klarifikasi, dan validasi.' }
        ],
        aksi: [{ teks: 'Edit', ikon: 'ri-edit-line', warna: 'kuning', aksi: 'edit' }],
        form: {
            edit: 'Edit Konten Section', simpan: 'Perbarui', batal: 'Batal',
            fields: [
                { key: 'judul', label: 'Judul', tipe: 'teks', wajib: true },
                { key: 'konten', label: 'Deskripsi / Konten', tipe: 'textarea', wajib: true }
            ]
        }
    }
};

// Layer IGT: edit / hapus sublayer dari tabel rincian
$(document).on('click', '[data-sub-edit], [data-sub-hapus-baris]', function() {
    var b = crudState.data[parseInt($(this).closest('.igt-crud-rincian').prev().attr('data-buka'), 10)];
    var i = parseInt($(this).attr('data-sub-edit') || $(this).attr('data-sub-hapus-baris'), 10);
    var nama = b.sublayer.nama[i];
    if ($(this).is('[data-sub-edit]')) {
        bukaModal({
            judul: 'Ubah Sublayer', lebar: 'modal-md', simpan: 'Simpan Perubahan', pesanSimpan: 'Sublayer diperbarui',
            nilai: { induk: b.nama, nama: nama },
            fields: [
                { key: 'induk', label: 'Layer IGT Induk', tipe: 'info' },
                { key: 'nama', label: 'Nama Sublayer', tipe: 'teks', wajib: true, placeholder: 'mis. 2026 atau 1:25.000' }
            ],
            onSimpan: function($m) {
                var baru = $m.find('[data-key="nama"]').val().trim();
                if (baru) { b.sublayer.nama[i] = baru; renderBaris(); }
            }
        });
    } else {
        konfirmasiHapus({ _label: b.nama + ' › ' + nama }, function() {
            b.sublayer.nama.splice(i, 1);
            renderBaris();
        });
    }
});
