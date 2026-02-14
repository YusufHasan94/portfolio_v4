import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

export async function readPortfolioData(): Promise<PortfolioData> {
    try {
        const fileContents = await fs.promises.readFile(DATA_FILE_PATH, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading portfolio data:', error);
        throw new Error('Failed to read portfolio data');
    }
}

export async function writePortfolioData(data: PortfolioData): Promise<void> {
    try {
        await fs.promises.writeFile(
            DATA_FILE_PATH,
            JSON.stringify(data, null, 2),
            'utf8'
        );
    } catch (error) {
        console.error('Error writing portfolio data:', error);
        throw new Error('Failed to write portfolio data');
    }
}

export async function updateHeroData(heroData: PortfolioData['hero']): Promise<void> {
    const data = await readPortfolioData();
    data.hero = heroData;
    await writePortfolioData(data);
}

export async function updateSkills(skills: PortfolioData['skills']): Promise<void> {
    const data = await readPortfolioData();
    data.skills = skills;
    await writePortfolioData(data);
}

export async function updateServices(services: PortfolioData['services']): Promise<void> {
    const data = await readPortfolioData();
    data.services = services;
    await writePortfolioData(data);
}

export async function updateProjects(projects: PortfolioData['projects']): Promise<void> {
    const data = await readPortfolioData();
    data.projects = projects;
    await writePortfolioData(data);
}

export async function updateCareer(career: PortfolioData['career']): Promise<void> {
    const data = await readPortfolioData();
    data.career = career;
    await writePortfolioData(data);
}
