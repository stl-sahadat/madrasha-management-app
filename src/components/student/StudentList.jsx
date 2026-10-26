import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  IdCard,
  CreditCard,
  Trash2,
  Printer,
  Eye,
  GraduationCap,
  Phone,
  Droplet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentList = () => {
  const {
    students,
    jamats,
    deleteStudent,
    setActiveTab,
    setSelectedStudentForIdCard
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedBlood, setSelectedBlood] = useState('all');
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.includes(searchTerm) ||
      s.guardianPhone.includes(searchTerm) ||
      s.fatherName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchJamat = selectedJamat === 'all' || s.jamat === selectedJamat;
    const matchBlood = selectedBlood === 'all' || s.bloodGroup === selectedBlood;

    return matchSearch && matchJamat && matchBlood;
  });

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-[#0f626a]" />
            <span>শিক্ষার্থী তালিকা (Student Directory)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            মাদ্রাসার সকল জামাত ও বিভাগের শিক্ষার্থীদের বিস্তারিত রেজিস্টার ও প্রোফাইল
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট রেজিস্টার</span>
          </button>
          <button
            onClick={() => setActiveTab('student-create')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0f626a] hover:bg-[#0c5259] rounded-xl transition shadow-md flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন শিক্ষার্থী ভর্তি</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, রোল, মোবাইল বা পিতার নাম দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          />
        </div>

        <div>
          <select
            value={selectedJamat}
            onChange={(e) => setSelectedJamat(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          >
            <option value="all">সকল জামাত / শ্রেণী (All Jamats)</option>
            {jamats.map(j => (
              <option key={j.id} value={j.name}>{j.name}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedBlood}
            onChange={(e) => setSelectedBlood(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          >
            <option value="all">সকল রক্তের গ্রুপ (Blood Group)</option>
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
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700">
            মোট প্রদর্শিত শিক্ষার্থী: <span className="text-[#0f626a] font-mono">{filteredStudents.length}</span> জন
          </span>
          <span className="text-xs text-gray-400">সেশন: ২০২৬ শিক্ষাবর্ষ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f0f9fa] text-[#082f32] font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">ছবি</th>
                <th className="py-3 px-4">রোল ও নাম</th>
                <th className="py-3 px-4">জামাত / শ্রেণী</th>
                <th className="py-3 px-4">অভিভাবক ও যোগাযোগ</th>
                <th className="py-3 px-4 text-center">রক্তের গ্রুপ</th>
                <th className="py-3 px-4 text-right">মাসিক বেতন</th>
                <th className="py-3 px-4 text-right">খোরাকী ফি</th>
                <th className="py-3 px-4 text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    কোন শিক্ষার্থী খুঁজে পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#0f626a]/30 shadow-xs"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&h=100&fit=crop";
                        }}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900 text-sm">{student.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        রোল: <span className="font-bold text-[#0f626a]">{student.roll}</span> | {student.nameEn}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#eaf4f5] text-[#0f626a] border border-[#0f626a]/20">
                        {student.jamat}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-800 font-medium">পিতা: {student.fatherName}</div>
                      <div className="text-gray-500 flex items-center space-x-1 font-mono text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-[#0f626a]" />
                        <span>{student.guardianPhone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <Droplet className="w-2.5 h-2.5 mr-1 text-rose-500" />
                        {student.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-800">
                      ৳ {student.monthlyFee}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-800">
                      ৳ {student.khurakiFee}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => setSelectedStudentForView(student)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="প্রোফাইল দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudentForIdCard(student);
                            setActiveTab('idcard-student');
                          }}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          title="আইডি কার্ড প্রিন্ট"
                        >
                          <IdCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveTab('student-fees')}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="বেতন ও ফি আদায়"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`${student.name}-কে তালিকা থেকে মুছে ফেলতে চান?`)) {
                              deleteStudent(student.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
            <span className="text-xs text-gray-500">
              পৃষ্ঠা <strong>{currentPage}</strong> এর <strong>{totalPages}</strong> (মোট {filteredStudents.length} জন)
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                পূর্ববর্তী
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 7 && currentPage > 4) {
                  pageNum = currentPage - 3 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (6 - i);
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 text-xs font-bold rounded-lg transition ${
                      currentPage === pageNum
                        ? 'bg-[#0f626a] text-white shadow-xs'
                        : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                পরবর্তী
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Student Profile Quick View Modal */}
      {selectedStudentForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#082f32]">শিক্ষার্থী বিস্তারিত প্রোফাইল</h3>
              <button
                onClick={() => setSelectedStudentForView(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex items-center space-x-4 pb-4 border-b border-gray-100">
              <img
                src={selectedStudentForView.photo}
                alt={selectedStudentForView.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0f626a]"
              />
              <div>
                <h4 className="text-lg font-bold text-gray-900">{selectedStudentForView.name}</h4>
                <p className="text-xs text-gray-500 font-mono">{selectedStudentForView.nameEn}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#eaf4f5] text-[#0f626a] font-bold">
                    {selectedStudentForView.jamat}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-700">
                    রোল: {selectedStudentForView.roll}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-4 text-xs border-b border-gray-100">
              <div>
                <span className="text-gray-400">পিতার নাম:</span>
                <p className="font-semibold text-gray-800">{selectedStudentForView.fatherName} ({selectedStudentForView.fatherOcc})</p>
              </div>
              <div>
                <span className="text-gray-400">মাতার নাম:</span>
                <p className="font-semibold text-gray-800">{selectedStudentForView.motherName}</p>
              </div>
              <div>
                <span className="text-gray-400">অভিভাবকের মোবাইল:</span>
                <p className="font-semibold text-gray-800 font-mono">{selectedStudentForView.guardianPhone}</p>
              </div>
              <div>
                <span className="text-gray-400">রক্তের গ্রুপ:</span>
                <p className="font-semibold text-rose-600">{selectedStudentForView.bloodGroup}</p>
              </div>
              <div>
                <span className="text-gray-400">জন্ম তারিখ:</span>
                <p className="font-semibold text-gray-800 font-mono">{selectedStudentForView.dob}</p>
              </div>
              <div>
                <span className="text-gray-400">জন্ম নিবন্ধন নম্বর:</span>
                <p className="font-semibold text-gray-800 font-mono">{selectedStudentForView.birthReg}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">ঠিকানা:</span>
                <p className="font-semibold text-gray-800">{selectedStudentForView.address}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedStudentForIdCard(selectedStudentForView);
                  setActiveTab('idcard-student');
                  setSelectedStudentForView(null);
                }}
                className="px-4 py-2 bg-[#0f626a] text-white text-xs font-semibold rounded-xl hover:bg-[#0c5259] transition flex items-center space-x-1.5"
              >
                <IdCard className="w-4 h-4" />
                <span>আইডি কার্ড জেনারেট করুন</span>
              </button>

              <button
                onClick={() => setSelectedStudentForView(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-200"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
