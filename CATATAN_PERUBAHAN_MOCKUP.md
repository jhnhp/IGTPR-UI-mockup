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
| 8 | **Label & Tata Letak Filter Tahun** | Opsi default bernama "Pilih Tahun" dan teks sempat terpotong (*ellipsis*). | Opsi default diubah namanya menjadi **"Tahun Renaksi"**. Penataan CSS single-row disesuaikan (`128px` container, `16×16 px` icon) sehingga teks tertampil utuh dan rapi dalam satu baris bersama Search, Jenis IGT, dan Wilayah. |
| 9 | **Penyederhanaan Hero Toolbar (Eliminasi Filter Kanan Atas)** | Terdapat tombol dan modal popup "Filter" redundan di kanan atas hero section. | **Dihapus secara menyeluruh** karena seluruh kontrol filter (Pencarian, Jenis IGT, Wilayah, dan Tahun Renaksi) sudah terpusat langsung pada kartu Detail Informasi di sisi kiri. Menyisakan antarmuka yang bersih dan hanya menampilkan tombol toggle *"Detail Informasi"* saat kartu ditutup. |
| 10 | **Spasi Vertikal Popup Detail Informasi** | Posisi popup terlalu mepet dan sedikit menabrak teks *"Hai, Internal IGT 👋"* (overlap -4px akibat `top: 64px`). | Posisi disesuaikan menjadi `top: 92px` dengan `max-height: calc(100% - 108px)`, memberikan jarak vertikal lega (+24px) di bawah teks sapaan tanpa mengorbankan ruang peta. |
| 11 | **Tipografi & Spasi Kartu Ringkasan (Usulan Input Data & Kompilasi Integrasi)** | Angka metrik (98 dan 14) berukuran standar (40px) dan jarak vertikal antara judul kartu dengan angka terlalu renggang (gap 46px). | Angka metrik **dibesarkan menjadi 58px (bold 700)** dan jarak vertikal antara judul kartu dengan angkanya didekatkan menjadi **gap 14px** (`justify-content: flex-start`). Tampilan metrik menjadi jauh lebih tegas dan proporsional. |
| 12 | **Penyelarasan Warna Status Usulan Input Data & Kompilasi Integrasi** | Warna status *Terkompilasi* (`#e0f2fe`/`#0ea5e9`) dan *Terintegrasi* (hijau `#dcfce7`/`#16a34a`) pada Usulan Input Data tidak selaras dengan kartu Kompilasi Integrasi di sebelahnya. | Warna *Terkompilasi* disamakan menjadi **soft blue (`#93c5fd`)** dan *Terintegrasi* disamakan menjadi **royal blue (`#1d4ed8`)**, baik pada ruas bar kemajuan maupun titik rincian status. Menciptakan keseragaman palet warna yang konsisten antar-kedua kartu ringkasan. |
| 13 | **Urutan Kategori Grafik Usulan Input Data** | Urutan kategori lama: *Terupload*, *Terkompilasi*, *Revisi Perbaikan*, *Terintegrasi*. | Urutan dirombak secara logis sesuai alur verifikasi data: **Terintegrasi** $\rightarrow$ **Terkompilasi** $\rightarrow$ **Terupload** $\rightarrow$ **Revisi Perbaikan**, baik pada bilah ruas progres (*progress bar*) maupun grid rincian status data di bawahnya. |
| 14 | **Warna Pastel Status Terupload (Hijau) & Revisi (Merah)** | Warna status *Terupload* sebelumnya biru cerulean (`#1860a9`/`#2f8ce4`) dan *Revisi Perbaikan* amber/kuning (`#fef3c7`/`#f59e0b`). | Diperbarui menggunakan warna pastel: **Terupload** menjadi **hijau pastel** (`#86efac` gradasi ke `#4ade80` dengan titik `#4ade80`) dan **Revisi Perbaikan** menjadi **merah pastel** (`#fecaca` gradasi ke `#fca5a5` dengan titik `#f87171`), memberikan identifikasi visual yang intuitif dan nyaman dipandang. |
| 15 | **Ketebalan Ruas Grafik untuk Kategori Bernilai 0 (Revisi Perbaikan)** | Ruas kategori dengan jumlah 0 memiliki lebar tetap 24px (`min-width: 24px`), sehingga terlihat memakan porsi ruang yang cukup besar meskipun datanya kosong. | Diberi penanganan khusus `.is-nol`: bila jumlah data 0, ruas bar dibuat **sangat tipis (lebar 4px)** dengan `flex-grow: 0` dan warna merah solid (`#f87171`), tetap terlihat sebagai penanda batas tanpa mendistorsi proporsi data lainnya. |
| 16 | **Penerapan Warna Solid pada Ruas Terupload & Revisi** | Ruas *Terupload* dan *Revisi Perbaikan* sebelumnya memiliki pola garis-garis diagonal selang-seling (`repeating-linear-gradient`) seperti halnya ruas *Terintegrasi* dan *Terkompilasi*. | Disederhanakan menjadi **warna solid (polos tanpa garis selang-seling)**: **Terupload** menggunakan warna hijau pastel solid (`#86efac`) dan **Revisi Perbaikan** menggunakan warna merah pastel solid (`#fca5a5` / `#f87171`). Pola garis selang-seling kini khusus dipertahankan hanya pada *Terintegrasi* dan *Terkompilasi* agar selaras dengan grafik Kompilasi Integrasi. |

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
