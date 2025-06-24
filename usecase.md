Ya, template yang kamu berikan **sudah sangat benar dan terstruktur dengan baik**. Menggunakan bagian "Identifikasi Aktor" dan "Identifikasi Use Case" sebelum menampilkan diagram adalah praktik standar yang sangat bagus dalam dokumentasi perancangan sistem.

Saya akan mengadaptasi template tersebut untuk sistem rekomendasimu, sesuai dengan konteks dan fungsionalitas yang telah kita bahas.

---

### **3.3. Perancangan Use Case**

Tahap ini mendefinisikan fungsionalitas sistem dari sudut pandang pengguna. Proses ini dimulai dengan mengidentifikasi aktor yang terlibat, kemudian mendefinisikan *use case* atau layanan yang dapat dilakukan oleh masing-masing aktor.

#### **3.3.1. Identifikasi Aktor**

Informasi mengenai aktor yang terlibat dalam pengoperasian sistem dapat ditemukan pada tabel di bawah ini.

**Tabel 3.9 Identifikasi Aktor**
| No. | Aktor | Deskripsi |
| :--- | :--- | :--- |
| 1. | **Admin** | Aktor yang bertugas mengelola data master sistem, seperti data siswa dan data pertanyaan tes, serta memantau hasil tes secara keseluruhan. Peran ini ditujukan untuk Guru BK atau staf yang ditunjuk. |
| 2. | **Siswa** | Aktor yang merupakan pengguna akhir sistem. Siswa menggunakan sistem untuk mengerjakan tes RIASEC dan melihat hasil profil kepribadian beserta rekomendasi yang dipersonalisasi. |

#### **3.3.2. Identifikasi Use Case**

Berdasarkan identifikasi aktor sebelumnya, berikut adalah daftar *use case* yang teridentifikasi dalam Sistem Rekomendasi Minat dan Bakat:

**Tabel 3.10 Identifikasi Use Case**
| No. | Use Case | Deskripsi | Aktor |
| :--- | :--- | :--- | :--- |
| 1. | Melakukan Login | Fungsionalitas bagi pengguna untuk masuk ke dalam sistem sesuai dengan perannya. | Admin, Siswa |
| 2. | Melakukan Logout | Fungsionalitas bagi pengguna untuk keluar dari sesi aplikasi. | Admin, Siswa |
| 3. | Mengelola Profil | Fungsionalitas bagi pengguna untuk melihat dan memperbarui data profil pribadinya. | Admin, Siswa |
| 4. | Melihat Dashboard Admin | Fungsionalitas untuk menampilkan ringkasan statistik, seperti jumlah siswa, jumlah yang sudah tes, dan distribusi hasil tes. | Admin |
| 5. | Mengelola Data Siswa | Fungsionalitas bagi admin untuk menambah, melihat, mengubah, dan menghapus data akun dan profil siswa. | Admin |
| 6. | Mengelola Pertanyaan RIASEC | Fungsionalitas bagi admin untuk menambah, melihat, mengubah, dan menghapus soal-soal dalam bank soal tes RIASEC. | Admin |
| 7. | Melihat Detail Hasil Siswa | Fungsionalitas bagi admin untuk melihat laporan hasil tes dan rekomendasi dari siswa tertentu. | Admin |
| 8. | Mengerjakan Tes RIASEC | Fungsionalitas inti bagi siswa untuk mengisi dan menyelesaikan kuesioner tes RIASEC secara online. | Siswa |
| 9. | Melihat Hasil dan Rekomendasi | Fungsionalitas bagi siswa untuk melihat halaman hasil tes pribadinya, yang berisi Kode Holland, rincian skor, dan daftar rekomendasi minat/program. | Siswa |

#### **3.3.3. Use Case Diagram**

**[Gambar 3.9 Use Case Diagram Sistem]**
*(Di sini kamu letakkan gambar diagram Use Case yang kamu buat)*

Ilustrasi diagram *use case* di atas menunjukkan interaksi antara dua aktor utama—Admin dan Siswa—dengan fungsionalitas sistem. Aktor **Admin** memiliki hak akses penuh untuk mengelola data master sistem, yang mencakup data siswa dan data pertanyaan, serta memantau hasil tes. Sementara itu, aktor **Siswa** berfokus pada penggunaan fitur inti sistem, yaitu mengerjakan tes RIASEC dan melihat hasil serta rekomendasi yang bersifat personal untuk dirinya sendiri. Kedua aktor berbagi fungsionalitas umum seperti Login dan Logout untuk mengakses sistem.