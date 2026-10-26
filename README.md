# IGTPR UI Mockup (Dashboard)

Mockup antarmuka pengguna (UI) statis berbasis **Pure HTML, CSS, dan JavaScript** untuk halaman Dashboard **Geoportal IGT-PR**.

## 📌 Fitur & Komponen

1. **Sidebar Navigasi**:
   - Menu grup: Dashboard, Data, Data Derivatif, dan CMS.
   - Profil administrator di bagian bawah.
   - Responsif untuk desktop dan layar mobile.

2. **Top Header**:
   - Judul halaman, lonceng notifikasi (badge 10), dan dropdown avatar profil.

3. **Hero Map (Peta Wilayah Indonesia)**:
   - Peta vektor 38 provinsi di Indonesia (MapLibre GL berbasis shapefile lokal yang dikonversi ke GeoJSON).
   - Shading tematik dan tooltip interaktif saat kursor melayang di atas provinsi.
   - Filter pop-up untuk tahun renaksi dan jenis IGT.

4. **Kartu Usulan Input Data**:
   - Menampilkan total 98 data dengan segmented progress bar bergaris (Terupload, Terkompilasi, Revisi Perbaikan, Terintegrasi).

5. **Kartu Kompilasi Integrasi**:
   - Menampilkan 14 Layer IGT dengan grafik batang bulanan akumulatif (Januari s.d. Desember).

6. **Tabel & Section Statistik**:
   - **Statistik IGT**: Filter, pencarian kata kunci, toggle tabel/grafik, dan tabel berpaginasi.
   - **Leader Board**: Top 5 Direktorat dengan badge tema (IGT Berbasis Bidang & IGT Berbasis Kawasan).
   - **Capaian Renaksi**: Target vs capaian per unit kerja/direktorat.
   - **Statistik Derivatif**: Data layer derivatif, luas (Ha), dan bidang.
   - **Statistik Akses IGT**: Log aktivitas akses per direktorat.
   - **Aktivitas Log**: Riwayat aksi user dan tanggal.

## 🗂️ Struktur Proyek

```text
index.html                      # Beranda (Dashboard)
*.html                          # 26 halaman menu (Kompilasi, Integrasi, Peta IGT, Layer IGT, User, CMS, dst.)
_template.html                  # Kerangka halaman kosong
tools/buat-halaman.py           # Generator kerangka HTML seluruh halaman menu
Examples/live/                  # Tangkapan layar aplikasi asli (acuan mockup)
assets/
├── css/
│   ├── style.css, igt-components.css   # Tema & komponen bersama
│   ├── layout.css                      # Sidebar navbar, header, ganti role
│   ├── data-saya.css                   # Warna status & kartu Data Saya
│   ├── halaman.css                     # Halaman tabel/CMS, modal form, akordeon
│   └── pages/beranda.css               # CSS khusus Beranda
├── js/
│   ├── core/layout.js                  # Layout bersama + konfigurasi role (ROLE_CONFIG) & menu (NAV_PER_ROLE)
│   ├── core/data-saya.js               # Status data unggahan & tujuan link per status
│   ├── core/crud.js                    # Mesin halaman tabel: filter, tab, cari, paginasi, aksi, modal form
│   ├── data/halaman.js                 # Konfigurasi tiap halaman tabel/CMS (kolom, data, tombol, form)
│   ├── pages/data/kompilasi.js         # Kompilasi Data & Integrasi Data (akordeon per IGT)
│   ├── pages/derivatif/atribut-layer.js# Atribut Layer Derivatif (tabel skema dapat diedit)
│   ├── pages/beranda/                  # JS khusus Beranda (main, peta, filter, ringkasan,
│   │                                   #   leaderboard, tabel, grafik, data-saya)
│   └── dummy-data.js                   # Data dummy
└── data/                               # GeoJSON provinsi & kabupaten
```

### Menambah / Mengubah Halaman
1. **Halaman tabel/CMS biasa**: tambahkan konfigurasi di `assets/js/data/halaman.js` (judul, kolom, data, aksi, form). Lihat komentar di awal `assets/js/core/crud.js` untuk daftar tipe kolom, field, dan aksi.
2. Daftarkan file-nya di `HALAMAN` pada `tools/buat-halaman.py`, lalu jalankan `python3 tools/buat-halaman.py` untuk membuat kerangka HTML.
3. Hubungkan menu sidebar: isi kolom ke-3 item di `NAV_PER_ROLE` (`assets/js/core/layout.js`) dengan nama file. Submenu memakai kolom ke-4: `[['Label', 'file.html'], ...]`.
4. Halaman dengan tampilan khusus (mis. akordeon) memakai isi HTML sendiri di generator dan JS di `assets/js/pages/<nama>/`. Untuk bereaksi saat role diganti, daftarkan `IGT.onRoleChange = function(role) { ... }`.
5. Semua tombol simpan/hapus hanya simulasi dan memunculkan toast "Mockup: tidak tersimpan ke server".
6. Role aktif tersimpan di `localStorage`, jadi tetap sama saat berpindah halaman.
7. Setiap mengubah file CSS/JS, naikkan parameter `?v=` di `index.html`, lalu jalankan ulang generator agar seluruh halaman ikut.

## 🚀 Cara Menjalankan

Anda dapat membuka file `index.html` secara langsung di browser mana saja:

1. **Buka Langsung**:
   Cukup klik dua kali file `index.html` atau buka melalui browser:
   ```text
   file:///home/jhn/projects/SPPR/Mitraeka/IGTPR-UI-mockup/index.html
   ```

2. **Atau Menggunakan Local Web Server (Opsional)**:
   ```bash
   cd IGTPR-UI-mockup
   python3 -m http.server 8080
   ```
   Lalu buka `http://localhost:8080` di browser Anda.

## 📝 Catatan Perubahan & Dokumentasi
Rincian lengkap semua perbaikan dari mockup awal dapat dilihat di file [CATATAN_PERUBAHAN_MOCKUP.md](CATATAN_PERUBAHAN_MOCKUP.md).

## 🗺️ Data Geospasial (GeoJSON Ringan & Bebas Gap/Overlap)
- [`assets/data/indonesia-provinsi.geojson`](assets/data/indonesia-provinsi.geojson): 38 Provinsi di Indonesia (~2 MB).
- [`assets/data/indonesia-kabupaten.geojson`](assets/data/indonesia-kabupaten.geojson): 520 Kabupaten/Kota di Indonesia (~3.8 MB).
- Dibuat menggunakan script Python [`build_topological_map.py`](build_topological_map.py) dengan penyederhanaan topologis *Visvalingam-Whyatt coverage* (0 gap, 0 overlap).

## ✏️ Cara Mengubah Data Dummy

- **Data Tabel & Statistik**: Buka dan ubah objek data di [`assets/js/dummy-data.js`](assets/js/dummy-data.js).
- **Tata Letak & Komponen HTML**: Buka dan ubah struktur di [`index.html`](index.html).
- **Styling**: Penyesuaian tampilan dapat dilakukan di [`assets/css/igt-components.css`](assets/css/igt-components.css) atau style tag di `index.html`.
