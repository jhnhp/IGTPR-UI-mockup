/**
 * IGTPR Mockup UI - Mesin halaman tabel (CRUD) berbasis konfigurasi
 *
 * Halaman cukup berisi <body data-halaman="kunci"> dan memuat file ini setelah
 * assets/js/data/halaman.js. Konfigurasi HALAMAN[kunci] menentukan judul, tabel,
 * filter, tab, aksi baris, dan form modal. Semua aksi hanya simulasi (tidak ada
 * data yang dikirim ke server) dan diberi tahu lewat toast.
 *
 * Ringkasan konfigurasi:
 *   judul, breadcrumb, info, kartu, subKartu
 *   tampilan   : 'tabel' (bawaan) | 'kosong' | 'form' | 'perbaikan'
 *   tombol     : [{ label, ikon, aksi }]                tombol di kepala kartu
 *   tabs       : [{ key, label, ikon, kartu, subKartu, data }]
 *   filter     : [{ key, label, semua, opsi, wajib, kosong, param }]
 *   kolom      : [{ key, label, tipe, sub, warna, lebar }]
 *   data       : [...]  atau  sumber: function(role) { return [...] }
 *   aksi       : [{ ikon, teks, warna, judul, aksi, jika }]
 *   terkunci   : function(baris) -> true bila baris tidak dapat diubah
 *   form       : { tambah, edit, fields, simpan, batal, lebar }
 *   modal      : { nama: { judul, fields, simpan, batal, lebar } }
 *
 * Tipe kolom : teks | judul | badge | status | chips | file | no | html
 * Tipe field : teks | email | password | angka | tanggal | pilih | pilih-banyak |
 *              textarea | editor | file | checkbox | radio | toggle | warna |
 *              info | judul | cek | catatan
 * Aksi       : 'tambah' | 'edit' | 'hapus' | 'modal:<nama>' | 'toast:<pesan>' |
 *              'link:<url>'
 */

var CRUD_WARNA_BADGE = ['biru', 'hijau', 'kuning', 'merah', 'abu', 'gelap', 'ungu', 'tosca'];

var crudState = {
    cfg: null,
    tab: null,
    data: [],
    cari: '',
    halaman: 1,
    perHalaman: 10,
    filter: {},
    sort: null
};

