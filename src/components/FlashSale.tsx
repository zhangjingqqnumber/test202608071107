import { useMemo } from "react";
import { FLASH_ITEMS, type Product } from "../data/shop";
import { Reveal, SectionHead, useCountdown } from "../lib";
import { Icon } from "./icons";

function TimeCell({ v, label }: { v: string; label?: string }) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-ink-900 font-display text-lg leading-none text-gold-400 shadow-inner">
        <span key={v} className="anim-tick tabular-nums">
          {v}
        </span>
      </span>
      {label && <span className="text-[10px] text-ink-400">{label}</span>}
    </span>
  );
}

export default function FlashSale({ onAdd }: { onAdd: (p: Product, price: number) => void }) {
  const target = useMemo(() => (2 * 3600 + 47 * 60 + 12) * 1000, []);
  const [h, m, s] = useCountdown(target);

  return (
    <section id="flash" className="container-x scroll-mt-24 pt-14">
      <Reveal>
        <SectionHead
          title="今日秒杀"
          en="FLASH SALE · 20:00 场"
          extra={
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-ink-500 sm:inline">距本场结束</span>
              <div className="flex items-center gap-1.5">
                <TimeCell v={h} label="时" />
                <span className="pb-4 font-display text-lg text-tao-500">:</span>
                <TimeCell v={m} label="分" />
                <span className="pb-4 font-display text-lg text-tao-500">:</span>
                <TimeCell v={s} label="秒" />
              </div>
            </div>
          }
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {FLASH_ITEMS.map((f, i) => (
          <Reveal key={f.product.id} delay={i * 70}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-ink-200/70 bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-tao-300 hover:shadow-lift">
              <span className="absolute left-0 top-3 z-10 rounded-r-full bg-flame-600 py-1 pl-2.5 pr-3 text-[11px] font-bold text-paper shadow">
                秒杀价
              </span>
              <div className="relative aspect-square overflow-hidden bg-cream">
                <img
                  src={f.product.img}
                  alt={f.product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-3.5">
                <p className="line-clamp-1 text-[13px] text-ink-700">{f.product.title}</p>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="font-display text-2xl leading-none text-tao-500">
                    <span className="text-sm">¥</span>
                    {f.flashPrice}
                  </span>
                  <span className="text-xs text-ink-300 line-through">¥{f.product.origPrice}</span>
                </div>
                <div className="mt-2.5">
                  <div className="relative h-4 overflow-hidden rounded-full bg-tao-100">
                    <div
                      className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-tao-500 to-flame-600 transition-[width] duration-1000"
                      style={{ width: `${f.sold}%` }}
                    >
                      <span className="anim-shimmer absolute inset-y-0 left-0 w-10 bg-paper/40" />
                    </div>
                    <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-ink-800">
                      已抢 {f.sold}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onAdd(f.product, f.flashPrice)}
                  className="mt-3 rounded-md bg-tao-500 py-2 text-sm font-bold text-paper transition hover:bg-tao-600 active:scale-95"
                >
                  马上抢
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
