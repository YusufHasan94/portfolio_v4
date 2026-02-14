'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types/portfolio';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function SkillsAdmin() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [formData, setFormData] = useState({ name: '', image: '', category: 1 as 1 | 2 });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/portfolio/skills');
            const data = await response.json();
            setSkills(data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const url = '/api/portfolio/skills';
            const method = editingSkill ? 'PUT' : 'POST';
            const body = editingSkill
                ? { ...formData, id: editingSkill.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setMessage(editingSkill ? 'Skill updated!' : 'Skill added!');
                setShowForm(false);
                setEditingSkill(null);
                setFormData({ name: '', image: '', category: 1 });
                fetchSkills();
            }
        } catch (error) {
            console.error('Error saving skill:', error);
            setMessage('Error saving skill');
        }
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setFormData({ name: skill.name, image: skill.image, category: skill.category });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            const response = await fetch(`/api/portfolio/skills?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Skill deleted!');
                fetchSkills();
            }
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Skills Management</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingSkill(null);
                        setFormData({ name: '', image: '', category: 1 });
                    }}
                    className="flex items-center gap-2 bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Skill
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
                        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-white font-medium mb-2">Skill Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Icon Path</label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                placeholder="/assets/icons/skill.svg"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-white font-medium mb-2">Category (Marquee)</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: Number(e.target.value) as 1 | 2 })}
                            className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                        >
                            <option value={1}>Category 1 (First Marquee)</option>
                            <option value={2}>Category 2 (Second Marquee)</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            {editingSkill ? 'Update' : 'Add'} Skill
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingSkill(null);
                                setFormData({ name: '', image: '', category: 1 });
                            }}
                            className="bg-[#2c3036] hover:bg-[#2c3036]/80 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {skills && skills.length > 0 && skills.map((skill) => (
                    <div key={skill.id} className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">{skill.name}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="text-[#C778DD] hover:text-[#C778DD]/80 p-2"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    onClick={() => handleDelete(skill.id)}
                                    className="text-red-500 hover:text-red-400 p-2"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                        <p className="text-[#ABB2BF] text-sm mb-2">Category: {skill.category}</p>
                        <p className="text-[#ABB2BF] text-sm break-all">{skill.image}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
