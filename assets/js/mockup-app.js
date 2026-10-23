/**
 * IGTPR Mockup UI - Pure HTML/JS Application Logic
 * Multi-Level Drilldown:
 * Level 1: Seluruh Indonesia (Nasional)
 * Level 2: Tingkat Provinsi (e.g. Jawa Tengah) -> Menampilkan batas kabupaten/kota
 * Level 3: Tingkat Kabupaten/Kota (e.g. Kab. Semarang, Kota Semarang, Banyumas, Karanganyar, Solo)
 */

var INDONESIA_BOUNDS = [[93.0, -12.8], [142.5, 7.5]];
var currentProvince = null;
var currentProvinceFeature = null;
var currentKabupaten = null;
var mapInstance = null;
var tableControllers = {};

function getFitBoundsPadding() {
    var w = window.innerWidth;
    return {
        top: 25,
        bottom: 60,
        left: w >= 1200 ? 220 : 30,
        right: 30
    };
}

$(document).ready(function() {
    initSidebar();
    initHeroMap();
    applyDataFilter(null, null); // start at national level
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

function normProvinsi(s) {
    return String(s || '').trim().toLowerCase().replace(/^(provinsi|daerah istimewa|daerah khusus ibukota)\s+/i, '');
}

function normKabupaten(s) {
    return String(s || '').trim().toLowerCase().replace(/^(kabupaten|kota|administrasi)\s+/i, '');
}

function findProvinceFeature(namaProvinsi) {
    if (!window.INDONESIA_GEOJSON || !window.INDONESIA_GEOJSON.features) return null;
    var target = normProvinsi(namaProvinsi);
    var features = window.INDONESIA_GEOJSON.features;
    for (var i = 0; i < features.length; i++) {
        var f = features[i];
        var fnama = normProvinsi(f.properties && f.properties.nama);
        if (fnama === target) return f;
    }
    return null;
}

function findKabupatenFeature(namaKabupaten, namaProvinsi) {
    if (!window.INDONESIA_KABUPATEN_GEOJSON || !window.INDONESIA_KABUPATEN_GEOJSON.features) return null;
    var target = String(namaKabupaten || '').trim().toLowerCase();
    var pTarget = namaProvinsi ? normProvinsi(namaProvinsi) : null;
    var features = window.INDONESIA_KABUPATEN_GEOJSON.features;

    // Pass 1: exact match
    for (var i = 0; i < features.length; i++) {
        var f = features[i];
        var fprov = normProvinsi(f.properties && f.properties.provinsi);
        if (pTarget && fprov !== pTarget) continue;
        var fkab = String(f.properties && f.properties.kabupaten || '').trim().toLowerCase();
        if (fkab === target) return f;
    }

    // Pass 2: normalized match (stripping kabupaten/kota prefix)
    var targetNorm = normKabupaten(target);
    for (var j = 0; j < features.length; j++) {
        var f2 = features[j];
        var fprov2 = normProvinsi(f2.properties && f2.properties.provinsi);
        if (pTarget && fprov2 !== pTarget) continue;
        var fkabNorm = normKabupaten(f2.properties && f2.properties.kabupaten);
        if (fkabNorm === targetNorm) return f2;
    }
    return null;
}

function formatNamaKabupaten(nama) {
    if (!nama) return '';
    var n = String(nama).trim();
    if (/^kota\s+/i.test(n)) {
        if (/^kota\s+surakarta/i.test(n)) return 'Kota Surakarta (Solo)';
        return n;
    }
    if (/^kabupaten\s+/i.test(n)) return n;
    return 'Kabupaten ' + n;
}

/* ----------------------------------------------------
   3. Indonesia Multi-Level Map (MapLibre GL)
---------------------------------------------------- */
function initHeroMap() {
    var container = document.getElementById('beranda-peta');
    if (!container) return;

    if (typeof maplibregl !== 'undefined' && window.INDONESIA_GEOJSON) {
        try {
            var sources = {
                'indonesia': {
                    type: 'geojson',
                    data: window.INDONESIA_GEOJSON
                }
            };

            if (window.INDONESIA_KABUPATEN_GEOJSON) {
                sources['kabupaten'] = {
                    type: 'geojson',
                    data: window.INDONESIA_KABUPATEN_GEOJSON
                };
            }

            mapInstance = new maplibregl.Map({
                container: 'beranda-peta',
                style: {
                    version: 8,
                    sources: sources,
                    layers: [
                        // --- PROVINCE LEVEL LAYERS ---
                        {
                            id: 'provinsi-isi',
                            type: 'fill',
                            source: 'indonesia',
                            paint: {
                                'fill-color': '#1d4ed8',
                                'fill-opacity': [
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'tema'],
                                    0, 0.04,
                                    1, 0.16,
                                    2, 0.30,
                                    3, 0.48,
                                    4, 0.65
                                ]
                            }
                        },
                        {
                            id: 'provinsi-garis',
                            type: 'line',
                            source: 'indonesia',
                            paint: {
                                'line-color': '#3b82f6',
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
                        },
                        {
                            id: 'provinsi-terpilih-garis',
                            type: 'line',
                            source: 'indonesia',
                            paint: {
                                'line-color': '#1e40af',
                                'line-width': 2.0
                            },
                            filter: ['==', 'nama', '']
                        },

                        // --- KABUPATEN / KOTA LEVEL LAYERS ---
                        {
                            id: 'kabupaten-isi',
                            type: 'fill',
                            source: 'kabupaten',
                            paint: {
                                'fill-color': '#e0f2fe',
                                'fill-opacity': 0.55
                            },
                            filter: ['==', 'provinsi', ''] // initially hidden
                        },
                        {
                            id: 'kabupaten-garis',
                            type: 'line',
                            source: 'kabupaten',
                            paint: {
                                'line-color': '#3b82f6',
                                'line-width': 1.0,
                                'line-opacity': 0.85
                            },
                            filter: ['==', 'provinsi', '']
                        },
                        {
                            id: 'kabupaten-sorot',
                            type: 'line',
                            source: 'kabupaten',
                            paint: {
                                'line-color': '#1e3a8a',
                                'line-width': 2.5
                            },
                            filter: ['==', 'kabupaten', '']
                        },
                        {
                            id: 'kabupaten-terpilih-isi',
                            type: 'fill',
                            source: 'kabupaten',
                            paint: {
                                'fill-color': '#2563eb',
                                'fill-opacity': 0.85
                            },
                            filter: ['==', 'kabupaten', '']
                        },
                        {
                            id: 'kabupaten-terpilih-garis',
                            type: 'line',
                            source: 'kabupaten',
                            paint: {
                                'line-color': '#1e3a8a',
                                'line-width': 2.5
                            },
                            filter: ['==', 'kabupaten', '']
                        }
                    ]
                },
                bounds: INDONESIA_BOUNDS,
                fitBoundsOptions: { padding: getFitBoundsPaddingDetailSeIndonesia() },
                attributionControl: false,
                scrollZoom: false,
                doubleClickZoom: false,
                touchPitch: false,
                dragRotate: false,
                boxZoom: false,
                dragPan: false
            });

            var popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
                offset: 12
            });

            // 1. Hover Province
            mapInstance.on('mousemove', 'provinsi-isi', function(e) {
                if (currentProvince) return; // ignore when already inside a province
                mapInstance.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0) {
                    var f = e.features[0];
                    mapInstance.setFilter('provinsi-sorot', ['==', 'nama', f.properties.nama]);
                    popup.setLngLat(e.lngLat)
                        .setHTML('<div style="padding:4px 8px; font-size:12px; font-weight:600; color:#0f172a;">' +
                            f.properties.nama +
                            '<div style="font-weight:400; color:#64748b; font-size:11px;">Klik untuk lihat kabupaten/kota</div></div>')
                        .addTo(mapInstance);
                }
            });

            mapInstance.on('mouseleave', 'provinsi-isi', function() {
                if (!currentProvince) {
                    mapInstance.getCanvas().style.cursor = '';
                    mapInstance.setFilter('provinsi-sorot', ['==', 'nama', '']);
                    popup.remove();
                }
            });

            // 2. Click Province (Level 1 -> Level 2)
            mapInstance.on('click', 'provinsi-isi', function(e) {
                if (!e.features || e.features.length === 0) return;
                var f = e.features[0];
                if (currentProvince && currentProvince.toLowerCase() === f.properties.nama.toLowerCase()) {
                    return;
                }
                popup.remove();
                zoomKeProvinsi(f, f.properties.nama);
            });

            // 3. Hover Kabupaten
            mapInstance.on('mousemove', 'kabupaten-isi', function(e) {
                if (!currentProvince) return;
                mapInstance.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0) {
                    var f = e.features[0];
                    var kabName = f.properties.kabupaten;
                    mapInstance.setFilter('kabupaten-sorot', ['==', 'kabupaten', kabName]);
                    popup.setLngLat(e.lngLat)
                        .setHTML('<div style="padding:4px 8px; font-size:12px; font-weight:600; color:#0f172a;">' +
                            formatNamaKabupaten(kabName) +
                            '<div style="font-weight:400; color:#64748b; font-size:11px;">' + currentProvince + ' &bull; Klik untuk filter data</div></div>')
                        .addTo(mapInstance);
                }
            });

            mapInstance.on('mouseleave', 'kabupaten-isi', function() {
                if (currentProvince) {
                    mapInstance.getCanvas().style.cursor = '';
                    mapInstance.setFilter('kabupaten-sorot', ['==', 'kabupaten', '']);
                    popup.remove();
                }
            });

            // 4. Click Kabupaten (Level 2 -> Level 3)
            mapInstance.on('click', 'kabupaten-isi', function(e) {
                if (!currentProvince) return;
                if (!e.features || e.features.length === 0) return;
                var f = e.features[0];
                popup.remove();
                zoomKeKabupaten(f, f.properties.kabupaten);
            });

            // 5. Navigation Buttons
            $(document).on('click', '#btn-back-to-province', function(e) {
                e.preventDefault();
                kembaliKeProvinsi();
            });

            $(document).on('click', '#btn-reset-map-zoom', function(e) {
                e.preventDefault();
                resetKeSeluruhIndonesia();
            });

            // 6. Detail Card Event Handlers
            $('#beranda-detail-tutup').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (detailState.jenisWilayah === 'kabupaten') {
                    kembaliKeProvinsi();
                } else if (detailState.jenisWilayah === 'provinsi') {
                    resetKeSeluruhIndonesia();
                } else {
                    // Tutup/minimize saat di tingkat nasional
                    tutupDetailInformasi();
                    $('#beranda-detail-toggle').fadeIn(150);
                    if (mapInstance) {
                        mapInstance.fitBounds(INDONESIA_BOUNDS, {
                            padding: getFitBoundsPadding(),
                            duration: 600
                        });
                    }
                }
            });

            $('#beranda-detail-toggle').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                bukaDetailInformasi(
                    currentKabupaten ? currentKabupaten : (currentProvince ? currentProvince : 'Seluruh Indonesia'),
                    currentKabupaten ? 'kabupaten' : (currentProvince ? 'provinsi' : 'nasional'),
                    currentProvince
                );
                if (!currentProvince && mapInstance) {
                    mapInstance.fitBounds(INDONESIA_BOUNDS, {
                        padding: getFitBoundsPaddingDetailSeIndonesia(),
                        duration: 600
                    });
                }
            });

            $('#beranda-detail-kembali').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                kembaliKeProvinsi();
            });

            $('#beranda-detail-cari').on('input', renderDetailChips);
            $('#beranda-detail-jenis, #beranda-detail-tahun').on('change', renderDetailChips);

            // Wilayah selector (Pilih Provinsi saat Se-Indonesia / Pilih Kabupaten saat Se-Provinsi atau Se-Kabupaten)
            $('#beranda-detail-wilayah-pilih').on('change', function() {
                var val = $(this).val();
                if (detailState.jenisWilayah === 'nasional' || !currentProvince) {
                    // Saat Se-Indonesia: memilih provinsi
                    if (val) {
                        var feat = findProvinceFeature(val);
                        if (feat) {
                            zoomKeProvinsi(feat, feat.properties.nama);
                        }
                    }
                } else {
                    // Saat Se-Provinsi atau Se-Kabupaten: memilih kabupaten
                    if (val) {
                        var feat = findKabupatenFeature(val, currentProvince);
                        if (feat) {
                            zoomKeKabupaten(feat, feat.properties.kabupaten);
                        }
                    } else {
                        // Memilih "Semua Kabupaten" / "Pilih Kabupaten"
                        kembaliKeProvinsi();
                    }
                }
            });

            // Shortcut Cmd+K / Ctrl+K to search & Esc to close
            $(document).on('keydown', function(e) {
                if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
                    if (detailState.isOpen) {
                        e.preventDefault();
                        $('#beranda-detail-cari').focus().select();
                    }
                } else if (e.key === 'Escape') {
                    if (detailState.isOpen && !$(e.target).is('input:focus')) {
                        if (detailState.jenisWilayah === 'kabupaten') {
                            kembaliKeProvinsi();
                        } else if (detailState.jenisWilayah === 'provinsi') {
                            resetKeSeluruhIndonesia();
                        } else {
                            tutupDetailInformasi();
                            $('#beranda-detail-toggle').fadeIn(150);
                            if (mapInstance) {
                                mapInstance.fitBounds(INDONESIA_BOUNDS, {
                                    padding: getFitBoundsPadding(),
                                    duration: 600
                                });
                            }
                        }
                    }
                }
            });

            // Map canvas background click (outside polygons) to reset if drilled down
            mapInstance.on('click', function(e) {
                if (detailState.isOpen && currentProvince) {
                    var features = mapInstance.queryRenderedFeatures(e.point, {
                        layers: ['kabupaten-isi', 'provinsi-isi']
                    });
                    if (!features.length) {
                        resetKeSeluruhIndonesia();
                    }
                }
            });

            // Buka Detail Informasi untuk Seluruh Indonesia secara default saat peta siap
            bukaDetailInformasi('Seluruh Indonesia', 'nasional', null);

            return;
        } catch (err) {
            console.warn('MapLibre multi-level init error:', err);
        }
    }

    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748b;font-size:14px;"><img src="assets/img/icons/map-pin.svg" style="opacity:0.4;width:40px;margin-right:12px;"> Peta Wilayah Indonesia</div>';
}

