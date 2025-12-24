[
  {
    "id": 1,
    "question": "VMware Workstation网卡的默认类型是？",
    "answer": "A",
    "mnemonic": "🎭 默认NAT穿马甲，隐身内网最安全（NAT模式通过主机IP转发，外界看不到虚拟机真身，所以比桥接裸奔更安全）"
  },
  {
    "id": 2,
    "question": "VMware Workstation网络连接类型设置为桥接方式后，虚拟机和主机处于同等网络地位。",
    "answer": "A",
    "mnemonic": "🌉 桥接就是并排坐，地位平等谁也不虚谁（桥接直接连入物理网，和主机拿同段IP，是独立的网络公民）"
  },
  {
    "id": 3,
    "question": "在VMware Workstation 16的虚拟网络编辑器中，添加自定义网络时可以使用由VMware Workstation软件内置的DHCP服务。",
    "answer": "A",
    "mnemonic": "🔌 自定义网也能连，内置DHCP照样发IP不含糊（虚拟网络编辑器自带DHCP组件，勾选就能给自定义网段发IP）"
  },
  {
    "id": 4,
    "question": "VMware Workstation 16安装完虚拟机后，在设置虚拟机的网络适配器时如果设置为LAN区段模式，可以通过LAN区段模式的高级设置使用VMware Workstation内置的DHCP服务。",
    "answer": "B",
    "mnemonic": "🏝️ LAN区段是孤岛，根本找不到内置DHCP服务（LAN区段是完全封闭的私有通道，没有连接虚拟交换机，所以没DHCP）"
  },
  {
    "id": 5,
    "question": "在VMware Workstation 16环境中，虚拟光驱默认使用的光盘镜像文件格式为？",
    "answer": "A",
    "mnemonic": "💿 光盘镜像就认ISO，爱搜才是标准格式（ISO是国际标准光盘镜像格式，虚拟光驱首选）"
  },
  {
    "id": 6,
    "question": "VMware Workstation使用中VMware Tools属于可选的软件包，对系统性能没有什么提升。",
    "answer": "B",
    "mnemonic": "🔧 Tools工具是个宝，装了性能才变好（它包含显卡网卡驱动，能增强显示、支持拖拽文件，没它卡成翔）"
  },
  {
    "id": 7,
    "question": "VMware Workstation虚拟机快照比克隆好用，在需要2台同系统虚拟机的场合应该使用快照方式快速搭建所需环境。",
    "answer": "B",
    "mnemonic": "🐑 两台机器要分身得靠克隆，快照只是时光倒流回不去（快照是单机的存档回滚，克隆才是复制出第二台机器）"
  },
  {
    "id": 8,
    "question": "VMware Workstation的快照比较占用存储空间，系统为每个虚拟机给出了仅能创建1个快照的权力。",
    "answer": "B",
    "mnemonic": "📸 快照多多益善，系统才不会只让你存一个档（快照树可以分叉，想存几个存几个，只受硬盘限制）"
  },
  {
    "id": 9,
    "question": "VMware Workstation环境中，需要用到两台同操作系统的虚拟机，其中一台虚拟机已经安装完成，另一台虚拟机可以使用的安装方式有？",
    "answer": "ACD",
    "mnemonic": "👯 克隆复制导OVF都能变新机，唯独快照是原地踏步（ACD都是生成新文件，B快照只是状态记录，变不出新电脑）"
  },
  {
    "id": 10,
    "question": "VMware Workstation 16环境中，网络适配器连接的NAT模式其网段是固定的，无法修改。",
    "answer": "B",
    "mnemonic": "✏️ NAT网段并非死规矩，虚拟编辑器里想改就能改（虚拟网络编辑器拥有最高权限，网段IP随便定义）"
  },
  {
    "id": 11,
    "question": "需要使用VMware Workstation环境搭建一个完全独立的网络环境，默认情况下可以使用以下哪种网络连接模式？",
    "answer": "D",
    "mnemonic": "🏔️ 想要完全独立不被打扰，首选LAN区段这个世外桃源（LAN区段不连主机网卡，不连外网，纯纯的内部独立闭环）"
  },
  {
    "id": 12,
    "question": "使用VMware Workstation新建虚拟机时，在“选择客户机操作系统”页面，操作系统必须精确，否则后续安装系统可能会出现不能启动的故障。",
    "answer": "B",
    "mnemonic": "🏷️ 选系统只是个标签，选错了也能装，不必太纠结精确（这选项主要是为了预设推荐配置，选错标签不影响内核引导）"
  },
  {
    "id": 13,
    "question": "使用VMware Workstation创建虚拟机时，硬盘容量大小要提前规划好。如果使用过程中硬盘容量不够，系统只能通过新增硬盘来解决这个问题。",
    "answer": "B",
    "mnemonic": "💾 硬盘不够别发愁，直接扩容就行，不必非得买新盘（虚拟磁盘是文件，工具里点“扩展”就能把C盘变大）"
  },
  {
    "id": 14,
    "question": "虚拟化的定义是什么？",
    "answer": "ABC",
    "mnemonic": "📦 对象是资源，细节全隐藏，功能全实现（虚拟化就是把物理资源抽象化，不用管硬件细节，只要能用就行）"
  },
  {
    "id": 15,
    "question": "虚拟化常用的类型有？",
    "answer": "ABCDE",
    "mnemonic": "🦾 服桌存网应，五大金刚都能硬（服务器、桌面、存储、网络、应用，IT全领域都能虚拟化）"
  },
  {
    "id": 16,
    "question": "VMware的网络虚拟化平台是VMware？",
    "answer": "A",
    "mnemonic": "🐂 网络平台牛死叉，缩写就是NSX（Network Virtualization，NSX是VMware网络虚拟化的王牌）"
  },
  {
    "id": 17,
    "question": "VMware的存储虚拟化产品是VMware？",
    "answer": "B",
    "mnemonic": "🗄️ 存储就要V个SAN，微散存得快（vSAN是Virtual SAN，把硬盘池化成共享存储）"
  },
  {
    "id": 18,
    "question": "Microsoft公司的虚拟化产品是？",
    "answer": "A",
    "mnemonic": "🖐️ 微软超级五，Hyper加个V（Windows自带的虚拟化叫Hyper-V，Remember微软=Hyper）"
  },
  {
    "id": 19,
    "question": "Docker是一种小型虚拟化技术，几乎没有性能开销，可以很容易地在机器和数据中心运行。",
    "answer": "A",
    "mnemonic": "🐳 Docker小巧无开销，到处运行效率高（Docker共享宿主机内核，不像虚拟机要模拟硬件，所以极轻）"
  },
  {
    "id": 20,
    "question": "Docker和虚拟机在启动速度上的比较，容器是秒级，而虚拟机是分钟级。",
    "answer": "A",
    "mnemonic": "⚡ 容器秒开快如电，虚拟机慢吞吞要几分钟（容器只是起个进程，虚拟机要跑完开机自检和系统加载）"
  },
  {
    "id": 21,
    "question": "Docker和虚拟机在硬盘使用上的比较，容器一般是GB，而虚拟机一般是MB。",
    "answer": "B",
    "mnemonic": "🤏 容器小得像MB，虚拟机胖成GB，题目说反了就是错（容器复用底层库很小，虚拟机带完整OS很大）"
  },
  {
    "id": 22,
    "question": "Docker和虚拟机在性能上的比较，容器接近原生，而虚拟机弱于原生。",
    "answer": "A",
    "mnemonic": "🚀 容器裸奔性能强接近原生，虚拟机隔层墙稍逊一筹（容器直接用物理机内核调度，没有中间商赚差价）"
  },
  {
    "id": 23,
    "question": "通常在单机上能装上百个容器。",
    "answer": "A",
    "mnemonic": "🥡 容器小巧随便装，单机百个千个不慌张（因为轻量，一台电脑能跑几百个Docker，换虚拟机早崩了）"
  },
  {
    "id": 24,
    "question": "虚拟机在使用的时候系统是完全隔离的，而容器数据轻量化虚拟，很难保证系统的隔离性。",
    "answer": "B",
    "mnemonic": "🛡️ 虽然轻量也隔离，说难保证那是看不起Docker（Docker利用Namespace和Cgroup技术，隔离性是达标的）"
  },
  {
    "id": 25,
    "question": "RAID的标准中文解释是？",
    "answer": "A",
    "mnemonic": "💽 独立磁盘冗余阵列，独磁冗阵念顺口（Redundant Array of Independent Disks，记住“独立”和“冗余”）"
  },
  {
    "id": 26,
    "question": "JBOD是最简单的RAID形式。",
    "answer": "B",
    "mnemonic": "🧱 JBOD只是一堆盘简单的凑在一起，根本算不上RAID（JBOD只是把盘串联扩容，没有RAID的条带和冗余特性）"
  },
  {
    "id": 27,
    "question": "RAID中主要有三个关键概念和技术是？",
    "answer": "ABC",
    "mnemonic": "🪞 照镜子镜像，贴条子条带，对票子校验（RAID三大法宝：镜像=备份，条带=速度，校验=纠错）"
  },
  {
    "id": 28,
    "question": "RAID0提供的是磁盘的镜像冗余。",
    "answer": "B",
    "mnemonic": "0️⃣ RAID0就是零冗余，速度快了数据虚（RAID0只做条带加速，没有镜像，坏一块全完）"
  },
  {
    "id": 29,
    "question": "RAID1提供的是磁盘的镜像冗余。",
    "answer": "A",
    "mnemonic": "1️⃣ RAID1就是一一对应，照镜子做备份（数据写两份，一份存一份备，就是镜像冗余）"
  },
  {
    "id": 30,
    "question": "以下RAID技术中没有容错性的是？",
    "answer": "A",
    "mnemonic": "💥 RAID0就是零容错，坏了一个全玩完（为了速度牺牲安全，唯一没有容错的RAID）"
  },
  {
    "id": 31,
    "question": "以最少硬盘组成的以下RAID阵列中随机读写性能最高的是？",
    "answer": "A",
    "mnemonic": "🏎️ 为了速度不要命，RAID0读写最带劲（数据切块并发读写，没有校验开销，所以最快）"
  },
  {
    "id": 32,
    "question": "现有8块硬盘组成RAID，以下几种RAID技术中能够实现冗余，且磁盘可用空间最大的是？",
    "answer": "C",
    "mnemonic": "⚖️ RAID0没冗余，RAID1亏一半，RAID5折中才实惠（RAID5只损失1块盘容量做校验，空间利用率最高）"
  },
  {
    "id": 33,
    "question": "现有8块硬盘组成RAID，以下几种RAID技术中磁盘可用空间最大的是？",
    "answer": "A",
    "mnemonic": "📈 只要空间不要命，RAID0利用率百分百（不留任何空间做备份，8块盘容量全能用）"
  },
  {
    "id": 34,
    "question": "现有8块硬盘组成RAID，在保证容错性最高的情况下，容量尽可能大，应该用哪种RAID？",
    "answer": "B",
    "mnemonic": "🥇 容错最高RAID1，虽然浪费硬盘但安全第一（题目如果强调“最高容错”，通常指RAID1的完整镜像，RAID6能坏2块也很强，但1是完整副本）"
  },
  {
    "id": 35,
    "question": "以下RAID技术，哪个在热备份性能上和其他技术都不一样？",
    "answer": "A",
    "mnemonic": "🚶 RAID0是个独行侠，没有备份没有家（RAID0没有冗余盘，自然也不支持热备自动重建）"
  },
  {
    "id": 36,
    "question": "SAN的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🕸️ SAN读音像散，存储区域网络散开了（Storage Area Network，专用网络连接存储）"
  },
  {
    "id": 37,
    "question": "SAN技术一般包括以下哪些项？",
    "answer": "BD",
    "mnemonic": "🛤️ SAN有两种路，IP路和FC光纤路（IP-SAN走网线便宜，FC-SAN走光纤快，都是SAN）"
  },
  {
    "id": 38,
    "question": "NAS和SAN的区别在于写反了。",
    "answer": "B",
    "mnemonic": "🤪 这题纯属搞心态，说写反了那肯定是错的（NAS是网络附属存储，SAN是存储区域网，架构完全不同）"
  },
  {
    "id": 39,
    "question": "NAS和SAN的区别在于前者支持File协议，后者则支持Block协议。",
    "answer": "A",
    "mnemonic": "📝 NAS传文件File，SAN传块Block，各司其职（NAS像网盘传文件，SAN像外接硬盘传数据块）"
  },
  {
    "id": 40,
    "question": "通常情况下FC-SAN速度优于IP-SAN。",
    "answer": "A",
    "mnemonic": "⚡ 光纤FC肯定比网线IP跑得快（FC协议专为存储设计，低延迟高带宽，优于通用的IP以太网）"
  },
  {
    "id": 41,
    "question": "FC-SAN的传输距离比IP-SAN远。",
    "answer": "B",
    "mnemonic": "🌍 IP网络通全球，FC光纤距离哪有互联网远（IP-SAN基于TCP/IP可以跨路由全球传，FC通常局限在机房）"
  },
  {
    "id": 42,
    "question": "IP-SAN和NAS都是基于IP网络进行数据传输。",
    "answer": "A",
    "mnemonic": "🌐 只要名字带IP或者NAS，那都是走网络IP协议（它俩底层都是以太网和TCP/IP，物理介质通用）"
  },
  {
    "id": 43,
    "question": "WebDAV可以通过HTTP协议进行远程文件读写。",
    "answer": "A",
    "mnemonic": "🔗 WebDAV就是网页版U盘，全靠HTTP协议来帮忙（WebDAV扩展了HTTP，让网页协议也能像本地盘一样读写文件）"
  },
  {
    "id": 44,
    "question": "VPN的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🚇 VPN就是虚拟专用网，Virtual Private Network首字母（在公网上挖个隧道，虚拟出一条专用加密通道）"
  },
  {
    "id": 45,
    "question": "Frp能够实现内网穿透。",
    "answer": "A",
    "mnemonic": "🪛 Frp就是穿墙术，内网穿透挡不住（Frp利用反向代理，让外网能访问没公网IP的内网机器）"
  },
  {
    "id": 46,
    "question": "NAT的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🔄 NAT就是网络地址转换，Net Address Trans（把私有IP转成公网IP，解决IP不够用的问题）"
  },
  {
    "id": 47,
    "question": "云计算的部署模式有？",
    "answer": "ABD",
    "mnemonic": "☁️ 公有私有混合云，百度那是产品名不是模式（部署模式讲的是“谁来建云”，公有、私有、混合三类）"
  },
  {
    "id": 48,
    "question": "以下能实现远程桌面的软件有哪些？",
    "answer": "ACD",
    "mnemonic": "🌻 远程桌面三剑客RDP、VNC、向日葵（OMV是OpenMediaVault做NAS系统的，不是远控软件）"
  },
  {
    "id": 49,
    "question": "虚拟化的定义是什么？",
    "answer": "ABC",
    "mnemonic": "👻 对象是资源，细节全隐藏，功能全实现（虚拟化核心：把物理资源逻辑化，用户只看功能不看硬件）"
  },
  {
    "id": 50,
    "question": "VMware公司的服务器虚拟化软件名称是？",
    "answer": "A",
    "mnemonic": "🏷️ 威斯菲尔vSphere，名字要记对（VMware的企业级套件统称vSphere）"
  },
  {
    "id": 51,
    "question": "VMware ESXi 5.5是vSphere 5.5的？",
    "answer": "A",
    "mnemonic": "💓 ESXi是心脏，核心组件不能忘（ESXi是底层系统Hypervisor，vSphere是整个品牌）"
  },
  {
    "id": 52,
    "question": "VMware的网络虚拟化平台是VMware？",
    "answer": "A",
    "mnemonic": "🐂 网络平台牛死叉，缩写就是NSX（Network Virtualization，专做SDN软件定义网络）"
  },
  {
    "id": 53,
    "question": "Docker是一种小型虚拟化技术，几乎没有性能开销，可以很容易地在机器和数据中心运行。",
    "answer": "A",
    "mnemonic": "🐳 Docker小巧无开销，到处运行效率高（轻量级引擎，不模拟硬件，开销几乎为零）"
  },
  {
    "id": 54,
    "question": "Docker和虚拟机在启动速度上的比较，容器是秒级，而虚拟机是分钟级。",
    "answer": "A",
    "mnemonic": "⏱️ 容器秒开快如电，虚拟机慢吞吞要几分钟（容器不需要启动OS，虚拟机需要完整开机过程）"
  },
  {
    "id": 55,
    "question": "虚拟机在使用的时候系统是完全隔离的，而容器数据轻量化虚拟，很难保证系统的隔离性。",
    "answer": "B",
    "mnemonic": "🛡️ 虽然轻量也隔离，说难保证那是看不起Docker（Namespace技术保证了容器间也是相互隔离的）"
  },
  {
    "id": 56,
    "question": "RAID的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🗣️ 独立磁盘冗余阵列，独磁冗阵念顺口（Remember：Independent Disk 独立磁盘）"
  },
  {
    "id": 57,
    "question": "JBOD是最简单的RAID形式。",
    "answer": "B",
    "mnemonic": "🧩 JBOD只是一堆盘简单的凑在一起，根本算不上RAID（Just a Bunch Of Disks，只是磁盘叠加，没有阵列算法）"
  },
  {
    "id": 58,
    "question": "以下RAID技术，哪个在热备份性能上和其他技术都不一样？",
    "answer": "A",
    "mnemonic": "🚶 RAID0是个独行侠，没有备份没有家（没有冗余数据的RAID0，坏了就是坏了，没法热备切换）"
  },
  {
    "id": 59,
    "question": "SAN的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🕸️ SAN读音像散，存储区域网络散开了（Storage Area Network）"
  },
  {
    "id": 60,
    "question": "SAN技术一般包括以下哪些项？",
    "answer": "BD",
    "mnemonic": "🛤️ SAN有两种路，IP路和FC光纤路（基于IP协议的IP-SAN和基于光纤通道的FC-SAN）"
  },
  {
    "id": 61,
    "question": "NAS和SAN的区别在于前者支持File协议，后者则支持Block协议。",
    "answer": "A",
    "mnemonic": "📝 NAS传文件File，SAN传块Block（NAS给你的是文件夹，SAN给你的是一块裸硬盘）"
  },
  {
    "id": 62,
    "question": "通常情况下FC-SAN速度优于IP-SAN。",
    "answer": "A",
    "mnemonic": "⚡ 光纤FC肯定比网线IP跑得快（专用光纤通道效率极高，没有TCP/IP的协议包袱）"
  },
  {
    "id": 63,
    "question": "FC-SAN的传输距离比IP-SAN远。",
    "answer": "B",
    "mnemonic": "🗺️ IP网络通全球，FC光纤距离哪有互联网远（光纤信号衰减快，IP协议能靠路由器无限中继）"
  },
  {
    "id": 64,
    "question": "IP-SAN和NAS都是基于IP网络进行数据传输。",
    "answer": "A",
    "mnemonic": "🌐 只要名字带IP或者NAS，那都是走网络IP协议（底层传输介质都是网线/以太网）"
  },
  {
    "id": 65,
    "question": "WebDAV可以通过HTTP协议进行远程文件读写。",
    "answer": "A",
    "mnemonic": "🔌 WebDAV就是网页版U盘，全靠HTTP协议来帮忙（利用HTTP的扩展方法实现文件管理）"
  },
  {
    "id": 66,
    "question": "VPN的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🚇 VPN就是虚拟专用网，Virtual Private Network首字母"
  },
  {
    "id": 67,
    "question": "Frp能够实现内网穿透。",
    "answer": "A",
    "mnemonic": "🪛 Frp就是穿墙术，内网穿透挡不住（反向代理技术，打通内外网）"
  },
  {
    "id": 68,
    "question": "NAT的标准中文解释是？",
    "answer": "A",
    "mnemonic": "🔄 NAT就是网络地址转换，Net Address Trans"
  },
  {
    "id": 69,
    "question": "云计算的部署模式有？",
    "answer": "ABD",
    "mnemonic": "☁️ 公有私有混合云，百度那是产品名不是模式（部署模式分：公有云AWS/阿里云、私有云、混合云）"
  },
  {
    "id": 70,
    "question": "以下能实现远程桌面的软件有哪些？",
    "answer": "ACD",
    "mnemonic": "🤺 远程桌面三剑客RDP、VNC、向日葵（OMV是NAS系统，不是远控）"
  },
  {
    "id": 71,
    "question": "在Debian10里面直接打开常用软件添加删除界面的命令是什么？",
    "answer": "A",
    "mnemonic": "📋 任务task选择sel，合起来tasksel就是管理软件（task select 任务选择器，Debian系特有工具）"
  },
  {
    "id": 72,
    "question": "将用户设置为可以使用sudo状态的配置文件是？",
    "answer": "A",
    "mnemonic": "👑 sudo的人都在etc下的sudoers名单里（sudoers文件专门管理谁有权使用sudo提权）"
  },
  {
    "id": 73,
    "question": "Windows系统的hosts文件一般保存在哪？",
    "answer": "A",
    "mnemonic": "🪟 Windows藏得深，驱动drivers下面找etc（系统核心配置都在System32/drivers/etc里）"
  },
  {
    "id": 74,
    "question": "Linux系统的hosts文件一般保存在哪？",
    "answer": "A",
    "mnemonic": "🐧 Linux简单直接，就在etc下面（Linux配置通常都在/etc根目录下）"
  },
  {
    "id": 75,
    "question": "DNS是一种基于集中式数据库的域名系统。",
    "answer": "B",
    "mnemonic": "🌐 DNS是分布在全球的，不是集中的，集中不得累死（DNS是分布式层次型数据库，没有一个中心存所有数据）"
  },
  {
    "id": 76,
    "question": "DNS域名解析可靠性高，即使单个节点出了故障，也不会妨碍整个系统的正常运行。",
    "answer": "A",
    "mnemonic": "🕸️ DNS是分布网，坏了一个节点也不影响全局（因为数据分布在不同服务器，且有缓存和冗余）"
  },
  {
    "id": 77,
    "question": "DNS的域名空间最大深度不超过127层。",
    "answer": "A",
    "mnemonic": "📶 域名深度有极限，一二七层是顶天（.com是一层，google.com是两层，最多127层）"
  },
  {
    "id": 78,
    "question": "域名系统的一般组成包括？",
    "answer": "ABCD",
    "mnemonic": "👪 服务器客户端，记录空间全家福（DNS系统=服务器+客户端+数据库记录+命名空间）"
  },
  {
    "id": 79,
    "question": "域名系统中DNS服务器的功能是？",
    "answer": "C",
    "mnemonic": "🔍 服务器是干嘛的，存记录供查询（服务器的核心任务：存数据库RR，回答别人的查询Query）"
  },
  {
    "id": 80,
    "question": "在DNS系统中，区域通常比所对应的域所代表的范围大。",
    "answer": "B",
    "mnemonic": "🤏 区域Zone小于等于域Domain，说区域大就是反了（区域Zone是管理的物理单位，域Domain是逻辑单位，Zone通常是Domain的一部分）"
  },
  {
    "id": 81,
    "question": "为了保证DNS的解析正确，一台DNS服务器通常只能管理一个区域。",
    "answer": "B",
    "mnemonic": "💪 服务器很强大，管理多个区域没在怕（一台BIND服务器可以同时加载多个Zone文件，管理多个域名）"
  },
  {
    "id": 82,
    "question": "在DNS系统中，反向解析指的是？",
    "answer": "A",
    "mnemonic": "🔙 反向就是反着来，IP换域名（正向是域名->IP，反向自然是IP->域名）"
  },
  {
    "id": 83,
    "question": "HOSTS文件是比较老的域名查询文件，在现今的操作系统中一般都不再用它。",
    "answer": "B",
    "mnemonic": "🛡️ HOSTS虽老仍有用，屏蔽广告全靠它（系统查DNS前必先查Hosts，优先级最高，用来屏蔽网站很有效）"
  },
  {
    "id": 84,
    "question": "NetBIOS名称解析，广播方式只能解析本网段的NetBIOS名称。",
    "answer": "A",
    "mnemonic": "📣 广播喊话传不远，只能网段内部喊（路由器隔离广播，所以广播只能在本地局域网内有效）"
  },
  {
    "id": 85,
    "question": "WINS组件一般包括有？",
    "answer": "ABCD",
    "mnemonic": "🍔 WINS全家桶，服务器客户端代理数据库全都要（微软WINS服务的标准四个组件）"
  },
  {
    "id": 86,
    "question": "以下哪条命令可显示和查看客户端域名解析程序缓存？",
    "answer": "D",
    "mnemonic": "📺 查看显示是display，displaydns错不了（ipconfig /displaydns 显示本地缓存）"
  },
  {
    "id": 87,
    "question": "对于仅有一个网段的独立局域网，没有必要部署WINS服务。",
    "answer": "A",
    "mnemonic": "🗣️ 单网段吼一声就行，部署WINS纯属脱裤子放屁（单网段用广播就能找到名字，跨网段才需要WINS服务器）"
  },
  {
    "id": 88,
    "question": "与关系型数据库相比，目录数据库特点如下？",
    "answer": "ABCD",
    "mnemonic": "📒 目录就是电话本，读快写慢树状根（LDAP目录优化了读取查询，像电话本一样，但不适合频繁修改写入）"
  },
  {
    "id": 89,
    "question": "Linux平台常用的目录服务软件是？",
    "answer": "C",
    "mnemonic": "👐 Linux开源选Open，OpenLDAP最正身（OpenLDAP是LDAP协议的开源实现标准）"
  },
  {
    "id": 90,
    "question": "Active Directory建立在域的基础上，由域控制器对网络中的资源实行集中管理和控制。",
    "answer": "A",
    "mnemonic": "🎯 AD域控最集中，管理资源很轻松（AD的核心就是通过DC域控实现集中认证和管理）"
  },
  {
    "id": 91,
    "question": "Active Directory的功能不包括以下哪些选项？",
    "answer": "D",
    "mnemonic": "💿 AD不管修硬盘，逻辑卷管理那是磁盘管理的事（AD管的是用户、计算机等逻辑对象，不管物理硬盘分区）"
  },
  {
    "id": 92,
    "question": "Active Directory对象可分为几种类型？",
    "answer": "AB",
    "mnemonic": "🏺 要么容器装东西，要么非容器被装，就这两类（容器对象能包含子对象如OU，非容器对象如User是叶子节点）"
  },
  {
    "id": 93,
    "question": "Active Directory对象的主要类别不包括以下的哪一项？",
    "answer": "C",
    "mnemonic": "🔢 对象是实体人或电脑，密码只是个属性（对象是“东西”，密码是这个东西的“特征”，不是独立对象）"
  },
  {
    "id": 94,
    "question": "域中包括以下几类的计算机？",
    "answer": "ABC",
    "mnemonic": "💻 域控成员工作站，笔记本是硬件形态不算角色（AD里只有：域控制器DC、成员服务器Server、工作站Workstation）"
  },
  {
    "id": 95,
    "question": "规划Windows网络结构时，通常有哪几种工作方式？",
    "answer": "AB",
    "mnemonic": "🏢 Windows网络两巨头，工作组和域（Workgroup是分散管理，Domain是集中管理）"
  },
  {
    "id": 96,
    "question": "域控制器作为域中最重要的服务器，不允许它降级为成员服务器。",
    "answer": "B",
    "mnemonic": "📉 域控也能被贬职，降级成普通成员服务器未尝不可（运行dcpromo卸载域控服务，它就变回普通服务器了）"
  },
  {
    "id": 97,
    "question": "本课程中LDAP是指？",
    "answer": "A",
    "mnemonic": "🪶 L就是Light轻，轻量级目录访问协议（Lightweight Directory Access Protocol）"
  },
  {
    "id": 98,
    "question": "文件服务器的部署主要考虑的因素有？",
    "answer": "ABD",
    "mnemonic": "🔒 速度容量安全性，三者缺一不可（位置不重要因为连着网，但多快、多大、安不安全最重要）"
  },
  {
    "id": 99,
    "question": "使用PC机就能非常快速地建立文件服务器。",
    "answer": "A",
    "mnemonic": "⚡ PC也能当服务器，快速建立没问题（随便一台电脑右键共享文件夹，就是个简单的文件服务器）"
  },
  {
    "id": 100,
    "question": "硬件打印服务器有别于软件打印服务器，可以不用网络地址实现多用户打印。",
    "answer": "B",
    "mnemonic": "🖨️ 没IP地址怎么连网络，硬件打印也要网卡和IP（只要是网络打印，就必须有IP地址才能被找到）"
  },
  {
    "id": 101,
    "question": "Windows计算机将所连接的打印机共享出来，就可成为软件打印服务器。",
    "answer": "A",
    "mnemonic": "🧙 电脑共享打印机，摇身一变就是软件打印服务器（通过软件共享功能提供服务，这就是软件服务器的定义）"
  },
  {
    "id": 102,
    "question": "Windows操作系统通常默认使用哪个协议来实现文件和打印共享？",
    "answer": "D",
    "mnemonic": "🤠 Windows共享靠什么，傻帽SMB和媳妇CIFS（SMB/CIFS是微软原生共享协议，Linux才用NFS）"
  },
  {
    "id": 103,
    "question": "文件服务器的核心功能是文件共享，在Windows系统中是通过共享文件夹实现的。",
    "answer": "A",
    "mnemonic": "📂 文件服务核心是共享，Windows靠文件夹共享来实现（右键属性->共享，是Windows最基础的操作）"
  },
  {
    "id": 104,
    "question": "文件服务器的配置管理工作包括有？",
    "answer": "ABC",
    "mnemonic": "🔧 管文件管权限管用户，磁盘分区那是硬件层面的事（文件服务关注的是资源分配和权限，不是底层分区）"
  },
  {
    "id": 105,
    "question": "一般情况下，哪些组成员能够配置管理共享文件夹？",
    "answer": "CD",
    "mnemonic": "👮 只有管理Admin和操作员Operator才有权限管闲事（普通User和Guest权限不够，只有管理员和服务器操作员能管）"
  },
  {
    "id": 106,
    "question": "以下共享名属于特殊共享资源的有？",
    "answer": "ACD",
    "mnemonic": "💲 带美元符号$是特殊，SYSVOL也是库（$结尾的是隐藏共享，SYSVOL是域控特有共享，Desktop是普通的）"
  },
  {
    "id": 107,
    "question": "使用共享文件夹时，该文件夹如果位于NTFS分区，其安全性较FAT分区更高。",
    "answer": "A",
    "mnemonic": "🛡️ NTFS保平安，FAT格式不安全（NTFS支持ACL权限控制，FAT只能全开或全关，裸奔不安全）"
  },
  {
    "id": 108,
    "question": "共享文件夹时，权限“允许”的优先级高于权限“拒绝”。",
    "answer": "B",
    "mnemonic": "⛔ 拒绝最大，一票否决，允许也得让路（Windows权限原则：拒绝优于允许）"
  },
  {
    "id": 109,
    "question": "共享文件夹时，权限具有累加性，当用户隶属多个组时，其权限是所有组权限的总和。",
    "answer": "A",
    "mnemonic": "➕ 权限累加如叠罗汉，组越多权限越大（你是A组又是B组，那A和B的权限你都有，取并集）"
  },
  {
    "id": 110,
    "question": "在Windows系统中，UNC表示通用命名约定，一般常用的格式为？",
    "answer": "A",
    "mnemonic": "🛤️ UNC路径双斜杠开头，服务器名加共享名（\\\\Server\\Share，网络路径标准写法）"
  },
  {
    "id": 111,
    "question": "UNC一般可以直接在哪些地方输入进行访问？",
    "answer": "BCD",
    "mnemonic": "🔍 UNC找资源，资源管理器地址栏里填（浏览器、运行框、资源管理器都能解析UNC，记事本只能写不能跳转）"
  },
  {
    "id": 112,
    "question": "Samba服务通常应用于哪些操作系统之间？",
    "answer": "B",
    "mnemonic": "🌉 Samba架起鹊桥会，Windows和Linux成一对（Samba就是在Linux上模拟Windows的SMB协议，实现跨平台共享）"
  },
  {
    "id": 113,
    "question": "Samba是一种网络协议，是一套让UNIX类系统能够应用Microsoft网络通信协议的协议。",
    "answer": "B",
    "mnemonic": "📦 Samba是软件服务，SMB才是协议（Samba是实现协议的软件工具，本身不是协议）"
  },
  {
    "id": 114,
    "question": "Samba服务是由以下哪些进程组成？",
    "answer": "BC",
    "mnemonic": "👯 Samba两兄弟，smbd傻帽和nmbd你妈（smbd管文件传输，nmbd管NetBIOS名字解析）"
  },
  {
    "id": 115,
    "question": "新版的Samba中，nmbd和smbd使用的端口是哪个？",
    "answer": "D",
    "mnemonic": "🚪 新版Samba只要445，试试我（新版直连TCP 445端口，不再依赖老旧的137/138/139）"
  },
  {
    "id": 116,
    "question": "Samba服务的工作过程可以分为以下几个步骤？",
    "answer": "ABCD",
    "mnemonic": "🔄 协商连接访问断开，全套流程一条龙（SMB协议交互标准流程）"
  },
  {
    "id": 117,
    "question": "Samba的配置文件一般放在哪个目录中？",
    "answer": "A",
    "mnemonic": "📂 配置文件找etc，名字就叫samba（Linux配置惯例：/etc/软件名/）"
  },
  {
    "id": 118,
    "question": "Samba的主配置文件名为？",
    "answer": "D",
    "mnemonic": "📄 配置smb，后缀conf，合起来smb.conf（smb是服务名，conf是配置文件后缀）"
  },
  {
    "id": 119,
    "question": "Samba服务的日志文件是？",
    "answer": "BC",
    "mnemonic": "📝 进程是smbd和nmbd，日志名字自然跟着进程走（日志文件通常以进程名命名）"
  },
  {
    "id": 120,
    "question": "通常Samba服务的日志文件保存位置在？",
    "answer": "B",
    "mnemonic": "📂 日志Log一般都在var下的log目录里（Linux标准日志路径：/var/log/）"
  },
  {
    "id": 121,
    "question": "在本课程中NFS指的是New File System，即新型文件系统。",
    "answer": "B",
    "mnemonic": "🚫 NFS是Network网络文件系统，不是New新型（N即Network，专用于网络文件共享）"
  },
  {
    "id": 122,
    "question": "NFS网络文件系统的特点有？",
    "answer": "ACD",
    "mnemonic": "👻 省空间、访问透明像本地、还能设权限（B错在位置变了不影响访问，NFS通过挂载点屏蔽了物理位置差异）"
  },
  {
    "id": 123,
    "question": "NFS服务是基于C/S模式。",
    "answer": "A",
    "mnemonic": "🏗️ 网络服务多半是C/S架构，NFS也不例外（Client挂载，Server提供）"
  },
  {
    "id": 124,
    "question": "NFS服务器是访问输出文件的计算机。",
    "answer": "B",
    "mnemonic": "📤 服务器是给文件的地主，不是访问文件的租客（Server提供资源，Client访问资源，定义反了）"
  },
  {
    "id": 125,
    "question": "NFS客户端是提供输出文件（共享目录文件）的计算机。",
    "answer": "B",
    "mnemonic": "📥 客户端是拿文件的，不是提供文件的（同上，角色搞反了）"
  },
  {
    "id": 126,
    "question": "NFS客户端和NFS服务器通过远程过程调用协议实现数据传输。",
    "answer": "A",
    "mnemonic": "📞 NFS腿脚不好，靠RPC远程过程调用来传信（NFS依赖RPC服务来分配端口和传输指令）"
  },
  {
    "id": 127,
    "question": "NFS服务器开启服务之后会一直主动查找需要连接自己的客户端主机。",
    "answer": "B",
    "mnemonic": "🛋️ 服务器是大爷，坐等客户端来连，绝不主动找人（被动服务模式，只监听不主动）"
  },
  {
    "id": 128,
    "question": "Linux下NFS服务所必需的几个进程是？",
    "answer": "BCD",
    "mnemonic": "🤺 NFS三剑客bind、mount、nfsd（RPCbind做映射，Mountd管挂载，Nfsd管传输，Lock是可选的）"
  },
  {
    "id": 129,
    "question": "rpc.nfsd守护进程的主要作用是？",
    "answer": "B",
    "mnemonic": "💂 nfsd是门卫，检查权限它最累（主要负责验证权限和处理读写请求）"
  },
  {
    "id": 130,
    "question": "rpcbind的主要功能是？",
    "answer": "A",
    "mnemonic": "🪢 Bind就是绑，专门负责绑定映射端口（客户端问rpcbind：NFS在哪？rpcbind指路端口号）"
  },
  {
    "id": 131,
    "question": "Linux系统下的NFS服务，用来处理崩溃系统的锁定恢复的进程是可选进程。",
    "answer": "A",
    "mnemonic": "🚑 恢复进程是备胎，可选安装不强求（rpc.lockd不是必须的，基本功能不靠它）"
  },
  {
    "id": 132,
    "question": "通常Linux系统的NFS服务配置文件是（包括目录）？",
    "answer": "A",
    "mnemonic": "🚢 NFS要出口数据，配置文件当然叫exports（/etc/exports 定义哪些目录导出去）"
  },
  {
    "id": 133,
    "question": "Linux系统的NFS服务，以下哪个对应于“数据会先暂存于内存当中，而非直接写入硬盘”的权限？",
    "answer": "D",
    "mnemonic": "🏃 内存暂存是异步，async快一步（Async异步写入，不等硬盘落盘就返回成功，速度快但有风险）"
  },
  {
    "id": 134,
    "question": "Linux系统的NFS服务，权限ro代表的是？",
    "answer": "B",
    "mnemonic": "👀 ro就是Read Only只读的缩写"
  },
  {
    "id": 135,
    "question": "Linux系统中，NFS服务的“root_squash”权限是指？",
    "answer": "A",
    "mnemonic": "🥕 Squash就是压扁，Root来了也被压成平民匿名用户（安全机制，防止客户端root拥有服务端root权限）"
  },
  {
    "id": 136,
    "question": "在本课程中FTP是指的优先文件传输协议。",
    "answer": "B",
    "mnemonic": "📁 FTP是File Transfer Protocol，F是文件不是优先"
  },
  {
    "id": 137,
    "question": "FTP大大简化了文件传输的复杂性，但是需要注意不同的操作系统之间不能直接进行文件传输。",
    "answer": "B",
    "mnemonic": "🌉 FTP就是为了跨系统传文件生的，要是不能传还玩啥（FTP设计初衷就是解决异构系统传文件难的问题）"
  },
  {
    "id": 138,
    "question": "FTP协议工作的时候，服务端和客户端使用了4个端口，分别是21、20、1031、1032端口。",
    "answer": "B",
    "mnemonic": "🔢 FTP只用21和20，后面那两个1031是瞎编的（21控制端口，20数据端口，其他是随机动态端口）"
  },
  {
    "id": 139,
    "question": "FTP服务有以下几种工作模式？",
    "answer": "CD",
    "mnemonic": "☯️ FTP就两招，主动模式和被动模式（主动模式服务器连你，被动模式你连服务器）"
  },
  {
    "id": 140,
    "question": "如果需要跨网段使用FTP服务器，FTP服务器必须工作在被动模式。",
    "answer": "A",
    "mnemonic": "🧱 跨网防火墙挡道，被动模式才可靠（客户端在防火墙后，服务端主动连不进来，只能客户端被动去连服务端）"
  },
  {
    "id": 141,
    "question": "IIS组件中包括有FTP服务。",
    "answer": "A",
    "mnemonic": "🗑️ 微软IIS是个大筐，Web和FTP都能往里装（IIS不仅有Web Server，也自带FTP Server组件）"
  },
  {
    "id": 142,
    "question": "一般来说，使用浏览器可以直接访问FTP站点。",
    "answer": "A",
    "mnemonic": "🌐 浏览器能看网页，也能顺手看FTP（浏览器支持ftp://协议，能当简易客户端用）"
  },
  {
    "id": 143,
    "question": "Serv-U的特点有哪些？",
    "answer": "ABC",
    "mnemonic": "👍 Serv-U好又多，多协议安全性多客户端（Serv-U是第三方独立软件，不依赖IIS，所以D错）"
  },
  {
    "id": 144,
    "question": "Serv-U是轻量化的FTP服务器，只能进行单站点的FTP服务管理。",
    "answer": "B",
    "mnemonic": "💪 Serv-U虽小功能强，多站管理它在行（Serv-U是专业软件，支持虚拟域，能管很多站点）"
  },
  {
    "id": 145,
    "question": "Serv-U用户按照登录范围分，可以有哪些？",
    "answer": "BD",
    "mnemonic": "🌎 登录范围看大小，域用户和全局用户范围大（域用户在整个域有效，全局用户在所有域有效，本地用户只能本域）"
  },
  {
    "id": 146,
    "question": "Serv-U用户按照来源分类可以有哪些？",
    "answer": "ACD",
    "mnemonic": "📊 来源分三类，自带的、系统的、数据库的（Serv-U自家建的，Windows系统的，ODBC数据库连的）"
  },
  {
    "id": 147,
    "question": "Serv-U是小型FTP服务器，其访问需要使用专用的FTP客户端软件。",
    "answer": "B",
    "mnemonic": "🤝 Serv-U很随和，浏览器也能访，不用非得专用软件（是标准的FTP协议，任何客户端都能连）"
  },
  {
    "id": 148,
    "question": "DHCP是指？",
    "answer": "C",
    "mnemonic": "🏷️ DHCP就是动态主机配置协议，Dynamic Host Config（D=Dynamic动态，C=Configuration配置）"
  },
  {
    "id": 149,
    "question": "以下哪些是DHCP服务能够完成的工作？",
    "answer": "ACD",
    "mnemonic": "🎁 DHCP发三样宝：IP、DNS和网关，端口它不管（端口是应用层分配的，IP层参数才归DHCP管）"
  },
  {
    "id": 150,
    "question": "在DHCP服务机制中，可分为服务器和客户端两个部分。",
    "answer": "A",
    "mnemonic": "🔁 有发IP的服务端，就有收IP的客户端，标准C/S（DHCP Server发放租约，DHCP Client申请租约）"
  },
  {
    "id": 151,
    "question": "DHCP的服务器本身也是一台计算机，也可以使用动态分配的IP地址。",
    "answer": "B",
    "mnemonic": "⚓ 发钱的人自己兜里得稳，DHCP服务器必须用静态IP（服务器IP如果变了，客户端就找不到人续约了）"
  },
  {
    "id": 152,
    "question": "为了防止DHCP冲突，同一子网通常只能包含一台DHCP服务器。",
    "answer": "B",
    "mnemonic": "👥 怕挂掉可以多台做冗余，只要地址池错开就行（可以两台一起发，但发的IP范围不能重叠，避免冲突）"
  },
  {
    "id": 153,
    "question": "DHCP服务器可以使用MAC地址作为判断依据，固定给某计算机网卡设置相同的IP地址。",
    "answer": "A",
    "mnemonic": "📌 认准MAC这张脸，保留固定IP给它选（DHCP保留功能：绑定MAC和IP，实现“伪静态”分配）"
  },
  {
    "id": 154,
    "question": "在CentOS 6系统中如果需要安装DHCP可以使用命令？",
    "answer": "A",
    "mnemonic": "📥 安装软件用yum，名字就叫dhcp（RedHat系用yum/dnf，Debian系用apt，软件名通常是dhcp）"
  },
  {
    "id": 155,
    "question": "在CentOS 6系统中，eth0网卡默认的配置文件是？",
    "answer": "D",
    "mnemonic": "📜 网卡配置路径长，network-scripts脚本里藏（RedHat系特征路径：/etc/sysconfig/network-scripts/ifcfg-网卡名）"
  },
  {
    "id": 156,
    "question": "在CentOS 6系统中，DHCP的主配置文件一般是？",
    "answer": "A",
    "mnemonic": "👿 DHCP配置找dhcpd.conf，注意多了个d守护进程（守护进程名dhcpd，配置文件也带d）"
  },
  {
    "id": 157,
    "question": "在CentOS 6系统的DHCP配置中，MAC地址的表示为？",
    "answer": "D",
    "mnemonic": "🔌 MAC就是硬件以太网，hardware ethernet（配置语法关键字：hardware ethernet xx:xx:xx...）"
  },
  {
    "id": 158,
    "question": "在CentOS 6系统的DHCP配置中，设置IP地址范围的正确示例是？",
    "answer": "B",
    "mnemonic": "🎯 range范围不用option，分号结尾不能忘（语法格式：range start-ip end-ip;）"
  },
  {
    "id": 159,
    "question": "在CentOS 6系统的DHCP配置中，设置网关地址正确的示例是？",
    "answer": "A",
    "mnemonic": "🚪 网关就是路由器，option routers（DHCP选项里，网关被称为routers路由器）"
  },
  {
    "id": 160,
    "question": "Web服务也就是我们说的World Wide Web服务，这是互联网上现在应用最多的服务之一。",
    "answer": "A",
    "mnemonic": "🕷️ 万维网Web应用多，这个常识不会错（HTTP/HTTPS是互联网流量的大头）"
  },
  {
    "id": 161,
    "question": "Apache是世界使用排名第一的Web服务器软件，只能在类Linux系统下使用。",
    "answer": "B",
    "mnemonic": "💪 Apache虽然强，Windows也能扛（Apache跨平台，Windows/Linux都能跑）"
  },
  {
    "id": 162,
    "question": "URL地址就是网络地址。",
    "answer": "B",
    "mnemonic": "🔗 URL是统一资源定位符，不仅仅是IP地址（URL包含了协议、域名/IP、路径，信息量比IP网络地址大得多）"
  },
  {
    "id": 163,
    "question": "Web服务器只能使用的服务端口80。",
    "answer": "B",
    "mnemonic": "🔢 80是默认，想改多少改多少，8080也很香（端口是可以配置的，80只是HTTP的约定俗成）"
  },
  {
    "id": 164,
    "question": "在输入URL地址的时候其端口可以省略。",
    "answer": "B",
    "mnemonic": "🚫 只有默认端口80才能省，别的省了就找不到家了（浏览器默认访问80，如果服务器改了端口必须手动加上）"
  },
  {
    "id": 165,
    "question": "Apache服务器的主配置文件是？",
    "answer": "A",
    "mnemonic": "⚙️ Apache配置叫httpd.conf，藏在conf目录中（主进程httpd，配置文件httpd.conf）"
  },
  {
    "id": 166,
    "question": "Apache实现虚拟主机的方式有？",
    "answer": "ABD",
    "mnemonic": "🪓 虚拟主机三板斧：IP、端口、主机名（MAC是二层地址，Web服务在七层，管不着MAC）"
  },
  {
    "id": 167,
    "question": "Apache实现虚拟主机的方式中最常使用的是？",
    "answer": "D",
    "mnemonic": "🏷️ IP端口都稀缺，唯有主机名无限，最常用（基于域名的虚拟主机，能让一个IP跑无数个网站）"
  },
  {
    "id": 168,
    "question": "网络地址中的本地地址的特点有哪些？",
    "answer": "ABC",
    "mnemonic": "🏠 本地地址私家用，不申请、自分配、内部跑（私有IP不路由到公网，所以不需要机构分配，内部随便用）"
  },
  {
    "id": 169,
    "question": "所有的路由器，对目的地址是专用地址的数据报一律不进行转发。",
    "answer": "B",
    "mnemonic": "🚦 内网路由器肯定转发，只有公网路由器才拦截私有地址（内网互通需要转发私有IP，公网才会丢弃私有IP包）"
  },
  {
    "id": 170,
    "question": "以下不属于专用IP地址的是？",
    "answer": "D",
    "mnemonic": "🚫 172.16到31是私有，32超标了就是公网IP（私有B类范围：172.16.x.x - 172.31.x.x，32出界了）"
  },
  {
    "id": 171,
    "question": "利用公用的互联网作为本机构各专用网之间的通信载体，这样的专用网又称为虚拟专用网VPN。",
    "answer": "A",
    "mnemonic": "🚄 公网当载体，虚拟连两地，这就是VPN（VPN的核心就是Over Internet构建专用网络）"
  },
  {
    "id": 172,
    "question": "在内部主机与外部主机通信时，哪种状态下NAT路由器上数据报的源地址被替换？",
    "answer": "A",
    "mnemonic": "🎭 出门离开专用网，必须换马甲替换源地址（SNAT：出去的时候把私有源IP换成公网源IP，才能收到回包）"
  },
  {
    "id": 173,
    "question": "网络防火墙通常可以分为以下几类？",
    "answer": "BCD",
    "mnemonic": "🔥 包过滤、做代理、查状态，防火墙三招鲜（A规则过滤包含在包过滤里，不是独立分类）"
  },
  {
    "id": 174,
    "question": "包过滤防火墙可依据的基本信息有哪些？",
    "answer": "ABCD",
    "mnemonic": "📝 包头信息全都要，源目IP、端口、协议一个不能少（防火墙看的就是IP头和TCP/UDP头里的五元组）"
  },
  {
    "id": 175,
    "question": "Netfilter是Linux核心中的一个通用架构，它提供了一系列的“表”，每个表中有一条或数条“规则”组成。",
    "answer": "B",
    "mnemonic": "🔗 表里包含的是链，链里才是规则，层级不能乱（层级结构：Table表 -> Chain链 -> Rule规则）"
  },
  {
    "id": 176,
    "question": "目前Linux系统中普遍使用Netfilter/iptables IP数据包过滤系统，以下选项中不属于“链”的是？",
    "answer": "D",
    "mnemonic": "⛓️ Input、Forward、Prerouting都是链，Port是端口不是链（链Chain代表数据包的处理阶段，Port只是匹配条件）"
  },
  {
    "id": 177,
    "question": "Netfilter/iptables IP数据包过滤系统中，Netfilter里面没有以下哪个表？",
    "answer": "D",
    "mnemonic": "🚫 iptables四张表raw、mangle、nat、filter，根本没有rules表（Rule是表里的内容，不是表的名字）"
  },
  {
    "id": 178,
    "question": "在DNS系统中，反向解析指的是？",
    "answer": "A",
    "mnemonic": "↩️ 反向就是反着来，IP换域名（IP -> Domain）"
  },
  {
    "id": 179,
    "question": "HOSTS文件是比较老的域名查询文件，在现今的操作系统中一般都不再用它。",
    "answer": "B",
    "mnemonic": "🛡️ HOSTS虽老仍有用，屏蔽广告全靠它（系统依然优先读取Hosts，优先级高于DNS服务器）"
  },
  {
    "id": 180,
    "question": "NetBIOS名称解析，广播方式只能解析本网段的NetBIOS名称。",
    "answer": "A",
    "mnemonic": "📣 广播喊话传不远，只能网段内部喊（因为路由器默认拦截广播包，所以只能覆盖本地网段）"
  },
  {
    "id": 181,
    "question": "WINS组件一般包括有？",
    "answer": "ABCD",
    "mnemonic": "🍔 WINS全家桶，服务器客户端代理数据库全都要"
  },
  {
    "id": 182,
    "question": "以下哪条命令可显示和查看客户端域名解析程序缓存？",
    "answer": "D",
    "mnemonic": "📺 查看显示是display，displaydns错不了"
  },
  {
    "id": 183,
    "question": "对于仅有一个网段的独立局域网，没有必要部署WINS服务。",
    "answer": "A",
    "mnemonic": "🗣️ 单网段吼一声就行，部署WINS纯属脱裤子放屁（WINS就是为了解决跨网段广播失效的问题，单网段不需要）"
  },
  {
    "id": 184,
    "question": "与关系型数据库相比，目录数据库特点如下？",
    "answer": "ABCD",
    "mnemonic": "🌳 目录就是电话本，读快写慢树状根，唯一性要保真（LDAP特性：层级结构、读优于写、对象名DN唯一）"
  },
  {
    "id": 185,
    "question": "Linux平台常用的目录服务软件是？",
    "answer": "C",
    "mnemonic": "🔓 Linux开源选Open，OpenLDAP最正身（OpenLDAP是Linux下最主流的目录服务）"
  },
  {
    "id": 186,
    "question": "Active Directory建立在域的基础上，由域控制器对网络中的资源实行集中管理和控制。",
    "answer": "A",
    "mnemonic": "🕹️ AD域控最集中，管理资源很轻松"
  },
  {
    "id": 187,
    "question": "Active Directory的功能不包括以下哪些选项？",
    "answer": "D",
    "mnemonic": "💿 AD不管修硬盘，逻辑卷管理那是磁盘管理的事"
  },
  {
    "id": 188,
    "question": "Active Directory对象可分为几种类型？",
    "answer": "AB",
    "mnemonic": "📦 要么容器装东西，要么非容器被装，就这两类"
  },
  {
    "id": 189,
    "question": "Active Directory对象的主要类别不包括以下的哪一项？",
    "answer": "C",
    "mnemonic": "🔢 对象是实体人或电脑，密码只是个属性，不单独算对象"
  },
  {
    "id": 190,
    "question": "域中包括以下几类的计算机？",
    "answer": "ABC",
    "mnemonic": "🖥️ 域控成员工作站，笔记本是硬件形态不算角色"
  },
  {
    "id": 191,
    "question": "规划Windows网络结构时，通常有哪几种工作方式？",
    "answer": "AB",
    "mnemonic": "🏢 Windows网络两巨头，工作组和域"
  },
  {
    "id": 192,
    "question": "域控制器作为域中最重要的服务器，不允许它降级为成员服务器。",
    "answer": "B",
    "mnemonic": "📉 域控也能被贬职，降级成普通成员服务器未尝不可"
  },
  {
    "id": 193,
    "question": "本课程中LDAP是指？",
    "answer": "A",
    "mnemonic": "🪶 L就是Light轻，轻量级目录访问协议"
  },
  {
    "id": 194,
    "question": "文件服务器的部署主要考虑的因素有？",
    "answer": "ABD",
    "mnemonic": "🔒 速度容量安全性，三者缺一不可"
  },
  {
    "id": 195,
    "question": "使用PC机就能非常快速地建立文件服务器。",
    "answer": "A",
    "mnemonic": "⚡ PC也能当服务器，快速建立没问题"
  },
  {
    "id": 196,
    "question": "硬件打印服务器有别于软件打印服务器，可以不用网络地址实现多用户打印。",
    "answer": "B",
    "mnemonic": "🖨️ 没IP地址怎么连网络，硬件打印也要网卡和IP"
  },
  {
    "id": 197,
    "question": "Windows计算机将所连接的打印机共享出来，就可成为软件打印服务器。",
    "answer": "A",
    "mnemonic": "🧙 电脑共享打印机，摇身一变就是软件打印服务器"
  },
  {
    "id": 198,
    "question": "Windows操作系统通常默认使用哪个协议来实现文件和打印共享？",
    "answer": "D",
    "mnemonic": "🤝 Windows共享靠什么，傻帽SMB和媳妇CIFS"
  },
  {
    "id": 199,
    "question": "文件服务器的核心功能是文件共享，在Windows系统中是通过共享文件夹实现的。",
    "answer": "A",
    "mnemonic": "📂 文件服务核心是共享，Windows靠文件夹共享来实现"
  },
  {
    "id": 200,
    "question": "文件服务器的配置管理工作包括有？",
    "answer": "ABC",
    "mnemonic": "🔧 管文件管权限管用户，磁盘分区那是硬件层面的事"
  },
  {
    "id": 201,
    "question": "一般情况下，哪些组成员能够配置管理共享文件夹？",
    "answer": "CD",
    "mnemonic": "👮 只有管理Admin和操作员Operator才有权限管闲事"
  },
  {
    "id": 202,
    "question": "以下共享名属于特殊共享资源的有？",
    "answer": "ACD",
    "mnemonic": "💲 带美元符号$是特殊，SYSVOL也是库，桌面Desktop那是普通文件夹"
  },
  {
    "id": 203,
    "question": "使用共享文件夹时，该文件夹如果位于NTFS分区，其安全性较FAT分区更高。",
    "answer": "A",
    "mnemonic": "🛡️ NTFS保平安，FAT格式不安全"
  },
  {
    "id": 204,
    "question": "共享文件夹时，权限“允许”的优先级高于权限“拒绝”。",
    "answer": "B",
    "mnemonic": "⛔ 拒绝最大，一票否决，允许也得让路"
  },
  {
    "id": 205,
    "question": "共享文件夹时，权限具有累加性，当用户隶属多个组时，其权限是所有组权限的总和。",
    "answer": "A",
    "mnemonic": "➕ 权限累加如叠罗汉，组越多权限越大"
  },
  {
    "id": 206,
    "question": "在Windows系统中，UNC表示通用命名约定，一般常用的格式为？",
    "answer": "A",
    "mnemonic": "🛤️ UNC路径双斜杠开头，服务器名加共享名"
  },
  {
    "id": 207,
    "question": "UNC一般可以直接在哪些地方输入进行访问？",
    "answer": "BCD",
    "mnemonic": "🔍 UNC找资源，资源管理器地址栏里填，文本文件不行"
  },
  {
    "id": 208,
    "question": "Samba服务通常应用于哪些操作系统之间？",
    "answer": "B",
    "mnemonic": "🐧 Samba架起鹊桥会，Windows和Linux成一对"
  },
  {
    "id": 209,
    "question": "Samba是一种网络协议，是一套让UNIX类系统能够应用Microsoft网络通信协议的协议。",
    "answer": "B",
    "mnemonic": "📦 Samba是软件服务，SMB才是协议，不要搞混"
  },
  {
    "id": 210,
    "question": "Samba服务是由以下哪些进程组成？",
    "answer": "BC",
    "mnemonic": "👯 Samba两兄弟，smbd傻帽和nmbd你妈"
  },
  {
    "id": 211,
    "question": "新版的Samba中，nmbd和smbd使用的端口是哪个？",
    "answer": "D",
    "mnemonic": "🚪 新版Samba只要445，试试我"
  },
  {
    "id": 212,
    "question": "Samba服务的工作过程可以分为以下几个步骤？",
    "answer": "ABCD",
    "mnemonic": "🔄 协商连接访问断开，全套流程一条龙"
  },
  {
    "id": 213,
    "question": "Samba的配置文件一般放在哪个目录中？",
    "answer": "A",
    "mnemonic": "📂 配置文件找etc，名字就叫samba"
  },
  {
    "id": 214,
    "question": "Samba的主配置文件名为？",
    "answer": "D",
    "mnemonic": "📄 配置smb，后缀conf，合起来smb.conf"
  },
  {
    "id": 215,
    "question": "通常Samba服务的日志文件保存位置在？",
    "answer": "B",
    "mnemonic": "📝 日志Log一般都在var下的log目录里"
  },
  {
    "id": 216,
    "question": "在本课程中NFS指的是New File System，即新型文件系统。",
    "answer": "B",
    "mnemonic": "🚫 NFS是Network网络文件系统，不是New新型"
  },
  {
    "id": 217,
    "question": "NFS网络文件系统的特点有？",
    "answer": "ACD",
    "mnemonic": "👻 省空间、访问透明像本地、还能设权限"
  },
  {
    "id": 218,
    "question": "NFS服务是基于C/S模式。",
    "answer": "A",
    "mnemonic": "🏗️ 网络服务多半是C/S架构，NFS也不例外"
  },
  {
    "id": 219,
    "question": "NFS服务器是访问输出文件的计算机。",
    "answer": "B",
    "mnemonic": "📤 服务器是给文件的地主，不是访问文件的租客"
  },
  {
    "id": 220,
    "question": "NFS客户端是提供输出文件（共享目录文件）的计算机。",
    "answer": "B",
    "mnemonic": "📥 客户端是拿文件的，不是提供文件的"
  },
  {
    "id": 221,
    "question": "NFS客户端和NFS服务器通过远程过程调用协议实现数据传输。",
    "answer": "A",
    "mnemonic": "📞 NFS腿脚不好，靠RPC远程过程调用来传信"
  },
  {
    "id": 222,
    "question": "NFS服务器开启服务之后会一直主动查找需要连接自己的客户端主机。",
    "answer": "B",
    "mnemonic": "🛋️ 服务器是大爷，坐等客户端来连，绝不主动找人"
  },
  {
    "id": 223,
    "question": "Linux下NFS服务所必需的几个进程是？",
    "answer": "BCD",
    "mnemonic": "🤺 NFS三剑客bind、mount、nfsd"
  },
  {
    "id": 224,
    "question": "rpc.nfsd守护进程的主要作用是？",
    "answer": "B",
    "mnemonic": "💂 nfsd是门卫，检查权限它最累"
  },
  {
    "id": 225,
    "question": "rpcbind的主要功能是？",
    "answer": "A",
    "mnemonic": "🪢 Bind就是绑，专门负责绑定映射端口"
  },
  {
    "id": 226,
    "question": "Linux系统下的NFS服务，用来处理崩溃系统的锁定恢复的进程是可选进程。",
    "answer": "A",
    "mnemonic": "🚑 恢复进程是备胎，可选安装不强求"
  },
  {
    "id": 227,
    "question": "通常Linux系统的NFS服务配置文件是（包括目录）？",
    "answer": "A",
    "mnemonic": "🚢 NFS要出口数据，配置文件当然叫exports"
  },
  {
    "id": 228,
    "question": "Linux系统的NFS服务，以下哪个对应于“数据会先暂存于内存当中，而非直接写入硬盘”的权限？",
    "answer": "D",
    "mnemonic": "🏃 内存暂存是异步，async快一步"
  },
  {
    "id": 229,
    "question": "Linux系统的NFS服务，权限ro代表的是？",
    "answer": "B",
    "mnemonic": "👀 ro就是Read Only只读的缩写"
  },
  {
    "id": 230,
    "question": "Linux系统中，NFS服务的“root_squash”权限是指？",
    "answer": "A",
    "mnemonic": "🥕 Squash就是压扁，Root来了也被压成平民匿名用户"
  },
  {
    "id": 231,
    "question": "在本课程中FTP是指的优先文件传输协议。",
    "answer": "B",
    "mnemonic": "📁 FTP是File Transfer Protocol，F是文件不是优先"
  },
  {
    "id": 232,
    "question": "FTP大大简化了文件传输的复杂性，但是需要注意不同的操作系统之间不能直接进行文件传输。",
    "answer": "B",
    "mnemonic": "🌉 FTP就是为了跨系统传文件生的，要是不能传还玩啥"
  },
  {
    "id": 233,
    "question": "FTP协议工作的时候，服务端和客户端使用了4个端口，分别是21、20、1031、1032端口。",
    "answer": "B",
    "mnemonic": "🔢 FTP只用21和20，后面那两个1031是瞎编的"
  },
  {
    "id": 234,
    "question": "FTP服务有以下几种工作模式？",
    "answer": "CD",
    "mnemonic": "☯️ FTP就两招，主动模式和被动模式"
  },
  {
    "id": 235,
    "question": "如果需要跨网段使用FTP服务器，FTP服务器必须工作在被动模式。",
    "answer": "A",
    "mnemonic": "🧱 跨网防火墙挡道，被动模式才可靠"
  },
  {
    "id": 236,
    "question": "IIS组件中包括有FTP服务。",
    "answer": "A",
    "mnemonic": "🗑️ 微软IIS是个大筐，Web和FTP都能往里装"
  },
  {
    "id": 237,
    "question": "一般来说，使用浏览器可以直接访问FTP站点。",
    "answer": "A",
    "mnemonic": "🌐 浏览器能看网页，也能顺手看FTP"
  },
  {
    "id": 238,
    "question": "Serv-U的特点有哪些？",
    "answer": "ABC",
    "mnemonic": "👍 Serv-U好又多，多协议安全性多客户端"
  },
  {
    "id": 239,
    "question": "Serv-U是轻量化的FTP服务器，只能进行单站点的FTP服务管理。",
    "answer": "B",
    "mnemonic": "💪 Serv-U虽小功能强，多站管理它在行"
  },
  {
    "id": 240,
    "question": "Serv-U用户按照登录范围分，可以有哪些？",
    "answer": "BD",
    "mnemonic": "🌎 登录范围看大小，域用户和全局用户范围大"
  },
  {
    "id": 241,
    "question": "Serv-U用户按照来源分类可以有哪些？",
    "answer": "ACD",
    "mnemonic": "📊 来源分三类，自带的、系统的、数据库的"
  },
  {
    "id": 242,
    "question": "Serv-U是小型FTP服务器，其访问需要使用专用的FTP客户端软件。",
    "answer": "B",
    "mnemonic": "🤝 Serv-U很随和，浏览器也能访，不用非得专用软件"
  },
  {
    "id": 243,
    "question": "DHCP是指？",
    "answer": "C",
    "mnemonic": "🏷️ DHCP就是动态主机配置协议，Dynamic Host Config"
  },
  {
    "id": 244,
    "question": "以下哪些是DHCP服务能够完成的工作？",
    "answer": "ACD",
    "mnemonic": "🎁 DHCP发三样宝：IP、DNS和网关，端口它不管"
  }
]