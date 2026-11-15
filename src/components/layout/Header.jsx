import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { sidebarOpen, setSidebarOpen, currentUser, logout, setActiveTab } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const displayName = currentUser?.name || 'মুহতামিম / সুপার এডমিন';
  const displayEmail = currentUser?.email || 'admin@gmail.com';
  const displayRole = currentUser?.role || 'Super Admin';

  return (
    <header className="header-main">
      <div className="container-fluid d-flex align-items-center justify-content-between w-100 h-100 px-3 px-md-4">
        <div className="d-flex align-items-center header-left">
          <span
            className="header-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            role="button"
            tabIndex={0}
            title="Toggle Menu"
          >
            <i className="ph ph-squares-four"></i>
          </span>

          {/* When collapsed, brand title and subtitle appear smoothly next to 4-dots toggle */}
          {!sidebarOpen && (
            <a
              href="/dashboard"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('dashboard');
              }}
              className="d-flex flex-column text-start ms-3 py-1 text-decoration-none"
              style={{ cursor: 'pointer' }}
              title="মাদ্রাসা ম্যানেজমেন্ট - মাদ্রাসার হিসাব নিকাশ"
            >
              <span
                className="fw-bold"
                style={{
                  fontSize: '1.12rem',
                  color: '#0f626a',
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
                  fontSize: '0.76rem',
                  fontWeight: 500,
                  lineHeight: '1.2',
                  fontFamily: "'SolaimanLipi', sans-serif"
                }}
              >
                মাদ্রাসার হিসাব নিকাশ
              </span>
            </a>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-end header-right ms-auto">
          <ul className="d-flex align-items-center mb-0 list-unstyled">
            <li className="header-profile-settings">
              <div className="d-flex align-items-center nav-profile pe-1 ps-2">
                <div className="dropdown profile-menu-dropdown position-relative">
                  <span
                    aria-expanded={dropdownOpen}
                    role="button"
                    tabIndex={0}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="h-45 w-45 d-flex-center b-r-10 position-relative m-auto cursor-pointer"
                    style={{
                      width: '45px',
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '10px',
                      backgroundColor: '#0f626a'
                    }}
                    title="ইউজার প্রোফাইল ও সেটিংস"
                  >
                    <img
                      className="img-fluid b-r-10"
                      style={{ borderRadius: '10px', width: '100%', height: '100%', objectFit: 'cover' }}
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0f626a&color=fff&bold=true`}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/avatar.svg'; }}
                      alt="User Avatar"
                    />
                    <span
                      className="position-absolute top-0 end-0 p-1 bg-success border border-light rounded-circle"
                      style={{ width: '10px', height: '10px', backgroundColor: '#28a745' }}
                    ></span>
                  </span>

                  {dropdownOpen && (
                    <>
                      <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{ zIndex: 1040, background: 'transparent' }}
                        onClick={() => setDropdownOpen(false)}
                      />
                      <ul
                        className="dropdown-menu show position-absolute end-0 mt-2 shadow rounded-3 border-0"
                        style={{ display: 'block', minWidth: '240px', zIndex: 1050 }}
                      >
                        <div className="px-3 py-2 border-bottom mb-2 bg-light rounded-top-3">
                          <div className="d-flex align-items-center">
                            <div>
                              <span className="fw-semibold text-dark d-block text-truncate" style={{ maxWidth: '200px' }}>
                                {displayName}
                              </span>
                              <span className="badge bg-primary-subtle text-primary mt-1" style={{ fontSize: '11px' }}>
                                {displayRole}
                              </span>
                              <span className="text-muted d-block mt-0.5" style={{ fontSize: '11.5px' }}>
                                {displayEmail}
                              </span>
                            </div>
                          </div>
                        </div>

                        <li className="dropdown-item py-1">
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none d-flex align-items-center w-100 p-0 text-start"
                            style={{ fontSize: '13px' }}
                            onClick={() => {
                              setDropdownOpen(false);
                              if (setActiveTab) setActiveTab('settings-user');
                            }}
                          >
                            <i className="ph-duotone ph-user pe-2 f-s-18 text-primary"></i> প্রোফাইল / ইউজার পরিবর্তন
                          </button>
                        </li>

                        <li className="dropdown-item py-1">
                          <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none d-flex align-items-center w-100 p-0 text-start"
                            style={{ fontSize: '13px' }}
                            onClick={() => {
                              setDropdownOpen(false);
                              if (setActiveTab) setActiveTab('settings-institute');
                            }}
                          >
                            <i className="ph-duotone ph-gear pe-2 f-s-18 text-primary"></i> প্রতিষ্ঠান সেটিংস
                          </button>
                        </li>

                        <div className="dropdown-divider my-1"></div>

                        <li className="dropdown-item py-1">
                          <button
                            type="button"
                            className="btn btn-link text-danger text-decoration-none d-flex align-items-center w-100 p-0 text-start"
                            style={{ fontSize: '13px', fontWeight: '600' }}
                            onClick={() => {
                              setDropdownOpen(false);
                              logout();
                            }}
                          >
                            <i className="ph-duotone ph-sign-out pe-2 f-s-18 text-danger"></i> লগআউট (Log Out)
                          </button>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
