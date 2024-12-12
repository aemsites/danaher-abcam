const { exec } = require('child_process');

// Define input and output file mappings
const fileMappings = [
  {
    input: './eds/styles/tailwind.css',
    output: './eds/styles/styles.css',
  },
  {
    content: './eds/blocks/header/header.js',
    output: './eds/blocks/header/header.css',
    wrapper: 'header-wrapper',
  },
  {
    content: './eds/blocks/footer/footer.js',
    output: './eds/blocks/footer/footer.css',
    wrapper: 'footer-wrapper',
  },
  {
    content: ['./eds/blocks/carousel/carousel.js', './eds/scripts/carousel.js'],
    output: './eds/blocks/carousel/carousel.css',
    wrapper: 'carousel-wrapper',
  },
  {
    content: './eds/blocks/cards/cards.js',
    output: './eds/blocks/cards/cards.css',
    wrapper: 'cards-wrapper',
  },
  {
    content: './eds/blocks/hero/hero.js',
    output: './eds/blocks/hero/hero.css',
    wrapper: 'hero-wrapper',
  },
  {
    content: './eds/blocks/columns/columns.js',
    output: './eds/blocks/columns/columns.css',
    wrapper: 'columns-wrapper',
  },
  {
    content: './eds/blocks/alternating/alternating.js',
    output: './eds/blocks/alternating/alternating.css',
    wrapper: 'alternating-wrapper',
  },
  {
    content: './eds/blocks/timeline-steps/timeline-steps.js',
    output: './eds/blocks/timeline-steps/timeline-steps.css',
    wrapper: 'timeline-steps-wrapper',
  },
  {
    content: './eds/blocks/accordion/accordion.js',
    output: './eds/blocks/accordion/accordion.css',
    wrapper: 'accordion-wrapper',
  },
  {
    content: './eds/blocks/teasers/teasers.js',
    output: './eds/blocks/teasers/teasers.css',
    wrapper: 'teasers-wrapper',
  },
  {
    content: './eds/blocks/sticky-sections-list/sticky-sections-list.js',
    output: './eds/blocks/sticky-sections-list/sticky-sections-list.css',
    wrapper: 'sticky-sections-list',
  },
  {
    content: './eds/templates/home-page/home-page.js',
    output: './eds/templates/home-page/home-page.css',
  },
  {
    content: './eds/templates/protocols/protocols.js',
    output: './eds/templates/protocols/protocols.css',
  },
  {
    content: './eds/templates/product-category/product-category.js',
    output: './eds/templates/product-category/product-category.css',
  },
  {
    content: './eds/blocks/mini-teasers/mini-teasers.js',
    output: './eds/blocks/mini-teasers/mini-teasers.css',
    wrapper: 'mini-teasers-wrapper',
  },
  {
    content: './eds/blocks/alert-banner/alert-banner.js',
    output: './eds/blocks/alert-banner/alert-banner.css',
    wrapper: 'alert-banner-wrapper',
  },
  {
    content: './eds/templates/blog-page/blog-page.js',
    output: './eds/templates/blog-page/blog-page.css',
  },
  {
    content: './eds/templates/pathways/pathways.js',
    output: './eds/templates/pathways/pathways.css',
  },
  {
    content: './eds/templates/product-detail/product-detail.js',
    output: './eds/templates/product-detail/product-detail.css',
  },
  {
    content: './eds/templates/search-results/search-results.js',
    output: './eds/templates/search-results/search-results.css',
  },
  {
    content: './eds/templates/stories/stories.js',
    output: './eds/templates/stories/stories.css',
  },
  {
    content: './eds/blocks/child-page/child-page.js',
    output: './eds/blocks/child-page/child-page.css',
    wrapper: 'child-page-wrapper',
  },
  {
    content: './eds/blocks/table/table.js',
    output: './eds/blocks/table/table.css',
    wrapper: 'table-wrapper',
  },
  {
    content: './eds/blocks/title-card/title-card.js',
    output: './eds/blocks/title-card/title-card.css',
    wrapper: 'title-card-wrapper',
  },
  {
    content: './eds/blocks/breadcrumb/breadcrumb.js',
    output: './eds/blocks/breadcrumb/breadcrumb.css',
    wrapper: 'breadcrumb-wrapper',
  },
  {
    content: './eds/blocks/pagination/pagination.js',
    output: './eds/blocks/pagination/pagination.css',
    wrapper: 'pagination-wrapper',
  },
  {
    content: './eds/blocks/card-slider/card-slider.js',
    output: './eds/blocks/card-slider/card-slider.css',
    wrapper: 'card-slider-wrapper',
  },
  {
    content: './eds/blocks/drawer/drawer.js',
    output: './eds/blocks/drawer/drawer.css',
    wrapper: 'drawer-wrapper',
  },
  {
    content: './eds/blocks/download/download.js',
    output: './eds/blocks/download/download.css',
    wrapper: 'download-wrapper',
  },
  {
    content: './eds/blocks/tab-component/tab-component.js',
    output: './eds/blocks/tab-component/tab-component.css',
    wrapper: 'tab-component-wrapper',
  },
  {
    content: './eds/blocks/episodes/episodes.js',
    output: './eds/blocks/episodes/episodes.css',
    wrapper: 'episodes-wrapper',
  },
  {
    content: './eds/blocks/hero-video/hero-video.js',
    output: './eds/blocks/hero-video/hero-video.css',
    wrapper: 'hero-video-wrapper',
  },
  {
    content: './eds/blocks/podcasts/podcasts.js',
    output: './eds/blocks/podcasts/podcasts.css',
    wrapper: 'podcasts-wrapper',
  },
  {
    content: './eds/blocks/marketo-form/marketo-form.js',
    output: './eds/blocks/marketo-form/marketo-form.css',
    wrapper: 'marketo-form-wrapper',
  },
  {
    content: './eds/blocks/disclaimer/disclaimer.js',
    output: './eds/blocks/disclaimer/disclaimer.css',
    wrapper: 'disclaimer-wrapper',
  },
  {
    content: './eds/blocks/tabs/tabs.js',
    output: './eds/blocks/tabs/tabs.css',
    wrapper: 'tabs-wrapper',
  },
  {
    content: './eds/blocks/product-overview/product-overview.js',
    output: './eds/blocks/product-overview/product-overview.css',
    wrapper: 'product-overview-wrapper',
  },
  {
    content: './eds/blocks/product-buybox/product-buybox.js',
    output: './eds/blocks/product-buybox/product-buybox.css',
    wrapper: 'product-buybox-wrapper',
  },
  {
    content: './eds/blocks/product-reactivity/product-reactivity.js',
    output: './eds/blocks/product-reactivity/product-reactivity.css',
    wrapper: 'product-reactivity-wrapper',
  },
  {
    content: './eds/blocks/product-target-data/product-target-data.js',
    output: './eds/blocks/product-target-data/product-target-data.css',
    wrapper: 'product-target-data-wrapper',
  },
  {
    content: './eds/blocks/recommended-products/recommended-products.js',
    output: './eds/blocks/recommended-products/recommended-products.css',
    wrapper: 'recommended-products-wrapper',
  },
  {
    content: './eds/blocks/recently-viewed/recently-viewed.js',
    output: './eds/blocks/recently-viewed/recently-viewed.css',
    wrapper: 'recently-viewed-wrapper',
  },
  {
    content: './eds/blocks/product-datasheet/product-datasheet.js',
    output: './eds/blocks/product-datasheet/product-datasheet.css',
    wrapper: 'product-datasheet-wrapper',
  },
  {
    content: './eds/blocks/product-downloads/product-downloads.js',
    output: './eds/blocks/product-downloads/product-downloads.css',
    wrapper: 'product-downloads-wrapper',
  },
  {
    content: './eds/blocks/product-protocols/product-protocols.js',
    output: './eds/blocks/product-protocols/product-protocols.css',
    wrapper: 'product-protocols-wrapper',
  },
  {
    content: './eds/blocks/cta/cta.js',
    output: './eds/blocks/cta/cta.css',
    wrapper: 'cta-wrapper',
  },
  {
    content: './eds/blocks/page-navigation/page-navigation.js',
    output: './eds/blocks/page-navigation/page-navigation.css',
    wrapper: 'page-navigation-wrapper',
  },
  {
    content: './eds/blocks/product-promise/product-promise.js',
    output: './eds/blocks/product-promise/product-promise.css',
    wrapper: 'product-promise-wrapper',
  },
  {
    content: './eds/blocks/product-list/product-list.js',
    output: './eds/blocks/product-list/product-list.css',
    wrapper: 'product-list-wrapper',
  },
  {
    content: './eds/blocks/story-info/story-info.js',
    output: './eds/blocks/story-info/story-info.css',
    wrapper: 'story-info-wrapper',
  },
  {
    content: ['./eds/blocks/story-hub/story-hub.js', './eds/blocks/dynamic-cards/articleCard.js'],
    output: './eds/blocks/story-hub/story-hub.css',
    wrapper: 'story-hub-wrapper',
  },
  {
    content: './eds/blocks/social-media/social-media.js',
    output: './eds/blocks/social-media/social-media.css',
    wrapper: 'social-media-wrapper',
  },
  {
    content: './eds/blocks/learn-more/learn-more.js',
    output: './eds/blocks/learn-more/learn-more.css',
    wrapper: 'learn-more-wrapper',
  },
  {
    content: './eds/blocks/back-navigation/back-navigation.js',
    output: './eds/blocks/back-navigation/back-navigation.css',
    wrapper: 'back-navigation-wrapper',
  },
  {
    content: './eds/blocks/related-stories/related-stories.js',
    output: './eds/blocks/related-stories/related-stories.css',
    wrapper: 'related-stories-wrapper',
  },
  {
    content: ['./eds/blocks/dynamic-cards/dynamic-cards.js', './eds/blocks/dynamic-cards/articleCard.js'],
    output: './eds/blocks/dynamic-cards/dynamic-cards.css',
    wrapper: 'dynamic-cards-wrapper',
  },
  {
    content: './eds/blocks/elouqa-form/elouqa-form.js',
    output: './eds/blocks/elouqa-form/elouqa-form.css',
    wrapper: 'elouqa-form-wrapper',
  },
  {
    content: './eds/templates/webinar/webinar.js',
    output: './eds/templates/webinar/webinar.css',
  },
  {
    content: './eds/blocks/speakers-info/speakers-info.js',
    output: './eds/blocks/speakers-info/speakers-info.css',
    wrapper: 'speakers-info-wrapper',
  },
  {
    content: './eds/blocks/chapter-links/chapter-links.js',
    output: './eds/blocks/chapter-links/chapter-links.css',
    wrapper: 'chapter-links-wrapper',
  },
  {
    content: ['./eds/blocks/related-articles/related-articles.js', './eds/blocks/chapter-links/chapter-links.js'],
    output: './eds/blocks/related-articles/related-articles.css',
    wrapper: 'related-articles-wrapper',
  },
  {
    content: './eds/templates/guide/guide.js',
    output: './eds/templates/guide/guide.css',
  },
  {
    content: './eds/blocks/sidelinks/sidelinks.js',
    output: './eds/blocks/sidelinks/sidelinks.css',
    wrapper: 'sidelinks-wrapper',
  },
  {
    content: './eds/templates/guides-hub/guides-hub.js',
    output: './eds/templates/guides-hub/guides-hub.css',
  },
  {
    content: './eds/blocks/guides-hub-links/guides-hub-links.js',
    output: './eds/blocks/guides-hub-links/guides-hub-links.css',
    wrapper: 'guides-hub-links-wrapper',
  },
  {
    content: './eds/blocks/downloads/downloads.js',
    output: './eds/blocks/downloads/downloads.css',
    wrapper: 'downloads-wrapper',
  },
  {
    content: './eds/templates/topic/topic.js',
    output: './eds/templates/topic/topic.css',
  },
  {
    content: './eds/blocks/video-transcript/video-transcript.js',
    output: './eds/blocks/video-transcript/video-transcript.css',
    wrapper: 'video-transcript-wrapper',
  },
  {
    content: './eds/blocks/cta-banner/cta-banner.js',
    output: './eds/blocks/cta-banner/cta-banner.css',
    wrapper: 'cta-banner-wrapper',
  },
  {
    content: './eds/templates/cross-sell-hub/cross-sell-hub.js',
    output: './eds/templates/cross-sell-hub/cross-sell-hub.css',
  },
];

const watch = process.argv[2];

// Loop through each file mapping and run Tailwind CSS CLI
fileMappings.forEach(({
  content, input, output, wrapper,
}) => {
  process.env.IMPORTANT_WRAPPER = `.${wrapper}`;
  const command = `npx tailwindcss ${input ? `-i ${input}` : './eds/styles/proxy-tailwind.css'} ${content ? `--content ${content}` : ''} -o ${output} ${watch ? '--watch' : ''}`;
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
