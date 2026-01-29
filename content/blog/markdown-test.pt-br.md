+++
date = '2026-01-04T23:38:55-03:00'
draft = true
title = 'Markdown Rendering Test'
tags = ['test', 'markdown', 'demo']
math = true
+++

This page demonstrates all the markdown rendering capabilities available in this Hugo site with Tailwind Typography.

## Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Text Formatting

This is **bold text** using asterisks.
This is **bold text** using underscores.
This is _italic text_ using asterisks.
This is _italic text_ using underscores.
This is **_bold and italic_** text.
This is ~~strikethrough~~ text.
This is `inline code` text.

## Paragraphs and Line Breaks

This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

This is another paragraph separated by a blank line.

This line ends with two spaces for a line break.
This is the next line without a paragraph break.

## Links

[External link to Hugo documentation](https://gohugo.io)

[Link with title](https://gohugo.io "Hugo Framework")

Automatic URL linking: https://example.com

Reference-style link: [Hugo][1]

[1]: https://gohugo.io "Hugo Static Site Generator"

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deeply nested item 2.2.1
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task

### Mixed Lists

1. Ordered item
   - Unordered nested item
   - Another unordered item
2. Second ordered item
   1. Nested ordered
   2. Another nested

## Code Blocks

### Inline Code

Use the `printf()` function to output text.

### Fenced Code Blocks

```javascript
// JavaScript example
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

greet("World");
```

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```go
// Go example
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

```html
<!-- HTML example -->
<!DOCTYPE html>
<html>
  <head>
    <title>Test Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

```css
/* CSS example */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.button {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

```bash
# Bash example
#!/bin/bash
echo "Hello from bash"
ls -la
git status
```

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "JSON example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Tables

### Simple Table

| Name    | Age | City     |
| ------- | --- | -------- |
| Alice   | 28  | New York |
| Bob     | 35  | London   |
| Charlie | 42  | Tokyo    |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
| :----------- | :------------: | ------------: |
| Left         |     Center     |         Right |
| A            |       B        |             C |
| 1            |       2        |             3 |

### Complex Table

| Feature      | Supported | Notes                                      |
| ------------ | --------- | ------------------------------------------ |
| **Headings** | ✅ Yes    | All levels H1-H6                           |
| **Lists**    | ✅ Yes    | Ordered, unordered, nested                 |
| **Code**     | ✅ Yes    | Inline and blocks with syntax highlighting |
| **Tables**   | ✅ Yes    | With alignment support                     |
| **Images**   | ✅ Yes    | Standard markdown syntax                   |

## Blockquotes

> This is a simple blockquote.
> It can span multiple lines.

> ### Blockquote with Heading
>
> Blockquotes can contain other markdown elements.
>
> - List item 1
> - List item 2
>
> Even **formatted text** and `code`.

> Nested blockquotes:
>
> > This is nested
> >
> > > And this is deeply nested

## Horizontal Rules

Three or more hyphens:

---

Three or more asterisks:

---

Three or more underscores:

---

## Images

![Alt text for image](https://via.placeholder.com/800x400 "Image Title")

![Small image](https://via.placeholder.com/200x200)

## Special Characters and Escaping

Escaping special characters: \*not italic\* \[not a link\]

HTML entities: &copy; &reg; &trade; &nbsp; &mdash; &ndash;

Emoji: 🚀 ✨ 💻 🎉

## Abbreviations

The HTML specification is maintained by the W3C.

_[HTML]: HyperText Markup Language
_[W3C]: World Wide Web Consortium

## Footnotes

Here is a sentence with a footnote[^1].

Here is another with a longer footnote[^long-note].

[^1]: This is the first footnote.

[^long-note]: This is a footnote with multiple paragraphs.

    Indent paragraphs to include them in the footnote.

    Add as many paragraphs as you like.

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

## HTML in Markdown

<div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
  This is raw HTML inside markdown.
  <strong>Bold text using HTML</strong>
</div>

<details>
<summary>Click to expand</summary>

This content is hidden until expanded.

- Can contain markdown
- Lists
- **Formatting**

</details>

## Mathematical Expressions

Inline math: \(E = mc^2\)

Block math:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

## Long Text Test

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

## Combination Test

Here's a **bold statement** with _italic emphasis_ and `inline code`. Check out [this link](https://example.com) for more information.

> **Note**: This is a blockquote with **bold text**, _italics_, and a [link](https://example.com).
>
> ```javascript
> // Even code blocks
> console.log("inside blockquotes!");
> ```

### Final Checklist

- [x] All heading levels
- [x] Text formatting
- [x] Links (various types)
- [x] Lists (ordered, unordered, nested, tasks)
- [x] Code blocks (inline and fenced with syntax highlighting)
- [x] Tables with alignment
- [x] Blockquotes (simple and nested)
- [x] Horizontal rules
- [x] Images
- [x] Special characters and escaping
- [x] Footnotes
- [x] Definition lists
- [x] HTML in markdown
- [x] Mathematical expressions
- [x] Long text paragraphs

---

**End of markdown test document.**
