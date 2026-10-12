import { updateSuggestionStatus, deleteSuggestion } from '../api/suggestionApi';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

export const useSuggestions = () => {
  const { suggestions: cachedSuggestions, setSuggestions: setCachedSuggestions, loading: globalLoading } = useData();
  const { showToast } = useToast();

  const updateStatus = async (id, status) => {
    try {
      await updateSuggestionStatus(id, status);
      setCachedSuggestions(cachedSuggestions.map(s =>
        s.id === id ? { ...s, status } : s
      ));
      showToast(`Suggestion marked as ${status}`, 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const removeSuggestion = async (id) => {
    try {
      await deleteSuggestion(id);
      setCachedSuggestions(cachedSuggestions.filter(s => s.id !== id));
      showToast('Suggestion deleted', 'success');
    } catch (error) {
      showToast('Failed to delete suggestion', 'error');
    }
  };

  return {
    suggestions: cachedSuggestions,
    loading: globalLoading,
    updateStatus,
    removeSuggestion,
  };
};
