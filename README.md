# 🌊 Remindly — Manajer Tugas "Sea Space" Premium & Kolaboratif

**Remindly** adalah platform manajemen tugas dan kolaborasi real-time kelas atas yang dibangun dengan **React 19**, **Firebase**, dan **Tailwind CSS**. Didesain dengan estetika glassmorphism "Deep Sea" yang memukau, aplikasi ini menawarkan pengalaman mulus bagi tim atau individu untuk mengelola tugas dalam "Sea Space" bersama.

---

## 💎 Mengapa Memilih Template Ini?

- **Estetika Premium**: Desain glassmorphism profesional yang memberikan kesan mewah secara instan.
- **Kolaborasi Real-time**: Didukung oleh Firebase Firestore untuk sinkronisasi data seketika.
- **Siap Jual**: Konfigurasi terpusat dan variabel lingkungan memudahkan proses rebranding.
- **Kode Bersih**: Arsitektur komponen modular dan performa yang dioptimalkan.
- **Ramah Developer**: Dibangun dengan teknologi terbaru (React 19 + Vite).

---

## ✨ Fitur Utama

- 🔐 **Autentikasi Google**: Pengalaman login satu klik yang aman.
- 🌍 **Shared Sea Space**: Lingkungan kolaboratif di mana tugas sinkron antar semua pengguna.
- 📊 **Analitik Dinamis**: Progress bar dan statistik tugas yang interaktif.
- 📝 **Sistem Tugas & Ringkasan**: Tab terpisah untuk tugas harian dan catatan/ringkasan panjang.
- 🎨 **UI/UX Modern**:
  - **Glassmorphism**: Efek kaca buram (frosted glass) yang elegan.
  - **Animasi Halus**: Didukung oleh Framer Motion.
  - **Perayaan Confetti**: Efek visual saat tugas berhasil diselesaikan.
- 📱 **Optimasi Mobile**: Desain responsif sepenuhnya yang bekerja layaknya aplikasi native.
- 🔍 **Filter Lanjutan**: Cari dan urutkan tugas berdasarkan prioritas, waktu, atau status.

---

## 🚀 Panduan Setup Cepat

Ubah template ini menjadi aplikasi Anda sendiri dalam hitungan menit.

### 1. Persyaratan Sistem
- Node.js (v18+)
- Akun Firebase

### 2. Instalasi
```bash
# Instal dependensi
npm install

# Buat file environment
cp .env.example .env
```

### 3. Konfigurasi Firebase
1. Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Authentication** (Pilih Provider Google).
3. Buat **Firestore Database** dalam "Test Mode".
4. Tambahkan **Web App** ke proyek Anda dan salin konfigurasinya.
5. Tempelkan kunci-kunci tersebut ke dalam file `.env` yang baru Anda buat.

### 4. Personalisasi (Rebranding)
Buka `src/config/appConfig.js` untuk mengubah nama aplikasi, tagline, dan pengaturan tema:
```javascript
export const appConfig = {
  name: "BrandAnda",
  tagline: "Tagline unik Anda di sini...",
  storagePrefix: "brandanda_",
  // ...
};
```

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore & Auth
- **Animasi**: Framer Motion, Canvas Confetti
- **Ikon**: Lucide React

---

## 💻 Perintah Pengembangan

```bash
# Menjalankan server pengembangan
npm run dev

# Build untuk produksi
npm run build

# Pratinjau hasil build produksi
npm run preview
```

---

## 📄 Lisensi
Produk ini adalah template digital. Silakan merujuk ke `LICENSE.md` untuk ketentuan lengkapnya.

---

_Dibuat dengan ❤️ untuk Web Developer Modern._
