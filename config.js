export const config = {
    environment: 'qa',
    credentials: {
      username: 'tbk',
      password: 'development',
    },
    journey: {
      departure: 'Alfamart exit tol buah batu',
      arrival: 'Markas cafe',
      date: 'July 23, 2025',
      return_date: 'July 28 2025',
      passenger_count: 3,
    },
    otp: '123456',
    passenger_data: {
      name: 'Green Melissa',
      email: '2281065@unai.edu',
      phone_number: '081312331101',
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
    voucher:{
      freepass: '',
      harga: '',
      diskon: ''
    },
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
  change_payment: 'Mandiri Virtual Account',
  booking_code: {
    ticket: 'BDTR250306D23B',
    packet: 'PCNX250221OKA5',
  },
  news: {
    hindariTransit: 'https://www.connex.co.id/berita/connex-shuttle-tanpa-transit',
    gloryPromo: 'https://www.connex.co.id/berita/naik-shuttle-makin-murah-nikmati-glory-promo-sekarang',
  },
  sign_methods: {
    phone: `xpath=//button[normalize-space()='Nomor Telepon']`,
    whatsapp: `xpath=//button[normalize-space()='Whatsapp']`,
    email: `xpath=//button[normalize-space()='Email']`,
    google: `xpath=//button[@id='googleLogin']`,
  },
  more_info: {
    method: ['v-pills-0-tab'],
  },
  media_sosial: {
    facebook: `xpath=//a[normalize-space()='Facebook']`,
    instagram: `xpath=//a[normalize-space()='Instagram']`,
    tiktok: `xpath=//a[normalize-space()='Tiktok']`,
  },
  phone_info: {
    no1: `xpath=//a[normalize-space()='0817 0888 666']`,
    no2: `xpath=//a[normalize-space()='0877 7888 6665']`,
    no3: `xpath=//a[normalize-space()='0818 3555 53']`,
    no4: `xpath=//a[normalize-space()='0817 6662 226']`,
  },
  web_source: {
    connex: `xpath=//img[@alt='Connex']`,
    playstore: `xpath=//img[@alt='Playstore']`,
    appstore: `xpath=//img[@alt='Appstore']`,
  },
  url: {
    website: 'https://connex.co.id',
    otp: ''
  }
};
