import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionReport = () => {
  const { students, jamats } = useApp();
  const [selectedYear] = useState('২০২৬');

  // Compute stats per jamat
  const jamatStats = jamats.map((j, index) => {
    const list = students.filter(s => s.jamat === j.name);
    const residential = list.filter(s => (s.khurakiFee || s.food_bill || 0) > 0 || s.residential === 'আবাসিক').length;
    const nonResidential = list.length - residential;
    const selfKhuraki = list.filter(s => s.meal_type === 'সাধারণ' || (!s.meal_type && residential > 0)).length;
    const halfFree = list.filter(s => s.meal_type === 'হাফ ফ্রি').length;
    const fullFree = list.filter(s => s.meal_type === 'ফুল ফ্রি').length;

    return {
      index: index + 1,
      name: j.name,
      selfKhuraki: selfKhuraki || Math.round(residential * 0.5),
      halfFree: halfFree || Math.round(residential * 0.3),
      fullFree: fullFree || (residential - Math.round(residential * 0.5) - Math.round(residential * 0.3)),
      residential,
      nonResidential,
      total: list.length
    };
  });

  const totals = jamatStats.reduce(
    (acc, curr) => ({
      selfKhuraki: acc.selfKhuraki + curr.selfKhuraki,
      halfFree: acc.halfFree + curr.halfFree,
      fullFree: acc.fullFree + curr.fullFree,
      residential: acc.residential + curr.residential,
      nonResidential: acc.nonResidential + curr.nonResidential,
      total: acc.total + curr.total
    }),
    { selfKhuraki: 0, halfFree: 0, fullFree: 0, residential: 0, nonResidential: 0, total: 0 }
  );

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 shadow-sm mb-4" id="printContent">
        <div className="card-body py-4">
          {/* Header Section with Banner */}
          <img
            src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
            alt="Banner"
            className="w-100 img-fluid"
          />
          <div className="row mt-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                এক নজরে ছাত্র ভর্তি প্রতিবেদন
              </h5>
            </div>
            <div className="col-md-2 text-end">
              <p className="mb-0 fw-semibold">সন {selectedYear} ইং</p>
            </div>
          </div>
        </div>

        <div className="table-responsive card-body">
          <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
            <thead className="bg-primary print-thead text-white">
              <tr className="text-center">
                <th>নং</th>
                <th>জামাতের নাম</th>
                <th>নিজ খোরাকি</th>
                <th>হাফ ফ্রি</th>
                <th>ফুল ফ্রি</th>
                <th>আবাসিক</th>
                <th>অনাবাসিক</th>
                <th>মোট</th>
              </tr>
            </thead>
            <tbody>
              {jamatStats.map((row) => (
                <tr key={row.name}>
                  <td className="text-center">{row.index}</td>
                  <td>{row.name}</td>
                  <td className="text-center">{row.selfKhuraki}</td>
                  <td className="text-center">{row.halfFree}</td>
                  <td className="text-center">{row.fullFree}</td>
                  <td className="text-center">{row.residential}</td>
                  <td className="text-center">{row.nonResidential}</td>
                  <td className="text-center fw-bold">{row.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="table-secondary fw-bold">
              <tr className="text-center">
                <td colSpan="2">সর্বমোট</td>
                <td>{totals.selfKhuraki}</td>
                <td>{totals.halfFree}</td>
                <td>{totals.fullFree}</td>
                <td>{totals.residential}</td>
                <td>{totals.nonResidential}</td>
                <td>{totals.total} জন</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Print Button */}
      <div className="row mb-3 no-print">
        <div className="col-12 d-flex justify-content-center">
          <button onClick={() => window.print()} className="btn btn-primary px-4 py-2">
            <i className="fas fa-print me-2"></i> প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};
