import {Analytics} from "@vercel/analytics/react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowUp,FolderKanban, Award,
  Download, Sun, Moon, MapPin, Terminal, Briefcase, GraduationCap,
  Code2, Database, Server, Cpu, Wrench, Zap, Users, Star,
  CheckCircle, Globe, GitBranch
} from "lucide-react";

// ─── Shared styles injected globally ────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; font-family: 'Inter', sans-serif; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(79,140,255,.4); border-radius: 2px; }

  @keyframes float      { 0%,100%{ transform:translateY(0); }    50%{ transform:translateY(-18px); } }
  @keyframes floatB     { 0%,100%{ transform:translateY(0) rotate(0deg); } 50%{ transform:translateY(-12px) rotate(6deg); } }
  @keyframes floatC     { 0%,100%{ transform:translateY(0) rotate(0deg); } 50%{ transform:translateY(-22px) rotate(-4deg); } }
  @keyframes spinSlow   { to { transform:rotate(360deg); } }
  @keyframes pulseRing  { 0%,100%{ opacity:.4; transform:scale(1); }    50%{ opacity:.9; transform:scale(1.06); } }
  @keyframes gradientX  { 0%,100%{ background-position:0% 50%; }        50%{ background-position:100% 50%; } }
  @keyframes blinkCursor{ 0%,100%{ opacity:1; } 50%{ opacity:0; } }
  @keyframes particle   { 0%{ opacity:0; transform:translateY(0) scale(0); } 20%{ opacity:1; } 80%{ opacity:.4; } 100%{ opacity:0; transform:translateY(-80px) scale(1.2); } }
  @keyframes slideUp    { from{ opacity:0; transform:translateY(28px); } to{ opacity:1; transform:translateY(0); } }
  @keyframes shimmer    { 0%{ background-position:-200% center; } 100%{ background-position:200% center; } }
  @keyframes glowPulse  { 0%,100%{ box-shadow:0 0 20px rgba(79,140,255,.2); } 50%{ box-shadow:0 0 50px rgba(139,92,246,.45), 0 0 80px rgba(79,140,255,.2); } }
  @keyframes loadBar    { from{ width:0; } to{ width:100%; } }
  @keyframes typeWriter { from{ width:0; } to{ width:100%; } }
  @keyframes borderSpin { to{ --angle:360deg; } }

  .af   { animation:float   6s  ease-in-out infinite; }
  .afb  { animation:floatB  8s  ease-in-out infinite 1.5s; }
  .afc  { animation:floatC  10s ease-in-out infinite 3s; }
  .afs  { animation:spinSlow 20s linear infinite; }
  .apr  { animation:pulseRing 3s ease-in-out infinite; }
  .agx  { animation:gradientX 4s ease infinite; background-size:200% 200%; }
  .ablk { animation:blinkCursor 1.1s step-end infinite; }
  .aglow{ animation:glowPulse 3s ease-in-out infinite; }

  .reveal{
    opacity:0; transform:translateY(24px);
    transition:opacity .65s ease, transform .65s ease;
  }
  .reveal.vis{ opacity:1; transform:translateY(0); }
  .rl{ opacity:0; transform:translateX(-24px); transition:opacity .65s ease, transform .65s ease; }
  .rl.vis{ opacity:1; transform:translateX(0); }
  .rr{ opacity:0; transform:translateX(24px); transition:opacity .65s ease, transform .65s ease; }
  .rr.vis{ opacity:1; transform:translateX(0); }

  .glass{
    background:rgba(255,255,255,.045);
    backdrop-filter:blur(20px) saturate(180%);
    -webkit-backdrop-filter:blur(20px) saturate(180%);
    border:1px solid rgba(255,255,255,.09);
  }
  .glass-lm{
    background:rgba(255,255,255,.85);
    backdrop-filter:blur(20px) saturate(180%);
    -webkit-backdrop-filter:blur(20px) saturate(180%);
    border:1px solid rgba(0,0,0,.08);
  }

  .tg{
    background:linear-gradient(135deg,#4F8CFF 0%,#8B5CF6 50%,#22D3EE 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .tga{
    background:linear-gradient(135deg,#4F8CFF,#8B5CF6,#22D3EE,#4F8CFF);
    background-size:300% 300%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:gradientX 4s ease infinite;
  }

  .btnp{
    background:linear-gradient(135deg,#4F8CFF,#8B5CF6);
    transition:all .3s ease; position:relative; overflow:hidden;
  }
  .btnp:hover{ transform:translateY(-2px); box-shadow:0 12px 40px rgba(79,140,255,.45); }
  .btnp::before{
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,#8B5CF6,#22D3EE);
    opacity:0; transition:opacity .3s ease; border-radius:inherit;
  }
  .btnp:hover::before{ opacity:1; }
  .btnp > *{ position:relative; z-index:1; }

  .btno{
    border:1.5px solid rgba(79,140,255,.5);
    transition:all .3s ease;
    background:transparent;
  }
  .btno:hover{
    border-color:#4F8CFF;
    background:rgba(79,140,255,.08);
    transform:translateY(-2px);
    box-shadow:0 8px 30px rgba(79,140,255,.2);
  }

  .hov-lift{ transition:transform .3s ease, box-shadow .3s ease; }
  .hov-lift:hover{ transform:translateY(-6px); box-shadow:0 20px 60px rgba(79,140,255,.15); }

  .skill-pill{ transition:all .25s ease; }
  .skill-pill:hover{ transform:translateY(-3px); box-shadow:0 8px 24px rgba(79,140,255,.25); }

  .nav-link{ position:relative; transition:color .2s ease; }
  .nav-link::after{
    content:''; position:absolute; bottom:-3px; left:0;
    width:0; height:1.5px;
    background:linear-gradient(90deg,#4F8CFF,#8B5CF6);
    transition:width .3s ease;
  }
  .nav-link:hover::after,.nav-link.active::after{ width:100%; }

  .proj-card{
    transition:all .35s ease;
    position:relative;
  }
  .proj-card::before{
    content:''; position:absolute; inset:-1px; border-radius:21px;
    background:linear-gradient(135deg,#4F8CFF22,#8B5CF622,#22D3EE22);
    z-index:0; transition:background .35s ease;
  }
  .proj-card:hover::before{
    background:linear-gradient(135deg,#4F8CFF55,#8B5CF655,#22D3EE55);
  }
  .proj-card:hover{ transform:translateY(-8px); box-shadow:0 30px 80px rgba(79,140,255,.2); }
  .proj-card > *{ position:relative; z-index:1; }

  #cursor-glow{
    position:fixed; pointer-events:none; z-index:9990;
    width:500px; height:500px; border-radius:50%;
    background:radial-gradient(circle,rgba(79,140,255,.07) 0%,rgba(139,92,246,.04) 40%,transparent 70%);
    transform:translate(-50%,-50%);
    transition:left .15s ease, top .15s ease;
  }

  .timeline-dot{
    width:14px; height:14px; border-radius:50%;
    background:linear-gradient(135deg,#4F8CFF,#8B5CF6);
    box-shadow:0 0 16px rgba(79,140,255,.5);
    flex-shrink:0;
  }
  .timeline-line{
    width:2px; flex:1; min-height:40px;
    background:linear-gradient(to bottom,rgba(79,140,255,.4),rgba(139,92,246,.15));
  }

  .tag{
    display:inline-flex; align-items:center; gap:4px;
    padding:3px 10px; border-radius:999px; font-size:11px; font-weight:500;
    background:rgba(79,140,255,.12); color:#4F8CFF;
    border:1px solid rgba(79,140,255,.2);
  }

  .section-label{
    display:inline-flex; align-items:center; gap:8px;
    font-size:12px; font-weight:600; letter-spacing:2px; text-transform:uppercase;
    color:#4F8CFF; margin-bottom:12px;
  }
  .section-label::before{
    content:''; width:20px; height:1.5px;
    background:linear-gradient(90deg,#4F8CFF,#8B5CF6);
  }

  input::placeholder, textarea::placeholder{ color:rgba(148,163,184,.5); }

  @media(max-width:768px){
    .hide-mobile{ display:none !important; }
    .hero-grid{ grid-template-columns:1fr !important; }
    .stats-grid{ grid-template-columns:repeat(2,1fr) !important; }
    .skills-grid{ grid-template-columns:1fr 1fr !important; }
    .projects-grid{ grid-template-columns:1fr !important; }
    .edu-grid{ grid-template-columns:1fr !important; }
    .why-grid{ grid-template-columns:1fr 1fr !important; }
  }
  @media(max-width:480px){
    .stats-grid{ grid-template-columns:1fr 1fr !important; }
    .why-grid{ grid-template-columns:1fr !important; }
    .skills-grid{ grid-template-columns:1fr !important; }
  }
`;

// ─── Loading Screen ──────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(id); setTimeout(onDone, 250); return 100; }
        return p + 1.8;
      });
    }, 30);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#09090B", zIndex: 10000,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32
    }}>
      <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="afs" style={{
          position: "absolute", inset: -12, borderRadius: "50%",
          border: "1.5px solid transparent",
          borderTopColor: "#4F8CFF", borderRightColor: "#8B5CF6"
        }} />
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: "linear-gradient(135deg,#4F8CFF,#8B5CF6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff",
          boxShadow: "0 0 40px rgba(79,140,255,.5)"
        }}>GS</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 220, height: 2, background: "rgba(255,255,255,.08)",
          borderRadius: 1, overflow: "hidden"
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg,#4F8CFF,#8B5CF6,#22D3EE)",
            transition: "width .08s ease", borderRadius: 1
          }} />
        </div>
        <span style={{ color: "rgba(255,255,255,.3)", fontSize: 11, fontFamily: "'Inter',sans-serif", letterSpacing: 3 }}>
          LOADING {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

// ─── Cursor Glow ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return <div id="cursor-glow" ref={ref} />;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Skills", "Experience", "Projects", "Education", "Contact"];

function Navbar({ isDark, setIsDark }: { isDark: boolean; setIsDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  // ─── scroll background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── manual scroll spy (SAFE - no IntersectionObserver errors)
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = NAV_LINKS.map((l) =>
        document.getElementById(l.toLowerCase())
      );

      let current = "Home";

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
          current = NAV_LINKS[index];
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });

    setMenuOpen(false);
  };

  const navBg = scrolled
    ? isDark
      ? "rgba(9,9,11,.9)"
      : "rgba(248,250,252,.9)"
    : "transparent";

  const textColor = isDark ? "#f1f5f9" : "#0f172a";

  const borderColor = scrolled
    ? isDark
      ? "rgba(255,255,255,.08)"
      : "rgba(0,0,0,.08)"
    : "transparent";

  return (
    <>
      {/* NAVBAR */}
  <nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    maxWidth: "100vw",
    boxSizing: "border-box",
    height: "70px",
    zIndex: 99999,
    overflow: "hidden",
  }}
>
       <div
  style={{
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 12px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  }}
>
          {/* LOGO */}
          <button
            onClick={() => scrollTo("home")}
            style={{
              width: 42,
              height: 42,
              borderRadius: 11,
              background: "linear-gradient(135deg,#4F8CFF,#8B5CF6)",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontWeight: 800,
            }}
          >
            GS
          </button>

          {/* DESKTOP LINKS */}
          <div className="hide-mobile" style={{ display: "flex", gap: 28 }}>
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  color:
                    active === l
                      ? "#4F8CFF"
                      : isDark
                      ? "rgba(255,255,255,.7)"
                      : "rgba(0,0,0,.6)",
                  position: "relative",
                }}
              >
                {l}

                {/* underline */}
                <span
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    height: 2,
                    width: active === l ? "100%" : "0%",
                    background: "linear-gradient(90deg,#4F8CFF,#8B5CF6)",
                    transition: "0.25s",
                  }}
                />
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Resume */}
            <button
              className="hide-mobile btnp"
              onClick={() =>
                window.open("/Shinde_Gayatri_Resume.pdf", "_blank")
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <Download size={14} />
              Resume
            </button>

            {/* Theme */}
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: isDark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(0,0,0,.06)",
                color: textColor,
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                color: textColor,
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 70,
            left: 0,
            right: 0,
            zIndex: 999,
            background: isDark
              ? "rgba(9,9,11,.97)"
              : "rgba(248,250,252,.97)",
            backdropFilter: "blur(20px)",
            padding: 20,
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                display: "block",
                width: "100%",
                padding: "12px 0",
                border: "none",
                background: "none",
                textAlign: "left",
                fontSize: 15,
                color: active === l ? "#4F8CFF" : textColor,
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
// ─── Hero Illustration ───────────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 540, height: 480, margin: "0 auto" }}>
      {/* Background glow blobs */}
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(79,140,255,.18) 0%,transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "blur(40px)"
      }} />
      <div style={{
        position: "absolute", width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 70%)",
        top: "20%", right: "10%", filter: "blur(30px)"
      }} />

      {/* Rotating ring */}
      <div className="afs" style={{
        position: "absolute", top: "50%", left: "50%",
        width: 360, height: 360, borderRadius: "50%",
        border: "1px dashed rgba(79,140,255,.15)",
        transform: "translate(-50%,-50%)"
      }} />
      <div className="afs" style={{
        position: "absolute", top: "50%", left: "50%",
        width: 440, height: 440, borderRadius: "50%",
        border: "1px dashed rgba(139,92,246,.08)",
        transform: "translate(-50%,-50%) rotate(30deg)",
        animationDuration: "14s"
      }} />

      {/* Laptop body */}
      <div className="af" style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-52%)",
        width: 280, height: 180,
      }}>
        {/* Screen */}
        <div style={{
          width: "100%", height: 160, borderRadius: "12px 12px 0 0",
          background: "rgba(15,15,20,.95)", border: "1.5px solid rgba(79,140,255,.3)",
          overflow: "hidden", position: "relative",
          boxShadow: "0 0 40px rgba(79,140,255,.15), inset 0 0 30px rgba(0,0,0,.5)"
        }}>
          {/* Screen top bar */}
          <div style={{
            height: 28, background: "rgba(255,255,255,.04)", display: "flex",
            alignItems: "center", padding: "0 12px", gap: 6,
            borderBottom: "1px solid rgba(255,255,255,.06)"
          }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: .8 }} />
            ))}
            <div style={{
              flex: 1, height: 14, background: "rgba(255,255,255,.06)", borderRadius: 4,
              marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,.3)", fontFamily: "'JetBrains Mono',monospace" }}>portfolio.tsx</span>
            </div>
          </div>
          {/* Code lines */}
          <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { indent: 0, color: "#8B5CF6", w: 90 },
              { indent: 16, color: "#4F8CFF", w: 120 },
              { indent: 32, color: "#22D3EE", w: 80 },
              { indent: 32, color: "#94a3b8", w: 140 },
              { indent: 16, color: "#4F8CFF", w: 60 },
              { indent: 16, color: "#22D3EE", w: 100 },
              { indent: 0, color: "#8B5CF6", w: 50 },
              { indent: 16, color: "#4ade80", w: 110 },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: l.indent }}>
                <div style={{ width: l.w, height: 5, borderRadius: 2, background: l.color, opacity: .7 }} />
                {i === 3 && <div style={{ width: 40, height: 5, borderRadius: 2, background: "#f472b6", opacity: .7 }} />}
              </div>
            ))}
            {/* Cursor blink */}
            <div style={{ paddingLeft: 16, display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{ width: 50, height: 5, borderRadius: 2, background: "#4F8CFF", opacity: .7 }} />
              <div className="ablk" style={{ width: 2, height: 10, background: "#4F8CFF", borderRadius: 1 }} />
            </div>
          </div>
        </div>
        {/* Keyboard base */}
        <div style={{
          width: "100%", height: 12, borderRadius: "0 0 6px 6px",
          background: "linear-gradient(180deg,rgba(30,30,40,.9),rgba(20,20,30,.9))",
          border: "1.5px solid rgba(79,140,255,.2)", borderTop: "none"
        }} />
        {/* Trackpad */}
        <div style={{
          width: 60, height: 8, borderRadius: 4, marginTop: 4, marginLeft: "auto", marginRight: "auto",
          background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)"
        }} />
      </div>

      {/* Floating tech badges */}
      <div className="afb" style={{
        position: "absolute", top: "12%", left: "5%",
        background: "rgba(20,184,166,.12)", border: "1px solid rgba(20,184,166,.3)",
        borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(12px)"
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#14b8a6", fontFamily: "'JetBrains Mono',monospace" }}>⚛ React.js</span>
      </div>

      <div className="afc" style={{
        position: "absolute", top: "10%", right: "4%",
        background: "rgba(79,140,255,.12)", border: "1px solid rgba(79,140,255,.3)",
        borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(12px)"
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#4F8CFF", fontFamily: "'JetBrains Mono',monospace" }}>▲ Next.js</span>
      </div>

      <div className="af" style={{
        position: "absolute", bottom: "22%", left: "2%",
        background: "rgba(139,92,246,.12)", border: "1px solid rgba(139,92,246,.3)",
        borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(12px)",
        animationDuration: "7s"
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#8B5CF6", fontFamily: "'JetBrains Mono',monospace" }}>⬡ Node.js</span>
      </div>

      <div className="afb" style={{
        position: "absolute", bottom: "20%", right: "2%",
        background: "rgba(34,211,238,.12)", border: "1px solid rgba(34,211,238,.3)",
        borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(12px)",
        animationDuration: "9s"
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#22D3EE", fontFamily: "'JetBrains Mono',monospace" }}>🗄 MongoDB</span>
      </div>

      <div className="afc" style={{
        position: "absolute", bottom: "6%", left: "25%",
        background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.25)",
        borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(12px)",
        animationDuration: "11s"
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#fbbf24", fontFamily: "'JetBrains Mono',monospace" }}>⚡ Express</span>
      </div>

      {/* Terminal window (top right) */}
      <div className="af" style={{
        position: "absolute", top: "30%", right: "0%",
        background: "rgba(10,10,15,.9)", border: "1px solid rgba(79,140,255,.2)",
        borderRadius: 10, padding: "10px 14px", backdropFilter: "blur(12px)",
        width: 130, animationDuration: "8s"
      }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, lineHeight: 1.8 }}>
          <div style={{ color: "#4ade80" }}>$ npm start</div>
          <div style={{ color: "rgba(255,255,255,.4)" }}>✓ Ready on</div>
          <div style={{ color: "#4F8CFF" }}>localhost:3000</div>
          <div style={{ color: "#8B5CF6" }}>▶ Compiled</div>
        </div>
      </div>

      {/* Floating dots */}
      {[
        { t: "8%", l: "45%", c: "#4F8CFF", s: 8, d: "3s" },
        { t: "45%", l: "3%", c: "#8B5CF6", s: 6, d: "5s" },
        { t: "80%", l: "50%", c: "#22D3EE", s: 7, d: "4s" },
        { t: "60%", l: "92%", c: "#4F8CFF", s: 5, d: "6s" },
        { t: "25%", l: "50%", c: "#8B5CF6", s: 4, d: "2s" },
      ].map((p, i) => (
        <div key={i} className="apr" style={{
          position: "absolute", top: p.t, left: p.l,
          width: p.s, height: p.s, borderRadius: "50%",
          background: p.c, animationDelay: p.d,
          boxShadow: `0 0 ${p.s * 2}px ${p.c}`,
          animationDuration: "3s"
        }} />
      ))}
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection({ isDark }: { isDark: boolean }) {
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  const subColor = isDark ? "#94a3b8" : "#475569";

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "100px 24px 60px", position: "relative", overflow: "hidden"
    }}>
      {/* Background blobs */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(79,140,255,.07) 0%,transparent 70%)",
        top: "-100px", left: "-200px", filter: "blur(60px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(139,92,246,.06) 0%,transparent 70%)",
        bottom: "-100px", right: "-100px", filter: "blur(60px)", pointerEvents: "none"
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center"
        }}>
          {/* Left */}
          <div style={{ animation: "slideUp .8s ease forwards" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(79,140,255,.1)", border: "1px solid rgba(79,140,255,.2)",
                borderRadius: 999, padding: "5px 14px"
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "#4F8CFF", fontFamily: "'Inter',sans-serif" }}>Open to Opportunities</span>
              </div>
            </div>

            <h1 style={{ fontFamily: "'Poppins',sans-serif", lineHeight: 1.1, margin: "0 0 16px" }}>
              <span style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, color: textColor, display: "block", marginBottom: 4 }}>
                Hi 👋 {"I'm"}
              </span>
              <span className="tga" style={{ fontSize: "clamp(42px,6vw,72px)", fontWeight: 900, display: "block" }}>
                Gayatri Shinde
              </span>
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ height: 1.5, width: 32, background: "linear-gradient(90deg,#4F8CFF,#8B5CF6)" }} />
              <span style={{
                fontFamily: "'Poppins',sans-serif", fontWeight: 600,
                fontSize: "clamp(16px,2.5vw,22px)", color: "#4F8CFF"
              }}>Full Stack Developer<br></br>
              Based in Nashik, Maharashtra 🇮🇳</span>
            </div>

            <p style={{
              fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.75,
              color: subColor, margin: "0 0 12px", maxWidth: 480
            }}>
            Building scalable and user-centric web applications using React.js, Next.js, Node.js, Express.js, REST APIs, and modern frontend technologies with a focus on performance and clean architecture.
            </p>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.7,
              color: isDark ? "#64748b" : "#94a3b8", margin: "0 0 36px", maxWidth: 460
            }}>
            Full Stack Developer with internship experience in building enterprise web applications, CRM systems, project management platforms, REST APIs, authentication modules, and responsive user interfaces. Passionate about writing clean code and solving real-world business problems.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btnp" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 12, border: "none",
                  cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff"
                }}>
                <Globe size={15} /><span>View Projects</span>
              </button>
            <a
  href="/Shinde_Gayatri_Resume.pdf"
  download
  className="btno"
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "13px 28px",
    borderRadius: 12,
    textDecoration: "none",
    color: isDark ? "#f1f5f9" : "#0f172a"
  }}
>
  <Download size={15} />
  <span>Download Resume</span>
</a>
        <button
  type="button"
  className="btno"
  onClick={() =>
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "13px 28px",
    borderRadius: 12,
    cursor: "pointer",
    fontFamily: "'Inter',sans-serif",
    fontWeight: 600,
    fontSize: 14,
    color: "#4F8CFF",
    borderColor: "rgba(79,140,255,.4)"
  }}
>
  <Mail size={15} />
  <span>Hire Me</span>
</button>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: isDark ? "#475569" : "#94a3b8", fontFamily: "'Inter',sans-serif", marginRight: 4 }}>Connect:</span>
              {[
                { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/gayatri-shinde-141464417", label: "LinkedIn", color: "#0a66c2" },
                { icon: <Github size={16} />, href: "https://github.com/gayatrissss", label: "GitHub", color: isDark ? "#f1f5f9" : "#0f172a" },
                { icon: <Mail size={16} />, href: "mailto:gayatriss1803@gmail.com", label: "Email", color: "#4F8CFF" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.color, textDecoration: "none",
                    transition: "all .2s ease"
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(79,140,255,.12)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,140,255,.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: illustration */}
          <div style={{ display: "flex", justifyContent: "center", animation: "slideUp .9s ease .15s both" }}>
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8
      }}>
        <span style={{ fontSize: 11, color: isDark ? "#475569" : "#94a3b8", fontFamily: "'Inter',sans-serif", letterSpacing: 2 }}>SCROLL</span>
        <div className="af" style={{ width: 1.5, height: 30, background: "linear-gradient(to bottom,#4F8CFF,transparent)" }} />
      </div>
    </section>
  );
}

/// ─── Stats ───────────────────────────────────────────────────────────────────
function StatsSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const targets = [6, 6, 4, 10];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    targets.forEach((target, index) => {
      let current = 0;
      const step = target / 40;

      const id = setInterval(() => {
        current += step;

        if (current >= target) {
          current = target;
          clearInterval(id);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.round(current);
          return updated;
        });
      }, 35);
    });
  }, [visible]);

  const stats = [
    {
      value: counts[0],
      suffix: " Months",
      label: "Industry Experience",
      icon: <Briefcase size={22} />,
      color: "#4F8CFF",
    },
    {
      value: counts[1],
      suffix: "+",
      label: "Projects Completed",
      icon: <FolderKanban size={22} />,
      color: "#8B5CF6",
    },
    {
      value: counts[2],
      suffix: "",
      label: "Live Projects",
      icon: <Globe size={22} />,
      color: "#22D3EE",
    },
    {
      value: counts[3],
      suffix: "+",
      label: "Technologies",
      icon: <Cpu size={22} />,
      color: "#f59e0b",
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "50px 24px 90px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 22,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`reveal glass hov-lift ${
                visible ? "vis" : ""
              }`}
              style={{
                borderRadius: 20,
                padding: "30px 24px",
                textAlign: "center",
                background: isDark
                  ? "rgba(255,255,255,.04)"
                  : "rgba(255,255,255,.9)",
                transition: "all .35s ease",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  margin: "0 auto 18px",
                  borderRadius: 16,
                  background: `${s.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.color,
                }}
              >
                {s.icon}
              </div>

              {/* Number */}
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value}
                <span
                  style={{
                    fontSize: 18,
                  }}
                >
                  {s.suffix}
                </span>
              </div>

              {/* Label */}
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isDark ? "#94a3b8" : "#64748b",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div
          style={{
            marginTop: 35,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 24,
            fontSize: 14,
            fontFamily: "'Inter',sans-serif",
            color: isDark ? "#94a3b8" : "#64748b",
          }}
        >
          <span>📍 Maharashtra, India</span>
          <span>💼 Open to Work</span>
          <span>🌐 Available for Remote Opportunities</span>
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function AboutSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const highlights = [
    { icon: <Code2 size={18} />, text: "React.js & Next.js Development ", color: "#4F8CFF" },
    { icon: <Server size={18} />, text: "Node.js & Express Backend", color: "#8B5CF6" },
    { icon: <Database size={18} />, text: "MySQL & MongoDB", color: "#22D3EE" },
    { icon: <GitBranch size={18} />, text: "Git & Collaboration", color: "#f59e0b" },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "80px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
          className="hero-grid">
          {/* Left */}
          <div className={`rl ${vis ? "vis" : ""}`}>
            <div className="section-label">About Me</div>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: isDark ? "#f1f5f9" : "#0f172a", lineHeight: 1.15, margin: "0 0 24px" }}>
              Crafting Digital{" "}
              <span className="tg">Experiences</span>
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.8, color: isDark ? "#94a3b8" : "#475569", marginBottom: 32 }}>
              I am a Full Stack Developer with hands-on experience building enterprise web applications using React.js, Next.js, Node.js, Express.js, MySQL and MongoDB. I enjoy developing scalable, secure and user-friendly applications that solve real business problems.
            </p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.8, color: isDark ? "#94a3b8" : "#475569", marginBottom: 36 }}>
             Currently pursuing my Master's in Computer Science, I continuously explore modern technologies and best practices to build responsive frontends, efficient REST APIs, authentication systems and optimized databases.
            </p>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btnp" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 28px", borderRadius: 12, border: "none",
                cursor: "pointer", fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14, color: "#fff"
              }}>
              <Mail size={15} /><span>Get In Touch</span>
            </button>
          </div>

          {/* Right */}
          <div className={`rr ${vis ? "vis" : ""}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {highlights.map((h, i) => (
              <div key={i} className="glass hov-lift" style={{
                borderRadius: 16, padding: "20px",
                background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)",
                transitionDelay: `${i * 0.08}s`
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, marginBottom: 12,
                  background: `${h.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
                  color: h.color
                }}>{h.icon}</div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, color: isDark ? "#f1f5f9" : "#0f172a", margin: 0 }}>{h.text}</p>
              </div>
            ))}
            {/* Location + education card */}
            <div className="glass hov-lift" style={{
              borderRadius: 16, padding: "20px", gridColumn: "1 / -1",
              background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)"
            }}>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MapPin size={15} style={{ color: "#4F8CFF" }} />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>Nashik, Maharashtra</span>
                </div>
                <div style={{
display:"flex",
alignItems:"center",
gap:8
}}>
<Briefcase size={15} style={{color:"#22D3EE"}}/>

