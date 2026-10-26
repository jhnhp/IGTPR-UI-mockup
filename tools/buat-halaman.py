#!/usr/bin/env python3
"""
IGTPR Mockup UI - Generator kerangka HTML halaman.

Semua halaman selain index.html berbagi kerangka yang sama (head, placeholder layout,
dan urutan script). Ubah daftar HALAMAN di bawah lalu jalankan dari root repo:

    python3 tools/buat-halaman.py

Isi tabel/form halaman CRUD diatur di assets/js/data/halaman.js, bukan di sini.
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Samakan dengan versi aset di index.html (cache-busting GitHub Pages)
with open(os.path.join(ROOT, 'index.html'), encoding='utf-8') as f:
    VERSI = re.search(r'\?v=([0-9a-z]+)', f.read()).group(1)

ISI_CRUD = '        <div id="crud-halaman"></div>\n'

ISI_KOMPILASI = '''        <div class="igt-halaman-kepala"><div>
            <nav class="igt-breadcrumb"><a href="index.html">Dashboard</a><span>/</span><span>Data</span></nav>
            <h4 class="igt-halaman-judul">{judul}</h4>
        </div></div>
        <div class="igt-card igt-crud-kartu">
            <div class="igt-komp-alat">
                <div class="igt-segment" role="group" id="komp-tab">
                    <button type="button" class="igt-segment__item is-active">Renaksi</button>
                    <button type="button" class="igt-segment__item">Service</button>
                    <button type="button" class="igt-segment__item">Monev</button>
                    <button type="button" class="igt-segment__item">Khusus</button>
                </div>
                <select id="komp-status" aria-label="Filter status"></select>
                <div class="igt-komp-alat__cari"><input type="search" id="komp-cari" placeholder="Cari IGT..."><button type="button"><i class="ri-search-line"></i></button></div>
                <select id="komp-tahun" aria-label="Tahun renaksi"><option>2026</option><option>2024</option><option>2023</option><option>Tanpa Tahun Renaksi</option></select>
            </div>
            <div id="komp-daftar"></div>
        </div>
'''

ISI_ATRIBUT = '''        <div class="igt-halaman-kepala"><div>
            <nav class="igt-breadcrumb"><a href="index.html">Dashboard</a><span>/</span><span>Data Derivatif</span></nav>
            <h4 class="igt-halaman-judul">Atribut Layer Derivatif</h4>
        </div></div>
        <div class="igt-card igt-crud-kartu">
            <h6 class="igt-crud-kartu__judul">Skema Atribut</h6>
            <form class="igt-crud-form igt-crud-form--halaman">
                <div class="igt-crud-form__baris"><label class="igt-crud-form__label" for="atribut-layer">Layer Derivatif</label><select id="atribut-layer" class="form-select"></select></div>
                <div class="igt-crud-form__baris"><label class="igt-crud-form__label" for="atribut-shp">Isi kolom dari SHP contoh (opsional)</label><input type="file" id="atribut-shp" class="form-control" accept=".zip">
                    <small class="igt-crud-form__bantuan">Kolom dibaca dari berkas .dbf di dalam ZIP lalu ditambahkan ke tabel di bawah. Periksa lagi sebelum menyimpan.</small></div>
            </form>
            <div class="igt-table-wrap"><table class="igt-table">
                <thead><tr><th class="igt-table__no">#</th><th>Kolom</th><th>Keterangan</th><th>Tipe</th><th>Panjang</th><th class="text-center">Boleh kosong</th><th></th></tr></thead>
                <tbody id="atribut-body"></tbody>
            </table></div>
            <div class="d-flex justify-content-between">
                <button type="button" class="igt-btn" id="atribut-tambah"><i class="ri-add-line"></i> Tambah kolom</button>
                <button type="button" class="igt-btn igt-btn--primary" id="atribut-simpan">Simpan Atribut</button>
            </div>
        </div>
'''

CRUD_JS = ['assets/js/data/halaman.js', 'assets/js/core/crud.js']

# (file, judul, kunci data-halaman, isi, script tambahan, butuh peta)
HALAMAN = [
    ('kompilasi-data.html', 'Kompilasi Data', 'kompilasi', ISI_KOMPILASI.format(judul='Data Kompilasi'), ['assets/js/core/crud.js', 'assets/js/pages/data/kompilasi.js'], False),
    ('integrasi-data.html', 'Integrasi Data', 'integrasi', ISI_KOMPILASI.format(judul='Integrasi Data'), ['assets/js/core/crud.js', 'assets/js/pages/data/kompilasi.js'], False),
    ('self-assessment.html', 'Self Assessment', 'self-assessment', ISI_CRUD, CRUD_JS, False),
    ('ketua-tim.html', 'Ketua Tim', 'ketua-tim', ISI_CRUD, CRUD_JS, False),
    ('layer-igt.html', 'Layer IGT', 'layer-igt', ISI_CRUD, CRUD_JS, False),
    ('atribut-data.html', 'Atribut Data', 'atribut-data', ISI_CRUD, CRUD_JS, False),
    ('metadata.html', 'Metadata', 'metadata', ISI_CRUD, CRUD_JS, False),
    ('target-master.html', 'Target Data IGT Master', 'target-master', ISI_CRUD, CRUD_JS, False),
    ('baseline.html', 'Baseline', 'baseline', ISI_CRUD, CRUD_JS, False),
    ('data-lainnya.html', 'Data Lainnya', 'data-lainnya', ISI_CRUD, CRUD_JS, False),
    ('list-data-derivatif.html', 'List Data Derivatif', 'list-data-derivatif', ISI_CRUD, CRUD_JS, False),
    ('unggah-derivatif.html', 'Unggah Data Derivatif', 'unggah-derivatif', ISI_CRUD, CRUD_JS, False),
    ('verifikasi-derivatif.html', 'Verifikasi Data Derivatif', 'verifikasi-derivatif', ISI_CRUD, CRUD_JS, False),
    ('layer-derivatif.html', 'Layer Derivatif', 'layer-derivatif', ISI_CRUD, CRUD_JS, False),
    ('atribut-layer-derivatif.html', 'Atribut Layer Derivatif', 'atribut-layer-derivatif', ISI_ATRIBUT, ['assets/js/core/crud.js', 'assets/js/pages/derivatif/atribut-layer.js'], False),
    ('sld.html', 'SLD', 'sld', ISI_CRUD, CRUD_JS, False),
    ('sld-derivatif.html', 'SLD Derivatif', 'sld-derivatif', ISI_CRUD, CRUD_JS, False),
    ('symbology.html', 'Symbology', 'symbology', ISI_CRUD, CRUD_JS, False),
    ('tumpang-susun.html', 'Tumpang Susun', 'tumpang-susun', ISI_CRUD, CRUD_JS, False),
    ('model-builder.html', 'Model Builder QGIS', 'model-builder', ISI_CRUD, CRUD_JS, False),
    ('web-service.html', 'Web Service', 'web-service', ISI_CRUD, CRUD_JS, False),
    ('user-management.html', 'User Management', 'user-management', ISI_CRUD, CRUD_JS, False),
    ('role-management.html', 'Role Management', 'role-management', ISI_CRUD, CRUD_JS, False),
    ('direktorat.html', 'Direktorat', 'direktorat', ISI_CRUD, CRUD_JS, False),
    ('cms-berita.html', 'Kelola Berita', 'cms-berita', ISI_CRUD, CRUD_JS, False),
    ('cms-poin-landing.html', 'Kelola Poin Landing', 'cms-poin-landing', ISI_CRUD, CRUD_JS, False),
]

KERANGKA = '''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/x-icon" href="assets/img/geoportalLogo.ico">
    <title>Geoportal IGT-PR - {judul}</title>
    <!-- Dibuat oleh tools/buat-halaman.py; ubah generator lalu jalankan ulang -->

    <!-- Vendor CSS -->
    <link rel="stylesheet" href="assets/lib/remixicon/fonts/remixicon.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
{css_peta}    <link rel="stylesheet" href="assets/css/style.css?v={v}">
    <link rel="stylesheet" href="assets/css/igt-components.css?v={v}">
    <link rel="stylesheet" href="assets/css/layout.css?v={v}">
    <link rel="stylesheet" href="assets/css/data-saya.css?v={v}">
    <link rel="stylesheet" href="assets/css/halaman.css?v={v}">
</head>

<body data-title="{judul}" data-halaman="{kunci}">
    <!-- Layout bersama dirender oleh assets/js/core/layout.js -->
    <div id="app-sidebar"></div>
    <div id="app-header"></div>

    <div class="main main-app p-3 p-lg-4">
        <div id="app-role-banner"></div>

{isi}
        <div id="app-footer"></div>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
{js_peta}    <script src="assets/js/dummy-data.js?v={v}"></script>
    <script src="assets/js/core/layout.js?v={v}"></script>
    <script src="assets/js/core/data-saya.js?v={v}"></script>
{js}</body>
</html>
'''


def main():
    for nama, judul, kunci, isi, js, peta in HALAMAN:
        html = KERANGKA.format(
            judul=judul, kunci=kunci, isi=isi, v=VERSI,
            css_peta='    <link rel="stylesheet" href="assets/css/maplibre-gl.css">\n' if peta else '',
            js_peta=('    <script src="assets/js/maplibre-gl.js"></script>\n'
                     '    <script src="assets/data/indonesia-provinsi.js"></script>\n') if peta else '',
            js=''.join('    <script src="%s?v=%s"></script>\n' % (s, VERSI) for s in js),
        )
        with open(os.path.join(ROOT, nama), 'w', encoding='utf-8') as f:
            f.write(html)
        print('ditulis', nama)


if __name__ == '__main__':
    main()
