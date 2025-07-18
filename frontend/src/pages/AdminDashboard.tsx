import '../App.css'

import { useState, useEffect } from 'react';

/* Types */
import type { AdminComplaintStruct } from '../types/complaint';

/* Services */
import { fetchComplaints, deleteComplaint, toggleComplaintStatus } from '../services/complaintService';


function AdminDashboard() {
    const [complaints, setComplaints] = useState<AdminComplaintStruct[]>([]);
    const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Resolved'>('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 

    useEffect(() => {
        fetchComplaints()
            .then(setComplaints)
            .catch((err) => setError(err.message || 'Unexpected error'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = statusFilter === 'All'? complaints : complaints.filter(c => c.status === statusFilter);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this complaint?')) return;

        try {
            await deleteComplaint(id);
            setComplaints(prev => prev.filter(c => c.id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete complaint');
        }
    };

    const handleToggleStatus = async(id: string, currentStatus: "Pending" | "Resolved") => {

        const newStatus = currentStatus === 'Resolved' ? 'Pending' : 'Resolved';

        if (!confirm(`Are you sure you want to mark this complaint ${newStatus}?`)) return;

        try {
            await toggleComplaintStatus(id, newStatus);
            setComplaints(prev =>
                prev.map(c =>
                    c.id === id ? { ...c, status: newStatus } : c
                )
            );
        } catch (err: any) {
            alert(err.message || 'Failed to update complaint status.');
        }
        
    }

    const headerMargin = "px-4 py-4"

  return (
    <div className="min-h-screen px-8 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <div className="flex gap-y-2.5 items-center justify-center space-x-2 mb-6">
            <label htmlFor="status" className="text-lg font-semibold">Filter by Status:</label>
            <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="border px-3 py-1 rounded"
            >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            </select>
      </div>
        {loading ? (<div className="text-center text-lg">Loading complaints...</div>) : error ? 
        (<div className="text-center text-red-500">{error}</div>) : complaints.length === 0 ? 
        (<div className="text-center">No complaints submitted yet.</div>) : (
            <div className="overflow-x-scroll">
            <table className="min-w-full bg-white shadow flex-col justify-between">
                <thead className="bg-blue-500 text-white">
                <tr>
                    <th className={`${headerMargin} text-left`}>Date</th>
                    <th className={`${headerMargin} text-left`}>Name</th>
                    <th className={`${headerMargin} text-left`}>Email</th>
                    <th className={`${headerMargin} text-left`}>Complaint</th>
                    <th className={`${headerMargin} text-left`}>Status</th>
                    <th className={`${headerMargin} text-left`}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map((c) => (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(c.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2 max-w-sm truncate">{c.complaint}</td>
                    <td className="px-4 py-2">
                        <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                            c.status === 'Resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                        >
                            {c.status}
                        </span>
                    </td>
                    <div className="py-2 px-1">
                    <td className="px-4 py-2">
                        <div className='flex gap-2'>
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                >
                                Delete
                            </button>
                            <button
                                onClick={() => handleToggleStatus(c.id, c.status)}
                                className={`${c.status === 'Pending' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}  text-white px-3 py-1 rounded-md`}
                                >
                                {c.status === 'Resolved' ? 'Mark Pending': 'Resolve'}
                            </button>
                        </div>
                </td>
              </div>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
    </div>

  )
}

export default AdminDashboard;