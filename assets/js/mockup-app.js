/**
 * IGTPR Mockup UI - Pure HTML/JS Application Logic
 * Interactive Province Filtering & Zoom-to-Province Behavior.
 */

var INDONESIA_BOUNDS = [[94.5, -11.5], [141.5, 6.5]];
var currentSelectedProvince = null;
var mapInstance = null;
var tableControllers = {};

$(document).ready(function() {
    initSidebar();
    initHeroMap();
    applyDataFilter(null); // start with national data
});

/* ----------------------------------------------------
   1. Sidebar & Mobile Toggle
---------------------------------------------------- */
function initSidebar() {
    $('#menuSidebar').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-show');
    });

    $(document).on('click', function(e) {
        if ($(window).width() < 992) {
            if (!$(e.target).closest('.sidebar, #menuSidebar').length) {
                $('body').removeClass('sidebar-show');
            }
        }
    });

    $('.nav-sidebar .nav-item').on('click', function() {
        $('.nav-sidebar .nav-link').removeClass('active');
        $(this).children('.nav-link').addClass('active');
    });

    $('#sidebarFooterMenu').on('click', function(e) {
        e.preventDefault();
        $('.sidebar-footer-menu').slideToggle(200);
    });
}

/* ----------------------------------------------------
   2. Helper: Calculate Bounding Box of GeoJSON Feature
---------------------------------------------------- */
function hitungBatasFitur(feature) {
    var minX = Infinity, minY = Infinity;
    var maxX = -Infinity, maxY = -Infinity;

    function telusuri(coord) {
        if (typeof coord[0] === 'number') {
            minX = Math.min(minX, coord[0]);
            minY = Math.min(minY, coord[1]);
            maxX = Math.max(maxX, coord[0]);
            maxY = Math.max(maxY, coord[1]);
            return;
        }
        coord.forEach(telusuri);
    }

    if (feature && feature.geometry && feature.geometry.coordinates) {
        telusuri(feature.geometry.coordinates);
    }

    return [[minX, minY], [maxX, maxY]];
}

/* ----------------------------------------------------
   3. Indonesia Map (Fixed View + Click to Zoom Province)
---------------------------------------------------- */
function initHeroMap() {
    var container = document.getElementById('beranda-peta');
    if (!container) return;

    if (typeof maplibregl !== 'undefined' && window.INDONESIA_GEOJSON) {
        try {
            mapInstance = new maplibregl.Map({
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
                        // Base fill for provinces
                        {
                            id: 'provinsi-isi',
                            type: 'fill',
                            source: 'indonesia',
                            paint: {
                                'fill-color': '#1860a9',
                                'fill-opacity': [
                                    'case',
                                    ['boolean', ['feature-state', 'selected'], false],
                                    0.75,
                                    [
                                        'interpolate',
                                        ['linear'],
                                        ['get', 'tema'],
                                        0, 0.08,
                                        1, 0.22,
                                        2, 0.38,
                                        4, 0.60
                                    ]
                                ]
                            }
                        },
                        // Province boundary lines
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
                        // Hover highlight line
                        {
                            id: 'provinsi-sorot',
                            type: 'line',
                            source: 'indonesia',
                            paint: {
                                'line-color': '#0284c7',
                                'line-width': 2.5
                            },
                            filter: ['==', 'nama', '']
                        },
                        // Clicked province prominent border
                        {
                            id: 'provinsi-terpilih-garis',
                            type: 'line',
                            source: 'indonesia',
                            paint: {
                                'line-color': '#0f172a',
                                'line-width': 3.0
                            },
                            filter: ['==', 'nama', '']
                        }
                    ]
                },
                bounds: INDONESIA_BOUNDS,
                fitBoundsOptions: { padding: { top: 25, bottom: 35, left: 20, right: 20 } },
                attributionControl: false,
                // LOCK MANUAL CONTROLS: no scroll zoom, fixed orientation
                scrollZoom: false,
                doubleClickZoom: false,
                touchPitch: false,
                dragRotate: false,
                boxZoom: false,
                dragPan: false // locked until province is clicked
            });

            // NOTE: NavigationControl (+ and - zoom buttons) are intentionally REMOVED as requested.

            var popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
                offset: 12
            });

            // Hover effects
            mapInstance.on('mousemove', 'provinsi-isi', function(e) {
                mapInstance.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0) {
                    var f = e.features[0];
                    mapInstance.setFilter('provinsi-sorot', ['==', 'nama', f.properties.nama]);
                    popup.setLngLat(e.lngLat)
                        .setHTML('<div style="padding:4px 8px; font-size:12px; font-weight:600; color:#0f172a;">' +
                            f.properties.nama +
                            '<div style="font-weight:400; color:#64748b; font-size:11px;">Klik untuk zoom & filter data</div></div>')
                        .addTo(mapInstance);
                }
            });

            mapInstance.on('mouseleave', 'provinsi-isi', function() {
                mapInstance.getCanvas().style.cursor = '';
                mapInstance.setFilter('provinsi-sorot', ['==', 'nama', '']);
                popup.remove();
            });

            // CLICK PROVINCE -> ZOOM IN & FILTER DATA!
            mapInstance.on('click', 'provinsi-isi', function(e) {
                if (!e.features || e.features.length === 0) return;
                var f = e.features[0];
                var provName = f.properties.nama;
                popup.remove();
                zoomKeProvinsi(f, provName);
            });

            // Reset buttons handler
            $(document).on('click', '#btn-reset-map-zoom, #btn-reset-hero-filter', function(e) {
                e.preventDefault();
                resetKeSeluruhIndonesia();
            });

            // Filter modal toggle
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

    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748b;font-size:14px;"><img src="assets/img/icons/map-pin.svg" style="opacity:0.4;width:40px;margin-right:12px;"> Peta Wilayah Indonesia</div>';
}

