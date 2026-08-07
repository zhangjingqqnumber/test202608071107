import { useMemo, useState } from "react";
import { PRODUCTS, type Product } from "../data/shop";
import { Reveal, SectionHead, usePrefersReducedMotion } from "../lib";
import { Icon } from "./icons";

function ProductCard({
  p,
  index,
  round,
  fav,
  onFav,
  onAdd,
}: {
  p: Product;
  index: number;
  round: number;
  fav: boolean;
  onFav: (p: Product) => void;
  onAdd: (p: Product, price: number) => void;
}) {
  return (
    <div
      key={`${p.id}-${round}`}
      style={{ animationDelay: `${index * 45}ms` }}
      className="anim-card group flex h-full flex-col overflow-hidden rounded-lg border border-ink-200/70 bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-tao-300 hover:shadow-lift"
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-2.5 top-2.5 rounded bg-ink-900/85 px-1.5 py-0.5 text-[10px] font-bold text-gold-400">
          {p.cat}热卖
        </span>
        <button
          aria-label="收藏"
          onClick={() => onFav(p)}
          className={`absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full shadow transition-all active:scale-90 ${
            fav ? "bg-flame-600 text-paper" : "bg-paper/90 text-ink-400 hover:text-flame-600"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4.5 w-4.5"
            fill={fav ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.9"
          >
            <path d="M12 20.4C7.2 16.6 3.6 13.4 3.6 9.7 3.6 7.1 5.6 5 8.1 5c1.6 0 3 .8 3.9 2.1C12.9 5.8 14.3 5 15.9 5c2.5 0 4.5 2.1 4.5 4.7 0 3.7-3.6 6.9-8.4 10.7z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex flex-wrap gap-1">
          {p.tags.map((t) => (
            <span
              key={t}
              className={`rounded-sm border px-1 py-px text-[10px] font-bold ${
                t === "天猫"
                  ? "border-tao-500 bg-tao-500 text-paper"
                  : "border-tao-300 text-tao-600"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-1.5 line-clamp-2 min-h-10 text-[13px] leading-5 text-ink-800 transition group-hover:text-tao-600">
          {p.title}
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-display text-[22px] leading-none text-tao-500">
            <span className="text-xs">¥</span>
            {p.price}
            <span className="ml-1.5 text-xs font-normal text-ink-300 line-through">¥{p.origPrice}</span>
          </span>
          <span className="text-[11px] text-ink-400">{p.sales}人付款</span>
        </div>
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-400">
          <Icon name="store" className="h-3.5 w-3.5" />
          {p.shop}
        </p>

        <div className="mt-3 flex translate-y-1 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onAdd(p, p.price)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-tao-500 py-2 text-xs font-bold text-paper transition hover:bg-tao-600 active:scale-95"
          >
            <Icon name="cart" className="h-3.5 w-3.5" />
            加入购物车
          </button>
          <button
            onClick={() => onAdd(p, p.price)}
            className="rounded-md border border-tao-500 px-3 py-2 text-xs font-bold text-tao-600 transition hover:bg-tao-50 active:scale-95"
          >
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuessLike({
  query,
  clearQuery,
  onAdd,
  notify,
}: {
  query: string;
  clearQuery: () => void;
  onAdd: (p: Product, price: number) => void;
  notify: (msg: string) => void;
}) {
  const [order, setOrder] = useState(() => PRODUCTS.map((p) => p.id));
  const [round, setRound] = useState(0);
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [fading, setFading] = useState(false);
  const reduced = usePrefersReducedMotion();

  const list = useMemo(() => {
    const base = query
      ? PRODUCTS.filter(
          (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.shop.includes(query) || p.cat.includes(query),
        )
      : order.map((id) => PRODUCTS.find((p) => p.id === id)!);
    return base;
  }, [query, order]);

  const shuffle = () => {
    if (fading) return;
    const go = () => {
      setOrder((o) => {
        const a = [...o];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      });
      setRound((r) => r + 1);
      setFading(false);
    };
    if (reduced) {
      go();
      return;
    }
    setFading(true);
    setTimeout(go, 240);
  };

  const toggleFav = (p: Product) => {
    setFavs((s) => {
      const n = new Set(s);
      if (n.has(p.id)) {
        n.delete(p.id);
        notify("已取消收藏");
      } else {
        n.add(p.id);
        notify(`已收藏「${p.title.slice(0, 12)}…」`);
      }
      return n;
    });
  };

  return (
    <section id="guess" className="container-x scroll-mt-24 pb-20 pt-16">
      <Reveal>
        <SectionHead
          title="猜你喜欢"
          en="JUST FOR YOU · 千人千面"
          extra={
            <div className="flex items-center gap-3">
              {query && (
                <button
                  onClick={clearQuery}
                  className="flex items-center gap-1.5 rounded-full border border-tao-300 bg-tao-50 px-3.5 py-1.5 text-xs font-bold text-tao-600 transition hover:bg-tao-100"
                >
                  “{query}” 的搜索结果
                  <Icon name="close" className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={shuffle}
                className="group flex items-center gap-2 rounded-md border-2 border-ink-900 bg-cream px-4 py-2 text-sm font-bold text-ink-900 transition hover:border-tao-500 hover:bg-tao-500 hover:text-paper active:scale-95"
              >
                <Icon name="refresh" className={`h-4 w-4 ${fading ? "anim-spin-once" : "transition-transform group-hover:rotate-180"}`} />
                换一换
              </button>
            </div>
          }
        />
      </Reveal>

      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink-200 bg-cream/50 py-20 text-center">
          <Icon name="search" className="mx-auto h-10 w-10 text-ink-300" />
          <p className="mt-4 font-display text-2xl text-ink-700">没有找到「{query}」相关的宝贝</p>
          <p className="mt-2 text-sm text-ink-400">换个关键词试试,或者看看下面的推荐</p>
          <button
            onClick={clearQuery}
            className="mt-6 rounded-md bg-tao-500 px-6 py-2.5 text-sm font-bold text-paper transition hover:bg-tao-600"
          >
            清空搜索
          </button>
        </div>
      ) : (
        <div
          className={`grid grid-cols-2 gap-3 transition-opacity duration-200 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {list.map((p, i) => (
            <ProductCard
              key={`${p.id}-${round}`}
              p={p}
              index={i}
              round={round}
              fav={favs.has(p.id)}
              onFav={toggleFav}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}

      <Reveal delay={120}>
        <p className="mt-10 text-center text-xs tracking-[0.3em] text-ink-300">
          — 已 到 底 啦 ,点 击 收 藏 更 多 好 店 —
        </p>
      </Reveal>
    </section>
  );
}
