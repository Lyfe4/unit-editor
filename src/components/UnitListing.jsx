import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight, BookOpen, Users, Check, Layout, Calendar } from 'lucide-react';

const UnitListing = ({ onUnitSelect }) => {
  // Sample data
  const [units, setUnits] = useState([
    { id: 1, code: 'US', name: 'Unit Sandbox', status: 'Draft', students: 0, lastUpdate: '2 days ago', progress: 25 },
    { id: 2, code: 'TU1741134886', name: 'Test Teaching Unit 1741134886', status: 'Draft', students: 0, lastUpdate: '5 days ago', progress: 10 },
    { id: 3, code: 'ML101', name: 'Machine Learning Basics', status: 'Published', students: 24, lastUpdate: '1 day ago', progress: 100 },
    { id: 4, code: 'DA200', name: 'Data Analysis Techniques', status: 'In Review', students: 16, lastUpdate: '3 days ago', progress: 80 },
    { id: 5, code: 'PY301', name: 'Python Advanced Programming', status: 'Published', students: 32, lastUpdate: '1 week ago', progress: 100 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Published': 'bg-green-100 text-green-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'In Review': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUnit = () => {
    const newUnit = {
      id: Date.now(),
      code: `US${Date.now().toString().slice(-4)}`,
      name: 'New Unit',
      status: 'Draft',
      students: 0,
      lastUpdate: 'Just now',
      progress: 0
    };
    
    setUnits([...units, newUnit]);
    onUnitSelect(newUnit);
  };

  const handleDeleteUnit = (e, unitId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this unit?')) {
      setUnits(units.filter(unit => unit.id !== unitId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 md:w-64 bg-gray-900 min-h-screen fixed">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-800">
              <h1 className="text-white font-bold text-lg hidden md:block">EduCanvas</h1>
              <div className="md:hidden flex justify-center">
                <span className="bg-blue-500 text-white text-lg font-bold rounded w-8 h-8 flex items-center justify-center">E</span>
              </div>
            </div>
            
            <nav className="flex-1 pt-4">
              <ul>
                <li>
                  <button 
                    className="w-full flex items-center p-3 md:px-4 text-gray-400 hover:bg-gray-800 hover:text-white">
                    <Layout className="h-5 w-5 mx-auto md:mx-0 md:mr-3" />
                    <span className="hidden md:block">Dashboard</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 md:px-4 bg-gray-800 text-white">
                    <BookOpen className="h-5 w-5 mx-auto md:mx-0 md:mr-3" />
                    <span className="hidden md:block">Teaching Units</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 md:px-4 text-gray-400 hover:bg-gray-800 hover:text-white">
                    <Users className="h-5 w-5 mx-auto md:mx-0 md:mr-3" />
                    <span className="hidden md:block">Students</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full flex items-center p-3 md:px-4 text-gray-400 hover:bg-gray-800 hover:text-white">
                    <Calendar className="h-5 w-5 mx-auto md:mx-0 md:mr-3" />
                    <span className="hidden md:block">Calendar</span>
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 md:p-6 border-t border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">J</div>
                </div>
                <div className="ml-3 hidden md:block">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">Instructor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="ml-16 md:ml-64 p-6 w-full">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Teaching Units</h1>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              <button className="p-2 rounded-full hover:bg-gray-200">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </header>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Units</p>
                      <p className="text-2xl font-bold text-gray-900">{units.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {units.reduce((total, unit) => total + unit.students, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Check className="h-5 w-5 text-green-700" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Published Units</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {units.filter(unit => unit.status === 'Published').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Teaching Units</h2>
                  <button 
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    onClick={handleAddUnit}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Unit
                  </button>
                </div>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search units by name, code, or status..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">Filters</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUnits.map((unit) => (
                      <tr key={unit.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onUnitSelect(unit)}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{unit.name}</div>
                              <div className="text-sm text-gray-500">{unit.code}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(unit.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {unit.students}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {unit.lastUpdate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${unit.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{unit.progress}% Complete</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="p-1 rounded hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); }}>
                              <Eye className="h-4 w-4 text-gray-500" />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100" onClick={(e) => { e.stopPropagation(); }}>
                              <Edit className="h-4 w-4 text-gray-500" />
                            </button>
                            <button 
                              className="p-1 rounded hover:bg-gray-100" 
                              onClick={(e) => handleDeleteUnit(e, unit.id)}>
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUnits.length}</span> of <span className="font-medium">{filteredUnits.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitListing;