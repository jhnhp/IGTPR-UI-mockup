/**
 * IGTPR Mockup UI - Pure HTML/JS Application Logic
 * Populates all dashboard cards, tables, maps, and controls using dummy data.
 */

$(document).ready(function() {
    initSidebar();
    initHeader();
    initHeroMap();
    initRingkasan();
    initLeaderBoard();
    initTables();
});

/* ----------------------------------------------------
   1. Sidebar & Mobile Toggle
---------------------------------------------------- */
function initSidebar() {
    $('#menuSidebar').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-show');
    });

    // Close sidebar on click outside on mobile
    $(document).on('click', function(e) {
        if ($(window).width() < 992) {
            if (!$(e.target).closest('.sidebar, #menuSidebar').length) {
                $('body').removeClass('sidebar-show');
            }
        }
    });

    // Submenu collapse toggles
    $('.nav-sidebar .nav-item').on('click', function() {
        // active state handling
        $('.nav-sidebar .nav-link').removeClass('active');
        $(this).children('.nav-link').addClass('active');
    });

    $('#sidebarFooterMenu').on('click', function(e) {
        e.preventDefault();
        $('.sidebar-footer-menu').slideToggle(200);
    });
}

/* ----------------------------------------------------
   2. Header Dropdowns
---------------------------------------------------- */
function initHeader() {
    // Dropdown toggles via Bootstrap 5 data-bs-toggle
}

/* ----------------------------------------------------
   3. Indonesia Map (MapLibre GL with local GeoJSON)
---------------------------------------------------- */
function initHeroMap() {
    var container = document.getElementById('beranda-peta');
    if (!container) return;

    if (typeof maplibregl !== 'undefined' && window.INDONESIA_GEOJSON) {
        try {
            var map = new maplibregl.Map({
                container: 'beranda-peta',
                style: {
                    version: 8,
                    sources: {
                        'indonesia': {
                            type: 'geojson',
                            data: window.INDONESIA_GEOJSON
                        }
                    },
                    layers: [
                        {
                            id: 'provinsi-isi',
                            type: 'fill',
                            source: 'indonesia',
                            paint: {
                                'fill-color': '#1860a9',
                                'fill-opacity': [
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'tema'],
                                    0, 0.05,
                                    1, 0.20,
                                    2, 0.35,
                                    4, 0.60
                                ]
                            }
                        },
                        {
                            id: 'provinsi-garis',
                            type: 'line',
                            source: 'indonesia',
                            paint: {
                                'line-color': '#1860a9',
                                'line-width': 1.0,
                                'line-opacity': 0.85
                            }
                        },
                        {
                            id: 'provinsi-sorot',
                            type: 'line',
                            source: 'indonesia',
                            paint: {
                                'line-color': '#0284c7',
                                'line-width': 2.5
                            },
                            filter: ['==', 'nama', '']
                        }
                    ]
                },
                bounds: [[94.5, -11.5], [141.5, 6.5]],
                fitBoundsOptions: { padding: { top: 30, bottom: 40, left: 20, right: 20 } },
                attributionControl: false,
                dragRotate: false,
                pitchWithRotate: false,
                scrollZoom: false
            });

            map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

            var popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
                offset: 12
            });

            map.on('mousemove', 'provinsi-isi', function(e) {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0) {
                    var f = e.features[0];
                    map.setFilter('provinsi-sorot', ['==', 'nama', f.properties.nama]);
                    popup.setLngLat(e.lngLat)
                        .setHTML('<div style="padding:4px 8px; font-size:12px; font-weight:600; color:#0f172a;">' +
                            f.properties.nama +
                            '<div style="font-weight:400; color:#64748b; font-size:11px;">' + (f.properties.tema || 0) + ' tema tersedia</div></div>')
                        .addTo(map);
                }
            });

            map.on('mouseleave', 'provinsi-isi', function() {
                map.getCanvas().style.cursor = '';
                map.setFilter('provinsi-sorot', ['==', 'nama', '']);
                popup.remove();
            });

            // Filter button toggle
            $('#beranda-filter-toggle').on('click', function(e) {
                e.stopPropagation();
                $('#beranda-filter').fadeToggle(150);
            });
            $('#beranda-filter-close, #beranda-filter-reset').on('click', function() {
                $('#beranda-filter').fadeOut(150);
            });

            return;
        } catch (err) {
            console.warn('MapLibre init error:', err);
        }
    }

    // Static fallback if WebGL disabled
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748b;font-size:14px;"><img src="assets/img/icons/map-pin.svg" style="opacity:0.4;width:40px;margin-right:12px;"> Peta Wilayah Indonesia</div>';
}

