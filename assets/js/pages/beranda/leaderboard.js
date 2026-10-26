/**
 * IGTPR Mockup UI - Beranda: Leader Board
 */

/* ----------------------------------------------------
   6. Leader Board (3 Kategori Pilihan) Renderer
---------------------------------------------------- */
var leaderBoardState = {
    kategori: 'capaian-renaksi', // 'capaian-renaksi' | 'igt-akses' | 'satker-login'
    tahun: '2026',
    jenisIgt: 'all', // 'all' | 'pertanahan' | 'tataruang'
    searchQuery: '',
    currentPage: 1,
    perPage: 5, // Default Top 5
    sortCol: null,
    sortDir: 'desc',
    initialized: false
};

var DAFTAR_IGT_BIDANG = [
    'bidang tanah',
    'penguasaan tanah',
    'pemilikan tanah',
    'penggunaan tanah',
    'pemanfaatan tanah',
    'sebaran lokasi pemberdayaan tanah masyarakat',
    'pertimbangan teknis pertanahan',
    'inventarisasi tanah kritis',
    'tanah terindikasi terlantar',
    'indikasi pelanggaran pemanfaatan ruang',
    'hak atas tanah',
    'informasi mengenai sengketa, konflik, dan perkara pertanahan',
    'potensi subjek konsolidasi tanah',
    'nilai bidang tanah',
    'desain konsolidasi tanah',
    'hasil penerapan desain konsolidasi tanah'
];

function isBidangIgt(name) {
    if (!name) return false;
    var n = String(name).trim().toLowerCase().replace(/^igt\s+/i, '');
    return DAFTAR_IGT_BIDANG.indexOf(n) !== -1;
}

function getIgtTagClass(name) {
    if (isBidangIgt(name)) {
        return 'igt-tag--bidang';
    }
    return 'igt-tag--kawasan';
}

function getRoleSatkerBadge(satkerName) {
    // Seluruh role disamakan mengikuti superadmin (tanpa badge role di leaderboard)
    return '';
}

var LEADERBOARD_CONFIG = {
    'capaian-renaksi': {
        key: 'capaian-renaksi',
        shortTitle: 'Capaian Renaksi',
        subbarInfo: 'Peringkat Capaian Renaksi',
        tahunTitle: 'Tahun Renaksi',
        showSatker: true,
        defaultSortCol: 'persentase',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'satker', label: 'Direktorat', sortable: true },
            { key: 'realisasi', label: 'Realisasi / Target', sortable: false },
            { key: 'persentase', label: 'Persentase', sortable: true }
        ]
    },
    'igt-akses': {
        key: 'igt-akses',
        shortTitle: 'Frekuensi Akses IGT',
        subbarInfo: 'Frekuensi Akses IGT melalui Plugin QGIS dan Geoportal',
        tahunTitle: 'Tahun Akses',
        showSatker: false,
        defaultSortCol: 'jumlahAkses',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'igt', label: 'Nama IGT', sortable: true },
            { key: 'jumlahAkses', label: 'Jumlah Akses', sortable: true }
        ]
    },
    'satker-login': {
        key: 'satker-login',
        shortTitle: 'Frekuensi Login Pengguna',
        subbarInfo: 'Frekuensi Login Pengguna ke Sistem Geoportal',
        tahunTitle: 'Tahun Akses',
        showSatker: false,
        defaultSortCol: 'jumlahLogin',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'satker', label: 'Satker (Direktorat / Kanwil / Kantah)', sortable: true },
            { key: 'jumlahLogin', label: 'Jumlah Login', sortable: true }
        ]
    },
    'direktorat-login': {
        key: 'satker-login',
        shortTitle: 'Frekuensi Login Pengguna',
        subbarInfo: 'Frekuensi Login Pengguna ke Sistem Geoportal',
        tahunTitle: 'Tahun Akses',
        showSatker: false,
        defaultSortCol: 'jumlahLogin',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'satker', label: 'Satker (Direktorat / Kanwil / Kantah)', sortable: true },
            { key: 'jumlahLogin', label: 'Jumlah Login', sortable: true }
        ]
    }
};

function renderLeaderBoard(dashboardLeaderBoardData) {
    if (!leaderBoardState.initialized) {
        initLeaderBoard();
    }
    if (typeof currentDashboardYear !== 'undefined') {
        leaderBoardState.tahun = $('#leader-board-tahun').val() || currentDashboardYear || 'all';
    }
    updateLeaderBoardTable();
}

function initLeaderBoard() {
    leaderBoardState.initialized = true;

    // A. Setup Jenis IGT dropdown filter
    setupDropdown('leader-board-jenis-wrap', function($item) {
        var jenis = $item.data('jenis');
        leaderBoardState.jenisIgt = jenis || 'all';
        leaderBoardState.currentPage = 1;
        leaderBoardDetailState.currentPage = 1;
        updateLeaderBoardTable();
        updateLeaderBoardDetailTable();
    });

    // B. Segment buttons (1-click category switch)
    $('#leader-board-segment .igt-segment__item').off('click').on('click', function() {
        var kat = $(this).data('kategori');
        if (kat) {
            switchLeaderBoardKategori(kat);
        }
    });

    // C. Search input
    $('#leader-board-cari').off('input').on('input', function() {
        leaderBoardState.searchQuery = $(this).val().trim().toLowerCase();
        leaderBoardState.currentPage = 1;
        updateLeaderBoardTable();
    });

    // D. Tahun filter
    $('#leader-board-tahun').off('change').on('change', function() {
        leaderBoardState.tahun = $(this).val();
        leaderBoardState.currentPage = 1;
        leaderBoardDetailState.currentPage = 1;
        updateLeaderBoardTable();
        updateLeaderBoardDetailTable();
    });

    // D2. Bulan filter (berlaku untuk grafik leaderboard & tabel detail)
    $('#leader-board-bulan').off('change').on('change', function() {
        if (window.MOCKUP_DATA) window.MOCKUP_DATA.leaderBoardBulan = $(this).val() || 'all';
        leaderBoardState.currentPage = 1;
        leaderBoardDetailState.currentPage = 1;
        updateLeaderBoardTable();
        updateLeaderBoardDetailTable();
    });

    // E. Search input for detailed table
    $('#leader-board-detail-cari').off('input').on('input', function() {
        leaderBoardDetailState.searchQuery = $(this).val().trim().toLowerCase();
        leaderBoardDetailState.currentPage = 1;
        updateLeaderBoardDetailTable();
    });

    // F. Per page selector for detailed table (default 10)
    $('#leader-board-detail-perpage').off('change').on('change', function() {
        leaderBoardDetailState.perPage = parseInt($(this).val(), 10) || 10;
        leaderBoardDetailState.currentPage = 1;
        updateLeaderBoardDetailTable();
    });
}

