import { useBrand } from "@/brand";
import { Search } from "lucide-react";

export function AgencyLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  const { branding } = useBrand();

  if (branding.logoUrl) {
    return (
      <img
        src={branding.logoUrl}
        alt={branding.agencyName}
        className={`object-contain rounded ${className}`}
        style={{ height: size, width: "auto", maxWidth: size * 4 }}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex items-center justify-center rounded-lg brand-gradient shrink-0"
        style={{ height: size, width: size }}
      >
        <Search className="text-white" style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.5} />
      </div>
      <span className="font-bold text-ink-900 whitespace-nowrap" style={{ fontSize: size * 0.45 }}>
        {branding.agencyName}
      </span>
    </div>
  );
}
