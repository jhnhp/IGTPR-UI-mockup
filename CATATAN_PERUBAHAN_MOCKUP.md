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