function switchLeaderBoardKategori(kategoriKey) {
    if (!LEADERBOARD_CONFIG[kategoriKey]) return;
    leaderBoardState.kategori = kategoriKey;
    leaderBoardState.currentPage = 1;
    leaderBoardState.sortCol = null; // reset sorting to default
    leaderBoardState.sortDir = 'desc';

    // Reset detailed table state on tab switch
    leaderBoardDetailState.currentPage = 1;
    leaderBoardDetailState.sortCol = (kategoriKey === 'capaian-renaksi') ? 'satker' : null;
    leaderBoardDetailState.sortDir = (kategoriKey === 'capaian-renaksi') ? 'asc' : 'desc';

    var cfg = LEADERBOARD_CONFIG[kategoriKey];

    // Synchronize Segment UI
    $('#leader-board-segment .igt-segment__item').removeClass('is-active');
    $('#leader-board-segment .igt-segment__item[data-kategori="' + kategoriKey + '"]').addClass('is-active');

    // Update Subbar Info Text
    if (kategoriKey === 'capaian-renaksi') {
        $('#leader-board-subbar-info').text('Peringkat Capaian Renaksi');
        $('.igt-segment__item[data-kategori="capaian-renaksi"]').text('1. Capaian Renaksi');
    } else {
        $('#leader-board-subbar-info').text(cfg.subbarInfo);
    }

    // Update Tahun Filter Title & Label
    $('#leader-board-tahun-wrap').attr('title', cfg.tahunTitle);

    updateLeaderBoardTable();
}

