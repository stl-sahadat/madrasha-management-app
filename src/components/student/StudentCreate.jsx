import React, { useState } from 'react';
import {
  UserPlus,
  ArrowLeft,
  CheckCircle,
  Upload,
  User,
  Users,
  MapPin,
  BookOpen,
  CreditCard,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentCreate = () => {
  const { jamats, accounts, addStudent, setActiveTab } = useApp();

  // 5 Section Form Data
  const [formData, setFormData] = useState({
    // Section 1: Basic Info
    name: '',
    nameEn: '',
    jamat: jamats[0]?.name || 'হিফজ বিভাগ',
    roll: '',
    session: '২০২৬',
    dob: '',
    bloodGroup: 'A+',
    birthReg: '',

    // Section 2: Guardian Info
    fatherName: '',
    fatherOcc: '',
    guardianPhone: '',
    motherName: '',
    motherOcc: '',
    nid: '',

    // Section 3: Address
    presentAddress: '',
    permanentAddress: '',

    // Section 4: Previous Institute
    prevInstitute: '',
    prevClass: '',
    prevYear: '',
    prevResult: '',

    // Section 5: Fees & Photo
    monthlyFee: '800',
    khurakiFee: '2000',
    admissionFee: '1500',
    admissionAccount: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    photo: '/students/FB_IMG_1791220812856.webp',
  });

  const availablePhotos = [
    '/students/FB_IMG_1791220812856.webp',
    '/students/IMG_20261014_124639.webp',
    '/students/IMG_20261014_124644.webp',
    '/students/IMG_20261014_124654.webp',
    '/students/IMG_20261014_124710.webp',
    '/students/IMG_20261014_124723.webp',
    '/students/IMG_20261014_124849.webp',
    '/students/IMG_20261014_124918.webp',
    '/students/IMG_20261014_124949.webp',
    '/students/IMG_20261015_110444.webp',
    '/students/IMG_20261015_110504.webp',
    '/students/IMG_20260930_063637_063812.webp',
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData(prev => ({ ...prev, photo: uploadEvent.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.roll || !formData.guardianPhone) {
      alert('অনুগ্রহ করে নাম, রোল এবং অভিভাবকের ফোন নম্বর পূরণ করুন');
      return;
    }

    addStudent({
      ...formData,
      address: formData.presentAddress || 'বদরখালী, চকরিয়া, কক্সবাজার',
      monthlyFee: parseFloat(formData.monthlyFee) || 0,
      khurakiFee: parseFloat(formData.khurakiFee) || 0,
      admissionFee: parseFloat(formData.admissionFee) || 0,
      admissionAccount: formData.admissionAccount
    });

    setActiveTab('student-list');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setActiveTab('student-list')}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
              <UserPlus className="w-6 h-6 text-[#0f626a]" />
              <span>নতুন শিক্ষার্থী ভর্তি ফরম (/admin/student/create)</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              ৫টি সুনির্দিষ্ট বিভাগে শিক্ষার্থীর পূর্ণাঙ্গ তথ্যাবলী দাখিল করুন
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('student-list')}
          className="text-xs font-semibold text-[#0f626a] hover:underline"
        >
          তালিকায় ফিরে যান
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: Basic Information */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100 text-[#0f626a]">
            <User className="w-5 h-5" />
            <h3 className="font-bold text-sm text-[#082f32]">
              সেকশন ১: মৌলিক তথ্য (Basic Student Information)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                শিক্ষার্থীর নাম (বাংলায়) *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="যেমন: মুহাম্মদ তাওহীদ হাসান"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                শিক্ষার্থীর নাম (ইংরেজি)
              </label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                placeholder="e.g. Muhammad Tawhid Hasan"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                জামাত / বিভাগ *
              </label>
              <select
                name="jamat"
                value={formData.jamat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
              >
                {jamats.map(j => (
                  <option key={j.id} value={j.name}>{j.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                রোল নম্বর *
              </label>
              <input
                type="text"
                name="roll"
                value={formData.roll}
                onChange={handleChange}
                placeholder="যেমন: ১১৫"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                শিক্ষাবর্ষ / সেশন
              </label>
              <input
                type="text"
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                রক্তের গ্রুপ
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                জন্ম তারিখ
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                জন্ম নিবন্ধন নম্বর (১৭ ডিজিট)
              </label>
              <input
                type="text"
                name="birthReg"
                value={formData.birthReg}
                onChange={handleChange}
                placeholder="যেমন: 20131592310001234"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Guardian Information */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100 text-[#0f626a]">
            <Users className="w-5 h-5" />
            <h3 className="font-bold text-sm text-[#082f32]">
              সেকশন ২: অভিভাবকের তথ্য (Guardian Information)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                পিতার নাম
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="পিতার পুরো নাম"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                পিতার পেশা
              </label>
              <input
                type="text"
                name="fatherOcc"
                value={formData.fatherOcc}
                onChange={handleChange}
                placeholder="যেমন: ব্যবসায়ী / শিক্ষক"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                অভিভাবকের মোবাইল নম্বর *
              </label>
              <input
                type="text"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="018XXXXXXXX"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                মাতার নাম
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="মাতার পুরো নাম"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                মাতার পেশা
              </label>
              <input
                type="text"
                name="motherOcc"
                value={formData.motherOcc}
                onChange={handleChange}
                placeholder="যেমন: গৃহিনী"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                অভিভাবকের এনআইডি নম্বর
              </label>
              <input
                type="text"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                placeholder="NID নম্বর"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Address */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100 text-[#0f626a]">
            <MapPin className="w-5 h-5" />
            <h3 className="font-bold text-sm text-[#082f32]">
              সেকশন ৩: বর্তমান ও স্থায়ী ঠিকানা (Address Details)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                বর্তমান ঠিকানা (গ্রাম, ডাকঘর, উপজেলা, জেলা)
              </label>
              <textarea
                name="presentAddress"
                rows="3"
                value={formData.presentAddress}
                onChange={handleChange}
                placeholder="বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                স্থায়ী ঠিকানা
              </label>
              <textarea
                name="permanentAddress"
                rows="3"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="একই হলে খালি রাখুন বা স্থায়ী ঠিকানা লিখুন"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 4: Previous Institute */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100 text-[#0f626a]">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold text-sm text-[#082f32]">
              সেকশন ৪: পূর্ববর্তী শিক্ষা প্রতিষ্ঠানের তথ্য (Previous Academic Record)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                পূর্বের মাদ্রাসা বা স্কুলের নাম
              </label>
              <input
                type="text"
                name="prevInstitute"
                value={formData.prevInstitute}
                onChange={handleChange}
                placeholder="পূর্বে অধ্যয়নকৃত প্রতিষ্ঠানের নাম"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                পূর্বের শ্রেণী / বিভাগ
              </label>
              <input
                type="text"
                name="prevClass"
                value={formData.prevClass}
                onChange={handleChange}
                placeholder="যেমন: নাজেরা"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                পাশের সন ও প্রাপ্ত ফলাফল
              </label>
              <input
                type="text"
                name="prevResult"
                value={formData.prevResult}
                onChange={handleChange}
                placeholder="যেমন: ২০২৫, মুমতাজ"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Fees & Photo */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100 text-[#0f626a]">
            <CreditCard className="w-5 h-5" />
            <h3 className="font-bold text-sm text-[#082f32]">
              সেকশন ৫: ফি কাঠামো ও ছবি নির্বাচন (Fee Structure & Photo Selection)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ভর্তি ফি (এককালীন) ৳
              </label>
              <input
                type="number"
                name="admissionFee"
                value={formData.admissionFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                মাসিক নির্ধারিত বেতন ৳
              </label>
              <input
                type="number"
                name="monthlyFee"
                value={formData.monthlyFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                মাসিক খোরাকী ফি (আবাসিক) ৳
              </label>
              <input
                type="number"
                name="khurakiFee"
                value={formData.khurakiFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ভর্তি ফি জমা গ্রহণের অ্যাকাউন্ট
              </label>
              <select
                name="admissionAccount"
                value={formData.admissionAccount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white font-medium"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.name}>{acc.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Photo Picker & Custom Upload */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              শিক্ষার্থীর ছবি নির্বাচন অথবা গ্যালারি থেকে আপলোড করুন:
            </label>
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {/* Custom Upload Button */}
              <label className="cursor-pointer px-3 py-2 border-2 border-dashed border-[#0f626a]/50 rounded-xl hover:bg-[#eaf4f5] text-center flex flex-col items-center justify-center shrink-0 w-24 h-20 text-[11px] text-[#0f626a] font-bold transition">
                <Upload className="w-5 h-5 mb-1 text-[#0f626a]" />
                <span>ছবি আপলোড</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {/* Presets */}
              {availablePhotos.map((photoPath, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData(prev => ({ ...prev, photo: photoPath }))}
                  className={`shrink-0 cursor-pointer p-1 rounded-xl border-2 transition ${
                    formData.photo === photoPath
                      ? 'border-[#0f626a] bg-[#eaf4f5] scale-105 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photoPath}
                    alt="avatar"
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('student-list')}
            className="px-5 py-2.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f626a] hover:bg-[#0c5259] rounded-xl shadow-lg transition flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>ভর্তি সম্পন্ন করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};
