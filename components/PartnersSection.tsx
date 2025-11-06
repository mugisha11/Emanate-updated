import React from 'react';

const PartnerLogo: React.FC<{ name: string }> = ({ name }) => (
    <div className="text-gray-500 text-xl font-semibold tracking-wider filter grayscale hover:grayscale-0 transition duration-300">
        {name}
    </div>
);

const PartnersSection: React.FC = () => {
    const principles = [
        "Research",
        "Analysis",
        "Advocacy",
        "Knowledge Generation",
        "Social Justice",
        "Equality"
    ];

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-around items-center flex-wrap gap-x-8 gap-y-4">
                    {principles.map(p => <PartnerLogo key={p} name={p} />)}
                </div>
            </div>
        </div>
    );
};

export default PartnersSection;