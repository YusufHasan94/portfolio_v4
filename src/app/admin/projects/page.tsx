'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { FiEdit2, FiTrash2, FiPlus, FiUpload, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        preview_url: '',
        type: 'frontend',
        tech_stack: [] as string[]
    });
    const [techInput, setTechInput] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/portfolio/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formDataObj = new FormData();
        formDataObj.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formDataObj,
            });

            const data = await response.json();
            if (response.ok) {
                setFormData({ ...formData, image: data.url });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    const addTech = () => {
        if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
            setFormData({ ...formData, tech_stack: [...formData.tech_stack, techInput.trim()] });
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData({ ...formData, tech_stack: formData.tech_stack.filter(t => t !== tech) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const url = '/api/portfolio/projects';
            const method = editingProject ? 'PUT' : 'POST';
            const body = editingProject
                ? { ...formData, id: editingProject.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setMessage(editingProject ? 'Project updated!' : 'Project added!');
                setShowForm(false);
                setEditingProject(null);
                setFormData({ name: '', description: '', image: '', preview_url: '', type: 'frontend', tech_stack: [] });
                fetchProjects();
            }
        } catch (error) {
            console.error('Error saving project:', error);
            setMessage('Error saving project');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            image: project.image,
            preview_url: project.preview_url,
            type: project.type,
            tech_stack: project.tech_stack
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/portfolio/projects?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Project deleted!');
                fetchProjects();
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Projects Management</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingProject(null);
                        setFormData({ name: '', description: '', image: '', preview_url: '', type: 'frontend', tech_stack: [] });
                    }}
                    className="flex items-center gap-2 bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Project
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
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h2>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white font-medium mb-2">Project Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Preview URL</label>
                                <input
                                    type="url"
                                    value={formData.preview_url}
                                    onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD] min-h-24"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Project Type</label>
                            <input
                                type="text"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                placeholder="e.g., frontend, fullstack, backend"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Tech Stack</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                    className="flex-1 px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                    placeholder="Add technology (press Enter)"
                                />
                                <button
                                    type="button"
                                    onClick={addTech}
                                    className="bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-4 rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.tech_stack.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center gap-2 bg-[#C778DD] text-white px-3 py-1 rounded-lg text-sm"
                                    >
                                        {tech}
                                        <button type="button" onClick={() => removeTech(tech)}>
                                            <FiX />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Project Image</label>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                        placeholder="/assets/projects/project.png"
                                        required
                                    />
                                </div>
                                <label className="flex items-center gap-2 bg-[#2c3036] hover:bg-[#2c3036]/80 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors">
                                    <FiUpload />
                                    {uploading ? 'Uploading...' : 'Upload'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            {formData.image && (
                                <div className="mt-2">
                                    <Image src={formData.image} alt="Preview" width={200} height={150} className="rounded-lg" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            className="bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            {editingProject ? 'Update' : 'Add'} Project
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingProject(null);
                                setFormData({ name: '', description: '', image: '', preview_url: '', type: 'frontend', tech_stack: [] });
                            }}
                            className="bg-[#2c3036] hover:bg-[#2c3036]/80 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects && projects.length > 0 && projects.map((project) => (
                    <div key={project.id} className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-4">
                        {project.image && (
                            <Image src={project.image} alt={project.name} width={300} height={200} className="rounded-lg mb-3 w-full" />
                        )}
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-semibold flex-1">{project.name}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="text-[#C778DD] hover:text-[#C778DD]/80 p-1"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="text-red-500 hover:text-red-400 p-1"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                        <p className="text-[#ABB2BF] text-sm mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {project.tech_stack.map((tech, idx) => (
                                <span key={idx} className="bg-[#C778DD] text-white px-2 py-0.5 rounded text-xs">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <a href={project.preview_url} target="_blank" rel="noopener noreferrer" className="text-[#C778DD] text-sm hover:underline">
                            View Project →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
