"use client";

import { useState } from "react";
import { generateBlueprint, ShortsCraftResponse } from "./actions";
import { 
  Zap, 
  Terminal, 
  User, 
  Search, 
  X, 
  Sparkles, 
  Copy, 
  Volume2, 
  Heart, 
  MessageCircle, 
  Bookmark,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Language = "id" | "en" | "ja";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeLang, setActiveLang] = useState<Language>("id");
  const [blueprint, setBlueprint] = useState<ShortsCraftResponse | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const handleCopy = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  const handleGenerate = async (customTopic?: string) => {
    const targetTopic = customTopic || topic;
    if (!targetTopic.trim()) return;
    
    setTopic(targetTopic);
    setIsLoading(true);
    
    // Simulation steps
    const stages = [
      { text: "Analyzing semantic context & psychological trigger...", pct: 25 },
      { text: "Engineering 5-second curiosity gap hook...", pct: 55 },
      { text: "Directing kinetic pacing & sound architecture...", pct: 80 },
      { text: "Formulating Midjourney v6 hyper-realistic prompt...", pct: 100 }
    ];

    for (const stage of stages) {
      setProgressText(stage.text);
      setProgress(stage.pct);
      await new Promise((r) => setTimeout(r, 400));
    }

    try {
      const data = await generateBlueprint(targetTopic);
      setBlueprint(data);
    } catch (error) {
      console.error(error);
      setToastMessage("Failed to generate blueprint.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2600);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden selection:bg-accent/20 selection:text-foreground">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border shadow-lg"
          >
            <div className="w-6 h-6 rounded-full bg-card-low text-accent flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[14px]">Copied to Clipboard</span>
              <span className="font-mono text-[11px] text-muted-foreground">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto h-16 px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="font-semibold text-[16px] tracking-tight">ShortsCraft</span>
              <span className="text-[11px] font-mono text-accent ml-1">Studio</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-[12px] font-mono text-muted-foreground gap-1.5 border border-border rounded-lg px-2 py-1 bg-card">
              {(["id", "en", "ja"] as Language[]).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-1 font-bold uppercase transition-colors ${activeLang === lang ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <a className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-mono text-muted-foreground hover:text-primary px-3 py-1.5 rounded-lg border border-border bg-card transition-colors" href="#">
              <Terminal size={14} className="text-accent" />
              <span>v1.4 API</span>
            </a>
            <div className="w-8 h-8 rounded-full bg-card-low border border-border flex items-center justify-center text-muted-foreground">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full pt-28 flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full px-6 lg:px-12 pb-12 overflow-hidden">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-[11px] font-mono text-accent tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              <span>Qwen 3.8 27B • &lt;500ms Latency</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] leading-[1.15] tracking-tight font-medium mb-3">
              Engineered for Viral Retention.<br/>
              <span className="text-accent font-normal italic">5-Second Hooks & Storyboards.</span>
            </h1>
            <p className="text-[15px] sm:text-[16px] text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Transform historical archives and curiosities into director-grade vertical short-form blueprints.
            </p>
            
            <div className="w-full max-w-2xl bg-card border border-border focus-within:border-primary hover:border-accent rounded-xl p-1.5 flex items-center shadow-sm transition-all mb-4">
              <div className="pl-3 pr-2 text-muted-foreground flex items-center">
                <Search size={20} />
              </div>
              <input 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                className="w-full bg-transparent py-2.5 px-2 text-[14px] placeholder:text-muted-foreground/60 focus:outline-none" 
                placeholder="Topic or archive mystery..." 
              />
              {topic && (
                <button onClick={() => setTopic("")} className="text-muted-foreground hover:text-primary px-2 transition-colors">
                  <X size={16} />
                </button>
              )}
              <button 
                onClick={() => handleGenerate()}
                disabled={isLoading || !topic.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-medium transition-all shrink-0 shadow-sm disabled:opacity-50"
              >
                <Sparkles size={15} />
                <span>{isLoading ? 'Synthesizing...' : 'Generate'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-wide opacity-70">Trending:</span>
              {["Jalan Raya Pos Daendels", "Misteri Palung Mariana", "Harta Karun VOC", "Ledakan Krakatau 1883"].map((t) => (
                <button key={t} onClick={() => handleGenerate(t)} className="hover:text-primary underline decoration-border underline-offset-4 transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Bar / Latency HUD */}
        <section className="w-full px-6 lg:px-12 mb-10">
          <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-muted-foreground py-2 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-accent animate-pulse' : blueprint ? 'bg-green-600' : 'bg-accent/50'}`}></span>
                  <span className="text-primary font-medium uppercase">{isLoading ? 'Synthesizing' : blueprint ? 'Generated' : 'Idle'}</span>
                </div>
                <span>•</span>
                <span>Latency: <strong className="text-primary font-medium">{blueprint ? `${blueprint.latencyMs}ms` : '--'}</strong></span>
                <span>•</span>
                <span>Model: <code className="text-primary">qwen/qwen3.8-27b</code></span>
              </div>
            </div>
            
            {isLoading && (
              <div className="rounded-lg bg-card border border-border p-2 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-primary">{progressText}</span>
                  <span className="text-accent font-semibold">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-card-low rounded-full overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {blueprint && (
          <section className="w-full px-6 lg:px-12 mb-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: 8-Column Three-Pillar Vertical Architecture */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Pillar 01 */}
                <article className="relative rounded-2xl bg-card border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                    <div>
                      <span className="text-[10px] font-mono text-accent tracking-wider uppercase font-semibold">Pillar 01 / Spoken Hook</span>
                      <h2 className="text-[16px] font-semibold">The 5-Second Retention Anchor</h2>
                    </div>
                    <div className="inline-flex items-center text-[11px] font-mono border border-border rounded-lg p-0.5 bg-background">
                      {(["id", "en", "ja"] as Language[]).map(lang => (
                        <button 
                          key={lang}
                          onClick={() => setActiveLang(lang)}
                          className={`px-3 py-1 rounded-md transition-all font-medium uppercase ${activeLang === lang ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-primary hover:bg-card-low'}`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-5 border border-border mb-4">
                    <p className="text-[18px] sm:text-[20px] font-medium italic leading-snug">
                      {blueprint.pillar1_hook.translations[activeLang]}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card-low/50 border border-border text-[12px] text-muted-foreground mb-4 leading-relaxed">
                    <strong className="text-primary mr-1">{blueprint.pillar1_hook.psychologicalBreakdown.patternInterrupt}:</strong> 
                    {blueprint.pillar1_hook.psychologicalBreakdown.mechanism}
                  </div>
                  <div className="flex items-center justify-end text-[11px] font-mono">
                    <button 
                      onClick={() => handleCopy(blueprint.pillar1_hook.translations[activeLang], "Hook script copied!")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-card-low transition-colors"
                    >
                      <Copy size={14} className="text-accent" />
                      <span>Copy Script</span>
                    </button>
                  </div>
                </article>

                {/* Pillar 02 */}
                <article className="relative rounded-2xl bg-card border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                    <div>
                      <span className="text-[10px] font-mono text-accent tracking-wider uppercase font-semibold">Pillar 02 / Visual Direction</span>
                      <h2 className="text-[16px] font-semibold">Kinetic Pacing & Audio Blueprint</h2>
                    </div>
                    <span className="text-[11px] font-mono text-accent">{blueprint.pillar2_pacing.cadence}</span>
                  </div>
                  <div className="flex flex-col gap-3 mb-4">
                    {blueprint.pillar2_pacing.cuts.map((cut, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-background border border-border">
                        <span className="font-mono text-[11px] font-semibold text-accent shrink-0 pt-0.5">{cut.timeframe}</span>
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] uppercase text-muted-foreground mb-0.5">Cut 0{idx + 1} • {cut.cameraMove}</span>
                          <p className="text-[13px]">{cut.visualDescription}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-card-low/50 border border-border flex items-center justify-between text-[11px] font-mono">
                    <span>🔊 {blueprint.pillar2_pacing.audioArchitecture}</span>
                    <button 
                      onClick={() => handleCopy(JSON.stringify(blueprint.pillar2_pacing.cuts, null, 2), "Direction blueprint copied!")}
                      className="hover:text-accent transition-colors flex items-center gap-1 font-medium"
                    >
                      <Copy size={13} />
                      <span>Copy</span>
                    </button>
                  </div>
                </article>

                {/* Pillar 03 */}
                <article className="relative rounded-2xl bg-card border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
                    <div>
                      <span className="text-[10px] font-mono text-accent tracking-wider uppercase font-semibold">Pillar 03 / Generative Asset</span>
                      <h2 className="text-[16px] font-semibold">Cinematic Image Prompt</h2>
                    </div>
                    <span className="text-[11px] font-mono text-accent">{blueprint.pillar3_genai.engine}</span>
                  </div>
                  <div className="bg-background rounded-xl p-4 border border-border mb-4">
                    <p className="font-mono text-[12px] leading-relaxed select-all">
                      {blueprint.pillar3_genai.midjourneyPrompt} {blueprint.pillar3_genai.flags.join(" ")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      {blueprint.pillar3_genai.flags.map(flag => (
                        <span key={flag} className="px-2 py-0.5 rounded bg-card-low">{flag}</span>
                      ))}
                    </div>
                    <button 
                      onClick={() => handleCopy(`${blueprint.pillar3_genai.midjourneyPrompt} ${blueprint.pillar3_genai.flags.join(" ")}`, "Prompt copied!")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-card-low transition-colors"
                    >
                      <Copy size={14} className="text-accent" />
                      <span>Copy Prompt</span>
                    </button>
                  </div>
                </article>

              </div>

              {/* Right: 4-Column Live 9:16 Vertical Stage */}
              <aside className="lg:col-span-4 sticky top-28 flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <span className="font-mono text-[11px] font-medium uppercase">9:16 Stage Simulator</span>
                </div>
                <div className="relative w-full max-w-[300px] aspect-[9/19] rounded-[36px] bg-card p-2 shadow-sm border border-border overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-primary rounded-full z-30"></div>
                  
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden flex flex-col justify-between p-4 z-10 bg-[#1B1C1A]">
                    {/* Mock Image BG */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('/mock-bg.png')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"></div>
                    
                    <div className="relative z-20 flex items-center justify-between pt-4 text-white">
                      <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded-full border border-white/10 truncate max-w-[120px]">
                        {blueprint.topic}
                      </span>
                      <span className="text-[10px] font-mono text-white/70">0:04</span>
                    </div>

                    <div className="absolute right-2.5 bottom-20 z-20 flex flex-col items-center gap-4 text-white">
                      <div className="flex flex-col items-center"><Heart size={20} fill="currentColor" /><span className="text-[9px] font-mono mt-1">148K</span></div>
                      <div className="flex flex-col items-center"><MessageCircle size={20} fill="currentColor" /><span className="text-[9px] font-mono mt-1">2.8K</span></div>
                      <div className="flex flex-col items-center"><Bookmark size={20} fill="currentColor" /><span className="text-[9px] font-mono mt-1">34K</span></div>
                    </div>

                    <div className="relative z-20 flex flex-col gap-2">
                      <span className="text-[11px] font-semibold text-white tracking-tight">@shortscraft</span>
                      <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                        <span className="text-[9px] font-mono text-[#D8CEB7] block mb-1 uppercase">CAPTION • {activeLang}</span>
                        <p className="text-[11px] text-white leading-snug line-clamp-3">
                          {blueprint.pillar1_hook.translations[activeLang]}
                        </p>
                      </div>
                      <div className="w-full flex items-center gap-1.5 mt-1">
                        <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white/80 w-1/5"></div>
                        </div>
                        <span className="text-[9px] font-mono text-white/60">0:04 / 0:58</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 w-full max-w-[300px] flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>Safe Zone: Verified</span>
                  <button onClick={() => {
                    setToastMessage("Playing simulated SFX...");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                  }} className="hover:text-primary transition-colors flex items-center gap-1">
                    <Volume2 size={13} />
                    <span>Audio Cue</span>
                  </button>
                </div>
              </aside>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border mt-auto py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>© 2026 ShortsCraft Studio. Designed for viral short-form video creators.</span>
            <span className="font-mono text-[11px] text-accent/80">• Next.js 14 + Groq</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
