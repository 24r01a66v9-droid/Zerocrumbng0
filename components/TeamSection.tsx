
import React from 'react';

const TeamSection: React.FC = () => {
  const team = [
    { name: 'Hasini Reddy', role: 'Founder', img: 'https://picsum.photos/seed/hasini/200' },
    { name: 'Hrithika Reddy', role: 'Co-Founder', img: 'https://picsum.photos/seed/hrithika/200' },
    { name: 'Bavitha Reddy', role: 'Operations & Outreach Lead', img: 'https://picsum.photos/seed/bavitha/200' },
    { name: 'Morubagal Manaswini', role: 'Technology & Data Lead', img: 'https://picsum.photos/seed/manaswini/200' },
  ];

  return (
    <section className="py-20 bg-gray-50" id="team">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Visionaries</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dedicated to solving food waste and hunger through technology and grassroots action.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center group">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-green-100 group-hover:ring-green-500 transition-all">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-green-600 font-medium text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
