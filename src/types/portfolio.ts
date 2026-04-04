export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  currentStatus: string;
}

export interface Skill {
  id: string;
  name: string;
  image: string;
  category: 1 | 2; // 1 for first marquee, 2 for second marquee
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Project {
  id: string;
  name: string;
  image: string;
  description: string;
  tech_stack: string[];
  preview_url: string;
  type: string;
}

export interface CareerMilestone {
  id: string;
  company: string;
  company_url: string;
  title: string;
  description: string;
  starting: string;
  ending: string;
}

export interface PortfolioData {
  hero: HeroData;
  skills: Skill[];
  services: Service[];
  projects: Project[];
  career: CareerMilestone[];
}
