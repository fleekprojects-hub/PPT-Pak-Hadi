# KiiWii.Bee — Mobile Barcode Stock Opname (Executive Pitch Deck)

Dokumen presentasi eksekutif dan demonstrasi sistem stock opname berbasis scanner kamera HP Android untuk **KiiWii.Bee (Attn: Pak Dominicus Hadi — Owner)**.

Dirancang khusus dengan estetika **Arasaka Cyber Dark (`#111110` base)** berpadu aksen **Warm Terracotta Linen (`#e07a5f`)**, **Electric Cyber Cyan (`#06b6d4`)**, tipografi **Outfit** & **Space Grotesk**, serta transisi animasi Anime.js.

---

## 🧭 Struktur 7 Slide Presentasi Eksekutif (Simplified MVP)

| No | Slide ID | Judul & Fokus Utama |
| :---: | :--- | :--- |
| **01** | `slide-1` | **Executive Cover & Core Promise:** KiiWii Mobile Stock Opname: Scan barcode kamera HP, hitung selisih otomatis, tanpa kertas. 100% kompatibel dengan file Excel Jubelio. |
| **02** | `slide-2` | **Realitas Sebelum vs Sesudah:** Membandingkan proses lama (print kertas 249 baris SKU Jubelio, keliling toko bawa pulpen & papan ujian, 3–4 jam) vs Solusi Fleek (15–20 menit selesai, zero salah ketik). |
| **03** | `slide-3` | **Alur Kerja 3 Langkah Sederhana:** (1) Impor Excel Jubelio `persediaan_gudang.xlsx` ➔ (2) Scan Barcode Code 128 lewat kamera HP dengan audio beep ➔ (3) Cek selisih fisik vs sistem & ekspor Excel. |
| **04** | `slide-4` | **🔥 LIVE INTERACTIVE DEMO:** Simulator Web Audio Synth (Beep 1× normal, Beep 2× target pas/ganda, Low Buzz SKU asing) + Simulasi scan SKU asli KiiWii (`K591BR`, `k407AR`, `C122`, `R214 only`) + Scanner kamera live. |
| **05** | `slide-5` | **Arsitektur Ringan (100% Web-Based PWA):** Akses instan via browser Chrome/Safari tanpa instalasi APK mencurigakan, kedaulatan data di spreadsheet privat KiiWii, independen tanpa API Jubelio, auto-trim nomor batch print "330". |
| **06** | `slide-6` | **Paket Investasi Beli Putus (One-Time):** Rp 10.000.000,- Nett (Beli putus tanpa biaya bulanan). Skema termin 50:50 (DP Rp 5 Jt saat kick-off & Pelunasan Rp 5 Jt setelah lolos uji coba opname pertama). |
| **07** | `slide-7` | **Roadmap 1.5–2 Bulan & Kick-off:** Mgg 1–2 Setup & Web Admin Hub, Mgg 3–4 Scanner & Audio Synth, Mgg 5–6 Live Opname Siklus #1 bersama tim Pak Hadi, Mgg 7–8 Siklus #2 & Handover tuntas. |

---

## 🔊 Fitur Kunci: Web Audio API Synth (Tanpa File MP3)
Sistem dilengkapi sound generator bawaan browser:
- **Beep 1× (850 Hz, 120ms):** Umpan balik tiap scan sukses normal (+1 pcs).
- **Beep-Beep 2× (850 Hz, double pulse):** Target SKU terpenuhi atau scan ganda.
- **Low Buzz (220 Hz sawtooth, 250ms):** Peringatan SKU tidak terdaftar di Excel persediaan.
- **Haptic Vibration:** Getar ponsel Android saat scan berhasil sehingga staf tidak perlu selalu menatap layar.

---

## 🚀 Panduan Menjalankan

### Buka di Browser Lokal:
```bash
open "Client - KiiWii.Bee (Pak Hadi)/index.html"
```

### Buka Demo Scanner Saja:
```bash
open "Client - KiiWii.Bee (Pak Hadi)/scanner_demo.html"
```

### Deploy ke Vercel:
```bash
cd "Client - KiiWii.Bee (Pak Hadi)"
npx vercel --prod
```

---

*Confidential — PT Fleek Group Indonesia — Fleek Project 2026*
