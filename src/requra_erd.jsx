import { useState } from "react";

const COLORS = {
  bg: "#0a0e1a",
  surface: "#111827",
  card: "#161d2e",
  border: "#1e2d45",
  accent: "#3b82f6",
  accentGlow: "#3b82f620",
  green: "#10b981",
  amber: "#f59e0b",
  purple: "#8b5cf6",
  red: "#ef4444",
  cyan: "#06b6d4",
  text: "#e2e8f0",
  muted: "#64748b",
  dim: "#334155",
};

const TABLES = {
  users: {
    label: "users",
    color: COLORS.accent,
    x: 40, y: 40,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "email", type: "VARCHAR(255)", unique: true, notNull: true },
      { name: "password_hash", type: "TEXT", notNull: true },
      { name: "full_name", type: "VARCHAR(255)", notNull: true },
      { name: "role", type: "ENUM(analyst,pm,stakeholder)", notNull: true },
      { name: "preferred_language", type: "ENUM(en,ar)", default: "en" },
      { name: "avatar_url", type: "TEXT" },
      { name: "is_active", type: "BOOLEAN", default: "true" },
      { name: "last_login_at", type: "TIMESTAMPTZ" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  projects: {
    label: "projects",
    color: COLORS.green,
    x: 460, y: 40,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "owner_id", type: "UUID", fk: "users.id", notNull: true },
      { name: "name", type: "VARCHAR(255)", notNull: true },
      { name: "description", type: "TEXT" },
      { name: "language", type: "ENUM(en,ar)", default: "en" },
      { name: "status", type: "ENUM(active,archived,deleted)", default: "active" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  documents: {
    label: "documents",
    color: COLORS.amber,
    x: 460, y: 360,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "project_id", type: "UUID", fk: "projects.id", notNull: true },
      { name: "uploaded_by", type: "UUID", fk: "users.id", notNull: true },
      { name: "title", type: "VARCHAR(255)", notNull: true },
      { name: "type", type: "ENUM(pdf,docx,audio,live_session)", notNull: true },
      { name: "language", type: "ENUM(en,ar)", default: "en" },
      { name: "storage_url", type: "TEXT" },
      { name: "file_size_bytes", type: "BIGINT" },
      { name: "duration_seconds", type: "INTEGER" },
      { name: "transcript_text", type: "TEXT" },
      { name: "status", type: "ENUM(pending,processing,ready,failed)", default: "pending" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  live_sessions: {
    label: "live_sessions",
    color: COLORS.cyan,
    x: 880, y: 360,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "document_id", type: "UUID", fk: "documents.id", notNull: true },
      { name: "host_user_id", type: "UUID", fk: "users.id", notNull: true },
      { name: "session_token", type: "TEXT", unique: true },
      { name: "started_at", type: "TIMESTAMPTZ" },
      { name: "ended_at", type: "TIMESTAMPTZ" },
      { name: "status", type: "ENUM(scheduled,live,ended)", default: "scheduled" },
      { name: "platform_url", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  ai_jobs: {
    label: "ai_jobs",
    color: COLORS.purple,
    x: 460, y: 720,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "document_id", type: "UUID", fk: "documents.id", notNull: true },
      { name: "triggered_by", type: "UUID", fk: "users.id", notNull: true },
      { name: "job_type", type: "ENUM(extraction,summarization,classification,full)", notNull: true },
      { name: "status", type: "ENUM(queued,processing,completed,failed)", default: "queued" },
      { name: "language", type: "ENUM(en,ar)", default: "en" },
      { name: "model_version", type: "VARCHAR(50)" },
      { name: "error_message", type: "TEXT" },
      { name: "started_at", type: "TIMESTAMPTZ" },
      { name: "completed_at", type: "TIMESTAMPTZ" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  user_stories: {
    label: "user_stories",
    color: COLORS.accent,
    x: 40, y: 440,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "project_id", type: "UUID", fk: "projects.id", notNull: true },
      { name: "ai_job_id", type: "UUID", fk: "ai_jobs.id" },
      { name: "title", type: "VARCHAR(500)", notNull: true },
      { name: "as_a", type: "TEXT", notNull: true },
      { name: "i_want", type: "TEXT", notNull: true },
      { name: "so_that", type: "TEXT", notNull: true },
      { name: "acceptance_criteria", type: "JSONB" },
      { name: "requirement_type", type: "ENUM(functional,non_functional,business_rule)", notNull: true },
      { name: "language", type: "ENUM(en,ar)", default: "en" },
      { name: "status", type: "ENUM(draft,approved,rejected)", default: "draft" },
      { name: "priority", type: "ENUM(low,medium,high,critical)", default: "medium" },
      { name: "jira_ticket_id", type: "VARCHAR(100)" },
      { name: "created_by", type: "UUID", fk: "users.id" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  functional_requirements: {
    label: "functional_requirements",
    color: COLORS.green,
    x: 40, y: 860,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "project_id", type: "UUID", fk: "projects.id", notNull: true },
      { name: "ai_job_id", type: "UUID", fk: "ai_jobs.id" },
      { name: "title", type: "VARCHAR(500)", notNull: true },
      { name: "description", type: "TEXT", notNull: true },
      { name: "requirement_type", type: "ENUM(functional,non_functional,business_rule)", notNull: true },
      { name: "language", type: "ENUM(en,ar)", default: "en" },
      { name: "status", type: "ENUM(draft,approved,rejected)", default: "draft" },
      { name: "source_document_id", type: "UUID", fk: "documents.id" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  meeting_summaries: {
    label: "meeting_summaries",
    color: COLORS.amber,
    x: 880, y: 40,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "document_id", type: "UUID", fk: "documents.id", notNull: true },
      { name: "ai_job_id", type: "UUID", fk: "ai_jobs.id" },
      { name: "executive_summary", type: "TEXT", notNull: true },
      { name: "key_decisions", type: "JSONB" },
      { name: "open_questions", type: "JSONB" },
      { name: "language", type: "ENUM(en,ar)", default: "en" },
      { name: "status", type: "ENUM(draft,approved)", default: "draft" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  comments: {
    label: "comments",
    color: COLORS.cyan,
    x: 880, y: 660,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "user_story_id", type: "UUID", fk: "user_stories.id", notNull: true },
      { name: "author_id", type: "UUID", fk: "users.id", notNull: true },
      { name: "content", type: "TEXT", notNull: true },
      { name: "parent_comment_id", type: "UUID", fk: "comments.id" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
      { name: "updated_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  approvals: {
    label: "approvals",
    color: COLORS.red,
    x: 880, y: 900,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "user_story_id", type: "UUID", fk: "user_stories.id" },
      { name: "requirement_id", type: "UUID", fk: "functional_requirements.id" },
      { name: "reviewer_id", type: "UUID", fk: "users.id", notNull: true },
      { name: "decision", type: "ENUM(approved,rejected,pending)", default: "pending" },
      { name: "notes", type: "TEXT" },
      { name: "reviewed_at", type: "TIMESTAMPTZ" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
  export_logs: {
    label: "export_logs",
    color: COLORS.purple,
    x: 1280, y: 400,
    columns: [
      { name: "id", type: "UUID", pk: true },
      { name: "project_id", type: "UUID", fk: "projects.id", notNull: true },
      { name: "exported_by", type: "UUID", fk: "users.id", notNull: true },
      { name: "format", type: "ENUM(excel,csv,json)", notNull: true },
      { name: "record_count", type: "INTEGER" },
      { name: "file_url", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMPTZ", default: "now()" },
    ],
  },
};

const TABLE_WIDTH = 320;
const ROW_H = 22;
const HEADER_H = 36;

function getTableHeight(table) {
  return HEADER_H + table.columns.length * ROW_H + 10;
}

function getBadge(col) {
  if (col.pk) return { label: "PK", color: "#f59e0b" };
  if (col.fk) return { label: "FK", color: "#8b5cf6" };
  if (col.unique) return { label: "UQ", color: "#06b6d4" };
  return null;
}

const RELATIONSHIPS = [
  { from: "users", to: "projects", fromCol: "id", toCol: "owner_id" },
  { from: "users", to: "documents", fromCol: "id", toCol: "uploaded_by" },
  { from: "projects", to: "documents", fromCol: "id", toCol: "project_id" },
  { from: "documents", to: "live_sessions", fromCol: "id", toCol: "document_id" },
  { from: "documents", to: "ai_jobs", fromCol: "id", toCol: "document_id" },
  { from: "projects", to: "user_stories", fromCol: "id", toCol: "project_id" },
  { from: "ai_jobs", to: "user_stories", fromCol: "id", toCol: "ai_job_id" },
  { from: "projects", to: "functional_requirements", fromCol: "id", toCol: "project_id" },
  { from: "ai_jobs", to: "functional_requirements", fromCol: "id", toCol: "ai_job_id" },
  { from: "documents", to: "meeting_summaries", fromCol: "id", toCol: "document_id" },
  { from: "user_stories", to: "comments", fromCol: "id", toCol: "user_story_id" },
  { from: "user_stories", to: "approvals", fromCol: "id", toCol: "user_story_id" },
  { from: "projects", to: "export_logs", fromCol: "id", toCol: "project_id" },
];

function getColY(table, colName) {
  const idx = table.columns.findIndex(c => c.name === colName);
  return table.y + HEADER_H + idx * ROW_H + ROW_H / 2;
}

function TableNode({ table, tableKey, isHighlighted, onHover }) {
  const height = getTableHeight(table);
  return (
    <g
      transform={`translate(${table.x}, ${table.y})`}
      onMouseEnter={() => onHover(tableKey)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "pointer" }}
    >
      {/* Glow shadow */}
      {isHighlighted && (
        <rect
          x={-4} y={-4}
          width={TABLE_WIDTH + 8}
          height={height + 8}
          rx={10}
          fill="none"
          stroke={table.color}
          strokeWidth={2}
          opacity={0.5}
          filter="url(#glow)"
        />
      )}
      {/* Card background */}
      <rect
        width={TABLE_WIDTH} height={height}
        rx={8}
        fill={COLORS.card}
        stroke={isHighlighted ? table.color : COLORS.border}
        strokeWidth={isHighlighted ? 1.5 : 1}
      />
      {/* Header */}
      <rect
        width={TABLE_WIDTH} height={HEADER_H}
        rx={8}
        fill={table.color + "22"}
      />
      <rect y={HEADER_H - 8} width={TABLE_WIDTH} height={8} fill={table.color + "22"} />
      <rect
        x={0} y={HEADER_H - 1}
        width={TABLE_WIDTH} height={1}
        fill={table.color + "66"}
      />
      {/* Color dot */}
      <circle cx={16} cy={HEADER_H / 2} r={5} fill={table.color} />
      <text
        x={30} y={HEADER_H / 2 + 5}
        fill={table.color}
        fontSize={13}
        fontWeight="700"
        fontFamily="'JetBrains Mono', 'Fira Code', monospace"
        letterSpacing="0.5"
      >
        {table.label}
      </text>

      {/* Columns */}
      {table.columns.map((col, i) => {
        const y = HEADER_H + i * ROW_H;
        const badge = getBadge(col);
        return (
          <g key={col.name}>
            {i % 2 === 0 && (
              <rect x={1} y={y} width={TABLE_WIDTH - 2} height={ROW_H} fill="#ffffff04" />
            )}
            {badge && (
              <g>
                <rect x={8} y={y + 4} width={22} height={14} rx={3} fill={badge.color + "22"} stroke={badge.color + "55"} strokeWidth={0.5} />
                <text x={19} y={y + 14} fill={badge.color} fontSize={8} fontWeight="700" fontFamily="monospace" textAnchor="middle">{badge.label}</text>
              </g>
            )}
            <text
              x={36} y={y + 15}
              fill={col.pk ? COLORS.amber : col.fk ? "#c4b5fd" : COLORS.text}
              fontSize={11}
              fontFamily="'JetBrains Mono', 'Fira Code', monospace"
              fontWeight={col.pk ? "700" : "400"}
            >
              {col.name}
            </text>
            <text
              x={TABLE_WIDTH - 8} y={y + 15}
              fill={COLORS.muted}
              fontSize={9}
              fontFamily="'JetBrains Mono', 'Fira Code', monospace"
              textAnchor="end"
            >
              {col.type}
            </text>
            {/* NOT NULL indicator */}
            {col.notNull && (
              <circle cx={TABLE_WIDTH - 6} cy={y + ROW_H / 2} r={2} fill={COLORS.red} opacity={0.7} />
            )}
          </g>
        );
      })}
    </g>
  );
}

function RelLine({ rel, tables, highlighted }) {
  const fromT = tables[rel.from];
  const toT = tables[rel.to];
  if (!fromT || !toT) return null;

  const fromY = getColY(fromT, rel.fromCol);
  const toY = getColY(toT, rel.toCol);

  const fromX = fromT.x + TABLE_WIDTH;
  const toX = toT.x;

  const midX = (fromX + toX) / 2;
  const d = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

  const isActive = highlighted === rel.from || highlighted === rel.to;

  return (
    <path
      d={d}
      fill="none"
      stroke={isActive ? COLORS.accent : COLORS.dim}
      strokeWidth={isActive ? 2 : 1}
      strokeDasharray={isActive ? "none" : "4,3"}
      opacity={isActive ? 1 : 0.5}
      markerEnd="url(#arrow)"
    />
  );
}

export default function ERD() {
  const [hovered, setHovered] = useState(null);
  const [activeTable, setActiveTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(0.8);

  const CANVAS_W = 1680;
  const CANVAS_H = 1200;

  const filteredColumns = activeTable
    ? TABLES[activeTable].columns.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div style={{ background: COLORS.bg, height: "100%", fontFamily: "'JetBrains Mono', monospace", color: COLORS.text, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: COLORS.surface,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: "bold"
          }}>R</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: "700", color: COLORS.text }}>Requra.AI — PostgreSQL ERD</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>11 tables · 25 relationships · MVP + i18n ready</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 11, color: COLORS.muted }}>
          {/* Zoom Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.card, padding: "4px 8px", borderRadius: 6, border: `1px solid ${COLORS.border}`, marginRight: 20 }}>
            <button
              onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}
              style={{ background: "none", border: "none", color: COLORS.text, cursor: "pointer", fontSize: 14, padding: "0 4px" }}
              title="Zoom Out"
            >−</button>
            <span style={{ minWidth: 40, textAlign: "center", fontSize: 10 }}>{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(z => Math.min(3, z + 0.1))}
              style={{ background: "none", border: "none", color: COLORS.text, cursor: "pointer", fontSize: 14, padding: "0 4px" }}
              title="Zoom In"
            >+</button>
            <button
              onClick={() => setZoom(0.8)}
              style={{ background: COLORS.border, border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 9, padding: "2px 6px", borderRadius: 4, marginLeft: 4 }}
            >Reset</button>
          </div>

          {[
            { dot: COLORS.amber, label: "PK — Primary Key" },
            { dot: "#c4b5fd", label: "FK — Foreign Key" },
            { dot: COLORS.cyan, label: "UQ — Unique" },
            { dot: COLORS.red, label: "● NOT NULL" },
          ].map(({ dot, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: dot }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 69px)" }}>
        {/* Sidebar */}
        <div style={{
          width: 220, flexShrink: 0,
          borderRight: `1px solid ${COLORS.border}`,
          background: COLORS.surface,
          overflowY: "auto",
          padding: "12px 0",
        }}>
          <div style={{ padding: "0 12px 8px", fontSize: 10, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase" }}>Tables</div>
          {Object.entries(TABLES).map(([key, t]) => (
            <div
              key={key}
              onClick={() => setActiveTable(activeTable === key ? null : key)}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: activeTable === key ? t.color + "15" : "transparent",
                borderLeft: activeTable === key ? `3px solid ${t.color}` : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: activeTable === key ? t.color : COLORS.text }}>{t.label}</span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: COLORS.muted }}>{t.columns.length}</span>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
          <svg
            width={CANVAS_W}
            height={CANVAS_H}
            style={{ display: "block" }}
          >
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill={COLORS.dim} />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.border} strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>

            {/* Grid background */}
            <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

            <g transform={`scale(${zoom})`} style={{ transition: "transform 0.2s ease-out" }}>
              {/* Relationships */}
              {RELATIONSHIPS.map((rel, i) => (
                <RelLine key={i} rel={rel} tables={TABLES} highlighted={hovered} />
              ))}

              {/* Tables */}
              {Object.entries(TABLES).map(([key, table]) => (
                <TableNode
                  key={key}
                  tableKey={key}
                  table={table}
                  isHighlighted={hovered === key || activeTable === key}
                  onHover={setHovered}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Detail panel */}
        {activeTable && (
          <div style={{
            width: 320, flexShrink: 0,
            borderLeft: `1px solid ${COLORS.border}`,
            background: COLORS.surface,
            overflowY: "auto",
            padding: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: TABLES[activeTable].color }} />
              <span style={{ fontSize: 14, fontWeight: "700", color: TABLES[activeTable].color }}>{TABLES[activeTable].label}</span>
              <button
                onClick={() => setActiveTable(null)}
                style={{ marginLeft: "auto", background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 16 }}
              >✕</button>
            </div>

            <input
              placeholder="Search columns..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "6px 10px", marginBottom: 12,
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 6, color: COLORS.text, fontSize: 11,
                outline: "none", boxSizing: "border-box",
              }}
            />

            {filteredColumns.map(col => {
              const badge = getBadge(col);
              return (
                <div key={col.name} style={{
                  padding: "10px 12px", marginBottom: 6,
                  background: COLORS.card,
                  borderRadius: 6,
                  border: `1px solid ${badge ? badge.color + "33" : COLORS.border}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    {badge && (
                      <span style={{
                        fontSize: 9, fontWeight: "700", padding: "1px 5px",
                        borderRadius: 3, background: badge.color + "22",
                        color: badge.color, border: `1px solid ${badge.color}44`
                      }}>{badge.label}</span>
                    )}
                    <span style={{ fontSize: 12, fontWeight: "600", color: COLORS.text }}>{col.name}</span>
                    {col.notNull && <span style={{ marginLeft: "auto", fontSize: 9, color: COLORS.red }}>NOT NULL</span>}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: col.fk || col.default ? 4 : 0 }}>{col.type}</div>
                  {col.fk && <div style={{ fontSize: 9, color: "#c4b5fd" }}>→ {col.fk}</div>}
                  {col.default && <div style={{ fontSize: 9, color: COLORS.muted }}>default: {col.default}</div>}
                </div>
              );
            })}

            {/* Indexes hint */}
            <div style={{ marginTop: 16, padding: 12, background: COLORS.card, borderRadius: 6, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Suggested Indexes</div>
              {activeTable === "user_stories" && (
                <>
                  <div style={{ fontSize: 10, color: "#c4b5fd", marginBottom: 4 }}>idx_us_project_id</div>
                  <div style={{ fontSize: 10, color: "#c4b5fd", marginBottom: 4 }}>idx_us_status</div>
                  <div style={{ fontSize: 10, color: "#c4b5fd" }}>idx_us_jira_ticket_id</div>
                </>
              )}
              {activeTable === "documents" && (
                <>
                  <div style={{ fontSize: 10, color: "#c4b5fd", marginBottom: 4 }}>idx_doc_project_id</div>
                  <div style={{ fontSize: 10, color: "#c4b5fd" }}>idx_doc_type_status</div>
                </>
              )}
              {activeTable === "ai_jobs" && (
                <>
                  <div style={{ fontSize: 10, color: "#c4b5fd", marginBottom: 4 }}>idx_job_status</div>
                  <div style={{ fontSize: 10, color: "#c4b5fd" }}>idx_job_document_id</div>
                </>
              )}
              {activeTable === "users" && (
                <div style={{ fontSize: 10, color: "#c4b5fd" }}>idx_users_email (UNIQUE)</div>
              )}
              {activeTable === "approvals" && (
                <>
                  <div style={{ fontSize: 10, color: "#c4b5fd", marginBottom: 4 }}>idx_approvals_story_id</div>
                  <div style={{ fontSize: 10, color: "#c4b5fd" }}>idx_approvals_reviewer_id</div>
                </>
              )}
              {!["user_stories", "documents", "ai_jobs", "users", "approvals"].includes(activeTable) && (
                <div style={{ fontSize: 10, color: COLORS.muted }}>Index on all FK columns by default.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
