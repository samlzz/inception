import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
    profile: {
        name: 'Samuel Liziard',
        title: 'School 42 Student — Passionate Developer',
        location: 'Paris, France',
        about: `Student at École 42 Paris, I discovered development in high school through Python, which I practiced for several years. Today oriented towards other languages (C, TypeScript, Rust…), I maintain excellent mastery of logic and fundamentals, with production experience (Python scripts deployed on Polarys/AWS). Having also practiced Scratch, given courses and tutoring, I'm comfortable working with young people and motivated to share knowledge in an engaging way.`,
        photoUrl: undefined,
    },
    contacts: [
        {
            label: 'Email',
            url: 'mailto:sliziard@icloud.com',
            icon: '✉️',
        },
        {
            label: 'GitHub',
            url: 'https://github.com/samlzz',
            icon: '🐙',
        },
        {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/samuel-liziard-born2code/',
            icon: '💼',
        },
    ],
    skills: {
        languages: ['Python', 'C/C++', 'Rust', 'JavaScript/TypeScript', 'Solidity'],
        web: ['React', 'Next.js', 'Express', 'Node.js', 'REST API'],
        databases: ['SQL (MariaDB)', 'MongoDB', 'Firestore'],
        devops: ['Git', 'Docker', 'CI/CD (GitHub Actions)', 'AWS'],
        blockchain: ['Proof-of-Stake', 'Smart Contracts', 'RPC'],
        tools: ['Office Suite', 'PIX Certification (328 points)'],
        softSkills: ['Autonomy & Rigor', 'Clear Communication & Teaching', 'Teamwork', 'Adaptability'],
    },
    education: [
        {
            school: 'École 42 Paris',
            degree: 'Common Core',
            field: 'Intensive Development',
            duration: '11/2024 - 11/2025 (planned)',
            details: ['Intensive projects: C, C++, Shell, Network, DevOps'],
        },
        {
            school: 'Lycée Saint Felix-La Salle',
            degree: 'High School Diploma',
            field: 'Mathematics, Computer Science',
            duration: '2021 - 2024',
            details: ['Merit Honor', 'Options: Mathematics, NSI'],
        },
    ],
    experience: [
        {
            title: 'Python Developer Intern',
            company: 'Polarys',
            location: 'Paris',
            duration: 'April 2023',
            description: 'Created Python automation script for PDF processing and email delivery. Deployed on AWS. Gained production code experience with clarity and comprehensive documentation.',
        },
        {
            title: 'Video Intern',
            company: 'Polarys',
            location: 'Paris',
            duration: 'April 2021',
            description: '2 internal videos + 2 LinkedIn capsules. Explained finance/data concepts using Adobe Suite and Final Cut Pro.',
        },
    ],
    projects: [
        {
            title: 'GenAI Hackathon (Orange 2024)',
            description: '5G API + Generative AI: Built AI tool prototype with team.',
            technologies: ['Python', 'AI', '5G API'],
        },
        {
            title: 'Password Manager',
            description: 'Full-stack security-focused app with JWT authentication and AES encryption.',
            technologies: ['React', 'Express', 'JWT', 'AES'],
            github: 'https://github.com/samlzz',
        },
        {
            title: 'Blockchain PoS',
            description: 'Implemented Proof-of-Stake algorithm with CLI interface.',
            technologies: ['TypeScript', 'Blockchain', 'Web3'],
            github: 'https://github.com/samlzz',
        },
        {
            title: 'File Storage Server',
            description: 'File management system with access control (ACL) built in group.',
            technologies: ['Node.js', 'Express', 'MongoDB', 'ACL'],
            github: 'https://github.com/samlzz',
        },
        {
            title: 'Chat Local Pytwit',
            description: 'Secure network app: LAN messaging system with security focus.',
            technologies: ['Python', 'Networking', 'Security'],
            github: 'https://github.com/samlzz',
        },
    ],
};