function updateLeaderBoardTable() {
    var cfg = LEADERBOARD_CONFIG[leaderBoardState.kategori] || LEADERBOARD_CONFIG['capaian-renaksi'];
    var rawData = [];

    if (window.MOCKUP_DATA && typeof window.MOCKUP_DATA.getLeaderBoardData === 'function') {
        rawData = window.MOCKUP_DATA.getLeaderBoardData(
            leaderBoardState.kategori,
            leaderBoardState.tahun,
            leaderBoardState.jenisIgt
        );
        rawData = applyRoleFilterToLeaderboard(rawData, leaderBoardState.kategori);
    }

    // Filter by search query
    var filtered = rawData;
    var q = leaderBoardState.searchQuery;
    if (q) {
        filtered = rawData.filter(function(item) {
            if (item.igt && item.igt.toLowerCase().indexOf(q) !== -1) return true;
            if (item.satker && item.satker.toLowerCase().indexOf(q) !== -1) return true;
            if (item.jenisIgt && item.jenisIgt.toLowerCase().indexOf(q) !== -1) return true;
            if (item.satuan && item.satuan.toLowerCase().indexOf(q) !== -1) return true;
            if (item.persenStr && item.persenStr.toLowerCase().indexOf(q) !== -1) return true;
            if (item.daftarIgt && Array.isArray(item.daftarIgt)) {
                for (var k = 0; k < item.daftarIgt.length; k++) {
                    if (item.daftarIgt[k].toLowerCase().indexOf(q) !== -1) return true;
                }
            }
            return false;
        });
    }

    // Sorting
    var sortCol = leaderBoardState.sortCol || cfg.defaultSortCol;
    var sortDir = leaderBoardState.sortDir;

    var sorted = filtered.slice().sort(function(a, b) {
        var valA = a[sortCol];
        var valB = b[sortCol];

        if (typeof valA === 'string') {
            var cmp = valA.localeCompare(valB);
            return sortDir === 'asc' ? cmp : -cmp;
        } else {
            valA = Number(valA) || 0;
            valB = Number(valB) || 0;
            return sortDir === 'asc' ? valA - valB : valB - valA;
        }
    });

    // Leader Board: Selalu 5 entri teratas (Fixed Top 5)
    var totalEntries = sorted.length;
    var perPage = 5;
    leaderBoardState.perPage = 5;
    leaderBoardState.currentPage = 1;
    var startIndex = 0;
    var totalPages = 1;
    var pageData = sorted.slice(0, 5);

    // Render based on category: Table (Capaian Renaksi) vs Horizontal Bar Chart (Akses & Login)
    if (leaderBoardState.kategori === 'capaian-renaksi') {
        $('#leader-board-subbar-info').text('Peringkat Capaian Renaksi');
        $('.igt-segment__item[data-kategori="capaian-renaksi"]').text('1. Capaian Renaksi');

        $('#leader-board-tabel').show();
        $('#leader-board-grafik').hide();

        // Render THEAD
        var theadHtml = '';
        cfg.columns.forEach(function(col) {
            var colLabel = col.label;
            var thClass = col.thClass || '';
            var isSorted = (col.key === sortCol || (col.sortKey && col.sortKey === sortCol));
            if (isSorted) thClass += ' is-sorted';

            if (col.sortable) {
                var iconSrc = isSorted
                    ? (sortDir === 'asc' ? 'assets/img/icons/caret-up.svg' : 'assets/img/icons/caret-down.svg')
                    : 'assets/img/icons/caret-up-down.svg';

                theadHtml += '<th class="' + thClass + '" data-key="' + (col.sortKey || col.key) + '">'
                    + '<span class="igt-table__sort">'
                    + colLabel
                    + ' <img src="' + iconSrc + '" alt="">'
                    + '</span></th>';
            } else {
                theadHtml += '<th class="' + thClass + ' is-plain">' + colLabel + '</th>';
            }
        });
        $('#leader-board-thead').html(theadHtml);

        // Bind TH sort clicks
        $('#leader-board-thead th[data-key]').off('click').on('click', function() {
            var clickedKey = $(this).data('key');
            if (leaderBoardState.sortCol === clickedKey) {
                leaderBoardState.sortDir = (leaderBoardState.sortDir === 'asc') ? 'desc' : 'asc';
            } else {
                leaderBoardState.sortCol = clickedKey;
                leaderBoardState.sortDir = (clickedKey === 'igt' || clickedKey === 'satker') ? 'asc' : 'desc';
            }
            updateLeaderBoardTable();
        });

        // Render TBODY
        var tbodyHtml = '';
        if (pageData.length === 0) {
            tbodyHtml = '<tr class="igt-table__empty"><td colspan="' + cfg.columns.length + '">Tidak ada data peringkat yang sesuai filter</td></tr>';
        } else {
            pageData.forEach(function(item, idx) {
                var rank = startIndex + idx + 1;
                var rankBadgeClass = rank === 1 ? 'igt-rank-badge--1' : (rank === 2 ? 'igt-rank-badge--2' : (rank === 3 ? 'igt-rank-badge--3' : ''));
                var rankBadge = '<span class="igt-rank-badge ' + rankBadgeClass + '">' + rank + '</span>';

                tbodyHtml += '<tr>';

                // No
                tbodyHtml += '<td class="igt-table__no">' + rankBadge + '</td>';

                // Satker / Direktorat (Preview Chip + Tombol "+X lainnya ▾")
                var daftarBidang = (item.daftarIgt || []).filter(function(name) {
                    return isBidangIgt(name);
                });
                var daftarKawasan = (item.daftarIgt || []).filter(function(name) {
                    return !isBidangIgt(name);
                });

                var chipsHtml = '';
                if (item.daftarIgt && item.daftarIgt.length > 0) {
                    var previewChips = [];
                    var hiddenChips = [];

                    if (item.hasBidang && item.hasKawasan) {
                        // Dual basis: tampilkan 1 Bidang (biru) dan 1 Kawasan (hijau) sebagai preview
                        if (daftarBidang.length > 0) {
                            previewChips.push({ name: daftarBidang[0], isBidang: true });
                        }
                        if (daftarKawasan.length > 0) {
                            previewChips.push({ name: daftarKawasan[0], isBidang: false });
                        }
                        for (var b = 1; b < daftarBidang.length; b++) {
                            hiddenChips.push({ name: daftarBidang[b], isBidang: true });
                        }
                        for (var k = 1; k < daftarKawasan.length; k++) {
                            hiddenChips.push({ name: daftarKawasan[k], isBidang: false });
                        }
                    } else {
                        // Single basis: tampilkan 2 chip pertama sebagai preview
                        item.daftarIgt.forEach(function(name, i) {
                            var isB = isBidangIgt(name);
                            if (i < 2) {
                                previewChips.push({ name: name, isBidang: isB });
                            } else {
                                hiddenChips.push({ name: name, isBidang: isB });
                            }
                        });
                    }

                    var rowKey = 'renaksi-' + (startIndex + idx);
                    var previewHtml = previewChips.map(function(c) {
                        var cls = c.isBidang ? 'igt-tag--bidang' : 'igt-tag--kawasan';
                        return '<span class="' + cls + '">' + c.name + '</span>';
                    }).join(' ');

                    var hiddenHtml = '';
                    var moreBtnHtml = '';
                    if (hiddenChips.length > 0) {
                        hiddenHtml = '<span class="igt-chips-hidden" id="igt-more-' + rowKey + '" style="display: none;">'
                            + hiddenChips.map(function(c) {
                                var cls = c.isBidang ? 'igt-tag--bidang' : 'igt-tag--kawasan';
                                return '<span class="' + cls + '">' + c.name + '</span>';
                            }).join(' ')
                            + '</span>';

                        moreBtnHtml = '<button type="button" class="igt-tag-more" data-target="igt-more-' + rowKey + '" data-count="' + hiddenChips.length + '">+' + hiddenChips.length + ' lainnya ▾</button>';
                    }

                    chipsHtml = '<div class="igt-chips-wrap">' + previewHtml + ' ' + hiddenHtml + ' ' + moreBtnHtml + '</div>';
                }

                tbodyHtml += '<td>'
                    + '<div class="igt-satker-cell-col">'
                    + '  <div class="igt-satker-name">' + item.satker + getRoleSatkerBadge(item.satker) + '</div>'
                    +    chipsHtml
                    + '</div>'
                    + '</td>';

                // Realisasi / Target (Kolom Diperbesar: Satuan Bidang dan Ha untuk Kawasan)
                var targetHtml = '';
                if (item.hasBidang && item.hasKawasan) {
                    targetHtml = '<div class="igt-target-cell-multi">'
                        + '  <div class="igt-target-item igt-target-item--bidang">'
                        + '    <span class="igt-target-num"><strong>' + item.realisasiBidang.toLocaleString('id-ID') + '</strong> <span class="igt-target-sep">/</span> ' + item.targetBidang.toLocaleString('id-ID') + '</span>'
                        + '    <span class="igt-satuan-badge--bidang">Bidang</span>'
                        + '  </div>'
                        + '  <div class="igt-target-item igt-target-item--kawasan">'
                        + '    <span class="igt-target-num"><strong>' + item.realisasiKawasan.toLocaleString('id-ID') + '</strong> <span class="igt-target-sep">/</span> ' + item.targetKawasan.toLocaleString('id-ID') + '</span>'
                        + '    <span class="igt-satuan-badge--kawasan">Ha</span>'
                        + '  </div>'
                        + '</div>';
                } else if (item.hasBidang) {
                    targetHtml = '<div class="igt-target-item igt-target-item--bidang">'
                        + '  <span class="igt-target-num"><strong>' + item.realisasiBidang.toLocaleString('id-ID') + '</strong> <span class="igt-target-sep">/</span> ' + item.targetBidang.toLocaleString('id-ID') + '</span>'
                        + '  <span class="igt-satuan-badge--bidang">Bidang</span>'
                        + '</div>';
                } else if (item.hasKawasan) {
                    targetHtml = '<div class="igt-target-item igt-target-item--kawasan">'
                        + '  <span class="igt-target-num"><strong>' + item.realisasiKawasan.toLocaleString('id-ID') + '</strong> <span class="igt-target-sep">/</span> ' + item.targetKawasan.toLocaleString('id-ID') + '</span>'
                        + '  <span class="igt-satuan-badge--kawasan">Ha</span>'
                        + '</div>';
                } else {
                    targetHtml = '<span class="text-muted">-</span>';
                }
                tbodyHtml += '<td>' + targetHtml + '</td>';

                // Persentase (Kolom Diperbesar: Progress bar lebar & angka persentase prominent)
                tbodyHtml += '<td><div class="igt-progress-cell">'
                    + '<div class="igt-progress-bar-wrap"><div class="igt-progress-bar igt-progress-bar--' + item.progressColor + '" style="width: ' + Math.min(100, item.persentase) + '%"></div></div>'
                    + '<div class="igt-progress-meta">'
                    + '  <span class="igt-progress-text">' + item.persenStr + '</span>'
                    + '</div>'
                    + '</div></td>';

                tbodyHtml += '</tr>';
            });
        }
        $('#leader-board-body').html(tbodyHtml);

    } else {
        // Kategori 2 (igt-akses) & Kategori 3 (direktorat-login): GRAFIK BATANG KE SAMPING (Tanpa Chip)
        $('#leader-board-tabel').hide();
        $('#leader-board-grafik').show();

        if (leaderBoardState.kategori === 'igt-akses') {
            $('#leader-board-hbar-legend').css('display', 'flex');
        } else {
            $('#leader-board-hbar-legend').hide();
        }

        var hbarHtml = '';
        if (pageData.length === 0) {
            hbarHtml = '<div class="igt-hbar-empty">Tidak ada data peringkat yang sesuai filter</div>';
        } else {
            // Maximum value for proportional width calculation
            var maxVal = 1;
            if (leaderBoardState.kategori === 'igt-akses') {
                maxVal = sorted[0].jumlahAkses || 1;
            } else if (leaderBoardState.kategori === 'direktorat-login' || leaderBoardState.kategori === 'satker-login') {
                maxVal = sorted[0].jumlahLogin || 1;
            }

            pageData.forEach(function(item, idx) {
                var rank = startIndex + idx + 1;
                var rankBadgeClass = rank === 1 ? 'igt-rank-badge--1' : (rank === 2 ? 'igt-rank-badge--2' : (rank === 3 ? 'igt-rank-badge--3' : ''));
                var rankBadge = '<span class="igt-rank-badge ' + rankBadgeClass + '">' + rank + '</span>';

                if (leaderBoardState.kategori === 'igt-akses') {
                    var barPercent = Math.max(6, Math.round((item.jumlahAkses / maxVal) * 58));
                    var pluginPercent = item.jumlahAkses > 0 ? Math.round((item.aksesPlugin / item.jumlahAkses) * 100) : 0;
                    var aplikasiPercent = Math.max(0, 100 - pluginPercent);

                    // Kategori 2: Tidak perlu chip di bawah nama IGT
                    hbarHtml += '<div class="igt-hbar-row">'
                        + '  <div class="igt-hbar-rank">' + rankBadge + '</div>'
                        + '  <div class="igt-hbar-left">'
                        + '    <div class="igt-hbar-title">' + item.igt + '</div>'
                        + '  </div>'
                        + '  <div class="igt-hbar-chart">'
                        + '    <div class="igt-hbar-bar-wrap" style="width: ' + barPercent + '%;" title="' + item.igt + ': Total ' + item.jumlahAkses.toLocaleString('id-ID') + ' kali (Plugin QGIS: ' + item.aksesPlugin.toLocaleString('id-ID') + ', Geoportal: ' + item.aksesAplikasi.toLocaleString('id-ID') + ')">'
                        + '      <div class="igt-hbar-seg--plugin" style="width: ' + pluginPercent + '%;"></div>'
                        + '      <div class="igt-hbar-seg--aplikasi" style="width: ' + aplikasiPercent + '%;"></div>'
                        + '    </div>'
                        + '    <div class="igt-hbar-tip">'
                        + '      <strong>' + item.jumlahAkses.toLocaleString('id-ID') + '</strong> <span class="igt-hbar-tip-unit">kali</span>'
                        + '      <span class="igt-hbar-tip-sub">(Plugin: ' + item.aksesPlugin.toLocaleString('id-ID') + ' &bull; Aplikasi: ' + item.aksesAplikasi.toLocaleString('id-ID') + ')</span>'
                        + '    </div>'
                        + '  </div>'
                        + '</div>';

                } else if (leaderBoardState.kategori === 'direktorat-login' || leaderBoardState.kategori === 'satker-login') {
                    var barPercent = Math.max(6, Math.round((item.jumlahLogin / maxVal) * 68));

                    // Kategori 3: Satker Sering Login (Ditjen, Kanwil, Kantah) dengan badge tipe
                    var tipeBadge = '';
                    if (item.tipe) {
                        var cls = item.tipe.toLowerCase();
                        tipeBadge = ' <span class="igt-tipe-badge igt-tipe-badge--' + cls + '">' + item.tipe + '</span>';
                    }

                    hbarHtml += '<div class="igt-hbar-row">'
                        + '  <div class="igt-hbar-rank">' + rankBadge + '</div>'
                        + '  <div class="igt-hbar-left">'
                        + '    <div class="igt-hbar-title">' + item.satker + tipeBadge + getRoleSatkerBadge(item.satker) + '</div>'
                        + '  </div>'
                        + '  <div class="igt-hbar-chart">'
                        + '    <div class="igt-hbar-bar-wrap igt-hbar-bar-wrap--login" style="width: ' + barPercent + '%;" title="' + item.satker + (item.tipe ? ' (' + item.tipe + ')' : '') + ': ' + item.jumlahLogin.toLocaleString('id-ID') + ' kali login">'
                        + '    </div>'
                        + '    <div class="igt-hbar-tip">'
                        + '      <strong>' + item.jumlahLogin.toLocaleString('id-ID') + '</strong> <span class="igt-hbar-tip-unit">kali login</span>'
                        + '    </div>'
                        + '  </div>'
                        + '</div>';
                }
            });
        }
        $('#leader-board-hbar-list').html(hbarHtml);
    }

    // Bind "See More" (+X lainnya / Sembunyikan) Events
    bindLeaderBoardMoreEvents();

    // Render Shared Pagination (jika elemen pagination ada di DOM dan terdapat lebih dari 1 halaman)
    if ($('#leader-board-pagination').length && totalPages > 1) {
        renderPaginationHtml($('#leader-board-pagination'), totalPages, leaderBoardState.currentPage, function(newPage) {
            leaderBoardState.currentPage = newPage;
            updateLeaderBoardTable();
        });
    } else {
        $('#leader-board-pagination').empty();
    }

    // Render Tabel Detail Seluruh Data (mengikuti tab kategori aktif)
    updateLeaderBoardDetailTable();
}

