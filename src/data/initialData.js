// Initial Seed Data for Jobbor Nogor Swatontro Ebtedayee Madrasha
// Target: https://madrasha.hostzonebd.com

export const MADRASHA_PROFILE = {
  name: "জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা",
  nameEn: "Jobbor Nogor Swatontro Ebtedayee Madrasha",
  location: "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
  address: "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার।",
  phone1: "01820050095",
  phone2: "01847657580",
  email: "hafezazamnur@gmail.com",
  website: "www.abrar.com",
  established: "১৯৮৩",
  principal: "মাহমুদুল করিম",
  principalRole: "মুহতামিম / প্রধান পরীক্ষক",
  smsBalance: 0.00,
  logoText: "JNSEM",
  banner: "/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg",
};

export const JAMATS = [
  { id: "hefz", name: "হিফজ বিভাগ", count: 42, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "nazera", name: "নাজেরা বিভাগ", count: 38, color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: "maktab", name: "মক্তব ও কায়দা", count: 45, color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { id: "kitab", name: "কিতাব বিভাগ", count: 32, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: "ebtedayee", name: "ইবতিদাইয়্যাহ (১ম-৫ম)", count: 40, color: "bg-amber-50 text-amber-700 border-amber-200" },
];

export const DEPOSIT_CATEGORIES = [
  "মাসিক বেতন",
  "খোরাকী ফি",
  "ভর্তি ফি",
  "পুনঃভর্তি ফি",
  "পরীক্ষার ফি",
  "সাধারণ দান",
  "যাকাত তহবিল",
  "ফিতরা",
  "কোরবানীর চামড়া বিক্রয়",
  "আজীবন সদস্য চাঁদা",
  "মসজিদ ফান্ড",
  "লাইব্রেরি ফি",
  "বোডিং ফি",
  "উন্নয়ন ফান্ড",
  "এতিম তহবিল",
  "ওয়াকফ দান",
  "বিবিধ জমা",
  "কিতাব বিক্রয়",
  "পরিচয়পত্র ফি",
  "সার্টিফিকেট ফি",
  "জরিমানা ফি"
];

export const EXPENSE_CATEGORIES = [
  "শিক্ষক-কর্মচারী বেতন",
  "মেহমানদারি ও আপ্যায়ন",
  "দৈনিক বাজার খরচ",
  "বিদ্যুৎ বিল",
  "ইন্টারনেট ও সফটওয়্যার বিল",
  "অফিস মনিহারি সামগ্রী",
  "বোডিং চাল-ডাল-তেল ক্রয়",
  "গ্যাস সিলিন্ডার ও জ্বালানি",
  "ছাত্র চিকিৎসা ও ঔষধ",
  "ভবন মেরামত ও রঙ",
  "ওয়াজ ও মাহফিল খরচ",
  "ছাপা ও প্রকাশনা খরচ",
  "ডাক ও কুরিয়ার",
  "যাতায়াত ও ভাড়া",
  "আইটি ও কম্পিউটার সামগ্রী",
  "ক্রীড়া ও সাংস্কৃতিক সামগ্রী",
  "আইনি ও প্রশাসনিক খরচ",
  "ব্যাংক চার্জ ও কমিশন",
  "অডিট ফি",
  "কর ও পৌরকর",
  "ফার্নিচার ক্রয়",
  "পুরস্কার ও শুভেচ্ছা উপহার",
  "ছাতা ও পোশাক বিতরণ",
  "লাইব্রেরির কিতাব ক্রয়",
  "পরিচ্ছন্নতা সামগ্রী",
  "হিফজ সমাপনী পাগড়ী বিতরণ",
  "পরীক্ষা পরিচালনা খরচ",
  "আপদকালীন সাহায্য",
  "সিসিটিভি ক্যামেরা মেরামত",
  "ছাত্রাবাস বিছানাপত্র ক্রয়",
  "পানি সরবরাহ ও পাম্প মেরামত",
  "জেনারেটর ডিজেল খরচ",
  "বিবিধ খরচ",
  "বিশেষ অনুদান প্রদান"
];

export const ACCOUNTS = [
  { id: "bkash", name: "বিকাশ হিসাব (01820050095)", type: "মোবাইল ব্যাংকিং", accountNumber: "01820050095", isBank: true, balance: 545.00 },
  { id: "cash", name: "নগদ ক্যাশ (Hand Cash)", type: "ক্যাশ ইন হ্যান্ড", balance: 400.00, isBank: false },
];

export const RECEIVERS = [
  { id: "rec1", name: "মাহমুদুল করিম", designation: "মুহতামিম" },
  { id: "rec2", name: "হাফেজ আযম নূর", designation: "ক্যাশিয়ার / প্রধান হিসাবরক্ষক" },
  { id: "rec3", name: "মাও. আব্দুর রহমান", designation: "সহকারী শিক্ষক" },
];

export const INITIAL_STUDENTS = [
  {
    "id": "STU-001",
    "roll": "১০১",
    "name": "মুহাম্মদ আবু বকর",
    "nameEn": "Muhammad Abu Bakr",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001001",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810003871",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002001",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/storage/students/photos/qL3O80DX3hm1RoGUFMq3Xu9O9BNao7w4ReYNyPFQ.jpg",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-002",
    "roll": "১০২",
    "name": "মুহাম্মদ উমর ফারুক",
    "nameEn": "Muhammad Umar Faruq",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001002",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810007742",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002002",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-003",
    "roll": "১০৩",
    "name": "মুহাম্মদ উসমান গণি",
    "nameEn": "Muhammad Usman Gani",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001003",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810011613",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002003",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-004",
    "roll": "১০৪",
    "name": "মুহাম্মদ আলী হাসান",
    "nameEn": "Muhammad Ali Hasan",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001004",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810015484",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002004",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-005",
    "roll": "১০৫",
    "name": "আব্দুল্লাহ আল নোমান",
    "nameEn": "Abdullah Al Noman",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001005",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810019355",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002005",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-006",
    "roll": "১০৬",
    "name": "তানভীর মাহমুদ",
    "nameEn": "Tanvir Mahmud",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001006",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810023226",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002006",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-007",
    "roll": "১০৭",
    "name": "মাহমুদুল হাসান",
    "nameEn": "Mahmudul Hasan",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001007",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810027097",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002007",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-008",
    "roll": "১০৮",
    "name": "মুহাম্মদ তালহা",
    "nameEn": "Muhammad Talha",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001008",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810030968",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002008",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-009",
    "roll": "১০৯",
    "name": "জুবায়ের আহমদ",
    "nameEn": "Zubayer Ahmad",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001009",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810034839",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002009",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/storage/students/photos/mQMPuKNY8Iqgv52mAAOU9pLIt8Q6OJMubjwuf3y3.jpg",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-010",
    "roll": "১১০",
    "name": "মুয়াজ বিন জাবাল",
    "nameEn": "Muaz Bin Jabal",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001010",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810038710",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002010",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-011",
    "roll": "১১১",
    "name": "মুহাম্মদ সালমান",
    "nameEn": "Muhammad Salman",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001011",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810042581",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002011",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-012",
    "roll": "১১২",
    "name": "মুহাম্মদ হামজা",
    "nameEn": "Muhammad Hamza",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001012",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810046452",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002012",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-013",
    "roll": "১১৩",
    "name": "আবু হুরায়রা",
    "nameEn": "Abu Hurairah",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001013",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810050323",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002013",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-014",
    "roll": "১১৪",
    "name": "আব্দুর রহমান",
    "nameEn": "Abdur Rahman",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001014",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810054194",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002014",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-015",
    "roll": "১১৫",
    "name": "মুহাম্মদ আনাস",
    "nameEn": "Muhammad Anas",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001015",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810058065",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002015",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-016",
    "roll": "১১৬",
    "name": "মুহাম্মদ ইয়াসিন",
    "nameEn": "Muhammad Yasin",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001016",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810061936",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002016",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-017",
    "roll": "১১৭",
    "name": "শাকিল মাহমুদ",
    "nameEn": "Shakil Mahmud",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001017",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810065807",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002017",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-018",
    "roll": "১১৮",
    "name": "মুহাম্মদ কাওসার",
    "nameEn": "Muhammad Kawsar",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001018",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810069678",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002018",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-019",
    "roll": "১১৯",
    "name": "নাঈমুল ইসলাম",
    "nameEn": "Nayeemul Islam",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001019",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810073549",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002019",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-020",
    "roll": "১২০",
    "name": "মুহাম্মদ ফাহিম",
    "nameEn": "Muhammad Fahim",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001020",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810077420",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002020",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-021",
    "roll": "১২১",
    "name": "মুহাম্মদ তামিম",
    "nameEn": "Muhammad Tamim",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001021",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810081291",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002021",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-022",
    "roll": "১২২",
    "name": "মুহাম্মদ রিফাত",
    "nameEn": "Muhammad Rifat",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001022",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810085162",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002022",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-023",
    "roll": "১২৩",
    "name": "মুহাম্মদ সাজিদ",
    "nameEn": "Muhammad Sajid",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001023",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810089033",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002023",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-024",
    "roll": "১২৪",
    "name": "মাহদী হাসান",
    "nameEn": "Mahdi Hasan",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001024",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810092904",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002024",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-025",
    "roll": "১২৫",
    "name": "মুহাম্মদ ইমরান",
    "nameEn": "Muhammad Imran",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001025",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810096775",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002025",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-026",
    "roll": "১২৬",
    "name": "মুহাম্মদ সায়িদ",
    "nameEn": "Muhammad Sayeed",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001026",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810100646",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002026",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-027",
    "roll": "১২৭",
    "name": "তাহমিদ উল্লাহ",
    "nameEn": "Tahmid Ullah",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001027",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810104517",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002027",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-028",
    "roll": "১২৮",
    "name": "মুহাম্মদ সাব্বির",
    "nameEn": "Muhammad Sabbir",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001028",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810108388",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002028",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-029",
    "roll": "১২৯",
    "name": "মুহাম্মদ মারুফ",
    "nameEn": "Muhammad Maruf",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001029",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810112259",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002029",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-030",
    "roll": "১৩০",
    "name": "আবিদ হাসান",
    "nameEn": "Abid Hasan",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001030",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810116130",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002030",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-031",
    "roll": "১৩১",
    "name": "রায়হান আহমদ",
    "nameEn": "Rayhan Ahmad",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001031",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810120001",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002031",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-032",
    "roll": "১৩২",
    "name": "তাসনিম মাহমুদ",
    "nameEn": "Tasnim Mahmud",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001032",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810123872",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002032",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-033",
    "roll": "১৩৩",
    "name": "মুহাম্মদ জাহিদ",
    "nameEn": "Muhammad Zahid",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001033",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810127743",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002033",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-034",
    "roll": "১৩৪",
    "name": "শিহাব উদ্দিন",
    "nameEn": "Shihab Uddin",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001034",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810131614",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002034",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-035",
    "roll": "১৩৫",
    "name": "মুহাম্মদ আদনান",
    "nameEn": "Muhammad Adnan",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001035",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810135485",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002035",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-036",
    "roll": "১৩৬",
    "name": "মুহাম্মদ নাজমুল",
    "nameEn": "Muhammad Nazmul",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001036",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810139356",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002036",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-037",
    "roll": "১৩৭",
    "name": "মুহাম্মদ সিয়াম",
    "nameEn": "Muhammad Siam",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001037",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810143227",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002037",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-038",
    "roll": "১৩৮",
    "name": "মিশকাতুল ইসলাম",
    "nameEn": "Mishkatul Islam",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001038",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810147098",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002038",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-039",
    "roll": "১৩৯",
    "name": "মুহাম্মদ আফিফ",
    "nameEn": "Muhammad Afif",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001039",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810150969",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002039",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-040",
    "roll": "১৪০",
    "name": "মুহাম্মদ ইরফান",
    "nameEn": "Muhammad Irfan",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001040",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810154840",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002040",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-041",
    "roll": "১৪১",
    "name": "মুহাম্মদ শাকের",
    "nameEn": "Muhammad Shaker",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001041",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810158711",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002041",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-042",
    "roll": "১৪২",
    "name": "মুহাম্মদ শাহিন",
    "nameEn": "Muhammad Shahin",
    "jamat": "হিফজ বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001042",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810162582",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002042",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 800,
    "khurakiFee": 2200,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 800,
        "khuraki": 2200,
        "paid": false
      }
    }
  },
  {
    "id": "STU-043",
    "roll": "২০১",
    "name": "মুহাম্মদ আসিফ",
    "nameEn": "Muhammad Asif",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001043",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810166453",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002043",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-044",
    "roll": "২০২",
    "name": "মুহাম্মদ হাবিব",
    "nameEn": "Muhammad Habib",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001044",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810170324",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002044",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-045",
    "roll": "২০৩",
    "name": "মুহাম্মদ শাফিন",
    "nameEn": "Muhammad Shafin",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001045",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810174195",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002045",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-046",
    "roll": "২০৪",
    "name": "মুহাম্মদ আবু বকর (2)",
    "nameEn": "Muhammad Abu Bakr (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001046",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810178066",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002046",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-047",
    "roll": "২০৫",
    "name": "মুহাম্মদ উমর ফারুক (2)",
    "nameEn": "Muhammad Umar Faruq (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001047",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810181937",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002047",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-048",
    "roll": "২০৬",
    "name": "মুহাম্মদ উসমান গণি (2)",
    "nameEn": "Muhammad Usman Gani (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001048",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810185808",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002048",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-049",
    "roll": "২০৭",
    "name": "মুহাম্মদ আলী হাসান (2)",
    "nameEn": "Muhammad Ali Hasan (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001049",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810189679",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002049",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-050",
    "roll": "২০৮",
    "name": "আব্দুল্লাহ আল নোমান (2)",
    "nameEn": "Abdullah Al Noman (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001050",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810193550",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002050",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-051",
    "roll": "২০৯",
    "name": "তানভীর মাহমুদ (2)",
    "nameEn": "Tanvir Mahmud (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001051",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810197421",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002051",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-052",
    "roll": "২১০",
    "name": "মাহমুদুল হাসান (2)",
    "nameEn": "Mahmudul Hasan (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001052",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810201292",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002052",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-053",
    "roll": "২১১",
    "name": "মুহাম্মদ তালহা (2)",
    "nameEn": "Muhammad Talha (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001053",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810205163",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002053",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-054",
    "roll": "২১২",
    "name": "জুবায়ের আহমদ (2)",
    "nameEn": "Zubayer Ahmad (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001054",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810209034",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002054",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-055",
    "roll": "২১৩",
    "name": "মুয়াজ বিন জাবাল (2)",
    "nameEn": "Muaz Bin Jabal (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001055",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810212905",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002055",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-056",
    "roll": "২১৪",
    "name": "মুহাম্মদ সালমান (2)",
    "nameEn": "Muhammad Salman (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001056",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810216776",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002056",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-057",
    "roll": "২১৫",
    "name": "মুহাম্মদ হামজা (2)",
    "nameEn": "Muhammad Hamza (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001057",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810220647",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002057",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-058",
    "roll": "২১৬",
    "name": "আবু হুরায়রা (2)",
    "nameEn": "Abu Hurairah (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001058",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810224518",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002058",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-059",
    "roll": "২১৭",
    "name": "আব্দুর রহমান (2)",
    "nameEn": "Abdur Rahman (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001059",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810228389",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002059",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-060",
    "roll": "২১৮",
    "name": "মুহাম্মদ আনাস (2)",
    "nameEn": "Muhammad Anas (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001060",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810232260",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002060",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-061",
    "roll": "২১৯",
    "name": "মুহাম্মদ ইয়াসিন (2)",
    "nameEn": "Muhammad Yasin (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001061",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810236131",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002061",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-062",
    "roll": "২২০",
    "name": "শাকিল মাহমুদ (2)",
    "nameEn": "Shakil Mahmud (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001062",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810240002",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002062",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-063",
    "roll": "২২১",
    "name": "মুহাম্মদ কাওসার (2)",
    "nameEn": "Muhammad Kawsar (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001063",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810243873",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002063",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-064",
    "roll": "২২২",
    "name": "নাঈমুল ইসলাম (2)",
    "nameEn": "Nayeemul Islam (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001064",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810247744",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002064",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-065",
    "roll": "২২৩",
    "name": "মুহাম্মদ ফাহিম (2)",
    "nameEn": "Muhammad Fahim (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001065",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810251615",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002065",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-066",
    "roll": "২২৪",
    "name": "মুহাম্মদ তামিম (2)",
    "nameEn": "Muhammad Tamim (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001066",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810255486",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002066",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-067",
    "roll": "২২৫",
    "name": "মুহাম্মদ রিফাত (2)",
    "nameEn": "Muhammad Rifat (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001067",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810259357",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002067",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-068",
    "roll": "২২৬",
    "name": "মুহাম্মদ সাজিদ (2)",
    "nameEn": "Muhammad Sajid (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001068",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810263228",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002068",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-069",
    "roll": "২২৭",
    "name": "মাহদী হাসান (2)",
    "nameEn": "Mahdi Hasan (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001069",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810267099",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002069",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-070",
    "roll": "২২৮",
    "name": "মুহাম্মদ ইমরান (2)",
    "nameEn": "Muhammad Imran (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001070",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810270970",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002070",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-071",
    "roll": "২২৯",
    "name": "মুহাম্মদ সায়িদ (2)",
    "nameEn": "Muhammad Sayeed (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001071",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810274841",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002071",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-072",
    "roll": "২৩০",
    "name": "তাহমিদ উল্লাহ (2)",
    "nameEn": "Tahmid Ullah (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001072",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810278712",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002072",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-073",
    "roll": "২৩১",
    "name": "মুহাম্মদ সাব্বির (2)",
    "nameEn": "Muhammad Sabbir (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001073",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810282583",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002073",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-074",
    "roll": "২৩২",
    "name": "মুহাম্মদ মারুফ (2)",
    "nameEn": "Muhammad Maruf (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001074",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810286454",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002074",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-075",
    "roll": "২৩৩",
    "name": "আবিদ হাসান (2)",
    "nameEn": "Abid Hasan (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001075",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810290325",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002075",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-076",
    "roll": "২৩৪",
    "name": "রায়হান আহমদ (2)",
    "nameEn": "Rayhan Ahmad (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001076",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810294196",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002076",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-077",
    "roll": "২৩৫",
    "name": "তাসনিম মাহমুদ (2)",
    "nameEn": "Tasnim Mahmud (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001077",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810298067",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002077",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-078",
    "roll": "২৩৬",
    "name": "মুহাম্মদ জাহিদ (2)",
    "nameEn": "Muhammad Zahid (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001078",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810301938",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002078",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-079",
    "roll": "২৩৭",
    "name": "শিহাব উদ্দিন (2)",
    "nameEn": "Shihab Uddin (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001079",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810305809",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002079",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-080",
    "roll": "২৩৮",
    "name": "মুহাম্মদ আদনান (2)",
    "nameEn": "Muhammad Adnan (2)",
    "jamat": "নাজেরা বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001080",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810309680",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002080",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 700,
    "khurakiFee": 2000,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 700,
        "khuraki": 2000,
        "paid": false
      }
    }
  },
  {
    "id": "STU-081",
    "roll": "৩০১",
    "name": "মুহাম্মদ নাজমুল (2)",
    "nameEn": "Muhammad Nazmul (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001081",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810313551",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002081",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-082",
    "roll": "৩০২",
    "name": "মুহাম্মদ সিয়াম (2)",
    "nameEn": "Muhammad Siam (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001082",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810317422",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002082",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-083",
    "roll": "৩০৩",
    "name": "মিশকাতুল ইসলাম (2)",
    "nameEn": "Mishkatul Islam (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001083",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810321293",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002083",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-084",
    "roll": "৩০৪",
    "name": "মুহাম্মদ আফিফ (2)",
    "nameEn": "Muhammad Afif (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001084",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810325164",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002084",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-085",
    "roll": "৩০৫",
    "name": "মুহাম্মদ ইরফান (2)",
    "nameEn": "Muhammad Irfan (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001085",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810329035",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002085",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-086",
    "roll": "৩০৬",
    "name": "মুহাম্মদ শাকের (2)",
    "nameEn": "Muhammad Shaker (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001086",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810332906",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002086",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-087",
    "roll": "৩০৭",
    "name": "মুহাম্মদ শাহিন (2)",
    "nameEn": "Muhammad Shahin (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001087",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810336777",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002087",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-088",
    "roll": "৩০৮",
    "name": "মুহাম্মদ আসিফ (2)",
    "nameEn": "Muhammad Asif (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001088",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810340648",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002088",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-089",
    "roll": "৩০৯",
    "name": "মুহাম্মদ হাবিব (2)",
    "nameEn": "Muhammad Habib (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001089",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810344519",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002089",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-090",
    "roll": "৩১০",
    "name": "মুহাম্মদ শাফিন (2)",
    "nameEn": "Muhammad Shafin (2)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001090",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810348390",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002090",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-091",
    "roll": "৩১১",
    "name": "মুহাম্মদ আবু বকর (3)",
    "nameEn": "Muhammad Abu Bakr (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001091",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810352261",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002091",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-092",
    "roll": "৩১২",
    "name": "মুহাম্মদ উমর ফারুক (3)",
    "nameEn": "Muhammad Umar Faruq (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001092",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810356132",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002092",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-093",
    "roll": "৩১৩",
    "name": "মুহাম্মদ উসমান গণি (3)",
    "nameEn": "Muhammad Usman Gani (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001093",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810360003",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002093",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-094",
    "roll": "৩১৪",
    "name": "মুহাম্মদ আলী হাসান (3)",
    "nameEn": "Muhammad Ali Hasan (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001094",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810363874",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002094",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-095",
    "roll": "৩১৫",
    "name": "আব্দুল্লাহ আল নোমান (3)",
    "nameEn": "Abdullah Al Noman (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001095",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810367745",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002095",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-096",
    "roll": "৩১৬",
    "name": "তানভীর মাহমুদ (3)",
    "nameEn": "Tanvir Mahmud (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001096",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810371616",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002096",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-097",
    "roll": "৩১৭",
    "name": "মাহমুদুল হাসান (3)",
    "nameEn": "Mahmudul Hasan (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001097",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810375487",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002097",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-098",
    "roll": "৩১৮",
    "name": "মুহাম্মদ তালহা (3)",
    "nameEn": "Muhammad Talha (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001098",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810379358",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002098",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-099",
    "roll": "৩১৯",
    "name": "জুবায়ের আহমদ (3)",
    "nameEn": "Zubayer Ahmad (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001099",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810383229",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002099",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-100",
    "roll": "৩২০",
    "name": "মুয়াজ বিন জাবাল (3)",
    "nameEn": "Muaz Bin Jabal (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001100",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810387100",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002100",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-101",
    "roll": "৩২১",
    "name": "মুহাম্মদ সালমান (3)",
    "nameEn": "Muhammad Salman (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001101",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810390971",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002101",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-102",
    "roll": "৩২২",
    "name": "মুহাম্মদ হামজা (3)",
    "nameEn": "Muhammad Hamza (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001102",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810394842",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002102",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-103",
    "roll": "৩২৩",
    "name": "আবু হুরায়রা (3)",
    "nameEn": "Abu Hurairah (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001103",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810398713",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002103",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-104",
    "roll": "৩২৪",
    "name": "আব্দুর রহমান (3)",
    "nameEn": "Abdur Rahman (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001104",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810402584",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002104",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-105",
    "roll": "৩২৫",
    "name": "মুহাম্মদ আনাস (3)",
    "nameEn": "Muhammad Anas (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001105",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810406455",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002105",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-106",
    "roll": "৩২৬",
    "name": "মুহাম্মদ ইয়াসিন (3)",
    "nameEn": "Muhammad Yasin (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001106",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810410326",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002106",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-107",
    "roll": "৩২৭",
    "name": "শাকিল মাহমুদ (3)",
    "nameEn": "Shakil Mahmud (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001107",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810414197",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002107",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-108",
    "roll": "৩২৮",
    "name": "মুহাম্মদ কাওসার (3)",
    "nameEn": "Muhammad Kawsar (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001108",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810418068",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002108",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-109",
    "roll": "৩২৯",
    "name": "নাঈমুল ইসলাম (3)",
    "nameEn": "Nayeemul Islam (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001109",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810421939",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002109",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-110",
    "roll": "৩৩০",
    "name": "মুহাম্মদ ফাহিম (3)",
    "nameEn": "Muhammad Fahim (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001110",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810425810",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002110",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-111",
    "roll": "৩৩১",
    "name": "মুহাম্মদ তামিম (3)",
    "nameEn": "Muhammad Tamim (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001111",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810429681",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002111",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-112",
    "roll": "৩৩২",
    "name": "মুহাম্মদ রিফাত (3)",
    "nameEn": "Muhammad Rifat (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001112",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810433552",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002112",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-113",
    "roll": "৩৩৩",
    "name": "মুহাম্মদ সাজিদ (3)",
    "nameEn": "Muhammad Sajid (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001113",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810437423",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002113",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-114",
    "roll": "৩৩৪",
    "name": "মাহদী হাসান (3)",
    "nameEn": "Mahdi Hasan (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001114",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810441294",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002114",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-115",
    "roll": "৩৩৫",
    "name": "মুহাম্মদ ইমরান (3)",
    "nameEn": "Muhammad Imran (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001115",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810445165",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002115",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-116",
    "roll": "৩৩৬",
    "name": "মুহাম্মদ সায়িদ (3)",
    "nameEn": "Muhammad Sayeed (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001116",
    "fatherName": "মাওলানা মুস্তাফিজুর রহমান",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810449036",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002116",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-117",
    "roll": "৩৩৭",
    "name": "তাহমিদ উল্লাহ (3)",
    "nameEn": "Tahmid Ullah (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001117",
    "fatherName": "জয়নাল আবেদীন",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810452907",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002117",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-118",
    "roll": "৩৩৮",
    "name": "মুহাম্মদ সাব্বির (3)",
    "nameEn": "Muhammad Sabbir (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001118",
    "fatherName": "আজমীর আলী",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810456778",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002118",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-119",
    "roll": "৩৩৯",
    "name": "মুহাম্মদ মারুফ (3)",
    "nameEn": "Muhammad Maruf (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001119",
    "fatherName": "রশিদ আহমদ",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810460649",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002119",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-120",
    "roll": "৩৪০",
    "name": "আবিদ হাসান (3)",
    "nameEn": "Abid Hasan (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001120",
    "fatherName": "ছাবের আহমদ",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810464520",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002120",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-121",
    "roll": "৩৪১",
    "name": "রায়হান আহমদ (3)",
    "nameEn": "Rayhan Ahmad (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001121",
    "fatherName": "মাওলানা নুরুল হক",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810468391",
    "motherName": "ফাতেমা জান্নাত",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002121",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-122",
    "roll": "৩৪২",
    "name": "তাসনিম মাহমুদ (3)",
    "nameEn": "Tasnim Mahmud (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001122",
    "fatherName": "মোহাম্মদ ইউনুস",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810472262",
    "motherName": "সুফিয়া খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002122",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-123",
    "roll": "৩৪৩",
    "name": "মুহাম্মদ জাহিদ (3)",
    "nameEn": "Muhammad Zahid (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001123",
    "fatherName": "হাজী শামসুল আলম",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810476133",
    "motherName": "হাফেজা খাতুন",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002123",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-124",
    "roll": "৩৪৪",
    "name": "শিহাব উদ্দিন (3)",
    "nameEn": "Shihab Uddin (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001124",
    "fatherName": "মাহমুদুর রহমান",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810480004",
    "motherName": "আমেনা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002124",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-125",
    "roll": "৩৪৫",
    "name": "মুহাম্মদ আদনান (3)",
    "nameEn": "Muhammad Adnan (3)",
    "jamat": "মক্তব ও কায়দা",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001125",
    "fatherName": "জালাল আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810483875",
    "motherName": "খাদিজা বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002125",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 500,
    "khurakiFee": 1500,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 500,
        "khuraki": 1500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-126",
    "roll": "৪০১",
    "name": "মুহাম্মদ নাজমুল (3)",
    "nameEn": "Muhammad Nazmul (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001126",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810487746",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002126",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-127",
    "roll": "৪০২",
    "name": "মুহাম্মদ সিয়াম (3)",
    "nameEn": "Muhammad Siam (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001127",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810491617",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002127",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-128",
    "roll": "৪০৩",
    "name": "মিশকাতুল ইসলাম (3)",
    "nameEn": "Mishkatul Islam (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001128",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810495488",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002128",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-129",
    "roll": "৪০৪",
    "name": "মুহাম্মদ আফিফ (3)",
    "nameEn": "Muhammad Afif (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001129",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810499359",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002129",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-130",
    "roll": "৪০৫",
    "name": "মুহাম্মদ ইরফান (3)",
    "nameEn": "Muhammad Irfan (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001130",
    "fatherName": "আমির হামজা",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810503230",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002130",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-131",
    "roll": "৪০৬",
    "name": "মুহাম্মদ শাকের (3)",
    "nameEn": "Muhammad Shaker (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001131",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810507101",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002131",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-132",
    "roll": "৪০৭",
    "name": "মুহাম্মদ শাহিন (3)",
    "nameEn": "Muhammad Shahin (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001132",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810510972",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002132",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-133",
    "roll": "৪০৮",
    "name": "মুহাম্মদ আসিফ (3)",
    "nameEn": "Muhammad Asif (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001133",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810514843",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002133",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-134",
    "roll": "৪০৯",
    "name": "মুহাম্মদ হাবিব (3)",
    "nameEn": "Muhammad Habib (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001134",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810518714",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002134",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-135",
    "roll": "৪১০",
    "name": "মুহাম্মদ শাফিন (3)",
    "nameEn": "Muhammad Shafin (3)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001135",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810522585",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002135",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-136",
    "roll": "৪১১",
    "name": "মুহাম্মদ আবু বকর (4)",
    "nameEn": "Muhammad Abu Bakr (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001136",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810526456",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002136",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-137",
    "roll": "৪১২",
    "name": "মুহাম্মদ উমর ফারুক (4)",
    "nameEn": "Muhammad Umar Faruq (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001137",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810530327",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002137",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-138",
    "roll": "৪১৩",
    "name": "মুহাম্মদ উসমান গণি (4)",
    "nameEn": "Muhammad Usman Gani (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001138",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810534198",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002138",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-139",
    "roll": "৪১৪",
    "name": "মুহাম্মদ আলী হাসান (4)",
    "nameEn": "Muhammad Ali Hasan (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001139",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810538069",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002139",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-140",
    "roll": "৪১৫",
    "name": "আব্দুল্লাহ আল নোমান (4)",
    "nameEn": "Abdullah Al Noman (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001140",
    "fatherName": "আমির হামজা",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810541940",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002140",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-141",
    "roll": "৪১৬",
    "name": "তানভীর মাহমুদ (4)",
    "nameEn": "Tanvir Mahmud (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001141",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810545811",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002141",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-142",
    "roll": "৪১৭",
    "name": "মাহমুদুল হাসান (4)",
    "nameEn": "Mahmudul Hasan (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001142",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810549682",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002142",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-143",
    "roll": "৪১৮",
    "name": "মুহাম্মদ তালহা (4)",
    "nameEn": "Muhammad Talha (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001143",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810553553",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002143",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-144",
    "roll": "৪১৯",
    "name": "জুবায়ের আহমদ (4)",
    "nameEn": "Zubayer Ahmad (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001144",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810557424",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002144",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-145",
    "roll": "৪২০",
    "name": "মুয়াজ বিন জাবাল (4)",
    "nameEn": "Muaz Bin Jabal (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001145",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810561295",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002145",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-146",
    "roll": "৪২১",
    "name": "মুহাম্মদ সালমান (4)",
    "nameEn": "Muhammad Salman (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001146",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810565166",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002146",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-147",
    "roll": "৪২২",
    "name": "মুহাম্মদ হামজা (4)",
    "nameEn": "Muhammad Hamza (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001147",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810569037",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002147",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-148",
    "roll": "৪২৩",
    "name": "আবু হুরায়রা (4)",
    "nameEn": "Abu Hurairah (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001148",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810572908",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002148",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-149",
    "roll": "৪২৪",
    "name": "আব্দুর রহমান (4)",
    "nameEn": "Abdur Rahman (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001149",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810576779",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002149",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-150",
    "roll": "৪২৫",
    "name": "মুহাম্মদ আনাস (4)",
    "nameEn": "Muhammad Anas (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001150",
    "fatherName": "আমির হামজা",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810580650",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002150",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-151",
    "roll": "৪২৬",
    "name": "মুহাম্মদ ইয়াসিন (4)",
    "nameEn": "Muhammad Yasin (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001151",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810584521",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002151",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-152",
    "roll": "৪২৭",
    "name": "শাকিল মাহমুদ (4)",
    "nameEn": "Shakil Mahmud (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001152",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810588392",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002152",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-153",
    "roll": "৪২৮",
    "name": "মুহাম্মদ কাওসার (4)",
    "nameEn": "Muhammad Kawsar (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001153",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810592263",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002153",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-154",
    "roll": "৪২৯",
    "name": "নাঈমুল ইসলাম (4)",
    "nameEn": "Nayeemul Islam (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001154",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810596134",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002154",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-155",
    "roll": "৪৩০",
    "name": "মুহাম্মদ ফাহিম (4)",
    "nameEn": "Muhammad Fahim (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001155",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810600005",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002155",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-156",
    "roll": "৪৩১",
    "name": "মুহাম্মদ তামিম (4)",
    "nameEn": "Muhammad Tamim (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001156",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810603876",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002156",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-157",
    "roll": "৪৩২",
    "name": "মুহাম্মদ রিফাত (4)",
    "nameEn": "Muhammad Rifat (4)",
    "jamat": "কিতাব বিভাগ",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001157",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810607747",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002157",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 1000,
    "khurakiFee": 2500,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 1000,
        "khuraki": 2500,
        "paid": false
      }
    }
  },
  {
    "id": "STU-158",
    "roll": "৫০১",
    "name": "মুহাম্মদ সাজিদ (4)",
    "nameEn": "Muhammad Sajid (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001158",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810611618",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002158",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-159",
    "roll": "৫০২",
    "name": "মাহদী হাসান (4)",
    "nameEn": "Mahdi Hasan (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001159",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810615489",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002159",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-160",
    "roll": "৫০৩",
    "name": "মুহাম্মদ ইমরান (4)",
    "nameEn": "Muhammad Imran (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001160",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810619360",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002160",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-161",
    "roll": "৫০৪",
    "name": "মুহাম্মদ সায়িদ (4)",
    "nameEn": "Muhammad Sayeed (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001161",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810623231",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002161",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-162",
    "roll": "৫০৫",
    "name": "তাহমিদ উল্লাহ (4)",
    "nameEn": "Tahmid Ullah (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001162",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810627102",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002162",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-163",
    "roll": "৫০৬",
    "name": "মুহাম্মদ সাব্বির (4)",
    "nameEn": "Muhammad Sabbir (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001163",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810630973",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002163",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-164",
    "roll": "৫০৭",
    "name": "মুহাম্মদ মারুফ (4)",
    "nameEn": "Muhammad Maruf (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001164",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810634844",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002164",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-165",
    "roll": "৫০৮",
    "name": "আবিদ হাসান (4)",
    "nameEn": "Abid Hasan (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001165",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810638715",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002165",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-166",
    "roll": "৫০৯",
    "name": "রায়হান আহমদ (4)",
    "nameEn": "Rayhan Ahmad (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001166",
    "fatherName": "আমির হামজা",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810642586",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002166",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-167",
    "roll": "৫১০",
    "name": "তাসনিম মাহমুদ (4)",
    "nameEn": "Tasnim Mahmud (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001167",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810646457",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002167",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-168",
    "roll": "৫১১",
    "name": "মুহাম্মদ জাহিদ (4)",
    "nameEn": "Muhammad Zahid (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001168",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810650328",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002168",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-169",
    "roll": "৫১২",
    "name": "শিহাব উদ্দিন (4)",
    "nameEn": "Shihab Uddin (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001169",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810654199",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002169",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-170",
    "roll": "৫১৩",
    "name": "মুহাম্মদ আদনান (4)",
    "nameEn": "Muhammad Adnan (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001170",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810658070",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002170",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-171",
    "roll": "৫১৪",
    "name": "মুহাম্মদ নাজমুল (4)",
    "nameEn": "Muhammad Nazmul (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001171",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810661941",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002171",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-172",
    "roll": "৫১৫",
    "name": "মুহাম্মদ সিয়াম (4)",
    "nameEn": "Muhammad Siam (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001172",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810665812",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002172",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-173",
    "roll": "৫১৬",
    "name": "মিশকাতুল ইসলাম (4)",
    "nameEn": "Mishkatul Islam (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001173",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810669683",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002173",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-174",
    "roll": "৫১৭",
    "name": "মুহাম্মদ আফিফ (4)",
    "nameEn": "Muhammad Afif (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001174",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810673554",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002174",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-175",
    "roll": "৫১৮",
    "name": "মুহাম্মদ ইরফান (4)",
    "nameEn": "Muhammad Irfan (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001175",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810677425",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002175",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-176",
    "roll": "৫১৯",
    "name": "মুহাম্মদ শাকের (4)",
    "nameEn": "Muhammad Shaker (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001176",
    "fatherName": "আমির হামজা",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810681296",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002176",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-177",
    "roll": "৫২০",
    "name": "মুহাম্মদ শাহিন (4)",
    "nameEn": "Muhammad Shahin (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001177",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810685167",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002177",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-178",
    "roll": "৫২১",
    "name": "মুহাম্মদ আসিফ (4)",
    "nameEn": "Muhammad Asif (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001178",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810689038",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002178",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-179",
    "roll": "৫২২",
    "name": "মুহাম্মদ হাবিব (4)",
    "nameEn": "Muhammad Habib (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001179",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810692909",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002179",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-180",
    "roll": "৫২৩",
    "name": "মুহাম্মদ শাফিন (4)",
    "nameEn": "Muhammad Shafin (4)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001180",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810696780",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002180",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-181",
    "roll": "৫২৪",
    "name": "মুহাম্মদ আবু বকর (5)",
    "nameEn": "Muhammad Abu Bakr (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001181",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810700651",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002181",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-182",
    "roll": "৫২৫",
    "name": "মুহাম্মদ উমর ফারুক (5)",
    "nameEn": "Muhammad Umar Faruq (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001182",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810704522",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002182",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-183",
    "roll": "৫২৬",
    "name": "মুহাম্মদ উসমান গণি (5)",
    "nameEn": "Muhammad Usman Gani (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001183",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810708393",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002183",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-184",
    "roll": "৫২৭",
    "name": "মুহাম্মদ আলী হাসান (5)",
    "nameEn": "Muhammad Ali Hasan (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001184",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810712264",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002184",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-185",
    "roll": "৫২৮",
    "name": "আব্দুল্লাহ আল নোমান (5)",
    "nameEn": "Abdullah Al Noman (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001185",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810716135",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002185",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-186",
    "roll": "৫২৯",
    "name": "তানভীর মাহমুদ (5)",
    "nameEn": "Tanvir Mahmud (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2012-07-15",
    "birthReg": "2012159231001186",
    "fatherName": "আমির হামজা",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810720006",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002186",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124723.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-187",
    "roll": "৫৩০",
    "name": "মাহমুদুল হাসান (5)",
    "nameEn": "Mahmudul Hasan (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2013-08-22",
    "birthReg": "2013159231001187",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810723877",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002187",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124849.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-188",
    "roll": "৫৩১",
    "name": "মুহাম্মদ তালহা (5)",
    "nameEn": "Muhammad Talha (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2014-09-01",
    "birthReg": "2014159231001188",
    "fatherName": "মোক্তার আহমদ",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810727748",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002188",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124918.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-189",
    "roll": "৫৩২",
    "name": "জুবায়ের আহমদ (5)",
    "nameEn": "Zubayer Ahmad (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2015-10-08",
    "birthReg": "2015159231001189",
    "fatherName": "আব্দুল জলিল",
    "fatherOcc": "শিক্ষক",
    "guardianPhone": "01810731619",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002189",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124949.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-190",
    "roll": "৫৩৩",
    "name": "মুয়াজ বিন জাবাল (5)",
    "nameEn": "Muaz Bin Jabal (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O-",
    "dob": "2016-11-15",
    "birthReg": "2016159231001190",
    "fatherName": "রফিকুল ইসলাম",
    "fatherOcc": "চাকুরিজীবী",
    "guardianPhone": "01810735490",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002190",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261015_110444.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-191",
    "roll": "৫৩৪",
    "name": "মুহাম্মদ সালমান (5)",
    "nameEn": "Muhammad Salman (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB+",
    "dob": "2017-12-22",
    "birthReg": "2017159231001191",
    "fatherName": "মাওলানা আবুল কালাম",
    "fatherOcc": "দোকানদার",
    "guardianPhone": "01810739361",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002191",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261015_110504.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-192",
    "roll": "৫৩৫",
    "name": "মুহাম্মদ হামজা (5)",
    "nameEn": "Muhammad Hamza (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "AB-",
    "dob": "2012-01-01",
    "birthReg": "2012159231001192",
    "fatherName": "বসির উল্লাহ",
    "fatherOcc": "ইমাম",
    "guardianPhone": "01810743232",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002192",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20260930_063637_063812.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-193",
    "roll": "৫৩৬",
    "name": "আবু হুরায়রা (5)",
    "nameEn": "Abu Hurairah (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A+",
    "dob": "2013-02-08",
    "birthReg": "2013159231001193",
    "fatherName": "কামাল উদ্দিন",
    "fatherOcc": "প্রবাসী",
    "guardianPhone": "01810747103",
    "motherName": "সালমা খাতুন",
    "motherOcc": "শিক্ষিকা",
    "nid": "1985159231002193",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/FB_IMG_1791220812856.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-194",
    "roll": "৫৩৭",
    "name": "আব্দুর রহমান (5)",
    "nameEn": "Abdur Rahman (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "A-",
    "dob": "2014-03-15",
    "birthReg": "2014159231001194",
    "fatherName": "সিরাজুল হক",
    "fatherOcc": "মৎস্য ব্যবসায়ী",
    "guardianPhone": "01810750974",
    "motherName": "রোকেয়া বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002194",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124639.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-195",
    "roll": "৫৩৮",
    "name": "মুহাম্মদ আনাস (5)",
    "nameEn": "Muhammad Anas (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B+",
    "dob": "2015-04-22",
    "birthReg": "2015159231001195",
    "fatherName": "নাসির উদ্দিন",
    "fatherOcc": "ড্রাইভার",
    "guardianPhone": "01810754845",
    "motherName": "মরিয়ম বেগম",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002195",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124644.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-196",
    "roll": "৫৩৯",
    "name": "মুহাম্মদ ইয়াসিন (5)",
    "nameEn": "Muhammad Yasin (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "B-",
    "dob": "2016-05-01",
    "birthReg": "2016159231001196",
    "fatherName": "আমির হামজা",
    "fatherOcc": "ব্যবসায়ী",
    "guardianPhone": "01810758716",
    "motherName": "রাবেয়া বসরী",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002196",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124654.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  },
  {
    "id": "STU-197",
    "roll": "৫৪০",
    "name": "শাকিল মাহমুদ (5)",
    "nameEn": "Shakil Mahmud (5)",
    "jamat": "ইবতিদাইয়্যাহ (১ম-৫ম)",
    "session": "২০২৬",
    "bloodGroup": "O+",
    "dob": "2017-06-08",
    "birthReg": "2017159231001197",
    "fatherName": "কফিল উদ্দিন",
    "fatherOcc": "কৃষিজীবী",
    "guardianPhone": "01810762587",
    "motherName": "আয়েশা সিদ্দিকা",
    "motherOcc": "গৃহিনী",
    "nid": "1985159231002197",
    "address": "বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার",
    "monthlyFee": 600,
    "khurakiFee": 1800,
    "photo": "/students/IMG_20261014_124710.webp",
    "status": "সক্রিয়",
    "admissionDate": "2024-01-15",
    "fees": {
      "জানুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-01-08"
      },
      "ফেব্রুয়ারি": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-02-08"
      },
      "মার্চ": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-03-08"
      },
      "এপ্রিল": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-04-08"
      },
      "মে": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-05-08"
      },
      "জুন": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-06-08"
      },
      "জুলাই": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-07-08"
      },
      "আগস্ট": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-08-08"
      },
      "সেপ্টেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-09-08"
      },
      "অক্টোবর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": true,
        "date": "2026-10-08"
      },
      "নভেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      },
      "ডিসেম্বর": {
        "tuition": 600,
        "khuraki": 1800,
        "paid": false
      }
    }
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "DEP-2026-001",
    type: "deposit",
    voucherNo: "JV-2026-101",
    date: "2026-10-18",
    receiver: "মাহমুদুল করিম",
    account: "বিকাশ হিসাব (01820050095)",
    donorOrStudent: "মুহাম্মদ আবু বকর (রোল: ১০১)",
    items: [
      { category: "মাসিক বেতন", description: "অক্টোবর মাসের বেতন", amount: 800 },
      { category: "পরিচয়পত্র ফি", description: "স্মার্ট আইডি কার্ড ফি", amount: 145 },
    ],
    totalAmount: 945.00,
    note: "বিকাশের মাধ্যমে পরিশোধিত",
    status: "অনুমোদিত"
  },
  {
    id: "EXP-2026-001",
    type: "expense",
    voucherNo: "EV-2026-201",
    date: "2026-10-19",
    receiver: "হাফেজ আযম নূর",
    account: "নগদ ক্যাশ (Hand Cash)",
    donorOrStudent: "চকরিয়া বাজার",
    items: [
      { category: "দৈনিক বাজার খরচ", description: "ছাত্রাবাসের কাঁচাবাজার ও সবজি ক্রয়", amount: 150 },
      { category: "অফিস মনিহারি সামগ্রী", description: "সাদা খাতা ও কলম ক্রয়", amount: 50 },
    ],
    totalAmount: 200.00,
    note: "ক্যাশ মেমো সংযুক্ত আছে",
    status: "অনুমোদিত"
  }
];