function zoomKeProvinsi(feature, namaProvinsi) {
    currentSelectedProvince = namaProvinsi;

    // 1. Calculate Bounding Box of the province
    var bbox = hitungBatasFitur(feature);

    // 2. Smoothly zoom into the clicked province
    if (mapInstance) {
        mapInstance.dragPan.enable(); // allow subtle panning while zoomed in
        mapInstance.fitBounds(bbox, {
            padding: { top: 60, bottom: 60, left: 60, right: 60 },
            maxZoom: 7.8,
            duration: 1000
        });

        // Set highlight filter
        mapInstance.setFilter('provinsi-terpilih-garis', ['==', 'nama', namaProvinsi]);
    }

    // 3. Show floating reset controls on map & header
    $('#map-selected-name').text(namaProvinsi);
    $('#map-wilayah-indicator').fadeIn(200);
    $('#hero-wilayah-badge').text('Provinsi: ' + namaProvinsi).fadeIn(200);

    // 4. Filter and update all data components below!
    applyDataFilter(namaProvinsi);
}

function resetKeSeluruhIndonesia() {
    currentSelectedProvince = null;

    // 1. Reset map view to full Indonesia bounds
    if (mapInstance) {
        mapInstance.dragPan.disable(); // lock view again
        mapInstance.fitBounds(INDONESIA_BOUNDS, {
            padding: { top: 25, bottom: 35, left: 20, right: 20 },
            duration: 900
        });

        // Clear highlight
        mapInstance.setFilter('provinsi-terpilih-garis', ['==', 'nama', '']);
    }

    // 2. Hide reset pills
    $('#map-wilayah-indicator').fadeOut(200);
    $('#hero-wilayah-badge').fadeOut(200);

    // 3. Reset data to national
    applyDataFilter(null);
}

