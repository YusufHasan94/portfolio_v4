import { supabaseAdmin } from '../src/lib/supabase/server';
import portfolioData from '../src/data/portfolio.json';

async function migrateData() {
    console.log('🚀 Starting migration to Supabase...\n');

    try {
        // Migrate Hero Section
        console.log('📝 Migrating Hero section...');
        const { error: heroError } = await supabaseAdmin
            .from('hero')
            .upsert({
                title: portfolioData.hero.title,
                subtitle: portfolioData.hero.subtitle,
                description: portfolioData.hero.description,
                current_status: portfolioData.hero.currentStatus,
            });

        if (heroError) {
            console.error('❌ Hero migration error:', heroError);
        } else {
            console.log('✅ Hero section migrated successfully');
        }

        // Migrate Skills
        console.log('\n📝 Migrating Skills...');
        for (const skill of portfolioData.skills) {
            const { error } = await supabaseAdmin
                .from('skills')
                .insert({
                    name: skill.name,
                    image: skill.image,
                    category: skill.category,
                });

            if (error) {
                console.error(`❌ Error migrating skill "${skill.name}":`, error);
            } else {
                console.log(`✅ Migrated skill: ${skill.name}`);
            }
        }

        // Migrate Services
        console.log('\n📝 Migrating Services...');
        for (const service of portfolioData.services) {
            const { error } = await supabaseAdmin
                .from('services')
                .insert({
                    title: service.title,
                    description: service.description,
                    image: service.image,
                });

            if (error) {
                console.error(`❌ Error migrating service "${service.title}":`, error);
            } else {
                console.log(`✅ Migrated service: ${service.title}`);
            }
        }

        // Migrate Projects
        console.log('\n📝 Migrating Projects...');
        for (const project of portfolioData.projects) {
            const { error } = await supabaseAdmin
                .from('projects')
                .insert({
                    name: project.name,
                    description: project.description,
                    image: project.image,
                    preview_url: project.preview_url,
                    type: project.type,
                    tech_stack: project.tech_stack,
                });

            if (error) {
                console.error(`❌ Error migrating project "${project.name}":`, error);
            } else {
                console.log(`✅ Migrated project: ${project.name}`);
            }
        }

        // Migrate Career
        console.log('\n📝 Migrating Career milestones...');
        for (const milestone of portfolioData.career) {
            const { error } = await supabaseAdmin
                .from('career')
                .insert({
                    company: milestone.company,
                    company_url: milestone.company_url,
                    title: milestone.title,
                    description: milestone.description,
                    starting: milestone.starting,
                    ending: milestone.ending,
                });

            if (error) {
                console.error(`❌ Error migrating career "${milestone.title}":`, error);
            } else {
                console.log(`✅ Migrated career: ${milestone.title} at ${milestone.company}`);
            }
        }

        console.log('\n🎉 Migration completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Hero: 1 entry`);
        console.log(`   - Skills: ${portfolioData.skills.length} entries`);
        console.log(`   - Services: ${portfolioData.services.length} entries`);
        console.log(`   - Projects: ${portfolioData.projects.length} entries`);
        console.log(`   - Career: ${portfolioData.career.length} entries`);

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateData();
