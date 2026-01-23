# Pwn方向前置准备-二进制基础与工具使用

## Part0 **PWN**？

### 概述

•破解、利用成功（程序的二进制漏洞）

•攻破（设备、服务器）

•控制（设备、服务器）

### 一次简单的hack

•exploit

•用于攻击的脚本与方案

•payload

•攻击载荷，是目标进程被劫持控制流的数据

•shellcode

•调用攻击目标的shell的代码

## Part1 二进制基础

### 程序的编译与链接

从C源代码到可执行文件的生成过程

•编译：由C语言代码生成汇编代码

•汇编：由汇编代码生成机器码

•链接：将多个机器码的目标文件链接成一个可执行文件

![image-20250114223355978](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223355978.png)

![image-20250114223433740](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223433740.png)

### Linux下的可执行文件格式ELF

#### 什么是可执行文件？

•广义：文件中的数据是可执行代码的文件

•.out、.exe、.sh、.py

•狭义：文件中的数据是机器码的文件

•.out、.exe、.dll、.so

#### 可执行文件的分类

•Windows：PE（Portable Executable）

•可执行程序：.exe

•动态链接库：.dll

•静态链接库：.lib

•Linux：ELF（Executable and Linkable Format）

•可执行程序：.out

•动态链接库：.so

•静态链接库：.a

#### ELF 文件结构

![image-20250114223616715](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223616715.png)

•ELF文件头表（ELF header）：记录了ELF文件的组织结构

•程序头表/段表（Program header table）：告诉系统如何创建进程，生成进程的可执行文件必须拥有此结构：重定位文件不一定需要

•节头表（Section header table）：记录了ELF文件的节区信息，用于链接的目标文件必须拥有此结构，其它类型目标文件不一定需要

![image-20250114223753387](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223753387.png)

#### 磁盘中的ELF（可执行文件）与内存中的ELF（进程内存映像）

![image-20250114223813673](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223813673.png)

![image-20250114223840428](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223840428.png)

### 进程虚拟地址空间

#### ELF文件到虚拟地址空间的映射

![image-20250114223847702](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114223847702.png)

地址以字节编码 1Byte = 8bits

常以16进制表示 0x3c = 0011 1100 

虚拟内存用户空间每个进程一份

虚拟内存内核空间所有进程共享一份

虚拟内存 mmap 段中的动态链接库仅在物理内存中装载一份

![image-20250114224206925](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224206925.png)

![image-20250114224216452](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224216452.png)

#### 段（segment）与节（section）

> •一个 段 包含多个 节
>
> •段视图用于进程的内存区域的 rwx权限划分
>
> •节视图用于ELF文件 编译链接时 与 在磁盘上存储时 的文件结构的组织

**代码段（Text segment）包含了代码与只读数据**

•.text 节

•.rodata 节 

•.hash 节 														

•.dynsym 节 

•.dynstr 节 

•.plt 节

•.rel.got 节 

•……

**数据段（Data segment）包含了可读可写数据**

•.data 节 

•.dynamic 节 

•.got 节 

•.got.plt 节

•.bss 节

•……

**栈段（Stack segment）**

#### 程序数据是如何在内存中组织的

![image-20250114224423196](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224423196.png)

### 程序的装载与进程的执行

#### 大端序与小端序

![image-20250114224441210](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224441210.png)

**小端序**

•低地址存放数据低位、高地址存放数据高位

•我们所主要关注的格式

![image-20250114224459623](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224459623.png)

**大端序**

•低地址存放数据高位、高地址存放数据低位

#### 进程的执行过程

![image-20250114224551909](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224551909.png)

#### 寄存器结构

**amd64寄存器结构**

•rax： 8Bytes

•eax：4Bytes

•ax： 2Bytes

•ah： 1Bytes

•al：  1Bytes

**部分寄存器的功能**

•RIP：存放当前执行的指令的地址

•RSP:存放当前栈帧的栈顶地址

•RB:•存放当前栈帧的栈底地址

•RA:•通用寄存器。存放函数返回值

![image-20250114224805276](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224805276.png)

#### 静态链接的程序的执行过程

![image-20250114224822561](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224822561.png)

#### 动态链接的程序的执行过程

![image-20250114224845326](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114224845326.png)



