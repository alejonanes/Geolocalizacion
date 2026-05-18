"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Wind, Mountain, Activity, Ruler, Radar, ChevronRight, Volume2 } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const ANIMALS = {
  bat: {
    id: 'bat',
    name: 'Murciélago',
    subtitle: 'Ecolocalización aérea',
    medium: 'Aire',
    c: 343,
    icon: Wind,
    image: '/bat.png',
    gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
    glowColor: 'rgba(34,211,238,0.4)',
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-500/20',
    ringColor: 'border-cyan-400/30',
    inputFocus: 'focus:ring-cyan-500/40 focus:border-cyan-400/30',
    description: 'Emite pulsos ultrasónicos de hasta 200 kHz que rebotan en los objetos para crear un mapa 3D del entorno.',
  },
  whale: {
    id: 'whale',
    name: 'Ballena',
    subtitle: 'Sonar oceánico profundo',
    medium: 'Agua',
    c: 1500,
    icon: Waves,
    image: '/whale.png',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    glowColor: 'rgba(99,102,241,0.4)',
    accentColor: 'text-indigo-400',
    accentBg: 'bg-indigo-500/20',
    ringColor: 'border-indigo-400/30',
    inputFocus: 'focus:ring-indigo-500/40 focus:border-indigo-400/30',
    description: 'Utiliza clics y cantos que viajan enormes distancias bajo el agua para comunicarse y localizar presas.',
  },
  elephant: {
    id: 'elephant',
    name: 'Elefante',
    subtitle: 'Infrasonido sísmico',
    medium: 'Tierra',
    c: 2500,
    icon: Mountain,
    image: '/elephant.png',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    glowColor: 'rgba(245,158,11,0.4)',
    accentColor: 'text-amber-400',
    accentBg: 'bg-amber-500/20',
    ringColor: 'border-amber-400/30',
    inputFocus: 'focus:ring-amber-500/40 focus:border-amber-400/30',
    description: 'Genera vibraciones de infrasonido a través del suelo que otros elefantes detectan con sus patas a kilómetros.',
  },
};

type AnimalId = keyof typeof ANIMALS;

