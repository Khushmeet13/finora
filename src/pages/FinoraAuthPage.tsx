import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Phone, User } from "lucide-react";
import dashboard from "../assets/finora-dashboard.png";

export default function FinoraAuthPage() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl bg-slate-950/80 backdrop-blur-xl  rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2 shadow-blue-800"
            >
                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-between p-6 bg-gradient-to-br from-indigo-600 to-blue-900 text-white">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Finora</h1>
                        <p className="text-white/80 mb-4">
                            Track expenses, manage budgets, and understand your money better.
                        </p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                        alt="Dashboard preview"
                        className=" inset-0 w-full h-full object-cover opacity-80 rounded-xl shadow-xl"
                    />

                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="text-sm text-white/70 mt-4"
                    >
                        Smart finance tracking for modern users.
                    </motion.div>
                </div>

                {/* Form Section */}
                <div className="p-6 px-10 text-white">
                    <AnimatePresence mode="wait">
                        {isSignup ? (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

                                <div className="space-y-4">
                                    <Input icon={<User size={18} />} placeholder="Full Name" />
                                    <Input icon={<Mail size={18} />} placeholder="Email" />
                                    <Input icon={<Phone size={18} />} placeholder="Phone Number" />
                                    <Input icon={<Lock size={18} />} placeholder="Password" type="password" />
                                </div>

                                <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-3 font-medium">
                                    Sign up
                                </button>

                                <Divider />

                                <GoogleButton />

                                <p className="text-sm text-slate-400 mt-6">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setIsSignup(false)}
                                        className="text-indigo-400 cursor-pointer"
                                    >
                                        Login
                                    </span>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold mb-6">Welcome Back</h2>

                                <div className="space-y-4">
                                    <Input icon={<Mail size={18} />} placeholder="Email" />
                                    <Input icon={<Lock size={18} />} placeholder="Password" type="password" />
                                </div>

                                <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-3 font-medium">
                                    Login
                                </button>

                                <Divider />

                                <GoogleButton />

                                <p className="text-sm text-slate-400 mt-6">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={() => setIsSignup(true)}
                                        className="text-indigo-400 cursor-pointer"
                                    >
                                        Sign up
                                    </span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

function Input({ icon, placeholder, type = "text" }: any) {
    return (
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 focus-within:border-indigo-500 transition">
            {icon}
            <input
                type={type}
                placeholder={placeholder}
                className="bg-transparent outline-none w-full text-sm"
            />
        </div>
    );
}

function Divider() {
    return (
        <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="h-px bg-slate-800 flex-1" />
        </div>
    );
}

function GoogleButton() {
    return (
        <button className="w-full bg-white text-black rounded-xl py-3 font-medium hover:scale-[1.02] transition">
            Continue with Google
        </button>
    );
}
