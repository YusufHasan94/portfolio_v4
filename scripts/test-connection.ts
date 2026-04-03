import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing environment variables. Make sure to run with --env-file=.env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);

    try {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Connection failed:', error.message);
            console.error('Error details:', JSON.stringify(error, null, 2));
        } else {
            console.log('Connection successful!');
            console.log('Data fetched:', data);
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
