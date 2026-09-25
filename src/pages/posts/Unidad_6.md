---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Apuntes Unidad 6'
pubDate: 2026-09-24
description: 'Apuntes aca bien chidos'
author: 'Erick Rafael López Silva'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "blogging", "learning in public"]
---

# Unidad 6

## Astro Island
En esta sección del proyecto usaremos Preact para poder saludar a quien esté viendo nuestra página, y cambiar el saludo dinámicamente.

Para eso, ocupamos instalar Preact, por lo cual, vamos a instalarlo con este comando.

```bash
npx astro add preact
```

Ahora, crearemos un nuevo archivo llamado Greeting.jsx, donde pondremos toda la lógica de cambiar el saludo cuando el usuario le dé clic a un botón.

```jsx
import { useState } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button onClick={() => setGreeting(randomMessage())}>
        New Greeting
      </button>
    </div>
  );
}
```

## Poniendo botón de día y de noche.
Y para el toque final de la página, pondremos un botón para fondo oscuro y para fondo claro. Crearemos un nuevo archivo, llamado ThemeIcon.astro, donde incluiremos cómo cambia de estilos y cuándo es que lo hará.

```html
<style>
  .sun { fill: black; }
  .moon { fill: transparent; }

  :global(.dark) .sun { fill: transparent; }
  :global(.dark) .moon { fill: white; }
</style>

<script is:inline>
  const theme = (() => {
    const localStorageTheme = localStorage?.getItem("theme") ?? '';
    if (['dark', 'light'].includes(localStorageTheme)) {
      return localStorageTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
      return 'light';
  })();

  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  window.localStorage.setItem('theme', theme);

  const handleToggleClick = () => {
    const element = document.documentElement;
    element.classList.toggle("dark");

    const isDark = element.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  document.getElementById("themeToggle")?.addEventListener("click", handleToggleClick);
</script>
```

Y así, acabamos todo.
