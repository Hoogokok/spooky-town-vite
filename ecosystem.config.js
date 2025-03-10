module.exports = {
    apps: [{
        name: 'spooky-town',
        script: 'npm',
        args: 'run preview',
        env: {
            NODE_ENV: 'production',
            VITE_API_URL: process.env.VITE_API_URL,
            VITE_API_KEY: process.env.VITE_API_KEY,
            VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
            VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
            VITE_YOUTUBE_API_KEY: process.env.VITE_YOUTUBE_API_KEY,
            VITE_POSTER_URL: process.env.VITE_POSTER_URL
        }
    }]
} 