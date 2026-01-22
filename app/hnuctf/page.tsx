"use client"

import { motion } from "framer-motion"
import { MouseTrail } from "@/components/mouse-trail"
import { TerminalButton } from "@/components/terminal-button"
import { CyberParticles } from "@/components/cyber-particles"
import { BackgroundDecoration } from "@/components/background-decoration"
import { Footer } from "@/components/footer"
import CurvedLoop from "@/components/curved-loop"
import SpotlightCard from "@/components/spotlight-card"
import Link from "next/link"
import {
  Calendar,
  Users,
  Flag,
  Clock,
  Award,
  Target,
  Shield,
  Code,
  Lock,
  ArrowRight,
  ChevronDown
} from "lucide-react"

// Competition card component
function CompetitionCard({
  title,
  date,
  status,
  participants,
  description
}: {
  title: string
  date: string
  status: "upcoming" | "ongoing" | "ended"
  participants?: number
  description: string
}) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-700 border-blue-300",
    ongoing: "bg-green-100 text-green-700 border-green-300",
    ended: "bg-gray-100 text-gray-600 border-gray-300"
  }

  const statusLabels = {
    upcoming: "即将开始",
    ongoing: "进行中",
    ended: "已结束"
  }

  return (
    <SpotlightCard
      className="bg-white/80 backdrop-blur-md border border-var-color-5/20 p-6 shadow-lg"
      spotlightColor="rgba(107, 107, 255, 0.15)"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="cursor-pointer transition-all h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-var-color-5/10 flex items-center justify-center">
              <Flag className="w-6 h-6 text-var-color-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {participants && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{participants} 人参与</span>
          </div>
        )}
      </motion.div>
    </SpotlightCard>
  )
}

export default function HnuCTFPage() {
  const competitions = [
    {
      title: "HnuCTF 2026 春季赛",
      date: "2026年2月 (预计)",
      status: "upcoming" as const,
      description: "面向海南大学全体学生的 CTF 入门级竞赛，涵盖 Web、Crypto、Misc 等多个方向。"
    },
    {
      title: "HnuCTF 2025 秋季赛",
      date: "2025年11月",
      status: "ended" as const,
      participants: 156,
      description: "2025年度秋季 CTF 竞赛，共设置 30 道题目，持续 48 小时。"
    },
    {
      title: "HnuCTF 2025 春季赛",
      date: "2025年4月",
      status: "ended" as const,
      participants: 128,
      description: "2025年度春季 CTF 竞赛，针对新生的入门级竞赛。"
    }
  ]

  const categories = [
    { icon: Code, title: "Web", description: "Web 安全、SQL 注入、XSS 等" },
    { icon: Lock, title: "Crypto", description: "密码学、加密算法分析" },
    { icon: Shield, title: "Pwn", description: "二进制漏洞利用" },
    { icon: Target, title: "Reverse", description: "逆向工程、程序分析" },
  ]

  return (
    <main className="relative min-h-screen bg-[#f0f0f5] text-black">
      <MouseTrail />
      <TerminalButton />
      <CyberParticles />
      <BackgroundDecoration />

      {/* Fixed Curved Loop Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 opacity-30 pointer-events-none">
        <CurvedLoop
          marqueeText="HnuCTF  •  CTF Competition  •  Hainan University  •  Security Challenge  •  "
          speed={1.5}
          direction="left"
          interactive={false}
          className="fill-purple-300 dark:fill-purple-400"
        />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiM2YjZiZmYwNSIgZmlsbC1vcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNMzAgMGgzMHYzMEgzMHpNMCAwaDMwdjMwSDB6IiBmaWxsPSIjNmI2YmZmMDUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Hero Section - Full Screen */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="flex flex-col items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6">
                Hnu<span className="text-var-color-5">CTF</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-2xl mx-auto mb-4">
                海南大学网络安全竞赛平台
              </p>
              <p className="text-lg md:text-xl text-var-color-5 font-medium">
                Powered by HnuSec
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="py-16">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { icon: Flag, value: "50+", label: "历届题目" },
              { icon: Users, value: "300+", label: "参赛选手" },
              { icon: Award, value: "3", label: "届赛事" },
              { icon: Clock, value: "48h", label: "每场时长" },
            ].map((stat, i) => (
              <SpotlightCard
                key={stat.label}
                className="bg-white/60 backdrop-blur-md border border-var-color-5/20 p-4 shadow-lg"
                spotlightColor="rgba(107, 107, 255, 0.15)"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center h-full"
                >
                  <stat.icon className="w-6 h-6 text-var-color-5 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              </SpotlightCard>
            ))}
          </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-var-color-5" />
            比赛方向
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <SpotlightCard
                key={cat.title}
                className="bg-white/60 backdrop-blur-md border border-var-color-5/20 p-6 shadow-lg"
                spotlightColor="rgba(107, 107, 255, 0.15)"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center h-full"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-var-color-5/10 flex items-center justify-center mb-4">
                    <cat.icon className="w-7 h-7 text-var-color-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{cat.title}</h3>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Competitions List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-var-color-5" />
            历届赛事
          </h2>
          <div className="space-y-4">
            {competitions.map((comp, i) => (
              <CompetitionCard key={i} {...comp} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-var-color-5/10 to-var-color-4/10 rounded-2xl border border-var-color-5/20 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">准备好挑战了吗？</h2>
          <p className="text-gray-600 mb-6">加入 HnuSec，参与下一届 HnuCTF 比赛！</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/recruitment/2026-winter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-var-color-5 text-white rounded-lg hover:bg-var-color-5/90 transition-colors font-medium"
            >
              立即加入
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-var-color-5/30 text-var-color-5 rounded-lg hover:bg-var-color-5/5 transition-colors font-medium"
            >
              返回首页
            </Link>
          </div>
        </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
