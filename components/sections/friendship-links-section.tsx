import { AsciiArt } from "@/components/ascii-art";
import { ExternalLink } from "lucide-react";

export function FriendshipLinksSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="links" />

      <div className="space-y-6">
        <div className="p-4 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold mb-3">友情链接</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* University Security Teams */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-primary/80">博客</h4>
              <ul className="space-y-2">
                <FriendLink
                  name="Natro92的博客"
                  url="https://natro92.fun/"
                  description="Natro92发布的文章"
                />
                <FriendLink
                  name="Boogipop的博客"
                  url="https://www.boogipop.com/"
                  description="Boogipop的博客"
                />
              </ul>
            </div>

            {/* Security Organizations */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-primary/80">
                安全组织与平台
              </h4>
              <ul className="space-y-2">
                <FriendLink
                  name="先知社区"
                  url="https://xz.aliyun.com/"
                  description="阿里云安全技术社区"
                />
                <FriendLink
                  name="安全客"
                  url="https://www.anquanke.com/"
                  description="专注于网络安全资讯的平台"
                />
                <FriendLink
                  name="FreeBuf"
                  url="https://www.freebuf.com/"
                  description="国内领先的网络安全行业门户"
                />
                <FriendLink
                  name="看雪论坛"
                  url="https://bbs.pediy.com/"
                  description="致力于软件安全与逆向研究"
                />
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold mb-3">安全资源</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CTF Platforms */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-primary/80">CTF平台</h4>
              <ul className="space-y-2">
                <FriendLink
                  name="CTFtime"
                  url="https://ctftime.org/"
                  description="全球CTF比赛信息与排名"
                />
                <FriendLink
                  name="BUUOJ"
                  url="https://buuoj.cn/"
                  description="国内知名CTF训练平台"
                />
                <FriendLink
                  name="攻防世界"
                  url="https://adworld.xctf.org.cn/"
                  description="XCTF联赛的线上训练平台"
                />
                <FriendLink
                  name="HackTheBox"
                  url="https://www.hackthebox.com/"
                  description="国际知名网络安全训练平台"
                />
              </ul>
            </div>

            {/* Learning Resources */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-primary/80">
                学习资源
              </h4>
              <ul className="space-y-2">
                <FriendLink
                  name="OWASP"
                  url="https://owasp.org/"
                  description="开放式Web应用安全项目"
                />
                <FriendLink
                  name="PortSwigger Web Security Academy"
                  url="https://portswigger.net/web-security"
                  description="Web安全学习平台"
                />
                <FriendLink
                  name="Awesome-Hacking"
                  url="https://github.com/Hack-with-Github/Awesome-Hacking"
                  description="黑客技术资源集合"
                />
                <FriendLink
                  name="SecWiki"
                  url="https://www.sec-wiki.com/"
                  description="安全百科与知识库"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for individual links
function FriendLink({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description: string;
}) {
  return (
    <li className="flex items-start">
      <span className="text-primary mr-2">•</span>
      <div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium flex items-center hover:text-primary transition-colors"
        >
          {name}
          <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
        </a>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
