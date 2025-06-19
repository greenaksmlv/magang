export const config = {
    environment: 'qa',
    credentials: {
      username: 'tbk',
      password: 'development',
    },
    journey: {
      departure: 'Kfc dbotanica pasteur',
      arrival: 'Markas cafe',
      date: 'July 23, 2025',
      return_date: 'July 28 2025',
      passenger_count: 3,
    },
    otp: '123456',
    passenger_data: {
        booker: {
            // name: 'Green Melissa',
            email: '2281065@unai.edu',
            phone_number: '081312331101'
            
            // address: '',
            // seat_number: 3,
            // //return_seat: 5,
            // cust_name_same: 1,
            // cust_name: 'Green Melissa'
        },
        cust_name_same: 1,
        custName: "Green Melissa",
        passengers: [
            {
                name: "Green Melissa",
                seat_number: "3"
            },
            {
                name: "Shann",
                seat_number: "4",
            },
            {
                name: "Sam",
                seat_number: "5",
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
  url: {
    website: 'https://connex.co.id',
    otp: ''
  }
};
