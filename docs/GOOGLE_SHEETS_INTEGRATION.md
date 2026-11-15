# Google Sheets & Excel Integration Guide (গুগল শিট ও এক্সেল ইন্টিগ্রেশন নির্দেশিকা)

## ১. ভূমিকা (Overview)
মাদ্রাসা ম্যানেজমেন্ট সফটওয়্যারটি শিক্ষক, কর্মকর্তা এবং পরিচালকদের সুবিধার্থে **Google Sheets** এবং **Microsoft Excel**-এর সাথে দ্বিমুখী ডেটা সিঙ্ক (Two-Way Data Sync) এবং বাল্ক এক্সপোর্ট/ইমপোর্ট (Bulk Export/Import) সমর্থন করে। এর মাধ্যমে ছাত্র-ছাত্রীর ভর্তি তথ্য, মাসিক ফি কালেকশন, শিক্ষকদের হাজিরা এবং দৈনিক আয়-ব্যয়ের হিসাব সরাসরি গুগল শিটে সংরক্ষণ বা গুগল শিট থেকে মাদ্রাসার ডাটাবেজে নিয়ে আসা যায়।

---

## ২. সমর্থনযোগ্য ডেটা ফরম্যাট (Supported Schemas)

### ২.১ ছাত্র-ছাত্রী তথ্য শিট (Student Directory Schema)
গুগল শিটে নতুন শিক্ষার্থীদের তালিকা তৈরি করার সময় নিচের কলাম নামগুলো হুবহু ব্যবহার করুন:

| কলাম নাম (Header) | ফিল্ড টাইপ | উদাহরণ | বিবরণ |
|-------------------|------------|--------|-------|
| `id` | Number / Text | `101` | শিক্ষার্থীর ইউনিক আইডি |
| `name` | Text | `মুহাম্মদ আবু বকর` | শিক্ষার্থীর পূর্ণ নাম (বাংলায়) |
| `roll` | Number | `১` | রোল নম্বর |
| `regNo` | Number | `20261054` | রেজিস্ট্রেশন নম্বর |
| `jamat` | Text | `হিফজ বিভাগ` | জামাত (হিফজ, নাজেরা, মক্তব, কিতাব, ইবতিদাইয়্যাহ) |
| `phone` | Text | `01820050095` | অভিভাবকের মোবাইল নম্বর |
| `fatherName` | Text | `মাওলানা নুরুল হক` | পিতার নাম |
| `motherName` | Text | `ফাতেমা জান্নাত` | মাতার নাম |
| `monthlyFee` | Number | `1500` | মাসিক ধার্যকৃত বেতন (টাকায়) |
| `khurakiFee` | Number | `2000` | মাসিক খোরাকী ফি (যদি থাকে) |
| `bloodGroup` | Text | `A+` | রক্তের গ্রুপ |
| `status` | Text | `active` | সক্রিয় বা নিষ্ক্রিয় |

---

### ২.২ ফি কালেকশন ও জমা-খরচ শিট (Fee & Voucher Transactions)

| কলাম নাম (Header) | ফিল্ড টাইপ | উদাহরণ | বিবরণ |
|-------------------|------------|--------|-------|
| `date` | Date (YYYY-MM-DD) | `2026-11-15` | লেনদেনের তারিখ |
| `voucherNo` | Text | `V-2026-0042` | ভাউচার নম্বর |
| `type` | Text | `deposit` / `expense` | জমা নাকি খরচ |
| `category` | Text | `মাসিক বেতন` | হিসাবের খাত |
| `studentId` | Number | `101` | শিক্ষার্থীর আইডি (প্রযোজ্য ক্ষেত্রে) |
| `amount` | Number (2 decimals) | `1500.00` | টাকার পরিমাণ (০.০১ পয়সা নির্ভুল) |
| `paymentMethod` | Text | `Cash` / `Bkash` | পেমেন্ট মাধ্যম |
| `receivedBy` | Text | `মাওলানা কফিল উদ্দিন`| গ্রহণকারী শিক্ষক/কর্মকর্তা |
| `notes` | Text | `নভেম্বর মাসের বেতন` | মন্তব্য বা বিবরণ |

---

## ৩. গুগল শিট থেকে ডাটা ইমপোর্ট করার পদ্ধতি (Importing from Google Sheets)

