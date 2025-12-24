/**
 * AI 助记口诀生成器
 * 为每道题目提供量身定制的专属记忆口诀
 * 
 * 更新说明：
 * - 从关键词匹配模式升级为题目ID精准映射
 * - 每题一诀，精准度和针对性大幅提升
 * - 保留旧系统作为备用（如果新题目没有专属口诀）
 */

import type { Question } from '../types';
import { getDedicatedMnemonic } from './dedicated_mnemonics';

/**
 * 助记规则配置
 * 每条规则包含：匹配关键词 + 对应口诀
 */
interface MnemonicRule {
  /** 匹配关键词（满足任意一个即可触发） */
  keywords: string[];
  /** 助记口诀内容 */
  mnemonic: string;
  /** 规则优先级（数字越大优先级越高，默认为 0） */
  priority?: number;
}

/**
 * 高分速记规则库
 * 按照优先级从高到低排序
 */
const MNEMONIC_RULES: MnemonicRule[] = [
  // ==================== 虚拟化基础（VMware Workstation） ====================
  {
    keywords: ['默认类型', 'NAT', '网卡'],
    mnemonic: '💡 VMware默认网卡=NAT。记忆：NATural（自然的），默认就是NAT。',
    priority: 10,
  },
  {
    keywords: ['桥接', '同等网络地位', '同级'],
    mnemonic: '💡 桥接=把虚拟机架在真实网络的"桥"上，与主机地位平等，直接获取物理网络IP。',
    priority: 10,
  },
  {
    keywords: ['LAN区段', '完全独立', '隔离'],
    mnemonic: '💡 LAN区段=孤岛模式，与其他网络完全隔离。需要手动配DHCP或静态IP。',
    priority: 10,
  },
  {
    keywords: ['ISO', '光盘镜像', 'IMG'],
    mnemonic: '💡 虚拟光驱默认格式=ISO。记忆：爱索（ISO）之吻，ISO最通用。',
    priority: 10,
  },
  {
    keywords: ['VMware Tools', '可选', '性能'],
    mnemonic: '⚠️ 大坑：VMware Tools虽"可选"但必装！显著提升图形、磁盘、网络性能。',
    priority: 15,
  },
  {
    keywords: ['快照', '克隆', '2台', '两台', '同系统'],
    mnemonic: '⚠️ 关键区别：快照=时光倒流（单机回到过去），克隆=影分身术（生成第二台独立机器）。',
    priority: 15,
  },
  {
    keywords: ['快照', '1个', '仅能', '只能'],
    mnemonic: '⚠️ 陷阱：快照数量不限！只受磁盘空间限制，可建多条快照链。',
    priority: 15,
  },
  {
    keywords: ['硬盘容量', '扩展', '新增'],
    mnemonic: '💡 虚拟机硬盘不够？可直接扩展原盘，无需新增硬盘（非物理机）。',
    priority: 10,
  },
  {
    keywords: ['操作系统', '必须精确', '选择客户机'],
    mnemonic: '💡 新建虚拟机选OS版本只是推荐配置，不影响实际安装，可以不匹配。',
    priority: 10,
  },

 // ==================== 虚拟化产品与对比 ====================
  {
    keywords: ['Docker', '容器', '虚拟机', 'GB', 'MB', '硬盘使用'],
    mnemonic: '⚠️ 反直觉陷阱：容器MB级，虚拟机GB级。容器镜像共享层，虚拟机含完整系统。',
    priority: 15,
  },
  {
    keywords: ['Docker', '启动速度', '秒级', '分钟级'],
    mnemonic: '💡 容器=秒级启动（无需引导OS），虚拟机=分钟级（需完整POST+OS引导）。',
    priority: 10,
  },
  {
    keywords: ['容器', '隔离性', '难保证', '完全隔离'],
    mnemonic: '⚠️ 常见误区：容器通过Namespace/Cgroup实现隔离，安全性足够，不是"难保证"！',
    priority: 15,
  },
  {
    keywords: ['上百个容器', '单机'],
    mnemonic: '💡 容器轻量共享内核，单机轻松跑数百个实例（虚拟机一般只能跑几十个）。',
    priority: 10,
  },
  {
    keywords: ['vSphere', 'ESXi', 'NSX', 'VSAN'],
    mnemonic: '💡 VMware产品记忆：vSphere=总套件，ESXi=虚拟化核心，NSX=网络虚拟化，VSAN=存储虚拟化。',
    priority: 10,
  },
  {
    keywords: ['Hyper-V', 'Microsoft', '微软'],
    mnemonic: '💡 微软虚拟化产品=Hyper-V（Windows Server内置角色）。',
    priority: 10,
  },

  // ==================== RAID 存储 ====================
  {
    keywords: ['RAID', '中文', '解释', '独立', '廉价'],
    mnemonic: '⚠️ 陷阱：RAID标准中文="独立磁盘冗余阵列"，不是"廉价"（早期叫法已废弃）。',
    priority: 15,
  },
  {
    keywords: ['JBOD', 'RAID', '最简单'],
    mnemonic: '⚠️ 常考陷阱：JBOD不属RAID！只是"Just a Bunch Of Disks"（简单串联），无冗余。',
    priority: 15,
  },
  {
    keywords: ['RAID0', '容错', '校验', '镜像'],
    mnemonic: '💡 RAID0=0容错+0校验+0镜像=速度最快（不管死活只管冲刺）。坏1块全完蛋！',
    priority: 10,
  },
  {
    keywords: ['RAID1', '镜像', '完全镜像'],
    mnemonic: '💡 RAID1=1面镜子（完全镜像备份），空间利用玗50%，容错能力最强。',
    priority: 10,
  },
  {
    keywords: ['RAID5', '均衡', '冗余', '校验'],
    mnemonic: '💡 RAID5=均衡教派，分布式校验，允许坏1块盘，性能与凗余兼顾。',
    priority: 10,
  },
  {
    keywords: ['RAID10', 'RAID 10', '1+0'],
    mnemonic: '💡 RAID10=先镜像(1)再条带(0)=贵族方案（性能+安全，但烧钱）。',
    priority: 10,
  },
  {
    keywords: ['RAID0', '热备', '热备份'],
    mnemonic: '⚠️ RAID0无冗余，不存在热备概念；RAID1/5/6均支持热备盘。',
    priority: 10,
  },

  // ==================== 存储网络 ====================
  {
    keywords: ['SAN', '中文', '存储区域网络', 'Storage Area Network'],
    mnemonic: '💡 SAN = Storage Area Network = 存储-区域-网络（直译记忆法）。',
    priority: 10,
  },
  {
    keywords: ['NAS', '中文', '网络附属存储'],
    mnemonic: '💡 NAS = Network Attached Storage = 网络附属存储（直译记忆）。',
    priority: 10,
  },
  {
    keywords: ['NAS', 'SAN', '写反了', '颛倒', '互换'],
    mnemonic: '🎯 无脑题：看到"写反了"/"定义颛倒"这种描述，99%选错误（B）。定义不会写反！',
    priority: 20,
  },
  {
    keywords: ['NAS', 'SAN', 'File', 'Block', '协议'],
    mnemonic: '💡 关键区别：NAS走文件级协议（NFS/CIFS），SAN走块级协议（SCSI/FC）。',
    priority: 10,
  },
  {
    keywords: ['FC-SAN', 'IP-SAN', '速度', '快慢'],
    mnemonic: '💡 常识：光纤（FC）肯定比网线（IP）快。FC-SAN > IP-SAN。',
    priority: 10,
  },
  {
    keywords: ['FC-SAN', 'IP-SAN', '传输距离', '远'],
    mnemonic: '⚠️ 反直觉：光纤信号衰减大（<10km），IP-SAN可借路由无限延伸。',
    priority: 10,
  },
  {
    keywords: ['DAS', '直连', 'Direct'],
    mnemonic: '💡 DAS = Direct Attached Storage = 直连存储（最简单，插线就用）。',
    priority: 10,
  },
  {
    keywords: ['IP-SAN', 'NAS', 'IP网络', '以太网'],
    mnemonic: '💡 IP-SAN与NAS都基于TCP/IP以太网传输，区别在于协议层次。',
    priority: 10,
  },

  // ==================== 文件共享协议 ====================
  {
    keywords: ['Samba', '协议', 'UNIX', 'Linux', 'SMB'],
    mnemonic: '⚠️ 高频陷阱：Samba是软件/服务，不是协议！SMB/CIFS才是协议。',
    priority: 15,
  },
  {
    keywords: ['SMB', 'CIFS', 'Windows'],
    mnemonic: '💡 SMB/CIFS = Windows 家族的文件共享协议（微软亲儿子）。',
    priority: 10,
  },
  {
    keywords: ['NFS', 'Network File System', 'UNIX', '新型文件系统'],
    mnemonic: '⚠️ 陷阱：NFS=Network File System（网络文件系统），不是New！UNIX/Linux世界的共享标准。',
    priority: 15,
  },
  {
    keywords: ['NFS', 'RPC', '远程过程调用'],
    mnemonic: '💡 NFS基于RPC协议，端口映射与数据操作均通过RPC完成。',
    priority: 10,
  },
  {
    keywords: ['NFS', '服务器', '客户端', '提供', '访问'],
    mnemonic: '⚠️ 角色别颛倒：NFS服务器="提供"共享，客户端="访问"共享。',
    priority: 15,
  },
  {
    keywords: ['NFS', '主动查找', '被动服务'],
    mnemonic: '💡 NFS为被动服务，等待客户端挂载请求，不主动发现客户端。',
    priority: 10,
  },
  {
    keywords: ['/etc/exports', 'NFS', '配置文件'],
    mnemonic: '💡 NFS核心配置=/etc/exports，控制哪些目录以何权限导出。',
    priority: 10,
  },
  {
    keywords: ['root_squash', 'NFS', 'root权限'],
    mnemonic: '💡 root_squash=防止客户端root获得服务端root权限，映射为nobody。',
    priority: 10,
  },
  {
    keywords: ['async', 'sync', '内存', '硬盘'],
    mnemonic: '💡 async=先写内存后刷盘（快但可能丢数据），sync=直接同步写入硬盘。',
    priority: 10,
  },
  {
    keywords: ['FTP', '优先', 'File Transfer Protocol'],
    mnemonic: '⚠️ 陷阱：FTP = File Transfer Protocol（文件传输协议），不是"优先传输"！',
    priority: 15,
  },
  {
    keywords: ['FTP', '20', '21', '端口'],
    mnemonic: '💡 FTP端口：命令21（控制）、数据20（主动模式）。被动模式服务器端口随机。',
    priority: 10,
  },
  {
    keywords: ['FTP', '主动模式', '被动模式', 'PORT', 'PASV'],
    mnemonic: '💡 FTP两种模式：主动（PORT）、被动（PASV）。跨网段/防火墙必须用被动。',
    priority: 10,
  },
  {
    keywords: ['FTP', '跨网段', '被动模式', '防火墙'],
    mnemonic: '💡 跨网段/NAT环境必须FTP被动模式（服务器决定数据端口，客户端主动连）。',
    priority: 10,
  },

  // ==================== 网络服务 ====================
  {
    keywords: ['DNS', '53', '端口'],
    mnemonic: '💡 DNS = 端口 53（谐音：我上网 = 5+3=8，DNS 让你上网）。',
    priority: 10,
  },
  {
    keywords: ['DHCP', '67', '68', '动态'],
    mnemonic: '💡 DHCP = 服务器67，客户端68（顺口溜：67分配，68接收）。',
    priority: 10,
  },
  {
    keywords: ['HTTP', '80', 'HTTPS', '443'],
    mnemonic: '💡 HTTP=80（吧唷）、HTTPS=443（死死生，安全到死）。',
    priority: 10,
  },
  {
    keywords: ['VPN', '中文', '虚拟专用网', '公共网'],
    mnemonic: '💡 VPN=虚拟专用网（Virtual Private Network），不是"公共网"。通过加密隧道在公网建私有链路。',
    priority: 10,
  },
  {
    keywords: ['NAT', '中文', '网络地址转换', '传输'],
    mnemonic: '💡 NAT=网络地址转换（Network Address Translation），不是"传输"。将私有地址与公网地址相互转换。',
    priority: 10,
  },
  {
    keywords: ['WebDAV', 'HTTP', '远程文件'],
    mnemonic: '💡 WebDAV扩展HTTP方法（PUT/DELETE/PROPFIND）实现远程文件读写。',
    priority: 10,
  },
  {
    keywords: ['Frp', '内网穿透'],
    mnemonic: '💡 Frp=内网穿透开源工具，将内网服务映射至公网，实现反向代理。',
    priority: 10,
  },
  {
    keywords: ['云计算', '公有云', '私有云', '混合云', '百度云'],
    mnemonic: '💡 云计算三大模式：公有、私有、混合。百度云/阿里云属公有云实例。',
    priority: 10,
  },
  {
    keywords: ['RDP', 'VNC', '远程桌面'],
    mnemonic: '💡 远程桌面协议/软件：RDP（Windows原生）、VNC（跨平台）、向日葵（国产）。',
    priority: 10,
  },

  // ==================== 安全加密 ====================
  {
    keywords: ['对称加密', 'AES', 'DES', '密钥'],
    mnemonic: '💡 对称加密 = 一把钥匙开一把锁（加密解密同一密钥）。代表：AES、DES。',
    priority: 10,
  },
  {
    keywords: ['非对称加密', 'RSA', '公钥', '私钥'],
    mnemonic: '💡 非对称加密 = 公钥加密，私钥解密（或反过来签名）。代表：RSA。',
    priority: 10,
  },
  {
    keywords: ['SSL', 'TLS', '证书'],
    mnemonic: '💡 SSL已过时，现在都用TLS（传输层安全）。HTTPS = HTTP + TLS。',
    priority: 10,
  },

  // ==================== Linux命令与工具 ====================
  {
    keywords: ['tasksel', 'aptitude', 'dpkg', 'apt', '软件'],
    mnemonic: '💡 Debian系软件管理：tasksel（图形界面快捷安装）、apt（命令行主工具）、dpkg（底层包管理）。',
    priority: 10,
  },
  {
    keywords: ['/etc/samba', 'smb.conf', 'Samba配置'],
    mnemonic: '💡 Samba配置路径：/etc/samba/smb.conf（主配置文件）。',
    priority: 10,
  },
  {
    keywords: ['/var/log/samba', 'smbd.log', 'nmbd.log'],
    mnemonic: '💡 Samba日志位置：/var/log/samba/，包含smbd.log（文件服务）和nmbd.log（名称服务）。',
    priority: 10,
  },

  // ==================== 通用陷阱 ====================
  {
    keywords: ['写反', '颠倒', '互换'],
    mnemonic: '🎯 万能技巧：看到"写反了"/"定义颠倒"这种描述，99%选错误（B）。',
    priority: 20,
  },
  {
    keywords: ['绝对', '一定', '必须', '总是', '永远'],
    mnemonic: '⚠️ 警惕绝对化表述：看到"一定"/"必须"/"总是"，大概率是错的。',
    priority: 5,
  },
  {
    keywords: ['可能', '通常', '一般', '常见'],
    mnemonic: '✅ 相对化表述通常更安全：带"可能"/"通常"的选项更可能正确。',
    priority: 5,
  },
];

