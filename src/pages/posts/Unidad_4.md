---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Apuntes Unidad 4'
pubDate: 2026-09-24
description: 'Apuntes aca bien chidos'
author: 'Erick Rafael López Silva'
image:
    url: 'https://docs.astro.build/assets/rose.webp'
    alt: 'The Astro logo on a dark background with a pink glow.'
tags: ["astro", "successes"]
---

# Unidad 4

## Creando el primer Layout
Para crear un nuevo layout tenemos que crear la carpeta en src.

En el archivo nuevo que le llamaremos BaseLayout.astro, copiaremos todo lo que hay en nuestro index.astro, y en el index.astro solo pondremos un h2 y la etiqueta de BaseLayout.

```jsx
---
import './styles/global.css'
import Footer from './components/Footer.astro'
import Header from './components/Header.astro'
const pageTitle = 'Home Page'
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>{pageTitle}</title>
	</head>
	<body>
        <Header/>
		    <ul>
      <li><a href="/posts/post-1/">Post 1</a></li>
	        <li><a href="/posts/post-2/">Post 2</a></li>
      <li><a href="/posts/post-3/">Post 3</a></li>
    </ul>
		<h1>{pageTitle}</h1>
		<Footer/>
		  <script>
		import "../pages/scripts/menu.js"
  </script>
	</body>
</html>

```

Y en el index.astro:

```jsx
---
import BaseLayout from '../layouts/BaseLayout.astro';
const pageTitle = "Home Page";
---
<BaseLayout>
  <h2>Esta bien chido este blogsito</h2>
</BaseLayout>
```

Ahora, si nosotros revisamos la página, nada realmente ha cambiado, es por eso que en el BaseLayout.astro debemos agregar una nueva etiqueta, que es slot.

La etiqueta slot nos permite ejecutar el contenido de un hijo, por lo cual, ahora h2 sí se estará viendo.

También podemos pasar variables de una página a otra de esta manera:

```jsx
---
import BaseLayout from '../layouts/BaseLayoutBlog.astro'
const pageTitle = 'Un blog bien chido'
---
<BaseLayout pageTitle = {pageTitle}>

</BaseLayout>
```

Y en el Layout:

```jsx
---
import '../styles/global.css'
import Footer from '../components/Footer.astro'
import Header from '../components/Header.astro'
const {pageTitle} = Astro.props
---
```

Y tenemos que rehacer todas nuestras páginas pero ahora usando BaseLayout.

Cabe aclarar que para el about.astro, perderemos los estilos, por lo cual, debemos de agregarle a la tag de estilos lo siguiente:

```css
<style is:global define:vars={{ skillColor, fontWeight, textCase }}>
        h1 {
            color: purple;
            font-size: 4rem;
        }
        .skill{
            color: var(--skillColor);
            font-weight: var(--fontWeight);
            text-transform: var(--textCase);
        }
</style>
```

Y así ya se aplicarían los estilos a la página que solo nosotros queremos.

## Blog Layout para el Markdown
Debemos de crear un nuevo layout para los posts en Markdown. Creamos un nuevo layout y ponemos lo siguiente:

```jsx
---
const { frontmatter } = Astro.props;
---
<meta charset="utf-8" />
<h1>{frontmatter.title}</h1>
<p>Written by {frontmatter.author}</p>
<slot />
```

Y en el markdown, ponemos lo siguiente:

```jsx
layout: ../../layouts/MarkdownPostLayout.astro
```

Y hacemos lo mismo con todos los markdowns que tenemos.

Cabe aclarar que todas estas propiedades las sacamos del Markdown, nosotros las tenemos que definir en la parte del JavaScript.

## Combinar Layouts
Una de las mejores cosas que se puede hacer es combinar Layouts. Como solo tenemos dos Layouts, combinaremos el BaseLayout con el del Markdown.

```jsx
---
import BaseLayout from './BaseLayout.astro';
const { frontmatter } = Astro.props;
---
<BaseLayout pageTitle={frontmatter.title}>
<p>{frontmatter.pubDate.toString().slice(0,10)}</p>
<p><em>{frontmatter.description}</em></p>
<p>Written by: {frontmatter.author}</p>
<slot />
</BaseLayout>   
```

Importamos el BaseLayout y solo tendríamos que quitar la etiqueta de Meta que antes tenía este archivo. Ahora todos nuestros posts en Markdown se verán como las demás páginas.
