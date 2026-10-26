/**
 * IGTPR Mockup UI - Halaman Atribut Layer Derivatif
 * Skema atribut per layer derivatif: tabel kolom yang dapat diubah langsung.
 */

var SKEMA_ATRIBUT = {
    'Coba Derivatif Bidang': [
        { kolom: 'NIB', keterangan: 'Nomor Identifikasi Bidang', tipe: 'Text', panjang: 14, kosong: false },
        { kolom: 'LUAS', keterangan: 'Luas bidang (m²)', tipe: 'Double', panjang: '', kosong: true },
        { kolom: 'KETERANGAN', keterangan: 'Keterangan tambahan', tipe: 'Text', panjang: 250, kosong: true }
    ],
    'Dialog Kinerja Bidang Tanah Valid Beratribut Tematik': [
        { kolom: 'NIB', keterangan: 'Nomor Identifikasi Bidang', tipe: 'Text', panjang: 14, kosong: false },
        { kolom: 'TEMATIK', keterangan: 'Kategori tematik', tipe: 'Text', panjang: 50, kosong: false }
    ],
    'TES LAYER DERIVATIF BIDANG': [
        { kolom: 'NIB', keterangan: 'Nomor Identifikasi Bidang', tipe: 'Text', panjang: 14, kosong: false }
    ],
    'TES LAYER DERIVATIF KAWASAN': [
        { kolom: 'NAMOBJ', keterangan: 'Nama objek kawasan', tipe: 'Text', panjang: 100, kosong: false },
        { kolom: 'LUAS_HA', keterangan: 'Luas kawasan (ha)', tipe: 'Double', panjang: '', kosong: true }
    ]
};

function barisAtribut(a, i) {
    var tipe = ['Text', 'Integer', 'Double', 'Date'].map(function(t) {
        return '<option' + (t === a.tipe ? ' selected' : '') + '>' + t + '</option>';
    }).join('');
    return '<tr><td class="igt-table__no">' + (i + 1) + '</td>'
        + '<td><input class="form-control form-control-sm" value="' + esc(a.kolom) + '" placeholder="NAMA_KOLOM"></td>'
        + '<td><input class="form-control form-control-sm" value="' + esc(a.keterangan) + '"></td>'
        + '<td><select class="form-select form-select-sm">' + tipe + '</select></td>'
        + '<td><input type="number" class="form-control form-control-sm" value="' + esc(a.panjang) + '"></td>'
        + '<td class="text-center"><input type="checkbox" class="form-check-input"' + (a.kosong ? ' checked' : '') + '></td>'
        + '<td><button type="button" class="igt-aksi__ikon igt-aksi--merah" data-hapus-kolom title="Hapus kolom"><i class="ri-delete-bin-line"></i></button></td></tr>';
}

function renderAtribut() {
    var layer = $('#atribut-layer').val();
    var daftar = SKEMA_ATRIBUT[layer] || [];
    $('#atribut-body').html(layer ? (daftar.length ? daftar.map(barisAtribut).join('') : '<tr><td colspan="7" class="igt-table__empty">Belum ada kolom. Klik "Tambah kolom".</td></tr>')
        : '<tr><td colspan="7" class="igt-table__empty">Pilih layer derivatif terlebih dahulu.</td></tr>');
}

$(document).ready(function() {
    $('#atribut-layer').html('<option value="">Pilih layer</option>' + Object.keys(SKEMA_ATRIBUT).map(function(l) {
        return '<option>' + esc(l) + '</option>';
    }).join('')).on('change', renderAtribut);

    $('#atribut-tambah').on('click', function() {
        if (!$('#atribut-layer').val()) { toastMockup('Pilih layer derivatif terlebih dahulu', 'info'); return; }
        $('#atribut-body .igt-table__empty').closest('tr').remove();
        var n = $('#atribut-body tr').length;
        $('#atribut-body').append(barisAtribut({ kolom: '', keterangan: '', tipe: 'Text', panjang: 50, kosong: true }, n));
    });
    $('#atribut-body').on('click', '[data-hapus-kolom]', function() { $(this).closest('tr').remove(); });
    $('#atribut-simpan').on('click', function() { toastMockup('Skema atribut disimpan'); });
    $('#atribut-shp').on('change', function() {
        if (this.files.length) toastMockup('Kolom dibaca dari ' + this.files[0].name + ' (mockup)', 'info');
    });
    renderAtribut();
});
