import { useState, useCallback, useEffect } from "react";

// ============================================================
// API CONFIGURATION
// Option A — use the public hosted API (try this first):
//   const API_BASE = "https://api.inglish.revlearn.org/api/v1";
// Option B — point to your own Render/Railway/PythonAnywhere instance:
//   const API_BASE = "https://your-app.onrender.com/api/v1";
// ============================================================
const API_BASE = "https://api.inglish.revlearn.org/api/v1";

const FALLBACK_SYSTEMS = [{ id: "lytspel", label: "Lytspel" }];

async function fetchSystems() {
  const res = await fetch(`${API_BASE}/spelling-systems`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Could not load systems");
  const data = await res.json();
  const arr = Array.isArray(data) ? data : data.spellingSystems ?? [];
  return arr.map((s) =>
    typeof s === "string"
      ? { id: s, label: s.charAt(0).toUpperCase() + s.slice(1) }
      : { id: s.id ?? s.name, label: s.label ?? s.name }
  );
}

async function callTranslate(text, spellingSystem, forward) {
  const res = await fetch(`${API_BASE}/translations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, spellingSystem, forward, save: false }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `API error ${res.status}`);
  }
  const data = await res.json();
  return data.translatedText ?? data.result ?? data.text ?? JSON.stringify(data);
}

export default function InglishRespellingTool() {
  const [systems, setSystems] = useState(FALLBACK_SYSTEMS);
  const [system, setSystem] = useState(FALLBACK_SYSTEMS[0].id);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generateLink, setGenerateLink] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [apiDown, setApiDown] = useState(false);

  useEffect(() => {
    fetchSystems()
      .then((list) => {
        if (list.length > 0) {
          setSystems(list);
          setSystem(list[0].id);
        }
      })
      .catch(() => setApiDown(true));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("text");
    const s = params.get("system");
    if (t) setOutput(t);
    if (s) setSystem(s);
  }, []);

  const convert = useCallback(
    async (forward) => {
      if (!input.trim()) return;
      setLoading(true);
      setOutput("");
      setError("");
      setApiDown(false);
      try {
        const result = await callTranslate(input, system, forward);
        setOutput(result);
      } catch (e) {
        const msg = e.message ?? "";
        if (msg.includes("fetch") || msg.includes("Failed") || msg.includes("network")) {
          setApiDown(true);
          setError(
            `Could not reach the API. If you're seeing a CORS error, you'll need to host the backend yourself — see README.md for instructions.`
          );
        } else {
          setError(msg || "Conversion failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [input, system]
  );

  const copyLink = () => {
    const params = new URLSearchParams({ text: output, system });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .irt-root { font-family: 'Source Serif 4', Georgia, serif; background: #f7f4ef; min-height: 100vh; color: #1a1714; }
        .irt-nav { background: #1a1714; padding: 0 2.5rem; display: flex; align-items: center; gap: 2rem; height: 64px; position: sticky; top: 0; z-index: 10; }
        .irt-nav-brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
        .irt-nav-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; font-weight: 600; color: #f7f4ef; letter-spacing: 0.01em; }
        .irt-nav-subtitle { font-size: 0.72rem; color: #a89e8e; letter-spacing: 0.04em; font-weight: 300; font-style: italic; }
        .irt-nav-links { margin-left: auto; display: flex; gap: 0.25rem; }
        .irt-nav-link { padding: 0.4rem 0.9rem; font-size: 0.82rem; color: #a89e8e; text-decoration: none; border-radius: 4px; transition: color 0.15s, background 0.15s; letter-spacing: 0.02em; }
        .irt-nav-link:hover { color: #f7f4ef; background: rgba(255,255,255,0.08); }
        .irt-nav-link.active { color: #1a1714; background: #c8a96e; }
        .irt-banner { background: #fff3cd; border-bottom: 1px solid #f0d080; padding: 0.6rem 2rem; font-size: 0.82rem; color: #7a5f00; text-align: center; }
        .irt-hero { text-align: center; padding: 4rem 2rem 2.5rem; border-bottom: 1px solid #e0d8cc; }
        .irt-hero-eyebrow { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #c8a96e; margin-bottom: 0.75rem; font-weight: 300; }
        .irt-hero-heading { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 600; line-height: 1.15; color: #1a1714; letter-spacing: -0.01em; }
        .irt-hero-sub { margin-top: 0.75rem; font-size: 1rem; font-weight: 300; color: #6b5f52; font-style: italic; }
        .irt-main { max-width: 960px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }
        .irt-system-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .irt-system-label { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b5f52; font-weight: 300; white-space: nowrap; }
        .irt-select { appearance: none; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b5f52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center; border: 1px solid #d0c8bc; border-radius: 6px; padding: 0.5rem 2.25rem 0.5rem 0.85rem; font-family: 'Source Serif 4', Georgia, serif; font-size: 0.9rem; color: #1a1714; cursor: pointer; transition: border-color 0.15s; min-width: 160px; }
        .irt-select:hover { border-color: #c8a96e; }
        .irt-select:focus { outline: none; border-color: #c8a96e; box-shadow: 0 0 0 3px rgba(200,169,110,0.15); }
        .irt-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
        @media (max-width: 600px) { .irt-editor { grid-template-columns: 1fr; } .irt-nav-links { display: none; } .irt-nav { padding: 0 1rem; } }
        .irt-panel { background: #fff; border: 1px solid #e0d8cc; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; }
        .irt-panel-label { padding: 0.6rem 1rem; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: #a89e8e; font-weight: 300; border-bottom: 1px solid #f0ebe3; background: #fdfcfa; }
        .irt-textarea { flex: 1; border: none; outline: none; resize: none; padding: 1rem; font-family: 'Source Serif 4', Georgia, serif; font-size: 1rem; color: #1a1714; background: transparent; min-height: 220px; line-height: 1.7; }
        .irt-output-body { flex: 1; padding: 1rem; min-height: 220px; font-size: 1rem; line-height: 1.7; color: #1a1714; }
        .irt-placeholder { color: #c0b8ac; font-style: italic; font-size: 0.95rem; }
        .irt-loading { display: flex; align-items: center; gap: 0.6rem; color: #a89e8e; font-style: italic; font-size: 0.9rem; }
        .irt-dots span { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #c8a96e; animation: irt-bounce 1s ease-in-out infinite; }
        .irt-dots span:nth-child(2) { animation-delay: 0.15s; }
        .irt-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes irt-bounce { 0%,80%,100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-5px); opacity: 1; } }
        .irt-error { color: #b94040; font-style: italic; font-size: 0.88rem; line-height: 1.5; }
        .irt-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .irt-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.35rem; border-radius: 8px; font-family: 'Source Serif 4', Georgia, serif; font-size: 0.88rem; cursor: pointer; border: none; transition: transform 0.12s, opacity 0.15s, background 0.15s; white-space: nowrap; }
        .irt-btn:active { transform: scale(0.97); }
        .irt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .irt-btn-primary { background: #c8a96e; color: #1a1714; }
        .irt-btn-primary:hover:not(:disabled) { background: #b8963d; }
        .irt-btn-dark { background: #1a1714; color: #f7f4ef; }
        .irt-btn-dark:hover:not(:disabled) { background: #2e2a26; }
        .irt-btn-ghost { background: transparent; color: #6b5f52; border: 1px solid #d0c8bc; }
        .irt-btn-ghost:hover:not(:disabled) { background: #f0ebe3; }
        .irt-link-row { margin-left: auto; display: flex; align-items: center; gap: 0.6rem; }
        .irt-toggle-label { font-size: 0.8rem; color: #6b5f52; }
        .irt-toggle { position: relative; width: 38px; height: 22px; cursor: pointer; }
        .irt-toggle input { opacity: 0; width: 0; height: 0; }
        .irt-toggle-track { position: absolute; inset: 0; border-radius: 11px; background: #d0c8bc; transition: background 0.2s; }
        .irt-toggle input:checked ~ .irt-toggle-track { background: #c8a96e; }
        .irt-toggle-thumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform 0.2s; }
        .irt-toggle input:checked ~ .irt-toggle-thumb { transform: translateX(16px); }
        .irt-howto { margin-top: 3rem; padding: 1.75rem 2rem; background: #fff; border: 1px solid #e0d8cc; border-radius: 10px; }
        .irt-howto-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; font-weight: 600; margin-bottom: 1rem; color: #1a1714; }
        .irt-howto-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .irt-howto-list li { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.9rem; color: #4a3f35; line-height: 1.6; font-weight: 300; }
        .irt-howto-num { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: #f0ebe3; color: #c8a96e; font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
        .irt-footer { text-align: center; padding: 1.5rem; font-size: 0.75rem; color: #a89e8e; border-top: 1px solid #e0d8cc; font-weight: 300; letter-spacing: 0.03em; }
      `}</style>

      <div className="irt-root">
        <nav className="irt-nav">
          <a href="#" className="irt-nav-brand">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="#c8a96e" opacity="0.15"/>
              <path d="M8 10h10M8 16h6M8 22h8" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 14l4 8M20 22l4-8" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="irt-nav-title">Inglish Respelling Tool</div>
              <div className="irt-nav-subtitle">Phonetic conversion utility</div>
            </div>
          </a>
          <div className="irt-nav-links">
            <a href="#" className="irt-nav-link active">Home</a>
            <a href="#" className="irt-nav-link">About Us</a>
            <a href="#" className="irt-nav-link">Contact</a>
            <a href="#" className="irt-nav-link">FAQ</a>
            <a href="#" className="irt-nav-link">Limitations</a>
          </div>
        </nav>

        {apiDown && (
          <div className="irt-banner">
            ⚠ API unreachable at <strong>{API_BASE}</strong> — check your backend is running and has CORS enabled. See README.md.
          </div>
        )}

        <header className="irt-hero">
          <p className="irt-hero-eyebrow">Phonetic Spelling System</p>
          <h1 className="irt-hero-heading">Convert Between Spelling Systems</h1>
          <p className="irt-hero-sub">Traditional English ↔ phonetic respelling, instantly</p>
        </header>

        <main className="irt-main">
          <div className="irt-system-row">
            <span className="irt-system-label">Phonetic System</span>
            <select className="irt-select" value={system} onChange={(e) => setSystem(e.target.value)}>
              {systems.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="irt-editor">
            <div className="irt-panel">
              <div className="irt-panel-label">Input text</div>
              <textarea
                className="irt-textarea"
                placeholder="Type or paste your text here…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div className="irt-panel">
              <div className="irt-panel-label">Output</div>
              <div className="irt-output-body">
                {loading ? (
                  <div className="irt-loading">Converting <div className="irt-dots"><span/><span/><span/></div></div>
                ) : error ? (
                  <div className="irt-error">{error}</div>
                ) : output ? (
                  <span>{output}</span>
                ) : (
                  <span className="irt-placeholder">Converted text will appear here…</span>
                )}
              </div>
            </div>
          </div>

          <div className="irt-actions">
            <button className="irt-btn irt-btn-primary" onClick={() => convert(true)} disabled={loading || !input.trim()}>
              Convert to Alternate Spelling →
            </button>
            <button className="irt-btn irt-btn-dark" onClick={() => convert(false)} disabled={loading || !input.trim()}>
              ← Convert to Traditional Spelling
            </button>
            <div className="irt-link-row">
              <span className="irt-toggle-label">Generate link</span>
              <label className="irt-toggle">
                <input type="checkbox" checked={generateLink} onChange={(e) => setGenerateLink(e.target.checked)}/>
                <div className="irt-toggle-track"/>
                <div className="irt-toggle-thumb"/>
              </label>
              <button className="irt-btn irt-btn-ghost" onClick={copyLink} disabled={!generateLink || !output}>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          <div className="irt-howto">
            <h2 className="irt-howto-title">How to Use</h2>
            <ul className="irt-howto-list">
              {[
                "Enter your text in the left input box.",
                "Select your preferred phonetic system from the dropdown above.",
                'Click "Convert to Alternate Spelling" to convert traditional English to phonetic respelling.',
                'Click "Convert to Traditional Spelling" to convert phonetic respelling back to traditional English.',
                'Toggle "Generate link" and click "Copy Link" to share your converted text via URL.',
              ].map((item, i) => (
                <li key={i}>
                  <span className="irt-howto-num">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </main>

        <footer className="irt-footer">
          © {new Date().getFullYear()} Inglish Respelling Tool · Powered by{" "}
          <a href="https://github.com/Inglish-Respelling-Project/altspell" style={{ color: "#c8a96e" }}>altspell</a>
        </footer>
      </div>
    </>
  );
}
