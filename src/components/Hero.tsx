import { useEffect, useState } from "react";
import { ANNOUNCEMENTS, BANNERS, CATEGORIES, SERVICES, TICKER } from "../data/shop";
import { usePrefersReducedMotion } from "../lib";
import { Icon } from "./icons";

function CategorySidebar({
  active,
  setActive,
}: {
  active: number | null;
  setActive: (i: number | null) => void;
}) {
  return (
    <nav className="relative hidden overflow-visible rounded-lg bg-ink-800 py-2 lg:block">
      <ul>
        {CATEGORIES.map((c, i) => (
          <li key={c.name}>
            <button
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group flex w-full items-center justify-between px-4 py-[7.5px] text-left text-[13px] transition-colors duration-200 ${
                active === i ? "bg-tao-500 text-paper" : "text-cream/85 hover:text-paper"
              }`}
            >
              <span className="truncate">{c.name}</span>
              <Icon
                name="arrowR"
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                  active === i ? "translate-x-0.5 text-paper" : "text-ink-400 group-hover:translate-x-0.5"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>

      {/* 悬浮二级面板 */}
      {active !== null && (
        <div
          onMouseEnter={() => setActive(active)}
          onMouseLeave={() => setActive(null)}
          className="anim-card absolute left-full top-0 z-30 h-full w-[480px] rounded-r-lg border border-ink-200/70 bg-paper p-6 shadow-lift xl:w-[560px]"
        >
          <p className="mb-1 font-display text-xl text-ink-900">
            {CATEGORIES[active].name.split(" / ")[0]}
            <span className="ml-2 text-xs font-bold tracking-[0.25em] text-tao-500">
              {CATEGORIES[active].name.split(" / ").slice(1).join(" · ")}
            </span>
          </p>
          <div className="mb-5 h-px bg-gradient-to-r from-tao-500/60 via-ink-200/60 to-transparent" />
          <div className="grid grid-cols-3 gap-2.5">
            {CATEGORIES[active].subs.map((s) => (
              <a
                key={s}
                href="#guess"
                className="group flex items-center gap-2 rounded-md border border-ink-200/60 bg-cream/60 px-3 py-2.5 text-[13px] text-ink-700 transition hover:border-tao-500 hover:bg-tao-50 hover:text-tao-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-tao-400 transition group-hover:scale-125" />
                {s}
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between rounded-md bg-ink-900 px-4 py-3 text-cream">
            <span className="flex items-center gap-2 text-sm">
              <Icon name="flame" className="h-4 w-4 text-tao-400" />
              本周热搜:{CATEGORIES[active].subs.slice(0, 3).join(" / ")}
            </span>
            <a href="#guess" className="flex items-center gap-1 text-xs font-bold text-gold-400 transition hover:text-gold-500">
              去逛 <Icon name="arrowR" className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Carousel() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % BANNERS.length), 4600);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <div
      className="group/car relative h-[300px] overflow-hidden rounded-lg bg-ink-800 sm:h-[380px] lg:h-full lg:min-h-[440px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {BANNERS.map((b, i) => (
        <div
          key={b.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === slide ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <img
            src={b.img}
            alt={b.title}
            className={`h-full w-full object-cover object-right ${i === slide ? "anim-kenburns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-7 sm:p-10">
            <p className="text-[11px] font-bold tracking-[0.4em] text-gold-400">{b.kicker}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-paper drop-shadow-lg sm:text-5xl xl:text-6xl">
              {b.title}
            </h2>
            <p className="mt-3 max-w-md text-sm text-cream/90 sm:text-base">{b.sub}</p>
            <a
              href="#flash"
              className="group mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-tao-500 px-6 py-3 font-bold text-paper shadow-[0_10px_26px_-10px_rgb(255_78_0/0.8)] transition hover:bg-tao-600"
            >
              {b.cta}
              <Icon name="arrowR" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      ))}

      {/* 左右箭头 */}
      <button
        aria-label="上一张"
        onClick={() => setSlide((s) => (s - 1 + BANNERS.length) % BANNERS.length)}
        className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink-950/40 text-paper opacity-0 transition hover:bg-tao-500 group-hover/car:opacity-100"
      >
        <Icon name="arrowR" className="h-5 w-5 rotate-180" />
      </button>
      <button
        aria-label="下一张"
        onClick={() => setSlide((s) => (s + 1) % BANNERS.length)}
        className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink-950/40 text-paper opacity-0 transition hover:bg-tao-500 group-hover/car:opacity-100"
      >
        <Icon name="arrowR" className="h-5 w-5" />
      </button>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-7 z-20 flex gap-2 sm:left-10">
        {BANNERS.map((b, i) => (
          <button
            key={b.title}
            aria-label={`第${i + 1}张`}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === slide ? "w-8 bg-gold-400" : "w-4 bg-paper/40 hover:bg-paper/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function UserPanel({ onLogin }: { onLogin: () => void }) {
  return (
    <aside className="hidden flex-col gap-3 xl:flex">
      <div className="rounded-lg border border-ink-200/70 bg-paper p-5">
        <div className="flex items-center gap-3.5">
          <span className="anim-floaty grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-tao-100 to-tao-200 text-tao-600 ring-2 ring-tao-500/30">
            <Icon name="user" className="h-7 w-7" />
          </span>
          <div>
            <p className="font-bold text-ink-900">Hi! 欢迎来到淘宝</p>
            <p className="mt-0.5 text-xs text-ink-400">登录后领取更多权益</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={onLogin}
            className="rounded-md bg-tao-500 py-2 text-sm font-bold text-paper transition hover:bg-tao-600 active:scale-95"
          >
            登 录
          </button>
          <button
            onClick={onLogin}
            className="rounded-md border border-tao-500 py-2 text-sm font-bold text-tao-600 transition hover:bg-tao-50 active:scale-95"
          >
            免费注册
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 divide-x divide-ink-200/70 rounded-md bg-cream/70 py-2.5 text-center">
          {[
            { icon: "star", label: "签到 +2 分" },
            { icon: "ticket", label: "领 40 元券" },
            { icon: "gift", label: "新人红包" },
          ].map((a) => (
            <button key={a.label} className="group flex flex-col items-center gap-1 px-1">
              <Icon name={a.icon} className="h-4.5 w-4.5 text-tao-500 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-[11px] text-ink-500 transition group-hover:text-tao-600">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-ink-200/70 bg-paper p-4">
        <p className="mb-2 flex items-center justify-between text-xs font-bold text-ink-700">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-tao-500" />
            淘宝公告
          </span>
          <a href="#top" onClick={(e) => e.preventDefault()} className="font-normal text-ink-400 transition hover:text-tao-500">
            更多
          </a>
        </p>
        <ul className="space-y-1.5">
          {ANNOUNCEMENTS.map((a) => (
            <li key={a}>
              <a
                href="#top"
                onClick={(e) => e.preventDefault()}
                className="block truncate text-xs text-ink-500 transition hover:text-tao-600"
              >
                · {a}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 直播小卡 */}
      <a
        href="#ranking"
        className="group relative block overflow-hidden rounded-lg border border-ink-200/70"
      >
        <img
          src="https://image.qwenlm.ai/generated-images/15f402a2-f71e-4aa2-b3f5-fed4e4267b64/_result.png"
          alt="淘宝直播"
          className="h-28 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-flame-600 px-2 py-0.5 text-[11px] font-bold text-paper">
          <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-paper" />
          LIVE 直播中
        </span>
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-bold text-paper">街拍 OOTD · 春装上新</span>
          <span className="flex items-center gap-1 text-[11px] text-cream/85">
            <Icon name="eye" className="h-3.5 w-3.5" />
            2.3万在看
          </span>
        </div>
      </a>
    </aside>
  );
}

export default function Hero({ onLogin }: { onLogin: () => void }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="top" className="container-x relative pt-4" onMouseLeave={() => setActive(null)}>
      <div className="grid gap-3 lg:grid-cols-[216px_minmax(0,1fr)] xl:grid-cols-[216px_minmax(0,1fr)_292px]">
        <CategorySidebar active={active} setActive={setActive} />
        <Carousel />
        <UserPanel onLogin={onLogin} />
      </div>

      {/* 快捷服务 */}
      <div className="mt-3 grid grid-cols-4 gap-1 rounded-lg border border-ink-200/70 bg-paper p-3 md:grid-cols-8">
        {SERVICES.map((s) => (
          <button
            key={s.label}
            className="group flex flex-col items-center gap-1.5 rounded-md py-2 transition hover:bg-tao-50"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-tao-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-tao-500 group-hover:text-paper group-hover:shadow-[0_10px_20px_-8px_rgb(255_78_0/0.7)]">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <span className="text-xs font-medium text-ink-700">{s.label}</span>
            <span className="-mt-1 text-[10px] text-ink-400 transition group-hover:text-tao-500">{s.note}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/** 全宽滚动播报条 */
export function Ticker() {
  return (
    <div className="marquee mt-8 overflow-hidden border-y border-ink-700 bg-ink-900 py-2.5">
      <div className="marquee-track flex w-max items-center">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="flex items-center text-sm text-cream/85">
            <span className="flex items-center gap-2 px-6">
              <Icon name="bolt" className="h-3.5 w-3.5 text-tao-400" />
              {t}
            </span>
            <span className="text-[8px] text-ink-500">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