/* ----------------------------------------------------
   Detail Informasi Popup State & Functions
----------------------------------------------------- */
var detailState = {
    wilayah: null,
    jenisWilayah: null, // 'nasional', 'provinsi', or 'kabupaten'
    indukProvinsi: null,
    themes: [],
    isOpen: false
};

function getFitBoundsPaddingDetailSeIndonesia() {
    var containerEl = document.getElementById('beranda-peta');
    var containerWidth = (mapInstance && mapInstance.getContainer())
        ? mapInstance.getContainer().clientWidth
        : (containerEl ? containerEl.clientWidth : 1200);
    if (!containerWidth || containerWidth <= 0) containerWidth = 1200;

    var isDesktop = window.matchMedia('(min-width: 992px)').matches;
    if (!isDesktop) {
        return { top: 25, bottom: 45, left: 20, right: 20 };
    }
    var detailEl = document.getElementById('beranda-detail');
    var detailOffset = (detailEl && detailEl.offsetLeft > 0) ? detailEl.offsetLeft : 56;
    var detailWidth = (detailEl && detailEl.offsetWidth > 0) ? detailEl.offsetWidth : 580;
    var leftPadding = Math.min(detailOffset + detailWidth + 24, containerWidth * 0.52);
    return {
        top: 25,
        bottom: 55,
        left: leftPadding,
        right: 30
    };
}

