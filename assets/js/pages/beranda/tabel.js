/**
 * IGTPR Mockup UI - Beranda: Controller tabel (Statistik IGT, Derivatif, Aktivitas Log)
 */

/* ----------------------------------------------------
   7. Table Section Controller & Renderer
---------------------------------------------------- */
function renderTableSection(id, rawData, columns, defaultSortCol, mode) {
    if (!tableControllers[id]) {
        tableControllers[id] = {
            id: id,
            mode: mode || 'default',
            columns: columns,
            data: rawData,
            search: '',
            perPage: 10,
            page: 1,
            sortCol: defaultSortCol,
            sortAsc: id === 'aktivitas-log' ? false : true
        };
        renderTableHeader(tableControllers[id]);
        bindTableEvents(tableControllers[id]);
    } else {
        tableControllers[id].columns = columns;
        tableControllers[id].data = rawData;
        tableControllers[id].page = 1;
        if (mode) tableControllers[id].mode = mode;
        if (defaultSortCol && (!tableControllers[id].sortCol || !columns.some(function(c) { return c.key === tableControllers[id].sortCol; }))) {
            tableControllers[id].sortCol = defaultSortCol;
        }
        renderTableHeader(tableControllers[id]);
    }

    renderTable(tableControllers[id]);
}

function renderTableHeader(ctrl) {
    var $container = $('#' + ctrl.id);
    var $thead = $container.find('thead tr');
    if (!$thead.length) return;

    var thHtml = '<th class="igt-table__no is-plain">No</th>';
    ctrl.columns.forEach(function(col) {
        thHtml += '<th data-kolom="' + col.key + '"><span class="igt-table__sort">' + col.label + ' <img src="assets/img/icons/caret-up-down.svg" alt=""></span></th>';
    });
    $thead.html(thHtml);
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

    // Helper for natural numeric, timestamp & string sorting
    function parseSortValue(val) {
        if (val === null || val === undefined) return -Infinity;
        if (typeof val === 'number') return val;
        var str = String(val).trim();
        // Support Date / Timestamp sorting (e.g. 2026-10-18 14:32:10)
        if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
            var parsedTime = Date.parse(str.replace(' ', 'T'));
            if (!isNaN(parsedTime)) return parsedTime;
        }
        if (/^[\d\.,]+$/.test(str)) {
            var clean = str.replace(/\./g, '').replace(',', '.');
            var num = parseFloat(clean);
            if (!isNaN(num)) return num;
        }
        return str.toLowerCase();
    }

    // Sort
    filtered.sort(function(a, b) {
        var valA = parseSortValue(a[ctrl.sortCol]);
        var valB = parseSortValue(b[ctrl.sortCol]);
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
    var totalColspan = ctrl.columns.length + 1;
    var bodyHtml = '';
    if (pageItems.length === 0) {
        bodyHtml = '<tr><td colspan="' + totalColspan + '" class="igt-table__empty">Data Tidak Ditemukan!</td></tr>';
    } else {
        pageItems.forEach(function(row, idx) {
            bodyHtml += '<tr>'
                + '<td class="igt-table__no text-center">' + (start + idx + 1) + '</td>';
            ctrl.columns.forEach(function(col) {
                var val = row[col.key];
                if (col.key === 'waktu' && (val === null || val === undefined)) val = row.tanggal;
                if (val === null || val === undefined) val = '-';
                var cellContent = val;
                if (col.key === 'jenisIgt') {
                    if (val === 'Tata Ruang') {
                        cellContent = '<span class="igt-badge-jenis igt-badge-jenis--tataruang">Tata Ruang</span>';
                    } else {
                        cellContent = '<span class="igt-badge-jenis igt-badge-jenis--pertanahan">Pertanahan</span>';
                    }
                } else if (col.key === 'waktu') {
                    cellContent = '<span style="font-variant-numeric: tabular-nums; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12.5px; color: #334155; font-weight: 500;">' + val + '</span>';
                }
                bodyHtml += '<td>' + cellContent + '</td>';
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

    if (ctrl.id === 'statistik-igt') {
        renderStatistikIGTGrafik(ctrl);
    } else if (ctrl.id === 'statistik-akses') {
        renderStatistikAksesGrafik(ctrl);
    } else if (ctrl.id === 'aktivitas-log') {
        renderAktivitasLogGrafik(ctrl);
    }
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

    // Delegated sort event on column header click
    $container.off('click', 'thead th[data-kolom]').on('click', 'thead th[data-kolom]', function() {
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
            if (ctrl.id === 'statistik-igt') {
                renderStatistikIGTGrafik(ctrl);
            } else if (ctrl.id === 'statistik-akses') {
                renderStatistikAksesGrafik(ctrl);
            } else if (ctrl.id === 'aktivitas-log') {
                renderAktivitasLogGrafik(ctrl);
            }
        } else {
            $container.find('[id$="-grafik"]').hide();
            $container.find('[id$="-tabel"]').show();
        }
    });

    if (ctrl.id === 'statistik-igt') {
        setupDropdown('statistik-igt-kelompok', function($item) {
            var mode = $item.data('mode');
            if (!mode) {
                var text = $item.text().trim().toLowerCase();
                if (text.indexOf('provinsi') !== -1) mode = 'provinsi';
                else if (text.indexOf('kabupaten') !== -1) mode = 'kabupaten';
                else mode = 'igt';
            }
            currentStatistikIgtMode = mode;
            updateStatistikIgtView();
        });
        setupDropdown('statistik-igt-grafik-dropdown');
    } else {
        setupDropdown(ctrl.id + '-kelompok');
        if (ctrl.id === 'statistik-akses') {
            setupDropdown('statistik-akses-grafik-dropdown');
        }
    }
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

function setupDropdown(id, onSelect) {
    var $drop = $('#' + id);
    if (!$drop.length) return;

    $drop.find('.igt-dropdown__trigger, .igt-chart-pill-btn').off('click').on('click', function(e) {
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
        if (typeof onSelect === 'function') {
            onSelect($(this));
        }
    });

    $(document).on('click', function() {
        $drop.find('.igt-dropdown__panel').removeClass('is-open');
    });
}

var statistikIGTGrafikMetric = 'administrasi';

function getShortIgtLabel(name) {
    if (name === 'Inventarisasi Tanah Kritis') return 'Inventarisasi Ta...';
    if (name === 'Kemampuan Tanah') return 'Kemampuan Ta...';
    if (name === 'Lahan Baku Sawah Nasional') return 'Lahan Baku Sa...';
    if (name === 'Lahan Sawah Dilindungi') return 'Lahan Sawah D...';
    if (name === 'RDTR Kabupaten/ Kota') return 'RDTR Kabupat...';
    if (name === 'RDTR Kawasan Perbatasan Negara') return 'RDTR Kawasan...';
    if (name === 'Sebaran Lokasi Pemberdayaan Tanah Masyarakat') return 'Sebaran Lokasi ...';
    if (name === 'Bidang Tanah') return 'Bidang Tanah';
    if (name === 'Hak Atas Tanah') return 'Hak Atas Tanah';
    if (name === 'RTRW Kabupaten') return 'RTRW Kabupaten';
    if (name === 'Zona Nilai Tanah') return 'Zona Nilai Tanah';
    if (name.length > 15) return name.substring(0, 13) + '...';
    return name;
}

function getShortProvinsiLabel(name) {
    if (!name) return '';
    if (name === 'Daerah Istimewa Yogyakarta') return 'DI Yogyakarta';
    if (name === 'Nusa Tenggara Timur') return 'Nusa Tenggara T...';
    if (name.length > 16) return name.substring(0, 14) + '...';
    return name;
}

function getShortKabupatenLabel(name, item) {
    if (!name) return '';
    if (name === 'Gunung Kidul') {
        if (item && item.provinsi === 'Tidak Tercatat') return 'Gunung Kidul (TT)';
        return 'Gunung Kidul';
    }
    if (name === 'Kota Jakarta Barat') return 'Kota Jakarta B...';
    if (name.length > 15) return name.substring(0, 13) + '...';
    return name;
}

function renderStatistikIGTGrafik(ctrl) {
    var $canvas = $('#statistik-igt-chart-canvas');
    if (!$canvas.length) return;

    var mode = (ctrl && ctrl.mode) ? ctrl.mode : (currentStatistikIgtMode || 'igt');
    var items = ctrl ? ctrl.data : (window.MOCKUP_DATA ? window.MOCKUP_DATA.statistikIGT : []);
    if (!items || items.length === 0) {
        $canvas.html('<div style="text-align: center; padding: 60px 20px; color: #94a3b8;">Tidak ada data grafik statistik.</div>');
        return;
    }

    var metric = statistikIGTGrafikMetric || 'administrasi';

    // Update legend based on metric and mode
    var $legend = $('#statistik-igt-grafik .igt-chart-legend');
    if (metric === 'administrasi') {
        if (mode === 'provinsi') {
            $legend.html(
                '<span class="igt-chart-legend__item">'
                    + '<span class="igt-chart-legend__dot" style="background-color: #68b6db;"></span>'
                    + '<span class="igt-chart-legend__label">Jumlah IGT</span>'
                + '</span>'
                + '<span class="igt-chart-legend__item">'
                    + '<span class="igt-chart-legend__dot" style="background-color: #6793db;"></span>'
                    + '<span class="igt-chart-legend__label">Jumlah Data Kabupaten</span>'
                + '</span>'
            );
        } else if (mode === 'kabupaten') {
            $legend.html(
                '<span class="igt-chart-legend__item">'
                    + '<span class="igt-chart-legend__dot" style="background-color: #68b6db;"></span>'
                    + '<span class="igt-chart-legend__label">Jumlah IGT</span>'
                + '</span>'
            );
        } else {
            $legend.html(
                '<span class="igt-chart-legend__item">'
                    + '<span class="igt-chart-legend__dot" style="background-color: #68b6db;"></span>'
                    + '<span class="igt-chart-legend__label">Jumlah Data Provinsi</span>'
                + '</span>'
                + '<span class="igt-chart-legend__item">'
                    + '<span class="igt-chart-legend__dot" style="background-color: #6793db;"></span>'
                    + '<span class="igt-chart-legend__label">Jumlah Data Kabupaten</span>'
                + '</span>'
            );
        }
    } else if (metric === 'bidang') {
        $legend.html(
            '<span class="igt-chart-legend__item">'
                + '<span class="igt-chart-legend__dot" style="background-color: #6793db;"></span>'
                + '<span class="igt-chart-legend__label">Jumlah Bidang</span>'
            + '</span>'
        );
    } else if (metric === 'luas') {
        $legend.html(
            '<span class="igt-chart-legend__item">'
                + '<span class="igt-chart-legend__dot" style="background-color: #68b6db;"></span>'
                + '<span class="igt-chart-legend__label">Luas (Ha)</span>'
            + '</span>'
        );
    }

    // Determine max value
    var maxVal = 8;
    items.forEach(function(item) {
        if (metric === 'administrasi') {
            if (mode === 'provinsi') {
                var igtVal = typeof item.jumlahIgt === 'number' ? item.jumlahIgt : parseInt(item.jumlahIgt, 10) || 0;
                var kabVal = typeof item.kabupaten === 'number' ? item.kabupaten : parseInt(item.kabupaten, 10) || 0;
                if (igtVal > maxVal) maxVal = igtVal;
                if (kabVal > maxVal) maxVal = kabVal;
            } else if (mode === 'kabupaten') {
                var igtVal = typeof item.jumlahIgt === 'number' ? item.jumlahIgt : parseInt(item.jumlahIgt, 10) || 0;
                if (igtVal > maxVal) maxVal = igtVal;
            } else {
                var p = typeof item.provinsi === 'number' ? item.provinsi : parseInt(item.provinsi, 10) || 0;
                var k = typeof item.kabupaten === 'number' ? item.kabupaten : parseInt(item.kabupaten, 10) || 0;
                if (p > maxVal) maxVal = p;
                if (k > maxVal) maxVal = k;
            }
        } else if (metric === 'bidang') {
            var b = parseInt(String(item.bidang || '0').replace(/\./g, ''), 10) || 0;
            if (b > maxVal) maxVal = b;
        } else if (metric === 'luas') {
            var l = parseFloat(String(item.luas || '0').replace(/\./g, '').replace(',', '.')) || 0;
            if (l > maxVal) maxVal = l;
        }
    });

    var ticks = [8, 6, 4, 2, 0];
    if (metric === 'administrasi') {
        if (maxVal <= 8) {
            maxVal = 8;
            ticks = [8, 6, 4, 2, 0];
        } else {
            if (maxVal % 2 !== 0) maxVal += 1;
            ticks = [maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0];
        }
    } else {
        ticks = [maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0];
    }

    var numClusters = items.length;
    var svgWidth = Math.max(1060, numClusters * 96);
    var svgHeight = 315;
    var plotTop = 20;
    var plotBottom = 250;
    var plotHeight = plotBottom - plotTop;
    var plotLeft = 45;
    var plotRight = svgWidth - 25;
    var plotWidth = plotRight - plotLeft;
    var clusterStep = plotWidth / numClusters;
    var barWidth = (metric === 'administrasi' && mode !== 'kabupaten') ? (numClusters <= 6 ? 32 : 26) : (numClusters <= 6 ? 44 : 38);

    var svg = '<svg class="igt-chart-svg" viewBox="0 0 ' + svgWidth + ' ' + svgHeight + '" preserveAspectRatio="none">';

    // 1. Vertical Grid Lines (matching reference screenshot)
    for (var vi = 0; vi <= numClusters; vi++) {
        var vx = plotLeft + vi * clusterStep;
        svg += '<line x1="' + vx + '" y1="' + plotTop + '" x2="' + vx + '" y2="' + plotBottom + '" class="igt-chart-grid-line" stroke="#f1f5f9" stroke-width="1"></line>';
    }

    // 2. Horizontal Grid Lines & Y Ticks
    ticks.forEach(function(val) {
        var y = plotBottom - ((val / maxVal) * plotHeight);
        var displayVal = val >= 1000 ? (val / 1000).toLocaleString('id') + 'k' : val;
        svg += '<line x1="' + plotLeft + '" y1="' + y + '" x2="' + plotRight + '" y2="' + y + '" class="' + (val === 0 ? 'igt-chart-axis-line' : 'igt-chart-grid-line') + '"></line>';
        svg += '<text x="' + (plotLeft - 12) + '" y="' + (y + 4) + '" text-anchor="end" class="igt-chart-axis-text">' + displayVal + '</text>';
    });

    // 3. Mini chart icon near bottom left (below 0)
    svg += '<g class="igt-chart-mini-icon" opacity="0.65">'
        + '<path d="M ' + (plotLeft - 22) + ' ' + (plotBottom + 12) + ' C ' + (plotLeft - 18) + ' ' + (plotBottom + 12) + ', ' + (plotLeft - 16) + ' ' + (plotBottom + 4) + ', ' + (plotLeft - 12) + ' ' + (plotBottom + 4) + ' C ' + (plotLeft - 8) + ' ' + (plotBottom + 4) + ', ' + (plotLeft - 6) + ' ' + (plotBottom + 12) + ', ' + (plotLeft - 2) + ' ' + (plotBottom + 12) + ' C ' + (plotLeft + 2) + ' ' + (plotBottom + 12) + ', ' + (plotLeft + 4) + ' ' + (plotBottom + 6) + ', ' + (plotLeft + 8) + ' ' + (plotBottom + 6) + '" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"></path>'
        + '<line x1="' + (plotLeft - 24) + '" y1="' + (plotBottom + 15) + '" x2="' + (plotLeft + 10) + '" y2="' + (plotBottom + 15) + '" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"></line>'
        + '</g>';

    // 4. Clustered Columns (Bars)
    items.forEach(function(item, idx) {
        var clusterCenter = plotLeft + (idx + 0.5) * clusterStep;
        var rawLabel = mode === 'provinsi' ? (item.provinsi || '-') : (mode === 'kabupaten' ? (item.kabupaten || '-') : (item.igt || '-'));
        var displayLabel = mode === 'provinsi' ? getShortProvinsiLabel(rawLabel) : (mode === 'kabupaten' ? getShortKabupatenLabel(rawLabel, item) : getShortIgtLabel(rawLabel));

        var jenisVal = item.jenisIgt || (mode === 'igt' ? getJenisIgt(item.igt) : '');
        svg += '<g class="igt-chart-cluster" data-idx="' + idx + '" data-mode="' + mode + '" data-label="' + rawLabel + '" data-igt="' + (item.igt || item.jumlahIgt || '-') + '" data-jenis="' + jenisVal + '" data-prov="' + (item.provinsi || '-') + '" data-kab="' + (item.kabupaten || '-') + '" data-bidang="' + (item.bidang || '-') + '" data-luas="' + (item.luas || '-') + '">';

        // Invisible full-height hover zone
        svg += '<rect x="' + (clusterCenter - (clusterStep / 2)) + '" y="' + plotTop + '" width="' + clusterStep + '" height="' + (plotHeight + 35) + '" fill="transparent" class="igt-chart-hover-zone"></rect>';

        if (metric === 'administrasi') {
            if (mode === 'provinsi') {
                var v1 = typeof item.jumlahIgt === 'number' ? item.jumlahIgt : parseInt(item.jumlahIgt, 10) || 0;
                var v2 = typeof item.kabupaten === 'number' ? item.kabupaten : parseInt(item.kabupaten, 10) || 0;

                var h1 = (v1 / maxVal) * plotHeight;
                var h2 = (v2 / maxVal) * plotHeight;

                var x1 = clusterCenter - barWidth;
                var y1 = plotBottom - h1;
                var x2 = clusterCenter;
                var y2 = plotBottom - h2;

                // Bar 1: Jumlah IGT (#68b6db)
                if (v1 > 0) {
                    svg += '<rect x="' + x1 + '" y="' + y1 + '" width="' + barWidth + '" height="' + h1 + '" fill="#68b6db" class="igt-chart-bar igt-chart-bar--prov"></rect>';
                }
                // Bar 2: Jumlah Data Kabupaten (#6793db)
                if (v2 > 0) {
                    svg += '<rect x="' + x2 + '" y="' + y2 + '" width="' + barWidth + '" height="' + h2 + '" fill="#6793db" class="igt-chart-bar igt-chart-bar--kab"></rect>';
                }
            } else if (mode === 'kabupaten') {
                var v1 = typeof item.jumlahIgt === 'number' ? item.jumlahIgt : parseInt(item.jumlahIgt, 10) || 0;
                var h1 = (v1 / maxVal) * plotHeight;
                var x1 = clusterCenter - (barWidth / 2);
                var y1 = plotBottom - h1;
                if (v1 > 0) {
                    svg += '<rect x="' + x1 + '" y="' + y1 + '" width="' + barWidth + '" height="' + h1 + '" fill="#68b6db" class="igt-chart-bar"></rect>';
                }
            } else {
                var pVal = typeof item.provinsi === 'number' ? item.provinsi : parseInt(item.provinsi, 10) || 0;
                var kVal = typeof item.kabupaten === 'number' ? item.kabupaten : parseInt(item.kabupaten, 10) || 0;

                var pHeight = (pVal / maxVal) * plotHeight;
                var kHeight = (kVal / maxVal) * plotHeight;

                var pX = clusterCenter - barWidth;
                var pY = plotBottom - pHeight;
                var kX = clusterCenter;
                var kY = plotBottom - kHeight;

                // Bar 1: Jumlah Data Provinsi (#68b6db)
                if (pVal > 0) {
                    svg += '<rect x="' + pX + '" y="' + pY + '" width="' + barWidth + '" height="' + pHeight + '" fill="#68b6db" class="igt-chart-bar igt-chart-bar--prov"></rect>';
                }

                // Bar 2: Jumlah Data Kabupaten (#6793db)
                if (kVal > 0) {
                    svg += '<rect x="' + kX + '" y="' + kY + '" width="' + barWidth + '" height="' + kHeight + '" fill="#6793db" class="igt-chart-bar igt-chart-bar--kab"></rect>';
                }
            }
        } else if (metric === 'bidang') {
            var bVal = parseInt(String(item.bidang || '0').replace(/\./g, ''), 10) || 0;
            var bHeight = (bVal / maxVal) * plotHeight;
            var bX = clusterCenter - (barWidth / 2);
            var bY = plotBottom - bHeight;
            if (bVal > 0) {
                svg += '<rect x="' + bX + '" y="' + bY + '" width="' + barWidth + '" height="' + bHeight + '" fill="#6793db" class="igt-chart-bar"></rect>';
            }
        } else if (metric === 'luas') {
            var lVal = parseFloat(String(item.luas || '0').replace(/\./g, '').replace(',', '.')) || 0;
            var lHeight = (lVal / maxVal) * plotHeight;
            var lX = clusterCenter - (barWidth / 2);
            var lY = plotBottom - lHeight;
            if (lVal > 0) {
                svg += '<rect x="' + lX + '" y="' + lY + '" width="' + barWidth + '" height="' + lHeight + '" fill="#68b6db" class="igt-chart-bar"></rect>';
            }
        }

        // X-axis Category Label
        svg += '<text x="' + clusterCenter + '" y="' + (plotBottom + 18) + '" class="igt-chart-x-label">' + displayLabel + '</text>';

        svg += '</g>';
    });

    svg += '</svg>';

    // Tooltip Element
    svg += '<div class="igt-chart-tooltip" id="statistik-igt-chart-tooltip"></div>';

    $canvas.html(svg);

    // Bind Tooltip Events
    var $tooltip = $('#statistik-igt-chart-tooltip');
    $canvas.find('.igt-chart-cluster').off('mouseenter mousemove mouseleave')
        .on('mouseenter mousemove', function(e) {
            var $cluster = $(this);
            var cMode = $cluster.data('mode');
            var label = $cluster.data('label');
            var igt = $cluster.data('igt');
            var prov = $cluster.data('prov');
            var kab = $cluster.data('kab');
            var bidang = $cluster.data('bidang');
            var luas = $cluster.data('luas');

            var html = '<div class="igt-chart-tooltip__title">' + label + '</div>';
            if (cMode === 'provinsi') {
                html += '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#68b6db;"></span> Jumlah IGT: <strong>' + igt + '</strong></div>'
                    + '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#6793db;"></span> Jumlah Data Kabupaten: <strong>' + kab + '</strong></div>';
            } else if (cMode === 'kabupaten') {
                html += '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#94a3b8;"></span> Provinsi: <strong>' + prov + '</strong></div>'
                    + '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#68b6db;"></span> Jumlah IGT: <strong>' + igt + '</strong></div>';
            } else {
                var jenis = $cluster.data('jenis');
                if (jenis) {
                    var jenisColor = jenis === 'Tata Ruang' ? '#10b981' : '#2563eb';
                    html += '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:' + jenisColor + ';"></span> Jenis IGT: <strong>' + jenis + '</strong></div>';
                }
                html += '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#68b6db;"></span> Jumlah Data Provinsi: <strong>' + prov + '</strong></div>'
                    + '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#6793db;"></span> Jumlah Data Kabupaten: <strong>' + kab + '</strong></div>';
            }

            if (bidang && bidang !== '-') {
                html += '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#94a3b8;"></span> Bidang: <strong>' + bidang + '</strong></div>';
            }
            if (luas && luas !== '-') {
                html += '<div class="igt-chart-tooltip__row"><span class="igt-chart-tooltip__dot" style="background:#94a3b8;"></span> Luas: <strong>' + luas + ' Ha</strong></div>';
            }

            $tooltip.html(html);

            var canvasRect = $canvas[0].getBoundingClientRect();
            var mouseX = (e.clientX || (e.originalEvent && e.originalEvent.clientX) || (e.pageX - window.scrollX)) - canvasRect.left;
            var mouseY = (e.clientY || (e.originalEvent && e.originalEvent.clientY) || (e.pageY - window.scrollY)) - canvasRect.top;

            $tooltip.css({
                left: Math.max(80, Math.min(canvasRect.width - 80, mouseX)) + 'px',
                top: Math.max(30, mouseY) + 'px'
            }).addClass('is-visible');
        })
        .on('mouseleave', function() {
            $tooltip.removeClass('is-visible');
        });
}

// Bind Metric Dropdown Selection
$(document).on('click', '#statistik-igt-grafik-metric-panel .igt-dropdown__item', function(e) {
    e.preventDefault();
    var metric = $(this).data('metric') || 'administrasi';
    statistikIGTGrafikMetric = metric;
    $('#statistik-igt-grafik-metric-panel .igt-dropdown__item').removeClass('is-active');
    $(this).addClass('is-active');
    $('#statistik-igt-grafik-metric-label').text($(this).text().trim());
    $('#statistik-igt-grafik-metric-panel').removeClass('is-open');
    if (tableControllers['statistik-igt']) {
        renderStatistikIGTGrafik(tableControllers['statistik-igt']);
    }
});
