import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileUp, Search, Scale, Link2, Files, ThumbsUp,
  CheckCircle2, AlertTriangle, Upload, Filter, Bell, User,
  FileText, ShieldCheck, TrendingUp, XCircle, Clock, Eye,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const screens = [
  { id: "intake", num: 1, icon: FileUp, title: "Claim Intake Dashboard" },
  { id: "analysis", num: 2, icon: Search, title: "AI Analysis (Split-screen)" },
  { id: "recommendation", num: 3, icon: Scale, title: "Recommendation" },
  { id: "explainability", num: 4, icon: Link2, title: "Explainability" },
  { id: "similar", num: 5, icon: Files, title: "Similar Cases" },
  { id: "decision", num: 6, icon: ThumbsUp, title: "Human Decision" },
];

const claimsList = [
  { id: "CLM-48721", name: "A. Sharma", type: "Motor · Accident", amount: "₹2,40,000", status: "AI Reviewed", risk: "Low", date: "28 Apr 2026" },
  { id: "CLM-48722", name: "P. Iyer", type: "Health · Hospitalization", amount: "₹1,15,000", status: "Pending AI", risk: "Med", date: "29 Apr 2026" },
  { id: "CLM-48723", name: "R. Khan", type: "Motor · Theft", amount: "₹6,80,000", status: "Flagged", risk: "High", date: "29 Apr 2026" },
  { id: "CLM-48724", name: "M. Das", type: "Property · Fire", amount: "₹12,40,000", status: "AI Reviewed", risk: "Low", date: "30 Apr 2026" },
  { id: "CLM-48725", name: "S. Verma", type: "Health · OPD", amount: "₹18,500", status: "Auto-Approved", risk: "Low", date: "30 Apr 2026" },
];

const riskColor = (r: string) =>
  r === "High" ? "bg-destructive/15 text-destructive" :
  r === "Med" ? "bg-warning/15 text-warning" :
  "bg-success/15 text-success";

export const Wireframes = () => {
  const [active, setActive] = useState("intake");
  const activeIdx = Math.max(0, screens.findIndex((s) => s.id === active));
  const goPrev = () => setActive(screens[(activeIdx - 1 + screens.length) % screens.length].id);
  const goNext = () => setActive(screens[(activeIdx + 1) % screens.length].id);
  const prevScreen = screens[(activeIdx - 1 + screens.length) % screens.length];
  const nextScreen = screens[(activeIdx + 1) % screens.length];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          {/* <div className="text-sm font-semibold tracking-widest text-accent mb-3">UI WIREFRAMES</div> */}
          <h2 className="text-4xl md:text-5xl font-bold">Explainable Cliams Copilot</h2>
          {/* <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Click each screen to preview the interface for every step of the claims copilot workflow.
          </p> */}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-smooth",
                active === s.id
                  ? "bg-primary text-primary-foreground border-primary shadow-elegant"
                  : "bg-card border-border hover:border-accent text-foreground"
              )}
            >
              <span className="h-5 w-5 rounded-full bg-background/20 text-xs flex items-center justify-center">{s.num}</span>
              <s.icon className="h-4 w-4" />
              <span className="hidden md:inline">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Browser frame */}
        <Card className="max-w-6xl mx-auto shadow-elegant overflow-hidden border-2">
          <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
            </div>
            <div className="flex-1 bg-primary-foreground/10 rounded px-3 py-1 text-xs">
              claims-copilot.app / {active}
            </div>
            <Bell className="h-4 w-4 opacity-70" />
            <User className="h-4 w-4 opacity-70" />
          </div>

          <div className="bg-secondary/20">
            {active === "intake" && <IntakeScreen />}
            {active === "analysis" && <AnalysisScreen />}
            {active === "recommendation" && <RecommendationScreen />}
            {active === "explainability" && <ExplainabilityScreen />}
            {active === "similar" && <SimilarScreen />}
            {active === "decision" && <DecisionScreen />}
          </div>
        </Card>

        {/* Prev / Next workflow controls */}
        <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={goPrev}
            className="flex items-center gap-2 h-auto py-3 px-4 text-left"
          >
            <ChevronLeft className="h-5 w-5 shrink-0" />
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Previous</div>
              <div className="text-sm font-semibold">{prevScreen.num}. {prevScreen.title}</div>
            </div>
            <span className="sm:hidden text-sm font-semibold">Previous</span>
          </Button>

          <div className="flex items-center gap-2">
            {screens.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-label={`Go to step ${s.num}`}
                className={cn(
                  "h-2 rounded-full transition-smooth",
                  i === activeIdx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-accent"
                )}
              />
            ))}
            <span className="ml-3 text-xs text-muted-foreground hidden md:inline">
              Step {activeIdx + 1} of {screens.length}
            </span>
          </div>

          <Button
            onClick={goNext}
            className="flex items-center gap-2 h-auto py-3 px-4 text-left"
          >
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Next</div>
              <div className="text-sm font-semibold">{nextScreen.num}. {nextScreen.title}</div>
            </div>
            <span className="sm:hidden text-sm font-semibold">Next</span>
            <ChevronRight className="h-5 w-5 shrink-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

