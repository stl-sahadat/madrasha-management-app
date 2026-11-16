import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    profile
  } = useApp();

  // Track accordion open state
  const [openSection, setOpenSection] = useState(() => {
    if (activeTab.startsWith('student') || activeTab === 'jamat-grid') return 'students';
    if (activeTab.startsWith('teacher')) return 'teachers';
    if (activeTab.startsWith('contributor')) return 'monthly-donors';
    if (activeTab.startsWith('donor') || activeTab.startsWith('donation')) return 'donors';
    if (activeTab.startsWith('zakat')) return 'zakat-donors';
    if (activeTab.startsWith('bazar')) return 'market';
    if (activeTab.startsWith('attendance')) return 'attendance';
    if (activeTab.startsWith('result')) return 'results';
    if (['voucher-deposit', 'deposit-list', 'voucher-expense', 'expense-list'].includes(activeTab)) return 'income-expense';
    if (activeTab.startsWith('idcard')) return 'id-cards';
    if (activeTab.startsWith('sms')) return 'sms';
    if (activeTab.startsWith('account') || activeTab === 'balancesheet' || activeTab.includes('transfer')) return 'accounts';
    if (activeTab.startsWith('report-') && !['report-daily', 'report-yearly', 'report-bank'].includes(activeTab)) return 'reports';
    if (activeTab.startsWith('settings')) return 'settings';
    return null;
  });

  // Sync openSection with activeTab
  useEffect(() => {
    if (activeTab.startsWith('student') || activeTab === 'jamat-grid') {
      setOpenSection('students');
    } else if (activeTab.startsWith('teacher')) {
      setOpenSection('teachers');
    } else if (activeTab.startsWith('contributor')) {
      setOpenSection('monthly-donors');
    } else if (activeTab.startsWith('donor') || activeTab.startsWith('donation')) {
      setOpenSection('donors');
    } else if (activeTab.startsWith('zakat')) {
      setOpenSection('zakat-donors');
    } else if (activeTab.startsWith('bazar')) {
      setOpenSection('market');
    } else if (activeTab.startsWith('attendance')) {
      setOpenSection('attendance');
    } else if (activeTab.startsWith('result')) {
      setOpenSection('results');
    } else if (['voucher-deposit', 'deposit-list', 'voucher-expense', 'expense-list'].includes(activeTab)) {
      setOpenSection('income-expense');
    } else if (activeTab.startsWith('idcard')) {
      setOpenSection('id-cards');
    } else if (activeTab.startsWith('sms')) {
      setOpenSection('sms');
    } else if (activeTab.startsWith('account') || activeTab === 'balancesheet' || activeTab.includes('transfer')) {
      setOpenSection('accounts');
    } else if (activeTab.startsWith('report-') && !['report-daily', 'report-yearly', 'report-bank'].includes(activeTab)) {
      setOpenSection('reports');
    } else if (activeTab.startsWith('settings')) {
      setOpenSection('settings');
    }
  }, [activeTab]);

  const defaultTabMap = {
    'students': 'student-list',
    'teachers': 'teacher-list',
    'monthly-donors': 'contributor-list',
    'donors': 'donor-list',
    'zakat-donors': 'zakat-donor-list',
    'market': 'bazar-weekly-create',
    'attendance': 'attendance-student',
    'results': 'result-create',
    'income-expense': 'voucher-deposit',
    'id-cards': 'idcard-student',
    'sms': 'sms-student',
    'accounts': 'account-list',
    'reports': 'report-deposit',
    'settings': 'settings-institute'
  };

  const toggleSection = (sectionId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // If sidebar is currently collapsed / semi-nav, automatically expand it so full menu & submenus are beautifully visible!
    if (!sidebarOpen) {
      setSidebarOpen(true);
      setOpenSection(sectionId);
      if (defaultTabMap[sectionId]) {
        setActiveTab(defaultTabMap[sectionId]);
      }
      return;
    }

    setOpenSection(prev => {
      const isOpening = prev !== sectionId;
      if (isOpening && defaultTabMap[sectionId]) {
        setActiveTab(defaultTabMap[sectionId]);
      }
      return isOpening ? sectionId : null;
    });
  };

  const handleNavClick = (tab, e) => {
    if (e) e.preventDefault();
    setActiveTab(tab);
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
    if (window.innerWidth < 1200) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-backdrop d-xl-none"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1002
          }}
        />
      )}
      <nav className={`app-sidebar ${sidebarOpen ? "sidebar-open sidebar-mobile-open" : "semi-nav sidebar-closed"}`}>
      <div
        className="app-logo d-flex align-items-center"
        style={{
          height: '65px',
          minHeight: '65px',
          maxHeight: '65px',
          borderBottom: '1px solid #e2e8f0',
          padding: sidebarOpen ? '0 1rem' : '0',
          justifyContent: sidebarOpen ? 'space-between' : 'center',
          position: 'relative',
          backgroundColor: '#ffffff'
        }}
      >
        <a
          className={`logo d-flex align-items-center text-decoration-none ${!sidebarOpen ? 'justify-content-center w-100 p-0 m-0' : 'gap-2'}`}
          href="/dashboard"
          onClick={(e) => handleNavClick('dashboard', e)}
          title="মাদ্রাসা ম্যানেজমেন্ট - মাদ্রাসার হিসাব নিকাশ"
        >
          <img
            style={{
              height: '44px',
              width: '44px',
              minWidth: '44px',
              maxWidth: '44px',
              objectFit: 'contain',
              flexShrink: 0
            }}
            alt="মাদ্রাসা ৩৬০"
            src="/storage/institute/sidelogo/madrasha_360_logo.png"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/storage/institute/sidelogo/kZvKJCWGaUTdn3y6ZSjepGWQoM2vD9wRM6iBLrRl.png';
            }}
          />
          {sidebarOpen && (
            <div className="d-flex flex-column text-start overflow-hidden text-nowrap ms-1">
              <span
                className="fw-bold"
                style={{
                  fontSize: '1.05rem',
                  color: '#0F172A',
                  lineHeight: '1.25',
                  letterSpacing: '-0.2px',
                  fontFamily: "'SolaimanLipi', sans-serif"
                }}
              >
                মাদ্রাসা ম্যানেজমেন্ট
              </span>
              <span
                className="text-muted"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  lineHeight: '1.2',
                  fontFamily: "'SolaimanLipi', sans-serif"
                }}
              >
                মাদ্রাসার হিসাব নিকাশ
              </span>
            </div>
          )}
        </a>
        {sidebarOpen && (
          <span
            className="bg-light-primary toggle-semi-nav d-flex-center"
            style={{ cursor: 'pointer' }}
            onClick={() => setSidebarOpen(false)}
            role="button"
            tabIndex={0}
            title="মেনু সংকুচিত করুন"
          >
            <i className="ti ti-chevron-left"></i>
          </span>
        )}
      </div>

      <hr className="m-0 p-0 border-0" />
      <div className="app-nav" id="app-simple-bar">
        <ul className="main-nav p-0 mt-2 list-unstyled">
          {/* ড্যাশবোর্ড */}
          <li className={`no-sub ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <a
              href="/dashboard"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => handleNavClick('dashboard', e)}
            >
              <i className="fa-regular fa-house me-2"></i> ড্যাশবোর্ড
            </a>
          </li>

          {/* ছাত্র/ছাত্রী */}
          <li className={sidebarOpen && openSection === 'students' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'students'}
              
              href="#students"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('students', e)}
            >
              <i className="fa-solid fa-users me-2"></i>
              ছাত্র/ছাত্রী
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'students' ? 'show' : ''}`} id="students" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'student-create' ? 'active' : ''}>
                <a href="#student-create" onClick={(e) => handleNavClick('student-create', e)}>ছাত্র/ছাত্রী তৈরি</a>
              </li>
              <li className={activeTab === 'student-list' ? 'active' : ''}>
                <a href="#student-list" onClick={(e) => handleNavClick('student-list', e)}>ছাত্র/ছাত্রী লিস্ট</a>
              </li>
              <li className={activeTab === 'jamat-grid' ? 'active' : ''}>
                <a href="#jamat-grid" onClick={(e) => handleNavClick('jamat-grid', e)}>জামাত অনুসারে ছাত্র/ছাত্রী </a>
              </li>
              <li className={activeTab === 'student-admission-report' ? 'active' : ''}>
                <a href="#student-admission-report" onClick={(e) => handleNavClick('student-admission-report', e)}>জামাত অনুসারে ভর্তি প্রতিবেদন</a>
              </li>
              <li className={activeTab === 'student-admission-register' ? 'active' : ''}>
                <a href="#student-admission-register" onClick={(e) => handleNavClick('student-admission-register', e)}>জামাত অনুসারে ভর্তি রেজিষ্টার</a>
              </li>
              <li className={activeTab === 'student-bloodgroup' ? 'active' : ''}>
                <a href="#student-bloodgroup" onClick={(e) => handleNavClick('student-bloodgroup', e)}>রক্তের গ্রুপ অনুসারে ছাত্র/ছাত্রী</a>
              </li>
              <li className={activeTab === 'student-parents-number' ? 'active' : ''}>
                <a href="#student-parents-number" onClick={(e) => handleNavClick('student-parents-number', e)}>জামাত অনুযায়ী অভিভাবকের মোবাঃ নাম্বার</a>
              </li>
              <li className={activeTab === 'student-khuraki-entry' ? 'active' : ''}>
                <a href="#student-khuraki-entry" onClick={(e) => handleNavClick('student-khuraki-entry', e)}>খানার টাকা জমার এন্ট্রি সিস্টেম</a>
              </li>
              <li className={activeTab === 'student-khuraki-list' ? 'active' : ''}>
                <a href="#student-khuraki-list" onClick={(e) => handleNavClick('student-khuraki-list', e)}>খানার টাকা জমার তালিকা</a>
              </li>
              <li className={activeTab === 'student-khuraki-register' ? 'active' : ''}>
                <a href="#student-khuraki-register" onClick={(e) => handleNavClick('student-khuraki-register', e)}>খোরাকীর টাকা আদায়ের রেজিস্টার</a>
              </li>
              <li className={activeTab === 'student-salary-entry' ? 'active' : ''}>
                <a href="#student-salary-entry" onClick={(e) => handleNavClick('student-salary-entry', e)}>বেতন জমার এন্ট্রি সিস্টেম</a>
              </li>
              <li className={activeTab === 'student-salary-list' ? 'active' : ''}>
                <a href="#student-salary-list" onClick={(e) => handleNavClick('student-salary-list', e)}>বেতনের টাকা জমার তালিকা</a>
              </li>
              <li className={activeTab === 'student-salary-register' ? 'active' : ''}>
                <a href="#student-salary-register" onClick={(e) => handleNavClick('student-salary-register', e)}>বেতনের টাকা আদায়ের রেজিস্টার</a>
              </li>
              <li className={activeTab === 'student-fees' ? 'active' : ''}>
                <a href="#student-fees" onClick={(e) => handleNavClick('student-fees', e)}>ছাত্র ফি কার্ড (১২ মাস)</a>
              </li>
              <li className={activeTab === 'student-admission-form' ? 'active' : ''}>
                <a href="#student-admission-form" onClick={(e) => handleNavClick('student-admission-form', e)}>ভর্তি ফর্ম</a>
              </li>
              <li className={activeTab === 'student-prottoyon' ? 'active' : ''}>
                <a href="#student-prottoyon" onClick={(e) => handleNavClick('student-prottoyon', e)}>প্রত্যয়ন পত্র</a>
              </li>
              <li className={activeTab === 'student-certificate' ? 'active' : ''}>
                <a href="#student-certificate" onClick={(e) => handleNavClick('student-certificate', e)}>সার্টিফিকেট</a>
              </li>
            </ul>
          </li>

          {/* শিক্ষক */}
          <li className={sidebarOpen && openSection === 'teachers' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'teachers'}
              
              href="#teachers"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('teachers', e)}
            >
              <i className="fa-solid fa-chalkboard-user me-2"></i>
              শিক্ষক
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'teachers' ? 'show' : ''}`} id="teachers" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'teacher-create' ? 'active' : ''}>
                <a href="#teacher-create" onClick={(e) => handleNavClick('teacher-create', e)}>শিক্ষক তৈরি</a>
              </li>
              <li className={activeTab === 'teacher-list' ? 'active' : ''}>
                <a href="#teacher-list" onClick={(e) => handleNavClick('teacher-list', e)}>শিক্ষক তালিকা</a>
              </li>
              <li className={activeTab === 'teacher-number' ? 'active' : ''}>
                <a href="#teacher-number" onClick={(e) => handleNavClick('teacher-number', e)}>শিক্ষকগণের মোবাইল নম্বর </a>
              </li>
              <li className={activeTab === 'teacher-salary-sheet' ? 'active' : ''}>
                <a href="#teacher-salary-sheet" onClick={(e) => handleNavClick('teacher-salary-sheet', e)}>শিক্ষকগণের বেতন তালিকা</a>
              </li>
              <li className={activeTab === 'teacher-salary-day' ? 'active' : ''}>
                <a href="#teacher-salary-day" onClick={(e) => handleNavClick('teacher-salary-day', e)}>শিক্ষকগণের বেতন দিন</a>
              </li>
              <li className={activeTab === 'teacher-salary-list' ? 'active' : ''}>
                <a href="#teacher-salary-list" onClick={(e) => handleNavClick('teacher-salary-list', e)}>শিক্ষকের বেতন প্রদানের লিস্ট</a>
              </li>
            </ul>
          </li>

          {/* মাসিক চাঁদাদাতা */}
          <li className={sidebarOpen && openSection === 'monthly-donors' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'monthly-donors'}
              
              href="#monthly-donors"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('monthly-donors', e)}
            >
              <i className="fa-solid fa-calendar-check me-2"></i>
              মাসিক চাঁদাদাতা
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'monthly-donors' ? 'show' : ''}`} id="monthly-donors" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'contributor-list' ? 'active' : ''}>
                <a href="#contributor-list" onClick={(e) => handleNavClick('contributor-list', e)}>মাসিক চাঁদাদাতার তালিকা</a>
              </li>
              <li className={activeTab === 'contributor-add' ? 'active' : ''}>
                <a href="#contributor-add" onClick={(e) => handleNavClick('contributor-add', e)}>মাসিক চাঁদা গ্রহণ</a>
              </li>
              <li className={activeTab === 'contributor-individual' ? 'active' : ''}>
                <a href="#contributor-individual" onClick={(e) => handleNavClick('contributor-individual', e)}>মাসিক চাঁদাদাতার তালিকা (একক ভাবে) </a>
              </li>
              <li className={activeTab === 'contributor-all' ? 'active' : ''}>
                <a href="#contributor-all" onClick={(e) => handleNavClick('contributor-all', e)}>মাসিক চাঁদাদাতাদের তালিকা (সকল)</a>
              </li>
              <li className={activeTab === 'contributor-history' ? 'active' : ''}>
                <a href="#contributor-history" onClick={(e) => handleNavClick('contributor-history', e)}>মাসিক চাঁদা গ্রহণের লিস্ট</a>
              </li>
            </ul>
          </li>

          {/* দানকারী */}
          <li className={sidebarOpen && openSection === 'donors' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'donors'}
              
              href="#donors"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('donors', e)}
            >
              <i className="fa-solid fa-hand-holding-heart me-2"></i>
              দানকারী
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'donors' ? 'show' : ''}`} id="donors" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'donor-create' ? 'active' : ''}>
                <a href="#donor-create" onClick={(e) => handleNavClick('donor-create', e)}>নতুন দানকারী তৈরি</a>
              </li>
              <li className={activeTab === 'donor-list' ? 'active' : ''}>
                <a href="#donor-list" onClick={(e) => handleNavClick('donor-list', e)}>দানকারীর তালিকা</a>
              </li>
              <li className={activeTab === 'donation-create' ? 'active' : ''}>
                <a href="#donation-create" onClick={(e) => handleNavClick('donation-create', e)}>দান গ্রহণ</a>
              </li>
              <li className={activeTab === 'donor-individual' ? 'active' : ''}>
                <a href="#donor-individual" onClick={(e) => handleNavClick('donor-individual', e)}>দানকারীর তালিকা (একক ভাবে)</a>
              </li>
              <li className={activeTab === 'donor-all' ? 'active' : ''}>
                <a href="#donor-all" onClick={(e) => handleNavClick('donor-all', e)}>দানকারীর তালিকা (সকল)</a>
              </li>
              <li className={activeTab === 'donation-history' ? 'active' : ''}>
                <a href="#donation-history" onClick={(e) => handleNavClick('donation-history', e)}>দান গ্রহণের লিস্ট</a>
              </li>
            </ul>
          </li>

          {/* যাকাত দাতা */}
          <li className={sidebarOpen && openSection === 'zakat-donors' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'zakat-donors'}
              
              href="#zakat-donors"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('zakat-donors', e)}
            >
              <i className="fa-solid fa-gem me-2"></i>
              যাকাত দাতা
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'zakat-donors' ? 'show' : ''}`} id="zakat-donors" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'zakat-donor-create' ? 'active' : ''}>
                <a href="#zakat-donor-create" onClick={(e) => handleNavClick('zakat-donor-create', e)}>নতুন যাকাত দাতা তৈরি</a>
              </li>
              <li className={activeTab === 'zakat-donor-list' ? 'active' : ''}>
                <a href="#zakat-donor-list" onClick={(e) => handleNavClick('zakat-donor-list', e)}>যাকাত দাতার তালিকা</a>
              </li>
              <li className={activeTab === 'zakat-donation-create' ? 'active' : ''}>
                <a href="#zakat-donation-create" onClick={(e) => handleNavClick('zakat-donation-create', e)}>যাকাত গ্রহণ</a>
              </li>
              <li className={activeTab === 'zakat-donor-individual' ? 'active' : ''}>
                <a href="#zakat-donor-individual" onClick={(e) => handleNavClick('zakat-donor-individual', e)}>যাকাত দাতার তালিকা (একক ভাবে)</a>
              </li>
              <li className={activeTab === 'zakat-donor-all' ? 'active' : ''}>
                <a href="#zakat-donor-all" onClick={(e) => handleNavClick('zakat-donor-all', e)}>যাকাত দাতার তালিকা (সকল)</a>
              </li>
              <li className={activeTab === 'zakat-donation-history' ? 'active' : ''}>
                <a href="#zakat-donation-history" onClick={(e) => handleNavClick('zakat-donation-history', e)}>যাকাত গ্রহণের লিস্ট</a>
              </li>
            </ul>
          </li>

          {/* বাজার */}
          <li className={sidebarOpen && openSection === 'market' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'market'}
              
              href="#market"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('market', e)}
            >
              <i className="fa-solid fa-shopping-cart me-2"></i>
              বাজার
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'market' ? 'show' : ''}`} id="market" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'bazar-weekly-create' ? 'active' : ''}>
                <a href="#bazar-weekly-create" onClick={(e) => handleNavClick('bazar-weekly-create', e)}>সাপ্তাহিক বাজার এন্ট্রি</a>
              </li>
              <li className={activeTab === 'bazar-weekly-report' ? 'active' : ''}>
                <a href="#bazar-weekly-report" onClick={(e) => handleNavClick('bazar-weekly-report', e)}>সাপ্তাহিক বাজার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'bazar-weekly-list' ? 'active' : ''}>
                <a href="#bazar-weekly-list" onClick={(e) => handleNavClick('bazar-weekly-list', e)}>সাপ্তাহিক বাজার লিস্ট</a>
              </li>
              <li className={activeTab === 'bazar-monthly-create' ? 'active' : ''}>
                <a href="#bazar-monthly-create" onClick={(e) => handleNavClick('bazar-monthly-create', e)}>মাসিক বাজার এন্ট্রি</a>
              </li>
              <li className={activeTab === 'bazar-monthly-report' ? 'active' : ''}>
                <a href="#bazar-monthly-report" onClick={(e) => handleNavClick('bazar-monthly-report', e)}>মাসিক বাজার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'bazar-monthly-list' ? 'active' : ''}>
                <a href="#bazar-monthly-list" onClick={(e) => handleNavClick('bazar-monthly-list', e)}>মাসিক বাজার লিস্ট</a>
              </li>
            </ul>
          </li>

          {/* কমিটির সদস্যগণের তালিকা */}
          <li className={`no-sub ${activeTab === 'committee-list' ? 'active' : ''}`}>
            <a
              href="#committee-list"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => handleNavClick('committee-list', e)}
            >
              <i className="fa-solid fa-users-gear me-2"></i> কমিটির সদস্যগণ
            </a>
          </li>

          {/* হাজিরা */}
          <li className={sidebarOpen && openSection === 'attendance' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'attendance'}
              
              href="#attendance"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('attendance', e)}
            >
              <i className="fa-solid fa-user-check me-2"></i>
              হাজিরা
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'attendance' ? 'show' : ''}`} id="attendance" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'attendance-student' ? 'active' : ''}>
                <a href="#attendance-student" onClick={(e) => handleNavClick('attendance-student', e)}>ছাত্র-ছাত্রী হাজিরা</a>
              </li>
              <li className={activeTab === 'attendance-student-report' ? 'active' : ''}>
                <a href="#attendance-student-report" onClick={(e) => handleNavClick('attendance-student-report', e)}>ছাত্র-ছাত্রী হাজিরা প্রতিবেদন</a>
              </li>
              <li className={activeTab === 'attendance-teacher' ? 'active' : ''}>
                <a href="#attendance-teacher" onClick={(e) => handleNavClick('attendance-teacher', e)}>শিক্ষক হাজিরা</a>
              </li>
              <li className={activeTab === 'attendance-teacher-report' ? 'active' : ''}>
                <a href="#attendance-teacher-report" onClick={(e) => handleNavClick('attendance-teacher-report', e)}>শিক্ষক হাজিরা রিপোর্ট</a>
              </li>
            </ul>
          </li>

          {/* রেজাল্ট */}
          <li className={sidebarOpen && openSection === 'results' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'results'}
              
              href="#results"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('results', e)}
            >
              <i className="fa-solid fa-chart-line me-2"></i>
              রেজাল্ট
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'results' ? 'show' : ''}`} id="results" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'result-create' ? 'active' : ''}>
                <a href="#result-create" onClick={(e) => handleNavClick('result-create', e)}>মার্কস এনট্রি/আপডেট</a>
              </li>
              <li className={activeTab === 'result-sheet' ? 'active' : ''}>
                <a href="#result-sheet" onClick={(e) => handleNavClick('result-sheet', e)}>রেজাল্ট শীট</a>
              </li>
              <li className={activeTab === 'result-student' ? 'active' : ''}>
                <a href="#result-student" onClick={(e) => handleNavClick('result-student', e)}>ছাত্র-ছাত্রী ভিত্তিক রেজাল্ট</a>
              </li>
            </ul>
          </li>

          {/* জমা/খরচ হিসাব সমূহ */}
          <li className={sidebarOpen && openSection === 'income-expense' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'income-expense'}
              
              href="#income-expense"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('income-expense', e)}
            >
              <i className="fa-solid fa-wallet me-2"></i>
              জমা/খরচ হিসাব সমূহ
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'income-expense' ? 'show' : ''}`} id="income-expense" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'voucher-deposit' ? 'active' : ''}>
                <a href="#voucher-deposit" onClick={(e) => handleNavClick('voucher-deposit', e)}>নতুন অর্থ জমা করুন</a>
              </li>
              <li className={activeTab === 'deposit-list' ? 'active' : ''}>
                <a href="#deposit-list" onClick={(e) => handleNavClick('deposit-list', e)}>জমার লিস্ট</a>
              </li>
              <li className={activeTab === 'voucher-expense' ? 'active' : ''}>
                <a href="#voucher-expense" onClick={(e) => handleNavClick('voucher-expense', e)}>নতুন খরচ</a>
              </li>
              <li className={activeTab === 'expense-list' ? 'active' : ''}>
                <a href="#expense-list" onClick={(e) => handleNavClick('expense-list', e)}>খরচের লিস্ট</a>
              </li>
            </ul>
          </li>

          {/* আইডি কার্ড */}
          <li className={sidebarOpen && openSection === 'id-cards' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'id-cards'}
              
              href="#id-cards"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('id-cards', e)}
            >
              <i className="fa-solid fa-id-card me-2"></i>
              আইডি কার্ড
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'id-cards' ? 'show' : ''}`} id="id-cards" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'idcard-student' ? 'active' : ''}>
                <a href="#idcard-student" onClick={(e) => handleNavClick('idcard-student', e)}>ছাএ-ছাএীর আইডি কার্ড</a>
              </li>
              <li className={activeTab === 'idcard-teacher' ? 'active' : ''}>
                <a href="#idcard-teacher" onClick={(e) => handleNavClick('idcard-teacher', e)}>শিক্ষকদের আইডি কার্ড</a>
              </li>
            </ul>
          </li>

          {/* SMS পাঠান */}
          <li className={sidebarOpen && openSection === 'sms' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'sms'}
              
              href="#sms"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('sms', e)}
            >
              <i className="fa-solid fa-comment-sms me-2"></i>
              SMS পাঠান
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'sms' ? 'show' : ''}`} id="sms" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'sms-student' || activeTab === 'sms-client' || activeTab === 'sms-send' ? 'active' : ''}>
                <a href="/admin/sms/send-to-client" onClick={(e) => handleNavClick('sms-student', e)}>ছাত্র-ছাত্রীদের SMS পাঠান</a>
              </li>
              <li className={activeTab === 'sms-teacher' ? 'active' : ''}>
                <a href="/admin/sms/send-to-teacher" onClick={(e) => handleNavClick('sms-teacher', e)}>শিক্ষকদের SMS পাঠান</a>
              </li>
            </ul>
          </li>

          {/* অ্যাকাউন্ট */}
          <li className={sidebarOpen && openSection === 'accounts' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'accounts'}
              
              href="#accounts"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('accounts', e)}
            >
              <i className="fa-solid fa-wallet me-2"></i>
              অ্যাকাউন্ট
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'accounts' ? 'show' : ''}`} id="accounts" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'account-create' ? 'active' : ''}>
                <a href="/admin/account/create" onClick={(e) => handleNavClick('account-create', e)}>নতুন অ্যাকাউন্ট তৈরি</a>
              </li>
              <li className={activeTab === 'account-list' || activeTab === 'accounts-list' || activeTab.startsWith('account-edit') ? 'active' : ''}>
                <a href="/admin/account" onClick={(e) => handleNavClick('account-list', e)}>অ্যাকাউন্ট তালিকা</a>
              </li>
              <li className={activeTab === 'account-report' ? 'active' : ''}>
                <a href="/admin/account/account/report" onClick={(e) => handleNavClick('account-report', e)}>অ্যাকাউন্ট বিবরণী</a>
              </li>
              <li className={activeTab === 'accounts-transfer' || activeTab === 'balance-transfer' ? 'active' : ''}>
                <a href="/admin/account/balance/transfer" onClick={(e) => handleNavClick('accounts-transfer', e)}>ব্যলেন্স ট্রান্সফার</a>
              </li>
              <li className={activeTab === 'balancesheet' ? 'active' : ''}>
                <a href="/admin/account/balancesheet" onClick={(e) => handleNavClick('balancesheet', e)}>ব্যলেন্স সিট</a>
              </li>
            </ul>
          </li>

          {/* রিপোর্ট */}
          <li className={sidebarOpen && openSection === 'reports' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'reports'}
              
              href="#reports"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('reports', e)}
            >
              <i className="fa-solid fa-file-alt me-2"></i>
              রিপোর্ট
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'reports' ? 'show' : ''}`} id="reports" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'report-deposit' ? 'active' : ''}>
                <a href="#report-deposit" onClick={(e) => handleNavClick('report-deposit', e)}>জমার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-student-deposit' ? 'active' : ''}>
                <a href="#report-student-deposit" onClick={(e) => handleNavClick('report-student-deposit', e)}>ছাত্র/ছাত্রী জমার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-student-salary' ? 'active' : ''}>
                <a href="#report-student-salary" onClick={(e) => handleNavClick('report-student-salary', e)}>ছাত্র/ছাত্রীর মাসিক বেতন জমার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-deposit-account' ? 'active' : ''}>
                <a href="#report-deposit-account" onClick={(e) => handleNavClick('report-deposit-account', e)}>জমার খাতের রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-monthly-donors' ? 'active' : ''}>
                <a href="#report-monthly-donors" onClick={(e) => handleNavClick('report-monthly-donors', e)}>মাসিক চাদাদাতার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-account-deposit' ? 'active' : ''}>
                <a href="#report-account-deposit" onClick={(e) => handleNavClick('report-account-deposit', e)}>এ্যাকাউন্টে জমার রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-expense' ? 'active' : ''}>
                <a href="#report-expense" onClick={(e) => handleNavClick('report-expense', e)}>খরচের রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-expense-account' ? 'active' : ''}>
                <a href="#report-expense-account" onClick={(e) => handleNavClick('report-expense-account', e)}>খরচের খাতের রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-account-expense' ? 'active' : ''}>
                <a href="#report-account-expense" onClick={(e) => handleNavClick('report-account-expense', e)}>এ্যাকাউন্টে খরচের রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-deposit-expense' ? 'active' : ''}>
                <a href="#report-deposit-expense" onClick={(e) => handleNavClick('report-deposit-expense', e)}>জমা ও খরচের রিপোর্ট</a>
              </li>
              <li className={activeTab === 'report-account-details' ? 'active' : ''}>
                <a href="#report-account-details" onClick={(e) => handleNavClick('report-account-details', e)}>এ্যাকাউন্টে বিবরণ</a>
              </li>
            </ul>
          </li>

          {/* দৈনিক আয়-ব্যয়ের প্রতিবেদন */}
          <li className={`no-sub ${activeTab === 'report-daily' ? 'active' : ''}`}>
            <a
              href="#report-daily"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => handleNavClick('report-daily', e)}
            >
              <i className="fa-solid fa-calendar-day me-2"></i> দৈনিক আয়-ব্যয়ের প্রতিবেদন
            </a>
          </li>

          {/* বার্ষিক আয়-ব্যয়ের প্রতিবেদন */}
          <li className={`no-sub ${activeTab === 'report-yearly' ? 'active' : ''}`}>
            <a
              href="#report-yearly"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => handleNavClick('report-yearly', e)}
            >
              <i className="fa-solid fa-calendar-week me-2"></i> বার্ষিক আয়-ব্যয়ের প্রতিবেদন
            </a>
          </li>

          {/* ব্যাংক প্রতিবেদন */}
          <li className={`no-sub ${activeTab === 'report-bank' ? 'active' : ''}`}>
            <a
              href="#report-bank"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => handleNavClick('report-bank', e)}
            >
              <i className="fa-solid fa-university me-2"></i> ব্যাংক প্রতিবেদন
            </a>
          </li>

          {/* সেটিং */}
          <li className={sidebarOpen && openSection === 'settings' ? 'active' : ''}>
            <a
              aria-expanded={sidebarOpen && openSection === 'settings'}
              
              href="#settings"
              className="d-flex align-items-center fw-bold text-decoration-none"
              onClick={(e) => toggleSection('settings', e)}
            >
              <i className="fa-solid fa-gear me-2"></i>
              সেটিং
            </a>
            <ul className={`sidebar-submenu collapse list-unstyled ${sidebarOpen && openSection === 'settings' ? 'show' : ''}`} id="settings" style={!sidebarOpen ? { display: 'none' } : undefined}>
              <li className={activeTab === 'settings-institute' ? 'active' : ''}>
                <a href="#settings-institute" onClick={(e) => handleNavClick('settings-institute', e)}>প্রতিষ্ঠানের তথ্য</a>
              </li>
              <li className={activeTab === 'settings-jamat' ? 'active' : ''}>
                <a href="#settings-jamat" onClick={(e) => handleNavClick('settings-jamat', e)}> জামাত তৈরি</a>
              </li>
              <li className={activeTab === 'settings-payment' ? 'active' : ''}>
                <a href="#settings-payment" onClick={(e) => handleNavClick('settings-payment', e)}>পেমেন্ট মাধ্যম তৈরি</a>
              </li>
              <li className={activeTab === 'settings-deposit-cat' ? 'active' : ''}>
                <a href="#settings-deposit-cat" onClick={(e) => handleNavClick('settings-deposit-cat', e)}> জমার খাত</a>
              </li>
              <li className={activeTab === 'settings-expense-cat' ? 'active' : ''}>
                <a href="#settings-expense-cat" onClick={(e) => handleNavClick('settings-expense-cat', e)}> খরচের খাত</a>
              </li>
              <li className={activeTab === 'settings-receiver' ? 'active' : ''}>
                <a href="#settings-receiver" onClick={(e) => handleNavClick('settings-receiver', e)}> গ্রহণকারী</a>
              </li>
              <li className={activeTab === 'settings-role' ? 'active' : ''}>
                <a href="#settings-role" onClick={(e) => handleNavClick('settings-role', e)}>রোল (Role)</a>
              </li>
              <li className={activeTab === 'settings-user' ? 'active' : ''}>
                <a href="#settings-user" onClick={(e) => handleNavClick('settings-user', e)}>ইউজার</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="menu-navs">
        <span className="menu-previous d-none"><i className="ti ti-chevron-left"></i></span>
        <span className="menu-next d-none"><i className="ti ti-chevron-right"></i></span>
      </div>
    </nav>
    </>
  );
};
