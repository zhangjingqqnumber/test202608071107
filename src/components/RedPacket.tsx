import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Reveal, useCountdown, usePrefersReducedMotion } from "../lib";
import { Icon } from "./icons";

/* ---------- 数据 ---------- */
const AMOUNTS = [0.66, 0.88, 0.88, 1.28, 1.28, 1.68, 2.33, 2.33, 3.88, 5.2, 6.66, 8.88, 18.88, 66.66, 88.88];
const MASKED = ["淘*宝", "小*橙", "阿*旺", "糖*圆", "大*福", "喜*乐", "橙*心", "旺*财", "宝*贝", "福*星"];
const FEED_AMOUNTS = [0.88, 1.28, 2.33, 3.88, 5.2, 6.66, 8.88, 0.66, 18.88, 1.68];

const COUPONS = [
  { id: "c1", amount: 10, cond: "满 99 元可用", tag: "全品类" },
  { id: "c2", amount: 25, cond: "满 199 元可用", tag: "数码家电" },
  { id: "c3", amount: 60, cond: "满 399 元可用", tag: "大牌专享" },
];

type EnvState = "idle" | "opening" | "opened";

/* ---------- 装饰小元素 ---------- */
function Coin({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#ffc24d" stroke="#f0a400" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#f0a400" strokeWidth="1.5" opacity="0.6" />
      <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="#a3540a">
        ¥
      </text>
    </svg>
  );
}

function MiniEnvelope({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 44 34" className={className} style={style} aria-hidden>
      <rect x="2" y="2" width="40" height="30" rx="5" fill="#ff5a26" stroke="#ffc24d" strokeWidth="1.5" />
      <path d="M2 8 L22 20 L42 8" fill="none" stroke="#ffc24d" strokeWidth="1.5" opacity="0.85" />
      <circle cx="22" cy="20" r="5" fill="#ffc24d" />
      <text x="22" y="23.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#c81e02">
        福
      </text>
    </svg>
  );
}

/* ---------- 领取动态 ---------- */
function useFeed() {
  const idRef = useRef(0);
  const make = useCallback(() => {
    idRef.current += 1;
    return {
      id: idRef.current,
      name: MASKED[Math.floor(Math.random() * MASKED.length)],
      amount: FEED_AMOUNTS[Math.floor(Math.random() * FEED_AMOUNTS.length)],
      sec: Math.floor(Math.random() * 50) + 3,
    };
  }, []);
  const [items, setItems] = useState(() => Array.from({ length: 4 }, make));
  useEffect(() => {
    const t = setInterval(() => setItems((prev) => [make(), ...prev].slice(0, 5)), 2400);
    return () => clearInterval(t);
  }, [make]);
  return items;
}