/* ---------------- 1. INTAKE ---------------- */
const IntakeScreen = () => (
  <div className="p-6 md:p-8">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h3 className="text-2xl font-bold">Claims Dashboard</h3>
        <p className="text-sm text-muted-foreground">5 active claims · 2 awaiting AI review</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filter</Button>
        <Button size="sm"><Upload className="h-4 w-4 mr-2" />Upload New Claim</Button>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {[
        { label: "Total Claims", value: "248", color: "text-primary" },
        { label: "AI Approved", value: "182", color: "text-success" },
        { label: "Flagged", value: "21", color: "text-destructive" },
        { label: "Avg Decision", value: "3.4 min", color: "text-accent" },
      ].map((k) => (
        <Card key={k.label} className="p-4">
          <div className="text-xs text-muted-foreground">{k.label}</div>
          <div className={cn("text-2xl font-bold mt-1", k.color)}>{k.value}</div>
        </Card>
      ))}
    </div>

    <Card className="overflow-hidden">
      <div className="bg-secondary/50 px-4 py-2 grid grid-cols-12 gap-2 text-xs font-bold text-muted-foreground">
        <div className="col-span-2">Claim ID</div>
        <div className="col-span-2">Customer</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Risk</div>
      </div>
      {claimsList.map((c) => (
        <div key={c.id} className="px-4 py-3 grid grid-cols-12 gap-2 text-sm border-t border-border items-center hover:bg-secondary/30 transition-smooth">
          <div className="col-span-2 font-mono text-xs">{c.id}</div>
          <div className="col-span-2 font-medium">{c.name}</div>
          <div className="col-span-3 text-muted-foreground">{c.type}</div>
          <div className="col-span-2 font-semibold">{c.amount}</div>
          <div className="col-span-2"><Badge variant="outline" className="text-xs">{c.status}</Badge></div>
          <div className="col-span-1"><span className={cn("px-2 py-0.5 rounded text-xs font-bold", riskColor(c.risk))}>{c.risk}</span></div>
        </div>
      ))}
    </Card>
  </div>
);