function bindLeaderBoardMoreEvents() {
    $('#leader-board').off('click', '.igt-tag-more').on('click', '.igt-tag-more', function(e) {
        e.stopPropagation();
        var $btn = $(this);
        var targetId = $btn.data('target');
        var count = $btn.data('count');
        var $target = $('#' + targetId);

        if ($btn.hasClass('is-expanded')) {
            $target.hide();
            $btn.removeClass('is-expanded').text('+' + count + ' lainnya ▾');
        } else {
            $target.css('display', 'inline-flex');
            $btn.addClass('is-expanded').text('Sembunyikan ▴');
        }
    });
}

var leaderBoardDetailState = {
    searchQuery: '',
    currentPage: 1,
    perPage: 10,
    sortCol: 'satker',
    sortDir: 'desc'
};

var LEADERBOARD_DETAIL_CONFIG = {
    'capaian-renaksi': {
        title: 'Tabel Detail Capaian Renaksi per Direktorat',
        defaultSortCol: 'satker',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'satker', label: 'Direktorat', sortable: true },
            { key: 'igt', label: 'IGT', sortable: true },
            { key: 'target', label: 'Target', sortable: true },
            { key: 'realisasi', label: 'Realisasi', sortable: true },
            { key: 'persentase', label: 'Persentase Capaian', sortable: true }
        ]
    },
    'igt-akses': {
        title: 'Tabel Detail Frekuensi Akses & Pemanfaatan IGT',
        defaultSortCol: 'jumlahAkses',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'igt', label: 'Nama IGT', sortable: true },
            { key: 'jenisIgt', label: 'Jenis IGT', sortable: true },
            { key: 'satker', label: 'Satker Pengampu', sortable: true },
            { key: 'aksesPlugin', label: 'Akses Plugin QGIS', sortable: true },
            { key: 'aksesAplikasi', label: 'Akses Geoportal', sortable: true },
            { key: 'jumlahAkses', label: 'Total Akses', sortable: true }
        ]
    },
    'satker-login': {
        title: 'Tabel Detail Keaktifan & Frekuensi Login Satuan Kerja',
        defaultSortCol: 'jumlahLogin',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'satker', label: 'Nama Satuan Kerja', sortable: true },
            { key: 'tipe', label: 'Tipe Administrasi', sortable: true },
            { key: 'jumlahLogin', label: 'Frekuensi Login', sortable: true },
            { key: 'status', label: 'Status Keaktifan', sortable: false }
        ]
    },
    'direktorat-login': {
        title: 'Tabel Detail Keaktifan & Frekuensi Login Satuan Kerja',
        defaultSortCol: 'jumlahLogin',
        columns: [
            { key: 'no', label: 'No', thClass: 'igt-table__no', sortable: false },
            { key: 'satker', label: 'Nama Satuan Kerja', sortable: true },
            { key: 'tipe', label: 'Tipe Administrasi', sortable: true },
            { key: 'jumlahLogin', label: 'Frekuensi Login', sortable: true },
            { key: 'status', label: 'Status Keaktifan', sortable: false }
        ]
    }
};

