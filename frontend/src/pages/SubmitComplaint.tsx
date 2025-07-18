import '../App.css'
import { useState } from 'react';

/* Types */
import type { UserComplaintStruct } from '../types/complaint';

/* Components */
import Input from '../components/Input'
import TextArea from '../components/TextArea'

/* Services */
import { submitComplaint } from '../services/complaintService';

function SubmitComplaint() {
  
  const [formData, setFormData] = useState<UserComplaintStruct>({
    name: '',
    email: '',
    complaint: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await submitComplaint(formData);
      alert('Complaint successfully filed!');
    } catch (err: any) {
        alert(err.message || 'There was an error submitting your complaint.');
    }
  };

  return (
    <>
   
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-90 flex flex-col space-y-6 px-8 py-8 shadow-2xl rounded-2xl">
      <img src="/Banner_SA_new.svg" alt="Banner" className="mt-3 w-125 h-auto" />
      <h1 className="text-3xl font-bold mb-6 mt-1 text-center">File A Complaint</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Full Name" type="text" name="name" value={formData.name} placeholder='Full Name' onChange={handleChange} pattern="^\s*\S+\s+\S+.*$" tooltip="Please enter a full name with at least two words" required={true} />
        <Input label="Email Address" type="email" name="email" value={formData.email} placeholder='Email Address' onChange={handleChange} required={true} />
        <TextArea label="Enter Complaints" name="complaint" value={formData.complaint} placeholder="Write any complaints you have (10-1000 characters)" onChange={handleChange} />
        <button type="submit" className='items-center w-full h-10 rounded-4xl text-xl text-white bg-red-600 hover:bg-red-700'>File Complaint</button>
      </form>
      </div>
    </div>
    </>
  )
}

export default SubmitComplaint
