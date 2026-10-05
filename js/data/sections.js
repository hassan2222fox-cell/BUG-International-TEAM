/* ============================================================
   SECTIONS  -  السكاشن  (js/data/sections.js)
   - اسم السكشن: عدّل name.
   - حط الملفات في:  media/<id>/pdf | video | audio | images
     (مثلاً media/sec-ai/pdf)
   - عشان تضيف ملف: شيل // من سطر المثال وغيّر البيانات (أو انسخه).
       title = الاسم اللي هيظهر   |  file = مسار الملف
       date  = تاريخ (اختياري)    |  desc = وصف (اختياري)
   - كل سطر لازم ينتهي بفاصلة ,
   ============================================================ */
window.SECTIONS=[
 {id:'sec-ai',name:'Artificial Intelligence Lec',icon:'book',desc:'Section materials'},
 {id:'sec-iad',name:'Internet Application Development Lec',icon:'book',desc:'Section materials'},
 {id:'sec-netsecproto',name:'Network Security Protocol Lec',icon:'book',desc:'Section materials'},
 {id:'sec-progcyber',name:'Programming for Cyber Security Lec',icon:'book',desc:'Section materials'},
 {id:'sec-securednet',name:'Secured Network Lec',icon:'book',desc:'Section materials'}
];

Subject('sec-ai',{
  pdf:[
    // {title:'Section 1 Notes', file:'media/sec-ai/pdf/section1.pdf', date:'2026-03-10', desc:'Intro'},
  ],
  video:[
    // {title:'Section 1 Recording', file:'media/sec-ai/video/section1.mp4'},
  ],
  audio:[
    // {title:'Section 1 Audio', file:'media/sec-ai/audio/section1.mp3'},
  ],
  image:[
    // {title:'Section 1 Diagram', file:'media/sec-ai/images/diagram1.png'},
  ]
});

Subject('sec-iad',{
  pdf:[
    // {title:'Section 1 Notes', file:'media/sec-iad/pdf/section1.pdf', date:'2026-03-10', desc:'Intro'},
  ],
  video:[
    // {title:'Section 1 Recording', file:'media/sec-iad/video/section1.mp4'},
  ],
  audio:[
    // {title:'Section 1 Audio', file:'media/sec-iad/audio/section1.mp3'},
  ],
  image:[
    // {title:'Section 1 Diagram', file:'media/sec-iad/images/diagram1.png'},
  ]
});

Subject('sec-netsecproto',{
  pdf:[
    // {title:'Section 1 Notes', file:'media/sec-netsecproto/pdf/section1.pdf', date:'2026-03-10', desc:'Intro'},
  ],
  video:[
    // {title:'Section 1 Recording', file:'media/sec-netsecproto/video/section1.mp4'},
  ],
  audio:[
    // {title:'Section 1 Audio', file:'media/sec-netsecproto/audio/section1.mp3'},
  ],
  image:[
    // {title:'Section 1 Diagram', file:'media/sec-netsecproto/images/diagram1.png'},
  ]
});

Subject('sec-progcyber',{
  pdf:[
    // {title:'Section 1 Notes', file:'media/sec-progcyber/pdf/section1.pdf', date:'2026-03-10', desc:'Intro'},
  ],
  video:[
    // {title:'Section 1 Recording', file:'media/sec-progcyber/video/section1.mp4'},
  ],
  audio:[
    // {title:'Section 1 Audio', file:'media/sec-progcyber/audio/section1.mp3'},
  ],
  image:[
    // {title:'Section 1 Diagram', file:'media/sec-progcyber/images/diagram1.png'},
  ]
});

Subject('sec-securednet',{
  pdf:[
    // {title:'Section 1 Notes', file:'media/sec-securednet/pdf/section1.pdf', date:'2026-03-10', desc:'Intro'},
  ],
  video:[
    // {title:'Section 1 Recording', file:'media/sec-securednet/video/section1.mp4'},
  ],
  audio:[
    // {title:'Section 1 Audio', file:'media/sec-securednet/audio/section1.mp3'},
  ],
  image:[
    // {title:'Section 1 Diagram', file:'media/sec-securednet/images/diagram1.png'},
  ]
});
