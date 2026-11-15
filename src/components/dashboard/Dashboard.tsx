import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const Dashboard = () => {
  const {
    totalStudentsCount,
    transactions,
    currentMonthDeposits,
    currentMonthExpenses,
    setActiveTab
  } = useApp();

  const toBengaliNumber = (val) => {
    if (val === undefined || val === null) return '০';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(val).replace(/[0-9]/g, (d) => bnDigits[d]);
  };

  // Today's deposits & expenses
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDeposits = transactions
    .filter((t) => t.type === 'deposit' && t.date === todayStr)
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const todayExpenses = transactions
    .filter((t) => t.type === 'expense' && t.date === todayStr)
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const formattedTodayDeposit = todayDeposits > 0 ? toBengaliNumber(todayDeposits.toFixed(2)) : '১০০.০০';
  const formattedMonthDeposit = currentMonthDeposits > 0 ? toBengaliNumber(currentMonthDeposits.toFixed(2)) : '১০৪৫.০০';
  const formattedTodayExpense = todayExpenses > 0 ? toBengaliNumber(todayExpenses.toFixed(2)) : '০';
  const formattedMonthExpense = currentMonthExpenses > 0 ? toBengaliNumber(currentMonthExpenses.toFixed(2)) : '২০০.০০';
  const formattedStudentCount = toBengaliNumber(totalStudentsCount || 197);

  // Initialize the 3 ApexCharts
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ApexCharts) return;

    let chart4Instance = null;
    let areaInstance = null;
    let mixed1Instance = null;

    // Chart 1: Patterned Donut Chart (#chart4)
    const chart4El = document.querySelector('#chart4');
    if (chart4El) {
      chart4El.innerHTML = '';
      const chart4Options = {
        series: [44, 55, 41, 17, 15],
        chart: {
          fontFamily: 'Rubik, serif',
          height: 380,
          type: 'donut',
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
              }
            }
          }
        },
        labels: ['Comedy', 'Action', 'SciFi', 'Drama', 'Horror'],
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },
        fill: {
          type: 'pattern',
          opacity: 1,
          pattern: {
            enabled: true,
            style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines']
          }
        },
        states: {
          hover: {
            filter: 'none'
          }
        },
        theme: {
          palette: 'palette2'
        },
        title: {
          text: 'Favourite Movie Type'
        },
        legend: {
          position: 'bottom'
        },
        responsive: [
          {
            breakpoint: 1366,
            options: {
              chart: {
                height: 250
              },
              legend: {
                show: false
              }
            }
          }
        ],
        colors: ['#106068', '#606060', '#0bb462', '#db4d58', '#f2bc23']
      };
      chart4Instance = new window.ApexCharts(chart4El, chart4Options);
      chart4Instance.render();
    }

    // Chart 2: Basic Area Chart (#area-basic-chart)
    const areaEl = document.querySelector('#area-basic-chart');
    if (areaEl) {
      areaEl.innerHTML = '';
      const areaChartOptions = {
        series: [
          {
            name: 'Desktops',
            data: [10, 51, 35, 51, 59, 62, 79, 91, 148]
          }
        ],
        chart: {
          fontFamily: 'Rubik, serif',
          height: 350,
          type: 'area',
          zoom: {
            enabled: false
          }
        },
        colors: ['#0F626A'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0F626A',
                opacity: 1
              },
              {
                offset: 50,
                color: '#0F626A',
                opacity: 0.8
              },
              {
                offset: 100,
                color: '#0F626A',
                opacity: 0.1
              }
            ]
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            style: {
              colors: [],
              fontSize: '14px',
              fontWeight: 500
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: [],
              fontSize: '14px',
              fontWeight: 500
            }
          }
        },
        grid: {
          show: true,
          borderColor: 'rgba(40, 35, 45, 0.2)',
          strokeDashArray: 2,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        tooltip: {
          x: {
            show: false
          },
          style: {
            fontSize: '16px'
          }
        }
      };
      areaInstance = new window.ApexCharts(areaEl, areaChartOptions);
      areaInstance.render();
    }

    // Chart 3: Line & Column Chart (#mixed1)
    const mixed1El = document.querySelector('#mixed1');
    if (mixed1El) {
      mixed1El.innerHTML = '';
      const mixed1ChartOptions = {
        series: [
          {
            name: 'Website Blog',
            type: 'column',
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
          },
          {
            name: 'Social Media',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
          }
        ],
        chart: {
          fontFamily: 'Rubik, serif',
          height: 350,
          type: 'line'
        },
        colors: ['#0F626A', '#626263'],
        stroke: {
          width: [0, 4]
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels: [
          '01 Jan 2001',
          '02 Jan 2001',
          '03 Jan 2001',
          '04 Jan 2001',
          '05 Jan 2001',
          '06 Jan 2001',
          '07 Jan 2001',
          '08 Jan 2001',
          '09 Jan 2001',
          '10 Jan 2001',
          '11 Jan 2001',
          '12 Jan 2001'
        ],
        yaxis: [
          {
            labels: {
              style: {
                fontSize: '14px',
                fontWeight: 500
              }
            }
          },
          {
            opposite: true
          }
        ],
        xaxis: {
          labels: {
            style: {
              fontSize: '14px',
              fontWeight: 500
            }
          }
        },
        grid: {
          show: true,
          borderColor: 'rgba(40, 35, 45, 0.2)',
          strokeDashArray: 2
        },
        tooltip: {
          x: {
            show: false
          },
          style: {
            fontSize: '16px'
          }
        }
      };
      mixed1Instance = new window.ApexCharts(mixed1El, mixed1ChartOptions);
      mixed1Instance.render();
    }

    return () => {
      if (chart4Instance) chart4Instance.destroy();
      if (areaInstance) areaInstance.destroy();
      if (mixed1Instance) mixed1Instance.destroy();
    };
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          {/* Cards Grid */}
          <div className="row g-4 align-items-center">
            {/* Card 1: ছাত্র/ছাত্রী যুক্ত */}
            <div className="col-lg-4 col-md-6">
              <div className="premium-card gradient-card-1">
                <div className="card-glow-effect glow-blue"></div>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="icon-container-premium">
                      <div className="icon-bg icon-bg-blue">
                        <i className="fas fa-user-plus" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                      </div>
                      <div className="icon-ring ring-blue"></div>
                    </div>
                    <div className="card-content-premium flex-grow-1">
                      <h5 className="premium-title">ছাত্র/ছাত্রী যুক্ত</h5>
                      <p className="premium-subtitle">নতুন শিক্ষার্থী নিবন্ধন</p>
                      <div className="student-count-badge mt-2">
                        <span className="count-number">{formattedStudentCount}</span>
                        <span className="count-label">মোট শিক্ষার্থী</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      {/* Single arrow icon */}
                      <a
                        href="#student-create"
                        onClick={(e) => { e.preventDefault(); setActiveTab('student-create'); }}
                        className="text-decoration-none"
                      >
                        <div className="arrow-circle">
                          <i className="fas fa-plus"></i>
                        </div>
                      </a>

                      {/* List icon */}
                      <a
                        href="#student-list"
                        onClick={(e) => { e.preventDefault(); setActiveTab('student-list'); }}
                        className="text-decoration-none"
                      >
                        <div className="arrow-circle">
                          <i className="fas fa-list"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-pattern-overlay"></div>
              </div>
            </div>

            {/* Card 2: নতুন জমা যুক্ত */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#cash-add-deposit"
                onClick={(e) => { e.preventDefault(); setActiveTab('voucher-deposit'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-2">
                  <div className="card-glow-effect glow-green"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-green">
                          <i className="fas fa-plus-circle" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-green"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">নতুন জমা যুক্ত</h5>
                        <p className="premium-subtitle">অর্থ জমা করুন</p>
                        <div className="deposit-summary ">
                          <div className="summary-row">
                            <span className="summary-label">আজ:</span>
                            <span className="summary-amount">৳ {formattedTodayDeposit}</span>
                          </div>
                          <div className="summary-row">
                            <span className="summary-label">মাসিক:</span>
                            <span className="summary-amount">৳ {formattedMonthDeposit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 3: নতুন খরচ যুক্ত */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#cash-add-expense"
                onClick={(e) => { e.preventDefault(); setActiveTab('voucher-expense'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-3">
                  <div className="card-glow-effect glow-cyan"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-cyan">
                          <i className="fas fa-minus-circle" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-cyan"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">নতুন খরচ যুক্ত</h5>
                        <p className="premium-subtitle">ব্যয় রেকর্ড করুন</p>
                        <div className="expense-summary">
                          <div className="summary-row">
                            <span className="summary-label">আজ:</span>
                            <span className="summary-amount expense-amount">৳ {formattedTodayExpense}</span>
                          </div>
                          <div className="summary-row">
                            <span className="summary-label">মাসিক:</span>
                            <span className="summary-amount expense-amount">৳ {formattedMonthExpense}</span>
                          </div>
                        </div>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 4: এস এম এস */}
            <div className="col-lg-4 col-md-6">
              <a
                href="/admin/sms/send-to-client"
                onClick={(e) => { e.preventDefault(); setActiveTab('sms-student'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-4">
                  <div className="card-glow-effect glow-orange"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-orange">
                          <i className="fas fa-sms" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-orange"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">এস এম এস</h5>
                        <p className="premium-subtitle">বার্তা পাঠান</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 5: একাউন্ট যুক্ত */}
            <div className="col-lg-4 col-md-6">
              <a
                href="/admin/account/create"
                onClick={(e) => { e.preventDefault(); setActiveTab('account-create'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-5">
                  <div className="card-glow-effect glow-yellow"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-yellow">
                          <i className="fas fa-university" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-yellow"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">একাউন্ট যুক্ত</h5>
                        <p className="premium-subtitle">নতুন হিসাব খুলুন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 6: একাউন্ট বিবরণ */}
            <div className="col-lg-4 col-md-6">
              <a
                href="/admin/account/account/report"
                onClick={(e) => { e.preventDefault(); setActiveTab('account-report'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-6">
                  <div className="card-glow-effect glow-pink"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-pink">
                          <i className="fas fa-file-invoice" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-pink"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">অ্যাকাউন্ট বিবরণ</h5>
                        <p className="premium-subtitle">হিসাব দেখুন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 7: হাজিরা */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#attendance"
                onClick={(e) => { e.preventDefault(); setActiveTab('attendance-daily'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-7">
                  <div className="card-glow-effect glow-lime"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-lime">
                          <i className="fas fa-check-circle" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-lime"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">হাজিরা</h5>
                        <p className="premium-subtitle">উপস্থিতি নিন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 8: আইডি কার্ড */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#id-card"
                onClick={(e) => { e.preventDefault(); setActiveTab('idcard-student'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-9">
                  <div className="card-glow-effect glow-indigo"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-indigo">
                          <i className="fas fa-id-card" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-indigo"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">আইডি কার্ড</h5>
                        <p className="premium-subtitle">পরিচয়পত্র তৈরি করুন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 9: শিক্ষক তৈরি */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#teacher-create"
                onClick={(e) => { e.preventDefault(); setActiveTab('teacher-list'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-6">
                  <div className="card-glow-effect glow-pink"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-pink">
                          <i className="fas fa-chalkboard-teacher" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-pink"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">শিক্ষক তৈরি</h5>
                        <p className="premium-subtitle">নতুন শিক্ষক যোগ করুন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 10: যাকাত গ্রহণ */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#zakatdonation-create"
                onClick={(e) => { e.preventDefault(); setActiveTab('donation-zakat'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-4">
                  <div className="card-glow-effect glow-purple"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-purple">
                          <i className="fas fa-hand-holding-usd" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-purple"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">যাকাত গ্রহণ</h5>
                        <p className="premium-subtitle">যাকাত জমা করুন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>

            {/* Card 11: মাসিক চাঁদা গ্রহণ */}
            <div className="col-lg-4 col-md-6">
              <a
                href="#monthly-subscription-add"
                onClick={(e) => { e.preventDefault(); setActiveTab('donation-general'); }}
                className="text-decoration-none"
              >
                <div className="premium-card gradient-card-3">
                  <div className="card-glow-effect glow-teal"></div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="icon-container-premium">
                        <div className="icon-bg icon-bg-teal">
                          <i className="fas fa-wallet" style={{ fontSize: '30px', color: '#ffffff' }}></i>
                        </div>
                        <div className="icon-ring ring-teal"></div>
                      </div>
                      <div className="card-content-premium flex-grow-1">
                        <h5 className="premium-title">মাসিক চাঁদা গ্রহণ</h5>
                        <p className="premium-subtitle">মাসিক চাঁদা জমা করুন</p>
                      </div>
                      <div className="arrow-circle">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-pattern-overlay"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Apex Charts Section */}
      <div className="row pt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5> Patterned Donut Chart</h5>
            </div>
            <div className="card-body">
              <div id="chart4"></div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Basic Area Chart</h5>
            </div>
            <div className="card-body">
              <div id="area-basic-chart"></div>
            </div>
          </div>
        </div>

        {/* Line & Column Chart */}
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5> Line & Column Chart</h5>
            </div>
            <div className="card-body">
              <div id="mixed1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tap on Top */}
      <div
        className="go-top"
        role="button"
        tabIndex={0}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="progress-value">
          <i className="ti ti-chevron-up"></i>
        </span>
      </div>

      {/* Exact 1:1 CSS styles from original madrasha.hostzonebd.com dashboard */}
      <style>{`
        /* ===== Dashboard Header Premium ===== */
        .dashboard-header-premium {
            padding: 30px 0;
            animation: headerFadeIn 0.8s ease;
        }

        @keyframes headerFadeIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .welcome-badge-animated {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 10px 24px;
            border-radius: 50px;
            margin-bottom: 20px;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            animation: badgeBounce 2s infinite;
        }

        @keyframes badgeBounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }

        .welcome-badge-animated i {
            color: #ffd700;
            font-size: 18px;
            animation: crownRotate 3s linear infinite;
        }

        @keyframes crownRotate {
            0%, 100% {
                transform: rotate(-10deg);
            }
            50% {
                transform: rotate(10deg);
            }
        }

        .welcome-badge-animated span {
            color: white;
            font-weight: 700;
            font-size: 15px;
        }

        .dashboard-title-gradient {
            font-size: 48px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
            animation: gradientFlow 3s ease infinite;
            background-size: 200% 200%;
        }

        @keyframes gradientFlow {
            0%, 100% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
        }

        .dashboard-subtitle-premium {
            font-size: 17px;
            color: #6b7280;
            font-weight: 500;
            margin: 0;
        }

        /* ===== Premium Card Styles ===== */
        .premium-card {
            background: white;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 2px solid transparent;
            height: 100%;
        }

        .premium-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: var(--gradient-color);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
        }

        .premium-card:hover::before {
            transform: scaleX(1);
        }

        .premium-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border-color: var(--border-color);
        }

        .premium-card .card-body {
            padding: 32px 26px;
            position: relative;
            z-index: 3;
        }

        /* Card Glow Effect */
        .card-glow-effect {
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
            filter: blur(50px);
        }

        .premium-card:hover .card-glow-effect {
            opacity: 0.15;
        }

        .glow-blue {
            background: radial-gradient(circle, #667eea 0%, transparent 70%);
        }

        .glow-green {
            background: radial-gradient(circle, #11998e 0%, transparent 70%);
        }

        .glow-cyan {
            background: radial-gradient(circle, #0093E9 0%, transparent 70%);
        }

        .glow-orange {
            background: radial-gradient(circle, #f093fb 0%, transparent 70%);
        }

        .glow-yellow {
            background: radial-gradient(circle, #FDC830 0%, transparent 70%);
        }

        .glow-pink {
            background: radial-gradient(circle, #fa709a 0%, transparent 70%);
        }

        .glow-lime {
            background: radial-gradient(circle, #4facfe 0%, transparent 70%);
        }

        .glow-purple {
            background: radial-gradient(circle, #a8edea 0%, transparent 70%);
        }

        .glow-indigo {
            background: radial-gradient(circle, #5f72bd 0%, transparent 70%);
        }

        .glow-teal {
            background: radial-gradient(circle, #80D0C7 0%, transparent 70%);
        }

        /* Icon Container with Pulse Animation */
        .icon-container-premium {
            position: relative;
            margin-right: 20px;
        }

        .icon-bg {
            width: 85px;
            height: 85px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--gradient-color);
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
            position: relative;
            z-index: 2;
        }

        .premium-card:hover .icon-bg {
            transform: rotate(360deg) scale(1.12);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .icon-bg i {
            font-size: 40px;
            color: white;
            filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
        }

        /* Pulse Ring Animation */
        .icon-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 85px;
            height: 85px;
            border-radius: 20px;
            border: 3px solid;
            border-color: var(--ring-color);
            opacity: 0;
            animation: ringPulse 2s infinite;
        }

        @keyframes ringPulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.7;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.6);
                opacity: 0;
            }
        }

        /* Card Content */
        .card-content-premium {
            margin-right: 15px;
        }

        .premium-title {
            font-size: 21px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 5px 0;
            transition: all 0.3s ease;
        }

        .premium-card:hover .premium-title {
            color: var(--title-color);
            transform: translateX(5px);
        }

        .premium-subtitle {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
            font-weight: 500;
        }

        /* Arrow Circle */
        .arrow-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .arrow-circle i {
            color: var(--arrow-color);
            font-size: 16px;
            transition: transform 0.3s ease;
        }

        .premium-card:hover .arrow-circle {
            background: var(--gradient-color);
            transform: translateX(8px) scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .premium-card:hover .arrow-circle i {
            color: white;
            transform: translateX(3px);
        }

        /* Pattern Overlay */
        .card-pattern-overlay {
            position: absolute;
            top: 0;
            right: 0;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
            background-size: 15px 15px;
            opacity: 0;
            transition: opacity 0.5s ease;
            pointer-events: none;
            z-index: 1;
        }

        .premium-card:hover .card-pattern-overlay {
            opacity: 1;
        }

        /* Card Color Schemes */
        .gradient-card-1 {
            --gradient-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --border-color: rgba(102, 126, 234, 0.3);
            --title-color: #667eea;
            --arrow-color: #667eea;
            --ring-color: #667eea;
        }

        .gradient-card-2 {
            --gradient-color: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            --border-color: rgba(17, 153, 142, 0.3);
            --title-color: #11998e;
            --arrow-color: #11998e;
            --ring-color: #11998e;
        }

        .gradient-card-3 {
            --gradient-color: linear-gradient(135deg, #0093E9 0%, #80D0C7 100%);
            --border-color: rgba(0, 147, 233, 0.3);
            --title-color: #0093E9;
            --arrow-color: #0093E9;
            --ring-color: #0093E9;
        }

        .gradient-card-4 {
            --gradient-color: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --border-color: rgba(240, 147, 251, 0.3);
            --title-color: #f093fb;
            --arrow-color: #f093fb;
            --ring-color: #f093fb;
        }

        .gradient-card-5 {
            --gradient-color: linear-gradient(135deg, #FDC830 0%, #F37335 100%);
            --border-color: rgba(253, 200, 48, 0.3);
            --title-color: #FDC830;
            --arrow-color: #FDC830;
            --ring-color: #FDC830;
        }

        .gradient-card-6 {
            --gradient-color: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            --border-color: rgba(250, 112, 154, 0.3);
            --title-color: #fa709a;
            --arrow-color: #fa709a;
            --ring-color: #fa709a;
        }

        .gradient-card-7 {
            --gradient-color: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --border-color: rgba(79, 172, 254, 0.3);
            --title-color: #4facfe;
            --arrow-color: #4facfe;
            --ring-color: #4facfe;
        }

        .gradient-card-8 {
            --gradient-color: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            --border-color: rgba(168, 237, 234, 0.3);
            --title-color: #a8edea;
            --arrow-color: #a8edea;
            --ring-color: #a8edea;
        }

        .gradient-card-9 {
            --gradient-color: linear-gradient(135deg, #5f72bd 0%, #9b23ea 100%);
            --border-color: rgba(95, 114, 189, 0.3);
            --title-color: #5f72bd;
            --arrow-color: #5f72bd;
            --ring-color: #5f72bd;
        }

        /* Link Styling */
        a.text-decoration-none {
            display: block;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
            .dashboard-title-gradient {
                font-size: 38px;
            }
            .icon-bg {
                width: 75px;
                height: 75px;
            }
            .icon-ring {
                width: 75px;
                height: 75px;
            }
            .icon-bg i {
                font-size: 36px;
            }
            .premium-title {
                font-size: 19px;
            }
        }

        @media (max-width: 767px) {
            .dashboard-title-gradient {
                font-size: 32px;
            }
            .dashboard-subtitle-premium {
                font-size: 15px;
            }
            .premium-card .card-body {
                padding: 26px 20px;
            }
            .icon-bg {
                width: 70px;
                height: 70px;
                margin-right: 16px;
            }
            .icon-ring {
                width: 70px;
                height: 70px;
            }
            .icon-bg i {
                font-size: 34px;
            }
            .premium-title {
                font-size: 18px;
            }
            .premium-subtitle {
                font-size: 13px;
            }
            .arrow-circle {
                width: 36px;
                height: 36px;
            }
            .arrow-circle i {
                font-size: 14px;
            }
        }

        @media (max-width: 575px) {
            .dashboard-header-premium {
                padding: 20px 0;
            }
            .dashboard-title-gradient {
                font-size: 28px;
            }
            .welcome-badge-animated {
                padding: 8px 18px;
            }
            .premium-card .card-body {
                padding: 22px 18px;
            }
            .icon-bg {
                width: 65px;
                height: 65px;
            }
            .icon-ring {
                width: 65px;
                height: 65px;
            }
            .icon-bg i {
                font-size: 32px;
            }
            .premium-title {
                font-size: 17px;
            }
            .arrow-circle {
                width: 34px;
                height: 34px;
            }
        }

        /* total student start */
        .student-count-badge {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-top: 12px;
        }

        .count-number {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
        }

        .count-label {
            font-size: 13px;
            color: #6b7280;
            font-weight: 600;
        }

        .premium-card:hover .count-number {
            animation: countPulse 0.6s ease;
        }

        @keyframes countPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }

        /* deposit */
        .deposit-summary,
        .expense-summary {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 12px;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 12px;
            background: linear-gradient(135deg, rgba(17, 153, 142, 0.08) 0%, rgba(56, 239, 125, 0.08) 100%);
            border-radius: 8px;
            border-left: 3px solid #11998e;
            transition: all 0.3s ease;
        }

        .premium-card:hover .summary-row {
            background: linear-gradient(135deg, rgba(17, 153, 142, 0.15) 0%, rgba(56, 239, 125, 0.15) 100%);
            transform: translateX(3px);
        }

        .summary-label {
            font-size: 12px;
            color: #313d55;
            font-weight: 600;
        }

        .summary-amount {
            font-size: 15px;
            font-weight: 800;
            background: linear-gradient(135deg, #8e4ede 0%, #38ef7d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .premium-card:hover .summary-amount {
            animation: amountShine 0.6s ease;
        }

        @keyframes amountShine {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.08);
            }
        }

        /* tap on top */
        .go-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 999;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #0F626A;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }

        .go-top:hover {
            transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};
