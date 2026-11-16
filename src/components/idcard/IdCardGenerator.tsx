import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';

// Target student 206 data matching madrasha.hostzonebd.com/admin/id-card?student_id=206
const TARGET_STUDENT_206 = {
  id: "206",
  roll: "",
  name: "errh",
  jamat: "মক্তব",
  bloodGroup: "N/A",
  fatherName: "N/A",
  guardianPhone: "N/A",
  relationship: "N/A",
  photo: "/storage/students/default-student.jpg"
};

// Target teacher 2 data matching madrasha.hostzonebd.com/admin/id-card/teacher?teacher_id=2
const TARGET_TEACHER_2 = {
  id: "2",
  employeeId: "202020",
  name: "আবু সায়েম",
  designation: "সহকারী প্রধান শিক্ষক",
  fatherName: "আব্দুল মান্নান",
  dob: "25 May 1977",
  mobile: "01711288382",
  bloodGroup: "A+",
  photo: "/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg",
  validity: "31 / 12 / 2026",
  guardianPhone: "N/A",
  emergencyPhone: "N/A"
};

// Target teacher 1 matching madrasha.hostzonebd.com/admin/id-card/teacher?teacher_id=1
const TARGET_TEACHER_1 = {
  id: "1",
  employeeId: "",
  name: "নোমান",
  designation: "N/A",
  fatherName: "N/A",
  dob: "N/A",
  mobile: "N/A",
  bloodGroup: "N/A",
  photo: "/storage/teachers/eXUAuPhreXk0tOWTeviLX2y8J6SwvMJJnSh4Mj85.jpg",
  validity: "N/A",
  guardianPhone: "N/A",
  emergencyPhone: "N/A"
};

// Unified helper for Jamat matching
const isStudentInJamat = (student, jamat) => {
  if (!jamat || jamat === 'all') return true;
  if (!student || !student.jamat) return false;
  if (student.jamat === jamat) return true;
  if (student.jamat.startsWith(jamat) || jamat.startsWith(student.jamat)) return true;
  return false;
};

