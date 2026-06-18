import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Info, BookOpen, Shield, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ElectrodeEntry {
  designation: string;
  series: string;
  isCode: string;
  coatingType: string;
  currentPolarity: string;
  positions: string;
  tensileStrength: string;
  applications: string[];
  compatibility: string[];
  tips: string;
  awsEquivalent?: string;
}

interface SeriesGroup {
  id: string;
  seriesName: string;
  fullName: string;
  isStandard: string;
  overview: string;
  color: string;
  electrodes: ElectrodeEntry[];
}

const IS_ELECTRODE_SERIES: SeriesGroup[] = [
  {
    id: "a-series",
    seriesName: "A Series",
    fullName: "A Series – Acid Coated Electrodes",
    isStandard: "IS 814",
    overview:
      "Acid-coated (Oxidizing) electrodes suited for mild steel in flat and horizontal positions. Produce a fluid slag that peels off easily. Good bead appearance with moderate mechanical properties. Suitable for AC or DC+ (DCEP).",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-300",
    electrodes: [
      {
        designation: "E 4110 A1",
        series: "A",
        isCode: "IS 814",
        coatingType: "Acid / Oxidizing",
        currentPolarity: "AC / DC+",
        positions: "Flat, Horizontal",
        tensileStrength: "410 MPa min",
        applications: [
          "General fabrication of mild steel structures",
          "Sheet metal work up to 6mm",
          "Non-critical joints in flat position",
          "Light structural components",
        ],
        compatibility: ["Mild steel (IS 2062 Gr A/B)", "MS Plates up to E250 grade"],
        tips: "Ideal for beginners — easy slag removal, smooth bead. Keep electrode dry. Use short arc length for best results.",
        awsEquivalent: "E6020",
      },
      {
        designation: "E 4110 A2",
        series: "A",
        isCode: "IS 814",
        coatingType: "Acid / Oxidizing (Medium)",
        currentPolarity: "AC / DC+",
        positions: "Flat, Horizontal",
        tensileStrength: "410 MPa min",
        applications: [
          "Structural steel fabrication",
          "Fillet welds in flat and horizontal positions",
          "General workshop maintenance",
        ],
        compatibility: ["Mild steel IS 2062", "Low carbon steel plates"],
        tips: "Higher deposition rate than A1. Best suited for flat position butt and fillet welds. Pre-dry at 70–100°C for 1 hour if stored in humid conditions.",
        awsEquivalent: "E6020",
      },
      {
        designation: "E 4110 A3",
        series: "A",
        isCode: "IS 814",
        coatingType: "Acid / Oxidizing (Heavy)",
        currentPolarity: "AC / DC+",
        positions: "Flat only",
        tensileStrength: "410 MPa min",
        applications: [
          "High deposition flat position welding",
          "Thick plate butt welds (flat only)",
          "Production welding of mild steel",
        ],
        compatibility: ["IS 2062 Gr A/B mild steel", "Ship hull plates (flat)"],
        tips: "Heavy coating gives very high deposition in flat position. Not suitable for positional welding. Ideal for production runs.",
        awsEquivalent: "E6020",
      },
    ],
  },
  {
    id: "b-series",
    seriesName: "B Series",
    fullName: "B Series – Basic Low Hydrogen Electrodes",
    isStandard: "IS 814 / IS 1395",
    overview:
      "Basic-coated low-hydrogen electrodes offering the best mechanical properties among all coating types. Excellent toughness, crack resistance, and low hydrogen diffusible content. Critical for pressure vessels, high-strength and restrained joints. Must be dried before use.",
    color: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300",
    electrodes: [
      {
        designation: "E 4316 B",
        series: "B",
        isCode: "IS 814",
        coatingType: "Basic / Low Hydrogen",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "430 MPa min",
        applications: [
          "Pressure vessels and boilers",
          "High-restraint joints",
          "Structural steel with high toughness requirements",
          "Low temperature service applications",
        ],
        compatibility: ["IS 2062 mild steel", "IS 2002 pressure vessel plates", "Medium carbon steel"],
        tips: "MUST be dried at 300–350°C for 1 hour before use. Store in sealed containers or rod oven at 120°C. Low hydrogen content prevents hydrogen-induced cracking.",
        awsEquivalent: "E7016",
      },
      {
        designation: "E 4318 B",
        series: "B",
        isCode: "IS 814",
        coatingType: "Basic / Low Hydrogen (Iron Powder)",
        currentPolarity: "DC+ (DCEP)",
        positions: "All positions",
        tensileStrength: "430 MPa min",
        applications: [
          "Structural steel fabrication (bridges, buildings)",
          "Pressure vessels and pipelines",
          "Offshore structures",
          "High-strength low alloy (HSLA) steel",
        ],
        compatibility: ["IS 2062 Gr B/C", "IS 8500 HSLA steel", "API 5L pipeline steel"],
        tips: "Gold standard for structural work. Iron powder addition improves deposition rate. Preheat steel >25mm thick at 80–120°C. Keep electrodes in a rod oven.",
        awsEquivalent: "E7018",
      },
    ],
  },
  {
    id: "c-series",
    seriesName: "C Series",
    fullName: "C Series – Cellulosic High Penetration Electrodes",
    isStandard: "IS 814",
    overview:
      "Cellulosic (high-cellulose sodium/potassium) coated electrodes producing a forceful, deep-penetrating arc with thin slag. Excellent for vertical-down pipeline welding and root pass welding. Produce higher hydrogen content — preheat may be required on thicker sections.",
    color: "bg-indigo-500/15 border-indigo-500/40 text-indigo-300",
    electrodes: [
      {
        designation: "E 4310 C",
        series: "C",
        isCode: "IS 814",
        coatingType: "Cellulosic (High Cellulose Sodium)",
        currentPolarity: "DC+ (DCEP)",
        positions: "All positions including vertical-down",
        tensileStrength: "410 MPa min",
        applications: [
          "Root pass in pipeline welding (vertical down)",
          "Cross-country pipeline construction",
          "Root passes on structural joints",
          "Shipbuilding root runs",
        ],
        compatibility: ["API 5L Gr B/X42/X52 pipeline steel", "IS 2062 mild steel"],
        tips: "Run at higher than normal current for this diameter. Vertical-down technique with steep electrode angle. High spatter — use anti-spatter compound. Preheat pipe joints in cold weather.",
        awsEquivalent: "E6010",
      },
      {
        designation: "E 4311 C",
        series: "C",
        isCode: "IS 814",
        coatingType: "Cellulosic (High Cellulose Potassium)",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "410 MPa min",
        applications: [
          "Pipeline root and fill passes",
          "Maintenance and repair welding",
          "Galvanized and coated steel welding",
          "Vertical and overhead welding in the field",
        ],
        compatibility: ["API 5L pipeline", "IS 2062 mild steel", "Galvanized steel (grind coating first)"],
        tips: "More versatile than E4310 — works on AC. Forceful arc burns through surface contamination better than most electrodes. Expect more fumes than rutile types.",
        awsEquivalent: "E6011",
      },
    ],
  },
  {
    id: "d-series",
    seriesName: "D Series",
    fullName: "D Series – Iron Powder High Deposition Electrodes",
    isStandard: "IS 814",
    overview:
      "Iron powder coated electrodes with very high deposition efficiency (up to 130–160%). Thick coating contains iron powder which melts into the weld deposit, boosting productivity significantly. Best for flat and horizontal positions where high production rates are required.",
    color: "bg-sky-500/15 border-sky-500/40 text-sky-300",
    electrodes: [
      {
        designation: "E 4124 D1",
        series: "D",
        isCode: "IS 814",
        coatingType: "Rutile + Iron Powder",
        currentPolarity: "AC / DC+",
        positions: "Flat, Horizontal fillet",
        tensileStrength: "410 MPa min",
        applications: [
          "High-productivity structural fabrication",
          "Heavy plate butt welds in flat position",
          "Fillet welds on large fabrications",
          "Tank and vessel construction",
        ],
        compatibility: ["IS 2062 Gr A/B mild steel", "Ship hull plate (flat)", "Heavy structural sections"],
        tips: "Deposition rate up to 130% of electrode weight. Excellent for fill and cap passes. Large weld pool — control puddle carefully. Do not use for overhead or vertical welding.",
        awsEquivalent: "E6024",
      },
      {
        designation: "E 4828 D3",
        series: "D",
        isCode: "IS 814",
        coatingType: "Basic + Iron Powder (Low Hydrogen)",
        currentPolarity: "DC+ (DCEP)",
        positions: "Flat, Horizontal",
        tensileStrength: "480 MPa min",
        applications: [
          "High-strength structural steel welds",
          "Pressure vessels with high deposition requirements",
          "Offshore platform fabrication",
          "Heavy machinery and mining equipment",
        ],
        compatibility: ["IS 8500 HSLA steel", "IS 2062 Gr C/D/E", "API 2H offshore steel"],
        tips: "Combines high deposition of D-series with low hydrogen of B-series. Must be dried at 300–350°C before use. Premium electrode for critical high-strength applications.",
        awsEquivalent: "E7028",
      },
    ],
  },
  {
    id: "h-series",
    seriesName: "H Series",
    fullName: "H Series – Low Hydrogen Controlled Electrodes",
    isStandard: "IS 814 / IS 1395",
    overview:
      "Specifically designated low hydrogen electrodes meeting strict hydrogen content limits (typically H4, H8, or H16 — meaning ≤4, ≤8, or ≤16 mL/100g deposited metal). Critical for crack-sensitive steels, high-restraint joints, and high-carbon or alloy steels. Mandatory for pressure vessel code welding under IBR (Indian Boiler Regulations).",
    color: "bg-blue-400/15 border-blue-400/40 text-blue-200",
    electrodes: [
      {
        designation: "E 4916 H",
        series: "H",
        isCode: "IS 814",
        coatingType: "Basic Low Hydrogen (H ≤ 16 mL/100g)",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "490 MPa min",
        applications: [
          "Medium carbon and alloy steel welding",
          "Pre-stressed structures and bridges",
          "Welding of IS 2062 Gr C and D steels",
          "Repair welding of cracked components",
        ],
        compatibility: ["IS 2062 Gr C/D", "Medium carbon steel (0.25–0.45% C)", "Low alloy steel"],
        tips: "Dry at 250–300°C for 2 hours. Use immediately after taking from oven. Preheat base metal if carbon equivalent >0.40. Interpass temperature maximum 200°C.",
        awsEquivalent: "E7016-H8",
      },
      {
        designation: "E 4918 H4",
        series: "H",
        isCode: "IS 814",
        coatingType: "Basic Low Hydrogen (H ≤ 4 mL/100g)",
        currentPolarity: "DC+ (DCEP)",
        positions: "All positions",
        tensileStrength: "490 MPa min",
        applications: [
          "Pressure vessels under IBR (Indian Boiler Regulations)",
          "Nuclear and power plant structures",
          "Offshore and subsea structures",
          "High-strength steel (yield >450 MPa)",
        ],
        compatibility: ["IBR approved pressure vessel steel", "IS 2002 plates", "ASME SA-516 equivalent", "Q345/Q460 HSLA"],
        tips: "Ultra-low hydrogen — maintain strict drying protocol: 350–400°C for 2 hours. Use within 4 hours of removal from oven. Critical for IBR and ASME code work in India.",
        awsEquivalent: "E7018-H4R",
      },
    ],
  },
  {
    id: "m-series",
    seriesName: "M Series",
    fullName: "M Series – Medium Coated General Purpose Electrodes",
    isStandard: "IS 814",
    overview:
      "Medium-coated multipurpose electrodes that balance ease of use with adequate mechanical properties. Popular for general fabrication, maintenance, and repair work across India. Versatile, forgiving, and works on AC power sources common on Indian job sites.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-300",
    electrodes: [
      {
        designation: "E 4112 M",
        series: "M",
        isCode: "IS 814",
        coatingType: "Medium Coated Rutile",
        currentPolarity: "AC / DC± (Both)",
        positions: "All positions",
        tensileStrength: "410 MPa min",
        applications: [
          "General purpose fabrication and maintenance",
          "Structural mild steel work",
          "Gate and grille fabrication",
          "Agricultural equipment and implements",
          "Repair and maintenance welding",
        ],
        compatibility: ["IS 2062 Gr A mild steel", "MS angles, flats, plates", "ERW pipes"],
        tips: "The most commonly used electrode type on Indian job sites. Works on single-phase AC transformers. Forgiving of slight arc length variation. Good choice for trained but not expert welders.",
        awsEquivalent: "E6013",
      },
      {
        designation: "E 4113 M",
        series: "M",
        isCode: "IS 814",
        coatingType: "Medium Coated Rutile (AC optimized)",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "410 MPa min",
        applications: [
          "Thin sheet metal fabrication (1.5–4mm)",
          "General workshop and job site work",
          "Auto body repair",
          "Light structural and sheet metal",
        ],
        compatibility: ["IS 2062 Gr A mild steel", "CR/HR sheet steel", "ERW pipes and tubes"],
        tips: "Excellent for thin sheet — easy to control on AC. Very stable arc with minimal spatter. The go-to electrode for welding training schools across India.",
        awsEquivalent: "E6013",
      },
    ],
  },
  {
    id: "n-series",
    seriesName: "N Series",
    fullName: "N Series – Nickel Alloyed High Toughness Electrodes",
    isStandard: "IS 1395 / IS 814",
    overview:
      "Nickel-bearing electrodes designed for applications requiring superior impact toughness, especially at sub-zero temperatures. The nickel content (0.5–3.5%) significantly improves toughness of the weld deposit. Used for cryogenic and low-temperature service equipment, cast iron repair (with high-nickel variants), and high-toughness structural applications.",
    color: "bg-teal-500/15 border-teal-500/40 text-teal-300",
    electrodes: [
      {
        designation: "E 4916 N1",
        series: "N",
        isCode: "IS 1395",
        coatingType: "Basic Low Hydrogen + 1% Nickel",
        currentPolarity: "DC+ (DCEP)",
        positions: "All positions",
        tensileStrength: "490 MPa min, CVN ≥47J at –40°C",
        applications: [
          "LPG and cryogenic storage tanks",
          "Refrigeration and cold storage equipment",
          "Offshore structures in cold climates",
          "Railway rolling stock and couplings",
        ],
        compatibility: ["IS 2062 Gr E (notch toughness grade)", "IS 2002 Grade 2A", "ASME SA-537"],
        tips: "1% Ni weld metal gives excellent impact toughness to –40°C. Dry at 300–350°C. Use for any application where Charpy V-notch tests are required in the fabrication spec.",
        awsEquivalent: "E7016-1Ni",
      },
      {
        designation: "E 5516 N2",
        series: "N",
        isCode: "IS 1395",
        coatingType: "Basic Low Hydrogen + 2.5% Nickel",
        currentPolarity: "DC+ (DCEP)",
        positions: "All positions",
        tensileStrength: "550 MPa min, CVN ≥47J at –60°C",
        applications: [
          "Cryogenic pressure vessels (–60°C service)",
          "LNG/LPG handling equipment",
          "Arctic and offshore pipeline construction",
          "High-strength low-temperature structural steel",
        ],
        compatibility: ["2.5% Ni steel plates", "9% Ni steel (with matching filler)", "IS 2002 Grade 3"],
        tips: "Requires strict low hydrogen protocol — H4 or better. Interpass temperature must not exceed 120°C to preserve toughness. Verify impact requirements with the QC inspector before specifying.",
        awsEquivalent: "E8016-C1",
      },
    ],
  },
  {
    id: "ss-series",
    seriesName: "SS / SS-L Series",
    fullName: "SS & SS-L Series – Stainless Steel Electrodes",
    isStandard: "IS 6419",
    overview:
      "Covered electrodes for welding austenitic stainless steels, per IS 6419. The 'L' suffix denotes extra-low carbon grades (≤0.03% C) which resist sensitization and intergranular corrosion. Widely used in food processing, pharmaceutical, dairy, chemical, and petrochemical industries across India.",
    color: "bg-slate-400/15 border-slate-400/40 text-slate-200",
    electrodes: [
      {
        designation: "E 308-16 (SS)",
        series: "SS",
        isCode: "IS 6419",
        coatingType: "Rutile / Basic (Lime-Titania)",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "550 MPa min",
        applications: [
          "Welding 304 / 304L stainless steel vessels and pipes",
          "Food processing equipment",
          "Chemical plant piping (non-halide service)",
          "General stainless fabrication",
        ],
        compatibility: ["SS 304 (IS 6911 Type 04Cr18Ni10)", "SS 304L", "SS 301, 302"],
        tips: "Use DC+ for best results. Keep interpass temperature below 150°C to avoid carbide precipitation. Back-purge with argon on pipe root passes. Use dedicated SS wire brush — never use carbon steel brushes on SS.",
        awsEquivalent: "E308-16",
      },
      {
        designation: "E 308L-16 (SS-L)",
        series: "SS-L",
        isCode: "IS 6419",
        coatingType: "Rutile / Basic (Extra-Low Carbon)",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "520 MPa min",
        applications: [
          "304L stainless steel welding without PWHT",
          "Dairy and food industry vessels",
          "Pharmaceutical processing equipment",
          "Applications where sensitization must be avoided",
        ],
        compatibility: ["SS 304L (IS 6911 Type 04Cr18Ni10L)", "SS 304", "SS 321 (lower corrosion resistance)"],
        tips: "Preferred over E308-16 whenever the base metal is 304L or carbon content is critical. Low carbon deposit eliminates need for solution annealing after welding.",
        awsEquivalent: "E308L-16",
      },
      {
        designation: "E 316L-16 (SS-L)",
        series: "SS-L",
        isCode: "IS 6419",
        coatingType: "Rutile / Basic (Mo-bearing, Extra-Low Carbon)",
        currentPolarity: "AC / DC+",
        positions: "All positions",
        tensileStrength: "520 MPa min",
        applications: [
          "316L stainless steel for marine environments",
          "Chemical processing with chloride presence",
          "Pharmaceutical and biotech equipment",
          "Coastal and offshore stainless structures",
        ],
        compatibility: ["SS 316L (IS 6911 Type 02Cr17Ni12Mo2)", "SS 316", "SS 317"],
        tips: "Molybdenum addition gives superior pitting and crevice corrosion resistance vs 308L. Mandatory for 316L applications in chloride environments (coastal India). Back-purge all pipe welds.",
        awsEquivalent: "E316L-16",
      },
    ],
  },
  {
    id: "ci-series",
    seriesName: "CI Series",
    fullName: "CI Series – Cast Iron Electrodes",
    isStandard: "IS 5206",
    overview:
      "Electrodes specifically formulated for welding and repair of cast iron components per IS 5206. Two main types: nickel-iron (for machined welds) and steel-core (for non-machined repairs). Widely used for repair of engine blocks, machine beds, lathe bodies, pump housings, and other cast iron equipment common in Indian industry.",
    color: "bg-amber-500/15 border-amber-500/40 text-amber-300",
    electrodes: [
      {
        designation: "ENi-CI (Nickel Core)",
        series: "CI",
        isCode: "IS 5206",
        coatingType: "Graphite / Basic (Pure Nickel Core)",
        currentPolarity: "DC+ (DCEP)",
        positions: "Flat, Horizontal",
        tensileStrength: "Soft, Machinable deposit",
        applications: [
          "Engine block crack repair",
          "Pump housing and casing repair",
          "Lathe and machine tool bed repair",
          "Decorative cast iron (gates, railings)",
        ],
        compatibility: ["Grey cast iron", "Malleable cast iron", "Ductile/SG iron (limited)"],
        tips: "PREHEAT to 200–350°C before welding. Weld in short stitch beads (25–30mm), peen immediately while hot, allow to cool slowly before next pass. Never quench. Deposit is machinable.",
        awsEquivalent: "ENi-CI",
      },
      {
        designation: "ENiFe-CI (Nickel-Iron Core)",
        series: "CI",
        isCode: "IS 5206",
        coatingType: "Graphite / Basic (Ni-Fe Core)",
        currentPolarity: "DC+ (DCEP)",
        positions: "All positions",
        tensileStrength: "Higher strength, Machinable",
        applications: [
          "High-strength cast iron repair (ductile/SG iron)",
          "Cast iron to steel joining",
          "Heavily stressed cast iron repairs",
          "Industrial machinery housings",
        ],
        compatibility: ["Ductile/SG cast iron", "Grey iron to mild steel joining", "Ferritic ductile iron"],
        tips: "Better crack resistance than pure Ni type. Suitable for higher restraint joints. Preheat 150–300°C. More economical than ENi-CI. Ideal for cast iron to steel connections.",
        awsEquivalent: "ENiFe-CI",
      },
    ],
  },
];