/* ---------------- 2. ANALYSIS ---------------- */
const AnalysisScreen = () => (
  <div className="grid md:grid-cols-2 min-h-[500px]">
    <div className="p-6 border-r border-border bg-card">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-bold tracking-widest text-muted-foreground">CLAIM DOCUMENT</div>
        <Badge variant="outline" className="text-xs">CLM-48721</Badge>
      </div>
      <Card className="p-5 text-sm space-y-3">
        <div className="font-bold text-base border-b pb-2">Motor Insurance — Accident Claim</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="text-muted-foreground">Policyholder:</span><div className="font-medium text-sm">A. Sharma</div></div>
          <div><span className="text-muted-foreground">Policy #:</span><div className="font-medium text-sm">MTR-009823</div></div>
          <div><span className="text-muted-foreground">Amount:</span><div className="font-medium text-sm">₹2,40,000</div></div>
          <div><span className="text-muted-foreground">Filed:</span><div className="font-medium text-sm">28 Apr 2026</div></div>
        </div>
        <div className="text-xs text-muted-foreground pt-2 border-t">Incident description</div>
        <p className="text-sm leading-relaxed">
          Vehicle <span className="bg-warning/30 px-1 rounded">rear-end collision</span> on NH-44 at km 142.
          Damage to <span className="bg-warning/30 px-1 rounded">rear bumper, boot panel and tail-lights</span>.
          FIR filed at Outer Ring Road station. Surveyor report attached.
        </p>
        <div className="flex gap-2 pt-2 border-t">
          <Badge variant="secondary" className="text-xs">📎 FIR_48721.pdf</Badge>
          <Badge variant="secondary" className="text-xs">📎 Photos.zip</Badge>
        </div>
      </Card>
    </div>

    <div className="p-6 bg-secondary/10">
      <div className="text-xs font-bold tracking-widest text-accent mb-3">AI ANALYSIS · LIVE</div>
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-semibold">Reading policy & cross-checking…</span>
        </div>
        <Progress value={82} className="mb-4" />
        <div className="space-y-3 text-sm">
          {[
            { label: "Policy clauses parsed", val: "14 / 14" },
            { label: "Coverage match", val: "Clause 4.2 ✓" },
            { label: "Exclusion check", val: "None triggered" },
            { label: "Fraud signals", val: "0 detected" },
            { label: "Document completeness", val: "5 / 5" },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {r.val}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-accent/10 rounded-md text-xs">
          <span className="font-bold text-accent">AI Confidence: 94%</span>
          <span className="text-muted-foreground"> · 12 similar cases referenced</span>
        </div>
      </Card>
    </div>
  </div>
);

/* ---------------- 3. RECOMMENDATION ---------------- */
const RecommendationScreen = () => (
  <div className="p-6 md:p-8">
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="md:col-span-2 p-6 border-l-4 border-l-success">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-bold tracking-widest text-success">AI RECOMMENDATION</div>
            <h3 className="text-3xl font-bold mt-1">Approve Claim</h3>
          </div>
          <CheckCircle2 className="h-12 w-12 text-success" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-secondary/40 p-3 rounded-md">
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className="text-2xl font-bold text-success">94%</div>
          </div>
          <div className="bg-secondary/40 p-3 rounded-md">
            <div className="text-xs text-muted-foreground">Suggested Payout</div>
            <div className="text-2xl font-bold">₹2,38,500</div>
          </div>
          <div className="bg-secondary/40 p-3 rounded-md">
            <div className="text-xs text-muted-foreground">Decision time</div>
            <div className="text-2xl font-bold">2.1 min</div>
          </div>
        </div>
        <div className="text-sm font-semibold mb-2">Reasoning summary</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Claim aligns with Clause 4.2 (collision damage) and Clause 7.1 (third-party verification).
          All required documents present. No exclusions triggered. Surveyor estimate within ±2% of policy schedule.
          Pattern matches 12 historical approved claims of similar nature.
        </p>
      </Card>

      <Card className="p-6">
        <div className="text-xs font-bold tracking-widest text-muted-foreground mb-3">ALTERNATIVES</div>
        <div className="space-y-3 text-sm">
          <div className="p-3 border-2 border-success rounded-md bg-success/5">
            <div className="flex justify-between font-bold"><span>Approve</span><span className="text-success">94%</span></div>
            <div className="text-xs text-muted-foreground">Recommended action</div>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex justify-between font-bold"><span>Approve (partial)</span><span className="text-muted-foreground">5%</span></div>
            <div className="text-xs text-muted-foreground">₹1,90,000 payout</div>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex justify-between font-bold"><span>Reject</span><span className="text-muted-foreground">1%</span></div>
            <div className="text-xs text-muted-foreground">No grounds identified</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

/* ---------------- 4. EXPLAINABILITY ---------------- */
const ExplainabilityScreen = () => (
  <div className="grid md:grid-cols-2 min-h-[500px]">
    <div className="p-6 border-r border-border">
      <div className="text-xs font-bold tracking-widest text-muted-foreground mb-3">POLICY DOCUMENT · MTR-009823</div>
      <Card className="p-5 text-sm space-y-4 max-h-[500px] overflow-y-auto">
        <p className="text-xs text-muted-foreground">Section 4 — Coverage Scope</p>
        <p className="leading-relaxed">
          <span className="font-bold">4.1</span> The insurer covers loss or damage to the insured vehicle...
        </p>
        <div className="bg-warning/15 border-l-4 border-warning p-3 rounded">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs font-bold text-warning">CITED BY AI · CLAUSE 4.2</span>
          </div>
          <p className="text-sm leading-relaxed">
            <span className="font-bold">4.2</span> Damage caused by accidental collision, including rear-end impacts on public roadways, is fully indemnified up to the Insured Declared Value (IDV).
          </p>
        </div>
        <p className="leading-relaxed">
          <span className="font-bold">4.3</span> The following are excluded: damage from racing, off-road use, or driving under intoxication...
        </p>
        <div className="bg-accent/10 border-l-4 border-accent p-3 rounded">
          <div className="text-xs font-bold text-accent mb-1">SUPPORTING · CLAUSE 7.1</div>
          <p className="text-sm">
            <span className="font-bold">7.1</span> Where a verified police report (FIR) is provided, the insurer shall waive secondary investigation requirements.
          </p>
        </div>
      </Card>
    </div>

    <div className="p-6 bg-secondary/10">
      <div className="text-xs font-bold tracking-widest text-accent mb-3">EVIDENCE TRAIL</div>
      <div className="space-y-3">
        {[
          { icon: ShieldCheck, label: "Clause 4.2 — Collision coverage", note: "Direct match · 99% similarity" },
          { icon: ShieldCheck, label: "Clause 7.1 — FIR provided", note: "FIR_48721.pdf verified" },
          { icon: FileText, label: "Surveyor report", note: "Damage estimate: ₹2,38,500" },
          { icon: Eye, label: "Photo evidence (8 images)", note: "Damage location confirmed" },
          { icon: Clock, label: "Filed within 7-day window", note: "Incident: 26 Apr · Filed: 28 Apr" },
        ].map((e) => (
          <Card key={e.label} className="p-3 flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
              <e.icon className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{e.label}</div>
              <div className="text-xs text-muted-foreground">{e.note}</div>
            </div>
            <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-1" />
          </Card>
        ))}
      </div>
    </div>
  </div>
);

/* ---------------- 5. SIMILAR ---------------- */
const SimilarScreen = () => {
  const cases = [
    { id: "CLM-44102", type: "Rear-end · NH-44", amount: "₹2,10,000", outcome: "Approved", days: "3 days", sim: 96 },
    { id: "CLM-46733", type: "Rear-end · Highway", amount: "₹2,60,000", outcome: "Approved", days: "2 days", sim: 92 },
    { id: "CLM-47998", type: "Collision · Urban", amount: "₹1,90,000", outcome: "Approved", days: "4 days", sim: 89 },
    { id: "CLM-43221", type: "Rear-end · NH-8", amount: "₹2,75,000", outcome: "Approved (partial)", days: "5 days", sim: 84 },
    { id: "CLM-45110", type: "Collision · Highway", amount: "₹2,30,000", outcome: "Approved", days: "3 days", sim: 81 },
  ];
  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-xl font-bold">Similar past decisions</h3>
          <p className="text-sm text-muted-foreground">12 cases matched · showing top 5 by similarity</p>
        </div>
        <Badge className="border-transparent bg-success text-success-foreground">100% approved historically</Badge>
      </div>

      <div className="space-y-3">
        {cases.map((c) => (
          <Card key={c.id} className="p-4 grid grid-cols-12 gap-3 items-center hover:shadow-card transition-smooth">
            <div className="col-span-2">
              <div className="font-mono text-xs text-muted-foreground">{c.id}</div>
              <div className="font-semibold text-sm">{c.amount}</div>
            </div>
            <div className="col-span-3 text-sm">{c.type}</div>
            <div className="col-span-2">
              <Badge variant="outline" className="text-xs">{c.outcome}</Badge>
            </div>
            <div className="col-span-2 text-xs text-muted-foreground">Resolved in {c.days}</div>
            <div className="col-span-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Similarity</span>
                <span className="font-bold">{c.sim}%</span>
              </div>
              <Progress value={c.sim} className="h-2" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-5 p-4 bg-accent/5 border-accent/30">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-accent" />
          <div className="text-sm">
            <span className="font-bold">Pattern insight:</span> All 12 similar cases were approved with average payout of ₹2,33,500.
            Current claim aligns within standard distribution.
          </div>
        </div>
      </Card>
    </div>
  );
};

/* ---------------- 6. DECISION ---------------- */
const DecisionScreen = () => (
  <div className="p-6 md:p-8">
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="md:col-span-2 p-6">
        <div className="text-xs font-bold tracking-widest text-muted-foreground mb-2">ADJUSTOR REVIEW · CLM-48721</div>
        <h3 className="text-2xl font-bold mb-4">Final Decision</h3>

        <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-5">
          <div className="flex items-center gap-2 text-success font-bold mb-2">
            <CheckCircle2 className="h-5 w-5" /> AI recommends: Approve · ₹2,38,500
          </div>
          <div className="text-xs text-muted-foreground">
            Backed by Clause 4.2, FIR verification, and 12 similar precedents
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Adjustor notes</label>
            <div className="mt-1 p-3 border border-border rounded-md bg-card text-sm text-muted-foreground italic">
              "Reviewed AI evidence trail. Photos and FIR consistent with damage estimate. Approving as recommended."
              <div className="text-xs mt-2 not-italic">— Priya N., Senior Adjustor</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Final payout</label>
              <div className="font-bold text-lg">₹2,38,500</div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Override AI</label>
              <div className="font-bold text-lg">No</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" className="flex-1"><XCircle className="h-4 w-4 mr-2" />Reject</Button>
          <Button variant="outline" className="flex-1">Request more info</Button>
          <Button className="flex-1 bg-success hover:bg-success/90"><CheckCircle2 className="h-4 w-4 mr-2" />Approve & Pay</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-xs font-bold tracking-widest text-muted-foreground mb-3">AUDIT TRAIL</div>
        <div className="space-y-4 text-xs">
          {[
            { time: "10:42 AM", event: "Claim filed", who: "Customer portal" },
            { time: "10:43 AM", event: "Documents ingested", who: "RAG pipeline" },
            { time: "10:44 AM", event: "AI analysis complete", who: "Copilot" },
            { time: "10:44 AM", event: "Recommendation: Approve", who: "Copilot · 94%" },
            { time: "10:46 AM", event: "Adjustor opened", who: "Priya N." },
            { time: "10:48 AM", event: "Decision confirmed", who: "Priya N." },
          ].map((t, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-accent" />
                {i < 5 && <div className="w-px flex-1 bg-border mt-1" />}
              </div>
              <div className="pb-3">
                <div className="font-semibold">{t.event}</div>
                <div className="text-muted-foreground">{t.time} · {t.who}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);