function getFitBoundsPaddingDetail() {
    var containerEl = document.getElementById('beranda-peta');
    var containerWidth = (mapInstance && mapInstance.getContainer())
        ? mapInstance.getContainer().clientWidth
        : (containerEl ? containerEl.clientWidth : 1200);
    if (!containerWidth || containerWidth <= 0) containerWidth = 1200;

    var isDesktop = window.matchMedia('(min-width: 992px)').matches;
    if (!isDesktop) {
        return { top: 40, bottom: 40, left: 30, right: 30 };
    }
    var detailEl = document.getElementById('beranda-detail');
    var detailOffset = (detailEl && detailEl.offsetLeft > 0) ? detailEl.offsetLeft : 56;
    var detailWidth = (detailEl && detailEl.offsetWidth > 0) ? detailEl.offsetWidth : 580;
    var leftPadding = Math.min(detailOffset + detailWidth + 30, containerWidth * 0.70);
    return {
        top: 60,
        bottom: 60,
        left: leftPadding,
        right: 40
    };
}

function updateWilayahDropdown(jenisWilayah, namaProvinsi, terpilihKabupaten) {
    var select = $('#beranda-detail-wilayah-pilih');
    if (!select.length) return;

    if (jenisWilayah === 'nasional' || !namaProvinsi) {
        // Mode A: Pilih Provinsi (Se-Indonesia)
        var html = '<option value="">Pilih Provinsi</option>';
        if (window.INDONESIA_GEOJSON && window.INDONESIA_GEOJSON.features) {
            var provNames = window.INDONESIA_GEOJSON.features
                .map(function(f) { return f.properties && f.properties.nama; })
                .filter(Boolean)
                .sort(function(a, b) { return a.localeCompare(b, 'id'); });
            provNames.forEach(function(prov) {
                html += '<option value="' + prov + '">' + prov + '</option>';
            });
        }
        select.html(html);
        select.val('');
        select.attr('aria-label', 'Pilih Provinsi');
    } else {
        // Mode B & C: Pilih Kabupaten (Se-Provinsi / Se-Kabupaten)
        var html = '<option value="">' + (terpilihKabupaten ? 'Semua Kabupaten' : 'Pilih Kabupaten') + '</option>';
        var provLower = normProvinsi(namaProvinsi);

        if (window.INDONESIA_KABUPATEN_GEOJSON && window.INDONESIA_KABUPATEN_GEOJSON.features) {
            var kabs = window.INDONESIA_KABUPATEN_GEOJSON.features
                .filter(function(f) {
                    var fp = normProvinsi(f.properties && f.properties.provinsi);
                    return fp === provLower;
                })
                .map(function(f) { return f.properties.kabupaten; })
                .sort(function(a, b) { return a.localeCompare(b, 'id'); });

            if (kabs.length > 0) {
                kabs.forEach(function(kab) {
                    var label = formatNamaKabupaten(kab);
                    var selected = (terpilihKabupaten && terpilihKabupaten.toLowerCase() === kab.toLowerCase()) ? ' selected' : '';
                    html += '<option value="' + kab + '"' + selected + '>' + label + '</option>';
                });
            } else {
                html += '<option value="" disabled>Belum ada data kabupaten</option>';
            }
        }
        select.html(html);
        if (terpilihKabupaten) {
            select.val(terpilihKabupaten);
        } else {
            select.val('');
        }
        select.attr('aria-label', 'Pilih Kabupaten');
    }
}

