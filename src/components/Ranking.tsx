import { RANKINGS, productById, type Product } from "../data/shop";
import { Reveal, SectionHead } from "../lib";
import { Icon } from "./icons";

const TONE = {
  tao: { chip: "bg-tao-500", text: "text-tao-600", bar: "from-tao-500/70" },
  gold: { chip: "bg-gold-500", text: "text-gold-500", bar: "from-gold-500/70" },
  flame: { chip: "bg-flame-600", text: "text-flame-600", bar: "from-flame-600/70" },
} as const;

const RANK_BADGE = ["bg-tao-500 text-paper", "bg-gold-500 text-ink-900", "bg-ink-300 text-ink-900"];

export default function Ranking({ onAdd }: { onAdd: (p: Product, price: number) => void }) {
  return (
    <section id="ranking" className="mt-16 scroll-mt-24 bg-cream/70 py-14">
      <div className="container-x">
        <Reveal>
          <SectionHead
            title="热卖榜单"
            en="TAOBAO TOP LISTS · 每日 10 点更新"
            extra={
              <a
                href="#guess"
                className="group flex items-center gap-1.5 text-sm font-bold text-ink-500 transition hover:text-tao-500"
              >
                查看全部榜单
                <Icon name="arrowR" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            }
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {RANKINGS.map((r, ri) => {
            const tone = TONE[r.tone];
            return (
              <Reveal key={r.title} delay={ri * 90}>
                <div className="group/col relative overflow-hidden rounded-lg border border-ink-200/70 bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className={`h-1.5 bg-gradient-to-r ${tone.bar} to-transparent`} />
                  <div className="flex items-center justify-between p-5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`grid h-9 w-9 place-items-center rounded-md ${tone.chip} text-paper`}>
                        <Icon name="flame" className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl leading-none text-ink-900">{r.title}</h3>
                        <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-ink-300">{r.en}</p>
                      </div>
                    </div>
                    <span className="stroke-title select-none font-display text-4xl leading-none opacity-60">
                      {String(ri + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <ul className="px-3 pb-4">
                    {r.ids.map((id, idx) => {
                      const p = productById(id);
                      return (
                        <li
                          key={`${id}-${idx}`}
                          className="group flex cursor-pointer items-center gap-3 rounded-md p-2.5 transition hover:bg-cream"
                          onClick={() => onAdd(p, p.price)}
                          title="点击加入购物车"
                        >
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded font-display text-sm leading-none ${RANK_BADGE[idx]}`}
                          >
                            {idx + 1}
                          </span>
                          <span className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-cream">
                            <img
                              src={p.img}
                              alt={p.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-[13px] font-medium text-ink-800 transition group-hover:text-tao-600">
                              {p.title}
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-[11px] text-ink-400">
                              <span className="flex items-center gap-0.5">
                                <Icon name="flame" className="h-3 w-3 text-tao-400" />
                                热销 {p.sales}+
                              </span>
                              <span>{p.shop}</span>
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className={`font-display text-lg leading-none ${tone.text}`}>
                              <span className="text-xs">¥</span>
                              {p.price}
                            </p>
                            <Icon
                              name="cart"
                              className="ml-auto mt-1.5 h-4 w-4 text-ink-300 transition group-hover:text-tao-500"
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href="#guess"
                    className={`flex items-center justify-center gap-1 border-t border-dashed border-ink-200/80 py-3 text-xs font-bold ${tone.text} transition hover:bg-cream`}
                  >
                    查看完整榜单
                    <Icon name="arrowR" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
