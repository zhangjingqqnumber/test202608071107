import { Icon } from "./icons";

const GUARANTEES = [
  { icon: "shield", title: "正品保障", desc: "假一赔十 · 品牌直供" },
  { icon: "refund", title: "极速退款", desc: "闪电到账 · 无需等待" },
  { icon: "umbrella", title: "运费险", desc: "退换货 0 负担" },
  { icon: "headset", title: "24h 客服", desc: "全天候在线答疑" },
];

const LINK_GROUPS: { title: string; links: string[] }[] = [
  { title: "购物指南", links: ["免费注册", "新手体验", "订单查询", "付款方式"] },
  { title: "配送方式", links: ["上门自提", "211 限时达", "配送服务查询", "配送费收取"] },
  { title: "支付方式", links: ["支付宝", "微信支付", "银行卡转账", "货到付款"] },
  { title: "商家服务", links: ["商家入驻", "卖家中心", "商家规则", "营销中心"] },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      {/* 保障条 */}
      <div className="border-b border-ink-700">
        <div className="container-x grid grid-cols-2 gap-6 py-9 md:grid-cols-4">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="group flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-700 text-tao-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-tao-500 group-hover:bg-tao-500 group-hover:text-paper">
                <Icon name={g.icon} className="h-5.5 w-5.5" />
              </span>
              <div>
                <p className="font-display text-lg leading-none text-cream">{g.title}</p>
                <p className="mt-1.5 text-xs text-ink-400">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 链接 */}
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-tao-500 font-display text-xl text-paper">淘</span>
            <div className="leading-tight">
              <p className="font-display text-xl text-cream">淘宝网</p>
              <p className="text-[10px] tracking-[0.28em] text-ink-500">TAOBAO.COM</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-6 text-ink-400">
            淘!我喜欢。亿万好物,尽在掌握 —— 从一杯奶茶到一台冰箱,淘宝陪你把生活过成喜欢的样子。
          </p>
          <div className="mt-5 flex gap-2.5">
            {["phone", "film", "wallet", "plane"].map((n) => (
              <span
                key={n}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-ink-700 text-ink-400 transition hover:border-tao-500 hover:text-tao-400"
              >
                <Icon name={n} className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        {LINK_GROUPS.map((g) => (
          <div key={g.title}>
            <h4 className="mb-4 flex items-center gap-2 font-display text-base text-cream">
              <span className="h-3.5 w-1 -skew-x-12 bg-tao-500" />
              {g.title}
            </h4>
            <ul className="space-y-2.5">
              {g.links.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs text-ink-400 transition hover:text-tao-400"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 版权 */}
      <div className="border-t border-ink-700">
        <div className="container-x flex flex-col items-center gap-2 py-6 text-center text-[11px] leading-5 text-ink-500">
          <p>
            © 2003 - 2026 淘宝网演示原型 · 本页面为前端设计作品,非淘宝官方网站,不产生真实交易
          </p>
          <p>
            增值电信业务经营许可证:浙B2-演示号 · 浙公网安备 演示号 · 互联网药品信息服务资格证书
          </p>
        </div>
      </div>
    </footer>
  );
}
