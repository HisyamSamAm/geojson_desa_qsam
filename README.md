# Penjelasan File geojson_desa.js

## Deskripsi Umum
File `geojson_desa.js` berisi data geografis dalam format GeoJSON yang mewakili jaringan jalan di sebuah desa (desa). Data ini diekspor dari OpenStreetMap (OSM) menggunakan alat overpass-turbo pada tanggal 17 Oktober 2025 pukul 02:21:47 UTC.

## Struktur Data
File ini adalah objek GeoJSON dengan tipe `FeatureCollection`, yang terdiri dari:
- **type**: "FeatureCollection" - Menunjukkan bahwa ini adalah kumpulan fitur geografis.
- **generator**: "overpass-turbo" - Alat yang digunakan untuk mengekstrak data dari OSM.
- **copyright**: Data berasal dari www.openstreetmap.org dan dilisensikan di bawah ODbL (Open Database License).
- **timestamp**: Waktu ekspor data.
- **features**: Array dari objek fitur, masing-masing mewakili sebuah jalan atau segmen jalan.

## Struktur Fitur
Setiap fitur dalam array `features` memiliki struktur sebagai berikut:

### Properties (Atribut)
Setiap fitur memiliki objek `properties` yang berisi metadata tentang jalan tersebut:
- **@id**: ID unik dari OSM (misalnya "way/28040802"), menunjukkan bahwa data berasal dari way (jalan) di OSM.
- **name**: Nama jalan (misalnya "Jalan Daeng Muhammad Ardiwinata", "Jalan Ciwaruga", "Gang Madja").
- **highway**: Jenis jalan, seperti:
  - "tertiary": Jalan tersier (jalan utama di tingkat lokal).
  - "secondary": Jalan sekunder (jalan penghubung penting).
  - "primary": Jalan primer (jalan utama).
  - "residential": Jalan perumahan.
  - "unclassified": Jalan tanpa klasifikasi spesifik.
  - "living_street": Jalan pejalan kaki dengan prioritas.
  - "service": Jalan layanan (akses ke properti).
  - "path": Jalur pejalan kaki atau sepeda.
  - "track": Jalur tanah.
- **lanes**: Jumlah lajur (misalnya 1, 2).
- **smoothness**: Kondisi permukaan jalan (misalnya "good", "intermediate", "bad").
- **surface**: Jenis permukaan (misalnya "concrete", "asphalt", "paving_stones", "unpaved").
- **width**: Lebar jalan dalam meter (misalnya "3.5", "2").
- **motorcar**: Akses kendaraan bermotor ("yes", "no", "destination").
- **motorcycle**: Akses sepeda motor ("yes").
- **oneway**: Apakah jalan satu arah ("yes", "no").
- **ref**: Referensi jalan (misalnya "247" untuk Jalan Kolonel Masturi).
- **source**: Sumber data (misalnya "GPS").
- **access**: Tingkat akses ("private").
- **foot**: Akses pejalan kaki ("designated").
- **incline**: Kemiringan ("down").
- **service**: Jenis layanan (misalnya "driveway").

### Geometry
Setiap fitur memiliki objek `geometry` dengan:
- **type**: "LineString" - Semua fitur adalah garis (jalan sebagai garis).
- **coordinates**: Array dari pasangan koordinat [longitude, latitude] yang membentuk jalur jalan. Koordinat ini tidak dianalisis secara detail sesuai permintaan.

## Contoh Fitur
Berikut adalah contoh salah satu fitur dalam file:

```json
{
  "type": "Feature",
  "properties": {
    "@id": "way/28040802",
    "alt_name": "Jalan Cihanjuang",
    "avgspeed": "25",
    "highway": "tertiary",
    "lanes": "2",
    "name": "Jalan Daeng Muhammad Ardiwinata",
    "smoothness": "good",
    "surface": "concrete",
    "width": "3.5"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [107.5764057, -6.8135224],
      [107.5763704, -6.8137883],
      // ... lebih banyak koordinat
    ]
  },
  "id": "way/28040802"
}
```

## Penggunaan Data
Data ini dapat digunakan untuk:
- Visualisasi peta jalan di desa.
- Analisis jaringan jalan (misalnya klasifikasi jalan, kondisi permukaan).
- Pengembangan aplikasi GIS atau pemetaan.
- Penelitian geografis tentang infrastruktur jalan.