/* ----------------------------------------------------
   4. Ringkasan Data (Usulan Input Data & Kompilasi Integrasi)
---------------------------------------------------- */
function initRingkasan() {
    var data = window.MOCKUP_DATA;
    if (!data) return;

    // A. Usulan Input Data
    var usulan = data.usulanInputData;
    $('#status-data-total').text(usulan.total);

    var progresHtml = '';
    var rincianHtml = '';

    usulan.kategori.forEach(function(kat, idx) {
        var bobot = usulan.total > 0 ? (kat.jumlah > 0 ? kat.jumlah : 1.5) : 1;
        progresHtml += '<div class="igt-progres__ruas igt-progres__ruas--' + (idx + 1) + '" style="flex-grow: ' + bobot + '" title="' + kat.label + ': ' + kat.jumlah + ' data"></div>';

        rincianHtml += '<div class="igt-rincian__item ' + kat.kelas + '">'
            + '<span class="igt-rincian__titik"></span>'
            + '<div class="igt-rincian__isi">'
            + '<div class="igt-rincian__angka"><strong>' + kat.jumlah + '</strong><span>data</span></div>'
            + '<div class="igt-panel__meta"><span>' + kat.label + '</span><span>' + kat.diperbarui + '</span></div>'
            + '</div></div>';
    });

    $('#status-data-progres').html(progresHtml);
    $('#status-data-rincian').html(rincianHtml);

    // B. Kompilasi Integrasi
    var kompilasi = data.kompilasiIntegrasi;
    $('#integrasi-kompilasi-terkompilasi').text(kompilasi.totalLayer);

    var bulanLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES'];
    $('#integrasi-kompilasi-bulan').html(bulanLabels.map(function(m) {
        return '<span>' + m + '</span>';
    }).join(''));

    var maks = 0;
    kompilasi.bulanan.forEach(function(b) {
        var totalBulan = (b.terkompilasi || 0) + (b.terintegrasi || 0);
        if (totalBulan > maks) maks = totalBulan;
    });

    var TINGGI_GRAFIK = 95;
    var chartHtml = '';
    kompilasi.bulanan.forEach(function(b) {
        var total = (b.terkompilasi || 0) + (b.terintegrasi || 0);
        chartHtml += '<div class="igt-tumpuk__kolom" title="' + b.bulan + ': ' + b.terkompilasi + ' Terkompilasi, ' + b.terintegrasi + ' Terintegrasi">';
        
        if (total > 0) {
            var hKomp = Math.round((b.terkompilasi / maks) * TINGGI_GRAFIK);
            var hInteg = Math.round((b.terintegrasi / maks) * TINGGI_GRAFIK);

            if (hKomp > 0) {
                chartHtml += '<div class="igt-tumpuk__ruas" style="height: ' + hKomp + 'px"></div>';
            }
            if (hInteg > 0) {
                chartHtml += '<div class="igt-tumpuk__ruas igt-tumpuk__ruas--integrasi" style="height: ' + hInteg + 'px"></div>';
            }
        }
        chartHtml += '</div>';
    });

    $('#integrasi-kompilasi-grafik').html(chartHtml);
}

