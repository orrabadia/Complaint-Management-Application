export interface AdminComplaintStruct {
    id: string;
    name: string;
    email: string;
    complaint: string;
    status: 'Pending' | 'Resolved';
    created_at: string;
}

export interface UserComplaintStruct {
    name: string;
    email: string;
    complaint: string;
}