import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { defaultBranding } from "@/mockData";
import type { BrandingSettings } from "@/types";

interface BrandContextValue {
  branding: BrandingSettings;
  setBranding: (b: BrandingSettings) => void;
  updateBranding: (patch: Partial<BrandingSettings>) => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
}

function mix(hex: string, target: { r: number; g: number; b: number }, weight: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(rgb.r * (1 - weight) + target.r * weight, rgb.g * (1 - weight) + target.g * weight, rgb.b * (1 - weight) + target.b * weight);
}

function darken(hex: string, w: number): string {
  return mix(hex, { r: 0, g: 0, b: 0 }, w);
}

function lighten(hex: string, w: number): string {
  return mix(hex, { r: 255, g: 255, b: 255 }, w);
}

export function applyBrandColor(hex: string) {
  const root = document.documentElement;
  root.style.setProperty("--brand", hex);
  root.style.setProperty("--brand-600", hex);
  root.style.setProperty("--brand-700", darken(hex, 0.12));
  root.style.setProperty("--brand-800", darken(hex, 0.24));
  root.style.setProperty("--brand-50", lighten(hex, 0.92));
  root.style.setProperty("--brand-100", lighten(hex, 0.82));
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);

  useEffect(() => {
    applyBrandColor(branding.brandColor);
  }, [branding.brandColor]);

  const updateBranding = (patch: Partial<BrandingSettings>) => setBranding((prev: BrandingSettings) => ({ ...prev, ...patch }));

  return <BrandContext.Provider value={{ branding, setBranding, updateBranding }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
