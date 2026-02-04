export const siteData = {
  meta: {
    title: "黄雨晴的个人主页 | Full-Stack Portfolio",
    description:
      "黄雨晴的个人品牌主页，展示科技报道、Vibe Coding与数据分析项目。",
    keywords: [
    
      "Vibecoding",
      "科技报道",
      "数据分析",
      "个人主页"
    ],
    url: "https://example.com"
  },
  profile: {
    name: "黄雨晴",
    role: "Tech Writer",
    location: "Beijing, CN",
    avatar: "/placeholder.svg",
    tagline: "关注科技与人文的十字路口",
    education: "中国传媒大学 硕士 新闻学"
  },
  typewriter: ["Tech Writer", "Vibe Coder", "Data Analyst"],
  cta: {
    primary: {
      label: "View My Work",
      href: "#portfolio-vibecoding"
    },
    secondary: {
      label: "Contact Me",
      href: "#contact"
    }
  },
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "Email", href: "mailto:hello@example.com", icon: "mail" },
    { label: "Xiaohongshu", href: "https://xhslink.com/m/zV7qe4RoMU", icon: "globe" }
  ],
  navigation: {
    main: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" }
    ],
    portfolio: {
      label: "Portfolio",
      items: [
        { label: "Vibecoding", href: "#portfolio-vibecoding" },
        { label: "Data Analysis", href: "#portfolio-data" },
        { label: "Tech Reporting", href: "#portfolio-reporting" }
      ]
    }
  },
  about: {
    title: "黄雨晴简历-2026",
    subtitle: "追踪报道国内外AI领域前沿进展，具备图文、视频、直播全媒体内容产出经验",
    description:
      "我是一名科技内容创作者，关注国内外AI和具身智能领域前沿进展，曾产出多篇公众号10w+爆款文章，具备图文、视频、直播等全媒体内容产出经验；持续积累科技领域产业资源，独立完成选题策划、采访及深度报道。",
    skills: [
      "Trae",
      "扣子",
      "FinalCutPro",
      "AE",
      "PR",
      "Tableau",
      "Flourish",
      "AI Prompting",
      "CET-6"
    ],
    resumeUrl: "/resume.pdf"
  },
  experience: [
    {
      company: "Creative Lab",
      role: "Full-Stack Intern",
      period: "2024.06 - 2024.12",
      location: "Shanghai",
      logo: "/placeholder.svg",
      highlights: [
        "构建 AI 驱动的互动展示页，提升活动转化率 25%",
        "设计数据流水线与可视化模板，缩短分析交付 40%",
        "与设计团队共创 Vibecoding 体验原型，快速迭代上线"
      ]
    },
    {
      company: "Insight Studio",
      role: "Data Analyst",
      period: "2023.03 - 2024.05",
      location: "Remote",
      logo: "/placeholder.svg",
      highlights: [
        "主导行业洞察报告输出，覆盖 6 个重点赛道",
        "搭建 KPI 仪表盘与报告模板，实现周更交付",
        "优化数据采集流程，减少重复处理 30%"
      ]
    }
  ],
  portfolio: {
    vibecoding: [
      {
        title: "Neon City Live",
        description: "多模态 AI 互动城市景观，强调实时视觉反馈",
        media: "/placeholder.svg",
        stack: ["Next.js", "WebGL", "AI"],
        demo: "https://demo.example.com",
        source: "https://github.com/"
      },
      {
        title: "Sonic Bloom",
        description: "音乐驱动的动态生成艺术装置",
        media: "/placeholder.svg",
        stack: ["Framer Motion", "Canvas", "Audio API"],
        demo: "https://demo.example.com",
        source: "https://github.com/"
      },
      {
        title: "Prompt Playground",
        description: "交互式提示词实验室与可视化结果对比",
        media: "/placeholder.svg",
        stack: ["Next.js", "OpenAI", "Tailwind CSS"],
        demo: "https://demo.example.com",
        source: "https://github.com/"
      }
    ],
    dataAnalysis: [
      {
        title: "新能源市场趋势分析",
        insight: "新能源车型在高线城市渗透率首次突破 40%。",
        thumbnail: "/placeholder.svg",
        link: "https://github.com/"
      },
      {
        title: "内容生态增长模型",
        insight: "用户留存提升与长内容消费强相关。",
        thumbnail: "/placeholder.svg",
        link: "https://github.com/"
      }
    ],
    techReporting: [
      {
        title: "大模型落地的真实挑战",
        platform: "36Kr",
        date: "2024-03-12",
        cover: "/placeholder.svg",
        summary:
          "从场景拆解、数据治理到组织协作，拆解 AI 项目落地的关键阻碍。",
        link: "https://example.com"
      },
      {
        title: "Vibecoding 如何塑造未来交互",
        platform: "少数派",
        date: "2024-02-05",
        cover: "/placeholder.svg",
        summary:
          "视觉与交互的融合正在改变内容体验，创意编程成为新表达方式。",
        link: "https://example.com"
      }
    ]
  },
  contact: {
    headline: "一起打造有趣的故事与产品",
    description: "欢迎合作、面试与媒体交流，期待与你建立联系。",
    email: "hello@example.com"
  },
  footer: {
    copyright: "© 2026 黄雨晴",
    stack: "Built with Next.js & Tailwind CSS"
  }
}