export const INITIAL_TEACHERS = [
  {
    id: "TCH-001",
    name: "মাওলানা মাহমুদুল করিম",
    designation: "মুহতামিম / প্রধান শিক্ষক",
    department: "প্রশাসন ও কিতাব",
    mobile: "01820050095",
    email: "mahmudul.karim@madrasha.com",
    salary: 22000,
    joiningDate: "2008-03-01",
    status: "কর্মরত",
    qualification: "দাওরায়ে হাদিস (মাস্টার্স)",
    photo: "/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg"
  },
  {
    id: "TCH-002",
    name: "হাফেজ আযম নূর",
    designation: "সহকারী প্রধান ও ক্যাশিয়ার",
    department: "হিফজ বিভাগ",
    mobile: "01847657580",
    email: "hafezazamnur@gmail.com",
    salary: 18000,
    joiningDate: "2012-05-15",
    status: "কর্মরত",
    qualification: "হাফেজে কুরআন, কামিল",
    photo: "/storage/teachers/eXUAuPhreXk0tOWTeviLX2y8J6SwvMJJnSh4Mj85.jpg"
  },
  {
    id: "TCH-003",
    name: "মাওলানা আব্দুর রহমান",
    designation: "সিনিয়র শিক্ষক",
    department: "নাজেরা ও কায়দা",
    mobile: "01722334455",
    email: "arahman@madrasha.com",
    salary: 15000,
    joiningDate: "2016-08-01",
    status: "কর্মরত",
    qualification: "ফাযিল, ক্বারী",
    photo: "/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg"
  },
  {
    id: "TCH-004",
    name: "মাওলানা হাবিবুল্লাহ মাসউদ",
    designation: "সহকারী শিক্ষক",
    department: "ইবতিদাইয়্যাহ ৩য়-৫ম",
    mobile: "01933445566",
    email: "habibullah@madrasha.com",
    salary: 13500,
    joiningDate: "2019-01-10",
    status: "কর্মরত",
    qualification: "কামিল (হাদিস)",
    photo: "/storage/teachers/eXUAuPhreXk0tOWTeviLX2y8J6SwvMJJnSh4Mj85.jpg"
  },
  {
    id: "TCH-005",
    name: "কারী মুহাম্মদ ইব্রাহিম",
    designation: "ক্বারী ও মুয়াল্লিম",
    department: "হিফজ বিভাগ",
    mobile: "01866778899",
    email: "ibrahim.qari@madrasha.com",
    salary: 14000,
    joiningDate: "2021-02-01",
    status: "কর্মরত",
    qualification: "হিফজুল কুরআন ও তাজবীদ",
    photo: "/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg"
  }
];

