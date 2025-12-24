/**
 * 知识快照数据
 * 从244道题目中提取的核心知识点，按模块分类
 * 帮助用户在背题前快速建立知识框架
 */

export interface KnowledgeCard {
  id: string;
  title: string;
  keyPoints: string[];
  tips?: string;
  relatedQuestions: string[]; // 相关题目ID
}

export interface KnowledgeModule {
  id: string;
  name: string;
  icon: string;
  color: string; // Tailwind color class
  cards: KnowledgeCard[];
}

export const KNOWLEDGE_MODULES: KnowledgeModule[] = [
  {
    id: 'virtualization',
    name: '虚拟化技术',
    icon: '🖥️',
    color: 'blue',
    cards: [
      {
        id: 'vmware-network',
        title: 'VMware网络模式',
        keyPoints: [
          '<strong>NAT</strong>：默认模式，虚拟机通过宿主机上网，有独立网段',
          '<strong>桥接</strong>：虚拟机直接接入物理网络，与主机同级',
          '<strong>仅主机</strong>：虚拟机与主机通信，无法上网',
          '<strong>LAN区段</strong>：完全隔离的虚拟局域网，默认无DHCP'
        ],
        tips: '💡 记住：NAT安全、桥接平等、仅主机闭门、LAN隔离',
        relatedQuestions: ['q001', 'q002', 'q003', 'q004', 'q010', 'q011']
      },
      {
        id: 'vmware-tools',
        title: 'VMware核心工具',
        keyPoints: [
          '<strong>VMware Tools</strong>：显著提升性能（图形/磁盘/网络），<mark>必装</mark>',
          '<strong>快照</strong>：保存状态，可回溯，<mark>不能同时运行多份</mark>',
          '<strong>克隆</strong>：生成独立运行的第二台虚拟机',
          '<strong>ISO镜像</strong>：虚拟光驱默认格式'
        ],
        tips: '⚠️ 快照≠克隆！快照不能同时运行两台机器',
        relatedQuestions: ['q005', 'q006', 'q007', 'q008', 'q009']
      },
      {
        id: 'virtualization-types',
        title: '虚拟化分类',
        keyPoints: [
          '<strong>5大类型</strong>：服务器/桌面/存储/网络/应用虚拟化',
          '<strong>VMware产品</strong>：NSX(网络)、VSAN(存储)、ESXi(服务器)',
          '<strong>Microsoft</strong>：Hyper-V（裸金属虚拟化）',
          '<strong>开源</strong>：KVM、Xen'
        ],
        tips: '🎯 VMware记口诀：NSX-网、VSAN-存',
        relatedQuestions: ['q014', 'q015', 'q016', 'q017', 'q018']
      },
      {
        id: 'docker',
        title: 'Docker容器技术',
        keyPoints: [
          '<strong>启动速度</strong>：容器秒级 vs 虚拟机分钟级',
          '<strong>磁盘占用</strong>：容器MB级 vs 虚拟机GB级',
          '<strong>性能</strong>：容器接近原生，虚拟机弱于原生',
          '<strong>部署密度</strong>：单机可装上百个容器',
          '<strong>隔离性</strong>：通过Namespace/Cgroup实现，安全性良好'
        ],
        tips: '💡 容器共享宿主机内核，所以快且轻',
        relatedQuestions: ['q019', 'q020', 'q021', 'q022', 'q023', 'q024']
      }
    ]
  },
  {
    id: 'storage',
    name: '存储技术',
    icon: '💾',
    color: 'green',
    cards: [
      {
        id: 'raid',
        title: 'RAID技术',
        keyPoints: [
          '<strong>RAID 0</strong>：条带化，<mark>无容错</mark>，速度快，容量=总和',
          '<strong>RAID 1</strong>：镜像，容量减半，允许1块盘故障',
          '<strong>RAID 5</strong>：分布式奇偶校验，<mark>至少3块盘</mark>，允许1块故障',
          '<strong>RAID 10</strong>：先镜像再条带，速度快+容错强，<mark>至少4块盘</mark>'
        ],
        tips: '🎯 RAID 0无容错、RAID 5最少3盘、RAID 10最少4盘',
        relatedQuestions: ['q025', 'q026', 'q027', 'q028', 'q029', 'q030', 'q031']
      },
      {
        id: 'storage-types',
        title: '存储架构',
        keyPoints: [
          '<strong>DAS</strong>：直连存储，<mark>单机使用</mark>，不能共享',
          '<strong>NAS</strong>：网络附加存储，<mark>文件级</mark>共享，常用NFS/CIFS',
          '<strong>SAN</strong>：存储区域网络，<mark>块级</mark>访问，专用存储网络',
          '<strong>iSCSI</strong>：基于IP网络的SAN，使用<mark>TCP 3260</mark>端口'
        ],
        tips: '💡 记口诀：DAS直连独用、NAS文件共享、SAN块级专网',
        relatedQuestions: ['q032', 'q033', 'q034', 'q035', 'q036', 'q037']
      }
    ]
  },
  {
    id: 'network',
    name: '网络服务',
    icon: '🌐',
    color: 'purple',
    cards: [
      {
        id: 'vpn',
        title: 'VPN技术',
        keyPoints: [
          '<strong>PPTP</strong>：点对点隧道，<mark>TCP 1723</mark>，易穿透防火墙',
          '<strong>L2TP</strong>：二层隧道，<mark>UDP 1701</mark>，常与IPsec结合',
          '<strong>IPsec</strong>：网络层安全，<mark>AH+ESP</mark>双协议',
          '<strong>SSL VPN</strong>：应用层，<mark>TCP 443</mark>，浏览器直接访问'
        ],
        tips: '⚠️ PPTP走TCP 1723、L2TP走UDP 1701、SSL VPN走TCP 443',
        relatedQuestions: ['q038', 'q039', 'q040', 'q041', 'q042', 'q043']
      },
      {
        id: 'dns',
        title: 'DNS域名系统',
        keyPoints: [
          '<strong>端口</strong>：<mark>UDP/TCP 53</mark>（查询用UDP，区域传输用TCP）',
          '<strong>记录类型</strong>：A(IPv4)、AAAA(IPv6)、MX(邮件)、CNAME(别名)',
          '<strong>递归查询</strong>：客户端→DNS服务器，服务器负责找到答案',
          '<strong>迭代查询</strong>：DNS服务器之间逐级查询',
          '<strong>缓存</strong>：根据TTL缓存记录，加速解析'
        ],
        tips: '💡 正向解析：域名→IP，反向解析：IP→域名',
        relatedQuestions: ['q044', 'q045', 'q046', 'q047', 'q048', 'q049']
      },
      {
        id: 'dhcp',
        title: 'DHCP动态地址',
        keyPoints: [
          '<strong>端口</strong>：服务器<mark>UDP 67</mark>，客户端<mark>UDP 68</mark>',
          '<strong>4步过程</strong>：Discover→Offer→Request→Ack',
          '<strong>分配内容</strong>：IP地址+子网掩码+网关+DNS，<mark>不分配端口</mark>',
          '<strong>服务器要求</strong>：必须使用<mark>静态IP</mark>',
          '<strong>保留</strong>：通过MAC地址绑定固定IP'
        ],
        tips: '🎯 DHCP四步：发现→提供→请求→确认',
        relatedQuestions: ['q148', 'q149', 'q150', 'q151', 'q152', 'q153', 'q244']
      }
    ]
  },
  {
    id: 'file-services',
    name: '文件服务',
    icon: '📁',
    color: 'orange',
    cards: [
      {
        id: 'windows-share',
        title: 'Windows共享',
        keyPoints: [
          '<strong>共享权限</strong>：读取、更改、完全控制（<mark>粗粒度</mark>）',
          '<strong>NTFS权限</strong>：读取、写入、修改、完全控制（<mark>细粒度</mark>）',
          '<strong>权限叠加</strong>：取<mark>最严格</mark>的交集',
          '<strong>特殊共享</strong>：ADMIN$、C$、IPC$、PRINT$（系统管理用）',
          '<strong>管理组</strong>：Administrators、Server Operators可管理共享'
        ],
        tips: '⚠️ 共享权限+NTFS权限 = 取最严格！',
        relatedQuestions: ['q050', 'q051', 'q052', 'q053', 'q094', 'q201', 'q202']
      },
      {
        id: 'samba',
        title: 'Samba跨平台',
        keyPoints: [
          '<strong>作用</strong>：Linux与Windows互访文件/打印',
          '<strong>配置文件</strong>：<mark>/etc/samba/smb.conf</mark>',
          '<strong>进程</strong>：smbd(文件/打印) + nmbd(名称服务)',
          '<strong>端口</strong>：新版统一<mark>TCP 445</mark>，旧版137-139',
          '<strong>工作流程</strong>：协议协商→建立连接→访问资源→断开'
        ],
        tips: '💡 Samba日志：/var/log/samba/',
        relatedQuestions: ['q113', 'q114', 'q115', 'q116', 'q117', 'q118', 'q119']
      },
      {
        id: 'nfs',
        title: 'NFS网络文件系统',
        keyPoints: [
          '<strong>全称</strong>：Network File System（<mark>不是New</mark>）',
          '<strong>架构</strong>：基于C/S模式，通过<mark>RPC</mark>通信',
          '<strong>必需进程</strong>：rpcbind + rpc.mountd + rpc.nfsd',
          '<strong>配置文件</strong>：<mark>/etc/exports</mark>',
          '<strong>权限</strong>：ro(只读)、rw(读写)、sync(同步)、async(异步)',
          '<strong>root_squash</strong>：客户端root映射为<mark>nobody</mark>'
        ],
        tips: '🎯 NFS服务器提供文件，客户端挂载访问',
        relatedQuestions: ['q121', 'q122', 'q123', 'q124', 'q125', 'q126', 'q127', 'q128']
      },
      {
        id: 'ftp',
        title: 'FTP文件传输',
        keyPoints: [
          '<strong>端口</strong>：命令<mark>TCP 21</mark>，数据<mark>TCP 20</mark>',
          '<strong>主动模式</strong>：服务器从20端口连接客户端',
          '<strong>被动模式</strong>：客户端主动连服务器，<mark>跨网段必用</mark>',
          '<strong>IIS FTP</strong>：Windows自带，集成度高',
          '<strong>Serv-U</strong>：多协议文件服务器，支持多域/多站点'
        ],
        tips: '💡 跨网段/防火墙环境必须用被动模式',
        relatedQuestions: ['q136', 'q137', 'q138', 'q139', 'q140', 'q141', 'q142']
      }
    ]
  },
  {
    id: 'web-services',
    name: 'Web服务',
    icon: '🌍',
    color: 'indigo',
    cards: [
      {
        id: 'web-basics',
        title: 'Web基础',
        keyPoints: [
          '<strong>Apache</strong>：开源，跨平台（Linux/Windows），世界第一',
          '<strong>IIS</strong>：Windows内置，与系统深度集成',
          '<strong>端口</strong>：HTTP默认<mark>80</mark>，HTTPS默认<mark>443</mark>',
          '<strong>URL</strong>：协议+主机+端口+路径（<mark>≠网络地址</mark>）',
          '<strong>虚拟主机</strong>：基于IP、端口、主机头（域名）'
        ],
        tips: '⚠️ 非默认端口必须在URL中显式指定',
        relatedQuestions: ['q160', 'q161', 'q162', 'q163', 'q164', 'q165']
      },
      {
        id: 'apache',
        title: 'Apache配置',
        keyPoints: [
          '<strong>主配置</strong>：<mark>httpd.conf</mark>',
          '<strong>监听</strong>：Listen 80（可改任意端口）',
          '<strong>根目录</strong>：DocumentRoot指定网站根',
          '<strong>目录权限</strong>：Directory指令控制访问',
          '<strong>默认文档</strong>：DirectoryIndex index.html'
        ],
        tips: '💡 修改配置后需重启：systemctl restart httpd',
        relatedQuestions: ['q165', 'q166', 'q167', 'q168']
      },
      {
        id: 'iis',
        title: 'IIS管理',
        keyPoints: [
          '<strong>角色安装</strong>：服务器管理器→添加角色',
          '<strong>应用池</strong>：隔离网站进程，独立回收',
          '<strong>绑定</strong>：配置IP、端口、主机名',
          '<strong>身份验证</strong>：匿名、基本、Windows集成',
          '<strong>SSL证书</strong>：绑定到站点启用HTTPS'
        ],
        tips: '🎯 一个应用池可承载多个网站',
        relatedQuestions: ['q169', 'q170', 'q171', 'q172']
      }
    ]
  },
  {
    id: 'windows-ad',
    name: 'Windows域管理',
    icon: '🏢',
    color: 'cyan',
    cards: [
      {
        id: 'ad-basics',
        title: 'Active Directory',
        keyPoints: [
          '<strong>域控制器</strong>：DC，存储域数据库（<mark>NTDS.dit</mark>）',
          '<strong>域树</strong>：共享连续命名空间的域集合',
          '<strong>域林</strong>：共享配置和架构的域树集合',
          '<strong>站点</strong>：基于<mark>物理位置</mark>的逻辑分组',
          '<strong>复制</strong>：多DC间同步，KCC自动管理拓扑'
        ],
        tips: '💡 域控制器必须有静态IP+DNS指向自己',
        relatedQuestions: ['q054', 'q055', 'q056', 'q057', 'q058']
      },
      {
        id: 'ad-objects',
        title: 'AD对象管理',
        keyPoints: [
          '<strong>OU</strong>：组织单位，<mark>可委派管理权</mark>，可链接GPO',
          '<strong>组</strong>：安全组(分配权限)、通讯组(邮件列表)',
          '<strong>组作用域</strong>：域本地、全局、通用',
          '<strong>用户账户</strong>：域用户集中管理，漫游配置文件',
          '<strong>计算机账户</strong>：加域后可集中管理策略'
        ],
        tips: '🎯 OU可授权、组不可授权！',
        relatedQuestions: ['q059', 'q060', 'q061', 'q062', 'q063']
      },
      {
        id: 'gpo',
        title: '组策略GPO',
        keyPoints: [
          '<strong>作用范围</strong>：站点、域、OU（<mark>不能链接到组</mark>）',
          '<strong>继承规则</strong>：子OU继承父OU策略',
          '<strong>优先级</strong>：本地→站点→域→OU（<mark>后应用优先</mark>）',
          '<strong>阻止继承</strong>：OU可阻止上级策略',
          '<strong>强制执行</strong>：上级强制策略，下级不能阻止'
        ],
        tips: '⚠️ GPO不能直接应用到安全组！',
        relatedQuestions: ['q064', 'q065', 'q066', 'q067', 'q068']
      },
      {
        id: 'ad-services',
        title: 'AD核心服务',
        keyPoints: [
          '<strong>DNS</strong>：域必须依赖DNS，<mark>动态更新</mark>域资源记录',
          '<strong>DHCP</strong>：可授权到域，自动分配IP',
          '<strong>证书服务</strong>：AD CS，企业内部PKI',
          '<strong>联合身份</strong>：AD FS，SSO单点登录',
          '<strong>FSMO角色</strong>：5个操作主机，分布在DC上'
        ],
        tips: '💡 域环境DNS动态更新是核心功能',
        relatedQuestions: ['q069', 'q070', 'q071', 'q072', 'q073']
      }
    ]
  },
  {
    id: 'print',
    name: '打印服务',
    icon: '🖨️',
    color: 'pink',
    cards: [
      {
        id: 'print-basics',
        title: '打印架构',
        keyPoints: [
          '<strong>打印设备</strong>：物理打印机硬件',
          '<strong>打印机（逻辑）</strong>：Windows中的打印队列对象',
          '<strong>打印服务器</strong>：集中管理打印队列和驱动',
          '<strong>打印端口</strong>：连接逻辑打印机与物理设备',
          '<strong>驱动程序</strong>：将任务转换为设备识别的语言'
        ],
        tips: '⚠️ 硬件打印服务器仍需IP地址接入网络',
        relatedQuestions: ['q095', 'q096', 'q097', 'q098', 'q099', 'q100']
      },
      {
        id: 'print-management',
        title: '打印管理',
        keyPoints: [
          '<strong>共享打印</strong>：启用后网络用户可连接',
          '<strong>打印权限</strong>：打印、管理打印机、管理文档',
          '<strong>打印池</strong>：一个逻辑打印机对应<mark>多个物理设备</mark>',
          '<strong>优先级</strong>：1-99，数字越大优先级越高',
          '<strong>计划打印</strong>：限制打印时间段'
        ],
        tips: '💡 打印池中所有设备必须使用相同驱动',
        relatedQuestions: ['q101', 'q103', 'q104', 'q105', 'q106']
      }
    ]
  },
  {
    id: 'security',
    name: '安全与防护',
    icon: '🔒',
    color: 'red',
    cards: [
      {
        id: 'firewall',
        title: '防火墙基础',
        keyPoints: [
          '<strong>包过滤</strong>：检查IP/端口，<mark>无状态</mark>',
          '<strong>状态检测</strong>：跟踪连接状态，<mark>有状态</mark>',
          '<strong>应用层</strong>：检查应用数据，深度包检测',
          '<strong>NAT</strong>：地址转换，隐藏内网',
          '<strong>DMZ</strong>：隔离区，放置对外服务'
        ],
        tips: '🎯 状态防火墙记住连接，比包过滤更智能',
        relatedQuestions: ['q074', 'q075', 'q076', 'q077', 'q078']
      },
      {
        id: 'windows-firewall',
        title: 'Windows防火墙',
        keyPoints: [
          '<strong>配置文件</strong>：域、专用、公用（<mark>不同规则</mark>）',
          '<strong>入站规则</strong>：控制进入流量',
          '<strong>出站规则</strong>：控制发出流量',
          '<strong>连接安全规则</strong>：要求IPsec保护',
          '<strong>默认策略</strong>：阻止入站、允许出站'
        ],
        tips: '💡 域环境自动切换到域配置文件',
        relatedQuestions: ['q079', 'q080', 'q081', 'q082', 'q083']
      },
      {
        id: 'encryption',
        title: '加密与认证',
        keyPoints: [
          '<strong>对称加密</strong>：AES、DES，<mark>密钥相同</mark>，速度快',
          '<strong>非对称加密</strong>：RSA、ECC，<mark>公钥私钥</mark>，安全性高',
          '<strong>哈希</strong>：SHA-256、MD5，<mark>单向</mark>，验证完整性',
          '<strong>数字签名</strong>：私钥签名+公钥验证，<mark>不可否认</mark>',
          '<strong>证书</strong>：CA签发，绑定公钥与身份'
        ],
        tips: '⚠️ MD5已不安全，推荐SHA-256',
        relatedQuestions: ['q084', 'q085', 'q086', 'q087', 'q088']
      },
      {
        id: 'backup',
        title: '备份与恢复',
        keyPoints: [
          '<strong>完全备份</strong>：全部数据，<mark>恢复最快</mark>',
          '<strong>增量备份</strong>：备份变化，<mark>空间最省</mark>',
          '<strong>差异备份</strong>：备份自上次完全后的变化',
          '<strong>快照</strong>：某时刻状态，瞬间捕获',
          '<strong>异地备份</strong>：防灾难，<mark>3-2-1原则</mark>'
        ],
        tips: '💡 3-2-1：3份副本、2种介质、1份异地',
        relatedQuestions: ['q089', 'q090', 'q091', 'q092', 'q093']
      }
    ]
  },
  {
    id: 'linux',
    name: 'Linux基础',
    icon: '🐧',
    color: 'teal',
    cards: [
      {
        id: 'linux-commands',
        title: '常用命令',
        keyPoints: [
          '<strong>文件操作</strong>：ls、cd、cp、mv、rm、chmod、chown',
          '<strong>软件管理</strong>：yum install（CentOS）、apt-get（Debian）',
          '<strong>服务管理</strong>：systemctl start/stop/restart/status',
          '<strong>网络工具</strong>：ifconfig、ip addr、netstat、ss',
          '<strong>防火墙</strong>：firewall-cmd（CentOS 7+）'
        ],
        tips: '💡 systemctl是新版，service是旧版',
        relatedQuestions: ['q107', 'q108', 'q109', 'q110', 'q111', 'q112']
      },
      {
        id: 'linux-config',
        title: '配置文件路径',
        keyPoints: [
          '<strong>网卡</strong>：/etc/sysconfig/network-scripts/ifcfg-*',
          '<strong>DHCP</strong>：/etc/dhcp/dhcpd.conf',
          '<strong>DNS</strong>：/etc/resolv.conf（客户端）',
          '<strong>Samba</strong>：/etc/samba/smb.conf',
          '<strong>NFS</strong>：/etc/exports',
          '<strong>Apache</strong>：/etc/httpd/conf/httpd.conf'
        ],
        tips: '🎯 大多数配置文件在/etc/下',
        relatedQuestions: ['q154', 'q155', 'q156', 'q165']
      }
    ]
  }
];

/**
 * 获取所有知识模块
 */
export function getAllModules(): KnowledgeModule[] {
  return KNOWLEDGE_MODULES;
}

/**
 * 根据ID获取模块
 */
export function getModuleById(id: string): KnowledgeModule | undefined {
  return KNOWLEDGE_MODULES.find(m => m.id === id);
}

/**
 * 获取知识快照统计
 */
export function getSnapshotStats() {
  const totalCards = KNOWLEDGE_MODULES.reduce((sum, m) => sum + m.cards.length, 0);
  const totalKeyPoints = KNOWLEDGE_MODULES.reduce(
    (sum, m) => sum + m.cards.reduce((s, c) => s + c.keyPoints.length, 0),
    0
  );
  
  return {
    modules: KNOWLEDGE_MODULES.length,
    cards: totalCards,
    keyPoints: totalKeyPoints,
  };
}
