import { useEffect, useState } from "react";
import { Icon, FakeQr } from "./icons";

export interface ToastItem {
  id: number;
  msg: string;
}

export function Toasts({ items }: { items: ToastItem[] }) {
  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-[70] flex w-max max-w-[92vw] -translate-x-1/2 flex-col items-center gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="anim-toast flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-900/95 py-2.5 pl-3.5 pr-5 text-sm text-cream shadow-lift"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-tao-500 text-paper">
            <Icon name="check" className="h-3 w-3" />
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function LoginModal({ open, onClose, notify }: { open: boolean; onClose: () => void; notify: (m: string) => void }) {
  const [tab, setTab] = useState<"qr" | "sms">("qr");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/65 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="anim-card w-full max-w-[400px] overflow-hidden rounded-lg bg-paper shadow-lift"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between bg-ink-900 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-tao-500 font-display text-lg text-paper">淘</span>
            <span className="font-display text-xl text-cream">登录淘宝</span>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-300 transition hover:bg-ink-700 hover:text-cream"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5 grid grid-cols-2 rounded-md bg-cream p-1 text-sm font-bold">
            {(["qr", "sms"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded py-2 transition ${
                  tab === t ? "bg-paper text-tao-600 shadow-sm" : "text-ink-400 hover:text-ink-700"
                }`}
              >
                {t === "qr" ? "扫码登录" : "短信登录"}
              </button>
            ))}
          </div>

          {tab === "qr" ? (
            <div className="flex flex-col items-center">
              <div className="rounded-lg border-2 border-dashed border-ink-200 bg-cream/60 p-3">
                <FakeQr className="h-36 w-36" />
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-ink-700">
                打开 <span className="font-bold text-tao-600">手机淘宝</span> 扫一扫登录
              </p>
              <p className="mt-1 text-xs text-ink-400">扫码即代表同意《用户服务协议》与《隐私政策》</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                placeholder="请输入手机号"
                className="h-11 w-full rounded-md border border-ink-200 bg-cream/50 px-4 text-sm outline-none transition focus:border-tao-500 focus:bg-paper"
              />
              <div className="flex gap-2.5">
                <input
                  placeholder="短信验证码"
                  className="h-11 min-w-0 flex-1 rounded-md border border-ink-200 bg-cream/50 px-4 text-sm outline-none transition focus:border-tao-500 focus:bg-paper"
                />
                <button
                  onClick={() => notify("演示环境:验证码已发送至 138****8888")}
                  className="shrink-0 rounded-md border border-tao-500 px-4 text-xs font-bold text-tao-600 transition hover:bg-tao-50"
                >
                  获取验证码
                </button>
              </div>
              <button
                onClick={() => notify("演示环境:暂未开放真实登录")}
                className="h-11 w-full rounded-md bg-tao-500 font-bold text-paper transition hover:bg-tao-600 active:scale-[0.98]"
              >
                登 录
              </button>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-ink-200 pt-4 text-xs text-ink-400">
            <a href="#top" onClick={(e) => e.preventDefault()} className="transition hover:text-tao-600">
              忘记密码?
            </a>
            <a href="#top" onClick={(e) => e.preventDefault()} className="transition hover:text-tao-600">
              支付宝快捷登录
            </a>
            <a href="#top" onClick={(e) => e.preventDefault()} className="font-bold text-tao-500 transition hover:text-tao-600">
              免费注册
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="回到顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-paper text-ink-700 shadow-card transition-all duration-300 hover:border-tao-500 hover:bg-tao-500 hover:text-paper ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Icon name="arrowU" className="h-5 w-5" />
    </button>
  );
}
