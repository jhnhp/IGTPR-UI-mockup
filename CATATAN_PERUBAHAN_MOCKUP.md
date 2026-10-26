# Catatan Perubahan Mockup Geoportal IGT-PR (Dashboard)

Dokumen ini mencatat seluruh pembaruan, perbaikan fungsional, integrasi data spasial, dan penyelarasan antarmuka pengguna (UI) yang telah diimplementasikan pada repositori **IGTPR-UI-mockup**.

---

## 📋 Ringkasan Pembaruan Utama

| No | Modul / Komponen | Sebelum Perbaikan | Sesudah Perbaikan |
|---|---|---|---|
| 1 | **Hirarki Peta & Drill-down** | Berhenti di tingkat provinsi saja saat diklik. | **Multi-level interaktif**: Nasional (38 Provinsi) $\rightarrow$ Klik Provinsi (muncul Kabupaten/Kota) $\rightarrow$ Klik Kabupaten (fokus data kabupaten spesifik). Dilengkapi tombol navigasi kembali & breadcrumb. |
| 2 | **Data Spasial & Topologi** | Data shapefile mentah berukuran sangat berat (~817 MB) atau GeoJSON tidak edge-matched. | Dihasilkan **GeoJSON ringan** (< 4 MB) dari SHP asli menggunakan Python (`shapely` & `GDAL/OGR`). Batas antarkabupaten disnap secara topologis (**Zero Gap & Zero Overlap**), dan batas provinsi di-dissolve langsung dari batas kabupaten penyusunnya. Mendukung seluruh 38 provinsi dan 520 kabupaten/kota di Indonesia. |
| 3 | **Framing & Responsivitas Peta** | Wilayah selatan (Jawa, Bali, Nusa Tenggara) terpotong/tertutup saat kartu detail informasi terbuka. | Framing bounds dinamis (`getFitBoundsPaddingDetailSeIndonesia()`) dengan pergeseran ke sisi kanan saat kartu detail terbuka, memastikan seluruh kepulauan Indonesia tampak proporsional. |
| 4 | **Kartu Detail Informasi** | Hanya muncul setelah mengklik wilayah tertentu; tidak bisa dibuka kembali jika ditutup. | Terbuka secara default di tingkat **Seluruh Indonesia** (14 tema). Ditambahkan tombol toggle **"Detail Informasi"** pada hero toolbar untuk membuka kembali kartu kapan saja. |
| 5 | **Dropdown Pemilihan Wilayah** | Dropdown bertuliskan "Pilih IGT" yang statis. | Diubah menjadi **dropdown pemilihan wilayah dinamis**: menampilkan *"Pilih Provinsi"* saat di level nasional, dan otomatis berganti menjadi *"Pilih Kabupaten"* saat di level provinsi/kabupaten. |
| 6 | **Klasifikasi Jenis IGT** | Menggunakan istilah lama "Bidang" & "Kawasan". | Diperbarui sesuai standar dokumen **39 IGT Dasar**: <br>• **IGT Pertanahan** (29 tema, biru `#2563eb`)<br>• **IGT Tata Ruang** (10 tema, hijau emerald `#059669`). |
| 7 | **Filter Tahun Renaksi** | Opsi tahun bervariasi (2019, 2023–2027). | Dibatasi secara ketat hanya untuk rentang **2023–2026** di seluruh komponen dashboard. |
| 8 | **Label & Tata Letak Filter Tahun** | Opsi default bernama "Pilih Tahun" dan teks sempat terpotong (*ellipsis*). | Opsi default diubah namanya menjadi **"Semua Tahun"** (sebelumnya sempat dicoba *"Tahun Renaksi"*). Penataan CSS single-row disesuaikan (`128px` container, `16×16 px` icon) sehingga teks tertampil utuh dan rapi dalam satu baris bersama Search, Jenis IGT, dan Wilayah. |
| 9 | **Penyederhanaan Hero Toolbar (Eliminasi Filter Kanan Atas)** | Terdapat tombol dan modal popup "Filter" redundan di kanan atas hero section. | **Dihapus secara menyeluruh** karena seluruh kontrol filter (Pencarian, Jenis IGT, Wilayah, dan Tahun Renaksi) sudah terpusat langsung pada kartu Detail Informasi di sisi kiri. Menyisakan antarmuka yang bersih dan hanya menampilkan tombol toggle *"Detail Informasi"* saat kartu ditutup. |
| 10 | **Spasi Vertikal Popup Detail Informasi** | Posisi popup terlalu mepet dan sedikit menabrak teks *"Hai, Internal IGT 👋"* (overlap -4px akibat `top: 64px`). | Posisi disesuaikan menjadi `top: 92px` dengan `max-height: calc(100% - 108px)`, memberikan jarak vertikal lega (+24px) di bawah teks sapaan tanpa mengorbankan ruang peta. |
| 11 | **Tipografi & Spasi Kartu Ringkasan (Usulan Input Data & Kompilasi Integrasi)** | Angka metrik (98 dan 14) berukuran standar (40px) dan jarak vertikal antara judul kartu dengan angka terlalu renggang (gap 46px). | Angka metrik **dibesarkan menjadi 58px (bold 700)** dan jarak vertikal antara judul kartu dengan angkanya didekatkan menjadi **gap 14px** (`justify-content: flex-start`). Tampilan metrik menjadi jauh lebih tegas dan proporsional. |
| 12 | **Penyelarasan Warna Status Usulan Input Data & Kompilasi Integrasi** | Warna status *Terkompilasi* (`#e0f2fe`/`#0ea5e9`) dan *Terintegrasi* (hijau `#dcfce7`/`#16a34a`) pada Usulan Input Data tidak selaras dengan kartu Kompilasi Integrasi di sebelahnya. | Warna *Terkompilasi* disamakan menjadi **soft blue (`#93c5fd`)** dan *Terintegrasi* disamakan menjadi **royal blue (`#1d4ed8`)**, baik pada ruas bar kemajuan maupun titik rincian status. Menciptakan keseragaman palet warna yang konsisten antar-kedua kartu ringkasan. |
| 13 | **Urutan Kategori Grafik Usulan Input Data** | Urutan kategori lama: *Terupload*, *Terkompilasi*, *Revisi Perbaikan*, *Terintegrasi*. | Urutan dirombak secara logis sesuai alur verifikasi data: **Terintegrasi** $\rightarrow$ **Terkompilasi** $\rightarrow$ **Terupload** $\rightarrow$ **Revisi Perbaikan**, baik pada bilah ruas progres (*progress bar*) maupun grid rincian status data di bawahnya. |
| 14 | **Warna Pastel Status Terupload (Hijau) & Revisi (Merah)** | Warna status *Terupload* sebelumnya biru cerulean (`#1860a9`/`#2f8ce4`) dan *Revisi Perbaikan* amber/kuning (`#fef3c7`/`#f59e0b`). | Diperbarui menggunakan warna pastel: **Terupload** menjadi **hijau pastel** (`#86efac` gradasi ke `#4ade80` dengan titik `#4ade80`) dan **Revisi Perbaikan** menjadi **merah pastel** (`#fecaca` gradasi ke `#fca5a5` dengan titik `#f87171`), memberikan identifikasi visual yang intuitif dan nyaman dipandang. |
| 15 | **Ketebalan Ruas Grafik untuk Kategori Bernilai 0 (Revisi Perbaikan)** | Ruas kategori dengan jumlah 0 memiliki lebar tetap 24px (`min-width: 24px`), sehingga terlihat memakan porsi ruang yang cukup besar meskipun datanya kosong. | Diberi penanganan khusus `.is-nol`: bila jumlah data 0, ruas bar dibuat **sangat tipis (lebar 4px)** dengan `flex-grow: 0` dan warna merah solid (`#f87171`), tetap terlihat sebagai penanda batas tanpa mendistorsi proporsi data lainnya. |
| 16 | **Penerapan Warna Solid pada Ruas Terupload & Revisi** | Ruas *Terupload* dan *Revisi Perbaikan* sebelumnya memiliki pola garis-garis diagonal selang-seling (`repeating-linear-gradient`) seperti halnya ruas *Terintegrasi* dan *Terkompilasi*. | Disederhanakan menjadi **warna solid (polos tanpa garis selang-seling)**: **Terupload** menggunakan warna hijau pastel solid (`#86efac`) dan **Revisi Perbaikan** menggunakan warna merah pastel solid (`#fca5a5` / `#f87171`). Pola garis selang-seling kini khusus dipertahankan hanya pada *Terintegrasi* dan *Terkompilasi* agar selaras dengan grafik Kompilasi Integrasi. |
| 17 | **Penambahan Metrik Jumlah Layer pada Usulan Input Data** | Kartu Usulan Input Data hanya menampilkan kuantitas data mentah (misal: "98 data" dan "26 data") tanpa informasi berapa layer IGT yang dinaungi. | Ditambahkan metrik akumulasi layer: metrik utama menjadi **`98 data / 30 layer`**, dan setiap item status dilengkapi rincian layer (misal: **`26 data / 14 layer`** Terintegrasi, **`7 data / 4 layer`** Terkompilasi, **`65 data / 12 layer`** Terupload, **`0 data / 0 layer`** Revisi). Tooltip bilah progres juga disesuaikan menampilkan kuantitas data dan layer secara utuh. |
| 18 | **Interaktivitas Modal Tabel Usulan Input Data (Clickable Bar & Angka)** | Angka ringkasan dan bilah progres bersifat statis (tidak dapat diklik) tanpa rincian data tabular. | Angka total metrik (**98 data / 30 layer**), bilah progres, dan item status kini **sepenuhnya interaktif (*clickable*)**. Mengklik angka 98 menampilkan pop-up modal tabel lengkap berisi 98 data usulan. Mengklik bar atau angka kategori spesifik (*Terintegrasi*, *Terkompilasi*, *Terupload*, *Revisi*) membuka modal yang sama dengan **kondisi terfilter otomatis**. Modal dilengkapi tab navigasi filter, pencarian teks instan, 9 kolom tabel lengkap sesuai standar, tombol aksi (Lihat, Riwayat, Hapus, Cloud Metadata, Edit), tombol download (SHP & Link), serta paginasi interaktif. |
| 19 | **Filter Tahun Responsif pada Usulan Input Data** | Dropdown filter tahun (`#status-data-tahun`) bersifat statis tanpa logika responsif; pergantian tahun tidak mengubah metrik kartu maupun data tabel. | Filter tahun kini **sepenuhnya responsif secara fungsional dan visual**: <br>• **Fungsional**: Memilih tahun (2026, 2025, 2024, 2023, atau Semua Tahun) secara instan memperbarui metrik data & layer, proporsi bar progres, dan rincian status. Modal pop-up tabel usulan data ikut tersinkronisasi dua arah (*two-way sync*) memfilter data sesuai tahun aktif.<br>• **Visual (CSS Responsive)**: Header kartu menggunakan `flex-wrap: wrap; row-gap: 10px;` dan penyesuaian media queries (mobile/tablet) sehingga angka metrik dan filter tahun tetap proporsional dan rapi tanpa terpotong atau tumpang tindih. |
| 20 | **Sinkronisasi Terpusat Filter Tahun Renaksi (Dekat Peta ke Seluruh Komponen Bawah)** | Filter tahun di dekat peta (`#beranda-detail-tahun`) hanya memfilter daftar chip tema geospasial pada popup info, terisolasi dari komponen dashboard di bawahnya. | Filter tahun di dekat peta kini menjadi **pengendali terpusat (*central controller*)** yang terhubung langsung ke **seluruh komponen data di bawah peta**: <br>1. *Usulan Input Data* (angka, layer, progress bar, rincian)<br>2. *Kompilasi Integrasi* (angka layer & diagram batang bulanan)<br>3. *Statistik IGT* (penyaringan entri tabular & luas)<br>4. *Leader Board* (peringkat & capaian tema per tahun)<br>5. *Capaian Renaksi* (target & realisasi persentase per tahun)<br>6. *Aktivitas Terkini* (log tanggal sesuai tahun renaksi)<br>7. *Modal Pop-up Usulan Data* (otomatis terfilter tahun aktif).<br>Dilengkapi pula mekanisme **sinkronisasi dua arah** (*bidirectional sync*), sehingga jika pengguna mengubah tahun di kartu manapun, kontrol utama di dekat peta ikut tersinkronisasi. |
| 21 | **Penyelarasan Warna Status Usulan Input Data (Terupload 30% Saturation & Revisi 10% Saturation)** | Warna status *Terupload* sebelumnya hijau pastel (`#86efac`) dan *Revisi Perbaikan* merah pastel (`#fca5a5`). | Diperbarui sesuai permintaan: <br>• **Terupload**: Mengikuti rumpun warna biru yang sama dengan *Terintegrasi* & *Terkompilasi* (hue ~217°) namun dengan **saturasi 30%** dan **warna solid polos** (`hsl(217, 30%, 75%)` / `#adc0d6`, titik `#7b94b7`).<br>• **Revisi Perbaikan**: Menggunakan warna merah terang dengan **saturasi 10%** (`hsl(0, 10%, 80%)` / `#d1c7c7`, penanda bar nol tipis 4px `#aba4a4`, dan titik `#a38f8f`). Menghasilkan harmoni warna yang serasi, bersih, dan profesional. |
| 22 | **Interaktivitas Modal & Bar Chart Kompilasi Integrasi (Clickable Metric & Monthly Bars)** | Angka total layer (14) dan bilah grafik bulanan (JAN-DES) bersifat statis tanpa aksi interaktif. | Menjadikan angka metrik utama (**14 Layer IGT**) dan bilah grafik bulanan **sepenuhnya interaktif (*clickable*)**: <br>• **Klik Angka 14**: Membuka modal pop-up menampilkan seluruh 14 Layer IGT yang terkompilasi maupun terintegrasi.<br>• **Klik Ruas Bar Spesifik (misal: Terintegrasi bulan April)**: Membuka modal terfilter khusus menampilkan layer IGT yang sudah terintegrasi secara **kumulatif dari bulan Januari hingga April** (3 layer: *Bidang Tanah*, *Hak Atas Tanah*, *Zona Nilai Tanah*). Begitu pula untuk *Terkompilasi* (1 layer: *RDTR Kabupaten/Kota*) dan bulan-bulan lainnya.<br>• **Tampilan Accordion IGT**: Modal menyajikan daftar IGT dalam format akordion interaktif (menampilkan status target, realisasi, persentase berwarna, dan rincian tabel dataset tiap IGT saat diperluas) sesuai standar UI Geoportal IGT. |
| 23 | **Penambahan Kolom Nomor Urut (No) di Paling Kiri Seluruh Tabel** | Seluruh tabel (dashboard, modal usulan data, dan modal kompilasi data) tidak memiliki kolom nomor urut (`No`), baris langsung diawali dengan checkbox atau nama data. | Ditambahkan **kolom nomor urut (`No`) di posisi paling kiri (`paling kiri`)** pada seluruh 7 tabel di aplikasi: <br>1. *Statistik IGT* (`#statistik-igt-tabel`)<br>2. *Capaian Renaksi / Leader Board* (`#capaian-renaksi-tabel`)<br>3. *Statistik Derivatif* (`#statistik-derivatif-tabel`)<br>4. *Statistik Akses IGT* (`#statistik-akses-tabel`)<br>5. *Log Aktivitas Terkini* (`#aktivitas-log-tabel`)<br>6. *Modal Usulan Input Data* (`#modal-usulan-table`)<br>7. *Subtabel Modal Kompilasi & Integrasi* (`#modal-kompilasi-accordion`).<br>Penomoran dihitung otomatis dan berlanjut secara presisi mengikuti paginasi per halaman (misal: halaman 1: nomor 1–10, halaman 2: nomor 11–20). |
| 24 | **Penghapusan Ikon Info (Tanda "i") di Kanan Atas Kartu Ringkasan** | Terdapat ikon informasi lingkaran (*info icon* / tanda "i") pada pojok kanan atas header kartu *Usulan Input Data* dan *Kompilasi Integrasi*. | Ikon tanda "i" (`.igt-panel__info` / `info.svg`) **dihapus secara menyeluruh** dari header kartu *Usulan Input Data* dan *Kompilasi Integrasi*. Menghasilkan tampilan header kartu ringkasan yang jauh lebih bersih, rapi, dan minimalis. |
| 25 | **Penghapusan Kolom Kotak-kotak (Checkbox) pada Tabel Statistik IGT** | Tabel Statistik IGT memiliki kolom centang kotak-kotak (`check-square.svg`) di antara kolom `No` dan `IGT`. | Kolom centang kotak-kotak (`.igt-table__check`) **dihapus dari tabel Statistik IGT**. Logika perenderan tabel disesuaikan dinamis mendeteksi keberadaan header centang (`hasCheck`), menghasilkan tata letak tabel yang bersih, rapi, dan persis sesuai desain referensi asli. |
| 26 | **Implementasi Tampilan Grafik Statistik IGT (Clustered Bar Chart)** | Tampilan tombol toggle *Grafik* pada kartu Statistik IGT sebelumnya hanya berupa teks placeholder statis. | Diimplementasikan **tampilan grafik batang bergugus (*clustered column bar chart*) interaktif** persis sesuai tangkapan layar modul Statistik IGT: <br>• **Legenda & Palet Warna**: *Jumlah Data Provinsi* (cyan `#68b6db`) dan *Jumlah Data Kabupaten* (medium blue `#6793db`).<br>• **Struktur Sumbu**: Sumbu Y skala 0–8 dengan garis kisi (*grid lines*) horizontal dan vertikal per tema, serta ikon garis di kiri bawah.<br>• **Kategori IGT Lengkap (11 Tema)**: Menampilkan 11 tema IGT (*Bidang Tanah*, *Hak Atas Tanah*, *Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah*, *Lahan Sawah Dilindungi*, *RDTR Kab/Kota*, *RDTR Kawasan*, *RTRW Kabupaten*, *Sebaran Lokasi*, dan *Zona Nilai Tanah*).<br>• **Interaktivitas & Filter Dropdown**: Dilengkapi dropdown metrik (*Data Berdasarkan Administrasi*, *Bidang*, *Luas*), tooltip interaktif saat *hover*, serta tersinkronisasi otomatis dengan filter tahun renaksi dan wilayah. |
| 27 | **Penyelarasan Opsi Dropdown Statistik IGT (Data Berdasarkan IGT)** | Dropdown pengelompokan pertama pada toolbar Statistik IGT bertuliskan *"Data Berdasarkan Direktorat"*. | Diperbarui menjadi **"Data Berdasarkan IGT"**, baik pada label pemicu (*trigger*) maupun item opsi aktif di dalam dropdown panel (`#statistik-igt-kelompok`), selaras dengan isi kolom data yang menampilkan tema-tema IGT. |
| 28 | **Implementasi Tabel & Grafik Statistik IGT per Provinsi (Data Berdasarkan Provinsi)** | Pengelompokan data pada kartu Statistik IGT sebelumnya hanya mendukung pengelompokan berdasarkan IGT. | Diimplementasikan **tampilan tabel dan grafik batang bergugus (*clustered column bar chart*) per Provinsi** yang terintegrasi penuh ke dropdown toolbar `#statistik-igt-kelompok`: <br>• **Tampilan Tabel per Provinsi**: Menampilkan kolom nomor urut (`No`), `Provinsi`, `Jumlah IGT`, `Kabupaten`, `Bidang`, dan `Luas (Ha)` persis sesuai tangkapan layar Geoportal (Bali, DIY, DKI Jakarta, NTT, Tidak Tercatat).<br>• **Tampilan Grafik per Provinsi**: Grafik batang adaptif yang menyajikan 5 kategori provinsi pada sumbu X, legenda & bilah *Jumlah IGT* (cyan `#68b6db`) dan *Jumlah Data Kabupaten* (biru `#6793db`), grid sumbu Y 0–8, serta tooltip melayang interaktif saat hover.<br>• **Mendukung Mode Kabupaten**: Sekaligus melengkapi opsi *"Data Berdasarkan Kabupaten/Kota"* dengan kolom dan dataset lengkap (Badung, Bantul, Belu, Gunung Kidul, dll.).<br>• **Sinkronisasi Penuh**: Pencarian, pengurutan numerik natural, paginasi, pergantian metrik (Administrasi/Bidang/Luas), serta filter wilayah dan tahun renaksi terhubung 100% dinamis. |
| 29 | **Implementasi Tabel & Grafik Statistik IGT per Kabupaten/Kota (Data Berdasarkan Kabupaten/Kota)** | Pengelompokan data pada kartu Statistik IGT sebelumnya belum memiliki visualisasi tabel dan grafik lengkap untuk tingkat Kabupaten/Kota. | Diimplementasikan **tampilan tabel dan grafik batang per Kabupaten/Kota** yang terintegrasi penuh ke dropdown toolbar `#statistik-igt-kelompok`: <br>• **Tampilan Tabel per Kabupaten/Kota**: Menyajikan kolom `No`, `Kabupaten/Kota`, `Provinsi`, `Jumlah IGT`, `Bidang`, dan `Luas (Ha)` persis sesuai tangkapan layar Geoportal (*Badung*, *Bantul*, *Belu*, *Gunung Kidul (DIY)*, *Gunung Kidul (TT)*, *Kota Jakarta Barat*, *Kota Yogyakarta*, *Kulon Progo*, *Malaka*, *Sleman*). Dilengkapi paginasi aktif 2 halaman (`< 1 2 >`).<br>• **Tampilan Grafik per Kabupaten/Kota**: Visualisasi diagram batang pada modul Grafik dengan kategori kabupaten pada sumbu X, legenda & bilah *Jumlah IGT* (cyan `#68b6db`), grid sumbu Y 0–8, serta tooltip melayang informatif saat kursor diarahkan ke setiap batang (menampilkan nama kabupaten, nama provinsi induk, Jumlah IGT, Bidang, dan Luas Ha).<br>• **Interaktivitas Menyeluruh**: Pencarian kata kunci, pengurutan kolom, tombol paginasi halaman 1 & 2, serta filter wilayah tersinkronisasi mulus. |
| 30 | **Data Kumulatif Monotonik Kompilasi & Integrasi (Mei $\ge$ April)** | Data bulanan Kompilasi & Integrasi pada tingkat provinsi mengalami fluktuasi penurunan (misal: April 2 layer, Mei turun jadi 1 layer; Februari 2 layer, Maret 1 layer; Juni 3 layer, Juli 2 layer). | Menerapkan **aturan akumulasi kumulatif (*monotonic non-decreasing progression*)** pada seluruh data bulanan (Januari–Desember) di tingkat nasional, provinsi, maupun kabupaten/kota: <br>• Nilai `terkompilasi` dan `terintegrasi` di bulan $m$ dijamin selalu $\ge$ bulan $m-1$ ($\text{data}[m] \ge \text{data}[m-1]$), sehingga capaian bulan Mei dipastikan tidak pernah lebih sedikit dari bulan April.<br>• Alur capaian nasional selaras 100% dengan 14 Layer IGT (4 terkompilasi & 10 terintegrasi).<br>• Fungsi penskalaan tahunan (`getKompilasiIntegrasi`) diberi proteksi akumulasi otomatis sehingga pemilihan tahun berapapun tetap mempertahankan tren akumulatif non-decreasing secara matematis. |
| 31 | **Penambahan Kolom Jenis IGT pada Tabel Statistik IGT (Sebelah Kanan Nomor)** | Tabel Statistik IGT (mode *Data Berdasarkan IGT*) hanya menampilkan kolom `No`, `IGT`, `Provinsi`, `Kabupaten`, `Bidang`, dan `Luas (Ha)` tanpa identifikasi klasifikasi tematik apakah termasuk IGT Pertanahan atau Tata Ruang. | Ditambahkan **kolom `Jenis IGT` di sebelah kanan kolom nomor (`No`) sebelum nama `IGT`**: <br>• Urutan kolom: **`No` $\rightarrow$ `Jenis IGT` $\rightarrow$ `IGT` $\rightarrow$ `Provinsi` $\rightarrow$ `Kabupaten` $\rightarrow$ `Bidang` $\rightarrow$ `Luas (Ha)`**.<br>• Nilai jenis IGT dirender menggunakan badge khusus: **Pertanahan** (biru ATR `#1d4ed8` dengan latar `#eff6ff`) dan **Tata Ruang** (hijau emerald `#047857` dengan latar `#ecfdf5`).<br>• Terintegrasi penuh dengan pencarian instan (pencarian *"Tata Ruang"* atau *"Pertanahan"*), pengurutan dinamis (*sortable*), dan paginasi otomatis. |
| 32 | **Leader Board 3 Kategori Pilihan (Capaian Renaksi Satker, IGT Sering Diakses, Direktorat Sering Login)** | Leader board sebelumnya menggunakan format statis daftar peringkat tema tanpa opsi pengelompokan kategori yang fleksibel dan tanpa filter direktorat. | Mengubah modul Leader Board menjadi **tiga kategori pilihan interaktif** (dapat dipilih via dropdown `#leader-board-kategori` maupun tab segmen `#leader-board-segment`): <br>1. **Capaian Renaksi oleh Satker/Direktorat**: Kolom `No` (badge medali #1 emas, #2 perak, #3 perunggu), `IGT`, `Satker / Direktorat`, `Realisasi / Target` (dibuat satu kolom: angka realisasi / target + badge satuan seperti *Bidang*, *Kawasan*, *Lokasi*, *Provinsi*), `Persentase` (progress bar horizontal adaptif hijau/kuning/merah + angka persentase). Dilengkapi filter khusus **Tahun Renaksi** dan dropdown filter **Direktorat / Satker**.<br>2. **IGT yang paling sering diakses (via plugin dan aplikasi)**: Kolom `No`, `Nama IGT`, `Jumlah Akses` (total akses + rincian akses via Plugin QGIS dan Aplikasi Geoportal). Filter: **Tahun Akses** (filter satker disembunyikan otomatis).<br>3. **Direktorat yg paling sering login**: Kolom `No`, `Satker / Direktorat`, `Jumlah Login` (total frekuensi login terurut peringkat menurun). Filter: **Tahun Akses** (filter satker disembunyikan otomatis).<br>Seluruh kategori dilengkapi pencarian instan, pengurutan klik kolom thead, paginasi 10/25/50 entri, serta tombol *Unduh Data* (ekspor CSV) dan *View Full Table*. |
| 33 | **Penggantian Istilah Satuan "Layer" Menjadi "IGT" pada Usulan Input Data** | Kartu *Usulan Input Data* menampilkan label satuan tema geospasial sebagai "layer" (misal: "98 data / 30 layer", "26 data / 14 layer"). | Label satuan "layer" pada kartu ringkasan *Usulan Input Data* **diganti menjadi "IGT"** secara menyeluruh: <br>• Metrik utama kartu: **`98 data / 30 IGT`**.<br>• Rincian status per kategori: `26 data / 14 IGT` (Terintegrasi), `7 data / 4 IGT` (Terkompilasi), `65 data / 12 IGT` (Terupload), `0 data / 0 IGT` (Revisi Perbaikan).<br>• Tooltip bar progres dinamis juga diperbarui menggunakan satuan "IGT". |
| 34 | **Pengaturan Tampilan Leader Board (Default Top 5, Tabel Lebih Lebar, & Chip Daftar IGT di Bawah Nama)** | Leader board menampilkan 10 baris per halaman secara default, tabel terasa agak padat/sempit, dan belum menampilkan rincian tema-tema IGT yang masuk di bawah nama IGT/Satker. | Mengoptimalkan modul Leader Board sesuai preferensi pengguna: <br>• **Default Top 5**: Jumlah data yang tampil otomatis adalah **5 entri teratas (*Top 5*)** dengan selektor per halaman default bernilai 5 (`< 1 2 >`).<br>• **Tampilan Lebih Lebar & Nyaman**: Menghapus pembatasan lebar maksimal kolom (`max-width: 200px/300px`), memperbesar padding sel menjadi `16px 20px`, serta memperlebar progress bar (hingga 250px) sehingga tabel terasa luas, lega, dan nyaman dibaca.<br>• **Chip Tag IGT di Bawah Nama**: Di bawah tulisan nama IGT/Satker, ditampilkan badge pill/chip berwarna (`.igt-tag` biru untuk Pertanahan dan `.igt-tag--kawasan` kuning/amber untuk Tata Ruang) yang merinci seluruh tema IGT yang masuk ke dalam entri tersebut (misal: *Direktorat Penatagunaan Tanah* menampilkan 4 chip: *Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah Nasional*, *Neraca Penatagunaan Tanah*; dan *Bidang Tanah* menampilkan chip *Bidang Tanah*). |
| 35 | **Visualisasi Grafik Batang Horizontal (*Horizontal Bar Chart*) dengan Angka di Ujung Bilah untuk Kategori Akses dan Login** | Kategori 2 (*IGT Paling Sering Diakses*) dan Kategori 3 (*Direktorat Sering Login*) sebelumnya masih menggunakan format tabel biasa, belum dalam bentuk diagram batang horizontal. | Mengubah visualisasi Kategori 2 dan 3 pada modul Leader Board menjadi **grafik batang ke samping (*horizontal bar chart*)** dengan angka ditulis tepat di ujung bilah grafik: <br>• **Kategori 2 (IGT Paling Sering Diakses)**: Menampilkan bilah horizontal tersegmentasi warna cerah (Plugin QGIS sky blue `#0284c7` & Aplikasi Geoportal royal blue `#1d4ed8`) dengan panjang proporsional, chip tag IGT di bawah judul, serta angka total akses dan rincian metode diletakkan tepat di ujung luar batang (`48.291 kali (Plugin: 32.140 • Aplikasi: 16.151)`). Dilengkapi legenda visual metode akses di sudut kanan atas.<br>• **Kategori 3 (Direktorat Paling Sering Login)**: Menampilkan bilah horizontal bergradien elegan (`linear-gradient(90deg, #38bdf8, #1d4ed8)`), chip daftar IGT yang dikelola di bawah nama satker, dan angka frekuensi login ditulis tepat di ujung bilah (`1.842 kali login`).<br>• **Kategori 1 (Capaian Renaksi)**: Tetap dipertahankan sebagai tabel lebar dengan progress bar capaian.<br>• **Interaktivitas Lengkap**: Kotak pencarian (*live search*), filter tahun, pemilih jumlah per page (default Top 5), paginasi halaman, dan ekspor CSV tetap berfungsi sinkron. |
| 36 | **Tabel Capaian Renaksi Berdasarkan Satker/Direktorat dengan Chip Mint Green & Bobot Proporsional Bidang-Kawasan** | Tabel Capaian Renaksi sebelumnya mengelompokkan data berdasarkan tema IGT individual dengan kolom Satker terpisah, belum mengakomodasi direktorat yang mengelola tema berbasis bidang dan kawasan sekaligus, serta persentase capaian belum mempertimbangkan bobot jenis tema. | Menyusun ulang tabel **Capaian Renaksi Satker** menjadi **berdasarkan Satker/Direktorat** secara penuh: <br>• **Entri Utama Satker / Direktorat**: Setiap baris tabel mewakili satu Direktorat/Satker. Di bawah nama Satker, disematkan chip badge nama-nama IGT yang dikelola persis sesuai tangkapan layar pengguna.<br>• **Dukungan Dual Basis di Capaian/Target**: Untuk direktorat yang memiliki IGT berbasis bidang dan berbasis kawasan sekaligus (misal: *Direktorat Bina Pengadaan dan Pencadangan Tanah* & *Direktorat Pengendalian Hak Tanah...*), kolom *Realisasi / Target* menampilkan kedua capaian bertingkat secara terpisah (`... BIDANG` dan `... KAWASAN`) dengan badge satuan tematik.<br>• **Perhitungan Persentase Berbobot (*Weighted Average*)**: Persentase capaian dihitung berdasarkan jumlah bobot tema: $\text{Persentase} = \frac{P_{\text{kawasan}} \cdot N_{\text{kawasan}} + P_{\text{bidang}} \cdot N_{\text{bidang}}}{N_{\text{kawasan}} + N_{\text{bidang}}}$. Jika kawasan berjumlah 2 dan bidang berjumlah 1, kawasan berbobot 2 dan bidang berbobot 1. Terdapat keterangan pembobotan `(Bobot: 2 Kawasan, 1 Bidang)` di bawah nilai persentase.<br>• **4 Kolom Efisien & Lapang**: Struktur header tabel diperbarui menjadi `No` $\rightarrow$ `Satker / Direktorat` $\rightarrow$ `Realisasi / Target` $\rightarrow$ `Persentase`. Terintegrasi dengan filter Satker, live search, dan ekspor CSV. |
| 37 | **Pembedaan Warna Chip IGT Berbasis Bidang (Biru) dan Berbasis Kawasan (Hijau Mint)** | Semua chip tema IGT sebelumnya menggunakan warna seragam tanpa membedakan secara visual apakah tema tersebut berbasis bidang atau kawasan. | Menerapkan **diferensiasi warna tematik** pada chip nama IGT dan badge satuan target selaras dengan warna *Jenis IGT* pada tabel Statistik IGT di atasnya: <br>• **IGT Berbasis Bidang (Pertanahan)**: Menggunakan warna **biru lembut ATR/BPN** (`.igt-tag--bidang` & `.igt-satuan-badge--bidang`: latar `#eff6ff`, border `#bfdbfe`, teks `#1d4ed8`), diterapkan pada tema *Bidang Tanah* dan *Hak Atas Tanah*.<br>• **IGT Berbasis Kawasan (Tata Ruang / Wilayah)**: Menggunakan warna **hijau mint segar** (`.igt-tag--kawasan` & `.igt-satuan-badge--kawasan`: latar `#ecfdf5`, border `#6ee7b7` / `#a7f3d0`, teks `#047857`), diterapkan pada tema *Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah Nasional*, *Neraca Penatagunaan Tanah*, *RDTR Kab/Kota*, *RDTR Kawasan*, *RTRW Kabupaten*, *RTRW Provinsi*, *Lahan Sawah Dilindungi*, *Zona Nilai Tanah*, dll.<br>• **Harmoni Visual Menyeluruh**: Diterapkan konsisten pada Kategori 1 (*Capaian Renaksi Satker*), Kategori 2 (*IGT Sering Diakses*), dan Kategori 3 (*Direktorat Sering Login*). |
| 38 | **Standarisasi 39 IGT Resmi dan 7 Satker/Ditjen Sesuai Bagan Ditjen SPPR Kementerian ATR/BPN** | Daftar IGT dan Satker sebelumnya menggunakan nama-nama direktorat sementara dan daftar tema parsial tanpa rujukan matriks resmi kementerian. | Menyelaraskan seluruh data simulasi Leader Board dengan bagan resmi **05 DAFTAR IGT DASAR PERTANAHAN DAN RUANG** Ditjen SPPR Kementerian ATR/BPN: <br>• **7 Unit Eselon I (Satker/Ditjen)**: *Ditjen Survei dan Pemetaan Pertanahan dan Ruang* (5 Bidang + 1 Kawasan), *Ditjen Penetapan Hak dan Pendaftaran Tanah* (1 Bidang), *Ditjen Penanganan Sengketa dan Konflik Pertanahan* (1 Bidang), *Ditjen Penataan Agraria* (3 Bidang + 9 Kawasan), *Ditjen Pengadaan Tanah dan Pengembangan Pertanahan* (4 Bidang + 2 Kawasan), *Ditjen Pengendalian dan Penertiban Tanah dan Ruang* (2 Bidang + 2 Kawasan), dan *Ditjen Tata Ruang* (9 Kawasan).<br>• **39 Tema IGT Resmi**: <br>&nbsp;&nbsp;1) **Basis Bidang Tanah (1–16, Chip Biru)**: *Bidang Tanah*, *Penguasaan Tanah*, *Pemilikan Tanah*, *Penggunaan Tanah*, *Pemanfaatan Tanah*, *Sebaran Lokasi Pemberdayaan Tanah Masyarakat*, *Pertimbangan Teknis Pertanahan*, *Inventarisasi Tanah Kritis*, *Tanah Terindikasi Terlantar*, *Indikasi Pelanggaran Pemanfaatan Ruang*, *Hak Atas Tanah*, *Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan*, *Potensi Subjek Konsolidasi Tanah*, *Nilai Bidang Tanah*, *Desain Konsolidasi Tanah*, *Hasil Penerapan Desain Konsolidasi Tanah*.<br>&nbsp;&nbsp;2) **Basis Kawasan (17–39, Chip Hijau Mint)**: *RTRW Nasional*, *RTRW Provinsi*, *RTRW Kabupaten*, *RTRW Kota*, *RDTR Kawasan Perbatasan Negara*, *RTR Pulau/Kepulauan*, *RTR Kawasan Strategis Nasional*, *RDTR Kabupaten/Kota*, *KKPR*, *Lahan Baku Sawah*, *Kemampuan Tanah*, *Neraca Penatagunaan Tanah*, *Persebaran Pulau-Pulau Kecil Terluar di Indonesia*, *Sebaran Tanah Objek Reforma Agraria*, *Analisa Tanah Objek Reforma Agraria*, *Potensi Objek Redistribusi Tanah*, *Potensi WP3WT*, *Tanah Timbul*, *Unsur Dasar Pertanahan*, *Lahan Sawah Dilindungi*, *Kawasan Terindikasi Terlantar*, *Zona Nilai Tanah*, *Sebaran Potensi Pengembangan Pertanahan*.<br>• **Diferensiasi Warna Otomatis**: 16 tema Basis Bidang otomatis memakai chip biru (`.igt-tag--bidang`), 23 tema Basis Kawasan otomatis memakai chip hijau mint (`.igt-tag--kawasan`).<br>• **Perhitungan Bobot Multi-Basis**: Ditjen yang memiliki tema Bidang dan Kawasan sekaligus (SPPR, PTPP, Penataan Agraria, PPTR) menghitung persentase capaian berbasis pembobotan presisi ($w_{\text{bidang}} = \text{jumlah bidang}$, $w_{\text{kawasan}} = \text{jumlah kawasan}$). |
| 39 | **Peningkatan Dimensi Kolom Utama Leader Board (Realisasi/Target & Persentase), Satuan Hektar (Ha), dan Kartu Tematik Bidang/Kawasan Interaktif** | Menampilkan seluruh tema IGT secara langsung di bawah nama satker membuat baris tabel terlalu panjang dan padat (terlalu banyak chip). Selain itu, kolom realisasi target dan persentase yang merupakan informasi utama membutuhkan dimensi visual yang lebih besar, dan satuan untuk kawasan perlu disesuaikan menjadi "Ha" (Hektar) bukan "Kawasan". | Mengoptimalkan tata letak dan interaktivitas tabel Capaian Renaksi Satker: <br>• **Perbesaran Kolom Utama (Realisasi/Target & Persentase)**: Kolom *Realisasi / Target* diperlebar (`min-width: 260px`, lebar 30%) dengan tipografi tebal menonjol (`15.5px` bold) dan badge satuan yang rapi. Kolom *Persentase* diperlebar (`min-width: 300px`, lebar 34%) dengan bilah progress bar panjang (`12px` height, radius penuh, hingga `380px`), angka persentase besar (`16px` bold), dan subteks bobot proporsional.<br>• **Satuan Resmi "Bidang" dan "Ha"**: Satuan metrik diperbarui secara presisi menjadi **`Bidang`** untuk tema berbasis bidang dan **`Ha`** untuk tema berbasis kawasan (misal: `145 / 150 Bidang` dan `9.000 / 10.000 Ha`). Keterangan pembobotan juga otomatis menggunakan `(Bobot: X Ha, Y Bidang)`.<br>• **Kartu Interaktif Bidang & Kawasan**: Seluruh chip IGT tidak lagi dimuntahkan sekaligus di tabel. Digantikan oleh **kartu/pill interaktif ringkas** di bawah nama direktorat: `[ 🟦 X IGT Berbasis Bidang ▾ ]` dan `[ 🟩 Y IGT Berbasis Kawasan ▾ ]`.<br>• **Drawer & Pop-up Dialog Interaktif**: Mengklik kartu langsung membuka drawer ekspansi di dalam baris yang menampilkan daftar nama IGT lengkap bertema sesuai basisnya. Dilengkapi tombol aksi untuk membuka **pop-up modal penuh** (`#modal-leaderboard-igt`). Diterapkan konsisten pula pada Kategori 3 (*Direktorat Sering Login*). |
| 40 | **Penerapan Pola Progressive Disclosure "See More" (+X lainnya) pada Capaian Renaksi & Penghapusan Chip pada Grafik Akses & Login** | Menampilkan kartu tertutup sepenuhnya menyembunyikan identitas tema IGT pada satker yang hanya memiliki 1–2 tema (harus diklik dulu untuk melihat), sedangkan pada grafik batang horizontal (Kategori 2 & 3) keberadaan chip nama tema terasa redundan dan membuat tinggi baris tidak seragam. | Menyempurnakan antarmuka Leader Board sesuai diskusi desain: <br>• **Pola "See More" (+X lainnya ▾ / Sembunyikan ▴) pada Capaian Renaksi**: Di bawah nama direktorat, kini langsung ditampilkan 2 chip tema teratas sebagai pratinjau (*preview*). Untuk direktorat dual-basis, pratinjau cerdas menampilkan 1 tema Bidang (biru) dan 1 tema Kawasan (hijau). Untuk satker yang memiliki $>2$ tema, disematkan tombol interaktif `+X lainnya ▾` yang saat diklik langsung memekarkan seluruh sisa chip secara inline dan berganti menjadi `Sembunyikan ▴`. Satker dengan 1 tema (Ditjen PHPT & Ditjen PSKP) langsung terlihat utuh tanpa tombol tersembunyi.<br>• **Pembersihan Chip pada Grafik Batang Horizontal (Kategori 2 & 3)**: Seluruh chip di bawah nama tema pada Kategori 2 (*IGT Sering Diakses*) dan nama satker pada Kategori 3 (*Direktorat Sering Login*) **dihapus secara menyeluruh**. Setiap baris grafik kini berfokus murni pada badge peringkat, judul entri yang terpusat rapi, dan bilah grafik batang horizontal dengan metrik angka di ujung bilah. |
| 41 | **Perluasan Satker Sering Login (Direktorat, Kanwil, & Kantah) dan Penambahan Badge Tipe Administrasi** | Kategori 3 bernama "Direktorat Sering Login" dan hanya memuat 7 Ditjen pusat, belum mencerminkan struktur satker vertikal Kementerian ATR/BPN yang mencakup Kanwil dan Kantah. | Nama kategori diperbarui menjadi **"Satker Sering Login"** di seluruh elemen (dropdown, segmen tombol, subbar info, dan thead). Data simulasi diperkaya mencakup representasi berimbang antara **Ditjen (Pusat)**, **Kanwil BPN Provinsi** (Jabar, Jatim, Jateng, DKI, Bali, NTT), dan **Kantah Kab/Kota** (Bogor, Surabaya I, Sleman, Jakarta Barat, Badung, Bandung, Semarang). Setiap baris dilengkapi badge tipe administrasi (`.igt-tipe-badge`): **PUSAT** (abu-abu slate), **KANWIL** (ungu lavender), dan **KANTAH** (hijau mint). Filter Satker pada tabel Capaian Renaksi turut diperluas mencakup Kanwil dan Kantah, serta ekspor CSV menyertakan keterangan tipe satker. |
| 42 | **Pembersihan Teks Bobot pada Kolom Persentase Capaian Renaksi** | Terdapat subteks keterangan bobot `(Bobot: X Ha, Y Bidang)` di bawah angka persentase pada Kategori 1 Capaian Renaksi Satker. | Subteks tulisan bobot **dihapus secara menyeluruh** dari antarmuka tabel dan ekspor CSV, menyisakan bilah progress bar dan angka persentase murni yang terpusat rapi secara vertikal (`align-items: center`). Perhitungan matematis rata-rata terbobot (*weighted average*) tetap aktif di latar belakang. |
| 43 | **Penyederhanaan Filter Leader Board (Hanya Jenis IGT & Tahun Renaksi)** | Toolbar Leader Board memiliki filter satker/direktorat dan dropdown kategori yang redundan dengan segment tab di subbar, sementara filter jenis IGT (Pertanahan vs Tata Ruang) belum tersedia. | Filter Leader Board disederhanakan: <br>• **Filter Jenis IGT**: Disematkan dropdown baru (`#leader-board-jenis-wrap`) dengan opsi **Semua Jenis IGT**, **IGT Pertanahan**, dan **IGT Tata Ruang** yang memfilter seluruh 3 kategori Leader Board secara akurat.<br>• **Filter Tahun**: Tetap dipertahankan sebagai filter rentang waktu renaksi/akses.<br>• **Pembersihan Kontrol Redundan**: Filter Satker dan dropdown kategori di toolbar dihapus, perataan toolbar menjadi bersih dan lapang, sementara alih kategori tetap dapat diakses 1-klik melalui segmen tombol pada subbar. |
| 44 | **Transisi Entitas Leader Board dari Tingkat Ditjen (Eselon I) ke Direktorat (Eselon II) Pengampu 39 IGT Resmi** | Entitas pada Capaian Renaksi sebelumnya menampilkan nama 7 Ditjen (Eselon I), belum sesuai dengan struktur internal operasional riil yang menugaskan setiap tema IGT ke Direktorat (Eselon II) spesifik. | Menyelaraskan seluruh modul Leader Board dengan entitas resmi **Direktorat** Kementerian ATR/BPN: <br>• **Pemetaan Presisi 39 IGT ke 13 Direktorat**: Seluruh 39 tema IGT dasar resmi dipetakan ke 13 Direktorat pengampu:<br>&nbsp;&nbsp;1) *Direktorat Pengukuran Dan Pemetaan Kadastral* (1 Bidang: Bidang Tanah)<br>&nbsp;&nbsp;2) *Direktorat Penetapan Hak Atas Tanah dan Ruang* (1 Bidang: Hak Atas Tanah)<br>&nbsp;&nbsp;3) *Direktorat Penanganan Sengketa Pertanahan* (1 Bidang: Sengketa/Konflik)<br>&nbsp;&nbsp;4) *Direktorat Pemberdayaan Tanah Masyarakat* (1 Bidang: Pemberdayaan Tanah Masyarakat)<br>&nbsp;&nbsp;5) *Direktorat Survei Dan Pemetaan Tematik* (Dual-basis: 4 Bidang + 1 Kawasan)<br>&nbsp;&nbsp;6) *Direktorat Penilaian Tanah Dan Ekonomi Pertanahan* (Dual-basis: 1 Bidang + 1 Kawasan)<br>&nbsp;&nbsp;7) *Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan* (Dual-basis: 3 Bidang + 1 Kawasan)<br>&nbsp;&nbsp;8) *Direktorat Penatagunaan Tanah* (Dual-basis: 2 Bidang + 3 Kawasan)<br>&nbsp;&nbsp;9) *Direktorat Landreform* (6 Kawasan)<br>&nbsp;&nbsp;10) *Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu* (Dual-basis: 1 Bidang + 2 Kawasan)<br>&nbsp;&nbsp;11) *Direktorat Penertiban Pemanfaatan Ruang* (1 Bidang: Tata Ruang)<br>&nbsp;&nbsp;12) *Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I* (5 Kawasan: Tata Ruang)<br>&nbsp;&nbsp;13) *Direktorat Perencanaan Tata Ruang Nasional* (4 Kawasan: Tata Ruang)<br>• **Pembaruan Label Kolom & Subbar Info**: Kolom tabel Kategori 1 diperbarui menjadi **`Direktorat`** dan teks subbar menjadi *Peringkat Capaian Renaksi per Direktorat*.<br>• **Penerapan pada Kategori 2 & 3**: Kategori 2 menyematkan nama Direktorat pengampu masing-masing IGT; Kategori 3 menampilkan Direktorat pengampu pada entitas Pusat berdampingan dengan Kanwil dan Kantah. |
| 45 | **Penyederhanaan Leader Board Menjadi Top 5 Ringkas, Penghapusan Pilihan Per-Page, Paginasi, dan Tombol Unduh Data** | Leader Board sebelumnya memiliki kontrol tabel data penuh (pilihan per-page 5/10/25/50, tombol "View Full Table", paginasi halaman, dan tombol "Unduh Data") yang berlebihan untuk modul kartu papan peringkat ringkas. | Menyederhanakan tampilan Leader Board menjadi murni **Peringkat 5 Teratas (Top 5)**: <br>• **Penetapan 5 Entri Tetap (*Fixed Top 5*)**: Seluruh 3 kategori (Capaian Renaksi Direktorat, IGT Sering Diakses, dan Satker Sering Login) kini secara konsisten hanya menampilkan 5 entri teratas peringkat terbaik.<br>• **Penghapusan Pilihan Per-Page & Paginasi**: Elemen dropdown pilihan jumlah per page (`#leader-board-perpage`) dan bar paginasi di footer (`#leader-board-foot`) dihapus menyeluruh dari markup dan logika script.<br>• **Pembersihan Tombol Toolbar**: Menghapus tombol *Unduh Data* (`#leader-board-unduh`) dan *View Full Table* (`#leader-board-full`). Toolbar atas kini murni berisi Searchbar, Filter Jenis IGT, dan Filter Tahun. |
| 46 | **Penyatuan Tabel Detail Lengkap ke Dalam Kartu Leader Board, Paginasi Dinamis (Default 10), dan Penghapusan Kartu Capaian Renaksi Terpisah** | Informasi detail capaian sebelumnya berada di kartu terpisah di bawah (`#capaian-renaksi`) sehingga terjadi redundansi tampilan, sementara kartu Leader Board di atasnya belum memiliki tabel eksplorasi data menyeluruh untuk seluruh entitas. | Mengintegrasikan modul **Tabel Detail Lengkap** ke dalam kartu Leader Board (`#leader-board-detail-wrap`): <br>• **Sinkronisasi Tab Kategori**: Tabel detail secara dinamis mengikuti tab aktif di atasnya: <br>&nbsp;&nbsp;1) *Tab 1 (Capaian Renaksi)*: Tabel lengkap capaian seluruh direktorat dengan kolom No, Direktorat (preview chips IGT + See More), Target, Realisasi, dan Persentase Capaian.<br>&nbsp;&nbsp;2) *Tab 2 (IGT Sering Diakses)*: Tabel detail pemanfaatan IGT dengan kolom No, Nama IGT, Jenis IGT, Direktorat Pengampu, Akses Plugin QGIS, Akses Geoportal, dan Total Akses.<br>&nbsp;&nbsp;3) *Tab 3 (Satker Sering Login)*: Tabel detail keaktifan satker dengan kolom No, Nama Satker, Tipe Administrasi (Pusat/Kanwil/Kantah), Tema IGT Pengampu, Frekuensi Login, dan Status Keaktifan.<br>• **Paginasi & Pilihan Per-Page Dinamis**: Dilengkapi kontrol jumlah per-page (`#leader-board-detail-perpage`) dengan **default 10 data** (opsi 10, 25, 50) serta tombol navigasi paginasi penuh.<br>• **Pencarian Spesifik & Sorting Kolom**: Disematkan searchbar internal (`#leader-board-detail-cari`) dan sorting ascending/descending pada seluruh header kolom tabel detail.<br>• **Penghapusan Kartu Capaian Renaksi Terpisah**: Kartu lama `#capaian-renaksi` di bawah Leader Board resmi dihapus secara menyeluruh. |
| 47 | **Diferensiasi Format Tabel Detail: Tanpa Progress Bar, Tanpa Chip, dan Penulisan Satuan Teks Biasa** | Tabel detail di bawah leaderboard sebelumnya masih mengadopsi elemen visual seperti leaderboard (progress bar warna-warni, chip tema geospasial, dan badge pill satuan). | Disesuaikan menjadi **tampilan tabel data grid standar yang bersih dan kontras dengan leaderboard**: <br>• **Tanpa Progress Bar**: Kolom persentase murni angka tebal (misal: `88.50%`) dengan warna teks semantik (`text-success`, `text-warning`, `text-danger`).<br>• **Tanpa Chip/Badge**: Kolom Direktorat, Jenis IGT, dan Tipe Satker disajikan dalam teks polos bersih tanpa chip atau badge pill.<br>• **Satuan Ditulis Biasa**: Angka target, realisasi, frekuensi akses, dan frekuensi login ditulis langsung berdampingan dengan satuannya sebagai teks biasa (misal: `10 Bidang`, `10.000 Ha`, `32.140 kali`, `2.840 kali login`). |
| 48 | **Penghapusan Kolom Kotak (Checkbox) pada Seluruh Tabel Data (Statistik Derivatif, Statistik Akses, & Aktivitas Log)** | Terdapat kolom checkbox kotak (`check-square.svg`) setelah kolom `No` pada tabel Statistik Derivatif, Statistik Akses IGT, dan Aktivitas Log. | Seluruh kolom checkbox kotak **dihapus secara menyeluruh** dari markup `index.html` dan logika perenderan `mockup-app.js`. Seluruh tabel kini diawali murni dengan kolom nomor urut (`No`) yang langsung diikuti oleh kolom data entitas (`Layer Derivatif`, `Unit / Wilayah`, `Nama User`), menghasilkan tata letak tabel yang bersih, konsisten, dan rapi di seluruh dashboard. |
| 49 | **Transisi Sidebar Menjadi Navigasi Card per Role (Superadmin, Direktorat SPPR, Kanwil DIY, Kantah Gunung Kidul)** | Navbar samping sebelumnya memuat menu statis umum (Dashboard, Kompilasi Data, Integrasi Data, Create Layer Derivatif, CMS) yang belum mengakomodasi simulasi hak akses berbasis peran kementerian. | Navbar samping **diganti menjadi kartu interaktif per role (*Card per Role*)** yang langsung merefleksikan hak akses dan filter dashboard otomatis: <br>1. **Superadmin**: Akses penuh seluruh data nasional (38 provinsi) dan semua modul (tampilan awal/default).<br>2. **Direktorat SPPR**: Otomatis memfilter data dashboard khusus ke tema IGT dan unit di lingkungan Ditjen SPPR (*Bidang Tanah*, *Penguasaan*, *Pemilikan*, *Penggunaan*, *Pemanfaatan*, *Unsur Dasar*).<br>3. **Kanwil DIY**: Peta otomatis drill-down dan terkunci ke wilayah D.I. Yogyakarta, dropdown wilayah hanya menyajikan 5 kabupaten/kota di DIY, dan tabel satker hanya memuat satker DIY (tidak dapat melihat provinsi lain).<br>4. **Kantah Gunung Kidul**: Peta otomatis drill-down dan terkunci pada poligon Kab. Gunungkidul, dropdown terkunci murni pada Gunungkidul, dan satker login hanya memuat Kantah Gunungkidul.<br>Dilengkapi banner status role aktif di atas dashboard, sinkronisasi profil pengguna di footer sidebar, serta penanganan proteksi aksi di luar hak akses role. |
| 50 | **Penambahan Kolom IGT dan Default Pengelompokan per Direktorat pada Tabel Detail Capaian Renaksi (Sheet IGT.xlsx)** | Tabel Detail Capaian Renaksi sebelumnya menampilkan data teragregasi per Direktorat dengan kolom No, Direktorat, Target, Realisasi, dan Persentase Capaian tanpa rincian baris individual per tema IGT. | Menyesuaikan struktur data dan tampilan Tabel Detail Capaian Renaksi (`#leader-board-detail-table`) menjadi **berbasis per IGT dan dikelompokkan per Direktorat**: <br>• **Penambahan Kolom IGT**: Kolom tabel detail disesuaikan menjadi: **`No` $\rightarrow$ `Direktorat` $\rightarrow$ `IGT` $\rightarrow$ `Target` $\rightarrow$ `Realisasi` $\rightarrow$ `Persentase Capaian`**.<br>• **Data Bersumber dari `Examples/IGT.xlsx`**: Mengadopsi 43 pemetaan resmi IGT Kementerian ATR/BPN yang terbagi ke dalam 19 Direktorat pengampu teknis.<br>• **Penyajian Metrik per IGT**: Setiap baris tabel mewakili satu IGT individual lengkap dengan target spesifik, realisasi spesifik, dan persentase capaian spesifik dengan satuan teks biasa (*Bidang* atau *Ha*).<br>• **Default Dikelompokkan per Direktorat (*Grouped View*)**: Secara default tabel mengelompokkan baris berdasarkan Direktorat pengampu dengan subheader grup elegan (`.igt-table-group-header`) yang memuat badge Direktorat, jumlah IGT, dan rata-rata capaian direktorat.<br>• **Fleksibilitas Sorting Global & Search**: Jika pengguna mengklik sort pada kolom metrik (*Persentase Capaian*, *Target*, atau *Realisasi*), tabel secara dinamis bertransisi menampilkan daftar terurut global dari tertinggi ke terendah, dan dapat kembali ke mode grup dengan mengklik kolom *Direktorat*. Terintegrasi dengan filter pencarian instan, jenis IGT, tahun, dan role switching. |
| 51 | **Penggabungan Sel (Rowspan Merge) Kolom Satker, Penggantian Label Kolom Menjadi Satker, dan Pembaruan Judul Tabel Renaksi** | Baris satker berulang untuk setiap IGT atau dipisahkan oleh subheader terpisah, kolom kedua dan subbar berlabel "Direktorat", serta judul tabel bertuliskan "Tabel Detail Capaian Rencana Aksi (Renaksi) per Direktorat". | Menyempurnakan tampilan tabel detail dan leaderboard sesuai format resmi lembar kerja ATR/BPN: <br>• **Cell Merging Vertikal (`rowspan`)**: Sel Satker pada kolom kedua digabung (*merged*) secara vertikal mencakup seluruh baris IGT yang dinaunginya pada halaman aktif (misal: 4 baris IGT di bawah *Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I* memiliki satu sel dengan `rowspan="4"`).<br>• **Penggantian Istilah Direktorat Menjadi Satker**: Kolom kedua tabel leaderboard dan tabel detail diganti namanya menjadi **`Satker`**.<br>• **Pembaruan Judul Tabel & Subbar**: Judul tabel detail diubah menjadi **"Tabel Detail Capaian Rencana Aksi (Renaksi) per Satker"** dan subbar info atas menjadi **"Peringkat Capaian Rencana Aksi (Renaksi) per Satker"**.<br>• **Gaya Sel Satker Ter-merge**: Menggunakan perataan vertikal tengah (`vertical-align: middle`), garis batas pemisah antar-satker (`border-bottom: 2px solid #cbd5e1`), dan badge ringkasan jumlah IGT serta rata-rata capaian yang disematkan langsung di dalam sel satker ter-merge. |
| 52 | **Penggantian Kolom Tanggal Menjadi Waktu dengan Format Timestamp Penuh (Jam:Menit:Detik) pada Aktivitas Log** | Kolom keempat tabel Aktivitas Log berlabel "Tanggal" dan hanya menampilkan tanggal tanpa jam (misal: "15 Oktober 2026" / "18 Oktober 2026"). | Memperbarui modul Aktivitas Log (`#aktivitas-log`) sesuai standar audit trail sistem informasi: <br>• **Penggantian Label Kolom Menjadi Waktu**: Kolom keempat diperbarui namanya menjadi **`Waktu`** (`data-kolom="waktu"`).<br>• **Perekaman Timestamp Presisi (`Jam:menit:detik`)**: Data waktu disajikan dalam format timestamp standar penuh **`YYYY-MM-DD HH:mm:ss`** (misal: `2026-10-18 14:32:10`, `2026-10-18 14:28:45`).<br>• **Default Sorting Kronologis Terkini (Newest First)**: Log diurutkan otomatis dari aktivitas paling baru (descending), dan tetap dapat diurutkan ascending/descending melalui klik header kolom *Waktu*.<br>• **Tipografi Tabular Numerik**: Waktu dirender dengan styling monospace tabular (`tabular-nums`) sehingga angka jam, menit, dan detik tersusun lurus dan rapi secara visual. |
| 53 | **Pengurutan Rata-rata Persentase Capaian Direktorat Tertinggi, Label Kolom & Judul Menjadi Direktorat, dan Penyingkatan Istilah Menjadi Renaksi** | Tabel detail renaksi diurutkan alfabetis per satker, kolom kedua dan subbar sempat berlabel Satker, judul tabel menjabarkan "Rencana Aksi (Renaksi)", dan tab 1 bertuliskan Capaian Renaksi Satker. | Menyelaraskan hierarki dan urutan capaian unit kerja Eselon II Kementerian ATR/BPN: <br>• **Pengurutan Rata-rata Tertinggi (*Highest Average First*)**: Grup Direktorat pada mode default diurutkan menurun berdasarkan persentase rata-rata capaian direktorat tertinggi (misal: Setditjen PHPT 97%, Setditjen PSKP 96%, Dit. Pengukuran Kadastral 94%, Dit. Tematik 92.5%, dll.). Seluruh IGT di bawah direktorat tetap terkumpul contiguous dan ter-merge presisi via `rowspan`.<br>• **Penyesuaian Label Kolom Menjadi Direktorat**: Kolom kedua pada tabel leaderboard atas dan tabel detail diubah menjadi **`Direktorat`**.<br>• **Pembaruan Judul Tabel Menjadi Ringkas**: Judul tabel detail diubah menjadi **"Tabel Detail Capaian Renaksi per Direktorat"**, subbar leaderboard atas menjadi **"Peringkat Capaian Renaksi per Direktorat"**, dan tombol tab 1 menjadi **"1. Capaian Renaksi Direktorat"**.<br>• **Penyingkatan Istilah**: Menghapus penjabaran kata "Rencana Aksi (Renaksi)" di seluruh judul dan subbar, murni menggunakan istilah ringkas resmi **"Renaksi"**.<br>• **Kompatibilitas Fleksibel**: Seluruh data tetap tersaring secara responsif saat pengguna berpindah antar-tahun renaksi atau mengubah filter jenis IGT. |
| 54 | **Pengayaan Dataset Penuh pada Seluruh Role dan Cakupan Wilayah Khusus Leaderboard & Tabel Detail (Kanwil se-Indonesia untuk DIY, Kantah se-DIY untuk Gunungkidul)** | Data pada role selain Superadmin (SPPR, Kanwil DIY, Kantah Gunungkidul) sebelumnya banyak yang kosong atau sangat minim (hanya 1–3 baris), serta cakupan leaderboard dan tabel detail belum mengakomodasi kebutuhan komparasi wilayah yang relevan (Kanwil se-Indonesia untuk Kanwil DIY dan Kantah se-DIY untuk Kantah Gunungkidul). | Melakukan pengayaan dataset penuh dan adaptasi label dinamis pada seluruh modul: <br>• **Populasi Data Penuh Seluruh Tabel ($\ge 10$ baris per modul)**: Seluruh tabel pada 4 role (Statistik Derivatif, Statistik Akses IGT, Aktivitas Log dengan timestamp presisi, Statistik IGT, Statistik Provinsi/Kabupaten) kini terisi penuh dengan 10 entri realistis dan kontekstual tanpa data kosong.<br>• **Role Kanwil DIY**: Leaderboard Top 5 dan Tabel Detail menampilkan seluruh **15 Kanwil se-Indonesia** (45 baris IGT) dengan label dinamis **`Kanwil`** (*"Tabel Detail Capaian Renaksi per Kanwil"*). Tab Satker Sering Login turut menampilkan ke-15 Kanwil se-Indonesia.<br>• **Role Kantah Gunungkidul**: Leaderboard Top 5 dan Tabel Detail menampilkan seluruh **5 Kantah se-DIY** (19 baris IGT) dengan label dinamis **`Kantah`** (*"Tabel Detail Capaian Renaksi per Kantah"*). Tab Satker Sering Login turut menampilkan kelima Kantah se-DIY.<br>• **Role Ditjen SPPR**: Mengusung data penuh 6 unit lingkup Ditjen SPPR pada capaian renaksi, aktivitas log, statistik akses, dan layer derivatif spesifik spasial SPPR.<br>• **Penyelarasan View Filter**: Memperbaiki logika filtering `updateStatistikIgtView` sehingga tidak terjadi kekosongan data saat berpindah tab mode (IGT, Provinsi, Kabupaten). |
| 55 | **Aktivasi Visibilitas Seluruh Direktorat Kementerian pada Leaderboard Role SPPR untuk Pacuan Berkompetisi & Badge Pengenal Satker** | Pada role Direktorat SPPR, leaderboard hanya menampilkan unit internal Ditjen SPPR saja sehingga staf/pimpinan SPPR tidak dapat membandingkan capaian kinerjanya secara nasional terhadap direktorat lain di Kementerian ATR/BPN. | Mengaktifkan visibilitas seluruh **19 Direktorat Kementerian ATR/BPN (43 IGT)** pada Leaderboard Top 5 dan Tabel Detail untuk role **Direktorat SPPR (`sppr`)** agar menjadi ajang kompetisi kinerja yang memotivasi: <br>• **Persaingan Capaian Renaksi**: Menampilkan 19 Direktorat terurut rata-rata tertinggi, di mana unit-unit SPPR (Kadastral 94%, Tematik 92.5%, Dasar Pertanahan 92%) bersaing ketat dengan unit kementerian lainnya (Setditjen PHPT 97%, Setditjen PSKP 96%).<br>• **Persaingan Satker Sering Login**: Menampilkan jajaran 12 entitas Pusat/Direktorat Kementerian ATR/BPN.<br>• **Persaingan Pemanfaatan IGT**: Menampilkan seluruh 15 IGT paling sering diakses secara nasional.<br>• **Badge Penanda Semantik Pengguna**: Disematkan badge visual biru elegan `[Unit Anda]` untuk unit SPPR (role SPPR), `[Wilayah Anda]` untuk Kanwil BPN DIY (role Kanwil DIY), dan `[Kantah Anda]` untuk Kantah Gunungkidul (role Kantah GK) di leaderboard atas dan tabel detail bawah.<br>• **Fokus Operasional Internal Terjaga**: Seluruh kartu lainnya (Ringkasan Data Usulan, Kompilasi & Integrasi Bulanan, Statistik Derivatif, Statistik Akses, Aktivitas Log, dan Statistik IGT) tetap terisolasi dan berfokus khusus pada lingkup Ditjen SPPR. |
| 56 | **Penyamaan Tampilan Leaderboard & Tabel Detail Seluruh Role Mengikuti Standar Superadmin** | Format dan cakupan data leaderboard serta tabel detail sebelumnya berbeda-beda antar-role (DIY menampilkan Kanwil se-Indonesia, Gunungkidul menampilkan Kantah se-DIY, dan terdapat badge role pengenal satker). | Menyeragamkan tampilan **Leaderboard (Top 5) beserta Tabel Detail di bawahnya** pada seluruh role (`superadmin`, `sppr`, `kanwil-diy`, dan `kantah-gunungkidul`) 100% identik mengikuti tampilan **Superadmin**: <br>• **Tab 1 (Capaian Renaksi Direktorat)**: Menampilkan seluruh 19 Direktorat Kementerian ATR/BPN (43 Data IGT) dengan penggabungan vertikal `rowspan` dan urutan rata-rata capaian tertinggi.<br>• **Tab 2 (IGT Sering Diakses)**: Menampilkan 15 IGT paling sering diakses secara nasional.<br>• **Tab 3 (Satker Sering Login)**: Menampilkan seluruh 38 Satuan Kerja aktif nasional (Direktorat, Kanwil, Kantah).<br>• **Keseragaman Label & Tipografi**: Subbar info (*"Peringkat Capaian Renaksi per Direktorat"*), tab tombol (*"1. Capaian Renaksi Direktorat"*), header kolom (*"Direktorat"*), dan judul tabel detail (*"Tabel Detail Capaian Renaksi per Direktorat"*) konsisten seragam di semua role tanpa badge pembeda, sementara modul lain (peta, drilldown, filter usulan & log) tetap terisolasi sesuai kewenangan role masing-masing. |
| 57 | **Implementasi Grafik Area Spline Interaktif untuk Modul Statistik Akses IGT dan Aktivitas Log** | Tombol toggle [Grafik] pada kartu Statistik Akses IGT dan Aktivitas Log sebelumnya belum memiliki visualisasi grafik interaktif. | Mengimplementasikan **tampilan grafik area spline (*curved area line chart*) interaktif** persis sesuai tangkapan layar sistem Geoportal: <br>• **Statistik Akses IGT**: Menampilkan kurva spline biru halus (`#2563eb`) dengan isian gradien transparan di atas kisi sumbu 0–600 dan 12 bulan (Jan–Des) dengan puncak di Agustus (415) dan Oktober (525). Dilengkapi legenda *Total Akses Login*, dropdown pemilih metrik (*Akses User*, *Plugin QGIS*, *Geoportal*, *Total Akses*), dan tooltip interaktif saat hover.<br>• **Aktivitas Log**: Menampilkan kurva spline area halus di atas kisi sumbu 0–1.000 dan 12 bulan dengan puncak di Agustus (480) dan Oktober (885), legenda *Total Log*, waveform icon pada baseline, dan tooltip interaktif.<br>• **Pergantian Mulus**: Tombol segmen [Tabel] [Grafik] berganti secara instan, dan grafik tersinkronisasi otomatis saat filter tahun atau role aktif berubah. |
| 58 | **Standardisasi Nomenklatur Role Non-Superadmin sebagai Level Admin (Bukan Operator)** | Profil pengguna dan kartu role non-superadmin sebelumnya menggunakan istilah "Operator" (misal: *Operator Ditjen SPPR*, *Operator Kanwil DIY*, *Operator Kantah GK*). | Mengubah seluruh identitas dan penamaan role non-superadmin menjadi level **Admin**: <br>• **Kartu Sidebar**: Diperbarui menjadi **`2. Admin Direktorat SPPR`** (badge: *Admin Ditjen SPPR*), **`3. Admin Kanwil DIY`** (badge: *Admin Kanwil*), dan **`4. Admin Kantah Gunung Kidul`** (badge: *Admin Kantah*).<br>• **Profil Footer Sidebar & Topbar**: Tersinkronisasi dinamis menjadi *Admin Ditjen SPPR* (*Admin Direktorat SPPR*), *Admin Kanwil DIY* (*Admin Kanwil BPN D.I. Yogyakarta*), dan *Admin Kantah GK* (*Admin Kantah Kab. Gunungkidul*).<br>• **Pemisahan Peran**: Membedakan hak akses tingkat Administrator satker/kantor pertanahan dengan peran Operator teknis lapangan yang akan memiliki tampilan antarmuka tersendiri secara terpisah di tahap pengembangan mendatang.<br>• **Pembaruan Audit Trail**: Menyelaraskan entitas pengguna pada log aktivitas regional sesuai status administratifnya. |