/* ─── Floating Particles ─── */
function Particles() {
  const [particles, setParticles] = useState<{ id: number; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${15 + Math.random() * 20}s`,
        delay: `${Math.random() * 15}s`,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Sonar Rings ─── */
function SonarRings({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="sonar-pulse"
          style={{ borderColor: color, animationDelay: `${i * 1}s` }}
        />
      ))}
    </div>
  );
}

export default function BiosonarCalculator() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalId>('bat');
  const [echoTime, setEchoTime] = useState<string>('');
  const [emittedFreq, setEmittedFreq] = useState<string>('');
  const [targetVelocity, setTargetVelocity] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const animal = ANIMALS[selectedAnimal];

  const calcDistance = () => {
    const t = parseFloat(echoTime);
    if (isNaN(t) || t < 0) return null;
    return (animal.c * t) / 2;
  };

  const calcFrequency = () => {
    const fe = parseFloat(emittedFreq);
    const v = parseFloat(targetVelocity);
    if (isNaN(fe) || isNaN(v)) return null;
    return fe * (1 + (2 * v) / animal.c);
  };

  const distance = calcDistance();
  const receivedFreq = calcFrequency();
  const Icon = animal.icon;

  return (
    <>
      {/* ─── Background ─── */}
      <div className="bg-scene">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
      </div>
      <div className="star-grid" />
      {isHydrated && <Particles />}

      {/* ─── Main Content ─── */}
      <main className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-white/30 text-white flex flex-col items-center">
        <div className="w-full max-w-6xl space-y-16">

          {/* ─── Header ─── */}
          <header className="text-center space-y-6 pt-8">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/50 mb-6 tracking-wider uppercase">
                <Volume2 className="w-3.5 h-3.5" />
                Calculadora de Geolocalización Acústica
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40">
                  Bio
                </span>
                <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", animal.gradient)} style={{ transition: 'all 1s ease' }}>
                  sonar
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/40 font-medium max-w-xl mx-auto leading-relaxed">
                Explora cómo los animales usan ondas acústicas para percibir
                su entorno. Selecciona un animal y experimenta con los cálculos.
              </p>
            </motion.div>
          </header>

          {/* ─── Animal Selector ─── */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {(Object.keys(ANIMALS) as AnimalId[]).map((key) => {
                const a = ANIMALS[key];
                const isSelected = selectedAnimal === key;
                const AnimalIcon = a.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedAnimal(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative group overflow-hidden rounded-2xl p-5 transition-all duration-500 ease-out text-left card-hover",
                      "border glass-panel",
                      isSelected
                        ? `ring-1 ring-white/20 bg-white/[0.08] border-white/15`
                        : "border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                    )}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-white">{a.name}</h3>
                        <p className="text-xs text-white/40 mt-0.5 font-medium">{a.subtitle}</p>
                        <p className="text-xs text-white/30 mt-2 font-mono">
                          {a.medium} · c = {a.c} m/s
                        </p>
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl transition-all duration-500",
                        isSelected
                          ? `${a.accentBg} ${a.accentColor}`
                          : "bg-white/5 text-white/30 group-hover:text-white/60 group-hover:bg-white/10"
                      )}>
                        <AnimalIcon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selector-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${a.glowColor}, transparent)` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Background gradient on selected */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className={cn("absolute inset-0 opacity-[0.07] bg-gradient-to-br", a.gradient)}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>
          </section>

          {/* ─── Animal Showcase ─── */}
          <AnimatePresence mode="wait">
            <motion.section
              key={selectedAnimal}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Animal Image */}
                <div className="relative">
                  <div className="animal-image-container">
                    {/* Glow behind animal */}
                    <div
                      className="animal-image-glow"
                      style={{ background: `radial-gradient(circle, ${animal.glowColor}, transparent 70%)` }}
                    />
                    {/* Sonar rings */}
                    <SonarRings color={animal.glowColor} />
                    {/* Animal image */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10"
                    >
                      <Image
                        src={animal.image}
                        alt={animal.name}
                        width={420}
                        height={420}
                        className="w-full h-auto drop-shadow-2xl"
                        priority
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Animal Info */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4", animal.accentBg, animal.accentColor)}>
                      <Icon className="w-3.5 h-3.5" />
                      {animal.medium}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                      {animal.name}
                    </h2>
                    <p className="text-lg text-white/40 font-medium mt-1">
                      {animal.subtitle}
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="text-white/50 leading-relaxed text-base"
                  >
                    {animal.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex gap-6"
                  >
                    <div className="glass-panel rounded-xl px-5 py-3">
                      <p className="text-xs text-white/40 font-medium mb-0.5">Velocidad del sonido</p>
                      <p className={cn("text-2xl font-bold tracking-tight", animal.accentColor)}>
                        {animal.c.toLocaleString()} <span className="text-sm text-white/30">m/s</span>
                      </p>
                    </div>
                    <div className="glass-panel rounded-xl px-5 py-3">
                      <p className="text-xs text-white/40 font-medium mb-0.5">Medio</p>
                      <p className="text-2xl font-bold tracking-tight text-white/80">
                        {animal.medium}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </AnimatePresence>

          {/* ─── Calculators Grid ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Distance Calculator */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="glass-panel rounded-3xl relative overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-8 pb-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className={cn("p-2.5 rounded-xl", animal.accentBg, animal.accentColor)}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Distancia</h2>
                    <p className="text-xs text-white/35 font-medium">Cálculo por tiempo de eco</p>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4 flex-1 flex flex-col">
                {/* Formula */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-xs text-white/30 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    R = (c · T) / 2
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Input */}
                <div className="space-y-2 mb-6">
                  <label className="flex items-center justify-between text-sm text-white/50 font-medium">
                    <span>Tiempo del eco (T)</span>
                    <span className="text-xs text-white/25">segundos</span>
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={echoTime}
                      onChange={(e) => setEchoTime(e.target.value)}
                      placeholder="Ej: 0.05"
                      step="0.01"
                      min="0"
                      className={cn("input-premium", animal.inputFocus)}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 font-mono text-sm">s</span>
                  </div>
                </div>

                <div className="flex-1" />

                {/* Result */}
                <div className="result-shimmer bg-white/[0.03] -mx-8 -mb-0 px-8 py-7 border-t border-white/5 rounded-b-3xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-white/35 uppercase tracking-wider">
                      Distancia estimada (R)
                    </p>
                    <Ruler className={cn("w-4 h-4", animal.accentColor, "opacity-50")} />
                  </div>
                  <div className="flex items-baseline gap-3">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={distance !== null ? distance.toFixed(2) : 'empty'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-5xl font-extrabold tracking-tighter text-white"
                      >
                        {distance !== null
                          ? distance.toLocaleString('en-US', { maximumFractionDigits: 2 })
                          : '—'}
                      </motion.span>
                    </AnimatePresence>
                    <span className={cn("text-lg font-semibold tracking-wide", animal.accentColor)}>
                      metros
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Doppler Calculator */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-panel rounded-3xl relative overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-8 pb-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                    <Radar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Efecto Doppler</h2>
                    <p className="text-xs text-white/35 font-medium">Cambio de frecuencia por movimiento</p>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4 flex-1 flex flex-col">
                {/* Formula */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-xs text-white/30 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    f<sub>r</sub> = f<sub>e</sub> (1 + 2v/c)
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Inputs */}
                <div className="space-y-5 mb-6">
                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm text-white/50 font-medium">
                      <span>Frecuencia emitida (f<sub>e</sub>)</span>
                      <span className="text-xs text-white/25">kHz</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={emittedFreq}
                        onChange={(e) => setEmittedFreq(e.target.value)}
                        placeholder="Ej: 50"
                        step="0.1"
                        min="0"
                        className="input-premium focus:ring-purple-500/40 focus:border-purple-400/30"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 font-mono text-sm">kHz</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm text-white/50 font-medium">
                      <span>Velocidad del objetivo (v)</span>
                      <span className="text-xs text-white/25">m/s</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={targetVelocity}
                        onChange={(e) => setTargetVelocity(e.target.value)}
                        placeholder="Ej: 10 (acerca) o -10 (aleja)"
                        step="0.1"
                        className="input-premium focus:ring-purple-500/40 focus:border-purple-400/30"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 font-mono text-sm">m/s</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1" />

                {/* Result */}
                <div className="result-shimmer bg-white/[0.03] -mx-8 -mb-0 px-8 py-7 border-t border-white/5 rounded-b-3xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-white/35 uppercase tracking-wider">
                      Frecuencia recibida (f<sub>r</sub>)
                    </p>
                    <Radar className="w-4 h-4 text-purple-400 opacity-50" />
                  </div>
                  <div className="flex items-baseline gap-3">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={receivedFreq !== null ? receivedFreq.toFixed(2) : 'empty'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-5xl font-extrabold tracking-tighter text-white"
                      >
                        {receivedFreq !== null
                          ? receivedFreq.toLocaleString('en-US', { maximumFractionDigits: 2 })
                          : '—'}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-lg text-purple-400 font-semibold tracking-wide">
                      kHz
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* ─── Footer ─── */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-8"
          >
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
            <p className="text-xs text-white/20 font-medium tracking-wider">
              BIOSONAR — Geolocalización Acústica Animal
            </p>
          </motion.footer>
        </div>
      </main>
    </>
  );
}