function bukaDetailInformasi(namaWilayah, jenisWilayah, indukProvinsi) {
    detailState.wilayah = namaWilayah;
    detailState.jenisWilayah = jenisWilayah; // 'nasional', 'provinsi', or 'kabupaten'
    detailState.indukProvinsi = indukProvinsi || null;
    detailState.isOpen = true;

    // Format display title
    var displayTitle = '';
    if (jenisWilayah === 'nasional') {
        displayTitle = 'Seluruh Indonesia';
        $('#beranda-detail-kembali').hide();
    } else if (jenisWilayah === 'provinsi') {
        displayTitle = /^provinsi\s/i.test(namaWilayah) ? namaWilayah : 'Provinsi ' + namaWilayah;
        $('#beranda-detail-kembali').hide();
    } else {
        displayTitle = formatNamaKabupaten(namaWilayah);
        $('#beranda-detail-kembali-nama').text(indukProvinsi || 'Provinsi');
        $('#beranda-detail-kembali').show();
    }
    $('#beranda-detail-nama').text(displayTitle).attr('title', displayTitle);

    // Fetch themes for this region
    detailState.themes = (window.MOCKUP_DATA && window.MOCKUP_DATA.getDetailThemes)
        ? window.MOCKUP_DATA.getDetailThemes(
            jenisWilayah === 'nasional' ? 'nasional' : (indukProvinsi || namaWilayah),
            jenisWilayah === 'kabupaten' ? namaWilayah : null
          )
        : [];

    // Update Wilayah dropdown (Pilih Provinsi or Pilih Kabupaten)
    updateWilayahDropdown(
        jenisWilayah,
        jenisWilayah === 'nasional' ? null : (indukProvinsi || namaWilayah),
        jenisWilayah === 'kabupaten' ? namaWilayah : null
    );

    // Reset filter controls
    $('#beranda-detail-jenis').val('');
    $('#beranda-detail-cari').val('');
    $('#beranda-detail-tahun').val('all');

    // Render chips and badge counter
    renderDetailChips();

    // Reveal the popup card
    $('#beranda-detail').addClass('is-buka').attr('aria-hidden', 'false');
    $('#beranda').addClass('is-rinci');
    $('#beranda-detail-toggle').hide(); // Hide toolbar button when card is open
    $('#map-wilayah-indicator').hide(); // Hide floating breadcrumb to avoid UI clutter
}

