import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";


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
        }
    }
    /* config */
});