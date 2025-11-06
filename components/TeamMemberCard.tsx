import React from 'react';
import './LeadershipSection.css';

interface TeamMemberCardProps {
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, title, bio, imageUrl, socialLinks = {} }) => {
    const { linkedin, twitter, email } = socialLinks;
    
    return (
        <div className="member-card">
            <div className="member-image-wrapper">
                <div className="member-image-container">
                    <img className="member-image" src={imageUrl} alt={`Photo of ${name}`} loading="lazy" />
                </div>
                {(linkedin || twitter || email) && (
                    <div className="member-overlay">
                        <div className="member-social">
                            {linkedin && (
                                <a href={linkedin} className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            )}
                            {twitter && (
                                <a href={twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.52 3.38 4.744 3.42a9.875 9.875 0 01-6.117 2.107c-.397 0-.79-.023-1.175-.068a13.963 13.963 0 007.548 2.212c9.058 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.015-.637a9.953 9.953 0 002.42-2.51z"/>
                                    </svg>
                                </a>
                            )}
                            {email && (
                                <a href={email} className="social-link" aria-label="Email">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="member-info">
                <h3 className="member-name">{name}</h3>
                <div className="member-title">{title}</div>
                <p className="member-bio">{bio}</p>
            </div>
        </div>
    );
};

export default TeamMemberCard;