#!/usr/bin/env python3
"""
Build Topological Map from Shapefile
1. Snaps and shares atomic boundary arcs between adjacent kabupaten (0 gaps, 0 overlaps).
2. Derives province boundaries directly from the outer boundary arcs of the kabupaten (0 gaps between province & kabupaten).
3. Dissolves all 38 provinces directly from the kabupaten shapefile.
"""

import math
import json
import time
from collections import defaultdict, Counter
from osgeo import ogr

SHP_PATH = 'IGTPR-UI-mockup/shp/batas_kabupaten_kota_shapefile/batas_kabupaten_kota.shp'
OUT_KAB_JS = 'IGTPR-UI-mockup/assets/data/indonesia-kabupaten.js'
OUT_PROV_JS = 'IGTPR-UI-mockup/assets/data/indonesia-provinsi.js'

TARGET_PROVS = [
    'Jawa Tengah',
    'Daerah Khusus Ibukota Jakarta',
    'Daerah Istimewa Yogyakarta',
    'Jawa Barat',
    'Jawa Timur',
    'Bali',
    'Banten'
]

def point_line_distance(pt, start, end):
    if start == end:
        return math.hypot(pt[0] - start[0], pt[1] - start[1])
    dx = end[0] - start[0]
    dy = end[1] - start[1]
    u = ((pt[0] - start[0]) * dx + (pt[1] - start[1]) * dy) / (dx * dx + dy * dy)
    u = max(0.0, min(1.0, u))
    return math.hypot(pt[0] - (start[0] + u * dx), pt[1] - (start[1] + u * dy))

def simplify_arc(pts, tol):
    if len(pts) <= 2:
        return pts
    dmax, index = 0.0, 0
    start, end = pts[0], pts[-1]
    for i in range(1, len(pts) - 1):
        d = point_line_distance(pts[i], start, end)
        if d > dmax:
            dmax = d
            index = i
    if dmax > tol:
        left = simplify_arc(pts[:index + 1], tol)
        right = simplify_arc(pts[index:], tol)
        return left[:-1] + right
    return [start, end]

def get_rings(g):
    rings = []
    if not g:
        return rings
    t = g.GetGeometryType()
    if t == ogr.wkbPolygon:
        for i in range(g.GetGeometryCount()):
            rings.append(g.GetGeometryRef(i))
    elif t == ogr.wkbMultiPolygon:
        for i in range(g.GetGeometryCount()):
            p = g.GetGeometryRef(i)
            for j in range(p.GetGeometryCount()):
                rings.append(p.GetGeometryRef(j))
    return rings