### x86&amd64汇编简述

#### 常用汇编指令

```asm
•MOV 		JMP 	    XOR/AND

•LEA	    J[Condition]

•ADD/SUB    CALL

•PUSH 		LEAVE

•POP    	RET

•CMP		INC/DEC
```

##### MOV

```asm
MOV DEST, SRC         ; 把源操作数传送给目标

MOV EAX,1234H 		  ; 执行结果（EAX） = 1234H
MOV EBX, EAX 
MOV EAX, [00404011H]  ; [ ] 表示取地址内的值
MOV EAX, [ESI]  
```

##### LEA

```asm
LEA REG, SRC                    ; 把源操作数的有效地址送给指定的寄存器
LEA EBX, ASC                    ; 取 ASC 的地址存放至 EBX 寄存器中
LEA EAX, 6[ESI]                 ; 把 ESI+6 单元的32位地址送给 EAX 
```

##### ADD/SUB

```asm
ADD/SUB DEST, SRC                ;将源操作数的值加/减到目标操作数
ADD AX, 3		 				 ; AX = AX + 3 
ADD AX,[0xdeadbeef]				 ; AX = AX + [0Xdeadbeef]
SUB  AX,3						 ; AX = AX  - 3
```

##### INC/DEC

```asm
INC/DEC REG                    	 ;将指定寄存器的值增加/减少 1
```

##### PUSH/POP

```asm
PUSH VALUE                 	     ; 把目标值压栈，同时SP指针-1字长
PUSH 1234H 
PUSH EAX

POP DEST                     	 ; 将栈顶的值弹出至目的存储位置，同时SP指针+1字长
POP EAX
```

##### LEAVE

```asm
在函数返回时，恢复父函数栈帧的指令
等效于：
MOV ESP, EBP
POP EBP
```

##### RET

```asm
在函数返回时，控制程序执行流返回父函数的指令
等效于：
POP RIP（这条指令实际是不存在的，不能直接向RIP寄存器传送数据）

```

#### 两种汇编格式

![image-20250114225635311](https://raw.githubusercontent.com/iam0range/picgo/main/image-20250114225635311.png)


## <font style="color:#DF2A3F;">函数调用栈</font>
•<font style="color:#1a1a1a;">函数调用栈是指程序运行时内存一段连续的区域</font>

•<font style="color:#1a1a1a;">用来保存函数运行时的状态信息，包括函数参数与局部变量等</font>

•<font style="color:#1a1a1a;">称之为“栈”是因为发生函数调用时，调用函数（</font><font style="color:#1a1a1a;">caller</font><font style="color:#1a1a1a;">）的状态被保存在栈内，被调用函数（</font><font style="color:#1a1a1a;">callee</font><font style="color:#1a1a1a;">）的状态被压入调用栈的栈顶</font>

•<font style="color:#1a1a1a;">在函数调用结束时，栈顶的函数（</font><font style="color:#1a1a1a;">callee</font><font style="color:#1a1a1a;">）状态被弹出，栈顶恢复到调用函数（</font><font style="color:#1a1a1a;">caller</font><font style="color:#1a1a1a;">）的状态</font>

•<font style="color:#1a1a1a;">函数调用栈在内存中从高地址向低地址生长，所以栈顶对应的内存地址在压栈时变小，退栈时变大</font>

### <font style="color:black;">栈帧结构概览</font>
<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139603658-d857c5a7-4335-416c-9e84-87fbccf3e590.png)


### 函数调用栈过程
#### 1
•<font style="color:#1a1a1a;">函数状态主要涉及三个寄存器 —— esp，ebp，eip。esp用来存储函数调用栈的栈顶地址，在压栈和退栈时发生变化。ebp用来存储当前函数状态的基地址，在函数运行时不变，可以用来索引确定函数参数或局部变量的位置。eip用来存储即将执行的程序指令的地址，cpu依照 eip的存储内容读取指令并执行，eip随之指向相邻的下一条指令，如此反复，程序就得以连续执行指令。</font>

•<font style="color:#1a1a1a;">下面让我们来看看发生函数调用时，栈顶函数状态以及上述寄存器的变化。变化的核心任务是将调用函数（caller）的状态保存起来，同时创建被调用函数（callee）的状态。  
</font><!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139691589-18a3342f-3074-4d84-8acb-542c22dc2564.png)

