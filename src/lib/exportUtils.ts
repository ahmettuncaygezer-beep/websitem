// lib/exportUtils.ts — Client-side CSV / Excel export for admin panel

import * as XLSX from 'xlsx';

/* ────────────────────────────────────────────────────────────────────────────
   Column definitions per data type
   ──────────────────────────────────────────────────────────────────────────── */

export interface ExportColumn {
    header: string;
    accessor: (row: any) => string | number;
}

// ── Orders ─────────────────────────────────────────────────────────────────
export const ORDER_COLUMNS: ExportColumn[] = [
    { header: 'Sipariş No', accessor: r => r.orderNo },
    { header: 'Tarih', accessor: r => formatDateStr(r.createdAt) },
    { header: 'Müşteri Adı', accessor: r => r.customer?.name ?? '' },
    { header: 'E-posta', accessor: r => r.customer?.email ?? '' },
    { header: 'Telefon', accessor: r => r.customer?.phone ?? '' },
    {
        header: 'Teslimat Adresi',
        accessor: r => {
            const a = r.shippingAddress;
            if (!a) return '';
            return [a.address, a.district, a.city].filter(Boolean).join(', ');
        },
    },
    {
        header: 'Ürünler',
        accessor: r =>
            (r.items || [])
                .map((i: any) => `${i.productName}${i.variantName ? ' (' + i.variantName + ')' : ''} x${i.quantity}`)
                .join(' | '),
    },
    { header: 'Toplam Tutar', accessor: r => r.total ?? 0 },
    { header: 'Ödeme Yöntemi', accessor: r => r.paymentMethod?.type ?? '' },
    { header: 'Durum', accessor: r => r.status },
];

// ── Customers ──────────────────────────────────────────────────────────────
export const CUSTOMER_COLUMNS: ExportColumn[] = [
    { header: 'Müşteri ID', accessor: r => r.id },
    { header: 'Ad Soyad', accessor: r => `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim() },
    { header: 'E-posta', accessor: r => r.email ?? '' },
    { header: 'Telefon', accessor: r => r.phone ?? '' },
    { header: 'Kayıt Tarihi', accessor: r => formatDateStr(r.registeredAt) },
    { header: 'Toplam Sipariş', accessor: r => r.totalOrders ?? 0 },
    { header: 'Toplam Harcama', accessor: r => r.totalSpent ?? 0 },
    { header: 'Son Sipariş Tarihi', accessor: r => r.lastOrderAt ? formatDateStr(r.lastOrderAt) : '-' },
    { header: 'VIP', accessor: r => r.segment === 'VIP' ? 'Evet' : 'Hayır' },
];

// ── Products ───────────────────────────────────────────────────────────────
export const PRODUCT_COLUMNS: ExportColumn[] = [
    { header: 'Ürün ID', accessor: r => r.id },
    { header: 'Ürün Adı', accessor: r => r.name },
    { header: 'Kategori', accessor: r => r.category ?? '' },
    { header: 'Fiyat', accessor: r => r.price ?? 0 },
    { header: 'İndirimli Fiyat', accessor: r => r.comparePrice && r.comparePrice > 0 ? r.comparePrice : '-' },
    { header: 'Stok', accessor: r => r.stock ?? 0 },
    { header: 'Durum', accessor: r => r.status ?? '' },
    { header: 'Son Güncelleme', accessor: r => formatDateStr(r.updatedAt) },
];

/* ────────────────────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────────────────────── */

function formatDateStr(iso: string | undefined | null): string {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
        return iso;
    }
}

function getColumns(type: 'orders' | 'customers' | 'products'): ExportColumn[] {
    switch (type) {
        case 'orders': return ORDER_COLUMNS;
        case 'customers': return CUSTOMER_COLUMNS;
        case 'products': return PRODUCT_COLUMNS;
    }
}

function getFilePrefix(type: 'orders' | 'customers' | 'products'): string {
    switch (type) {
        case 'orders': return 'siparisler';
        case 'customers': return 'musteriler';
        case 'products': return 'urunler';
    }
}

function todayStr(): string {
    return new Date().toISOString().slice(0, 10);
}

/* ────────────────────────────────────────────────────────────────────────────
   CSV export — manual, with UTF-8 BOM for Excel compatibility
   ──────────────────────────────────────────────────────────────────────────── */

function escapeCsvValue(val: string | number): string {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

export function exportCSV(data: any[], type: 'orders' | 'customers' | 'products') {
    const columns = getColumns(type);
    const header = columns.map(c => escapeCsvValue(c.header)).join(',');
    const rows = data.map(row =>
        columns.map(c => escapeCsvValue(c.accessor(row))).join(',')
    );

    // UTF-8 BOM so Excel reads Turkish characters correctly
    const BOM = '\uFEFF';
    const csvContent = BOM + header + '\n' + rows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${getFilePrefix(type)}-${todayStr()}.csv`);
}

/* ────────────────────────────────────────────────────────────────────────────
   Excel export — via xlsx (SheetJS)
   ──────────────────────────────────────────────────────────────────────────── */

export function exportExcel(data: any[], type: 'orders' | 'customers' | 'products') {
    const columns = getColumns(type);

    // Build worksheet data: header row + data rows
    const wsData = [
        columns.map(c => c.header),
        ...data.map(row => columns.map(c => c.accessor(row))),
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Auto-size columns
    ws['!cols'] = columns.map((col, i) => {
        const maxLen = Math.max(
            col.header.length,
            ...data.slice(0, 50).map(row => String(col.accessor(row)).length)
        );
        return { wch: Math.min(maxLen + 4, 50) };
    });

    const sheetName = type === 'orders' ? 'Siparişler' : type === 'customers' ? 'Müşteriler' : 'Ürünler';
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    XLSX.writeFile(wb, `${getFilePrefix(type)}-${todayStr()}.xlsx`);
}

/* ────────────────────────────────────────────────────────────────────────────
   Download helper
   ──────────────────────────────────────────────────────────────────────────── */

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
