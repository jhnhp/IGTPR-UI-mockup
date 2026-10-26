/**
 * IGTPR Mockup UI - Halaman Peta IGT
 * Peta MapLibre (batas provinsi dari assets/data/indonesia-provinsi.js) dengan panel
 * pemilihan IGT & provinsi. "Tampilkan Peta" menyorot dan memperbesar provinsi terpilih.
 */

var petaIgt = null;

function batasFitur(f) {
    var minX = 180, minY = 90, maxX = -180, maxY = -90;
    (function jelajah(c) {
        if (typeof c[0] === 'number') {
            minX = Math.min(minX, c[0]); maxX = Math.max(maxX, c[0]);
            minY = Math.min(minY, c[1]); maxY = Math.max(maxY, c[1]);
        } else c.forEach(jelajah);
    })(f.geometry.coordinates);
    return [[minX, minY], [maxX, maxY]];
}

function initPetaIgt() {
    var gj = window.INDONESIA_GEOJSON;
    var provinsi = gj.features.map(function(f) { return f.properties.nama; }).sort();
    $('#peta-provinsi').html('<option value="">-- Pilih Provinsi --</option>' + provinsi.map(function(p) { return '<option>' + esc(p) + '</option>'; }).join(''));
    $('#peta-igt').html(DAFTAR_IGT.map(function(n) { return '<option>' + esc(n) + '</option>'; }).join(''));

    petaIgt = new maplibregl.Map({
        container: 'peta-igt-kanvas',
        style: {
            version: 8,
            sources: { provinsi: { type: 'geojson', data: gj } },
            layers: [
                { id: 'latar', type: 'background', paint: { 'background-color': '#bfe3f2' } },
                { id: 'provinsi-isi', type: 'fill', source: 'provinsi', paint: { 'fill-color': '#f1f5f0', 'fill-opacity': 1 } },
                { id: 'provinsi-igt', type: 'fill', source: 'provinsi', paint: { 'fill-color': '#1d4ed8', 'fill-opacity': 0.45 }, filter: ['==', 'nama', ''] },
                { id: 'provinsi-garis', type: 'line', source: 'provinsi', paint: { 'line-color': '#94a3b8', 'line-width': 0.8 } },
                { id: 'provinsi-sorot', type: 'line', source: 'provinsi', paint: { 'line-color': '#1e3a6e', 'line-width': 2 }, filter: ['==', 'nama', ''] }
            ]
        },
        bounds: [[94, -11.5], [141.5, 6.5]],
        fitBoundsOptions: { padding: { top: 40, bottom: 40, left: 340, right: 40 } },
        attributionControl: false
    });
    petaIgt.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    $('#peta-tampilkan').on('click', function() {
        var prov = $('#peta-provinsi').val();
        var igt = $('#peta-igt').val();
        if (!prov) { toastMockup('Pilih provinsi terlebih dahulu', 'info'); return; }
        var f = gj.features.filter(function(x) { return x.properties.nama === prov; })[0];
        petaIgt.setFilter('provinsi-igt', ['==', 'nama', prov]);
        petaIgt.setFilter('provinsi-sorot', ['==', 'nama', prov]);
        petaIgt.fitBounds(batasFitur(f), { padding: { top: 60, bottom: 60, left: 360, right: 60 }, duration: 900 });
        $('#peta-legenda').html('<strong>' + esc(igt) + '</strong><span><i style="background:#1d4ed8"></i>' + esc(prov) + '</span>').show();
    });
    $('#peta-panel').on('click', '.igt-peta-tab', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active');
    });
    $('#peta-panel').on('click', '.igt-peta-subtab', function() {
        $(this).addClass('is-active').siblings().removeClass('is-active');
    });
    $('#peta-cari').on('keydown', function(e) {
        if (e.key === 'Enter') toastMockup('Pencarian lokasi "' + $(this).val() + '" (mockup)', 'info');
    });
}

$(document).ready(initPetaIgt);
