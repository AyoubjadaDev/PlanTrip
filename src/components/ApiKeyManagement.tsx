'use client';

import React, { useEffect, useState } from 'react';
import { Copy, Check, Key, Trash2, Eye, EyeOff, Zap } from 'lucide-react';

interface ApiKey {
  id: string;
  key: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
}

interface TestResult {
  id: string;
  status: 'VALID' | 'INVALID' | 'ERROR' | 'TESTING' | null;
  message: string;
}

export function ApiKeyManagement() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualKeyInput, setManualKeyInput] = useState('');

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/admin/api-keys');
      
      if (!response.ok) {
        throw new Error('Failed to fetch API keys');
      }

      const data = await response.json();
      setKeys(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    try {
      setError('');
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate API key');
      }

      const data = await response.json();
      
      if (!data.key) {
        throw new Error('Invalid response: No API key returned');
      }

      setNewKeyValue(data.key);
      
      // Add to list after 2 seconds
      setTimeout(() => {
        fetchKeys();
        setShowNewKeyForm(false);
        setNewKeyValue('');
      }, 2000);
    } catch (err) {
      console.error('Generate key error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate API key');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const toggleKeyActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/api-keys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update API key');
      }

      setKeys(keys.map(k => 
        k.id === id ? { ...k, isActive: !currentStatus } : k
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update API key');
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/admin/api-keys/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }

      setKeys(keys.filter(k => k.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete API key');
    }
  };

  const testApiKey = async (keyId: string) => {
    setTestResults(prev => ({
      ...prev,
      [keyId]: { id: keyId, status: 'TESTING', message: 'Testing...' }
    }));

    try {
      const response = await fetch('/api/admin/api-keys/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKeyId: keyId }),
      });

      const result = await response.json();
      
      setTestResults(prev => ({
        ...prev,
        [keyId]: {
          id: keyId,
          status: result.status,
          message: result.message
        }
      }));

      // Auto-clear result after 5 seconds
      setTimeout(() => {
        setTestResults(prev => {
          const newResults = { ...prev };
          delete newResults[keyId];
          return newResults;
        });
      }, 5000);
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [keyId]: {
          id: keyId,
          status: 'ERROR',
          message: 'Failed to test API key'
        }
      }));
    }
  };

  const addManualKey = async () => {
    if (!manualKeyInput.trim()) {
      setError('Please enter an API key');
      return;
    }

    try {
      setError('');
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: manualKeyInput.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add API key');
      }

      setManualKeyInput('');
      setShowManualInput(false);
      fetchKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add API key');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Loading API keys...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Key Management</h2>
          <p className="text-gray-600 mt-1">Create, manage, and rotate your API keys for Groq integration</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowManualInput(!showManualInput)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <Key size={18} />
            {showManualInput ? 'Cancel' : '+ Add Manual Key'}
          </button>
          <button
            onClick={() => setShowNewKeyForm(!showNewKeyForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Key size={18} />
            {showNewKeyForm ? 'Cancel' : '+ Generate New Key'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Manual Key Input Form */}
      {showManualInput && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Add API Key Manually</h3>
          <p className="text-sm text-gray-600">
            Paste your Groq API key directly. Useful when you already have keys from console.groq.com
          </p>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <textarea
              value={manualKeyInput}
              onChange={e => setManualKeyInput(e.target.value)}
              placeholder="Paste your Groq API key here (e.g., gsk_...)"
              className="w-full border border-gray-300 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowManualInput(false);
                setManualKeyInput('');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
            <button
              onClick={addManualKey}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add Key
            </button>
          </div>
        </div>
      )}

      {/* New Key Form */}
      {showNewKeyForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Generate New API Key</h3>
          <p className="text-sm text-gray-600">
            A new API key will be generated. Make sure to copy and save it somewhere safe as you won't be able to see it again.
          </p>

          {newKeyValue && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-blue-900 font-medium">Your New API Key:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-blue-300 rounded px-3 py-2 font-mono text-sm text-gray-900 break-all">
                  {newKeyValue}
                </code>
                <button
                  onClick={() => copyToClipboard(newKeyValue, 'new-key')}
                  className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  title="Copy to clipboard"
                >
                  {copiedId === 'new-key' ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <p className="text-xs text-blue-800">
                ⚠️ Save this key in a secure location. You won't be able to see it again.
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowNewKeyForm(false);
                setNewKeyValue('');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
            {!newKeyValue && (
              <button
                onClick={generateNewKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Generate Key
              </button>
            )}
          </div>
        </div>
      )}

      {/* Keys List */}
      {keys.length === 0 ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <Key size={32} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">No API keys yet</p>
          <p className="text-gray-500 text-sm mt-1">Generate your first API key to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {keys.map(key => (
            <div key={key.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Key size={20} className="text-gray-400" />
                    <span className="font-mono text-sm text-gray-900">{key.key}</span>
                    <button
                      onClick={() => copyToClipboard(key.key, key.id)}
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition"
                      title="Copy to clipboard"
                    >
                      {copiedId === key.id ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span>📅 Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                    <span>📊 Usage: {key.usageCount} requests</span>
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      key.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {key.isActive ? '✓ Active' : '⊘ Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => testApiKey(key.id)}
                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium flex items-center gap-1"
                  disabled={testResults[key.id]?.status === 'TESTING'}
                >
                  <Zap size={16} />
                  {testResults[key.id]?.status === 'TESTING' ? 'Testing...' : 'Test'}
                </button>
                {testResults[key.id] && testResults[key.id].status !== 'TESTING' && (
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
                    testResults[key.id].status === 'VALID' ? 'bg-green-100 text-green-700' :
                    testResults[key.id].status === 'INVALID' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {testResults[key.id].message}
                  </div>
                )}
                <button
                  onClick={() => toggleKeyActive(key.id, key.isActive)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    key.isActive
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {key.isActive ? '🔒 Deactivate' : '🔓 Activate'}
                </button>
                <button
                  onClick={() => deleteKey(key.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-blue-900">API Key Management</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li className="flex gap-2">
            <span>🔑</span>
            <span><strong>Generate:</strong> Create new API keys for your Groq integration</span>
          </li>
          <li className="flex gap-2">
            <span>🔄</span>
            <span><strong>Rotate:</strong> Deactivate old keys and generate new ones for security</span>
          </li>
          <li className="flex gap-2">
            <span>📊</span>
            <span><strong>Track:</strong> Monitor usage count and creation date for each key</span>
          </li>
          <li className="flex gap-2">
            <span>🛡️</span>
            <span><strong>Secure:</strong> Keys are masked in the list (only last 4 chars shown)</span>
          </li>
          <li className="flex gap-2">
            <span>⚠️</span>
            <span><strong>Important:</strong> Save new keys immediately. You won't be able to see them again.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
