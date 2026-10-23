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

## ✏️ Cara Mengubah Data Dummy

- **Data Tabel & Statistik**: Buka dan ubah objek data di [`assets/js/dummy-data.js`](assets/js/dummy-data.js).
- **Tata Letak & Komponen HTML**: Buka dan ubah struktur di [`index.html`](index.html).
- **Styling**: Penyesuaian tampilan dapat dilakukan di [`assets/css/igt-components.css`](assets/css/igt-components.css) atau style tag di `index.html`.
