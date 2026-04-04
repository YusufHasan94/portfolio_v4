import { readPortfolioData, updateProjects } from '../src/lib/dataManager';
import { Project } from '../src/types/portfolio';

async function testAddProject() {
    console.log('Testing project add...');
    try {
        const data = await readPortfolioData();
        const initialCount = data.projects.length;
        console.log(`Initial project count: ${initialCount}`);

        const newProject: Project = {
            id: 'test-' + Date.now(),
            name: 'Test Project',
            description: 'Test Description',
            image: '/test.png',
            preview_url: 'https://test.com',
            type: 'test',
            tech_stack: ['Test']
        };

        const updatedProjects = [...data.projects, newProject];
        await updateProjects(updatedProjects);

        const verifiedData = await readPortfolioData();
        console.log(`New project count: ${verifiedData.projects.length}`);

        if (verifiedData.projects.length === initialCount + 1) {
            console.log('Project added successfully to JSON!');
        } else {
            console.log('FAILED to add project to JSON.');
        }
    } catch (error) {
        console.error('Error during test:', error);
    }
}

testAddProject();