export const INITIAL_COMMITTEE = [
  { id: "COM-01", name: "আলহাজ্ব শামসুল হুদা মাস্টার", role: "সভাপতি", phone: "01819283746", address: "বদরখালী", tenure: "২০২৪-২০২৬" },
  { id: "COM-02", name: "মাওলানা মাহমুদুল করিম", role: "সাধারণ সম্পাদক (মুহতামিম)", phone: "01820050095", address: "মাদ্রাসার অভ্যন্তরীণ", tenure: "স্থায়ী" },
  { id: "COM-03", name: "হাজী আব্দুল মোতালেব", role: "সহ-সভাপতি", phone: "01711223344", address: "মাতামুহুরী", tenure: "২০২৪-২০২৬" },
  { id: "COM-04", name: "হাফেজ আযম নূর", role: "অর্থ সম্পাদক", phone: "01847657580", address: "বদরখালী", tenure: "২০২৪-২০২৬" },
  { id: "COM-05", name: "ডা. শফিউল আলম", role: "চিকিৎসা ও সমাজকল্যাণ সম্পাদক", phone: "01922334455", address: "চকরিয়া বাজার", tenure: "২০২৪-২০২৬" },
  { id: "COM-06", name: "মাওলানা জসিম উদ্দিন", role: "শিক্ষা ও সাংস্কৃতিক সম্পাদক", phone: "01511223344", address: "জব্বর নগর", tenure: "২০২৪-২০২৬" },
];

