import { useCallback, useState } from "react";
import type { Product } from "./data/shop";
import { usePrefersReducedMotion } from "./lib";
import { Header, TopBar } from "./components/Chrome";
import Hero from "./components/Hero";
import FlashSale from "./components/FlashSale";
import Ranking from "./components/Ranking";
import GuessLike from "./components/GuessLike";
import Footer from "./components/Footer";
import { BackToTop, LoginModal, Toasts, type ToastItem } from "./components/Overlays";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [query, setQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  const notify = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
  }, []);

  const addToCart = useCallback(
    (p: Product, price: number) => {
      setCartCount((c) => c + 1);
      notify(`已加入购物车:¥${price}「${p.title.slice(0, 13)}…」`);
    },
    [notify],
  );

  const onSearch = useCallback(
    (q: string) => {
      setQuery(q);
      if (q) {
        setTimeout(() => {
          document.getElementById("guess")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        }, 60);
      }
    },
    [reduced],
  );

  return (
    <div className="min-h-screen">
      <TopBar onLogin={() => setLoginOpen(true)} />
      <Header
        cartCount={cartCount}
        onSearch={onSearch}
        onLogin={() => setLoginOpen(true)}
        onCart={() =>
          notify(
            cartCount > 0
              ? `购物车共有 ${cartCount} 件宝贝,演示环境暂不结算`
              : "购物车还是空的,快去逛逛吧",
          )
        }
      />

      <main>
        <Hero onLogin={() => setLoginOpen(true)} />
        <FlashSale onAdd={addToCart} />
        <Ranking onAdd={addToCart} />
        <GuessLike
          query={query}
          clearQuery={() => setQuery("")}
          onAdd={addToCart}
          notify={notify}
        />
      </main>

      <Footer />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} notify={notify} />
      <Toasts items={toasts} />
      <BackToTop />
    </div>
  );
}
