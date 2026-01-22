import { AsciiArt } from "@/components/ascii-art"

export function SkillsSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="skills" />

      <div className="space-y-6">
        <div>
          <h3 className="text-primary font-bold mb-2">Programming Languages & Tools</h3>
          <div className="space-y-2">
            <SkillBar name="Python" percentage={85} />
            <SkillBar name="Bash Shell Scripting" percentage={80} />
            <SkillBar name="PowerShell" percentage={75} />
            <SkillBar name="C" percentage={70} />
            <SkillBar name="JavaScript" percentage={65} />
            <SkillBar name="Git" percentage={80} />
            <SkillBar name="Jenkins" percentage={70} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Ethical Hacking & Penetration Testing</h3>
          <div className="space-y-2">
            <SkillBar name="Wireshark" percentage={90} />
            <SkillBar name="Metasploit" percentage={85} />
            <SkillBar name="Nmap" percentage={90} />
            <SkillBar name="Splunk (SIEM)" percentage={85} />
            <SkillBar name="Procmon" percentage={80} />
            <SkillBar name="Burp Suite" percentage={80} />
            <SkillBar name="Cellebrite" percentage={75} />
            <SkillBar name="FTK" percentage={75} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Cloud Platforms & Databases</h3>
          <div className="space-y-2">
            <SkillBar name="Amazon Web Services" percentage={75} />
            <SkillBar name="KQL (Kusto Query Language)" percentage={85} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Networking & Frameworks</h3>
          <div className="space-y-2">
            <SkillBar name="TCP/IP" percentage={90} />
            <SkillBar name="DNS, HTTP, DHCP" percentage={85} />
            <SkillBar name="VPN, Firewalls" percentage={85} />
            <SkillBar name="IDS/IPS" percentage={80} />
            <SkillBar name="MITRE ATT&CK" percentage={90} />
            <SkillBar name="NIST" percentage={85} />
            <SkillBar name="OWASP" percentage={80} />
            <SkillBar name="Office 365" percentage={85} />
            <SkillBar name="Docker" percentage={75} />
            <SkillBar name="Terraform" percentage={70} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Operating Systems</h3>
          <div className="space-y-2">
            <SkillBar name="Kali Linux" percentage={90} />
            <SkillBar name="Ubuntu" percentage={85} />
            <SkillBar name="MacOS" percentage={80} />
            <SkillBar name="Windows" percentage={85} />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-bold mb-2">Specialty Areas</h3>
          <div className="space-y-2">
            <SkillBar name="Threat Hunting" percentage={90} />
            <SkillBar name="Event Monitoring" percentage={85} />
            <SkillBar name="Incident Triage" percentage={90} />
            <SkillBar name="Network Analysis" percentage={85} />
            <SkillBar name="Log Analysis" percentage={90} />
            <SkillBar name="Threat Mitigation" percentage={85} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} skill level: ${percentage}%`}
        />
      </div>
    </div>
  )
}
