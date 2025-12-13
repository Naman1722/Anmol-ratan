import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { addAdminUser, addAdminBhajan } from "../api/api";

const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;


export default function AdminActivityPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [activeTab, setActiveTab] = useState<"user" | "bhajan">("user")
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

    // User Form State
    const [username, setUsername] = useState("")
    const [userPhone, setUserPhone] = useState("")

    // Bhajan Form State
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("Bhajan")
    const [lyrics, setLyrics] = useState("")

    const handleLogin = () => {
        if (password === ADMIN_SECRET) {
            setIsAuthenticated(true)
            setMessage(null)
        } else {
            setMessage({ text: "Invalid password", type: "error" })
        }
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await addAdminUser(username, userPhone, password);

            if (res.ok) {
                setMessage({ text: "User whitelisted successfully!", type: "success" })
                setUsername("")
                setUserPhone("")
            } else {
                setMessage({ text: res.message || "Failed to add user", type: "error" })
            }
        } catch (err) {
            setMessage({ text: "Server error", type: "error" })
        }
    }

    const handleAddBhajan = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await addAdminBhajan(title, category, lyrics, password);

            if (res.ok) {
                setMessage({ text: "Bhajan added successfully!", type: "success" })
                setTitle("")
                setLyrics("")
                setCategory("Bhajan")
            } else {
                setMessage({ text: res.message || "Failed to add bhajan", type: "error" })
            }
        } catch (err) {
            setMessage({ text: "Server error", type: "error" })
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                    <h1 className="text-xl font-bold mb-4 text-center">Admin Access</h1>
                    <Input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        className="mb-4"
                    />
                    {message && (
                        <p className={`text-sm mb-4 text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                            {message.text}
                        </p>
                    )}
                    <Button onClick={handleLogin} className="w-full bg-orange-600 hover:bg-orange-700">
                        Enter
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b">
                    <button
                        className={`pb-2 px-4 font-medium ${activeTab === "user" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-500"}`}
                        onClick={() => { setActiveTab("user"); setMessage(null); }}
                    >
                        Add User
                    </button>
                    <button
                        className={`pb-2 px-4 font-medium ${activeTab === "bhajan" ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-500"}`}
                        onClick={() => { setActiveTab("bhajan"); setMessage(null); }}
                    >
                        Add Bhajan
                    </button>
                </div>

                {/* Feedback Message */}
                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {message.text}
                    </div>
                )}

                {/* User Form */}
                {activeTab === "user" && (
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <Input
                                placeholder="e.g. John Doe"
                                value={username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                                placeholder="e.g. 1234567890 (No +91)"
                                value={userPhone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPhone(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Enter exact number as stored in user's device (usually without +91)</p>
                        </div>
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                            Whitelist User
                        </Button>
                    </form>
                )}

                {/* Bhajan Form */}
                {activeTab === "bhajan" && (
                    <form onSubmit={handleAddBhajan} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <Input
                                placeholder="Bhajan Title"
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <Input
                                placeholder="e.g. Aarti, Bhajan, Krishna"
                                value={category}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lyrics</label>
                            <Textarea
                                placeholder="Paste full lyrics here..."
                                value={lyrics}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLyrics(e.target.value)}
                                className="min-h-[200px]"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                            Add Bhajan
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}
