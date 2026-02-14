'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiUser, FiTool, FiBriefcase, FiFolder, FiAward, FiLogOut } from 'react-icons/fi';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Hero Section', href: '/admin/hero', icon: FiUser },
    { name: 'Skills', href: '/admin/skills', icon: FiTool },
    { name: 'Services', href: '/admin/services', icon: FiBriefcase },
    { name: 'Projects', href: '/admin/projects', icon: FiFolder },
    { name: 'Career', href: '/admin/career', icon: FiAward },
];

export default function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="w-64 bg-[#1e2024] border-r border-[#ABB2BF] min-h-screen p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">Portfolio Admin</h2>
                <p className="text-sm text-[#ABB2BF] mt-1">Content Management</p>
            </div>

            <ul className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-[#C778DD] text-white'
                                        : 'text-[#ABB2BF] hover:bg-[#2c3036] hover:text-white'
                                    }`}
                            >
                                <Icon className="text-xl" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#ABB2BF] hover:bg-[#2c3036] hover:text-white transition-colors w-full mt-8"
            >
                <FiLogOut className="text-xl" />
                <span className="font-medium">Logout</span>
            </button>
        </nav>
    );
}
