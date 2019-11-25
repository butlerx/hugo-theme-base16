# base16

base 16 colour scheme for for hugo blog

![Base16](https://github.com/butlerx/hugo-theme-base16/blob/master/images/screenshot.png?raw=true)

**DEMO** - https://admins.redbrick.dcu.ie/

- [Built-in shortcodes](#built-in-shortcodes)
- [Code highlighting](#code-highlighting)
- [How to start](#how-to-start)
- [How to configure](#how-to-configure)
- [Hot to enable Search](#enable-search)
- [Post archetype](#post-archetype)
- [Licence](#licence)

#### Built-in shortcodes

- **`image`** (prop required: **`src`**; props optional: **`alt`**,
  **`position`** (**left** is default | center | right), **`style`**)
  - eg:
    `{{< image src="/img/hello.png" alt="Hello Friend" position="center" style="border-radius: 8px;" >}}`
- **`figure`** (same as `image`, plus few optional props: **`caption`**,
  **`captionPosition`** (left | **center** is default | right),
  **`captionStyle`**
  - eg:
    `{{< figure src="/img/hello.png" alt="Hello Friend" position="center" style="border-radius: 8px;" caption="Hello Friend!" captionPosition="right" captionStyle="color: red;" >}}`

#### Code highlighting

A custom syntax highlighting based on PrismJS. All you need to do is to wrap you
code like this:

<pre><code>
```html
// your code here
```
</code></pre>

## How to start

You can download the theme manually by going to
[butlerx/hugo-theme-base16](https://github.com/butlerx/hugo-theme-base16) and
pasting it to `themes/terminal` in your root directory.

You can also clone it directly to your Hugo folder:

```sh
git clone https://github.com/bulerx/hugo-theme-base16.git themes/base16
```

If you don't want to make any radical changes, it's the best option, because you
can get new updates when they are available. You can also include it as a git
submodule:

```sh
git submodule add https://github.com/bulerx/hugo-theme-base16.git themes/base16
```

## How to configure

The theme doesn't require any advanced configuration. Just copy:

```toml
baseurl = "/"
languageCode = "en-us"
title = "Blog Title"
author = "Authors Name"
pygmentsCodeFences = true
theme = "base16"
paginate = 5

[outputs]
  home = ["HTML", "RSS", "JSON"]

[params]
  hero = "Base16"
  message = "Sub Title message"
  descriptions = "Blog description"
  twitter = "twitter user"
```

to `config.toml` file in your Hugo root directory and change params fields

## Enable Search

To enable search add create the `search.md` from the search archtype by running
`hugo new --kind search search.md`. Then add `JSON` to the output of `home` in
`config.toml` as

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

## Post archetype

See the basic `post` file params supported by the theme —
https://github.com/panr/hugo-theme-terminal/blob/master/archetypes/post.md

## Licence

The theme is released under the MIT License. Check the
[original theme license](https://github.com/butlerx/hugo-theme-base16/blob/master/LICENSE.md)
for additional licensing information.
