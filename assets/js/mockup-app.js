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
    initUsulanModalEvents();
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
            $('#beranda-detail-jenis').on('change', renderDetailChips);
            $('#beranda-detail-tahun').on('change', function() {
                var thn = $(this).val() || 'all';
                setDashboardYear(thn);
            });

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
    $('#beranda-detail-tahun').val(currentDashboardYear || 'all');

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
function applyDataFilter(namaProvinsi, namaKabupaten, tahun) {
    var thn = (tahun !== undefined) ? (tahun || 'all') : (currentDashboardYear || 'all');
    var data = window.MOCKUP_DATA.getDataByWilayah(namaProvinsi, namaKabupaten, thn);
    if (!data) return;

    // A. Render Ringkasan (Usulan & Kompilasi)
    var usulan = window.MOCKUP_DATA.getUsulanInputData(namaProvinsi, namaKabupaten, thn);
    renderUsulanInputData(usulan);

    var kompilasi = window.MOCKUP_DATA.getKompilasiIntegrasi ? window.MOCKUP_DATA.getKompilasiIntegrasi(namaProvinsi, namaKabupaten, thn) : data.kompilasiIntegrasi;
    renderKompilasiIntegrasi(kompilasi);

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
    var totalLayer = usulan.totalLayer !== undefined ? usulan.totalLayer : 30;
    $('#status-data-total-layer').text(totalLayer);
    $('#status-data .igt-panel__nilai').attr('title', 'Klik untuk melihat seluruh usulan data (' + usulan.total + ' data)');

    var progresHtml = '';
    var rincianHtml = '';

    usulan.kategori.forEach(function(kat, idx) {
        var isNol = kat.jumlah === 0;
        var bobot = isNol ? 0 : kat.jumlah;
        var kelasNol = isNol ? ' is-nol' : '';
        var inlineStyle = isNol ? 'flex-grow: 0; min-width: 4px; width: 4px;' : 'flex-grow: ' + (bobot || 1);
        var layerCount = kat.layer !== undefined ? kat.layer : 0;
        var titleText = kat.label + ': ' + kat.jumlah + ' data / ' + layerCount + ' layer (Klik untuk melihat rincian)';

        progresHtml += '<div class="igt-progres__ruas ' + (kat.kelas || '') + kelasNol + ' igt-progres__ruas--' + (idx + 1) + '" style="' + inlineStyle + '" title="' + titleText + '" data-status="' + kat.kunci + '"></div>';

        rincianHtml += '<div class="igt-rincian__item ' + kat.kelas + '" data-status="' + kat.kunci + '" title="Klik untuk melihat data ' + kat.label + ' (' + kat.jumlah + ' data)">'
            + '<span class="igt-rincian__titik"></span>'
            + '<div class="igt-rincian__isi">'
            + '<div class="igt-rincian__angka"><strong>' + kat.jumlah + '</strong><span>data</span><span class="igt-rincian__pemisah">/</span><strong>' + layerCount + '</strong><span>layer</span></div>'
            + '<div class="igt-panel__meta"><span>' + kat.label + '</span><span>' + kat.diperbarui + '</span></div>'
            + '</div></div>';
    });

    $('#status-data-progres').html(progresHtml);
    $('#status-data-rincian').html(rincianHtml);
}

/* ----------------------------------------------------
   5.1. Global Year Filter & Modal Controller
----------------------------------------------------- */
var currentDashboardYear = 'all';
var currentUsulanYear = 'all';

