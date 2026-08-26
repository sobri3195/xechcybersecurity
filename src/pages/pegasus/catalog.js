export const categories = [
['web','Web Exploitation','</>'],['crypto','Cryptography','⌘'],['forensics','Digital Forensics','◉'],['reverse','Reverse Engineering','⇄'],['binary','Binary Exploitation','01'],['osint','OSINT','⌕'],['network','Network Security','⌁'],['stego','Steganography','▧'],['linux','Linux & Privilege Escalation','$_'],['misc','Miscellaneous Security','✦']
];
const names = {
web:['Cookie Crumbs','Robots Whisper','Header Inspector','Broken Access Map','Template Echo','Session Switchboard','Archive Traversal','Blind Ledger','CSP Labyrinth','Citadel Zero'],
crypto:['Caesar Dispatch','Base Camp 64','XOR Lantern','Vigenere Postcard','Hash Detective','Padding Signals','Nonce Reuse','RSA Common Ground','Elliptic Footprints','Quantumless Vault'],
forensics:['Deleted Memo','Metadata Trail','Browser Breadcrumbs','Memory Strings','Timeline Drift','Packet Evidence','Registry Shadow','Volatile Beacon','Disk Mosaic','Incident Blackbox'],
reverse:['Strings Attached','Branch Compass','License Routine','Packed Greeting','Bytecode Diary','Android Gate','Anti-Debug Alley','Firmware Maze','Obfuscated Engine','Phoenix Core'],
binary:['Stack Postcard','Format Telescope','Integer Wrap','Return Address','Canary Workshop','Heap Tags','ROP Steps','Race Window','Allocator Mirage','Fortress Process'],
osint:['Image Landmark','Username Constellation','Document Provenance','Map Shadow','Domain History','Code Trail','Certificate Atlas','Supply Chain Map','Campaign Timeline','Phantom Organization'],
network:['DNS Footprints','Handshake Reader','Port Story','ARP Theatre','TLS Inspector','Routing Detour','Beacon Rhythm','Tunnel Vision','Segmentation Escape','Zero Trust Siege'],
stego:['Pixel Corners','Audio Specter','Trailing Bytes','Palette Secret','Waveform Ink','Whitespace Morse','Layered Canvas','Frequency Vault','Polyglot Portrait','Invisible Gallery'],
linux:['Permission Trail','Cron Notes','SUID Compass','Path Hijack Lab','Service Papers','Capability Climb','Container Boundary','Namespace Passage','Kernel Clues','Rootless Summit'],
misc:['QR Fragments','Log Correlation','Token Anatomy','Cloud Policy','Supply Chain Receipt','Mobile Backup','Smart Contract Trace','Threat Model Chess','Detection Engineering','Pegasus Grand Prix']
};
export const demoChallenges = categories.flatMap(([slug,category],ci)=>names[slug].map((title,i)=>({id:ci*10+i+1,slug:`${slug}-${i+1}`,title,category,category_slug:slug,difficulty:i<3?'easy':i<7?'medium':i<9?'hard':'expert',points:i<3?100:i<7?200:i<9?350:500,status:i===0?'in_progress':'not_started',locked:i>1,objective:`Analisis artefak sandbox “${title}” dan dokumentasikan indikator yang mengarah ke flag.`,description:`Tim Blue Pegasus menemukan anomali pada simulasi ${category}. Selidiki dataset terisolasi yang disediakan tanpa menyentuh sistem eksternal.`,hints_used:0})));
