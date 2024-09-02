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
    content: './blocks/accordion/accordion.js',
    output: './blocks/accordion/accordion.css',
    wrapper: 'accordion-wrapper',
  },
  {
    content: './blocks/teasers/teasers.js',
    output: './blocks/teasers/teasers.css',
    wrapper: 'teasers-wrapper',
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
  {
    content: './blocks/alert-banner/alert-banner.js',
    output: './blocks/alert-banner/alert-banner.css',
    wrapper: 'alert-banner-wrapper',
  },
  {
    content: './templates/blog-page/blog-page.js',
    output: './templates/blog-page/blog-page.css',
  },
  {
    content: './templates/pathways/pathways.js',
    output: './templates/pathways/pathways.css',
  },
  {
    content: './templates/product-detail/product-detail.js',
    output: './templates/product-detail/product-detail.css',
  },
  {
    content: './templates/search-results/search-results.js',
    output: './templates/search-results/search-results.css',
  },
  {
    content: './blocks/child-page/child-page.js',
    output: './blocks/child-page/child-page.css',
    wrapper: 'child-page-wrapper',
  },
  {
    content: './blocks/table-block/table-block.js',
    output: './blocks/table-block/table-block.css',
    wrapper: 'table-block-wrapper',
  },
  {
    content: './blocks/title-card/title-card.js',
    output: './blocks/title-card/title-card.css',
    wrapper: 'title-card-wrapper',
  },
  {
    content: './blocks/breadcrumb/breadcrumb.js',
    output: './blocks/breadcrumb/breadcrumb.css',
    wrapper: 'breadcrumb-wrapper',
  },
  {
    content: './blocks/pagination/pagination.js',
    output: './blocks/pagination/pagination.css',
    wrapper: 'pagination-wrapper',
  },
  {
    content: './blocks/card-slider/card-slider.js',
    output: './blocks/card-slider/card-slider.css',
    wrapper: 'card-slider-wrapper',
  },
  {
    content: './blocks/drawer/drawer.js',
    output: './blocks/drawer/drawer.css',
    wrapper: 'drawer-wrapper',
  },
  {
    content: './blocks/download-block/download-block.js',
    output: './blocks/download-block/download-block.css',
    wrapper: 'download-block-wrapper',
  },
  {
    content: './blocks/tab-component/tab-component.js',
    output: './blocks/tab-component/tab-component.css',
    wrapper: 'tab-component-wrapper',
  },
  {
    content: './blocks/episodes/episodes.js',
    output: './blocks/episodes/episodes.css',
    wrapper: 'episodes-wrapper',
  },
  {
    content: './blocks/hero-video/hero-video.js',
    output: './blocks/hero-video/hero-video.css',
    wrapper: 'hero-video-wrapper',
  },
  {
    content: './blocks/marketo-form/marketo-form.js',
    output: './blocks/marketo-form/marketo-form.css',
    wrapper: 'marketo-form-wrapper',
  },
  {
    content: './blocks/disclaimer/disclaimer.js',
    output: './blocks/disclaimer/disclaimer.css',
    wrapper: 'disclaimer-wrapper',
  },
  {
    content: './blocks/product-tabs/product-tabs.js',
    output: './blocks/product-tabs/product-tabs.css',
    wrapper: 'product-tabs-wrapper',
  },
  {
    content: './blocks/product-overview/product-overview.js',
    output: './blocks/product-overview/product-overview.css',
    wrapper: 'product-overview-wrapper',
  },
  {
    content: './blocks/product-buybox/product-buybox.js',
    output: './blocks/product-buybox/product-buybox.css',
    wrapper: 'product-buybox-wrapper',
  },
  {
    content: './blocks/product-reactivity/product-reactivity.js',
    output: './blocks/product-reactivity/product-reactivity.css',
    wrapper: 'product-reactivity-wrapper',
  },
  {
    content: './blocks/product-target-data/product-target-data.js',
    output: './blocks/product-target-data/product-target-data.css',
    wrapper: 'product-target-data-wrapper',
  },
  {
    content: './blocks/recommended-products/recommended-products.js',
    output: './blocks/recommended-products/recommended-products.css',
    wrapper: 'recommended-products-wrapper',
  },
  {
    content: './blocks/recently-viewed/recently-viewed.js',
    output: './blocks/recently-viewed/recently-viewed.css',
    wrapper: 'recently-viewed-wrapper',
  },
  {
    content: './blocks/product-datasheet/product-datasheet.js',
    output: './blocks/product-datasheet/product-datasheet.css',
    wrapper: 'product-datasheet-wrapper',
  },
  {
    content: './blocks/product-downloads/product-downloads.js',
    output: './blocks/product-downloads/product-downloads.css',
    wrapper: 'product-downloads-wrapper',
  },
  {
    content: './blocks/product-protocols/product-protocols.js',
    output: './blocks/product-protocols/product-protocols.css',
    wrapper: 'product-protocols-wrapper',
  },
  {
    content: './blocks/cta/cta.js',
    output: './blocks/cta/cta.css',
    wrapper: 'cta-wrapper',
  },
  {
    content: './blocks/page-navigation/page-navigation.js',
    output: './blocks/page-navigation/page-navigation.css',
    wrapper: 'page-navigation-wrapper',
  },
  {
    content: './blocks/product-promise/product-promise.js',
    output: './blocks/product-promise/product-promise.css',
    wrapper: 'product-promise-wrapper',
  },
  {
    content: './blocks/product-list/product-list.js',
    output: './blocks/product-list/product-list.css',
    wrapper: 'product-list-wrapper',
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
