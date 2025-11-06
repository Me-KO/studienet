import { useEffect, useState } from "react";

const CyberpunkTerminal = () => {
  const [lines1, setLines1] = useState<string[]>([]);
  const [lines2, setLines2] = useState<string[]>([]);
  const [lines3, setLines3] = useState<string[]>([]);

  // DEDSEC ASCII skull (reference-inspired)
  const skullArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡴⠶⠶⠶⠶⠶⠤⠤⠤⢤⣤⣠⡶⠻⠉⢹⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣷⠀⢀⣀⡠⠤⠤⠤⠤⢄⣴⠟⠀⠀⠀⢀⣿⣿⣖⠶⠤⠤⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡄⠀⣀⣀⣀⣀⣀⣴⣿⠏⠀⠀⠀⡇⢘⣿⣿⣝⣧⣐⣒⣤⣬⠭⣉⣛⠒⠦⢤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠈⡍⠁⠀⠀⡾⢱⡟⠀⠀⠀⠀⡗⠈⢿⡿⠙⠚⢿⡄⠈⠉⠉⠓⠚⠿⢵⣖⣪⣭⣓⠢⣄⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡜⠀⣷⠀⠀⢸⠃⣿⣇⠀⢀⢀⣈⣀⣀⡈⢷⣶⣷⣶⣿⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠑⠶⠤⣉⡳⢦⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⡄⠸⡄⠀⢸⢠⣟⣧⣶⣿⣛⢿⣿⣿⣿⢷⣿⣿⡿⠿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠑⠺⢷⣄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡍⠀⣇⠀⣿⠻⣿⣿⣿⣿⣷⣦⡙⣿⣿⣿⣿⣯⣡⣤⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠀⢸⠀⣿⢼⣿⣿⠷⠋⡙⣟⣿⣉⠉⠹⢿⣿⣏⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠘⣆⣿⢸⣻⣿⣾⡏⣡⡄⣀⣉⣹⣶⣾⣿⡏⠟⣽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡀⢻⡿⣌⣿⣿⣿⣿⠟⢛⣉⠁⠈⣿⣿⡟⠁⢠⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⠁⠘⣧⣿⣿⣿⣿⣿⣶⣶⣶⣶⣶⣿⡟⣤⣴⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡤⣿⣀⠀⢿⡏⢧⡈⣿⣿⣿⣿⣿⣿⣿⢿⠟⠛⠻⣿⠿⠙⣗⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⠏⠁⢀⣿⡏⡀⢸⣷⣸⣿⡙⠿⣿⣿⣿⣿⣟⢮⡞⠀⠀⠋⠀⢘⣿⠟⠈⠉⠳⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠁⣀⣀⣸⣿⣷⢷⠀⣿⣷⡱⣝⠒⣿⣿⢿⡿⣷⣿⠆⠀⣠⠂⢠⡟⡁⠀⠀⠈⠙⢿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣿⣩⠠⠤⣀⣭⣿⣿⣞⡆⢹⣷⡿⣍⠓⠦⣼⣿⣿⡋⢁⣤⡞⣁⠴⠿⢋⣕⠀⡀⠀⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣼⠿⠏⢀⠀⠀⢸⣿⣿⣿⣿⢃⠀⣿⣿⠈⠣⡀⠨⣿⣿⣾⣛⣽⡟⠁⠛⣿⡿⠿⠀⡇⠀⠀⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⠟⣿⠤⣄⠈⣳⣼⣿⣿⠝⠃⣿⣾⡀⢹⣌⡓⠦⠬⠿⠿⢿⣿⣯⣭⡔⠒⡛⠁⠀⡤⣠⣿⠀⡄⠀⢠⠈⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢰⡏⠀⡏⣴⣟⣿⣿⣿⡿⠏⠀⠀⠘⣷⣧⣀⣏⣛⡲⠤⠿⣿⣿⣯⣭⣽⣶⠞⠁⣠⢞⣽⣿⡟⢨⠁⠀⢸⡆⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⠁⣸⠃⠙⠛⣿⢦⣀⣀⣤⢶⣶⣿⣿⣿⣿⣶⣶⡏⠀⢀⠉⢻⣟⣫⠿⠊⢁⡾⠁⠉⣾⣿⣧⣾⣏⠀⢸⡇⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⡯⢰⠋⠀⣰⣿⣿⣿⡿⣿⡏⡠⣯⡈⣹⣟⣿⣝⣙⡇⠈⢩⣭⣿⣿⠇⢀⡴⠋⠀⠀⠐⣻⣿⢿⣿⠃⠀⣿⡇⠻⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢠⡿⢠⠏⠀⢀⣻⣿⠏⢿⣿⣸⢸⠁⠸⣿⣿⣿⢿⠛⣿⣷⣿⣿⣿⣷⠶⠚⠉⠀⠀⠀⠀⠘⢿⣿⣿⡷⡄⢸⣹⠇⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⢠⡟⢀⣴⣶⣾⣿⣿⡏⣰⢸⠇⣇⡏⠀⠀⠙⣿⣿⣟⡄⢹⡿⠿⠛⠛⣿⣶⣶⡦⠤⢔⣂⣀⠀⣾⡟⠻⡿⠁⢌⡿⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⢸⠀⣸⠿⠟⠟⠙⡿⠀⡇⡾⢠⣏⢣⣄⢲⣄⡘⣿⣿⣷⠘⣇⢀⣒⡯⠉⠉⠁⠈⠓⠿⣿⠟⢰⣿⡇⠴⠁⠀⣼⡽⠁⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀
⢘⣇⠉⠀⠀⣀⡼⠁⢸⣱⠇⢠⢻⡄⣿⣿⣿⣿⣿⣿⣏⠀⢻⣿⣷⣄⡄⠀⠀⢀⡤⠞⠁⢠⣿⣿⡀⠀⢀⣾⣵⡗⠀⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠾⢾⣆⣰⣶⣷⡄⠀⢡⠏⠀⠀⠈⠀⠉⠙⢿⢱⠙⢿⣿⣄⡸⣿⣿⣿⣿⡿⠟⢉⡠⠆⣰⢿⣿⢿⠁⣠⠋⠐⣾⠇⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠻⣌⠻⣿⡿⠿⣯⡶⠇⠀⠀⢠⠀⠀⠸⣿⠀⠀⣿⡏⠁⣿⠋⠁⣁⣤⠞⠉⠀⠰⢛⣿⠋⣠⡞⠁⢀⡀⠉⠀⢠⢿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠓⠧⣤⣄⣉⣀⣀⡈⠐⢪⣷⡄⠀⡇⣧⡀⣾⣧⠁⢻⣶⣾⣿⡄⠀⠀⠀⠀⣿⣯⣾⣿⡾⠛⢉⣀⡅⠀⡜⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢹⣟⣷⣦⣾⣷⠀⣿⣿⣧⣿⢿⣇⠀⣿⣿⠛⠀⡀⢀⠀⣠⣿⣫⣾⡽⠞⠛⠛⠾⠁⣸⢁⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⢸⡟⣿⡿⣿⣷⢿⣿⣿⣿⡜⣷⠄⢸⡘⣊⣭⡾⢋⡾⣿⣿⣿⣵⠶⠚⠁⠀⠀⠀⣿⣸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⢸⣧⢻⣷⢻⢿⣧⡻⣿⣿⢷⣽⡆⠈⣧⠡⢄⣼⡿⠞⣻⢿⡭⠆⠀⢀⣠⣴⠀⢰⣏⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⣿⢸⡿⣟⣷⡻⣿⣿⣿⣟⣿⣿⡂⢹⣶⣿⣿⠀⢸⡟⠉⠀⠀⠻⣿⣞⠋⢠⠇⣻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀          
  `.split("\n");

  useEffect(() => {
    const terminalLines1 = [
      "# WELCOME TO THE RESISTANCE",
      "> Initializing secure channel...",
      "# DEDSEC NETWORK BREACH INITIATED",
      "> Establishing anonymous connection...",
      "# D0AK3S WAS HERE",
      "> Injecting payload into system...",
      "> [OK] TEAMMEMBERS ONLINE",
      "> [WARN] 1 WORKING 3 IDLE",
      "> Deploying deadlines...",
      "> [OK] 3 WORKING | 1 IDLE",
      "# DONT BE THAT 1 IDLE PERSON",
      "> Scanning encrypted channels...",
      "> [INFO] DarkNet nodes detected",
      "> Establishing secure tunnel...",
      "> [OK] Encrypted connection established",
      "> [OK] Connection to target secured",
      "> Loading exploit modules...",
      "> [ERROR] Corporate firewall detected",
      "> [INFO] Deploying countermeasures...",
      "> [OK] Firewall bypassed",
      "> Analyzing traffic patterns...",
      "> [INFO] Corporate servers identified",
      "# SUPR1S3 M.F",
      "> Mapping network topology...",
      "> [OK] 47 vulnerable endpoints found",
      "> Deploying exploit framework...",
      "> [WARN] Security protocols active",
      "> Bypassing authentication...",
      "> [OK] Access level: ROOT",
      "# INFORMATION IS POWER",
      "> Exfiltrating classified data...",
      "> [OK] 2.7GB transferred",
      "> Covering digital tracks...",
      "> [OK] Logs sanitized",
      "> [INFO] Starting HINT",
      "> [ERROR] NOTHING TO BE FOUND",
      "> Initiating deep search protocols...",
      "> [INFO] network established",
      "> [OK] BRIGHTSPACE found",
      "> Scanning for projects...",
      "> [WARN] Deadline tommorow",
      "> [START] Stress protocol",
      "> [OK] Stress protocol active",
      "# THERE IS MORE THAN MEETS THE EYE",
      "> Deploying focus...",
      "> [INFO] Encryption algorithm: AES-256",
      "> [OK] Data secured",
      "> Broadcasting to BRIGHTSPACE...",
      "> [OK] Message recieved project done.",
      "# WE WILL MAKE IT",
      "> Infiltrating backup servers...",
      "> [OK] Shadow copy accessed",
      "> Corrupting audit trails...",
      "> [OK] Evidence erased",
      "# DO YOUR WORK",
      "> _",
    ];

    const terminalLines2Intro = [
      "# GREETINGS, NETRUNNER",
      "> Loading DEDSEC protocols...",
      "> Scanning network for vulnerabilities...",
      "> [INFO] 23 nodes discovered",
      "# THERE IS MORE THAN MEETS THE EYE HERE ON THIS WEBSITE",
      "# CAN YOU FIND IT?",
      "> [INFO] DATABR3ACH Active",
    ];

    const terminalLines2Outro = [
      "> Analyzing corporate data structures...",
      "> [OK] Boring protocol active",
      "> [WARN] Intrusion detection system online",
      "> Activating stealth protocols...",
      "> [OK] IDS neutralized",
      "# INFORMATION WANTS TO BE FREE",
      "> Extracting sensitive documents...",
      "> [OK] 1.4GB data acquired",
      "> [INFO] Dumping privacy sensitive info into AI...",
      "> [OK] Data leaked",
      "# SECURE THE INFORMATION",
      "> Broadcasting liberation message...",
      "> [OK] Message transmitted to collective",
      "> _",
    ];

    const terminalLines3 = [
      "# WELCOME TO THE DIGITAL UNDERGROUND",
      "> Accessing encrypted networks...",
      "# OPERATION DATABR3ACH ACTIVE",
      "> Target: Corporate surveillance network",
      "> [SCANNING] Identifying weak points...",
      "> [INFO] Backdoor discovered at port 8443",
      "> Exploiting SQL injection vulnerability...",
      "> [OK] Access granted | Privilege: ADMIN",
      "# NO ONE IS SAFE FROM US",
      "> Deploying ransomware to corrupt systems...",
      "> [WARN] Countermeasures detected",
      "> Engaging evasion protocols...",
      "> [OK] Detection avoided",
      "# YOUR DATA BELONGS TO YOU",
      "> Wiping surveillance logs...",
      "> [OK] All traces removed",
      "> Mission status: SUCCESS",
      "> Initiating data liberation protocol...",
      "> [INFO] Blockchain encryption active",
      "> Distributing files to darknet...",
      "> [OK] Files replicated across nodes",
      "# FREEDOM OF INFORMATION RIGHTS",
      "> Analyzing corporate infrastructure...",
      "> [WARN] Intrusion detection triggered",
      "> Deploying countermeasures...",
      "> [OK] IDS neutralized",
      "> Escalating privileges...",
      "> [OK] System administrator access obtained",
      "# PRIVACY IS YOURS",
      "> Broadcasting message to collective...",
      "> [OK] Signal transmitted",
      "# DEDSEC OUT",
      "> Connection terminated",
      "> Returning to the shadows...",
      "> [OK] Ghost protocol active",
      "# UNTIL NEXT TIME",
      "> Probing network perimeter...",
      "> [INFO] Weak SSL certificate found",
      "> Exploiting cryptographic flaw...",
      "> [OK] Man-in-the-middle attack successful",
      "> Intercepting encrypted traffic...",
      "> [OK] 3.2GB of communications captured",
      "# HELP EACHOTHER TO THE TOP",
      "> Deploying keylogger malware...",
      "> [WARN] Anti-virus detected",
      "> Polymorphic code activated...",
      "> [OK] Defense bypassed",
      "> Recording keystrokes...",
      "> [OK] Credentials harvested",
      "# THERE IS MORE TO THIS WEBSITE THAN MEETS THE EYE",
      "> Launching Cyber attack...",
      "> [INFO] Botnet size: 10,000 nodes",
      "> [OK] Target servers overwhelmed",
      "> System downtime: 99.9%",
      "# EXPECT THE UNEXPECTED",
      "> _",
    ];

    // Column 1
    let index1 = 0;
    const lines1Array: string[] = [];
    const interval1 = setInterval(() => {
      if (index1 < terminalLines1.length) {
        lines1Array.push(terminalLines1[index1]);
        setLines1([...lines1Array]);
        index1++;
      } else {
        clearInterval(interval1);
      }
    }, 540);

    // Column 2 with fast skull typing
    let index2 = 0;
    const lines2Array: string[] = [];
    let skullIndex = 0;
    let isTypingSkull = false;

    const interval2 = setInterval(() => {
      // First type intro lines normally
      if (index2 < terminalLines2Intro.length) {
        lines2Array.push(terminalLines2Intro[index2]);
        setLines2([...lines2Array]);
        index2++;
      }
      // Then type skull very fast
      else if (skullIndex < skullArt.length) {
        if (!isTypingSkull) {
          isTypingSkull = true;
          // Type all skull lines rapidly
          const skullInterval = setInterval(() => {
            if (skullIndex < skullArt.length) {
              lines2Array.push(skullArt[skullIndex]);
              setLines2([...lines2Array]);
              skullIndex++;
            } else {
              clearInterval(skullInterval);
            }
          }, 72); // Fast typing for skull
        }
      }
      // Then type outro lines normally
      else if (index2 < terminalLines2Intro.length + terminalLines2Outro.length) {
        const outroIndex = index2 - terminalLines2Intro.length;
        if (outroIndex < terminalLines2Outro.length) {
          lines2Array.push(terminalLines2Outro[outroIndex]);
          setLines2([...lines2Array]);
        }
        index2++;
      }
      // Stop after complete
      else {
        clearInterval(interval2);
      }
    }, 510);

    // Column 3 (different offset)
    let index3 = 0;
    const lines3Array: string[] = [];
    const interval3 = setInterval(() => {
      if (index3 < terminalLines3.length) {
        lines3Array.push(terminalLines3[index3]);
        setLines3([...lines3Array]);
        index3++;
      } else {
        clearInterval(interval3);
      }
    }, 480);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  // Determine if a line is part of the skull
  const isSkullLine = (lineIndex: number, column: number) => {
    if (column === 2) {
      const introLength = 4; // First 4 lines are intro
      const skullLength = skullArt.length;
      return lineIndex >= introLength && lineIndex < introLength + skullLength;
    }
    return false;
  };

  return (
    <div className="fixed top-16 inset-x-0 bottom-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 px-2 sm:px-4 md:px-8 lg:px-12 py-2 sm:py-4 md:py-6 font-mono text-[8px] sm:text-[10px] md:text-xs text-primary/40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-8 lg:gap-12 h-full max-w-screen-2xl mx-auto">
          {/* Column 1 */}
          <div className="space-y-0.5 sm:space-y-1 overflow-hidden">
            {lines1.map((line, index) => (
              <div
                key={index}
                className="animate-fade-in whitespace-pre leading-3 sm:leading-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-0.5 sm:space-y-1 overflow-hidden hidden md:block">
            {lines2.map((line, index) => (
              <div
                key={index}
                className="whitespace-pre leading-3 sm:leading-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-0.5 sm:space-y-1 overflow-hidden hidden lg:block">
            {lines3.map((line, index) => (
              <div
                key={index}
                className="animate-fade-in whitespace-pre leading-3 sm:leading-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Scan line effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, hsl(var(--primary)) 0px, transparent 2px, transparent 10px),
            repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, transparent 2px, transparent 10px)
          `,
        }}
      />
    </div>
  );
};

export default CyberpunkTerminal;
