import { useEffect, useState } from "react";
import { HOT_SEARCHES } from "../data/shop";
import { Icon } from "./icons";

const TOP_LINKS = ["我的淘宝", "卖家中心", "帮助中心", "收藏夹", "手机逛淘宝"];

export function TopBar({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="border-b border-ink-700 bg-ink-900 text-xs text-ink-300">
      <div className="container-x flex h-8 items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Icon name="location" className="h-3.5 w-3.5 text-tao-400" />
            中国大陆
          </span>
          <span className="hidden text-ink-500 sm:inline">|</span>
          <span className="hidden sm:inline">
            亲,请
            <button
              onClick={onLogin}
              className="mx-1 font-bold text-tao-400 transition hover:text-tao-300"
            >
              登录
            </button>
            <button
              onClick={onLogin}
              className="font-bold text-cream transition hover:text-tao-300"
            >
              免费注册
            </button>
          </span>
        </div>
        <nav className="flex items-center gap-4">
          {TOP_LINKS.map((l, i) => (
            <a
              key={l}
              href="#top"
              onClick={(e) => e.preventDefault()}
              className={`hidden transition hover:text-tao-300 sm:inline ${i === 0 ? "inline text-cream" : ""}`}
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function Header({
  cartCount,
  onSearch,
  onLogin,
  onCart,
}: {
  cartCount: number;
  onSearch: (q: string) => void;
  onLogin: () => void;
  onCart: () => void;
}) {
  const [input, setInput] = useState("");
  const [hintIdx, setHintIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setHintIdx((i) => (i + 1) % HOT_SEARCHES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch((input || HOT_SEARCHES[hintIdx]).trim());
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-ink-200/70 shadow-[0_10px_30px_-18px_rgb(31_19_7/0.35)]" : "border-transparent"
      }`}
    >
      <div className="container-x flex items-center gap-4 py-3.5 md:gap-8">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={(e) => e.preventDefault()}>
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-tao-500 font-display text-2xl leading-none text-paper shadow-[0_8px_20px_-8px_rgb(255_78_0/0.7)]">
            淘
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-2xl text-ink-900">淘宝网</span>
            <span className="text-[10px] font-bold tracking-[0.28em] text-ink-400">TAOBAO.COM</span>
          </span>
        </a>

        {/* 搜索 */}
        <div className="min-w-0 flex-1">
          <form onSubmit={submit} className="flex">
            <div className="relative min-w-0 flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={HOT_SEARCHES[hintIdx]}
                className="h-11 w-full rounded-l-md border-2 border-r-0 border-tao-500 bg-paper px-4 text-sm outline-none transition placeholder:text-ink-300 focus:bg-tao-50/60"
              />
              <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-ink-300 md:block">
                <Icon name="search" className="h-4 w-4" />
              </span>
            </div>
            <button
              type="submit"
              className="flex h-11 items-center gap-1.5 rounded-r-md bg-tao-500 px-5 font-bold text-paper transition hover:bg-tao-600 active:scale-95 md:px-8"
            >
              <Icon name="search" className="h-4 w-4 md:hidden" />
              搜索
            </button>
          </form>
          <div className="mt-1.5 flex items-center gap-3 overflow-hidden text-xs text-ink-400">
            {HOT_SEARCHES.slice(0, 6).map((h, i) => (
              <button
                key={h}
                onClick={() => onSearch(h)}
                className={`shrink-0 transition hover:text-tao-500 ${
                  i === 0 ? "font-bold text-tao-500" : ""
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* 购物车 + 登录 */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            onClick={onLogin}
            className="hidden h-11 items-center gap-2 rounded-md border border-ink-200 px-4 text-sm font-medium text-ink-700 transition hover:border-tao-400 hover:text-tao-600 lg:flex"
          >
            <Icon name="user" className="h-4 w-4" />
            登录
          </button>
          <button
            onClick={onCart}
            className="relative flex h-11 items-center gap-2 rounded-md border-2 border-ink-900 bg-cream px-4 text-sm font-bold text-ink-900 transition hover:border-tao-500 hover:bg-tao-500 hover:text-paper active:scale-95"
          >
            <Icon name="cart" className="h-5 w-5" />
            <span className="hidden sm:inline">购物车</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="anim-pop absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-tao-500 px-1 text-[11px] font-bold text-paper shadow"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
