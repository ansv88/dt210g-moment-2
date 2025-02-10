# Webbapplikation för att skapa och hantera en att göra-lista
Detta är en applikation byggd med React, TypeScript, Express och MongoDB.  
Användaren kan lägga till, uppdatera och ta bort "att göra"-uppgifter via ett enkelt gränssnitt.

## Länkar
En liveversion av webbapplikationen finns tillgänglig på följande URL:
[https://dt210g-moment-2-todos.onrender.com]

En liveversion av det använda APIet finns tillgänglig på följande URL:
[https://dt210g-moment2-api.onrender.com]

## Installation och Konfiguration
Klona källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket.

Om du vill nyttja repot för webbtjänsten på serversidan hittar du det på följande URL: [https://github.com/ansv88/dt210-moment2-api.git]

## UI-Komponenter
| Komponent    | Beskrivning                           |
|--------------|---------------------------------------|
| `App.tsx`    | Hanterar hela applikationen           |
| `Header.tsx` | Visar header med rubrik               |
| `Footer.tsx` | Visar sidfot                          |
| `Todo.tsx`   | Visar en enskild todo                 |
| `AddTodo.tsx`| Formulär för att lägga till nya todos |

## Custom Hooks
| Hook         | Beskrivning                                                 |
|--------------|-------------------------------------------------------------|
| `useGet.tsx` | Hämtar data från API med `fetch` och hanterar loading/error |