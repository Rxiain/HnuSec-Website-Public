import { AsciiArt } from "@/components/ascii-art"

export function EducationSection() {
  return (
    <div className="space-y-4">
      <AsciiArt art="education" />

      <div className="space-y-6">
        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Pace University, New York, NY</h3>
          <p className="text-sm">M.S. in Cybersecurity | GPA: 3.77</p>
          <p className="text-xs text-muted-foreground">May 2025</p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold">Relevant Coursework:</h4>
            <ul className="text-xs mt-1 space-y-1 list-disc pl-4">
              <li>Network Security & Defense</li>
              <li>Information Security Management</li>
              <li>Ethical Hacking & Penetration Testing</li>
              <li>Mobile Forensics Investigation</li>
              <li>Automating Information Security Python & Shell Scripting</li>
              <li>Cyber Security</li>
              <li>Cyber Threat Intelligence</li>
            </ul>
          </div>
        </div>

        <div className="p-3 border border-primary/20 rounded bg-primary/5">
          <h3 className="text-primary font-bold">Anna University, Chennai, India</h3>
          <p className="text-sm">B.E. in Computer Science & Engineering | GPA: 3.61</p>
          <p className="text-xs text-muted-foreground">April 2020</p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold">Relevant Coursework:</h4>
            <ul className="text-xs mt-1 space-y-1 list-disc pl-4">
              <li>Data Structures & Algorithms</li>
              <li>Cyber Forensics</li>
              <li>Information Systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
