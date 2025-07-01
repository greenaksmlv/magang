/**
 * @file config.js
 * @description
 * File konfigurasi utama untuk skenario automation Connex Shuttle menggunakan Playwright
 * File ini berisi data dinamis seperti kredensial, jadwal perjalanan, informasi penumpang,
 * metode pembayaran, link berita, dan elemen lain yang digunakan oleh semua test
 */

export const config = {
  /** @property {string} environment - Lingkungan pengujian, contoh: 'dev', 'qa', 'prod' */
    environment: 'qa',

  /** @property {object} credentials - Kredensial untuk login akun */
    credentials: {
      username: 'tbk',
      password: 'development',
    },

    /** @property {object} journey - Informasi jadwal perjalanan */
    journey: {
      departure: 'Alfamart exit tol buah batu',
      arrival: 'Markas cafe',
      date: 'July 23, 2025',
      return_date: 'July 28 2025',
      passenger_count: 3,
    },

    /** @property {string} otp - Kode OTP statis untuk keperluan pengujian */
    otp: '123456',

    /** @property {object} passenger_data - Informasi pemesan dan penumpang */
    passenger_data: {
      name: 'Green Melissa',
      email: 'gerin@example.com',
      phone_number: '081212121212',
      cust_name_same: 1,
      passengers:[
            {
                name: "Green Melissa",
                seat_number: "1",
                return_seat: "2",
            },
            {
                name: "Shann",
                seat_number: "2",
                return_seat: "3"
            },
            {
                name: "Sam",
                seat_number: "3",
                return_seat: "4"
            }
        ]
    },

    /** @property {object} voucher - Kode voucher yang digunakan dalam pengujian */
    voucher:{
      freepass: '',
      harga: '',
      diskon: ''
    },

    /** @property {object} payment - Daftar metode pembayaran */
    payment: {
      collapse0: {
        collapse: 0,
      },
      collapse1: {
        collapse: 'Payment Method 1',
        gopay: 'GOPAY',
      },
      collapse2: {
        collapse: 'Payment Method 2',
        vamandiri: 'Mandiri Virtual Account',
      },
      collapse3: {
        collapse: 'Payment Method 3',
      },
    },

    /** @property {string} change_payment - Metode mengganti pembayaran saat uji coba perubahan pembayaran */
    change_payment: 'Mandiri Virtual Account',

    /** @property {object} booking_code - Kode pemesanan untuk tes validasi */
    booking_code: {
      ticket: 'BDTR250306D23B', // Kode reservasi tiket
      packet: 'PCNX250221OKA5', // Kode reservasi paket
    },

    /** @property {object} news - URL ke halaman berita */
    news: {
      hindariTransit: 'https://www.connex.co.id/berita/connex-shuttle-tanpa-transit',
      gloryPromo: 'https://www.connex.co.id/berita/naik-shuttle-makin-murah-nikmati-glory-promo-sekarang',
    },

    /** @property {object} sign_methods - Metode login yang tersedia di halaman login */
    sign_methods: {
      phone: `xpath=//button[normalize-space()='Nomor Telepon']`,
      whatsapp: `xpath=//button[normalize-space()='Whatsapp']`,
      email: `xpath=//button[normalize-space()='Email']`,
      google: `xpath=//button[@id='googleLogin']`,
    },

    /** @property {object} more_info - Informasi tambahan seperti metode pembayaran */
    more_info: {
      method: ['v-pills-0-tab'],
    },

    /** @property {object} media_sosial - Lokator tombol media social di footer */
    media_sosial: {
      facebook: `xpath=//a[normalize-space()='Facebook']`,
      instagram: `xpath=//a[normalize-space()='Instagram']`,
      tiktok: `xpath=//a[normalize-space()='Tiktok']`,
    },

    /** @property {object} phone_info - Lokator nomor telefon di bagian informasi di footer */
    phone_info: {
      no1: `xpath=//a[normalize-space()='0817 0888 666']`,
      no2: `xpath=//a[normalize-space()='0877 7888 6665']`,
      no3: `xpath=//a[normalize-space()='0818 3555 53']`,
      no4: `xpath=//a[normalize-space()='0817 6662 226']`,
    },

    /** @property {object} web_source - Lokator tombol sumber unduhan aplikasi */
    web_source: {
      playstore: `xpath=//img[@alt='Playstore']`,
      appstore: `xpath=//img[@alt='Appstore']`,
    },

    /** @property {object} url - URL utama sistem */
    url: {
      website: 'https://connex.co.id',
      otp: ''
    }
};
