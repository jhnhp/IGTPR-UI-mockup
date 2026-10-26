/**
 * IGTPR Mockup UI - Dummy Data Store
 * Supports 3 Drilldown Levels:
 * 1. Nasional (Seluruh Indonesia)
 * 2. Provinsi (e.g. Jawa Tengah, Jawa Barat, dll.)
 * 3. Kabupaten / Kota (e.g. Kab. Semarang, Kota Semarang, Kab. Karanganyar, Kab. Banyumas, Solo, dll.)
 */

window.MOCKUP_DATA = {
    // 0a. DATA ROLE UMUM (hanya pengajuan derivatif)
    umum: {
        derivatif: [
            { layer: 'Jalur Evakuasi Tsunami Pesisir Selatan', tipe: 'Kawasan', sld: 'SLD KAWASAN', fitur: 128, status: 'Menunggu Verifikasi', berlaku: '-', tanggal: '24 Okt 2026, 16.20', ket: 'Hasil survei komunitas desa', catatan: 'Sedang diperiksa Admin.' },
            { layer: 'Sebaran Lahan Pertanian Organik', tipe: 'Bidang', sld: 'SLD BIDANG', fitur: 540, status: 'Disetujui', berlaku: '30 Jun 2027', tanggal: '09 Sep 2026, 08.45', ket: 'Data kelompok tani', catatan: 'Disetujui verifikator.' }
        ]
    },

    // 0. DATA DASHBOARD ROLE OPERATOR
    operator: {
        grafik: [
            { periode: '3-2024', upload: 2, revisi: 0 }, { periode: '6-2024', upload: 1, revisi: 0 },
            { periode: '7-2024', upload: 6, revisi: 0 }, { periode: '8-2024', upload: 5, revisi: 0 },
            { periode: '9-2024', upload: 5, revisi: 0 }, { periode: '10-2024', upload: 1, revisi: 0 },
            { periode: '12-2024', upload: 1, revisi: 0 }, { periode: '1-2025', upload: 2, revisi: 0 },
            { periode: '6-2025', upload: 6, revisi: 1 }, { periode: '1-2026', upload: 2, revisi: 0 },
            { periode: '2-2026', upload: 3, revisi: 0 }, { periode: '3-2026', upload: 1, revisi: 0 },
            { periode: '4-2026', upload: 6, revisi: 0 }, { periode: '5-2026', upload: 1, revisi: 0 },
            { periode: '7-2026', upload: 3, revisi: 0 }, { periode: '10-2026', upload: 1, revisi: 0 }
        ],
        // Daftar IGT Renaksi satker Operator (halaman Data Kompilasi & Integrasi Data)
        // belum = berkas yang masih menunggu proses pada tahap tersebut
        renaksi: [
            { igt: 'Bidang Tanah', satuan: 'Bidang', target: 2, belumKompilasi: 0, belumIntegrasi: 1 },
            { igt: 'Hak Atas Tanah', satuan: 'Bidang', target: 1, belumKompilasi: 0, belumIntegrasi: 0 },
            { igt: 'Lahan Baku Sawah Nasional', satuan: 'Kawasan', target: 2, belumKompilasi: 0, belumIntegrasi: 0 },
            { igt: 'Lahan Sawah Dilindungi', satuan: 'Kawasan', target: 2, belumKompilasi: 0, belumIntegrasi: 0 },
            { igt: 'Pertimbangan Teknis Pertanahan', satuan: 'Lokasi', target: 2, belumKompilasi: 1, belumIntegrasi: 0 },
            { igt: 'Zona Nilai Tanah', satuan: 'Kabupaten/Kota', target: 2, belumKompilasi: 1, belumIntegrasi: 0 }
        ],
        // Berkas yang sudah terkompilasi (8). Yang berstatus Terintegrasi (7) tampil juga di Integrasi Data.
        berkas: [
            { igt: 'Bidang Tanah', upload: '21/04/2026', integrasi: '-', ket: 'BIDANG_TANAH_2026_TAHAP1.zip', status: 'Terkompilasi' },
            { igt: 'Bidang Tanah', upload: '18/08/2026', integrasi: '20/08/2026', ket: 'REVISI 1908', status: 'Terintegrasi' },
            { igt: 'Hak Atas Tanah', upload: '11/10/2026', integrasi: '15/10/2026', ket: 'HAT_SEMESTER_2.zip', status: 'Terintegrasi' },
            { igt: 'Lahan Baku Sawah Nasional', upload: '07/07/2026', integrasi: '27/08/2026', ket: 'LBS tahap 1', status: 'Terintegrasi' },
            { igt: 'Lahan Baku Sawah Nasional', upload: '07/07/2026', integrasi: '27/08/2026', ket: 'LBS tahap 2', status: 'Terintegrasi' },
            { igt: 'Lahan Sawah Dilindungi', upload: '18/06/2026', integrasi: '18/06/2026', ket: '-', status: 'Terintegrasi' },
            { igt: 'Pertimbangan Teknis Pertanahan', upload: '12/10/2026', integrasi: '12/10/2026', ket: 'contoh teknis', status: 'Terintegrasi' },
            { igt: 'Zona Nilai Tanah', upload: '04/05/2026', integrasi: '10/05/2026', ket: 'ZNT_2026.zip', status: 'Terintegrasi' }
        ],
        // Pengajuan data derivatif milik Operator (4)
        derivatif: [
            { layer: 'Kawasan Rawan Bencana Longsor', tipe: 'Kawasan', sld: 'SLD KAWASAN', fitur: 4610, status: 'Disetujui', berlaku: '31 Des 2026', tanggal: '26 Okt 2026, 03.30', ket: 'Turunan RTRW Kabupaten', catatan: 'Sesuai standar, disetujui verifikator.' },
            { layer: 'Sebaran Bidang Tanah Terdaftar', tipe: 'Bidang', sld: 'SLD BIDANG', fitur: 12840, status: 'Disetujui', berlaku: '-', tanggal: '14 Okt 2026, 10.12', ket: 'Agregasi bidang per desa', catatan: 'Disetujui.' },
            { layer: 'Zona Nilai Tanah Kelas Tinggi', tipe: 'Kawasan', sld: 'SLD ZNT', fitur: 862, status: 'Menunggu Verifikasi', berlaku: '-', tanggal: '20 Okt 2026, 14.05', ket: 'Filter ZNT > Rp5 jt/m²', catatan: 'Sedang diperiksa Admin.' },
            { layer: 'Lahan Sawah Dilindungi Terkonversi', tipe: 'Kawasan', sld: 'SLD LSD', fitur: 317, status: 'Ditolak', berlaku: '-', tanggal: '02 Okt 2026, 09.48', ket: 'Overlay LSD x Penggunaan Tanah', catatan: 'Geometri tidak valid, mohon unggah ulang.' }
        ],
        riwayat: [

            { igt: 'Pertimbangan Teknis Pertanahan', user: 'Administrator IGT', waktu: '2026-10-12 14:58:01', status: 'Terintegrasi' },
            { igt: 'Pertimbangan Teknis Pertanahan', user: 'Administrator IGT', waktu: '2026-10-12 14:48:59', status: 'Terkompilasi' },
            { igt: 'Pertimbangan Teknis Pertanahan', user: 'Testing User', waktu: '2026-10-12 00:00:00', status: 'Proses Pengajuan Kompilasi' },
            { igt: 'Lahan Baku Sawah Nasional', user: 'Administrator IGT', waktu: '2026-08-27 15:17:26', status: 'Terintegrasi' },
            { igt: 'Lahan Baku Sawah Nasional', user: 'Administrator IGT', waktu: '2026-07-07 15:11:26', status: 'Terkompilasi' },
            { igt: 'Lahan Baku Sawah Nasional', user: 'Administrator IGT', waktu: '2026-07-07 15:06:21', status: 'Terkompilasi' },
            { igt: 'Lahan Sawah Dilindungi', user: 'Administrator IGT', waktu: '2026-06-18 10:22:40', status: 'Terintegrasi' },
            { igt: 'Zona Nilai Tanah', user: 'Testing User', waktu: '2026-05-04 09:13:55', status: 'Proses Pengajuan Kompilasi' },
            { igt: 'Bidang Tanah', user: 'Administrator IGT', waktu: '2026-04-21 16:40:12', status: 'Terkompilasi' }
        ]
    },

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
            { provinsi: 'Bali', jumlahIgt: 3, kabupaten: 2, bidang: '1.450', luas: '128,450' },
            { provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 8, kabupaten: 5, bidang: '165.193', luas: '558.613,678' },
            { provinsi: 'DKI Jakarta', jumlahIgt: 4, kabupaten: 5, bidang: '84.210', luas: '66.420,120' },
            { provinsi: 'Jawa Barat', jumlahIgt: 7, kabupaten: 27, bidang: '342.180', luas: '1.840.520,340' },
            { provinsi: 'Jawa Tengah', jumlahIgt: 6, kabupaten: 35, bidang: '298.640', luas: '1.450.110,890' },
            { provinsi: 'Jawa Timur', jumlahIgt: 7, kabupaten: 38, bidang: '315.420', luas: '1.920.340,650' },
            { provinsi: 'Banten', jumlahIgt: 5, kabupaten: 8, bidang: '124.500', luas: '480.210,500' },
            { provinsi: 'Kalimantan Timur', jumlahIgt: 5, kabupaten: 10, bidang: '98.320', luas: '2.140.850,700' },
            { provinsi: 'Sumatera Utara', jumlahIgt: 6, kabupaten: 33, bidang: '178.490', luas: '1.250.600,400' },
            { provinsi: 'Nusa Tenggara Timur', jumlahIgt: 3, kabupaten: 22, bidang: '45.820', luas: '380.120,800' }
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
            { layer: 'TES LAYER DERIVATIF KAWASAN', provinsi: 3, kabupaten: 3, bidang: '17.938', luas: '2.025.860,518' },
            { layer: 'Derivatif Tumpang Tindih Kawasan Hutan vs Hak Atas Tanah', provinsi: 12, kabupaten: 48, bidang: '42.150', luas: '1.450.210,350' },
            { layer: 'Derivatif Lahan Baku Sawah Terintegrasi Spasial', provinsi: 8, kabupaten: 34, bidang: '68.900', luas: '870.450,120' },
            { layer: 'Derivatif Potensi Sengketa Batas Wilayah Pesisir', provinsi: 6, kabupaten: 18, bidang: '12.420', luas: '320.180,440' },
            { layer: 'Derivatif Buffer Garis Sempadan Danau dan Sungai', provinsi: 14, kabupaten: 52, bidang: '29.340', luas: '512.630,780' },
            { layer: 'Derivatif Kesesuaian Kegiatan Pemanfaatan Ruang (KKPR)', provinsi: 10, kabupaten: 42, bidang: '38.710', luas: '640.220,150' },
            { layer: 'Derivatif Zona Nilai Tanah Kawasan Strategis Nasional', provinsi: 5, kabupaten: 15, bidang: '18.650', luas: '245.890,600' }
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
            { user: 'Administrator', aktivitas: 'Menambahkan SLD Master', waktu: '2026-10-18 14:32:10', tanggal: '2026-10-18 14:32:10' },
            { user: 'Administrator', aktivitas: 'Hapus SLD Master', waktu: '2026-10-18 14:28:45', tanggal: '2026-10-18 14:28:45' },
            { user: 'Administrator', aktivitas: 'Menambahkan SLD Master', waktu: '2026-10-18 13:55:02', tanggal: '2026-10-18 13:55:02' },
            { user: 'Administrator', aktivitas: 'Menambahkan User', waktu: '2026-10-18 11:40:19', tanggal: '2026-10-18 11:40:19' },
            { user: 'Administrator', aktivitas: 'Edit User', waktu: '2026-10-18 11:22:38', tanggal: '2026-10-18 11:22:38' },
            { user: 'Administrator', aktivitas: 'Edit User', waktu: '2026-10-18 10:50:14', tanggal: '2026-10-18 10:50:14' },
            { user: 'Administrator', aktivitas: 'Edit User', waktu: '2026-10-18 10:15:50', tanggal: '2026-10-18 10:15:50' },
            { user: 'Administrator', aktivitas: 'Edit Symbology Master', waktu: '2026-10-18 09:42:33', tanggal: '2026-10-18 09:42:33' },
            { user: 'Administrator', aktivitas: 'Edit User', waktu: '2026-10-18 09:18:05', tanggal: '2026-10-18 09:18:05' },
            { user: 'Administrator', aktivitas: 'Menambahkan Symbology Master', waktu: '2026-10-18 08:30:12', tanggal: '2026-10-18 08:30:12' }
        ]
    },

    // 1B. DATA KHUSUS ROLE DITJEN SPPR
    sppr: {
        tingkat: 'nasional',
        wilayah: 'Direktorat Jenderal Survei dan Pemetaan Pertanahan dan Ruang (SPPR)',
        provinsi: null,
        kabupaten: null,
        isFiltered: true,
        usulanInputData: {
            total: 24,
            totalLayer: 6,
            kategori: [
                { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 14, layer: 3, diperbarui: 'Diperbarui 30 menit lalu', kelas: 'is-terintegrasi' },
                { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 4, layer: 1, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                { kunci: 'terupload', label: 'Terupload', jumlah: 6, layer: 2, diperbarui: 'Diperbarui 3 jam lalu', kelas: 'is-terupload' },
                { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
            ]
        },
        kompilasiIntegrasi: {
            totalLayer: 6,
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
                { bulan: 'OKT', terkompilasi: 1, terintegrasi: 3 },
                { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
            ]
        },
        statistikIGT: [
            { igt: 'Bidang Tanah', jenisIgt: 'Pertanahan', provinsi: 34, kabupaten: 416, bidang: '124.580', luas: '84.920,450' },
            { igt: 'Unsur Dasar Pertanahan', jenisIgt: 'Pertanahan', provinsi: 34, kabupaten: 514, bidang: '89.420', luas: '412.350,120' },
            { igt: 'Penggunaan Tanah', jenisIgt: 'Pertanahan', provinsi: 30, kabupaten: 380, bidang: '76.150', luas: '340.180,600' },
            { igt: 'Pemilikan Tanah', jenisIgt: 'Pertanahan', provinsi: 28, kabupaten: 340, bidang: '64.800', luas: '295.400,250' },
            { igt: 'Penguasaan Tanah', jenisIgt: 'Pertanahan', provinsi: 28, kabupaten: 320, bidang: '58.300', luas: '270.890,110' },
            { igt: 'Pemanfaatan Tanah', jenisIgt: 'Pertanahan', provinsi: 25, kabupaten: 290, bidang: '49.200', luas: '215.650,800' },
            { igt: 'Batas Wilayah Administrasi', jenisIgt: 'Pertanahan', provinsi: 34, kabupaten: 514, bidang: '14.850', luas: '1.904.569,000' },
            { igt: 'Kerangka Kontrol Geodesi', jenisIgt: 'Pertanahan', provinsi: 34, kabupaten: 480, bidang: '8.420', luas: '65.200,400' },
            { igt: 'Peta Tutupan Lahan', jenisIgt: 'Pertanahan', provinsi: 22, kabupaten: 250, bidang: '32.100', luas: '512.400,750' },
            { igt: 'Peta Morfologi Tanah', jenisIgt: 'Pertanahan', provinsi: 18, kabupaten: 190, bidang: '21.400', luas: '348.900,300' }
        ],
        statistikIGTProvinsi: [
            { provinsi: 'DKI Jakarta', jumlahIgt: 6, kabupaten: 5, bidang: '84.210', luas: '66.420,120' },
            { provinsi: 'Jawa Barat', jumlahIgt: 6, kabupaten: 27, bidang: '342.180', luas: '1.840.520,340' },
            { provinsi: 'Jawa Tengah', jumlahIgt: 6, kabupaten: 35, bidang: '298.640', luas: '1.450.110,890' },
            { provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 6, kabupaten: 5, bidang: '165.193', luas: '558.613,678' },
            { provinsi: 'Jawa Timur', jumlahIgt: 6, kabupaten: 38, bidang: '315.420', luas: '1.920.340,650' },
            { provinsi: 'Banten', jumlahIgt: 5, kabupaten: 8, bidang: '124.500', luas: '480.210,500' },
            { provinsi: 'Bali', jumlahIgt: 5, kabupaten: 9, bidang: '95.400', luas: '210.890,400' },
            { provinsi: 'Kalimantan Timur', jumlahIgt: 5, kabupaten: 10, bidang: '98.320', luas: '2.140.850,700' },
            { provinsi: 'Sumatera Utara', jumlahIgt: 5, kabupaten: 33, bidang: '178.490', luas: '1.250.600,400' },
            { provinsi: 'Sulawesi Selatan', jumlahIgt: 4, kabupaten: 24, bidang: '88.600', luas: '760.320,150' }
        ],
        statistikIGTKabupaten: [
            { kabupaten: 'Sleman', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '62.822', luas: '110.094,516' },
            { kabupaten: 'Bantul', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '15.554', luas: '82.720,993' },
            { kabupaten: 'Gunung Kidul', provinsi: 'Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '64.003', luas: '219.423,151' },
            { kabupaten: 'Bogor', provinsi: 'Jawa Barat', jumlahIgt: 6, bidang: '78.450', luas: '298.410,200' },
            { kabupaten: 'Bandung', provinsi: 'Jawa Barat', jumlahIgt: 6, bidang: '65.230', luas: '176.840,110' },
            { kabupaten: 'Semarang', provinsi: 'Jawa Tengah', jumlahIgt: 5, bidang: '42.180', luas: '95.620,340' },
            { kabupaten: 'Banyumas', provinsi: 'Jawa Tengah', jumlahIgt: 5, bidang: '38.900', luas: '132.450,800' },
            { kabupaten: 'Badung', provinsi: 'Bali', jumlahIgt: 5, bidang: '34.200', luas: '41.250,600' },
            { kabupaten: 'Surabaya', provinsi: 'Jawa Timur', jumlahIgt: 5, bidang: '56.700', luas: '33.050,450' },
            { kabupaten: 'Balikpapan', provinsi: 'Kalimantan Timur', jumlahIgt: 5, bidang: '28.400', luas: '50.330,220' }
        ],
        statistikDerivatif: [
            { layer: 'Derivatif Batas Kadastral Bidang Nasional', provinsi: 34, kabupaten: 416, bidang: '124.580', luas: '84.920,450' },
            { layer: 'Validasi Topologi SPPR Tematik', provinsi: 28, kabupaten: 320, bidang: '76.150', luas: '340.180,600' },
            { layer: 'Derivatif Kontur & DEM Dasar Wilayah', provinsi: 25, kabupaten: 290, bidang: '89.420', luas: '412.350,120' },
            { layer: 'Peta Tumpang Tindih Batas Kadastral', provinsi: 18, kabupaten: 180, bidang: '18.420', luas: '94.210,300' },
            { layer: 'Buffer Titik Kontrol Geodesi Aktif (CORS)', provinsi: 34, kabupaten: 480, bidang: '8.420', luas: '65.200,400' },
            { layer: 'Derivatif Klasifikasi Tutupan Lahan AI', provinsi: 22, kabupaten: 250, bidang: '32.100', luas: '512.400,750' },
            { layer: 'Peta Zona Integrasi Kadastral Lengkap', provinsi: 30, kabupaten: 350, bidang: '112.300', luas: '78.450,200' },
            { layer: 'Sebaran Bidang Tanah Belum Terpetakan (K4)', provinsi: 26, kabupaten: 310, bidang: '95.400', luas: '68.900,100' },
            { layer: 'Derivatif Pemetaan Batas Pesisir & Pulau Kecil', provinsi: 15, kabupaten: 85, bidang: '14.250', luas: '184.200,600' },
            { layer: 'Analisis Kesesuaian Peta Tematik Pertanahan', provinsi: 20, kabupaten: 210, bidang: '45.800', luas: '235.600,450' }
        ],
        statistikAksesIGT: [
            { direktorat: 'Direktorat Survei Dan Pemetaan Tematik', aktivitas: 'Login & Unduh Layer', total: 342 },
            { direktorat: 'Direktorat Pengukuran dan Pemetaan Kadastral', aktivitas: 'Validasi Geometri', total: 318 },
            { direktorat: 'Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang', aktivitas: 'Sinkronisasi CORS', total: 285 },
            { direktorat: 'Balai Pemetaan dan Survei Tematik SPPR', aktivitas: 'Pengolahan Citra', total: 246 },
            { direktorat: 'Sekretariat Direktorat Jenderal SPPR', aktivitas: 'Monitoring Integrasi', total: 214 },
            { direktorat: 'Bidang Survei dan Pemetaan Kanwil BPN Jabar', aktivitas: 'Unduh Peta Tematik', total: 188 },
            { direktorat: 'Bidang Survei dan Pemetaan Kanwil BPN Jatim', aktivitas: 'Verifikasi Kadastral', total: 172 },
            { direktorat: 'Bidang Survei dan Pemetaan Kanwil BPN DIY', aktivitas: 'Sinkronisasi Peta', total: 165 },
            { direktorat: 'Seksi Survei Kadastral Kantah Kab. Sleman', aktivitas: 'Validasi Persil', total: 142 },
            { direktorat: 'Seksi Pemetaan Tematik Kantah Kab. Bogor', aktivitas: 'Input Data Spasial', total: 128 }
        ],
        aktivitasLog: [
            { user: 'Administrator SPPR', aktivitas: 'Pembaruan Layer Master Bidang Tanah Nasional', waktu: '2026-10-24 16:45:22', tanggal: '2026-10-24 16:45:22' },
            { user: 'Verifikator Tematik SPPR', aktivitas: 'Verifikasi Peta Tutupan Lahan Wilayah II', waktu: '2026-10-24 15:30:18', tanggal: '2026-10-24 15:30:18' },
            { user: 'Surveyor Kadastral Pusat', aktivitas: 'Kompilasi Data Batas Bidang Kadastral', waktu: '2026-10-24 14:15:05', tanggal: '2026-10-24 14:15:05' },
            { user: 'Operator CORS Geodesi', aktivitas: 'Kalibrasi Stasiun Kerangka Kontrol', waktu: '2026-10-24 13:02:40', tanggal: '2026-10-24 13:02:40' },
            { user: 'Analis Geospasial SPPR', aktivitas: 'Ekstraksi Layer Derivatif Topologi', waktu: '2026-10-24 11:48:33', tanggal: '2026-10-24 11:48:33' },
            { user: 'Supervisor Data SPPR', aktivitas: 'Persetujuan Integrasi IGT Unsur Dasar', waktu: '2026-10-24 10:25:12', tanggal: '2026-10-24 10:25:12' },
            { user: 'Petugas Pemetaan Tematik', aktivitas: 'Unggah Geodatabase Pemanfaatan Tanah', waktu: '2026-10-24 09:40:55', tanggal: '2026-10-24 09:40:55' },
            { user: 'Verifikator Kadastral Jabar', aktivitas: 'Koreksi Topologi Geometri Persil', waktu: '2026-10-24 09:12:08', tanggal: '2026-10-24 09:12:08' },
            { user: 'Admin Kanwil DIY', aktivitas: 'Sinkronisasi Data Spasial Daerah', waktu: '2026-10-24 08:35:19', tanggal: '2026-10-24 08:35:19' },
            { user: 'Administrator SPPR', aktivitas: 'Audit Akses API Plugin QGIS SPPR', waktu: '2026-10-24 08:05:44', tanggal: '2026-10-24 08:05:44' }
        ]
    },

    // 2. FUNGSI RETRIEVAL TINGKAT WILAYAH (Nasional, Provinsi, atau Kabupaten)
    getRawDataByWilayah: function(namaProvinsi, namaKabupaten) {
        if (namaProvinsi === 'sppr' || (!namaProvinsi && typeof window !== 'undefined' && window.ROLE_LOCK_DIREKTORAT === 'SPPR')) {
            return this.sppr;
        }

        if (!namaProvinsi || namaProvinsi === 'all' || namaProvinsi === 'Seluruh Indonesia') {
            return this.nasional;
        }

        var provBersih = String(namaProvinsi).trim().replace(/^Provinsi\s+/i, '');
        var provLengkap = 'Provinsi ' + provBersih;

        // JIKA TINGKAT KABUPATEN / KOTA DIPILIH (misal: Kabupaten Gunungkidul):
        if (namaKabupaten) {
            var kabBersih = String(namaKabupaten).trim();
            var kabLengkap = /^Kota\s+/i.test(kabBersih) ? kabBersih : (/^Kabupaten\s+/i.test(kabBersih) ? kabBersih : 'Kabupaten ' + kabBersih);
            var isGK = kabBersih.toLowerCase().indexOf('gunung') !== -1;

            return {
                tingkat: 'kabupaten',
                wilayah: kabLengkap + ', ' + provLengkap,
                provinsi: provLengkap,
                kabupaten: kabLengkap,
                isFiltered: true,
                usulanInputData: {
                    total: 18,
                    totalLayer: 5,
                    kategori: [
                        { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 9, layer: 2, diperbarui: 'Diperbarui 15 menit lalu', kelas: 'is-terintegrasi' },
                        { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 4, layer: 1, diperbarui: 'Diperbarui 3 jam lalu', kelas: 'is-terkompilasi' },
                        { kunci: 'terupload', label: 'Terupload', jumlah: 5, layer: 2, diperbarui: 'Diperbarui 1 jam lalu', kelas: 'is-terupload' },
                        { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                    ]
                },
                kompilasiIntegrasi: {
                    totalLayer: 5,
                    bulanan: [
                        { bulan: 'JAN', terkompilasi: 0, terintegrasi: 0 },
                        { bulan: 'FEB', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'MAR', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'APR', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'MEI', terkompilasi: 0, terintegrasi: 1 },
                        { bulan: 'JUN', terkompilasi: 1, terintegrasi: 1 },
                        { bulan: 'JUL', terkompilasi: 1, terintegrasi: 1 },
                        { bulan: 'AGT', terkompilasi: 1, terintegrasi: 2 },
                        { bulan: 'SEP', terkompilasi: 1, terintegrasi: 2 },
                        { bulan: 'OKT', terkompilasi: 1, terintegrasi: 3 },
                        { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                        { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                    ]
                },
                statistikIGT: [
                    { igt: 'Bidang Tanah Validasi Wonosari', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '64.003', luas: '219.423,151' },
                    { igt: 'Hak Atas Tanah Karst Gunungkidul', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '48.210', luas: '184.150,200' },
                    { igt: 'Lahan Baku Sawah Gunungkidul', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '4.210', luas: '11.230,450' },
                    { igt: 'RDTR Wilayah Perkotaan Wonosari', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 1, bidang: '2.840', luas: '6.450,100' },
                    { igt: 'Zona Nilai Tanah Pesisir Selatan GK', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '4.500', luas: '8.450,300' },
                    { igt: 'Sebaran Tanah Kas Desa (SG/PAG) GK', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '3.620', luas: '24.120,800' },
                    { igt: 'Inventarisasi Lahan Kritis Ponjong & Semin', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: 480, luas: '1.250,600' },
                    { igt: 'Pemetaan Kawasan Geopark Gunung Sewu', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: '1.450', luas: '42.800,400' },
                    { igt: 'Konsolidasi Tanah Kapanewon Tepus', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 1, bidang: 320, luas: '280,500' },
                    { igt: 'Sempadan Pantai Baron & Wediombo', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 1, bidang: 210, luas: '415,200' }
                ],
                statistikIGTProvinsi: [
                    { provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 8, kabupaten: 5, bidang: '165.193', luas: '558.613,678' }
                ],
                statistikIGTKabupaten: [
                    { kabupaten: 'Wonosari', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 7, bidang: '14.250', luas: '32.410,500' },
                    { kabupaten: 'Playen', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '9.840', luas: '28.150,200' },
                    { kabupaten: 'Semanu', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '8.120', luas: '24.600,800' },
                    { kabupaten: 'Karangmojo', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 6, bidang: '7.450', luas: '22.340,100' },
                    { kabupaten: 'Ponjong', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 5, bidang: '6.200', luas: '26.890,400' },
                    { kabupaten: 'Tepus', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 5, bidang: '4.850', luas: '21.400,200' },
                    { kabupaten: 'Tanjungsari', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 5, bidang: '3.920', luas: '18.250,600' },
                    { kabupaten: 'Paliyan', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 5, bidang: '3.640', luas: '16.780,150' },
                    { kabupaten: 'Patuk', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 5, bidang: '3.210', luas: '14.920,400' },
                    { kabupaten: 'Semin', provinsi: 'Provinsi Daerah Istimewa Yogyakarta', jumlahIgt: 5, bidang: '2.523', luas: '13.680,801' }
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
                    { layer: 'Derivatif Khusus Gunungkidul', provinsi: 1, kabupaten: 1, bidang: 18, luas: '850,200' },
                    { layer: 'Batas Bidang Tematik Karst Gunung Sewu', provinsi: 1, kabupaten: 1, bidang: 12, luas: '1.240,000' },
                    { layer: 'Buffer Jalur Jalan Lintas Selatan (JJLS) GK', provinsi: 1, kabupaten: 1, bidang: 34, luas: '3.120,450' },
                    { layer: 'Derivatif Tanah Kas Desa (Sultan Ground) Tepus', provinsi: 1, kabupaten: 1, bidang: 26, luas: '4.580,200' },
                    { layer: 'Pemetaan Lahan Baku Sawah Wonosari', provinsi: 1, kabupaten: 1, bidang: 48, luas: '2.840,110' },
                    { layer: 'Derivatif Sempadan Pantai Baron & Indrayanti', provinsi: 1, kabupaten: 1, bidang: 15, luas: '640,300' },
                    { layer: 'Derivatif Zona Rawan Kekeringan GK', provinsi: 1, kabupaten: 1, bidang: 52, luas: '18.450,800' },
                    { layer: 'Layer Kawasan Geopark Gunung Sewu', provinsi: 1, kabupaten: 1, bidang: 22, luas: '12.890,600' },
                    { layer: 'Derivatif Lahan Pertanian Pangan Berkelanjutan Ponjong', provinsi: 1, kabupaten: 1, bidang: 38, luas: '5.420,150' },
                    { layer: 'Pemetaan Fasum & Fasos Playen', provinsi: 1, kabupaten: 1, bidang: 19, luas: '310,800' }
                ],
                statistikAksesIGT: [
                    { direktorat: 'Seksi Survei & Pemetaan Kantah Kab. Gunungkidul', aktivitas: 'Login & Input Peta', total: 78 },
                    { direktorat: 'Seksi Penetapan Hak & Pendaftaran Kantah GK', aktivitas: 'Validasi Persil', total: 64 },
                    { direktorat: 'Seksi Penataan & Pemberdayaan Kantah GK', aktivitas: 'Pembaruan Data Reforma', total: 45 },
                    { direktorat: 'Seksi Pengadaan Tanah & Pengembangan GK', aktivitas: 'Inventarisasi JJLS', total: 38 },
                    { direktorat: 'Seksi Pengendalian & Penanganan Sengketa GK', aktivitas: 'Cek Peta Sengketa', total: 29 },
                    { direktorat: 'Subbagian Tata Usaha Kantah Kab. Gunungkidul', aktivitas: 'Monitoring Surat', total: 24 },
                    { direktorat: 'Dinas Pertanahan & Tata Ruang (Kundha Niti Mandala) GK', aktivitas: 'Sinkronisasi RDTR', total: 21 },
                    { direktorat: 'Bappeda Kab. Gunungkidul', aktivitas: 'Akses Geoportal', total: 18 },
                    { direktorat: 'Dinas Pekerjaan Umum dan Kawasan Permukiman GK', aktivitas: 'Akses Layer Jalan', total: 15 },
                    { direktorat: 'Petugas Ukur Kapanewon Wonosari & Playen', aktivitas: 'Upload Titik Ukur', total: 12 }
                ],
                aktivitasLog: [
                    { user: 'Operator Kantah Wonosari', aktivitas: 'Unggah Geodatabase Peta Bidang Wonosari', waktu: '2026-10-24 15:45:10', tanggal: '2026-10-24 15:45:10' },
                    { user: 'Verifikator Kantah GK', aktivitas: 'Pengecekan Topologi Bidang Kapanewon Semanu', waktu: '2026-10-24 14:20:34', tanggal: '2026-10-24 14:20:34' },
                    { user: 'Petugas Ukur Tepus', aktivitas: 'Pengukuran Batas Tanah Kas Desa Sultan Ground', waktu: '2026-10-24 13:10:15', tanggal: '2026-10-24 13:10:15' },
                    { user: 'Kepala Seksi SP GK', aktivitas: 'Verifikasi Validasi Data Spasial JJLS', waktu: '2026-10-24 11:35:48', tanggal: '2026-10-24 11:35:48' },
                    { user: 'Operator GIS Playen', aktivitas: 'Digitasi Bidang Sawah Kapanewon Playen', waktu: '2026-10-24 10:50:22', tanggal: '2026-10-24 10:50:22' },
                    { user: 'Analis Tata Ruang GK', aktivitas: 'Sinkronisasi Layer RDTR Perkotaan Wonosari', waktu: '2026-10-24 10:05:08', tanggal: '2026-10-24 10:05:08' },
                    { user: 'Surveyor Karangmojo', aktivitas: 'Pembaruan Koordinat Titik Batas Bidang', waktu: '2026-10-24 09:22:14', tanggal: '2026-10-24 09:22:14' },
                    { user: 'Petugas Ukur Ponjong', aktivitas: 'Input Atribut Spasial Zona Nilai Tanah Ponjong', waktu: '2026-10-24 08:45:30', tanggal: '2026-10-24 08:45:30' },
                    { user: 'Admin Kantah GK', aktivitas: 'Persetujuan Publikasi Shapefile Tematik Geopark', waktu: '2026-10-24 08:15:02', tanggal: '2026-10-24 08:15:02' },
                    { user: 'Administrator GIS GK', aktivitas: 'Sinkronisasi Harian ke Server Pusat ATR/BPN', waktu: '2026-10-23 17:30:19', tanggal: '2026-10-23 17:30:19' }
                ]
            };
        }

        // JIKA TINGKAT PROVINSI (misal: D.I. Yogyakarta):
        return {
            tingkat: 'provinsi',
            wilayah: provLengkap,
            provinsi: provLengkap,
            kabupaten: null,
            isFiltered: true,
            usulanInputData: {
                total: 28,
                totalLayer: 8,
                kategori: [
                    { kunci: 'terintegrasi', label: 'Terintegrasi', jumlah: 16, layer: 4, diperbarui: 'Diperbarui 30 menit lalu', kelas: 'is-terintegrasi' },
                    { kunci: 'terkompilasi', label: 'Terkompilasi', jumlah: 5, layer: 2, diperbarui: 'Diperbarui 1 hari lalu', kelas: 'is-terkompilasi' },
                    { kunci: 'terupload', label: 'Terupload', jumlah: 7, layer: 2, diperbarui: 'Diperbarui 3 jam lalu', kelas: 'is-terupload' },
                    { kunci: 'perbaikan', label: 'Revisi Perbaikan', jumlah: 0, layer: 0, diperbarui: '-', kelas: 'is-perbaikan' }
                ]
            },
            kompilasiIntegrasi: {
                totalLayer: 8,
                bulanan: [
                    { bulan: 'JAN', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'FEB', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'MAR', terkompilasi: 0, terintegrasi: 1 },
                    { bulan: 'APR', terkompilasi: 0, terintegrasi: 2 },
                    { bulan: 'MEI', terkompilasi: 1, terintegrasi: 2 },
                    { bulan: 'JUN', terkompilasi: 1, terintegrasi: 3 },
                    { bulan: 'JUL', terkompilasi: 1, terintegrasi: 3 },
                    { bulan: 'AGT', terkompilasi: 1, terintegrasi: 3 },
                    { bulan: 'SEP', terkompilasi: 2, terintegrasi: 4 },
                    { bulan: 'OKT', terkompilasi: 2, terintegrasi: 4 },
                    { bulan: 'NOV', terkompilasi: 0, terintegrasi: 0 },
                    { bulan: 'DES', terkompilasi: 0, terintegrasi: 0 }
                ]
            },
            statistikIGT: [
                { igt: 'Bidang Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '165.193', luas: '558.613,678' },
                { igt: 'Hak Atas Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '142.300', luas: '482.110,400' },
                { igt: 'Lahan Baku Sawah Nasional', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 4, bidang: '24.120', luas: '34.870,400' },
                { igt: 'RDTR Kabupaten/ Kota', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 5, bidang: '28.450', luas: '19.820,100' },
                { igt: 'Zona Nilai Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '18.600', luas: '45.200,300' },
                { igt: 'Sebaran Tanah Kas Desa (SG/PAG)', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 5, bidang: '14.210', luas: '88.640,300' },
                { igt: 'Inventarisasi Tanah Kritis', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 3, bidang: 520, luas: '942,150' },
                { igt: 'Kemampuan Tanah', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 4, bidang: '1.840', luas: '142.610,200' },
                { igt: 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenisIgt: 'Pertanahan', provinsi: 1, kabupaten: 4, bidang: 320, luas: '0' },
                { igt: 'Sempadan Pantai Selatan', jenisIgt: 'Tata Ruang', provinsi: 1, kabupaten: 3, bidang: '4.320', luas: '8.940,250' }
            ],
            statistikIGTProvinsi: [
                { provinsi: provLengkap, jumlahIgt: 8, kabupaten: 5, bidang: '165.193', luas: '558.613,678' }
            ],
            statistikIGTKabupaten: [
                { kabupaten: 'Kabupaten Sleman', provinsi: provLengkap, jumlahIgt: 8, bidang: '62.822', luas: '110.094,516' },
                { kabupaten: 'Kabupaten Bantul', provinsi: provLengkap, jumlahIgt: 8, bidang: '15.554', luas: '82.720,993' },
                { kabupaten: 'Kabupaten Gunungkidul', provinsi: provLengkap, jumlahIgt: 8, bidang: '64.003', luas: '219.423,151' },
                { kabupaten: 'Kabupaten Kulon Progo', provinsi: provLengkap, jumlahIgt: 8, bidang: '17.354', luas: '139.608,183' },
                { kabupaten: 'Kota Yogyakarta', provinsi: provLengkap, jumlahIgt: 8, bidang: '5.460', luas: '6.766,834' }
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
                    nama: 'Dinas Pertanahan & Tata Ruang (Dispertaru) DIY',
                    bidang: [],
                    kawasan: ['RDTR Kabupaten/ Kota', 'RTRW Provinsi'],
                    tema: 2
                },
                {
                    peringkat: 3,
                    nama: 'Kantor Pertanahan Kab. Sleman',
                    bidang: ['Bidang Tanah'],
                    kawasan: ['Lahan Baku Sawah'],
                    tema: 2
                },
                {
                    peringkat: 4,
                    nama: 'Kantor Pertanahan Kab. Gunungkidul',
                    bidang: ['Bidang Tanah', 'Hak Atas Tanah'],
                    kawasan: ['Inventarisasi Tanah Kritis'],
                    tema: 2
                },
                {
                    peringkat: 5,
                    nama: 'Kantor Pertanahan Kota Yogyakarta',
                    bidang: ['Nilai Bidang Tanah'],
                    kawasan: [],
                    tema: 1
                }
            ],
            capaianRenaksi: [
                { direktorat: 'Kantor Wilayah BPN ' + provLengkap, target: 32, capaian: 28 },
                { direktorat: 'Kantor Pertanahan Kab. Sleman', target: 14, capaian: 12 },
                { direktorat: 'Kantor Pertanahan Kab. Bantul', target: 12, capaian: 10 },
                { direktorat: 'Kantor Pertanahan Kab. Gunungkidul', target: 10, capaian: 8 },
                { direktorat: 'Kantor Pertanahan Kota Yogyakarta', target: 8, capaian: 7 }
            ],
            statistikDerivatif: [
                { layer: 'Derivatif Bidang Tematik DIY', provinsi: 1, kabupaten: 5, bidang: 42, luas: '2.150,000' },
                { layer: 'Layer Kawasan Prioritas DIY', provinsi: 1, kabupaten: 4, bidang: 28, luas: '4.820,500' },
                { layer: 'Validasi Batas Wilayah Tematik DIY', provinsi: 1, kabupaten: 5, bidang: '6.840', luas: '612.450,200' },
                { layer: 'Derivatif Sumbu Filosofi Yogyakarta', provinsi: 1, kabupaten: 2, bidang: '1.240', luas: '380,450' },
                { layer: 'Buffer Kawasan Rawan Bencana Merapi', provinsi: 1, kabupaten: 1, bidang: '8.450', luas: '14.280,120' },
                { layer: 'Derivatif Tanah Kas Desa (Sultan Ground / PAG)', provinsi: 1, kabupaten: 4, bidang: '14.210', luas: '88.640,300' },
                { layer: 'Pemetaan Lahan Baku Sawah Sleman & Bantul', provinsi: 1, kabupaten: 2, bidang: '18.900', luas: '24.150,800' },
                { layer: 'Derivatif Kawasan Karst Gunung Sewu', provinsi: 1, kabupaten: 1, bidang: '12.650', luas: '115.420,600' },
                { layer: 'Derivatif Sempadan Pantai Selatan Kulon Progo', provinsi: 1, kabupaten: 2, bidang: '4.320', luas: '8.940,250' },
                { layer: 'Layer Klaster Pariwisata & Cagar Budaya DIY', provinsi: 1, kabupaten: 3, bidang: '3.180', luas: '1.850,700' }
            ],
            statistikAksesIGT: [
                { direktorat: 'Kantor Wilayah BPN Provinsi D.I. Yogyakarta', aktivitas: 'Login & Sinkronisasi', total: 185 },
                { direktorat: 'Bidang Survei dan Pemetaan Kanwil DIY', aktivitas: 'Pengecekan Topologi', total: 142 },
                { direktorat: 'Kantor Pertanahan Kab. Sleman', aktivitas: 'Akses Geoportal', total: 128 },
                { direktorat: 'Kantor Pertanahan Kab. Bantul', aktivitas: 'Validasi Persil', total: 115 },
                { direktorat: 'Kantor Pertanahan Kab. Gunungkidul', aktivitas: 'Input Data Tematik', total: 104 },
                { direktorat: 'Kantor Pertanahan Kota Yogyakarta', aktivitas: 'Unduh Peta Heritage', total: 98 },
                { direktorat: 'Kantor Pertanahan Kab. Kulon Progo', aktivitas: 'Sinkronisasi Spasial YIA', total: 86 },
                { direktorat: 'Dinas Pertanahan & Tata Ruang (Dispertaru) DIY', aktivitas: 'Akses RDTR Perkotaan', total: 64 },
                { direktorat: 'Bidang Penetapan Hak dan Pendaftaran Kanwil DIY', aktivitas: 'Verifikasi Hak Tanah', total: 58 },
                { direktorat: 'Bidang Pengendalian dan Sengketa Kanwil DIY', aktivitas: 'Pengecekan Tumpang Tindih', total: 42 }
            ],
            aktivitasLog: [
                { user: 'Admin Kanwil DIY', aktivitas: 'Sinkronisasi Data IGT Provinsi', waktu: '2026-10-24 16:10:42', tanggal: '2026-10-24 16:10:42' },
                { user: 'Verifikator Spasial Kanwil DIY', aktivitas: 'Validasi Topologi Bidang Persil Sleman', waktu: '2026-10-24 15:22:18', tanggal: '2026-10-24 15:22:18' },
                { user: 'Operator Kantah Kab. Sleman', aktivitas: 'Unggah Layer Derivatif Bidang', waktu: '2026-10-24 14:25:18', tanggal: '2026-10-24 14:25:18' },
                { user: 'Verifikator Kantah Kota Yogyakarta', aktivitas: 'Verifikasi Batas Bidang Heritage', waktu: '2026-10-24 13:40:05', tanggal: '2026-10-24 13:40:05' },
                { user: 'Operator Kantah Bantul', aktivitas: 'Pembaruan Atribut Spasial LBS', waktu: '2026-10-24 11:15:30', tanggal: '2026-10-24 11:15:30' },
                { user: 'Petugas Ukur Kantah Kulon Progo', aktivitas: 'Sinkronisasi Data Peta Bandara YIA', waktu: '2026-10-24 10:50:12', tanggal: '2026-10-24 10:50:12' },
                { user: 'Admin Kantah GK', aktivitas: 'Input & Validasi Data Tematik Karst Wonosari', waktu: '2026-10-24 10:12:45', tanggal: '2026-10-24 10:12:45' },
                { user: 'Kepala Seksi Survei Kanwil DIY', aktivitas: 'Approval Peta Integrasi Regional', waktu: '2026-10-24 09:30:20', tanggal: '2026-10-24 09:30:20' },
                { user: 'Analis Tata Ruang Dispertaru DIY', aktivitas: 'Integrasi Layer RDTR Perkotaan', waktu: '2026-10-24 09:05:14', tanggal: '2026-10-24 09:05:14' },
                { user: 'Administrator GIS Kanwil DIY', aktivitas: 'Backup Geodatabase Wilayah DIY', waktu: '2026-10-24 08:15:33', tanggal: '2026-10-24 08:15:33' }
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
            var raw = item.waktu || item.tanggal || '';
            var wkt = (t && t !== 'all') ? raw.replace(/\b(202[3-6])\b/g, t) : raw;
            return Object.assign({}, item, {
                waktu: wkt,
                tanggal: wkt
            });
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
        var trKeywords = [
            'tata ruang', 'rtrw', 'rdtr', 'kesesuaian kegiatan', 'izin lokasi',
            'pelanggaran pemanfaatan ruang', 'lahan sawah yang dilindungi', 'lahan baku sawah'
        ];
        var isTr = trKeywords.some(function(kw) { return n.indexOf(kw) !== -1; });
        return !isTr;
    },

    getIgtBasisFisik: function(nama) {
        if (!nama) return 'bidang';
        var n = String(nama).toLowerCase().trim();
        var kawasanKeywords = [
            'unsur dasar pertanahan', 'zona nilai tanah', 'lokasi pengembangan pertanahan',
            'lahan baku sawah', 'kemampuan tanah', 'neraca penatagunaan tanah',
            'pesisir', 'sebaran tanah objek reforma agraria',
            'analisa tanah objek reforma agraria', 'potensi objek redistribusi tanah',
            'wp3wt', 'tanah timbul', 'lahan sawah yang dilindungi', 'lahan sawah dilindungi',
            'kawasan terindikasi telantar', 'kawasan terindikasi terlantar',
            'tanah kritis',
            'tata ruang', 'rtrw', 'rdtr', 'kesesuaian kegiatan', 'izin lokasi'
        ];
        var isKaw = kawasanKeywords.some(function(kw) { return n.indexOf(kw) !== -1; });
        return isKaw ? 'kawasan' : 'bidang';
    },

    // Filter bulan Leader Board (kumulatif s.d. bulan terpilih), diset dari UI
    leaderBoardBulan: 'all',
    getLeaderBoardBulanFactor: function() {
        var b = parseInt(this.leaderBoardBulan, 10);
        if (!b || b >= 12) return 1.0;
        return Math.round((0.25 + 0.75 * (b / 12)) * 100) / 100;
    },

    getRenaksiDetailIgtData: function(tahunFilter, jenisIgtFilter) {
        var t = (tahunFilter && tahunFilter !== 'all') ? String(tahunFilter) : 'all';
        var factor = t === '2026' || t === 'all' ? 1.0 : (t === '2025' ? 0.78 : (t === '2024' ? 0.52 : 0.30));
        var bulanFactor = this.getLeaderBoardBulanFactor();

        // 43 Official IGT from Examples/IGT.xlsx mapped to 19 Direktorat + Regional Satkers
        var rawIgtList = [
            // 1. Direktorat Perencanaan Tata Ruang (4 IGT)
            { orderIndex: 1, satker: 'Direktorat Perencanaan Tata Ruang', igt: 'IGT Rencana Tata Ruang Wilayah Nasional (RTRWN)', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 1200, realisasiBase: 1080 },
            { orderIndex: 2, satker: 'Direktorat Perencanaan Tata Ruang', igt: 'IGT Rencana Tata Ruang Pulau/Kepulauan', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 2500, realisasiBase: 2150 },
            { orderIndex: 3, satker: 'Direktorat Perencanaan Tata Ruang', igt: 'IGT Rencana Tata Ruang Kawasan Strategis Nasional', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 4000, realisasiBase: 3440 },
            { orderIndex: 4, satker: 'Direktorat Perencanaan Tata Ruang', igt: 'IGT Rencana Detail Tata Ruang Kawasan Perbatasan Negara', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 1500, realisasiBase: 1200 },

            // 2. Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I (4 IGT)
            { orderIndex: 5, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', igt: 'IGT Rencana Tata Ruang Wilayah (RTRW) Provinsi', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 8000, realisasiBase: 6560 },
            { orderIndex: 6, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', igt: 'IGT Rencana Tata Ruang Wilayah (RTRW) Kabupaten', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 12000, realisasiBase: 9840 },
            { orderIndex: 7, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', igt: 'IGT Rencana Tata Ruang Wilayah (RTRW) Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 5000, realisasiBase: 4250 },
            { orderIndex: 8, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 6000, realisasiBase: 4800 },

            // 3. Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II (4 IGT)
            { orderIndex: 9, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', igt: 'IGT Rencana Tata Ruang Wilayah (RTRW) Provinsi', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 7500, realisasiBase: 5850 },
            { orderIndex: 10, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', igt: 'IGT Rencana Tata Ruang Wilayah (RTRW) Kabupaten', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 11000, realisasiBase: 8580 },
            { orderIndex: 11, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', igt: 'IGT Rencana Tata Ruang Wilayah (RTRW) Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 4500, realisasiBase: 3690 },
            { orderIndex: 12, satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 5500, realisasiBase: 4180 },

            // 4. Direktorat Sinkronisasi Pemanfaatan Ruang (1 IGT)
            { orderIndex: 13, satker: 'Direktorat Sinkronisasi Pemanfaatan Ruang', igt: 'IGT Izin Lokasi dan IGT Kesesuaian Kegiatan Pemanfaatan Ruang', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 3000, realisasiBase: 2490 },

            // 5. Direktorat Pengukuran dan Pemetaan Kadastral (1 IGT)
            { orderIndex: 14, satker: 'Direktorat Pengukuran dan Pemetaan Kadastral', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 50000, realisasiBase: 47000 },

            // 6. Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang (1 IGT)
            { orderIndex: 15, satker: 'Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang', igt: 'IGT Unsur Dasar Pertanahan', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 10000, realisasiBase: 9200 },

            // 7. Direktorat Survei Dan Pemetaan Tematik (4 IGT)
            { orderIndex: 16, satker: 'Direktorat Survei Dan Pemetaan Tematik', igt: 'IGT Penggunaan Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 28500 },
            { orderIndex: 17, satker: 'Direktorat Survei Dan Pemetaan Tematik', igt: 'IGT Pemilikan Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 27900 },
            { orderIndex: 18, satker: 'Direktorat Survei Dan Pemetaan Tematik', igt: 'IGT Penguasaan Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 27600 },
            { orderIndex: 19, satker: 'Direktorat Survei Dan Pemetaan Tematik', igt: 'IGT Pemanfaatan Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 27000 },

            // 8. Sekretariat Direktorat Jenderal Penetapan Hak dan Pendaftaran Tanah (1 IGT)
            { orderIndex: 20, satker: 'Sekretariat Direktorat Jenderal Penetapan Hak dan Pendaftaran Tanah', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 15000, realisasiBase: 14550 },

            // 9. Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal (1 IGT)
            { orderIndex: 21, satker: 'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal', igt: 'IGT Hak Ulayat', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 8000, realisasiBase: 7200 },

            // 10. Direktorat Landreform (3 IGT)
            { orderIndex: 22, satker: 'Direktorat Landreform', igt: 'IGT Sebaran Tanah Objek Reforma Agraria', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 18000, realisasiBase: 14940 },
            { orderIndex: 23, satker: 'Direktorat Landreform', igt: 'IGT Analisa Tanah Objek Reforma Agraria', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 15000, realisasiBase: 12150 },
            { orderIndex: 24, satker: 'Direktorat Landreform', igt: 'IGT Potensi Objek Redistribusi Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 12000, realisasiBase: 9360 },

            // 11. Direktorat Pemberdayaan Tanah Masyarakat (1 IGT)
            { orderIndex: 25, satker: 'Direktorat Pemberdayaan Tanah Masyarakat', igt: 'IGT Sebaran Lokasi Pemberdayaan Tanah Masyarakat', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 20000, realisasiBase: 17200 },

            // 12. Direktorat Penatagunaan Tanah (7 IGT)
            { orderIndex: 26, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Lahan Baku Sawah Nasional', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 12000, realisasiBase: 10200 },
            { orderIndex: 27, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Neraca Penatagunaan Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 8000, realisasiBase: 6560 },
            { orderIndex: 28, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Pertimbangan Teknis Pertanahan', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 15000, realisasiBase: 12750 },
            { orderIndex: 29, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Kemampuan Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 10000, realisasiBase: 8100 },
            { orderIndex: 30, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Potensi Wilayah Pesisir, Pulau-pulau Kecil, Perbatasan, dan Wilayah Tertentu', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 5000, realisasiBase: 4050 },
            { orderIndex: 31, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Inventarisasi Tanah Kritis', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 15000, realisasiBase: 12000 },
            { orderIndex: 32, satker: 'Direktorat Penatagunaan Tanah', igt: 'IGT Sebaran Tanah Timbul', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 6000, realisasiBase: 4680 },

            // 13. Direktorat Bina Pengadaan Dan Pencadangan Tanah (1 IGT)
            { orderIndex: 33, satker: 'Direktorat Bina Pengadaan Dan Pencadangan Tanah', igt: 'IGT Penetapan Lokasi Pengadaan Tanah bagi Kepentingan Umum', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 12000, realisasiBase: 9840 },

            // 14. Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan (3 IGT)
            { orderIndex: 34, satker: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', igt: 'IGT Potensi Subjek Objek Konsolidasi Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 25000, realisasiBase: 21750 },
            { orderIndex: 35, satker: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', igt: 'IGT Desain Konsolidasi Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 20000, realisasiBase: 17400 },
            { orderIndex: 36, satker: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', igt: 'IGT Lokasi Pengembangan Pertanahan', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 14000, realisasiBase: 11900 },

            // 15. Direktorat Penilaian Tanah dan Ekonomi Pertanahan (2 IGT)
            { orderIndex: 37, satker: 'Direktorat Penilaian Tanah dan Ekonomi Pertanahan', igt: 'IGT Zona Nilai Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 6000, realisasiBase: 5400 },
            { orderIndex: 38, satker: 'Direktorat Penilaian Tanah dan Ekonomi Pertanahan', igt: 'IGT Nilai Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 27000 },

            // 16. Direktorat Penertiban Pemanfaatan Ruang (1 IGT)
            { orderIndex: 39, satker: 'Direktorat Penertiban Pemanfaatan Ruang', igt: 'IGT Indikasi Pelanggaran Pemanfaatan Ruang', jenisIgt: 'Tata Ruang', satuan: 'Bidang', targetBase: 15000, realisasiBase: 11250 },

            // 17. Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu (1 IGT)
            { orderIndex: 40, satker: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu', igt: 'IGT Lahan Sawah yang Dilindungi', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 25000, realisasiBase: 19000 },

            // 18. Direktur Penertiban Penguasaan, Pemilikan dan Penggunaan Tanah (2 IGT)
            { orderIndex: 41, satker: 'Direktur Penertiban Penguasaan, Pemilikan dan Penggunaan Tanah', igt: 'IGT Tanah Terindikasi Telantar', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 25000, realisasiBase: 19000 },
            { orderIndex: 42, satker: 'Direktur Penertiban Penguasaan, Pemilikan dan Penggunaan Tanah', igt: 'IGT Kawasan Terindikasi Telantar', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 10000, realisasiBase: 7500 },

            // 19. Sekretariat Direktorat Jenderal Penanganan Sengketa dan Konflik Pertanahan (1 IGT)
            { orderIndex: 43, satker: 'Sekretariat Direktorat Jenderal Penanganan Sengketa dan Konflik Pertanahan', igt: 'IGT Informasi mengenai Sengketa, Konflik, dan Perkara Pertanahan', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 25000, realisasiBase: 24000 },

            // Unit Lingkup Ditjen SPPR (Tambahan untuk role SPPR)
            { orderIndex: 44, satker: 'Sekretariat Direktorat Jenderal SPPR', igt: 'IGT Batas Wilayah Administrasi', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 20000, realisasiBase: 18600 },
            { orderIndex: 45, satker: 'Sekretariat Direktorat Jenderal SPPR', igt: 'IGT Kerangka Kontrol Geodesi', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 15000, realisasiBase: 13650 },
            { orderIndex: 46, satker: 'Balai Pemetaan dan Survei Tematik SPPR', igt: 'IGT Peta Tutupan Lahan', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 10000, realisasiBase: 8800 },
            { orderIndex: 47, satker: 'Balai Pemetaan dan Survei Tematik SPPR', igt: 'IGT Peta Morfologi Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 8000, realisasiBase: 6880 },

            // Kantah-Kantah se-DIY (Khusus Role Kantah Gunungkidul dapat melihat Kantah se-DIY)
            { orderIndex: 48, satker: 'Kantah Kota Yogyakarta', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 20000, realisasiBase: 19400 },
            { orderIndex: 49, satker: 'Kantah Kota Yogyakarta', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 18000, realisasiBase: 17100 },
            { orderIndex: 50, satker: 'Kantah Kota Yogyakarta', igt: 'IGT Nilai Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 12000, realisasiBase: 11160 },

            { orderIndex: 51, satker: 'Kantah Kab. Sleman', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 45000, realisasiBase: 43200 },
            { orderIndex: 52, satker: 'Kantah Kab. Sleman', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 35000, realisasiBase: 33250 },
            { orderIndex: 53, satker: 'Kantah Kab. Sleman', igt: 'IGT Pertimbangan Teknis Pertanahan', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 8000, realisasiBase: 7440 },
            { orderIndex: 54, satker: 'Kantah Kab. Sleman', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 4000, realisasiBase: 3680 },

            { orderIndex: 55, satker: 'Kantah Kab. Bantul', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 40000, realisasiBase: 37600 },
            { orderIndex: 56, satker: 'Kantah Kab. Bantul', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 28000, realisasiBase: 25760 },
            { orderIndex: 57, satker: 'Kantah Kab. Bantul', igt: 'IGT Lahan Baku Sawah', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 6000, realisasiBase: 5400 },
            { orderIndex: 58, satker: 'Kantah Kab. Bantul', igt: 'IGT Zona Nilai Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 5000, realisasiBase: 4400 },

            { orderIndex: 59, satker: 'Kantah Kab. Gunungkidul', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 35000, realisasiBase: 32900 },
            { orderIndex: 60, satker: 'Kantah Kab. Gunungkidul', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 25000, realisasiBase: 23500 },
            { orderIndex: 61, satker: 'Kantah Kab. Gunungkidul', igt: 'IGT Zona Nilai Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 4500, realisasiBase: 4050 },
            { orderIndex: 62, satker: 'Kantah Kab. Gunungkidul', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 3500, realisasiBase: 2975 },

            { orderIndex: 63, satker: 'Kantah Kab. Kulon Progo', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 27600 },
            { orderIndex: 64, satker: 'Kantah Kab. Kulon Progo', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 22000, realisasiBase: 19800 },
            { orderIndex: 65, satker: 'Kantah Kab. Kulon Progo', igt: 'IGT Konsolidasi Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 5000, realisasiBase: 4400 },
            { orderIndex: 66, satker: 'Kantah Kab. Kulon Progo', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 4500, realisasiBase: 3825 },

            // Kanwil-Kanwil se-Indonesia (Khusus Role Kanwil DIY dapat melihat Kanwil se-Indonesia)
            { orderIndex: 67, satker: 'Kanwil BPN Provinsi Bali', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 50000, realisasiBase: 49000 },
            { orderIndex: 68, satker: 'Kanwil BPN Provinsi Bali', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 35000, realisasiBase: 33600 },
            { orderIndex: 69, satker: 'Kanwil BPN Provinsi Bali', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 5000, realisasiBase: 4700 },

            { orderIndex: 70, satker: 'Kanwil BPN Provinsi D.I. Yogyakarta', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 60000, realisasiBase: 56400 },
            { orderIndex: 71, satker: 'Kanwil BPN Provinsi D.I. Yogyakarta', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 40000, realisasiBase: 37600 },
            { orderIndex: 72, satker: 'Kanwil BPN Provinsi D.I. Yogyakarta', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 5000, realisasiBase: 4500 },

            { orderIndex: 73, satker: 'Kanwil BPN Provinsi DKI Jakarta', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 55000, realisasiBase: 52250 },
            { orderIndex: 74, satker: 'Kanwil BPN Provinsi DKI Jakarta', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 45000, realisasiBase: 42300 },
            { orderIndex: 75, satker: 'Kanwil BPN Provinsi DKI Jakarta', igt: 'IGT Zona Nilai Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 6000, realisasiBase: 5460 },

            { orderIndex: 76, satker: 'Kanwil BPN Provinsi Kalimantan Timur', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 40000, realisasiBase: 36800 },
            { orderIndex: 77, satker: 'Kanwil BPN Provinsi Kalimantan Timur', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 27000 },
            { orderIndex: 78, satker: 'Kanwil BPN Provinsi Kalimantan Timur', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 8000, realisasiBase: 7360 },

            { orderIndex: 79, satker: 'Kanwil BPN Provinsi Jawa Timur', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 90000, realisasiBase: 83700 },
            { orderIndex: 80, satker: 'Kanwil BPN Provinsi Jawa Timur', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 65000, realisasiBase: 59150 },
            { orderIndex: 81, satker: 'Kanwil BPN Provinsi Jawa Timur', igt: 'IGT RTRW Provinsi', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 10000, realisasiBase: 8900 },

            { orderIndex: 82, satker: 'Kanwil BPN Provinsi Jawa Tengah', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 85000, realisasiBase: 78200 },
            { orderIndex: 83, satker: 'Kanwil BPN Provinsi Jawa Tengah', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 60000, realisasiBase: 54000 },
            { orderIndex: 84, satker: 'Kanwil BPN Provinsi Jawa Tengah', igt: 'IGT Lahan Baku Sawah', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 9000, realisasiBase: 7920 },

            { orderIndex: 85, satker: 'Kanwil BPN Provinsi Jawa Barat', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 95000, realisasiBase: 86450 },
            { orderIndex: 86, satker: 'Kanwil BPN Provinsi Jawa Barat', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 70000, realisasiBase: 62300 },
            { orderIndex: 87, satker: 'Kanwil BPN Provinsi Jawa Barat', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 11000, realisasiBase: 9570 },

            { orderIndex: 88, satker: 'Kanwil BPN Provinsi Banten', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 45000, realisasiBase: 40500 },
            { orderIndex: 89, satker: 'Kanwil BPN Provinsi Banten', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 32000, realisasiBase: 28160 },
            { orderIndex: 90, satker: 'Kanwil BPN Provinsi Banten', igt: 'IGT Zona Nilai Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 5000, realisasiBase: 4300 },

            { orderIndex: 91, satker: 'Kanwil BPN Provinsi Sumatera Utara', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 50000, realisasiBase: 44500 },
            { orderIndex: 92, satker: 'Kanwil BPN Provinsi Sumatera Utara', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 35000, realisasiBase: 30450 },
            { orderIndex: 93, satker: 'Kanwil BPN Provinsi Sumatera Utara', igt: 'IGT RTRW Provinsi', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 8000, realisasiBase: 6800 },

            { orderIndex: 94, satker: 'Kanwil BPN Provinsi Sulawesi Selatan', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 40000, realisasiBase: 35200 },
            { orderIndex: 95, satker: 'Kanwil BPN Provinsi Sulawesi Selatan', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 28000, realisasiBase: 24080 },
            { orderIndex: 96, satker: 'Kanwil BPN Provinsi Sulawesi Selatan', igt: 'IGT Pertimbangan Teknis Pertanahan', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 5000, realisasiBase: 4200 },

            { orderIndex: 97, satker: 'Kanwil BPN Provinsi Sumatera Barat', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 35000, realisasiBase: 30450 },
            { orderIndex: 98, satker: 'Kanwil BPN Provinsi Sumatera Barat', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 25000, realisasiBase: 21250 },
            { orderIndex: 99, satker: 'Kanwil BPN Provinsi Sumatera Barat', igt: 'IGT Hak Ulayat', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 6000, realisasiBase: 5160 },

            { orderIndex: 100, satker: 'Kanwil BPN Provinsi Nusa Tenggara Barat', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 25800 },
            { orderIndex: 101, satker: 'Kanwil BPN Provinsi Nusa Tenggara Barat', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 22000, realisasiBase: 18480 },
            { orderIndex: 102, satker: 'Kanwil BPN Provinsi Nusa Tenggara Barat', igt: 'IGT RDTR Kabupaten/Kota', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 4000, realisasiBase: 3400 },

            { orderIndex: 103, satker: 'Kanwil BPN Provinsi Riau', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 38000, realisasiBase: 32300 },
            { orderIndex: 104, satker: 'Kanwil BPN Provinsi Riau', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 26000, realisasiBase: 21580 },
            { orderIndex: 105, satker: 'Kanwil BPN Provinsi Riau', igt: 'IGT Penggunaan Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 8000, realisasiBase: 6720 },

            { orderIndex: 106, satker: 'Kanwil BPN Provinsi Kalimantan Barat', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 32000, realisasiBase: 26880 },
            { orderIndex: 107, satker: 'Kanwil BPN Provinsi Kalimantan Barat', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 22000, realisasiBase: 18040 },
            { orderIndex: 108, satker: 'Kanwil BPN Provinsi Kalimantan Barat', igt: 'IGT RDTR Kawasan Perbatasan Negara', jenisIgt: 'Tata Ruang', satuan: 'Ha', targetBase: 3000, realisasiBase: 2490 },

            { orderIndex: 109, satker: 'Kanwil BPN Provinsi Nusa Tenggara Timur', igt: 'IGT Bidang Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 30000, realisasiBase: 24900 },
            { orderIndex: 110, satker: 'Kanwil BPN Provinsi Nusa Tenggara Timur', igt: 'IGT Hak Atas Tanah', jenisIgt: 'Pertanahan', satuan: 'Bidang', targetBase: 20000, realisasiBase: 16200 },
            { orderIndex: 111, satker: 'Kanwil BPN Provinsi Nusa Tenggara Timur', igt: 'IGT Potensi Objek Redistribusi Tanah', jenisIgt: 'Pertanahan', satuan: 'Ha', targetBase: 5000, realisasiBase: 4100 }
        ];

        if (jenisIgtFilter === 'pertanahan') {
            rawIgtList = rawIgtList.filter(function(it) { return it.jenisIgt === 'Pertanahan'; });
        } else if (jenisIgtFilter === 'tataruang') {
            rawIgtList = rawIgtList.filter(function(it) { return it.jenisIgt === 'Tata Ruang'; });
        }

        return rawIgtList.map(function(item) {
            var tgt = Math.max(1, Math.round(item.targetBase * factor));
            var real = Math.max(1, Math.round(item.realisasiBase * factor * bulanFactor));
            var pct = Math.min(100, Math.round((real / tgt) * 10000) / 100);
            return {
                orderIndex: item.orderIndex,
                satker: item.satker,
                direktorat: item.satker,
                igt: item.igt,
                jenisIgt: item.jenisIgt,
                satuan: item.satuan,
                target: tgt,
                realisasi: real,
                persentase: pct,
                persenStr: pct.toFixed(2) + '%',
                targetStr: tgt.toLocaleString('id-ID') + ' ' + item.satuan,
                realisasiStr: real.toLocaleString('id-ID') + ' ' + item.satuan,
                tahun: t
            };
        });
    },

    getLeaderBoardData: function(kategori, tahunFilter, arg3, arg4) {
        var kat = kategori || 'capaian-renaksi';
        var t = (tahunFilter && tahunFilter !== 'all') ? String(tahunFilter) : 'all';
        var factor = t === '2026' || t === 'all' ? 1.0 : (t === '2025' ? 0.78 : (t === '2024' ? 0.52 : 0.30));
        factor *= this.getLeaderBoardBulanFactor();

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

        if (kat === 'capaian-renaksi-detail') {
            return self.getRenaksiDetailIgtData(t, jenisIgtFilter);
        }

        var satkerIgtMap = {
            'Direktorat Perencanaan Tata Ruang': [
                'IGT Rencana Tata Ruang Wilayah Nasional (RTRWN)',
                'IGT Rencana Tata Ruang Pulau/Kepulauan',
                'IGT Rencana Tata Ruang Kawasan Strategis Nasional',
                'IGT Rencana Detail Tata Ruang Kawasan Perbatasan Negara'
            ],
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I': [
                'IGT Rencana Tata Ruang Wilayah (RTRW) Provinsi',
                'IGT Rencana Tata Ruang Wilayah (RTRW) Kabupaten',
                'IGT Rencana Tata Ruang Wilayah (RTRW) Kota',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II': [
                'IGT Rencana Tata Ruang Wilayah (RTRW) Provinsi',
                'IGT Rencana Tata Ruang Wilayah (RTRW) Kabupaten',
                'IGT Rencana Tata Ruang Wilayah (RTRW) Kota',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Direktorat Sinkronisasi Pemanfaatan Ruang': [
                'IGT Izin Lokasi dan IGT Kesesuaian Kegiatan Pemanfaatan Ruang'
            ],
            'Direktorat Pengukuran dan Pemetaan Kadastral': [
                'IGT Bidang Tanah'
            ],
            'Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang': [
                'IGT Unsur Dasar Pertanahan'
            ],
            'Direktorat Survei Dan Pemetaan Tematik': [
                'IGT Penggunaan Tanah',
                'IGT Pemilikan Tanah',
                'IGT Penguasaan Tanah',
                'IGT Pemanfaatan Tanah'
            ],
            'Sekretariat Direktorat Jenderal Penetapan Hak dan Pendaftaran Tanah': [
                'IGT Hak Atas Tanah'
            ],
            'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal': [
                'IGT Hak Ulayat'
            ],
            'Direktorat Landreform': [
                'IGT Sebaran Tanah Objek Reforma Agraria',
                'IGT Analisa Tanah Objek Reforma Agraria',
                'IGT Potensi Objek Redistribusi Tanah'
            ],
            'Direktorat Pemberdayaan Tanah Masyarakat': [
                'IGT Sebaran Lokasi Pemberdayaan Tanah Masyarakat'
            ],
            'Direktorat Penatagunaan Tanah': [
                'IGT Lahan Baku Sawah Nasional',
                'IGT Neraca Penatagunaan Tanah',
                'IGT Pertimbangan Teknis Pertanahan',
                'IGT Kemampuan Tanah',
                'IGT Potensi Wilayah Pesisir, Pulau-pulau Kecil, Perbatasan, dan Wilayah Tertentu',
                'IGT Inventarisasi Tanah Kritis',
                'IGT Sebaran Tanah Timbul'
            ],
            'Direktorat Bina Pengadaan Dan Pencadangan Tanah': [
                'IGT Penetapan Lokasi Pengadaan Tanah bagi Kepentingan Umum'
            ],
            'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan': [
                'IGT Potensi Subjek Objek Konsolidasi Tanah',
                'IGT Desain Konsolidasi Tanah',
                'IGT Lokasi Pengembangan Pertanahan'
            ],
            'Direktorat Penilaian Tanah dan Ekonomi Pertanahan': [
                'IGT Zona Nilai Tanah',
                'IGT Nilai Bidang Tanah'
            ],
            'Direktorat Penertiban Pemanfaatan Ruang': [
                'IGT Indikasi Pelanggaran Pemanfaatan Ruang'
            ],
            'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu': [
                'IGT Lahan Sawah yang Dilindungi'
            ],
            'Direktur Penertiban Penguasaan, Pemilikan dan Penggunaan Tanah': [
                'IGT Tanah Terindikasi Telantar',
                'IGT Kawasan Terindikasi Telantar'
            ],
            'Sekretariat Direktorat Jenderal Penanganan Sengketa dan Konflik Pertanahan': [
                'IGT Informasi mengenai Sengketa, Konflik, dan Perkara Pertanahan'
            ],
            'Sekretariat Direktorat Jenderal SPPR': [
                'IGT Batas Wilayah Administrasi',
                'IGT Kerangka Kontrol Geodesi'
            ],
            'Balai Pemetaan dan Survei Tematik SPPR': [
                'IGT Peta Tutupan Lahan',
                'IGT Peta Morfologi Tanah'
            ],
            'Kanwil BPN Provinsi Bali': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kanwil BPN Provinsi D.I. Yogyakarta': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kanwil BPN Provinsi DKI Jakarta': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Zona Nilai Tanah'
            ],
            'Kanwil BPN Provinsi Kalimantan Timur': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kanwil BPN Provinsi Jawa Timur': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RTRW Provinsi'
            ],
            'Kanwil BPN Provinsi Jawa Tengah': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Lahan Baku Sawah'
            ],
            'Kanwil BPN Provinsi Jawa Barat': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kanwil BPN Provinsi Banten': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Zona Nilai Tanah'
            ],
            'Kanwil BPN Provinsi Sumatera Utara': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RTRW Provinsi'
            ],
            'Kanwil BPN Provinsi Sulawesi Selatan': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Pertimbangan Teknis Pertanahan'
            ],
            'Kanwil BPN Provinsi Sumatera Barat': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Hak Ulayat'
            ],
            'Kanwil BPN Provinsi Nusa Tenggara Barat': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kanwil BPN Provinsi Riau': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Penggunaan Tanah'
            ],
            'Kanwil BPN Provinsi Kalimantan Barat': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT RDTR Kawasan Perbatasan Negara'
            ],
            'Kanwil BPN Provinsi Nusa Tenggara Timur': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Potensi Objek Redistribusi Tanah'
            ],
            'Kantah Kota Yogyakarta': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Nilai Bidang Tanah'
            ],
            'Kantah Kab. Sleman': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Pertimbangan Teknis Pertanahan',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kantah Kab. Bantul': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Lahan Baku Sawah',
                'IGT Zona Nilai Tanah'
            ],
            'Kantah Kab. Gunungkidul': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Zona Nilai Tanah',
                'IGT RDTR Kabupaten/Kota'
            ],
            'Kantah Kab. Kulon Progo': [
                'IGT Bidang Tanah',
                'IGT Hak Atas Tanah',
                'IGT Konsolidasi Tanah',
                'IGT RDTR Kabupaten/Kota'
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
                // Ditjen SPPR Units
                { satker: 'Direktorat Survei Dan Pemetaan Tematik', tipe: 'Pusat', jumlahLogin: Math.round(3150 * factor) },
                { satker: 'Direktorat Pengukuran dan Pemetaan Kadastral', tipe: 'Pusat', jumlahLogin: Math.round(2980 * factor) },
                { satker: 'Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang', tipe: 'Pusat', jumlahLogin: Math.round(2780 * factor) },
                { satker: 'Direktorat Penilaian Tanah dan Ekonomi Pertanahan', tipe: 'Pusat', jumlahLogin: Math.round(2420 * factor) },
                { satker: 'Balai Pemetaan dan Survei Tematik SPPR', tipe: 'Pusat', jumlahLogin: Math.round(2180 * factor) },
                { satker: 'Sekretariat Direktorat Jenderal SPPR', tipe: 'Pusat', jumlahLogin: Math.round(1940 * factor) },

                // Kanwil-Kanwil se-Indonesia (15 Kanwil)
                { satker: 'Kanwil BPN Provinsi Bali', tipe: 'Kanwil', jumlahLogin: Math.round(2820 * factor) },
                { satker: 'Kanwil BPN Provinsi D.I. Yogyakarta', tipe: 'Kanwil', jumlahLogin: Math.round(2740 * factor) },
                { satker: 'Kanwil BPN Provinsi Jawa Barat', tipe: 'Kanwil', jumlahLogin: Math.round(2650 * factor) },
                { satker: 'Kanwil BPN Provinsi Jawa Timur', tipe: 'Kanwil', jumlahLogin: Math.round(2520 * factor) },
                { satker: 'Kanwil BPN Provinsi Jawa Tengah', tipe: 'Kanwil', jumlahLogin: Math.round(2410 * factor) },
                { satker: 'Kanwil BPN Provinsi DKI Jakarta', tipe: 'Kanwil', jumlahLogin: Math.round(2330 * factor) },
                { satker: 'Kanwil BPN Provinsi Kalimantan Timur', tipe: 'Kanwil', jumlahLogin: Math.round(2150 * factor) },
                { satker: 'Kanwil BPN Provinsi Banten', tipe: 'Kanwil', jumlahLogin: Math.round(2010 * factor) },
                { satker: 'Kanwil BPN Provinsi Sumatera Utara', tipe: 'Kanwil', jumlahLogin: Math.round(1890 * factor) },
                { satker: 'Kanwil BPN Provinsi Sulawesi Selatan', tipe: 'Kanwil', jumlahLogin: Math.round(1760 * factor) },
                { satker: 'Kanwil BPN Provinsi Sumatera Barat', tipe: 'Kanwil', jumlahLogin: Math.round(1640 * factor) },
                { satker: 'Kanwil BPN Provinsi Nusa Tenggara Barat', tipe: 'Kanwil', jumlahLogin: Math.round(1530 * factor) },
                { satker: 'Kanwil BPN Provinsi Riau', tipe: 'Kanwil', jumlahLogin: Math.round(1420 * factor) },
                { satker: 'Kanwil BPN Provinsi Kalimantan Barat', tipe: 'Kanwil', jumlahLogin: Math.round(1350 * factor) },
                { satker: 'Kanwil BPN Provinsi Nusa Tenggara Timur', tipe: 'Kanwil', jumlahLogin: Math.round(1220 * factor) },

                // Kantah-Kantah se-DIY (5 Kantah)
                { satker: 'Kantah Kab. Sleman', tipe: 'Kantah', jumlahLogin: Math.round(2480 * factor) },
                { satker: 'Kantah Kota Yogyakarta', tipe: 'Kantah', jumlahLogin: Math.round(2290 * factor) },
                { satker: 'Kantah Kab. Bantul', tipe: 'Kantah', jumlahLogin: Math.round(2140 * factor) },
                { satker: 'Kantah Kab. Gunungkidul', tipe: 'Kantah', jumlahLogin: Math.round(2050 * factor) },
                { satker: 'Kantah Kab. Kulon Progo', tipe: 'Kantah', jumlahLogin: Math.round(1930 * factor) },

                // Unit Pusat & Kantah Lainnya
                { satker: 'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I', tipe: 'Pusat', jumlahLogin: Math.round(1950 * factor) },
                { satker: 'Kantah Kab. Bogor', tipe: 'Kantah', jumlahLogin: Math.round(1880 * factor) },
                { satker: 'Kantah Kota Surabaya I', tipe: 'Kantah', jumlahLogin: Math.round(1680 * factor) },
                { satker: 'Direktorat Penetapan Hak Atas Tanah dan Ruang', tipe: 'Pusat', jumlahLogin: Math.round(1540 * factor) },
                { satker: 'Kantah Kota Jakarta Barat', tipe: 'Kantah', jumlahLogin: Math.round(1180 * factor) },
                { satker: 'Kantah Kab. Badung', tipe: 'Kantah', jumlahLogin: Math.round(1050 * factor) },
                { satker: 'Direktorat Penatagunaan Tanah', tipe: 'Pusat', jumlahLogin: Math.round(942 * factor) },
                { satker: 'Kantah Kab. Bandung', tipe: 'Kantah', jumlahLogin: Math.round(790 * factor) },
                { satker: 'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan', tipe: 'Pusat', jumlahLogin: Math.round(735 * factor) },
                { satker: 'Kantah Kota Semarang', tipe: 'Kantah', jumlahLogin: Math.round(660 * factor) },
                { satker: 'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu', tipe: 'Pusat', jumlahLogin: Math.round(590 * factor) },
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
            // Kategori 1: Capaian Renaksi oleh Satker/Direktorat (Aggregated Top Leaderboard)
            // Sesuai 19 Direktorat Resmi Pengelola 43 IGT Kementerian ATR/BPN (dari sheet Examples/IGT.xlsx)
            var detailItems = self.getRenaksiDetailIgtData(t, jenisIgtFilter);

            var satkerMap = {};
            var satkerOrder = [];

            detailItems.forEach(function(d) {
                if (!satkerMap[d.satker]) {
                    satkerMap[d.satker] = {
                        satker: d.satker,
                        daftarIgt: [],
                        targetBidang: 0,
                        realisasiBidang: 0,
                        countBidang: 0,
                        targetKawasan: 0,
                        realisasiKawasan: 0,
                        countKawasan: 0
                    };
                    satkerOrder.push(d.satker);
                }
                var entry = satkerMap[d.satker];
                entry.daftarIgt.push(d.igt);
                if (d.satuan === 'Bidang') {
                    entry.targetBidang += d.target;
                    entry.realisasiBidang += d.realisasi;
                    entry.countBidang++;
                } else {
                    entry.targetKawasan += d.target;
                    entry.realisasiKawasan += d.realisasi;
                    entry.countKawasan++;
                }
            });

            var items = satkerOrder.map(function(sKey) {
                var item = satkerMap[sKey];
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
            'Direktorat Perencanaan Tata Ruang',
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I',
            'Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II',
            'Direktorat Sinkronisasi Pemanfaatan Ruang',
            'Direktorat Pengukuran dan Pemetaan Kadastral',
            'Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang',
            'Direktorat Survei Dan Pemetaan Tematik',
            'Sekretariat Direktorat Jenderal Penetapan Hak dan Pendaftaran Tanah',
            'Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal',
            'Direktorat Landreform',
            'Direktorat Pemberdayaan Tanah Masyarakat',
            'Direktorat Penatagunaan Tanah',
            'Direktorat Bina Pengadaan Dan Pencadangan Tanah',
            'Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan',
            'Direktorat Penilaian Tanah dan Ekonomi Pertanahan',
            'Direktorat Penertiban Pemanfaatan Ruang',
            'Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu',
            'Direktur Penertiban Penguasaan, Pemilikan dan Penggunaan Tanah',
            'Sekretariat Direktorat Jenderal Penanganan Sengketa dan Konflik Pertanahan',
            'Kanwil BPN Provinsi D.I. Yogyakarta',
            'Kantah Kab. Gunungkidul'
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
