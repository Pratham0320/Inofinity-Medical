import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "DR. ASHOK KUMAR BADAMALI",
    role: "Founder",
    image: "/images/Team_Members/team-image-1.jpg",
  },
  {
    name: "MRS. NIBEDITA THANAPATI",
    role: "Co-Founder",
    image: "/images/Team_Members/team-image-2.jpeg",
  },
  {
    name: "MR. PRASANT PATTNAIK",
    role: "Financial Advisor",
    image: "/images/Team_Members/team-image-3.jpeg",
  },
  {
    name: "MR. MANAS BEHERA",
    role: "Overseas Business Development Partner",
    image: "/images/Team_Members/team-image-4.jpeg",
  },
  {
    name: "MR. SOUMYA RANJAN ROUT",
    role: "Electronics and Robotics Expert",
    image: "/images/Team_Members/team-image-5.jpeg",
  },
  {
    name: "MR. PRASANA SAHOO",
    role: "R&D Manager",
    image: "/images/Team_Members/team-image-6.jpg",
  },
];

export default function TeamSection() {
  return (
    <div className="bg-[#1e293b] w-full">
      <section className="py-12 px-4 mx-auto">
        <h2 className="text-5xl text-center text-gray-100 mb-16">
          Our Team
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6 transform transition-transform duration-300 hover:scale-105">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className={`rounded-full object-cover shadow-lg ${
                    member.name === "DR. ASHOK KUMAR BADAMALI"
                      ? "object-top"
                      : ""
                  }`}
                  style={{
                    objectPosition:
                      member.name === "DR. ASHOK KUMAR BADAMALI"
                        ? "50% 20%"
                        : "center",
                  }}
                />
              </div>
              <h3 className="text-xl font-medium text-gray-100 mb-2 hero-subtitle">
                {member.name}
              </h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
