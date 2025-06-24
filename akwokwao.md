Tentu saja. Ini adalah spesifikasi tabel yang lengkap menggunakan **Format 1 (Format Detail)**, yang sangat cocok untuk ditempatkan di **Bab 3** setelah gambar ERD-mu.

---

### **3.2.2. Perancangan Basis Data**

Perancangan basis data merupakan tahapan untuk mendefinisikan struktur penyimpanan data yang akan digunakan oleh sistem. Berdasarkan analisis kebutuhan, dirancang sebuah skema basis data yang terdiri dari beberapa tabel yang saling berelasi. Desain konseptual dari basis data ini digambarkan dalam *Entity Relationship Diagram* (ERD) berikut.

**[Gambar 3.2: Entity Relationship Diagram (ERD)]**
*(Di sini kamu letakkan gambar ERD-mu)*

Berdasarkan ERD di atas, berikut adalah spesifikasi detail untuk setiap tabel yang akan digunakan dalam basis data sistem.

**Tabel 3.1 Tabel `users`**
*Tabel ini digunakan untuk menyimpan data otentikasi dasar untuk semua pengguna sistem.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik pengguna (Primary Key) |
| full_name | `VARCHAR` | 255 | Nama lengkap pengguna |
| email | `VARCHAR` | 255 | Alamat email unik untuk login |
| password | `VARCHAR` | 255 | Kata sandi yang sudah dienkripsi (hash) |
| role | `ENUM` | 'admin', 'siswa' | Peran pengguna di dalam sistem |
| created_at | `TIMESTAMP`| - | Waktu record dibuat |
| updated_at | `TIMESTAMP`| - | Waktu record terakhir diperbarui |

**Tabel 3.2 Tabel `admins`**
*Tabel ini menyimpan data profil spesifik untuk pengguna dengan peran 'admin'.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik admin (Primary Key) |
| **user_id** | `INT` | 11 | Foreign Key yang merujuk ke `users.id` |
| jabatan | `VARCHAR`| 100 | Jabatan admin (Contoh: "Guru BK") |

**Tabel 3.3 Tabel `siswa`**
*Tabel ini menyimpan data profil detail dari pengguna dengan peran 'siswa'.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik siswa (Primary Key) |
| **user_id** | `INT` | 11 | Foreign Key yang merujuk ke `users.id` |
| nisn | `VARCHAR` | 20 | Nomor Induk Siswa Nasional (Opsional) |
| kelas | `VARCHAR` | 20 | Kelas siswa saat ini (Opsional) |
| tanggal_lahir | `DATE` | - | Tanggal lahir siswa (Opsional) |

**Tabel 3.4 Tabel `riasec_pertanyaan`**
*Tabel ini berfungsi sebagai bank soal untuk kuesioner tes RIASEC.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik pertanyaan (Primary Key) |
| teks_pertanyaan| `TEXT` | - | Isi atau redaksi dari pertanyaan tes |
| tipe_riasec | `ENUM` | 'R','I','A','S','E','C' | Kategori RIASEC yang diukur oleh pertanyaan ini |

**Tabel 3.5 Tabel `hasil_tes`**
*Tabel ini menyimpan rekapitulasi hasil pengerjaan tes oleh setiap siswa.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik sesi tes (Primary Key) |
| **siswa_id** | `INT` | 11 | Foreign Key yang merujuk ke `siswa.id` |
| tanggal_tes | `TIMESTAMP`| - | Waktu pengerjaan tes dimulai/diselesaikan |
| skor_r | `INT` | 3 | Skor mentah akhir untuk tipe Realistic |
| skor_i | `INT` | 3 | Skor mentah akhir untuk tipe Investigative |
| skor_a | `INT` | 3 | Skor mentah akhir untuk tipe Artistic |
| skor_s | `INT` | 3 | Skor mentah akhir untuk tipe Social |
| skor_e | `INT` | 3 | Skor mentah akhir untuk tipe Enterprising |
| skor_c | `INT` | 3 | Skor mentah akhir untuk tipe Conventional |
| kode_holland | `VARCHAR` | 3 | Kode 3 huruf hasil tes (contoh: 'SAI') |

**Tabel 3.6 Tabel `jawaban_tes`**
*Tabel ini menyimpan rincian setiap jawaban yang dipilih siswa dalam satu sesi tes.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik jawaban (Primary Key) |
| **hasil_tes_id** | `INT` | 11 | Foreign Key yang merujuk ke `hasil_tes.id` |
| **pertanyaan_id** | `INT` | 11 | Foreign Key yang merujuk ke `riasec_pertanyaan.id` |
| jawaban | `TINYINT` | 1 | Nilai jawaban (1 untuk 'Ya/Setuju', 0 untuk 'Tidak') |

**Tabel 3.7 Tabel `minat_bakat`**
*Tabel ini berfungsi sebagai basis pengetahuan untuk item rekomendasi minat dan bakat.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik minat/bakat (Primary Key) |
| name | `VARCHAR` | 255 | Nama item minat/bakat (contoh: 'Penulis') |
| description | `TEXT` | - | Deskripsi singkat tentang minat/bakat tersebut |
| riasec_type | `VARCHAR`| 1 | Tipe RIASEC yang berelasi dengan item ini |

**Tabel 3.8 Tabel `program`**
*Tabel ini berfungsi sebagai basis pengetahuan untuk item rekomendasi program kegiatan.*
| Field | Type | Length/Value | Keterangan |
| :--- | :--- | :--- | :--- |
| **id** | `INT` | 11 | ID unik program (Primary Key) |
| name | `VARCHAR` | 255 | Nama program (contoh: 'Kelas Robotika') |
| description | `TEXT` | - | Deskripsi singkat tentang program kegiatan |