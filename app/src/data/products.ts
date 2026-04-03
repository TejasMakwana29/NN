export interface ProductCapacity {
  weight: string;
  image?: string; 
}

export interface Product {
  id: string;
  name: string;
  baseCapacity?: string; 
  capacities: ProductCapacity[]; 
  precision: string;
  image: string; 
  description?: string; // ADDED DESCRIPTION FIELD
  bodyMaterial?: string;
  displayType?: string;
  warranty?: string;
  battery?: string;
  panSize?: string;
  brand?: string;
  color?: string;
  weighingOption?: string;
  keyPoints?: string;
  panMaterial?: string;
  onOff?: string;
  glass?: string;
  adjustable?: string;
  hook?: string;
  designType?: string;
  features?: string[];
  category?: string;
  categorySlug?: string;
  subcategory?: string;
  type?: string;
  typeSlug?: string;
  size?: string;
  sizeSlug?: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: Product[];
}

export interface ProductSize {
  name: string;
  slug: string;
  products: Product[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  products?: Product[];
  sizes?: ProductSize[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  products?: Product[];
  subcategories?: Subcategory[];
  types?: ProductType[];
}

export const categories: Category[] = [
  {
    id: 'counter-scales',
    name: 'Counter Scales',
    slug: 'counter',
    description: 'Available in Emboss, Plain, and Super Body options.',
    image: '/images/counter-scale.jpg',
    types: [
      {
        id: 'cs-emboss',
        name: 'Emboss Body',
        slug: 'emboss',
        description: 'Medium weight steel body, oblong (bowl) & tray options.',
        products: [
          {
            id: 'cs-emb',
            name: 'Emboss Body Counter Scale',
            description: 'We offer premium quality emboss body counter scales. It is available in different weighing options like oblong, tray, both-side oblong, or both-side tray. Operations can be easily performed with low maintenance, making them an ultimate and reliable choice for weighing in the market. Having a low body weight, it can easily be moved from one place to another.\n\nIt can be used for various applications such as grocery, fruits & vegetables, poultry, etc.',
            capacities: [
              { weight: '1 kg', image: '/images/counter-emboss-1.jpg' },
              { weight: '2 kg', image: '/images/counter-emboss-2.jpg' },
              { weight: '5 kg', image: '/images/counter-emboss-5.jpg' },
              { weight: '10 kg', image: '/images/counter-emboss-10.jpg' },
              { weight: '15 kg', image: '/images/counter-emboss-15.jpg' }
            ],
            baseCapacity: '1 kg - 15 kg',
            precision: 'N/A',
            image: '/images/counter-emboss-1.jpg',
            bodyMaterial: 'Steel (Medium weight body)',
            color: 'Available in different colors',
            weighingOption: 'Oblong (bowl) & Tray'
          }
        ]
      },
      {
        id: 'cs-plain',
        name: 'Plain Body',
        slug: 'plain',
        description: 'Heavy weight M.S. body, oblong (bowl) & tray options.',
        products: [
          {
            id: 'cs-pln',
            name: 'Plain Body Counter Scale',
            description: 'Plain Body counter scales are heavy body scales making them highly durable and performance-effective. Designed specifically to weigh heavy objects. It is available in different weighing options like oblong, tray, both-side oblong, or both-side tray. Operations can be easily performed with low maintenance, making them an ultimate and reliable choice in the market.\n\nIt can be used for various applications such as agriculture, hardware, shopping malls, etc.',
            capacities: [
              { weight: '10 kg', image: '/images/counter-plain-10.jpg' },
              { weight: '15 kg', image: '/images/counter-plain-15.jpg' },
              { weight: '25 kg', image: '/images/counter-plain-25.jpg' }
            ],
            baseCapacity: '10 kg - 25 kg',
            precision: 'N/A',
            image: '/images/counter-plain-10.jpg',
            bodyMaterial: 'M.S. (Heavy weight body)',
            color: 'Available in different colors',
            weighingOption: 'Oblong (bowl) & Tray'
          }
        ]
      },
      {
        id: 'cs-super',
        name: 'Super Body',
        slug: 'super',
        description: 'Light weight stainless steel body.',
        products: [
          {
            id: 'cs-sup',
            name: 'Super Body Counter Scale',
            description: 'Super Body or closed body are premium quality weighing scales offering top accuracy. Made of stainless steel, featuring a lightweight and unique design. It is very portable and can be used for daily applications. Available in oblong or tray options for weighing products.\n\nIt can be used for various applications such as grocery, fruits & vegetables, dry fruits, etc.',
            capacities: [
              { weight: '1 kg', image: '/images/counter-super-1.jpg' },
              { weight: '2 kg', image: '/images/counter-super-2.jpg' },
              { weight: '5 kg', image: '/images/counter-super-5.jpg' },
              { weight: '10 kg', image: '/images/counter-super-10.jpg' }
            ],
            baseCapacity: '1 kg - 10 kg',
            precision: 'N/A',
            image: '/images/counter-super-1.jpg',
            bodyMaterial: 'Stainless steel (Light weight body)',
            color: 'Available in different colors',
            weighingOption: 'Oblong (bowl) & Tray'
          }
        ]
      }
    ]
  },
  {
    id: 'electronic-scales',
    name: 'Electronic Scales',
    slug: 'electronic',
    description: 'Modern digital scales for various applications.',
    image: '/images/electronic-scale.jpg',
    types: [
      {
        id: 'es-micro',
        name: 'Micro',
        slug: 'micro',
        description: 'Compact micro precision scales',
        products: [
          {
            id: 'em-100',
            name: 'Micro Scale',
            description: 'The Micro Scale, having a capacity of 10 kg, is designed for everyday use with high accuracy. It can be applied at grocery shops, dairies, bakeries, kitchens, sweet and farsan stores, etc.\n\nIt has a stainless steel platform for weighing products and a dual LED display that is visible on both sides for the owner and customer. It runs on a 4V battery having 3 days of backup and can be recharged by a 220V electric power supply. It also features user-friendly functions like tare (zero setting), adjustable legs, and is light in weight.',
            capacities: [{ weight: '10 kg' }],
            baseCapacity: '10 kg',
            precision: '1 gm',
            image: '/images/micro-scale.jpg',
            bodyMaterial: 'Stainless Steel',
            panSize: 'Stainless Steel (6x7 inches)',
            battery: 'Rechargeable 4V battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '6 months (t&c apply)',
            features: ['Compact in size']
          }
        ]
      },
      {
        id: 'es-tabletop',
        name: 'Table Top',
        slug: 'tabletop',
        description: 'Table top digital scales',
        products: [
          {
            id: 'ett-30',
            name: 'Table Top Scale',
            description: 'It is the most commonly used model in electronic weighing scales, ideal for almost every type of business. It is used in kitchens, industrial units for packing, grocery stores, dairies, supermarkets, vegetables and fruits, meat & poultry, laboratories, dry fruit shops, etc.\n\nIt has a heavy-duty body with a stainless steel platform. It also features a dual LED display at the front and back. It operates on a 4V long-lasting battery, which is also rechargeable. It contains a zero tare function and other modes.',
            capacities: [{ weight: '30 kg' }],
            baseCapacity: '30 kg',
            precision: '5 gm',
            image: '/images/tabletop-30kg.jpg',
            bodyMaterial: 'Steel',
            panSize: 'Stainless Steel (250x300 mm)',
            battery: 'Rechargeable 4V battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '1 year (t&c apply)',
            keyPoints: 'Pole Display'
          }
        ]
      },
      {
        id: 'es-poultry',
        name: 'Chicken(Poultry) Scale',
        slug: 'poultry',
        description: 'Scales for poultry applications',
        products: [
          {
            id: 'ep-multi',
            name: 'Chicken(Poultry) Scale',
            description: 'The Chicken Scale, also known as the Poultry Scale, is designed for day-to-day use. It has a strong and durable body with a chequered (MS) pan or stainless steel pan as per customer requirements. It has a dual LED display at the front & back, powered by a 6V long-lasting rechargeable battery.\n\nHighly precise, it can be used for commercial as well as industrial purposes. The scale can also be modified with border grills that provide support to the product to be measured. It also consists of a side handle for easy carrying and moving from one place to another.',
            capacities: [
              { weight: '50 kg' },
              { weight: '100 kg' },
              { weight: '150 kg' },
              { weight: '200 kg' }
            ],
            baseCapacity: '50 kg - 200 kg',
            precision: '10 gm to 50 gm',
            image: '/images/poultry-50kg.jpg',
            bodyMaterial: 'M.S.',
            panMaterial: 'Chequered (MS) or Stainless Steel',
            panSize: '300x300 mm to 500x500 mm (depends on Capacity)',
            battery: 'Rechargeable 6V battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '1 year (t&c apply)',
            keyPoints: 'Grill for support'
          }
        ]
      },
      {
        id: 'es-platform',
        name: 'Platform',
        slug: 'platform',
        description: 'Heavy duty platform scales',
        products: [
          {
            id: 'epl-multi',
            name: 'Platform Scale',
            description: 'Platform scales are heavy-duty scales used for industrial purposes to weigh heavy and large components. Made up of a high-quality MS frame body and superior pan material (MS chequered or Stainless steel), it features a highly precise sensor for perfect readings. It also consists of a support grill and a display unit.\n\nA 6V battery acts as its power source, which can be recharged whenever required. A separate display unit can also be installed for taking readings from different locations. Adjustable legs align the scale in a straight position even on irregular surfaces. These platform scales can be used in small and large industries, agriculture, etc.',
            capacities: [
              { weight: '50 kg' },
              { weight: '100 kg' },
              { weight: '200 kg' },
              { weight: '300 kg' },
              { weight: '500 kg' },
              { weight: '1 Ton' },
              { weight: '2 Ton' }
            ],
            baseCapacity: '50 kg - 2 Ton',
            precision: '10 gm to 200 gm',
            image: '/images/platform-100kg.jpg',
            bodyMaterial: 'M.S.',
            panMaterial: 'Chequered (MS) or Stainless Steel',
            panSize: '400x400 mm to 900x900 mm (depends on Capacity)',
            battery: 'Rechargeable 6V battery (up to 48 hrs backup)',
            displayType: 'LED dual display (Front & Back) in Green or Red color',
            warranty: '1 year (t&c apply)',
            keyPoints: 'Grill for support, extra extended display'
          }
        ]
      },
      {
        id: 'es-jewellery',
        name: 'Jewellery',
        slug: 'jewellery',
        description: 'High precision scales for jewelry',
        products: [
          {
            id: 'ej-510',
            name: 'Jewellery Scale',
            description: 'Manish Scale develops the best precision jewellery scales built for professionals who rely on exact measurements every time. Specially made and designed for jewellers, lab technicians, and gemstone experts, this scale delivers dependable accuracy with every use.\n\nIt is perfectly engineered with a dust-resistant enclosure so that surrounding air or drafts cannot affect the measurement. It also features a dual display and different functional modes. From delicate gold ornaments to fine laboratory measurements, this smart and professional digital scale ensures high-level accuracy, backed by the reliability and trust of Manish Scale.',
            capacities: [{ weight: '510 gm' }],
            baseCapacity: '510 gm',
            precision: '10 mg (0.01 gm)',
            image: '/images/jewelry-100g.jpg',
            panSize: 'Round Stainless Steel, 110 mm',
            displayType: 'LED dual display',
            warranty: '1 year (t&c apply)'
          }
        ]
      },
      {
        id: 'es-kitchen',
        name: 'Kitchen',
        slug: 'kitchen',
        description: 'Compact kitchen scales',
        products: [
          {
            id: 'ek-10',
            name: 'Kitchen Scale',
            description: 'The Kitchen Scale is a commercial scale with a 10 kg capacity and a digital display at the front. It is specially used in households to measure spices, grains, cooking ingredients, imitation & craft materials, etc. It consists of a precise sensor that enables accurate and steady readings.\n\nIt is very light in weight and compact in design so that it can be easily carried and moved from one place to another. It operates on AA batteries and is highly user-friendly.',
            capacities: [{ weight: '10 kg' }],
            baseCapacity: '10 kg',
            precision: '1 gm',
            image: '/images/kitchen-10kg.jpg',
            bodyMaterial: 'Plastic (ABS)',
            displayType: 'LED display',
            battery: '2x AA battery',
            warranty: '6 months'
          }
        ]
      },
      {
        id: 'es-personal',
        name: 'Personal (Body)',
        slug: 'personal',
        description: 'Personal body weight scales',
        products: [
          {
            id: 'eb-180',
            name: 'Personal Body Scale',
            description: 'A personal scale, commonly known as a bathroom scale or body scale, is a device used to measure body weight and monitor overall health at home. It plays an important role in tracking fitness progress and managing weight effectively.\n\nAt Manish Scale, we supply the best quality personal scales, ensuring high body strength and precise readings. These scales feature a digital display and use high-precision sensors to calculate weight. They operate on AAA batteries and have an auto on & off feature that saves battery power.',
            capacities: [{ weight: '180 kg' }],
            baseCapacity: '180 kg',
            precision: '50 gm',
            image: '/images/bathroom-180kg.jpg',
            displayType: 'LED display',
            battery: '2x AAA battery',
            warranty: '3 years',
            onOff: 'Auto (step on & step off)',
            glass: 'Strong Reinforced glass body, Scratch resistance'
          }
        ]
      },
      {
        id: 'es-luggage',
        name: 'Luggage',
        slug: 'luggage',
        description: 'Portable scales for luggage',
        products: [
          {
            id: 'el-50',
            name: 'Luggage Scale',
            description: 'A luggage scale is a small, easy-to-carry device designed to check the weight of your bags before you travel. It helps avoid unexpected overweight charges at the airport by giving you an accurate reading in advance. It can also be used to weigh paper or cardboard scrap.\n\nMost luggage scales are digital and user-friendly, allowing you to simply lift your suitcase using the scale to measure its weight. They typically support weights up to 50 kg and provide quick, precise results, making them a convenient travel essential.',
            capacities: [{ weight: '50 kg' }],
            baseCapacity: '50 kg',
            precision: '10 gm',
            image: '/images/luggage-scale.jpg',
            bodyMaterial: 'ABS',
            displayType: 'LED display (green color)',
            battery: '2x AA battery'
          }
        ]
      }
    ]
  },
  {
    id: 'hanging-scales',
    name: 'Hanging Scales',
    slug: 'hanging',
    description: 'Spring balance and digital hanging scales',
    image: '/images/hanging-scale.jpg',
    types: [
      {
        id: 'hs-circular',
        name: 'Circular',
        slug: 'circular',
        description: 'Classic circular dial hanging scales',
        products: [
          {
            id: 'hc-25',
            name: 'Circular Scale 25kg',
            description: 'At Manish Scale, we manufacture best-in-class circular hanging spring balances—a perfect blend of precision engineering, durability, and reliable performance. Designed to meet the highest standards, our scales deliver consistent accuracy and ensure complete customer satisfaction.\n\nBuilt with a high-strength aluminum body and a crystal-clear fiber-glass display, our scale is designed to withstand tough working conditions while maintaining flawless readability. The reinforced heavy-duty hooks ensure superior strength and reliability, even under continuous use.\n\nCrafted with an attractive design and backed by our registered trademark, these scales are available under our trusted brands Paras and Shubham.\n\nWidely used across industries such as agriculture, metal processing, pharmaceuticals, laboratories, and hospitals, our circular hanging scales are known for their versatility, strength, and dependable performance. It also features a zero adjustable knob to easily reset the scale.',
            capacities: [{ weight: '25 kg' }],
            baseCapacity: '25 kg',
            precision: '100 gm',
            image: '/images/hanging-circular-25kg.jpg',
            brand: 'Paras',
            bodyMaterial: 'Aluminium',
            displayType: 'Strong Fiber glass display',
            warranty: '1 year',
            adjustable: 'Yes (Zero adjust knob)',
            hook: 'High strength hook at top & bottom',
            features: [
              'Attractive design & look', 
              'Registered Trademark'
            ]
          },
          {
            id: 'hc-100',
            name: 'Circular Scale 100kg',
            description: 'At Manish Scale, we manufacture best-in-class circular hanging spring balances—a perfect blend of precision engineering, durability, and reliable performance. Designed to meet the highest standards, our scales deliver consistent accuracy and ensure complete customer satisfaction.\n\nBuilt with a high-strength aluminum body and a crystal-clear fiber-glass display, our scale is designed to withstand tough working conditions while maintaining flawless readability. The reinforced heavy-duty hooks ensure superior strength and reliability, even under continuous use.\n\nCrafted with an attractive design and backed by our registered trademark, these scales are available under our trusted brands Paras and Shubham.\n\nWidely used across industries such as agriculture, metal processing, pharmaceuticals, laboratories, and hospitals, our circular hanging scales are known for their versatility, strength, and dependable performance. It also features a zero adjustable knob to easily reset the scale.',
            capacities: [{ weight: '100 kg' }],
            baseCapacity: '100 kg',
            precision: '500 gm',
            image: '/images/hanging-circular-100kg.jpg',
            brand: 'Paras, Shubham, Ajanta',
            bodyMaterial: 'Aluminium',
            displayType: 'Strong Fiber glass display',
            warranty: '1 year',
            adjustable: 'Yes (Zero adjust knob)',
            hook: 'High strength hook at top & bottom',
            features: [
              'Attractive design & look', 
              'Registered Trademark'
            ]
          },
          {
            id: 'hc-200',
            name: 'Circular Scale 200kg',
            description: 'At Manish Scale, we manufacture best-in-class circular hanging spring balances—a perfect blend of precision engineering, durability, and reliable performance. Designed to meet the highest standards, our scales deliver consistent accuracy and ensure complete customer satisfaction.\n\nBuilt with a high-strength aluminum body and a crystal-clear fiber-glass display, our scale is designed to withstand tough working conditions while maintaining flawless readability. The reinforced heavy-duty hooks ensure superior strength and reliability, even under continuous use.\n\nCrafted with an attractive design and backed by our registered trademark, these scales are available under our trusted brands Paras and Shubham.\n\nWidely used across industries such as agriculture, metal processing, pharmaceuticals, laboratories, and hospitals, our circular hanging scales are known for their versatility, strength, and dependable performance. It also features a zero adjustable knob to easily reset the scale.',
            capacities: [{ weight: '200 kg' }],
            baseCapacity: '200 kg',
            precision: '1 kg',
            image: '/images/hanging-circular-200kg.jpg',
            brand: 'Paras, Shubham, Ajanta',
            bodyMaterial: 'Aluminium',
            displayType: 'Strong Fiber glass display',
            warranty: '1 year (t&c apply)',
            adjustable: 'Yes (Zero adjust knob)',
            hook: 'High strength hook at top & bottom',
            features: [
              'Attractive design & look', 
              'Registered Trademark'
            ]
          }
        ]
      },
      {
        id: 'hs-pocket',
        name: 'Pocket',
        slug: 'pocket',
        description: 'Compact pocket-sized hanging scales',
        products: [
          {
            id: 'hp-100',
            name: 'Pocket Scale',
            description: 'The Pocket Spring Balance is a compact yet powerful mechanical weighing solution, designed for convenience and durability. With a 100 kg capacity, this handy device is ideal for on-the-go weighing across a variety of applications.\n\nConstructed from high-quality steel, it features a double spring mechanism that enhances strength, stability, and long-term reliability. The heavy-duty hooks ensure secure handling of loads, while its precise measurement system delivers consistent and accurate results every time.\n\nAvailable under our trusted brands Paras and Fish Brand, this scale is widely used for weighing fish and meat, agricultural produce, cotton, and materials in metal and gas industries.\n\nCompact in size, strong in performance — the perfect portable weighing partner.',
            capacities: [{ weight: '100 kg' }],
            baseCapacity: '100 kg',
            precision: '500 gm',
            image: '/images/hanging-pocket-100kg.jpg',
            brand: 'Paras, Fish',
            bodyMaterial: 'Steel',
            adjustable: 'No',
            hook: 'High strength hook at top & bottom'
          }
        ]
      },
      {
        id: 'hs-tubular',
        name: 'Tubular',
        slug: 'tubular',
        description: 'Tubular hanging scales',
        products: [
          {
            id: 'ht-multi',
            name: 'Tubular Scale',
            description: 'Meet the Tubular Spring Balance by Manish Scale—where precision meets power in a sleek, lightweight design. Built for professionals who demand reliability, this mechanical hanging scale is available in 50 kg and 100 kg capacities, making it the perfect choice for a wide range of industrial and commercial applications.\n\nCrafted with a robust stainless steel tube body and powered by a high-grade precision spring, it delivers accurate, consistent readings even in tough working conditions. The heavy-duty hooks provide maximum load security, while the zero-adjustment knob ensures perfect calibration at all times.\n\nDesigned for performance and versatility, it is widely trusted across agriculture, fruits & vegetables, chemical and pharmaceutical sectors, as well as paper, cardboard, and metal scrap industries.\n\nOffered under our premium brand Paras, this scale is not just a tool—it’s a symbol of strength, accuracy, and trust.\n\nTubular Spring Balance — Lightweight in hand, heavyweight in performance. 💼✨',
            capacities: [
              { weight: '50 kg' }, 
              { weight: '100 kg' }
            ],
            baseCapacity: '50 kg & 100 kg',
            precision: '50 gm',
            image: '/images/hanging-tubular-50kg.jpg',
            brand: 'Paras',
            bodyMaterial: 'Steel',
            adjustable: 'Yes (zero adjust knob)',
            hook: 'High strength hook at top & bottom'
          }
        ]
      },
      {
        id: 'hs-crane',
        name: 'Crane',
        slug: 'crane',
        description: 'Heavy duty crane scales',
        products: [
          {
            id: 'hcr-multi',
            name: 'Crane Scale',
            description: '**PARAS 3, 5 & 10 TON DIGITAL CRANE SCALE**\n\nWhen your operations demand **uncompromising strength and absolute accuracy**, trust the power of **Paras by Manish Scale**. Built for the toughest industrial environments, our **Digital Crane Scale** delivers flawless performance even under extreme load conditions.\n\nCrafted with a **rugged metal body** and **reinforced heavy-duty hooks**, this scale is designed to endure the harshest working conditions. The **high-brightness LED display** ensures clear visibility even from a distance, making operations smoother and faster.\n\nThe advanced **Hold Mode** locks the exact weight during movement—eliminating guesswork in unstable lifting conditions. With a **wireless remote control**, you can operate safely from a distance, increasing both efficiency and workplace safety. Powered by **6V rechargeable batteries**, it guarantees long-lasting performance for uninterrupted industrial usage.\n\nWith impressive **3, 5 & 10 Ton capacities** and **1 kg precision**, it ensures every lift is measured with confidence—whether in Steel & Iron industries, Construction sites, Scrap Industries, high-volume warehouses & Logistics, Manufacturing & Fabrication, or Heavy Engineering.\n\nBacked by the legacy of **Manish Scale**, Paras stands as a symbol of **industrial reliability, durability, and performance trusted worldwide**.\n\n**PARAS - Power That Lifts. Precision That Leads.**',
            capacities: [
              { weight: '3 Ton' }, 
              { weight: '5 Ton' }, 
              { weight: '10 Ton' }
            ],
            baseCapacity: '3 Ton - 10 Ton',
            precision: '1 kg',
            image: '/images/hanging-crane.jpg', 
            brand: 'Paras',
            displayType: 'LED Bright & Big display',
            battery: '6V Rechargeable battery (up to 72 hrs backup)',
            warranty: '1 year (t&c apply)',
            hook: 'High strength hook at top & bottom'
          }
        ]
      },
      {
        id: 'hs-digital',
        name: 'Digital',
        slug: 'digital',
        description: 'Digital hanging scales',
        products: [
          {
            id: 'hd-multi',
            name: 'Digital Hanging Scale',
            description: 'Experience the perfect blend of **power, precision, and premium design** with the **Digital Hanging Scale by Manish Scale – Paras Brand**. Engineered for professionals who demand accuracy and durability, this scale is built to perform flawlessly across industries.\n\nCrafted with a **strong aluminum body**, it offers excellent durability while remaining lightweight and easy to handle. At its core lies a **best-in-class high-precision sensor**, ensuring **accurate and consistent weight measurements** every time. The addition of **high-strength heavy-duty hooks** enhances safety and reliability, making it ideal for handling demanding loads with confidence.\n\nDesigned to impress, this scale combines an **attractive modern look** with the **trusted quality of Manish Scale**, a name that customers rely on worldwide. Equipped with **tare function and multiple weighing modes**, it provides flexibility to suit different operational needs with ease.\n\nFrom **agriculture and metal industries** to **automobile, pharmaceutical, chemical, and textile sectors**, this versatile digital hanging scale adapts seamlessly to a wide range of applications.\n\n**Paras Digital Hanging Scale — Strong. Accurate. Trusted Worldwide.**',
            capacities: [
              { weight: '100 kg' }, 
              { weight: '200 kg' }
            ],
            baseCapacity: '100 kg & 200 kg',
            precision: '500 gm, 1 kg',
            image: '/images/hanging-digital.jpg',
            brand: 'Paras, Shubham',
            bodyMaterial: 'Aluminium',
            displayType: 'LED dual display',
            battery: 'Rechargeable 6V battery',
            warranty: '1 year (t&c apply)',
            hook: 'High strength hook at top & bottom'
          }
        ]
      }
    ]
  },
  {
    id: 'beam-scales',
    name: 'Beam Scales',
    slug: 'beam',
    description: 'Traditional mechanical precision scales',
    image: '/images/beam-scale.jpg',
    types: [
      {
        id: 'beam-class-c',
        name: 'Class C',
        slug: 'class-c',
        description: 'Versatile scales for various applications',
        products: [
          {
            id: 'bc-multi',
            name: 'Class C Beam Scale',
            description: 'Manish Scale is one of the first and earliest companies to manufacture beam scales.\n\nBeam scales are the first type of scales to be developed. It is a classic mechanical weighing instrument that determines mass by balancing an unknown object against standard weights on a pivoted, horizontal lever. It offers high precision and can be used for laboratory, industrial, agricultural, and almost every field to measure weight.',
            capacities: [
              { weight: '100 gm' }, { weight: '200 gm' }, { weight: '500 gm' },
              { weight: '1 kg' }, { weight: '2 kg' }, { weight: '5 kg' },
              { weight: '10 kg' }, { weight: '20 kg' }, { weight: '50 kg' },
              { weight: '100 kg' }, { weight: '200 kg' }, { weight: '300 kg' },
              { weight: '500 kg' }, { weight: '1 Ton' }
            ],
            baseCapacity: '100 gm - 1 Ton',
            precision: 'N/A',
            image: '/images/beam-scale.jpg',
            bodyMaterial: 'M.S.',
            designType: 'Swan type, 3 Axle type'
          }
        ]
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Weights, hooks, and load cells',
    image: '/images/accessories.jpg',
    types: [
      {
        id: 'acc-cast-iron-knob',
        name: 'Cast iron weights (Knob type)',
        slug: 'knob-weights',
        description: 'Brass plated, Knob type',
        products: [
          {
            id: 'acc-cik',
            name: 'Knob Type Cast Iron Weights',
            description: 'High precision calibration weights built for professional standard accuracy.',
            capacities: [
              { weight: '5 gm' }, { weight: '10 gm' }, { weight: '20 gm' },
              { weight: '50 gm' }, { weight: '100 gm' }, { weight: '200 gm' },
              { weight: '500 gm' }, { weight: '1 kg' }, { weight: '2 kg' }
            ],
            baseCapacity: '5 gm - 2 kg',
            precision: 'N/A',
            image: '/images/weights-knob.jpg', 
            designType: 'Cylindrical shape (knob type)',
            features: [
              'Set: 9 pcs. in one set', 
              'More precise & accurate'
            ]
          }
        ]
      },
      {
        id: 'acc-cast-iron-hex',
        name: 'Cast iron weights (Hexagonal)',
        slug: 'hex-weights',
        description: 'Hexagonal type',
        products: [
          {
            id: 'acc-cih',
            name: 'Hexagonal Cast Iron Weights',
            description: 'Heavy duty hexagonal cast iron weights for rugged calibration and testing purposes.',
            capacities: [
              { weight: '20 gm' }, { weight: '50 gm' }, { weight: '100 gm' },
              { weight: '200 gm' }, { weight: '500 gm' }, { weight: '1 kg' },
              { weight: '2 kg' }, { weight: '5 kg' }, { weight: '10 kg' },
              { weight: '20 kg' }, { weight: '50 kg' }, { weight: '100 kg' }
            ],
            baseCapacity: '20 gm - 100 kg',
            precision: 'N/A',
            image: '/images/weights-hex.jpg',
            designType: 'Hexagonal shape'
          }
        ]
      },
      {
        id: 'acc-load-cells',
        name: 'Load Cells',
        slug: 'load-cells',
        description: 'Platform and Table top load cells',
        products: [
          {
            id: 'acc-lc-platform',
            name: 'Platform Load Cell',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/load-cell.jpg'
          },
          {
            id: 'acc-lc-tabletop',
            name: 'Table Top Load Cell',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/load-cell-tt.jpg'
          }
        ]
      },
      {
        id: 'acc-hooks',
        name: 'Hooks',
        slug: 'hooks',
        description: 'Hooks for various scales',
        products: [
          {
            id: 'acc-hook-mech',
            name: 'Mechanical Hanging Scale Hook',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/hook-mech.jpg'
          },
          {
            id: 'acc-hook-digital',
            name: 'Digital Hanging Scale Hook',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/hook-digital.jpg'
          },
          {
            id: 'acc-hook-crane',
            name: 'Crane Scale Hook',
            capacities: [{ weight: 'N/A' }],
            precision: 'N/A',
            image: '/images/hook-crane.jpg'
          }
        ]
      }
    ]
  }
];

export function getAllProducts(): Product[] {
  const allProducts: Product[] = [];
  
  categories.forEach(category => {
    if (category.products) {
      category.products.forEach(product => {
        allProducts.push({ ...product, category: category.name, categorySlug: category.slug });
      });
    }
    
    if (category.subcategories) {
      category.subcategories.forEach(sub => {
        if (sub.products) {
          sub.products.forEach(product => {
            allProducts.push({ ...product, category: category.name, categorySlug: category.slug, subcategory: sub.name });
          });
        }
        if (sub.sizes) {
          sub.sizes.forEach(size => {
            size.products.forEach(product => {
              allProducts.push({ ...product, category: category.name, categorySlug: category.slug, subcategory: sub.name, size: size.name });
            });
          });
        }
      });
    }
    
    if (category.types) {
      category.types.forEach(type => {
        if (type.products) {
          type.products.forEach(product => {
            allProducts.push({ ...product, category: category.name, categorySlug: category.slug, type: type.name });
          });
        }
      });
    }
  });
  
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  const category = categories.find(cat => cat.slug === slug);
  if (!category) return [];
  
  const products: Product[] = [];
  
  if (category.products) {
    products.push(...category.products.map(p => ({ ...p, category: category.name })));
  }
  
  if (category.subcategories) {
    category.subcategories.forEach(sub => {
      if (sub.products) {
        products.push(...sub.products.map(p => ({ ...p, category: category.name, subcategory: sub.name })));
      }
      if (sub.sizes) {
        sub.sizes.forEach(size => {
          products.push(...size.products.map(p => ({ ...p, category: category.name, subcategory: sub.name, size: size.name })));
        });
      }
    });
  }
  
  if (category.types) {
    category.types.forEach(type => {
      if (type.products) {
        products.push(...type.products.map(p => ({ ...p, category: category.name, type: type.name })));
      }
    });
  }
  
  return products;
}

export function getProductsByType(categorySlug: string, typeSlug: string): Product[] {
  const category = categories.find(cat => cat.slug === categorySlug);
  if (!category || !category.types) return [];
  
  const type = category.types.find(t => t.slug === typeSlug);
  return type?.products?.map(p => ({ ...p, category: category.name, type: type.name })) || [];
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return getAllProducts().filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    (product.baseCapacity && product.baseCapacity.toLowerCase().includes(searchTerm)) ||
    product.category?.toLowerCase().includes(searchTerm)
  );
}