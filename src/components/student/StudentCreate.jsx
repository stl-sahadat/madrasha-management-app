import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentCreate = () => {
  const { jamats, accounts, receivers, addStudent, setActiveTab } = useApp();

  const [formData, setFormData] = useState({
    // Left column
    name: '',
    birth_day: '',
    blood_group_id: '',
    father_name: '',
    mother_name: '',
    father_profesion: '',
    parents_name: '',
    parents_phone: '',
    parents_phone2: '',
    relation: 'পিতা',
    email: '',
    current_address: 'বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার',
    same_address: true,
    permanent_address: 'বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার',

    // Right column
    admission_date: new Date().toISOString().split('T')[0],
    form_number: Math.floor(1000 + Math.random() * 9000).toString(),
    admission_number: Math.floor(100 + Math.random() * 900).toString(),
    admission_fee: '1500',
    receiver_id: receivers[0]?.name || 'মাহমুদুল করিম',
    account_id: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    payment_method_id: 'cash',
    coursefee: '800',
    food_bill: '2000',
    jamat_id: jamats[0]?.name || 'হিফজ বিভাগ',
    meal_type: 'shadharon',
    residential: 'abasik',
    student_type: 'notun',
    etim: 'no',
    bording_food: 'yes',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'same_address') {
      setFormData(prev => ({
        ...prev,
        same_address: checked,
        permanent_address: checked ? prev.current_address : prev.permanent_address
      }));
    } else {
      setFormData(prev => {
        const next = { ...prev, [name]: value };
        if (name === 'current_address' && prev.same_address) {
          next.permanent_address = value;
        }
        return next;
      });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      birth_day: '',
      blood_group_id: '',
      father_name: '',
      mother_name: '',
      father_profesion: '',
      parents_name: '',
      parents_phone: '',
      parents_phone2: '',
      relation: 'পিতা',
      email: '',
      current_address: '',
      same_address: false,
      permanent_address: '',
      admission_date: new Date().toISOString().split('T')[0],
      form_number: '',
      admission_number: '',
      admission_fee: '1500',
      receiver_id: receivers[0]?.name || '',
      account_id: accounts[0]?.name || '',
      payment_method_id: 'cash',
      coursefee: '800',
      food_bill: '2000',
      jamat_id: jamats[0]?.name || 'হিফজ বিভাগ',
      meal_type: 'shadharon',
      residential: 'abasik',
      student_type: 'notun',
      etim: 'no',
      bording_food: 'yes',
      note: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('অনুগ্রহ করে ছাত্রের নাম লিখুন');
      return;
    }

    addStudent({
      name: formData.name,
      roll: formData.admission_number || formData.form_number || '101',
      admissionNumber: formData.admission_number,
      admission_number: formData.admission_number,
      form_number: formData.form_number,
      jamat: formData.jamat_id,
      bloodGroup: formData.blood_group_id || 'A+',
      dob: formData.birth_day,
      birthDay: formData.birth_day,
      fatherName: formData.father_name,
      motherName: formData.mother_name,
      fatherProf: formData.father_profesion,
      parentsName: formData.parents_name || formData.father_name,
      guardianPhone: formData.parents_phone,
      parentsPhone: formData.parents_phone,
      parentsPhone2: formData.parents_phone2,
      relation: formData.relation,
      email: formData.email,
      address: formData.current_address,
      currentAddress: formData.current_address,
      permanentAddress: formData.permanent_address,
      admissionDate: formData.admission_date,
      admissionFee: parseFloat(formData.admission_fee) || 0,
      monthlyFee: parseFloat(formData.coursefee) || 0,
      coursefee: parseFloat(formData.coursefee) || 0,
      khurakiFee: parseFloat(formData.food_bill) || 0,
      food_bill: parseFloat(formData.food_bill) || 0,
      meal_type: formData.meal_type === 'half_free' ? 'হাফ ফ্রি' : formData.meal_type === 'full_free' ? 'ফুল ফ্রি' : 'সাধারণ',
      residential: formData.residential === 'abasik' ? 'আবাসিক' : 'অনাবাসিক',
      student_type: formData.student_type === 'puraton' ? 'পুরাতন' : 'নতুন',
      etim: formData.etim === 'yes' ? 'হ্যা' : 'না',
      bording_food: formData.bording_food === 'yes' ? 'হ্যা' : 'না',
      note: formData.note,
      photo: '/students/FB_IMG_1791220812856.webp',
      status: 'সক্রিয়'
    });

    alert('ছাত্র/ছাত্রী সফলভাবে যুক্ত করা হয়েছে!');
    setActiveTab('student-list');
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-gradient bg-primary text-white py-3">
          <h5 className="mb-0 text-white">
            <i className="fas fa-clipboard-list me-2"></i>নতুন ছাত্র/ছাত্রী যুক্ত করুন
          </h5>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-lg-6">
                {/* ছাত্রের নাম */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    ছাত্রের নাম <span className="text-danger">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="ছাত্রের পূর্ণ নাম লিখুন"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* জন্ম তারিখ */}
                <div className="mb-3">
                  <label htmlFor="birth_day" className="form-label fw-semibold">
                    ছাত্রের জন্ম তারিখ
                  </label>
                  <input
                    name="birth_day"
                    type="date"
                    id="birth_day"
                    className="form-control"
                    value={formData.birth_day}
                    onChange={handleChange}
                  />
                </div>

                {/* রক্তের গ্রুপ */}
                <div className="mb-3">
                  <label htmlFor="blood_group_id" className="form-label fw-semibold">
                    রক্তের গ্রুপ (যদি জানা থাকে)
                  </label>
                  <select
                    name="blood_group_id"
                    id="blood_group_id"
                    className="form-select"
                    value={formData.blood_group_id}
                    onChange={handleChange}
                  >
                    <option value="">নির্বাচন করুন</option>
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

                {/* পিতার নাম */}
                <div className="mb-3">
                  <label htmlFor="father_name" className="form-label fw-semibold">
                    পিতার নাম
                  </label>
                  <input
                    type="text"
                    id="father_name"
                    name="father_name"
                    className="form-control"
                    placeholder="ছাত্রের পিতার নাম লিখুন"
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                </div>

                {/* মাতার নাম */}
                <div className="mb-3">
                  <label htmlFor="mother_name" className="form-label fw-semibold">
                    মাতার নাম
                  </label>
                  <input
                    type="text"
                    id="mother_name"
                    name="mother_name"
                    className="form-control"
                    placeholder="ছাত্রের মাতার নাম লিখুন"
                    value={formData.mother_name}
                    onChange={handleChange}
                  />
                </div>

                {/* পিতার পেশা */}
                <div className="mb-3">
                  <label htmlFor="father_profesion" className="form-label fw-semibold">
                    পিতার পেশা
                  </label>
                  <input
                    type="text"
                    id="father_profesion"
                    name="father_profesion"
                    className="form-control"
                    placeholder="ছাত্রের পিতার পেশা লিখুন"
                    value={formData.father_profesion}
                    onChange={handleChange}
                  />
                </div>

                {/* অভিভাবকের নাম */}
                <div className="mb-3">
                  <label htmlFor="parents_name" className="form-label fw-semibold">
                    অভিভাবকের নাম
                  </label>
                  <input
                    type="text"
                    id="parents_name"
                    name="parents_name"
                    className="form-control"
                    placeholder="অভিভাবকের নাম লিখুন"
                    value={formData.parents_name}
                    onChange={handleChange}
                  />
                </div>

                {/* অভিভাবকের ১ম মোবাইল নম্বর */}
                <div className="mb-3">
                  <label htmlFor="parents_phone" className="form-label fw-semibold">
                    অভিভাবকের ১ম মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    name="parents_phone"
                    id="parents_phone"
                    className="form-control"
                    placeholder="অভিভাবকের মোবাইল নম্বর লিখুন"
                    value={formData.parents_phone}
                    onChange={handleChange}
                  />
                </div>

                {/* অভিভাবকের ২য় মোবাইল নম্বর */}
                <div className="mb-3">
                  <label htmlFor="parents_phone2" className="form-label fw-semibold">
                    অভিভাবকের ২য় মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    name="parents_phone2"
                    id="parents_phone2"
                    className="form-control"
                    placeholder="অভিভাবকের মোবাইল নম্বর লিখুন"
                    value={formData.parents_phone2}
                    onChange={handleChange}
                  />
                </div>

                {/* অভিবাবকের সাথে ছাত্রের সম্পর্ক */}
                <div className="mb-3">
                  <label htmlFor="relation" className="form-label fw-semibold">
                    অভিবাবকের সাথে ছাত্রের সম্পর্ক
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="relation"
                    placeholder="অভিবাবকের সাথে ছাত্রের সম্পর্ক"
                    id="relation"
                    value={formData.relation}
                    onChange={handleChange}
                  />
                </div>

                {/* ই-মেইল */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    ই-মেইল (যদি থাকে)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="অভিভাবকের ই-মেইল লিখুন"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* বর্তমান ঠিকানা */}
                <div className="mb-3">
                  <label htmlFor="current_address" className="form-label fw-semibold">
                    বর্তমান ঠিকানা
                  </label>
                  <textarea
                    id="current_address"
                    name="current_address"
                    className="form-control"
                    rows="2"
                    placeholder="বর্তমান ঠিকানা লিখুন"
                    value={formData.current_address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* স্থায়ী ঠিকানা */}
                <div className="mb-3">
                  <label htmlFor="permanent_address" className="form-label fw-semibold d-flex align-items-center">
                    স্থায়ী ঠিকানা
                    <div className="form-check ms-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="same_address"
                        name="same_address"
                        checked={formData.same_address}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-normal" htmlFor="same_address">
                        বর্তমান ঠিকানার অনুরুপ
                      </label>
                    </div>
                  </label>
                  <textarea
                    name="permanent_address"
                    id="permanent_address"
                    className="form-control"
                    rows="3"
                    placeholder="স্থায়ী ঠিকানা লিখুন"
                    value={formData.permanent_address}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-lg-6">
                {/* ভর্তি তারিখ */}
                <div className="mb-3">
                  <label htmlFor="admission_date" className="form-label fw-semibold">
                    ভর্তি তারিখ
                  </label>
                  <input
                    name="admission_date"
                    type="date"
                    id="admission_date"
                    className="form-control"
                    value={formData.admission_date}
                    onChange={handleChange}
                  />
                </div>

                {/* ভর্তি ফরম নম্বর */}
                <div className="mb-3">
                  <label htmlFor="form_number" className="form-label fw-semibold">
                    ভর্তি ফরম নম্বর
                  </label>
                  <input
                    type="number"
                    id="form_number"
                    name="form_number"
                    className="form-control"
                    placeholder="ভর্তি ফরম নম্বর লিখুন"
                    value={formData.form_number}
                    onChange={handleChange}
                  />
                </div>

                {/* ভর্তি নম্বর */}
                <div className="mb-3">
                  <label htmlFor="admission_number" className="form-label fw-semibold">
                    ভর্তি নম্বর <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="admission_number"
                    name="admission_number"
                    className="form-control"
                    placeholder="ভর্তি নম্বর লিখুন"
                    value={formData.admission_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ভর্তি ফি */}
                <div className="mb-3">
                  <label htmlFor="admission_fee" className="form-label fw-semibold">
                    ভর্তি ফি
                  </label>
                  <input
                    type="number"
                    id="admission_fee"
                    name="admission_fee"
                    placeholder="ভর্তি ফি পরিমান লিখুন"
                    className="form-control"
                    value={formData.admission_fee}
                    onChange={handleChange}
                  />
                </div>

                {/* ভর্তি ফি গ্রহণকারী */}
                <div className="mb-3">
                  <label htmlFor="receiver_id" className="form-label fw-semibold">
                    ভর্তি ফি গ্রহণকারী <span className="text-danger">*</span>
                  </label>
                  <select
                    name="receiver_id"
                    id="receiver_id"
                    className="form-select"
                    value={formData.receiver_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">নির্বাচন করুন</option>
                    {receivers.map(r => (
                      <option key={r.id} value={r.name}>{r.name} ({r.designation || 'দায়িত্বশীল'})</option>
                    ))}
                  </select>
                </div>

                {/* ভর্তি ফি জমার এ্যাকাউন্ট */}
                <div className="mb-3">
                  <label htmlFor="account_id" className="form-label fw-semibold">
                    ভর্তি ফি জমার এ্যাকাউন্ট <span className="text-danger">*</span>
                  </label>
                  <select
                    name="account_id"
                    id="account_id"
                    className="form-select"
                    value={formData.account_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">নির্বাচন করুন</option>
                    {accounts.map(a => (
                      <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                  </select>
                </div>

                {/* ভর্তি ফি জমার পেমেন্ট মেথড */}
                <div className="mb-3">
                  <label htmlFor="payment_method_id" className="form-label fw-semibold">
                    ভর্তি ফি জমার পেমেন্ট মেথড <span className="text-danger">*</span>
                  </label>
                  <select
                    name="payment_method_id"
                    id="payment_method_id"
                    className="form-select"
                    value={formData.payment_method_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="cash">নগদ ক্যাশ (Cash)</option>
                    <option value="bkash">বিকাশ (bKash)</option>
                    <option value="nagad">নগদ (Nagad)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                  </select>
                </div>

                {/* বেতনের পরিমান */}
                <div className="mb-3">
                  <label htmlFor="coursefee" className="form-label fw-semibold">
                    বেতনের পরিমান
                  </label>
                  <input
                    type="number"
                    id="coursefee"
                    name="coursefee"
                    placeholder="বেতনের পরিমান লিখুন"
                    className="form-control"
                    value={formData.coursefee}
                    onChange={handleChange}
                  />
                </div>

                {/* খানার টাকা */}
                <div className="mb-3">
                  <label htmlFor="food_bill" className="form-label fw-semibold">
                    মাসিক খানার টাকার পরিমান
                  </label>
                  <input
                    type="number"
                    id="food_bill"
                    name="food_bill"
                    className="form-control"
                    placeholder="মাসিক খানার টাকার পরিমান লিখুন"
                    value={formData.food_bill}
                    onChange={handleChange}
                  />
                </div>

                {/* জামাতের নাম */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">জামাতের নাম</label>
                  <div className="d-flex flex-wrap gap-3">
                    {jamats.map((j, idx) => (
                      <div className="form-check" key={j.id || idx}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="jamat_id"
                          id={`jamat_${idx}`}
                          value={j.name}
                          checked={formData.jamat_id === j.name}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={`jamat_${idx}`}>
                          {j.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* টাইপ নির্ধারণ করুন */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">টাইপ নির্ধারণ করুন</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="meal_type"
                        id="meal_type1"
                        value="shadharon"
                        checked={formData.meal_type === 'shadharon'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="meal_type1">
                        সাধারণ
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="meal_type"
                        id="meal_type2"
                        value="half_free"
                        checked={formData.meal_type === 'half_free'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="meal_type2">
                        হাফ ফ্রি
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="meal_type"
                        id="meal_type3"
                        value="full_free"
                        checked={formData.meal_type === 'full_free'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="meal_type3">
                        ফুল ফ্রি
                      </label>
                    </div>
                  </div>
                </div>

                {/* আবাসিক / অনাবাসিক */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">আবাসিক / অনাবাসিক</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="residential"
                        id="residential1"
                        value="abasik"
                        checked={formData.residential === 'abasik'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="residential1">
                        আবাসিক
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="residential"
                        id="residential2"
                        value="onabashik"
                        checked={formData.residential === 'onabashik'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="residential2">
                        অনাবাসিক
                      </label>
                    </div>
                  </div>
                </div>

                {/* নতুন / পুরাতন */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">নতুন / পুরাতন</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="student_type"
                        id="student_type1"
                        value="notun"
                        checked={formData.student_type === 'notun'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="student_type1">
                        নতুন
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="student_type"
                        id="student_type2"
                        value="puraton"
                        checked={formData.student_type === 'puraton'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="student_type2">
                        পুরাতন
                      </label>
                    </div>
                  </div>
                </div>

                {/* এতিম */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">ছাত্র / ছাত্রী টি কি এতিম ?</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="etim"
                        id="etim0"
                        value="no"
                        checked={formData.etim === 'no'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="etim0">
                        না
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="etim"
                        id="etim1"
                        value="yes"
                        checked={formData.etim === 'yes'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="etim1">
                        এতিম
                      </label>
                    </div>
                  </div>
                </div>

                {/* বোর্ডিং এ খানা */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block">বোর্ডিং এ খানা খায়?</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bording_food"
                        id="bording_food1"
                        value="no"
                        checked={formData.bording_food === 'no'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="bording_food1">
                        না
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bording_food"
                        id="bording_food2"
                        value="yes"
                        checked={formData.bording_food === 'yes'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="bording_food2">
                        হ্যা
                      </label>
                    </div>
                  </div>
                </div>

                {/* মন্তব্য */}
                <div className="mb-3">
                  <label htmlFor="note" className="form-label fw-semibold">
                    নোট/মন্তব্য
                  </label>
                  <textarea
                    name="note"
                    id="note"
                    rows="4"
                    className="form-control"
                    placeholder="ছাত্র সম্পর্কে মন্তব্য লিখুন"
                    value={formData.note}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="d-flex gap-2 justify-content-end">
                  <button type="submit" name="submit" className="btn btn-success btn-lg px-4">
                    <i className="fas fa-check-circle me-2"></i>ছাত্র/ছাত্রী যুক্ত করুন
                  </button>
                  <button type="button" className="btn btn-warning btn-lg px-4" onClick={handleReset}>
                    <i className="fas fa-redo me-2"></i>রিসেট
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg px-4"
                    onClick={() => setActiveTab('student-list')}
                  >
                    <i className="fas fa-times-circle me-2"></i>বাতিল
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
