export interface Product {
  id: number;
  title: string;
  img: string;
  price: number;
  origPrice: number;
  sales: string;
  shop: string;
  tags: string[];
  cat: string;
}

const IMG = {
  banner1:
    "https://image.qwenlm.ai/generated-images/07a27bf7-dbd1-456e-a88e-920e2cac576f/_result.png",
  banner2:
    "https://image.qwenlm.ai/generated-images/e469d6ea-925a-4a54-b5dd-f17d1eeae5ee/_result.png",
  banner3:
    "https://image.qwenlm.ai/generated-images/da54bbde-4ba4-4017-92f6-6e29a5d64983/_result.png",
  headphones:
    "https://image.qwenlm.ai/generated-images/4606c3b4-447f-46fc-960d-77d78c9816b9/_result.png",
  keyboard:
    "https://image.qwenlm.ai/generated-images/101ceb9d-fded-4955-80d2-5a4d00bd94c0/_result.png",
  speaker:
    "https://image.qwenlm.ai/generated-images/81cb8c75-da6f-4445-a070-7ba0cb9d4642/_result.png",
  watch:
    "https://image.qwenlm.ai/generated-images/7aef6d17-aa76-44eb-9818-04f485ae8cc0/_result.png",
  serum:
    "https://image.qwenlm.ai/generated-images/f6f7779a-7777-4cca-8c39-8707546f220a/_result.png",
  sneakers:
    "https://image.qwenlm.ai/generated-images/15f402a2-f71e-4aa2-b3f5-fed4e4267b64/_result.png",
  backpack:
    "https://image.qwenlm.ai/generated-images/7b040211-6f08-4428-8e3e-638d4f11f353/_result.png",
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "SOUNDGO 头戴式无线降噪耳机 奶白限定色 40h续航",
    img: IMG.headphones,
    price: 399,
    origPrice: 599,
    sales: "2.4万",
    shop: "声阔数码旗舰店",
    tags: ["天猫", "顺丰包邮"],
    cat: "数码",
  },
  {
    id: 2,
    title: "复古客制化机械键盘 87键 奶油橙轴 Gasket结构",
    img: IMG.keyboard,
    price: 459,
    origPrice: 629,
    sales: "8600",
    shop: "键圈工作室",
    tags: ["天猫", "退货宝"],
    cat: "数码",
  },
  {
    id: 3,
    title: "智能音箱 家庭版 燕麦灰 语音遥控全屋家电",
    img: IMG.speaker,
    price: 129,
    origPrice: 199,
    sales: "5.1万",
    shop: "云栖智能官方店",
    tags: ["天猫", "极速退款"],
    cat: "数码",
  },
  {
    id: 4,
    title: "北欧简约钢带石英腕表 38mm 白盘 日历显示",
    img: IMG.watch,
    price: 599,
    origPrice: 899,
    sales: "3200",
    shop: "时刻官方旗舰",
    tags: ["包邮", "正品保障"],
    cat: "潮流",
  },
  {
    id: 5,
    title: "烟酰胺焕亮精华液 30ml 提亮肤色 温和修护",
    img: IMG.serum,
    price: 159,
    origPrice: 259,
    sales: "6.8万",
    shop: "植本研究所",
    tags: ["天猫", "过敏包退"],
    cat: "美妆",
  },
  {
    id: 6,
    title: "复古厚底老爹鞋 米白拼橙 男女同款 缓震透气",
    img: IMG.sneakers,
    price: 269,
    origPrice: 399,
    sales: "1.9万",
    shop: "街角运动专营",
    tags: ["包邮", "运费险"],
    cat: "潮流",
  },
  {
    id: 7,
    title: "油蜡帆布通勤双肩包 15.6寸 复古军绿 防泼水",
    img: IMG.backpack,
    price: 189,
    origPrice: 289,
    sales: "4300",
    shop: "山野制包",
    tags: ["退货宝", "破损补寄"],
    cat: "潮流",
  },
  {
    id: 8,
    title: "SOUNDGO 降噪耳机 曜石黑 旗舰款 空间音频",
    img: IMG.headphones,
    price: 429,
    origPrice: 649,
    sales: "1.1万",
    shop: "声阔数码旗舰店",
    tags: ["天猫", "顺丰包邮"],
    cat: "数码",
  },
  {
    id: 9,
    title: "烟酰胺精华液 50ml 家庭装 囤货更划算",
    img: IMG.serum,
    price: 219,
    origPrice: 358,
    sales: "2.2万",
    shop: "植本研究所",
    tags: ["天猫", "买2减30"],
    cat: "美妆",
  },
  {
    id: 10,
    title: "老爹鞋 樱花粉 女款 春季新品 显腿长",
    img: IMG.sneakers,
    price: 249,
    origPrice: 379,
    sales: "9800",
    shop: "街角运动专营",
    tags: ["包邮", "运费险"],
    cat: "潮流",
  },
];

export const productById = (id: number) => PRODUCTS.find((p) => p.id === id)!;

export interface FlashItem {
  product: Product;
  flashPrice: number;
  sold: number; // 已抢百分比
}

