'use client';

import { useCallback } from 'react';

export function useExport() {
    const exportPDF = useCallback(async (
        planName: string,
        roomInfo: { width: number; depth: number; height: number },
        furniture: { name: string; dimensions: { width: number; depth: number }; price: number }[],
    ) => {
        const { default: jsPDF } = await import('jspdf');
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

        // Header
        doc.setFillColor(28, 28, 30);
        doc.rect(0, 0, 297, 20, 'F');
        doc.setTextColor(201, 169, 110);
        doc.setFontSize(14);
        doc.text('MAISON', 15, 13);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text(`${planName} — Oda Planı`, 60, 13);
        doc.setFontSize(8);
        doc.text(new Date().toLocaleDateString('tr-TR'), 260, 13);

        // Room info
        doc.setTextColor(28, 28, 30);
        doc.setFontSize(11);
        doc.text('Oda Bilgileri', 15, 32);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const area = (roomInfo.width * roomInfo.depth).toFixed(1);
        doc.text(`Boyut: ${roomInfo.width} × ${roomInfo.depth} × ${roomInfo.height} m  |  Alan: ${area} m²`, 15, 39);

        // Furniture table
        doc.setTextColor(28, 28, 30);
        doc.setFontSize(11);
        doc.text('Mobilya Listesi', 15, 52);

        let y = 60;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('#', 15, y); doc.text('Ürün Adı', 25, y); doc.text('Boyut', 140, y); doc.text('Fiyat', 190, y);
        y += 5;
        doc.setDrawColor(230, 230, 230); doc.line(15, y, 230, y); y += 4;

        let total = 0;
        doc.setTextColor(28, 28, 30);
        furniture.forEach((f, i) => {
            doc.text(`${i + 1}`, 15, y);
            doc.text(f.name, 25, y);
            doc.text(`${(f.dimensions.width * 100).toFixed(0)}×${(f.dimensions.depth * 100).toFixed(0)} cm`, 140, y);
            doc.text(`₺${f.price.toLocaleString('tr-TR')}`, 190, y);
            total += f.price;
            y += 7;
            if (y > 190) { doc.addPage(); y = 20; }
        });

        y += 3;
        doc.line(15, y, 230, y); y += 6;
        doc.setFontSize(10);
        doc.text('TOPLAM', 140, y);
        doc.setTextColor(201, 169, 110);
        doc.text(`₺${total.toLocaleString('tr-TR')}`, 190, y);

        // Footer
        doc.setTextColor(180, 180, 180);
        doc.setFontSize(7);
        doc.text('maison.com.tr', 15, 200);

        doc.save(`${planName.replace(/\s+/g, '_')}_plan.pdf`);
    }, []);

    return { exportPDF };
}