function setDashboardYear(year) {
    currentDashboardYear = year || 'all';
    currentUsulanYear = currentDashboardYear;

    // 1. Sinkronisasi seluruh dropdown filter tahun pada halaman
    if ($('#beranda-detail-tahun').val() !== currentDashboardYear) {
        $('#beranda-detail-tahun').val(currentDashboardYear);
    }
    if ($('#status-data-tahun').val() !== currentDashboardYear) {
        $('#status-data-tahun').val(currentDashboardYear);
    }
    if ($('#integrasi-kompilasi-tahun').val() !== currentDashboardYear) {
        $('#integrasi-kompilasi-tahun').val(currentDashboardYear);
    }
    if ($('#leader-board-tahun').val() !== currentDashboardYear) {
        $('#leader-board-tahun').val(currentDashboardYear);
    }
    if ($('#modal-usulan-tahun').val() !== currentDashboardYear) {
        $('#modal-usulan-tahun').val(currentDashboardYear);
    }
    if ($('#modal-kompilasi-tahun-select').val() !== currentDashboardYear) {
        $('#modal-kompilasi-tahun-select').val(currentDashboardYear);
    }

    // 2. Filter chips tema pada kartu Detail Informasi di dekat peta
    renderDetailChips();

    // 3. Terapkan filter ke seluruh komponen data di bawah peta
    applyDataFilter(currentProvince, currentKabupaten, currentDashboardYear);

    // 4. Jika modal sedang terbuka, perbarui isinya secara realtime
    if ($('#modal-usulan-data').is(':visible')) {
        usulanModalState.currentPage = 1;
        renderUsulanModalContent();
    }
    if ($('#modal-kompilasi-data').is(':visible')) {
        renderKompilasiModalContent();
    }
}

var usulanModalState = {
    currentStatus: 'all',
    currentPage: 1,
    perPage: 10,
    searchQuery: '',
    sortCol: null,
    sortDir: 'asc'
};

function openUsulanModal(statusFilter) {
    usulanModalState.currentStatus = statusFilter || 'all';
    usulanModalState.currentPage = 1;
    usulanModalState.searchQuery = '';
    $('#modal-usulan-search').val('');
    $('#modal-usulan-perpage').val(usulanModalState.perPage);
    $('#modal-usulan-tahun').val(currentDashboardYear);

    renderUsulanModalContent();
    $('#modal-usulan-data').fadeIn(200);
    $('body').css('overflow', 'hidden');
}

function closeUsulanModal() {
    $('#modal-usulan-data').fadeOut(200);
    $('body').css('overflow', '');
}

