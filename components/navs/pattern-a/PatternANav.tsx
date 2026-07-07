'use client';

import { useState } from 'react';

interface PatternANavProps {
  children?: React.ReactNode;
}

export default function PatternANav({ children }: PatternANavProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Logo Container */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex gap-2 items-center">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
              PM
            </div>
            <div className="flex flex-col leading-tight">
              <p className="text-sm font-semibold text-slate-900">Property</p>
              <p className="text-xs text-slate-600">Manager</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Property Selector */}
        <div className="px-3 py-4 border-b border-slate-200">
          <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 hover:bg-slate-100 cursor-pointer transition-colors">
            <div className="flex items-start gap-2">
              <div className="mt-1">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">
                  Property 1
                </p>
                <p className="text-xs text-slate-600 truncate">City, State</p>
              </div>
              <svg
                className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.5 5.5L8 9l-3.5-3.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  <path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                  <path d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Dashboard
              </a>
            </li>

            {/* Search */}
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
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
                Search
              </a>
            </li>

            {/* Property Tools - Expandable */}
            <li>
              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" />
                  </svg>
                  Property Tools
                </div>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Submenu - Basic Information highlighted */}
              <ul className="space-y-1 mt-1 pl-4 border-l-2 border-slate-200">
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg transition-colors font-medium text-sm border-l-2 border-blue-600 -ml-4"
                  >
                    <span className="inline-block w-1 h-1 bg-blue-600 rounded-full mr-3"></span>
                    Basic Information
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm"
                  >
                    <span className="inline-block w-1 h-1 bg-transparent rounded-full mr-3"></span>
                    Property Reports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm"
                  >
                    <span className="inline-block w-1 h-1 bg-transparent rounded-full mr-3"></span>
                    Materials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm"
                  >
                    <span className="inline-block w-1 h-1 bg-transparent rounded-full mr-3"></span>
                    Employee Vehicles
                  </a>
                </li>
              </ul>
            </li>

            {/* Financials - Expandable */}
            <li>
              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm mt-2"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Financials
                </div>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            {/* Enforcement - Expandable */}
            <li>
              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Enforcement
                </div>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-slate-400 transform rotate-180"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
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
