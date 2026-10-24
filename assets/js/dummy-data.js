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
                { bulan: 'JAN', terkompilasi: 1, terintegrasi: 2 },
                { bulan: 'FEB', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'MAR', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'APR', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'MEI', terkompilasi: 2, terintegrasi: 3 },
                { bulan: 'JUN', terkompilasi: 3, terintegrasi: 3 },
                { bulan: 'JUL', terkompilasi: 3, terintegrasi: 3 },
                { bulan: 'AGT', terkompilasi: 3, terintegrasi: 4 },
                { bulan: 'SEP', terkompilasi: 3, terintegrasi: 4 },
                { bulan: 'OKT', terkompilasi: 4, terintegrasi: 10 },
                { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
            ]
        },
        statistikIGT: [
            { igt: 'Bidang Tanah', jenisIgt: 'Pertanahan', provinsi: 3, kabupaten: 7, bidang: 142, luas: '14,998' },
            { igt: 'Hak Atas Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: 22, luas: '1,15' },
            { igt: 'Inventarisasi Tanah Kritis', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '1.026', luas: '1.877,075' },
            { igt: 'Kemampuan Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '3.842', luas: '293.831,445' },
            { igt: 'Lahan Baku Sawah Nasional', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '51.929', luas: '66.870,42' },
            { igt: 'Lahan Sawah Dilindungi', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '55.079', luas: '73.288,827' },
            { igt: 'RDTR Kabupaten/ Kota', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 3, bidang: '51.528', luas: '35.547,203' },
            { igt: 'RDTR Kawasan Perbatasan Negara', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 3, bidang: '2.829', luas: '8.876,029' },
            { igt: 'RTRW Kabupaten', jenisIgt: 'Tata Ruang', provinsi: 0, kabupaten: 1, bidang: '7.516', luas: '231.015,748' },
            { igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: 625, luas: '0' },
            { igt: 'Zona Nilai Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '4.120', luas: '128.450' }
        ],
        statistikIGTProvinsi: [
            { provinsi: 'Bali', jumlahIgt: 2, kabupaten: 1, bidang: 160, luas: '12,892' },
            { provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 8, kabupaten: 5, bidang: '165.193', luas: '558.613,678' },
            { provinsi: 'DKI Jakarta', jumlahIgt: 1, kabupaten: 1, bidang: 4, luas: '3,256' },
            { provinsi: 'Nusa Tenggara Timur', jumlahIgt: 1, kabupaten: 3, bidang: '2.829', luas: '8.876,029' },
            { provinsi: 'Tidak Tercatat', jumlahIgt: 1, kabupaten: 1, bidang: '7.516', luas: '231.015,748' }
        ],
        statistikIGTKabupaten: [
            { kabupaten: 'Badung', provinsi: 'Bali', jumlahIgt: 2, bidang: 160, luas: '12,892' },
            { kabupaten: 'Bantul', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '15.554', luas: '82.720,993' },
            { kabupaten: 'Belu', provinsi: 'Nusa Tenggara Timur', jumlahIgt: 1, bidang: '2.154', luas: '7.517,951' },
            { kabupaten: 'Gunung Kidul', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 7, bidang: '64.003', luas: '219.423,151' },
            { kabupaten: 'Gunung Kidul', provinsi: 'Tidak Tercatat', jumlahIgt: 1, bidang: '7.516', luas: '231.015,748' },
            { kabupaten: 'Kota Jakarta Barat', provinsi: 'DKI Jakarta', jumlahIgt: 1, bidang: 4, luas: '3,256' },
            { kabupaten: 'Kota Yogyakarta', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 7, bidang: '5.460', luas: '6.766,834' },
            { kabupaten: 'Kulon Progo', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 7, bidang: '17.354', luas: '139.608,183' },
            { kabupaten: 'Malaka', provinsi: 'Nusa Tenggara Timur', jumlahIgt: 1, bidang: 319, luas: '545,594' },
            { kabupaten: 'Sleman', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 7, bidang: '62.822', luas: '110.094,516' },
            { kabupaten: 'Sumbawa', provinsi: 'Nusa Tenggara Barat', jumlahIgt: 1, bidang: 356, luas: '812,484' },
            { kabupaten: 'Tabanan', provinsi: 'Bali', jumlahIgt: 1, bidang: 85, luas: '8,450' }
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
    getRawDataByWilayah: function(namaProvinsi, namaKabupaten) {
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
                        { bulan: 'FEB', terkompilasi: 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'MAR', terkompilasi: 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'APR', terkompilasi: 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'MEI', terkompilasi: 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'JUN', terkompilasi: 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'JUL', terkompilasi: totalLayerKab > 1 ? 1 : 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'AGT', terkompilasi: totalLayerKab > 1 ? 1 : 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'SEP', terkompilasi: totalLayerKab > 1 ? 1 : 0, terintegrasi: Math.min(1, totalLayerKab) },
                        { bulan: 'OKT', terkompilasi: totalLayerKab > 1 ? 1 : 0, terintegrasi: Math.max(Math.min(1, totalLayerKab), totalLayerKab - (totalLayerKab > 1 ? 1 : 0)) },
                        { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                        { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                    ]
                },
                statistikIGT: [
                    { igt: 'Bidang Tanah Validasi', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: 24 + (hashKab % 30), luas: (4.2 + (hashKab % 5)).toFixed(3) },
                    { igt: 'Hak Atas Tanah ' + kabBersih, jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: 8 + (hashKab % 6), luas: (0.85 + (hashKab % 2)).toFixed(2) },
                    { igt: 'Lahan Baku Sawah ' + kabBersih, jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '4.210', luas: '11.230,45' },
                    { igt: 'RDTR Wilayah ' + kabBersih, jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 1, bidang: '2.840', luas: '6.450,10' }
                ],
                statistikIGTProvinsi: [
                    { provinsi: provLengkap, jumlahIgt: totalLayerKab, kabupaten: 1, bidang: 24 + (hashKab % 30), luas: (4.2 + (hashKab % 5)).toFixed(3) }
                ],
                statistikIGTKabupaten: [
                    { kabupaten: kabLengkap, provinsi: provLengkap, jumlahIgt: totalLayerKab, bidang: 24 + (hashKab % 30), luas: (4.2 + (hashKab % 5)).toFixed(3) }
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
                    { bulan: 'FEB', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'MAR', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'APR', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'MEI', terkompilasi: 1, terintegrasi: 1 },
                    { bulan: 'JUN', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'JUL', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'AGT', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'SEP', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'OKT', terkompilasi: 1, terintegrasi: Math.max(2, totalLayer - 1) },
                    { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                    { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                ]
            },
            statistikIGT: [
                { igt: 'Bidang Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 4 + (hash % 6), bidang: 58 + (hash % 40), luas: (18.4 + (hash % 10)).toFixed(3) },
                { igt: 'Hak Atas Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 2, bidang: 16 + (hash % 8), luas: (1.45 + (hash % 2)).toFixed(2) },
                { igt: 'Inventarisasi Tanah Kritis', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 3, bidang: 520 + (hash % 100), luas: '942,150' },
                { igt: 'Kemampuan Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 3 + (hash % 3), bidang: '1.840', luas: '142.610,200' },
                { igt: 'Lahan Baku Sawah Nasional', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '24.120', luas: '34.870,40' },
                { igt: 'RDTR Kabupaten/ Kota', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 3, bidang: '28.450', luas: '19.820,10' },
                { igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 3, bidang: 320, luas: '0' }
            ],
            statistikIGTProvinsi: [
                { provinsi: provLengkap, jumlahIgt: totalLayer, kabupaten: 4 + (hash % 6), bidang: '24.120', luas: '34.870,40' }
            ],
            statistikIGTKabupaten: [
                { kabupaten: 'Kabupaten A ' + provBersih, provinsi: provLengkap, jumlahIgt: Math.max(1, totalLayer - 1), bidang: '12.450', luas: '18.420,10' },
                { kabupaten: 'Kabupaten B ' + provBersih, provinsi: provLengkap, jumlahIgt: Math.max(1, totalLayer - 2), bidang: '8.120', luas: '10.250,30' },
                { kabupaten: 'Kota ' + provBersih, provinsi: provLengkap, jumlahIgt: totalLayer, bidang: '3.550', luas: '6.200,00' }
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

    getDataByWilayah: function(namaProvinsi, namaKabupaten, tahun) {
        var res = this.getRawDataByWilayah(namaProvinsi, namaKabupaten);
        var t = (tahun && tahun !== 'all') ? String(tahun) : 'all';
        if (t === 'all') return res;

        // Adaptasi data komponen dashboard sesuai tahun renaksi yang dipilih
        var usulan = this.getUsulanInputData(namaProvinsi, namaKabupaten, t);
        var kompilasi = this.getKompilasiIntegrasi(namaProvinsi, namaKabupaten, t);

        var log = res.aktivitasLog ? res.aktivitasLog.map(function(item) {
            var tgl = item.tanggal.replace(/\b(202[3-6])\b/g, t);
            return Object.assign({}, item, { tanggal: tgl });
        }) : [];

        var capaian = res.capaianRenaksi ? res.capaianRenaksi.map(function(item) {
            if (t === '2026') return item;
            var tgt = typeof item.target === 'number' ? item.target : 12;
            var rate = t === '2025' ? 0.90 : (t === '2024' ? 0.95 : 1.0);
            var cap = Math.min(tgt, Math.round(tgt * rate));
            return Object.assign({}, item, {
                target: tgt,
                capaian: cap
            });
        }) : [];

        var lb = res.leaderBoard ? res.leaderBoard.map(function(item, idx) {
            var delta = t === '2025' ? (idx % 2 === 0 ? 1 : -1) : (t === '2024' ? (idx % 2 === 1 ? 1 : -1) : (t === '2023' ? (idx % 3 === 0 ? 1 : 0) : 0));
            return Object.assign({}, item, {
                tema: Math.max(1, item.tema + delta)
            });
        }) : [];

        var statCount = t === '2026' ? res.statistikIGT.length : (t === '2025' ? Math.max(3, res.statistikIGT.length - 2) : (t === '2024' ? Math.max(2, res.statistikIGT.length - 3) : Math.max(2, res.statistikIGT.length - 4)));
        var stat = res.statistikIGT ? res.statistikIGT.slice(0, statCount) : [];

        var rawStatProv = res.statistikIGTProvinsi || this.nasional.statistikIGTProvinsi || [];
        var statProvCount = t === '2026' ? rawStatProv.length : (t === '2025' ? Math.max(3, rawStatProv.length - 1) : (t === '2024' ? Math.max(2, rawStatProv.length - 2) : Math.max(2, rawStatProv.length - 3)));
        var statProv = rawStatProv.slice(0, statProvCount);

        var rawStatKab = res.statistikIGTKabupaten || this.nasional.statistikIGTKabupaten || [];
        var statKabCount = t === '2026' ? rawStatKab.length : (t === '2025' ? Math.max(4, rawStatKab.length - 2) : (t === '2024' ? Math.max(3, rawStatKab.length - 4) : Math.max(2, rawStatKab.length - 6)));
        var statKab = rawStatKab.slice(0, statKabCount);

        return Object.assign({}, res, {
            usulanInputData: usulan,
            kompilasiIntegrasi: kompilasi,
            aktivitasLog: log,
            capaianRenaksi: capaian,
            leaderBoard: lb,
            statistikIGT: stat,
            statistikIGTProvinsi: statProv,
            statistikIGTKabupaten: statKab
        });
    },

    /**
     * 39 IGT Dasar Pertanahan dan Ruang (Kementerian ATR/BPN)
     * Berdasarkan dokumen resmi: "05 DAFTAR IGT DASAR PERTANAHAN DAN RUANG"
     */
    daftar39IGT: [
        // --- IGT PERTANAHAN (29 IGT) ---
        // Ditjen Survei dan Pemetaan Pertanahan dan Ruang (Ditjen SPPR)
        { no: 1, nama: 'Bidang Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', direktorat: 'Direktorat Pengukuran Dan Pemetaan Kadastral', basisFisik: 'bidang' },
        { no: 2, nama: 'Penguasaan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', direktorat: 'Direktorat Survei Dan Pemetaan Tematik', basisFisik: 'bidang' },
        { no: 3, nama: 'Pemilikan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', direktorat: 'Direktorat Survei Dan Pemetaan Tematik', basisFisik: 'bidang' },
        { no: 4, nama: 'Penggunaan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', direktorat: 'Direktorat Survei Dan Pemetaan Tematik', basisFisik: 'bidang' },
        { no: 5, nama: 'Pemanfaatan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', direktorat: 'Direktorat Survei Dan Pemetaan Tematik', basisFisik: 'bidang' },
        { no: 35, nama: 'Unsur Dasar Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen SPPR', direktorat: 'Direktorat Survei Dan Pemetaan Tematik', basisFisik: 'kawasan' },

        // Ditjen Penetapan Hak dan Pendaftaran Tanah
        { no: 11, nama: 'Hak Atas Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penetapan Hak dan Pendaftaran Tanah', direktorat: 'Direktorat Penetapan Hak Atas Tanah dan Ruang', basisFisik: 'bidang' },

        // Ditjen Penanganan Sengketa dan Konflik Pertanahan
        { no: 12, nama: 'Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen Penanganan Sengketa dan Konflik Pertanahan', direktorat: 'Direktorat Penanganan Sengketa Pertanahan', basisFisik: 'bidang' },

        // Ditjen Penataan Agraria
        { no: 6, nama: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Pemberdayaan Tanah Masyarakat', basisFisik: 'bidang' },
        { no: 7, nama: 'Pertimbangan Teknis Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Penatagunaan Tanah', basisFisik: 'bidang' },
        { no: 8, nama: 'Inventarisasi Tanah Kritis', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Penatagunaan Tanah', basisFisik: 'bidang' },
        { no: 26, nama: 'Lahan Baku Sawah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Penatagunaan Tanah', basisFisik: 'kawasan' },
        { no: 27, nama: 'Kemampuan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Penatagunaan Tanah', basisFisik: 'kawasan' },
        { no: 28, nama: 'Neraca Penatagunaan Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Penatagunaan Tanah', basisFisik: 'kawasan' },
        { no: 29, nama: 'Persebaran Pulau-Pulau Kecil Terluar di Indonesia', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Landreform', basisFisik: 'kawasan' },
        { no: 30, nama: 'Sebaran Tanah Objek Reforma Agraria', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Landreform', basisFisik: 'kawasan' },
        { no: 31, nama: 'Analisa Tanah Objek Reforma Agraria', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Landreform', basisFisik: 'kawasan' },
        { no: 32, nama: 'Potensi Objek Redistribusi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Landreform', basisFisik: 'kawasan' },
        { no: 33, nama: 'Potensi WP3WT', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Landreform', basisFisik: 'kawasan' },
        { no: 34, nama: 'Tanah Timbul', jenis: 'pertanahan', ditjen: 'Ditjen Penataan Agraria', direktorat: 'Direktorat Landreform', basisFisik: 'kawasan' },

        // Ditjen Pengadaan Tanah dan Pengembangan Pertanahan
        { no: 13, nama: 'Potensi Subjek Konsolidasi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', direktorat: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 14, nama: 'Nilai Bidang Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', direktorat: 'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan', basisFisik: 'bidang' },
        { no: 15, nama: 'Desain Konsolidasi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', direktorat: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 16, nama: 'Hasil Penerapan Desain Konsolidasi Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', direktorat: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', basisFisik: 'bidang' },
        { no: 38, nama: 'Zona Nilai Tanah', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', direktorat: 'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan', basisFisik: 'kawasan' },
        { no: 39, nama: 'Sebaran Potensi Pengembangan Pertanahan', jenis: 'pertanahan', ditjen: 'Ditjen Pengadaan Tanah dan Pengembangan Pertanahan', direktorat: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', basisFisik: 'kawasan' },

        // Ditjen Pengendalian dan Penertiban Tanah dan Ruang (Pertanahan)
        { no: 9, nama: 'Tanah Terindikasi Terlantar', jenis: 'pertanahan', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', direktorat: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', basisFisik: 'bidang' },
        { no: 36, nama: 'Lahan Sawah Dilindungi', jenis: 'pertanahan', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', direktorat: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', basisFisik: 'kawasan' },
        { no: 37, nama: 'Kawasan Terindikasi Terlantar', jenis: 'pertanahan', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', direktorat: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', basisFisik: 'kawasan' },

        // --- IGT TATA RUANG (10 IGT) ---
        // Ditjen Tata Ruang
        { no: 17, nama: 'RTRW Nasional', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Perencanaan Tata Ruang Nasional', basisFisik: 'kawasan' },
        { no: 18, nama: 'RTRW Provinsi', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', basisFisik: 'kawasan' },
        { no: 19, nama: 'RTRW Kabupaten', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', basisFisik: 'kawasan' },
        { no: 20, nama: 'RTRW Kota', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', basisFisik: 'kawasan' },
        { no: 21, nama: 'RDTR Kawasan Perbatasan Negara', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Perencanaan Tata Ruang Nasional', basisFisik: 'kawasan' },
        { no: 22, nama: 'RTR Pulau/Kepulauan', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Perencanaan Tata Ruang Nasional', basisFisik: 'kawasan' },
        { no: 23, nama: 'RTR Kawasan Strategis Nasional', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Perencanaan Tata Ruang Nasional', basisFisik: 'kawasan' },
        { no: 24, nama: 'RDTR Kabupaten/Kota', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', basisFisik: 'kawasan' },
        { no: 25, nama: 'KKPR', jenis: 'tataruang', ditjen: 'Ditjen Tata Ruang', direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', basisFisik: 'kawasan' },

        // Ditjen Pengendalian dan Penertiban Tanah dan Ruang (Tata Ruang)
        { no: 10, nama: 'Indikasi Pelanggaran Pemanfaatan Ruang', jenis: 'tataruang', ditjen: 'Ditjen Pengendalian dan Penertiban Tanah dan Ruang', direktorat: 'Direktorat Penertiban Pemanfaatan Ruang', basisFisik: 'bidang' }
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
        var dataScope = this.getRawDataByWilayah(namaProvinsi, namaKabupaten);
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

    getKompilasiIntegrasi: function(namaProvinsi, namaKabupaten, tahun) {
        var dataScope = (namaProvinsi && namaProvinsi !== 'all' && namaProvinsi !== 'Seluruh Indonesia')
            ? this.getRawDataByWilayah(namaProvinsi, namaKabupaten)
            : this.nasional;
        var baseKomp = dataScope ? dataScope.kompilasiIntegrasi : this.nasional.kompilasiIntegrasi;
        var t = (tahun && tahun !== 'all') ? String(tahun) : 'all';
        if (t === 'all') return baseKomp;

        var factor = t === '2026' ? 1.0 : (t === '2025' ? 0.72 : (t === '2024' ? 0.43 : 0.22));
        var scaledTotalLayer = Math.max(1, Math.round(baseKomp.totalLayer * factor));

        var activeMonths = (t === '2026') ? 10 : 12;
        var maxKomp = 0;
        var maxInteg = 0;

        var bulanan = baseKomp.bulanan.map(function(b, idx) {
            var isMActive = idx < activeMonths;
            var tkomp = isMActive ? Math.round((b.terkompilasi || 0) * factor) : 0;
            var tinteg = isMActive ? Math.round((b.terintegrasi || 0) * factor) : 0;

            if (isMActive) {
                if (tkomp < maxKomp) tkomp = maxKomp;
                else maxKomp = tkomp;

                if (tinteg < maxInteg) tinteg = maxInteg;
                else maxInteg = tinteg;
            }

            return {
                bulan: b.bulan,
                terkompilasi: tkomp,
                terintegrasi: tinteg
            };
        });

        // Set the peak month to match scaledTotalLayer
        var peakIdx = (t === '2026') ? 9 : 11;
        var currentPeakTotal = bulanan[peakIdx].terkompilasi + bulanan[peakIdx].terintegrasi;
        if (currentPeakTotal < scaledTotalLayer) {
            bulanan[peakIdx].terintegrasi += (scaledTotalLayer - currentPeakTotal);
        } else if (currentPeakTotal > scaledTotalLayer) {
            scaledTotalLayer = currentPeakTotal;
        }

        return {
            totalLayer: scaledTotalLayer,
            bulanan: bulanan
        };
    },

    isIgtPertanahan: function(nama) {
        if (!nama) return false;
        var n = String(nama).toLowerCase().trim();
        var tr = [
            'rtrw nasional', 'rtrw provinsi', 'rtrw kabupaten', 'rtrw kota',
            'rdtr kawasan perbatasan negara', 'rtr pulau/kepulauan',
            'rtr kawasan strategis nasional', 'rdtr kabupaten/kota', 'kkpr',
            'indikasi pelanggaran pemanfaatan ruang'
        ];
        return tr.indexOf(n) === -1;
    },

    getIgtBasisFisik: function(nama) {
        if (!nama) return 'bidang';
        var n = String(nama).toLowerCase().trim();
        var kawasan = [
            'unsur dasar pertanahan', 'zona nilai tanah', 'sebaran potensi pengembangan pertanahan',
            'lahan baku sawah', 'kemampuan tanah', 'neraca penatagunaan tanah',
            'persebaran pulau-pulau kecil terluar di indonesia', 'sebaran tanah objek reforma agraria',
            'analisa tanah objek reforma agraria', 'potensi objek redistribusi tanah',
            'potensi wp3wt', 'tanah timbul', 'lahan sawah dilindungi', 'kawasan terindikasi terlantar',
            'rtrw nasional', 'rtrw provinsi', 'rtrw kabupaten', 'rtrw kota',
            'rdtr kawasan perbatasan negara', 'rtr pulau/kepulauan', 'rtr kawasan strategis nasional',
            'rdtr kabupaten/kota', 'kkpr'
        ];
        return kawasan.indexOf(n) !== -1 ? 'kawasan' : 'bidang';
    },

    getLeaderBoardData: function(kategori, tahunFilter, arg3, arg4) {
        var kat = kategori || 'capaian-renaksi';
        var t = (tahunFilter && tahunFilter !== 'all') ? String(tahunFilter) : 'all';
        var factor = t === '2026' || t === 'all' ? 1.0 : (t === '2025' ? 0.78 : (t === '2024' ? 0.52 : 0.30));

        var jenisIgtFilter = 'all';
        var direktoratFilter = 'all';
        if (arg3 === 'pertanahan' || arg3 === 'tataruang' || arg3 === 'all') {
            jenisIgtFilter = arg3;
        } else if (arg3) {
            direktoratFilter = arg3;
        }
        if (arg4) {
            jenisIgtFilter = arg4;
        }
        var self = this;

        var satkerIgtMap = {
            'Direktorat Pengukuran Dan Pemetaan Kadastral': [
                'Bidang Tanah'
            ],
            'Direktorat Penetapan Hak Atas Tanah dan Ruang': [
                'Hak Atas Tanah'
            ],
            'Direktorat Penanganan Sengketa Pertanahan': [
                'Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan'
            ],
            'Direktorat Pemberdayaan Tanah Masyarakat': [
                'Sebaran Lokasi Pemberdayaan Tanah Masyarakat'
            ],
            'Direktorat Survei Dan Pemetaan Tematik': [
                'Penguasaan Tanah',
                'Pemilikan Tanah',
                'Penggunaan Tanah',
                'Pemanfaatan Tanah',
                'Unsur Dasar Pertanahan'
            ],
            'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan': [
                'Nilai Bidang Tanah',
                'Zona Nilai Tanah'
            ],
            'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan': [
                'Potensi Subjek Konsolidasi Tanah',
                'Desain Konsolidasi Tanah',
                'Hasil Penerapan Desain Konsolidasi Tanah',
                'Sebaran Potensi Pengembangan Pertanahan'
            ],
            'Direktorat Penatagunaan Tanah': [
                'Pertimbangan Teknis Pertanahan',
                'Inventarisasi Tanah Kritis',
                'Lahan Baku Sawah',
                'Kemampuan Tanah',
                'Neraca Penatagunaan Tanah'
            ],
            'Direktorat Landreform': [
                'Persebaran Pulau-Pulau Kecil Terluar di Indonesia',
                'Sebaran Tanah Objek Reforma Agraria',
                'Analisa Tanah Objek Reforma Agraria',
                'Potensi Objek Redistribusi Tanah',
                'Potensi WP3WT',
                'Tanah Timbul'
            ],
            'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu': [
                'Tanah Terindikasi Terlantar',
                'Lahan Sawah Dilindungi',
                'Kawasan Terindikasi Terlantar'
            ],
            'Direktorat Penertiban Pemanfaatan Ruang': [
                'Indikasi Pelanggaran Pemanfaatan Ruang'
            ],
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I': [
                'RTRW Provinsi',
                'RTRW Kabupaten',
                'RTRW Kota',
                'RDTR Kabupaten/Kota',
                'KKPR'
            ],
            'Direktorat Perencanaan Tata Ruang Nasional': [
                'RTRW Nasional',
                'RDTR Kawasan Perbatasan Negara',
                'RTR Pulau/Kepulauan',
                'RTR Kawasan Strategis Nasional'
            ]
        };

        if (kat === 'igt-akses') {
            // Kategori 2: IGT yang paling sering diakses (via plugin dan aplikasi)
            var baseAkses = [
                { igt: 'Bidang Tanah', jenisIgt: 'Pertanahan', satker: 'Direktorat Pengukuran Dan Pemetaan Kadastral', aksesPlugin: Math.round(32140 * factor), aksesAplikasi: Math.round(16151 * factor) },
                { igt: 'Hak Atas Tanah', jenisIgt: 'Pertanahan', satker: 'Direktorat Penetapan Hak Atas Tanah dan Ruang', aksesPlugin: Math.round(24800 * factor), aksesAplikasi: Math.round(14380 * factor) },
                { igt: 'RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', aksesPlugin: Math.round(18250 * factor), aksesAplikasi: Math.round(11160 * factor) },
                { igt: 'Zona Nilai Tanah', jenisIgt: 'Tata Ruang', satker: 'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan', aksesPlugin: Math.round(16400 * factor), aksesAplikasi: Math.round(10450 * factor) },
                { igt: 'Lahan Baku Sawah', jenisIgt: 'Tata Ruang', satker: 'Direktorat Penatagunaan Tanah', aksesPlugin: Math.round(14110 * factor), aksesAplikasi: Math.round(9120 * factor) },
                { igt: 'Lahan Sawah Dilindungi', jenisIgt: 'Tata Ruang', satker: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', aksesPlugin: Math.round(11200 * factor), aksesAplikasi: Math.round(8320 * factor) },
                { igt: 'Penggunaan Tanah', jenisIgt: 'Pertanahan', satker: 'Direktorat Survei Dan Pemetaan Tematik', aksesPlugin: Math.round(9300 * factor), aksesAplikasi: Math.round(7350 * factor) },
                { igt: 'RTRW Kabupaten', jenisIgt: 'Tata Ruang', satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', aksesPlugin: Math.round(8420 * factor), aksesAplikasi: Math.round(6420 * factor) },
                { igt: 'Kemampuan Tanah', jenisIgt: 'Tata Ruang', satker: 'Direktorat Penatagunaan Tanah', aksesPlugin: Math.round(6120 * factor), aksesAplikasi: Math.round(5300 * factor) },
                { igt: 'KKPR', jenisIgt: 'Tata Ruang', satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', aksesPlugin: Math.round(5800 * factor), aksesAplikasi: Math.round(4850 * factor) },
                { igt: 'RDTR Kawasan Perbatasan Negara', jenisIgt: 'Tata Ruang', satker: 'Direktorat Perencanaan Tata Ruang Nasional', aksesPlugin: Math.round(4250 * factor), aksesAplikasi: Math.round(3640 * factor) },
                { igt: 'Neraca Penatagunaan Tanah', jenisIgt: 'Tata Ruang', satker: 'Direktorat Penatagunaan Tanah', aksesPlugin: Math.round(3400 * factor), aksesAplikasi: Math.round(2720 * factor) },
                { igt: 'Inventarisasi Tanah Kritis', jenisIgt: 'Pertanahan', satker: 'Direktorat Penatagunaan Tanah', aksesPlugin: Math.round(2650 * factor), aksesAplikasi: Math.round(2300 * factor) },
                { igt: 'RTRW Provinsi', jenisIgt: 'Tata Ruang', satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', aksesPlugin: Math.round(1800 * factor), aksesAplikasi: Math.round(1850 * factor) },
                { igt: 'Tanah Terindikasi Terlantar', jenisIgt: 'Pertanahan', satker: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', aksesPlugin: Math.round(1450 * factor), aksesAplikasi: Math.round(1200 * factor) }
            ];

            if (jenisIgtFilter === 'pertanahan') {
                baseAkses = baseAkses.filter(function(it) {
                    return self.isIgtPertanahan(it.igt);
                });
            } else if (jenisIgtFilter === 'tataruang') {
                baseAkses = baseAkses.filter(function(it) {
                    return !self.isIgtPertanahan(it.igt);
                });
            }

            return baseAkses.map(function(item) {
                var total = item.aksesPlugin + item.aksesAplikasi;
                return {
                    igt: item.igt,
                    satker: item.satker,
                    jenisIgt: item.jenisIgt,
                    daftarIgt: [item.igt],
                    aksesPlugin: item.aksesPlugin,
                    aksesAplikasi: item.aksesAplikasi,
                    jumlahAkses: total,
                    jumlahAksesStr: total.toLocaleString('id-ID') + ' kali',
                    tahun: t
                };
            }).sort(function(a, b) {
                return b.jumlahAkses - a.jumlahAkses;
            });

        } else if (kat === 'direktorat-login' || kat === 'satker-login') {
            // Kategori 3: Satker yang paling sering login (Direktorat/Pusat, Kanwil, dan Kantah)
            var baseLogin = [
                { satker: 'Direktorat Survei Dan Pemetaan Tematik', tipe: 'Pusat', jumlahLogin: Math.round(2840 * factor) },
                { satker: 'Kanwil BPN Provinsi Jawa Barat', tipe: 'Kanwil', jumlahLogin: Math.round(2450 * factor) },
                { satker: 'Kantah Kab. Bogor', tipe: 'Kantah', jumlahLogin: Math.round(2180 * factor) },
                { satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', tipe: 'Pusat', jumlahLogin: Math.round(1950 * factor) },
                { satker: 'Kanwil BPN Provinsi Jawa Timur', tipe: 'Kanwil', jumlahLogin: Math.round(1820 * factor) },
                { satker: 'Kantah Kota Surabaya I', tipe: 'Kantah', jumlahLogin: Math.round(1680 * factor) },
                { satker: 'Direktorat Penetapan Hak Atas Tanah dan Ruang', tipe: 'Pusat', jumlahLogin: Math.round(1540 * factor) },
                { satker: 'Kanwil BPN Provinsi Jawa Tengah', tipe: 'Kanwil', jumlahLogin: Math.round(1480 * factor) },
                { satker: 'Kantah Kab. Sleman', tipe: 'Kantah', jumlahLogin: Math.round(1360 * factor) },
                { satker: 'Kanwil BPN Provinsi DKI Jakarta', tipe: 'Kanwil', jumlahLogin: Math.round(1250 * factor) },
                { satker: 'Kantah Kota Jakarta Barat', tipe: 'Kantah', jumlahLogin: Math.round(1180 * factor) },
                { satker: 'Kantah Kab. Badung', tipe: 'Kantah', jumlahLogin: Math.round(1050 * factor) },
                { satker: 'Direktorat Penatagunaan Tanah', tipe: 'Pusat', jumlahLogin: Math.round(942 * factor) },
                { satker: 'Kanwil BPN Provinsi Bali', tipe: 'Kanwil', jumlahLogin: Math.round(860 * factor) },
                { satker: 'Kantah Kab. Bandung', tipe: 'Kantah', jumlahLogin: Math.round(790 * factor) },
                { satker: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', tipe: 'Pusat', jumlahLogin: Math.round(735 * factor) },
                { satker: 'Kantah Kota Semarang', tipe: 'Kantah', jumlahLogin: Math.round(660 * factor) },
                { satker: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', tipe: 'Pusat', jumlahLogin: Math.round(590 * factor) },
                { satker: 'Kanwil BPN Provinsi Nusa Tenggara Timur', tipe: 'Kanwil', jumlahLogin: Math.round(480 * factor) },
                { satker: 'Direktorat Penanganan Sengketa Pertanahan', tipe: 'Pusat', jumlahLogin: Math.round(348 * factor) }
            ];

            var tataruangDirektorat = [
                'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I',
                'Direktorat Perencanaan Tata Ruang Nasional',
                'Direktorat Penertiban Pemanfaatan Ruang'
            ];

            if (jenisIgtFilter === 'pertanahan') {
                baseLogin = baseLogin.filter(function(it) {
                    if (it.tipe === 'Pusat') {
                        return tataruangDirektorat.indexOf(it.satker) === -1;
                    }
                    return true;
                });
            } else if (jenisIgtFilter === 'tataruang') {
                baseLogin = baseLogin.filter(function(it) {
                    if (it.tipe === 'Pusat') {
                        return tataruangDirektorat.indexOf(it.satker) !== -1;
                    }
                    return true;
                });
            }

            return baseLogin.map(function(item) {
                return {
                    satker: item.satker,
                    tipe: item.tipe,
                    daftarIgt: satkerIgtMap[item.satker] || [],
                    jumlahLogin: item.jumlahLogin,
                    jumlahLoginStr: item.jumlahLogin.toLocaleString('id-ID') + ' kali login',
                    tahun: t
                };
            }).sort(function(a, b) {
                return b.jumlahLogin - a.jumlahLogin;
            });

        } else {
            // Kategori 1: Capaian Renaksi oleh Satker/Direktorat
            // Sesuai 13 Direktorat Resmi Pengelola 39 IGT Kementerian ATR/BPN
            var baseSatkerCapaian = [
                {
                    satker: 'Direktorat Penetapan Hak Atas Tanah dan Ruang',
                    daftarIgt: ['Hak Atas Tanah'],
                    targetBidang: Math.max(2, Math.round(10 * factor)),
                    realisasiBidang: Math.max(2, Math.round(10 * factor)),
                    countBidang: 1,
                    targetKawasan: 0,
                    realisasiKawasan: 0,
                    countKawasan: 0
                },
                {
                    satker: 'Direktorat Penanganan Sengketa Pertanahan',
                    daftarIgt: ['Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan'],
                    targetBidang: Math.max(5, Math.round(25 * factor)),
                    realisasiBidang: Math.max(5, Math.round(24 * factor)),
                    countBidang: 1,
                    targetKawasan: 0,
                    realisasiKawasan: 0,
                    countKawasan: 0
                },
                {
                    satker: 'Direktorat Pengukuran Dan Pemetaan Kadastral',
                    daftarIgt: ['Bidang Tanah'],
                    targetBidang: Math.max(10, Math.round(50 * factor)),
                    realisasiBidang: Math.max(9, Math.round(47 * factor)),
                    countBidang: 1,
                    targetKawasan: 0,
                    realisasiKawasan: 0,
                    countKawasan: 0
                },
                {
                    satker: 'Direktorat Survei Dan Pemetaan Tematik',
                    // Dual basis: 4 Bidang + 1 Kawasan
                    daftarIgt: [
                        'Penguasaan Tanah',
                        'Pemilikan Tanah',
                        'Penggunaan Tanah',
                        'Pemanfaatan Tanah',
                        'Unsur Dasar Pertanahan'
                    ],
                    targetBidang: Math.max(10, Math.round(120 * factor)),
                    realisasiBidang: Math.max(9, Math.round(112 * factor)),
                    countBidang: 4,
                    targetKawasan: Math.max(1000, Math.round(10000 * factor)),
                    realisasiKawasan: Math.max(900, Math.round(9200 * factor)),
                    countKawasan: 1
                },
                {
                    satker: 'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan',
                    // Dual basis: 1 Bidang + 1 Kawasan
                    daftarIgt: [
                        'Nilai Bidang Tanah',
                        'Zona Nilai Tanah'
                    ],
                    targetBidang: Math.max(5, Math.round(30 * factor)),
                    realisasiBidang: Math.max(4, Math.round(27 * factor)),
                    countBidang: 1,
                    targetKawasan: Math.max(500, Math.round(6000 * factor)),
                    realisasiKawasan: Math.max(450, Math.round(5400 * factor)),
                    countKawasan: 1
                },
                {
                    satker: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan',
                    // Dual basis: 3 Bidang + 1 Kawasan
                    daftarIgt: [
                        'Potensi Subjek Konsolidasi Tanah',
                        'Desain Konsolidasi Tanah',
                        'Hasil Penerapan Desain Konsolidasi Tanah',
                        'Sebaran Potensi Pengembangan Pertanahan'
                    ],
                    targetBidang: Math.max(10, Math.round(70 * factor)),
                    realisasiBidang: Math.max(8, Math.round(61 * factor)),
                    countBidang: 3,
                    targetKawasan: Math.max(1000, Math.round(14000 * factor)),
                    realisasiKawasan: Math.max(850, Math.round(11900 * factor)),
                    countKawasan: 1
                },
                {
                    satker: 'Direktorat Pemberdayaan Tanah Masyarakat',
                    daftarIgt: ['Sebaran Lokasi Pemberdayaan Tanah Masyarakat'],
                    targetBidang: Math.max(5, Math.round(20 * factor)),
                    realisasiBidang: Math.max(4, Math.round(17 * factor)),
                    countBidang: 1,
                    targetKawasan: 0,
                    realisasiKawasan: 0,
                    countKawasan: 0
                },
                {
                    satker: 'Direktorat Penatagunaan Tanah',
                    // Dual basis: 2 Bidang + 3 Kawasan
                    daftarIgt: [
                        'Pertimbangan Teknis Pertanahan',
                        'Inventarisasi Tanah Kritis',
                        'Lahan Baku Sawah',
                        'Kemampuan Tanah',
                        'Neraca Penatagunaan Tanah'
                    ],
                    targetBidang: Math.max(5, Math.round(30 * factor)),
                    realisasiBidang: Math.max(4, Math.round(25 * factor)),
                    countBidang: 2,
                    targetKawasan: Math.max(4000, Math.round(45000 * factor)),
                    realisasiKawasan: Math.max(3200, Math.round(37350 * factor)),
                    countKawasan: 3
                },
                {
                    satker: 'Direktorat Landreform',
                    // 6 Kawasan
                    daftarIgt: [
                        'Persebaran Pulau-Pulau Kecil Terluar di Indonesia',
                        'Sebaran Tanah Objek Reforma Agraria',
                        'Analisa Tanah Objek Reforma Agraria',
                        'Potensi Objek Redistribusi Tanah',
                        'Potensi WP3WT',
                        'Tanah Timbul'
                    ],
                    targetBidang: 0,
                    realisasiBidang: 0,
                    countBidang: 0,
                    targetKawasan: Math.max(5000, Math.round(45000 * factor)),
                    realisasiKawasan: Math.max(3800, Math.round(36450 * factor)),
                    countKawasan: 6
                },
                {
                    satker: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu',
                    // Dual basis: 1 Bidang + 2 Kawasan
                    daftarIgt: [
                        'Tanah Terindikasi Terlantar',
                        'Lahan Sawah Dilindungi',
                        'Kawasan Terindikasi Terlantar'
                    ],
                    targetBidang: Math.max(4, Math.round(25 * factor)),
                    realisasiBidang: Math.max(3, Math.round(19 * factor)),
                    countBidang: 1,
                    targetKawasan: Math.max(2000, Math.round(25000 * factor)),
                    realisasiKawasan: Math.max(1500, Math.round(19000 * factor)),
                    countKawasan: 2
                },
                {
                    satker: 'Direktorat Penertiban Pemanfaatan Ruang',
                    // 1 Bidang (Tata Ruang)
                    daftarIgt: [
                        'Indikasi Pelanggaran Pemanfaatan Ruang'
                    ],
                    targetBidang: Math.max(4, Math.round(15 * factor)),
                    realisasiBidang: Math.max(3, Math.round(11 * factor)),
                    countBidang: 1,
                    targetKawasan: 0,
                    realisasiKawasan: 0,
                    countKawasan: 0
                },
                {
                    satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I',
                    // 5 Kawasan (Tata Ruang)
                    daftarIgt: [
                        'RTRW Provinsi',
                        'RTRW Kabupaten',
                        'RTRW Kota',
                        'RDTR Kabupaten/Kota',
                        'KKPR'
                    ],
                    targetBidang: 0,
                    realisasiBidang: 0,
                    countBidang: 0,
                    targetKawasan: Math.max(2500, Math.round(25000 * factor)),
                    realisasiKawasan: Math.max(1700, Math.round(17750 * factor)),
                    countKawasan: 5
                },
                {
                    satker: 'Direktorat Perencanaan Tata Ruang Nasional',
                    // 4 Kawasan (Tata Ruang)
                    daftarIgt: [
                        'RTRW Nasional',
                        'RDTR Kawasan Perbatasan Negara',
                        'RTR Pulau/Kepulauan',
                        'RTR Kawasan Strategis Nasional'
                    ],
                    targetBidang: 0,
                    realisasiBidang: 0,
                    countBidang: 0,
                    targetKawasan: Math.max(2000, Math.round(20000 * factor)),
                    realisasiKawasan: Math.max(1300, Math.round(13600 * factor)),
                    countKawasan: 4
                }
            ];

            var filteredBaseSatker = [];
            baseSatkerCapaian.forEach(function(item) {
                var filteredIgt = item.daftarIgt;
                if (jenisIgtFilter === 'pertanahan') {
                    filteredIgt = item.daftarIgt.filter(function(name) {
                        return self.isIgtPertanahan(name);
                    });
                } else if (jenisIgtFilter === 'tataruang') {
                    filteredIgt = item.daftarIgt.filter(function(name) {
                        return !self.isIgtPertanahan(name);
                    });
                }

                if (filteredIgt.length === 0) {
                    return;
                }

                var cBidang = 0;
                var cKawasan = 0;
                filteredIgt.forEach(function(name) {
                    if (self.getIgtBasisFisik(name) === 'kawasan') {
                        cKawasan++;
                    } else {
                        cBidang++;
                    }
                });

                var tBidang = item.targetBidang;
                var rBidang = item.realisasiBidang;
                var tKawasan = item.targetKawasan;
                var rKawasan = item.realisasiKawasan;

                if (cBidang === 0) {
                    tBidang = 0;
                    rBidang = 0;
                } else if (item.countBidang > 0 && cBidang < item.countBidang) {
                    var ratioB = cBidang / item.countBidang;
                    tBidang = Math.max(1, Math.round(item.targetBidang * ratioB));
                    rBidang = Math.max(1, Math.round(item.realisasiBidang * ratioB));
                }

                if (cKawasan === 0) {
                    tKawasan = 0;
                    rKawasan = 0;
                } else if (item.countKawasan > 0 && cKawasan < item.countKawasan) {
                    var ratioK = cKawasan / item.countKawasan;
                    tKawasan = Math.max(1, Math.round(item.targetKawasan * ratioK));
                    rKawasan = Math.max(1, Math.round(item.realisasiKawasan * ratioK));
                }

                filteredBaseSatker.push({
                    satker: item.satker,
                    daftarIgt: filteredIgt,
                    targetBidang: tBidang,
                    realisasiBidang: rBidang,
                    countBidang: cBidang,
                    targetKawasan: tKawasan,
                    realisasiKawasan: rKawasan,
                    countKawasan: cKawasan
                });
            });

            var items = filteredBaseSatker.map(function(item) {
                var hasBidang = item.countBidang > 0 && item.targetBidang > 0;
                var hasKawasan = item.countKawasan > 0 && item.targetKawasan > 0;

                var pctBidang = hasBidang ? (item.realisasiBidang / item.targetBidang) * 100 : 0;
                var pctKawasan = hasKawasan ? (item.realisasiKawasan / item.targetKawasan) * 100 : 0;

                var totalWeight = 0;
                var weightedSum = 0;

                if (hasBidang) {
                    var wB = item.countBidang;
                    weightedSum += pctBidang * wB;
                    totalWeight += wB;
                }
                if (hasKawasan) {
                    var wK = item.countKawasan;
                    weightedSum += pctKawasan * wK;
                    totalWeight += wK;
                }

                var finalPct = totalWeight > 0 ? parseFloat((weightedSum / totalWeight).toFixed(2)) : 0;
                finalPct = Math.min(100, Math.max(0, finalPct));

                var color = finalPct <= 30 ? 'danger' : (finalPct <= 75 ? 'warning' : 'success');

                var bobotNote = '';
                if (hasBidang && hasKawasan) {
                    bobotNote = 'Bobot: ' + item.countKawasan + ' Ha, ' + item.countBidang + ' Bidang';
                }

                return {
                    satker: item.satker,
                    igt: item.daftarIgt.join(', '),
                    daftarIgt: item.daftarIgt || [],
                    hasBidang: hasBidang,
                    hasKawasan: hasKawasan,
                    realisasiBidang: item.realisasiBidang,
                    targetBidang: item.targetBidang,
                    pctBidang: pctBidang,
                    countBidang: item.countBidang,
                    realisasiKawasan: item.realisasiKawasan,
                    targetKawasan: item.targetKawasan,
                    pctKawasan: pctKawasan,
                    countKawasan: item.countKawasan,
                    bobotNote: bobotNote,
                    persentase: finalPct,
                    persenStr: finalPct.toFixed(2) + '%',
                    progressColor: color,
                    tahun: t
                };
            });

            if (direktoratFilter && direktoratFilter !== 'all' && direktoratFilter !== 'Semua Satker') {
                items = items.filter(function(r) {
                    return r.satker === direktoratFilter;
                });
            }

            items.sort(function(a, b) {
                if (b.persentase !== a.persentase) {
                    return b.persentase - a.persentase;
                }
                var totA = (a.realisasiBidang || 0) + (a.realisasiKawasan || 0);
                var totB = (b.realisasiBidang || 0) + (b.realisasiKawasan || 0);
                return totB - totA;
            });

            return items;
        }
    },

    getLeaderBoardSatkerList: function() {
        return [
            'Semua Satker',
            'Direktorat Pengukuran Dan Pemetaan Kadastral',
            'Direktorat Penetapan Hak Atas Tanah dan Ruang',
            'Direktorat Penanganan Sengketa Pertanahan',
            'Direktorat Pemberdayaan Tanah Masyarakat',
            'Direktorat Survei Dan Pemetaan Tematik',
            'Direktorat Penilaian Tanah Dan Ekonomi Pertanahan',
            'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan',
            'Direktorat Penatagunaan Tanah',
            'Direktorat Landreform',
            'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu',
            'Direktorat Penertiban Pemanfaatan Ruang',
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I',
            'Direktorat Perencanaan Tata Ruang Nasional',
            'Kanwil BPN Provinsi Jawa Barat',
            'Kanwil BPN Provinsi Jawa Timur',
            'Kanwil BPN Provinsi Jawa Tengah',
            'Kanwil BPN Provinsi DKI Jakarta',
            'Kanwil BPN Provinsi Bali',
            'Kantah Kab. Bogor',
            'Kantah Kota Surabaya I',
            'Kantah Kab. Sleman',
            'Kantah Kota Jakarta Barat',
            'Kantah Kab. Badung'
        ];
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
    },

    getKompilasiDetailList: function(statusFilter, bulanFilter, namaProvinsi, namaKabupaten, tahunFilter) {
        var t = (tahunFilter && tahunFilter !== 'all') ? String(tahunFilter) : 'all';
        var factor = t === '2026' || t === 'all' ? 1.0 : (t === '2025' ? 0.72 : (t === '2024' ? 0.43 : 0.22));

        var bulanNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        var bulanShort = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];

        var bCutoff = 12;
        if (bulanFilter !== undefined && bulanFilter !== null && bulanFilter !== 'all') {
            if (typeof bulanFilter === 'string' && isNaN(Number(bulanFilter))) {
                var mapBulan = { 'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MEI': 5, 'JUN': 6, 'JUL': 7, 'AGT': 8, 'SEP': 9, 'OKT': 10, 'NOV': 11, 'DES': 12 };
                bCutoff = mapBulan[bulanFilter.toUpperCase()] || 12;
            } else {
                bCutoff = parseInt(bulanFilter, 10) || 12;
            }
        }

        var master14 = [
            {
                id: 'igt-1',
                nama_igt: 'Bidang Tanah',
                total_upload: 2,
                total_target: Math.max(10, Math.round(138 * factor)),
                jumlah_realisasi: Math.max(10, Math.round(138 * factor)),
                satuan: 'Bidang',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 1,
                datasets: [
                    {
                        direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
                        igt: 'Bidang Tanah',
                        jenisData: 'SHP',
                        tglUpload: '12/01/2026',
                        tglIntegrasi: '12/01/2026',
                        keterangan: 'Validasi topologi zero gap/overlap batas persil',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    },
                    {
                        direktorat: 'Kantor Wilayah BPN Provinsi D.I. Yogyakarta',
                        igt: 'Bidang Tanah',
                        jenisData: 'SHP',
                        tglUpload: '18/02/2026',
                        tglIntegrasi: '20/02/2026',
                        keterangan: 'Penyelarasan batas administrasi spasial persil DIY',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    },
                    {
                        direktorat: 'Direktorat Perencanaan Tata Ruang',
                        igt: 'Bidang Tanah',
                        jenisData: 'SHP',
                        tglUpload: '14/03/2026',
                        tglIntegrasi: '15/03/2026',
                        keterangan: 'Sinkronisasi peta persil tematik',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-2',
                nama_igt: 'Hak Atas Tanah',
                total_upload: 1,
                total_target: Math.max(2, Math.round(10 * factor)),
                jumlah_realisasi: Math.max(2, Math.round(10 * factor)),
                satuan: 'Bidang',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 1,
                datasets: [
                    {
                        direktorat: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
                        igt: 'Hak Atas Tanah',
                        jenisData: 'SHP',
                        tglUpload: '15/01/2026',
                        tglIntegrasi: '18/01/2026',
                        keterangan: 'Kompilasi hak pakai dan HPL',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-3',
                nama_igt: 'Zona Nilai Tanah',
                total_upload: 1,
                total_target: Math.max(1, Math.round(5 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(5 * factor)),
                satuan: 'Kabupaten/Kota',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 2,
                datasets: [
                    {
                        direktorat: 'Direktorat Penilaian Tanah dan Ekonomi Pertanahan',
                        igt: 'Zona Nilai Tanah',
                        jenisData: 'SHP',
                        tglUpload: '10/02/2026',
                        tglIntegrasi: '14/02/2026',
                        keterangan: 'Pembaruan peta zona nilai ekonomi wilayah',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-4',
                nama_igt: 'RDTR Kabupaten/ Kota',
                total_upload: 1,
                total_target: Math.max(3, Math.round(11 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(3 * factor)),
                satuan: 'Kawasan',
                statusKey: 'terkompilasi',
                status: 'Terkompilasi',
                bulanIndex: 1,
                datasets: [
                    {
                        direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
                        igt: 'RDTR Kabupaten/ Kota',
                        jenisData: 'SHP',
                        tglUpload: '20/01/2026',
                        tglIntegrasi: '25/01/2026',
                        keterangan: 'Kompilasi pola ruang RDTR kawasan perkotaan',
                        status: 'Terkompilasi',
                        statusKey: 'terkompilasi',
                        hasDownload: false
                    }
                ]
            },
            {
                id: 'igt-5',
                nama_igt: 'Inventarisasi Tanah Kritis',
                total_upload: 0,
                total_target: Math.max(1, Math.round(4 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(3 * factor)),
                satuan: 'Lokasi',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 8,
                datasets: [
                    {
                        direktorat: 'Direktorat Penatagunaan Tanah',
                        igt: 'Inventarisasi Tanah Kritis',
                        jenisData: 'SHP',
                        tglUpload: '12/08/2026',
                        tglIntegrasi: '15/08/2026',
                        keterangan: 'Pemetaan lahan kritis sub-DAS',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-6',
                nama_igt: 'RDTR Kawasan Perbatasan Negara',
                total_upload: 0,
                total_target: Math.max(1, Math.round(5 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(3 * factor)),
                satuan: 'Lokasi',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
                        igt: 'RDTR Kawasan Perbatasan Negara',
                        jenisData: 'SHP',
                        tglUpload: '18/10/2026',
                        tglIntegrasi: '21/10/2026',
                        keterangan: 'Integrasi batas kawasan perbatasan strategis',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-7',
                nama_igt: 'Lahan Baku Sawah Nasional',
                total_upload: 0,
                total_target: Math.max(1, Math.round(5 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(1 * factor)),
                satuan: 'Kawasan',
                statusKey: 'terkompilasi',
                status: 'Terkompilasi',
                bulanIndex: 5,
                datasets: [
                    {
                        direktorat: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu',
                        igt: 'Lahan Baku Sawah Nasional',
                        jenisData: 'GeoJSON',
                        tglUpload: '14/05/2026',
                        tglIntegrasi: '18/05/2026',
                        keterangan: 'Verifikasi luasan lahan baku sawah',
                        status: 'Terkompilasi',
                        statusKey: 'terkompilasi',
                        hasDownload: false
                    }
                ]
            },
            {
                id: 'igt-8',
                nama_igt: 'Penggunaan Tanah',
                total_upload: 1,
                total_target: Math.max(2, Math.round(7 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(1 * factor)),
                satuan: 'Lokasi',
                statusKey: 'terkompilasi',
                status: 'Terkompilasi',
                bulanIndex: 6,
                datasets: [
                    {
                        direktorat: 'Direktorat Penatagunaan Tanah',
                        igt: 'Penggunaan Tanah',
                        jenisData: 'SHP',
                        tglUpload: '08/06/2026',
                        tglIntegrasi: '12/06/2026',
                        keterangan: 'Kompilasi data tutupan lahan eksisting',
                        status: 'Terkompilasi',
                        statusKey: 'terkompilasi',
                        hasDownload: false
                    }
                ]
            },
            {
                id: 'igt-9',
                nama_igt: 'Neraca Penatagunaan Tanah',
                total_upload: 1,
                total_target: Math.max(2, Math.round(10 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(1 * factor)),
                satuan: 'Lokasi',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Penatagunaan Tanah',
                        igt: 'Neraca Penatagunaan Tanah',
                        jenisData: 'SHP',
                        tglUpload: '05/10/2026',
                        tglIntegrasi: '09/10/2026',
                        keterangan: 'Penyusunan neraca perubahan fungsi tanah',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-10',
                nama_igt: 'Kemampuan Tanah',
                total_upload: 0,
                total_target: Math.max(1, Math.round(5 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(4 * factor)),
                satuan: 'Lokasi',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Penatagunaan Tanah',
                        igt: 'Kemampuan Tanah',
                        jenisData: 'SHP',
                        tglUpload: '10/10/2026',
                        tglIntegrasi: '14/10/2026',
                        keterangan: 'Kesesuaian kelas kemampuan tanah kawasan lindung',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-11',
                nama_igt: 'Lahan Sawah Dilindungi',
                total_upload: 0,
                total_target: Math.max(1, Math.round(6 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(6 * factor)),
                satuan: 'Kawasan',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu',
                        igt: 'Lahan Sawah Dilindungi',
                        jenisData: 'SHP',
                        tglUpload: '12/10/2026',
                        tglIntegrasi: '16/10/2026',
                        keterangan: 'Integrasi penetapan LSD nasional',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-12',
                nama_igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat',
                total_upload: 1,
                total_target: Math.max(1, Math.round(5 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(2 * factor)),
                satuan: 'Lokasi',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Pemberdayaan Tanah Masyarakat',
                        igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat',
                        jenisData: 'SHP',
                        tglUpload: '15/10/2026',
                        tglIntegrasi: '19/10/2026',
                        keterangan: 'Pemetaan klaster pemberdayaan masyarakat',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-13',
                nama_igt: 'RTRW Provinsi',
                total_upload: 0,
                total_target: Math.max(1, Math.round(2 * factor)),
                jumlah_realisasi: Math.max(1, Math.round(2 * factor)),
                satuan: 'Provinsi',
                statusKey: 'terintegrasi',
                status: 'Terintegrasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
                        igt: 'RTRW Provinsi',
                        jenisData: 'SHP',
                        tglUpload: '02/10/2026',
                        tglIntegrasi: '05/10/2026',
                        keterangan: 'Integrasi perda rencana tata ruang wilayah provinsi',
                        status: 'Terintegrasi',
                        statusKey: 'terintegrasi',
                        hasDownload: true
                    }
                ]
            },
            {
                id: 'igt-14',
                nama_igt: 'RTRW Kabupaten',
                total_upload: 0,
                total_target: Math.max(2, Math.round(10 * factor)),
                jumlah_realisasi: 0,
                satuan: 'Kabupaten/Kota',
                statusKey: 'terkompilasi',
                status: 'Terkompilasi',
                bulanIndex: 10,
                datasets: [
                    {
                        direktorat: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
                        igt: 'RTRW Kabupaten',
                        jenisData: 'SHP',
                        tglUpload: '11/10/2026',
                        tglIntegrasi: '-',
                        keterangan: 'Menunggu rekomendasi perbaikan peta struktur ruang',
                        status: 'Terkompilasi',
                        statusKey: 'terkompilasi',
                        hasDownload: false
                    }
                ]
            }
        ];

        // Hitung persentase dan warna progres tiap item
        master14.forEach(function(item) {
            var pct = 0;
            if (item.total_target > 0) {
                pct = parseFloat(((item.jumlah_realisasi / item.total_target) * 100).toFixed(2));
            }
            item.persen = pct;
            item.color = pct <= 30 ? 'danger' : (pct <= 75 ? 'warning' : 'success');
        });

        // Hitung ketersediaan berdasar filter bulan (kumulatif s.d. bCutoff)
        var cumulativeAvailable = master14.filter(function(item) {
            if (bCutoff >= 12) return true;
            return item.bulanIndex <= bCutoff;
        });

        var countAll = cumulativeAvailable.length;
        var countTerintegrasi = cumulativeAvailable.filter(function(i) { return i.statusKey === 'terintegrasi'; }).length;
        var countTerkompilasi = cumulativeAvailable.filter(function(i) { return i.statusKey === 'terkompilasi'; }).length;

        var filteredItems = cumulativeAvailable;
        if (statusFilter && statusFilter !== 'all') {
            filteredItems = cumulativeAvailable.filter(function(item) {
                return item.statusKey === statusFilter;
            });
        }

        var labelPeriode = bCutoff >= 12 ? 'Semua Bulan' : ('Kumulatif Jan - ' + bulanShort[bCutoff]);

        return {
            items: filteredItems,
            counts: {
                all: countAll,
                terintegrasi: countTerintegrasi,
                terkompilasi: countTerkompilasi
            },
            bCutoff: bCutoff,
            labelPeriode: labelPeriode,
            wilayah: (namaKabupaten ? (namaKabupaten + ', ' + namaProvinsi) : (namaProvinsi || 'Seluruh Indonesia')),
            tahun: t
        };
    }
};
