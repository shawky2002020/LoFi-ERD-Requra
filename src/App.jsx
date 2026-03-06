import { useState } from "react";

const screens = [
  "Landing", "Login", "Register", "Dashboard", "NewProject", "Upload", "Processing",
  "Results", "StoryDetail", "Export", "StakeholderView", "Settings"
];

const screenLabels = {
  Landing: "Landing Page",
  Login: "Login",
  Register: "Register",
  Dashboard: "Dashboard",
  NewProject: "New Project Setup",
  Upload: "File Upload",
  Processing: "AI Processing",
  Results: "Results Dashboard",
  StoryDetail: "Story Detail / Edit",
  Export: "Export",
  StakeholderView: "Stakeholder View",
  Settings: "Profile & Settings",
};

// ── Shared wireframe primitives ──────────────────────────────────────────────
const Box = ({ w = "100%", h = 40, label = "", className = "", style = {} }) => (
  <div style={{
    width: w, height: h, background: "#e8e8e8", border: "1.5px dashed #aaa",
    borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, color: "#777", fontFamily: "monospace", flexShrink: 0, ...style
  }} className={className}>{label}</div>
);

const Btn = ({ label, primary, onClick, small, style = {} }) => (
  <button onClick={onClick} style={{
    padding: small ? "5px 12px" : "9px 20px",
    background: primary ? "#1a1a1a" : "#fff",
    color: primary ? "#fff" : "#1a1a1a",
    border: "1.5px solid #1a1a1a", borderRadius: 4,
    fontSize: small ? 11 : 12, fontFamily: "monospace", cursor: "pointer",
    fontWeight: 600, letterSpacing: "0.02em", ...style
  }}>{label}</button>
);

const Tag = ({ label, color = "#e8e8e8" }) => (
  <span style={{
    background: color, border: "1px solid #ccc", borderRadius: 3,
    padding: "2px 8px", fontSize: 10, fontFamily: "monospace", color: "#444"
  }}>{label}</span>
);

const Input = ({ placeholder, style = {} }) => (
  <div style={{
    width: "100%", height: 36, background: "#fff", border: "1.5px solid #ccc",
    borderRadius: 4, display: "flex", alignItems: "center", padding: "0 12px",
    fontSize: 11, color: "#aaa", fontFamily: "monospace", boxSizing: "border-box", ...style
  }}>{placeholder}</div>
);

const Section = ({ title, children, style = {} }) => (
  <div style={{ marginBottom: 20, ...style }}>
    <div style={{
      fontSize: 10, fontFamily: "monospace", color: "#999", textTransform: "uppercase",
      letterSpacing: "0.1em", marginBottom: 8, borderBottom: "1px solid #e0e0e0", paddingBottom: 4
    }}>
      {title}
    </div>
    {children}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fff", border: "1.5px solid #d0d0d0", borderRadius: 6,
    padding: 14, ...style
  }}>{children}</div>
);