<span
style={{
fontFamily:"'Inter'",
fontSize:13,
color:isDark ? "#94a3b8":"#64748b"
}}
>

6 Months Internship • Chemito Technologies

</span>

</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <GraduationCap size={15} style={{ color: "#8B5CF6" }} />
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>M.Sc. Computer Science — Savitribai Phule Pune University</span>
                </div>
                <div
style={{
display:"flex",
alignItems:"center",
gap:8
}}
>

<div
style={{
width:8,
height:8,
borderRadius:"50%",
background:"#22c55e",
boxShadow:"0 0 8px #22c55e"
}}
/>

<span
style={{
fontFamily:"Inter",
fontSize:13,
color:isDark ? "#94a3b8":"#64748b"
}}
>

Available for Full-Time Opportunities

</span>

</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
const SKILL_CATS = [
  {
    label: "Frontend",
    desc: "Building modern, responsive and interactive user interfaces.",
    icon: <Cpu size={20} />,
    color: "#4F8CFF",
    level: 95,
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    label: "Backend",
    desc: "Developing secure REST APIs and scalable server applications.",
    icon: <Server size={20} />,
    color: "#8B5CF6",
    level: 90,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Python Django",
    ],
  },
  {
    label: "Database",
    desc: "Managing SQL and NoSQL databases efficiently.",
    icon: <Database size={20} />,
    color: "#22D3EE",
    level: 88,
    skills: [
      "MySQL",
      "MongoDB",
      "SQL Server",
    ],
  },
  {
    label: "Programming",
    desc: "Strong programming fundamentals and problem solving.",
    icon: <Code2 size={20} />,
    color: "#f59e0b",
    level: 85,
    skills: [
      "Java",
      "Python",
      "C",
      "C++",
    ],
  },
  {
    label: "Tools",
    desc: "Development tools and collaboration workflow.",
    icon: <Wrench size={20} />,
    color: "#22c55e",
    level: 90,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Visual Studio",
      "Postman",
    ],
  },
];

function SkillsSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={{ padding: "80px 24px", position: "relative" }}>
      {/* bg blob */}
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(139,92,246,.06) 0%,transparent 70%)",
        top: "20%", right: "-100px", filter: "blur(60px)", pointerEvents: "none"
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
       <div
  style={{
    textAlign: "center",
    marginBottom: 60,
  }}
>
  <div
    className="section-label"
    style={{ justifyContent: "center" }}
  >
    Technical Skills
  </div>

  <h2
    style={{
      fontFamily: "'Poppins',sans-serif",
      fontWeight: 800,
      fontSize: "clamp(30px,4vw,46px)",
      color: isDark ? "#f1f5f9" : "#0f172a",
      marginBottom: 18,
    }}
  >
    My <span className="tg">Tech Stack</span>
  </h2>

  <p
    style={{
      maxWidth: 620,
      margin: "0 auto",
      lineHeight: 1.8,
      fontSize: 15,
      fontFamily: "'Inter',sans-serif",
      color: isDark ? "#94a3b8" : "#64748b",
    }}
  >
    Technologies and tools I use to build scalable,
    high-performance and user-friendly web applications.
  </p>
</div>
        <div className={`skills-grid reveal ${vis ? "vis" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {SKILL_CATS.map((cat, i) => (
            <div key={cat.label} className="glass hov-lift" style={{
              borderRadius: 20, padding: "28px 24px",
              background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)",
              transitionDelay: `${i * 0.08}s`
            }}>
            <div
  style={{
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 18,
  }}
>
  <div
    style={{
      display: "flex",
      gap: 14,
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        background: `${cat.color}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: cat.color,
      }}
    >
      {cat.icon}
    </div>

    <div>
      <h3
        style={{
          margin: 0,
          fontFamily: "'Poppins'",
          fontWeight: 700,
          fontSize: 18,
          color: isDark ? "#f1f5f9" : "#0f172a",
        }}
      >
        {cat.label}
      </h3>

      <p
        style={{
          margin: "4px 0 0",
          fontSize: 12,
          lineHeight: 1.6,
          color: isDark ? "#94a3b8" : "#64748b",
          fontFamily: "'Inter'",
        }}
      >
        {cat.desc}
      </p>
    </div>
  </div>

  <span
    style={{
      fontSize: 12,
      fontWeight: 600,
      color: cat.color,
      background: `${cat.color}12`,
      border: `1px solid ${cat.color}30`,
      borderRadius: 999,
      padding: "5px 10px",
      whiteSpace: "nowrap",
    }}
  >
    {cat.skills.length} Skills
  </span>
