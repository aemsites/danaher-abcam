const { exec } = require('child_process');

// Define input and output file mappings
const fileMappings = [
  {
    input: './styles/tailwind.css',
    output: './styles/styles.css',
  },
  {
    input: './blocks/header/header.css',
    output: './blocks/header/header.css',
  },
  {
    input: './blocks/footer/footer.css',
    output: './blocks/footer/footer.css',
  },
  {
    input: './blocks/cards/cards.css',
    output: './blocks/cards/cards.css',
  },
  {
    input: './blocks/hero/hero.css',
    output: './blocks/hero/hero.css',
  },
  {
    input: './blocks/columns/columns.css',
    output: './blocks/columns/columns.css',
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