function renderUsulanModalContent() {
    var detail = window.MOCKUP_DATA.getUsulanDetailList(null, currentProvince, currentKabupaten, currentDashboardYear);
    if (!detail) return;

    // Set region name and year badge in header
    $('#modal-usulan-wilayah').text(detail.wilayah);
    var labelTahun = currentDashboardYear === 'all' ? 'Semua Tahun' : ('Tahun ' + currentDashboardYear);
    $('#modal-usulan-tahun-badge').text(labelTahun);

    // Update counts on tabs
    $('#modal-count-all').text(detail.counts.all);
    $('#modal-count-terintegrasi').text(detail.counts.terintegrasi);
    $('#modal-count-terkompilasi').text(detail.counts.terkompilasi);
    $('#modal-count-terupload').text(detail.counts.terupload);
    $('#modal-count-perbaikan').text(detail.counts.perbaikan);

    // Update active tab class
    $('#modal-usulan-tabs .igt-modal-tab').removeClass('is-active');
    $('#modal-usulan-tabs .igt-modal-tab[data-status="' + usulanModalState.currentStatus + '"]').addClass('is-active');

    // 1. Filter by status
    var items = detail.items;
    if (usulanModalState.currentStatus !== 'all') {
        items = items.filter(function(item) {
            return item.statusKey === usulanModalState.currentStatus;
        });
    }

    // 2. Filter by search query
    var query = (usulanModalState.searchQuery || '').trim().toLowerCase();
    if (query) {
        items = items.filter(function(item) {
            return (item.direktorat && item.direktorat.toLowerCase().indexOf(query) !== -1)
                || (item.igt && item.igt.toLowerCase().indexOf(query) !== -1)
                || (item.jenisData && item.jenisData.toLowerCase().indexOf(query) !== -1)
                || (item.tglUpload && item.tglUpload.toLowerCase().indexOf(query) !== -1)
                || (item.tglIntegrasi && item.tglIntegrasi.toLowerCase().indexOf(query) !== -1)
                || (item.keterangan && item.keterangan.toLowerCase().indexOf(query) !== -1)
                || (item.status && item.status.toLowerCase().indexOf(query) !== -1);
        });
    }

    // 3. Sort if sortCol is set
    if (usulanModalState.sortCol) {
        var col = usulanModalState.sortCol;
        var dir = usulanModalState.sortDir === 'desc' ? -1 : 1;
        items.sort(function(a, b) {
            var valA = (a[col] || '').toString().toLowerCase();
            var valB = (b[col] || '').toString().toLowerCase();
            if (valA < valB) return -1 * dir;
            if (valA > valB) return 1 * dir;
            return 0;
        });
    }

    // 4. Pagination
    var totalFiltered = items.length;
    var totalPages = Math.ceil(totalFiltered / usulanModalState.perPage) || 1;
    if (usulanModalState.currentPage > totalPages) usulanModalState.currentPage = totalPages;
    if (usulanModalState.currentPage < 1) usulanModalState.currentPage = 1;

    var startIndex = (usulanModalState.currentPage - 1) * usulanModalState.perPage;
    var endIndex = Math.min(startIndex + usulanModalState.perPage, totalFiltered);
    var pagedItems = items.slice(startIndex, endIndex);

    // 5. Render Table Rows
    var rowsHtml = '';
    if (pagedItems.length === 0) {
        rowsHtml = '<tr><td colspan="10" style="text-align: center; padding: 40px 20px; color: #94a3b8; font-size: 14px;">Tidak ada data usulan yang ditemukan.</td></tr>';
    } else {
        pagedItems.forEach(function(item, idx) {
            var downloadHtml = item.hasDownload
                ? '<div class="igt-download-group">'
                    + '<button type="button" class="igt-download-btn" title="Unduh Berkas SHP">&#128196;</button>'
                    + '<button type="button" class="igt-download-btn" title="Buka Geoportal Link">&#128279;</button>'
                    + '</div>'
                : '<span style="color:#94a3b8; padding-left: 8px;">-</span>';

            rowsHtml += '<tr>'
                + '<td class="igt-modal-table__no text-center">' + (startIndex + idx + 1) + '</td>'
                + '<td style="font-weight: 500; min-width: 220px;">' + item.direktorat + '</td>'
                + '<td style="min-width: 140px;">' + item.igt + '</td>'
                + '<td>' + item.jenisData + '</td>'
                + '<td style="white-space: nowrap;">' + item.tglUpload + '</td>'
                + '<td style="white-space: nowrap;">' + item.tglIntegrasi + '</td>'
                + '<td style="color: #64748b; min-width: 160px;">' + item.keterangan + '</td>'
                + '<td><span class="igt-status-badge igt-status-badge--' + item.statusKey + '">' + item.status + '</span></td>'
                + '<td>'
                + '<div class="igt-aksi-group">'
                + '<button type="button" class="igt-aksi-btn igt-aksi-btn--view" title="Detail Usulan">&#128269;</button>'
                + '<button type="button" class="igt-aksi-btn igt-aksi-btn--history" title="Riwayat Versi">&#128338;</button>'
                + '<button type="button" class="igt-aksi-btn igt-aksi-btn--delete" title="Hapus Usulan">&#128465;</button>'
                + '<button type="button" class="igt-aksi-btn igt-aksi-btn--layer" title="Lihat Spasial Peta">&#9729;</button>'
                + '<button type="button" class="igt-aksi-btn igt-aksi-btn--edit" title="Edit Data">&#9998;</button>'
                + '</div>'
                + '</td>'
                + '<td>' + downloadHtml + '</td>'
                + '</tr>';
        });
    }
    $('#modal-usulan-tbody').html(rowsHtml);

    // 6. Render Footer Info
    var infoText = totalFiltered === 0
        ? 'Showing 0 to 0 of 0 entries'
        : 'Showing ' + (startIndex + 1) + ' to ' + endIndex + ' of ' + totalFiltered + ' entries';
    if (usulanModalState.searchQuery || usulanModalState.currentStatus !== 'all') {
        infoText += ' (filtered from ' + detail.totalItems + ' total entries)';
    }
    $('#modal-usulan-info').text(infoText);

    // 7. Render Pagination Buttons
    var paginationHtml = '';
    paginationHtml += '<button type="button" class="igt-modal-page-btn" data-page="' + (usulanModalState.currentPage - 1) + '" ' + (usulanModalState.currentPage <= 1 ? 'disabled' : '') + '>Previous</button>';

    var startPage = Math.max(1, usulanModalState.currentPage - 2);
    var endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    for (var p = startPage; p <= endPage; p++) {
        var activeClass = p === usulanModalState.currentPage ? ' is-active' : '';
        paginationHtml += '<button type="button" class="igt-modal-page-btn' + activeClass + '" data-page="' + p + '">' + p + '</button>';
    }

    paginationHtml += '<button type="button" class="igt-modal-page-btn" data-page="' + (usulanModalState.currentPage + 1) + '" ' + (usulanModalState.currentPage >= totalPages ? 'disabled' : '') + '>Next</button>';
    $('#modal-usulan-pagination').html(paginationHtml);
}

