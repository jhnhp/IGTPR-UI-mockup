/**
 * IGTPR Mockup UI - Dummy Data Store
 * Supports National (All Provinces) and Province-Specific filtering.
 */

window.MOCKUP_DATA = {
    // 1. DATA NASIONAL (Default - All Indonesia)
    nasional: {
        wilayah: 'Seluruh Indonesia',
        usulanInputData: {
            total: 98,
            kategori: [
                { kunci: 'terupload', label: 'Terupload', jumlah: 65, diperbarui: 'Diperbarui 11 jam lalu', kelas: 'is-terupload' },
                { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 7, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, diperbarui: '-', kelas: 'is-perbaikan' },
                { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 26, diperbarui: 'Diperbarui 6 jam lalu', kelas: 'is-terintegrasi' }
            ]
        },
        kompilasiIntegrasi: {
            totalLayer: 14,
            bulanan: [
                { bulan: 'JAN', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'FEB', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'MAR', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'APR', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'MEI', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'JUN', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'JUL', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'AGT', terkompilasi: 1, terintegrasi: 4 },
                { bulan: 'SEP', terkompilasi: 1, terintegrasi: 4 },
                { bulan: 'OKT', terkompilasi: 1, terintegrasi: 11 },
                { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
            ]
        },
        statistikIGT: [
            { igt: 'Bidang Tanah', provinsi: 3, kabupaten: 7, bidang: 142, luas: '14,998' },
            { igt: 'Hak Atas Tanah', provinsi: 1, kabupaten: 1, bidang: 22, luas: '1,15' },
            { igt: 'Inventarisasi Tanah Kritis', provinsi: 1, kabupaten: 1, bidang: '1.026', luas: '1.877,075' },
            { igt: 'Kemampuan Tanah', provinsi: 1, kabupaten: 5, bidang: '3.842', luas: '293.831,445' },
            { igt: 'Lahan Baku Sawah Nasional', provinsi: 1, kabupaten: 5, bidang: '51.929', luas: '66.870,42' },
            { igt: 'Lahan Sawah Dilindungi', provinsi: 1, kabupaten: 5, bidang: '55.079', luas: '73.288,827' },
            { igt: 'RDTR Kabupaten/ Kota', provinsi: 1, kabupaten: 3, bidang: '51.528', luas: '35.547,203' },
            { igt: 'RDTR Kawasan Perbatasan Negara', provinsi: 1, kabupaten: 3, bidang: '2.829', luas: '8.876,029' },
            { igt: 'RTRW Kabupaten', provinsi: 0, kabupaten: 1, bidang: '7.516', luas: '231.015,748' },
            { igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', provinsi: 1, kabupaten: 5, bidang: 625, luas: '0' }
        ],
        leaderBoard: [
            {
                peringkat: 1,
                nama: 'Direktorat Penatagunaan Tanah',
                bidang: [],
                kawasan: ['Inventarisasi Tanah Kritis', 'Kemampuan Tanah', 'Lahan Baku Sawah Nasional', 'Neraca Penatagunaan Tanah'],
                tema: 4
            },
            {
                peringkat: 2,
                nama: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
                bidang: [],
                kawasan: ['RDTR Kabupaten/ Kota', 'RTRW Kabupaten'],
                tema: 2
            },
            {
                peringkat: 3,
                nama: 'Direktorat Perencanaan Tata Ruang',
                bidang: ['Bidang Tanah'],
                kawasan: ['RDTR Kawasan Perbatasan Negara'],
                tema: 2
            },
            {
                peringkat: 4,
                nama: 'Direktorat Pemberdayaan Tanah Masyarakat',
                bidang: ['Sebaran Lokasi Pemberdayaan Tanah Masyarakat'],
                kawasan: [],
                tema: 1
            },
            {
                peringkat: 5,
                nama: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
                bidang: ['Bidang Tanah'],
                kawasan: [],
                tema: 1
            }
        ],
        capaianRenaksi: [
            { direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', target: 31, capaian: 0 },
            { direktorat: 'Direktorat Pemberdayaan Tanah Masyarakat', target: 1, capaian: 0 },
            { direktorat: 'Direktorat Penatagunaan Tanah', target: 30, capaian: 0 },
            { direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal', target: 141, capaian: 21 },
            { direktorat: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', target: 8, capaian: 0 },
            { direktorat: 'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan', target: 5, capaian: 0 },
            { direktorat: 'Direktorat Perencanaan Tata Ruang', target: 5, capaian: 18 },
            { direktorat: 'Direktorat Survei Dan Pemetaan Tematik', target: '6.000.007', capaian: 0 },
            { direktorat: 'Kantor Pertanahan Kabupaten Bantul', target: 0, capaian: 1 },
            { direktorat: 'Kantor Pertanahan Kabupaten Gunungkidul', target: 0, capaian: 0 }
        ],
        statistikDerivatif: [
            { layer: 'Coba Derivatif Bidang', provinsi: 1, kabupaten: 1, bidang: 44, luas: '2,301' },
            { layer: 'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik', provinsi: 1, kabupaten: 1, bidang: 37, luas: '5,356' },
            { layer: 'TES LAYER DERIVATIF BIDANG', provinsi: 1, kabupaten: 1, bidang: 46, luas: '3,914' },
            { layer: 'TES LAYER DERIVATIF KAWASAN', provinsi: 3, kabupaten: 3, bidang: '17.938', luas: '2.025.860,518' }
        ],
        statistikAksesIGT: [
            { direktorat: 'Direktorat Bina Pengadaan Dan Pencadangan Tanah', aktivitas: 'Login', total: 1 },
            { direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', aktivitas: 'Login', total: 19 },
            { direktorat: 'Direktorat Hubungan Kelembagaan dan Pengaturan Layanan Pertanahan', aktivitas: 'Login', total: 2 },
            { direktorat: 'Direktorat Landreform', aktivitas: 'Login', total: 6 },
            { direktorat: 'Direktorat Penatagunaan Tanah', aktivitas: 'Login', total: 6 },
            { direktorat: 'Direktorat Pencegahan Dan Penanganan Konflik Pertanahan', aktivitas: 'Login', total: 5 },
            { direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal', aktivitas: 'Login', total: 241 },
            { direktorat: 'Direktorat Pengukuran Dan Pemetaan Kadastral', aktivitas: 'Login', total: 15 },
            { direktorat: 'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan', aktivitas: 'Login', total: 16 },
            { direktorat: 'Direktorat Perencanaan Tata Ruang', aktivitas: 'Login', total: 31 }
        ],
        aktivitasLog: [
            { user: 'Administrator', aktivitas: 'Menambahkan SLD Master', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Hapus SLD Master', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Menambahkan SLD Master', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Menambahkan User', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Edit User', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Edit User', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Edit User', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Edit Symbology Master', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Edit User', tanggal: '15 Oktober 2026' },
            { user: 'Administrator', aktivitas: 'Menambahkan Symbology Master', tanggal: '15 Oktober 2026' }
        ]
    },

    // 2. FUNGSI UNTUK MEMPEROLEH DATA SESUAI PROVINSI YANG DIPILIH
    getDataByProvinsi: function(namaProvinsi) {
        if (!namaProvinsi || namaProvinsi === 'all' || namaProvinsi === 'Seluruh Indonesia') {
            return this.nasional;
        }

        var namaBersih = String(namaProvinsi).trim().replace(/^Provinsi\s+/i, '');
        var namaLengkap = 'Provinsi ' + namaBersih;

        // Hash sederhana untuk memvariasikan angka dummy per provinsi
        var hash = 0;
        for (var i = 0; i < namaBersih.length; i++) {
            hash = (hash * 31 + namaBersih.charCodeAt(i)) & 0xfffff;
        }

        var totalUsulan = 12 + (hash % 20); // 12 s/d 31
        var terintegrasi = Math.floor(totalUsulan * 0.35) || 2;
        var terkompilasi = Math.floor(totalUsulan * 0.15) || 1;
        var perbaikan = (hash % 3 === 0) ? 1 : 0;
        var terupload = Math.max(0, totalUsulan - terintegrasi - terkompilasi - perbaikan);

        var totalLayer = 3 + (hash % 5);

        return {
            wilayah: namaLengkap,
            isFiltered: true,
            usulanInputData: {
                total: totalUsulan,
                kategori: [
                    { kunci: 'terupload', label: 'Terupload', jumlah: terupload, diperbarui: 'Diperbarui 4 jam lalu', kelas: 'is-terupload' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: terkompilasi, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: perbaikan, diperbarui: perbaikan > 0 ? 'Diperbarui 2 hari lalu' : '-', kelas: 'is-perbaikan' },
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: terintegrasi, diperbarui: 'Diperbarui 30 menit lalu', kelas: 'is-terintegrasi' }
                ]
            },
            kompilasiIntegrasi: {
                totalLayer: totalLayer,
                bulanan: [
                    { bulan: 'JAN', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'FEB', terkompilasi: 1, terintegrasi: 1 },
                    { bulan: 'MAR', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'APR', terkompilasi: 1, terintegrasi: 1 },
                    { bulan: 'MEI', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'JUN', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'JUL', terkompilasi: 0, terintegrasi: 2 },
                    { bulan: 'AGT', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'SEP', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'OKT', terkompilasi: 1, terintegrasi: Math.max(2, totalLayer - 1) },
                    { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                    { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                ]
            },
            statistikIGT: [
                { igt: 'Bidang Tanah', provinsi: 1, kabupaten: 3 + (hash % 4), bidang: 35 + (hash % 50), luas: (12.4 + (hash % 10)).toFixed(3) },
                { igt: 'Hak Atas Tanah', provinsi: 1, kabupaten: 1, bidang: 12 + (hash % 8), luas: (1.15 + (hash % 2)).toFixed(2) },
                { igt: 'Inventarisasi Tanah Kritis', provinsi: 1, kabupaten: 2, bidang: 412 + (hash % 100), luas: '782,410' },
                { igt: 'Kemampuan Tanah', provinsi: 1, kabupaten: 2 + (hash % 3), bidang: '1.240', luas: '94.215,100' },
                { igt: 'Lahan Baku Sawah Nasional', provinsi: 1, kabupaten: 3, bidang: '14.820', luas: '22.450,12' },
                { igt: 'RDTR Kabupaten/ Kota', provinsi: 1, kabupaten: 2, bidang: '18.910', luas: '14.220,50' },
                { igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', provinsi: 1, kabupaten: 2, bidang: 185, luas: '0' }
            ],
            leaderBoard: [
                {
                    peringkat: 1,
                    nama: 'Kantor Wilayah BPN ' + namaLengkap,
                    bidang: ['Bidang Tanah', 'Hak Atas Tanah'],
                    kawasan: ['Lahan Baku Sawah Nasional', 'Neraca Penatagunaan Tanah'],
                    tema: 4
                },
                {
                    peringkat: 2,
                    nama: 'Dinas PUPR / Tata Ruang ' + namaLengkap,
                    bidang: [],
                    kawasan: ['RDTR Kabupaten/ Kota', 'RTRW Provinsi'],
                    tema: 2
                },
                {
                    peringkat: 3,
                    nama: 'Kantor Pertanahan Kab./Kota Wilayah ' + namaBersih + ' I',
                    bidang: ['Bidang Tanah'],
                    kawasan: ['Inventarisasi Tanah Kritis'],
                    tema: 2
                },
                {
                    peringkat: 4,
                    nama: 'Bappeda ' + namaLengkap,
                    bidang: [],
                    kawasan: ['Kemampuan Tanah'],
                    tema: 1
                },
                {
                    peringkat: 5,
                    nama: 'Kantor Pertanahan Kab./Kota Wilayah ' + namaBersih + ' II',
                    bidang: ['Sebaran Lokasi Pemberdayaan'],
                    kawasan: [],
                    tema: 1
                }
            ],
            capaianRenaksi: [
                { direktorat: 'Kantor Wilayah BPN ' + namaLengkap, target: 24, capaian: 18 },
                { direktorat: 'Kantor Pertanahan Kab./Kota Utama ' + namaBersih, target: 12, capaian: 9 },
                { direktorat: 'Dinas Penataan Ruang ' + namaLengkap, target: 15, capaian: 8 },
                { direktorat: 'Kantor Pertanahan Wilayah Pesisir ' + namaBersih, target: 8, capaian: 5 },
                { direktorat: 'Kantor Pertanahan Wilayah Perbatasan / Penyangga', target: 6, capaian: 2 }
            ],
            statistikDerivatif: [
                { layer: 'Derivatif Bidang Tematik ' + namaBersih, provinsi: 1, kabupaten: 2, bidang: 28, luas: '1,450' },
                { layer: 'Layer Kawasan Prioritas ' + namaBersih, provinsi: 1, kabupaten: 1, bidang: 14, luas: '3,210' },
                { layer: 'Validasi Batas Wilayah Tematik ' + namaBersih, provinsi: 1, kabupaten: 2, bidang: '4.890', luas: '412.350,110' }
            ],
            statistikAksesIGT: [
                { direktorat: 'Kantor Wilayah BPN ' + namaLengkap, aktivitas: 'Login', total: 64 },
                { direktorat: 'Kantor Pertanahan Kab./Kota ' + namaBersih, aktivitas: 'Login', total: 42 },
                { direktorat: 'Dinas Tata Ruang ' + namaLengkap, aktivitas: 'Login', total: 18 }
            ],
            aktivitasLog: [
                { user: 'Operator ' + namaBersih, aktivitas: 'Unggah Data Spasial Provinsi', tanggal: '23 Oktober 2026' },
                { user: 'Verifikator ' + namaBersih, aktivitas: 'Verifikasi Layer IGT', tanggal: '22 Oktober 2026' },
                { user: 'Kanwil ' + namaBersih, aktivitas: 'Pembaruan Atribut Spasial', tanggal: '20 Oktober 2026' },
                { user: 'Administrator', aktivitas: 'Persetujuan Renaksi ' + namaBersih, tanggal: '19 Oktober 2026' }
            ]
        };
    }
};
