/**
 * IGTPR Mockup UI - Dummy Data Store
 * Supports 3 Drilldown Levels:
 * 1. Nasional (Seluruh Indonesia)
 * 2. Provinsi (e.g. Jawa Tengah, Jawa Barat, dll.)
 * 3. Kabupaten / Kota (e.g. Kab. Semarang, Kota Semarang, Kab. Karanganyar, Kab. Banyumas, Solo, dll.)
 */

window.MOCKUP_DATA = {
    // 1. DATA TINGKAT NASIONAL (Default)
    nasional: {
        tingkat: 'nasional',
        wilayah: 'Seluruh Indonesia',
        provinsi: null,
        kabupaten: null,
        usulanInputData: {
            total: 98,
            totalLayer: 30,
            kategori: [
                { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 26, layer: 14, diperbarui: 'Diperbarui 6 jam lalu', kelas: 'is-terintegrasi' },
                { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 7, layer: 4, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                { kunci: 'terupload', label: 'Terupload', jumlah: 65, layer: 12, diperbarui: 'Diperbarui 11 jam lalu', kelas: 'is-terupload' },
                { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
            ]
        },
        usulanPerTahun: {
            'all': {
                total: 98,
                totalLayer: 30,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 26, layer: 14, diperbarui: 'Diperbarui 6 jam lalu', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 7, layer: 4, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: 65, layer: 12, diperbarui: 'Diperbarui 11 jam lalu', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                ]
            },
            '2026': {
                total: 48,
                totalLayer: 20,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 14, layer: 10, diperbarui: 'Diperbarui 6 jam lalu', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 4, layer: 3, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: 30, layer: 7, diperbarui: 'Diperbarui 11 jam lalu', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                ]
            },
            '2025': {
                total: 28,
                totalLayer: 16,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 8, layer: 6, diperbarui: 'Diperbarui 24 Des 2025', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 2, layer: 2, diperbarui: 'Diperbarui 10 Nov 2025', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: 18, layer: 8, diperbarui: 'Diperbarui 15 Okt 2025', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                ]
            },
            '2024': {
                total: 15,
                totalLayer: 9,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 3, layer: 3, diperbarui: 'Diperbarui 18 Des 2024', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 1, layer: 1, diperbarui: 'Diperbarui 05 Sep 2024', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: 11, layer: 5, diperbarui: 'Diperbarui 22 Agu 2024', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                ]
            },
            '2023': {
                total: 7,
                totalLayer: 5,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 1, layer: 1, diperbarui: 'Diperbarui 30 Nov 2023', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: 6, layer: 4, diperbarui: 'Diperbarui 12 Okt 2023', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                ]
            }
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

    // 2. FUNGSI RETRIEVAL TINGKAT WILAYAH (Nasional, Provinsi, atau Kabupaten)
    getDataByWilayah: function(namaProvinsi, namaKabupaten) {
        if (!namaProvinsi || namaProvinsi === 'all' || namaProvinsi === 'Seluruh Indonesia') {
            return this.nasional;
        }

        var provBersih = String(namaProvinsi).trim().replace(/^Provinsi\s+/i, '');
        var provLengkap = 'Provinsi ' + provBersih;

        // JIKA TINGKAT KABUPATEN / KOTA DIPILIH:
        if (namaKabupaten) {
            var kabBersih = String(namaKabupaten).trim();
            var kabLengkap = /^Kota\s+/i.test(kabBersih) ? kabBersih : (/^Kabupaten\s+/i.test(kabBersih) ? kabBersih : 'Kabupaten ' + kabBersih);
            
            // Variasi nilai berbasis nama kabupaten
            var hashKab = 0;
            for (var k = 0; k < kabBersih.length; k++) {
                hashKab = (hashKab * 31 + kabBersih.charCodeAt(k)) & 0xfffff;
            }

            var totalUsulanKab = 4 + (hashKab % 7); // 4 - 10 data
            var terintegrasiKab = Math.floor(totalUsulanKab * 0.4) || 2;
            var terkompilasiKab = Math.floor(totalUsulanKab * 0.2) || 1;
            var perbaikanKab = (hashKab % 4 === 0) ? 1 : 0;
            var teruploadKab = Math.max(0, totalUsulanKab - terintegrasiKab - terkompilasiKab - perbaikanKab);

            var totalLayerKab = 2 + (hashKab % 3); // 2 - 4 layer
            var totalUsulanLayerKab = Math.max(3, Math.floor(totalUsulanKab * 0.45));
            var layerTerintegrasiKab = Math.min(totalLayerKab, Math.floor(totalUsulanLayerKab * 0.35)) || 1;
            var layerTerkompilasiKab = Math.floor(totalUsulanLayerKab * 0.2) || 1;
            var layerPerbaikanKab = perbaikanKab > 0 ? 1 : 0;
            var layerTeruploadKab = Math.max(1, totalUsulanLayerKab - layerTerintegrasiKab - layerTerkompilasiKab - layerPerbaikanKab);
            var sumLayerKab = layerTerintegrasiKab + layerTerkompilasiKab + layerTeruploadKab + layerPerbaikanKab;

            return {
                tingkat: 'kabupaten',
                wilayah: kabLengkap + ', ' + provLengkap,
                provinsi: provLengkap,
                kabupaten: kabLengkap,
                isFiltered: true,
                usulanInputData: {
                    total: totalUsulanKab,
                    totalLayer: sumLayerKab,
                    kategori: [
                        { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: terintegrasiKab, layer: layerTerintegrasiKab, diperbarui: 'Diperbarui 15 menit lalu', kelas: 'is-terintegrasi' },
                        { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: terkompilasiKab, layer: layerTerkompilasiKab, diperbarui: 'Diperbarui 5 jam lalu', kelas: 'is-terkompilasi' },
                        { kunci: 'terupload', label: 'Terupload', jumlah: teruploadKab, layer: layerTeruploadKab, diperbarui: 'Diperbarui 1 jam lalu', kelas: 'is-terupload' },
                        { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: perbaikanKab, layer: layerPerbaikanKab, diperbarui: perbaikanKab > 0 ? 'Diperbarui kemarin' : '-', kelas: 'is-perbaikan' }
                    ]
                },
                kompilasiIntegrasi: {
                    totalLayer: totalLayerKab,
                    bulanan: [
                        { bulan: 'JAN', terkompilasi: 0, terintegrasi: 0 },
                        { bulan: 'FEB', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'MAR', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'APR', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'MEI', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'JUN', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'JUL', terkompilasi: 1, terintegrasi: 1 },
                        { bulan: 'AGT', terkompilasi: 1, terintegrasi: 1 },
                        { bulan: 'SEP', terkompilasi: 1, terintegrasi: 1 },
                        { bulan: 'OKT', terkompilasi: 1, terintegrasi: totalLayerKab },
                        { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                        { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                    ]
                },
                statistikIGT: [
                    { igt: 'Bidang Tanah Validasi', provinsi: 1, kabupaten: 1, bidang: 24 + (hashKab % 30), luas: (4.2 + (hashKab % 5)).toFixed(3) },
                    { igt: 'Hak Atas Tanah ' + kabBersih, provinsi: 1, kabupaten: 1, bidang: 8 + (hashKab % 6), luas: (0.85 + (hashKab % 2)).toFixed(2) },
                    { igt: 'Lahan Baku Sawah ' + kabBersih, provinsi: 1, kabupaten: 1, bidang: '4.210', luas: '11.230,45' },
                    { igt: 'RDTR Wilayah ' + kabBersih, provinsi: 1, kabupaten: 1, bidang: '2.840', luas: '6.450,10' }
                ],
                leaderBoard: [
                    {
                        peringkat: 1,
                        nama: 'Kantor Pertanahan ' + kabLengkap,
                        bidang: ['Bidang Tanah', 'Hak Atas Tanah'],
                        kawasan: ['Lahan Baku Sawah', 'RDTR Kawasan'],
                        tema: 4
                    },
                    {
                        peringkat: 2,
                        nama: 'Dinas PUPR / Tata Ruang ' + kabLengkap,
                        bidang: [],
                        kawasan: ['RDTR Perkotaan', 'RTRW Kabupaten'],
                        tema: 2
                    },
                    {
                        peringkat: 3,
                        nama: 'Bappeda ' + kabLengkap,
                        bidang: ['Sebaran Lokasi Fasum'],
                        kawasan: ['Peta Kerentanan'],
                        tema: 2
                    }
                ],
                capaianRenaksi: [
                    { direktorat: 'Kantor Pertanahan ' + kabLengkap, target: 12, capaian: 9 },
                    { direktorat: 'Seksi Penataan & Pemberdayaan Kantah', target: 6, capaian: 5 },
                    { direktorat: 'Dinas Tata Ruang Daerah ' + kabBersih, target: 4, capaian: 3 }
                ],
                statistikDerivatif: [
                    { layer: 'Derivatif Khusus ' + kabBersih, provinsi: 1, kabupaten: 1, bidang: 18, luas: '850,20' },
                    { layer: 'Batas Bidang Tematik ' + kabBersih, provinsi: 1, kabupaten: 1, bidang: 12, luas: '1.240,00' }
                ],
                statistikAksesIGT: [
                    { direktorat: 'Kantor Pertanahan ' + kabLengkap, aktivitas: 'Login', total: 28 },
                    { direktorat: 'Dinas Tata Ruang ' + kabLengkap, aktivitas: 'Login', total: 11 }
                ],
                aktivitasLog: [
                    { user: 'Operator Kantah ' + kabBersih, aktivitas: 'Unggah Geodatabase Peta', tanggal: '23 Oktober 2026' },
                    { user: 'Verifikator Kantah ' + kabBersih, aktivitas: 'Pengecekan Topologi Bidang', tanggal: '23 Oktober 2026' },
                    { user: 'Kepala Seksi SP ' + kabBersih, aktivitas: 'Verifikasi Validasi Data', tanggal: '22 Oktober 2026' }
                ]
            };
        }

        // JIKA TINGKAT PROVINSI (TANPA KABUPATEN):
        var hash = 0;
        for (var i = 0; i < provBersih.length; i++) {
            hash = (hash * 31 + provBersih.charCodeAt(i)) & 0xfffff;
        }

        var totalUsulan = 16 + (hash % 16); // 16 - 31 data
        var terintegrasi = Math.floor(totalUsulan * 0.35) || 3;
        var terkompilasi = Math.floor(totalUsulan * 0.18) || 2;
        var perbaikan = (hash % 3 === 0) ? 1 : 0;
        var terupload = Math.max(0, totalUsulan - terintegrasi - terkompilasi - perbaikan);

        var totalLayer = 4 + (hash % 4);
        var totalUsulanLayer = Math.max(6, Math.floor(totalUsulan * 0.45));
        var layerTerintegrasi = Math.min(totalLayer, Math.floor(totalUsulanLayer * 0.35)) || 2;
        var layerTerkompilasi = Math.floor(totalUsulanLayer * 0.2) || 1;
        var layerPerbaikan = perbaikan > 0 ? 1 : 0;
        var layerTerupload = Math.max(1, totalUsulanLayer - layerTerintegrasi - layerTerkompilasi - layerPerbaikan);
        var sumLayerProv = layerTerintegrasi + layerTerkompilasi + layerTerupload + layerPerbaikan;

        return {
            tingkat: 'provinsi',
            wilayah: provLengkap,
            provinsi: provLengkap,
            kabupaten: null,
            isFiltered: true,
            usulanInputData: {
                total: totalUsulan,
                totalLayer: sumLayerProv,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: terintegrasi, layer: layerTerintegrasi, diperbarui: 'Diperbarui 30 menit lalu', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: terkompilasi, layer: layerTerkompilasi, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: terupload, layer: layerTerupload, diperbarui: 'Diperbarui 3 jam lalu', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: perbaikan, layer: layerPerbaikan, diperbarui: perbaikan > 0 ? 'Diperbarui 2 hari lalu' : '-', kelas: 'is-perbaikan' }
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
                    { bulan: 'OKT', terkompilasi: 1, terintegrasi: totalLayer },
                    { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                    { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                ]
            },
            statistikIGT: [
                { igt: 'Bidang Tanah', provinsi: 1, kabupaten: 4 + (hash % 6), bidang: 58 + (hash % 40), luas: (18.4 + (hash % 10)).toFixed(3) },
                { igt: 'Hak Atas Tanah', provinsi: 1, kabupaten: 2, bidang: 16 + (hash % 8), luas: (1.45 + (hash % 2)).toFixed(2) },
                { igt: 'Inventarisasi Tanah Kritis', provinsi: 1, kabupaten: 3, bidang: 520 + (hash % 100), luas: '942,150' },
                { igt: 'Kemampuan Tanah', provinsi: 1, kabupaten: 3 + (hash % 3), bidang: '1.840', luas: '142.610,200' },
                { igt: 'Lahan Baku Sawah Nasional', provinsi: 1, kabupaten: 5, bidang: '24.120', luas: '34.870,40' },
                { igt: 'RDTR Kabupaten/ Kota', provinsi: 1, kabupaten: 3, bidang: '28.450', luas: '19.820,10' },
                { igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', provinsi: 1, kabupaten: 3, bidang: 320, luas: '0' }
            ],
            leaderBoard: [
                {
                    peringkat: 1,
                    nama: 'Kantor Wilayah BPN ' + provLengkap,
                    bidang: ['Bidang Tanah', 'Hak Atas Tanah'],
                    kawasan: ['Lahan Baku Sawah Nasional', 'Neraca Penatagunaan Tanah'],
                    tema: 4
                },
                {
                    peringkat: 2,
                    nama: 'Dinas PUPR / Tata Ruang ' + provLengkap,
                    bidang: [],
                    kawasan: ['RDTR Kabupaten/ Kota', 'RTRW Provinsi'],
                    tema: 2
                },
                {
                    peringkat: 3,
                    nama: 'Kantor Pertanahan Kab. Semarang',
                    bidang: ['Bidang Tanah'],
                    kawasan: ['Inventarisasi Tanah Kritis'],
                    tema: 2
                },
                {
                    peringkat: 4,
                    nama: 'Kantor Pertanahan Kota Surakarta (Solo)',
                    bidang: ['Sebaran Bidang Komunal'],
                    kawasan: [],
                    tema: 1
                },
                {
                    peringkat: 5,
                    nama: 'Kantor Pertanahan Kab. Banyumas',
                    bidang: ['Bidang Hak Milik'],
                    kawasan: [],
                    tema: 1
                }
            ],
            capaianRenaksi: [
                { direktorat: 'Kantor Wilayah BPN ' + provLengkap, target: 32, capaian: 24 },
                { direktorat: 'Kantor Pertanahan Kab. Semarang', target: 14, capaian: 11 },
                { direktorat: 'Kantor Pertanahan Kota Semarang', target: 12, capaian: 10 },
                { direktorat: 'Kantor Pertanahan Kab. Karanganyar', target: 10, capaian: 7 },
                { direktorat: 'Kantor Pertanahan Kab. Banyumas', target: 8, capaian: 6 }
            ],
            statistikDerivatif: [
                { layer: 'Derivatif Bidang Tematik ' + provBersih, provinsi: 1, kabupaten: 3, bidang: 42, luas: '2,150' },
                { layer: 'Layer Kawasan Prioritas ' + provBersih, provinsi: 1, kabupaten: 2, bidang: 21, luas: '4,820' },
                { layer: 'Validasi Batas Wilayah Tematik ' + provBersih, provinsi: 1, kabupaten: 3, bidang: '6.840', luas: '612.450,200' }
            ],
            statistikAksesIGT: [
                { direktorat: 'Kantor Wilayah BPN ' + provLengkap, aktivitas: 'Login', total: 78 },
                { direktorat: 'Kantor Pertanahan Kab. Semarang', aktivitas: 'Login', total: 34 },
                { direktorat: 'Kantor Pertanahan Kota Semarang', aktivitas: 'Login', total: 31 },
                { direktorat: 'Kantor Pertanahan Kab. Karanganyar', aktivitas: 'Login', total: 22 }
            ],
            aktivitasLog: [
                { user: 'Operator Kanwil ' + provBersih, aktivitas: 'Sinkronisasi Data IGT Provinsi', tanggal: '23 Oktober 2026' },
                { user: 'Operator Kantah Kab. Semarang', aktivitas: 'Unggah Layer Derivatif Bidang', tanggal: '23 Oktober 2026' },
                { user: 'Verifikator Kantah Solo', aktivitas: 'Verifikasi Batas Bidang', tanggal: '22 Oktober 2026' },
                { user: 'Operator Kantah Banyumas', aktivitas: 'Pembaruan Atribut Spasial', tanggal: '21 Oktober 2026' }
            ]
        };
    },

    /**
     * 39 IGT Dasar Pertanahan dan Ruang (Kementerian ATR/BPN)
     * Berdasarkan dokumen resmi: "05 DAFTAR IGT DASAR PERTANAHAN DAN RUANG"
     */
    daftar39IGT: [
        // --- IGT PERTANAHAN (29 IGT) ---
        // Ditjen Survei dan Pemetaan Pertanahan dan Ruang (Ditjen SPPR)
        { no: 1, nama: 'Bidang Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', basisFisik: 'bidang' },
        { no: 2, nama: 'Penguasaan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', basisFisik: 'bidang' },
        { no: 3, nama: 'Pemilikan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', basisFisik: 'bidang' },
        { no: 4, nama: 'Penggunaan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', basisFisik: 'bidang' },
        { no: 5, nama: 'Pemanfaatan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', basisFisik: 'bidang' },
        { no: 35, nama: 'Unsur Dasar Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', basisFisik: 'kawasan' },

        // Ditjen Penetapan Hak dan Pendaftaran Tanah
        { no: 11, nama: 'Hak Atas Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penetapan Hak dan Pendaftaran Tanah', basisFisik: 'bidang' },

        // Ditjen Penanganan Sengketa dan Konflik Pertanahan
        { no: 12, nama: 'Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen Penanganan Sengketa dan Konflik Pertanahan', basisFisik: 'bidang' },

        // Ditjen Penataan Agraria
        { no: 6, nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'bidang' },
        { no: 7, nama: 'Pertimbangan Teknis Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'bidang' },
        { no: 8, nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'bidang' },
        { no: 26, nama: 'Lahan Baku Sawah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 27, nama: 'Kemampuan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 28, nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 29, nama: 'Persebaran Pulau-Pulau Kecil Terluar di Indonesia', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 30, nama: 'Sebaran Tanah Objek Reforma Agraria', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 31, nama: 'Analisa Tanah Objek Reforma Agraria', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 32, nama: 'Potensi Objek Redistribusi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 33, nama: 'Potensi WP3WT', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },
        { no: 34, nama: 'Tanah Timbul', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', basisFisik: 'kawasan' },

        // Ditjen Pengadaan Tanah dan Pengembangan Pertanahan
        { no: 13, nama: 'Potensi Subjek Konsolidasi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 14, nama: 'Nilai Bidang Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 15, nama: 'Desain Konsolidasi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 16, nama: 'Hasil Penerapan Desain Konsolidasi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 38, nama: 'Zona Nilai Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', basisFisik: 'kawasan' },
        { no: 39, nama: 'Sebaran Potensi Pengembangan Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', basisFisik: 'kawasan' },

        // Ditjen Pengendalian dan Penertiban Tanah dan Ruang (Pertanahan)
        { no: 9, nama: 'Tanah Terindikasi Terlantar', jenis: 'pertanahan', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', basisFisik: 'bidang' },
        { no: 36, nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', basisFisik: 'kawasan' },
        { no: 37, nama: 'Kawasan Terindikasi Terlantar', jenis: 'pertanahan', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', basisFisik: 'kawasan' },

        // --- IGT TATA RUANG (10 IGT) ---
        // Ditjen Tata Ruang
        { no: 17, nama: 'RTRW Nasional', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 18, nama: 'RTRW Provinsi', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 19, nama: 'RTRW Kabupaten', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 20, nama: 'RTRW Kota', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 21, nama: 'RDTR Kawasan Perbatasan Negara', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 22, nama: 'RTR Pulau/Kepulauan', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 23, nama: 'RTR Kawasan Strategis Nasional', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 24, nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },
        { no: 25, nama: 'KKPR', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', basisFisik: 'kawasan' },

        // Ditjen Pengendalian dan Penertiban Tanah dan Ruang (Tata Ruang)
        { no: 10, nama: 'Indikasi Pelanggaran Pemanfaatan Ruang', jenis: 'tataruang', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', basisFisik: 'bidang' }
    ],

    /**
     * Get IGT Themes for the "Detail Informasi" popup card.
     * Categorized into IGT Pertanahan & IGT Tata Ruang.
     */
    getDetailThemes: function(namaProvinsi, namaKabupaten) {
        var pNorm = namaProvinsi ? String(namaProvinsi).toLowerCase().replace(/^(provinsi|daerah istimewa)\s+/i, '').trim() : '';
        var kNorm = namaKabupaten ? String(namaKabupaten).toLowerCase().replace(/^(kabupaten|kota)\s+/i, '').trim() : null;

        // 0. SE-INDONESIA / NASIONAL (Default)
        if (!namaProvinsi || pNorm === '' || pNorm === 'nasional' || pNorm === 'indonesia' || pNorm === 'seluruh indonesia') {
            return [
                // IGT Pertanahan (9)
                { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Hak Atas Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2023' },
                { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },

                // IGT Tata Ruang (5)
                { nama: 'RTRW Nasional', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'RTRW Provinsi', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'RDTR Kawasan Perbatasan Negara', jenis: 'tataruang', basis: 'tataruang', tahun: '2025' }
            ];
        }

        // 1. DAERAH ISTIMEWA YOGYAKARTA
        if (pNorm.indexOf('yogyakarta') !== -1 || pNorm.indexOf('jogja') !== -1) {
            var diyAll = [
                // IGT Pertanahan
                { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Hak Atas Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },

                // IGT Tata Ruang
                { nama: 'RTRW Provinsi', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'KKPR', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
            ];

            if (!kNorm) return diyAll;

            if (kNorm.indexOf('sleman') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('bantul') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                    { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Penggunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('yogyakarta') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Penggunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'RTRW Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'KKPR', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('gunung') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                    { nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('kulon') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Penggunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            }
            return diyAll.slice(0, 6);
        }

        // 2. JAWA TENGAH
        if (pNorm.indexOf('jawa tengah') !== -1 || pNorm === 'jateng') {
            var jatengAll = [
                // IGT Pertanahan
                { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Hak Atas Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2023' },
                { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                { nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },

                // IGT Tata Ruang
                { nama: 'RTRW Provinsi', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2025' },
                { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
            ];

            if (!kNorm) return jatengAll;

            if (kNorm.indexOf('semarang') !== -1) {
                var isKota = kNorm.indexOf('kota') !== -1;
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Hak Atas Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Penggunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: isKota ? 'RTRW Kota' : 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('surakarta') !== -1 || kNorm.indexOf('solo') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Hak Atas Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'Penggunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'RTRW Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'KKPR', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('karanganyar') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                    { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2025' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            } else if (kNorm.indexOf('banyumas') !== -1) {
                return [
                    { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
                    { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
                    { nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
                    { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
                    { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
                ];
            }
            return jatengAll.slice(0, 7);
        }

        // 3. GENERIC / OTHER PROVINCES
        var masterList = [
            { nama: 'Bidang Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'Hak Atas Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
            { nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'Kemampuan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2024' },
            { nama: 'Lahan Baku Sawah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2025' },
            { nama: 'Penggunaan Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'Zona Nilai Tanah', jenis: 'pertanahan', basis: 'pertanahan', tahun: '2026' },
            { nama: 'RTRW Provinsi', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
            { nama: 'RTRW Kabupaten', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' },
            { nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', basis: 'tataruang', tahun: '2026' }
        ];

        var h = 0;
        var s = (namaKabupaten || namaProvinsi);
        for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
        var count = 6 + (Math.abs(h) % 5);
        return masterList.slice(0, count);
    },

    getUsulanInputData: function(namaProvinsi, namaKabupaten, tahun) {
        var t = (tahun && tahun !== 'all') ? String(tahun) : 'all';
        // 1. Nasional
        if (!namaProvinsi || namaProvinsi === 'all' || namaProvinsi === 'Seluruh Indonesia') {
            if (this.nasional.usulanPerTahun && this.nasional.usulanPerTahun[t]) {
                return this.nasional.usulanPerTahun[t];
            }
            return this.nasional.usulanInputData;
        }

        // 2. Regional (Provinsi / Kabupaten)
        var dataScope = this.getDataByWilayah(namaProvinsi, namaKabupaten);
        var baseUsulan = dataScope ? dataScope.usulanInputData : this.nasional.usulanInputData;
        if (t === 'all') return baseUsulan;

        var ratios = {
            '2026': { totalRatio: 0.50, integRatio: 0.54, kompRatio: 0.57, upRatio: 0.46, layerRatio: 0.65 },
            '2025': { totalRatio: 0.28, integRatio: 0.30, kompRatio: 0.29, upRatio: 0.28, layerRatio: 0.55 },
            '2024': { totalRatio: 0.15, integRatio: 0.12, kompRatio: 0.14, upRatio: 0.17, layerRatio: 0.30 },
            '2023': { totalRatio: 0.07, integRatio: 0.04, kompRatio: 0.00, upRatio: 0.09, layerRatio: 0.18 }
        };
        var r = ratios[t] || ratios['2026'];
        var scaledKategori = baseUsulan.kategori.map(function(k) {
            var j;
            if (k.kunci === 'perbaikan') {
                j = (t === '2026' && k.jumlah > 0) ? k.jumlah : 0;
            } else if (k.kunci === 'terintegrasi') {
                j = Math.max(k.jumlah > 0 ? 1 : 0, Math.round(k.jumlah * r.integRatio));
            } else if (k.kunci === 'terkompilasi') {
                j = Math.round(k.jumlah * r.kompRatio);
            } else {
                j = Math.max(k.jumlah > 0 ? 1 : 0, Math.round(k.jumlah * r.upRatio));
            }
            var lay = j > 0 ? Math.max(1, Math.round((k.layer || 1) * r.layerRatio)) : 0;
            return Object.assign({}, k, {
                jumlah: j,
                layer: lay,
                diperbarui: t === '2026' ? k.diperbarui : ('Tahun ' + t)
            });
        });
        var sumTotal = scaledKategori.reduce(function(acc, x) { return acc + x.jumlah; }, 0);
        var sumLayer = scaledKategori.reduce(function(acc, x) { return acc + x.layer; }, 0);
        return {
            total: sumTotal,
            totalLayer: sumLayer,
            kategori: scaledKategori
        };
    },

    getUsulanDetailList: function(statusFilter, namaProvinsi, namaKabupaten, tahunFilter) {
        var dataScope = this.getDataByWilayah(namaProvinsi, namaKabupaten);
        var totalUsulan = dataScope ? dataScope.usulanInputData.total : 98;

        var counts = {
            all: totalUsulan,
            terintegrasi: 26,
            terkompilasi: 7,
            terupload: 65,
            perbaikan: 0
        };

        if (dataScope && dataScope.usulanInputData && dataScope.usulanInputData.kategori) {
            dataScope.usulanInputData.kategori.forEach(function(k) {
                counts[k.kunci] = k.jumlah;
            });
            counts.all = dataScope.usulanInputData.total;
        }

        // Base 9 records from screenshot
        var base9 = [
            {
                direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '12/10/2026',
                tglIntegrasi: '12/10/2026',
                keterangan: '-',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            },
            {
                direktorat: 'Direktorat Perencanaan Tata Ruang',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '11/10/2026',
                tglIntegrasi: '-',
                keterangan: 'test beda direktorat',
                status: 'Terkompilasi',
                statusKey: 'terkompilasi',
                tahun: '2026',
                hasDownload: false
            },
            {
                direktorat: 'Direktorat Pengukuran dan Pemetaan Kadastral',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '17/10/2026',
                tglIntegrasi: '-',
                keterangan: 'TEST NO GEOM',
                status: 'Terkompilasi',
                statusKey: 'terkompilasi',
                tahun: '2026',
                hasDownload: false
            },
            {
                direktorat: 'Direktorat Perencanaan Tata Ruang',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '18/08/2026',
                tglIntegrasi: '16/02/2024',
                keterangan: '-',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            },
            {
                direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '11/10/2026',
                tglIntegrasi: '15/10/2026',
                keterangan: 'menggunakan direktorat yang berbeda',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            },
            {
                direktorat: 'Kantor Wilayah BPN Provinsi D.I. Yogyakarta',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '21/10/2026',
                tglIntegrasi: '20/10/2026',
                keterangan: 'test ke 2 BIDANG_PERSIL_DIY_ATR_LKP.zip',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            },
            {
                direktorat: 'Direktorat Perencanaan Tata Ruang',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '18/08/2026',
                tglIntegrasi: '20/08/2026',
                keterangan: 'REVISI 1908',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            },
            {
                direktorat: 'Direktorat Perencanaan Tata Ruang',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '11/10/2026',
                tglIntegrasi: '11/10/2026',
                keterangan: 'Direktorat Perencanaan Tata Ruang Pusat',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            },
            {
                direktorat: 'Direktorat Perencanaan Tata Ruang',
                igt: 'Bidang Tanah',
                jenisData: 'SHP',
                tglUpload: '18/08/2026',
                tglIntegrasi: '19/08/2026',
                keterangan: 'contoh teknis',
                status: 'Terintegrasi',
                statusKey: 'terintegrasi',
                tahun: '2026',
                hasDownload: true
            }
        ];

        var direks = [
            'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
            'Direktorat Perencanaan Tata Ruang',
            'Direktorat Pengukuran dan Pemetaan Kadastral',
            'Direktorat Penatagunaan Tanah',
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
            'Direktorat Pemberdayaan Tanah Masyarakat',
            'Direktorat Survei dan Pemetaan Tematik',
            'Direktorat Penilaian Tanah dan Ekonomi Pertanahan',
            'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu',
            'Kantor Wilayah BPN Provinsi D.I. Yogyakarta',
            'Kantor Pertanahan Kabupaten Semarang',
            'Kantor Wilayah BPN Provinsi Jawa Tengah',
            'Kantor Pertanahan Kota Surakarta',
            'Kantor Pertanahan Kabupaten Banyumas'
        ];

        var igts = [
            'Bidang Tanah',
            'Hak Atas Tanah',
            'Inventarisasi Tanah Kritis',
            'Kemampuan Tanah',
            'Lahan Baku Sawah Nasional',
            'Lahan Sawah Dilindungi',
            'RDTR Kabupaten/ Kota',
            'RDTR Kawasan Perbatasan Negara',
            'RTRW Kabupaten',
            'Sebaran Lokasi Pemberdayaan Tanah Masyarakat',
            'Zona Nilai Tanah',
            'Neraca Penatagunaan Tanah',
            'RTRW Provinsi',
            'Peta Kawasan Rawan Bencana Geologi'
        ];

        var kets = [
            '-',
            'Penyelarasan batas administrasi spasial',
            'Validasi topologi zero gap/overlap',
            'Upload data tematik triwulan III',
            'Sinkronisasi peta rencana pola ruang',
            'Kompilasi layer batas bidang persil',
            'Pembaruan atribut basis data IGT',
            'Pengajuan integrasi geodatabase',
            'Penyesuaian rekomendasi teknis BIG',
            'Perbaikan penamaan tema standar Kugi',
            'Verifikasi koordinat sistem proyeksi UTM'
        ];

        var dates2026 = ['12/10/2026', '11/10/2026', '17/10/2026', '18/08/2026', '21/10/2026', '24/10/2026', '05/09/2026', '14/07/2026', '29/06/2026', '19/05/2026'];
        var dates2025 = ['14/11/2025', '20/09/2025', '12/06/2025', '05/04/2025', '18/02/2025', '28/08/2025', '10/10/2025', '15/05/2025'];
        var dates2024 = ['16/02/2024', '10/08/2024', '25/05/2024', '11/03/2024', '04/11/2024', '19/07/2024'];
        var dates2023 = ['20/11/2023', '15/07/2023', '09/04/2023', '28/01/2023', '05/10/2023'];

        var records = [];
        var idCounter = 1;

        // 1. Terintegrasi records (Nasional total: 26 -> 14 in 2026, 8 in 2025, 3 in 2024, 1 in 2023)
        var terintegrasiBase = base9.filter(function(r) { return r.statusKey === 'terintegrasi'; });
        for (var i = 0; i < counts.terintegrasi; i++) {
            var thn = '2026';
            var dt = dates2026[i % dates2026.length];
            if (i >= 14 && i < 22) {
                thn = '2025';
                dt = dates2025[(i - 14) % dates2025.length];
            } else if (i >= 22 && i < 25) {
                thn = '2024';
                dt = dates2024[(i - 22) % dates2024.length];
            } else if (i >= 25) {
                thn = '2023';
                dt = dates2023[(i - 25) % dates2023.length];
            }

            if (i < terintegrasiBase.length) {
                records.push(Object.assign({}, terintegrasiBase[i], {
                    id: idCounter++,
                    tahun: terintegrasiBase[i].tahun || thn
                }));
            } else {
                var dIdx = (i * 3 + 1) % direks.length;
                var igtIdx = (i * 5 + 2) % igts.length;
                records.push({
                    id: idCounter++,
                    direktorat: direks[dIdx],
                    igt: igts[igtIdx],
                    jenisData: (i % 8 === 0) ? 'GeoJSON' : 'SHP',
                    tglUpload: dt,
                    tglIntegrasi: dt,
                    keterangan: kets[i % kets.length],
                    status: 'Terintegrasi',
                    statusKey: 'terintegrasi',
                    tahun: thn,
                    hasDownload: true
                });
            }
        }

        // 2. Terkompilasi records (Nasional total: 7 -> 4 in 2026, 2 in 2025, 1 in 2024, 0 in 2023)
        var terkompilasiBase = base9.filter(function(r) { return r.statusKey === 'terkompilasi'; });
        for (var j = 0; j < counts.terkompilasi; j++) {
            var thn2 = '2026';
            var dt2 = dates2026[(j + 2) % dates2026.length];
            if (j >= 4 && j < 6) {
                thn2 = '2025';
                dt2 = dates2025[j % dates2025.length];
            } else if (j >= 6) {
                thn2 = '2024';
                dt2 = dates2024[j % dates2024.length];
            }

            if (j < terkompilasiBase.length) {
                records.push(Object.assign({}, terkompilasiBase[j], {
                    id: idCounter++,
                    tahun: terkompilasiBase[j].tahun || thn2
                }));
            } else {
                var dIdx2 = (j * 4 + 3) % direks.length;
                var igtIdx2 = (j * 2 + 1) % igts.length;
                records.push({
                    id: idCounter++,
                    direktorat: direks[dIdx2],
                    igt: igts[igtIdx2],
                    jenisData: 'SHP',
                    tglUpload: dt2,
                    tglIntegrasi: '-',
                    keterangan: kets[(j + 3) % kets.length],
                    status: 'Terkompilasi',
                    statusKey: 'terkompilasi',
                    tahun: thn2,
                    hasDownload: false
                });
            }
        }

        // 3. Terupload records (Nasional total: 65 -> 30 in 2026, 18 in 2025, 11 in 2024, 6 in 2023)
        for (var k = 0; k < counts.terupload; k++) {
            var thn3 = '2026';
            var dt3 = dates2026[(k + 4) % dates2026.length];
            if (k >= 30 && k < 48) {
                thn3 = '2025';
                dt3 = dates2025[(k - 30) % dates2025.length];
            } else if (k >= 48 && k < 59) {
                thn3 = '2024';
                dt3 = dates2024[(k - 48) % dates2024.length];
            } else if (k >= 59) {
                thn3 = '2023';
                dt3 = dates2023[(k - 59) % dates2023.length];
            }

            var dIdx3 = (k * 2 + 5) % direks.length;
            var igtIdx3 = (k * 3 + 4) % igts.length;
            records.push({
                id: idCounter++,
                direktorat: direks[dIdx3],
                igt: igts[igtIdx3],
                jenisData: (k % 5 === 0) ? 'GeoJSON' : 'SHP',
                tglUpload: dt3,
                tglIntegrasi: '-',
                keterangan: kets[(k + 1) % kets.length],
                status: 'Terupload',
                statusKey: 'terupload',
                tahun: thn3,
                hasDownload: false
            });
        }

        // 4. Revisi records (Nasional total: 0)
        for (var m = 0; m < counts.perbaikan; m++) {
            var thn4 = '2026';
            var dIdx4 = (m * 7 + 2) % direks.length;
            var igtIdx4 = (m * 4 + 3) % igts.length;
            var dt4 = dates2026[(m + 1) % dates2026.length];
            records.push({
                id: idCounter++,
                direktorat: direks[dIdx4],
                igt: igts[igtIdx4],
                jenisData: 'SHP',
                tglUpload: dt4,
                tglIntegrasi: '-',
                keterangan: 'Perlu revisi penataan atribut dan topologi',
                status: 'Revisi Perbaikan',
                statusKey: 'perbaikan',
                tahun: thn4,
                hasDownload: false
            });
        }

        // Year Filtering
        var yearFilteredRecords = (tahunFilter && tahunFilter !== 'all')
            ? records.filter(function(r) { return r.tahun === String(tahunFilter); })
            : records;

        var computedCounts = {
            all: yearFilteredRecords.length,
            terintegrasi: yearFilteredRecords.filter(function(r) { return r.statusKey === 'terintegrasi'; }).length,
            terkompilasi: yearFilteredRecords.filter(function(r) { return r.statusKey === 'terkompilasi'; }).length,
            terupload: yearFilteredRecords.filter(function(r) { return r.statusKey === 'terupload'; }).length,
            perbaikan: yearFilteredRecords.filter(function(r) { return r.statusKey === 'perbaikan'; }).length
        };

        var filteredList = yearFilteredRecords;
        if (statusFilter && statusFilter !== 'all') {
            filteredList = yearFilteredRecords.filter(function(r) {
                return r.statusKey === statusFilter;
            });
        }

        return {
            items: filteredList,
            totalItems: yearFilteredRecords.length,
            counts: computedCounts,
            wilayah: (namaKabupaten ? (namaKabupaten + ', ' + namaProvinsi) : (namaProvinsi || 'Seluruh Indonesia')),
            tahun: (tahunFilter && tahunFilter !== 'all') ? String(tahunFilter) : 'all'
        };
    }
};
