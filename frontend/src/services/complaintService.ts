/* Types */
import type { AdminComplaintStruct, UserComplaintStruct } from "../types/complaint";

export async function submitComplaint(formData: UserComplaintStruct) {
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
  
    const result = await res.json(); 

    if (!res.ok) {
        throw new Error(result.error);
    }
  
    return result;
}

export async function fetchComplaints(): Promise<AdminComplaintStruct[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/complaints`);

    const result = await res.json(); 

    if (!res.ok) {
        throw new Error('Failed to fetch complaints');
    }
    
    return result;
}

export async function deleteComplaint(id: string): Promise<void> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/complaints/${id}`, {
        method: 'DELETE',
    });
    
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error deleting complaint');
    }
    
}
export async function toggleComplaintStatus(id: string, newStatus: "Pending" | "Resolved"): Promise<AdminComplaintStruct> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/complaints/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error updating Status');
    }

    return res.json();
}