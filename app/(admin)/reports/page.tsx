'use client'

import { useEffect, useState } from 'react'

export default function ReportsPage() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly')

  return (
    <div className="flex-1 p-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
          <div className="flex flex-col gap-2">
            <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">
              Dashboard Reports
            </p>
            <p className="text-muted-light dark:text-muted-dark text-base font-normal leading-normal">
              Analyze and visualize key platform performance metrics.
            </p>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2">
            <span className="material-symbols-outlined text-base">download</span>
            <span className="truncate">Export to CSV</span>
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Report Card */}
          <div className="col-span-1 lg:col-span-2 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Lead Report
            </h2>
            <div className="flex justify-end mb-4">
              <div className="flex h-10 w-full sm:w-auto items-center justify-center rounded-lg bg-background-light dark:bg-background-dark p-1">
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-card-light dark:has-[:checked]:bg-card-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-muted-light dark:text-muted-dark text-sm font-medium leading-normal">
                  <span className="truncate">Daily</span>
                  <input
                    className="invisible w-0"
                    name="lead-period"
                    type="radio"
                    value="Daily"
                    checked={period === 'daily'}
                    onChange={() => setPeriod('daily')}
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-card-light dark:has-[:checked]:bg-card-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-muted-light dark:text-muted-dark text-sm font-medium leading-normal">
                  <span className="truncate">Weekly</span>
                  <input
                    className="invisible w-0"
                    name="lead-period"
                    type="radio"
                    value="Weekly"
                    checked={period === 'weekly'}
                    onChange={() => setPeriod('weekly')}
                  />
                </label>
                <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-card-light dark:has-[:checked]:bg-card-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-muted-light dark:text-muted-dark text-sm font-medium leading-normal">
                  <span className="truncate">Monthly</span>
                  <input
                    className="invisible w-0"
                    name="lead-period"
                    type="radio"
                    value="Monthly"
                    checked={period === 'monthly'}
                    onChange={() => setPeriod('monthly')}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2">
                <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                  Lead Generation Trends
                </p>
                <p className="text-text-light dark:text-text-dark tracking-light text-4xl font-bold leading-tight truncate">
                  1,204
                </p>
                <div className="flex gap-1">
                  <p className="text-muted-light dark:text-muted-dark text-sm font-normal leading-normal">Last 30 days</p>
                  <p className="text-[#078832] text-sm font-medium leading-normal">+5.2%</p>
                </div>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 pt-4">
                  <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 475 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 109C18.2692 109 18.2692 21 36.5385 21C54.8077 21 54.8077 41 73.0769 41C91.3462 41 91.3462 93 109.615 93C127.885 93 127.885 33 146.154 33C164.423 33 164.423 101 182.692 101C200.962 101 200.962 61 219.231 61C237.5 61 237.5 45 255.769 45C274.038 45 274.038 121 292.308 121C310.577 121 310.577 149 328.846 149C347.115 149 347.115 1 365.385 1C383.654 1 383.654 81 401.923 81C420.192 81 420.192 129 438.462 129C456.731 129 456.731 25 475 25V149H0V109Z"
                      fill="url(#paint0_linear_chart)"
                    />
                    <path
                      d="M0 109C18.2692 109 18.2692 21 36.5385 21C54.8077 21 54.8077 41 73.0769 41C91.3462 41 91.3462 93 109.615 93C127.885 93 127.885 33 146.154 33C164.423 33 164.423 101 182.692 101C200.962 101 200.962 61 219.231 61C237.5 61 237.5 45 255.769 45C274.038 45 274.038 121 292.308 121C310.577 121 310.577 149 328.846 149C347.115 149 347.115 1 365.385 1C383.654 1 383.654 81 401.923 81C420.192 81 420.192 129 438.462 129C456.731 129 456.731 25 475 25"
                      stroke="#4A90E2"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="237.5" x2="237.5" y1="1" y2="149">
                        <stop stopColor="#4A90E2" stopOpacity="0.2" />
                        <stop offset="1" stopColor="#4A90E2" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex min-w-72 flex-1 flex-col gap-2">
                <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Conversion Rate</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-4xl font-bold leading-tight truncate">
                  15.8%
                </p>
                <div className="flex gap-1">
                  <p className="text-muted-light dark:text-muted-dark text-sm font-normal leading-normal">Last 30 days</p>
                  <p className="text-[#e73108] text-sm font-medium leading-normal">-1.1%</p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3 pt-12">
                  <div className="bg-primary/20 w-full" style={{ height: '30%' }}></div>
                  <p className="text-muted-light dark:text-muted-dark text-xs font-bold leading-normal tracking-wide">W1</p>
                  <div className="bg-primary/20 w-full" style={{ height: '40%' }}></div>
                  <p className="text-muted-light dark:text-muted-dark text-xs font-bold leading-normal tracking-wide">W2</p>
                  <div className="bg-primary/20 w-full" style={{ height: '40%' }}></div>
                  <p className="text-muted-light dark:text-muted-dark text-xs font-bold leading-normal tracking-wide">W3</p>
                  <div className="bg-primary w-full" style={{ height: '80%' }}></div>
                  <p className="text-primary text-xs font-bold leading-normal tracking-wide">W4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Report Card */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Instructor Report
            </h2>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <p className="text-muted-light dark:text-muted-dark text-sm font-medium">New Instructors</p>
                <p className="text-text-light dark:text-text-dark text-3xl font-bold">24</p>
              </div>
              <div className="flex-1">
                <p className="text-muted-light dark:text-muted-dark text-sm font-medium">Total Active Instructors</p>
                <p className="text-text-light dark:text-text-dark text-3xl font-bold">152</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="py-2 px-3 text-muted-light dark:text-muted-dark font-semibold">Name</th>
                    <th className="py-2 px-3 text-muted-light dark:text-muted-dark font-semibold">Registration Date</th>
                    <th className="py-2 px-3 text-muted-light dark:text-muted-dark font-semibold">Avg. Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <td className="py-3 px-3 font-medium text-text-light dark:text-text-dark">Alex Johnson</td>
                    <td className="py-3 px-3 text-muted-light dark:text-muted-dark">2023-10-15</td>
                    <td className="py-3 px-3 text-text-light dark:text-text-dark font-semibold">4.9/5.0</td>
                  </tr>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <td className="py-3 px-3 font-medium text-text-light dark:text-text-dark">Maria Garcia</td>
                    <td className="py-3 px-3 text-muted-light dark:text-muted-dark">2023-09-22</td>
                    <td className="py-3 px-3 text-text-light dark:text-text-dark font-semibold">4.8/5.0</td>
                  </tr>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <td className="py-3 px-3 font-medium text-text-light dark:text-text-dark">David Smith</td>
                    <td className="py-3 px-3 text-muted-light dark:text-muted-dark">2023-08-01</td>
                    <td className="py-3 px-3 text-text-light dark:text-text-dark font-semibold">4.7/5.0</td>
                  </tr>
                  <tr className="border-b border-border-light dark:border-border-dark">
                    <td className="py-3 px-3 font-medium text-text-light dark:text-text-dark">Emily White</td>
                    <td className="py-3 px-3 text-muted-light dark:text-muted-dark">2023-07-19</td>
                    <td className="py-3 px-3 text-text-light dark:text-text-dark font-semibold">4.9/5.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Program Report Card */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Program Report
            </h2>
            <div className="mb-6">
              <p className="text-muted-light dark:text-muted-dark text-sm font-medium">Total Published Programs</p>
              <p className="text-text-light dark:text-text-dark text-3xl font-bold">89</p>
            </div>
            <h3 className="text-text-light dark:text-text-dark text-base font-bold mb-3">Top 5 Most Viewed Programs</h3>
            <ul className="space-y-3">
              {[
                { name: 'Advanced Leadership Skills', views: '12,403 views' },
                { name: 'Digital Marketing Mastery', views: '9,876 views' },
                { name: 'Data-Driven Decision Making', views: '8,102 views' },
                { name: 'Effective Communication', views: '7,543 views' },
                { name: 'Project Management Essentials', views: '6,991 views' },
              ].map((program, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark">
                  <p className="font-medium text-text-light dark:text-text-dark">
                    {idx + 1}. {program.name}
                  </p>
                  <span className={`text-sm font-bold ${idx === 0 ? 'text-primary' : 'text-muted-light dark:text-muted-dark'}`}>
                    {program.views}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Message Report Card */}
          <div className="col-span-1 lg:col-span-2 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6">
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
              Message Report
            </h2>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#36c5f0]"></div>
                <span className="text-sm text-muted-light dark:text-muted-dark">Avg. Open Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2eb67d]"></div>
                <span className="text-sm text-muted-light dark:text-muted-dark">Avg. CTR</span>
              </div>
            </div>
            <div className="w-full h-80">
              <div className="h-full grid grid-cols-3 gap-6 items-end">
                {[
                  { label: 'New Lead Onboarding', open: 65, ctr: 25 },
                  { label: 'Post-Workshop Follow-up', open: 50, ctr: 15 },
                  { label: 'Monthly Newsletter', open: 75, ctr: 35 },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 items-center">
                    <div className="w-full flex justify-center items-end gap-2 h-full">
                      <div className="w-1/3 bg-[#36c5f0] rounded-t-sm" style={{ height: `${item.open}%` }}></div>
                      <div className="w-1/3 bg-[#2eb67d] rounded-t-sm" style={{ height: `${item.ctr}%` }}></div>
                    </div>
                    <p className="text-sm font-medium text-muted-light dark:text-muted-dark text-center">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

