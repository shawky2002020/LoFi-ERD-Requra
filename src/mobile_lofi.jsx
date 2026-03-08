import { useState } from "react";

// ─── ICONS (inline SVG components) ───────────────────────────────────────────
const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#111" : "none"} stroke={active ? "#111" : "#AAA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const ResultsIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#AAA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" />
  </svg>
);
const BellIcon = ({ active, dot }) => (
  <div style={{ position: "relative", display: "inline-flex" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#AAA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
    {dot && <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: "#E03E3E", borderRadius: "50%", border: "1.5px solid #F8F8F7" }} />}
  </div>
);
const UserIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#AAA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
);

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  card: { background: "#FFF", border: "1.5px solid #E2E2E2", borderRadius: 10, padding: "14px", marginBottom: 10 },
  sectionLabel: { fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8, paddingBottom: 5, borderBottom: "1px solid #EDEDED", fontFamily: "'DM Sans', sans-serif" },
  badge: (color) => {
    const map = {
      func: { bg: "#D4F0D4", text: "#1A6B1A" },
      biz: { bg: "#FFF3CC", text: "#6B4A00" },
      nonfunc: { bg: "#D4E8F0", text: "#0A3D52" },
      ready: { bg: "#D4F0D4", text: "#1A6B1A" },
      proc: { bg: "#FFF3CC", text: "#6B4A00" },
      done: { bg: "#EBEBEB", text: "#555" },
      ok: { bg: "#D4F0D4", text: "#1A6B1A" },
    };
    const c = map[color] || map.done;
    return { padding: "2px 8px", borderRadius: 3, fontSize: 10, fontWeight: 700, background: c.bg, color: c.text, whiteSpace: "nowrap" };
  },
};

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }) {
  const projects = [
    { initials: "EC", name: "E-Commerce Platform v2", client: "Acme Corporation", tag: "ready", label: "Ready", stories: "14 stories", updated: "2 hours ago" },
    { initials: "CR", name: "CRM System Revamp", client: "TechStart MENA", tag: "proc", label: "Processing", stories: "In progress...", updated: "1 day ago" },
    { initials: "MB", name: "Mobile Banking App", client: "FinBank Egypt", tag: "done", label: "Exported", stories: "22 stories", updated: "3 days ago" },
    { initials: "HR", name: "HR Portal Redesign", client: "Cairo Holdings", tag: "ready", label: "Ready", stories: "9 stories", updated: "4 days ago" },
    { initials: "IS", name: "Inventory System", client: "RetailPlus", tag: "proc", label: "Processing", stories: "In progress...", updated: "5 days ago" },
  ];

  return (
    <div style={{ padding: "18px 16px 20px" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>Good morning, Carol 👋</div>
        <div style={{ fontSize: 12, color: "#999" }}>3 projects pending your review</div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
        {[["12", "Projects"], ["87", "Stories"], ["3", "Pending"]].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: "#FFF", border: "1.5px solid #E2E2E2", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#111", fontFamily: "'DM Sans', sans-serif" }}>{n}</div>
            <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={S.sectionLabel}>Quick Actions</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
        {[["📄", "Upload File"], ["📝", "Paste Text"], ["🎙️", "Record"]].map(([icon, label]) => (
          <button key={label} onClick={() => onNavigate("new")}
            style={{ flex: 1, background: "#FFF", border: "1.5px solid #E2E2E2", borderRadius: 10, padding: "13px 6px", textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: 22, marginBottom: 5 }}>{icon}</div>
            <div style={{ fontSize: 10, color: "#444", fontWeight: 600 }}>{label}</div>
          </button>
        ))}
      </div>

      {/* Recent Projects */}
      <div style={S.sectionLabel}>Recent Projects</div>
      {projects.map((p) => (
        <div key={p.name} onClick={() => onNavigate("results")}
          style={{ ...S.card, cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#F0F0F0", border: "1.5px dashed #CCC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#999", fontWeight: 700, flexShrink: 0 }}>{p.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>{p.client}</div>
            </div>
            <span style={S.badge(p.tag)}>{p.label}</span>
            <ChevronRight />
          </div>
          <div style={{ fontSize: 10, color: "#C0C0C0", marginTop: 7 }}>{p.stories} · Updated {p.updated}</div>
        </div>
      ))}
    </div>
  );
}

// ─── NEW SCREEN ───────────────────────────────────────────────────────────────
function NewScreen() {
  const [attached, setAttached] = useState([
    { type: "PDF", name: "stakeholder_jan_2025.pdf", size: "2.4 MB" },
    { type: "DOCX", name: "requirements_draft_v3.docx", size: "845 KB" },
  ]);

  return (
    <div style={{ padding: "18px 16px 20px" }}>
      {/* Context */}
      <div style={{ ...S.card, marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, color: "#AAA", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 2 }}>Project</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>E-Commerce Platform v2</div>
        </div>
        <button style={{ fontSize: 11, color: "#999", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>Change</button>
      </div>

      <div style={S.sectionLabel}>Choose Upload Method</div>

      {/* Upload options */}
      {[
        { icon: "🎙️", title: "Record Audio", sub: "Capture a live meeting or voice memo", primary: true },
        { icon: "📄", title: "Upload File", sub: "PDF, DOCX, TXT, MP3, MP4", primary: false },
        { icon: "📋", title: "Paste Text", sub: "Copy notes or transcript directly", primary: false },
      ].map((opt) => (
        <div key={opt.title} style={{
          display: "flex", alignItems: "center", gap: 14, padding: "15px 14px",
          borderRadius: 10, marginBottom: 10, cursor: "pointer",
          background: opt.primary ? "#111" : "#FFF",
          border: `1.5px solid ${opt.primary ? "#111" : "#E2E2E2"}`,
        }}>
          <div style={{ fontSize: 26, width: 44, textAlign: "center" }}>{opt.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: opt.primary ? "#FFF" : "#111", marginBottom: 2 }}>{opt.title}</div>
            <div style={{ fontSize: 10, color: opt.primary ? "#888" : "#999" }}>{opt.sub}</div>
          </div>
          <div style={{ fontSize: 18, color: opt.primary ? "rgba(255,255,255,0.4)" : "#CCC" }}>›</div>
        </div>
      ))}

      {/* Paste area */}
      <div style={S.sectionLabel}>Or Paste Text Here</div>
      <div style={{ width: "100%", height: 90, background: "#FFF", border: "1.5px dashed #CCC", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#BBB", marginBottom: 18, cursor: "text" }}>
        Tap to type or paste transcript...
      </div>

      {/* Attached files */}
      <div style={S.sectionLabel}>Attached Files ({attached.length})</div>
      {attached.map((f) => (
        <div key={f.name} style={{ ...S.card, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ padding: "2px 7px", background: "#EBEBEB", borderRadius: 3, fontSize: 10, color: "#555", fontWeight: 700 }}>{f.type}</div>
          <div style={{ flex: 1, fontSize: 11, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
          <div style={{ fontSize: 10, color: "#BBB", flexShrink: 0 }}>{f.size}</div>
          <button onClick={() => setAttached(attached.filter(x => x !== f))}
            style={{ fontSize: 14, color: "#CCC", background: "none", border: "none", cursor: "pointer" }}>✕</button>
        </div>
      ))}

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{ height: 48, background: "#111", color: "#FFF", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Start AI Processing →
        </button>
        <button style={{ height: 44, background: "#FFF", color: "#111", border: "1.5px solid #E2E2E2", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          Add Another File
        </button>
      </div>
    </div>
  );
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
function ResultsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["User Stories (8)", "Func. Req.", "Summary", "Types"];
  const stories = [
    { title: "User Registration", type: "func", label: "Functional", as: "New User", want: "create an account", so: "I can access and personalise the platform.", ac: 3, approved: false },
    { title: "Upload Transcript", type: "func", label: "Functional", as: "Business Analyst", want: "upload a meeting transcript", so: "the AI can extract structured requirements.", ac: 4, approved: true },
    { title: "Export to Excel", type: "biz", label: "Business", as: "Project Manager", want: "export stories to Excel", so: "the dev team can import them directly to Jira.", ac: 2, approved: false },
    { title: "Stakeholder Share Link", type: "func", label: "Functional", as: "Project Manager", want: "share a read-only review link", so: "stakeholders can approve stories without logging in.", ac: 3, approved: false },
    { title: "AI Classification", type: "nonfunc", label: "Non-Func.", as: "Business Analyst", want: "requirements classified automatically", so: "I can prioritise the backlog faster.", ac: 2, approved: true },
  ];

  return (
    <div>
      {/* Project selector */}
      <div style={{ padding: "12px 16px 0", background: "#F8F8F7" }}>
        <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 0 }}>
          <div>
            <div style={{ fontSize: 9, color: "#AAA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Project</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>E-Commerce Platform v2</div>
          </div>
          <ChevronRight />
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: "flex", background: "#FFF", borderBottom: "2px solid #EDEDED", overflowX: "auto", padding: "0 8px" }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActiveTab(i)} style={{
            padding: "11px 10px", fontSize: 11, fontWeight: i === activeTab ? 700 : 400,
            color: i === activeTab ? "#111" : "#999", border: "none", background: "none",
            borderBottom: i === activeTab ? "2px solid #111" : "2px solid transparent",
            marginBottom: -2, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
          }}>{t}</button>
        ))}
      </div>

      {/* Stories list */}
      <div style={{ padding: "14px 16px 20px" }}>
        {activeTab === 0 && stories.map((s) => (
          <div key={s.title} style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{s.title}</div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <span style={S.badge(s.type)}>{s.label}</span>
                {s.approved && <span style={S.badge("ok")}><CheckIcon /></span>}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#666", lineHeight: 1.65, marginBottom: 10 }}>
              <span style={{ color: "#BBB" }}>As a </span>{s.as}
              <span style={{ color: "#BBB" }}>, I want to </span>{s.want}
              <span style={{ color: "#BBB" }}>, so that </span>{s.so}
            </div>
            <div style={{ height: 28, background: "#F6F6F6", border: "1.5px dashed #D8D8D8", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#BBB", marginBottom: 10 }}>
              ▸ Acceptance Criteria — {s.ac} items
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["✏", "Edit"], ["✓", "Approve"], ["↺", "AI"]].map(([icon, label], i) => (
                <button key={label} style={{
                  flex: 1, height: 30, background: i === 1 ? "#111" : "#FFF",
                  color: i === 1 ? "#FFF" : "#555",
                  border: `1.5px solid ${i === 1 ? "#111" : "#E2E2E2"}`,
                  borderRadius: 5, fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                }}>{icon} {label}</button>
              ))}
            </div>
          </div>
        ))}
        {activeTab !== 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#CCC", fontSize: 12 }}>
            Switch to User Stories tab to see results
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ACTIVITY SCREEN ──────────────────────────────────────────────────────────
function ActivityScreen() {
  const [read, setRead] = useState({});
  const groups = [
    {
      date: "Today", items: [
        { id: 1, ico: "✓", color: "#D4F0D4", title: "Stakeholder Approved Stories", desc: "Ahmed Mostafa approved 6 of 8 user stories and left 2 comments.", proj: "E-Commerce Platform v2", time: "2 hours ago", unread: true },
        { id: 2, ico: "🤖", color: "#EBEBEB", title: "AI Processing Complete", desc: "CRM System Revamp is done. 11 user stories ready for review.", proj: "CRM System Revamp", time: "4 hours ago", unread: true },
        { id: 3, ico: "💬", color: "#D4E8F0", title: "New Comment", desc: 'Sara Khaled: "The acceptance criteria for story #3 needs more detail."', proj: "E-Commerce Platform v2", time: "5 hours ago", unread: true },
      ]
    },
    {
      date: "Yesterday", items: [
        { id: 4, ico: "↑", color: "#FFF3CC", title: "Export Downloaded", desc: "Hassan downloaded the Excel export with 22 user stories for Jira import.", proj: "Mobile Banking App", time: "Yesterday 2:30 PM", unread: false },
        { id: 5, ico: "🔗", color: "#D4F0D4", title: "Project Shared", desc: "You shared HR Portal Redesign with 3 stakeholders via read-only link.", proj: "HR Portal Redesign", time: "Yesterday 11:00 AM", unread: false },
        { id: 6, ico: "🤖", color: "#EBEBEB", title: "AI Processing Complete", desc: "Mobile Banking App finished. 22 user stories generated.", proj: "Mobile Banking App", time: "Yesterday 9:15 AM", unread: false },
      ]
    },
  ];
  const markAll = () => {
    const all = {};
    groups.forEach(g => g.items.forEach(i => { all[i.id] = true; }));
    setRead(all);
  };

  return (
    <div style={{ padding: "14px 16px 20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={markAll} style={{ fontSize: 11, color: "#AAA", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>Mark all as read</button>
      </div>
      {groups.map((g) => (
        <div key={g.date}>
          <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid #EDEDED" }}>{g.date}</div>
          {g.items.map((item) => {
            const isUnread = item.unread && !read[item.id];
            return (
              <div key={item.id} onClick={() => setRead({ ...read, [item.id]: true })} style={{
                background: "#FFF",
                border: `1.5px solid ${isUnread ? "#111" : "#E2E2E2"}`,
                borderLeftWidth: isUnread ? 3 : 1.5,
                borderRadius: 10, padding: "12px 13px", marginBottom: 8,
                display: "flex", alignItems: "flex-start", gap: 11, cursor: "pointer",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: item.color, border: "1px solid rgba(0,0,0,0.06)" }}>{item.ico}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: "#777", lineHeight: 1.5 }}>{item.desc}</div>
                  <span style={{ display: "inline-block", padding: "2px 6px", background: "#EBEBEB", borderRadius: 3, fontSize: 9, color: "#555", marginTop: 4 }}>{item.proj}</span>
                  <div style={{ fontSize: 10, color: "#BBB", marginTop: 3 }}>{item.time}</div>
                </div>
                {isUnread && <div style={{ width: 7, height: 7, background: "#111", borderRadius: "50%", flexShrink: 0, marginTop: 4 }} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
function ProfileScreen() {
  const [notifs, setNotifs] = useState(true);
  const [emails, setEmails] = useState(false);

  const Toggle = ({ on, onClick }) => (
    <div onClick={onClick} style={{ width: 40, height: 22, background: on ? "#111" : "#D0D0D0", borderRadius: 999, position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
      <div style={{ width: 18, height: 18, background: "#FFF", borderRadius: "50%", position: "absolute", top: 2, left: on ? 20 : 2, transition: "left 0.2s" }} />
    </div>
  );

  const MenuItem = ({ icon, title, sub, right, children }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px", borderBottom: "1px solid #F5F5F5", cursor: "pointer" }}>
      <div style={{ width: 32, height: 32, background: "#F5F5F5", border: "1.5px solid #EBEBEB", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#111", fontWeight: 600 }}>{title}</div>
        {sub && <div style={{ fontSize: 10, color: "#AAA", marginTop: 1 }}>{sub}</div>}
      </div>
      {children || (right && <div style={{ fontSize: 14, color: "#CCC" }}>›</div>)}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ background: "#111", padding: "24px 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 58, height: 58, background: "#444", border: "2px solid #FFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#FFF", fontWeight: 700, flexShrink: 0 }}>CE</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#FFF", marginBottom: 2 }}>Carol Ehab Anwar</div>
          <div style={{ fontSize: 10, color: "#888", marginBottom: 7 }}>Business Analyst · Requra Team</div>
          <div style={{ display: "inline-block", padding: "2px 10px", background: "#FFF", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#111" }}>⚡ Pro Plan</div>
        </div>
        <button style={{ padding: "6px 12px", border: "1px solid #555", borderRadius: 5, fontSize: 11, color: "#999", background: "none", cursor: "pointer" }}>Edit</button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", background: "#FFF", borderBottom: "1px solid #EDEDED" }}>
        {[["12", "Projects"], ["87", "Stories"], ["6", "Exports"]].map(([n, l], i) => (
          <div key={l} style={{ flex: 1, padding: "13px", textAlign: "center", borderRight: i < 2 ? "1px solid #EDEDED" : "none" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>{n}</div>
            <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {[
        {
          label: "Account", items: [
            { icon: "✉️", title: "Email", sub: "carol.ehab@requra.ai" },
            { icon: "🔒", title: "Change Password" },
            { icon: "👥", title: "Role", sub: "Business Analyst" },
          ]
        },
      ].map(sec => (
        <div key={sec.label}>
          <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 16px 4px", background: "#F8F8F7" }}>{sec.label}</div>
          <div style={{ background: "#FFF", borderTop: "1px solid #EDEDED", borderBottom: "1px solid #EDEDED" }}>
            {sec.items.map(item => <MenuItem key={item.title} {...item} right />)}
          </div>
        </div>
      ))}

      <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 16px 4px", background: "#F8F8F7" }}>Preferences</div>
      <div style={{ background: "#FFF", borderTop: "1px solid #EDEDED", borderBottom: "1px solid #EDEDED" }}>
        <MenuItem icon="🌐" title="Language" sub="English (Arabic coming soon)" right />
        <MenuItem icon="🔔" title="Push Notifications" sub="AI complete, approvals, comments">
          <Toggle on={notifs} onClick={() => setNotifs(!notifs)} />
        </MenuItem>
        <MenuItem icon="📧" title="Email Digests" sub="Weekly summary">
          <Toggle on={emails} onClick={() => setEmails(!emails)} />
        </MenuItem>
      </div>

      <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 16px 4px", background: "#F8F8F7" }}>Subscription</div>
      <div style={{ background: "#FFF", borderTop: "1px solid #EDEDED", borderBottom: "1px solid #EDEDED" }}>
        <MenuItem icon="⚡" title="Pro Plan" sub="Renews March 31, 2026" right />
        <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px" }}>
          <div style={{ width: 32, height: 32, background: "#F5F5F5", border: "1.5px solid #EBEBEB", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>📊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: "#111", fontWeight: 600 }}>Usage</div>
            <div style={{ fontSize: 10, color: "#AAA", marginTop: 1 }}>87 / 200 stories this month</div>
          </div>
          <div style={{ width: 72, height: 6, background: "#EBEBEB", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: "43%", height: "100%", background: "#111", borderRadius: 3 }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 8px" }}>
        <button style={{ width: "100%", height: 44, background: "#FFF", border: "1.5px solid #E03E3E", borderRadius: 10, fontSize: 13, color: "#E03E3E", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Sign Out
        </button>
        <div style={{ textAlign: "center", fontSize: 10, color: "#CCC", marginTop: 10, paddingBottom: 4 }}>Requra.AI v1.0.0 · Cairo, Egypt</div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");

  const screens = { home: HomeScreen, new: NewScreen, results: ResultsScreen, activity: ActivityScreen, profile: ProfileScreen };
  const ActiveScreen = screens[active];

  const navTitles = { home: "REQURA.AI", new: "New Upload", results: "Results", activity: "Activity", profile: "Profile" };

  return (
    <div style={{
      width: "100%", maxWidth: 430,
      height: "100dvh",
      margin: "0 auto",
      display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      background: "#F8F8F7",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Status Bar */}
      <div style={{ height: 44, background: "#111", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <div style={{ color: "#FFF", fontSize: 13, fontWeight: 700, letterSpacing: "0.02em" }}>9:41</div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ width: 12, height: 12, background: "#FFF", borderRadius: "50%", opacity: 0.8 }} />
          <div style={{ width: 14, height: 10, background: "#FFF", borderRadius: 2, opacity: 0.8 }} />
          <div style={{ width: 20, height: 12, background: "#FFF", borderRadius: 3, opacity: 0.8 }} />
        </div>
      </div>

      {/* Top Nav */}
      <div style={{ height: 56, background: "#FFF", borderBottom: "1.5px solid #EDEDED", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", flexShrink: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#111", letterSpacing: "0.06em" }}>{navTitles[active]}</div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 36, height: 36, background: "#F5F5F5", border: "1.5px solid #EDEDED", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            onClick={() => setActive("activity")}>
            <BellIcon active={false} dot={active !== "activity"} />
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <ActiveScreen onNavigate={setActive} />
      </div>

      {/* Bottom Tab Bar */}
      <div style={{
        height: 74, background: "#FFF", borderTop: "1.5px solid #EDEDED",
        display: "flex", alignItems: "flex-start", paddingTop: 10, flexShrink: 0,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
      }}>
        {/* Home */}
        <button onClick={() => setActive("home")} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", paddingTop: 0 }}>
          <HomeIcon active={active === "home"} />
          <span style={{ fontSize: 10, color: active === "home" ? "#111" : "#AAA", fontWeight: active === "home" ? 700 : 400 }}>Home</span>
        </button>

        {/* Results */}
        <button onClick={() => setActive("results")} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", paddingTop: 0 }}>
          <ResultsIcon active={active === "results"} />
          <span style={{ fontSize: 10, color: active === "results" ? "#111" : "#AAA", fontWeight: active === "results" ? 700 : 400 }}>Results</span>
        </button>

        {/* New (center FAB) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, marginTop: -22 }}>
          <button onClick={() => setActive("new")} style={{
            width: 54, height: 54, background: "#111", borderRadius: "50%", border: `3px solid #F8F8F7`,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)", fontSize: 26, color: "#FFF", lineHeight: 1,
          }}>+</button>
          <span style={{ fontSize: 10, color: active === "new" ? "#111" : "#AAA", fontWeight: active === "new" ? 700 : 400 }}>New</span>
        </div>

        {/* Activity */}
        <button onClick={() => setActive("activity")} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", paddingTop: 0 }}>
          <BellIcon active={active === "activity"} dot={active !== "activity"} />
          <span style={{ fontSize: 10, color: active === "activity" ? "#111" : "#AAA", fontWeight: active === "activity" ? 700 : 400 }}>Activity</span>
        </button>

        {/* Profile */}
        <button onClick={() => setActive("profile")} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", paddingTop: 0 }}>
          <UserIcon active={active === "profile"} />
          <span style={{ fontSize: 10, color: active === "profile" ? "#111" : "#AAA", fontWeight: active === "profile" ? 700 : 400 }}>Profile</span>
        </button>
      </div>
    </div>
  );
}
