'use client';

import React, { useEffect, useState } from 'react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [filterStatus]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url = filterStatus === 'all' 
        ? '/api/admin/contact/messages' 
        : `/api/admin/contact/messages?isRead=${filterStatus === 'read'}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: number, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message');
      }

      setMessages(messages.map(m => 
        m.id === id ? { ...m, isRead: !isRead } : m
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update message');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      setMessages(messages.filter(m => m.id !== id));
      setSelectedMessage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {(['all', 'read', 'unread'] as const).map(status => {
          const count = status === 'all' 
            ? messages.length
            : status === 'read'
            ? messages.filter(m => m.isRead).length
            : messages.filter(m => !m.isRead).length;

          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                filterStatus === status
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="col-span-2">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No messages found</div>
          ) : (
            <div className="space-y-2">
              {messages.map(message => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 rounded-lg border cursor-pointer transition ${
                    selectedMessage?.id === message.id
                      ? 'bg-blue-50 border-blue-300'
                      : `border-gray-200 ${message.isRead ? 'bg-white' : 'bg-yellow-50'} hover:bg-gray-50`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{message.name}</h3>
                        {!message.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Details */}
        {selectedMessage && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.name}</h3>
                <p className="text-sm text-gray-600">{selectedMessage.email}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Subject</p>
                <p className="text-gray-900 font-medium">{selectedMessage.subject}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Message</p>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.isRead)}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition text-white ${
                    selectedMessage.isRead
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
                >
                  Delete Message
                </button>
                <button
                  onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
                >
                  Reply via Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
