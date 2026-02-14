'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/types/portfolio';
import { FiEdit2, FiTrash2, FiPlus, FiUpload } from 'react-icons/fi';
import Image from 'next/image';

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/portfolio/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const url = '/api/portfolio/services';
            const method = editingService ? 'PUT' : 'POST';
            const body = editingService
                ? { ...formData, id: editingService.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setMessage(editingService ? 'Service updated!' : 'Service added!');
                setShowForm(false);
                setEditingService(null);
                setFormData({ title: '', description: '', image: '' });
                fetchServices();
            }
        } catch (error) {
            console.error('Error saving service:', error);
            setMessage('Error saving service');
        }
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({ title: service.title, description: service.description, image: service.image });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetch(`/api/portfolio/services?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setMessage('Service deleted!');
                fetchServices();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Services Management</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingService(null);
                        setFormData({ title: '', description: '', image: '' });
                    }}
                    className="flex items-center gap-2 bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <FiPlus /> Add Service
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
                        {editingService ? 'Edit Service' : 'Add New Service'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-medium mb-2">Service Title</label>
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
                                className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD] min-h-24"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Service Image</label>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#2c3036] border border-[#ABB2BF] rounded-lg text-white focus:outline-none focus:border-[#C778DD]"
                                        placeholder="/assets/services/service.webp"
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
                                    <Image src={formData.image} alt="Preview" width={160} height={120} className="rounded-lg" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button
                            type="submit"
                            className="bg-[#C778DD] hover:bg-[#C778DD]/90 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            {editingService ? 'Update' : 'Add'} Service
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingService(null);
                                setFormData({ title: '', description: '', image: '' });
                            }}
                            className="bg-[#2c3036] hover:bg-[#2c3036]/80 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services && services.length > 0 && services.map((service) => (
                    <div key={service.id} className="bg-[#1e2024] border border-[#ABB2BF] rounded-lg p-4">
                        {service.image && (
                            <Image src={service.image} alt={service.title} width={160} height={120} className="rounded-lg mb-3" />
                        )}
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-white font-semibold flex-1">{service.title}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="text-[#C778DD] hover:text-[#C778DD]/80 p-1"
                                >
                                    <FiEdit2 />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="text-red-500 hover:text-red-400 p-1"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                        <p className="text-[#ABB2BF] text-sm">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