export const INITIAL_NOTICES = [
  { id: "NTC-01", title: "বার্ষিক পরীক্ষার চূড়ান্ত সময়সূচী প্রকাশ", date: "২০২৬-১০-২৪", priority: "জরুরি", text: "আগামী ১৫ নভেম্বর থেকে সকল জামাতের বার্ষিক মূল্যায়ন পরীক্ষা অনুষ্ঠিত হবে। সকল অভিভাবকগণকে নির্ধারিত সময়ের পূর্বে বকেয়া ফি পরিশোধ করার অনুরোধ করা যাচ্ছে।" },
  { id: "NTC-02", title: "হিফজ সমাপনী পাগড়ী প্রদান অনুষ্ঠান", date: "২০২৬-১০-২০", priority: "সাধারণ", text: "পবিত্র কুরআন হিফজ সম্পন্নকারী ১৪ জন ছাত্রকে আগামী মাসে রাজকীয় দস্তারবন্দী প্রদান ও দোয়া মাহফিলের তারিখ নির্ধারণ করা হয়েছে।" },
  { id: "NTC-03", title: "শীতকালীন বোডিং রশদ ও কম্বল সংগ্রহ", date: "২০২৬-১০-১৫", priority: "গুরুত্বপূর্ণ", text: "ছাত্রাবাসের অনাবাসিক ও এতিম ছাত্রদের শীতকালীন কম্বল ও গরম কাপড়ের জন্য সুহৃদয় ব্যক্তিবর্গের অনুদান গ্রহণ চলছে।" },
];