/* ---------- 主组件 ---------- */
export default function RedPacket({ notify }: { notify: (msg: string) => void }) {
  const reduced = usePrefersReducedMotion();
  const [hh, mm, ss] = useCountdown(2 * 3600 * 1000 + 13 * 60 * 1000 + 45 * 1000);

  const [envState, setEnvState] = useState<EnvState>("idle");
  const [amount, setAmount] = useState(0);
  const [shown, setShown] = useState(0);
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});
  const envRef = useRef<HTMLDivElement>(null);
  const feed = useFeed();

  /* 金额滚动 */
  useEffect(() => {
    if (envState !== "opened") return;
    let raf = 0;
    const start = performance.now();
    const dur = reduced ? 1 : 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(amount * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [envState, amount, reduced]);

  const fireConfetti = useCallback(() => {
    if (reduced) return;
    const el = envRef.current;
    let x = 0.5;
    let y = 0.4;
    if (el) {
      const r = el.getBoundingClientRect();
      x = (r.left + r.width / 2) / window.innerWidth;
      y = (r.top + r.height * 0.3) / window.innerHeight;
    }
    confetti({
      particleCount: 90,
      spread: 75,
      startVelocity: 38,
      origin: { x, y },
      colors: ["#ffc24d", "#f0a400", "#ff5a26", "#ffe9d9", "#e8380d"],
      ticks: 160,
      scalar: 0.9,
    });
  }, [reduced]);

  const openEnvelope = useCallback(() => {
    if (envState !== "idle") return;
    setEnvState("opening");
    window.setTimeout(() => {
      setAmount(AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)]);
      setEnvState("opened");
      fireConfetti();
    }, reduced ? 0 : 480);
  }, [envState, fireConfetti, reduced]);

  const resetEnvelope = useCallback(() => {
    setEnvState("idle");
    setAmount(0);
    setShown(0);
  }, []);

  const claimCoupon = useCallback(
    (id: string, amountVal: number) => {
      setClaimed((c) => ({ ...c, [id]: true }));
      notify(`已领取 ¥${amountVal} 优惠券,快去使用吧`);
    },
    [notify],
  );

  const isOpened = envState === "opened";

  return (
    <section
      id="redpacket"
      className="relative mt-16 scroll-mt-24 overflow-hidden py-16"
      style={{
        background:
          "radial-gradient(1100px 480px at 82% -12%, rgba(255,194,77,0.20), transparent 60%), radial-gradient(900px 520px at 4% 112%, rgba(255,90,38,0.28), transparent 55%), linear-gradient(135deg, #c81e02 0%, #e8380d 46%, #a30f00 100%)",
      }}
    >
      {/* 氛围装饰 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <MiniEnvelope className="anim-floaty absolute left-[6%] top-[16%] w-11 opacity-50" style={{ animationDelay: "0s" }} />
        <Coin className="anim-floaty absolute left-[14%] bottom-[18%] w-8 opacity-60" style={{ animationDelay: "0.8s" }} />
        <MiniEnvelope className="anim-floaty absolute right-[8%] top-[22%] w-14 opacity-40" style={{ animationDelay: "1.4s" }} />
        <Coin className="anim-floaty absolute right-[20%] bottom-[14%] w-10 opacity-50" style={{ animationDelay: "0.4s" }} />
        <Coin className="anim-floaty absolute left-[46%] top-[8%] w-6 opacity-40" style={{ animationDelay: "1.9s" }} />
        <MiniEnvelope className="anim-floaty absolute right-[38%] bottom-[8%] w-9 opacity-35" style={{ animationDelay: "1.1s" }} />
      </div>

      <div className="container-x relative">
        {/* 标题行 */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.35em] text-gold-400">
                <Icon name="gift" className="h-4 w-4" />
                限时福利 · 每日可拆
              </p>
              <h2 className="mt-2.5 font-display text-4xl leading-none text-paper md:text-5xl">
                天天领红包
                <span className="ml-3 align-middle font-display text-xl text-gold-400 md:text-2xl">最高 ¥88.88</span>
              </h2>
            </div>
            <div className="flex items-center gap-2.5 rounded-md border border-gold-400/40 bg-ink-950/25 px-4 py-2.5">
              <Icon name="bolt" className="h-4 w-4 text-gold-400" />
              <span className="text-xs font-medium text-cream/90">距本场红包雨结束</span>
              <span className="flex items-center gap-1 font-display text-lg leading-none text-gold-400">
                {hh}
                <i className="not-italic text-cream/60">:</i>
                {mm}
                <i className="not-italic text-cream/60">:</i>
                {ss}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* 左:大红包 */}
          <Reveal>
            <div className="flex flex-col items-center">
              <div
                ref={envRef}
                role="button"
                tabIndex={0}
                aria-label="拆红包"
                onClick={openEnvelope}
                onKeyDown={(e) => e.key === "Enter" && openEnvelope()}
                className={`relative h-[360px] w-[268px] cursor-pointer select-none outline-none [perspective:1200px] ${
                  envState === "opening" ? "anim-envshake" : ""
                } ${envState === "idle" ? "transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]" : ""}`}
              >
                {/* 金额卡片(从红包里抽出) */}
                <div
                  className="absolute left-1/2 top-0 z-10 w-[216px] -translate-x-1/2 rounded-xl border border-gold-400/70 bg-gradient-to-b from-[#ffe9c2] to-[#ffc24d] px-5 pb-5 pt-6 text-center shadow-xl transition-transform duration-700 ease-out"
                  style={{ transform: `translate(-50%, ${isOpened ? "-64px" : "96px"})` }}
                >
                  <p className="text-[11px] font-bold tracking-[0.3em] text-[#a3540a]">恭喜发财 · 大吉大利</p>
                  <p className="mt-2 font-display text-5xl leading-none text-[#c81e02]">
                    <span className="text-2xl align-top">¥</span>
                    {shown.toFixed(2)}
                  </p>
                  <p className="mt-2 text-[11px] text-[#a3540a]">已存入你的红包账户</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      notify(`¥${amount.toFixed(2)} 红包已收下,可在结算时抵扣`);
                    }}
                    className="mt-3 w-full rounded-md bg-[#c81e02] py-2 text-sm font-bold text-[#ffe9c2] transition hover:bg-[#a30f00] active:scale-95"
                  >
                    开心收下
                  </button>
                </div>

                {/* 红包身 */}
                <div className="absolute inset-0 z-20 overflow-hidden rounded-[24px] border border-[#ff6b3d]/50 bg-gradient-to-b from-[#e63a10] to-[#a80f00] shadow-[0_24px_60px_-18px_rgba(60,5,0,0.7)]">
                  <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #ffe9c2 0, #ffe9c2 1px, transparent 1px, transparent 14px)",
                    }}
                  />
                  <p className="absolute inset-x-0 bottom-6 text-center font-display text-lg tracking-[0.4em] text-[#ffc24d]/80">
                    恭喜发财
                  </p>
                </div>

                {/* 红包盖 */}
                <div
                  className="absolute inset-x-0 top-0 z-30 h-[132px] origin-top [transform-style:preserve-3d] transition-transform duration-700 ease-in-out [backface-visibility:hidden]"
                  style={{ transform: isOpened ? "rotateX(176deg)" : "rotateX(0deg)" }}
                >
                  <div
                    className="h-full w-full bg-gradient-to-b from-[#ff5a26] to-[#d42508] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                    style={{ filter: "drop-shadow(0 6px 10px rgba(60,5,0,0.35))" }}
                  />
                </div>

                {/* 金色封口 */}
                <div
                  className={`absolute left-1/2 top-[118px] z-40 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#ffe9c2] via-[#ffc24d] to-[#f0a400] font-display text-3xl text-[#c81e02] shadow-lg transition-all duration-500 ${
                    isOpened ? "scale-0 opacity-0" : "anim-sealpulse"
                  }`}
                >
                  開
                </div>
              </div>

              {/* 提示与统计 */}
              <p className="mt-4 text-sm font-medium text-cream/90">
                {envState === "idle" && (
                  <span className="flex items-center gap-2">
                    <Icon name="gift" className="h-4 w-4 text-gold-400" />
                    点击红包,拆开今日手气
                  </span>
                )}
                {envState === "opening" && "红包开启中…"}
                {isOpened && (
                  <button
                    onClick={resetEnvelope}
                    className="flex items-center gap-1.5 rounded-md border border-gold-400/50 px-4 py-1.5 text-gold-400 transition hover:bg-gold-400/10"
                  >
                    <Icon name="refund" className="h-3.5 w-3.5" />
                    再拆一个
                  </button>
                )}
              </p>

              <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
                <div className="rounded-lg border border-gold-400/25 bg-ink-950/25 px-4 py-3.5">
                  <p className="font-display text-2xl leading-none text-gold-400">8,642,113</p>
                  <p className="mt-1.5 text-[11px] text-cream/70">今日已发放红包(个)</p>
                </div>
                <div className="rounded-lg border border-gold-400/25 bg-ink-950/25 px-4 py-3.5">
                  <p className="font-display text-2xl leading-none text-gold-400">87%</p>
                  <p className="mt-1.5 text-[11px] text-cream/70">你的手气超过的用户</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 右:券包 + 领取动态 */}
          <Reveal delay={120}>
            <div className="space-y-5">
              {/* 券包 */}
              <div className="rounded-xl border border-gold-400/30 bg-ink-950/25 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-display text-xl text-paper">
                    <Icon name="ticket" className="h-5 w-5 text-gold-400" />
                    配套大额券包
                  </h3>
                  <span className="text-[11px] text-cream/60">每人限领 1 张 / 天</span>
                </div>
                <div className="space-y-3">
                  {COUPONS.map((c) => {
                    const done = claimed[c.id];
                    return (
                      <div
                        key={c.id}
                        className="group flex items-center gap-4 rounded-lg border border-dashed border-gold-400/40 bg-gradient-to-r from-[#8f0d00]/70 to-[#c81e02]/40 px-4 py-3.5 transition hover:border-gold-400/80"
                      >
                        <div className="flex items-baseline gap-0.5">
                          <span className="font-display text-3xl leading-none text-gold-400">
                            <span className="text-base align-top">¥</span>
                            {c.amount}
                          </span>
                        </div>
                        <div className="h-9 w-px bg-gold-400/30" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-paper">{c.cond}</p>
                          <p className="mt-0.5 text-[11px] text-cream/60">{c.tag} · 今日有效</p>
                        </div>
                        <button
                          onClick={() => claimCoupon(c.id, c.amount)}
                          disabled={done}
                          className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold transition active:scale-95 ${
                            done
                              ? "cursor-default border border-cream/30 text-cream/50"
                              : "bg-gold-400 text-[#8f0d00] hover:bg-gold-500"
                          }`}
                        >
                          {done ? "已领取" : "立即领取"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 领取动态 */}
              <div className="rounded-xl border border-gold-400/30 bg-ink-950/25 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-display text-lg text-paper">
                    <span className="anim-pulse-dot h-2 w-2 rounded-full bg-gold-400" />
                    领取动态
                  </h3>
                  <span className="text-[11px] text-cream/60">实时刷新</span>
                </div>
                <ul className="space-y-2.5">
                  {feed.map((f, i) => (
                    <li
                      key={f.id}
                      className={`flex items-center justify-between rounded-md px-3 py-2 text-[13px] ${
                        i === 0 ? "anim-feed bg-gold-400/10" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2 text-cream/85">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#8f0d00] font-display text-[11px] text-gold-400">
                          {f.name.slice(0, 1)}
                        </span>
                        {f.name}
                      </span>
                      <span className="text-cream/60">
                        {f.sec} 秒前领取 <b className="font-display text-gold-400">¥{f.amount.toFixed(2)}</b>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