/* ----------------------------------------------------
   4. Apply Filter to All Dashboard Components
---------------------------------------------------- */
function applyDataFilter(namaProvinsi) {
    var data = window.MOCKUP_DATA.getDataByProvinsi(namaProvinsi);
    if (!data) return;

    // A. Render Ringkasan (Usulan & Kompilasi)
    renderUsulanInputData(data.usulanInputData);
    renderKompilasiIntegrasi(data.kompilasiIntegrasi);

    // B. Render Leader Board
    renderLeaderBoard(data.leaderBoard);

    // C. Render All Section Tables
    renderTableSection('statistik-igt', data.statistikIGT, [
        { key: 'igt', label: 'IGT' },
        { key: 'provinsi', label: 'Provinsi' },
        { key: 'kabupaten', label: 'Kabupaten' },
        { key: 'bidang', label: 'Bidang' },
        { key: 'luas', label: 'Luas (Ha)' }
    ], 'igt');

    renderTableSection('capaian-renaksi', data.capaianRenaksi, [
        { key: 'direktorat', label: 'Unit / Direktorat' },
        { key: 'target', label: 'Target' },
        { key: 'capaian', label: 'Capaian' }
    ], 'direktorat');

    renderTableSection('statistik-derivatif', data.statistikDerivatif, [
        { key: 'layer', label: 'Layer Derivatif' },
        { key: 'provinsi', label: 'Provinsi' },
        { key: 'kabupaten', label: 'Kabupaten' },
        { key: 'bidang', label: 'Bidang' },
        { key: 'luas', label: 'Luas (Ha)' }
    ], 'layer');

    renderTableSection('statistik-akses', data.statistikAksesIGT, [
        { key: 'direktorat', label: 'Unit / Direktorat' },
        { key: 'aktivitas', label: 'Aktivitas' },
        { key: 'total', label: 'Total' }
    ], 'direktorat');

    renderTableSection('aktivitas-log', data.aktivitasLog, [
        { key: 'user', label: 'Nama User' },
        { key: 'aktivitas', label: 'Aktivitas' },
        { key: 'tanggal', label: 'Tanggal' }
    ], 'tanggal');
}

