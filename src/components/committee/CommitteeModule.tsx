import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

export const CommitteeModule = () => {
  const { committee } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Committee list state
  const [memberList, setMemberList] = useState(() => {
    return (committee && committee.length > 0) ? committee : [
      { id: '1', name: 'হাজী মৌলভী মোঃ ইব্রাহীম', mobile: '01819000111', role: 'সভাপতি', designation: 'সভাপতি', address: 'চকরিয়া, কক্সবাজার' },
      { id: '2', name: 'মাওলানা আব্দুল হাকিম', mobile: '01819000222', role: 'সহ-সভাপতি', designation: 'সহ-সভাপতি', address: 'বদরখালী, কক্সবাজার' },
      { id: '3', name: 'মাওলানা মাহমুদুল করিম', mobile: '01820050095', role: 'সাধারণ সম্পাদক / মুহতামিম', designation: 'সাধারণ সম্পাদক / মুহতামিম', address: 'মাদ্রাসা ক্যাম্পাস' },
      { id: '4', name: 'হাজী মোঃ নুরুল ইসলাম', mobile: '01819000333', role: 'কোষাধ্যক্ষ', designation: 'কোষাধ্যক্ষ', address: 'চকরিয়া, কক্সবাজার' },
      { id: '5', name: 'মাওলানা সামসুল আলম', mobile: '01819000444', role: 'সদস্য', designation: 'সদস্য', address: 'পেকুয়া, কক্সবাজার' }
    ];
  });

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return memberList;
    const q = searchQuery.trim().toLowerCase();
    return memberList.filter(m =>
      (m.name || '').toLowerCase().includes(q) ||
      (m.designation || m.role || '').toLowerCase().includes(q) ||
      (m.mobile || m.phone || '').includes(q) ||
      (m.address || '').toLowerCase().includes(q)
    );
  }, [memberList, searchQuery]);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: 'বদরখালী, কক্সবাজার',
    designation: 'সদস্য'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert('সদস্যের নাম এবং মোবাইল নম্বর পূরণ করা আবশ্যক।');
      return;
    }
    const newMember = {
      id: (memberList.length + 1).toString(),
      name: formData.name,
      mobile: formData.mobile,
      designation: formData.designation,
      role: formData.designation,
      address: formData.address
    };
    setMemberList([...memberList, newMember]);
    setShowModal(false);
    alert('কমিটির সদস্য সফলভাবে যুক্ত করা হয়েছে!');
    setFormData({
      name: '',
      mobile: '',
      address: 'বদরখালী, কক্সবাজার',
      designation: 'সদস্য'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই কমিটির সদস্যকে মুছে ফেলতে চান?')) {
      setMemberList(memberList.filter(m => m.id !== id));
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Search & Actions Bar */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-body py-2">
          <div className="row g-2 align-items-center">
            <div className="col-md-6 col-12">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="fas fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 কমিটির সদস্যের নাম, পদবি বা মোবাইল নম্বর দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 text-md-end text-start">
              <button
                type="button"
                className="btn btn-danger text-white fw-bold"
                onClick={() => setShowModal(true)}
              >
                <i className="fa-solid fa-plus me-1"></i> কমিটির সদস্য যুক্ত করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Print Content Card */}
      <div className="card border-0 shadow-sm mb-4" id="printContent">
        <div className="card-body py-4">
          <img
            src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
            alt="Banner"
            className="w-100 img-fluid rounded"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="row mt-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>কমিটির সদস্যদের তালিকা</h5>
            </div>
            <div className="col-md-2 text-end">
              <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
            </div>
          </div>
        </div>

        <div className="table-responsive card-body">
          <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
            <thead className="bg-primary print-thead text-white">
              <tr>
                <th style={{ width: '60px' }}>নং</th>
                <th className="text-start">নাম</th>
                <th>মোবাইল</th>
                <th>পদবি</th>
                <th className="text-start">ঠিকানা</th>
                <th className="no-print" style={{ width: '100px' }}>ক্রিয়া</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    কোনো কমিটির সদস্য পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m, idx) => (
                  <tr key={m.id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-start fw-bold">{m.name}</td>
                    <td className="font-monospace fw-bold">{m.mobile || m.phone}</td>
                    <td>
                      <span className="badge bg-success">{m.designation || m.role}</span>
                    </td>
                    <td className="text-start">{m.address}</td>
                    <td className="text-center no-print">
                      <button
                        type="button"
                        onClick={() => handleDelete(m.id)}
                        className="btn btn-sm btn-danger delete-btn"
                        title="ডিলিট"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="m-3 d-flex justify-content-end no-print">
            <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
              <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>
      </div>

      {/* Add Committee Member Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <form onSubmit={handleSubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-user-plus me-2"></i>কমিটির সদস্য যুক্ত করুন
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">কমিটির সদস্যের নাম <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="কমিটির সদস্যের নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">কমিটির সদস্যের মোবাইল নম্বর <span className="text-danger">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="কমিটির সদস্যের মোবাইল নম্বর লিখুন"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">কমিটির সদস্যের ঠিকানা <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="কমিটির সদস্যের ঠিকানা লিখুন"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">সদস্য পদবি <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="সদস্য পদবি লিখুন (যেমন: সভাপতি, কোষাধ্যক্ষ, সদস্য)"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-times me-1"></i>বন্ধ করুন
                </button>
                <button type="submit" className="btn btn-danger">
                  <i className="fa-solid fa-save me-1"></i>সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
