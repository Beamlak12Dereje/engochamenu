import React, { useState } from 'react';
import { useSuggestions } from '../hooks/useSuggestions';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';

const SuggestionsPage = () => {
  const { suggestions, loading, updateStatus, removeSuggestion } = useSuggestions();
  const [filter, setFilter] = useState('all'); // all, new, read, archived
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Filter suggestions
  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesFilter = filter === 'all' || suggestion.status === filter;
    const matchesSearch = 
      (suggestion.name?.toLowerCase().includes(search.toLowerCase()) || !suggestion.name) ||
      suggestion.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = async () => {
    if (deleteConfirm) {
      await removeSuggestion(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700',
      read: 'bg-green-100 text-green-700',
      archived: 'bg-gray-100 text-gray-700'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Customer Suggestions</h1>
        <p className="text-white/80 mt-1">
          {filteredSuggestions.length} of {suggestions.length} suggestions
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search suggestions..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
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
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {['all', 'new', 'read', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === status
                  ? 'bg-white text-[#212E50]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredSuggestions.length === 0 ? (
        <EmptyState
          message={
            suggestions.length === 0
              ? 'No suggestions yet.'
              : 'No suggestions match your filters.'
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-[#E8EDF5] rounded-lg p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {formatDate(suggestion.date)}
                  </span>
                  {getStatusBadge(suggestion.status)}
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {suggestion.message}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {suggestion.status === 'new' && (
                  <button
                    onClick={() => updateStatus(suggestion.id, 'read')}
                    className="px-3 py-1.5 bg-[#212E50] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2440] transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                {suggestion.status === 'read' && (
                  <button
                    onClick={() => updateStatus(suggestion.id, 'archived')}
                    className="px-3 py-1.5 bg-gray-500 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Archive
                  </button>
                )}
                {suggestion.status === 'archived' && (
                  <button
                    onClick={() => updateStatus(suggestion.id, 'read')}
                    className="px-3 py-1.5 bg-[#212E50] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2440] transition-colors"
                  >
                    Unarchive
                  </button>
                )}
                <button
                  onClick={() => setDeleteConfirm(suggestion.id)}
                  className="px-3 py-1.5 text-white rounded-lg text-sm font-semibold transition-colors ml-auto"
                  style={{ backgroundColor: '#5A1E5C' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4a1849'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#5A1E5C'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        title="Delete Suggestion"
        message="Are you sure you want to delete this suggestion? This action cannot be undone."
      />
    </div>
  );
};

export default SuggestionsPage;