/* ----------------------------------------------------
   5. Leader Board
---------------------------------------------------- */
function initLeaderBoard() {
    var data = window.MOCKUP_DATA;
    if (!data || !data.leaderBoard) return;

    var html = '';
    data.leaderBoard.forEach(function(item) {
        var bidangChips = '-';
        if (item.bidang && item.bidang.length > 0) {
            bidangChips = item.bidang.map(function(b) {
                return '<span class="igt-tag">' + b + '</span>';
            }).join(' ');
        } else {
            bidangChips = '<span class="igt-peringkat__kosong">-</span>';
        }

        var kawasanChips = '-';
        if (item.kawasan && item.kawasan.length > 0) {
            kawasanChips = item.kawasan.map(function(k) {
                return '<span class="igt-tag igt-tag--kawasan">' + k + '</span>';
            }).join(' ');
        } else {
            kawasanChips = '<span class="igt-peringkat__kosong">-</span>';
        }

        html += '<div class="igt-peringkat">'
            + '<div class="igt-peringkat__nomor igt-peringkat__nomor--' + item.peringkat + '">' + item.peringkat + '</div>'
            + '<div class="igt-peringkat__badan">'
            + '  <div class="igt-peringkat__judul">'
            + '    <div class="igt-peringkat__nama">' + item.nama + '</div>'
            + '    <div class="igt-peringkat__nilai">' + item.tema + ' <span>tema</span></div>'
            + '  </div>'
            + '  <div class="igt-peringkat__basis">'
            + '    <div class="igt-peringkat__kelompok">'
            + '      <span class="igt-peringkat__label">IGT Berbasis Bidang</span>'
            + '      <div class="igt-peringkat__chips">' + bidangChips + '</div>'
            + '    </div>'
            + '    <div class="igt-peringkat__kelompok">'
            + '      <span class="igt-peringkat__label">IGT Berbasis Kawasan</span>'
            + '      <div class="igt-peringkat__chips">' + kawasanChips + '</div>'
            + '    </div>'
            + '  </div>'
            + '</div>'
            + '<button type="button" class="igt-peringkat__fokus" title="Fokus">'
            + '  <img src="assets/img/icons/focus.svg" alt="fokus">'
            + '</button>'
            + '</div>';
    });

    $('#leader-board-daftar').html(html);

    // Segment tab toggle
    $('#leader-board .igt-segment__item').on('click', function() {
        $('#leader-board .igt-segment__item').removeClass('is-active');
        $(this).addClass('is-active');
    });

    // Dropdown toggle
    setupDropdown('leader-board-dasar');
}

/* ----------------------------------------------------
   6. Generic Table Component Controller
---------------------------------------------------- */
function createTableController(config) {
    var rawData = config.data;
    var state = {
        data: rawData.slice(),
        search: '',
        perPage: config.perPage || 10,
        page: 1,
        sortCol: config.defaultSortCol,
        sortAsc: true
    };

    var $container = $('#' + config.id);

    function render() {
        // 1. Filter
        var filtered = rawData.filter(function(row) {
            if (!state.search) return true;
            var term = state.search.toLowerCase();
            return Object.values(row).some(function(val) {
                return String(val).toLowerCase().indexOf(term) !== -1;
            });
        });

        // 2. Sort
        filtered.sort(function(a, b) {
            var valA = a[state.sortCol];
            var valB = b[state.sortCol];
            var comp = 0;
            if (typeof valA === 'number' && typeof valB === 'number') {
                comp = valA - valB;
            } else {
                comp = String(valA).localeCompare(String(valB), 'id');
            }
            return state.sortAsc ? comp : -comp;
        });

        // 3. Paginate
        var totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
        if (state.page > totalPages) state.page = totalPages;
        var start = (state.page - 1) * state.perPage;
        var pageItems = filtered.slice(start, start + state.perPage);

        // 4. Render Body
        var bodyHtml = '';
        if (pageItems.length === 0) {
            bodyHtml = '<tr><td colspan="' + (config.columns.length + 1) + '" class="igt-table__empty">Data Tidak Ditemukan!</td></tr>';
        } else {
            pageItems.forEach(function(row) {
                bodyHtml += '<tr><td class="igt-table__check"><img src="assets/img/icons/check-square.svg" alt=""></td>';
                config.columns.forEach(function(col) {
                    var val = row[col.key];
                    if (val === null || val === undefined) val = '-';
                    bodyHtml += '<td>' + val + '</td>';
                });
                bodyHtml += '</tr>';
            });
        }
        $container.find('tbody').html(bodyHtml);

        // 5. Render Pagination
        renderPagination($container.find('.igt-pagination'), totalPages, state.page, function(newPage) {
            state.page = newPage;
            render();
        });
    }

    // Search event
    $container.find('input[type="search"]').on('input', function() {
        state.search = $(this).val();
        state.page = 1;
        render();
    });

    // Per Page event
    $container.find('select[id$="-perpage"]').on('change', function() {
        state.perPage = parseInt($(this).val(), 10) || 10;
        state.page = 1;
        render();
    });

    // Sort event
    $container.find('thead th[data-kolom]').on('click', function() {
        var col = $(this).data('kolom');
        if (state.sortCol === col) {
            state.sortAsc = !state.sortAsc;
        } else {
            state.sortCol = col;
            state.sortAsc = true;
        }
        render();
    });

    // Toggle segment (Tabel / Grafik)
    $container.find('.igt-segment__item').on('click', function() {
        var view = $(this).data('tampilan');
        $container.find('.igt-segment__item').removeClass('is-active');
        $(this).addClass('is-active');
        if (view === 'grafik') {
            $container.find('[id$="-tabel"]').hide();
            $container.find('[id$="-grafik"]').show();
        } else {
            $container.find('[id$="-grafik"]').hide();
            $container.find('[id$="-tabel"]').show();
        }
    });

    // Dropdown helpers
    setupDropdown(config.id + '-kelompok');

    render();
}

function renderPagination($el, totalPages, currentPage, onPageClick) {
    var html = '<button type="button" class="page-prev" ' + (currentPage === 1 ? 'disabled' : '') + '>&lsaquo;</button>';
    
    // Generate page numbers
    for (var i = 1; i <= totalPages; i++) {
        if (totalPages > 5 && i > 4 && i < totalPages) {
            if (i === 5) html += '<span class="igt-pagination__gap">...</span>';
            continue;
        }
        html += '<button type="button" class="' + (i === currentPage ? 'is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
    }

    html += '<button type="button" class="page-next" ' + (currentPage === totalPages ? 'disabled' : '') + '>&rsaquo;</button>';

    $el.html(html);

    $el.find('button[data-page]').on('click', function() {
        onPageClick(parseInt($(this).data('page'), 10));
    });
    $el.find('.page-prev').on('click', function() {
        if (currentPage > 1) onPageClick(currentPage - 1);
    });
    $el.find('.page-next').on('click', function() {
        if (currentPage < totalPages) onPageClick(currentPage + 1);
    });
}

function setupDropdown(id) {
    var $drop = $('#' + id);
    if (!$drop.length) return;

    $drop.find('.igt-dropdown__trigger').on('click', function(e) {
        e.stopPropagation();
        $('.igt-dropdown__panel').not($drop.find('.igt-dropdown__panel')).removeClass('is-open');
        $drop.find('.igt-dropdown__panel').toggleClass('is-open');
    });

    $drop.find('.igt-dropdown__item').on('click', function() {
        var label = $(this).text().trim();
        $drop.find('.igt-dropdown__label').text(label);
        $drop.find('.igt-dropdown__item').removeClass('is-active').find('img').attr('src', 'assets/img/icons/radio-off.svg');
        $(this).addClass('is-active').find('img').attr('src', 'assets/img/icons/radio-on.svg');
        $drop.find('.igt-dropdown__panel').removeClass('is-open');
    });

    $(document).on('click', function() {
        $drop.find('.igt-dropdown__panel').removeClass('is-open');
    });
}

/* ----------------------------------------------------
   7. Initialize All Section Tables
---------------------------------------------------- */
function initTables() {
    var data = window.MOCKUP_DATA;
    if (!data) return;

    // 1. Statistik IGT
    createTableController({
        id: 'statistik-igt',
        data: data.statistikIGT,
        defaultSortCol: 'igt',
        columns: [
            { key: 'igt', label: 'IGT' },
            { key: 'provinsi', label: 'Provinsi' },
            { key: 'kabupaten', label: 'Kabupaten' },
            { key: 'bidang', label: 'Bidang' },
            { key: 'luas', label: 'Luas (Ha)' }
        ]
    });

    // 2. Capaian Renaksi
    createTableController({
        id: 'capaian-renaksi',
        data: data.capaianRenaksi,
        defaultSortCol: 'direktorat',
        columns: [
            { key: 'direktorat', label: 'Direktorat' },
            { key: 'target', label: 'Target' },
            { key: 'capaian', label: 'Capaian' }
        ]
    });

    // 3. Statistik Derivatif
    createTableController({
        id: 'statistik-derivatif',
        data: data.statistikDerivatif,
        defaultSortCol: 'layer',
        columns: [
            { key: 'layer', label: 'Layer Derivatif' },
            { key: 'provinsi', label: 'Provinsi' },
            { key: 'kabupaten', label: 'Kabupaten' },
            { key: 'bidang', label: 'Bidang' },
            { key: 'luas', label: 'Luas (Ha)' }
        ]
    });

    // 4. Statistik Akses IGT
    createTableController({
        id: 'statistik-akses',
        data: data.statistikAksesIGT,
        defaultSortCol: 'direktorat',
        columns: [
            { key: 'direktorat', label: 'Direktorat' },
            { key: 'aktivitas', label: 'Aktivitas' },
            { key: 'total', label: 'Total' }
        ]
    });

    // 5. Aktivitas Log
    createTableController({
        id: 'aktivitas-log',
        data: data.aktivitasLog,
        defaultSortCol: 'tanggal',
        columns: [
            { key: 'user', label: 'Nama User' },
            { key: 'aktivitas', label: 'Aktivitas' },
            { key: 'tanggal', label: 'Tanggal' }
        ]
    });
}
