const MODES = ['import', 'export', 'reset'] as const;

export type Mode = (typeof MODES)[number];

export function isMode(value: string): value is Mode {
  return MODES.includes(value as Mode);
}