---

## 🔍 Rincian Perubahan per Komponen

### 1. Interaktivitas Peta Spasial (Hero Map)
- **Alur Drill-down 3 Tingkat**:
  - **Level 1 (Nasional)**: Menampilkan 38 provinsi dengan shading tematik sesuai sebaran capaian IGT. Hover tooltip menampilkan nama provinsi dan jumlah tema terintegrasi.
  - **Level 2 (Provinsi)**: Mengklik provinsi (misal: *Jawa Tengah*, *Bali*, *Jawa Barat*, dll.) akan memperbesar peta dan merender batas seluruh kabupaten/kota di dalam provinsi tersebut. Dropdown wilayah secara otomatis beralih memuat daftar kabupaten di provinsi tersebut.
  - **Level 3 (Kabupaten/Kota)**: Mengklik kabupaten/kota (misal: *Kota Surakarta*, *Kab. Semarang*, dll.) akan memusatkan poligon kabupaten tersebut dengan highlight biru tebal dan memfilter data tema spesifik wilayah tersebut.
- **Navigasi Kembali (*Breadcrumb & Back Button*)**:
  - Menyediakan tombol *“Kembali ke [Nama Provinsi]”* di kartu detail informasi dan breadcrumb interaktif di bagian kiri atas peta.
  - Tombol tutup kartu di level provinsi mengembalikan peta ke pandangan *Seluruh Indonesia*.