function initUsulanModalEvents() {
    // 0. Filter Tahun Sinkronisasi Terpusat (Usulan Data, Kompilasi Integrasi, Leader Board, Modal)
    $(document).on('change', '#status-data-tahun, #integrasi-kompilasi-tahun, #leader-board-tahun, #modal-usulan-tahun, #modal-kompilasi-tahun-select', function() {
        var thn = $(this).val() || 'all';
        setDashboardYear(thn);
    });

    // 1. Click on header numbers (98 data / 30 layer) -> open all
    $(document).on('click', '#status-data .igt-panel__nilai, #status-data-total, #status-data-total-layer', function(e) {
        e.preventDefault();
        openUsulanModal('all');
    });

    // 2. Click on progress bar ruas
    $(document).on('click', '#status-data-progres .igt-progres__ruas', function(e) {
        e.preventDefault();
        var status = $(this).data('status') || 'all';
        openUsulanModal(status);
    });

    // 3. Click on breakdown items
    $(document).on('click', '#status-data-rincian .igt-rincian__item', function(e) {
        e.preventDefault();
        var status = $(this).data('status') || 'all';
        openUsulanModal(status);
    });

    // 4. Modal tabs
    $(document).on('click', '#modal-usulan-tabs .igt-modal-tab', function() {
        var status = $(this).data('status');
        usulanModalState.currentStatus = status;
        usulanModalState.currentPage = 1;
        renderUsulanModalContent();
    });

    // 5. Modal Search input
    $(document).on('input', '#modal-usulan-search', function() {
        usulanModalState.searchQuery = $(this).val();
        usulanModalState.currentPage = 1;
        renderUsulanModalContent();
    });

    // 6. Modal Perpage select
    $(document).on('change', '#modal-usulan-perpage', function() {
        usulanModalState.perPage = parseInt($(this).val(), 10) || 10;
        usulanModalState.currentPage = 1;
        renderUsulanModalContent();
    });

    // 7. Modal Pagination buttons
    $(document).on('click', '#modal-usulan-pagination .igt-modal-page-btn', function() {
        if ($(this).is(':disabled')) return;
        var page = parseInt($(this).data('page'), 10);
        if (page) {
            usulanModalState.currentPage = page;
            renderUsulanModalContent();
        }
    });

    // 8. Modal Sorting headers
    $(document).on('click', '#modal-usulan-table th.is-sortable', function() {
        var sortCol = $(this).data('sort');
        if (usulanModalState.sortCol === sortCol) {
            usulanModalState.sortDir = usulanModalState.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            usulanModalState.sortCol = sortCol;
            usulanModalState.sortDir = 'asc';
        }
        renderUsulanModalContent();
    });

    // 9. Close Modal
    $(document).on('click', '#modal-usulan-close', function() {
        closeUsulanModal();
    });

    $(document).on('click', '#modal-usulan-data', function(e) {
        if ($(e.target).is('#modal-usulan-data')) {
            closeUsulanModal();
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#modal-usulan-data').is(':visible')) {
            closeUsulanModal();
        }
    });

    // ----------------------------------------------------
    // Event Handlers for Kompilasi Integrasi Clickable Elements
    // ----------------------------------------------------
    // A. Click on metric number (e.g. 14 / Layer IGT)
    $(document).on('click', '#integrasi-kompilasi-klik-angka, #integrasi-kompilasi-terkompilasi', function(e) {
        e.preventDefault();
        openKompilasiModal('all', 'all');
    });

    // B. Click on bar segments (Terkompilasi / Terintegrasi)
    $(document).on('click', '#integrasi-kompilasi-grafik .igt-tumpuk__ruas.is-clickable', function(e) {
        e.stopPropagation();
        var status = $(this).data('status');
        var bulanIdx = $(this).data('bulan-idx');
        openKompilasiModal(status, bulanIdx);
    });

    // C. Click on monthly bar columns (outside specific bar ruas)
    $(document).on('click', '#integrasi-kompilasi-grafik .igt-tumpuk__kolom', function() {
        var bulanIdx = $(this).data('bulan-idx');
        openKompilasiModal('all', bulanIdx);
    });

    // D. Click on month labels (JAN..DES)
    $(document).on('click', '#integrasi-kompilasi-bulan .igt-bulan-btn', function() {
        var bulanIdx = $(this).data('bulan-idx');
        openKompilasiModal('all', bulanIdx);
    });

    // E. Click on legend items
    $(document).on('click', '#integrasi-kompilasi .igt-batang__legenda span', function() {
        var text = $(this).text().toLowerCase();
        if (text.indexOf('terintegrasi') !== -1) {
            openKompilasiModal('terintegrasi', 'all');
        } else if (text.indexOf('terkompilasi') !== -1) {
            openKompilasiModal('terkompilasi', 'all');
        }
    });

    // F. Modal Kompilasi Internal Events
    $(document).on('click', '#modal-kompilasi-tabs .igt-modal-tab', function() {
        var status = $(this).data('status');
        kompilasiModalState.currentStatus = status;
        renderKompilasiModalContent();
    });

    $(document).on('change', '#modal-kompilasi-bulan-select', function() {
        kompilasiModalState.currentBulan = $(this).val();
        renderKompilasiModalContent();
    });

    $(document).on('change', '#modal-kompilasi-tahun-select', function() {
        var thn = $(this).val() || 'all';
        setDashboardYear(thn);
    });

    $(document).on('input', '#modal-kompilasi-search', function() {
        kompilasiModalState.searchQuery = $(this).val();
        renderKompilasiModalContent();
    });

    $(document).on('click', '#modal-kompilasi-accordion .igt-acc-header', function() {
        var item = $(this).closest('.igt-acc-item');
        var id = item.data('id');
        if (kompilasiModalState.expandedId === id) {
            kompilasiModalState.expandedId = null;
            item.removeClass('is-expanded');
        } else {
            kompilasiModalState.expandedId = id;
            $('#modal-kompilasi-accordion .igt-acc-item').removeClass('is-expanded');
            item.addClass('is-expanded');
        }
    });

    $(document).on('click', '#modal-kompilasi-close', function() {
        closeKompilasiModal();
    });

    $(document).on('click', '#modal-kompilasi-data', function(e) {
        if ($(e.target).is('#modal-kompilasi-data')) {
            closeKompilasiModal();
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#modal-kompilasi-data').is(':visible')) {
            closeKompilasiModal();
        }
    });
}

