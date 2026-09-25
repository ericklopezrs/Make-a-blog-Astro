---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Apuntes Unidad 3'
pubDate: 2026-09-24
description: 'Apuntes aca bien chidos'
author: 'Erick Rafael López Silva'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "learning in public", "setbacks", "community"]
---

# Unidad 3

## Componentes reutilizables

### Navegador
En este caso haremos un componente reutilizable, que sería el navegador donde nos podremos mover entre las páginas que tenemos creadas.

Crearemos una nueva carpeta en src, y le llamaremos "componentes". En esta carpeta creamos el archivo Navigation.astro.

Y ponemos el siguiente código en la página:

```html
---
<a href="/">Home</a>
<a href="/about/">About</a>
<a href="/blog/">Blog</a>
---
```

Ahora, vamos a index.astro e importamos y usamos lo que acabamos de crear.

```jsx
import Navigation from './components/Navigation.astro';
```

### Footer
De la misma manera que con el navegador, debemos de crear un nuevo componente en la carpeta src, y debemos de importar cada componente en los archivos. 

Código de footer:

```jsx
---
const platform = "github";
const username = "ericklopezrs";
---

<footer>
  <p>Learn more about my projects on <a href={`https://www.${platform}.com/${username}`}>{platform}</a>!</p>
</footer>
```
E importarlo en todos los archivos.

```jsx
import Footer from './components/Footer.astro'
```

## Social
Ahora, vamos a crear un nuevo componente llamado Social. Lo creamos donde mismo, y aquí la diferencia es que este componente solo renderizará lo que nosotros le pasemos. Ahora vemos el ejemplo.

```jsx
---
const { platform, username } = Astro.props;
---
<a href={`https://www.${platform}.com/${username}`}>{platform}</a>
```

Como podemos ver, usamos algo llamado Astro.props, que son atributos que podemos usar en nuestro código HTML de Astro. Y nosotros, en las otras páginas, solo llamamos a este componente pasándole los atributos que ocupa.

```jsx
---
import Social from './Social.astro';
---

<footer>
  <Social platform="instagram" username="rafael_sle" />
  <Social platform="github" username="ericklopezrs" />
</footer>
``` 

Y ahora, vamos a darle tantito estilo a nuestras redes.

## Header
Ahora vamos a crear otro componente llamado Header. En el header va a ir adentro el componente de Navegación, por lo cual nuestro código de Header sería lo siguiente:

```jsx
---
import Navigation from './Navigation.astro'
---
<header>
<nav>
<Navigation/>
</nav>
</header>
```

Y en los demás archivos .astro, lo único que tendríamos que hacer sería importarlo y quitar la importación del navegador.

```jsx
import Header from './components/Header.astro'
```

Y ahora, nos vamos a global.css para ponerle estilos a la navegación.

```css
html {
  background-color: #f1f5f9;
  font-family: sans-serif;
}

body {
  margin: 0 auto;
  width: 100%;
  max-width: 80ch;
  padding: 1rem;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

h1 {
  margin: 1rem 0;
  font-size: 2.5rem;
}

/* nav styles */

.nav-links {
  width: 100%;
  margin: 0;
}

.nav-links a {
  display: block;
  text-align: center;
  padding: 10px 0;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #0d0950;
}

.nav-links a:hover,
.nav-links a:focus {
  background-color: #ff9776;
}

@media screen and (min-width: 636px) {
  .nav-links {
    margin-left: 5em;
    display: block;
    position: static;
    width: auto;
    background: none;
  }

  .nav-links a {
    display: inline-block;
    padding: 15px 20px;
  }
}
```

## Mandar un script al navegador.

Lo primero que haremos será hacer un componente nuevo. Este componente se llamará menu, y será un desplegable.

```jsx
---
---
<button aria-expanded="false" aria-controls="main-menu" class="menu">
  Menu
</button>
```

Y usaremos la etiqueta Script para agregarle lógica al componente, pero, en vez de poner todo el código ahí, lo que haremos va a ser importar el script de un archivo que nosotros hayamos creado.

  <script>
    import "../scripts/menu.js";
  </script>

Y el script sería este:

const menu = document.querySelector('.menu');

```javascript
menu?.addEventListener('click', () => {
  const isExpanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', `${!isExpanded}`);
});
```
