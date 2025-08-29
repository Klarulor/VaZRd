// @ts-check
import eslint from "@eslint/js"
import globals from "globals"
import tseslint, { parser } from "typescript-eslint"
import eslintNestJs from "@darraghor/eslint-plugin-nestjs-typed"
import { rules } from "eslint-config-prettier"
// ... and all your other imports

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest
        },
        parser: parser,
        ecmaVersion: 2022,
        sourceType: "module",
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname
        }
      }
    },
    eslintNestJs.configs.flatRecommended,
    {
      rules: {
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/semi": ["error", "always"]
      }
    }
)