// ── NAV BAR ──────────────────────────────────────────────────────────────────
const NavBar = ({ current, go, showSidebar = false }) => (
  <div style={{
    height: 48, background: "#1a1a1a", display: "flex", alignItems: "center",
    justifyContent: "space-between", padding: "0 20px", flexShrink: 0
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {showSidebar && (
        <div style={{
          width: 18, height: 12, display: "flex", flexDirection: "column",
          gap: 3, cursor: "pointer"
        }}>
          {[0, 1, 2].map(i => <div key={i} style={{ height: 2, background: "#666", borderRadius: 2 }} />)}
        </div>
      )}
      <span style={{
        color: "#fff", fontFamily: "monospace", fontWeight: 700,
        fontSize: 14, letterSpacing: "0.05em"
      }}>REQURA.AI</span>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {showSidebar ? (
        <>
          <Btn label="🔔" small />
          <Btn label="Profile" small onClick={() => go("Settings")} />
        </>
      ) : (
        <>
          <Btn label="Login" small onClick={() => go("Login")} />
          <Btn label="Get Started" small primary onClick={() => go("Register")} />
        </>
      )}
    </div>
  </div>
);

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = ({ go, current }) => {
  const items = [
    { label: "Dashboard", screen: "Dashboard", icon: "⊞" },
    { label: "New Project", screen: "NewProject", icon: "+" },
    { label: "Results", screen: "Results", icon: "≡" },
    { label: "Export", screen: "Export", icon: "↑" },
    { label: "Settings", screen: "Settings", icon: "⚙" },
  ];
  return (
    <div style={{
      width: 180, background: "#f7f7f7", borderRight: "1.5px solid #e0e0e0",
      padding: "16px 0", display: "flex", flexDirection: "column", flexShrink: 0
    }}>
      {items.map(item => (
        <div key={item.screen} onClick={() => go(item.screen)} style={{
          padding: "10px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
          background: current === item.screen ? "#e8e8e8" : "transparent",
          borderLeft: current === item.screen ? "3px solid #1a1a1a" : "3px solid transparent",
          fontSize: 12, fontFamily: "monospace", color: "#333", fontWeight: current === item.screen ? 700 : 400
        }}>
          <span style={{ fontSize: 14 }}>{item.icon}</span> {item.label}
        </div>
      ))}
    </div>
  );
};

// ── SCREEN: LANDING ──────────────────────────────────────────────────────────
const Landing = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="Landing" />
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: 40, gap: 32
    }}>
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <div style={{
          fontFamily: "monospace", fontSize: 11, color: "#999",
          textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12
        }}>
          AI Requirements Engineering
        </div>
        <Box w="100%" h={64} label="[ HERO HEADLINE — Transform Messy Inputs into Structured Requirements ]"
          style={{ marginBottom: 16, fontSize: 13 }} />
        <Box w="100%" h={36} label="[ Subheadline — Bridge stakeholder conversations & dev backlogs ]"
          style={{ marginBottom: 24, fontSize: 11 }} />
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn label="Get Started Free" primary onClick={() => go("Register")} />
          <Btn label="Watch Demo" onClick={() => { }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 700 }}>
        {["📄 Upload Transcripts", "🤖 AI Extracts Stories", "📊 Export to Jira"].map((f, i) => (
          <Card key={i} style={{ flex: 1, textAlign: "center" }}>
            <Box w="100%" h={48} label={f} style={{ marginBottom: 8 }} />
            <Box w="100%" h={32} label="Feature description text" style={{ fontSize: 10 }} />
          </Card>
        ))}
      </div>
      <Box w="100%" h={80} label="[ SOCIAL PROOF — Trusted by 200+ BAs and PMs in MENA ]"
        style={{ maxWidth: 700 }} />
    </div>
  </div>
);

