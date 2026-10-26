/**
 * IGTPR Mockup UI - Beranda: Grafik spline
 */

/* ----------------------------------------------------
   8. Line & Area Spline Charts (Statistik Akses & Log)
----------------------------------------------------- */
var statistikAksesGrafikMetric = 'user';

function generateSplinePath(points, top, bottom) {
    if (!points || points.length < 2) return '';
    var d = 'M ' + points[0].x.toFixed(1) + ' ' + points[0].y.toFixed(1);
    for (var i = 0; i < points.length - 1; i++) {
        var p0 = points[Math.max(0, i - 1)];
        var p1 = points[i];
        var p2 = points[i + 1];
        var p3 = points[Math.min(points.length - 1, i + 2)];

        var cp1x = p1.x + (p2.x - p0.x) / 6;
        var cp1y = p1.y + (p2.y - p0.y) / 6;
        var cp2x = p2.x - (p3.x - p1.x) / 6;
        var cp2y = p2.y - (p3.y - p1.y) / 6;

        if (p1.val === 0 && p2.val === 0) {
            cp1y = bottom;
            cp2y = bottom;
        }
        if (p1.val === 0 && p2.val > 0) {
            cp1y = bottom;
        }
        if (p1.val > 0 && p2.val === 0) {
            cp2y = bottom;
        }

        cp1y = Math.min(bottom, Math.max(top, cp1y));
        cp2y = Math.min(bottom, Math.max(top, cp2y));

        d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' + cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    return d;
}

function renderStatistikAksesGrafik(ctrl) {
    var $canvas = $('#statistik-akses-chart-canvas');
    if (!$canvas.length) return;

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    var metric = statistikAksesGrafikMetric || 'user';

    // Base values from user screenshot
    var rawValues = [0, 0, 0, 0, 0, 10, 75, 415, 42, 525, 0, 0];
    var metricLabel = 'Total Akses Login';
    var maxY = 600;
    var ticks = [600, 500, 400, 300, 200, 100, 0];

    if (metric === 'plugin') {
        rawValues = [0, 0, 0, 0, 0, 8, 52, 280, 28, 355, 0, 0];
        metricLabel = 'Akses Plugin QGIS';
        maxY = 400;
        ticks = [400, 300, 200, 100, 0];
    } else if (metric === 'geoportal') {
        rawValues = [0, 0, 0, 0, 0, 2, 23, 135, 14, 170, 0, 0];
        metricLabel = 'Akses Geoportal';
        maxY = 200;
        ticks = [200, 150, 100, 50, 0];
    } else if (metric === 'total') {
        rawValues = [0, 0, 0, 0, 0, 10, 75, 415, 42, 525, 0, 0];
        metricLabel = 'Total Akses';
        maxY = 600;
        ticks = [600, 500, 400, 300, 200, 100, 0];
    }

    // Role scaling
    var roleScale = 1.0;
    if (currentActiveRole === 'sppr') roleScale = 0.65;
    else if (currentActiveRole === 'kanwil-diy') roleScale = 0.35;
    else if (currentActiveRole === 'kantah-gunungkidul') roleScale = 0.15;

    var values = rawValues.map(function(v) {
        return Math.round(v * roleScale);
    });

    if (roleScale < 1.0) {
        var maxV = Math.max.apply(null, values);
        if (maxV <= 100) { maxY = 100; ticks = [100, 80, 60, 40, 20, 0]; }
        else if (maxV <= 250) { maxY = 250; ticks = [250, 200, 150, 100, 50, 0]; }
        else if (maxV <= 400) { maxY = 400; ticks = [400, 300, 200, 100, 0]; }
    }

    var left = 60;
    var right = 970;
    var top = 25;
    var bottom = 300;
    var plotW = right - left;
    var plotH = bottom - top;

    var points = values.map(function(v, idx) {
        return {
            x: left + (idx * (plotW / 11)),
            y: bottom - ((v / maxY) * plotH),
            val: v,
            month: months[idx]
        };
    });

    var splinePath = generateSplinePath(points, top, bottom);
    var areaPath = splinePath + ' L ' + right + ' ' + bottom + ' L ' + left + ' ' + bottom + ' Z';

    var svg = '<svg class="igt-chart-svg" viewBox="0 0 1000 350" preserveAspectRatio="none">';
    svg += '<defs>';
    svg += '  <linearGradient id="gradient-akses-area" x1="0" y1="0" x2="0" y2="1">';
    svg += '    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.22" />';
    svg += '    <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.01" />';
    svg += '  </linearGradient>';
    svg += '</defs>';

    // Horizontal Grid Lines & Y-Axis Labels
    ticks.forEach(function(tVal) {
        var yPos = bottom - ((tVal / maxY) * plotH);
        svg += '<line x1="' + left + '" y1="' + yPos + '" x2="' + right + '" y2="' + yPos + '" class="igt-chart-grid-line" stroke="#f1f5f9" stroke-width="1.2" />';
        svg += '<text x="' + (left - 12) + '" y="' + (yPos + 4) + '" class="igt-chart-axis-text" text-anchor="end" font-size="11.5px" fill="#94a3b8">' + tVal.toLocaleString('id-ID') + '</text>';
    });

    // Baseline Sparkline Waveform Icon
    svg += '<g transform="translate(' + (left - 24) + ', ' + (bottom - 12) + ')">';
    svg += '  <path d="M 0 12 L 5 12 L 9 5 L 14 16 L 18 8 L 22 12 L 28 12" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />';
    svg += '</g>';

    // X-Axis Month Labels
    points.forEach(function(pt) {
        svg += '<text x="' + pt.x + '" y="' + (bottom + 25) + '" class="igt-chart-x-label" text-anchor="middle" font-size="11px" fill="#94a3b8">' + pt.month + '</text>';
    });

    // Spline Area Fill
    svg += '<path d="' + areaPath + '" fill="url(#gradient-akses-area)" />';

    // Spline Line Stroke
    svg += '<path d="' + splinePath + '" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />';

    // Hover Elements
    svg += '<line id="statistik-akses-hover-line" x1="0" y1="' + top + '" x2="0" y2="' + bottom + '" stroke="#93c5fd" stroke-dasharray="3 3" stroke-width="1.5" style="display:none;" />';
    svg += '<circle id="statistik-akses-hover-dot" cx="0" cy="0" r="5.5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" style="display:none;" />';

    // Interactive Hit Columns
    var colWidth = plotW / 11;
    points.forEach(function(pt, idx) {
        svg += '<rect x="' + (pt.x - colWidth / 2) + '" y="' + top + '" width="' + colWidth + '" height="' + plotH + '" fill="transparent" class="igt-chart-hit-col" data-idx="' + idx + '" data-month="' + pt.month + '" data-val="' + pt.val + '" data-x="' + pt.x + '" data-y="' + pt.y + '" style="cursor: pointer;" />';
    });

    svg += '</svg>';
    svg += '<div class="igt-chart-tooltip" id="statistik-akses-chart-tooltip"></div>';

    $canvas.html(svg);

    // Bind Tooltip and Hover Crosshair
    var $tooltip = $('#statistik-akses-chart-tooltip');
    var $hoverLine = $('#statistik-akses-hover-line');
    var $hoverDot = $('#statistik-akses-hover-dot');

    $canvas.find('.igt-chart-hit-col').off('mouseenter mousemove mouseleave')
        .on('mouseenter mousemove', function(e) {
            var $col = $(this);
            var m = $col.data('month');
            var v = parseInt($col.data('val'), 10) || 0;
            var ptX = parseFloat($col.data('x'));
            var ptY = parseFloat($col.data('y'));

            $hoverLine.attr({ x1: ptX, x2: ptX }).show();
            $hoverDot.attr({ cx: ptX, cy: ptY }).show();

            var yearStr = currentDashboardYear !== 'all' ? currentDashboardYear : '2026';
            var html = '<div class="igt-chart-tooltip__title">' + m + ' ' + yearStr + '</div>';
            html += '<div style="margin-top: 4px; font-size: 11.5px; display: flex; align-items: center; gap: 6px;">';
            html += '  <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#3b82f6;"></span>';
            html += '  ' + metricLabel + ': <strong>' + v.toLocaleString('id-ID') + '</strong>';
            html += '</div>';

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
            $hoverLine.hide();
            $hoverDot.hide();
            $tooltip.removeClass('is-visible');
        });
}

function renderAktivitasLogGrafik(ctrl) {
    var $canvas = $('#aktivitas-log-chart-canvas');
    if (!$canvas.length) return;

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    // Base values from user screenshot
    var rawValues = [0, 0, 0, 0, 0, 12, 58, 480, 52, 885, 0, 0];
    var maxY = 1000;
    var ticks = [1000, 800, 600, 400, 200, 0];

    // Role scaling
    var roleScale = 1.0;
    if (currentActiveRole === 'sppr') roleScale = 0.6;
    else if (currentActiveRole === 'kanwil-diy') roleScale = 0.35;
    else if (currentActiveRole === 'kantah-gunungkidul') roleScale = 0.15;

    var values = rawValues.map(function(v) {
        return Math.round(v * roleScale);
    });

    if (roleScale < 1.0) {
        var maxV = Math.max.apply(null, values);
        if (maxV <= 200) { maxY = 200; ticks = [200, 150, 100, 50, 0]; }
        else if (maxV <= 500) { maxY = 500; ticks = [500, 400, 300, 200, 100, 0]; }
    }

    var left = 60;
    var right = 970;
    var top = 25;
    var bottom = 300;
    var plotW = right - left;
    var plotH = bottom - top;

    var points = values.map(function(v, idx) {
        return {
            x: left + (idx * (plotW / 11)),
            y: bottom - ((v / maxY) * plotH),
            val: v,
            month: months[idx]
        };
    });

    var splinePath = generateSplinePath(points, top, bottom);
    var areaPath = splinePath + ' L ' + right + ' ' + bottom + ' L ' + left + ' ' + bottom + ' Z';

    var svg = '<svg class="igt-chart-svg" viewBox="0 0 1000 350" preserveAspectRatio="none">';
    svg += '<defs>';
    svg += '  <linearGradient id="gradient-log-area" x1="0" y1="0" x2="0" y2="1">';
    svg += '    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.22" />';
    svg += '    <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.01" />';
    svg += '  </linearGradient>';
    svg += '</defs>';

    // Horizontal Grid Lines & Y-Axis Labels
    ticks.forEach(function(tVal) {
        var yPos = bottom - ((tVal / maxY) * plotH);
        svg += '<line x1="' + left + '" y1="' + yPos + '" x2="' + right + '" y2="' + yPos + '" class="igt-chart-grid-line" stroke="#f1f5f9" stroke-width="1.2" />';
        svg += '<text x="' + (left - 12) + '" y="' + (yPos + 4) + '" class="igt-chart-axis-text" text-anchor="end" font-size="11.5px" fill="#94a3b8">' + tVal.toLocaleString('id-ID') + '</text>';
    });

    // Baseline Sparkline Waveform Icon
    svg += '<g transform="translate(' + (left - 24) + ', ' + (bottom - 12) + ')">';
    svg += '  <path d="M 0 12 L 5 12 L 9 5 L 14 16 L 18 8 L 22 12 L 28 12" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />';
    svg += '</g>';

    // X-Axis Month Labels
    points.forEach(function(pt) {
        svg += '<text x="' + pt.x + '" y="' + (bottom + 25) + '" class="igt-chart-x-label" text-anchor="middle" font-size="11px" fill="#94a3b8">' + pt.month + '</text>';
    });

    // Spline Area Fill
    svg += '<path d="' + areaPath + '" fill="url(#gradient-log-area)" />';

    // Spline Line Stroke
    svg += '<path d="' + splinePath + '" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />';

    // Hover Elements
    svg += '<line id="aktivitas-log-hover-line" x1="0" y1="' + top + '" x2="0" y2="' + bottom + '" stroke="#93c5fd" stroke-dasharray="3 3" stroke-width="1.5" style="display:none;" />';
    svg += '<circle id="aktivitas-log-hover-dot" cx="0" cy="0" r="5.5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" style="display:none;" />';

    // Interactive Hit Columns
    var colWidth = plotW / 11;
    points.forEach(function(pt, idx) {
        svg += '<rect x="' + (pt.x - colWidth / 2) + '" y="' + top + '" width="' + colWidth + '" height="' + plotH + '" fill="transparent" class="igt-chart-hit-col" data-idx="' + idx + '" data-month="' + pt.month + '" data-val="' + pt.val + '" data-x="' + pt.x + '" data-y="' + pt.y + '" style="cursor: pointer;" />';
    });

    svg += '</svg>';
    svg += '<div class="igt-chart-tooltip" id="aktivitas-log-chart-tooltip"></div>';

    $canvas.html(svg);

    // Bind Tooltip and Hover Crosshair
    var $tooltip = $('#aktivitas-log-chart-tooltip');
    var $hoverLine = $('#aktivitas-log-hover-line');
    var $hoverDot = $('#aktivitas-log-hover-dot');

    $canvas.find('.igt-chart-hit-col').off('mouseenter mousemove mouseleave')
        .on('mouseenter mousemove', function(e) {
            var $col = $(this);
            var m = $col.data('month');
            var v = parseInt($col.data('val'), 10) || 0;
            var ptX = parseFloat($col.data('x'));
            var ptY = parseFloat($col.data('y'));

            $hoverLine.attr({ x1: ptX, x2: ptX }).show();
            $hoverDot.attr({ cx: ptX, cy: ptY }).show();

            var yearStr = currentDashboardYear !== 'all' ? currentDashboardYear : '2026';
            var html = '<div class="igt-chart-tooltip__title">' + m + ' ' + yearStr + '</div>';
            html += '<div style="margin-top: 4px; font-size: 11.5px; display: flex; align-items: center; gap: 6px;">';
            html += '  <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#3b82f6;"></span>';
            html += '  Total Log: <strong>' + v.toLocaleString('id-ID') + '</strong>';
            html += '</div>';

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
            $hoverLine.hide();
            $hoverDot.hide();
            $tooltip.removeClass('is-visible');
        });
}

// Bind Metric Dropdown Selection for Statistik Akses IGT
$(document).on('click', '#statistik-akses-grafik-metric-panel .igt-dropdown__item', function(e) {
    e.preventDefault();
    var metric = $(this).data('metric') || 'user';
    statistikAksesGrafikMetric = metric;
    $('#statistik-akses-grafik-metric-panel .igt-dropdown__item').removeClass('is-active');
    $(this).addClass('is-active');
    $('#statistik-akses-grafik-metric-label').text($(this).text().trim());
    $('#statistik-akses-grafik-metric-panel').removeClass('is-open');

    if (metric === 'user') {
        $('#statistik-akses-chart-legend-label').text('Total Akses Login');
    } else if (metric === 'plugin') {
        $('#statistik-akses-chart-legend-label').text('Akses Plugin QGIS');
    } else if (metric === 'geoportal') {
        $('#statistik-akses-chart-legend-label').text('Akses Geoportal');
    } else if (metric === 'total') {
        $('#statistik-akses-chart-legend-label').text('Total Akses');
    }

    if (tableControllers['statistik-akses']) {
        renderStatistikAksesGrafik(tableControllers['statistik-akses']);
    }
});
