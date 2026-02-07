export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type Work = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  link?: string;
  github?: string;
  detail?: string;
};

export type Experience = {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
};

export type Skill = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  id: string;
  category: string;
  skills: Skill[];
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  heroMessage: string;
  heroSubMessage: string;
  socialLinks: {
    github: string;
    x: string;
    blog: string;
    email: string;
  };
};