// ── SCREEN: LOGIN ────────────────────────────────────────────────────────────
const Login = ({ go }) => (
  <div style={{
    minHeight: "100vh", background: "#fafafa", display: "flex",
    flexDirection: "column", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      width: 380, background: "#fff", border: "1.5px solid #d0d0d0",
      borderRadius: 8, padding: 32
    }}>
      <div style={{
        fontFamily: "monospace", fontWeight: 700, fontSize: 18,
        marginBottom: 4, textAlign: "center"
      }}>REQURA.AI</div>
      <div style={{
        fontFamily: "monospace", fontSize: 11, color: "#999",
        textAlign: "center", marginBottom: 24
      }}>Sign in to your account</div>
      <Section title="Email">
        <Input placeholder="analyst@company.com" />
      </Section>
      <Section title="Password">
        <Input placeholder="••••••••" />
      </Section>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <span style={{
          fontFamily: "monospace", fontSize: 11, color: "#666", cursor: "pointer",
          textDecoration: "underline"
        }}>Forgot password?</span>
      </div>
      <Btn label="Sign In" primary onClick={() => go("Dashboard")} style={{ width: "100%" }} />
      <div style={{ textAlign: "center", marginTop: 16, fontFamily: "monospace", fontSize: 11, color: "#999" }}>
        Don't have an account?{" "}
        <span style={{ color: "#1a1a1a", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => go("Register")}>Register</span>
      </div>
    </div>
  </div>
);

// ── SCREEN: REGISTER ─────────────────────────────────────────────────────────
const Register = ({ go }) => (
  <div style={{
    minHeight: "100vh", background: "#fafafa", display: "flex",
    flexDirection: "column", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      width: 400, background: "#fff", border: "1.5px solid #d0d0d0",
      borderRadius: 8, padding: 32
    }}>
      <div style={{
        fontFamily: "monospace", fontWeight: 700, fontSize: 18,
        marginBottom: 4, textAlign: "center"
      }}>Create Account</div>
      <div style={{
        fontFamily: "monospace", fontSize: 11, color: "#999",
        textAlign: "center", marginBottom: 24
      }}>Start extracting requirements in minutes</div>
      <Section title="Full Name"><Input placeholder="Your full name" /></Section>
      <Section title="Email"><Input placeholder="analyst@company.com" /></Section>
      <Section title="Role">
        <div style={{ display: "flex", gap: 8 }}>
          {["Business Analyst", "Project Manager", "Other"].map(r => (
            <div key={r} style={{
              flex: 1, height: 32, background: "#f0f0f0",
              border: "1.5px solid #ccc", borderRadius: 4, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 10,
              fontFamily: "monospace", cursor: "pointer", color: "#555"
            }}>{r}</div>
          ))}
        </div>
      </Section>
      <Section title="Password"><Input placeholder="Min 8 characters" /></Section>
      <Btn label="Create Account" primary onClick={() => go("Dashboard")} style={{ width: "100%", marginTop: 8 }} />
      <div style={{ textAlign: "center", marginTop: 16, fontFamily: "monospace", fontSize: 11, color: "#999" }}>
        Already have an account?{" "}
        <span style={{ color: "#1a1a1a", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => go("Login")}>Sign in</span>
      </div>
    </div>
  </div>
);

// ── SCREEN: DASHBOARD ────────────────────────────────────────────────────────
const Dashboard = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="Dashboard" showSidebar />
    <div style={{ display: "flex", flex: 1 }}>
      <Sidebar go={go} current="Dashboard" />
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>Dashboard</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999" }}>Welcome back — here's your workspace</div>
          </div>
          <Btn label="+ New Project" primary onClick={() => go("NewProject")} />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
          {[["12", "Total Projects"], ["87", "User Stories Generated"], ["4.2h", "Avg. Time Saved"], ["3", "Pending Review"]].map(([v, l]) => (
            <Card key={l} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{v}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#999" }}>{l}</div>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Section title="Recent Projects">
          {[
            { name: "E-Commerce Platform", client: "Acme Corp", status: "Ready", stories: 14 },
            { name: "CRM System Revamp", client: "TechStart", status: "Processing", stories: 0 },
            { name: "Mobile Banking App", client: "FinBank", status: "Exported", stories: 22 },
            { name: "HR Portal", client: "GlobalCo", status: "Ready", stories: 9 },
          ].map((p, i) => (
            <Card key={i} style={{
              marginBottom: 10, display: "flex", alignItems: "center",
              gap: 16, cursor: "pointer"
            }} onClick={() => go("Results")}>
              <Box w={40} h={40} label="" style={{ flexShrink: 0, borderRadius: "50%" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#999" }}>{p.client}</div>
              </div>
              <Tag label={p.status} color={p.status === "Ready" ? "#d4f0d4" : p.status === "Processing" ? "#fff3cc" : "#e0e0e0"} />
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "#777", minWidth: 80, textAlign: "right" }}>
                {p.stories > 0 ? `${p.stories} stories` : "In progress..."}
              </div>
              <Btn label="Open →" small onClick={(e) => { e.stopPropagation(); go("Results"); }} />
            </Card>
          ))}
        </Section>
      </div>
    </div>
  </div>
);

// ── SCREEN: NEW PROJECT ───────────────────────────────────────────────────────
const NewProject = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="NewProject" showSidebar />
    <div style={{ display: "flex", flex: 1 }}>
      <Sidebar go={go} current="NewProject" />
      <div style={{ flex: 1, padding: 28, maxWidth: 640 }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>New Project</div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999", marginBottom: 24 }}>Set up your project details before uploading inputs</div>

        <Card>
          <Section title="Project Name"><Input placeholder="e.g. E-Commerce Platform v2" /></Section>
          <Section title="Client / Stakeholder Name"><Input placeholder="e.g. Acme Corporation" /></Section>
          <Section title="Description"><Box w="100%" h={72} label="[ Multi-line text area — project context ]" /></Section>
          <Section title="Team Members">
            <div style={{ display: "flex", gap: 8 }}>
              <Input placeholder="Add team member email..." style={{ flex: 1 }} />
              <Btn label="Add" small />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              {["carol@team.com", "hassan@team.com"].map(m => (
                <Tag key={m} label={`✕ ${m}`} />
              ))}
            </div>
          </Section>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Btn label="Cancel" onClick={() => go("Dashboard")} />
            <Btn label="Continue to Upload →" primary onClick={() => go("Upload")} />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// ── SCREEN: UPLOAD ────────────────────────────────────────────────────────────
const Upload = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="Upload" showSidebar />
    <div style={{ display: "flex", flex: 1 }}>
      <Sidebar go={go} current="NewProject" />
      <div style={{ flex: 1, padding: 28, maxWidth: 640 }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Upload Inputs</div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999", marginBottom: 24 }}>Upload files or paste your transcript directly</div>

        {/* Upload Zone */}
        <div style={{
          border: "2px dashed #bbb", borderRadius: 8, padding: 36,
          textAlign: "center", background: "#f0f0f0", marginBottom: 20, cursor: "pointer"
        }}>
          <Box w={48} h={48} label="↑" style={{ margin: "0 auto 12px", borderRadius: "50%", fontSize: 20 }} />
          <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Drag & Drop Files Here</div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#999", marginBottom: 14 }}>
            Supports: PDF, DOCX, TXT, MP3, MP4
          </div>
          <Btn label="Browse Files" small />
        </div>

        {/* Uploaded Files */}
        <Section title="Uploaded Files">
          {[
            { name: "stakeholder_meeting_jan.pdf", size: "2.4 MB", type: "PDF" },
            { name: "project_brief.docx", size: "540 KB", type: "DOCX" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", background: "#fff", border: "1.5px solid #d0d0d0",
              borderRadius: 4, marginBottom: 8
            }}>
              <Tag label={f.type} />
              <div style={{ flex: 1, fontFamily: "monospace", fontSize: 12 }}>{f.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#999" }}>{f.size}</div>
              <span style={{ cursor: "pointer", color: "#999", fontSize: 14 }}>✕</span>
            </div>
          ))}
        </Section>

        {/* OR Paste */}
        <Section title="— OR Paste Text Directly —">
          <Box w="100%" h={100} label="[ Text area — paste meeting transcript or notes here ]" />
        </Section>

        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <Btn label="← Back" onClick={() => go("NewProject")} />
          <Btn label="Start AI Processing →" primary onClick={() => go("Processing")} />
        </div>
      </div>
    </div>
  </div>
);

// ── SCREEN: PROCESSING ────────────────────────────────────────────────────────
const Processing = ({ go }) => {
  const steps = [
    { label: "Parsing document structure", done: true },
    { label: "Identifying actors & stakeholders", done: true },
    { label: "Extracting functional requirements", done: true },
    { label: "Generating user stories", done: false, active: true },
    { label: "Classifying requirement types", done: false },
    { label: "Generating executive summary", done: false },
  ];
  return (
    <div style={{
      minHeight: "100vh", background: "#fafafa", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center"
    }}>
      <Card style={{ width: 440, textAlign: "center" }}>
        <Box w={64} h={64} label="🤖" style={{ margin: "0 auto 20px", borderRadius: "50%", fontSize: 28 }} />
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
          AI Processing in Progress
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999", marginBottom: 24 }}>
          Analyzing your inputs and extracting requirements...
        </div>

        {/* Progress Bar */}
        <div style={{ height: 6, background: "#e8e8e8", borderRadius: 3, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ width: "65%", height: "100%", background: "#1a1a1a", borderRadius: 3 }} />
        </div>

        {/* Steps */}
        <div style={{ textAlign: "left" }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "8px 0", borderBottom: i < steps.length - 1 ? "1px solid #f0f0f0" : "none"
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                background: s.done ? "#1a1a1a" : s.active ? "#e8e8e8" : "#f5f5f5",
                border: s.active ? "2px dashed #aaa" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "#fff"
              }}>
                {s.done ? "✓" : s.active ? "..." : ""}
              </div>
              <div style={{
                fontFamily: "monospace", fontSize: 11,
                color: s.done ? "#333" : s.active ? "#666" : "#bbb",
                fontWeight: s.active ? 600 : 400
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <Btn label="View Results →" primary onClick={() => go("Results")} style={{ width: "100%" }} />
        </div>
      </Card>
    </div>
  );
};

// ── SCREEN: RESULTS DASHBOARD ─────────────────────────────────────────────────
const Results = ({ go }) => {
  const [tab, setTab] = useState("stories");
  const tabs = [
    { id: "stories", label: "User Stories (8)" },
    { id: "functional", label: "Functional Req. (5)" },
    { id: "summary", label: "Executive Summary" },
    { id: "classifications", label: "Classifications" },
  ];
  const stories = [
    { title: "User Registration", actor: "New User", goal: "create an account", benefit: "access the platform", tag: "Functional", approved: false },
    { title: "Upload Meeting Transcript", actor: "Business Analyst", goal: "upload a PDF transcript", benefit: "AI can extract requirements", tag: "Functional", approved: true },
    { title: "View Generated Stories", actor: "Project Manager", goal: "view all generated user stories", benefit: "review and approve them", tag: "Functional", approved: false },
    { title: "Export to Excel", actor: "Business Analyst", goal: "export stories as Excel/CSV", benefit: "import into Jira", tag: "Business", approved: false },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
      <NavBar go={go} current="Results" showSidebar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar go={go} current="Results" />
        <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>E-Commerce Platform v2</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999" }}>Acme Corp — Generated 2 min ago</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn label="Share →" small onClick={() => go("StakeholderView")} />
              <Btn label="Export ↑" small primary onClick={() => go("Export")} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "2px solid #e0e0e0", marginBottom: 20 }}>
            {tabs.map(t => (
              <div key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "8px 16px", fontFamily: "monospace", fontSize: 11, cursor: "pointer",
                borderBottom: tab === t.id ? "2px solid #1a1a1a" : "2px solid transparent",
                marginBottom: -2, fontWeight: tab === t.id ? 700 : 400,
                color: tab === t.id ? "#1a1a1a" : "#999"
              }}>{t.label}</div>
            ))}
          </div>

          {tab === "stories" && (
            <div>
              {stories.map((s, i) => (
                <Card key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13 }}>{s.title}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Tag label={s.tag} color={s.tag === "Functional" ? "#d4f0d4" : "#fff3cc"} />
                      {s.approved && <Tag label="✓ Approved" color="#d4f0d4" />}
                    </div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#555", marginBottom: 10, lineHeight: 1.7 }}>
                    <span style={{ color: "#999" }}>As a</span> <b>{s.actor}</b>
                    <span style={{ color: "#999" }}>, I want to</span> {s.goal}
                    <span style={{ color: "#999" }}>, so that</span> {s.benefit}.
                  </div>
                  <Box w="100%" h={32} label="[ Acceptance Criteria placeholder ]" style={{ marginBottom: 10, fontSize: 10 }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn label="✏ Edit" small onClick={() => go("StoryDetail")} />
                    <Btn label="✓ Approve" small />
                    <Btn label="🗑 Delete" small />
                    <Btn label="↺ Regenerate" small />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tab === "functional" && (
            <div>
              {["The system must support PDF, DOCX, and audio file ingestion.",
                "The system must generate user stories in As a/I want/So that format.",
                "The system must classify requirements as Functional, Non-Functional, or Business.",
                "The system must provide Excel/CSV export functionality.",
                "The system must generate an executive summary from uploaded inputs."].map((r, i) => (
                  <Card key={i} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 24, height: 24, background: "#e8e8e8", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "monospace", fontSize: 11, flexShrink: 0
                    }}>{i + 1}</div>
                    <div style={{ flex: 1, fontFamily: "monospace", fontSize: 12 }}>{r}</div>
                    <Btn label="Edit" small />
                  </Card>
                ))}
            </div>
          )}

          {tab === "summary" && (
            <Card>
              <Section title="Key Decisions">
                <Box w="100%" h={60} label="[ AI-generated summary of key decisions from transcript ]" />
              </Section>
              <Section title="Open Questions">
                {["How will payment gateway integration be handled?",
                  "What is the expected user load for the first release?",
                  "Is Arabic language support required in Phase 1?"].map((q, i) => (
                    <div key={i} style={{
                      fontFamily: "monospace", fontSize: 12, padding: "8px 0",
                      borderBottom: "1px solid #f0f0f0", color: "#555"
                    }}>⚠ {q}</div>
                  ))}
              </Section>
              <Section title="Action Items">
                <Box w="100%" h={60} label="[ List of follow-up actions identified from discussion ]" />
              </Section>
            </Card>
          )}

          {tab === "classifications" && (
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Functional", count: 5, color: "#d4f0d4" },
                { label: "Non-Functional", count: 2, color: "#d4e8f0" },
                { label: "Business Rules", count: 1, color: "#fff3cc" },
              ].map(c => (
                <Card key={c.label} style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <Tag label={c.label} color={c.color} />
                    <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700 }}>{c.count}</span>
                  </div>
                  <Box w="100%" h={80} label={`[ ${c.label} items list ]`} />
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── SCREEN: STORY DETAIL ──────────────────────────────────────────────────────
const StoryDetail = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="StoryDetail" showSidebar />
    <div style={{ display: "flex", flex: 1 }}>
      <Sidebar go={go} current="Results" />
      <div style={{ flex: 1, padding: 28, maxWidth: 640 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: "monospace", fontSize: 12, cursor: "pointer", color: "#999" }}
            onClick={() => go("Results")}>← Results</span>
          <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18 }}>Edit User Story</div>
        </div>
        <Card>
          <Section title="Story Title"><Input placeholder="Upload Meeting Transcript" /></Section>
          <Section title="Classification">
            <div style={{ display: "flex", gap: 8 }}>
              {["Functional", "Non-Functional", "Business Rule"].map(c => (
                <div key={c} style={{
                  flex: 1, height: 32, background: c === "Functional" ? "#1a1a1a" : "#f0f0f0",
                  border: "1.5px solid #ccc", borderRadius: 4, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 10, fontFamily: "monospace", cursor: "pointer",
                  color: c === "Functional" ? "#fff" : "#555"
                }}>{c}</div>
              ))}
            </div>
          </Section>
          <Section title="As a (Actor)"><Input placeholder="Business Analyst" /></Section>
          <Section title="I want to (Goal)"><Input placeholder="upload a PDF transcript" /></Section>
          <Section title="So that (Benefit)"><Input placeholder="AI can extract requirements from it" /></Section>
          <Section title="Acceptance Criteria">
            {["File must be PDF, DOCX, or TXT format", "File size must not exceed 50MB",
              "Upload confirmation message is shown"].map((ac, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Box w={16} h={16} label="✓" style={{ flexShrink: 0, borderRadius: 2, fontSize: 9 }} />
                  <Input placeholder={ac} style={{ flex: 1 }} />
                  <span style={{ cursor: "pointer", color: "#aaa" }}>✕</span>
                </div>
              ))}
            <Btn label="+ Add Criterion" small style={{ marginTop: 4 }} />
          </Section>
          <Section title="AI Source Trace (Future 🔒)">
            <Box w="100%" h={40} label="[ Trace: Generated from transcript line 42-48, page 3 ]"
              style={{ background: "#f5f5f5", fontSize: 10 }} />
          </Section>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Btn label="Cancel" onClick={() => go("Results")} />
            <Btn label="↺ Regenerate with AI" small />
            <Btn label="Save Changes" primary onClick={() => go("Results")} />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// ── SCREEN: EXPORT ────────────────────────────────────────────────────────────
const Export = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="Export" showSidebar />
    <div style={{ display: "flex", flex: 1 }}>
      <Sidebar go={go} current="Export" />
      <div style={{ flex: 1, padding: 28 }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Export</div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999", marginBottom: 24 }}>Download approved requirements in your preferred format</div>

        {/* Format Selection */}
        <Section title="Export Format">
          <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Excel (.xlsx)", sub: "Jira-ready format", active: true },
              { label: "CSV (.csv)", sub: "Raw data export", active: false },
              { label: "Jira Push 🔒", sub: "Post-MVP feature", active: false, disabled: true },
              { label: "Azure DevOps 🔒", sub: "Post-MVP feature", active: false, disabled: true },
            ].map(f => (
              <Card key={f.label} style={{
                flex: 1, textAlign: "center", cursor: f.disabled ? "default" : "pointer",
                opacity: f.disabled ? 0.4 : 1, background: f.active ? "#1a1a1a" : "#fff"
              }}>
                <div style={{
                  fontFamily: "monospace", fontSize: 12, fontWeight: 600,
                  color: f.active ? "#fff" : "#333", marginBottom: 4
                }}>{f.label}</div>
                <div style={{
                  fontFamily: "monospace", fontSize: 10,
                  color: f.active ? "#aaa" : "#999"
                }}>{f.sub}</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Column Mapping */}
        <Section title="Jira Column Mapping">
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["Story Title", "Summary"], ["Actor", "Reporter"], ["Goal", "Description"], ["Classification", "Issue Type"],
              ["Acceptance Criteria", "Acceptance Criteria"], ["Status", "Status"]].map(([from, to]) => (
                <div key={from} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, fontFamily: "monospace", fontSize: 11, color: "#555" }}>{from}</div>
                  <span style={{ color: "#aaa", fontSize: 12 }}>→</span>
                  <div style={{
                    flex: 1, fontFamily: "monospace", fontSize: 11, color: "#333",
                    background: "#f5f5f5", padding: "4px 8px", borderRadius: 3
                  }}>{to}</div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Preview Table */}
        <Section title="Preview (8 Approved Stories)">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace", fontSize: 11 }}>
              <thead>
                <tr style={{ background: "#1a1a1a", color: "#fff" }}>
                  {["#", "Title", "Actor", "Classification", "Status"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[["1", "User Registration", "New User", "Functional", "✓ Approved"],
                ["2", "Upload Transcript", "Business Analyst", "Functional", "✓ Approved"],
                ["3", "View Stories", "Project Manager", "Functional", "✓ Approved"],
                ["4", "Export to Excel", "BA", "Business", "✓ Approved"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #e8e8e8" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "8px 12px", color: "#444" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div style={{ display: "flex", gap: 12 }}>
          <Btn label="← Back to Results" onClick={() => go("Results")} />
          <Btn label="⬇ Download Excel" primary onClick={() => { }} />
        </div>
      </div>
    </div>
  </div>
);

// ── SCREEN: STAKEHOLDER VIEW ──────────────────────────────────────────────────
const StakeholderView = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <div style={{
      height: 48, background: "#1a1a1a", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 20px", flexShrink: 0
    }}>
      <span style={{ color: "#fff", fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}>REQURA.AI</span>
      <Tag label="Read-only View" color="#333" />
    </div>
    <div style={{ flex: 1, padding: "28px 40px", maxWidth: 780, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 20 }}>E-Commerce Platform v2</div>
        <Btn label="✓ Approve All" primary />
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999", marginBottom: 24 }}>
        Shared by: Carol Ehab — Acme Corp
      </div>

      <Section title="Executive Summary">
        <Card>
          <Box w="100%" h={72} label="[ Summary of key decisions and open questions from the meeting ]" />
        </Card>
      </Section>

      <Section title="User Stories for Review">
        {[
          { title: "User Registration", actor: "New User", goal: "create an account", benefit: "access the platform" },
          { title: "Upload Transcript", actor: "Business Analyst", goal: "upload a PDF", benefit: "AI extracts requirements" },
          { title: "Export to Excel", actor: "BA", goal: "download as Excel", benefit: "import into Jira" },
        ].map((s, i) => (
          <Card key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13 }}>{s.title}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn label="✓ Approve" small primary />
                <Btn label="💬 Comment" small />
              </div>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#555", marginBottom: 8, lineHeight: 1.7 }}>
              <span style={{ color: "#999" }}>As a</span> <b>{s.actor}</b>
              <span style={{ color: "#999" }}>, I want to</span> {s.goal}
              <span style={{ color: "#999" }}>, so that</span> {s.benefit}.
            </div>
            <Box w="100%" h={28} label="[ Acceptance Criteria ]" style={{ fontSize: 10 }} />
          </Card>
        ))}
      </Section>

      {/* Comment Box */}
      <Section title="Leave General Comment">
        <Card>
          <Box w="100%" h={72} label="[ Text area — general feedback for the BA/PM ]" style={{ marginBottom: 12 }} />
          <Btn label="Submit Comment" primary />
        </Card>
      </Section>
    </div>
  </div>
);

// ── SCREEN: SETTINGS ──────────────────────────────────────────────────────────
const Settings = ({ go }) => (
  <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
    <NavBar go={go} current="Settings" showSidebar />
    <div style={{ display: "flex", flex: 1 }}>
      <Sidebar go={go} current="Settings" />
      <div style={{ flex: 1, padding: 28, maxWidth: 600 }}>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Profile & Settings</div>

        <Section title="Account Information">
          <Card>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
              <Box w={56} h={56} label="👤" style={{ borderRadius: "50%", fontSize: 24, flexShrink: 0 }} />
              <Btn label="Change Photo" small />
            </div>
            <Section title="Full Name"><Input placeholder="Carol Ehab Anwar" /></Section>
            <Section title="Email"><Input placeholder="carol@requra.ai" /></Section>
            <Section title="Role"><Input placeholder="Business Analyst" /></Section>
            <Btn label="Save Changes" primary />
          </Card>
        </Section>

        <Section title="Language Preferences">
          <Card>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                flex: 1, height: 36, background: "#1a1a1a", border: "1.5px solid #1a1a1a",
                borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontFamily: "monospace", color: "#fff", cursor: "pointer"
              }}>🇬🇧 English</div>
              <div style={{
                flex: 1, height: 36, background: "#f5f5f5", border: "1.5px solid #ccc",
                borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontFamily: "monospace", color: "#aaa", cursor: "pointer"
              }}>🇦🇪 Arabic 🔒</div>
            </div>
          </Card>
        </Section>

        <Section title="Subscription">
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 13 }}>Free Plan</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#999" }}>5 projects / 20 stories per month</div>
              </div>
              <Btn label="Upgrade ↑" primary small />
            </div>
          </Card>
        </Section>

        <Section title="Notifications">
          <Card>
            {["Email alerts for new comments", "In-app notifications", "Stakeholder activity alerts"].map((n, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: i < 2 ? "1px solid #f0f0f0" : "none"
              }}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#333" }}>{n}</span>
                <Box w={40} h={22} label="ON" style={{
                  borderRadius: 11, background: "#1a1a1a",
                  color: "#fff", fontSize: 9, cursor: "pointer"
                }} />
              </div>
            ))}
          </Card>
        </Section>
      </div>
    </div>
  </div>
);

