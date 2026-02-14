'use client';

import { useEffect, useState } from 'react';
import { HeroData } from '@/types/portfolio';

export default function HeroAdmin() {
    const [heroData, setHeroData] = useState<HeroData>({
        title: '',
        subtitle: '',
        description: '',
        currentStatus: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/portfolio/hero');
                const data = await response.json();

                if (response.ok && !data.error) {
                    setHeroData(data);
                } else {
                    console.error('Failed to fetch hero data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('/api/portfolio/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(heroData),
            });

            if (response.ok) {
                setMessage('Hero section updated successfully!');
            } else {
                setMessage('Failed to update hero section');
            }
        } catch (error) {
            console.error('Error updating hero data:', error);
            setMessage('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Hero Section</h1>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6 space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={heroData.title}
                            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-2">Subtitle</label>
                        <input
                            type="text"
                            value={heroData.subtitle}
                            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                            className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-2">Description</label>
                        <textarea
                            value={heroData.description}
                            onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD] min-h-24"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-2">Current Status</label>
                        <input
                            type="text"
                            value={heroData.currentStatus}
                            onChange={(e) => setHeroData({ ...heroData, currentStatus: e.target.value })}
                            className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                            placeholder="e.g., Currently working on Portfolio"
                            required
                        />
                    </div>

                    {message && (
                        <div className={`px-4 py-3 rounded-lg ${message.includes('success')
                            ? 'bg-green-500/10 border border-green-500 text-green-500'
                            : 'bg-red-500/10 border border-red-500 text-red-500'
                            }`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-[#C778DD] hover:bg-[#C778DD]/90 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
