"use client"

import { useEffect, useRef } from "react";

interface BackgroundDecorationProps {
  className?: string;
}

export function BackgroundDecoration({ className = "" }: BackgroundDecorationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 创建装饰元素
    const elements = Array.from({ length: 5 }, (_, i) => {
      const element = document.createElement("div");
      element.className = `absolute rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl transition-transform duration-700 ease-out`;

      // 随机大小和位置
      const size = Math.random() * 200 + 100;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;

      container.appendChild(element);
      return element;
    });
    elementsRef.current = elements;

    // 鼠标移动处理函数
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      // 计算鼠标相对于容器的位置（-1 到 1）
      const x = (clientX - left) / width * 2 - 1;
      const y = (clientY - top) / height * 2 - 1;

      // 为每个元素应用不同的视差效果
      elements.forEach((element, index) => {
        const factor = 0.05 + index * 0.02; // 每个元素的移动系数不同
        const translateX = x * factor * 100;
        const translateY = y * factor * 100;

        // 使用 transform 实现平滑移动
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    // 添加事件监听
    window.addEventListener("mousemove", handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      elements.forEach(element => element.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
    />
  );
} 