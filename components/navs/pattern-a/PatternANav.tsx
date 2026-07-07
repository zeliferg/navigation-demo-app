'use client';

import { useState } from 'react';

interface PatternANavProps {
  children?: React.ReactNode;
}

export default function PatternANav({ children }: PatternANavProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    propertyTools: true,
    financials: true,
    enforcement: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-[296px]' : 'w-[56px]'
        } bg-white border-r border-[#E9ECEE] shadow-[0px_0px_10px_rgba(94,98,120,0.04)] transition-all duration-300 overflow-hidden flex flex-col py-[14px]`}
      >
        {/* EXPANDED STATE */}
        {sidebarOpen && (
          <>
            {/* Logo Container */}
            <div className="flex items-center justify-between px-[24px] py-[16px]">
              <div className="flex gap-[9px] items-center">
                {/* Logo Mark - 62x37 neutral placeholder */}
                <div className="w-[62px] h-[37px] bg-gradient-to-r from-blue-500 to-blue-400 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[14px]">P</span>
                </div>
                {/* Divider */}
                <div className="w-px h-[37px] bg-[#E9ECEE]"></div>
                {/* Text */}
                <div
                  className="leading-[0.95] text-[#45A3FF] font-normal"
                  style={{
                    fontFamily: 'Mulish, system-ui, sans-serif',
                    fontSize: '22px',
                  }}
                >
                  <p className="mb-0">Property</p>
                  <p>Dashboard</p>
                </div>
              </div>
              {/* Compress Icon */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                  <polyline points="9 18 3 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Property Selector */}
            <div className="px-[24px] py-[24px]">
              <div
                className="w-[270px] h-[62px] bg-[#FCFCFC] border border-[#C7CFCE] rounded-[8px] px-[11px] flex items-center gap-[16px] cursor-pointer hover:bg-[#FAFBFC] transition-colors"
              >
                {/* Icon - 19x25 placeholder */}
                <div className="flex-shrink-0 w-[19px] h-[25px] bg-slate-200 rounded"></div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="truncate text-[#434F59] mb-0"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    Property 1
                  </p>
                  <p
                    className="truncate text-[#5D6A71]"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    City, State
                  </p>
                </div>
                {/* Sort Icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#434F59"
                  className="flex-shrink-0"
                >
                  <path d="M8 1L1 8h14z" />
                </svg>
              </div>
            </div>

            {/* Menu Items - Expanded */}
            <nav className="flex-1 overflow-y-auto px-0">
              <ul className="space-y-[16px]">
                {/* Dashboard */}
                <li className="px-[24px]">
                  <a
                    href="#"
                    className="flex items-center gap-[16px] py-[12px] text-[#434F59] hover:text-[#2a3440] transition-colors"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                    Dashboard
                  </a>
                </li>

                {/* Search */}
                <li className="px-[24px]">
                  <a
                    href="#"
                    className="flex items-center gap-[16px] py-[12px] text-[#434F59] hover:text-[#2a3440] transition-colors"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Search
                  </a>
                </li>

                {/* Property Tools */}
                <li>
                  <button
                    onClick={() => toggleSection('propertyTools')}
                    className="w-full flex items-center justify-between px-[24px] py-[12px] text-[#434F59] hover:text-[#2a3440] transition-colors"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    <div className="flex items-center gap-[16px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.86l3.93-4.54z" />
                      </svg>
                      Property Tools
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`transition-transform ${
                        expandedSections.propertyTools ? '' : 'rotate-180'
                      }`}
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                  {expandedSections.propertyTools && (
                    <ul className="space-y-[8px] mt-[8px] pl-[24px]">
                      {[
                        'Basic Information',
                        'Property Reports',
                        'Materials',
                        'Employee Vehicles',
                        'Orders',
                      ].map((item) => (
                        <li key={item} className="px-[24px] py-[12px]">
                          <a
                            href="#"
                            className="text-[#434F59] hover:text-[#2a3440] transition-colors block"
                            style={{
                              fontFamily: 'Mulish, system-ui, sans-serif',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Financials */}
                <li>
                  <button
                    onClick={() => toggleSection('financials')}
                    className="w-full flex items-center justify-between px-[24px] py-[12px] text-[#434F59] hover:text-[#2a3440] transition-colors"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    <div className="flex items-center gap-[16px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                      Financials
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`transition-transform ${
                        expandedSections.financials ? '' : 'rotate-180'
                      }`}
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                  {expandedSections.financials && (
                    <ul className="space-y-0 mt-0">
                      {[
                        'Month End Statements',
                        'Revenue and Deduction',
                        'Revenue Calculator',
                      ].map((item) => (
                        <li
                          key={item}
                          className={`px-[24px] py-[12px] ${
                            item === 'Month End Statements'
                              ? 'bg-[#F7FAFE] border-l-[5px] border-[#1A7BD9]'
                              : ''
                          }`}
                        >
                          <a
                            href="#"
                            className={`block transition-colors ${
                              item === 'Month End Statements'
                                ? 'text-[#004C95]'
                                : 'text-[#434F59] hover:text-[#2a3440]'
                            }`}
                            style={{
                              fontFamily: 'Mulish, system-ui, sans-serif',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Enforcement */}
                <li>
                  <button
                    onClick={() => toggleSection('enforcement')}
                    className="w-full flex items-center justify-between px-[24px] py-[12px] text-[#434F59] hover:text-[#2a3440] transition-colors"
                    style={{
                      fontFamily: 'Mulish, system-ui, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    <div className="flex items-center gap-[16px]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                      </svg>
                      Enforcement
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`transition-transform ${
                        expandedSections.enforcement ? 'rotate-180' : ''
                      }`}
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}

        {/* COLLAPSED STATE */}
        {!sidebarOpen && (
          <div className="flex flex-col gap-[56px] items-center flex-1">
            {/* Expand Icon */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
                <polyline points="15 18 21 12 15 6"></polyline>
              </svg>
            </button>

            {/* Menu Icons */}
            <nav className="flex flex-col gap-[16px]">
              {[
                { icon: 'grid', label: 'Dashboard' },
                {
                  icon: 'search',
                  label: 'Search',
                  active: true,
                },
                { icon: 'doc', label: 'Property Tools' },
                { icon: 'money', label: 'Financials' },
                { icon: 'car', label: 'Enforcement' },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center justify-center w-[56px] h-[48px] transition-colors ${
                    item.active
                      ? 'bg-[#F7FAFE] border-l-[5px] border-[#1A7BD9]'
                      : 'hover:bg-slate-100'
                  }`}
                  title={item.label}
                >
                  {item.icon === 'grid' && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                  )}
                  {item.icon === 'search' && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  )}
                  {item.icon === 'doc' && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  )}
                  {item.icon === 'money' && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                  )}
                  {item.icon === 'car' && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
                    </svg>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-6 gap-6 shadow-sm">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative max-w-md">
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by property name, location, or ID"
                className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Top Right Icons */}
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              U
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
