const { exec } = require('child_process');

// Define input and output file mappings
const fileMappings = [
  {
    input: './styles/tailwind.css',
    output: './styles/styles.css',
  },
  {
    content: './blocks/header/header.js',
    output: './blocks/header/header.css',
    wrapper: 'header-wrapper',
  },
  {
    content: './blocks/footer/footer.js',
    output: './blocks/footer/footer.css',
    wrapper: 'footer-wrapper',
  },
  {
    content: './blocks/cards/cards.js',
    output: './blocks/cards/cards.css',
    wrapper: 'cards-wrapper',
  },
  {
    content: './blocks/hero/hero.js',
    output: './blocks/hero/hero.css',
    wrapper: 'hero-wrapper',
  },
  {
    content: './blocks/columns/columns.js',
    output: './blocks/columns/columns.css',
    wrapper: 'columns-wrapper',
  },
  {
    content: './blocks/alternating/alternating.js',
    output: './blocks/alternating/alternating.css',
    wrapper: 'alternating-wrapper',
  },
  {
    content: './blocks/timeline-steps/timeline-steps.js',
    output: './blocks/timeline-steps/timeline-steps.css',
    wrapper: 'timeline-steps-wrapper',
  },
  {
    content: './blocks/sticky-right-navigation/sticky-right-navigation.js',
    output: './blocks/sticky-right-navigation/sticky-right-navigation.css',
    wrapper: 'sticky-right-navigation',
  },
  {
    content: './templates/home-page/home-page.js',
    output: './templates/home-page/home-page.css',
  },
  {
    content: './templates/protocols/protocols.js',
    output: './templates/protocols/protocols.css',
  },
  {
    content: './templates/product-category/product-category.js',
    output: './templates/product-category/product-category.css',
  },
  {
    content: './blocks/mini-teasers/mini-teasers.js',
    output: './blocks/mini-teasers/mini-teasers.css',
    wrapper: 'mini-teasers-wrapper',
  },
];

const watch = process.argv[2];

// Loop through each file mapping and run Tailwind CSS CLI
fileMappings.forEach(({
  content, input, output, wrapper,
}) => {
  process.env.IMPORTANT_WRAPPER = `.${wrapper}`;
  const command = `npx tailwindcss ${input ? `-i ${input}` : './styles/proxy-tailwind.css'} ${content ? `--content ${content}` : ''} -o ${output} ${watch ? '--watch' : ''}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`Error compiling ${input}:`, error);
      return;
    }
    // eslint-disable-next-line no-console
    console.log(stdout);
    // eslint-disable-next-line no-console
    console.error(stderr);
  });
});