const SERIES_FILTER_OPTIONS = [
  { value: "all", label: "All Series" },
  { value: "A", label: "A Series" },
  { value: "B", label: "B Series" },
  { value: "C", label: "C Series" },
  { value: "D", label: "D Series" },
  { value: "H", label: "H Series" },
  { value: "M", label: "M Series" },
  { value: "N", label: "N Series" },
  { value: "SS", label: "SS / SS-L" },
  { value: "CI", label: "CI Series" },
];

function ElectrodeCard({ electrode }: { electrode: ElectrodeEntry }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="border border-border rounded-lg bg-card overflow-hidden"
      data-testid={`electrode-card-${electrode.designation.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/40 transition-colors"
        onClick={() => setExpanded((v) => !v)}
        data-testid={`electrode-toggle-${electrode.designation.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 w-2 h-2 rounded-full bg-primary" />
          <div className="min-w-0">
            <span className="font-display font-bold text-base text-foreground tracking-wide">
              {electrode.designation}
            </span>
            <span className="ml-3 text-xs text-muted-foreground">{electrode.isCode}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="hidden sm:block text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
            {electrode.currentPolarity}
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border/60 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Coating</p>
              <p className="text-sm text-foreground">{electrode.coatingType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Current</p>
              <p className="text-sm text-foreground font-mono">{electrode.currentPolarity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Positions</p>
              <p className="text-sm text-foreground">{electrode.positions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide">Min Tensile</p>
              <p className="text-sm text-foreground font-mono">{electrode.tensileStrength}</p>
            </div>
          </div>

          {electrode.awsEquivalent && (
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase text-muted-foreground font-medium tracking-wide">AWS Equivalent:</span>
              <Badge variant="outline" className="font-mono text-xs text-accent border-accent/40">
                {electrode.awsEquivalent}
              </Badge>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-2">Applications</p>
              <ul className="space-y-1">
                {electrode.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary mt-1 shrink-0">›</span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground font-medium tracking-wide mb-2">Compatible Materials</p>
              <ul className="space-y-1">
                {electrode.compatibility.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-accent mt-1 shrink-0">›</span>
                    {mat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary/8 border border-primary/20 rounded-md p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/90">{electrode.tips}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SeriesSection({ group, defaultOpen }: { group: SeriesGroup; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-testid={`series-section-${group.id}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors bg-card"
        onClick={() => setOpen((v) => !v)}
        data-testid={`series-toggle-${group.id}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`shrink-0 text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${group.color}`}>
            {group.seriesName}
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-lg text-foreground">{group.fullName}</h3>
            <p className="text-xs text-muted-foreground">{group.isStandard} · {group.electrodes.length} electrodes</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />
        )}
      </button>

      {open && (
        <div className="p-4 space-y-3 border-t border-border bg-background/50">
          <p className="text-sm text-muted-foreground leading-relaxed">{group.overview}</p>
          <div className="space-y-2">
            {group.electrodes.map((e) => (
              <ElectrodeCard key={e.designation} electrode={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function IndianStandards() {
  const [search, setSearch] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return IS_ELECTRODE_SERIES.filter((group) => {
      const matchesSeries = seriesFilter === "all" || group.electrodes.some((e) => e.series === seriesFilter) || (seriesFilter === "SS" && (group.id === "ss-series"));
      if (!matchesSeries) return false;
      if (!q) return true;
      const groupText = `${group.seriesName} ${group.fullName} ${group.isStandard} ${group.overview}`.toLowerCase();
      const electrodeText = group.electrodes
        .map((e) => `${e.designation} ${e.coatingType} ${e.applications.join(" ")} ${e.compatibility.join(" ")} ${e.tips} ${e.awsEquivalent ?? ""}`)
        .join(" ")
        .toLowerCase();
      return groupText.includes(q) || electrodeText.includes(q);
    });
  }, [search, seriesFilter]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 border border-primary/30">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase text-foreground" data-testid="page-title-is-standards">
            IS Standards
          </h1>
        </div>
        <p className="text-muted-foreground ml-12">
          Indian Standard electrode classifications — IS 814, IS 1395, IS 6419, IS 5206
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/8 border border-primary/25">
        <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div className="text-sm text-foreground/90 space-y-1">
          <p className="font-semibold text-foreground">Bureau of Indian Standards (BIS) Coverage</p>
          <p>
            These classifications follow BIS standards administered by the Bureau of Indian Standards. The IS 814 classification
            code format is <span className="font-mono text-primary bg-primary/10 px-1 rounded">E XXYYZ</span> where{" "}
            <span className="font-mono text-accent">XX</span> = min tensile strength ×10 MPa,{" "}
            <span className="font-mono text-accent">YY</span> = position code, and{" "}
            <span className="font-mono text-accent">Z</span> = current/polarity designation.
          </p>
        </div>
      </div>

      {/* IS Code Quick Reference */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { code: "IS 814", desc: "Mild & Medium Tensile Steel Covered Electrodes" },
          { code: "IS 1395", desc: "Low & Medium Alloy Steel Covered Electrodes" },
          { code: "IS 6419", desc: "Stainless & Heat Resisting Steel Electrodes" },
          { code: "IS 5206", desc: "Cast Iron Welding Electrodes" },
        ].map((s) => (
          <div key={s.code} className="bg-card border border-border rounded-lg p-3" data-testid={`is-code-card-${s.code.replace(/\s+/g, "-").toLowerCase()}`}>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono font-bold text-primary text-sm">{s.code}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by designation, application, material, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-is-search"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {SERIES_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSeriesFilter(opt.value)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                seriesFilter === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
              data-testid={`filter-series-${opt.value}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground" data-testid="no-results-is">
          <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No electrode series matched your search.</p>
          <p className="text-sm mt-1">Try different keywords or clear the filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((group, i) => (
            <SeriesSection key={group.id} group={group} defaultOpen={i === 0 && !search} />
          ))}
        </div>
      )}
    </div>
  );
}
