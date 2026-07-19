# הוספת Naor AI לאתר

1. החלף את `app/api/agent/route.ts` בקובץ המצורף.
2. העתק את `app/portfolio-agent.tsx` לתיקיית `app` באתר.
3. ב-`app/portfolio-page.tsx` הוסף בראש הקובץ:

```tsx
import { PortfolioAgent } from "./portfolio-agent";
```

4. מיד אחרי `</footer>` ולפני `</main>`, הוסף:

```tsx
<PortfolioAgent locale={locale} />
```

5. הדבק את כל תוכן `globals-agent.css` בסוף `app/globals.css`.
6. הרץ:

```powershell
npm.cmd run build
npm.cmd run dev
```

7. בדוק את `/` ואת `/he`.
8. ב-Vercel הוסף `GOOGLE_GENERATIVE_AI_API_KEY` תחת Settings → Environment Variables.
9. העלה:

```powershell
git status
git add .
git commit -m "Add bilingual AI portfolio agent"
git push origin main
```
