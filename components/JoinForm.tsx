import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ApplicantType = 'partner' | 'volunteer' | 'collaborator';

const initialState = {
  type: 'volunteer' as ApplicantType,
  name: '',
  email: '',
  phone: '',
  message: '',
  resumeName: '',
  resumeBase64: '',
  consent: false,
};

const JoinForm: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setForm(prev => ({ ...prev, resumeName: f.name }));
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip prefix like data:application/pdf;base64,
      const commaIdx = result.indexOf(',');
      const base64 = commaIdx >= 0 ? result.slice(commaIdx + 1) : result;
      setForm(prev => ({ ...prev, resumeBase64: base64 }));
    };
    reader.readAsDataURL(f);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') setForm(prev => ({ ...prev, [name]: checked } as any));
    else setForm(prev => ({ ...prev, [name]: value } as any));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!form.name || !form.email || !form.type) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      if (!form.name?.trim()) {
        setError('Please enter your name');
        return;
      }
      
      if (!form.email?.trim()) {
        setError('Please enter your email address');
        return;
      }

      if (!form.consent) {
        setError('Please accept the consent checkbox to continue');
        return;
      }

      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Unable to send application');
      }

      setSuccess('Thank you for your application! We will contact you soon.');
      setForm(initialState);
    } catch (err) {
      console.error('Submit error:', err);
      setError('Unable to send application. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic questions
  const renderQuestions = () => {
    switch (form.type) {
      case 'partner':
        return (
          <>
            <div>
              <label className="text-xs font-medium text-gray-700">Organization name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Contact email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Contact phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Partnership goals</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" placeholder="Describe your goals for partnering with EMANATE" />
            </div>
          </>
        );
      case 'collaborator':
        return (
          <>
            <div>
              <label className="text-xs font-medium text-gray-700">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Collaboration proposal</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" placeholder="Describe your proposed collaboration" />
            </div>
          </>
        );
      default:
        return (
          <>
            <div>
              <label className="text-xs font-medium text-gray-700">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Motivation / experience</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2" placeholder="Why do you want to volunteer with EMANATE?" />
            </div>
          </>
        );
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md"
    >
      <div>
        <label className="text-xs font-medium text-gray-700">I want to apply as</label>
        <select 
          id="application-type"
          name="type" 
          value={form.type} 
          onChange={handleChange}
          aria-label="Application type"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm text-sm p-2"
        >
          <option value="partner">Partner</option>
          <option value="volunteer">Volunteer</option>
          <option value="collaborator">Collaborator</option>
        </select>
      </div>

      {renderQuestions()}

      <div>
        <label className="text-xs font-medium text-gray-700">Resume (optional)</label>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={onFileChange}
          aria-label="Upload resume"
          title="Upload your resume (PDF, DOC, or DOCX)"
          className="mt-1 block w-full text-sm"
        />
        {form.resumeName && <div className="mt-2 text-xs text-gray-500">Uploaded: {form.resumeName}</div>}
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" id="consent" name="consent" checked={form.consent} onChange={handleChange} className="mt-1" />
        <label htmlFor="consent" className="text-xs text-gray-600">I consent to EMANATE processing my application and contacting me by email.</label>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-600">{success}</div>}

      <div className="flex items-center justify-end gap-3">
        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          {loading ? 'Sending…' : 'Submit application'}
        </button>
      </div>
    </motion.form>
  );
};

export default JoinForm;