export const FLASH_ITEMS: FlashItem[] = [
  { product: productById(1), flashPrice: 299, sold: 82 },
  { product: productById(5), flashPrice: 99, sold: 67 },
  { product: productById(6), flashPrice: 199, sold: 91 },
  { product: productById(2), flashPrice: 359, sold: 45 },
  { product: productById(4), flashPrice: 459, sold: 73 },
];

export interface Ranking {
  title: string;
  en: string;
  tone: "tao" | "gold" | "flame";
  ids: number[];
}

export const RANKINGS: Ranking[] = [
  { title: "数码潮电榜", en: "DIGITAL TOP 3", tone: "tao", ids: [1, 2, 3] },
  { title: "潮流街拍榜", en: "TRENDY TOP 3", tone: "gold", ids: [6, 4, 7] },
  { title: "品质生活榜", en: "LIFESTYLE TOP 3", tone: "flame", ids: [5, 9, 3] },
];

export interface Banner {
  img: string;
  kicker: string;
  title: string;
  sub: string;
  cta: string;
}

export const BANNERS: Banner[] = [
  {
    img: IMG.banner1,
    kicker: "TAOBAO · 焕新大促",
    title: "春季焕新季",
    sub: "跨店每满 300 减 50 · 大牌 5 折起 · 前 1 小时加赠红包",
    cta: "立即开抢",
  },
  {
    img: IMG.banner2,
    kicker: "DIGITAL CARNIVAL",
    title: "数码潮电狂欢",
    sub: "旗舰直降 · 12 期免息 · 以旧换新至高补贴 800 元",
    cta: "去逛数码馆",
  },
  {
    img: IMG.banner3,
    kicker: "BEAUTY SUPER DAY",
    title: "美妆护肤超品日",
    sub: "大牌买 1 享 7 · 赠正装小样 · 直播间再领 40 元券",
    cta: "探索美妆馆",
  },
];

export interface Category {
  name: string;
  subs: string[];
}

export const CATEGORIES: Category[] = [
  { name: "女装 / 男装 / 内衣", subs: ["连衣裙", "T恤", "牛仔裤", "卫衣", "衬衫", "休闲裤", "文胸", "保暖内衣"] },
  { name: "手机 / 数码 / 电脑", subs: ["手机", "耳机", "笔记本", "平板", "相机", "智能手表", "键盘", "显示器"] },
  { name: "家电 / 生活电器", subs: ["冰箱", "洗衣机", "空气炸锅", "扫地机器人", "吹风机", "电饭煲", "破壁机"] },
  { name: "美妆 / 个护 / 香氛", subs: ["精华", "面霜", "防晒", "口红", "香水", "面膜", "洗发水", "电动牙刷"] },
  { name: "食品 / 生鲜 / 零食", subs: ["坚果", "牛奶", "水果", "海鲜", "咖啡", "辣条", "巧克力", "茶叶"] },
  { name: "母婴 / 玩具 / 童装", subs: ["奶粉", "尿裤", "积木", "遥控车", "童装", "婴儿车", "辅食"] },
  { name: "运动 / 户外 / 健身", subs: ["跑步鞋", "瑜伽垫", "冲锋衣", "帐篷", "哑铃", "骑行", "泳镜"] },
  { name: "鞋靴 / 箱包 / 配件", subs: ["老爹鞋", "帆布鞋", "双肩包", "托特包", "皮带", "墨镜", "棒球帽"] },
  { name: "家装 / 家具 / 建材", subs: ["沙发", "床垫", "灯具", "收纳", "窗帘", "绿植", "香薰"] },
  { name: "汽车 / 用品 / 服务", subs: ["行车记录仪", "脚垫", "车膜", "机油", "车载香薰", "洗车"] },
  { name: "图书 / 文具 / 乐器", subs: ["小说", "教辅", "钢笔", "手账", "吉他", "尤克里里", "画材"] },
  { name: "医药 / 保健 / 眼镜", subs: ["维生素", "鱼油", "隐形眼镜", "体温计", "按摩仪", "枸杞"] },
];

export interface Service {
  icon: string;
  label: string;
  note: string;
}

export const SERVICES: Service[] = [
  { icon: "phone", label: "充值中心", note: "话费 95 折" },
  { icon: "ticket", label: "领券中心", note: "每日神券" },
  { icon: "truck", label: "闪购到家", note: "1 小时达" },
  { icon: "store", label: "天猫超市", note: "满 88 包邮" },
  { icon: "plane", label: "飞猪旅行", note: "特价机票" },
  { icon: "film", label: "淘票票", note: "9.9 元起" },
  { icon: "wallet", label: "生活缴费", note: "水电燃气" },
  { icon: "crown", label: "88VIP", note: "折上 95 折" },
];

export const HOT_SEARCHES = [
  "春季连衣裙",
  "机械键盘",
  "防晒霜",
  "空气炸锅",
  "老爹鞋",
  "蓝牙耳机",
  "烟酰胺精华",
];



export const ANNOUNCEMENTS = [
  "3·8 焕新季招商规则公示",
  "关于规范促销价格行为的公告",
  "消费者保障服务升级通知",
];