/* ----------------------------------------------------
   5. Usulan Input Data & Kompilasi Integrasi Renderers
---------------------------------------------------- */
function renderUsulanInputData(usulan) {
    $('#status-data-total').text(usulan.total);

    var progresHtml = '';
    var rincianHtml = '';

    usulan.kategori.forEach(function(kat, idx) {
        var bobot = usulan.total > 0 ? (kat.jumlah > 0 ? kat.jumlah : 0.8) : 1;
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
}

function renderKompilasiIntegrasi(kompilasi) {
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
    if (maks === 0) maks = 1;

    var TINGGI_GRAFIK = 95;
    var chartHtml = '';
    kompilasi.bulanan.forEach(function(b) {
        var total = (b.terkompilasi || 0) + (b.terintegrasi || 0);
        chartHtml += '<div class="igt-tumpuk__kolom" title="' + b.bulan + ': ' + (b.terkompilasi || 0) + ' Terkompilasi, ' + (b.terintegrasi || 0) + ' Terintegrasi">';
        
        if (total > 0) {
            var hKomp = Math.round(((b.terkompilasi || 0) / maks) * TINGGI_GRAFIK);
            var hInteg = Math.round(((b.terintegrasi || 0) / maks) * TINGGI_GRAFIK);

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
   6. Leader Board Renderer
---------------------------------------------------- */
function renderLeaderBoard(leaderBoardData) {
    var html = '';
    leaderBoardData.forEach(function(item) {
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

    $('#leader-board .igt-segment__item').off('click').on('click', function() {
        $('#leader-board .igt-segment__item').removeClass('is-active');
        $(this).addClass('is-active');
    });

    setupDropdown('leader-board-dasar');
}

/* ----------------------------------------------------
   7. Table Section Controller & Renderer
---------------------------------------------------- */
function renderTableSection(id, rawData, columns, defaultSortCol) {
    if (!tableControllers[id]) {
        tableControllers[id] = {
            id: id,
            columns: columns,
            data: rawData,
            search: '',
            perPage: 10,
            page: 1,
            sortCol: defaultSortCol,
            sortAsc: true
        };
        bindTableEvents(tableControllers[id]);
    } else {
        tableControllers[id].data = rawData;
        tableControllers[id].page = 1;
    }

    renderTable(tableControllers[id]);
}

function renderTable(ctrl) {
    var $container = $('#' + ctrl.id);

    // 1. Filter by search input
    var filtered = ctrl.data.filter(function(row) {
        if (!ctrl.search) return true;
        var term = ctrl.search.toLowerCase();
        return Object.values(row).some(function(val) {
            return String(val).toLowerCase().indexOf(term) !== -1;
        });
    });

    // 2. Sort
    filtered.sort(function(a, b) {
        var valA = a[ctrl.sortCol];
        var valB = b[ctrl.sortCol];
        var comp = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
            comp = valA - valB;
        } else {
            comp = String(valA).localeCompare(String(valB), 'id');
        }
        return ctrl.sortAsc ? comp : -comp;
    });

    // 3. Paginate
    var totalPages = Math.max(1, Math.ceil(filtered.length / ctrl.perPage));
    if (ctrl.page > totalPages) ctrl.page = totalPages;
    var start = (ctrl.page - 1) * ctrl.perPage;
    var pageItems = filtered.slice(start, start + ctrl.perPage);

    // 4. Render Rows
    var bodyHtml = '';
    if (pageItems.length === 0) {
        bodyHtml = '<tr><td colspan="' + (ctrl.columns.length + 1) + '" class="igt-table__empty">Data Tidak Ditemukan!</td></tr>';
    } else {
        pageItems.forEach(function(row) {
            bodyHtml += '<tr><td class="igt-table__check"><img src="assets/img/icons/check-square.svg" alt=""></td>';
            ctrl.columns.forEach(function(col) {
                var val = row[col.key];
                if (val === null || val === undefined) val = '-';
                bodyHtml += '<td>' + val + '</td>';
            });
            bodyHtml += '</tr>';
        });
    }
    $container.find('tbody').html(bodyHtml);

    // 5. Render Pagination controls
    renderPaginationHtml($container.find('.igt-pagination'), totalPages, ctrl.page, function(newPage) {
        ctrl.page = newPage;
        renderTable(ctrl);
    });
}

function bindTableEvents(ctrl) {
    var $container = $('#' + ctrl.id);

    $container.find('input[type="search"]').on('input', function() {
        ctrl.search = $(this).val();
        ctrl.page = 1;
        renderTable(ctrl);
    });

    $container.find('select[id$="-perpage"]').on('change', function() {
        ctrl.perPage = parseInt($(this).val(), 10) || 10;
        ctrl.page = 1;
        renderTable(ctrl);
    });

    $container.find('thead th[data-kolom]').on('click', function() {
        var col = $(this).data('kolom');
        if (ctrl.sortCol === col) {
            ctrl.sortAsc = !ctrl.sortAsc;
        } else {
            ctrl.sortCol = col;
            ctrl.sortAsc = true;
        }
        renderTable(ctrl);
    });

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

    setupDropdown(ctrl.id + '-kelompok');
}

function renderPaginationHtml($el, totalPages, currentPage, onPageClick) {
    var html = '<button type="button" class="page-prev" ' + (currentPage === 1 ? 'disabled' : '') + '>&lsaquo;</button>';
    
    for (var i = 1; i <= totalPages; i++) {
        if (totalPages > 5 && i > 4 && i < totalPages) {
            if (i === 5) html += '<span class="igt-pagination__gap">...</span>';
            continue;
        }
        html += '<button type="button" class="' + (i === currentPage ? 'is-active' : '') + '" data-page="' + i + '">' + i + '</button>';
    }

    html += '<button type="button" class="page-next" ' + (currentPage === totalPages ? 'disabled' : '') + '>&rsaquo;</button>';

    $el.html(html);

    $el.find('button[data-page]').off('click').on('click', function() {
        onPageClick(parseInt($(this).data('page'), 10));
    });
    $el.find('.page-prev').off('click').on('click', function() {
        if (currentPage > 1) onPageClick(currentPage - 1);
    });
    $el.find('.page-next').off('click').on('click', function() {
        if (currentPage < totalPages) onPageClick(currentPage + 1);
    });
}

function setupDropdown(id) {
    var $drop = $('#' + id);
    if (!$drop.length) return;

    $drop.find('.igt-dropdown__trigger').off('click').on('click', function(e) {
        e.stopPropagation();
        $('.igt-dropdown__panel').not($drop.find('.igt-dropdown__panel')).removeClass('is-open');
        $drop.find('.igt-dropdown__panel').toggleClass('is-open');
    });

    $drop.find('.igt-dropdown__item').off('click').on('click', function() {
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
