import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";


// make sure that parent font size doesn't leak into shadow dom
// const presetRemToPx = ({ baseValue = 16 } = {}) => {
//     return {
//         ...rule,
//         // d: the CSS declaration body
//         // Based on https://github.com/TheDutchCoder/postcss-rem-to-px/blob/main/index.js
//         d: rule.d
//             ? rule.d.replace(
//                 /"[^"]+"|'[^']+'|url\([^)]+\)|(-?\d*\.?\d+)rem/g,
//                 (match, p1) => {
//                     if (p1 === undefined) return match;
//                     return `${p1 * baseValue}${p1 == 0 ? "" : "px"}`;
//                 }
//             )
//             : ""
//     };
// }
// presetRemToPx()
export default defineConfig({

    darkMode: 'class',
    presets: [presetAutoprefix(), presetTailwind(/* options */)],

    theme: {
        extend: {
            colors: {
                neutral: {
                    950: "#0A0A0A"
                }
            }
        },

    }
    /* config */
});