### 2. Standardisasi Data Geospasial & Rekayasa Topologi
- **Script Generator Mandiri**: [`build_topological_map.py`](build_topological_map.py)
  - Dibangun dari nol menggunakan Python, `osgeo.ogr` (GDAL), dan GEOS/`shapely`.
  - Mengonversi data asli dari:
    - `shp/batas_kabupaten_kota_shapefile/batas_kabupaten_kota.shp` (817 MB, >50 juta titik simpul).
  - Menghasilkan 4 berkas keluaran optimal:
    1. [`assets/data/indonesia-kabupaten.geojson`](assets/data/indonesia-kabupaten.geojson) (**3.79 MB**, 520 kabupaten/kota)
    2. [`assets/data/indonesia-provinsi.geojson`](assets/data/indonesia-provinsi.geojson) (**2.05 MB**, 38 provinsi)
    3. [`assets/data/indonesia-kabupaten.js`](assets/data/indonesia-kabupaten.js) (wrapper JavaScript untuk browser)
    4. [`assets/data/indonesia-provinsi.js`](assets/data/indonesia-provinsi.js) (wrapper JavaScript untuk browser)
- **Jaminan Kualitas Topologi (Zero Gap & Zero Overlap)**:
  - Menggunakan algoritma penyederhanaan topologi poligon (*Visvalingam-Whyatt Coverage Simplification* via `shapely.coverage_simplify` toleransi `0.0025`).
  - Seluruh batas bersama (*shared boundary*) antarkabupaten yang bersebelahan disederhanakan sebagai satu garis yang sama, menjamin **tidak ada celah (*gap*) maupun tumpang tindih (*overlap*)**.
  - Batas provinsi dihasilkan langsung dari proses *dissolve/union* (`shapely.unary_union`) dari seluruh poligon kabupaten penyusunnya, sehingga batas luar kabupaten berimpit 100% presisi dengan batas provinsi.
  - Pembersihan pulau-pulau karang mikro tak berpenghuni (< 5e-5 derajat persegi) dan pembulatan koordinat 4 desimal (~11 meter) menghasilkan reduksi ukuran berkas hingga **>99.5%**, memungkinkan pemuatan peta instan pada browser tanpa lag.

### 3. Kartu Detail Informasi & Alat Kontrol
- **Buka Default pada Level Nasional**:
  - Kartu informasi langsung terbuka di sisi kiri saat aplikasi pertama kali dimuat, memuat ringkasan capaian nasional (14 tema).
  - Tombol **“Detail Informasi”** disematkan pada hero header untuk membuka kembali kartu jika ditutup oleh pengguna.
- **Dropdown Wilayah Terpadu**:
  - Menggantikan elemen select lama `#beranda-detail-igt` menjadi `#beranda-detail-wilayah-pilih`.
  - Berfungsi ganda: memilih provinsi saat berada di level nasional, dan memilih kabupaten saat berada di level provinsi.
- **Penyesuaian Tata Letak Toolbar Filter**:
  - Wadah toolbar kartu detail (`.igt-detail__alat`) mengusung tata letak *single-row* dengan proporsi:
    - Searchbar: `flex: 1 1 115px` (maks. `145px`).
    - Pilih Jenis IGT: `120px`.
    - Pilih Provinsi / Kabupaten: `120px`.
    - Tahun Renaksi: `128px`.
  - Seluruh elemen berjejer rapi dalam 1 baris tanpa terpotong dan tanpa merusak estetika antarmuka.

### 4. Taksonomi IGT (Pertanahan & Tata Ruang)
- Disesuaikan dengan daftar resmi **39 IGT Dasar**:
  - **IGT Pertanahan** (29 Tema, Biru `#2563eb`): Bidang Tanah, Hak Atas Tanah, Sebaran Lokasi Pemberdayaan Tanah Masyarakat, Lahan Baku Sawah, Lahan Sawah Dilindungi, Zona Nilai Tanah, Neraca Penatagunaan Tanah, dsb.
  - **IGT Tata Ruang** (10 Tema, Hijau Emerald `#059669`): RTRW Nasional, RTRW Provinsi, RTRW Kabupaten, RDTR Kabupaten/Kota, RDTR Kawasan Perbatasan Negara, dsb.
- Penyesuaian diterapkan pada:
  - Legenda badge kartu Detail Informasi.
  - Pewarnaan chips tag IGT.
  - Filter dropdown Jenis IGT di Hero Toolbar dan Detail Card.
  - Legenda Leader Board Direktorat di bagian bawah dashboard.

### 5. Pembatasan & Penamaan Filter Tahun Renaksi
- **Rentang Tahun**:
  - Seluruh dropdown tahun pada dashboard dibatasi ketat pada tahun **2023, 2024, 2025, 2026**.
  - Opsi di luar rentang tersebut telah dieliminasi.
- **Penamaan Label**:
  - Opsi default pada dropdown tahun di kartu detail diubah dari `"Pilih Tahun"` menjadi **`"Tahun Renaksi"`**.
  - Memilih "Tahun Renaksi" akan menampilkan kembali semua data tahun (fungsi *reset filter*).

### 6. Penyederhanaan Toolbar Hero (Eliminasi Filter Kanan Atas)
- **Penghapusan Tombol & Modal Filter Redundan**:
  - Tombol `#beranda-filter-toggle` dan modal popup `#beranda-filter` di sisi kanan atas hero banner telah dihapus secara menyeluruh dari markup HTML, file skrip (`mockup-app.js`), dan CSS.
  - Alasan: Seluruh fungsi penyaringan (Pencarian, Jenis IGT Pertanahan/Tata Ruang, Wilayah Provinsi/Kabupaten, dan Tahun Renaksi 2023–2026) sudah tersedia secara terpadu dan interaktif pada kartu *Detail Informasi* di sisi kiri.
  - Saat kartu *Detail Informasi* ditutup, hero section di sebelah kanan hanya menampilkan tombol minimalis **"Detail Informasi"** untuk membuka kembali kartu tanpa elemen redundan lainnya.

### 7. Penyesuaian Spasi Vertikal Popup Detail Informasi
- **Pelegaan Margin Atas Kartu Popup**:
  - Mengubah properti CSS `.igt-detail` dari `top: 64px` menjadi `top: 92px`.
  - Mengubah batas ketinggian maksimum (`max-height`) dari `calc(100% - 72px)` menjadi `calc(100% - 108px)`.
  - Hasil: Menghilangkan tabrakan/overlap sebelumnya, memberikan jarak vertikal lega sebesar **+24px** di bawah teks sapaan *"Hai, Internal IGT 👋"*, serta menjaga proporsi kartu tetap seimbang di atas kanvas peta.

### 8. Peningkatan Visual Kartu Ringkasan (Usulan Input Data & Kompilasi Integrasi)
- **Pembesaran Angka Metrik Utama**:
  - Ukuran font angka metrik utama (`#status-data-total` **98** dan `#integrasi-kompilasi-terkompilasi` **14**) dinaikkan dari `40px` (font-weight 500) menjadi **`58px` (font-weight 700, line-height 1)**.
  - Penyelarasan label unit (`data` dan `Layer IGT`) diatur baseline-nya agar menyatu rapi dan sejajar di samping angka besar.
- **Penyempitan Jarak Judul & Angka**:
  - Menghapus aturan lama `justify-content: space-between` dan `gap: 46px` pada `.igt-panel__atas`, digantikan dengan `justify-content: flex-start` dan `gap: 14px`.
  - Menghilangkan `min-height: 182px` yang sebelumnya memicu ruang kosong berlebih.
  - Hasil: Judul kartu dan angka capaian kini berada dalam satu kelompok visual yang dekat, rapi, dan mudah dibaca.

### 9. Penyelarasan Warna Status Antar-Kartu Ringkasan
- **Harmonisasi Warna Status Terkompilasi & Terintegrasi**:
  - Pada kartu **Usulan Input Data**, warna status diselaraskan dengan kartu **Kompilasi Integrasi**:
    - **Terkompilasi**: Diubah dari biru pucat (`#e0f2fe`) / cyan (`#0ea5e9`) menjadi **soft blue (`#93c5fd`)** dengan tekstur garis halus, identik dengan warna *Layer Terkompilasi*.
    - **Terintegrasi**: Diubah dari warna hijau (`#dcfce7` / `#16a34a`) menjadi **royal blue (`#1d4ed8`)** dengan gradasi elegan, identik dengan warna *Layer Terintegrasi*.
  - Perubahan diterapkan pada ruas bilah kemajuan (`.igt-progres__ruas`) dan titik indikator status (`.igt-rincian__titik`).
  - Hasil: Menghilangkan inkonsistensi warna dan menyatukan bahasa visual kedua kartu ringkasan secara utuh dan serasi.

### 10. Pengurutan Kategori pada Grafik Usulan Input Data
- **Restrukturisasi Urutan Status**:
  - Urutan kategori pada kartu **Usulan Input Data** disesuaikan mengikuti instruksi alur tahapan data:
    1. **Terintegrasi** (26 data, royal blue `#1d4ed8` dengan gradasi elegan)
    2. **Terkompilasi** (7 data, soft sky blue `#93c5fd` dengan garis halus)
    3. **Terupload** (65 data, cerulean blue `#1860a9`/`#2f8ce4` dengan garis diagonal)
    4. **Revisi Perbaikan** (0 data, amber `#fef3c7`/`#f59e0b`)
  - Perubahan diterapkan menyeluruh pada:
    - Data store [`dummy-data.js`](assets/js/dummy-data.js) (tingkat nasional, provinsi, dan kabupaten).
    - Renderer bilah kemajuan di [`mockup-app.js`](assets/js/mockup-app.js) dengan injeksi kelas dinamis pada setiap ruas `.igt-progres__ruas`.
    - Styling CSS di [`assets/css/igt-components.css`](assets/css/igt-components.css) dan tag `<style>` di [`index.html`](index.html).
  - Hasil: Grafik bilah kemajuan dan grid rincian menampilkan status *Terintegrasi* di posisi pertama, diikuti *Terkompilasi*, *Terupload*, dan *Revisi Perbaikan*.

### 11. Skema Warna Pastel untuk Status Terupload & Revisi Perbaikan
- **Pembaruan Warna Pastel Modern**:
  - **Terupload**: Diubah menjadi **hijau pastel** (ruas bar: `#86efac` dengan gradasi linear ke `#4ade80` dan tekstur diagonal halus; titik indikator rincian: `#4ade80`).
  - **Revisi Perbaikan**: Diubah menjadi **merah pastel** (ruas bar: `#fecaca` dengan gradasi linear ke `#fca5a5` dan tekstur diagonal halus; titik indikator rincian: `#f87171`).
  - Diterapkan pada file stylesheet [`assets/css/igt-components.css`](assets/css/igt-components.css) dan tag `<style>` di [`index.html`](index.html).
  - Hasil: Warna status memiliki kontras semantik yang sangat jelas (merah = revisi, hijau = terupload, biru muda = terkompilasi, biru tua = terintegrasi) dalam nuansa pastel yang lembut dan selaras dengan tema UI dashboard.

### 12. Penyesuaian Ruas Bar Tipis untuk Kategori Bernilai 0
- **Logika Ruas Khusus `.is-nol`**:
  - Ketika suatu kategori memiliki jumlah data `0` (seperti *Revisi Perbaikan* pada tingkat nasional dengan 0 data), ruas bilah kemajuan sebelumnya tertahan pada `min-width: 24px`, menyebabkan kesan visual seolah-olah memiliki bobot yang signifikan.
  - Diperbaiki pada renderer [`assets/js/mockup-app.js`](assets/js/mockup-app.js) dengan menyematkan kelas `.is-nol` dan properti `flex-grow: 0; min-width: 4px; width: 4px;`.
  - Ditata secara visual melalui CSS dengan lebar ultra-tipis **4px**, sudut lengkung `border-radius: 2px`, dan warna merah solid aksen (`#f87171`).
  - Hasil: Kategori bernilai 0 tetap terwakili secara elegan di ujung grafik sebagai aksen tipis tanpa mengaburkan skala proporsional kategori yang memiliki data.

### 13. Penyederhanaan Warna Solid pada Ruas Terupload & Revisi
- **Penghapusan Pola Garis Selang-seling**:
  - Menghapus pola garis diagonal (`repeating-linear-gradient`) dan efek bayangan ganda pada ruas *Terupload* dan *Revisi Perbaikan*.
  - Menetapkan warna polos/solid murni:
    - **Terupload**: `#86efac` (solid pastel green, `background-image: none; box-shadow: none;`)
    - **Revisi Perbaikan**: `#fca5a5` / `#f87171` (solid pastel red, `background-image: none; box-shadow: none;`)
  - Pola tekstur garis diagonal selang-seling kini hanya digunakan secara eksklusif pada ruas *Terintegrasi* (`#1d4ed8`) dan *Terkompilasi* (`#93c5fd`), sehingga korelasi visual dengan kartu *Kompilasi Integrasi* di sebelah kanan menjadi jauh lebih konsisten dan kontrasnya jelas.

### 14. Integrasi Metrik Jumlah Layer pada Kartu Usulan Input Data
- **Struktur Tampilan Ganda (Data & Layer)**:
  - **Angka Metrik Utama Header**: Menampilkan rasio komprehensif data dan layer: `<strong id="status-data-total">98</strong><span>data</span> <span class="igt-panel__pemisah">/</span> <strong id="status-data-total-layer">30</strong><span>layer</span>`.
  - **Grid Rincian Status per Kategori**:
    1. **Terintegrasi**: `26 data / 14 layer`
    2. **Terkompilasi**: `7 data / 4 layer`
    3. **Terupload**: `65 data / 12 layer`
    4. **Revisi Perbaikan**: `0 data / 0 layer`
  - **Tooltip Bilah Progres**: Setiap ruas bilah kemajuan menyematkan atribut `title` lengkap, contoh: *"Terintegrasi: 26 data / 14 layer"*.
  - **Dinamika Multi-Level**: Diterapkan secara reaktif pada data store dummy untuk seluruh tingkatan wilayah (Nasional, Provinsi, dan Kabupaten/Kota), sehingga saat pengguna melakukan penjelajahan wilayah (drill-down), jumlah data dan layernya terkalkulasi secara sinkron dan otomatis.

### 15. Interaktivitas Modal Tabel Usulan Input Data (Clickable Bar & Angka)
- **Mekanisme Pemicu Interaktif (*Clickable Triggers*)**:
  - **Klik Angka Total (`98 data / 30 layer`)**: Membuka modal pop-up tabel dengan tab default **"Semua (98)"**, menampilkan seluruh 98 usulan data dari semua status tanpa batasan filter.
  - **Klik Ruas Bilah Kemajuan (*Progress Bar Segment*)**: Mengklik salah satu ruas bilah kemajuan (misal: ruas hijau solid *Terupload*, ruas biru gelap *Terintegrasi*, dsb.) langsung membuka modal dalam keadaan **terfilter otomatis** sesuai status ruas tersebut.
  - **Klik Angka / Teks Rincian Kategori**: Mengklik salah satu item dari 4 kategori rincian di bawah grafik (misal: *26 data / 14 layer Terintegrasi*) membuka modal pop-up dengan filter status aktif yang bersesuaian.
  - **Indikator Kursor & Hover**: Elemen angka total, ruas bilah kemajuan, dan rincian status diberi gaya kursor `pointer` dan transisi hover yang responsif untuk mengindikasikan interaktivitas.
