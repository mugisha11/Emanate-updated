import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const GENERIC_ERROR = 'Failed to send message. Please try again later. Internal Server Error';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        
        try {
            // Use relative path; in dev Vite will proxy /api to the backend (see vite.config.ts)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData
                }),
            });

            if (!response.ok) {
                // try to parse JSON error safely
                let errMsg = 'Failed to send message';
                try {
                    const body = await response.json();
                    if (body && body.error) errMsg = body.error;
                } catch (e) {
                    // ignore parse error
                    errMsg = response.statusText || errMsg;
                }
                throw new Error(errMsg);
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            console.error('Contact submit error', error);
            // Don't show server internals to users — show a short, consistent message
            setErrorMessage(GENERIC_ERROR);
            setStatus('error');
            // Reset error message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }
    };
    return (
        <div className="bg-white">
            {/* Header section */}
            <section className="py-16 lg:py-24 bg-cyan-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">{t('contact.header')}</h1>
                    <p className="mt-4 text-lg text-cyan-100">{t('contact.subheader')}</p>
                </div>
            </section>

            {/* Content section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.send_heading')}</h2>
                            {status === 'success' && (
                                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">{t('contact.success_message')}</div>
                            )}
                            {status === 'error' && (
                                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                                    <div>{t('contact.error_message')}</div>
                                    {errorMessage && <div className="mt-2 text-sm text-red-700">{errorMessage}</div>}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.label_name')}</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.label_email')}</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">{t('contact.label_subject')}</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.label_message')}</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows={4} 
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                    ></textarea>
                                </div>
                                <div className="text-right">
                                    <button 
                                        type="submit" 
                                        disabled={status === 'sending'}
                                        className={`bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-colors ${status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        {status === 'sending' ? t('contact.sending') : t('contact.send_button')}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contact.info_heading')}</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p><strong>{t('contact.address_label')}:</strong> {t('contact.address')}</p>
                                    <p><strong>{t('contact.phone_label')}:</strong> <a href="tel:+250788426428" className="text-cyan-600 hover:underline">{t('contact.phone')}</a></p>
                                    <p><strong>{t('contact.email_label')}:</strong> <a href="mailto:info@imanate.org" className="text-cyan-600 hover:underline">{t('contact.email')}</a></p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('contact.map_heading')}</h2>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d472.46645934737126!2d30.148108714510737!3d-1.991171317612865!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2srw!4v1762293462630!5m2!1sen!2srw" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
