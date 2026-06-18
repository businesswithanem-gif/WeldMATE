export const PROCESSES = [
  { value: "MIG", label: "MIG (GMAW)" },
  { value: "TIG", label: "TIG (GTAW)" },
  { value: "SMAW", label: "Stick (SMAW)" },
  { value: "FCAW", label: "Flux-Cored (FCAW)" },
];

export const MATERIALS = [
  // Carbon & Structural Steels
  { value: "mild_steel",            label: "Mild Steel (IS 2062 Gr A/B)",          group: "Carbon & Structural Steel" },
  { value: "high_tensile_steel",    label: "High Tensile Steel (IS 2062 Gr C/D/E)", group: "Carbon & Structural Steel" },
  { value: "silico_manganese_steel",label: "Silico-Manganese Steel (SiMn)",         group: "Carbon & Structural Steel" },
  { value: "tool_steel",            label: "Tool Steel / High Carbon Steel",         group: "Carbon & Structural Steel" },
  { value: "galvanized_steel",      label: "Galvanized / Zinc-Coated Steel",         group: "Carbon & Structural Steel" },
  // Alloy Steels
  { value: "alloy_steel",           label: "Low Alloy Steel (IS 1570 / AISI 4130)", group: "Alloy Steel" },
  { value: "chrome_moly_steel",     label: "Chrome-Moly Steel (P11/P22/P91)",       group: "Alloy Steel" },
  // Stainless Steels
  { value: "stainless_steel",       label: "Austenitic Stainless (304 / IS 6911)",  group: "Stainless Steel" },
  { value: "duplex_stainless",      label: "Duplex Stainless (2205 / 2507)",         group: "Stainless Steel" },
  // Cast Iron
  { value: "cast_iron",             label: "Cast Iron (Grey / SG / Malleable)",      group: "Cast Iron" },
  // Non-Ferrous
  { value: "aluminum",              label: "Aluminum & Alloys (6061 / 5083)",        group: "Non-Ferrous" },
  { value: "copper",                label: "Copper (Deoxidized / ETP)",              group: "Non-Ferrous" },
  { value: "brass",                 label: "Brass (60/40 / Naval Brass)",            group: "Non-Ferrous" },
  { value: "nickel_alloy",          label: "Nickel Alloy (Inconel / Monel)",         group: "Non-Ferrous" },
];

export const MATERIAL_GROUPS = [
  "Carbon & Structural Steel",
  "Alloy Steel",
  "Stainless Steel",
  "Cast Iron",
  "Non-Ferrous",
];

export const JOINT_TYPES = [
  { value: "butt",   label: "Butt Joint" },
  { value: "fillet", label: "Fillet Joint" },
  { value: "lap",    label: "Lap Joint" },
  { value: "corner", label: "Corner Joint" },
  { value: "edge",   label: "Edge Joint" },
  { value: "t_joint",label: "T-Joint" },
];

export const POSITIONS = [
  { value: "flat",       label: "Flat (1G/1F)" },
  { value: "horizontal", label: "Horizontal (2G/2F)" },
  { value: "vertical",   label: "Vertical (3G/3F)" },
  { value: "overhead",   label: "Overhead (4G/4F)" },
];

export const SHIELDING_GASES = [
  { value: "75ar_25co2", label: "75% Ar / 25% CO2 — MIG Mild Steel" },
  { value: "100co2",     label: "100% CO2 — Budget MIG, Deeper Penetration" },
  { value: "100ar",      label: "100% Argon — TIG & Aluminum MIG" },
  { value: "98ar_2co2",  label: "98% Ar / 2% CO2 — Stainless MIG" },
  { value: "tri_mix",    label: "Tri-Mix (He/Ar/CO2) — Stainless TIG/MIG" },
  { value: "90ar_10co2", label: "90% Ar / 10% CO2 — General MIG" },
  { value: "none",       label: "None (Self-Shielded / SMAW)" },
];