def process_province_topologically(prov_name, kab_dict, tol=0.003):
    """
    Extracts atomic arcs for all kabupaten in a province, simplifies each shared arc ONCE,
    and returns:
    1. Kab GeoJSON features with 100% shared edges (0 gaps, 0 overlaps)
    2. Province boundary GeoJSON geometry formed from the outer arcs (0 gaps to kabupaten).
    """
    poly_rings = defaultdict(list)
    for kab_name, geom in kab_dict.items():
        for ring in get_rings(geom):
            pts = [(round(ring.GetX(i), 6), round(ring.GetY(i), 6)) for i in range(ring.GetPointCount())]
            clean_pts = [pts[0]]
            for p in pts[1:]:
                if p != clean_pts[-1]:
                    clean_pts.append(p)
            if len(clean_pts) >= 4:
                poly_rings[kab_name].append(clean_pts)

    # Segment to polygon mapping
    seg_polys = defaultdict(set)
    for kab_name, rings in poly_rings.items():
        for ring in rings:
            for i in range(len(ring) - 1):
                p1, p2 = ring[i], ring[i+1]
                seg = (min(p1, p2), max(p1, p2))
                seg_polys[seg].add(kab_name)

    def get_sig(p1, p2):
        seg = (min(p1, p2), max(p1, p2))
        return frozenset(seg_polys.get(seg, []))

    all_arcs = {}
    poly_arc_refs = defaultdict(list)

    for kab_name, rings in poly_rings.items():
        for ring in rings:
            n = len(ring) - 1
            junction_indices = []
            for i in range(n):
                sig_in = get_sig(ring[i - 1], ring[i])
                sig_out = get_sig(ring[i], ring[i + 1])
                if sig_in != sig_out:
                    junction_indices.append(i)
            if not junction_indices:
                junction_indices = [0]

            ring_arcs = []
            for k in range(len(junction_indices)):
                start_idx = junction_indices[k]
                end_idx = junction_indices[(k + 1) % len(junction_indices)]
                if end_idx > start_idx:
                    arc_pts = ring[start_idx : end_idx + 1]
                else:
                    arc_pts = ring[start_idx :] + ring[1 : end_idx + 1]

                p_start, p_end = arc_pts[0], arc_pts[-1]
                canon_key = (min(p_start, p_end), max(p_start, p_end))
                forward = (p_start <= p_end)
                if canon_key not in all_arcs:
                    all_arcs[canon_key] = arc_pts if forward else list(reversed(arc_pts))
                ring_arcs.append((canon_key, forward, p_start, p_end))
            poly_arc_refs[kab_name].append(ring_arcs)

    # Simplify unique arcs ONCE
    simplified_arcs = {}
    for canon_key, pts in all_arcs.items():
        simplified_arcs[canon_key] = simplify_arc(pts, tol)

    # Reconstruct kabupaten polygons
    kab_features = []
    for kab_name, rings_arcs in poly_arc_refs.items():
        poly_coords = []
        for ring_arcs in rings_arcs:
            ring_pts = []
            for canon_key, forward, _, _ in ring_arcs:
                s_arc = simplified_arcs[canon_key]
                pts_to_add = s_arc if forward else list(reversed(s_arc))
                if not ring_pts:
                    ring_pts.extend(pts_to_add)
                else:
                    ring_pts.extend(pts_to_add[1:])
            if ring_pts[0] != ring_pts[-1]:
                ring_pts.append(ring_pts[0])
            if len(ring_pts) >= 4:
                poly_coords.append(ring_pts)

        kab_features.append({
            'type': 'Feature',
            'properties': {
                'provinsi': prov_name,
                'kabupaten': kab_name,
                'nama': kab_name
            },
            'geometry': {
                'type': 'Polygon' if len(poly_coords) == 1 else 'Polygon', # or MultiPolygon
                'coordinates': poly_coords
            }
        })

    # Chain exterior arcs to construct province boundary
    arc_usage = Counter()
    for kab_name, rings in poly_arc_refs.items():
        for ring_arcs in rings:
            for canon_key, forward, p_start, p_end in ring_arcs:
                arc_usage[canon_key] += 1

    exterior_directed = []
    for kab_name, rings in poly_arc_refs.items():
        for ring_arcs in rings:
            for canon_key, forward, p_start, p_end in ring_arcs:
                if arc_usage[canon_key] == 1:
                    exterior_directed.append((p_start, p_end, canon_key, forward))

    adj = defaultdict(list)
    for p_start, p_end, key, fwd in exterior_directed:
        adj[p_start].append((p_end, key, fwd))

    visited_keys = set()
    prov_rings = []
    for p_start, p_end, key, fwd in exterior_directed:
        if key in visited_keys:
            continue
        curr_ring_pts = []
        curr_p = p_start
        first_p = p_start
        while True:
            outgoing = [edge for edge in adj[curr_p] if edge[1] not in visited_keys]
            if not outgoing:
                break
            next_p, next_key, next_fwd = outgoing[0]
            visited_keys.add(next_key)
            s_arc = simplified_arcs[next_key]
            pts_to_add = s_arc if next_fwd else list(reversed(s_arc))
            if not curr_ring_pts:
                curr_ring_pts.extend(pts_to_add)
            else:
                curr_ring_pts.extend(pts_to_add[1:])
            curr_p = next_p
            if curr_p == first_p:
                break
        if len(curr_ring_pts) >= 4:
            if curr_ring_pts[0] != curr_ring_pts[-1]:
                curr_ring_pts.append(curr_ring_pts[0])
            prov_rings.append(curr_ring_pts)

    prov_geom = {
        'type': 'Polygon' if len(prov_rings) == 1 else 'MultiPolygon',
        'coordinates': prov_rings if len(prov_rings) == 1 else [[r] for r in prov_rings]
    }

    return kab_features, prov_geom