export const MONTH_NAMES = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

export const INITIAL_CONTRIBUTORS = [
  {
    id: "CON-001",
    name: "হাজী আব্দুল কাদের",
    fatherName: "মরহুম নুর মোহাম্মদ",
    mobile: "01819283741",
    address: "চকরিয়া পৌরসভা, কক্সবাজার",
    subscriptionType: "মাসিক",
    monthlyAmount: 1000,
    pledgeDate: "2024-01-01",
    status: "সক্রিয়",
    note: "নিয়মিত নগদ চাঁদা প্রদানকারী",
    payments: {
      "জানুয়ারি": 1000, "ফেব্রুয়ারি": 1000, "মার্চ": 1000, "এপ্রিল": 1000,
      "মে": 1000, "জুন": 1000, "জুলাই": 1000, "আগস্ট": 1000, "সেপ্টেম্বর": 1000, "অক্টোবর": 1000
    }
  },
  {
    id: "CON-002",
    name: "মাওলানা মোহাম্মদ ইসহাক",
    fatherName: "মুন্সি আলতাফ হোসেন",
    mobile: "01712345678",
    address: "মাতামুহুরী, বদরখালী",
    subscriptionType: "মাসিক",
    monthlyAmount: 500,
    pledgeDate: "2024-03-15",
    status: "সক্রিয়",
    note: "মাসিক সাধারণ দাতা",
    payments: {
      "জানুয়ারি": 500, "ফেব্রুয়ারি": 500, "মার্চ": 500, "এপ্রিল": 500,
      "মে": 500, "জুন": 500, "জুলাই": 500, "আগস্ট": 500, "সেপ্টেম্বর": 500
    }
  },
  {
    id: "CON-003",
    name: "জনাব রফিকুল ইসলাম (প্রবাসী)",
    fatherName: "মরহুম গোলাম বারী",
    mobile: "01987654321",
    address: "দুবাই / বদরখালী",
    subscriptionType: "মাসিক",
    monthlyAmount: 2000,
    pledgeDate: "2023-06-01",
    status: "সক্রিয়",
    note: "বিকাশের মাধ্যমে প্রেরণ করেন",
    payments: {
      "জানুয়ারি": 2000, "ফেব্রুয়ারি": 2000, "মার্চ": 2000, "এপ্রিল": 2000,
      "মে": 2000, "জুন": 2000, "জুলাই": 2000, "আগস্ট": 2000, "সেপ্টেম্বর": 2000, "অক্টোবর": 2000
    }
  },
  {
    id: "CON-004",
    name: "আলহাজ্ব বশির আহমেদ চৌধুরী",
    fatherName: "হাজী সুলতান চৌধুরী",
    mobile: "01834567890",
    address: "জব্বর নগর",
    subscriptionType: "মাসিক",
    monthlyAmount: 1500,
    pledgeDate: "2025-01-01",
    status: "সক্রিয়",
    note: "মাদ্রাসার শুভাকাঙ্ক্ষী",
    payments: {
      "জানুয়ারি": 1500, "ফেব্রুয়ারি": 1500, "মার্চ": 1500, "এপ্রিল": 1500, "মে": 1500
    }
  },
  {
    id: "CON-005",
    name: "ডা. এনামুল হক",
    fatherName: "আব্দুল হাকিম",
    mobile: "01755667788",
    address: "চকরিয়া বাজার",
    subscriptionType: "মাসিক",
    monthlyAmount: 1000,
    pledgeDate: "2024-07-01",
    status: "সক্রিয়",
    note: "চিকিৎসা সহায়তা ও চাঁদা",
    payments: {
      "জানুয়ারি": 1000, "ফেব্রুয়ারি": 1000, "মার্চ": 1000, "এপ্রিল": 1000,
      "মে": 1000, "জুন": 1000, "জুলাই": 1000, "আগস্ট": 1000
    }
  }
];