- **Tab Navigasi Filter di Header Modal**:
  - Modal dilengkapi tab filter interaktif di sisi atas:
    - **Semua (98)**: Menampilkan seluruh data usulan.
    - **Terintegrasi (26)**: Menampilkan usulan yang telah selesai terintegrasi ke geoportal.
    - **Terkompilasi (7)**: Menampilkan data yang telah lolos tahap kompilasi data spasial.
    - **Terupload (65)**: Menampilkan data yang baru diunggah oleh unit kerja terkait.
    - **Revisi Perbaikan (0)**: Menampilkan data yang membutuhkan perbaikan geometrik/atribut.
  - Pengguna dapat beralih antar-status secara instan tanpa perlu menutup dan membuka ulang modal.
- **Struktur Tabel Standar (9 Kolom Lengkap Sesuai Desain Asli)**:
  1. **Nama Direktorat**: Menampilkan instansi / direktorat pengusul (misal: *Direktorat Pengaturan Tanah Pemerintah...*, *Kantor Wilayah BPN Provinsi D.I. Yogyakarta*, dll.).
  2. **Nama IGT**: Nama layer tematik (misal: *Bidang Tanah*, *Batas Kawasan*, dll.).
  3. **Jenis Data**: Format berkas geospasial (*SHP*).
  4. **Tanggal Upload**: Format tanggal unggah `DD/MM/YYYY`.
  5. **Tanggal Terintegrasi**: Format tanggal integrasi `DD/MM/YYYY` (atau tanda `-` jika status belum terintegrasi).
  6. **Keterangan**: Nama arsip zip atau catatan revisi pengusul (misal: *test beda direktorat*, *REVISI 1908*, *test ke 2 BIDANG_PERSIL_DIY_ATR_LKP.zip*, dll.).
  7. **Status**: Badge visual dengan palet warna selaras (*Terintegrasi* = biru tua, *Terkompilasi* = biru muda, *Terupload* = hijau pastel, *Revisi* = merah pastel).
  8. **Aksi**: 5 tombol tindakan cepat dengan tooltip:
     - 🔍 *Detail*: Melihat ringkasan data dan atribut.
     - 🕒 *Riwayat*: Melacak log histori perubahan status dan perbaikan.
     - 🗑 *Hapus*: Opsi pembatalan/penghapusan usulan.
     - ☁ *Metadata Geospasial*: Membuka dialog pratinjau layer spasial.
     - ✎ *Edit*: Memperbarui metadata atau deskripsi usulan.
  9. **Download**: 2 tombol unduh berkas:
     - 📄 *Download SHP/ZIP*: Mengunduh paket data shapefile geospasial.
     - 🔗 *Salin Tautan / Layanan Web*: Mengakses endpoint geoservice/WMS terkait.
- **Fitur Kontrol Pencarian, Paginasi & Aksesibilitas**:
  - **Pencarian Realtime**: Input teks pencarian di pojok kanan atas modal yang menyaring baris tabel secara instan berdasarkan nama direktorat, nama IGT, keterangan, maupun tanggal.
  - **Pilihan Entri per Halaman**: Dropdown fleksibel untuk menampilkan 10, 25, 50, atau 100 baris per halaman.
  - **Paginasi Dinamis**: Menampilkan teks informasi entri (`Showing 1 to 10 of 98 entries`) dan tombol navigasi halaman (*Previous*, *1*, *2*, ... *Next*).
  - **Aksesibilitas Penutupan**: Modal dapat ditutup dengan mengklik tombol silang (✕) di kanan atas, tombol *Tutup* di footer, mengklik area di luar kotak modal (*backdrop click*), atau menekan tombol keyboard `Escape`.
- **Integrasi Kontekstual Wilayah (*Spatial Drill-down Context*)**:
  - Modal secara cerdas membaca konteks wilayah yang sedang aktif (`currentProvince` dan `currentKabupaten`).
  - Bila pengguna sedang berada pada tingkat Nasional, modal menampilkan 98 data nasional.
  - Bila pengguna sedang membuka detail provinsi tertentu (misal: Jawa Tengah), modal secara proporsional menampilkan usulan data untuk wilayah provinsi tersebut.

### 16. Filter Tahun Responsif pada Usulan Input Data
- **Responsivitas Fungsional Multilevel (*Dynamic Data Filtering*)**:
  - Pilihan filter tahun renaksi pada kartu Usulan Input Data mencakup: **Semua Tahun (`all`)**, **2026**, **2025**, **2024**, dan **2023**.
  - Mengubah dropdown tahun secara realtime memperbarui:
    1. **Angka Metrik Utama**: Rasio kuantitas data dan layer IGT.
    2. **Bilah Kemajuan (*Progress Bar*)**: Proporsi panjang segmen bar sesuai persentase kategori di tahun terkait.
    3. **Grid Rincian Status**: Kuantitas data/layer per kategori dan teks log pembaruan.
  - **Distribusi Data Konsisten & Terpartisi Presisi**:
    - **Semua Tahun (`all`)**: Total **`98 data / 30 layer`** (Terintegrasi: 26, Terkompilasi: 7, Terupload: 65, Revisi: 0).
    - **Tahun 2026**: Total **`48 data / 20 layer`** (Terintegrasi: 14, Terkompilasi: 4, Terupload: 30, Revisi: 0).
    - **Tahun 2025**: Total **`28 data / 16 layer`** (Terintegrasi: 8, Terkompilasi: 2, Terupload: 18, Revisi: 0).
    - **Tahun 2024**: Total **`15 data / 9 layer`** (Terintegrasi: 3, Terkompilasi: 1, Terupload: 11, Revisi: 0).
    - **Tahun 2023**: Total **`7 data / 5 layer`** (Terintegrasi: 1, Terkompilasi: 0, Terupload: 6, Revisi: 0).
    - Pada tahun 2023 di mana kategori *Terkompilasi* bernilai 0 dan *Revisi Perbaikan* bernilai 0, kedua kategori ditangani otomatis oleh kelas `.is-nol` (ruas garis tipis 4px warna aksen).
- **Sinkronisasi Dua Arah (*Two-Way Synchronization*) Modal Pop-up**:
  - Saat modal pop-up dibuka ketika filter tahun aktif (misal tahun 2026), modal langsung memfilter daftar data hanya untuk usulan tahun 2026, disertai indikator badge **`Tahun 2026`** di samping nama wilayah.
  - Modal pop-up dilengkapi dropdown **Tahun Renaksi** di area toolbar kiri. Mengubah tahun dari dalam modal langsung memfilter ulang tabel dan tab hitungan, sekaligus menyinkronkan pilihan tahun dan metrik kartu di dashboard utama.
- **Responsivitas Antarmuka Pengguna (*CSS Responsive Layout*)**:
  - Kontainer angka dan dropdown (`.igt-panel__angka`) menggunakan tata letak `flex-wrap: wrap; row-gap: 10px;` sehingga filter tahun tidak terhimpit atau memotong teks metrik utama saat ukuran jendela menyempit.
  - Tombol dropdown `.igt-pilih` diberi efek hover dan focus state elegan (`box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12)`).
  - Pada layar sempit/mobile (`<= 640px`), tata letak kartu secara responsif beralih menjadi susunan kolom vertikal dengan ukuran font metrik yang proporsional (42px) tanpa ada elemen yang terpotong.

### 17. Sinkronisasi Terpusat Filter Tahun Renaksi (Dekat Peta ke Seluruh Komponen Bawah)
- **Pengendali Terpusat (*Centralized State Controller*)**:
  - Mengintegrasikan dropdown tahun pada kartu *Detail Informasi* di kiri atas dekat peta (`#beranda-detail-tahun`) sebagai master filter renaksi global (`currentDashboardYear`).
  - Label opsi default diubah dari *"Tahun Renaksi"* menjadi **"Semua Tahun"** (`value="all"`), menyelaraskan bahasa visual di seluruh kartu dashboard.
- **Konektivitas Menyeluruh ke Komponen Bawah**:
  - Mengubah opsi tahun pada filter dekat peta secara instan memfilter seluruh blok data di bawahnya:
    1. **Usulan Input Data**: Memperbarui kuantitas data/layer, persentase ruas bilah kemajuan, dan rincian 4 status data.
    2. **Kompilasi Integrasi**: Memperbarui capaian total layer IGT (misal: 14 layer di 2026, 10 layer di 2025, 6 layer di 2024, 3 layer di 2023) dan merender grafik diagram batang bulanan secara dinamis (`getKompilasiIntegrasi`).
    3. **Statistik IGT**: Menyesuaikan jumlah tema dan kuantitas sebaran spasial bidang/luas yang terintegrasi pada tahun terkait.
    4. **Leader Board**: Menyusun peringkat unit kerja dan jumlah pemenuhan tema IGT yang relevan untuk tahun renaksi terkait.
    5. **Capaian Renaksi**: Menghitung rasio target dan capaian unit kerja sesuai performa tahun yang dipilih (misal tahun 2023–2024 memiliki tingkat realisasi capaian yang lebih matang).
    6. **Aktivitas Terkini (Log Histori)**: Menyelaraskan stempel tanggal aktivitas log agar sesuai dengan tahun yang sedang aktif.
    7. **Modal Pop-up Usulan Data**: Otomatis tersinkronisasi saat dibuka, menampilkan badge tahun yang sesuai dan menyaring data tabel modal.
- **Sinkronisasi Dua Arah (*Bidirectional Sync*)**:
  - Menyediakan event listener lintas kontrol: jika pengguna mengubah tahun melalui kartu *Usulan Input Data*, kartu *Kompilasi Integrasi*, kartu *Leader Board*, maupun dari dalam modal pop-up, dropdown master `#beranda-detail-tahun` di dekat peta ikut tersinkronisasi secara otomatis, menjaga konsistensi state di seluruh antarmuka aplikasi.

### 18. Pembaruan Palet Warna Usulan Input Data (Terupload 30% Saturation Blue & Revisi 10% Saturation Red)
- **Status Terupload**:
  - Mengikuti rumpun rona warna biru (*blue hue* ~217°) yang sama dengan status *Terintegrasi* (`#1d4ed8`) dan *Terkompilasi* (`#93c5fd`).
  - Diterapkan tingkat kejenuhan (*saturation*) **30%** dengan format solid polos tanpa corak diagonal:
    - Ruas Bar Progres: `hsl(217, 30%, 75%)` (`#adc0d6`), `background-image: none; box-shadow: none;`
    - Titik Rincian Status: `hsl(217, 30%, 60%)` (`#7b94b7`)
    - Badge Status Modal: `hsl(217, 30%, 88%)` dengan warna teks `hsl(217, 35%, 28%)`
    - Tab Modal Aktif: `#5b7396` dengan teks putih.
- **Status Revisi Perbaikan**:
  - Menggunakan rona merah terang (*bright red base hue* 0°) dengan tingkat kejenuhan (*saturation*) **10%**:
    - Ruas Bar Progres (> 0 data): `hsl(0, 10%, 80%)` (`#d1c7c7`), solid polos tanpa corak diagonal.
    - Ruas Bar Progres (0 data): penanda tipis 4px `hsl(0, 10%, 65%)` (`#aba4a4`).
    - Titik Rincian Status: `hsl(0, 10%, 60%)` (`#a38f8f`).
    - Badge Status Modal: `hsl(0, 10%, 88%)` dengan warna teks `hsl(0, 15%, 28%)`.
    - Tab Modal Aktif: `#857272` dengan teks putih.
- **Konsistensi Visual**: Menjaga hirarki visual dashboard tetap tenang, elegan, dan profesional, di mana status *Terupload* menyatu dalam spektrum biru data terinput, sementara status *Revisi* tampil lembut tanpa menimbulkan kesan alarmist yang mencolok.

### 19. Interaktivitas Kompilasi Integrasi & Modal Akordion IGT (Clickable Metric & Monthly Bars)
- **Elemen Pemicu Klik (*Click Triggers*)**:
  - **Angka Metrik Utama (`#integrasi-kompilasi-klik-angka`)**: Mengklik angka 14 atau teks *"Layer IGT"* membuka modal pop-up yang menyajikan seluruh 14 Layer IGT (status *all* / Semua Bulan).
  - **Ruas Bar Grafik Bulanan (`.igt-tumpuk__ruas.is-clickable`)**:
    - **Terintegrasi (Royal Blue)**: Mengklik ruas bar *Terintegrasi* pada bulan tertentu (misal: **April**) membuka modal yang terfilter khusus menampilkan layer IGT yang sudah terintegrasi secara **kumulatif dari bulan Januari hingga April** (3 layer: *Bidang Tanah*, *Hak Atas Tanah*, *Zona Nilai Tanah*).
    - **Terkompilasi (Soft Blue)**: Mengklik ruas bar *Terkompilasi* pada bulan tertentu (misal: **April**) membuka modal yang terfilter khusus menampilkan layer IGT yang sudah terkompilasi dari bulan Januari hingga April (1 layer: *RDTR Kabupaten/Kota*).
    - Bulan-bulan lainnya (misal: Agustus menambah *Inventarisasi Tanah Kritis*, Oktober mencapai 11 layer terintegrasi) bereaksi secara kumulatif persis sesuai visualisasi bar chart.
  - **Kolom & Label Bulan (JAN–DES)**: Mengklik kolom maupun teks singkatan bulan membuka modal kumulatif s.d. bulan tersebut.
  - **Item Legenda**: Mengklik legenda *"Layer Terintegrasi"* atau *"Layer Terkompilasi"* membuka modal terfilter status terkait secara menyeluruh.
- **Tampilan Antarmuka Modal Akordion IGT (`#modal-kompilasi-data`)**:
  - Didesain secara presisi mengikuti referensi modul Kompilasi & Integrasi Data Geoportal:
    - **Header Akordion**: Memuat nama IGT (tebal), baris metadata (`Data Belum Diproses: X` [merah], `Target: Y` [biru], `Realisasi: Z` [hijau], `Satuan: ...`), indikator persentase ketercapaian, bilah kemajuan (*progress bar*) dengan pewarnaan dinamis (merah $\le 30\%$, kuning/oranye $\le 75\%$, hijau $> 75\%$), serta ikon panah (*chevron*).
    - **Efek Aktif (*Focus Border*)**: Item yang sedang dibuka/diperluas diberi highlight bingkai biru lembut (`border: 1px solid #93c5fd; box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.35);`).
    - **Badan Akordion (*Expandable Subtable*)**: Saat baris akordion diklik, terbuka tabel rincian data spasial untuk tema tersebut (Nama Direktorat, Jenis Data, Tanggal Upload, Tanggal Integrasi/Kompilasi, Keterangan, Status badge, Tombol Aksi Lihat/Riwayat/Cloud, dan Tombol Download SHP).
  - **Alat Kontrol Modal**:
    - Filter Periode Bulan (*select dropdown*: Jan s.d. Des atau Semua Bulan).
    - Filter Tahun Renaksi (tersinkronisasi dua arah dengan dashboard).
    - Pencarian teks instan (*live search*) terhadap nama tema IGT.
    - Tab navigasi filter (*Semua*, *Terintegrasi*, *Terkompilasi*).

### 20. Penambahan Kolom Nomor Urut (No) di Paling Kiri Seluruh Tabel
- **Cakupan Penambahan Kolom**:
  1. **Tabel Statistik IGT (`#statistik-igt-tabel`)**: Kolom `<th class="igt-table__no">No</th>` diletakkan di paling kiri sebelum kolom centang (*checkbox*). Baris bernomor urut sesuai posisi halaman.
  2. **Tabel Capaian Renaksi (`#capaian-renaksi-tabel`)**: Kolom `No` di paling kiri sebelum kolom centang.
  3. **Tabel Statistik Derivatif (`#statistik-derivatif-tabel`)**: Kolom `No` di paling kiri sebelum kolom centang.
  4. **Tabel Statistik Akses IGT (`#statistik-akses-tabel`)**: Kolom `No` di paling kiri sebelum kolom centang.
  5. **Tabel Log Aktivitas Terkini (`#aktivitas-log-tabel`)**: Kolom `No` di paling kiri sebelum kolom centang.
  6. **Tabel Pop-up Usulan Input Data (`#modal-usulan-table`)**: Kolom `<th class="igt-modal-table__no">No</th>` di paling kiri sebelum kolom `Nama Direktorat`.
  7. **Subtabel Akordion Kompilasi & Integrasi Data (`#modal-kompilasi-accordion .igt-modal-table`)**: Kolom `No` di paling kiri pada rincian berkas data spasial yang dapat diperluas (*expandable dataset*).
- **Logika Penomoran & Paginasi Presisi**:
  - Penomoran baris dihitung secara dinamis berbasis indeks halaman: `(currentPage - 1) * perPage + idx + 1`.
  - Pada halaman 1 per page 10: nomor urut **1 s.d. 10**.
  - Pada halaman 2: berlanjut otomatis menjadi **11 s.d. 20**, halaman 3: **21 s.d. 30**, dst.
  - Pada saat tabel diurutkan (*sorting*) atau disaring (*filtering* / *search*), nomor urut tetap tersusun rapi dari 1 hingga jumlah baris yang tampil pada halaman tersebut.
- **Penyelarasan Desain & Spasial (CSS Styling)**:
  - Header dan sel nomor diatur rata tengah (`text-align: center !important`) dengan lebar proporsional (`width: 48px; min-width: 48px;`).
  - Diberikan styling tipografi elegan (`font-weight: 500; color: #64748b; font-size: 13-14px` pada dashboard dan `12-12.5px` pada modal pop-up), menyatu sempurna dengan estetika antarmuka Geoportal IGT.
  - Nilai `colspan` pada baris pesan kosong (*empty state*) pada seluruh tabel disesuaikan secara akurat (+1) agar tetap merentang penuh ke seluruh lebar tabel.

### 21. Penghapusan Ikon Info (Tanda "i") di Kanan Atas Kartu Ringkasan
- **Elemen yang Dihapus**:
  - Tag `<img>` penanda informasi (`#status-data-info` dan `#integrasi-kompilasi-info`) yang merender berkas ikon `assets/img/icons/info.svg`.
- **Lokasi Pembersihan**:
  - Header kartu *Usulan Input Data* (`#status-data .igt-panel__kepala`).
  - Header kartu *Kompilasi Integrasi* (`#integrasi-kompilasi .igt-panel__kepala`).
- **Penyelarasan Tata Letak**:
  - Diterapkan `display: none !important;` pada selector `.igt-panel__info` di `assets/css/igt-components.css` sebagai mitigasi keamanan tampilan.
  - Judul kartu ringkasan kini tampil lugas dan proporsional tanpa elemen ornamen visual yang tidak diperlukan.

### 22. Penghapusan Kolom Kotak-kotak (Checkbox) pada Tabel Statistik IGT
- **Latar Belakang**: Pada tangkapan layar referensi UI Geoportal IGT asli, tabel Statistik IGT tidak menggunakan kolom kotak centang (*checkbox*). Kolom tersebut sebelumnya muncul di antara kolom `No` dan `IGT`.
- **Perubahan yang Diterapkan**:
  - Menghapus `<th class="igt-table__check is-plain"><img src="assets/img/icons/check-square.svg" alt=""></th>` dari `<thead>` tabel Statistik IGT (`#statistik-igt-tabel`).
  - Memperbarui fungsi `renderTable(ctrl)` di `assets/js/mockup-app.js` agar secara dinamis mendeteksi keberadaan elemen header `th.igt-table__check` (`var hasCheck = $container.find('thead th.igt-table__check').length > 0;`).
  - Jika tabel tidak memiliki header centang, kolom sel `<td class="igt-table__check">` otomatis ditiadakan dan perhitungan `colspan` pesan data kosong disesuaikan secara presisi (`ctrl.columns.length + 1`).
- **Hasil Tampilan**: Tabel Statistik IGT kini langsung menyajikan urutan kolom: **No**, **IGT**, **Provinsi**, **Kabupaten**, **Bidang**, dan **Luas (Ha)**, menghasilkan visual tabel yang bersih, lega, dan elegan.

### 23. Implementasi Tampilan Grafik Statistik IGT (Clustered Column Chart)
- **Desain & Kesesuaian Referensi**:
  - Mengimplementasikan visualisasi grafik batang bergugus (*grouped / clustered column chart*) pada `#statistik-igt-grafik` sesuai tangkapan layar antarmuka asli Geoportal IGT.
  - **Sub-toolbar & Legenda**:
    - Legenda warna: lingkaran titik cyan `#68b6db` (*Jumlah Data Provinsi*) dan biru periwinkle `#6793db` (*Jumlah Data Kabupaten*).
    - Tombol dropdown bentuk pil rounded: *Data Berdasarkan Administrasi* (dapat dipilih untuk melihat *Administrasi*, *Jumlah Bidang*, maupun *Luas (Ha)*).
  - **Grid & Kisi Grafik**:
    - Skala sumbu Y dari 0 s.d. 8 dengan kelipatan 2 (0, 2, 4, 6, 8) dan label teks abu-abu lembut (`#94a3b8`).
    - Garis kisi (*grid line*) horizontal tipis di setiap kelipatan nilai, dan garis kisi vertikal tipis pembatas antartema (`#f1f5f9`).
    - Ikon mini visualisasi garis/gelombang di sisi kiri bawah dekat titik origin `(0, 0)`.
  - **Bilah Kolom & 11 Tema IGT**:
    - Menampilkan seluruh 11 tema IGT (*Bidang Tanah*, *Hak Atas Tanah*, *Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah Nasional*, *Lahan Sawah Dilindungi*, *RDTR Kabupaten/ Kota*, *RDTR Kawasan Perbatasan Negara*, *RTRW Kabupaten*, *Sebaran Lokasi Pemberdayaan Tanah Masyarakat*, dan *Zona Nilai Tanah*).
    - Batang berdampingan presisi (lebar 26px) dengan tinggi proporsional terhadap data `provinsi` dan `kabupaten`.
    - Label sumbu X di bawah baseline disingkat secara elegan (*ellipsis*) persis menyerupai referensi (*Inventarisasi Ta...*, *Kemampuan Ta...*, *Lahan Baku Sa...*, *Lahan Sawah D...*, dll.).
  - **Interaktivitas Penuh**:
    - Tooltip melayang (*floating tooltip*) muncul secara mulus saat kursor diarahkan ke setiap gugus batang, menyajikan nama lengkap tema IGT, jumlah data provinsi, kabupaten, bidang, dan luas wilayah.
    - Sinkronisasi dinamis: saat pengguna mengubah filter tahun renaksi maupun wilayah administrasi peta, grafik secara otomatis merender ulang data sesuai pilihan aktif.
    - Peralihan mulus (*smooth toggle*) antara tampilan *Tabel* dan *Grafik* melalui kontrol segmen header.

### 24. Penyelarasan Opsi Dropdown Toolbar Statistik IGT (Data Berdasarkan IGT)
- **Latar Belakang**: Dropdown pertama pada toolbar Statistik IGT sebelumnya bertuliskan *"Data Berdasarkan Direktorat"*, padahal tabel dan data statistik menyajikan tema-tema Informasi Geospasial Tematik (IGT).
- **Perubahan yang Diterapkan**:
  - Mengubah label default trigger dropdown `#statistik-igt-kelompok` menjadi **"Data Berdasarkan IGT"**.
  - Mengubah item opsi pertama (radio aktif) di dalam `#statistik-igt-kelompok .igt-dropdown__panel` menjadi **"Data Berdasarkan IGT"**.
- **Hasil Tampilan**: Selaras 100% dengan kolom data yang berfokus pada tema IGT, menjaga kejelasan hierarki data bagi pengguna saat menjelajahi statistik Geoportal.

### 25. Penambahan Tabel dan Grafik Statistik IGT per Provinsi (Data Berdasarkan Provinsi)
- **Latar Belakang**: Pengguna membutuhkan kemampuan untuk melihat rincian agregasi data spasial per tingkat provinsi pada modul Statistik IGT, baik dalam format tabular maupun grafik batang bergugus (*clustered column bar chart*), sesuai antarmuka Geoportal IGT.
- **Perubahan yang Diterapkan**:
  1. **Tabel Data Berdasarkan Provinsi (`#statistik-igt-tabel`)**:
     - Struktur kolom dinamis: **No**, **Provinsi**, **Jumlah IGT**, **Kabupaten**, **Bidang**, dan **Luas (Ha)**.
     - Penomoran baris nomor urut di paling kiri (`No`) tetap aktif dan sinkron dengan paginasi.
     - Dataset terintegrasi: Bali (2 IGT, 1 Kab, 160 Bidang, 12.892 Ha), D.I. Yogyakarta (8 IGT, 5 Kab, 165.193 Bidang, 558.613,678 Ha), DKI Jakarta (1 IGT, 1 Kab, 4 Bidang, 3.256 Ha), NTT (1 IGT, 3 Kab, 2.829 Bidang, 8.876,029 Ha), dan Tidak Tercatat (1 IGT, 1 Kab, 7.516 Bidang, 231.015,748 Ha).
     - Pengurutan alami (*natural numeric sorting*) yang presisi untuk angka berformat pemisah ribuan titik dan desimal koma (misal: `165.193` vs `2.829`).
  2. **Grafik Data Berdasarkan Provinsi (`#statistik-igt-grafik`)**:
     - Visualisasi grafik batang bergugus adaptif dengan 5 gugus provinsi pada sumbu X (*Bali*, *DI Yogyakarta*, *DKI Jakarta*, *Nusa Tenggara T...*, *Tidak Tercatat*).
     - Sub-toolbar & legenda: **Jumlah IGT** (lingkaran titik cyan `#68b6db`) dan **Jumlah Data Kabupaten** (lingkaran titik biru `#6793db`).
     - Batang vertikal berdampingan (lebar 32px) dengan tinggi proporsional terhadap skala 0–8 (skala grid presisi dengan garis horizontal & vertikal).
     - Tooltip melayang interaktif (*floating tooltip*) menyajikan nama lengkap provinsi, Jumlah IGT, Jumlah Data Kabupaten, Bidang, dan Luas (Ha) saat kursor diarahkan ke setiap gugus batang.
     - Filter metrik dropdown (*Data Berdasarkan Administrasi*, *Bidang*, dan *Luas*) berfungsi dinamis menyesuaikan data provinsi.
  3. **Kelengkapan Mode Pengelompokan Lainnya**:
     - Pengguna dapat beralih bebas antara *"Data Berdasarkan IGT"*, *"Data Berdasarkan Provinsi"*, dan *"Data Berdasarkan Kabupaten/Kota"* secara instan tanpa memuat ulang halaman.

### 26. Penambahan Tabel dan Grafik Statistik IGT per Kabupaten/Kota (Data Berdasarkan Kabupaten/Kota)
- **Latar Belakang**: Pengguna memerlukan visualisasi data tabular dan analitik grafik untuk tingkat Kabupaten/Kota pada modul Statistik IGT, selaras dengan opsi ketiga pada dropdown toolbar.
- **Perubahan yang Diterapkan**:
  1. **Tabel Data Berdasarkan Kabupaten/Kota (`#statistik-igt-tabel`)**:
     - Struktur kolom dinamis: **No**, **Kabupaten/Kota**, **Provinsi**, **Jumlah IGT**, **Bidang**, dan **Luas (Ha)**.
     - Penomoran baris nomor urut di paling kiri (`No`) tetap konsisten dan otomatis berlanjut antarhalaman (halaman 1: nomor 1–10, halaman 2: nomor 11–12).
     - Dataset terintegrasi: *Badung* (Bali), *Bantul* (DIY), *Belu* (NTT), *Gunung Kidul* (DIY & Tidak Tercatat), *Kota Jakarta Barat* (DKI Jakarta), *Kota Yogyakarta* (DIY), *Kulon Progo* (DIY), *Malaka* (NTT), dan *Sleman* (DIY) dengan total 12 entri sehingga mengaktifkan kontrol paginasi 2 halaman (`< 1 2 >`).
     - Seluruh nilai bidang dan luas diverifikasi matematis selaras 100% dengan total agregasi pada tingkat provinsi.
  2. **Grafik Data Berdasarkan Kabupaten/Kota (`#statistik-igt-grafik`)**:
     - Visualisasi grafik batang untuk setiap kabupaten pada sumbu X.
     - Pembedaan label cerdas untuk entri serupa (misal: *Gunung Kidul* di DIY vs *Gunung Kidul (TT)* pada wilayah Tidak Tercatat).
     - Sub-toolbar & legenda: **Jumlah IGT** (lingkaran titik cyan `#68b6db`).
     - Tooltip melayang interaktif (*floating tooltip*) menyajikan nama kabupaten, provinsi induk (*Daerah Istimewa Yogyakarta*, *Bali*, dll.), Jumlah IGT, Bidang, dan Luas (Ha).
     - Sinkronisasi dinamis terhadap pengalihan metrik dropdown (*Data Berdasarkan Administrasi*, *Bidang*, dan *Luas*).

