'use client';

import { useEffect, useState } from 'react';
import { PortfolioData } from '@/types/portfolio';

export default function AdminDashboard() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/portfolio');
                const portfolioData = await response.json();
                setData(portfolioData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[#ABB2BF] text-sm">Total Skills</p>
                            <p className="text-3xl font-bold text-white mt-2">{data?.skills?.length || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#C778DD]/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🛠️</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[#ABB2BF] text-sm">Services</p>
                            <p className="text-3xl font-bold text-white mt-2">{data?.services?.length || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#C778DD]/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💼</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[#ABB2BF] text-sm">Projects</p>
                            <p className="text-3xl font-bold text-white mt-2">{data?.projects?.length || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#C778DD]/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📁</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[#ABB2BF] text-sm">Career Milestones</p>
                            <p className="text-3xl font-bold text-white mt-2">{data?.career?.length || 0}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#C778DD]/20 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🏆</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Hero Section</h2>
                <div className="space-y-2 text-[#ABB2BF]">
                    <p><span className="font-medium text-white">Title:</span> {data?.hero?.title || 'Not set'}</p>
                    <p><span className="font-medium text-white">Subtitle:</span> {data?.hero?.subtitle || 'Not set'}</p>
                    <p><span className="font-medium text-white">Description:</span> {data?.hero?.description || 'Not set'}</p>
                    <p><span className="font-medium text-white">Current Status:</span> {data?.hero?.currentStatus || 'Not set'}</p>
                </div>
            </div>
        </div>
    );
}
