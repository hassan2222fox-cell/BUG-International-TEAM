/* ============================================================
   SUBJECTS  -  قائمة المواد  (js/data/subjects.js)
   - لتغيير اسم مادة: عدّل name هنا.
   - لإضافة مادة جديدة: ضيف سطر هنا + اعمل ملف جديد باسم id بتاعها
     في js/data/  (انسخ أي ملف مادة موجود) + ضيف سطر <script> في index.html
   - icon = واحد من: code, book, cap, lock, chip, shield, clock, helmet, globe, gear, laptop, sigma, puzzle, database
   ============================================================ */
window.SUBJECTS=[
 {id:'english',name:'English',icon:'book',desc:'Language skills and academic communication'},
 {id:'securednet',name:'Secured Network',icon:'lock',desc:'Designing and hardening networks'},
 {id:'ai',name:'Artificial Intelligence',icon:'chip',desc:'Machine learning and intelligent systems'},
 {id:'iad',name:'Internet Application Development',icon:'globe',desc:'Building web and internet applications'},
 {id:'netsecproto',name:'Network Security Protocol',icon:'shield',desc:'Secure protocols, encryption and VPNs'},
 {id:'techhistory',name:'History of Technology',icon:'clock',desc:'How computing and technology evolved'},
 {id:'ohs',name:'Occupational Safety and Health',icon:'helmet',desc:'Workplace safety, hazards and health'},
 {id:'progcyber',name:'Programming for Cyber Security',icon:'code',desc:'Secure coding, scripting and automation'}
];
window.MATERIALS=[];
/* Subject(id,{pdf,video,audio,image}) بتسجل ملفات المادة */
window.Subject=(sid,groups)=>{for(const[type,list]of Object.entries(groups))(list||[]).forEach(it=>MATERIALS.push({sid,type,...it,id:it.id||it.file}))};