function tutupDetailInformasi() {
    detailState.isOpen = false;
    $('#beranda-detail').removeClass('is-buka').attr('aria-hidden', 'true');
    $('#beranda').removeClass('is-rinci');
}

function renderDetailChips() {
    var q = $.trim($('#beranda-detail-cari').val()).toLowerCase();
    var jenis = $('#beranda-detail-jenis').val();
    var tahun = $('#beranda-detail-tahun').val();

    var filtered = detailState.themes.filter(function(item) {
        var matchQ = !q || item.nama.toLowerCase().indexOf(q) !== -1 || ('igt ' + item.nama.toLowerCase()).indexOf(q) !== -1;
        var itemJenis = item.jenis || item.basis;
        var matchJenis = !jenis || itemJenis === jenis || (jenis === 'pertanahan' && itemJenis === 'bidang') || (jenis === 'tataruang' && itemJenis === 'kawasan');
        var matchTahun = !tahun || tahun === 'all' || item.tahun === tahun;
        return matchQ && matchJenis && matchTahun;
    });

    $('#beranda-detail-tema').text(filtered.length);

    var container = $('#beranda-detail-daftar');
    if (!filtered.length) {
        container.html('<p class="igt-detail__kosong text-muted small my-2">Tidak ada IGT yang cocok dengan filter.</p>');
        return;
    }

    var html = '<div class="igt-detail__kolom">' +
        '<div class="igt-detail__baris-label">' +
        '    <div class="igt-detail__legenda">' +
        '        <span class="igt-detail__legenda-item"><span class="igt-detail__legenda-titik igt-detail__legenda-titik--pertanahan"></span> IGT Pertanahan</span>' +
        '        <span class="igt-detail__legenda-item"><span class="igt-detail__legenda-titik igt-detail__legenda-titik--tataruang"></span> IGT Tata Ruang</span>' +
        '    </div>' +
        '</div>' +
        '<div class="igt-detail__chips">';

    filtered.forEach(function(item) {
        var isTataRuang = (item.jenis === 'tataruang' || item.basis === 'kawasan');
        var cls = isTataRuang ? 'igt-tag--tataruang' : 'igt-tag--pertanahan';
        var tooltip = isTataRuang ? 'IGT Tata Ruang' : 'IGT Pertanahan';
        html += '<span class="igt-tag ' + cls + '" title="' + tooltip + '">' + item.nama + '</span>';
    });

    html += '</div></div>';
    container.html(html);
}