// ── SCREEN MAP ────────────────────────────────────────────────────────────────
const screenMap = {
  Landing, Login, Register, Dashboard, NewProject, Upload,
  Processing, Results, StoryDetail, Export, StakeholderView, Settings
};

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState("Landing");
  const Screen = screenMap[current];

  return (
    <div style={{ fontFamily: "monospace" }}>
      {/* Screen Picker */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: "#111", borderTop: "2px solid #333", padding: "8px 16px",
        display: "flex", gap: 6, overflowX: "auto", alignItems: "center"
      }}>
        <span style={{
          color: "#666", fontSize: 9, textTransform: "uppercase",
          letterSpacing: "0.1em", whiteSpace: "nowrap", marginRight: 4
        }}>SCREENS:</span>
        {screens.map(s => (
          <button key={s} onClick={() => setCurrent(s)} style={{
            padding: "4px 10px", background: current === s ? "#fff" : "transparent",
            color: current === s ? "#111" : "#888", border: "1px solid",
            borderColor: current === s ? "#fff" : "#444",
            borderRadius: 3, fontSize: 10, cursor: "pointer", whiteSpace: "nowrap",
            fontFamily: "monospace", fontWeight: current === s ? 700 : 400
          }}>{screenLabels[s]}</button>
        ))}
      </div>
      {/* Current Screen */}
      <div style={{ paddingBottom: 50 }}>
        <Screen go={setCurrent} />
      </div>
    </div>
  );
}