/**
 * 检查题干是否包含指定关键词
 * @param text 题干文本
 * @param keywords 关键词列表
 * @returns 是否匹配
 */
function matchKeywords(text: string, keywords: string[]): boolean {
  const normalizedText = text.toLowerCase().replace(/\s+/g, '');
  return keywords.some(keyword => {
    const normalizedKeyword = keyword.toLowerCase().replace(/\s+/g, '');
    return normalizedText.includes(normalizedKeyword);
  });
}

/**
 * 根据题目内容获取助记口诀
 * 优先使用专属口诀，如果没有则使用关键词匹配（备用方案）
 * @param question 题目对象
 * @returns 助记口诀，如果没有匹配则返回 null
 */
export function getMnemonic(question: Question): string | null {
  // 优先尝试获取专属助记口诀（精准匹配）
  const dedicatedMnemonic = getDedicatedMnemonic(question.id);
  if (dedicatedMnemonic) {
    return dedicatedMnemonic;
  }

  // 如果没有专属口诀，使用旧的关键词匹配系统（备用方案）
  const fullText = [
    question.stem,
    ...question.options.map(opt => opt.text),
  ].join(' ');

  const matchedRule = MNEMONIC_RULES
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .find(rule => matchKeywords(fullText, rule.keywords));

  return matchedRule ? matchedRule.mnemonic : null;
}