/* ----------------------------------------------------
   Level Transitions
----------------------------------------------------- */

// Transition to Province View (Level 2)
function zoomKeProvinsi(feature, namaProvinsi) {
    currentProvince = namaProvinsi;
    currentProvinceFeature = feature;
    currentKabupaten = null;

    var bbox = hitungBatasFitur(feature);

    if (mapInstance) {
        mapInstance.dragPan.enable();
        mapInstance.fitBounds(bbox, {
            padding: getFitBoundsPaddingDetail(),
            maxZoom: 8.5,
            duration: 1000
        });

        // Dim outside provinces so selected province pops out clearly
        var provKey = namaProvinsi.toLowerCase();
        mapInstance.setPaintProperty('provinsi-isi', 'fill-opacity', [
            'case',
            ['==', ['downcase', ['get', 'nama']], provKey], 0.04,
            0.02
        ]);
        mapInstance.setPaintProperty('provinsi-garis', 'line-opacity', [
            'case',
            ['==', ['downcase', ['get', 'nama']], provKey], 0.9,
            0.15
        ]);

        // Highlight selected province boundary
        mapInstance.setFilter('provinsi-terpilih-garis', ['==', 'nama', namaProvinsi]);
        mapInstance.setFilter('provinsi-sorot', ['==', 'nama', '']);

        // Reveal kabupaten boundaries for this province
        var kabFilter = ['==', ['downcase', ['get', 'provinsi']], provKey];
        mapInstance.setFilter('kabupaten-isi', kabFilter);
        mapInstance.setFilter('kabupaten-garis', kabFilter);

        // Reset kabupaten styling to default province level
        mapInstance.setPaintProperty('kabupaten-isi', 'fill-color', '#e0f2fe');
        mapInstance.setPaintProperty('kabupaten-isi', 'fill-opacity', 0.55);
        mapInstance.setPaintProperty('kabupaten-garis', 'line-color', '#3b82f6');
        mapInstance.setPaintProperty('kabupaten-garis', 'line-width', 1.0);
        mapInstance.setPaintProperty('kabupaten-garis', 'line-opacity', 0.85);

        // Reset selection
        mapInstance.setFilter('kabupaten-terpilih-isi', ['==', 'kabupaten', '']);
        mapInstance.setFilter('kabupaten-terpilih-garis', ['==', 'kabupaten', '']);
        mapInstance.setFilter('kabupaten-sorot', ['==', 'kabupaten', '']);
    }

    // Open Detail Informasi popup
    bukaDetailInformasi(namaProvinsi, 'provinsi', null);
    $('#hero-wilayah-badge').hide();

    // Update Dashboard Data
    applyDataFilter(namaProvinsi, null);
}

