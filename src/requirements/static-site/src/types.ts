/* Sidebar content */

export interface ProfileInfo {
    name: string;
    title: string;
    location: string;
    about: string;
    photoUrl?: string;
}

export interface ContactLink {
    label: string;
    url: string;
    icon: string;
}

export interface SkillsCollection {
    languages: string[];
    web: string[];
    databases: string[];
    devops: string[];
    blockchain: string[];
    tools: string[];
    softSkills: string[];
}

/* Main content */

export interface Education {
    school: string;
    degree: string;
    field: string;
    duration: string;
    details?: string[];
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
}

// Main data
export interface PortfolioData {
    profile: ProfileInfo;
    contacts: ContactLink[];
    skills: SkillsCollection;
    education: Education[];
    experience: Experience[];
    projects: Project[];
}