function updateLeaderBoardDetailTable() {
    var kat = leaderBoardState.kategori || 'capaian-renaksi';
    var cfg = LEADERBOARD_DETAIL_CONFIG[kat] || LEADERBOARD_DETAIL_CONFIG['capaian-renaksi'];
    var rawData = [];

    if (kat === 'capaian-renaksi') {
        if (window.MOCKUP_DATA && typeof window.MOCKUP_DATA.getRenaksiDetailIgtData === 'function') {
            rawData = window.MOCKUP_DATA.getRenaksiDetailIgtData(
                leaderBoardState.tahun,
                leaderBoardState.jenisIgt
            );
        } else if (window.MOCKUP_DATA && typeof window.MOCKUP_DATA.getLeaderBoardData === 'function') {
            rawData = window.MOCKUP_DATA.getLeaderBoardData(
                'capaian-renaksi-detail',
                leaderBoardState.tahun,
                leaderBoardState.jenisIgt
            );
        }
        rawData = applyRoleFilterToLeaderboard(rawData, kat);
    } else {
        if (window.MOCKUP_DATA && typeof window.MOCKUP_DATA.getLeaderBoardData === 'function') {
            rawData = window.MOCKUP_DATA.getLeaderBoardData(
                kat,
                leaderBoardState.tahun,
                leaderBoardState.jenisIgt
            );
            rawData = applyRoleFilterToLeaderboard(rawData, kat);
        }
    }

    // Filter by detailed search query
    var filtered = rawData;
    var q = leaderBoardDetailState.searchQuery;
    if (q) {
        filtered = rawData.filter(function(item) {
            var matchSatker = (item.satker && item.satker.toLowerCase().indexOf(q) !== -1);
            var matchIgt = (item.igt && item.igt.toLowerCase().indexOf(q) !== -1);
            var matchJenis = (item.jenisIgt && item.jenisIgt.toLowerCase().indexOf(q) !== -1);
            var matchSatuan = (item.satuan && item.satuan.toLowerCase().indexOf(q) !== -1);
            var matchTipe = (item.tipe && item.tipe.toLowerCase().indexOf(q) !== -1);
            var matchDaftar = false;
            if (item.daftarIgt && Array.isArray(item.daftarIgt)) {
                matchDaftar = item.daftarIgt.some(function(name) {
                    return name.toLowerCase().indexOf(q) !== -1;
                });
            }
            return matchSatker || matchIgt || matchJenis || matchSatuan || matchTipe || matchDaftar;
        });
    }

    // Sorting
    var sortCol = leaderBoardDetailState.sortCol || cfg.defaultSortCol;
    var sortDir = leaderBoardDetailState.sortDir || ((kat === 'capaian-renaksi' || sortCol === 'persentase') ? 'desc' : 'asc');
    var sorted = filtered.slice();

    if (sortCol) {
        // Precalculate average percentage per Direktorat/Satker for capaian-renaksi
        var satkerStats = {};
        if (kat === 'capaian-renaksi') {
            filtered.forEach(function(item) {
                var s = item.satker || item.direktorat || '';
                if (!satkerStats[s]) {
                    satkerStats[s] = { sum: 0, count: 0, avg: 0 };
                }
                satkerStats[s].sum += (Number(item.persentase) || 0);
                satkerStats[s].count++;
            });
            Object.keys(satkerStats).forEach(function(s) {
                satkerStats[s].avg = satkerStats[s].sum / Math.max(1, satkerStats[s].count);
            });
        }

        sorted.sort(function(a, b) {
            if (sortCol === 'satker' || sortCol === 'direktorat') {
                if (kat === 'capaian-renaksi') {
                    var sA = a.satker || a.direktorat || '';
                    var sB = b.satker || b.direktorat || '';
                    var avgA = satkerStats[sA] ? satkerStats[sA].avg : 0;
                    var avgB = satkerStats[sB] ? satkerStats[sB].avg : 0;

                    // Primary: Urutkan berdasarkan persentase rata-rata direktorat tertinggi (desc) / terendah (asc)
                    var cmp = (sortDir === 'asc') ? (avgA - avgB) : (avgB - avgA);
                    if (Math.abs(cmp) > 0.0001) return cmp;

                    // Secondary: Nama Direktorat alfabetis
                    var nameCmp = sA.localeCompare(sB, 'id');
                    if (nameCmp !== 0) return nameCmp;

                    // Tertiary: Persentase IGT di dalam grup direktorat (tertinggi dahulu)
                    return (Number(b.persentase) || 0) - (Number(a.persentase) || 0);
                } else {
                    var cmp = (sortDir === 'asc')
                        ? (a.satker || '').localeCompare(b.satker || '', 'id')
                        : (b.satker || '').localeCompare(a.satker || '', 'id');
                    if (cmp !== 0) return cmp;
                    return (a.orderIndex || 0) - (b.orderIndex || 0);
                }
            }

            var valA = a[sortCol];
            var valB = b[sortCol];

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortDir === 'asc' ? valA.localeCompare(valB, 'id') : valB.localeCompare(valA, 'id');
            } else {
                valA = Number(valA) || 0;
                valB = Number(valB) || 0;
                return sortDir === 'asc' ? valA - valB : valB - valA;
            }
        });
    }

    // Pagination (Default 10 per page)
    var totalEntries = sorted.length;
    var perPage = leaderBoardDetailState.perPage || 10;
    var totalPages = Math.max(1, Math.ceil(totalEntries / perPage));
    if (leaderBoardDetailState.currentPage > totalPages) leaderBoardDetailState.currentPage = totalPages;
    if (leaderBoardDetailState.currentPage < 1) leaderBoardDetailState.currentPage = 1;

    var startIndex = (leaderBoardDetailState.currentPage - 1) * perPage;
    var pageData = sorted.slice(startIndex, startIndex + perPage);

    // Update Header Title & Count Badge
    if (kat === 'capaian-renaksi') {
        $('#leader-board-detail-title').text('Tabel Detail Capaian Renaksi per Direktorat');
    } else {
        $('#leader-board-detail-title').text(cfg.title);
    }
    $('#leader-board-detail-badge').text(totalEntries + ' Data');

    // Render THEAD
    var theadHtml = '';
    cfg.columns.forEach(function(col) {
        var colLabel = col.label;
        var thClass = col.thClass || '';
        var isSorted = (col.key === sortCol);
        if (isSorted) thClass += ' is-sorted';

        if (col.sortable) {
            var iconSrc = isSorted
                ? (sortDir === 'asc' ? 'assets/img/icons/caret-up.svg' : 'assets/img/icons/caret-down.svg')
                : 'assets/img/icons/caret-up-down.svg';
            theadHtml += '<th class="' + thClass + '" data-key="' + col.key + '" style="cursor: pointer;">'
                + '<span class="igt-table__sort">' + colLabel + ' <img src="' + iconSrc + '" alt=""></span>'
                + '</th>';
        } else {
            theadHtml += '<th class="' + thClass + ' is-plain">' + colLabel + '</th>';
        }
    });
    $('#leader-board-detail-thead').html(theadHtml);

    // Render TBODY
    var tbodyHtml = '';
    if (pageData.length === 0) {
        tbodyHtml = '<tr><td colspan="' + cfg.columns.length + '" class="text-center py-4 text-muted">Tidak ada data yang sesuai filter</td></tr>';
    } else {
        var isGroupedBySatker = (kat === 'capaian-renaksi' && (sortCol === 'satker' || !sortCol));

        // Pre-calculate rowspan for satker on the current page
        var satkerRowSpan = [];
        if (isGroupedBySatker) {
            var i = 0;
            while (i < pageData.length) {
                var currentSatker = pageData[i].satker;
                var count = 1;
                while ((i + count) < pageData.length && pageData[i + count].satker === currentSatker) {
                    count++;
                }
                satkerRowSpan[i] = count;
                for (var j = 1; j < count; j++) {
                    satkerRowSpan[i + j] = 0; // mark to skip <td>
                }
                i += count;
            }
        }

        pageData.forEach(function(item, idx) {
            var rowNo = startIndex + idx + 1;
            var isLastInSatkerGroup = false;

            if (isGroupedBySatker) {
                if (idx === pageData.length - 1 || pageData[idx + 1].satker !== item.satker) {
                    isLastInSatkerGroup = true;
                }
            }

            var trStyle = isLastInSatkerGroup ? 'border-bottom: 2px solid #cbd5e1;' : '';
            tbodyHtml += '<tr style="' + trStyle + '">';

            if (kat === 'capaian-renaksi') {
                // No
                tbodyHtml += '<td class="igt-table__no">' + rowNo + '</td>';

                // Satker (Merged with rowspan when grouped by Satker)
                if (isGroupedBySatker) {
                    var span = satkerRowSpan[idx];
                    if (span > 0) {
                        var satkerItemsTotal = filtered.filter(function(x) { return x.satker === item.satker; });
                        var totalSatkerIgt = satkerItemsTotal.length;
                        var sumPct = satkerItemsTotal.reduce(function(acc, x) { return acc + (x.persentase || 0); }, 0);
                        var avgPct = (sumPct / Math.max(1, totalSatkerIgt)).toFixed(2);
                        var avgColorCls = avgPct >= 85 ? 'text-success' : (avgPct >= 70 ? 'text-warning' : 'text-danger');

                        var rowspanAttr = span > 1 ? (' rowspan="' + span + '"') : '';
                        tbodyHtml += '<td' + rowspanAttr + ' class="igt-table__merged-satker" style="vertical-align: middle; background-color: #f8fafc; border-right: 1.5px solid #e2e8f0; padding: 12px 14px;">'
                            + '<div style="font-weight: 700; color: #0f172a; font-size: 13.5px; line-height: 1.4;">' + item.satker + getRoleSatkerBadge(item.satker) + '</div>'
                            + '<div class="d-flex align-items-center gap-2 mt-1">'
                            + '<span class="badge" style="background: #e2e8f0; color: #334155; font-size: 10.5px; font-weight: 600; padding: 2px 6px; border-radius: 4px;">' + totalSatkerIgt + ' IGT</span>'
                            + '<span class="text-muted" style="font-size: 11.5px;">Rata-rata: <strong class="' + avgColorCls + '">' + avgPct + '%</strong></span>'
                            + '</div>'
                            + '</td>';
                    }
                    // if span === 0, DO NOT emit <td> for Satker because it is merged with rowspan from above
                } else {
                    // Flat view (when sorted by persentase, target, etc.)
                    tbodyHtml += '<td><span class="fw-semibold text-secondary" style="font-size: 13px;">' + item.satker + getRoleSatkerBadge(item.satker) + '</span></td>';
                }

                // IGT (Nama IGT yang jelas)
                tbodyHtml += '<td><strong style="color: #0f172a; font-size: 13.5px;">' + item.igt + '</strong></td>';

                // Target (Satuannya ditulis biasa aja, tanpa chip/badge)
                var targetDisplay = (item.target !== undefined && item.target !== null)
                    ? ('<strong>' + item.target.toLocaleString('id-ID') + '</strong> ' + (item.satuan || ''))
                    : '-';
                tbodyHtml += '<td>' + targetDisplay + '</td>';

                // Realisasi (Satuannya ditulis biasa aja, tanpa chip/badge)
                var realisasiDisplay = (item.realisasi !== undefined && item.realisasi !== null)
                    ? ('<strong>' + item.realisasi.toLocaleString('id-ID') + '</strong> ' + (item.satuan || ''))
                    : '-';
                tbodyHtml += '<td>' + realisasiDisplay + '</td>';

                // Persentase (Tanpa bar progress, ditulis angka biasa dengan pewarnaan semantik)
                var pctColorCls = item.persentase >= 85 ? 'text-success' : (item.persentase >= 70 ? 'text-warning' : 'text-danger');
                tbodyHtml += '<td><span class="fw-bold ' + pctColorCls + '" style="font-size: 14.5px;">' + item.persenStr + '</span></td>';

            } else if (kat === 'igt-akses') {
                // No
                tbodyHtml += '<td class="igt-table__no">' + rowNo + '</td>';

                // Nama IGT
                tbodyHtml += '<td><strong>' + item.igt + '</strong></td>';

                // Jenis IGT (Teks biasa, tanpa badge/chip)
                tbodyHtml += '<td>' + item.jenisIgt + '</td>';

                // Direktorat Pengampu
                tbodyHtml += '<td>' + (item.satker ? (item.satker + getRoleSatkerBadge(item.satker)) : '-') + '</td>';

                // Akses Plugin QGIS (Satuannya ditulis biasa)
                tbodyHtml += '<td>' + (item.aksesPlugin || 0).toLocaleString('id-ID') + ' kali</td>';

                // Akses Geoportal (Satuannya ditulis biasa)
                tbodyHtml += '<td>' + (item.aksesAplikasi || 0).toLocaleString('id-ID') + ' kali</td>';

                // Total Akses (Satuannya ditulis biasa)
                tbodyHtml += '<td><strong>' + (item.jumlahAkses || 0).toLocaleString('id-ID') + ' kali</strong></td>';

            } else if (kat === 'satker-login' || kat === 'direktorat-login') {
                // No
                tbodyHtml += '<td class="igt-table__no">' + rowNo + '</td>';

                // Nama Satker
                tbodyHtml += '<td><strong>' + item.satker + '</strong>' + getRoleSatkerBadge(item.satker) + '</td>';

                // Tipe Administrasi (Teks biasa, tanpa badge/chip)
                tbodyHtml += '<td>' + (item.tipe || 'Pusat') + '</td>';

                // Frekuensi Login (Satuannya ditulis biasa)
                tbodyHtml += '<td><strong>' + (item.jumlahLogin || 0).toLocaleString('id-ID') + ' kali login</strong></td>';

                // Status Keaktifan (Teks biasa)
                var statusText = (item.jumlahLogin >= 1500) ? 'Sangat Aktif' : ((item.jumlahLogin >= 700) ? 'Aktif' : 'Cukup Aktif');
                var statusCls = (item.jumlahLogin >= 1500) ? 'text-success' : ((item.jumlahLogin >= 700) ? 'text-primary' : 'text-warning');
                tbodyHtml += '<td><span class="fw-semibold ' + statusCls + '">' + statusText + '</span></td>';
            }

            tbodyHtml += '</tr>';
        });
    }
    $('#leader-board-detail-body').html(tbodyHtml);

    // Bind Sorting Events
    $('#leader-board-detail-thead th[data-key]').off('click').on('click', function() {
        var key = $(this).data('key');
        if (leaderBoardDetailState.sortCol === key) {
            leaderBoardDetailState.sortDir = (leaderBoardDetailState.sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            leaderBoardDetailState.sortCol = key;
            leaderBoardDetailState.sortDir = ((key === 'satker' && kat === 'capaian-renaksi') || key === 'persentase' || key === 'target' || key === 'realisasi' || key === 'jumlahAkses' || key === 'jumlahLogin') ? 'desc' : 'asc';
        }
        updateLeaderBoardDetailTable();
    });

    // Render Shared Pagination
    renderPaginationHtml($('#leader-board-detail-pagination'), totalPages, leaderBoardDetailState.currentPage, function(newPage) {
        leaderBoardDetailState.currentPage = newPage;
        updateLeaderBoardDetailTable();
    });
}