### 27. Penegakan Logika Data Akumulasi Kumulatif Monotonik pada Kompilasi & Integrasi (Mei $\ge$ April)
- **Latar Belakang Permasalahan**:
  - Pada kartu dan diagram batang *Kompilasi Integrasi*, data bulanan merepresentasikan **progres kumulatif tahun berjalan (*cumulative year-to-date achievement*)** dari bulan Januari hingga Desember.
  - Sebelumnya, pada dummy data tingkat provinsi, nilai bulanan didefinisikan seperti capaian terpisah per bulan (*monthly delta*) sehingga timbul fluktuasi penurunan yang tidak logis:
    - April: 2 layer (1 terkompilasi, 1 terintegrasi) $\rightarrow$ Mei: 1 layer (0 terkompilasi, 1 terintegrasi) — *turun dari 2 ke 1*.
    - Februari: 2 layer $\rightarrow$ Maret: 1 layer — *turun dari 2 ke 1*.
    - Juni: 3 layer $\rightarrow$ Juli: 2 layer — *turun dari 3 ke 2*.
  - Sesuai prinsip pelaporan renaksi IGT spasial: lapisan data (*layer*) yang telah terkompilasi atau terintegrasi di bulan sebelumnya tidak akan hilang atau berkurang di bulan berikutnya, melainkan terus berakumulasi. Maka bulan Mei tidak mungkin lebih sedikit daripada bulan April:
    $$\forall m \in [1..12]: \quad \text{terkompilasi}[m] \ge \text{terkompilasi}[m-1] \quad\land\quad \text{terintegrasi}[m] \ge \text{terintegrasi}[m-1]$$
- **Solusi & Perubahan yang Diterapkan**:
  1. **Tingkat Nasional (`nasional.kompilasiIntegrasi.bulanan`)**:
     - Januari: 1 terkompilasi, 2 terintegrasi (Total = 3)
     - Februari–April: 1 terkompilasi, 3 terintegrasi (Total = 4)
     - **Mei**: 2 terkompilasi (+ *Lahan Baku Sawah Nasional*), 3 terintegrasi (**Total = 5**) $\rightarrow$ **Mei (5) $\ge$ April (4)**
     - Juni–Juli: 3 terkompilasi (+ *Penggunaan Tanah*), 3 terintegrasi (Total = 6)
     - Agustus–September: 3 terkompilasi, 4 terintegrasi (+ *Inventarisasi Tanah Kritis*) (Total = 7)
     - Oktober: 4 terkompilasi, 10 terintegrasi (**Total = 14 layer penuh**, selaras 100% dengan metrik kartu 14 Layer IGT)
     - November & Desember: 0 (slot abu-abu untuk bulan mendatang pada tahun berjalan 2026).
  2. **Tingkat Wilayah Provinsi & Kabupaten (`getRawDataByWilayah`)**:
     - Pola bulanan diatur secara terstruktur non-decreasing di setiap wilayah:
       - Provinsi: Jan–Apr (1) $\rightarrow$ Mei (2, dengan 1 terkompilasi + 1 terintegrasi) $\rightarrow$ Jun–Sep (3) $\rightarrow$ Okt ($\text{Total Layer}$ penuh).
       - Kabupaten: Jan (0) $\rightarrow$ Feb–Jun (1) $\rightarrow$ Jul–Sep (2) $\rightarrow$ Okt ($\text{Total Layer Kab}$).
  3. **Proteksi Monotonik pada Penskalaan Tahun (`getKompilasiIntegrasi`)**:
     - Ditanamkan loop validasi monotonik:
       `if (tkomp < maxKomp) tkomp = maxKomp; else maxKomp = tkomp;`
       `if (tinteg < maxInteg) tinteg = maxInteg; else maxInteg = tinteg;`
     - Menjamin bahwa pemilihan filter tahun renaksi manapun (2026, 2025, 2024, 2023, atau Semua Tahun) menghasilkan grafik batang yang strictly non-decreasing dan akumulatif.
  4. **Kesesuaian Interaksi Modal Popup Kumulatif**:
     - Mengklik batang bulan Mei membuka modal daftar IGT kumulatif periode Januari s.d. Mei (5 layer: 3 terintegrasi + 2 terkompilasi), selaras 100% dengan angka pada diagram batang.

### 28. Penambahan Kolom Jenis IGT pada Tabel Statistik IGT (Sebelah Kanan Nomor)
- **Latar Belakang**:
  - Pada kartu *Statistik IGT* (khususnya tampilan utama *"Data Berdasarkan IGT"*), pengguna membutuhkan klasifikasi tematik apakah suatu IGT tergolong **IGT Pertanahan** atau **IGT Tata Ruang**.
  - Pengguna meminta agar kolom **Jenis IGT** ditempatkan tepat di sebelah kanan kolom nomor urut (`No`), dan setelahnya baru diikuti oleh kolom nama IGT.
- **Perubahan yang Diterapkan**:
  1. **Penataan Urutan Kolom Tabel (`#statistik-igt-tabel`)**:
     - Struktur kolom diperbarui menjadi:
       $$\text{No} \quad\longrightarrow\quad \text{Jenis IGT} \quad\longrightarrow\quad \text{IGT} \quad\longrightarrow\quad \text{Provinsi} \quad\longrightarrow\quad \text{Kabupaten} \quad\longrightarrow\quad \text{Bidang} \quad\longrightarrow\quad \text{Luas (Ha)}$$
     - Dilengkapi tombol pengurutan (*sort caret*) pada header `Jenis IGT` yang memungkinkan pengurutan alfabetis ascending/descending.
  2. **Styling Badge Tematik Geoportal (`.igt-badge-jenis`)**:
     - **Pertanahan**: Menggunakan rumpun warna biru ATR/BPN (`#1d4ed8` dengan background `#eff6ff` dan border `#bfdbfe`).
     - **Tata Ruang**: Menggunakan rumpun warna hijau emerald Tata Ruang (`#047857` dengan background `#ecfdf5` dan border `#a7f3d0`).
     - Tampilan badge ringkas, padat, dan rapi (`font-size: 12px; font-weight: 500; border-radius: 6px; padding: 3px 10px;`).
  3. **Penetapan Taksonomi pada Dataset**:
     - Ditambahkan atribut `jenisIgt: 'Pertanahan'` / `'Tata Ruang'` pada seluruh dataset statistik:
       - **Pertanahan** (8 IGT): *Bidang Tanah*, *Hak Atas Tanah*, *Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah Nasional*, *Lahan Sawah Dilindungi*, *Sebaran Lokasi Pemberdayaan Tanah Masyarakat*, *Zona Nilai Tanah*.
       - **Tata Ruang** (3 IGT): *RDTR Kabupaten/ Kota*, *RDTR Kawasan Perbatasan Negara*, *RTRW Kabupaten*.
     - Dilengkapi fungsi resolver otomatis `getJenisIgt(namaIgt)` untuk menjamin integritas data filter dinamis di setiap tingkat wilayah.
  4. **Interaktivitas Pencarian & Tooltip Grafik**:
     - Kotak pencarian (*searchbar*) dapat langsung memfilter berdasarkan kata kunci *"Pertanahan"* atau *"Tata Ruang"*.
     - Tooltip grafik batang bergugus (*clustered column bar chart*) ikut diperkaya dengan informasi `Jenis IGT` berindikator titik warna biru/hijau saat kursor diarahkan ke batang tema IGT.

### 29. Leader Board dengan 3 Kategori Pilihan (Capaian Renaksi, Akses IGT, & Login Direktorat)
- **Latar Belakang**:
  - Pengguna membutuhkan kartu *Leader Board* yang fleksibel dan informatif dengan tiga kategori peringkat berbeda yang dapat diganti sewaktu-waktu sesuai kebutuhan analisis pemangku kepentingan.
  - Setiap kategori memiliki karakteristik kolom data, metrik peringkat, dan kebutuhan filter yang unik (beberapa memerlukan filter direktorat, sementara yang lain hanya filter tahun akses).