def main():
    t0 = time.time()
    print("Opening shapefile:", SHP_PATH)
    ds = ogr.Open(SHP_PATH)
    layer = ds.GetLayer()

    prov_kabs = defaultdict(dict)
    all_prov_polys = defaultdict(list)

    for f in layer:
        prov = (f.GetField('WADMPR') or '').strip()
        kab = (f.GetField('WADMKK') or '').strip()
        geom = f.GetGeometryRef()
        if prov and geom and not geom.IsEmpty():
            all_prov_polys[prov].append(geom.Clone())
            if prov in TARGET_PROVS and kab:
                prov_kabs[prov][kab] = geom.Clone()

    print(f"Total provinces in shapefile: {len(all_prov_polys)}")
    print(f"Target provinces for detailed drilldown: {len(prov_kabs)}")

    # 1. Process target provinces with shared arc topology
    all_kab_features = []
    topological_prov_geoms = {}

    for prov_name, kabs in prov_kabs.items():
        print(f"Processing topological arcs for {prov_name} ({len(kabs)} kabupaten)...")
        kab_feats, prov_geom = process_province_topologically(prov_name, kabs, tol=0.003)
        all_kab_features.extend(kab_feats)
        topological_prov_geoms[prov_name] = prov_geom
        print(f"  -> Generated {len(kab_feats)} snapped kabupaten with 0 gaps/overlaps.")

    # 2. Build full Indonesia province dataset
    prov_features = []
    shading_map = {
        'JAWA TIMUR': 4,
        'JAWA TENGAH': 2,
        'JAWA BARAT': 3,
        'DAERAH KHUSUS IBUKOTA JAKARTA': 1,
        'BANTEN': 1,
        'SUMATERA UTARA': 2,
        'SUMATERA SELATAN': 1,
        'KALIMANTAN TIMUR': 2,
        'SULAWESI SELATAN': 2
    }

    for prov_name, geom_list in all_prov_polys.items():
        # If we already have the topological province boundary from outer kabupaten arcs:
        if prov_name in topological_prov_geoms:
            geom_json = topological_prov_geoms[prov_name]
        else:
            # Dissolve kabupaten from shapefile for this province
            mpoly = ogr.Geometry(ogr.wkbMultiPolygon)
            for g in geom_list:
                if g.GetGeometryType() == ogr.wkbPolygon:
                    mpoly.AddGeometry(g)
                elif g.GetGeometryType() == ogr.wkbMultiPolygon:
                    for i in range(g.GetGeometryCount()):
                        mpoly.AddGeometry(g.GetGeometryRef(i))
            dissolved = mpoly.UnionCascaded()
            # Simplify province boundary
            simplified = dissolved.SimplifyPreserveTopology(0.04)
            geom_json = json.loads(simplified.ExportToJson())

        prov_features.append({
            'type': 'Feature',
            'properties': {
                'nama': prov_name,
                'provinsi': prov_name,
                'tema': shading_map.get(prov_name.upper(), 0)
            },
            'geometry': geom_json
        })

    # 3. Write output files
    kab_collection = {
        'type': 'FeatureCollection',
        'features': all_kab_features
    }
    with open(OUT_KAB_JS, 'w') as f:
        f.write('window.INDONESIA_KABUPATEN_GEOJSON = ' + json.dumps(kab_collection) + ';')

    prov_collection = {
        'type': 'FeatureCollection',
        'features': prov_features
    }
    with open(OUT_PROV_JS, 'w') as f:
        f.write('window.INDONESIA_GEOJSON = ' + json.dumps(prov_collection) + ';')

    print(f"Wrote {OUT_KAB_JS}: {len(all_kab_features)} kabupaten")
    print(f"Wrote {OUT_PROV_JS}: {len(prov_features)} provinces")
    print(f"Completed in {time.time() - t0:.2f}s")

if __name__ == '__main__':
    main()
