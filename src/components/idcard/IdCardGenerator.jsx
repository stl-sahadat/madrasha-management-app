import React, { useState } from 'react';
import {
  IdCard,
  Printer,
  Search,
  CheckCircle,
  Download,
  Sparkles,
  QrCode,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IdCardGenerator = ({ defaultType = 'student' }) => {
  const {
    students,
    teachers,
    profile,
    jamats,
    selectedStudentForIdCard,
    setSelectedStudentForIdCard
  } = useApp();

  const [cardType, setCardType] = useState(defaultType); // 'student' or 'teacher'
  const [selectedJamatFilter, setSelectedJamatFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(
    selectedStudentForIdCard?.id || students[0]?.id || ''
  );

  const filteredStudents = selectedJamatFilter === 'all'
    ? students
    : students.filter(s => s.jamat === selectedJamatFilter);

  const currentStudent = students.find(s => s.id === selectedId) || selectedStudentForIdCard || students[0] || {
    id: 'STU-001',
    name: 'মুহাম্মদ আবু বকর',
    nameEn: 'Muhammad Abu Bakr',
    roll: '১০১',
    jamat: 'হিফজ বিভাগ',
    guardianPhone: '01820050095',
    fatherName: 'আব্দুল জলিল',
    bloodGroup: 'A+',
    photo: '/students/FB_IMG_1791220812856.webp'
  };

  const currentTeacher = teachers.find(t => t.id === selectedId) || teachers[0] || {
    id: 'TCH-001',
    name: 'মাওলানা মাহমুদুল করিম',
    designation: 'মুহতামিম',
    department: 'হিফজ বিভাগ',
    qualification: 'দাওরায়ে হাদিস',
    mobile: '01820050095'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <IdCard className="w-6 h-6 text-[#0f626a]" />
            <span>ডিজিটাল পরিচয়পত্র জেনারেটর (Double-Sided ID Card)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            সামনে ও পেছনের ডাবল-সাইডেড প্রিন্টযোগ্য স্মার্ট আইডি কার্ড (৩০০px × ৪৮০px)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setCardType('student');
                setSelectedId(students[0]?.id || '');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                cardType === 'student' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600'
              }`}
            >
              শিক্ষার্থী কার্ড
            </button>
            <button
              onClick={() => {
                setCardType('teacher');
                setSelectedId(teachers[0]?.id || '');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                cardType === 'teacher' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600'
              }`}
            >
              শিক্ষক কার্ড
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#0f626a] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#0c5259] transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>আইডি কার্ড প্রিন্ট করুন</span>
          </button>
        </div>
      </div>

      {/* Selector Dropdown with Jamat Filter */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm no-print flex flex-col sm:flex-row sm:items-center gap-3">
        {cardType === 'student' && (
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1">
              জামাত ফিল্টার:
            </label>
            <select
              value={selectedJamatFilter}
              onChange={(e) => setSelectedJamatFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
            >
              <option value="all">সকল জামাত (All Jamats)</option>
              {jamats.map(j => (
                <option key={j.id} value={j.name}>{j.name} ({j.count} জন)</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1">
            {cardType === 'student' ? `শিক্ষার্থী নির্বাচন করুন (${filteredStudents.length} জন):` : `শিক্ষক নির্বাচন করুন (${teachers.length} জন):`}
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          >
            {cardType === 'student' ? (
              filteredStudents.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} (রোল: {s.roll}) - {s.jamat}
                </option>
              ))
            ) : (
              teachers.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} - {t.designation}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Cards Preview Area (300px x 480px per card) */}
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-3xl border border-dashed border-gray-300 print:bg-white print:border-none print:p-0">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">

          {/* FRONT SIDE (300px x 480px) */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-gray-500 mb-2 no-print">
              [ সম্মুখ ভাগ / FRONT SIDE ] - ৩০০ × ৪৮০ পিক্সেল
            </span>

            <div
              style={{ width: '300px', height: '480px' }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col justify-between relative print:shadow-none print:border print:border-black"
            >
              {/* Header Banner */}
              <div className="bg-gradient-to-b from-[#0f626a] to-[#0a474d] text-white p-3 text-center relative border-b-2 border-amber-400">
                <div className="flex justify-center mb-1">
                  <div className="w-8 h-8 rounded-full bg-white text-[#0f626a] flex items-center justify-center font-bold text-xs shadow">
                    মাদ্রাসা
                  </div>
                </div>
                <h3 className="font-bold text-[13px] leading-tight text-amber-200">
                  {profile.name}
                </h3>
                <p className="text-[9px] text-teal-100 mt-0.5">
                  বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার
                </p>
                <div className="inline-block mt-1 px-2 py-0.2 bg-amber-400 text-teal-950 text-[9px] font-extrabold rounded-full uppercase tracking-wider">
                  {cardType === 'student' ? 'শিক্ষার্থী পরিচয়পত্র' : 'শিক্ষক পরিচয়পত্র'}
                </div>
              </div>

              {/* Body Content */}
              <div className="px-4 py-2 flex flex-col items-center flex-1 justify-center space-y-2">
                {/* Photo */}
                <div className="relative">
                  <img
                    src={cardType === 'student' ? currentStudent.photo : 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&h=200&fit=crop'}
                    alt="ID Photo"
                    className="w-24 h-28 object-cover rounded-xl border-3 border-[#0f626a] shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&h=200&fit=crop";
                    }}
                  />
                  {cardType === 'student' && (
                    <span className="absolute -bottom-2 right-1/2 translate-x-1/2 px-2 py-0.5 bg-rose-600 text-white font-bold text-[9px] rounded-full shadow">
                      {currentStudent.bloodGroup}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="text-center pt-1">
                  <h4 className="font-bold text-sm text-[#082f32] leading-tight">
                    {cardType === 'student' ? currentStudent.name : currentTeacher.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {cardType === 'student' ? currentStudent.nameEn : currentTeacher.qualification}
                  </p>
                </div>

                {/* Field Details */}
                <div className="w-full bg-[#f0f9fa] p-2.5 rounded-xl border border-[#0f626a]/20 text-[10px] space-y-1">
                  {cardType === 'student' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500">জামাত / শ্রেণী:</span>
                        <span className="font-bold text-[#0f626a]">{currentStudent.jamat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">রোল নম্বর:</span>
                        <span className="font-mono font-bold text-gray-800">{currentStudent.roll}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">পিতার নাম:</span>
                        <span className="font-semibold text-gray-800">{currentStudent.fatherName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">জরুরি যোগাযোগ:</span>
                        <span className="font-mono font-bold text-[#0f626a]">{currentStudent.guardianPhone}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500">পদবী:</span>
                        <span className="font-bold text-[#0f626a]">{currentTeacher.designation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">বিভাগ:</span>
                        <span className="font-semibold text-gray-800">{currentTeacher.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">মোবাইল:</span>
                        <span className="font-mono font-bold text-gray-800">{currentTeacher.mobile}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Signatures */}
              <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-500">
                <div className="text-center">
                  <div className="h-5 flex items-end justify-center font-script text-gray-400">
                    শিক্ষার্থী/বহনকারী
                  </div>
                  <span className="border-t border-gray-400 pt-0.5 block">ধারকের স্বাক্ষর</span>
                </div>
                <div className="text-center">
                  <div className="h-5 flex items-end justify-center font-bold text-[#0f626a]">
                    মাহমুদুল করিম
                  </div>
                  <span className="border-t border-[#0f626a] pt-0.5 block font-semibold text-[#0f626a]">
                    মুহতামিম স্বাক্ষর
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE (300px x 480px) */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-gray-500 mb-2 no-print">
              [ বিপরীত ভাগ / BACK SIDE ] - ৩০০ × ৪৮০ পিক্সেল
            </span>

            <div
              style={{ width: '300px', height: '480px' }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col justify-between p-4 text-center relative print:shadow-none print:border print:border-black"
            >
              {/* Back Top */}
              <div>
                <h4 className="font-bold text-xs text-[#0f626a] pb-1 border-b border-gray-200 uppercase tracking-wide">
                  মাদ্রাসার জরুরি নিয়মাবলী
                </h4>
                <ul className="text-left text-[9px] text-gray-600 space-y-1.5 mt-2 leading-tight">
                  <li>১. এই কার্ডটি প্রতিষ্ঠানের সার্বক্ষণিক সম্পত্তি এবং মাদ্রাসায় অবস্থানকালে পরিধান বাধ্যতামূলক।</li>
                  <li>২. পরিচয়পত্র হারানো গেলে তাৎক্ষণিক প্রশাসনকে জানাতে হবে এবং নির্ধারিত ফি দিয়ে পুনঃইস্যু করতে হবে।</li>
                  <li>৩. ছাত্রাবাস ও ক্যাম্পাসে ধর্মীয় ও নৈতিক শৃংখলা বজায় রাখা আবশ্যক।</li>
                  <li>৪. কার্ডটি হস্তান্তরযোগ্য নহে।</li>
                  <li>৫. মাদ্রাসার অনুমতি ছাড়া পরিচয়পত্রের অপব্যবহার আইনত দণ্ডনীয়।</li>
                </ul>
              </div>

              {/* Barcode SVG */}
              <div className="my-2 p-2 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center">
                <svg className="w-48 h-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  {/* Mock Barcode pattern */}
                  <rect x="2" y="0" width="2" height="20" fill="#000" />
                  <rect x="6" y="0" width="3" height="20" fill="#000" />
                  <rect x="11" y="0" width="1" height="20" fill="#000" />
                  <rect x="14" y="0" width="4" height="20" fill="#000" />
                  <rect x="20" y="0" width="2" height="20" fill="#000" />
                  <rect x="24" y="0" width="1" height="20" fill="#000" />
                  <rect x="27" y="0" width="3" height="20" fill="#000" />
                  <rect x="32" y="0" width="2" height="20" fill="#000" />
                  <rect x="36" y="0" width="4" height="20" fill="#000" />
                  <rect x="42" y="0" width="1" height="20" fill="#000" />
                  <rect x="45" y="0" width="2" height="20" fill="#000" />
                  <rect x="49" y="0" width="3" height="20" fill="#000" />
                  <rect x="54" y="0" width="2" height="20" fill="#000" />
                  <rect x="58" y="0" width="4" height="20" fill="#000" />
                  <rect x="64" y="0" width="1" height="20" fill="#000" />
                  <rect x="67" y="0" width="3" height="20" fill="#000" />
                  <rect x="72" y="0" width="2" height="20" fill="#000" />
                  <rect x="76" y="0" width="1" height="20" fill="#000" />
                  <rect x="79" y="0" width="4" height="20" fill="#000" />
                  <rect x="85" y="0" width="2" height="20" fill="#000" />
                  <rect x="89" y="0" width="3" height="20" fill="#000" />
                  <rect x="94" y="0" width="2" height="20" fill="#000" />
                </svg>
                <span className="font-mono text-[9px] font-bold text-gray-700 tracking-widest mt-1">
                  * JNSEM-2026-{cardType === 'student' ? currentStudent.roll : currentTeacher.id} *
                </span>
              </div>

              {/* Emergency Return Address */}
              <div className="bg-[#f0f9fa] p-2 rounded-xl border border-[#0f626a]/20 text-[9px] text-gray-700">
                <span className="font-bold text-[#0f626a] block">কার্ডটি পাওয়া গেলে ফেরত পাঠানোর ঠিকানা:</span>
                <p className="mt-0.5">{profile.name}</p>
                <p>{profile.address}</p>
                <p className="font-bold font-mono mt-0.5">মোবাইল: {profile.phone1}</p>
              </div>

              {/* Validity */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[8px] text-gray-400">
                <span>ইস্যু: জানুয়ারি ২০২৬</span>
                <span className="font-bold text-emerald-700">মেয়াদ: ৩১ ডিসেম্বর ২০২৬</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