export const INITIAL_DONORS = [
  {
    id: "DON-001",
    name: "মোহাম্মদ আলী সওদাগর",
    fatherName: "আহমদুর রহমান",
    mobile: "01712349876",
    address: "চকরিয়া পৌরসভা",
    donationType: "সাধারণ দান",
    totalDonated: 15000,
    lastDonationDate: "2026-10-12",
    note: "মাদ্রাসার পানির পাম্প ও নলকূপ মেরামতে দান"
  },
  {
    id: "DON-002",
    name: "আলহাজ্ব দেলোয়ার হোসেন",
    fatherName: "মরহুম আকবর আলী",
    mobile: "01822334455",
    address: "বদরখালী নতুন বাজার",
    donationType: "মসজিদ ফান্ড",
    totalDonated: 25000,
    lastDonationDate: "2026-09-28",
    note: "মসজিদের টাইলস ও ফ্যান ক্রয় বাবদ"
  },
  {
    id: "DON-003",
    name: "ইঞ্জি. মোশাররফ করিম",
    fatherName: "আবুল কাশেম",
    mobile: "01911223344",
    address: "ঢাকা / চকরিয়া",
    donationType: "এককালীন অনুদান",
    totalDonated: 50000,
    lastDonationDate: "2026-08-15",
    note: "লাইব্রেরির নতুন কিতাব আলমারি ক্রয়"
  },
  {
    id: "DON-004",
    name: "বেগম জাহানারা খাতুন",
    fatherName: "স্বামী: হাজী কামাল উদ্দিন",
    mobile: "01633445566",
    address: "মাতামুহুরী",
    donationType: "সদকা ও মেহমানদারি",
    totalDonated: 10000,
    lastDonationDate: "2026-10-05",
    note: "ছাত্রদের খাসি সদকা ও উন্নত খাবার"
  }
];

