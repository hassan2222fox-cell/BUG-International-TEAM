# BUG - إزاي تضيف محتوى

1. حط الملف في فولدر المادة: `media/<المادة>/pdf` أو `video` أو `audio` أو `images`
2. افتح ملف المادة: `js/data/<المادة>.js` (مثلاً `english.js`)
3. شيل `//` من سطر المثال تحت النوع المناسب وغيّر `title` و `file`:

```js
pdf:[
  {title:'Lecture 1 Notes', file:'media/english/pdf/lecture1.pdf', date:'2026-03-10', desc:'Intro'},
  {title:'Lecture 2 Notes', file:'media/english/pdf/lecture2.pdf'},
],
```
- كل سطر ينتهي بفاصلة `,`  - `date` و `desc` اختياريين.
- مفيش ملفات تجريبية؛ أي نوع فاضي بيظهر فيه "Nothing here yet".
- مادة جديدة: ضيفها في `js/data/subjects.js` + انسخ ملف مادة + سطر `<script>` في `index.html`.
- لازم تشغّل المشروع من سيرفر محلي: دوس دبل كليك على `start.bat` (ويندوز) أو شغّل `start.sh`، وافتح http://localhost:8000 (متفتحش index.html مباشرة).


## السكاشن (Sections)
- أسماء السكاشن في `js/data/sections.js` (كل سكشن له `id` زي `sec-ai`).
- الملفات بتتحط في `media/<id>/pdf` أو `video` أو `audio` أو `images` (مثلاً `media/sec-ai/pdf`).
- بتسجل الملف في نفس الملف `sections.js` تحت السكشن المناسب بنفس طريقة المواد.
- مادة Internet Application Development ملفها `js/data/iad.js` وفولدرها `media/iad`.