function exportLeaderBoardToCSV() {
    var cfg = LEADERBOARD_CONFIG[leaderBoardState.kategori] || LEADERBOARD_CONFIG['capaian-renaksi'];
    var rawData = window.MOCKUP_DATA.getLeaderBoardData(
        leaderBoardState.kategori,
        leaderBoardState.tahun,
        leaderBoardState.jenisIgt
    );

    var headers = [];
    cfg.columns.forEach(function(c) {
        headers.push('"' + c.label.replace(/"/g, '""') + '"');
    });

    var rows = [headers.join(',')];
    rawData.forEach(function(item, idx) {
        var r = idx + 1;
        var row = [];
        if (leaderBoardState.kategori === 'capaian-renaksi') {
            row.push(r);
            row.push('"' + (item.satker || '').replace(/"/g, '""') + ' [' + (item.daftarIgt || []).join(', ') + ']"');
            var tgtText = '';
            if (item.hasBidang && item.hasKawasan) {
                tgtText = item.realisasiBidang + '/' + item.targetBidang + ' Bidang; ' + item.realisasiKawasan + '/' + item.targetKawasan + ' Ha';
            } else if (item.hasBidang) {
                tgtText = item.realisasiBidang + '/' + item.targetBidang + ' Bidang';
            } else if (item.hasKawasan) {
                tgtText = item.realisasiKawasan + '/' + item.targetKawasan + ' Ha';
            }
            row.push('"' + tgtText + '"');
            row.push('"' + item.persenStr + '"');
        } else if (leaderBoardState.kategori === 'igt-akses') {
            row.push(r);
            row.push('"' + (item.igt || '').replace(/"/g, '""') + '"');
            row.push('"' + item.jumlahAkses + ' (Plugin: ' + item.aksesPlugin + ', Aplikasi: ' + item.aksesAplikasi + ')"');
        } else if (leaderBoardState.kategori === 'direktorat-login' || leaderBoardState.kategori === 'satker-login') {
            row.push(r);
            var satkerLabel = (item.satker || '') + (item.tipe ? ' (' + item.tipe + ')' : '');
            row.push('"' + satkerLabel.replace(/"/g, '""') + '"');
            row.push('"' + item.jumlahLogin + ' kali login"');
        }
        rows.push(row.join(','));
    });

    var csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(rows.join('\n'));
    var link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', 'leader_board_' + leaderBoardState.kategori + '_' + (leaderBoardState.jenisIgt || 'all') + '_' + (leaderBoardState.tahun || 'all') + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
