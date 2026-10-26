/**
 * IGTPR Mockup UI - Beranda: Peta multi-level & Detail Informasi
 */

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
// Gradasi choropleth kabupaten berdasarkan jumlah data IGT yang terunggah (statistikIGTKabupaten)
var KAB_GRADASI_OPACITY = ['interpolate', ['linear'], ['get', 'jumlahData'], 0, 0.04, 1, 0.16, 3, 0.32, 5, 0.5, 7, 0.68];
function siapkanJumlahDataKabupaten() {
    var gj = window.INDONESIA_KABUPATEN_GEOJSON;
    if (!gj || !gj.features) return;
    var exact = {}, norm = {};
    (function kumpulkan(obj) {
        if (!obj || typeof obj !== 'object') return;
        Object.keys(obj).forEach(function (k) {
            if (k === 'statistikIGTKabupaten' && Array.isArray(obj[k])) {
                obj[k].forEach(function (r) {
                    var n = String(r.kabupaten || '').trim().toLowerCase(), j = r.jumlahIgt || 0;
                    exact[n] = Math.max(exact[n] || 0, j);
                    norm[normKabupaten(n)] = Math.max(norm[normKabupaten(n)] || 0, j);
                });
            } else kumpulkan(obj[k]);
        });
    })(window.MOCKUP_DATA);
    gj.features.forEach(function (f) {
        var n = String(f.properties.kabupaten || '').trim().toLowerCase();
        f.properties.jumlahData = exact[n] != null ? exact[n] : (norm[normKabupaten(n)] || 0);
    });
}

function initHeroMap() {
    siapkanJumlahDataKabupaten();
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
                                'fill-color': '#1d4ed8',
                                'fill-opacity': KAB_GRADASI_OPACITY
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
                var targetProv = f.properties && f.properties.nama;

                // Restrict access if role has province lock
                if (window.ROLE_LOCK_PROVINCE) {
                    if (normProvinsi(targetProv) !== normProvinsi(window.ROLE_LOCK_PROVINCE)) {
                        showRoleAccessToast('Akses dibatasi hanya untuk ' + window.ROLE_LOCK_PROVINCE);
                        return;
                    }
                }

                if (currentProvince && currentProvince.toLowerCase() === targetProv.toLowerCase()) {
                    return;
                }
                popup.remove();
                zoomKeProvinsi(f, targetProv);
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
                var targetKab = f.properties && f.properties.kabupaten;

                // Restrict access if role has kabupaten lock
                if (window.ROLE_LOCK_KABUPATEN) {
                    if (normKabupaten(targetKab) !== normKabupaten(window.ROLE_LOCK_KABUPATEN)) {
                        showRoleAccessToast('Akses dibatasi hanya untuk Kabupaten ' + window.ROLE_LOCK_KABUPATEN);
                        return;
                    }
                }

                popup.remove();
                zoomKeKabupaten(f, targetKab);
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

                if (currentActiveRole === 'kantah-gunungkidul') {
                    return; // Locked
                }

                if (currentActiveRole === 'kanwil-diy') {
                    if (!val) {
                        kembaliKeProvinsi();
                    } else {
                        var feat = findKabupatenFeature(val, 'Daerah Istimewa Yogyakarta');
                        if (feat) {
                            zoomKeKabupaten(feat, feat.properties.kabupaten);
                        }
                    }
                    return;
                }

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

    if (currentActiveRole === 'kantah-gunungkidul') {
        var html = '<option value="Gunungkidul" selected>Kabupaten Gunungkidul</option>';
        select.html(html);
        select.val('Gunungkidul');
        select.prop('disabled', true);
        return;
    }

    if (currentActiveRole === 'kanwil-diy') {
        var html = '<option value="">' + (terpilihKabupaten ? 'Semua Kabupaten di DIY' : 'Pilih Kabupaten (DIY)') + '</option>';
        var kabs = ['Bantul', 'Gunungkidul', 'Kulon Progo', 'Sleman', 'Kota Yogyakarta'];
        kabs.forEach(function(kab) {
            var label = formatNamaKabupaten(kab);
            var selected = (terpilihKabupaten && (terpilihKabupaten.toLowerCase() === kab.toLowerCase() || (kab === 'Gunungkidul' && terpilihKabupaten.toLowerCase() === 'gunung kidul'))) ? ' selected' : '';
            html += '<option value="' + kab + '"' + selected + '>' + label + '</option>';
        });
        select.html(html);
        select.prop('disabled', false);
        if (terpilihKabupaten) select.val(terpilihKabupaten);
        else select.val('');
        select.attr('aria-label', 'Pilih Kabupaten (D.I. Yogyakarta)');
        return;
    }

    select.prop('disabled', false);

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

    if (currentActiveRole === 'sppr') {
        var spprThemes = ['Bidang Tanah', 'Penguasaan Tanah', 'Pemilikan Tanah', 'Penggunaan Tanah', 'Pemanfaatan Tanah', 'Unsur Dasar Pertanahan'];
        filtered = filtered.filter(function(item) {
            return spprThemes.indexOf(item.nama) !== -1;
        });
    }

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
        mapInstance.setPaintProperty('kabupaten-isi', 'fill-color', '#1d4ed8');
        mapInstance.setPaintProperty('kabupaten-isi', 'fill-opacity', KAB_GRADASI_OPACITY);
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
    if (window.ROLE_LOCK_KABUPATEN) {
        showRoleAccessToast('Akses dibatasi hanya untuk Kabupaten ' + window.ROLE_LOCK_KABUPATEN);
        return;
    }

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
            mapInstance.setPaintProperty('kabupaten-isi', 'fill-color', '#1d4ed8');
            mapInstance.setPaintProperty('kabupaten-isi', 'fill-opacity', KAB_GRADASI_OPACITY);
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
    if (window.ROLE_LOCK_PROVINCE) {
        showRoleAccessToast('Tidak dapat kembali ke nasional. Akses terkunci pada wilayah ' + window.ROLE_LOCK_PROVINCE);
        var featDIY = findProvinceFeature('Daerah Istimewa Yogyakarta');
        if (featDIY) zoomKeProvinsi(featDIY, 'Daerah Istimewa Yogyakarta');
        return;
    }

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
