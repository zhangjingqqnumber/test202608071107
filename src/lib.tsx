import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** 是否偏好减弱动效 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** 倒计时,返回 [时, 分, 秒] 字符串 */
export function useCountdown(totalMs: number) {
  const [left, setLeft] = useState(totalMs);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.floor(left / 1000);
  return [pad(Math.floor(s / 3600)), pad(Math.floor((s % 3600) / 60)), pad(s % 60)] as const;
}

/** 滚动进入视口后显现 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${on ? "reveal-on" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** 统一的区块标题:斜切橙色竖条 + 展示字体 + 英文小标 */
export function SectionHead({
  title,
  en,
  extra,
}: {
  title: string;
  en: string;
  extra?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-bold tracking-[0.35em] text-tao-500">{en}</p>
        <h2 className="mt-1.5 flex items-center gap-3 font-display text-3xl leading-none text-ink-900 md:text-4xl">
          <span className="inline-block h-8 w-2.5 -skew-x-12 rounded-sm bg-tao-500" />
          {title}
        </h2>
      </div>
      {extra}
    </div>
  );
}