### ৩.১ CSV ফরম্যাটে এক্সপোর্ট করা:
1. আপনার Google Sheet ওপেন করুন।
2. মেন্যু থেকে **File** > **Download** > **Comma Separated Values (.csv)** সিলেক্ট করুন।
3. সফটওয়্যারের **ছাত্র/ছাত্রী** > **ছাত্র/ছাত্রী তৈরি** অথবা **ডাটা ইমপোর্ট** পেজে যান।
4. **Choose File** বাটনে ক্লিক করে ডাউনলোড করা `.csv` ফাইলটি সিলেক্ট করুন।
5. সফটওয়্যারটি স্বয়ংক্রিয়ভাবে কলাম যাচাই করবে এবং সফলভাবে শিক্ষার্থীদের ডাটাবেজে অন্তর্ভুক্ত করবে।

### ৩.২ সরাসরি Google Sheets API / Apps Script-এর মাধ্যমে স্বয়ংক্রিয় সিঙ্ক (Automated Sync):
মাদ্রাসার অনলাইন সার্ভারের সাথে সরাসরি গুগল শিট যুক্ত করতে নিচের Google Apps Script ব্যবহার করতে পারেন:

```javascript
/**
 * Google Apps Script for Automated Madrasha Sync
 * Extensions > Apps Script-এ গিয়ে পেস্ট করুন
 */
function syncWithMadrashaApp() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var students = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var student = {};
    for (var j = 0; j < headers.length; j++) {
      student[headers[j]] = row[j];
    }
    students.push(student);
  }

  var payload = JSON.stringify({ students: students });
  var options = {
    method: "post",
    contentType: "application/json",
    payload: payload,
    headers: {
      "Authorization": "Bearer YOUR_SECRET_API_TOKEN"
    }
  };

  var response = UrlFetchApp.fetch("https://madrasha-management.pages.dev/api/students/bulk-sync", options);
  Logger.log(response.getContentText());
}
```

---

## ৪. সফটওয়্যার থেকে গুগল শিটে ডেটা নেওয়ার পদ্ধতি (Export to Google Sheets)

মাদ্রাসা ম্যানেজমেন্ট সফটওয়্যারের যেকোনো রিপোর্ট বা টেবিল থেকে এক ক্লিকেই ডেটা এক্সপোর্ট করা যায়:
1. যেকোনো টেবিলের ওপরে থাকা **"Excel / CSV এক্সপোর্ট"** বাটনে ক্লিক করুন।
2. আপনার কম্পিউটারে একটি `.xlsx` বা `.csv` ফাইল সেভ হবে।
3. [Google Sheets](https://sheets.google.com)-এ যান এবং একটি নতুন স্প্রেডশিট খুলুন।
4. **File** > **Import** > **Upload**-এ গিয়ে ডাউনলোড করা ফাইলটি ড্রপ করুন।
5. সমস্ত বাংলা ফন্ট (SolaimanLipi) এবং টাকার হিসাব কোনো ধরনের ফরম্যাটিং নষ্ট না হয়ে সুন্দরভাবে প্রদর্শিত হবে।

---

## ৫. সাধারণ সমস্যা ও সমাধান (Troubleshooting & FAQs)

### প্রশ্ন ১: গুগল শিট থেকে নাম ইমপোর্ট করলে বাংলা ভেঙে যায় বা প্রশ্নবোধক চিহ্ন (???) আসে কেন?
**সমাধান:** ফাইল সেভ করার সময় নিশ্চিত করুন যে এনকোডিং **UTF-8** সিলেক্ট করা আছে। Google Sheets নিজে থেকেই UTF-8 ফরম্যাটে এক্সপোর্ট করে, তাই Google Sheets ব্যবহার করলে এই সমস্যা হয় না।

### প্রশ্ন ২: টাকার অঙ্কে কমা বা মুদ্রা প্রতীক (৳) থাকলে কোনো সমস্যা হবে কি?
**সমাধান:** সফটওয়্যারের ইন্টিগ্রেশন স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে `৳`, `,`, এবং স্পেস ফিল্টার করে বিশুদ্ধ সংখ্যায় রূপান্তর করে নেয়। তবে সেরা ফলাফলের জন্য গুগল শিটের কলাম ফরম্যাট `Number (Plain Text)` রাখা উত্তম।