/* ----------------------------------------------------
   Modal Kompilasi & Integrasi State & Functions
---------------------------------------------------- */
var kompilasiModalState = {
    currentStatus: 'all',
    currentBulan: 'all',
    searchQuery: '',
    expandedId: null
};

function openKompilasiModal(statusFilter, bulanFilter) {
    kompilasiModalState.currentStatus = statusFilter || 'all';
    kompilasiModalState.currentBulan = (bulanFilter !== undefined && bulanFilter !== null) ? bulanFilter : 'all';
    kompilasiModalState.searchQuery = '';
    kompilasiModalState.expandedId = null;

    $('#modal-kompilasi-search').val('');
    $('#modal-kompilasi-bulan-select').val(kompilasiModalState.currentBulan);
    $('#modal-kompilasi-tahun-select').val(currentDashboardYear);

    renderKompilasiModalContent();
    $('#modal-kompilasi-data').fadeIn(200);
    $('body').css('overflow', 'hidden');
}

function closeKompilasiModal() {
    $('#modal-kompilasi-data').fadeOut(200);
    if (!$('#modal-usulan-data').is(':visible')) {
        $('body').css('overflow', '');
    }
}

function renderKompilasiModalContent() {
    var status = kompilasiModalState.currentStatus;
    var bulan = kompilasiModalState.currentBulan;
    var query = (kompilasiModalState.searchQuery || '').toLowerCase().trim();

    var detail = window.MOCKUP_DATA.getKompilasiDetailList
        ? window.MOCKUP_DATA.getKompilasiDetailList(status, bulan, currentProvince, currentKabupaten, currentDashboardYear)
        : { items: [], counts: { all: 0, terintegrasi: 0, terkompilasi: 0 }, labelPeriode: 'Semua Bulan', wilayah: 'Seluruh Indonesia' };

    // Update Header Badges
    $('#modal-kompilasi-wilayah').text(detail.wilayah);
    var labelTahun = currentDashboardYear === 'all' ? 'Semua Tahun' : ('Tahun ' + currentDashboardYear);
    $('#modal-kompilasi-tahun-badge').text(labelTahun);
    $('#modal-kompilasi-periode-badge').text(detail.labelPeriode);

    // Update Tabs
    $('#modal-kompilasi-count-all').text(detail.counts.all);
    $('#modal-kompilasi-count-terintegrasi').text(detail.counts.terintegrasi);
    $('#modal-kompilasi-count-terkompilasi').text(detail.counts.terkompilasi);

    $('#modal-kompilasi-tabs .igt-modal-tab').removeClass('is-active');
    $('#modal-kompilasi-tabs .igt-modal-tab[data-status="' + status + '"]').addClass('is-active');

    // Update Selects in Toolbar
    $('#modal-kompilasi-bulan-select').val(bulan);
    $('#modal-kompilasi-tahun-select').val(currentDashboardYear);

    // Filter by search query
    var items = detail.items;
    if (query) {
        items = items.filter(function(item) {
            return (item.nama_igt && item.nama_igt.toLowerCase().indexOf(query) !== -1) ||
                   (item.satuan && item.satuan.toLowerCase().indexOf(query) !== -1);
        });
    }

    // Render Accordion Items
    if (!items || items.length === 0) {
        $('#modal-kompilasi-accordion').html('<div class="igt-acc-empty">Tidak ada data IGT yang sesuai dengan kriteria filter.</div>');
        $('#modal-kompilasi-info').text('Menampilkan 0 Layer IGT');
        return;
    }

    var html = '';
    items.forEach(function(item, idx) {
        // Auto expand first item if none expanded
        if (kompilasiModalState.expandedId === null && idx === 0) {
            kompilasiModalState.expandedId = item.id;
        }
        var isExpanded = kompilasiModalState.expandedId === item.id;
        var expandedClass = isExpanded ? ' is-expanded' : '';

        // Table Rows
        var rowsHtml = '';
        if (item.datasets && item.datasets.length > 0) {
            item.datasets.forEach(function(ds, dsIdx) {
                var badgeClass = ds.statusKey === 'terintegrasi' ? 'igt-status-badge--terintegrasi' : 'igt-status-badge--terkompilasi';
                var downloadBtn = ds.hasDownload
                    ? '<a href="#" class="igt-download-btn igt-download-btn--shp" title="Download SHP"><img src="assets/img/icons/download-simple.svg" width="12" height="12"> SHP</a>'
                    : '<span class="text-muted" style="font-size: 11px;">-</span>';

                rowsHtml += '<tr>'
                    + '<td class="igt-modal-table__no text-center" style="width: 45px;">' + (dsIdx + 1) + '</td>'
                    + '<td>' + ds.direktorat + '</td>'
                    + '<td><span class="badge bg-light text-dark" style="font-size: 11px;">' + ds.jenisData + '</span></td>'
                    + '<td>' + ds.tglUpload + '</td>'
                    + '<td>' + (ds.tglIntegrasi || '-') + '</td>'
                    + '<td>' + (ds.keterangan || '-') + '</td>'
                    + '<td><span class="igt-status-badge ' + badgeClass + '">' + ds.status + '</span></td>'
                    + '<td>'
                        + '<div class="igt-aksi-group">'
                            + '<button type="button" class="igt-aksi-btn igt-aksi-btn--view" title="Lihat"><img src="assets/img/icons/magnifying-glass.svg" width="12" height="12"></button>'
                            + '<button type="button" class="igt-aksi-btn igt-aksi-btn--history" title="Riwayat"><img src="assets/img/icons/clock-counter-clockwise.svg" width="12" height="12"></button>'
                            + '<button type="button" class="igt-aksi-btn igt-aksi-btn--cloud" title="Metadata Cloud"><img src="assets/img/icons/cloud-arrow-up.svg" width="12" height="12"></button>'
                        + '</div>'
                    + '</td>'
                    + '<td>' + downloadBtn + '</td>'
                    + '</tr>';
            });
        } else {
            rowsHtml = '<tr><td colspan="9" class="text-center text-muted" style="padding: 18px;">Belum ada berkas data yang terunggah untuk tema ini.</td></tr>';
        }

        html += '<div class="igt-acc-item' + expandedClass + '" data-id="' + item.id + '">'
            + '<div class="igt-acc-header">'
                + '<div class="igt-acc-left">'
                    + '<div class="igt-acc-name">' + item.nama_igt + '</div>'
                    + '<div class="igt-acc-meta">'
                        + '<span class="text-danger">Data Belum Diproses: <b>' + item.total_upload + '</b></span> | '
                        + '<span class="text-primary">Target: <b>' + item.total_target + '</b></span> | '
                        + '<span class="text-success">Realisasi: <b>' + item.jumlah_realisasi + '</b></span> | '
                        + '<span class="text-dark">Satuan: <b>' + (item.satuan || '-') + '</b></span>'
                    + '</div>'
                + '</div>'
                + '<div class="igt-acc-right">'
                    + '<div class="igt-acc-progress-wrap">'
                        + '<div class="igt-acc-pct">Persentase: ' + item.persen.toFixed(2) + '%</div>'
                        + '<div class="igt-acc-bar-track">'
                            + '<div class="igt-acc-bar-fill bg-' + item.color + '" style="width: ' + Math.min(100, item.persen) + '%;"></div>'
                        + '</div>'
                    + '</div>'
                    + '<div class="igt-acc-chevron">'
                        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
                    + '</div>'
                + '</div>'
            + '</div>'
            + '<div class="igt-acc-body">'
                + '<table class="igt-modal-table">'
                    + '<thead>'
                        + '<tr>'
                            + '<th class="igt-modal-table__no" style="width: 45px; text-align: center;">No</th>'
                            + '<th>Nama Direktorat</th>'
                            + '<th>Jenis Data</th>'
                            + '<th>Tanggal Upload</th>'
                            + '<th>Tanggal ' + (item.statusKey === 'terintegrasi' ? 'Terintegrasi' : 'Kompilasi') + '</th>'
                            + '<th>Keterangan</th>'
                            + '<th>Status</th>'
                            + '<th>Aksi</th>'
                            + '<th>Download</th>'
                        + '</tr>'
                    + '</thead>'
                    + '<tbody>' + rowsHtml + '</tbody>'
                + '</table>'
            + '</div>'
            + '</div>';
    });

    $('#modal-kompilasi-accordion').html(html);

    var infoText = 'Menampilkan ' + items.length + ' dari ' + detail.items.length + ' Layer IGT (' + detail.labelPeriode + ')';
    $('#modal-kompilasi-info').text(infoText);
}

