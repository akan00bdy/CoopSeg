"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.backendTokens.accessToken);
      alert("Login bem-sucedido!");
      router.push("/news");
    } else {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-green-700 text-center">CoopSeg</h2>
        <p className="text-gray-600 text-center mb-6">Entre na sua conta</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full pl-10 p-2 border border-gray-300 rounded placeholder-gray-500 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="********"
              className="w-full pl-10 p-2 border border-gray-300 rounded placeholder-gray-500 text-gray-800" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full flex items-center justify-center bg-green-600 text-white p-2 rounded hover:bg-green-700">
            <FaLock className="mr-2" /> Entrar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Não possui conta?{" "}
          <span className="text-green-600 cursor-pointer" onClick={() => router.push("/register")}>
            Criar
          </span>
        </p>
      </div>
    </div>
  );
}
