import type { ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";

export function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="search-box">
      <Search size={17} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Limpar busca"
        >
          <X size={14} />
        </button>
      )}
    </label>
  );
}

export function ActivityIcon() {
  return <span className="activity-symbol">{"\u25F7"}</span>;
}

export function StatCard({
  label,
  value,
  detail,
  icon,
  trend,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  trend: "up" | "down";
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-detail">
        {trend === "up" ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} />
        )}
        {detail}
      </div>
    </div>
  );
}