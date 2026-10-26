/**
 * IGTPR Mockup UI - Beranda: Usulan Input Data, Kompilasi Integrasi & modal
 */

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
        var titleText = kat.label + ': ' + kat.jumlah + ' data / ' + layerCount + ' IGT (Klik untuk melihat rincian)';

        progresHtml += '<div class="igt-progres__ruas ' + (kat.kelas || '') + kelasNol + ' igt-progres__ruas--' + (idx + 1) + '" style="' + inlineStyle + '" title="' + titleText + '" data-status="' + kat.kunci + '"></div>';

        rincianHtml += '<div class="igt-rincian__item ' + kat.kelas + '" data-status="' + kat.kunci + '" title="Klik untuk melihat data ' + kat.label + ' (' + kat.jumlah + ' data)">'
            + '<span class="igt-rincian__titik"></span>'
            + '<div class="igt-rincian__isi">'
            + '<div class="igt-rincian__angka"><strong>' + kat.jumlah + '</strong><span>data</span><span class="igt-rincian__pemisah">/</span><strong>' + layerCount + '</strong><span>IGT</span></div>'
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