// All electrodes — includes both IS (Indian Standard) and AWS designations
export const ELECTRODES = [
  // ── SMAW / Stick — M Series (General Purpose, IS 814) ──
  { value: "is_e4113_m",  label: "IS E 4113 M  (like E6013) — General Purpose, AC/DC",  process: ["SMAW"] },
  { value: "is_e4112_m",  label: "IS E 4112 M  (like E6013) — All Positions, AC/DC",    process: ["SMAW"] },
  // ── SMAW — B / H Series (Low Hydrogen, IS 814) ──
  { value: "is_e4316_b",  label: "IS E 4316 B  (like E7016) — Low Hydrogen, AC/DC+",    process: ["SMAW"] },
  { value: "is_e4318_b",  label: "IS E 4318 B  (like E7018) — Low Hydrogen Iron Powder", process: ["SMAW"] },
  { value: "is_e4918_h4", label: "IS E 4918 H4 — Ultra-Low H, IBR/Pressure Vessel",     process: ["SMAW"] },
  // ── SMAW — A Series (Acid Coated, IS 814) ──
  { value: "is_e4110_a1", label: "IS E 4110 A1 — Acid Coated, Flat/Horiz, AC/DC",       process: ["SMAW"] },
  { value: "is_e4110_a2", label: "IS E 4110 A2 — Acid Coated Medium, Flat/Horiz",       process: ["SMAW"] },
  // ── SMAW — C Series (Cellulosic, IS 814) ──
  { value: "is_e4311_c",  label: "IS E 4311 C  (like E6011) — Cellulosic, Pipeline",    process: ["SMAW"] },
  // ── SMAW — D Series (Iron Powder High Deposition, IS 814) ──
  { value: "is_e4124_d1", label: "IS E 4124 D1 (like E6024) — Iron Powder, High Deposition", process: ["SMAW"] },
  // ── SMAW — N Series (Nickel Alloyed, IS 1395) ──
  { value: "is_e4916_n1", label: "IS E 4916 N1 — 1% Ni, Low Temp Toughness (–40°C)",   process: ["SMAW"] },
  { value: "is_e5516_n2", label: "IS E 5516 N2 — 2.5% Ni, Cryogenic (–60°C)",          process: ["SMAW"] },
  // ── SMAW — Stainless (IS 6419) ──
  { value: "is_e308_16",  label: "IS E 308-16   — SS 304, Rutile, AC/DC",               process: ["SMAW"] },
  { value: "is_e308l_16", label: "IS E 308L-16  — SS 304L, Low Carbon",                 process: ["SMAW"] },
  { value: "is_e316l_16", label: "IS E 316L-16  — SS 316L, Mo-bearing, Marine",         process: ["SMAW"] },
  { value: "is_e309l_16", label: "IS E 309L-16  — Dissimilar SS to MS welding",         process: ["SMAW"] },
  // ── SMAW — Cast Iron (IS 5206) ──
  { value: "is_eni_ci",   label: "IS ENi-CI — Pure Nickel, Cast Iron Repair",           process: ["SMAW"] },
  { value: "is_enife_ci", label: "IS ENiFe-CI — Ni-Iron, Cast Iron to Steel",            process: ["SMAW"] },
  // ── SMAW — Chrome-Moly (IS 1395) ──
  { value: "is_e5515_b2", label: "IS E 5515 B2  (like E8018-B2) — 1.25Cr–0.5Mo",       process: ["SMAW"] },
  { value: "is_e6215_b3", label: "IS E 6215 B3  (like E9015-B3) — 2.25Cr–1Mo (P22)",   process: ["SMAW"] },
  // ── MIG Solid Wire ──
  { value: "er70s6",      label: "ER70S-6 / IS SG3 — Mild & HT Steel MIG",             process: ["MIG"] },
  { value: "er80s_b2",    label: "ER80S-B2 — 1.25Cr–0.5Mo Chrome-Moly MIG",            process: ["MIG"] },
  { value: "er90s_b3",    label: "ER90S-B3 — 2.25Cr–1Mo Chrome-Moly MIG",              process: ["MIG"] },
  { value: "er308l",      label: "ER308L — SS 304/304L MIG/TIG",                        process: ["MIG", "TIG"] },
  { value: "er316l",      label: "ER316L — SS 316L, Marine MIG/TIG",                   process: ["MIG", "TIG"] },
  { value: "er309l",      label: "ER309L — Dissimilar MS-to-SS MIG/TIG",               process: ["MIG", "TIG"] },
  { value: "er2209",      label: "ER2209 — Duplex 2205 Stainless MIG/TIG",             process: ["MIG", "TIG"] },
  { value: "er4043",      label: "ER4043 — Aluminum (6xxx series) MIG/TIG",            process: ["MIG", "TIG"] },
  { value: "er5356",      label: "ER5356 — Aluminum (5xxx series, stronger) MIG/TIG",  process: ["MIG", "TIG"] },
  { value: "ernicr3",     label: "ERNiCr-3 (Alloy 82) — Inconel / Nickel Alloy",       process: ["MIG", "TIG"] },
  // ── TIG Filler ──
  { value: "er70s2",      label: "ER70S-2 — TIG Root Pass, Mild Steel",                process: ["TIG"] },
  { value: "er80s_b2_tig",label: "ER80S-B2 — Chrome-Moly TIG (P11/P22)",              process: ["TIG"] },
  // ── FCAW ──
  { value: "e71t1",       label: "E71T-1 — Gas-Shielded FCAW, All Positions",          process: ["FCAW"] },
  { value: "e71t_gs",     label: "E71T-GS — Self-Shielded FCAW, No Gas Required",      process: ["FCAW"] },
  { value: "e309lt1",     label: "E309LT1-1 — FCAW Dissimilar / MS-to-SS",             process: ["FCAW"] },
  { value: "auto",        label: "Auto-Recommend (WeldMATE selects best)",              process: ["SMAW","MIG","TIG","FCAW"] },
];

export const THICKNESS_MM = [
  { value: 0.8,  label: "0.8mm (22 ga)" },
  { value: 1.0,  label: "1.0mm (20 ga)" },
  { value: 1.2,  label: "1.2mm (18 ga)" },
  { value: 1.6,  label: "1.6mm (16 ga)" },
  { value: 2.0,  label: "2.0mm (14 ga)" },
  { value: 3.2,  label: "3.2mm (1/8\")" },
  { value: 4.8,  label: "4.8mm (3/16\")" },
  { value: 6.4,  label: "6.4mm (1/4\")" },
  { value: 9.5,  label: "9.5mm (3/8\")" },
  { value: 12.7, label: "12.7mm (1/2\")" },
  { value: 19.0, label: "19mm (3/4\")" },
  { value: 25.4, label: "25mm (1\")" },
];
