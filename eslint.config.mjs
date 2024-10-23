import tailwind from 'eslint-plugin-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    files: ['**/*.vue'],
    rules: {
      'curly': 'warn',
      'vue/no-v-html': 'off',
      'vue/component-tags-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
  ...tailwind.configs['flat/recommended'],
)
  .append({
    rules: {
      '@stylistic/no-confusing-arrow': 'error',
    },
  })
  .override('nuxt/stylistic', {
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  });
