import mutabaziImg from './img/mutabazi.jpg';
import peaceImg from './img/peace.jpg';
import React from 'react';
import { Link } from 'react-router-dom';
import TeamMemberCard from './TeamMemberCard';
import './LeadershipSection.css';

// Local images (from components/img)
import abimbolaImg from './img/abimbola.jpg';
import kyomugishaImg from './img/Kyomugisha Allen.jpg';
import mutesiImg from './img/Mutesi Passport photo.jpg';
import peterImg from './img/peter (1).jpg';
import peterRemoveImg from './img/peter-removebg-preview (3).png';
import winnieImg from './img/Winnie (2).jpg';
import avatarPlaceholder from './img/avatar-placeholder.svg';
import timazaImg from './img/Timaza Annet.jpg';
import akimbbaziPatienceImg from './img/Kembabazi Patience.jpg';

const teamMembers = [
    {
        name: 'Mutesi Florence',
        title: 'Executive Director',
        bio: 'Expert in Policy Analysis, research, Government relations Partnership, with over 17 years of experience.',
        imageUrl: mutesiImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/florence-mutesi',
            twitter: 'https://twitter.com/FlorenceMutesi',
            email: 'mailto:florence@emanate.org'
        }
    },
    {
        name: 'Abimbola Akinyemi',
        title: 'Research and Programe Director',
        bio: 'Leads the research and program development initiatives, ensuring impactful and evidence-based strategies.',
        imageUrl: abimbolaImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/abimbola-akinyemi-5993b7247',
            email: 'mailto:cymhdap2018@gmail.com'
        }
    },
    {
        name: 'Peace Kayesu',
        title: 'Finance and Accoutanting Manager',
        bio: 'Manages all financial aspects of the organization, ensuring fiscal responsibility and transparency.',
        imageUrl: peaceImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/peace-kayesu',
            email: 'mailto:peace@emanate.org'
        }
    },
    {
        name: 'Kyomugisha Allen',
        title: 'M&E GIS Officer',
        bio: 'Focusing on demographic studies and social impact assessment using geospatial data.',
        imageUrl: kyomugishaImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/kyomugisha-allen',
            email: 'mailto:allen@emanate.org'
        }
    },
    {
        name: 'Mugahe Winnie',
        title: 'Analysis and Service Delivery Officer',
        bio: 'Focusing on demographic studies and Service Delivery assessment to improve program effectiveness.',
        imageUrl: winnieImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/mugahe-winnie',
            email: 'mailto:winnie@emanate.org'
        }
    },
    {
        name: 'Mugisha Peter',
        title: 'IT & Communication Officer',
        bio: 'Oversees the IT infrastructure and communication strategies to support EMANATE\'s mission.',
        imageUrl: peterImg || peterRemoveImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/mugisha-peter',
            twitter: 'https://twitter.com/MugishaPeter',
            email: 'mailto:peter@emanate.org'
        }
    },
    {
        name: 'Mutabazi Derick',
        title: 'Programme Officer',
        bio: 'With over 3 years in project management, focuses on program design, implementation and M&E.',
        imageUrl: mutabaziImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/mutabazi-derick',
            email: 'mailto:derick@emanate.org'
        }
    },
    {
        name: 'Kembabazi Patience',
        title: 'Women & Youth Empowerment Officer',
        bio: 'Focusing on women and youth social, economic, and cultural development, bringing innovation and perspectives that shape societal progress.',
        imageUrl: akimbbaziPatienceImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/kembabazi-patience',
            email: 'mailto:patience@emanate.org'
        }
    },
    {
        name: 'Timaza Annet',
        title: 'Office Affairs Officer',
        bio: 'Managing day-to-day office tasks, with over 10 years experience.',
        imageUrl: timazaImg,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/timaza-annet',
            email: 'mailto:annet@emanate.org'
        }
    }
];

interface LeadershipSectionProps {
    memberLimit?: number;
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({ memberLimit }) => {
    const displayedMembers = memberLimit ? teamMembers.slice(0, memberLimit) : teamMembers;

    return (
        <section className="leadership-section">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="leadership-title">
                        Leadership Team
                    </h2>
                </div>
                <div className="leadership-grid">
                    {displayedMembers.map((member, index) => (
                        <TeamMemberCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeadershipSection;