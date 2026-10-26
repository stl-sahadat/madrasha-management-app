import React from 'react';
import { ShieldCheck, Phone, MapPin, Calendar, Award, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommitteeModule = () => {
  const { committee } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-[#0f626a]" />
            <span>মাদ্রাসা পরিচালনা কমিটি (Governing Body)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসার সম্মানিত কার্যনির্বাহী পরিচালনা পর্ষদ
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl shadow hover:bg-[#0c5259] transition"
        >
          কমিটি তালিকা প্রিন্ট
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {committee.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0f626a] to-[#13747d] text-white flex items-center justify-center font-bold text-sm shadow">
                  সদস্য
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{member.name}</h3>
                  <span className="inline-block mt-0.5 px-2 py-0.5 text-[11px] font-bold bg-[#eaf4f5] text-[#0f626a] rounded-full">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-[#0f626a]" />
                  <span className="font-mono font-bold text-gray-800">{member.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-[#0f626a]" />
                  <span>{member.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-[#0f626a]" />
                  <span>মেয়াদকাল: <strong>{member.tenure}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>অনুমোদিত সদস্য</span>
              </span>
              <span className="text-gray-400 font-mono">{member.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
