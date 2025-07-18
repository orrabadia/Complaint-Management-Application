import { Request, Response } from 'express';
import supabase from '../utils/supabase';

import xss from 'xss';
import validator from 'validator'

export const getAllComplaints = async (req: Request, res: Response) => {
    const { data, error } = await supabase.from('complaints').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
};

export const createComplaint = async (req: Request, res: Response) => {
    let { name, email, complaint } = req.body;

    /* Prevent Cross-site scripting */
    name = xss(name);
    email = xss(email);
    complaint = xss(complaint);

    if (!name || !email || !complaint) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    
    if (!/^\s*\S+\s+\S+.*$/.test(name)) {
        return res.status(400).json({ error: 'Full name must include at least two words.' });
    }
    
    if (!validator.isLength(complaint, { min: 10, max: 1000 })) {
        return res.status(400).json({ error: 'Complaint must be between 10 and 1000 characters.' });
    }

    
    const { data: matches, error: fetchError } = await supabase
    .from('complaints')
    .select('name, email')
    .eq('complaint', complaint);

    if (fetchError) {
        return res.status(500).json({ error: fetchError.message });
    }

    if (matches && matches.length > 0) {
        const sameName = matches.find(c => c.name === name);
        const sameEmail = matches.find(c => c.email === email);

        let reason = '';
        if (sameName && sameEmail) {
            reason = 'A complaint with the same name and email has already been filed.';
        } else if (sameName) {
            reason = 'A complaint with the same name has already been filed.';
        } else if (sameEmail) {
            reason = 'A complaint with the same email has already been filed.';
        }

        if (reason) {
        return res.status(409).json({ error: reason });
        }
    }

    // Insert if no duplicates found
    const { data, error } = await supabase
        .from('complaints')
        .insert([{ name, email, complaint }])
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data[0]);
};

export const getComplaintById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { data, error } = await supabase.from('complaints')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        return res.status(404).json({ error: error.message });
    }
    res.json(data);
};

export const deleteComplaint = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const { error } = await supabase
        .from('complaints')
        .delete()
        .eq('id', id);
  
    if (error) {
        return res.status(500).json({ error: error.message });
    }
  
    res.status(204).send();
};

export const updateComplaintStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!['Pending', 'Resolved'].includes(status)) {
        return res.status(400).json({ error: 'Invalid Status' });
    }
  
    const { data, error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', id)
        .select();
  
    if (error) {
        return res.status(500).json({ error: error.message });
    }
  
    res.status(200).json(data[0]);
};