export const IdCardGenerator = ({ defaultType = 'student' }) => {
  const {
    students,
    teachers,
    jamats,
    setActiveTab,
    selectedStudentForIdCard,
    initialSearchParams
  } = useApp();

  // Determine initial card type from URL or defaultType
  const initialType = useMemo(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes('/teacher') || search.includes('teacher_id')) {
        return 'teacher';
      }
    }
    if (initialSearchParams?.teacher_id) {
      return 'teacher';
    }
    return defaultType;
  }, [defaultType, initialSearchParams]);

  const [cardType, setCardType] = useState(initialType);
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [studentSearchText, setStudentSearchText] = useState('');
  const [teacherSearchText, setTeacherSearchText] = useState('');

  // Combined students ensuring student 206 is included
  const allStudents = useMemo(() => {
    const list = Array.isArray(students) ? [...students] : [];
    if (!list.some(s => String(s.id) === '206')) {
      list.unshift(TARGET_STUDENT_206);
    }
    return list;
  }, [students]);

  // Combined teachers ensuring teacher 2 and 1 are included
  const allTeachers = useMemo(() => {
    const list = Array.isArray(teachers) ? [...teachers] : [];
    if (!list.some(t => String(t.id) === '2')) {
      list.unshift(TARGET_TEACHER_2);
    }
    if (!list.some(t => String(t.id) === '1')) {
      list.push(TARGET_TEACHER_1);
    }
    return list;
  }, [teachers]);

  // Initial student ID from search param, initialSearchParams, selectedStudentForIdCard, or target 206
  const [selectedStudentId, setSelectedStudentId] = useState(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('student_id');
      if (q) return q;
    }
    if (initialSearchParams?.student_id) {
      return String(initialSearchParams.student_id);
    }
    return selectedStudentForIdCard?.id || '206';
  });

  // Initial teacher ID from search param, initialSearchParams, or default teacher 2
  const [selectedTeacherId, setSelectedTeacherId] = useState(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('teacher_id');
      if (q) return q;
    }
    if (initialSearchParams?.teacher_id) {
      return String(initialSearchParams.teacher_id);
    }
    return '2';
  });

  // Helper to find student by ID or roll
  const findStudent = useCallback((idOrRoll) => {
    if (!idOrRoll) return null;
    const str = String(idOrRoll);
    return allStudents.find(s => String(s.id) === str) ||
           allStudents.find(s => String(s.roll) === str) ||
           allStudents.find(s => String(s.admissionNo) === str) || null;
  }, [allStudents]);

  // Active student object
  const [activeStudent, setActiveStudent] = useState(() => {
    return findStudent(selectedStudentId) || allStudents[0] || TARGET_STUDENT_206;
  });

  // Active teacher object
  const [activeTeacher, setActiveTeacher] = useState(() => {
    return allTeachers.find(t => String(t.id) === String(selectedTeacherId)) || TARGET_TEACHER_2;
  });

  // Keep type in sync if defaultType or URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes('/teacher') || search.includes('teacher_id')) {
        setCardType('teacher');
        return;
      }
    }
    setCardType(defaultType);
  }, [defaultType]);

  // Read URL query params on mount and popstate
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncFromUrl = () => {
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const isTeacherRoute = path.includes('/teacher') || params.has('teacher_id');

      if (isTeacherRoute) {
        setCardType('teacher');
        if (typeof setActiveTab === 'function') {
          setActiveTab('idcard-teacher', false);
        }
        const tid = params.get('teacher_id') || '2';
        setSelectedTeacherId(tid);
        const t = allTeachers.find(item => String(item.id) === String(tid));
        if (t) setActiveTeacher(t);
      } else {
        setCardType('student');
        if (typeof setActiveTab === 'function') {
          setActiveTab('idcard-student', false);
        }
        const sid = params.get('student_id');
        if (sid) {
          setSelectedStudentId(sid);
          const s = findStudent(sid);
          if (s) {
            setActiveStudent(s);
          }
        }
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [allStudents, allTeachers, findStudent, setActiveTab]);

  // Filtered students by Jamat & text search
  const filteredStudents = useMemo(() => {
    return allStudents.filter(s => {
      if (!isStudentInJamat(s, selectedJamat)) return false;
      if (studentSearchText.trim()) {
        const q = studentSearchText.trim().toLowerCase();
        const matchName = s.name && s.name.toLowerCase().includes(q);
        const matchRoll = s.roll && String(s.roll).toLowerCase().includes(q);
        const matchAdm = s.admissionNo && String(s.admissionNo).toLowerCase().includes(q);
        return matchName || matchRoll || matchAdm;
      }
      return true;
    });
  }, [allStudents, selectedJamat, studentSearchText]);

  // Filtered teachers by text search
  const filteredTeachers = useMemo(() => {
    if (!teacherSearchText.trim()) return allTeachers;
    const q = teacherSearchText.trim().toLowerCase();
    return allTeachers.filter(t => {
      const matchName = t.name && t.name.toLowerCase().includes(q);
      const matchId = t.employeeId && String(t.employeeId).toLowerCase().includes(q);
      const matchDesig = t.designation && t.designation.toLowerCase().includes(q);
      return matchName || matchId || matchDesig;
    });
  }, [allTeachers, teacherSearchText]);

  // Handle Jamat change
  const handleJamatChange = (e) => {
    const jamat = e.target.value;
    setSelectedJamat(jamat);

    // If active student is not in the newly selected jamat, pick first available in that jamat
    const available = allStudents.filter(s => isStudentInJamat(s, jamat));
    if (available.length > 0 && !available.some(s => String(s.id) === String(selectedStudentId))) {
      const nextStudent = available[0];
      setSelectedStudentId(nextStudent.id);
      setActiveStudent(nextStudent);
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', `/admin/id-card?student_id=${nextStudent.id}`);
      }
    }
  };

  // Handle Student dropdown change
  const handleStudentSelect = (e) => {
    const newId = e.target.value;
    setSelectedStudentId(newId);
    if (!newId) return;

    const found = findStudent(newId);
    if (found) {
      setActiveStudent(found);
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', `/admin/id-card?student_id=${found.id}`);
      }
    }
  };

  // Handle Teacher dropdown change
  const handleTeacherSelect = (e) => {
    const newId = e.target.value;
    setSelectedTeacherId(newId);
    if (!newId) return;

    const found = allTeachers.find(t => String(t.id) === String(newId));
    if (found) {
      setActiveTeacher(found);
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', `/admin/id-card/teacher?teacher_id=${found.id}`);
      }
    }
  };

  // Handle form submit
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (selectedStudentId) {
      const found = findStudent(selectedStudentId);
      if (found) {
        setActiveStudent(found);
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', `/admin/id-card?student_id=${found.id}`);
        }
      }
    }
  };

  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacherId) {
      const found = allTeachers.find(t => String(t.id) === String(selectedTeacherId));
      if (found) {
        setActiveTeacher(found);
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', `/admin/id-card/teacher?teacher_id=${found.id}`);
        }
      }
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // 1:1 Live Matching PDF Download with html2canvas and jsPDF
  const handleDownloadPdf = async (e) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + src));
        document.head.appendChild(s);
      });
    };

    const btn = e?.currentTarget;
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>তৈরি হচ্ছে...';
      btn.disabled = true;
    }

    try {
      if (!window.html2canvas) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      }
      if (!window.jspdf) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      }

      const cards = document.querySelectorAll('.id-card');
      if (cards.length === 0) {
        window.print();
        return;
      }

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const canvas1 = await window.html2canvas(cards[0], {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData1 = canvas1.toDataURL('image/png');
      const imgWidth1 = 90;
      const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width;
      pdf.addImage(imgData1, 'PNG', 10, 10, imgWidth1, imgHeight1);

      if (cards.length > 1) {
        const canvas2 = await window.html2canvas(cards[1], {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        });
        const imgData2 = canvas2.toDataURL('image/png');
        const imgWidth2 = 90;
        const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;
        pdf.addImage(imgData2, 'PNG', 110, 10, imgWidth2, imgHeight2);
      }

      const fileName = cardType === 'teacher'
        ? `teacher-id-card-${activeTeacher?.name || 'teacher'}.pdf`
        : `id-card-${activeStudent?.name || 'student'}.pdf`;

      pdf.save(fileName);
    } catch (err) {
      console.warn('PDF generation fallback to print:', err);
      window.print();
    } finally {
      if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <style>{`
        .card-wrapper {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
            margin: 20px 0;
        }

        .id-card {
            width: 300px;
            height: 480px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            border: 1px solid #e0e0e0;
            position: relative;
            box-sizing: border-box;
        }

        /* Student Card Backgrounds */
        .student-card-front {
            background-image: url('/assets/custom/id-card-front.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .student-card-back {
            background-image: url('/assets/custom/id-card-back.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        /* Teacher Card Backgrounds */
        .teacher-card-front {
            background-image: url('/assets/custom/teacher-id-card-front.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .teacher-card-back {
            background-image: url('/assets/custom/teacher-id-card-back.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        /* Student Card Layout */
        .student-card .photo-section {
            text-align: center;
            padding: 15px 20px 8px;
            position: absolute;
            top: 60px;
            left: 48px;
        }

        .student-card .photo {
            width: 160px;
            height: 160px;
            background: #f5f5f5;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: #adb5bd;
            border: 3px solid #3b82f6;
            overflow: hidden;
        }

        .student-card .details-front {
            position: absolute;
            top: 270px;
            left: 0;
            padding: 0 20px 12px;
            width: 100%;
            box-sizing: border-box;
        }

        .student-card .detail-row {
            display: flex;
            padding: 4px 0;
            font-size: 15px;
            border-bottom: 1px solid #f5f5f5;
        }

        .student-card .detail-row:last-child {
            border-bottom: none;
        }

        .student-card .label {
            width: 85px;
            color: #666;
            font-weight: 600;
            font-size: 15px;
        }

        .student-card .value {
            flex: 1;
            color: #1a1a1a;
            font-weight: 600;
        }

        .student-card .emergency-box {
            padding: 0px;
            margin: 0;
            position: absolute;
            top: 270px;
            left: 30px;
            right: 25px;
        }

        /* Teacher Card Layout */
        .teacher-card .photo-section {
            text-align: center;
            padding: 15px 20px 8px;
            position: absolute;
            top: 85px;
            left: 69px;
        }

        .teacher-card .photo {
            width: 127px;
            height: 127px;
            background: #f5f5f5;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: #adb5bd;
            border: none;
            overflow: hidden;
        }

        .teacher-card .full_name {
            position: absolute;
            top: 250px;
            color: white;
            padding: 0 20px 0px;
            font-size: 17px;
            text-align: center;
            width: 100%;
            font-weight: bold;
            box-sizing: border-box;
        }

        .teacher-card .details-front {
            position: absolute;
            top: 285px;
            left: 0;
            padding: 0 20px 12px;
            width: 100%;
            box-sizing: border-box;
        }

        .teacher-card .detail-row {
            display: flex;
            font-size: 15px;
        }

        .teacher-card .detail-row:last-child {
            border-bottom: none;
        }

        .teacher-card .label {
            width: 85px;
            color: #ECEDF0;
            font-size: 15px;
        }

        .teacher-card .value {
            flex: 1;
            color: #ECEDF0;
        }

        .teacher-card .card-box {
            padding: 0px;
            margin: 0;
            position: absolute;
            bottom: 140px;
            left: 30px;
            right: 58px;
            color: #415254;
            font-weight: bold;
        }

        .teacher-card .emergency-box {
            padding: 0px;
            margin: 0;
            position: absolute;
            bottom: 11px;
            left: 30px;
            right: 30px;
        }

        .back-content {
            padding: 15px 20px;
            position: relative;
            height: 100%;
            box-sizing: border-box;
        }

        /* 1:1 Print Fidelity */
        @media print {
            .card,
            .btn,
            .no-print,
            header,
            aside,
            nav,
            .sidebar,
            .header-main,
            .app-sidebar,
            .breadcrumb-row,
            .auth-root-container {
                display: none !important;
            }

            .card-wrapper {
                gap: 10mm !important;
                margin: 0 !important;
                padding: 0 !important;
                display: flex !important;
                justify-content: center !important;
            }

            body {
                background: white !important;
            }

            .id-card {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
                box-shadow: none !important;
            }

            .student-card-front {
                background-image: url('/assets/custom/id-card-front.png') !important;
                background-size: cover !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
            }

            .student-card-back {
                background-image: url('/assets/custom/id-card-back.png') !important;
                background-size: cover !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
            }

            .teacher-card-front {
                background-image: url('/assets/custom/teacher-id-card-front.png') !important;
                background-size: cover !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
            }

            .teacher-card-back {
                background-image: url('/assets/custom/teacher-id-card-back.png') !important;
                background-size: cover !important;
                background-position: center !important;
                background-repeat: no-repeat !important;
            }
        }
      `}</style>

      {/* Top Type Switcher Tab Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3 no-print">
        <div className="btn-group shadow-sm">
          <button
            type="button"
            onClick={() => {
              setCardType('student');
              setActiveTab('idcard-student', false);
              const sid = activeStudent?.id || selectedStudentId || '206';
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', `/admin/id-card?student_id=${sid}`);
              }
            }}
            className={`btn btn-sm ${cardType === 'student' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-users me-1"></i> ছাত্র/ছাত্রী আইডি কার্ড
          </button>
          <button
            type="button"
            onClick={() => {
              setCardType('teacher');
              setActiveTab('idcard-teacher', false);
              const tid = activeTeacher?.id || selectedTeacherId || '2';
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', `/admin/id-card/teacher?teacher_id=${tid}`);
              }
            }}
            className={`btn btn-sm ${cardType === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-chalkboard-user me-1"></i> শিক্ষক আইডি কার্ড
          </button>
        </div>
      </div>

      {/* STUDENT ID CARD SEARCH */}
      {cardType === 'student' && (
        <div className="card shadow-sm mb-4 no-print">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-users me-2"></i> ছাত্র/ছাত্রী আইডি কার্ড
            </h5>
          </div>
          <div className="card-body mb-3">
            <form onSubmit={handleStudentSubmit}>
              <div className="row g-3 align-items-end">
                {/* জামাত ড্রপডাউন (সকল জামাত সহ) */}
                <div className="col-md-3">
                  <label htmlFor="jamat_select" className="form-label fw-bold">জামাত</label>
                  <select
                    id="jamat_select"
                    className="form-select"
                    value={selectedJamat}
                    onChange={handleJamatChange}
                  >
                    <option value="all">সকল জামাত</option>
                    {(jamats || [
                      { id: 'hefz', name: 'হিফজ বিভাগ' },
                      { id: 'nazera', name: 'নাজেরা বিভাগ' },
                      { id: 'maktab', name: 'মক্তব ও কায়দা' },
                      { id: 'kitab', name: 'কিতাব বিভাগ' },
                      { id: 'ebtedayee', name: 'ইবতিদাইয়্যাহ (১ম-৫ম)' }
                    ]).map((j) => (
                      <option key={j.id || j.name} value={j.name}>
                        {j.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* সরাসরি নাম বা রোল দিয়ে সার্চ */}
                <div className="col-md-3">
                  <label htmlFor="student_search" className="form-label fw-bold">নাম বা রোল দিয়ে খুঁজুন</label>
                  <input
                    id="student_search"
                    type="text"
                    className="form-control"
                    placeholder="নাম বা রোল লিখুন..."
                    value={studentSearchText}
                    onChange={(e) => setStudentSearchText(e.target.value)}
                  />
                </div>

                {/* ছাত্র/ছাত্রী ড্রপডাউন (ভর্তি নং বা নাম) */}
                <div className="col-md-4">
                  <label htmlFor="student_select" className="form-label fw-bold">ভর্তি নং বা নাম লিখুন"</label>
                  <select
                    name="student_id"
                    id="student_select"
                    className="form-select"
                    value={selectedStudentId}
                    onChange={handleStudentSelect}
                    required
                  >
                    <option value="">ভর্তি নং বা নাম লিখুন</option>
                    {filteredStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.roll ? `${s.roll} - ${s.name}` : (s.admissionNo ? `${s.admissionNo} - ${s.name}` : `- ${s.name}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* আইডি কার্ড দেখুন বাটন */}
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="fas fa-eye me-2"></i>আইডি কার্ড দেখুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEACHER ID CARD SEARCH */}
      {cardType === 'teacher' && (
        <div className="card shadow-sm mb-4 no-print">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-users me-2"></i>শিক্ষক আইডি কার্ড
            </h5>
          </div>
          <div className="card-body mb-3">
            <form onSubmit={handleTeacherSubmit}>
              <div className="row g-3 align-items-end">
                <div className="col-md-5 col-12">
                  <label htmlFor="teacher_search_text" className="form-label fw-bold text-primary">
                    <i className="fas fa-search me-1"></i> শিক্ষকের নাম বা পদবি দিয়ে খুঁজুন
                  </label>
                  <input
                    id="teacher_search_text"
                    type="text"
                    className="form-control"
                    placeholder="নাম বা আইডি লিখুন..."
                    value={teacherSearchText}
                    onChange={(e) => {
                      setTeacherSearchText(e.target.value);
                      const q = e.target.value.trim().toLowerCase();
                      if (q) {
                        const m = allTeachers.find(t => (t.name && t.name.toLowerCase().includes(q)) || String(t.employeeId || '').includes(q));
                        if (m) {
                          setSelectedTeacherId(String(m.id));
                          setActiveTeacher(m);
                        }
                      }
                    }}
                  />
                </div>
                <div className="col-md-5 col-12">
                  <label htmlFor="teacher_select" className="form-label fw-bold">শিক্ষক নির্বাচন (নাম সবার উপরে)</label>
                  <select
                    name="teacher_id"
                    id="teacher_select"
                    className="form-select"
                    value={selectedTeacherId}
                    onChange={handleTeacherSelect}
                    required
                  >
                    <option value="">শিক্ষক নির্বাচন করুন</option>
                    {filteredTeachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.designation || 'শিক্ষক'}{t.employeeId ? ` - আইডি: ${t.employeeId}` : ''})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="fas fa-eye me-2"></i>দেখুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS (Print & Download) */}
      <div className="text-center mb-3 no-print">
        <button type="button" onClick={handlePrint} className="btn btn-primary me-2">
          <i className="fas fa-print me-2"></i>প্রিন্ট করুন
        </button>
        <button type="button" onClick={handleDownloadPdf} className="btn btn-success">
          <i className="fas fa-download me-2"></i>পিডিএফ ডাউনলোড করুন
        </button>
      </div>

      {/* ID CARD PREVIEW (Front & Back) */}
      <div className="card-wrapper" id="idCardWrapper">
        {cardType === 'student' && activeStudent && (
          <>
            {/* Student Front Side */}
            <div className="id-card student-card student-card-front">
              <div className="photo-section">
                <div className="photo">
                  <img
                    src={activeStudent.photo || '/storage/students/default-student.jpg'}
                    alt="Student Photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/storage/students/default-student.jpg';
                    }}
                  />
                </div>
              </div>

              <div className="details-front">
                <div className="detail-row">
                  <div className="label">নাম</div>
                  <div className="value">{activeStudent.name}</div>
                </div>
                <div className="detail-row">
                  <div className="label">জামাত</div>
                  <div className="value">{activeStudent.jamat}</div>
                </div>
                <div className="detail-row">
                  <div className="label">রক্তের গ্রুপ</div>
                  <div className="value">{activeStudent.bloodGroup || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">ভর্তি নং</div>
                  <div className="value">{activeStudent.roll || activeStudent.admissionNo || ''}</div>
                </div>
              </div>
            </div>

            {/* Student Back Side */}
            <div className="id-card student-card student-card-back">
              <div className="back-content">
                <div className="emergency-box p-2">
                  <span className="lh-1">
                    <b>পিতার নাম:</b> {activeStudent.fatherName || 'N/A'}
                  </span>
                  <br />
                  <span className="lh-1">
                    <b>অভিভাবকের মোবাইল:</b> {activeStudent.guardianPhone || 'N/A'}
                  </span>
                  <br />
                  <span className="lh-1">
                    <b>সম্পর্ক:</b> {activeStudent.relationship || 'N/A'}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          </>
        )}

        {cardType === 'teacher' && activeTeacher && (
          <>
            {/* Teacher Front Side */}
            <div className="id-card teacher-card teacher-card-front">
              <div className="photo-section">
                <div className="photo">
                  <img
                    src={activeTeacher.photo || '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg'}
                    alt="Student Photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg';
                    }}
                  />
                </div>
              </div>
              <div className="full_name">{activeTeacher.name}</div>

              <div className="details-front">
                <div className="detail-row">
                  <div className="label">পদবী</div>
                  <div className="value">: {activeTeacher.designation || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">পিতার নাম</div>
                  <div className="value">: {activeTeacher.fatherName || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">জন্ম তারিখ</div>
                  <div className="value">: {activeTeacher.dob || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">মোবাইল</div>
                  <div className="value">: {activeTeacher.mobile || activeTeacher.phone || 'N/A'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">রক্তের গ্রুপ</div>
                  <div className="value">: {activeTeacher.bloodGroup || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Teacher Back Side */}
            <div className="id-card teacher-card teacher-card-back">
              <div className="back-content">
                <div className="card-box p-2">
                  <span className="lh-1 d-block text-center" style={{ color: '#105C6F' }}>
                    কার্ডের মেয়াদ : {activeTeacher.validity || 'N/A'}
                  </span>
                  <br />
                </div>

                <div className="emergency-box p-2">
                  <span className="lh-1 d-block text-center" style={{ color: '#415254' }}>
                    <b>অভিভাবকের মোবাইল</b>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '2px' }}>
                      {activeTeacher.guardianPhone || activeTeacher.emergencyPhone || 'N/A'}
                    </div>
                  </span>
                  <br />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