/**
 * 批量为题目列表添加助记口诀
 * @param questions 题目列表
 * @returns 添加助记后的题目列表
 */
export function enrichQuestionsWithMnemonics(questions: Question[]): Question[] {
  return questions.map(question => {
    const mnemonic = getMnemonic(question);
    return mnemonic ? { ...question, mnemonic } : question;
  });
}

/**
 * 获取所有助记规则（用于调试和展示）
 * @returns 助记规则列表
 */
export function getAllMnemonicRules(): MnemonicRule[] {
  return [...MNEMONIC_RULES];
}

/**
 * 统计题库中有多少题目匹配了助记规则
 * 优先统计专属口诀，然后统计关键词匹配
 * @param questions 题目列表
 * @returns 统计信息
 */
export function getMnemonicStats(questions: Question[]) {
  let dedicatedCount = 0;
  let keywordMatchCount = 0;
  
  questions.forEach(q => {
    const dedicatedMnemonic = getDedicatedMnemonic(q.id);
    if (dedicatedMnemonic) {
      dedicatedCount++;
    } else {
      // 尝试关键词匹配（备用方案）
      const fullText = [q.stem, ...q.options.map(opt => opt.text)].join(' ');
      const matched = MNEMONIC_RULES
        .sort((a, b) => (b.priority || 0) - (a.priority || 0))
        .find(rule => matchKeywords(fullText, rule.keywords));
      if (matched) {
        keywordMatchCount++;
      }
    }
  });
  
  const total = questions.length;
  const withMnemonic = dedicatedCount + keywordMatchCount;
  const coverage = total > 0 ? (withMnemonic / total * 100).toFixed(1) : '0.0';

  return {
    total,
    withMnemonic,
    dedicatedCount,        // 专属口诀数量
    keywordMatchCount,     // 关键词匹配数量
    withoutMnemonic: total - withMnemonic,
    coverage: `${coverage}%`,
    dedicatedCoverage: `${(dedicatedCount / total * 100).toFixed(1)}%`,
  };
}