export const INITIAL_ZAKAT_DONORS = [
  {
    id: "ZAK-001",
    name: "আলহাজ্ব মোস্তফা কামাল",
    fatherName: "মরহুম সিরাজুল হক",
    mobile: "01819556677",
    address: "চকরিয়া ভিআইপি রোড",
    totalZakat: 65000,
    lastZakatDate: "2026-04-10",
    note: "রমজানুল মোবারকে বার্ষিক যাকাত প্রদান"
  },
  {
    id: "ZAK-002",
    name: "হাজী মুহাম্মদ ইউনুস",
    fatherName: "মৌলভী ফজলুল করিম",
    mobile: "01711889900",
    address: "বদরখালী বাজার",
    totalZakat: 40000,
    lastZakatDate: "2026-05-18",
    note: "এতিম ও গরীব ছাত্রদের পোশাক ও খোরাকী বাবদ যাকাত"
  },
  {
    id: "ZAK-003",
    name: "জনাব নাজমুল হাসান (প্রবাসী)",
    fatherName: "হাজী আলী আকবর",
    mobile: "01922778899",
    address: "জেদ্দা, সৌদি আরব",
    totalZakat: 80000,
    lastZakatDate: "2026-06-25",
    note: "লিল্লা বোডিং খাদ্য তহবিলে যাকাত"
  },
  {
    id: "ZAK-004",
    name: "হাজী ফরিদ উদ্দিন কোম্পানি",
    fatherName: "মরহুম হাবিবুর রহমান",
    mobile: "01844556677",
    address: "মাতামুহুরী ঘাট",
    totalZakat: 50000,
    lastZakatDate: "2026-08-02",
    note: "চলতি বছরের নির্ধারিত যাকাতের কিস্তি"
  }
];