function renderKompilasiIntegrasi(kompilasi) {
    $('#integrasi-kompilasi-terkompilasi').text(kompilasi.totalLayer);

    var bulanLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGT', 'SEP', 'OKT', 'NOV', 'DES'];
    $('#integrasi-kompilasi-bulan').html(bulanLabels.map(function(m, idx) {
        return '<span class="igt-bulan-btn" data-bulan="' + m + '" data-bulan-idx="' + (idx + 1) + '" title="Klik untuk filter kumulatif s.d. ' + m + '">' + m + '</span>';
    }).join(''));

    var maks = 0;
    kompilasi.bulanan.forEach(function(b) {
        var totalBulan = (b.terkompilasi || 0) + (b.terintegrasi || 0);
        if (totalBulan > maks) maks = totalBulan;
    });
    if (maks === 0) maks = 1;

    var TINGGI_GRAFIK = 95;
    var chartHtml = '';
    kompilasi.bulanan.forEach(function(b, idx) {
        var total = (b.terkompilasi || 0) + (b.terintegrasi || 0);
        var bIdx = idx + 1;
        chartHtml += '<div class="igt-tumpuk__kolom" data-bulan="' + b.bulan + '" data-bulan-idx="' + bIdx + '" title="' + b.bulan + ': ' + (b.terkompilasi || 0) + ' Terkompilasi, ' + (b.terintegrasi || 0) + ' Terintegrasi">';
        
        if (total > 0) {
            var hKomp = Math.round(((b.terkompilasi || 0) / maks) * TINGGI_GRAFIK);
            var hInteg = Math.round(((b.terintegrasi || 0) / maks) * TINGGI_GRAFIK);

            if (hKomp > 0) {
                chartHtml += '<div class="igt-tumpuk__ruas is-clickable" data-status="terkompilasi" data-bulan="' + b.bulan + '" data-bulan-idx="' + bIdx + '" style="height: ' + hKomp + 'px" title="' + b.bulan + ': ' + (b.terkompilasi || 0) + ' Layer Terkompilasi (Klik untuk filter kumulatif Jan - ' + b.bulan + ')"></div>';
            }
            if (hInteg > 0) {
                chartHtml += '<div class="igt-tumpuk__ruas igt-tumpuk__ruas--integrasi is-clickable" data-status="terintegrasi" data-bulan="' + b.bulan + '" data-bulan-idx="' + bIdx + '" style="height: ' + hInteg + 'px" title="' + b.bulan + ': ' + (b.terintegrasi || 0) + ' Layer Terintegrasi (Klik untuk filter kumulatif Jan - ' + b.bulan + ')"></div>';
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
    var hasCheck = $container.find('thead th.igt-table__check').length > 0;
    var totalColspan = ctrl.columns.length + 1 + (hasCheck ? 1 : 0);
    var bodyHtml = '';
    if (pageItems.length === 0) {
        bodyHtml = '<tr><td colspan="' + totalColspan + '" class="igt-table__empty">Data Tidak Ditemukan!</td></tr>';
    } else {
        pageItems.forEach(function(row, idx) {
            bodyHtml += '<tr>'
                + '<td class="igt-table__no text-center">' + (start + idx + 1) + '</td>';
            if (hasCheck) {
                bodyHtml += '<td class="igt-table__check"><img src="assets/img/icons/check-square.svg" alt=""></td>';
            }
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