// Transition to Kabupaten View (Level 3)
function zoomKeKabupaten(feature, namaKabupaten) {
    currentKabupaten = namaKabupaten;
    var kabDisplay = formatNamaKabupaten(namaKabupaten);

    var bbox = hitungBatasFitur(feature);

    if (mapInstance) {
        mapInstance.fitBounds(bbox, {
            padding: getFitBoundsPaddingDetail(),
            maxZoom: 10.5,
            duration: 900
        });

        // Invert focus: Mute other kabupaten, highlight selected kabupaten in rich primary blue
        var kabKey = String(namaKabupaten).toLowerCase();
        mapInstance.setPaintProperty('kabupaten-isi', 'fill-color', [
            'case',
            ['==', ['downcase', ['get', 'kabupaten']], kabKey], '#2563eb',
            '#f8fafc'
        ]);
        mapInstance.setPaintProperty('kabupaten-isi', 'fill-opacity', [
            'case',
            ['==', ['downcase', ['get', 'kabupaten']], kabKey], 0.85,
            0.35
        ]);
        mapInstance.setPaintProperty('kabupaten-garis', 'line-color', [
            'case',
            ['==', ['downcase', ['get', 'kabupaten']], kabKey], '#1e3a8a',
            '#cbd5e1'
        ]);
        mapInstance.setPaintProperty('kabupaten-garis', 'line-width', [
            'case',
            ['==', ['downcase', ['get', 'kabupaten']], kabKey], 2.2,
            0.8
        ]);

        mapInstance.setFilter('kabupaten-sorot', ['==', 'kabupaten', '']);
    }

    // Open Detail Informasi for Kabupaten
    bukaDetailInformasi(namaKabupaten, 'kabupaten', currentProvince);
    $('#hero-wilayah-badge').hide();

    // Update Dashboard Data for this Kabupaten
    applyDataFilter(currentProvince, namaKabupaten);
}

// Return from Kabupaten back to Province view
function kembaliKeProvinsi() {
    if (currentProvinceFeature && currentProvince) {
        currentKabupaten = null;
        var bbox = hitungBatasFitur(currentProvinceFeature);

        if (mapInstance) {
            mapInstance.fitBounds(bbox, {
                padding: getFitBoundsPaddingDetail(),
                maxZoom: 8.5,
                duration: 900
            });

            // Restore all kabupaten in this province
            mapInstance.setPaintProperty('kabupaten-isi', 'fill-color', '#e0f2fe');
            mapInstance.setPaintProperty('kabupaten-isi', 'fill-opacity', 0.55);
            mapInstance.setPaintProperty('kabupaten-garis', 'line-color', '#3b82f6');
            mapInstance.setPaintProperty('kabupaten-garis', 'line-width', 1.0);
            mapInstance.setPaintProperty('kabupaten-garis', 'line-opacity', 0.85);

            mapInstance.setFilter('kabupaten-terpilih-isi', ['==', 'kabupaten', '']);
            mapInstance.setFilter('kabupaten-terpilih-garis', ['==', 'kabupaten', '']);
            mapInstance.setFilter('kabupaten-sorot', ['==', 'kabupaten', '']);
        }

        // Open Detail Informasi for Province
        bukaDetailInformasi(currentProvince, 'provinsi', null);
        $('#hero-wilayah-badge').hide();

        // Update Dashboard Data back to province level
        applyDataFilter(currentProvince, null);
    } else {
        resetKeSeluruhIndonesia();
    }
}