export const INITIAL_WEEKLY_BAZAR = [
  {
    id: "WBZ-001",
    voucherNo: "WB-2026-01",
    date: "2026-10-07",
    week: "1 সপ্তাহ",
    month: "অক্টোবর",
    year: "2026",
    buyer: "হাফেজ আযম নূর (ক্যাশিয়ার)",
    account: "নগদ ক্যাশ (Hand Cash)",
    category: "দৈনিক বাজার খরচ",
    items: [
      { name: "মিনিকেট চাল (৫০ কেজি)", qty: "২ বস্তা", rate: 3200, total: 6400 },
      { name: "মসুর ডাল (চিকন)", qty: "১০ কেজি", rate: 135, total: 1350 },
      { name: "সয়াবিন তেল (তীর)", qty: "১০ লিটার", rate: 175, total: 1750 },
      { name: "রুই মাছ", qty: "৮ কেজি", rate: 280, total: 2240 },
      { name: "মুরগির মাংস (ব্রয়লার)", qty: "১২ কেজি", rate: 185, total: 2220 },
      { name: "আলু ও পেঁয়াজ", qty: "২৫ কেজি", rate: 45, total: 1125 },
      { name: "রসুন, আদা ও হলুদ", qty: "৫ কেজি", rate: 160, total: 800 },
      { name: "কাঁচা মরিচ ও বিভিন্ন সবজি", qty: "বিভিন্ন", rate: 650, total: 650 }
    ],
    totalAmount: 16535,
    note: "১ম সপ্তাহের বোডিং বাজার সম্পন্ন"
  },
  {
    id: "WBZ-002",
    voucherNo: "WB-2026-02",
    date: "2026-10-14",
    week: "2 সপ্তাহ",
    month: "অক্টোবর",
    year: "2026",
    buyer: "হাফেজ আযম নূর (ক্যাশিয়ার)",
    account: "নগদ ক্যাশ (Hand Cash)",
    category: "দৈনিক বাজার খরচ",
    items: [
      { name: "নাজিরশাইল চাল (৫০ কেজি)", qty: "২ বস্তা", rate: 3400, total: 6800 },
      { name: "তেলাপিয়া ও পাঙ্গাস মাছ", qty: "১৫ কেজি", rate: 190, total: 2850 },
      { name: "সয়াবিন তেল (রূপচাঁদা)", qty: "১০ লিটার", rate: 180, total: 1800 },
      { name: "ডিম (লাল)", qty: "২ খাঁচি (৬০ টি)", rate: 12.5, total: 750 },
      { name: "শাক-সবজি ও মশলাপাতি", qty: "বিভিন্ন", rate: 1200, total: 1200 }
    ],
    totalAmount: 13400,
    note: "২য় সপ্তাহের সাধারণ বাজার"
  },
  {
    id: "WBZ-003",
    voucherNo: "WB-2026-03",
    date: "2026-10-21",
    week: "3 সপ্তাহ",
    month: "অক্টোবর",
    year: "2026",
    buyer: "হাফেজ আযম নূর (ক্যাশিয়ার)",
    account: "নগদ ক্যাশ (Hand Cash)",
    category: "দৈনিক বাজার খরচ",
    items: [
      { name: "মিনিকেট চাল", qty: "২ বস্তা", rate: 3200, total: 6400 },
      { name: "গরুর মাংস (খাসি সদকা সহ)", qty: "১০ কেজি", rate: 750, total: 7500 },
      { name: "সয়াবিন তেল ও ডাল", qty: "১০ লিটার + ৫ কেজি", rate: 2400, total: 2400 },
      { name: "মসলা, রসুন, আদা", qty: "বিভিন্ন", rate: 950, total: 950 }
    ],
    totalAmount: 17250,
    note: "৩য় সপ্তাহের ছাত্রাবাস রসদ ক্রয়"
  }
];

export const INITIAL_MONTHLY_BAZAR = [
  {
    id: "MBZ-001",
    voucherNo: "MB-2026-09",
    date: "2026-09-30",
    month: "সেপ্টেম্বর",
    year: "2026",
    buyer: "হাফেজ আযম নূর (ক্যাশিয়ার)",
    account: "নগদ ক্যাশ (Hand Cash)",
    category: "বোডিং চাল-ডাল-তেল ক্রয়",
    items: "মাসিক বোডিং চাল (১০ বস্তা), তেল (২ ড্রাম), ডাল (৫০ কেজি)",
    totalAmount: 58500,
    note: "সেপ্টেম্বর মাসের সামগ্রিক খাদ্য রসদ সরবরাহ"
  },
  {
    id: "MBZ-002",
    voucherNo: "MB-2026-08",
    date: "2026-08-31",
    month: "আগস্ট",
    year: "2026",
    buyer: "হাফেজ আযম নূর (ক্যাশিয়ার)",
    account: "নগদ ক্যাশ (Hand Cash)",
    category: "বোডিং চাল-ডাল-তেল ক্রয়",
    items: "মাসিক চাল (৮ বস্তা), ডাল, তেল, চিনি, লবণ ও মসলাপাতি",
    totalAmount: 52400,
    note: "আগস্ট মাসের বোডিং রসদ"
  }
];

export const INITIAL_TEACHER_SALARY_PAYMENTS = [
  {
    id: "TSP-001",
    voucherNo: "SAL-2026-09-01",
    teacherId: "TCH-001",
    teacherName: "মাওলানা মাহমুদুল করিম",
    designation: "মুহতামিম / প্রধান শিক্ষক",
    month: "সেপ্টেম্বর",
    year: "2026",
    date: "2026-10-05",
    amount: 22000,
    account: "নগদ ক্যাশ (Hand Cash)",
    note: "সেপ্টেম্বর ২০২৬ মূল বেতন পরিশোধ"
  },
  {
    id: "TSP-002",
    voucherNo: "SAL-2026-09-02",
    teacherId: "TCH-002",
    teacherName: "হাফেজ আযম নূর",
    designation: "সহকারী প্রধান ও ক্যাশিয়ার",
    month: "সেপ্টেম্বর",
    year: "2026",
    date: "2026-10-05",
    amount: 18000,
    account: "বিকাশ হিসাব (01820050095)",
    note: "সেপ্টেম্বর ২০২৬ বেতন প্রদান"
  },
  {
    id: "TSP-003",
    voucherNo: "SAL-2026-09-03",
    teacherId: "TCH-003",
    teacherName: "মাওলানা আব্দুর রহমান",
    designation: "সিনিয়র শিক্ষক",
    month: "সেপ্টেম্বর",
    year: "2026",
    date: "2026-10-05",
    amount: 15000,
    account: "নগদ ক্যাশ (Hand Cash)",
    note: "সেপ্টেম্বর ২০২৬ বেতন পরিশোধ"
  }
];

export const INITIAL_KHURAKI_PAYMENTS = [
  {
    id: "KHU-001",
    voucherNo: "KH-2026-001",
    date: "2026-10-02",
    studentId: "STU-001",
    studentName: "রুহান",
    roll: "101",
    jamat: "হিফজ বিভাগ",
    month: "অক্টোবর",
    year: "2026",
    amount: 1500,
    account: "নগদ ক্যাশ (Hand Cash)",
    receiver: "হাফেজ আযম নূর"
  },
  {
    id: "KHU-002",
    voucherNo: "KH-2026-002",
    date: "2026-10-03",
    studentId: "STU-004",
    studentName: "সাওদা বিনতে সায়েম",
    roll: "120",
    jamat: "নাজেরা বিভাগ",
    month: "অক্টোবর",
    year: "2026",
    amount: 1200,
    account: "বিকাশ হিসাব (01820050095)",
    receiver: "হাফেজ আযম নূর"
  },
  {
    id: "KHU-003",
    voucherNo: "KH-2026-003",
    date: "2026-10-04",
    studentId: "STU-002",
    studentName: "Rabeya",
    roll: "102",
    jamat: "হিফজ বিভাগ",
    month: "অক্টোবর",
    year: "2026",
    amount: 1500,
    account: "নগদ ক্যাশ (Hand Cash)",
    receiver: "মাহমুদুল করিম"
  }
];

export const INITIAL_SALARY_PAYMENTS = [
  {
    id: "TUI-001",
    voucherNo: "TF-2026-001",
    date: "2026-10-01",
    studentId: "STU-001",
    studentName: "রুহান",
    roll: "101",
    jamat: "হিফজ বিভাগ",
    month: "অক্টোবর",
    year: "2026",
    amount: 600,
    account: "নগদ ক্যাশ (Hand Cash)",
    receiver: "হাফেজ আযম নূর"
  },
  {
    id: "TUI-002",
    voucherNo: "TF-2026-002",
    date: "2026-10-02",
    studentId: "STU-003",
    studentName: "Mahir",
    roll: "103",
    jamat: "হিফজ বিভাগ",
    month: "অক্টোবর",
    year: "2026",
    amount: 700,
    account: "বিকাশ হিসাব (01820050095)",
    receiver: "হাফেজ আযম নূর"
  },
  {
    id: "TUI-003",
    voucherNo: "TF-2026-003",
    date: "2026-10-05",
    studentId: "STU-005",
    studentName: "Tanvir",
    roll: "105",
    jamat: "হিফজ বিভাগ",
    month: "অক্টোবর",
    year: "2026",
    amount: 500,
    account: "নগদ ক্যাশ (Hand Cash)",
    receiver: "মাহমুদুল করিম"
  }
];

export const INITIAL_USERS = [
  {
    id: "USR-001",
    name: "মুহতামিম / সুপার এডমিন",
    email: "admin@gmail.com",
    username: "admin",
    phone: "01820050095",
    role: "Super Admin",
    password: "admin1234",
    status: "Active",
    createdAt: "2026-01-01"
  },
  {
    id: "USR-002",
    name: "হাফেজ আযম নূর",
    email: "hafezazamnur@gmail.com",
    username: "cashier",
    phone: "01847657580",
    role: "Cashier / Accountant",
    password: "admin1234",
    status: "Active",
    createdAt: "2026-01-01"
  },
  {
    id: "USR-003",
    name: "মাওলানা মাহমুদুল করিম",
    email: "principal@gmail.com",
    username: "principal",
    phone: "01820050095",
    role: "Teacher",
    password: "admin1234",
    status: "Active",
    createdAt: "2026-01-01"
  }
];