•<font style="color:#1a1a1a;">首先将被调用函数（callee）的参数按照逆序依次压入栈内。如果被调用函数（callee）不需要参数，则没有这一步骤。这些参数仍会保存在调用函数（caller）的函数状态内，之后压入栈内的数据都会作为被调用函数（callee）的函数状态来保存。</font>

#### <font style="color:#1a1a1a;">2</font>
<font style="color:#1a1a1a;">然后将调用函数（caller）进行调用之后的下一条指令地址作为返回地址压入栈内。这样调用函数（caller）的 eip（指令）信息得以保存。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139734077-53312064-870b-4bf2-977a-8ec8b714b706.png)

#### 3
<font style="color:#1a1a1a;">再将当前的ebp寄存器的值（也就是调用函数的基地址）压入栈内，并将 ebp寄存器的值更新为当前栈顶的地址。这样调用函数（caller）的 ebp（基地址）信息得以保存。同时，ebp被更新为被调用函数（callee）的基地址。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139771941-4f130db0-9388-46f1-b1e2-402e17ac2b4f.png)

#### 4
<font style="color:#1a1a1a;">再之后是将被调用函数（callee）的局部变量等数据压入栈内。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139813329-27e6aa7a-7c1a-4a6a-ba17-c2c86918b078.png)

#### 5
•<font style="color:#1a1a1a;">在压栈的过程中，esp寄存器的值不断减小（对应于栈从内存高地址向低地址生长）。压入栈内的数据包括调用参数、返回地址、调用函数的基地址，以及局部变量，其中调用参数以外的数据共同构成了被调用函数（callee）的状态。在发生调用时，程序还会将被调用函数（callee）的指令地址存到 eip寄存器内，这样程序就可以依次执行被调用函数的指令了。</font>

•<font style="color:#1a1a1a;">看过了函数调用发生时的情况，就不难理解函数调用结束时的变化。变化的核心任务是丢弃被调用函数（callee）的状态，并将栈顶恢复为调用函数（caller）的状态。</font>

•<font style="color:#1a1a1a;">首先被调用函数的局部变量会从栈内直接弹出，栈顶会指向被调用函数（callee）的基地址。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139855260-4fc8fe79-42c8-4306-88fc-96dc64422bc5.png)

#### 6
<font style="color:#1a1a1a;">然后将基地址内存储的调用函数（caller）的基地址从栈内弹出，并存到 ebp寄存器内。这样调用函数（caller）的 ebp（基地址）信息得以恢复。此时栈顶会指向返回地址。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139899239-9f35efdc-49f8-47cf-a5e1-c404ba52dfa2.png)

#### 7
•<font style="color:#1a1a1a;">再将返回地址从栈内弹出，并存到 eip寄存器内。这样调用函数（caller）的 eip（指令）信息得以恢复。</font>

•<font style="color:black;">至此调用函数（caller）的函数状态就全部恢复了，之后就是继续执行调用函数的指令了。</font>

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/56806197/1769139944209-7cd85538-e5d6-460a-964e-cf79f36a9537.png)

### 传参
•<font style="color:#c00000;">x86</font>

•<font style="color:black;">使用栈来传递参数</font>

•<font style="color:black;">使用 </font><font style="color:black;">eax</font><font style="color:black;">存放返回值</font>

•<font style="color:#c00000;">amd64</font>

•<font style="color:black;">前</font><font style="color:black;">6</font><font style="color:black;">个参数依次存放于 </font><font style="color:black;">rdi</font><font style="color:black;">、</font><font style="color:black;">rsi</font><font style="color:black;">、</font><font style="color:black;">rdx</font><font style="color:black;">、</font><font style="color:black;">rcx</font><font style="color:black;">、</font><font style="color:black;">r8</font><font style="color:black;">、</font><font style="color:black;">r9 </font><font style="color:black;">寄存器中</font>

<font style="color:black;">第7个以后的参数存放于栈中</font>



## Part3 PWN Tools

```asm
IDA Pro
pwntools
pwndbg
checksec
ROPgadget
one_gadget
LibcSearcher
main_arena_offset
```

