export const laptopsData = [
  // --- ASUS ROG ---
  {
    id: "rog-scar-18",
    name: "ROG Strix SCAR 18 (2024)",
    brand: "ASUS ROG",
    price: 3899,
    rating: 4.9,
    reviews: 124,
    inStock: true,
    stockCount: 8,
    image: "https://kinglap.vn/wp-content/uploads/2024/01/ROG-1-1.jpg",
    accentColor: "rgb(239, 68, 68)", // Red
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, up to 5.8GHz)",
      gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W TGP)",
      ram: "64GB DDR5 5600MHz",
      ssd: "2TB PCIe 4.0 NVMe M.2 SSD",
      display: "18\" QHD+ (2560x1600) ROG Nebula HDR Mini LED 240Hz",
      battery: "90Whr",
      weight: "3.10 kg"
    },
    description: "The pinnacle of gaming performance. Dominate the battlefield with the latest Intel Core i9 processor, NVIDIA GeForce RTX 4090 GPU, and a stunning 18-inch Nebula HDR Mini LED display."
  },
  {
    id: "rog-zephyrus-g16",
    name: "ROG Zephyrus G16 OLED (2024)",
    brand: "ASUS ROG",
    price: 2699,
    rating: 4.8,
    reviews: 86,
    inStock: true,
    stockCount: 5,
    image: "https://2tmobile.com/wp-content/uploads/2024/06/asus-rog-zephyrus-g16-gu605-2024-v2-2tmobile.webp",
    accentColor: "rgb(239, 68, 68)",
    specs: {
      cpu: "Intel Core Ultra 9 185H (16 Cores, AI NPU)",
      gpu: "NVIDIA GeForce RTX 4080 12GB GDDR6",
      ram: "32GB LPDDR5X 7467MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" 2.5K (2560x1600) ROG Nebula OLED 240Hz, 0.2ms",
      battery: "90Whr",
      weight: "1.85 kg"
    },
    description: "Ultra-thin, ultra-premium gaming and creator laptop. Features a gorgeous OLED panel, sleek CNC-machined aluminum body, and robust AI processing capabilities."
  },
  {
    id: "rog-flow-x16",
    name: "ROG Flow X16 Convertible",
    brand: "ASUS ROG",
    price: 2199,
    rating: 4.7,
    reviews: 42,
    inStock: true,
    stockCount: 3,
    image: "https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Asus_ROG_Flow_X1689.jpeg",
    accentColor: "rgb(239, 68, 68)",
    specs: {
      cpu: "Intel Core i9-13900H (14 Cores, up to 5.4GHz)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      ram: "32GB DDR5 4800MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" QHD+ (2560x1600) ROG Nebula HDR Mini LED 240Hz Touchscreen",
      battery: "90Whr",
      weight: "2.10 kg"
    },
    description: "Versatility meets high performance. A 2-in-1 gaming laptop with a 360-degree hinge, premium stylus support, and a high-brightness Mini LED display."
  },
  {
    id: "rog-strix-g16",
    name: "ROG Strix G16 (2024)",
    brand: "ASUS ROG",
    price: 1399,
    rating: 4.6,
    reviews: 210,
    inStock: true,
    stockCount: 15,
    image: "https://cdn.hstatic.net/products/200000420363/t_i_xu_ng_-_2026-05-08t094029.755_0ef5a9d3bc0043baa46c6f62a3e82881_master.png",
    accentColor: "rgb(239, 68, 68)",
    specs: {
      cpu: "Intel Core i7-13650HX (14 Cores, up to 4.9GHz)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR5 4800MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" FHD+ (1920x1200) ROG Nebula Display 165Hz",
      battery: "90Whr",
      weight: "2.50 kg"
    },
    description: "High-value competitive gaming. Equipped with a sleek chassis, ROG Intelligent Cooling, and esports-ready frame rates."
  },
  {
    id: "rog-zephyrus-g14",
    name: "ROG Zephyrus G14 OLED",
    brand: "ASUS ROG",
    price: 1999,
    rating: 4.8,
    reviews: 95,
    inStock: false,
    stockCount: 0,
    image: "https://tanthanhdanh.vn/wp-content/uploads/2024/03/ga403uu-qs101w_promo_1_product.webp",
    accentColor: "rgb(239, 68, 68)",
    specs: {
      cpu: "AMD Ryzen 9 8945HS (8 Cores, Ryzen AI)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      ram: "32GB LPDDR5X 6400MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "14\" 3K (2880x1800) OLED 120Hz, 100% DCI-P3",
      battery: "73Whr",
      weight: "1.50 kg"
    },
    description: "Compact size, gigantic performance. A highly portable 14-inch powerhouse featuring AMD's latest Ryzen AI processor and a vibrant OLED screen."
  },

  // --- LENOVO LEGION ---
  {
    id: "legion-pro-7i",
    name: "Legion Pro 7i Gen 9",
    brand: "Lenovo Legion",
    price: 3199,
    rating: 4.9,
    reviews: 112,
    inStock: true,
    stockCount: 6,
    image: "https://p1-ofp.static.pub//fes/cms/2024/09/12/q6fb2891avf5ok5et6ppuhuuilu0cq939626.png?width=1200&height=1200",
    accentColor: "rgb(6, 182, 212)", // Cyan
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, up to 5.8GHz)",
      gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W TGP)",
      ram: "32GB DDR5 5600MHz",
      ssd: "2TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" WQXGA (2560x1600) IPS 240Hz, 500 nits, G-SYNC",
      battery: "99.9Whr",
      weight: "2.62 kg"
    },
    description: "The AI-tuned gaming behemoth. Features Lenovo's Coldfront 5.0 cooling, a fully loaded RTX 4090, and the LA2-Q AI chip for maximum frame optimization."
  },
  {
    id: "legion-slim-5",
    name: "Legion Slim 5 Gen 9",
    brand: "Lenovo Legion",
    price: 1299,
    rating: 4.6,
    reviews: 148,
    inStock: true,
    stockCount: 18,
    image: "https://p2-ofp.static.pub//fes/cms/2025/03/11/e9888ha54jml5ppulho4em8pz4ed3h667157.png?width=1200&height=1200",
    accentColor: "rgb(6, 182, 212)",
    specs: {
      cpu: "AMD Ryzen 7 8845HS (8 Cores, Ryzen AI)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR5 5600MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" WQXGA (2560x1600) IPS 165Hz, 100% sRGB",
      battery: "80Whr",
      weight: "2.30 kg"
    },
    description: "Sleek chassis, robust reliability. Ideal for students and mainstream gamers who need solid gaming power and all-day battery capability."
  },
  {
    id: "legion-pro-5i",
    name: "Legion Pro 5i Gen 9",
    brand: "Lenovo Legion",
    price: 1699,
    rating: 4.7,
    reviews: 98,
    inStock: true,
    stockCount: 11,
    image: "https://p3-ofp.static.pub//fes/cms/2024/09/12/elsxf6rwrtxudesy107rsj88cg0qhx499173.png?width=1200&height=1200",
    accentColor: "rgb(6, 182, 212)",
    specs: {
      cpu: "Intel Core i7-14700HX (20 Cores, up to 5.5GHz)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      ram: "32GB DDR5 5600MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" WQXGA (2560x1600) IPS 240Hz, 100% sRGB",
      battery: "80Whr",
      weight: "2.50 kg"
    },
    description: "Perfect sweet-spot machine. Delivers outstanding performance for AAA titles and content creation with 32GB high-speed memory."
  },
  {
    id: "legion-9i",
    name: "Legion 9i Flagship (2024)",
    brand: "Lenovo Legion",
    price: 3799,
    rating: 4.9,
    reviews: 35,
    inStock: true,
    stockCount: 4,
    image: "https://cdn2.cellphones.com.vn/x/media/catalog/product/t/e/text_ng_n_3__8_97.png?width=1200&height=1200",
    accentColor: "rgb(6, 182, 212)",
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, up to 5.8GHz)",
      gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W)",
      ram: "64GB DDR5 5600MHz Dual Channel",
      ssd: "2TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" 3.2K (3200x2000) Mini-LED 165Hz, 1200 nits Peak",
      battery: "99.9Whr",
      weight: "2.50 kg"
    },
    description: "The ultimate laptop luxury. Features a forged carbon lid, integrated liquid-cooling pump, and a gorgeous Mini-LED screen."
  },
  {
    id: "legion-slim-7i",
    name: "Legion Slim 7i Carbon",
    brand: "Lenovo Legion",
    price: 1889,
    rating: 4.8,
    reviews: 62,
    inStock: false,
    stockCount: 0,
    image: "https://p1-ofp.static.pub//fes/cms/2024/05/29/6odrxokq2snhdx9ort1t8w1ibmxtji263584.png?width=1200&height=1200",
    accentColor: "rgb(6, 182, 212)",
    specs: {
      cpu: "Intel Core i9-13900H (14 Cores, up to 5.4GHz)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      ram: "16GB DDR5 5200MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" WQXGA (2560x1600) IPS 240Hz, HDR 400",
      battery: "99.9Whr",
      weight: "2.00 kg"
    },
    description: "Sleek, lightweight, and incredibly powerful. A metal powerhouse designed for professional creators who occasionally enjoy gaming."
  },

  // --- MSI GAMING ---
  {
    id: "msi-titan-18",
    name: "MSI Titan 18 HX A14V",
    brand: "MSI",
    price: 4999,
    rating: 5.0,
    reviews: 28,
    inStock: true,
    stockCount: 2,
    image: "https://www.tncstore.vn/media/product/9647-laptop-1.jpg",
    accentColor: "rgb(220, 38, 38)", // Red
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, Liquid Metal)",
      gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W + MUX)",
      ram: "128GB DDR5 5600MHz (4x32GB)",
      ssd: "4TB (2x2TB RAID 0) NVMe PCIe Gen5 SSD",
      display: "18\" UHD+ (3840x2400) Mini-LED 120Hz, 100% DCI-P3",
      battery: "99.9Whr",
      weight: "3.60 kg"
    },
    description: "The undisputed king of desktop replacements. Featuring 128GB of RAM, 4TB SSD in RAID 0, and a mechanical keyboard with Cherry MX switches."
  },
  {
    id: "msi-raider-ge78",
    name: "MSI Raider GE78 HX (2024)",
    brand: "MSI",
    price: 2999,
    rating: 4.8,
    reviews: 79,
    inStock: true,
    stockCount: 7,
    image: "https://product.hstatic.net/200000722513/product/50hx_a282bcc539a34f518e4bc1104cc69d7d_7176dea5e69b429e8ac231dd3b1ac3a3_dd1d9c37afcd466aa24fdd052fa1b7e8_master.png?width=1200&height=1200",
    accentColor: "rgb(220, 38, 38)",
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, up to 5.8GHz)",
      gpu: "NVIDIA GeForce RTX 4080 12GB GDDR6",
      ram: "32GB DDR5 5600MHz",
      ssd: "2TB PCIe 4.0 NVMe M.2 SSD",
      display: "17\" QHD+ (2560x1600) IPS-Level 240Hz, 100% DCI-P3",
      battery: "99.9Whr",
      weight: "3.00 kg"
    },
    description: "Light up the arena. Mystic Light bar, premium high-fidelity Dynaudio sound, and raw computing power for competitive esports."
  },
  {
    id: "msi-stealth-16",
    name: "MSI Stealth 16 AI Studio",
    brand: "MSI",
    price: 2299,
    rating: 4.7,
    reviews: 53,
    inStock: true,
    stockCount: 9,
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/msi_stealth_16_ai_studio_a1v_1_8d676a8cfb.png?width=1200&height=1200",
    accentColor: "rgb(220, 38, 38)",
    specs: {
      cpu: "Intel Core Ultra 9 185H (16 Cores, AI Powered)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      ram: "32GB DDR5 5600MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" QHD+ (2560x1600) OLED 240Hz, VESA DisplayHDR",
      battery: "99.9Whr",
      weight: "1.99 kg"
    },
    description: "Sleek and stealthy. Designed for professional work by day and competitive gaming by night, wrapped in a lightweight magnesium-aluminum body."
  },
  {
    id: "msi-pulse-16",
    name: "MSI Pulse 16 AI",
    brand: "MSI",
    price: 1499,
    rating: 4.5,
    reviews: 64,
    inStock: true,
    stockCount: 14,
    image: "https://product.hstatic.net/200000837185/product/original_d15eec9d965d49c18046d47605a403ef_master.jpg?width=1200&height=1200",
    accentColor: "rgb(220, 38, 38)",
    specs: {
      cpu: "Intel Core Ultra 7 155H (16 Cores, AI NPU)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR5 5600MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" QHD+ (2560x1600) 240Hz IPS-Level Display",
      battery: "90Whr",
      weight: "2.30 kg"
    },
    description: "Equipped with futuristic sci-fi patterns and high-efficiency cooling, the Pulse 16 AI is ready for modern gaming and office multitasking."
  },
  {
    id: "msi-cyborg-15",
    name: "MSI Cyborg 15 Translucent",
    brand: "MSI",
    price: 899,
    rating: 4.3,
    reviews: 128,
    inStock: true,
    stockCount: 22,
    image: "https://cdn.hstatic.net/products/200000722513/1024_01c57881d30f4d049a4b84a3dd0fda60_master.png?width=1200&height=1200",
    accentColor: "rgb(220, 38, 38)",
    specs: {
      cpu: "Intel Core i7-13620H (10 Cores, up to 4.9GHz)",
      gpu: "NVIDIA GeForce RTX 4050 6GB GDDR6",
      ram: "16GB DDR5 5200MHz",
      ssd: "512GB PCIe 4.0 NVMe M.2 SSD",
      display: "15.6\" FHD (1920x1080) IPS 144Hz",
      battery: "53.5Whr",
      weight: "1.98 kg"
    },
    description: "Futuristic translucent chassis elements. Budget gaming redefined with cyberpunk aesthetics and reliable entry-level ray-tracing capabilities."
  },

  // --- RAZER ---
  {
    id: "razer-blade-16",
    name: "Razer Blade 16 (2024)",
    brand: "Razer",
    price: 4199,
    rating: 4.9,
    reviews: 88,
    inStock: true,
    stockCount: 5,
    image: "https://product.hstatic.net/200000722513/product/razer_blade_16_rtx_4080_e9c15d48bfbc4d629a8a72b8344e45c4_grande.png",
    accentColor: "rgb(34, 197, 94)", // Green
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, up to 5.8GHz)",
      gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W TGP)",
      ram: "32GB DDR5 5600MHz",
      ssd: "2TB PCIe 4.0 NVMe M.2 SSD",
      display: "16\" QHD+ (2560x1600) OLED 240Hz, 1M:1 Contrast Ratio",
      battery: "95.2Whr",
      weight: "2.45 kg"
    },
    description: "The ultimate OLED gaming screen. Uncompromising performance, CNC aluminum construction, and Chroma RGB per-key backlighting."
  },
  {
    id: "razer-blade-14",
    name: "Razer Blade 14 (2024)",
    brand: "Razer",
    price: 2699,
    rating: 4.8,
    reviews: 67,
    inStock: true,
    stockCount: 6,
    image: "https://product.hstatic.net/200000722513/product/razer_blade_14_rtx_4070_58066f126efb433cb8e178fc04dd87cb_grande.png",
    accentColor: "rgb(34, 197, 94)",
    specs: {
      cpu: "AMD Ryzen 9 8945HS (8 Cores, Ryzen AI)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      ram: "32GB DDR5 5600MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "14\" QHD+ (2560x1600) IPS 240Hz, 100% DCI-P3",
      battery: "68.1Whr",
      weight: "1.84 kg"
    },
    description: "Ultra-portable performance gaming. Razor-thin chassis with immense horsepower, perfect for mobile creators and hardcore gamers."
  },
  {
    id: "razer-blade-18",
    name: "Razer Blade 18 (2024)",
    brand: "Razer",
    price: 4799,
    rating: 4.9,
    reviews: 41,
    inStock: true,
    stockCount: 3,
    image: "https://product.hstatic.net/200000722513/product/razer_blade_18_rtx_4090_f3a74bbf37104bfa9de0e1e9d892d72f_grande.png",
    accentColor: "rgb(34, 197, 94)",
    specs: {
      cpu: "Intel Core i9-14900HX (24 Cores, Thunderbolt 5 ready)",
      gpu: "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W)",
      ram: "64GB DDR5 5600MHz",
      ssd: "4TB PCIe 4.0 NVMe M.2 SSD (2x2TB)",
      display: "18\" QHD+ (2560x1600) Mini-LED 300Hz, 1000 nits Peak",
      battery: "91.7Whr",
      weight: "3.20 kg"
    },
    description: "Desktop replacement redefined. Features the world's first 18-inch 300Hz Mini-LED display and triple fan cooling layout."
  },
  {
    id: "razer-blade-15",
    name: "Razer Blade 15 Quartz Edition",
    brand: "Razer",
    price: 1999,
    rating: 4.7,
    reviews: 55,
    inStock: true,
    stockCount: 4,
    image: "https://product.hstatic.net/200000722513/product/razer_blade_15_base_edition_749e7b233a7e4492bfdf2a2ee7b2c0cb_grande.png",
    accentColor: "rgb(34, 197, 94)",
    specs: {
      cpu: "Intel Core i7-13800H (14 Cores, up to 5.2GHz)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR5 5200MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "15.6\" QHD (2560x1440) IPS 240Hz, G-SYNC",
      battery: "80Whr",
      weight: "2.01 kg"
    },
    description: "Classic power in a compact design. Features the iconic premium aluminum thin chassis and high refresh rates."
  },
  {
    id: "razer-blade-14-legacy",
    name: "Razer Blade 14 Slim",
    brand: "Razer",
    price: 1799,
    rating: 4.6,
    reviews: 104,
    inStock: false,
    stockCount: 0,
    image: "https://product.hstatic.net/200000722513/product/razer_blade_14_rtx_4060_ac7bdfb774b74bc481ccff4eb75e46cb_grande.png",
    accentColor: "rgb(34, 197, 94)",
    specs: {
      cpu: "AMD Ryzen 7 7735HS (8 Cores, up to 4.75GHz)",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      ram: "16GB DDR5 4800MHz",
      ssd: "1TB PCIe 4.0 NVMe M.2 SSD",
      display: "14\" QHD+ (2560x1600) IPS 240Hz, AMD FreeSync Premium",
      battery: "68.1Whr",
      weight: "1.78 kg"
    },
    description: "Sleek, compact gaming. Packs an AMD processor and NVIDIA RTX 40-series graphics into an incredibly portable form factor."
  }
];