- **Perubahan yang Diterapkan**:
  1. **Tiga Kategori Pilihan (*Category Selector & Segment Buttons*)**:
     - Pengguna dapat beralih antar-kategori dengan 2 cara yang saling tersinkronisasi otomatis:
       - **Dropdown Pemilih Kategori (`#leader-board-kategori`)**: Menu dropdown radio bertombol rapi di toolbar kartu.
       - **Segment Tabs Cepat (`#leader-board-segment`)**: Tombol segmen horizontal 1-klik di subbar atas tabel (`1. Capaian Renaksi Satker`, `2. IGT Sering Diakses`, `3. Direktorat Sering Login`).
     - Subbar info (`#leader-board-subbar-info`) menampilkan keterangan dinamis mengenai peringkat kategori yang sedang aktif.
  2. **Kategori 1: Capaian Renaksi oleh Satker/Direktorat**:
     - **Kolom Tabel**:
       - `No`: Badge medali warna khusus (Peringkat #1 Emas `#fbbf24`, #2 Perak `#94a3b8`, #3 Perunggu `#b45309`, dan nomor melingkar reguler untuk peringkat berikutnya).
       - `IGT`: Nama tema IGT (misal: *Bidang Tanah*, *Hak Atas Tanah*, *Zona Nilai Tanah*, *RTRW Provinsi*, dll.).
       - `Satker / Direktorat`: Nama unit kerja/satuan kerja pemilik target renaksi.
       - `Realisasi / Target`: Disajikan dalam satu kolom tunggal yang memadukan angka realisasi tebal, garis miring pembagi, angka target, dan badge pill satuan hijau muda (`Bidang`, `Kabupaten/Kota`, `Provinsi`, `Lokasi`, `Kawasan`).
       - `Persentase`: Progress bar horizontal proporsional adaptif (hijau `#10b981` untuk capaian $>75\%$, kuning/oranye `#f59e0b` untuk $31\%\dots75\%$, dan merah `#ef4444` untuk $\le 30\%$) disertai teks persentase dengan ketelitian 2 desimal.
     - **Filter**:
       - **Tahun Renaksi**: Dropdown tahun (`Semua Tahun`, `2026`, `2025`, `2024`, `2023`) yang tersinkronisasi global.
       - **Direktorat / Satker**: Dropdown filter Satker aktif (`#leader-board-direktorat-wrap`), memungkinkan pemfilteran instan untuk direktorat tertentu (misal: *Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II*, *Direktorat Pengaturan Tanah Pemerintah...*, dll.).
  3. **Kategori 2: IGT yang Paling Sering Diakses (via Plugin dan Aplikasi)**:
     - **Kolom Tabel**:
       - `No`: Nomor urut / badge peringkat terurut dari yang terbanyak diakses.
       - `Nama IGT`: Judul tema IGT.
       - `Jumlah Akses`: Total angka akses tebal dengan satuan kali (misal: `48.291 kali`), dilengkapi rincian akses geospasial: `(Plugin: 32.140 • Aplikasi: 16.151)`.
     - **Filter**:
       - **Tahun Akses**: Dropdown tahun akses (`Tahun Akses`).
       - **Filter Satker Disembunyikan**: Filter dropdown Satker otomatis disembunyikan (`display: none`) karena kategori ini berfokus pada tema IGT lintas platform.
  4. **Kategori 3: Direktorat yg Paling Sering Login**:
     - **Kolom Tabel**:
       - `No`: Nomor urut / badge peringkat aktivitas login satker.
       - `Satker / Direktorat`: Nama lengkap unit kerja / direktorat di lingkungan Kementerian ATR/BPN.
       - `Jumlah Login`: Total frekuensi login ke sistem geoportal (misal: `1.842 kali login`).
     - **Filter**:
       - **Tahun Akses**: Dropdown tahun akses (`Tahun Akses`).
       - **Filter Satker Disembunyikan**: Filter dropdown Satker otomatis disembunyikan.
  5. **Fitur Ekstra & Kenyamanan Pengguna**:
     - **Pencarian Instan (`#leader-board-cari`)**: Filter data seketika berdasarkan kata kunci IGT, satker, persentase, atau jenis satuan.
     - **Pengurutan Header (*Sortable Headers*)**: Mengklik header kolom mengurutkan data ascending/descending secara dinamis dengan ikon panah arah.
     - **Paginasi Multi-Opsi**: Pilihan 10, 25, dan 50 entri per halaman dengan tombol navigasi prev/next dan nomor halaman.
     - **Ekspor CSV Lengkap (`#leader-board-unduh`)**: Mengklik tombol *Unduh Data* langsung mengunduh file `.csv` terformat UTF-8 BOM berisi seluruh data kategori aktif sesuai tahun yang dipilih.
     - **Mode Layar Penuh (*View Full Table*)**: Tombol untuk beralih instan antara tampilan ringkas 10 entri dan tampilan luas 50 entri per halaman.

### 30. Penggantian Satuan "Layer" Menjadi "IGT" pada Usulan Input Data
- **Latar Belakang**:
  - Pada kartu ringkasan *Usulan Input Data*, penyebutan satuan tema sebelumnya menggunakan kata "layer" (misal: "98 data / 30 layer").
  - Pengguna meminta agar istilah "layer" diganti menjadi **"IGT"** (misal: "14 IGT" bukan "14 Layer", dan "30 IGT" bukan "30 layer") untuk memperjelas konteks Informasi Geospasial Tematik.
- **Perubahan yang Diterapkan**:
  1. **Angka Metrik Utama Header Kartu (`index.html`)**:
     - Struktur HTML diperbarui:
       `<strong id="status-data-total">98</strong><span>data</span><span class="igt-panel__pemisah">/</span><strong id="status-data-total-layer">30</strong><span>IGT</span>`
  2. **Rincian Status per Kategori (`mockup-app.js`)**:
     - Pada fungsi `renderUsulanInputData(usulan)`, seluruh label satuan rincian dan tooltip bar progres disesuaikan:
       - **Terintegrasi**: `26 data / 14 IGT`
       - **Terkompilasi**: `7 data / 4 IGT`
       - **Terupload**: `65 data / 12 IGT`
       - **Revisi Perbaikan**: `0 data / 0 IGT`
       - Tooltip hover bar: `[Label]: [X] data / [Y] IGT (Klik untuk melihat rincian)`

### 31. Pengaturan Tampilan Leader Board (Default Top 5, Lebih Lebar, & Chip Daftar IGT di Bawah Nama)
- **Latar Belakang**:
  - Modul *Leader Board* sebelumnya menampilkan 10 entri per halaman secara default dan memiliki batas lebar kolom yang ketat sehingga tabel terlihat cukup padat.
  - Pengguna meminta agar Leaderboard defaultnya hanya memunculkan **Top 5**, dibuat lebih **lebar dan lapang**, serta di bawah tulisan nama IGT/Satker ditambahkan daftar tema IGT apa saja yang masuk di situ dengan badge/chip seperti tampilan mockup sebelumnya.
- **Perubahan yang Diterapkan**:
  1. **Default Top 5 Entri**:
     - Status paginasi `perPage` diubah defaultnya menjadi **5** (pilihan per page: `5`, `10`, `25`, `50`).
     - Pengguna langsung melihat 5 entri peringkat tertinggi saat halaman dimuat atau saat beralih antar-kategori. Tombol paginasi `< 1 2 >` otomatis aktif untuk menjelajah entri berikutnya.
  2. **Layout Tabel Lebih Lebar & Lapang (*Spacious Layout*)**:
     - Menghapus pembatasan `max-width` pada kolom IGT dan Satker, mengizinkan tabel memanfaatkan 100% lebar kartu secara optimal.
     - Memperbesar padding sel tabel menjadi `16px 20px` dengan `vertical-align: middle` dan perataan baris yang nyaman dipandang.
     - Memperlebar bilah progress bar persentase (hingga 250px) agar perbandingan visual capaian tampak lebih jelas dan elegan.
  3. **Penambahan Chip Daftar IGT di Bawah Tulisan Nama**:
     - Di bawah judul/nama IGT (maupun nama Satker), dirender kontainer flex `.igt-chips-wrap` yang memuat chip badge tema IGT yang bersangkutan:
       - **IGT Pertanahan (`.igt-tag`)**: Badge warna biru lembut ATR/BPN (`#eff6ff`, border `#bfdbfe`, teks `#1d4ed8`), contohnya chip `Bidang Tanah`, `Hak Atas Tanah`, `Zona Nilai Tanah`.
       - **IGT Tata Ruang & Kawasan (`.igt-tag--kawasan`)**: Badge warna kuning/amber lembut (`#fef3c7`, border `#fde68a`, teks `#b45309`), contohnya chip `Inventarisasi Tanah Kritis`, `Kemampuan Tanah`, `Lahan Baku Sawah Nasional`, `Neraca Penatagunaan Tanah`, `RDTR Kabupaten/ Kota`, `RTRW Provinsi`.
     - Entri *Direktorat Penatagunaan Tanah* kini menampilkan 4 chip tema di bawah namanya persis sesuai gambar referensi pengguna.
     - Kotak pencarian (`#leader-board-cari`) secara cerdas turut mencakup pencarian nama-nama IGT yang ada di dalam chip tag tersebut.

### 32. Visualisasi Grafik Batang ke Samping (*Horizontal Bar Chart*) dengan Nilai di Ujung Grafik
- **Latar Belakang**:
  Permintaan pengguna menghendaki agar visualisasi data pada modul Leader Board untuk Kategori 2 (*IGT yang Paling Sering Diakses*) dan Kategori 3 (*Direktorat yg Paling Sering Login*) disajikan dalam bentuk diagram grafik batang horizontal ke samping (*horizontal bar chart*) dengan angka nilainya ditulis langsung di ujung (*tip*) grafik.
- **Implementasi Komponen**:
  1. **Dual Mode View (`#leader-board-tabel` vs `#leader-board-grafik`)**:
     - Kategori 1 (*Capaian Renaksi Satker*) tetap menampilkan tabel format data lengkap beserta kolom progres capaian dan rasio target.
     - Kategori 2 (*IGT Sering Diakses*) dan Kategori 3 (*Direktorat Sering Login*) secara otomatis beralih menampilkan kartu grafik batang ke samping `.igt-hbar-card`.
  2. **Bilah Batang Horizontal Proporsional**:
     - Panjang bilah horizontal diskalakan secara matematis terhadap nilai maksimum entri pada dataset aktif:
       $$\text{barPercent} = \max\left(6, \text{round}\left(\frac{\text{val}}{\text{maxVal}} \times \text{maxScale}\right)\right)$$
     - Panjang bar dibatasi secara aman (58% untuk Kat 2 dan 68% untuk Kat 3) sehingga sisa lebar baris selalu mencukupi ruang render teks angka di ujung bar tanpa meluap (*overflow*) atau patah baris canggung.
  3. **Penempatan Angka di Ujung Grafik (*Tip Positioning*)**:
     - Menggunakan susunan Flexbox horizontal (`.igt-hbar-chart { display: flex; align-items: center; gap: 12px; }`).
     - Komponen `.igt-hbar-tip` diletakkan tepat setelah bilah batang `.igt-hbar-bar-wrap`, memastikan teks nilai selalu melekat presisi di ujung luar bar berapapun panjang bilahnya.
  4. **Kategori 2 (IGT yang Paling Sering Diakses)**:
     - Bilah horizontal tersegmentasi dua warna:
       - **Plugin QGIS**: `#0284c7` (sky blue).
       - **Aplikasi Geoportal**: `#1d4ed8` (royal blue).
     - Angka di ujung batang menampilkan total akses bercetak tebal diikuti rincian metode: `48.291 kali (Plugin: 32.140 • Aplikasi: 16.151)`.
     - Legenda visual mini disematkan rapi di sudut kanan atas daftar (`METODE AKSES: [ ] Plugin QGIS  [ ] Aplikasi Geoportal`).
  5. **Kategori 3 (Direktorat yg Paling Sering Login)**:
     - Bilah horizontal bergradien biru modern: `linear-gradient(90deg, #38bdf8 0%, #1d4ed8 100%)`.
     - Angka di ujung batang menampilkan frekuensi login bercetak tebal: `1.842 kali login`.
     - Chip tema IGT yang dikelola satker tetap dirender rapi di bawah nama satker.
  6. **Integrasi Toolbar & Paginasi Bersama (*Shared Footer*)**:
     - Komponen footer kartu (`#leader-board-foot`) berisi selektor *Per page* (default 5, 10, 25, 50) dan tombol paginasi (`< 1 2 3 >`) digunakan bersama (*shared*) untuk mode tabel maupun grafik.
     - Kotak pencarian (*live filtering*), filter tahun, dan tombol unduh CSV tetap bekerja secara interaktif dan serasi.

### 33. Capaian Renaksi Satker Berdasarkan Satker/Direktorat dengan Chip Mint Green & Bobot Proporsional Bidang-Kawasan
- **Latar Belakang**:
  Pengguna menginginkan agar kategori 1 (*Capaian Renaksi Satker*) pada modul Leader Board diatur berdasarkan entitas Satker/Direktorat (bukan per IGT tunggal), dengan nama-nama tema IGT disematkan di bawah nama satker menggunakan chip badge bergaya *mint green* persis sesuai gambar referensi. Selain itu, untuk satker yang mengelola IGT berbasis bidang dan kawasan sekaligus, keduanya ditampilkan di kolom capaian/target dan persentase capaian dihitung menggunakan rata-rata terbobot (*weighted average*) proporsional jumlah tema masing-masing basis.
- **Implementasi Komponen & Logika**:
  1. **Pengelompokan Berdasarkan Satker/Direktorat**:
     - Setiap baris tabel kini merepresentasikan satu Satker/Direktorat di lingkungan Kementerian ATR/BPN.
     - Kolom tabel disederhanakan menjadi 4 kolom yang sangat lapang dan terbaca jelas:
       $$\text{No} \longrightarrow \text{Satker / Direktorat} \longrightarrow \text{Realisasi / Target} \longrightarrow \text{Persentase}$$
  2. **Penyematan Chip IGT Bergaya Mint Green (`.igt-tag--renaksi`)**:
     - Tepat di bawah nama Satker/Direktorat, disematkan daftar tema IGT yang dikelola menggunakan badge pill khusus:
       - Background: `#ecfdf5`
       - Border: `1px solid #6ee7b7`
       - Teks: `#047857`
       - Radius: `6px`
     - Entri *Direktorat Penatagunaan Tanah* menampilkan 4 chip tema (*Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah Nasional*, *Neraca Penatagunaan Tanah*) persis sesuai tangkapan layar referensi pengguna.
  3. **Penampilan Kedua Metrik (Dual Basis) pada Realisasi / Target**:
     - Jika satker mengelola tema berbasis bidang dan berbasis kawasan secara bersamaan (misal: *Direktorat Bina Pengadaan dan Pencadangan Tanah* atau *Direktorat Pengendalian Hak Tanah...*):
       - Muncul baris capaian bidang: `... / ... BIDANG` (badge biru `.igt-satuan-badge--bidang`).
       - Muncul baris capaian kawasan: `... / ... KAWASAN` (badge amber `.igt-satuan-badge--kawasan`).
  4. **Perhitungan Persentase Berbobot (*Weighted Average Calculation*)**:
     - Persentase dihitung secara matematis menggunakan rumus:
       $$\text{Persentase} = \frac{P_{\text{kawasan}} \times N_{\text{kawasan}} + P_{\text{bidang}} \times N_{\text{bidang}}}{N_{\text{kawasan}} + N_{\text{bidang}}}$$
     - Contoh konkret pada *Direktorat Bina Pengadaan dan Pencadangan Tanah*:
       - Memiliki 1 IGT Bidang (realisasi 120 / target 120 $\rightarrow$ 100%)
       - Memiliki 2 IGT Kawasan (realisasi 14 / target 18 $\rightarrow$ 77.78%)
       - Pembobotan: Bobot Kawasan = 2, Bobot Bidang = 1.
       - Persentase: $\frac{77.78\% \times 2 + 100\% \times 1}{3} = \frac{155.56 + 100}{3} = 85.19\%$.
     - Terdapat subteks keterangan bobot di bawah persentase: `(Bobot: 2 Kawasan, 1 Bidang)`.
  5. **Filter Satker & Ekspor CSV**:
     - Pemfilteran dropdown *Direktorat / Satker* memungkinkan fokus langsung pada satu satker tertentu.
     - Ekspor CSV secara cerdas merangkum data target multi-basis dan bobot secara terstruktur.

### 34. Pembedaan Warna Chip IGT Berbasis Bidang (Biru) dan Berbasis Kawasan (Hijau Mint)
- **Latar Belakang**:
  Pengguna meminta agar chip nama IGT berbasis bidang dan berbasis kawasan dibedakan warnanya, diselaraskan dengan warna pada kolom *Jenis IGT* pada tabel Statistik IGT di atasnya.
- **Implementasi Komponen & Desain**:
  1. **Klasifikasi Berbasis Bidang vs Kawasan**:
     - Dibuat fungsi helper pintar `isBidangIgt(name)` dan `getIgtTagClass(name)`:
       - **Berbasis Bidang**: Tema yang mengukur luasan/jumlah bidang (*Bidang Tanah*, *Hak Atas Tanah*).
       - **Berbasis Kawasan**: Tema yang mengukur batas/lokasi/kawasan tematik (*Inventarisasi Tanah Kritis*, *Kemampuan Tanah*, *Lahan Baku Sawah Nasional*, *Neraca Penatagunaan Tanah*, *RDTR Kab/Kota*, *RDTR Kawasan*, *RTRW Kabupaten*, *RTRW Provinsi*, *Lahan Sawah Dilindungi*, *Zona Nilai Tanah*, *Penggunaan Tanah*, *Sebaran Lokasi Pemberdayaan Tanah Masyarakat*).
  2. **Skema Warna Tematik Selaras Jenis IGT**:
     - 🟦 **Berbasis Bidang (`.igt-tag--bidang` & `.igt-satuan-badge--bidang`)**:
       - Latar: `#eff6ff` (soft blue)
       - Garis tepi: `1px solid #bfdbfe`
       - Teks: `#1d4ed8` (royal blue ATR/BPN)
       - Selaras 100% dengan badge *Jenis IGT: Pertanahan*.
     - 🟩 **Berbasis Kawasan (`.igt-tag--kawasan` & `.igt-satuan-badge--kawasan`)**:
       - Latar: `#ecfdf5` (mint green)
       - Garis tepi: `1px solid #6ee7b7` (atau `#a7f3d0`)
       - Teks: `#047857` (dark forest teal green)
       - Selaras 100% dengan badge *Jenis IGT: Tata Ruang* dan gambar referensi pengguna.
  3. **Visualisasi Dual Basis yang Komprehensif**:
     - Pada satker yang memiliki dual basis (misal: *Direktorat Bina Pengadaan dan Pencadangan Tanah*):
       - Terlihat kontras chip biru `[ Bidang Tanah ]` berdampingan dengan chip hijau `[ Inventarisasi Tanah Kritis ]` dan `[ Kemampuan Tanah ]`.
       - Kolom capaian/target menampilkan angka target bidang berbadge biru (`120 / 120 BIDANG`) dan target kawasan berbadge hijau (`14 / 18 KAWASAN`), menghasilkan korelasi visual langsung yang mudah dipahami.
  4. **Penerapan Lintas Kategori**:
     - Pembedaan warna chip ini diaplikasikan konsisten pada Kategori 1 (*Capaian Renaksi Satker*), Kategori 2 (*IGT Sering Diakses*), dan Kategori 3 (*Direktorat Sering Login*).

### 35. Standarisasi 39 IGT Resmi dan 7 Satker/Ditjen Sesuai Bagan Ditjen SPPR Kementerian ATR/BPN
- **Latar Belakang**:
  Pengguna memberikan referensi bagan resmi dokumen **"05 DAFTAR IGT DASAR PERTANAHAN DAN RUANG"** dari Ditjen SPPR Kementerian ATR/BPN dan meminta agar seluruh nama IGT dan nama Satker/Direktorat disesuaikan secara presisi berdasarkan bagan tersebut.
- **Implementasi Komponen & Desain**:
  1. **Struktur 7 Satker / Unit Ditjen Eselon I**:
     - Seluruh modul Leader Board (Kategori 1: Capaian Renaksi Satker, Kategori 2: IGT Sering Diakses, Kategori 3: Ditjen Sering Login, dan Dropdown Filter Satker) kini menggunakan 7 Ditjen resmi:
       1. **Ditjen Survei dan Pemetaan Pertanahan dan Ruang (SPPR)**: Mengelola 5 tema Bidang (*Bidang Tanah*, *Penguasaan Tanah*, *Pemilikan Tanah*, *Penggunaan Tanah*, *Pemanfaatan Tanah*) dan 1 tema Kawasan (*Unsur Dasar Pertanahan*).
       2. **Ditjen Penetapan Hak dan Pendaftaran Tanah (PHPT)**: Mengelola 1 tema Bidang (*Hak Atas Tanah*).
       3. **Ditjen Penanganan Sengketa dan Konflik Pertanahan (PSKP)**: Mengelola 1 tema Bidang (*Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan*).
       4. **Ditjen Penataan Agraria**: Mengelola 3 tema Bidang (*Sebaran Lokasi Pemberdayaan Tanah Masyarakat*, *Pertimbangan Teknis Pertanahan*, *Inventarisasi Tanah Kritis*) dan 9 tema Kawasan (*Lahan Baku Sawah*, *Kemampuan Tanah*, *Neraca Penatagunaan Tanah*, *Persebaran Pulau-Pulau Kecil Terluar di Indonesia*, *Sebaran Tanah Objek Reforma Agraria*, *Analisa Tanah Objek Reforma Agraria*, *Potensi Objek Redistribusi Tanah*, *Potensi WP3WT*, *Tanah Timbul*).
       5. **Ditjen Pengadaan Tanah dan Pengembangan Pertanahan (PTPP)**: Mengelola 4 tema Bidang (*Potensi Subjek Konsolidasi Tanah*, *Nilai Bidang Tanah*, *Desain Konsolidasi Tanah*, *Hasil Penerapan Desain Konsolidasi Tanah*) dan 2 tema Kawasan (*Zona Nilai Tanah*, *Sebaran Potensi Pengembangan Pertanahan*).
       6. **Ditjen Pengendalian dan Penertiban Tanah dan Ruang (PPTR)**: Mengelola 2 tema Bidang (*Tanah Terindikasi Terlantar*, *Indikasi Pelanggaran Pemanfaatan Ruang*) dan 2 tema Kawasan (*Lahan Sawah Dilindungi*, *Kawasan Terindikasi Terlantar*).
       7. **Ditjen Tata Ruang**: Mengelola 9 tema Kawasan (*RTRW Nasional*, *RTRW Provinsi*, *RTRW Kabupaten*, *RTRW Kota*, *RDTR Kawasan Perbatasan Negara*, *RTR Pulau/Kepulauan*, *RTR Kawasan Strategis Nasional*, *RDTR Kabupaten/Kota*, *KKPR*).
  2. **Matriks 39 Tema IGT Resmi dan Pemetaan Basis**:
     - **16 Tema Berbasis Bidang Tanah (Nomor 1–16)**:
       Diberi styling chip biru lembut ATR/BPN (`.igt-tag--bidang`) dan satuan `BIDANG`:
       `Bidang Tanah`, `Penguasaan Tanah`, `Pemilikan Tanah`, `Penggunaan Tanah`, `Pemanfaatan Tanah`, `Sebaran Lokasi Pemberdayaan Tanah Masyarakat`, `Pertimbangan Teknis Pertanahan`, `Inventarisasi Tanah Kritis`, `Tanah Terindikasi Terlantar`, `Indikasi Pelanggaran Pemanfaatan Ruang`, `Hak Atas Tanah`, `Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan`, `Potensi Subjek Konsolidasi Tanah`, `Nilai Bidang Tanah`, `Desain Konsolidasi Tanah`, `Hasil Penerapan Desain Konsolidasi Tanah`.
     - **23 Tema Berbasis Kawasan (Nomor 17–39)**:
       Diberi styling chip hijau mint segar (`.igt-tag--kawasan`) dan satuan `KAWASAN`:
       `RTRW Nasional`, `RTRW Provinsi`, `RTRW Kabupaten`, `RTRW Kota`, `RDTR Kawasan Perbatasan Negara`, `RTR Pulau/Kepulauan`, `RTR Kawasan Strategis Nasional`, `RDTR Kabupaten/Kota`, `KKPR`, `Lahan Baku Sawah`, `Kemampuan Tanah`, `Neraca Penatagunaan Tanah`, `Persebaran Pulau-Pulau Kecil Terluar di Indonesia`, `Sebaran Tanah Objek Reforma Agraria`, `Analisa Tanah Objek Reforma Agraria`, `Potensi Objek Redistribusi Tanah`, `Potensi WP3WT`, `Tanah Timbul`, `Unsur Dasar Pertanahan`, `Lahan Sawah Dilindungi`, `Kawasan Terindikasi Terlantar`, `Zona Nilai Tanah`, `Sebaran Potensi Pengembangan Pertanahan`.
  3. **Penyesuaian Helper Klasifikasi Berbasis Bidang**:
     - Array `DAFTAR_IGT_BIDANG` di `mockup-app.js` memuat 16 tema resmi Basis Bidang Tanah secara eksak, sehingga tema seperti *Inventarisasi Tanah Kritis*, *Sebaran Lokasi Pemberdayaan Tanah Masyarakat*, *Pertimbangan Teknis Pertanahan*, *Tanah Terindikasi Terlantar*, dll. teridentifikasi tepat sebagai Bidang (biru), sementara *Unsur Dasar Pertanahan*, *Zona Nilai Tanah*, dan tema lainnya teridentifikasi tepat sebagai Kawasan (hijau mint).
  4. **Perhitungan Rata-Rata Berbobot Ditjen Multi-Basis**:
     - Untuk 4 Ditjen yang memiliki tema Bidang dan Kawasan sekaligus, capaian/target menampilkan dua baris terpisah (`... BIDANG` dan `... KAWASAN`), dengan bobot proporsional sesuai jumlah tema masing-masing basis:
       - *Ditjen SPPR*: 5 Bidang ($w=5$), 1 Kawasan ($w=1$) $\rightarrow$ `(Bobot: 1 Kawasan, 5 Bidang)`.
       - *Ditjen PTPP*: 4 Bidang ($w=4$), 2 Kawasan ($w=2$) $\rightarrow$ `(Bobot: 2 Kawasan, 4 Bidang)`.
       - *Ditjen Penataan Agraria*: 3 Bidang ($w=3$), 9 Kawasan ($w=9$) $\rightarrow$ `(Bobot: 9 Kawasan, 3 Bidang)`.
       - *Ditjen PPTR*: 2 Bidang ($w=2$), 2 Kawasan ($w=2$) $\rightarrow$ `(Bobot: 2 Kawasan, 2 Bidang)`.

### 36. Peningkatan Dimensi Kolom Utama Leader Board, Satuan Hektar (Ha), dan Kartu Tematik Bidang/Kawasan Interaktif
- **Latar Belakang**:
  1. Menampilkan seluruh nama tema IGT sekaligus di bawah nama direktorat/satker menimbulkan kepadatan visual berlebih (*visual clutter*), terutama untuk direktorat yang mengelola hingga 12 tema seperti Ditjen Penataan Agraria.
  2. Kolom *Realisasi / Target* dan *Persentase* merupakan informasi terpenting (*core metrics*) yang membutuhkan penekanan dimensi visual lebih lapang dan jelas.
  3. Satuan ukuran untuk IGT Berbasis Kawasan disesuaikan secara resmi menjadi **"Ha" (Hektar)**, bukan kata "Kawasan".
- **Implementasi Komponen & Desain**:
  1. **Perbesaran Dimensi Kolom Utama (*High-Impact Visual Metrics*)**:
     - **Kolom Realisasi / Target**:
       - Alokasi lebar diperbesar: `min-width: 260px`, `width: 30%`.
       - Angka realisasi dibuat menonjol: `font-size: 15.5px`, `font-weight: 700`, teks kontras `#0f172a`.
       - Tanda pemisah slash (`/`) rapi dengan warna `#94a3b8`.
       - Angka target jelas terbaca: `font-size: 14.5px`, `font-weight: 500`.
     - **Kolom Persentase**:
       - Alokasi lebar diperbesar: `min-width: 300px`, `width: 34%`.
       - Bilah *progress bar* dibuat lebih panjang dan tebal: `height: 12px`, radius kapsul penuh (`9999px`), panjang hingga `380px`, dengan efek *inset shadow* lembut.
       - Teks persentase diperbesar: `font-size: 16px`, `font-weight: 700`, warna `#0f172a`.
       - Subteks pembobotan dual-basis presisi: `(Bobot: X Ha, Y Bidang)`.
  2. **Standarisasi Satuan: "Bidang" & "Ha"**:
     - Badge satuan tema Berbasis Bidang: `<span class="igt-satuan-badge--bidang">Bidang</span>` (latar biru `#eff6ff`, border `#bfdbfe`, teks `#1d4ed8`).
     - Badge satuan tema Berbasis Kawasan: `<span class="igt-satuan-badge--kawasan">Ha</span>` (latar mint `#ecfdf5`, border `#6ee7b7`, teks `#047857`).
     - Angka capaian kawasan disimulasikan dalam satuan luas hektar realistis berskala ribuan hektar: `9.000 / 10.000 Ha`, `16.000 / 20.000 Ha`, `72.000 / 90.000 Ha`, `21.000 / 30.000 Ha`, `32.000 / 45.000 Ha`.
  3. **Kartu Interaktif Bidang & Kawasan di Bawah Nama Satker**:
     - Di bawah setiap nama direktorat, deretan chip panjang digantikan oleh **kartu ringkas interaktif (*compact interactive cards*)**:
       - 🟦 **Kartu Bidang (`.igt-basis-card--bidang`)**: Menampilkan badge jumlah tema + label `"IGT Berbasis Bidang"` + ikon panah chevron (`caret-down.svg`).
       - 🟩 **Kartu Kawasan (`.igt-basis-card--kawasan`)**: Menampilkan badge jumlah tema + label `"IGT Berbasis Kawasan"` + ikon panah chevron (`caret-down.svg`).
     - Jika satker hanya mengelola satu basis (misal Ditjen PHPT hanya mengelola Bidang, atau Ditjen Tata Ruang hanya mengelola Kawasan), hanya kartu yang relevan yang ditampilkan.
  4. **Drawer Ekspansi & Pop-up Dialog Menyeluruh**:
     - **Interaksi Klik Kartu**: Mengklik kartu secara instan membuka drawer panel (`.igt-basis-drawer`) tepat di bawah baris direktorat tersebut dengan transisi halus, chevron berputar 180°, dan kartu berstatus aktif (`.is-active`).
     - **Konten Drawer**: Menyajikan judul tema dengan ikon, nama direktorat, daftar chip tema IGT lengkap berlatar warna tematik, tombol `Pop-up` dialog, serta tombol tutup `✕`.
     - **Pop-up Dialog Penuh (`#modal-leaderboard-igt`)**: Tombol aksi pop-up membuka modal jendela dialog besar yang menampilkan seluruh tema IGT secara terisolasi dan fokus.
     - **Penerapan pada Kategori 3**: Mekanisme kartu ringkas dan drawer ini juga diterapkan pada *Direktorat Sering Login*, menjadikan diagram batang horizontal jauh lebih proporsional dan bebas dari ketimpangan tinggi baris.

### 37. Penerapan Pola "See More" (+X lainnya) pada Capaian Renaksi & Penghapusan Chip pada Grafik Akses & Login
- **Latar Belakang**:
  1. Pada tabel Capaian Renaksi Satker, menyembunyikan seluruh nama tema ke dalam kartu tertutup membuat satker yang hanya memiliki 1 tema (seperti Ditjen PHPT dengan *Hak Atas Tanah*) terkesan "misterius" karena pengguna harus mengklik kartu hanya untuk membaca 1 nama tema.
  2. Pendekatan *Progressive Disclosure* dengan pratinjau chip langsung (*preview chips*) + tombol ekspansi `+X lainnya ▾` memberikan konteks langsung (*instant recognition*) tanpa mengorbankan kerapian dan tinggi baris tabel.
  3. Pada diagram grafik batang horizontal (Kategori 2: *IGT Sering Diakses* dan Kategori 3: *Direktorat Sering Login*), keberadaan chip di bawah judul tema/satker bersifat redundan dan membuat tinggi baris tidak seragam.
- **Implementasi Komponen & Desain**:
  1. **Pratinjau Cerdas 2 Chip + Tombol `+X lainnya ▾`**:
     - Di bawah nama direktorat/satker pada Kategori 1 (*Capaian Renaksi*), sistem secara otomatis merender maksimal 2 chip tema teratas:
       - **Satker Dual Basis (SPPR, PTPP, Penataan Agraria, PPTR)**: Pratinjau cerdas menampilkan **1 tema Bidang (biru)** berdampingan dengan **1 tema Kawasan (hijau)** untuk membuktikan secara visual alasan keberadaan target dual-basis dan bobot proporsional di kolom sebelahnya.
       - **Satker Single Basis (PHPT, PSKP, Tata Ruang)**: Menampilkan tema-tema pertama basis tersebut.
     - **Satker dengan 1 Tema**: Ditjen PHPT (*Hak Atas Tanah*) dan Ditjen PSKP (*Informasi Mengenai Sengketa...*) langsung terlihat utuh tanpa ada tombol tersembunyi.
  2. **Interaksi Ekspansi Inline (*Progressive Disclosure*)**:
     - Di samping chip ke-2, terdapat tombol interaktif `.igt-tag-more`: `+X lainnya ▾` (misal: `+10 lainnya ▾` pada Ditjen Penataan Agraria, `+4 lainnya ▾` pada Ditjen SPPR).
     - **Saat Diklik**: Sisa seluruh chip tema (`.igt-chips-hidden`) langsung mekar secara inline di baris tersebut dengan warna tematik masing-masing (biru untuk Bidang, hijau untuk Kawasan), dan tombol berganti teks menjadi **`Sembunyikan ▴`** dengan aksen warna pembeda (`.is-expanded`).
     - **Saat Diklik Kembali**: Seluruh chip tersembunyi melipat kembali secara instan dan tombol kembali ke format `+X lainnya ▾`.
  3. **Penghapusan Chip pada Kategori 2 & 3 (Grafik Batang Horizontal)**:
     - **Kategori 2 (IGT Paling Sering Diakses)**: Menghapus seluruh chip di bawah nama IGT. Judul tema IGT kini terpusat rapi secara vertikal di samping nomor badge medali.
     - **Kategori 3 (Direktorat Paling Sering Login)**: Menghapus seluruh chip di bawah nama direktorat/satker.
     - **Tampilan Minimalis & Seragam**: Setiap baris grafik batang horizontal kini memiliki tinggi yang seragam, simetris, dan bersih, mengarahkan fokus visual pengguna pada diagram batang dan angka frekuensi di ujung batang.

### 38. Perluasan Satker Sering Login (Direktorat, Kanwil, dan Kantah)
1. **Penggantian Nama Kategori Menjadi "Satker Sering Login"**:
   - Seluruh label terkait diubah dari *"Direktorat Sering Login"* / *"Direktorat yg Paling Sering Login"* menjadi **"Satker Sering Login"** / **"Satker yg Paling Sering Login"**.
   - Subbar info diperbarui menjadi: *"Daftar Satker (Direktorat, Kanwil, dan Kantah) yang Paling Sering Login ke Sistem Geoportal"*.
   - Nilai atribut `data-kategori="satker-login"` didukung secara penuh bersama alias mundur `direktorat-login`.
2. **Dataset Berimbang 3 Tingkat Administrasi Satker**:
   - Menambahkan data simulasi 20 satker aktif yang merefleksikan komposisi riil Kementerian ATR/BPN:
     - **Pusat (Ditjen)**: Ditjen SPPR (2.840 login), Ditjen Tata Ruang (1.950 login), Ditjen PHPT (1.540 login), Ditjen Penataan Agraria, Ditjen PTPP, Ditjen PPTR, Ditjen PSKP.
     - **Tingkat Provinsi (Kanwil BPN)**: Kanwil BPN Provinsi Jawa Barat (2.450 login), Jawa Timur (1.820 login), Jawa Tengah (1.480 login), DKI Jakarta (1.250 login), Bali (860 login), NTT (480 login).
     - **Tingkat Kabupaten/Kota (Kantah)**: Kantah Kab. Bogor (2.180 login), Kota Surabaya I (1.680 login), Kab. Sleman (1.360 login), Kota Jakarta Barat (1.180 login), Kab. Badung (1.050 login), Kab. Bandung (790 login), Kota Semarang (660 login).
3. **Badge Tipe Satker (`.igt-tipe-badge`)**:
   - Disematkan badge pill kecil di samping nama satker:
     - `.igt-tipe-badge--pusat`: Label **PUSAT** dengan aksen abu-abu slate netral (`#f1f5f9`, border `#cbd5e1`, teks `#475569`).
     - `.igt-tipe-badge--kanwil`: Label **KANWIL** dengan aksen ungu lavender lembut (`#faf5ff`, border `#e9d5ff`, teks `#7e22ce`).
     - `.igt-tipe-badge--kantah`: Label **KANTAH** dengan aksen hijau mint segar (`#ecfdf5`, border `#a7f3d0`, teks `#047857`).
4. **Perluasan Filter Satker & Ekspor CSV**:
   - Fungsi `getLeaderBoardSatkerList()` diperluas menyertakan sampel Kanwil dan Kantah untuk penyaringan di Kategori 1.
   - Fungsi `exportLeaderBoardToCSV()` mendukung kategori `satker-login` dan otomatis menyertakan tipe satker dalam kurung (misal: `"Kantah Kab. Bogor (Kantah)"`).

### 39. Pembersihan Label Bobot pada Kolom Persentase Capaian Renaksi
1. **Pembersihan Subteks Keterangan Bobot**:
   - Menghapus elemen subteks yang sebelumnya merender teks `(Bobot: X Ha, Y Bidang)` di bawah angka persentase pada tabel Leader Board Kategori 1 (*Capaian Renaksi Satker*).
   - Tampilan kolom persentase kini menjadi jauh lebih minimalis dan bersih: bilah progress bar horizontal dan angka persentase tebal (misal: `95.56%`) berjajar simetris secara vertikal (`align-items: center`).
2. **Penyelarasan Ekspor CSV**:
   - Pada berkas CSV hasil unduhan (`exportLeaderBoardToCSV()`), kolom persentase kini menyajikan murni nilai angka persentase tanpa tambahan string keterangan bobot.
3. **Preservasi Logika Perhitungan Matematis**:
   - Formula pembobotan berbasis rasio jumlah tema kawasan dan bidang ($w_{\text{kawasan}}$ dan $w_{\text{bidang}}$) tetap dipertahankan secara utuh pada logika kalkulasi data di latar belakang.

### 40. Penyederhanaan Filter Leader Board (Jenis IGT dan Tahun Saja)
1. **Dropdown Filter Jenis IGT (`#leader-board-jenis-wrap`)**:
   - Menambahkan dropdown filter baru pada toolbar Leader Board:
     - `Semua Jenis IGT` (`all`): Menampilkan seluruh satker dan 39 tema IGT dasar ATR/BPN.
     - `IGT Pertanahan` (`pertanahan`): Memfilter data agar hanya memuat tema-tema IGT Pertanahan (29 IGT) beserta Satker pengampunya (Ditjen PSKP, PHPT, SPPR, PTPP, Penataan Agraria, PPTR). Ditjen Tata Ruang otomatis dieliminasi dari daftar.
     - `IGT Tata Ruang` (`tataruang`): Memfilter data agar hanya memuat tema-tema IGT Tata Ruang (10 IGT) beserta Satker pengampunya (Ditjen Tata Ruang dan Ditjen PPTR). Satker yang murni hanya mengelola pertanahan otomatis dieliminasi.
2. **Penerapan pada Seluruh Kategori Leader Board**:
   - **Kategori 1 (Capaian Renaksi Satker)**: Menyesuaikan target dan capaian secara dinamis sesuai kumpulan IGT pada jenis yang dipilih, serta mengecualikan satker yang tidak memiliki tema pada jenis tersebut.
   - **Kategori 2 (IGT Sering Diakses)**: Menampilkan hanya tema IGT Pertanahan atau IGT Tata Ruang pada diagram batang horizontal.
   - **Kategori 3 (Satker Sering Login)**: Menyesuaikan daftar satker aktif sesuai keterlibatannya pada domain jenis IGT yang dipilih.
3. **Pembersihan Kontrol Redundan Toolbar**:
   - Menghapus dropdown filter Satker (`#leader-board-direktorat-wrap`) dan dropdown kategori (`#leader-board-kategori`) dari baris toolbar atas.
   - Kontrol atas kini hanya berfokus pada: Searchbar, Filter Jenis IGT, Filter Tahun, Unduh Data, dan View Full Table. Alih kategori 3 modul terpusat rapi pada tab segmen di subbar.

### 41. Transisi Entitas Leader Board dari Ditjen ke Direktorat Pengampu 39 IGT Resmi
1. **Pemetaan Presisi 39 IGT Resmi ke 13 Direktorat Eselon II**:
   - Seluruh 39 tema IGT dasar resmi Kementerian ATR/BPN kini dipetakan langsung ke unit Direktorat (Eselon II) pengampu riil:
     - **Direktorat Pengukuran Dan Pemetaan Kadastral** (1 Bidang): *Bidang Tanah*.
     - **Direktorat Penetapan Hak Atas Tanah dan Ruang** (1 Bidang): *Hak Atas Tanah*.
     - **Direktorat Penanganan Sengketa Pertanahan** (1 Bidang): *Informasi Mengenai Sengketa, Konflik, dan Perkara Pertanahan*.
     - **Direktorat Pemberdayaan Tanah Masyarakat** (1 Bidang): *Sebaran Lokasi Pemberdayaan Tanah Masyarakat*.
     - **Direktorat Survei Dan Pemetaan Tematik** (Dual-basis: 4 Bidang + 1 Kawasan): *Penguasaan Tanah*, *Pemilikan Tanah*, *Penggunaan Tanah*, *Pemanfaatan Tanah*, *Unsur Dasar Pertanahan*.
     - **Direktorat Penilaian Tanah Dan Ekonomi Pertanahan** (Dual-basis: 1 Bidang + 1 Kawasan): *Nilai Bidang Tanah*, *Zona Nilai Tanah*.
     - **Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan** (Dual-basis: 3 Bidang + 1 Kawasan): *Potensi Subjek Konsolidasi Tanah*, *Desain Konsolidasi Tanah*, *Hasil Penerapan Desain Konsolidasi Tanah*, *Sebaran Potensi Pengembangan Pertanahan*.
     - **Direktorat Penatagunaan Tanah** (Dual-basis: 2 Bidang + 3 Kawasan): *Pertimbangan Teknis Pertanahan*, *Inventarisasi Tanah Kritis*, *Lahan Baku Sawah*, *Kemampuan Tanah*, *Neraca Penatagunaan Tanah*.
     - **Direktorat Landreform** (6 Kawasan): *Persebaran Pulau-Pulau Kecil Terluar di Indonesia*, *Sebaran Tanah Objek Reforma Agraria*, *Analisa Tanah Objek Reforma Agraria*, *Potensi Objek Redistribusi Tanah*, *Potensi WP3WT*, *Tanah Timbul*.
     - **Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan Dan Wilayah Tertentu** (Dual-basis: 1 Bidang + 2 Kawasan): *Tanah Terindikasi Terlantar*, *Lahan Sawah Dilindungi*, *Kawasan Terindikasi Terlantar*.
     - **Direktorat Penertiban Pemanfaatan Ruang** (1 Bidang Tata Ruang): *Indikasi Pelanggaran Pemanfaatan Ruang*.
     - **Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I** (5 Kawasan Tata Ruang): *RTRW Provinsi*, *RTRW Kabupaten*, *RTRW Kota*, *RDTR Kabupaten/Kota*, *KKPR*.
     - **Direktorat Perencanaan Tata Ruang Nasional** (4 Kawasan Tata Ruang): *RTRW Nasional*, *RDTR Kawasan Perbatasan Negara*, *RTR Pulau/Kepulauan*, *RTR Kawasan Strategis Nasional*.
2. **Pembaruan Label Kolom dan Subbar Info**:
   - Header kolom kedua pada tabel Kategori 1 resmi diubah dari `Satker / Direktorat` menjadi **`Direktorat`**.
   - Subbar info diselaraskan menjadi *Peringkat Capaian Rencana Aksi (Renaksi) per Direktorat*.
3. **Penerapan pada Kategori 2 & 3 serta Ekspor CSV**:
   - Kategori 2 (*IGT Sering Diakses*) mengaitkan data satker pengampu dengan nama Direktorat resmi.
   - Kategori 3 (*Satker Sering Login*) mengganti nama-nama Ditjen pusat dengan Direktorat pengampu (dengan badge tipe **PUSAT**), bersanding harmonis dengan Kanwil (**KANWIL**) dan Kantah (**KANTAH**).
   - Ekspor CSV otomatis mengunduh nama kolom `Direktorat` beserta pemetaan IGT per Direktorat.

### 42. Penyederhanaan Leader Board Menjadi Top 5 Ringkas dan Pembersihan Kontrol Tabel
1. **Penetapan Kuota 5 Entri Tetap (*Fixed Top 5*)**:
   - Leader Board pada seluruh 3 kategori (*Capaian Renaksi Direktorat*, *IGT Sering Diakses*, dan *Satker Sering Login*) difokuskan murni sebagai kartu **Peringkat 5 Teratas (Top 5)** eksekutif.
   - Mengeliminasi pembagian halaman multihalaman yang tidak relevan untuk modul peringkat ringkas.
2. **Penghapusan Pilihan Per-Page dan Footer Paginasi**:
   - Menghapus kontrol pemilih per page (`#leader-board-perpage`: 5, 10, 25, 50) dan container footer (`#leader-board-foot`).
   - Tampilan bawah tabel kini berakhir bersih dan rapat langsung di bawah baris ke-5.
3. **Pembersihan Tombol Toolbar Atas**:
   - Menghapus tombol **Unduh Data** (`#leader-board-unduh`) dan tombol **View Full Table** (`#leader-board-full`).
   - Toolbar atas kini menyajikan tata letak minimalis dan fungsional: hanya memuat *Searchbar*, *Filter Jenis IGT*, dan *Filter Tahun*.

### 43. Penggabungan Tabel Detail Lengkap ke Dalam Kartu Leader Board dan Paginasi Dinamis (Default 10)
1. **Penyatuan Modul Data Eksekutif (Top 5) & Eksplorasi Detail**:
   - Menggabungkan tampilan ringkas Top 5 dengan tabel detail lengkap ke dalam satu kartu terpadu (`#leader-board`), menciptakan hierarki visual: **Top 5 Showcase** di atas dan **Tabel Detail Seluruh Data** di bawahnya.
   - Tabel detail secara dinamis berganti format dan kolom mengikuti kategori tab aktif di atas:
     - **Tab 1 (Capaian Renaksi)**: Menampilkan seluruh 13 Direktorat (atau sesuai filter jenis IGT), lengkap dengan daftar tema IGT (progressive disclosure `+X lainnya ▾`), kolom Target, Realisasi, dan Persentase Capaian.
     - **Tab 2 (IGT Sering Diakses)**: Menampilkan seluruh daftar tema IGT dengan rincian kolom No, Nama IGT, Jenis IGT (badge Pertanahan/Tata Ruang), Direktorat Pengampu, Akses Plugin QGIS, Akses Geoportal, dan Total Akses.
     - **Tab 3 (Satker Sering Login)**: Menampilkan seluruh data 20 Satker aktif (Pusat, Kanwil, Kantah) dengan rincian No, Nama Satker, Tipe Administrasi (badge Pusat/Kanwil/Kantah), Tema IGT Pengampu, Frekuensi Login, dan Status Keaktifan.
2. **Paginasi & Pilihan Per-Page (Default 10)**:
   - Dilengkapi pemilih kuota per page (`#leader-board-detail-perpage`) dengan **default 10 data** (opsi: 10, 25, 50).
   - Dilengkapi footer paginasi interaktif (`#leader-board-detail-pagination`) dengan navigasi halaman dinamis.
3. **Pencarian Lokal & Sorting Header Kolom**:
   - Disematkan kotak pencarian internal (`#leader-board-detail-cari`) untuk menyaring data spesifik pada tabel detail.
   - Setiap header kolom tabel detail dapat diklik untuk mengurutkan data secara *ascending* maupun *descending*.
4. **Penghapusan Kartu Capaian Renaksi Terpisah**:
   - Kartu lama `#capaian-renaksi` di bawah Leader Board telah dihapus secara menyeluruh dari kode markup dan script karena fungsinya telah diakomodasi secara lebih kaya dan kontekstual pada tabel detail ini.

### 44. Diferensiasi Format Tabel Detail: Tanpa Progress Bar, Tanpa Chip, dan Penulisan Satuan Teks Biasa
1. **Diferensiasi Desain Tabel Data Grid Standar**:
   - Berbeda dari visual Top 5 di bagian atas kartu yang mengusung gaya visual *leaderboard showcase* dengan badge dan progress bar, tabel detail di bagian bawah didesain sebagai tabel data konvensional yang bersih, ringkas, dan fokus pada keterbacaan data numerik.
2. **Penghapusan Progress Bar pada Kolom Persentase**:
   - Menghilangkan bilah grafik kemajuan (*progress bar*) dari kolom persentase capaian.
   - Nilai persentase ditampilkan murni dalam bentuk teks numerik tebal berukuran `14.5px` dengan pewarnaan semantik (`text-success` $\ge 85\%$, `text-warning` $70\text{--}84\%$, dan `text-danger` $< 70\%$).
3. **Pembersihan Chip dan Badge Tag**:
   - Kolom nama entitas (Direktorat pada Tab 1, Nama Satker pada Tab 3) disajikan sebagai teks nama polos tanpa deretan chip tema di bawahnya.
   - Kolom `Jenis IGT` (Tab 2) dan `Tipe Administrasi` (Tab 3) ditampilkan sebagai teks datar tanpa badge pill berwarna.
4. **Penulisan Satuan sebagai Teks Normal**:
   - Satuan target dan realisasi ditulis bersanding langsung dengan angkanya tanpa pembungkus badge (misal: `10 Bidang`, `120 Bidang`, `10.000 Ha`).
   - Satuan akses (Plugin, Geoportal, Total) ditulis biasa (`... kali`).
   - Satuan keaktifan login ditulis biasa (`... kali login`) serta status keaktifan ditampilkan sebagai teks berbobot semantik tanpa badge pill border.

### 45. Penghapusan Kolom Kotak (Checkbox) pada Seluruh Tabel Data
1. **Pembersihan Kolom Kotak dari Template Tabel**:
   - Menghapus elemen header centang kotak `<th class="igt-table__check is-plain"><img src="assets/img/icons/check-square.svg" alt=""></th>` dari:
     - Tabel **Statistik Derivatif** (`#statistik-derivatif-tabel`)
     - Tabel **Statistik Akses IGT** (`#statistik-akses-tabel`)
     - Tabel **Aktivitas Log** (`#aktivitas-log-tabel`)
   - Memastikan tabel **Statistik IGT** (`#statistik-igt-tabel`) dan tabel lainnya tetap bebas dari kolom kotak centang.
2. **Penyelarasan Logika Perenderan JavaScript**:
   - Menghapus pengecekan `hasCheck` dan pembuatan elemen `<th class="igt-table__check">` serta `<td class="igt-table__check">` pada fungsi `renderTableHeader(ctrl)` dan `renderTable(ctrl)` di [`assets/js/mockup-app.js`](assets/js/mockup-app.js).
   - Menghitung `totalColspan` secara murni berdasarkan `ctrl.columns.length + 1` (hanya nomor urut + kolom data).
3. **Penyelarasan Visual Seluruh Dashboard**:
   - Setiap tabel data kini memiliki struktur awal yang seragam dan konsisten: kolom pertama adalah nomor urut (`No`), langsung diikuti oleh data entitas utama (`Layer Derivatif`, `Unit / Wilayah`, `Nama User`, atau `Jenis IGT`). Tampilan tabel menjadi lebih bersih, lapang, dan profesional.

### 46. Transisi Sidebar Menjadi Navigasi Card per Role dan Simulasi Hak Akses Dashboard
1. **Perubahan Sidebar Konvensional Menjadi Role Switcher**:
   - Menu samping konvensional (Kompilasi Data, Integrasi Data, Create Layer Derivatif, CMS) digantikan dengan wadah kartu per role interaktif (`.igt-role-card`):
     - **Card 1: Superadmin**: Menampilkan badge `Pusat • Full Access`, radio indikator aktif, dan deskripsi hak akses nasional (tampilan awal aplikasi).
     - **Card 2: Direktorat SPPR**: Menampilkan badge `Eselon I / Pusat`, ikon kompas, dan deskripsi filter otomatis unit di lingkungan Ditjen SPPR.
     - **Card 3: Kanwil DIY**: Menampilkan badge `Tingkat Kanwil`, ikon pin lokasi, dan deskripsi isolasi hak akses wilayah D.I. Yogyakarta.
     - **Card 4: Kantah Gunung Kidul**: Menampilkan badge `Tingkat Kantah`, ikon gedung/kantor pertanahan, dan deskripsi isolasi hak akses Kabupaten Gunungkidul.
2. **Logika Simulasi dan Isolasi Data per Role**:
   - **Role 1 (Superadmin)**: Membuka kunci seluruh wilayah (`ROLE_LOCK_PROVINCE = null`, `ROLE_LOCK_KABUPATEN = null`). Peta kembali ke pandangan nasional 38 provinsi, dropdown wilayah memuat seluruh provinsi, dan seluruh modul menyajikan data nasional agregat.
   - **Role 2 (Direktorat SPPR)**: Mengunci fokus tematik pada 6 IGT dasar pengampu SPPR (*Bidang Tanah*, *Penguasaan Tanah*, *Pemilikan Tanah*, *Penggunaan Tanah*, *Pemanfaatan Tanah*, *Unsur Dasar Pertanahan*). Kartu detail informasi hanya menyajikan 6 chip tema tersebut. Kartu Usulan Data terfilter ke 24 data / 6 IGT. Leader Board Tab 1 memfilter hanya 2 direktorat SPPR (*Dit. Pengukuran & Pemetaan Kadastral* dan *Dit. Survei & Pemetaan Tematik*).
   - **Role 3 (Kanwil DIY)**: Mengunci wilayah pada `Daerah Istimewa Yogyakarta`. Peta secara instan beralih dan memperbesar poligon D.I. Yogyakarta. Dropdown wilayah kartu detail terkunci hanya menyajikan 5 kabupaten/kota di DIY (Bantul, Gunungkidul, Kulon Progo, Sleman, Kota Yogyakarta). Navigasi ke luar provinsi DIY diblokir dengan pemberitahuan akses (*role toast*). Leader Board Tab 3 hanya menampilkan satker di lingkungan D.I. Yogyakarta.
   - **Role 4 (Kantah Gunung Kidul)**: Mengunci wilayah spesifik pada Kabupaten Gunungkidul. Peta memusatkan dan menyorot poligon Gunungkidul. Dropdown wilayah kartu detail dinonaktifkan (`disabled`) dengan nilai tetap "Kabupaten Gunungkidul". Leader Board Tab 3 hanya menampilkan entri *Kantor Pertanahan Kabupaten Gunungkidul*.
3. **Banner Konteks Peran & Sinkronisasi Profil Pengguna**:
   - Disematkan bilah penanda peran aktif (`#igt-role-alert-bar`) di bagian atas dashboard dengan indikator gembok wilayah dan tombol pintas *"Kembali ke Superadmin"*.
   - Widget profil pengguna pada footer sidebar (`#sidebar-user-name`, `#sidebar-user-role`) dan header topbar secara dinamis tersinkronisasi mengikuti role yang aktif (*Admin ATR/BPN*, *Operator Ditjen SPPR*, *Operator Kanwil DIY*, atau *Operator Kantah GK*).

### 47. Penambahan Kolom IGT dan Default Pengelompokan per Direktorat pada Tabel Detail Capaian Renaksi (Sheet IGT.xlsx)
1. **Penyusunan Struktur Kolom Baru Tabel Detail**:
   - Kolom Tabel Detail Capaian Rencana Aksi (Renaksi) pada kartu Leader Board (`#leader-board-detail-table`) diperbarui dengan menambahkan kolom baru **`IGT`** di antara kolom `Direktorat` dan `Target`.
   - Urutan kolom resmi: **`No` $\rightarrow$ `Direktorat` $\rightarrow$ `IGT` $\rightarrow$ `Target` $\rightarrow$ `Realisasi` $\rightarrow$ `Persentase Capaian`**.
2. **Integrasi Data Resmi 43 IGT dari `Examples/IGT.xlsx`**:
   - Dataset detail renaksi mengadopsi 43 IGT resmi dari berkas spreadsheet `Examples/IGT.xlsx` yang dipetakan ke 19 Direktorat pengampu teknis:
     - *Direktorat Perencanaan Tata Ruang* (4 IGT: RTRWN, RTR Pulau, RTR KSN, RDTR KPN).
     - *Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I* (4 IGT: RTRW Provinsi, RTRW Kabupaten, RTRW Kota, RDTR Kab/Kota).
     - *Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah II* (4 IGT: RTRW Provinsi, RTRW Kabupaten, RTRW Kota, RDTR Kab/Kota).
     - *Direktorat Sinkronisasi Pemanfaatan Ruang* (1 IGT: Izin Lokasi & KKPR).
     - *Direktorat Pengukuran dan Pemetaan Kadastral* (1 IGT: Bidang Tanah).
     - *Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang* (1 IGT: Unsur Dasar Pertanahan).
     - *Direktorat Survei Dan Pemetaan Tematik* (4 IGT: Penggunaan Tanah, Pemilikan Tanah, Penguasaan Tanah, Pemanfaatan Tanah).
     - *Sekretariat Ditjen Penetapan Hak dan Pendaftaran Tanah* (1 IGT: Hak Atas Tanah).
     - *Direktorat Pengaturan Tanah Pemerintah, Tanah Ulayat, dan Tanah Komunal* (1 IGT: Hak Ulayat).
     - *Direktorat Landreform* (3 IGT: Sebaran TORA, Analisa TORA, Potensi Redistribusi).
     - *Direktorat Pemberdayaan Tanah Masyarakat* (1 IGT: Sebaran Lokasi Pemberdayaan).
     - *Direktorat Penatagunaan Tanah* (7 IGT: LBS, Neraca PGT, Pertek, Kemampuan Tanah, Potensi Pesisir/Pulau Kecil, Inventarisasi Tanah Kritis, Tanah Timbul).
     - *Direktorat Bina Pengadaan Dan Pencadangan Tanah* (1 IGT: Penlok Pengadaan Tanah).
     - *Direktorat Konsolidasi Tanah Dan Pengembangan Pertanahan* (3 IGT: Potensi Subjek Objek KT, Desain KT, Lokasi Pengembangan Pertanahan).
     - *Direktorat Penilaian Tanah dan Ekonomi Pertanahan* (2 IGT: ZNT, Nilai Bidang Tanah).
     - *Direktorat Penertiban Pemanfaatan Ruang* (1 IGT: Indikasi Pelanggaran Pemanfaatan Ruang).
     - *Direktorat Pengendalian Hak Tanah, Alih Fungsi Lahan, Kepulauan dan Wilayah Tertentu* (1 IGT: LSD).
     - *Direktur Penertiban Penguasaan, Pemilikan dan Penggunaan Tanah* (2 IGT: Tanah Terindikasi Telantar, Kawasan Terindikasi Telantar).
     - *Sekretariat Ditjen Penanganan Sengketa dan Konflik Pertanahan* (1 IGT: Sengketa, Konflik, dan Perkara Pertanahan).
   - Ditambahkan entitas daerah (*Kanwil BPN Provinsi D.I. Yogyakarta* dan *Kantah Kab. Gunungkidul*) untuk mendukung simulasi isolasi peran (*role switcher*).
3. **Penyajian Metrik per IGT Individual**:
   - Setiap baris data mewakili satu IGT individual, sehingga capaian Target, Realisasi, dan Persentase capaian ditunjukkan secara mandiri per IGT dengan format teks bersih:
     - Target dan Realisasi bersanding dengan satuannya secara teks biasa (misal: `50.000 Bidang` atau `1.200 Ha`).
     - Persentase Capaian murni teks tebal semantik (`text-success`, `text-warning`, `text-danger`) tanpa progress bar dan tanpa badge chip.
4. **Default Pengelompokan per Direktorat (*Grouped View*)**:
   - Secara default (kondisi awal maupun saat diurutkan berdasarkan kolom Direktorat), tabel menyajikan baris-baris IGT yang terkelompok rapi di bawah Direktorat pengampunya.
   - Disematkan baris pembatas grup elegan (`<tr class="igt-table-group-header">`) yang menyajikan badge penanda Direktorat Pengampu, jumlah IGT di bawah direktorat tersebut, serta rata-rata capaian direktorat.
5. **Transisi Sorting Global & Pencarian Fleksibel**:
   - Jika pengguna mengklik sort pada header kolom metrik (*Persentase Capaian*, *Target*, atau *Realisasi*), baris pembatas grup otomatis disembunyikan dan tabel menyajikan daftar terurut global dari nilai tertinggi ke terendah secara mulus.
   - Jika pengguna mengklik kembali kolom *Direktorat*, tabel secara otomatis kembali ke mode terkelompok per direktorat (*grouped view*).
   - Terintegrasi penuh dengan pencarian instan `#leader-board-detail-cari`, filter Jenis IGT, filter Tahun, dan filter role switcher.

### 51. Penggabungan Sel (Rowspan Merge) Kolom Satker, Penggantian Label Kolom Menjadi Satker, dan Pembaruan Judul Tabel Renaksi
- **Penggabungan Sel Vertikal (`rowspan`)**:
  - Pada mode pengelompokan default (*Grouped View*), sel Satker di kolom kedua digabungkan secara vertikal menggunakan atribut HTML `rowspan` sesuai dengan jumlah IGT yang dinaungi Satker tersebut pada halaman aktif (misalnya: *Direktorat Bina Perencanaan Tata Ruang Daerah Wilayah I* memiliki 4 IGT sehingga dirender dengan `<td rowspan="4" class="igt-table__merged-satker">`).
  - Baris-baris IGT berikutnya di bawah Satker yang sama tidak merender tag `<td>` Satker, menjaga struktur tabel tetap valid dan presisi.
  - Setiap sel Satker ter-merge dilengkapi teks nama Satker yang dipertegas (`font-weight: 600`), badge ringkasan jumlah IGT (misal: `4 IGT`), dan badge persentase rata-rata capaian Satker.
- **Penggantian Istilah dan Label Kolom**:
  - Kolom kedua pada tabel leaderboard atas dan tabel detail diubah dari **`Direktorat`** menjadi **`Satker`**.
  - Kolom keempat pada tabel detail IGT Sering Diakses diperbarui menjadi **`Satker Pengampu`**.
- **Pembaruan Judul Tabel & Subbar**:
  - Judul tabel detail diubah menjadi **"Tabel Detail Capaian Rencana Aksi (Renaksi) per Satker"** (sebelumnya *per Direktorat*).
  - Teks subbar leaderboard atas diperbarui menjadi **"Peringkat Capaian Rencana Aksi (Renaksi) per Satker"**.
- **Penataan Gaya Visual (CSS)**:
  - Sel Satker ter-merge diposisikan tepat di tengah secara vertikal (`vertical-align: middle !important`) dengan latar belakang halus (`#f8fafc`).
  - Batas bawah grup Satker diberi garis pemisah tegas (`border-bottom: 2px solid #cbd5e1;`) sehingga pergantian antar-Satker tampak kontras, rapi, dan mudah dibaca persis seperti lembar kerja resmi Kementerian ATR/BPN.

### 52. Penggantian Kolom Tanggal Menjadi Waktu dengan Format Timestamp Penuh (Jam:Menit:Detik) pada Aktivitas Log
- **Perekaman Timestamp Presisi (`Jam:menit:detik`)**:
  - Format data pada Aktivitas Log (`#aktivitas-log`) dikonversi dari tanggal polos (misal: "15 Oktober 2026") menjadi timestamp standar penuh: **`YYYY-MM-DD HH:mm:ss`** (contoh: `2026-10-18 14:32:10`, `2026-10-18 14:28:45`, `2026-10-18 13:55:02`).
  - Perekaman waktu presisi diterapkan konsisten di tingkat nasional, provinsi, maupun kabupaten/kota.
- **Pembaruan Label Kolom**:
  - Kolom keempat pada header tabel Aktivitas Log diubah dari **`Tanggal`** menjadi **`Waktu`** (`data-kolom="waktu"`).
  - Dropdown filter waktu pada toolbar kartu juga diselaraskan menjadi *Waktu*.
- **Penyortiran Kronologis Natural (*Chronological Sorting*)**:
  - Tabel Aktivitas Log diatur default dengan urutan menurun (*descending / newest first*), sehingga aktivitas terbaru langsung tampil di baris teratas.
  - Fungsi penyortiran tabel `parseSortValue` diperluas mengenali pola tanggal/waktu ISO (`YYYY-MM-DD HH:mm:ss`), sehingga pengguna dapat mengklik header kolom *Waktu* untuk membalik urutan (terlama $\leftrightarrow$ terbaru) secara akurat berbasis epoch milliseconds.
- **Penyelarasan Tampilan Tipografi**:
  - Kolom waktu ditampilkan menggunakan styling monospace dengan `font-variant-numeric: tabular-nums` dan warna `#334155`, menghasilkan perataan karakter angka jam, menit, dan detik yang lurus, presisi, dan mudah dipindai mata.

### 53. Pengurutan Rata-rata Persentase Capaian Direktorat Tertinggi, Label Kolom & Judul Menjadi Direktorat, dan Penyingkatan Istilah Menjadi Renaksi
- **Pengurutan Rata-rata Tertinggi (*Highest Average First*)**:
  - Pada mode grup default, tabel detail renaksi menghitung persentase rata-rata tiap Direktorat dari seluruh IGT yang diampunya, kemudian menyajikan urutan Direktorat secara menurun dari nilai rata-rata tertinggi:
    1. *Sekretariat Ditjen PHPT* (1 IGT, 97.00%)
    2. *Sekretariat Ditjen PSKP* (1 IGT, 96.00%)
    3. *Direktorat Pengukuran dan Pemetaan Kadastral* (1 IGT, 94.00%)
    4. *Direktorat Survei Dan Pemetaan Tematik* (4 IGT, rata-rata 92.50%)
    5. *Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang* (1 IGT, 92.00%)
    6. *Direktorat Penilaian Tanah dan Ekonomi Pertanahan* (2 IGT, 90.00%)
    7. dst. hingga urutan terbawah.
  - Seluruh IGT di bawah tiap Direktorat tetap terkumpul contiguous dan ter-merge presisi via `rowspan` vertikal.
- **Penyesuaian Label Kolom dan Judul Tabel Menjadi Direktorat**:
  - Kolom kedua pada tabel leaderboard atas dan tabel detail diubah menjadi **`Direktorat`**.
  - Judul tabel detail diubah menjadi **"Tabel Detail Capaian Renaksi per Direktorat"**.
  - Subbar info leaderboard diubah menjadi **"Peringkat Capaian Renaksi per Direktorat"**.
  - Tombol tab pertama diubah menjadi **"1. Capaian Renaksi Direktorat"**.
- **Penyingkatan Istilah Menjadi "Renaksi"**:
  - Seluruh judul, subbar, dan label tidak lagi menjabarkan kata "Rencana Aksi (Renaksi)", melainkan murni menggunakan istilah ringkas **"Renaksi"** (misal: *Capaian Renaksi Direktorat*, *Tabel Detail Capaian Renaksi per Direktorat*).

### 54. Pengayaan Dataset Penuh pada Seluruh Role dan Cakupan Wilayah Khusus Leaderboard & Tabel Detail (Kanwil se-Indonesia untuk DIY, Kantah se-DIY untuk Gunungkidul)
- **Populasi Data Penuh Seluruh Tabel ($\ge 10$ baris per modul)**:
  - **Statistik Derivatif**: Menyajikan 10 layer derivatif realistis dan kontekstual pada masing-masing peran (misal: Nasional memuat tumpang tindih kawasan hutan vs HAT & KKPR, SPPR memuat derivatif batas kadastral & validasi topologi, Kanwil DIY memuat derivatif sumbu filosofi & KRB Merapi, Kantah Gunungkidul memuat derivatif JJLS & Karst Gunung Sewu).
  - **Statistik Akses IGT**: Setiap peran memiliki 10 baris aktivitas akses dari unit dan seksi teknis yang relevan.
  - **Aktivitas Log**: Setiap peran memiliki 10 baris log aktivitas riil lengkap dengan format timestamp presisi `YYYY-MM-DD HH:mm:ss`.
  - **Statistik IGT**: Setiap peran menyajikan 10 baris tema IGT relevan dengan rincian jumlah provinsi, kabupaten, bidang, dan luas.
  - **Statistik IGT Wilayah**: Menampilkan 10 provinsi/kabupaten relevan (Kanwil DIY menampilkan kelima kab/kota se-DIY, Kantah Gunungkidul menampilkan 10 kapanewon di Kab. Gunungkidul).
- **Leaderboard & Tabel Detail Spesifik per Peran (*Role-Adaptive Leaderboard & Detail Table*)**:
  - **Role Kantah Gunungkidul (`kantah-gunungkidul`)**:
    - Leaderboard Top 5 menampilkan kelima Kantah se-DIY (*Kantah Kota Yogyakarta*, *Kantah Kab. Sleman*, *Kantah Kab. Bantul*, *Kantah Kab. Gunungkidul*, *Kantah Kab. Kulon Progo*).
    - Tabel Detail menampilkan seluruh **19 IGT** di bawah kelima Kantah se-DIY dengan pengelompokan vertikal via `rowspan` dan urutan persentase rata-rata tertinggi.
    - Judul tabel berlabel **"Tabel Detail Capaian Renaksi per Kantah"**, subbar info **"Peringkat Capaian Renaksi per Kantah"**, tombol tab **"1. Capaian Renaksi Kantah"**, dan header kolom berlabel **`Kantah`**.
    - Tab 3 (*Satker Sering Login*) menampilkan kelima Kantah se-DIY.
  - **Role Kanwil DIY (`kanwil-diy`)**:
    - Leaderboard Top 5 menampilkan 5 Kanwil terbaik se-Indonesia.
    - Tabel Detail menampilkan seluruh **15 Kanwil se-Indonesia** (45 baris IGT) dengan pengelompokan vertikal via `rowspan` dan urutan persentase rata-rata tertinggi.
    - Judul tabel berlabel **"Tabel Detail Capaian Renaksi per Kanwil"**, subbar info **"Peringkat Capaian Renaksi per Kanwil"**, tombol tab **"1. Capaian Renaksi Kanwil"**, dan header kolom berlabel **`Kanwil`**.
    - Tab 3 (*Satker Sering Login*) menampilkan seluruh 15 Kanwil se-Indonesia.
  - **Role Ditjen SPPR (`sppr`)**:
    - Komponen internal (Ringkasan Data Usulan, Kompilasi & Integrasi, Statistik Derivatif, Statistik Akses, Log Aktivitas, dan Statistik IGT) terisolasi penuh khusus untuk lingkup Ditjen SPPR.
  - **Role Superadmin (`superadmin`)**:
    - Menampilkan seluruh 19 Direktorat Kementerian ATR/BPN Pusat (43 IGT).

### 55. Aktivasi Visibilitas Seluruh Direktorat Kementerian pada Leaderboard Role SPPR untuk Pacuan Berkompetisi dan Penyematan Badge Satker Pengguna
- **Prinsip Pacuan Berkompetisi Antar-Direktorat pada Role SPPR**:
  - Pada role **Direktorat SPPR (`sppr`)**, Leaderboard (Top 5) beserta Tabel Detail di bawahnya tidak lagi menyaring unit intern SPPR saja, melainkan membuka visibilitas ke seluruh **19 Direktorat Kementerian ATR/BPN** (43 IGT) sebagaimana halnya Superadmin. Hal ini dirancang agar pimpinan dan staf Direktorat SPPR dapat membandingkan capaian kinerjanya secara langsung dengan direktorat-direktorat lain di lingkungan Kementerian ATR/BPN.
  - **Tab 1 (Capaian Renaksi Direktorat)**: Menampilkan 19 Direktorat kementerian terurut persentase rata-rata tertinggi:
    1. *Sekretariat Ditjen PHPT* (97.00%)
    2. *Sekretariat Ditjen PSKP* (96.00%)
    3. *Direktorat Pengukuran dan Pemetaan Kadastral* (94.00%) — `[Unit Anda]`
    4. *Direktorat Survei Dan Pemetaan Tematik* (92.50%) — `[Unit Anda]`
    5. *Direktorat Pengukuran Dan Pemetaan Dasar Pertanahan Ruang* (92.00%) — `[Unit Anda]`
    6. *Direktorat Penilaian Tanah dan Ekonomi Pertanahan* (90.00%) — `[Unit Anda]`
    7. dst. (total 43 baris data IGT terkelompok rapi dengan `rowspan`).
  - **Tab 2 (IGT Sering Diakses)**: Menampilkan 15 IGT paling sering diakses secara nasional, di mana IGT pengampu SPPR (*Bidang Tanah*, *Penguasaan Tanah*, dll.) bersanding dengan IGT kementerian lainnya.
  - **Tab 3 (Satker Sering Login)**: Menampilkan 12 entitas Pusat/Direktorat Kementerian ATR/BPN (*Dit. Survei & Pemetaan Tematik*, *Dit. Pengukuran Kadastral*, *Dit. Pemetaan Dasar*, *Dit. Penilaian Tanah*, *Balai Tematik*, *Dit. Bina Renstra Wil I*, dll.).
- **Penyematan Badge Pengenal Satker Pengguna (`getRoleSatkerBadge`)**:
  - Untuk memudahkan identifikasi posisi unit kerja pengguna dalam persaingan (*competitive edge*), disematkan badge penanda semantik biru elegan:
    - **Role SPPR**: Menyematkan badge `[Unit Anda]` pada unit-unit Ditjen SPPR (*Kadastral*, *Tematik*, *Dasar Pertanahan Ruang*, *Penilaian Tanah*, *Balai Tematik*, *Setditjen SPPR*).
    - **Role Kanwil DIY**: Menyematkan badge `[Wilayah Anda]` pada *Kanwil BPN Provinsi D.I. Yogyakarta*.
    - **Role Kantah Gunungkidul**: Menyematkan badge `[Kantah Anda]` pada *Kantah Kab. Gunungkidul*.
  - Badge disematkan konsisten di:
    - Kolom nama satker leaderboard Top 5 Capaian Renaksi.
    - Judul baris diagram batang horizontal Satker Sering Login.
    - Sel satker ter-merge (`rowspan`) maupun sel flat tabel detail capaian renaksi.
    - Kolom satker pengampu pada tabel detail pemanfaatan IGT dan baris satker sering login.
- **Isolasi Modul Internal SPPR Tetap Terjaga**:
  - Peta spasial, Ringkasan Data Usulan (24 data / 6 IGT), Kompilasi & Integrasi Bulanan, Statistik Derivatif (10 layer derivatif SPPR), Statistik Akses IGT, Aktivitas Log, dan Statistik IGT tetap terisolasi dan berfokus khusus pada unit Ditjen SPPR.

### 56. Penyatuan Tampilan Leaderboard dan Tabel Detail Seluruh Role Mengikuti Standar Superadmin
- **Penyamaan Tampilan & Dataset Leaderboard**:
  - Seluruh role (`superadmin`, `sppr`, `kanwil-diy`, dan `kantah-gunungkidul`) kini menyajikan kartu **Leaderboard (Top 5)** beserta **Tabel Detail di Bawahnya** yang 100% seragam mengikuti standar Superadmin nasional.
  - Logika pemfilteran leaderboard `applyRoleFilterToLeaderboard()` disederhanakan sehingga semua role mengakses dataset nasional yang utuh:
    - **Tab 1 (Capaian Renaksi Direktorat)**: Menampilkan seluruh 19 Direktorat Kementerian ATR/BPN (43 Data IGT) dengan penggabungan vertikal `rowspan` dan urutan persentase rata-rata tertinggi (Top 5: *Setditjen PHPT*, *Setditjen PSKP*, *Dit. Pengukuran Kadastral*, *Dit. Survei Tematik*, *Dit. Pemetaan Dasar*).
    - **Tab 2 (IGT Sering Diakses)**: Menampilkan 15 IGT paling sering diakses secara nasional.
    - **Tab 3 (Satker Sering Login)**: Menampilkan seluruh 38 Satuan Kerja aktif nasional (Direktorat, Kanwil, Kantah).
- **Keseragaman Label, Judul, dan Header**:
  - Subbar info leaderboard: **"Peringkat Capaian Renaksi per Direktorat"**.
  - Tombol segmen tab 1: **"1. Capaian Renaksi Direktorat"**.
  - Header kolom kedua: **`Direktorat`**.
  - Judul tabel detail: **"Tabel Detail Capaian Renaksi per Direktorat"** (badge: **`43 Data`**).
  - Teks nama entitas bersih tanpa badge pembeda khusus role, persis sebagaimana tampilan Superadmin.
- **Isolasi Hak Akses & Modul Non-Leaderboard Tetap Terjaga**:
  - Penguncian wilayah spasial (peta, drilldown level kabupaten/kota, dropdown wilayah) dan filter data operasional internal (Usulan Data, Kompilasi & Integrasi, Statistik Derivatif, Statistik Akses, Aktivitas Log, dan Statistik IGT) tetap berjalan spesifik pada masing-masing role:
    - *Superadmin*: Akses bebas seluruh Indonesia (38 Provinsi, 520 Kabupaten/Kota).
    - *Direktorat SPPR*: Filter fokus pada dataset tematik dan operasional internal Ditjen SPPR.
    - *Kanwil DIY*: Peta dan dropdown wilayah terkunci khusus untuk D.I. Yogyakarta (5 Kab/Kota).
    - *Kantah Gunungkidul*: Peta dan dropdown wilayah terkunci khusus untuk Kab. Gunungkidul.

### 57. Implementasi Grafik Area Spline Interaktif untuk Modul Statistik Akses IGT dan Aktivitas Log
- **Visualisasi Kurva Spline Halus (*Smooth Spline Area Chart*)**:
  - Mengimplementasikan tampilan visualisasi grafik batang kurva halus (*spline area chart*) pada modul **Statistik Akses IGT** (`#statistik-akses-grafik`) dan **Aktivitas Log** (`#aktivitas-log-grafik`) yang dapat diaktifkan melalui tombol segmen **[Grafik]** pada masing-masing kartu, persis sesuai tangkapan layar sistem Geoportal IGT.
- **Statistik Akses IGT (`#statistik-akses-grafik`)**:
  - **Sumbu Y**: Skala angka 0–600 (`600`, `500`, `400`, `300`, `200`, `100`, `0`) dengan garis kisi horizontal halus (`#f1f5f9`).
  - **Sumbu X**: Rentang 12 bulan kalender (`Jan`, `Feb`, `Mar`, `Apr`, `Mei`, `Jun`, `Jul`, `Agu`, `Sep`, `Okt`, `Nov`, `Des`).
  - **Kurva Tren**: Membentuk kurva spline halus dengan warna biru utama ATR/BPN (`#2563eb`), isian gradien vertikal transparan (`rgba(59, 130, 246, 0.22)` ke `0.01`), titik lonjakan di bulan Agustus (415) dan puncaknya di bulan Oktober (525).
  - **Sub-toolbar & Legenda**: Memuat legenda *Total Akses Login* di sisi kiri dan dropdown filter metrik interaktif di sisi kanan (*Data Berdasarkan Akses User*, *Akses Plugin QGIS*, *Akses Geoportal*, *Total Akses*).
  - **Ikon Waveform**: Disematkan ikon sparkline gelombang aktivitas pada baseline sudut kiri bawah.
- **Aktivitas Log (`#aktivitas-log-grafik`)**:
  - **Sumbu Y**: Skala angka 0–1.000 (`1.000`, `800`, `600`, `400`, `200`, `0`).
  - **Sumbu X**: Rentang 12 bulan kalender (`Jan` s.d. `Des`).
  - **Kurva Tren**: Kurva spline area biru dengan lonjakan di bulan Agustus (480) dan puncak di bulan Oktober (885).
  - **Sub-toolbar & Legenda**: Memuat legenda *Total Log* di sisi kiri dan ikon sparkline pada baseline kiri bawah.
- **Interaktivitas Hover & Tooltip**:
  - Setiap bulan memiliki kolom deteksi hover interaktif yang menampilkan garis pandu vertikal putus-putus (`#93c5fd`), titik lingkaran penanda (*marker dot*), dan tooltip melayang (*floating tooltip*) berisi nama bulan, tahun renaksi, dan angka capaian metrik secara presisi.
- **Pergantian Tab Mulus & Sinkronisasi Role**:
  - Pengguna dapat beralih bebas antara **[Tabel]** dan **[Grafik]** secara instan tanpa reload halaman.
  - Tampilan grafik secara dinamis menyesuaikan skala capaian saat berganti role (*Superadmin*, *SPPR*, *Kanwil DIY*, *Kantah Gunungkidul*) dan tahun renaksi.

### 11. Penegasan Nomenklatur Role Non-Superadmin (Admin Satker vs Operator Lapangan)
- **Konteks & Alasan**:
  - Tampilan dashboard dan visualisasi data yang disajikan pada role non-superadmin (*Direktorat SPPR*, *Kanwil DIY*, *Kantah Gunung Kidul*) ditujukan untuk level pemangku kepentingan administratif / pimpinan satker (**Admin**), bukan **Operator** lapangan.
  - Akun dengan level Operator direncanakan memiliki antarmuka alur kerja khusus (misal: formulir input data spasial, modul pengunggahan shapefile/geodatabase, dan alat verifikasi topologi) di tahap pengembangan berikutnya.
- **Pembaruan Kartu Role Sidebar**:
  - **Superadmin**: `1. Superadmin` — Badge: `Pusat • Full Access`
  - **Direktorat SPPR**: `2. Admin Direktorat SPPR` — Badge: `Admin Ditjen SPPR`
  - **Kanwil DIY**: `3. Admin Kanwil DIY` — Badge: `Admin Kanwil`
  - **Kantah Gunung Kidul**: `4. Admin Kantah Gunung Kidul` — Badge: `Admin Kantah`
- **Sinkronisasi Widget Profil Pengguna**:
  - Footer sidebar dan dropdown profil header otomatis memperbarui nama dan jabatan sesuai role yang dipilih:
    - *Superadmin*: `Admin ATR/BPN` (Superadministrator)
    - *SPPR*: `Admin Ditjen SPPR` (Admin Direktorat SPPR)
    - *Kanwil DIY*: `Admin Kanwil DIY` (Admin Kanwil BPN D.I. Yogyakarta)
    - *Kantah GK*: `Admin Kantah GK` (Admin Kantah Kab. Gunungkidul)
- **Alert Banner Role Khusus**:
  - Menampilkan badge semantik dan deskripsi akses bertaraf admin (*Akses Admin: Data di dashboard otomatis terfilter khusus tema dan direktorat pengampu di lingkungan Ditjen SPPR* / *Akses Admin: Wilayah terkunci*).

---

## 📁 Struktur Berkas Terkait

```text
IGTPR-UI-mockup/
├── index.html                           # Markup utama dashboard, integrasi MapLibre GL, & styling
├── build_topological_map.py             # Script Python konversi SHP ke GeoJSON bebas gap/overlap
├── CATATAN_PERUBAHAN_MOCKUP.md          # Dokumentasi catatan perubahan (file ini)
├── README.md                            # Panduan menjalankan mockup
├── assets/
│   ├── css/
│   │   ├── igt-components.css           # Styling dasar komponen UI
│   │   └── igt-dashboard.css            # Layout dashboard
│   ├── js/
│   │   ├── mockup-app.js                # Logika interaksi peta, drill-down, & filter wilayah
│   │   └── dummy-data.js                # Data simulasi tema IGT, statistik, & log aktivitas
│   └── data/
│       ├── indonesia-kabupaten.geojson  # GeoJSON resmi 520 Kabupaten/Kota (3.79 MB)
│       ├── indonesia-provinsi.geojson   # GeoJSON resmi 38 Provinsi (2.05 MB)
│       ├── indonesia-kabupaten.js       # Wrapper JS kabupaten untuk window scope
│       └── indonesia-provinsi.js        # Wrapper JS provinsi untuk window scope
└── shp/
    ├── batas_kabupaten_kota_shapefile/  # Source SHP kabupaten mentah
    └── batas_provinsi_shapefile/        # Source SHP provinsi mentah
```

---

## 🚀 Verifikasi & Validasi
- **Pengujian Fungsional**: Teruji menggunakan browser headless (Chromium via CDP) untuk seluruh skenario:
  - Pemuatan awal tingkat nasional.
  - Navigasi drill-down provinsi (misal: Jawa Tengah, Bali, Jawa Barat).
  - Navigasi pemilihan kabupaten dan tombol kembali (*breadcrumb*).
  - Penyaringan tema berdasarkan Jenis IGT (*Pertanahan* & *Tata Ruang*).
  - Penyaringan tema berdasarkan *Tahun Renaksi* (2023–2026).
- **Integritas Spasial**: Poligon kabupaten saling menempel presisi (*edge-matched*) tanpa celah (*gap*) dan tanpa tumpang tindih (*overlap*). Batas provinsi sejalan 100% dengan batas luar kabupaten.


### 58. Penyesuaian Nama Tab Leaderboard

- **Konteks**: Penyelarasan nomenklatur tab leaderboard dengan rancangan antarmuka terbaru.
- **Perubahan label tab**:
  1. **Capaian Renaksi** (sebelumnya *Capaian Renaksi Direktorat*).
  2. **Frekuensi Akses IGT** (sebelumnya *IGT Sering Diakses*).
  3. **Frekuensi Login Pengguna** (sebelumnya *Satker Sering Login*).
- **Konsistensi UI**: Label tab pada markup HTML dan konfigurasi JavaScript leaderboard diselaraskan. Struktur kategori, filter, dan mekanisme data yang mendasari tiap tab tetap dipertahankan.
- **Referensi desain**: Screenshot acuan yang diberikan untuk mockup pada 26 Oktober 2026.


### 59. Gradasi Choropleth Peta Tingkat Kabupaten/Kota

- **Konteks**: Peta tingkat kabupaten sebelumnya berwarna seragam (`#e0f2fe`, opacity 0.55), tidak seperti tingkat provinsi yang sudah bergradasi.
- **Perubahan**: Isi poligon kabupaten (`kabupaten-isi`) kini memakai warna `#1d4ed8` dengan opacity bergradasi berdasarkan **jumlah data IGT yang terunggah** per kabupaten (0 → 0.04, 1 → 0.16, 3 → 0.32, 5 → 0.50, ≥7 → 0.68).
- **Sumber data**: Fungsi `siapkanJumlahDataKabupaten()` membaca seluruh `statistikIGTKabupaten` (`jumlahIgt`) pada `MOCKUP_DATA` dan menyimpannya sebagai properti `jumlahData` pada GeoJSON kabupaten. Kabupaten tanpa data bernilai 0.
- **Konsistensi**: Gradasi diterapkan pada style awal, saat masuk ke provinsi, dan saat kembali dari kabupaten ke provinsi. Sorotan kabupaten terpilih tidak berubah.

### 60. Filter Bulan pada Leaderboard

- **Perubahan**: Ditambahkan dropdown **Periode Bulan** (`#leader-board-bulan`) di samping filter tahun Leaderboard: *Semua Bulan*, *Januari*, *s.d. Februari* … *s.d. Desember* (kumulatif).
- **Cakupan**: Filter berlaku untuk **grafik leaderboard dan Tabel Detail Data** sekaligus, pada ketiga tab (Capaian Renaksi, Frekuensi Akses IGT, Frekuensi Login Pengguna).
- **Logika data dummy**: `MOCKUP_DATA.leaderBoardBulan` + `getLeaderBoardBulanFactor()` (faktor 0.25 + 0.75 × bulan/12). Pada Capaian Renaksi faktor hanya mengurangi realisasi (target tetap) sehingga persentase capaian ikut turun; pada akses & login faktor mengurangi frekuensi.

### 61. Penghapusan Kolom "Tema IGT Pengampu" pada Tabel Frekuensi Login

- **Perubahan**: Kolom **Tema IGT Pengampu** dihapus dari Tabel Detail tab *Frekuensi Login Pengguna* (konfigurasi `satker-login` & `direktorat-login` serta render baris di `updateLeaderBoardDetailTable()`).
- **Kolom tersisa**: No, Nama Satuan Kerja, Tipe Administrasi, Frekuensi Login, Status Keaktifan.

### 62. Penghapusan Card Statistik Akses IGT

- **Perubahan**: Card **Statistik Akses IGT** (`#statistik-akses`, tabel + grafik area spline) dihapus dari halaman dashboard, beserta pemanggilan `renderTableSection('statistik-akses', ...)` di `applyDataFilter()`.
- **Catatan**: Data akses IGT tetap tersedia melalui tab *Frekuensi Akses IGT* pada Leaderboard.

### 63. Penambahan Role Operator (Tampilan Dashboard Tersendiri)

- **Konteks**: Role Operator memiliki tampilan dashboard yang jauh berbeda dari role admin, mengacu pada screenshot `Examples/Operator`.
- **Role card baru**: *5. Operator* (badge ungu "Operator Direktorat") pada panel Pilih Role Simulasi. Profil sidebar/topbar menjadi **Direktorat ATR/BPN — Operator**.
- **Tampilan Operator** (`#dashboard-operator`), menggantikan seluruh dashboard admin (`#dashboard-admin`) saat role aktif:
  1. Breadcrumb *Dashboard / DIREKTORAT* dan judul **Selamat Datang**.
  2. Tiga kartu ringkasan: **Peta Terkompilasi**, **Peta Terintegrasi**, **Peta Tersinkronisasi**.
  3. **Grafik Riwayat Aktivitas**: kurva spline (SVG) *Upload Data* & *Revisi Data* per bulan, dengan total *Activity* di bawahnya.
  4. **Riwayat Aktivitas**: daftar scroll berisi nama IGT, user, waktu, dan status (Terintegrasi/Terkompilasi hijau, Proses Pengajuan Kompilasi kuning).
- **Menu sidebar Operator**: Dashboard, Kompilasi Data, Integrasi Data, Sinkronisasi Data, Self Assessment, Peta IGT (hanya tampil saat role Operator).
- **Data dummy**: `MOCKUP_DATA.operator` (ringkasan, grafik, riwayat). Render via `applyRoleOperator()` & `renderOperatorGrafik()`.
- **Kembali ke role lain**: tampilan admin dipulihkan dan peta di-`resize()` agar tidak rusak setelah disembunyikan.

### 64. Kartu Tema Derivatif pada Dashboard Operator

- **Perubahan**: Ditambahkan kartu ringkasan **Tema Derivatif** (nilai **4**) bersanding dengan Peta Terkompilasi dan Peta Terintegrasi pada dashboard role Operator. Grid kartu ringkasan menjadi 4 kolom (2 kolom di tablet, 1 kolom di mobile).
- **Data dummy**: `MOCKUP_DATA.operator.ringkasan.derivatif = 4`.

### 65. Posisi Panel Pilih Role Simulasi

- **Perubahan**: Panel **Pilih Role Simulasi** dikembalikan ke posisi paling atas sidebar. Menu khusus Operator (Dashboard, Kompilasi Data, dst.) kini ditampilkan di bawah panel role simulasi.

### 66. Penghapusan Kartu Peta Tersinkronisasi (Dashboard Operator)

- **Perubahan**: Kartu **Peta Tersinkronisasi** dihapus dari dashboard role Operator. Kartu ringkasan kini tiga: **Peta Terkompilasi**, **Peta Terintegrasi**, dan **Tema Derivatif** (grid 3 kolom, 1 kolom di mobile).

### 67. Sub-halaman Operator: Data Kompilasi, Integrasi Data, Unggah Data Derivatif

- **Navigasi**: Kartu ringkasan pada dashboard Operator kini dapat diklik — **Peta Terkompilasi** → *Data Kompilasi*, **Peta Terintegrasi** → *Integrasi Data*, **Tema Derivatif** → *Unggah Data Derivatif*. Menu sidebar Operator (ditambah item **Data Derivatif**) dan breadcrumb *Dashboard* ikut terhubung. Judul topbar menyesuaikan halaman aktif.
- **Data Kompilasi & Integrasi Data** (acuan `Examples/Terkompilasi`, `Examples/Terintegrasi`): tab Renaksi/Service/Monev/Khusus, pencarian IGT, pilihan tahun, serta daftar akordeon IGT Renaksi berisi *Data Belum Diproses*, *Target*, *Realisasi*, *Satuan*, dan bar persentase (hijau ≥100%, kuning ≥50%, merah <50%). Klik item membuka tabel rincian berkas (Nama Direktorat, Nama IGT, Jenis Data, Tanggal Upload, Tanggal Terintegrasi [khusus integrasi], Keterangan, Status, Aksi, Download).
- **Unggah Data Derivatif** (acuan `Examples/Derivatif`): info banner, panel *Daftar Unggahan Saya* dengan tombol **Unggah Data Derivatif**, dan tabel (Layer Derivatif, SLD Style, Fitur, Status, Masa Berlaku, Tanggal, Keterangan/Catatan, Aksi) dengan kondisi kosong *Belum ada data pengajuan*.
- **Data dummy**: `MOCKUP_DATA.operator.renaksi`, `.rincian`, `.derivatif`. Render via `bukaHalamanOperator()`, `renderDaftarOperator()`, `renderDerivatifOperator()`.

### 68. Penyesuaian Halaman Derivatif & Sinkronisasi Data Operator dengan Dashboard

- **Unggah Data Derivatif** (acuan `Examples/Derivatiff`): tabel kini berisi **4 pengajuan** sesuai angka *Tema Derivatif* di dashboard. Tiap baris menampilkan nama layer (huruf kapital + label tipe *Kawasan/Bidang*), SLD Style, jumlah fitur, status (*Disetujui* hijau, *Menunggu Verifikasi* kuning, *Ditolak* merah), masa berlaku, tanggal, keterangan + **Catatan**, serta tombol **Pratinjau** dan **Hapus**. Paginasi menampilkan halaman aktif.
- **Data Kompilasi & Integrasi Data**: daftar IGT disesuaikan dengan IGT pada Riwayat Aktivitas dashboard (Bidang Tanah, Hak Atas Tanah, LBS Nasional, LSD, Pertimbangan Teknis Pertanahan, ZNT). Total berkas **8 terkompilasi** dan **7 terintegrasi**, sama dengan kartu dashboard. Realisasi per IGT dihitung dari jumlah berkas, dan Nama Direktorat mengikuti satker Operator.
- **Konsistensi angka**: kartu dashboard Operator kini dihitung langsung dari data (`berkas` & `derivatif`), sehingga selalu sinkron dengan isi halaman tujuan.

### 69. Penambahan Role Umum (Hanya Data Derivatif)

- **Role card baru**: *6. Umum* (badge abu "Pengguna Umum"). Profil sidebar/topbar menjadi **Pengguna Umum — Umum**.
- **Hak akses**: Role Umum hanya dapat mengunggah dan memantau pengajuan **data derivatif**. Saat role aktif, yang tampil hanya halaman **Unggah Data Derivatif**; dashboard, Data Kompilasi, dan Integrasi Data tidak dapat dibuka (navigasi dipaksa ke halaman derivatif). Menu sidebar hanya berisi **Data Derivatif**, dan tautan *Dashboard* pada breadcrumb disembunyikan.
- **Data dummy**: `MOCKUP_DATA.umum.derivatif` berisi 2 pengajuan milik pengguna umum (1 *Menunggu Verifikasi*, 1 *Disetujui*), terpisah dari data Operator.
- **Teks info banner** halaman derivatif dibuat netral: *"Unggahan Anda diperiksa terlebih dahulu oleh Admin…"* sehingga berlaku untuk Operator maupun Umum.

### 70. Pemindahan Ganti Role ke Tombol User & Navbar Sidebar per Role

- **Ganti role**: Panel *Pilih Role Simulasi* di sidebar dihapus. Pergantian role kini melalui **tombol user (avatar) di kanan atas** → bagian *Ganti Role (Simulasi)* berisi 6 role (Superadmin, Admin Direktorat SPPR, Admin Kanwil DIY, Admin Kantah Gunung Kidul, Operator, Umum) dengan tanda centang pada role aktif.
- **Sidebar**: Diganti menjadi **navbar biasa** yang dirender sesuai role (`renderSidebarNav()`, konfigurasi `NAV_PER_ROLE`), grup dapat dilipat:
  - **Superadmin** (acuan `Examples/Navbar1.png` & `Navbar2.png`): *Dashboard*; *Data* (Kompilasi Data, Integrasi Data, Self Assessment, Peta IGT); *Data Derivatif* (Create Layer, Atribut Layer, SLD, Unggah, Verifikasi, List Data Derivatif); *CMS* (CMS Landing Page, Direktorat, Layer IGT, Attribut Data, SLD, Symbology, MetaData, Tumpang Susun, User Management, Role Management, Ketua Tim, Data Lainnya, Target Data IGT Master, Model Builder QGIS, Baseline, Web Service).
  - **Admin SPPR / Kanwil / Kantah**: sama dengan Superadmin tanpa grup CMS.
  - **Operator**: Dashboard; Data (Kompilasi, Integrasi, Sinkronisasi, Self Assessment, Peta IGT); Data Derivatif (Unggah Data Derivatif). Menu Dashboard, Kompilasi, Integrasi, dan Unggah Derivatif terhubung ke halaman Operator.
  - **Umum**: hanya *Data Derivatif → Unggah Data Derivatif*.
- **Catatan**: Menu admin selain Dashboard belum memiliki halaman (hanya penanda aktif).

### 71. Penataan Ulang Navbar Sidebar per Role & Dashboard Role Umum

- **Acuan**: `Examples/Usulan-Navbar.png` (disetujui).
- **Superadmin (8 grup)**:
  1. **Dashboard**
  2. **Data IGT**: Kompilasi Data, Integrasi Data, Peta IGT, Self Assessment
  3. **Master Data IGT**: Ketua Tim, Layer IGT, Atribut Data, Metadata, Target Data IGT Master, Baseline, Data Lainnya
  4. **Data Derivatif**: List Data Derivatif, Unggah Data Derivatif, Verifikasi Derivatif, Layer Derivatif, Atribut Layer Derivatif
  5. **Style Peta**: SLD, SLD Derivatif, Symbology
  6. **Analisis & Layanan**: Tumpang Susun, Model Builder QGIS, Web Service
  7. **Pengguna & Akses**: User Management, Role Management, Direktorat
  8. **Konten Portal**: CMS Landing Page
- **Admin SPPR / Kanwil / Kantah**: Dashboard; Data IGT; Data Derivatif (List, Unggah, Verifikasi) — tanpa Layer/Atribut Layer Derivatif, master data, dan administrasi sistem.
- **Operator**: Dashboard; Data IGT (Kompilasi, Integrasi, Peta IGT, Self Assessment); Data Derivatif (Unggah). Menu *Sinkronisasi Data* dihapus.
- **Umum**: Dashboard; Data Derivatif (Unggah).
- **Alasan perubahan**:
  1. Urutan dari yang paling sering dipakai: Dashboard → Data IGT → Master Data IGT → Data Derivatif di atas; konfigurasi & administrasi di bawah.
  2. Grup "CMS" lama (16 menu campur aduk) dipecah menjadi Style Peta, Analisis & Layanan, Pengguna & Akses, dan Konten Portal; menu master data dipindah ke Master Data IGT.
  3. Seluruh menu derivatif disatukan dalam satu grup (Create Layer Derivatif → *Layer Derivatif*).
  4. Seluruh pengaturan style (SLD, SLD Derivatif, Symbology) disatukan dalam grup Style Peta.
  5. Urutan dalam grup mengikuti alur kerja (Kompilasi → Integrasi → Peta IGT; List → Unggah → Verifikasi).
  6. Penamaan diseragamkan: "Attribut Data" → *Atribut Data*, "MetaData" → *Metadata*.
  7. Role non-superadmin hanya melihat menu yang relevan; konfigurasi & administrasi khusus Superadmin.
- **Dashboard Role Umum (baru)**: *Selamat Datang* dengan tiga kartu ringkasan pengajuan derivatif (**Disetujui**, **Menunggu Verifikasi**, **Ditolak**) yang dapat diklik menuju halaman Unggah Data Derivatif, serta panel **Riwayat Pengajuan Derivatif** dengan tombol unggah. Saat role Umum dipilih, halaman awal kini dashboard ini.

### 72. Cache-busting Aset untuk GitHub Pages

- **Masalah**: Di GitHub Pages navbar sidebar tidak muncul karena browser masih memakai `mockup-app.js` versi lama dari cache (GitHub Pages menyimpan cache aset ±10 menit), sementara `index.html` sudah versi baru.
- **Perbaikan**: Link `style.css`, `igt-components.css`, `dummy-data.js`, dan `mockup-app.js` di `index.html` diberi parameter versi (`?v=20261026`). Ganti nilai versi ini setiap kali file JS/CSS diubah agar browser selalu memuat versi terbaru.

### 73. Menu Peta IGT & Self Assessment untuk Role Umum

- **Perubahan**: Navbar role **Umum** ditambah grup **Data IGT** berisi **Peta IGT** dan **Self Assessment**, di antara Dashboard dan Data Derivatif. `Examples/Usulan-Navbar.png` ikut diperbarui.
- **Cache-busting**: versi aset dinaikkan ke `?v=20261026b`.

### 74. Penyamaan Tampilan Role Operator & Umum (Hanya Peta dan Statistik IGT)

- **Perubahan**: Role **Operator** dan **Umum** kini memakai tampilan dashboard yang sama dengan role lain, tetapi hanya menampilkan **peta (hero + Detail Informasi)** dan **Statistik IGT**. Kartu Usulan Input Data & Kompilasi Integrasi, Leader Board, Statistik Derivatif, dan Aktivitas Log disembunyikan untuk kedua role ini. Data peta mengikuti tingkat nasional.
- **Dihapus**: dashboard khusus Operator (kartu Terkompilasi/Terintegrasi/Tema Derivatif, grafik & riwayat aktivitas), sub-halaman Data Kompilasi, Integrasi Data, Unggah Data Derivatif, dan dashboard khusus Umum (catatan no. 63–69 & 71 terkait tampilan tersebut tidak berlaku lagi), beserta CSS, JS, dan data dummy (`MOCKUP_DATA.operator`, `MOCKUP_DATA.umum`).
- **Navbar**: susunan menu Operator & Umum tetap sesuai `Examples/Usulan-Navbar.png`; menu kini berperilaku sama seperti role lain (Dashboard membuka dashboard utama, menu lain hanya penanda aktif).
- **Cache-busting**: versi aset dinaikkan ke `?v=20261026c`.

### 75. Restrukturisasi File untuk Persiapan Multi-Halaman

- **Tujuan**: `index.html` tidak lagi menumpuk semua kode, sehingga mudah dikembangkan ke halaman lain.
- **Layout bersama** (`assets/js/core/layout.js` + `assets/css/layout.css`): sidebar navbar, header (notifikasi & ganti role), banner role aktif, dan footer kini dirender otomatis ke placeholder `#app-sidebar`, `#app-header`, `#app-role-banner`, `#app-footer`. Konfigurasi role (`ROLE_CONFIG`, `ROLE_PILIHAN`) dan menu (`NAV_PER_ROLE`) berada di file ini. Judul header diambil dari `<body data-title>`.
- **Role lintas halaman**: role aktif disimpan di `localStorage`; halaman bereaksi lewat `IGT.onRoleChange`.
- **Menu**: kolom ke-3 item navbar kini berupa `href` halaman; menu aktif ditentukan otomatis dari nama file halaman.
- **Beranda**: CSS inline (±550 baris) dipindah ke `assets/css/pages/beranda.css`; `mockup-app.js` (±4.000 baris) dipecah menjadi `assets/js/pages/beranda/` (`main`, `peta`, `filter`, `ringkasan`, `leaderboard`, `tabel`, `grafik`). `index.html` berkurang dari ±1.460 menjadi ±820 baris.
- **Template**: `_template.html` sebagai kerangka halaman baru; panduan ada di `README.md` (bagian *Struktur Proyek*).
- **Cache-busting**: versi aset dinaikkan ke `?v=20261026d`.

### 76. Kartu "Data Saya" (Operator & Umum) & Halaman Kompilasi, Integrasi, Unggah Derivatif

- **Kartu Data Saya** (dashboard Operator & Umum, di antara peta dan Statistik IGT): grafik batang bersegmen status data milik pengguna, tanpa tabel.
  - **Operator**: *Data IGT* (Terintegrasi 7, Terkompilasi 1, Terupload 2, Revisi Perbaikan 1) dan *Data Derivatif* (Disetujui 2, Menunggu Verifikasi 1, Ditolak 1).
  - **Umum**: hanya *Data Derivatif* (Disetujui 1, Menunggu Verifikasi 1).
  - Setiap ruas grafik dan angka status dapat diklik, menuju halaman terkait yang langsung terfilter status tersebut (mis. `kompilasi-data.html?status=revisi-perbaikan`).
  - Penanda merah **"1 data perlu revisi"** / **"1 data ditolak, perlu diunggah ulang"** muncul bila ada data yang butuh tindakan.
- **Halaman baru** (dibuat dari `_template.html`):
  - `kompilasi-data.html` — Data IGT berstatus Terkompilasi, Terupload, Revisi Perbaikan.
  - `integrasi-data.html` — Data IGT berstatus Terintegrasi.
  - `unggah-derivatif.html` — Data derivatif (Disetujui, Menunggu Verifikasi, Ditolak) + tombol Unggah Data Derivatif.
  - Tiap halaman: tab filter status, pencarian, dan tabel (Nama/Layer, jenis/SLD, tanggal, pil status berwarna, catatan). Operator & Umum melihat data miliknya; role admin melihat seluruh unggahan.
- **Navbar**: menu *Kompilasi Data*, *Integrasi Data*, dan *Unggah Data Derivatif* kini terhubung ke halaman tersebut (menu aktif otomatis).
- **File**: `assets/js/core/data-saya.js` (status & tujuan link), `assets/css/data-saya.css`, `assets/js/pages/beranda/data-saya.js`, `assets/js/pages/data/data.js`; data dummy di `MOCKUP_DATA.dataSaya`.
- **Lain-lain**: aturan font & latar dasar dipindah ke `layout.css` agar seluruh halaman seragam. Cache-busting `?v=20261026e`.
