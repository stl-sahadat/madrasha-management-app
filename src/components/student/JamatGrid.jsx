import React, { useState } from 'react';
import {
  Grid,
  Users,
  BookOpen,
  GraduationCap,
  ArrowRight,
  UserCheck,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JamatGrid = () => {
  const { jamats, students, setActiveTab } = useApp();
  const [selectedJamatFilter, setSelectedJamatFilter] = useState(null);

  const jamatDetails = [
    {
      id: "hefz",
      name: "হিফজ বিভাগ",
      teacher: "হাফেজ আযম নূর",
      totalStudents: 42,
      syllabus: "৩০ পারা পবিত্র কুরআনুল কারীম হিফজ",
      description: "আন্তর্জাতিক মানের তাজবীদ ও বিশুদ্ধ তিলাওয়াত সহ সম্পূর্ণ কুরআন হিফজ সমাপন।"
    },
    {
      id: "nazera",
      name: "নাজেরা বিভাগ",
      teacher: "মাওলানা আব্দুর রহমান",
      totalStudents: 38,
      syllabus: "নাজেরা কুরআন শরীফ ও মাশক",
      description: "মাখরাজ, সিফাত ও বিশুদ্ধ উচ্চারণে পূর্ণ কুরআন দেখে দেখে দ্রুত তিলাওয়াত।"
    },
    {
      id: "maktab",
      name: "মক্তব ও কায়দা",
      teacher: "কারী মুহাম্মদ ইব্রাহিম",
      totalStudents: 45,
      syllabus: "নূরানী কায়েদা ও বুনিয়াদী ইসলামিয়াত",
      description: "আরবি বর্ণমালা, হরকত, তানভীন ও দৈনন্দিন মাসআলা-মাসায়েল ও দুআ শিক্ষা।"
    },
    {
      id: "kitab",
      name: "কিতাব বিভাগ",
      teacher: "মাওলানা মাহমুদুল করিম",
      totalStudents: 32,
      syllabus: "মিযান, নাহবেমীর ও ফিকাহ শাস্ত্র",
      description: "আরবি ব্যাকরণ, উর্দু-ফার্সি সাহিত্য ও ইসলামী আইনশাস্ত্রের প্রাথমিক পাঠ।"
    },
    {
      id: "ebtedayee",
      name: "ইবতিদাইয়্যাহ (১ম-৫ম)",
      teacher: "মাওলানা হাবিবুল্লাহ মাসউদ",
      totalStudents: 40,
      syllabus: "সরকারি পাঠ্যক্রম ও দ্বীনিয়াত",
      description: "বাংলা, ইংরেজি, গণিত ও সমাজ বিজ্ঞানের সাথে আদর্শ ইসলামী নৈতিক শিক্ষা।"
    },
  ];

  const studentsInSelectedJamat = selectedJamatFilter
    ? students.filter(s => s.jamat === selectedJamatFilter.name)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <Grid className="w-6 h-6 text-[#0f626a]" />
            <span>জামাতভিত্তিক শিক্ষার্থী ডিরেক্টরি ও শ্রেণী বিন্যাস</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            মাদ্রাসার ৫টি প্রধান বিভাগের শিক্ষার্থী পরিসংখ্যান, পাঠ্যক্রম ও দায়িত্বপ্রাপ্ত শিক্ষকবৃন্দ
          </p>
        </div>

        <button
          onClick={() => setActiveTab('student-create')}
          className="px-4 py-2 text-xs font-bold text-white bg-[#0f626a] hover:bg-[#0c5259] rounded-xl transition shadow"
        >
          + নতুন শিক্ষার্থী ভর্তি
        </button>
      </div>

      {/* Grid of Jamats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jamatDetails.map((jamat) => {
          const isSelected = selectedJamatFilter?.id === jamat.id;
          return (
            <div
              key={jamat.id}
              className={`bg-white rounded-2xl p-5 border transition duration-200 shadow-sm flex flex-col justify-between ${
                isSelected
                  ? 'border-[#0f626a] ring-2 ring-[#0f626a]/20 shadow-hover'
                  : 'border-[#e2e8f0] hover:border-[#0f626a]/40 hover:shadow-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="font-bold text-base text-[#082f32]">{jamat.name}</span>
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-[#eaf4f5] text-[#0f626a] rounded-full border border-[#0f626a]/20">
                    {students.filter(s => s.jamat === jamat.name).length || jamat.totalStudents} জন
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center text-gray-600 space-x-2">
                    <UserCheck className="w-4 h-4 text-[#0f626a] shrink-0" />
                    <span>মুয়াল্লিম/শিক্ষক: <strong>{jamat.teacher}</strong></span>
                  </div>

                  <div className="flex items-start text-gray-600 space-x-2">
                    <BookOpen className="w-4 h-4 text-[#0f626a] shrink-0 mt-0.5" />
                    <span>পাঠ্যক্রম: <strong>{jamat.syllabus}</strong></span>
                  </div>

                  <p className="text-gray-500 text-[11px] pt-1 leading-relaxed">
                    {jamat.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedJamatFilter(isSelected ? null : jamat)}
                  className="text-xs font-bold text-[#0f626a] hover:underline flex items-center space-x-1"
                >
                  <span>{isSelected ? 'তালিকা লুকান' : 'শিক্ষার্থী তালিকা দেখুন'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('attendance-daily')}
                  className="text-[11px] text-gray-500 hover:text-gray-800"
                >
                  হাজিরা খাতা
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Jamat Student List */}
      {selectedJamatFilter && (
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-sm text-[#082f32]">
              {selectedJamatFilter.name}-এর শিক্ষার্থী রেজিস্টার (নমুনা তালিকা)
            </h3>
            <button
              onClick={() => setSelectedJamatFilter(null)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              বন্ধ করুন ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {studentsInSelectedJamat.map((s) => (
              <div key={s.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center space-x-3">
                <img
                  src={s.photo}
                  alt={s.name}
                  className="w-12 h-12 rounded-xl object-cover border"
                />
                <div>
                  <p className="text-xs font-bold text-gray-800">{s.name}</p>
                  <p className="text-[11px] text-gray-500">রোল: <strong className="text-[#0f626a]">{s.roll}</strong> | {s.bloodGroup}</p>
                  <p className="text-[10px] text-gray-500 font-mono">মোবাইল: {s.guardianPhone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
