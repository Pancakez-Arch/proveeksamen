'use client';

import { useState, useEffect } from 'react';

interface RentalRequest {
  id: string;
  equipmentId: string;
  equipmentName: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
}

export default function AdminRentalRequests() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');

  useEffect(() => {
    fetchRequests();
  }, [page, statusFilter]);

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `/api/rental-requests?page=${page}&status=${statusFilter}`
      );
      const data = await response.json();
      setRequests(data.requests);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching rental requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, newStatus: 'approved' | 'denied') => {
    try {
      const response = await fetch(`/api/rental-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update request status');
      }

      // Refresh the requests list
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
      alert('Failed to update request status. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
        </select>
      </div>
      
      <div className="grid gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{request.equipmentName}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Requested by: {request.customerName}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Email: {request.customerEmail}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: {request.customerPhone}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Dates: {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Status: <span className={`font-semibold ${
                    request.status === 'approved' ? 'text-green-600' :
                    request.status === 'denied' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>{request.status}</span>
                </p>
              </div>
              
              {request.status === 'pending' && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleStatusUpdate(request.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(request.id, 'denied')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
} 