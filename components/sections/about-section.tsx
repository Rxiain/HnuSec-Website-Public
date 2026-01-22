import { AsciiArt } from "@/components/ascii-art"
import { AsciiPortraitComparison } from "@/components/ascii-portrait-comparison"
import { QrCode } from "@/components/qr-code"

export function AboutSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="about" />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/5">
          <AsciiPortraitComparison />
          <div className="text-center text-xs text-muted-foreground mt-2">
            <span className="text-primary/60">团队简介</span>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <QrCode />
            <p className="text-xs text-muted-foreground">扫码关注公众号</p>
          </div>
        </div>

        <div className="space-y-3 md:w-3/5">
          <p>
            HnuSec - 海南大学网安实验室 是隶属于海南大学网络空间安全学院,由海南大学网络空间安全协会的优秀会员们组建的网络安全团队，
            于2018年12月正式成立，是HDCTF网络安全技能挑战赛的举办者，
            现由曹春杰院长、周晓谊副院长、徐紫枫系主任、王隆娟老师指导
          </p>

          <div className="mt-2 p-3 border border-primary/20 rounded bg-primary/5">
            <h3 className="text-primary font-bold mb-2">关于我们</h3>
            <div className="space-y-2 text-sm">
              <p>
                实验室现活跃成员20余人，为海南大学本科生、研究生，涉猎Web渗透、漏洞研究、逆向分析、密码算法等多个领域；
              </p>

              <p>
                团队成员活跃于国内各项大型CTF竞赛及网络攻防演练活动，取得了优异的成绩。
              </p>

              <p>
                历届实验室成员毕业后除考研、保研外，均有在快手、美团、百度等甲方大厂
              </p>

              <p>
                更有在北京绿盟、杭州安恒、上海奇安信、深圳深信服等国内知名网络安全企业任职。
              </p>

              <p>
                💬 我们不是一群孤独的 hacker，
                而是一群互相鼓励、共同进步的朋友。
              </p>
            </div>
          </div>

          <p>
            我们致力于不断学习与进步，构造更加美好的未来
          </p>

          <div className="mt-2 p-3 border border-primary/20 rounded bg-primary/5">
            <h3 className="text-primary font-bold mb-2">Quick Facts:</h3>
            <ul className="space-y-1">
              <li>
                <span className="text-muted-foreground">Location:</span> Haikou, China
              </li>
              <li>
                <span className="text-muted-foreground">College:</span> HaiNan University
              </li>
              <li>
                <span className="text-muted-foreground">FLAG:</span> HnuSec&#123;W1lc0me_to_HnuSec_:)&#125;
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
