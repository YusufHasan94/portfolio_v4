'use client';

import { useEffect, useState } from 'react';
import { CareerMilestone } from '@/types/portfolio';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function CareerAdmin() {
    const [career, setCareer] = useState<CareerMilestone[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState<CareerMilestone | null>(null);
    const [formData, setFormData] = useState({
        company: '',
        company_url: '',
        title: '',
        description: '',
        starting: '',
        ending: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCareer();
    }, []);

    const fetchCareer = async () => {
        try {
            const response = await fetch('/api/portfolio/career');
            const data = await response.json();
            setCareer(data);
        } catch (error) {
            console.error('Error fetching career data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const url = '/api/portfolio/career';
            const method = editingMilestone ? 'PUT' : 'POST';
            const body = editingMilestone
                ? { ...formData, id: editingMilestone.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setMessage(editingMilestone ? 'Career milestone updated!' : 'Career milestone added!');
                setShowForm(false);
                setEditingMilestone(null);
                setFormData({ company: '', company_url: '', title: '', description: '', starting: '', ending: '' });
                fetchCareer();
            }
        } catch (error) {
            console.error('Error saving career milestone:', error);
            setMessage('Error saving career milestone');
        }
    };

    const handleEdit = (milestone: CareerMilestone) => {
        setEditingMilestone(milestone);
        setFormData({
            company: milestone.company,
            company_url: milestone.company_url,
            title: milestone.title,
            description: milestone.description,
            starting: milestone.starting,
            ending: milestone.ending
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this career milestone?')) return;

        try {
            const response = await fetch(`/api/portfolio/career?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Career milestone deleted!');
                fetchCareer();
            }
        } catch (error) {
            console.error('Error deleting career milestone:', error);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Career Management</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingMilestone(null);
                        setFormData({ company: '', company_url: '', title: '', description: '', starting: '', ending: '' });
                    }}
                    className="flex items-center gap-2 bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Milestone
                </button>
            </div>

            {message && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500 text-green-500">
                    {message}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {editingMilestone ? 'Edit Career Milestone' : 'Add New Career Milestone'}
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white font-medium mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Company URL</label>
                                <input
                                    type="url"
                                    value={formData.company_url}
                                    onChange={(e) => setFormData({ ...formData, company_url: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Job Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD] min-h-32"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white font-medium mb-2">Start Date</label>
                                <input
                                    type="text"
                                    value={formData.starting}
                                    onChange={(e) => setFormData({ ...formData, starting: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    placeholder="e.g., March, 2024"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">End Date</label>
                                <input
                                    type="text"
                                    value={formData.ending}
                                    onChange={(e) => setFormData({ ...formData, ending: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    placeholder="e.g., present or December, 2024"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            className="bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            {editingMilestone ? 'Update' : 'Add'} Milestone
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingMilestone(null);
                                setFormData({ company: '', company_url: '', title: '', description: '', starting: '', ending: '' });
                            }}
                            className="bg-[#2c3036] hover:bg-[#2c3036]/80 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {career && career.length > 0 && career.map((milestone) => (
                    <div key={milestone.id} className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                                <a
                                    href={milestone.company_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#C778DD] hover:underline"
                                >
                                    {milestone.company}
                                </a>
                                <p className="text-[#ABB2BF] text-sm mt-1">
                                    {milestone.starting} - {milestone.ending}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(milestone)}
                                    className="text-[#C778DD] hover:text-[#C778DD]/80 p-2"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    onClick={() => handleDelete(milestone.id)}
                                    className="text-red-500 hover:text-red-400 p-2"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                        <p className="text-[#ABB2BF]">{milestone.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
