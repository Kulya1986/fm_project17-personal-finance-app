import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    --color-beige-500:#98908B;
    --color-beige-100:#F8F4F0;
    --color-grey-900:#201F24;
    --color-grey-500:#696868;
    --color-grey-300:#B3B3B3;
    --color-grey-100:#F2F2F2;
    --color-white: #FFFFFF;

    --color-green:#277C78;
    --color-yellow: #F2CDAC;
    --color-cyan: #82C9D7;
    --color-navy:#626070;
    --color-red:#C94736;
    --color-pink:#826CB0;
    --color-purple:#AF81BA;
    --color-turquoise: #597C7C;
    --color-brown: #93674F;
    --color-magenta: #934F6F;
    --color-blue: #3F82B2;
    --color-navy-grey: #97A0AC;
    --color-army-green: #7F9161;
    --color-gold: #CAB361;
    --color-orange: #BE6C49;

    --spacing-500: 40px;
    --spacing-400: 32px;
    --spacing-300: 24px;
    --spacing-250: 20px;
    --spacing-200: 16px;
    --spacing-150: 12px;
    --spacing-100: 8px;
    --spacing-50: 4px;
    --spacing-10: 0px;

    --text-preset-1: 32px;
    --text-preset-2:20px;
    --text-preset-3: 16px;
    --text-preset-4:14px;
    --text-preset-5: 12px;

}
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body{
    font-family: "Public Sans", sans-serif;
    color: var(--color-grey-900);
    min-height: 100vh;
    height: auto;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 0px;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

input:hover, textarea:hover, select:hover{
    outline: 1px solid var(--color-grey-500);
    outline-offset: -1px;
}

input:focus, textarea:focus,button:focus, select:focus{
    outline: 1px solid var(--color-grey-900);
    outline-offset: -1px;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-100);
  color: var(--color-grey-300);
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}


`;

export default GlobalStyles;