// Return back to National view (Level 1)
function resetKeSeluruhIndonesia() {
    currentProvince = null;
    currentProvinceFeature = null;
    currentKabupaten = null;

    if (mapInstance) {
        mapInstance.dragPan.disable();
        mapInstance.fitBounds(INDONESIA_BOUNDS, {
            padding: getFitBoundsPaddingDetailSeIndonesia(),
            duration: 900
        });

        // Hide kabupaten layers
        mapInstance.setFilter('kabupaten-isi', ['==', 'provinsi', '']);
        mapInstance.setFilter('kabupaten-garis', ['==', 'provinsi', '']);
        mapInstance.setFilter('kabupaten-terpilih-isi', ['==', 'kabupaten', '']);
        mapInstance.setFilter('kabupaten-terpilih-garis', ['==', 'kabupaten', '']);
        mapInstance.setFilter('kabupaten-sorot', ['==', 'kabupaten', '']);
        mapInstance.setFilter('provinsi-terpilih-garis', ['==', 'nama', '']);
        mapInstance.setFilter('provinsi-sorot', ['==', 'nama', '']);

        // Restore province theme styling
        mapInstance.setPaintProperty('provinsi-isi', 'fill-color', '#1d4ed8');
        mapInstance.setPaintProperty('provinsi-isi', 'fill-opacity', [
            'interpolate',
            ['linear'],
            ['get', 'tema'],
            0, 0.04,
            1, 0.16,
            2, 0.30,
            3, 0.48,
            4, 0.65
        ]);
        mapInstance.setPaintProperty('provinsi-garis', 'line-color', '#3b82f6');
        mapInstance.setPaintProperty('provinsi-garis', 'line-opacity', 0.85);
        mapInstance.setPaintProperty('provinsi-garis', 'line-width', 1.0);
    }

    // Keep Detail Informasi open for Seluruh Indonesia
    bukaDetailInformasi('Seluruh Indonesia', 'nasional', null);

    // Hide breadcrumbs and badge
    $('#map-wilayah-indicator').fadeOut(200);
    $('#btn-back-to-province').hide();
    $('#hero-wilayah-badge').fadeOut(200);

    // Reset Dashboard Data to National
    applyDataFilter(null, null);
}

/* ----------------------------------------------------
   4. Apply Filter to All Dashboard Components
---------------------------------------------------- */
function applyDataFilter(namaProvinsi, namaKabupaten) {
    var data = window.MOCKUP_DATA.getDataByWilayah(namaProvinsi, namaKabupaten);
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
        { key: 'direktorat', label: 'Unit / Wilayah' },
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
        { key: 'direktorat', label: 'Unit / Wilayah' },
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
        var isNol = kat.jumlah === 0;
        var bobot = isNol ? 0 : kat.jumlah;
        var kelasNol = isNol ? ' is-nol' : '';
        var inlineStyle = isNol ? 'flex-grow: 0; min-width: 4px; width: 4px;' : 'flex-grow: ' + (bobot || 1);
        progresHtml += '<div class="igt-progres__ruas ' + (kat.kelas || '') + kelasNol + ' igt-progres__ruas--' + (idx + 1) + '" style="' + inlineStyle + '" title="' + kat.label + ': ' + kat.jumlah + ' data"></div>';

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
            + '      <span class="igt-peringkat__label">IGT Pertanahan</span>'
            + '      <div class="igt-peringkat__chips">' + bidangChips + '</div>'
            + '    </div>'
            + '    <div class="igt-peringkat__kelompok">'
            + '      <span class="igt-peringkat__label">IGT Tata Ruang</span>'
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

    // Filter by search
    var filtered = ctrl.data.filter(function(row) {
        if (!ctrl.search) return true;
        var term = ctrl.search.toLowerCase();
        return Object.values(row).some(function(val) {
            return String(val).toLowerCase().indexOf(term) !== -1;
        });
    });

    // Sort
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

    // Paginate
    var totalPages = Math.max(1, Math.ceil(filtered.length / ctrl.perPage));
    if (ctrl.page > totalPages) ctrl.page = totalPages;
    var start = (ctrl.page - 1) * ctrl.perPage;
    var pageItems = filtered.slice(start, start + ctrl.perPage);

    // Render Rows
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

    // Render Pagination
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