/* ----------------------------------------------------
   Utilitas
---------------------------------------------------- */
function esc(v) {
    return String(v === undefined || v === null ? '' : v)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function nilaiBaris(baris, key) {
    var v = baris[key];
    return v === undefined || v === null || v === '' ? '-' : v;
}

function toastMockup(pesan, jenis) {
    $('.igt-crud-toast').remove();
    var ikon = jenis === 'hapus' ? 'ri-delete-bin-line' : (jenis === 'info' ? 'ri-information-line' : 'ri-checkbox-circle-line');
    var $t = $('<div class="igt-crud-toast is-' + (jenis || 'sukses') + '"><i class="' + ikon + '"></i><span>' + esc(pesan)
        + '</span><small>Mockup: tidak tersimpan ke server</small></div>');
    $('body').append($t);
    setTimeout(function() { $t.addClass('is-tampil'); }, 10);
    setTimeout(function() { $t.removeClass('is-tampil'); setTimeout(function() { $t.remove(); }, 300); }, 3000);
}

function badgeHtml(teks, warna) {
    if (teks === undefined || teks === null || teks === '' || teks === '-') return '-';
    return '<span class="igt-pil igt-pil--' + (warna || 'biru') + '">' + esc(teks) + '</span>';
}

/* ----------------------------------------------------
   Render sel tabel
---------------------------------------------------- */
function renderSel(kolom, baris, nomor) {
    var v = baris[kolom.key];
    switch (kolom.tipe) {
        case 'no':
            return nomor;
        case 'judul':
            var sub = kolom.sub ? baris[kolom.sub] : '';
            var badgeSub = kolom.badgeSub ? baris[kolom.badgeSub] : '';
            return '<div class="igt-sel-judul"><strong>' + esc(nilaiBaris(baris, kolom.key)) + '</strong>'
                + (badgeSub ? ' ' + badgeHtml(badgeSub, (kolom.warnaBadgeSub || {})[badgeSub] || 'abu') : '')
                + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</div>';
        case 'badge':
            var warna = typeof kolom.warna === 'function' ? kolom.warna(v, baris) : ((kolom.warna || {})[v] || 'biru');
            return badgeHtml(v, warna);
        case 'status':
            var st = (kolom.warna || {})[v] || 'abu';
            return v ? '<span class="igt-pil igt-pil--' + st + ' igt-pil--status">' + esc(v) + '</span>' : '-';
        case 'chips':
            return '<div class="igt-chips">' + (v || []).map(function(c) {
                return '<span class="igt-chip' + (c.aktif ? ' is-aktif igt-chip--' + (c.warna || 'biru') : '') + '"><i class="'
                    + (c.aktif ? 'ri-check-line' : 'ri-close-line') + '"></i>' + esc(c.label) + '</span>';
            }).join('') + '</div>';
        case 'file':
            return v ? '<span class="igt-sel-file"><i class="ri-file-3-line"></i>' + esc(v) + '</span>' : '-';
        case 'html':
            return kolom.render(baris);
        default:
            return esc(nilaiBaris(baris, kolom.key));
    }
}

function renderAksi(cfg, baris, idx) {
    if (cfg.terkunci && cfg.terkunci(baris)) return '<span class="igt-sel-kunci"><i class="ri-lock-line"></i> Terkunci</span>';
    return '<div class="igt-aksi">' + (cfg.aksi || []).filter(function(a) {
        return !a.jika || a.jika(baris);
    }).map(function(a, i) {
        var attr = ' data-aksi-index="' + (cfg.aksi.indexOf(a)) + '" data-baris="' + idx + '" title="' + esc(a.judul || a.teks || '') + '"';
        if (a.teks) {
            return '<button type="button" class="igt-aksi__teks igt-aksi--' + (a.warna || 'biru') + '"' + attr + '>'
                + (a.ikon ? '<i class="' + a.ikon + '"></i> ' : '') + esc(a.teks) + '</button>';
        }
        return '<button type="button" class="igt-aksi__ikon igt-aksi--' + (a.warna || 'biru') + '"' + attr + '><i class="' + a.ikon + '"></i></button>';
    }).join('') + '</div>';
}

/* ----------------------------------------------------
   Data, filter, sort, paginasi
---------------------------------------------------- */
function dataSumber() {
    var cfg = crudState.cfg;
    var tab = crudState.tab;
    if (tab && tab.data) return tab.data;
    if (cfg.sumber) return cfg.sumber(currentActiveRole) || [];
    return cfg.data || [];
}

function opsiFilter(f) {
    if (f.opsi) return f.opsi;
    var nilai = {};
    crudState.data.forEach(function(b) { if (b[f.key]) nilai[b[f.key]] = true; });
    return Object.keys(nilai).sort();
}

function barisTersaring() {
    var cfg = crudState.cfg;
    var q = crudState.cari;
    var hasil = crudState.data.filter(function(b) {
        for (var k in crudState.filter) {
            var v = crudState.filter[k];
            if (v && String(b[k]) !== v) return false;
        }
        if (!q) return true;
        return (cfg.kolom || []).some(function(kol) {
            var teks = kol.key ? b[kol.key] : '';
            if (kol.sub) teks += ' ' + (b[kol.sub] || '');
            return String(teks || '').toLowerCase().indexOf(q) !== -1;
        });
    });
    if (crudState.sort) {
        var s = crudState.sort;
        hasil = hasil.slice().sort(function(a, b) {
            var x = a[s.key], y = b[s.key];
            if (typeof x === 'number' && typeof y === 'number') return s.arah * (x - y);
            return s.arah * String(x || '').localeCompare(String(y || ''), 'id', { numeric: true });
        });
    }
    return hasil;
}

function filterWajibKosong() {
    return (crudState.cfg.filter || []).some(function(f) { return f.wajib && !crudState.filter[f.key]; });
}

/* ----------------------------------------------------
   Render halaman
---------------------------------------------------- */
function renderKepalaHalaman(cfg) {
    var html = '<div class="igt-halaman-kepala"><div>'
        + '<nav class="igt-breadcrumb"><a href="index.html">Dashboard</a><span>/</span><span>' + esc(cfg.breadcrumb || 'Data') + '</span></nav>'
        + '<h4 class="igt-halaman-judul">' + esc(cfg.judul) + '</h4>'
        + (cfg.deskripsi ? '<p class="igt-halaman-deskripsi">' + esc(cfg.deskripsi) + '</p>' : '')
        + '</div>';
    if (cfg.tombolKepala) {
        html += '<div class="igt-halaman-kepala__aksi">' + cfg.tombolKepala.map(function(t) {
            return '<button type="button" class="igt-btn igt-btn--primary" data-aksi-kepala="' + esc(t.aksi) + '">'
                + (t.ikon ? '<i class="' + t.ikon + '"></i> ' : '') + esc(t.label) + '</button>';
        }).join('') + '</div>';
    }
    html += '</div>';
    if (cfg.info) html += '<div class="igt-halaman-info"><i class="ri-information-line"></i><span>' + esc(cfg.info) + '</span></div>';
    return html;
}

function renderKartuTabel() {
    var cfg = crudState.cfg;
    var tab = crudState.tab || {};
    var judulKartu = tab.kartu || cfg.kartu || cfg.judul;
    var sub = tab.subKartu || cfg.subKartu;

    var html = '<div class="igt-card igt-crud-kartu">';
    if (cfg.tabs) {
        html += '<div class="igt-crud-tabs">' + cfg.tabs.map(function(t) {
            return '<button type="button" class="igt-crud-tab' + (t.key === tab.key ? ' is-active' : '') + '" data-tab="' + esc(t.key) + '">'
                + (t.ikon ? '<i class="' + t.ikon + '"></i> ' : '') + esc(t.label) + '</button>';
        }).join('') + '</div>';
    }
    html += '<div class="igt-card__head"><div><h6 class="igt-crud-kartu__judul">' + esc(judulKartu) + '</h6>'
        + (sub ? '<p class="igt-crud-kartu__sub">' + esc(sub) + '</p>' : '') + '</div>'
        + '<div class="igt-card__tools">' + (cfg.tombol || []).map(function(t) {
            return '<button type="button" class="igt-btn igt-btn--primary" data-aksi-kepala="' + esc(t.aksi) + '">'
                + (t.ikon ? '<i class="' + t.ikon + '"></i> ' : '') + esc(t.label) + '</button>';
        }).join('') + '</div></div>';

    if (cfg.filter && cfg.filter.length) {
        html += '<div class="igt-crud-filter">' + cfg.filter.map(function(f) {
            var opsi = opsiFilter(f);
            return '<label class="igt-crud-filter__item"><span>' + esc(f.label) + '</span><select data-filter="' + esc(f.key) + '">'
                + '<option value="">' + esc(f.semua || 'Semua') + '</option>'
                + opsi.map(function(o) {
                    return '<option value="' + esc(o) + '"' + (crudState.filter[f.key] === o ? ' selected' : '') + '>' + esc(o) + '</option>';
                }).join('') + '</select></label>';
        }).join('') + '</div>';
    }

    html += '<div class="igt-crud-alat">'
        + '<label class="igt-crud-alat__perpage">Show <select data-perpage>' + [10, 25, 50, 100].map(function(n) {
            return '<option value="' + n + '"' + (n === crudState.perHalaman ? ' selected' : '') + '>' + n + '</option>';
        }).join('') + '</select> entries</label>'
        + '<label class="igt-crud-alat__cari">Search: <input type="search" data-cari value="' + esc(crudState.cari) + '"></label>'
        + '</div>';

    html += '<div class="igt-table-wrap"><table class="igt-table igt-crud-tabel"><thead><tr>'
        + cfg.kolom.map(function(k) {
            var bisaSort = k.key && k.tipe !== 'chips' && k.tipe !== 'html' && k.tipe !== 'no';
            var aktif = crudState.sort && crudState.sort.key === k.key;
            return '<th' + (k.lebar ? ' style="width:' + k.lebar + '"' : '') + (bisaSort ? ' data-sort="' + esc(k.key) + '" class="is-sortable' + (aktif ? ' is-sorted' : '') + '"' : '') + '>'
                + esc(k.label) + (bisaSort ? ' <i class="' + (aktif ? (crudState.sort.arah > 0 ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill') : 'ri-expand-up-down-line') + '"></i>' : '') + '</th>';
        }).join('')
        + ((cfg.aksi && cfg.aksi.length) || cfg.terkunci ? '<th class="igt-crud-tabel__aksi">Aksi</th>' : '')
        + '</tr></thead><tbody data-body></tbody></table></div>'
        + '<div class="igt-table-foot"><span class="igt-crud-info" data-info></span><div class="igt-pagination" data-pagination></div></div>'
        + '</div>';
    return html;
}

function renderBaris() {
    var cfg = crudState.cfg;
    var $body = $('#crud-halaman [data-body]');
    var jumlahKolom = cfg.kolom.length + ((cfg.aksi && cfg.aksi.length) || cfg.terkunci ? 1 : 0);

    if (filterWajibKosong()) {
        var f = cfg.filter.filter(function(x) { return x.wajib; })[0];
        $body.html('<tr><td colspan="' + jumlahKolom + '" class="igt-table__empty">' + esc(f.kosong || 'Pilih filter terlebih dahulu') + '</td></tr>');
        $('#crud-halaman [data-info]').text('Showing 0 to 0 of 0 entries');
        $('#crud-halaman [data-pagination]').empty();
        return;
    }

    var semua = barisTersaring();
    var total = semua.length;
    var totalHal = Math.max(1, Math.ceil(total / crudState.perHalaman));
    if (crudState.halaman > totalHal) crudState.halaman = totalHal;
    var mulai = (crudState.halaman - 1) * crudState.perHalaman;
    var tampil = semua.slice(mulai, mulai + crudState.perHalaman);

    $body.html(tampil.length ? tampil.map(function(b, i) {
        var idx = crudState.data.indexOf(b);
        return '<tr>' + cfg.kolom.map(function(k) {
            return '<td' + (k.tipe === 'no' ? ' class="igt-table__no"' : '') + '>' + renderSel(k, b, mulai + i + 1) + '</td>';
        }).join('') + ((cfg.aksi && cfg.aksi.length) || cfg.terkunci ? '<td>' + renderAksi(cfg, b, idx) + '</td>' : '') + '</tr>';
    }).join('') : '<tr><td colspan="' + jumlahKolom + '" class="igt-table__empty">' + esc(cfg.kosong || 'Belum ada data.') + '</td></tr>');

    $('#crud-halaman [data-info]').text('Showing ' + (total ? mulai + 1 : 0) + ' to ' + (mulai + tampil.length) + ' of ' + total + ' entries');
    renderPaginasi($('#crud-halaman [data-pagination]'), totalHal, crudState.halaman, function(h) {
        crudState.halaman = h;
        renderBaris();
    });
}

function renderPaginasi($el, totalHal, aktif, klik) {
    var html = '<button type="button" data-hal="' + (aktif - 1) + '"' + (aktif === 1 ? ' disabled' : '') + '>Previous</button>';
    for (var i = 1; i <= totalHal; i++) {
        html += '<button type="button" data-hal="' + i + '"' + (i === aktif ? ' class="is-active"' : '') + '>' + i + '</button>';
    }
    html += '<button type="button" data-hal="' + (aktif + 1) + '"' + (aktif === totalHal ? ' disabled' : '') + '>Next</button>';
    $el.html(html).find('button').on('click', function() {
        if (!this.disabled) klik(parseInt($(this).attr('data-hal'), 10));
    });
}

function renderKosong(cfg) {
    return '<div class="igt-card igt-crud-kosong">'
        + '<div class="igt-crud-kosong__ikon"><i class="' + (cfg.kosongIkon || 'ri-upload-2-line') + '"></i></div>'
        + '<p>' + esc(cfg.kosongTeks || 'Belum ada data.') + '</p>'
        + (cfg.tombol || []).map(function(t) {
            return '<button type="button" class="igt-btn igt-btn--primary" data-aksi-kepala="' + esc(t.aksi) + '">' + esc(t.label) + '</button>';
        }).join('') + '</div>';
}

function renderFormHalaman(cfg) {
    return '<div class="igt-card igt-crud-kartu"><div><h6 class="igt-crud-kartu__judul">' + esc(cfg.kartu) + '</h6>'
        + (cfg.subKartu ? '<p class="igt-crud-kartu__sub">' + esc(cfg.subKartu) + '</p>' : '') + '</div>'
        + '<form class="igt-crud-form igt-crud-form--halaman" data-form-halaman>' + renderFields(cfg.form.fields, cfg.form.nilai || {}) + '</form>'
        + '<div class="igt-crud-form__kaki"><button type="button" class="igt-btn igt-btn--primary" data-simpan-halaman>' + esc(cfg.form.simpan || 'Submit Data') + '</button></div>'
        + '</div>';
}

function renderPerbaikan(cfg) {
    return '<div class="igt-card igt-crud-kosong">'
        + '<div class="igt-crud-kosong__ikon is-peringatan"><i class="ri-tools-line"></i></div>'
        + '<p><strong>' + esc(cfg.kartu || 'Halaman sedang dalam perbaikan') + '</strong></p>'
        + '<p class="text-muted">' + esc(cfg.kosongTeks || '') + '</p></div>';
}

function renderHalamanCrud() {
    var cfg = crudState.cfg;
    var html = renderKepalaHalaman(cfg);
    var tampilan = cfg.tampilan || 'tabel';
    if (tampilan === 'kosong') html += renderKosong(cfg);
    else if (tampilan === 'form') html += renderFormHalaman(cfg);
    else if (tampilan === 'perbaikan') html += renderPerbaikan(cfg);
    else html += renderKartuTabel();
    if (cfg.setelah) html += cfg.setelah();
    $('#crud-halaman').html(html);
    if (tampilan === 'tabel') renderBaris();
}

/* ----------------------------------------------------
   Form & modal
---------------------------------------------------- */
function renderFields(fields, nilai) {
    return (fields || []).map(function(f, i) {
        var id = 'fld-' + i + '-' + Math.random().toString(36).slice(2, 7);
        var v = nilai[f.key] !== undefined ? nilai[f.key] : (f.nilai !== undefined ? f.nilai : '');
        var wajib = f.wajib ? ' <span class="igt-wajib">*</span>' : '';
        var label = f.label ? '<label for="' + id + '" class="igt-crud-form__label">' + esc(f.label) + wajib + '</label>' : '';
        var bantuan = f.bantuan ? '<small class="igt-crud-form__bantuan">' + esc(f.bantuan) + '</small>' : '';
        var lebar = f.lebar === 'setengah' ? ' is-setengah' : '';
        var isi;
        switch (f.tipe) {
            case 'judul':
                return '<div class="igt-crud-form__judul">' + esc(f.label) + '</div>';
            case 'catatan':
                return '<div class="igt-crud-form__catatan">' + esc(f.label) + '</div>';
            case 'info':
                return '<div class="igt-crud-form__baris' + lebar + '"><span class="igt-crud-form__label">' + esc(f.label) + '</span>'
                    + '<div class="igt-crud-form__info">' + esc(v || f.isi || '-') + '</div></div>';
            case 'textarea':
            case 'editor':
                isi = (f.tipe === 'editor' ? '<div class="igt-crud-editor-alat">' + ['ri-bold', 'ri-italic', 'ri-link', 'ri-image-line', 'ri-table-line', 'ri-double-quotes-l', 'ri-list-unordered', 'ri-list-ordered'].map(function(ik) {
                    return '<i class="' + ik + '"></i>';
                }).join('') + '</div>' : '')
                    + '<textarea id="' + id + '" class="form-control" rows="' + (f.tipe === 'editor' ? 7 : 3) + '" data-key="' + esc(f.key || '') + '" placeholder="' + esc(f.placeholder || '') + '">' + esc(v) + '</textarea>';
                break;
            case 'pilih':
                isi = '<select id="' + id + '" class="form-select" data-key="' + esc(f.key || '') + '"><option value="">' + esc(f.placeholder || 'Silahkan Pilih') + '</option>'
                    + (f.opsi || []).map(function(o) {
                        return '<option' + (String(o) === String(v) ? ' selected' : '') + '>' + esc(o) + '</option>';
                    }).join('') + '</select>';
                break;
            case 'pilih-banyak':
                var terpilih = Array.isArray(v) ? v : [];
                isi = '<div class="igt-crud-form__multi"><div class="igt-crud-form__multi-alat"><a href="#" data-pilih-semua>Pilih Semua</a><a href="#" data-hapus-semua class="text-danger">Hapus Semua</a></div>'
                    + '<div class="igt-crud-form__multi-daftar">' + (f.opsi || []).map(function(o) {
                        return '<label class="form-check"><input class="form-check-input" type="checkbox"' + (terpilih.indexOf(o) !== -1 ? ' checked' : '') + '> ' + esc(o) + '</label>';
                    }).join('') + '</div></div>';
                break;
            case 'file':
                isi = '<input id="' + id + '" type="file" class="form-control"' + (f.accept ? ' accept="' + esc(f.accept) + '"' : '') + '>'
                    + (v ? '<small class="igt-crud-form__bantuan">Berkas saat ini: ' + esc(v) + '</small>' : '');
                break;
            case 'checkbox':
            case 'toggle':
                return '<div class="igt-crud-form__baris"><label class="form-check' + (f.tipe === 'toggle' ? ' form-switch' : '') + '"><input class="form-check-input" type="checkbox"'
                    + (v ? ' checked' : '') + '> ' + esc(f.label) + '</label>' + bantuan + '</div>';
            case 'radio':
                isi = '<div class="igt-crud-form__radio">' + (f.opsi || []).map(function(o, j) {
                    return '<label class="form-check form-check-inline"><input class="form-check-input" type="radio" name="' + id + '"'
                        + (String(o) === String(v) ? ' checked' : '') + '> ' + esc(o) + '</label>';
                }).join('') + '</div>';
                break;
            case 'warna':
                isi = '<input id="' + id + '" type="color" class="form-control form-control-color" value="' + esc(v || '#1d4ed8') + '">';
                break;
            case 'cek':
                isi = '<table class="igt-crud-cek"><thead><tr><th>Item Pemeriksaan</th><th>Aksi</th></tr></thead><tbody>'
                    + (f.opsi || []).map(function(o) {
                        return '<tr><td>' + esc(o) + '</td><td><button type="button" class="igt-aksi__teks igt-aksi--biru" data-cek>Cek</button></td></tr>';
                    }).join('') + '</tbody></table>';
                break;
            default:
                var tipeInput = { email: 'email', password: 'password', angka: 'number', tanggal: 'date' }[f.tipe] || 'text';
                isi = '<input id="' + id + '" type="' + tipeInput + '" class="form-control" data-key="' + esc(f.key || '') + '" value="' + esc(v) + '" placeholder="' + esc(f.placeholder || '') + '">';
        }
        return '<div class="igt-crud-form__baris' + lebar + '">' + label + isi + bantuan + '</div>';
    }).join('');
}

function bukaModal(opsi) {
    // opsi: { judul, fields, nilai, simpan, batal, lebar, isi (html), pesanSimpan, onSimpan }
    $('#crud-modal').remove();
    var tombolSimpan = opsi.simpan === false ? '' : '<button type="button" class="btn btn-primary igt-crud-modal__simpan" data-simpan>' + esc(opsi.simpan || 'Submit Data') + '</button>';
    var html = '<div class="modal fade" id="crud-modal" tabindex="-1"><div class="modal-dialog modal-dialog-scrollable ' + (opsi.lebar || 'modal-lg') + '"><div class="modal-content">'
        + '<div class="modal-header"><h5 class="modal-title">' + esc(opsi.judul) + '</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>'
        + '<div class="modal-body">' + (opsi.isi || '') + (opsi.fields ? '<form class="igt-crud-form">' + renderFields(opsi.fields, opsi.nilai || {}) + '</form>' : '') + '</div>'
        + '<div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">' + esc(opsi.batal || 'Close') + '</button>' + tombolSimpan + '</div>'
        + '</div></div></div>';
    $('body').append(html);
    var el = document.getElementById('crud-modal');
    var modal = bootstrap.Modal.getOrCreateInstance(el);
    $(el).on('click', '[data-simpan]', function() {
        if (opsi.onSimpan) opsi.onSimpan($(el));
        modal.hide();
        toastMockup(opsi.pesanSimpan || 'Data berhasil disimpan');
    });
    $(el).on('hidden.bs.modal', function() { $(el).remove(); });
    modal.show();
    return $(el);
}

function konfirmasiHapus(baris, onYa) {
    bukaModal({
        judul: 'Hapus Data',
        lebar: 'modal-sm',
        isi: '<p class="mb-0">Yakin ingin menghapus data ini?</p>' + (baris ? '<p class="text-muted small mt-2 mb-0">' + esc(baris._label || '') + '</p>' : ''),
        batal: 'Batal',
        simpan: 'Hapus',
        pesanSimpan: 'Data berhasil dihapus',
        onSimpan: onYa
    });
    $('#crud-modal [data-simpan]').removeClass('btn-primary').addClass('btn-danger');
}

function jalankanAksi(aksi, baris) {
    var cfg = crudState.cfg;
    if (!aksi) return;
    if (aksi === 'tambah') {
        bukaModal({ judul: cfg.form.tambah, fields: cfg.form.fields, simpan: cfg.form.simpan, batal: cfg.form.batal, lebar: cfg.form.lebar });
    } else if (aksi === 'edit') {
        bukaModal({ judul: cfg.form.edit || cfg.form.tambah, fields: cfg.form.fieldsEdit || cfg.form.fields, nilai: baris, simpan: cfg.form.simpanEdit || cfg.form.simpan, batal: cfg.form.batal, lebar: cfg.form.lebar, pesanSimpan: 'Perubahan berhasil disimpan' });
    } else if (aksi === 'hapus') {
        var label = baris ? (baris[cfg.kolom[0].key] || '') : '';
        konfirmasiHapus({ _label: label }, function() {
            var i = crudState.data.indexOf(baris);
            if (i !== -1) crudState.data.splice(i, 1);
            renderBaris();
        });
        return;
    } else if (aksi.indexOf('modal:') === 0) {
        var m = (cfg.modal || {})[aksi.slice(6)];
        if (!m) return;
        bukaModal({
            judul: typeof m.judul === 'function' ? m.judul(baris) : m.judul,
            fields: typeof m.fields === 'function' ? m.fields(baris) : m.fields,
            isi: typeof m.isi === 'function' ? m.isi(baris) : m.isi,
            nilai: baris || {}, simpan: m.simpan, batal: m.batal, lebar: m.lebar, pesanSimpan: m.pesanSimpan
        });
    } else if (aksi.indexOf('toast:') === 0) {
        toastMockup(aksi.slice(6), 'info');
    } else if (aksi.indexOf('link:') === 0) {
        location.href = aksi.slice(5);
    }
}

/* ----------------------------------------------------
   Inisialisasi
---------------------------------------------------- */
function muatDataCrud() {
    crudState.data = dataSumber().slice();
}

function initHalamanCrud() {
    var kunci = document.body.getAttribute('data-halaman');
    var cfg = (window.HALAMAN || {})[kunci];
    if (!cfg) return;
    crudState.cfg = cfg;
    crudState.tab = cfg.tabs ? cfg.tabs[0] : null;

    // Filter awal dari URL, mis. ?status=ditolak
    (cfg.filter || []).forEach(function(f) {
        if (!f.param) return;
        var m = new RegExp('[?&]' + f.param + '=([^&]+)').exec(location.search);
        if (!m) return;
        var slug = decodeURIComponent(m[1]);
        var cocok = (f.opsi || []).filter(function(o) { return slugStatus(o) === slug; })[0];
        if (cocok) crudState.filter[f.key] = cocok;
    });

    muatDataCrud();
    renderHalamanCrud();

    var $h = $('#crud-halaman');
    $h.on('input', '[data-cari]', function() {
        crudState.cari = $(this).val().trim().toLowerCase();
        crudState.halaman = 1;
        renderBaris();
    });
    $h.on('change', '[data-perpage]', function() {
        crudState.perHalaman = parseInt($(this).val(), 10);
        crudState.halaman = 1;
        renderBaris();
    });
    $h.on('change', '[data-filter]', function() {
        crudState.filter[$(this).attr('data-filter')] = $(this).val();
        crudState.halaman = 1;
        renderBaris();
    });
    $h.on('click', 'th[data-sort]', function() {
        var key = $(this).attr('data-sort');
        var s = crudState.sort;
        crudState.sort = s && s.key === key ? (s.arah > 0 ? { key: key, arah: -1 } : null) : { key: key, arah: 1 };
        renderHalamanCrud();
    });
    $h.on('click', '[data-tab]', function() {
        var key = $(this).attr('data-tab');
        crudState.tab = cfg.tabs.filter(function(t) { return t.key === key; })[0];
        crudState.halaman = 1;
        muatDataCrud();
        renderHalamanCrud();
    });
    $h.on('click', '[data-aksi-index]', function() {
        var a = cfg.aksi[parseInt($(this).attr('data-aksi-index'), 10)];
        jalankanAksi(a.aksi, crudState.data[parseInt($(this).attr('data-baris'), 10)]);
    });
    $h.on('click', '[data-aksi-kepala]', function() {
        jalankanAksi($(this).attr('data-aksi-kepala'));
    });
    $h.on('click', '[data-simpan-halaman]', function() {
        toastMockup('Data berhasil disimpan');
    });

    // Interaksi form di modal maupun halaman
    $(document).on('click', '[data-pilih-semua], [data-hapus-semua]', function(e) {
        e.preventDefault();
        $(this).closest('.igt-crud-form__multi').find('input[type=checkbox]').prop('checked', $(this).is('[data-pilih-semua]'));
    });
    $(document).on('click', '[data-cek]', function() {
        $(this).replaceWith('<span class="igt-pil igt-pil--hijau"><i class="ri-check-line"></i> Sesuai</span>');
    });
}

// Role berganti: muat ulang data (mis. halaman yang datanya bergantung role)
IGT.onRoleChange = function() {
    if (!crudState.cfg) return;
    muatDataCrud();
    renderHalamanCrud();
};

$(document).ready(initHalamanCrud);