</div>
{/* Progress Bar */}
<div style={{ marginBottom: 20 }}>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 13,
      fontWeight: 600,
      color: isDark ? "#cbd5e1" : "#334155",
      fontFamily: "'Inter'",
    }}
  >
    <span>Proficiency</span>
    <span>{cat.level}%</span>
  </div>

  <div
    style={{
      width: "100%",
      height: 8,
      borderRadius: 999,
      overflow: "hidden",
      background: isDark
        ? "rgba(255,255,255,.08)"
        : "rgba(0,0,0,.06)",
    }}
  >
    <div
      style={{
        width: `${vis ? cat.level : 0}%`,
        height: "100%",
        background: cat.color,
        borderRadius: 999,
        transition: "width 1.2s ease",
      }}
    />
  </div>
</div>

{/* Skills */}
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  }}
>
  {cat.skills.map((skill) => (
    <span
      key={skill}
      style={{
        padding: "7px 13px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: `${cat.color}12`,
        color: cat.color,
        border: `1px solid ${cat.color}28`,
        fontFamily: "'Inter'",
        transition: ".3s",
      }}
    >
      {skill}
    </span>
  ))}
</div>

{/* Footer */}
<div
  style={{
    marginTop: 20,
    paddingTop: 18,
    borderTop: `1px solid ${
      isDark
        ? "rgba(255,255,255,.08)"
        : "rgba(0,0,0,.06)"
    }`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <span
    style={{
      fontSize: 12,
      color: isDark ? "#94a3b8" : "#64748b",
      fontFamily: "'Inter'",
    }}
  >
    Experience Level
  </span>

  <span
    style={{
      color: cat.color,
      fontWeight: 700,
      fontSize: 13,
      fontFamily: "'Inter'",
    }}
  >
    {cat.level >= 90
      ? "Expert"
      : cat.level >= 80
      ? "Advanced"
      : "Intermediate"}
  </span>
</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── Experience ───────────────────────────────────────────────────────────────
function ExperienceSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const responsibilities = [
    "Developed Enterprise Applications with scalable architecture",
    "Built RESTful APIs with authentication & authorization",
    "Implemented Role Based Access Control (RBAC)",
    "Designed CRUD operations with optimized database queries",
    "Built responsive UIs using React.js, Next.js & Tailwind CSS",
    "Backend development using Node.js & Express.js",
    "Designed MongoDB & MySQL database schemas",
    "Collaborated with Git in Agile team environment",
    "Improved application performance and responsiveness",
  ];

  const achievements = [
    "Delivered 4+ production-ready enterprise applications.",
    "Developed secure authentication & RBAC modules.",
    "Optimized APIs and database queries for better performance.",
    "Collaborated with developers using Git workflows.",
  ];

  const techStack = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "REST API",
    "MongoDB",
    "MySQL",
    "Git",
    "Tailwind CSS",
  ];

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "90px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 950, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div
            className="section-label"
            style={{ justifyContent: "center" }}
          >
            Work Experience
          </div>

          <h2
            style={{
              fontFamily: "'Poppins'",
              fontWeight: 800,
              fontSize: "clamp(30px,4vw,46px)",
              margin: 0,
              color: isDark ? "#fff" : "#0f172a",
            }}
          >
            Professional <span className="tg">Experience</span>
          </h2>
        </div>

        <div className={`reveal ${vis ? "vis" : ""}`}>
          <div style={{ display: "flex", gap: 24 }}>
            {/* Timeline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="timeline-dot" />
              <div className="timeline-line" />
            </div>

            {/* Card */}
            <div
              className="glass hov-lift"
              style={{
                flex: 1,
                borderRadius: 24,
                padding: 36,
                background: isDark
                  ? "rgba(255,255,255,.05)"
                  : "rgba(255,255,255,.9)",
                border: `1px solid ${
                  isDark
                    ? "rgba(255,255,255,.08)"
                    : "rgba(0,0,0,.06)"
                }`,
                boxShadow: isDark
                  ? "0 12px 40px rgba(0,0,0,.35)"
                  : "0 20px 50px rgba(15,23,42,.08)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 20,
                  marginBottom: 30,
                }}
              >
                <div style={{ display: "flex", gap: 18 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 18,
                      background:
                        "linear-gradient(135deg,#4F8CFF,#8B5CF6)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Briefcase size={26} color="#fff" />
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 23,
                        fontWeight: 700,
                        color: isDark ? "#fff" : "#0f172a",
                      }}
                    >
                      Full Stack Developer Intern
                    </h3>

                    <div
                      style={{
                        marginTop: 6,
                        color: "#4F8CFF",
                        fontWeight: 600,
                      }}
                    >
                      Chemito Infotech Pvt. Ltd.
                    </div>

                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        gap: 18,
                        flexWrap: "wrap",
                        fontSize: 13,
                        color: isDark
                          ? "#94a3b8"
                          : "#64748b",
                      }}
                    >
                      <span>📅 Jan 2026 – Jun 2026</span>
                      <span>📍 Nashik</span>
                      <span>💼 On-site</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    background: "rgba(74,222,128,.12)",
                    color: "#4ade80",
                    fontWeight: 700,
                    border:
                      "1px solid rgba(74,222,128,.25)",
                    height: "fit-content",
                  }}
                >
                  Completed
                </div>
              </div>

              {/* Responsibilities */}
              <div style={{ marginBottom: 35 }}>
                <h4
                  style={{
                    marginBottom: 18,
                    color: "#4F8CFF",
                    fontSize: 18,
                  }}
                >
                  Responsibilities
                </h4>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  {responsibilities.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color="#4F8CFF"
                        style={{ marginTop: 2 }}
                      />

                      <span
                        style={{
                          color: isDark
                            ? "#cbd5e1"
                            : "#475569",
                          fontSize: 14,
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div style={{ marginBottom: 35 }}>
                <h4
                  style={{
                    marginBottom: 18,
                    color: "#8B5CF6",
                    fontSize: 18,
                  }}
                >
                  Key Achievements
                </h4>

                <div
                  style={{
                    display: "grid",
                    gap: 14,
                  }}
                >
                  {achievements.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Award
                        size={16}
                        color="#8B5CF6"
                      />

                      <span
                        style={{
                          color: isDark
                            ? "#cbd5e1"
                            : "#475569",
                          fontSize: 14,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4
                  style={{
                    marginBottom: 18,
                    color: "#4F8CFF",
                    fontSize: 18,
                  }}
                >
                  Technologies Used
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const LIVE_PROJECTS = [
  {
    name: "Chemito CRM",
    image: "/images/CRM.png",
    githubFrontend: "https://github.com/gayatrissss/CRM-Frontend",
    githubBackend: "https://github.com/gayatrissss/CRM-Backend",
    desc: "Enterprise CRM for managing customers, sales, production, projects and invoices.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "REST API"],
    live: "http://crm.chemito.net",
    status: "Live",
    color: "#4F8CFF",
    icon: "🏢",
    featured: true,
  },
  {
    name: "Personal Memory Vault",
    image: "/images/memory.png",
    githubFrontend: "https://github.com/gayatrissss/personal_memory_vault",
    githubBackend: "https://github.com/gayatrissss/PMV_backend",
    desc: "Secure web app to organize personal notes, memories and important information.",
    tech: ["React.js", "JavaScript", "Responsive Design"],
    live: "https://personal-memory-vault.vercel.app/",
    status: "Live",
    color: "#8B5CF6",
    icon: "🔐",
  },
  {
    name: "EscapeVerse",
    image: "/images/escapeverse.png",
    githubFrontend: "https://github.com/gayatrissss/escapeverse_frontend",
    githubBackend: "https://github.com/gayatrissss/escapeverse_backend",
    desc: "Interactive escape room game with immersive puzzles and responsive gameplay.",
    tech: ["React.js", "JavaScript", "Responsive UI"],
    live: "https://escapeverse-frontend-one.vercel.app/",
    status: "Live",
    color: "#22D3EE",
    icon: "🎮",
  },
  {
    name: "Chemito Project Management",
    image: "/images/CPMS.png",
    githubFrontend: "https://github.com/gayatrissss/CPMS-Frontend",
    githubBackend: "https://github.com/gayatrissss/CPMS-Backend",
    desc: "Project management system for tracking tasks, teams, timelines and project progress.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    live: "http://114.143.225.58:7412/",
    status: "Live",
    color: "#f59e0b",
    icon: "📊",
  },
];

const OTHER_PROJECTS = [
  { name: "Task Manager", tech: ["React.js", "Python Django", "Tailwind CSS"], desc: "Task scheduling and notifications app." },
  { name: "Photography Website", tech: ["React.js", "Bootstrap", "MySQL"], desc: "Booking platform with responsive design." },
];

function ProjectCard({ p, isDark }: { p: typeof LIVE_PROJECTS[0]; isDark: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="proj-card" style={{ borderRadius: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div style={{
        borderRadius: 20,
        background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.9)",
        border: `1px solid ${isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.06)"}`,
        overflow: "hidden",
        transition: "all .35s ease",
        height: "100%"
      }}>
        {/* Preview area */}
        <div style={{
          height: 200, position: "relative", overflow: "hidden",
          background: `linear-gradient(135deg, ${p.color}18, ${p.color}08)`,
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)"}`
        }}>
          {/* Simulated browser chrome */}
          <div style={{
            position: "absolute", top: 16, left: 16, right: 16,
            height: 32, background: isDark ? "rgba(0,0,0,.4)" : "rgba(255,255,255,.8)",
            borderRadius: 8, display: "flex", alignItems: "center", gap: 8, padding: "0 12px",
            backdropFilter: "blur(8px)"
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
            </div>
            <div style={{ flex: 1, height: 16, background: isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", borderRadius: 4 }} />
          </div>
          {/* App preview mockup */}
          <div
  style={{
    position: "absolute",
    inset: "60px 16px 16px",
    borderRadius: 8,
    overflow: "hidden",
    background: "#fff",
  }}
>
  <img
    src={p.image}
    alt={p.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform .4s ease",
      transform: hovered ? "scale(1.05)" : "scale(1)",
    }}
  />
</div>
          {/* Status badge */}
          <div style={{
            position: "absolute", top: 56, right: 24,
            background: "rgba(74,222,128,.15)", color: "#4ade80",
            border: "1px solid rgba(74,222,128,.3)",
            borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 600,
            fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", gap: 5
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            Live
          </div>
          {/* Icon */}
          <div style={{
            position: "absolute", bottom: 24, left: 24, fontSize: 32,
            filter: `drop-shadow(0 4px 12px ${p.color}60)`
          }}>{p.icon}</div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 20, color: isDark ? "#f1f5f9" : "#0f172a", margin: "0 0 10px" }}>{p.name}</h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.7, color: isDark ? "#94a3b8" : "#475569", margin: "0 0 18px" }}>{p.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {p.tech.map(t => (
              <span key={t} style={{
                padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500,
                background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25`,
                fontFamily: "'Inter',sans-serif"
              }}>{t}</span>
            ))}
          </div>
  <div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 18,
  }}
>
  {/* Live Demo */}
  <a
    href={p.live}
    target="_blank"
    rel="noreferrer"
    className="btnp"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "10px 18px",
      borderRadius: 10,
      textDecoration: "none",
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      minWidth: 115,
      transition: "all .3s ease",
    }}
  >
    <ExternalLink size={15} />
    <span>Live Demo</span>
  </a>

  {/* Frontend */}
  <a
    href={p.githubFrontend}
    target="_blank"
    rel="noreferrer"
    className="btno"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "10px 18px",
      borderRadius: 10,
      textDecoration: "none",
      color: isDark ? "#f1f5f9" : "#0f172a",
      border: `1px solid ${isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)"}`,
      background: isDark ? "rgba(255,255,255,.04)" : "#fff",
      fontSize: 13,
      fontWeight: 600,
      minWidth: 105,
      transition: "all .3s ease",
    }}
  >
    <Github size={15} />
    <span>Frontend</span>
  </a>

  {/* Backend */}
  {p.githubBackend && (
    <a
      href={p.githubBackend}
      target="_blank"
      rel="noreferrer"
      className="btno"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "10px 18px",
        borderRadius: 10,
        textDecoration: "none",
        color: isDark ? "#f1f5f9" : "#0f172a",
        border: `1px solid ${isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)"}`,
        background: isDark ? "rgba(255,255,255,.04)" : "#fff",
        fontSize: 13,
        fontWeight: 600,
        minWidth: 105,
        transition: "all .3s ease",
      }}
    >
      <Github size={15} />
      <span>Backend</span>
    </a>
  )}
</div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: "80px 24px", position: "relative" }}>
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(79,140,255,.06) 0%,transparent 70%)",
        bottom: "10%", left: "-150px", filter: "blur(60px)", pointerEvents: "none"
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Portfolio</div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: isDark ? "#f1f5f9" : "#0f172a", margin: "0 0 12px" }}>
            Live <span className="tg">Projects</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: isDark ? "#64748b" : "#94a3b8", maxWidth: 480, margin: "0 auto" }}>
            Real-world applications deployed and accessible on the internet.
          </p>
        </div>

        <div className={`projects-grid reveal ${vis ? "vis" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 56 }}>
          {LIVE_PROJECTS.map(p => <ProjectCard key={p.name} p={p} isDark={isDark} />)}
        </div>

        {/* Other projects */}
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 22, color: isDark ? "#f1f5f9" : "#0f172a", marginBottom: 20 }}>
            Other <span className="tg">Projects</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="hero-grid">
            {OTHER_PROJECTS.map((p, i) => (
              <div key={p.name} className={`glass hov-lift reveal ${vis ? "vis" : ""}`}
                style={{
                  borderRadius: 16, padding: "24px",
                  background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)",
                  transitionDelay: `${i * 0.1}s`
                }}>
                <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 17, color: isDark ? "#f1f5f9" : "#0f172a", margin: "0 0 8px" }}>{p.name}</h4>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: isDark ? "#64748b" : "#94a3b8", margin: "0 0 14px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
const EDU = [
  { degree: "Master of Science in Computer Science", school: "Savitribai Phule Pune University", year: "2024 – Present", metric: "In Progress", icon: "🎓" },
  { degree: "Bachelor of Science in Computer Science", school: "University", year: "2021 – 2024", metric: "CGPA: 7.18", icon: "🏫" },
  { degree: "Higher Secondary (HSC)", school: "Maharashtra Board", year: "", metric: "60.77%", icon: "📚" },
  { degree: "Secondary School (SSC)", school: "Maharashtra Board", year: "", metric: "84.40%", icon: "📖" },
];

function EducationSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Academic Background</div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: isDark ? "#f1f5f9" : "#0f172a", margin: 0 }}>
            <span className="tg">Education</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {EDU.map((e, i) => (
            <div key={i} className={`reveal ${vis ? "vis" : ""}`} style={{ display: "flex", gap: 24, transitionDelay: `${i * 0.1}s` }}>
              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div className="timeline-dot" style={{ marginTop: 24 }} />
                {i < EDU.length - 1 && <div className="timeline-line" />}
              </div>
              {/* Card */}
              <div className="glass hov-lift" style={{
                flex: 1, borderRadius: 16, padding: "24px",
                background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.8)",
                marginBottom: 16
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ fontSize: 28 }}>{e.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16, color: isDark ? "#f1f5f9" : "#0f172a", margin: "0 0 4px" }}>{e.degree}</h3>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#4F8CFF", margin: 0, fontWeight: 500 }}>{e.school}</p>
                      {e.year && <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: isDark ? "#475569" : "#94a3b8", margin: "2px 0 0" }}>{e.year}</p>}
                    </div>
                  </div>
                  <span style={{
                    padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                    background: "rgba(79,140,255,.12)", color: "#4F8CFF",
                    border: "1px solid rgba(79,140,255,.2)", fontFamily: "'Inter',sans-serif", flexShrink: 0
                  }}>{e.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Hire Me ──────────────────────────────────────────────────────────────
const WHY = [
  {
    icon: <Zap size={24} />,
    title: "Problem Solver",
    desc: "Analyze complex requirements and deliver efficient, scalable solutions with a practical approach.",
    color: "#4F8CFF",
  },
  {
    icon: <Star size={24} />,
    title: "Fast Learner",
    desc: "Quickly adapts to new technologies, frameworks and business requirements with minimal guidance.",
    color: "#8B5CF6",
  },
  {
    icon: <Code2 size={24} />,
    title: "Clean Code",
    desc: "Develops maintainable, reusable and well-structured applications following industry best practices.",
    color: "#22D3EE",
  },
  {
    icon: <Users size={24} />,
    title: "Team Player",
    desc: "Collaborates effectively using Git, communicates clearly and contributes positively to team goals.",
    color: "#f59e0b",
  },
];

function WhyHireMeSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

 return (
  <section
    ref={ref}
    style={{
      padding: "80px 24px",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: isDark
          ? "linear-gradient(180deg,transparent 0%,rgba(79,140,255,.025) 50%,transparent 100%)"
          : "linear-gradient(180deg,transparent 0%,rgba(79,140,255,.04) 50%,transparent 100%)",
        pointerEvents: "none",
      }}
    />

    <div style={{ maxWidth: 1200, margin: "0 auto" }}>

      {/* Heading */}

      <div
        style={{
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div
          className="section-label"
          style={{ justifyContent: "center" }}
        >
          Why Choose Me
        </div>

        <h2
          style={{
            fontFamily: "'Poppins'",
            fontWeight: 800,
            fontSize: "clamp(30px,4vw,46px)",
            color: isDark ? "#f1f5f9" : "#0f172a",
            marginBottom: 16,
          }}
        >
          Why <span className="tg">Hire Me?</span>
        </h2>

        <p
          style={{
            maxWidth: 650,
            margin: "0 auto",
            fontSize: 15,
            lineHeight: 1.8,
            color: isDark ? "#94a3b8" : "#64748b",
            fontFamily: "'Inter'",
          }}
        >
          Combining technical expertise, problem-solving ability and a
          passion for continuous learning to build scalable,
          user-friendly and business-focused web applications.
        </p>
      </div>

      {/* Cards */}

      <div
        className="why-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 24,
        }}
      >
        {WHY.map((w, i) => (
          <div
            key={i}
            className={`glass hov-lift reveal ${vis ? "vis" : ""}`}
            style={{
              borderRadius: 22,
              padding: "34px 26px",
              textAlign: "center",
              background: isDark
                ? "rgba(255,255,255,.04)"
                : "rgba(255,255,255,.88)",
              border: `1px solid ${
                isDark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(0,0,0,.05)"
              }`,
              boxShadow: isDark
                ? "0 12px 35px rgba(0,0,0,.25)"
                : "0 18px 40px rgba(15,23,42,.08)",
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 20,
                margin: "0 auto 22px",
                background: `${w.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: w.color,
                boxShadow: `0 12px 35px ${w.color}25`,
              }}
            >
              {w.icon}
            </div>

            <h3
              style={{
                fontFamily: "'Poppins'",
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 12,
                color: isDark ? "#fff" : "#0f172a",
              }}
            >
              {w.title}
            </h3>

            <p
              style={{
                fontFamily: "'Inter'",
                fontSize: 14,
                lineHeight: 1.8,
                color: isDark ? "#94a3b8" : "#64748b",
                margin: 0,
              }}
            >
              {w.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Section */}

      <div
        className="glass"
        style={{
          marginTop: 45,
          borderRadius: 22,
          padding: "30px",
          background: isDark
            ? "rgba(255,255,255,.04)"
            : "rgba(255,255,255,.88)",
          border: `1px solid ${
            isDark
              ? "rgba(255,255,255,.08)"
              : "rgba(0,0,0,.05)"
          }`,
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: 24,
            fontFamily: "'Poppins'",
            fontWeight: 700,
            color: isDark ? "#fff" : "#0f172a",
          }}
        >
          What You Can Expect From Me
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 18,
          }}
        >
          {[
            "✔ Responsive & Modern UI",
            "✔ Scalable Backend Development",
            "✔ REST API Integration",
            "✔ Clean & Maintainable Code",
            "✔ Performance Optimization",
            "✔ Git Collaboration",
            "✔ Timely Delivery",
            "✔ Continuous Learning",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                background: isDark
                  ? "rgba(255,255,255,.03)"
                  : "#f8fafc",
                color: isDark ? "#cbd5e1" : "#334155",
                fontWeight: 500,
                fontFamily: "'Inter'",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

 const WHATSAPP_NUMBER = "919175285837"; // <-- apna number

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const text = `
*New Portfolio Contact*

👤 Name: ${form.name}

📧 Email: ${form.email}

💬 Message:
${form.message}
`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    text
  )}`;

  window.open(url, "_blank");

  setSent(true);

  setTimeout(() => {
    setSent(false);
  }, 2500);

  setForm({
    name: "",
    email: "",
    message: "",
  });
};
  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 12, fontSize: 14,
    fontFamily: "'Inter',sans-serif", outline: "none",
    background: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)",
    border: `1.5px solid ${isDark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.08)"}`,
    color: isDark ? "#f1f5f9" : "#0f172a",
    transition: "border-color .2s ease",
  };

  const contactInfo = [
    { icon: <MapPin size={18} />, label: "Location", value: "Nashik, Maharashtra", color: "#4F8CFF" },
    { icon: <Mail size={18} />, label: "Email", value: "gayatriss1803@gmail.com", href: "mailto:gayatriss1803@gmail.com", color: "#8B5CF6" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "Gayatri Shinde", href: "https://www.linkedin.com/in/gayatri-shinde-141464417", color: "#0a66c2" },
    { icon: <Github size={18} />, label: "GitHub", value: "gayatrissss", href: "https://github.com/gayatrissss", color: "#f1f5f9" },
  ];

return (
  <section
    id="contact"
    ref={ref}
    style={{
      padding: "100px 24px",
      position: "relative",
    }}
  >
    {/* Background Glow */}
    <div
      style={{
        position: "absolute",
        width: 520,
        height: 520,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(139,92,246,.08) 0%, transparent 70%)",
        top: "10%",
        right: "-160px",
        filter: "blur(70px)",
        pointerEvents: "none",
      }}
    />

    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="section-label" style={{ justifyContent: "center" }}>
          Get In Touch
        </div>

        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(30px,4vw,46px)",
            margin: "10px 0",
            color: isDark ? "#f1f5f9" : "#0f172a",
          }}
        >
          Let's <span className="tg">Work Together</span>
        </h2>

        <p
          style={{
            maxWidth: 520,
            margin: "0 auto",
            fontSize: 15,
            lineHeight: 1.8,
            color: isDark ? "#94a3b8" : "#64748b",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Have a project idea or collaboration in mind? Let’s build something
          amazing together.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "start",
        }}
        className="hero-grid"
      >
        {/* FORM CARD */}
        <div className={`rl ${vis ? "vis" : ""}`}>
          <div
            className="glass"
            style={{
              borderRadius: 26,
              padding: 40,
              background: isDark
                ? "rgba(255,255,255,.04)"
                : "rgba(255,255,255,.85)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)"
              }`,
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,.35)"
                : "0 25px 70px rgba(15,23,42,.08)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "50px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>🎉</div>
                <h3
                  style={{
                    fontFamily: "'Poppins'",
                    fontWeight: 700,
                    fontSize: 20,
                    color: isDark ? "#f1f5f9" : "#0f172a",
                    margin: 0,
                  }}
                >
                  Message Sent Successfully
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    marginTop: 8,
                    color: isDark ? "#94a3b8" : "#64748b",
                  }}
                >
                  I'll respond to you on WhatsApp shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {/* Name */}
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,.08)",
                    background: isDark
                      ? "rgba(255,255,255,.06)"
                      : "#fff",
                    color: isDark ? "#fff" : "#0f172a",
                    outline: "none",
                  }}
                />

                {/* Email */}
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,.08)",
                    background: isDark
                      ? "rgba(255,255,255,.06)"
                      : "#fff",
                    color: isDark ? "#fff" : "#0f172a",
                    outline: "none",
                  }}
                />

                {/* Message */}
                <textarea
                  required
                  rows={5}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,.08)",
                    background: isDark
                      ? "rgba(255,255,255,.06)"
                      : "#fff",
                    color: isDark ? "#fff" : "#0f172a",
                    outline: "none",
                    resize: "none",
                  }}
                />

                {/* Button */}
                <button
                  type="submit"
                  style={{
                    padding: "14px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#fff",
                    background:
                      "linear-gradient(135deg,#4F8CFF,#8B5CF6)",
                    boxShadow:
                      "0 10px 30px rgba(79,140,255,.25)",
                    transition: "0.3s ease",
                  }}
                >
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>
        </div>

        {/* INFO CARDS */}
        <div
          className={`rr ${vis ? "vis" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {contactInfo.map((c, i) => (
            <div
              key={i}
              className="glass hov-lift"
              style={{
                borderRadius: 18,
                padding: "20px 22px",
                background: isDark
                  ? "rgba(255,255,255,.04)"
                  : "rgba(255,255,255,.85)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: `1px solid ${
                  isDark
                    ? "rgba(255,255,255,.06)"
                    : "rgba(0,0,0,.05)"
                }`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${c.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.color,
                }}
              >
                {c.icon}
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: isDark ? "#94a3b8" : "#64748b",
                    marginBottom: 4,
                  }}
                >
                  {c.label}
                </div>

                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      textDecoration: "none",
                    }}
                  >
                    {c.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                    }}
                  >
                    {c.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ isDark }: { isDark: boolean }) {
return (
  <footer
    style={{
      borderTop: `1px solid ${
        isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.06)"
      }`,
      padding: "36px 24px",
      textAlign: "center",
    }}
  >
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT TEXT */}
      <div style={{ textAlign: "left" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            margin: 0,
            color: isDark ? "#94a3b8" : "#64748b",
            lineHeight: 1.6,
          }}
        >
          © 2026{" "}
          <span
            style={{
              fontWeight: 600,
              color: isDark ? "#f1f5f9" : "#0f172a",
            }}
          >
            Gayatri Shinde
          </span>{" "}
          — All Rights Reserved.
        </p>

        <p
          style={{
            margin: "6px 0 0",
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            color: isDark ? "#64748b" : "#94a3b8",
          }}
        >
          Designed & Developed with{" "}
          <span style={{ color: "#ef4444" }}>❤️</span> using React.js
        </p>
      </div>

      {/* RIGHT ICONS */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {[
          { icon: <Github size={15} />, href: "https://github.com/gayatrissss" },
          { icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/gayatri-shinde-141464417" },
          { icon: <Mail size={15} />, href: "mailto:gayatriss1803@gmail.com" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isDark
                ? "rgba(255,255,255,.06)"
                : "rgba(0,0,0,.04)",
              border: `1px solid ${
                isDark
                  ? "rgba(255,255,255,.08)"
                  : "rgba(0,0,0,.06)"
              }`,
              color: isDark ? "#94a3b8" : "#475569",
              textDecoration: "none",
              transition: "all .25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#4F8CFF";
              el.style.borderColor = "rgba(79,140,255,.4)";
              el.style.background = "rgba(79,140,255,.1)";
              el.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = isDark ? "#94a3b8" : "#475569";
              el.style.borderColor = isDark
                ? "rgba(255,255,255,.08)"
                : "rgba(0,0,0,.06)";
              el.style.background = isDark
                ? "rgba(255,255,255,.06)"
                : "rgba(0,0,0,.04)";
              el.style.transform = "translateY(0)";
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
}

// ─── Back to Top ──────────────────────────────────────────────────────────────
function BackToTop({ isDark }: { isDark: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="btnp" style={{
        position: "fixed", bottom: 32, right: 28, zIndex: 500,
        width: 46, height: 46, borderRadius: 12, border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 30px rgba(79,140,255,.35)"
      }}>
      <span><ArrowUp size={18} color="#fff" /></span>
    </button>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? "" : "light-mode"} style={{
      background: isDark ? "#09090B" : "#f8fafc",
      color: isDark ? "#f1f5f9" : "#0f172a",
      minHeight: "100vh",
      transition: "background .35s ease, color .35s ease"
    }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <CursorGlow />
          <Navbar isDark={isDark} setIsDark={setIsDark} />
          <HeroSection isDark={isDark} />
          <StatsSection isDark={isDark} />
          <AboutSection isDark={isDark} />
          <SkillsSection isDark={isDark} />
          <ExperienceSection isDark={isDark} />
          <ProjectsSection isDark={isDark} />
          <EducationSection isDark={isDark} />
          <WhyHireMeSection isDark={isDark} />
          <ContactSection isDark={isDark} />
          <Footer isDark={isDark} />
          <BackToTop isDark={isDark} />
          <Analytics />
        </>
      )}
    </div>
  );
}
