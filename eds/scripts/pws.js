/* eslint-disable */
const yetiToPWSurlsMap = {
    // home page
    '/': '/',
    // category landing pages
    '/products/primary-antibodies': '/nav/primary-antibodies',
    '/products/secondary-antibodies': '/nav/secondary-antibodies',
    '/products/multiplex-assay-kits': '/nav/multiplex-assays',
    '/products/antibody-panels': '/nav/primary-antibodies/antibody-panels',
    '/products/antibody-arrays&nbsp;': '/nav/multiplex-assays/antibody-arrays',
    '/products/elisa-kits&nbsp;': '/nav/elisa-and-matched-antibody-pair-kits',
    '/products/matched-antibody-pair-kits':
        '/nav/elisa-and-matched-antibody-pair-kits/matched-antibody-pair-kits-and-reagents',
    '/products/elispot-kits': '/nav/elisa-and-matched-antibody-pair-kits/elispot',
    '/products/lateral-flow':
        '/nav/elisa-and-matched-antibody-pair-kits/lateral-flow-assay-kits-and-reagents',
    '/products/assay-kits': '/nav/cellular-and-biochemical-assays',
    '/products/conjugation-kits':
        '/nav/proteins-and-peptides/antibody-and-protein-labeling-kits',
    '/products/purification-kits':
        '/nav/proteomics-tools/protein-purification-and-quantification',
    '/products/sample-preparation-kits': '/nav/primary-antibodies/accessory-kits',
    '/products/ihc-kits': '/nav/cell-and-tissue-imaging-tools/ihc',
    '/products/proteins-peptides': '/nav/proteins-and-peptides',
    '/products/cell-lines': '/nav/cell-lines-and-lysates',
    '/products/tissue-lysates': '/nav/cell-lines-and-lysates/tissue-lysates',
    '/products/cell-lysates': '/nav/cell-lines-and-lysates/cell-lysates',
    '/products/reagents': '/nav/proteomics-tools',
    '/products/biochemicals':
        '/nav/agonists-activators-antagonists-and-inhibitors',
    // CONTACT US
    '/contact-us': '/index.html?pageconfig=contactus',
    // LEGAL
    '/legal/brexit-statement': '/content/brexit-statement',
    '/legal/changes-to-our-eu-supply-chain':
        '/news/important-changes-to-our-supply-chain',
    '/legal/cookie-policy': '/content/cookie-policy',
    '/legal/licensor-patents': '/content/patents',
    '/legal/limited-use-licenses': '/content/limited-use-licenses',
    '/legal/loyalty-programme-terms-and-conditions':
        '/content/loyalty-programme-terms-and-conditions',
    '/legal/modern-slavery-statement': '/content/modern-slavery-statement',
    '/legal/privacy-policy': '/content/privacy-policy',
    '/legal/rabmab-patents': '/primary-antibodies/rabmab-patents',
    '/legal/referral-program-terms-conditions':
        '/content/abcam-referral-program-terms-conditions',
    '/legal/terms-and-conditions': '/content/abcams-terms-and-conditions',
    '/legal/trademark-information': '/content/legal-information',
    '/legal/us-sales-tax': '/content/us-sales-tax-faqs',
    '/legal/website-terms-of-use': '/content/website-terms-of-use',
    // APPLICATIONS
    '/technical-resources/applications/chip': '/tag/chipseq',
    '/technical-resources/applications/chip/troubleshooting':
        '/protocols/chip-troubleshooting-tips',
    '/technical-resources/applications/elisa': '/tag/elisa',
    '/technical-resources/applications/elisa/protocols':
        '/protocols/tissue-and-cell-preparation-for-elisas-and-cellular-assays',
    '/technical-resources/applications/elisa/troubleshooting':
        '/help/elisa-troubleshooting-tips',
    '/technical-resources/applications/flow-cytometry':
        '/nav/primary-antibodies/flow-cytometry-antibodies',
    '/technical-resources/applications/flow-cytometry/protocols':
        '/tag/protocols%20flow',
    '/technical-resources/applications/flow-cytometry/troubleshooting':
        '/protocols/flow-cytometry-troubleshooting-tips-1',
    '/technical-resources/applications/icc': '/tag/icc',
    '/technical-resources/applications/icc/protocols':
        '/primary-antibodies/new-resources-guide-for-imaging-reagents',
    '/technical-resources/applications/ihc': '/tag/ihc',
    '/technical-resources/applications/ihc/protocols':
        '/protocols/ihc-fixation-protocol',
    '/technical-resources/applications/ihc/troubleshooting':
        '/help/troubleshooting-and-using-controls-in-ihc-and-icc',
    '/technical-resources/applications/ip': '/tag/ip',
    '/technical-resources/applications/ip/troubleshooting':
        '/protocols/immunoprecipitation-troubleshooting-tips',
    '/technical-resources/applications/western-blot': '/tag/western-blot',
    '/technical-resources/applications/western-blot/protocols':
        '/tag/western%20blot%20protocols',
    '/technical-resources/applications/western-blot/troubleshooting':
        '/help/western-blot-troubleshooting-tips',
    // GUIDES
    '/technical-resources/guides/antibody-basics-guide': '/tag/antibody%20guide',
    '/technical-resources/guides/antibody-basics/an-introduction-to-antibody-production':
        '/protocols/a-comparison-between-polyclonal-and-monoclonal',
    '/technical-resources/guides/antibody-basics/antibody-basics':
        '/protocols/antibody-structure-and-isotypes',
    '/technical-resources/guides/antibody-basics/antibody-methods-and-techniques':
        '/protocols/antibody-methods-and-techniques',
    '/technical-resources/guides/antibody-basics/antibody-terms-glossary':
        '/protocols/glossary',
    '/technical-resources/guides/antibody-basics/how-to-choose-and-use-antibodies':
        '/primary-antibodies/a-guide-to-antibody-validation',
    '/technical-resources/guides/cell-death-guide':
        '/cancer/studying-non-apoptotic-cell-death',
    '/technical-resources/guides/cell-health-guide':
        '/kits/cell-health-assays-guide',
    '/technical-resources/guides/cell-health/apoptosis':
        '/kits/apoptosis-analysis-guide-free-ebook-download',
    '/technical-resources/guides/cell-health/cell-viability-assays':
        '/kits/cell-proliferation-assays-and-cell-cycle-assays',
    '/technical-resources/guides/conjugation-guide':
        '/kits/your-guide-to-antibody-conjugation',
    '/technical-resources/guides/elisa-guide':
        '/protocols/the-complete-elisa-guide',
    '/technical-resources/guides/elisa/choosing-how-to-analyse-elisa-for-your-experiment':
        '/kits/elisa-analysis',
    '/technical-resources/guides/elisa/choosing-the-right-elisa-for-your-experiment':
        '/kits/choose-the-right-elisa-kit-for-your-sample',
    '/technical-resources/guides/elisa/controls-in-elisa':
        '/content/control-samples-required-for-elisa-protocol',
    '/technical-resources/guides/elisa/data-analysis-for-elisa':
        '/protocols/calculating-and-evaluating-elisa-data',
    '/technical-resources/guides/elisa/elisa-terms-glossary':
        '/kits/elisa-terms-glossary',
    '/technical-resources/guides/elisa/sample-preparation-for-elisa':
        '/protocols/elisa-sample-preparation-guide-1',
    '/technical-resources/guides/elisa/what-is-an-elisa': '/kits/elisa-principle',
    '/technical-resources/guides/epigenetics-guide':
        '/epigenetics/epigenetics-application-guide',
    '/technical-resources/guides/epigenetics/chromatin-accessibility-and-architecture':
        '/epigenetics/chromatin-accessibility-and-architecture',
    '/technical-resources/guides/epigenetics/chromatin-profiling-using-chic-cut-and-run':
        '/epigenetics/chromatin-profiling-guide',
    '/technical-resources/guides/epigenetics/dna-methylation-and-demethylation':
        '/epigenetics/dna-methylation-and-demethylation',
    '/technical-resources/guides/epigenetics/histone-modifications':
        '/epigenetics/histone-modifications',
    '/technical-resources/guides/epigenetics/rna-modifications':
        '/epigenetics/rna-modification-antibody-controls',
    '/technical-resources/guides/epigenetics/studying-epigenetics-using-chip':
        '/epigenetics/advances-in-chip-seq-analysis-with-small-samples',
    '/technical-resources/guides/flow-cytometry/designing-a-multicolor-protocol':
        '/primary-antibodies/multicolor-flow-cytometry-guide',
    '/technical-resources/guides/flow-cytometry/recommended-controls-for-flow-cytometry':
        '/protocols/recommended-controls-for-flow-cytometry',
    '/technical-resources/guides/flow-cytometry/what-is-flow-cytometry':
        '/protocols/introduction-to-flow-cytometry',
    '/technical-resources/guides/fluorescence':
        '/secondary-antibodies/fluorescence-guide',
    '/technical-resources/guides/fluorescence/choosing-the-right-fluorophores-for-your-experiment':
        '/content/choosing-a-fluorescent-protein',
    '/technical-resources/guides/fluorescence/fluorescence-resonance-energy-transfer':
        '/content/fluorescence-resonance-energy-transfer-fret-assays',
    '/technical-resources/guides/fluorescence/time-resolved-fluorescence':
        '/content/time-resolved-fluorescence-trf-introduction',
    '/technical-resources/guides/fluorescence/what-are-fluorophores':
        '/primary-antibodies/understanding-fluorophores',
    '/technical-resources/guides/fusion-tags/affinity-tags':
        '/proteins/affinity-tags',
    '/technical-resources/guides/fusion-tags/applications-of-fusion-tags':
        '/proteins/detection-and-applications-of-fusion-tags',
    '/technical-resources/guides/fusion-tags/epitope-tags':
        '/proteins/epitope-tags',
    '/technical-resources/guides/fusion-tags/fusion-tags':
        '/proteins/fusion-tags',
    '/technical-resources/guides/fusion-tags/tandem-affinity-purfication-and-tag-clevage':
        '/proteins/tandem-affinity-purification-and-tag-cleavage',
    '/technical-resources/guides/ihc-guide':
        '/content/immunohistochemistry-the-complete-guide',
    '/technical-resources/guides/ihc/antibodies-in-ihc':
        '/kits/choosing-and-optimising-primary-antibodies-for-ihc',
    '/technical-resources/guides/ihc/antigen-retrieval-and-permeabilization':
        '/kits/antigen-retrieval-for-ihc',
    '/technical-resources/guides/ihc/blocking-in-ihc': '/kits/blocking-for-ihc',
    '/technical-resources/guides/ihc/controls-in-ihc': '/kits/controls-for-ihc',
    '/technical-resources/guides/ihc/detection-and-amplification-systems':
        '/kits/chromogenic-detection-in-ihc',
    '/technical-resources/guides/ihc/sample-preparation-for-ihc':
        '/kits/sample-preparation-for-ihc',
    '/technical-resources/guides/ihc/what-is-ihc':
        '/kits/introduction-to-immunohistochemistry-ihc',
    '/technical-resources/guides/western-blot/buffer-and-stock-solutions':
        '/protocols/buffer-and-stock-solutions-for-western-blot',
    '/technical-resources/guides/western-blot/electrophoresis':
        '/protocols/electrophoresis-for-western-blot',
    '/technical-resources/guides/western-blot/fluorescent-western-blot':
        '/secondary-antibodies/hints-and-tips-for-fluorescent-western-blotting',
    '/technical-resources/guides/western-blot/introduction-to-western-blot':
        '/content/western-blot-introduction',
    '/technical-resources/guides/western-blot/membrane-stripping':
        '/protocols/western-blot-membrane-stripping-for-restaining-protocol',
    '/technical-resources/guides/western-blot/protein-transfer-and-visualization-in-western-blot':
        '/protocols/transfer-and-staining-of-proteins-in-western-blot',
    '/technical-resources/guides/western-blot/recommended-controls-for-western-blot':
        '/primary-antibodies/loading-control-guide',
    '/technical-resources/guides/western-blot/sample-preparation-for-western-blot':
        '/protocols/sample-preparation-for-western-blot',

    // PATHWAYS
    '/technical-resources/pathways': '/tag/interactive%20pathways',
    '/technical-resources/pathways/adult-neurogenesis-pathway':
        '/neuroscience/adult-neurogenesis-poster',
    '/technical-resources/pathways/apoptosis-and-cancer-signaling-pathway':
        '/pathways/apoptosis-and-cancer-signaling-pathway-card',
    '/technical-resources/pathways/apoptosis-mitochondrial-and-death-receptor-pathways':
        '/content/apoptosis-mitochondrial-and-death-receptor-pathways',
    '/technical-resources/pathways/apoptosis-pathway':
        '/pathways/apoptosis-pathway',
    '/technical-resources/pathways/autophagy-an-overview':
        '/cancer/autophagy-an-overview',
    '/technical-resources/pathways/calcium-signaling-pathway':
        '/pathways/calcium-signaling-interactive-pathway',
    '/technical-resources/pathways/cancer-epigenetics-pathway':
        '/epigenetics/cancer-epigenetics-poster',
    '/technical-resources/pathways/cancer-immunotherapy-and-the-pd1pdl1-pathway':
        '/cancer/cancer-immunotherapy-and-the-pd1pdl1-pathway',
    '/technical-resources/pathways/cancer-metabolism-pathway':
        '/pathways/cancer-metabolism-poster',
    '/technical-resources/pathways/cell-adhesion-and-metastasis-pathway':
        '/cancer/cell-adhesion-and-metastasis-poster',
    '/technical-resources/pathways/chemokine-signaling-interactive-pathway':
        '/pathways/chemokine-signaling-interactive-pathway',
    '/technical-resources/pathways/complement-cascade-and-its-inhibitors':
        '/pathways/complement-cascade-and-its-inhibitors-1',
    '/technical-resources/pathways/cytokine-network-pathway':
        '/pathways/cytokine-network-interactive-poster',
    '/technical-resources/pathways/dna-damage-response-pathway':
        '/pathways/dna-damage-response-pathway',
    '/technical-resources/pathways/dna-repair-pathways-poster':
        '/pathways/dna-repair-pathways-poster',
    '/technical-resources/pathways/epigenetic-modifications-poster':
        '/pathways/epigenetic-modifications-poster',
    '/technical-resources/pathways/epigenetics-in-acute-myeloid-leukemia-poster':
        '/epigenetics/epigenetics-in-acute-myeloid-leukemia',
    '/technical-resources/pathways/er-stress-pathway':
        '/pathways/er-stress-interactive-pathway',
    '/technical-resources/pathways/excitatory-synapse-pathway':
        '/neuroscience/excitatory-synapse-pathway-card',
    '/technical-resources/pathways/extracellular-vesicles':
        '/pathways/secreted-extracellular-vesicles-pathway',
    '/technical-resources/pathways/fatty-acid-oxidation':
        '/pathways/fatty-acid-oxidation',
    '/technical-resources/pathways/fluorochrome-chart-poster':
        '/secondary-antibodies/fluorochrome-chart-a-complete-guide',
    '/technical-resources/pathways/glia-in-demyelinating-diseases':
        '/pathways/glia-in-demyelinating-diseases',
    '/technical-resources/pathways/hedgehog-signaling-pathway':
        '/pathways/hedgehog-signaling-pathway',
    '/technical-resources/pathways/hif-1alpha-pathway':
        '/pathways/hif-1alpha-pathway',
    '/technical-resources/pathways/immune-cell-markers-poster':
        '/primary-antibodies/immune-cell-markers-poster',
    '/technical-resources/pathways/inflammatory-pain-pathway':
        '/pathways/inflammatory-pain-pathway',
    '/technical-resources/pathways/insulin-signaling-pathway':
        '/pathways/insulin-signaling-interactive-pathway',
    '/technical-resources/pathways/interferon-signaling-pathway':
        '/pathways/interferon-signaling-pathway',
    '/technical-resources/pathways/m6a-functions-and-distribution':
        '/epigenetics/m6a-functions-and-distribution',
    '/technical-resources/pathways/mapk-erk12-pathway':
        '/pathways/mapk-erk12-interactive-pathway',
    '/technical-resources/pathways/mapk-signaling-pathway':
        '/pathways/mapk-signaling-pathway',
    '/technical-resources/pathways/mitophagy': '/neuroscience/mitophagy-pathway',
    '/technical-resources/pathways/mtor-pathway': '/pathways/mtor-pathway',
    '/technical-resources/pathways/neuroinflammation-and-alzheimers-disease-pathway':
        '/neuroscience/neuroinflammation-and-alzheimers-disease-poster',
    '/technical-resources/pathways/new-avenues-for-brain-repair-poster':
        '/neuroscience/new-avenues-for-brain-repair-poster',
    '/technical-resources/pathways/nitric-oxide-signaling':
        '/pathways/nitric-oxide-signaling',
    '/technical-resources/pathways/overview-of-nf-kb-signaling':
        '/research-areas/overview-of-nf-kb-signaling',
    '/technical-resources/pathways/oxidative-phosphorylation-pathway':
        '/kits/oxidative-phosphorylation-pathway',
    '/technical-resources/pathways/p65-and-the-nf-kb-inflammatory-pathway':
        '/cancer/p65-and-the-nf-b-inflammatory-pathway',
    '/technical-resources/pathways/pi3k-akt-mtor-pathway':
        '/pathways/pi3k-akt-mtor-pathway',
    '/technical-resources/pathways/rna-modifications-pathway':
        '/epigenetics/rna-modifications-poster',
    '/technical-resources/pathways/tgf-beta-signaling-pathway':
        '/pathways/tgf-beta-signaling-pathway',
    '/technical-resources/pathways/the-role-of-gsk3-in-cell-signaling':
        '/neuroscience/the-role-of-gsk3-in-cell-signaling',
    '/technical-resources/pathways/tumor-microenvironment-pathway':
        '/cancer/the-tumor-microenvironment-a-cellular-conspiracy',
    '/technical-resources/pathways/vegf-signaling-pathway':
        '/pathways/vegf-signaling-interactive-pathway',
    '/technical-resources/pathways/wnt-signaling-pathway':
        '/pathways/wnt-signaling-pathway',
    // PRODUCT-OVERVIEW
    '/technical-resources/product-overview/alexa-fluor-secondary-antibodies':
        '/secondary-antibodies/alexa-fluor-488-conjugated-antibodies',
    '/technical-resources/product-overview/alpha-synuclein-proteins':
        '/neuroscience/active-alpha-synuclein-proteins',
    '/technical-resources/product-overview/antibodies-for-digital-spatial-profiling':
        '/primary-antibodies/digital-spatial-profiling',
    '/technical-resources/product-overview/antibodies-to-histone-modifications':
        '/epigenetics/histone-modification-antibodies',
    '/technical-resources/product-overview/antibodies-to-polycomb-and-chromatin-remodeling':
        '/epigenetics/polycomb-and-chromatin-remodeling-research-tools',
    '/technical-resources/product-overview/antibodies-to-rna-modifications':
        '/epigenetics/antibodies-to-rna-modifications',
    '/technical-resources/product-overview/antibody-panels-to-immune-checkpoints':
        '/primary-antibodies/immuno-oncology-antibody-panels-for-ihc',
    '/technical-resources/product-overview/assay-kits-for-ros-oxidative-stress-and-antioxidants':
        '/kits/assays-for-ros-oxidative-stress-and-antioxidants',
    '/technical-resources/product-overview/bioactive-proteins':
        '/proteins/bioactive-proteins-at-abcam',
    '/technical-resources/product-overview/biotin-secondary-antibodies':
        '/secondary-antibodies/detect-low-abundance-proteins-with-biotinylated-antibodies',
    '/technical-resources/product-overview/catchpoint-simplestep-elisa-kits':
        '/kits/catchpoint-simplestep-elisa-kits',
    '/technical-resources/product-overview/chic-cut-and-run-seq-validated-recombinant-antibodies':
        '/epigenetics/chic-cut-and-run-seq-validated-recombinant-antibodies',
    '/technical-resources/product-overview/chromatin-immunoprecipitation-kits':
        '/kits/chromatin-immunoprecipitation',
    '/technical-resources/product-overview/conjugated-antibodies':
        '/primary-antibodies/highly-validated-antibody-conjugates',
    '/technical-resources/product-overview/conjugation-kits':
        '/kits/antibody-conjugation-kits',
    '/technical-resources/product-overview/dylight-secondary-antibodies':
        '/reagents/dylight-fluorochrome-conjugated-secondary-antibodies',
    '/technical-resources/product-overview/elisa-kits': '/kits/elisa-kits',
    '/technical-resources/product-overview/enzymatic-double-staining-ihc-kits':
        '/kits/enzymatic-double-staining-ihc-kits',
    '/technical-resources/product-overview/enzymatic-triple-staining-ihc-kits':
        '/kits/enzymatic-triple-staining-ihc-kits',
    '/technical-resources/product-overview/glutamate-receptors':
        '/content/glutamate-receptors',
    '/technical-resources/product-overview/gold-conjugated-secondary-antibodies':
        '/secondary-antibodies/gold-nanoparticle-conjugated-secondary-antibodies-abgold',
    '/technical-resources/product-overview/gold-conjugation-kits':
        '/kits/gold-conjugation-kits',
    '/technical-resources/product-overview/histone-methyltransferase-and-demethylase-inhibitors':
        '/kits/histone-methyltransferase-and-demethylase-inhibitors',
    '/technical-resources/product-overview/hrp-secondary-antibodies':
        '/secondary-antibodies/hrp-secondary-antibodies',
    '/technical-resources/product-overview/immunoglobulin-fab-and-fab2-fragment-antibodies':
        '/secondary-antibodies/advantages-of-immunoglobulin-fab-and-fab2-fragments',
    '/technical-resources/product-overview/kits-to-measure-cellular-metabolism':
        '/kits/cellular-metabolism-assays',
    '/technical-resources/product-overview/kits-to-measure-dna-methylation':
        '/kits/dna-methylation-kits',
    '/technical-resources/product-overview/kits-to-measure-histone-methylation':
        '/kits/assays-for-histone-methylation',
    '/technical-resources/product-overview/knockout-cell-lines':
        '/reagents/fast-track-your-research-with-crispr-knockout-cell-lines',
    '/technical-resources/product-overview/knockout-cell-lysates':
        '/reagents/knockout-lysates',
    '/technical-resources/product-overview/lateral-flow-assays':
        '/content/fluorescent-detection-in-lateral-flow',
    '/technical-resources/product-overview/live-cell-staining-kits':
        '/kits/cytopainter-kits-and-reagents',
    '/technical-resources/product-overview/matched-antibody-pair-kits-for-elisa':
        '/kits/matched-antibody-pair-kits-for-elisa',
    '/technical-resources/product-overview/membrane-antibody-arrays':
        '/kits/membrane-antibody-arrays',
    '/technical-resources/product-overview/neuronal-cell-lysates':
        '/reagents/consistent-and-scalable-human-stem-cell-derived-glutamatergic-neurons-for-research-and-drug-discovery',
    '/technical-resources/product-overview/our-10x-genomics-compatible-antibodies':
        '/content/our-10x-genomics-compatible-products',
    '/technical-resources/product-overview/pbs-only-formulations-for-recombinant-antibodies':
        '/primary-antibodies/pbs-only-formulations-for-recombinant-rabmab-antibodies',
    '/technical-resources/product-overview/pcambia-vectors':
        '/kits/advantages-of-pcambia-vectors',
    '/technical-resources/product-overview/pre-adsorbed-secondary-antibodies':
        '/secondary-antibodies/pre-adsorbed-secondary-antibodies',
    '/technical-resources/product-overview/premium-proteins':
        '/proteins/premium-grade-proteins-at-abcam',
    '/technical-resources/product-overview/protease-and-phosphatase-inhibitor-cocktails':
        '/content/protease-and-phosphatase-inhibitor-cocktails-2',
    '/technical-resources/product-overview/quantitative-antibody-arrays':
        '/kits/quantitative-antibody-arrays-1',
    '/technical-resources/product-overview/recombinant-antibodies':
        '/primary-antibodies/recombinant-antibodies',
    '/technical-resources/product-overview/recombinant-proteins':
        '/proteins/recombinant-proteins-and-expression-systems',
    '/technical-resources/product-overview/sample-size-antibodies':
        '/primary-antibodies/sample-size-antibodies',
    '/technical-resources/product-overview/simplestep-elisa-kits':
        '/kits/simplestep-elisa-kits',

    // PROTOCOLS:
    '/technical-resources/protocols': '/content/top-protocols',
    '/technical-resources/protocols/alpha-synuclein-assay':
        '/neuroscience/alpha-synuclein-protein-assay-protocol',
    '/technical-resources/protocols/annexin-v-for-apoptosis':
        '/protocols/annexin-v-detection-protocol-for-apoptosis',
    '/technical-resources/protocols/apoptosis-dna-fragmentation':
        '/protocols/apoptosis-dna-fragmentation-analysis-protocol',
    '/technical-resources/protocols/automated-ihc':
        '/cancer/anti-pd-l1-28-8-rabmab-protocols-for-automated-immunohistochemistry',
    '/technical-resources/protocols/bielschowskys-silver-stain':
        '/protocols/bielschowskys-silver-stain-protocol',
    '/technical-resources/protocols/blocking-with-immunizing-peptides':
        '/protocols/blocking-with-immunizing-peptide-protocol-peptide-competition',
    '/technical-resources/protocols/blue-native-electrophoresis':
        '/protocols/blue-native-electrophoresis-protocol',
    '/technical-resources/protocols/brdu-staining':
        '/protocols/brdu-staining-protocol',
    '/technical-resources/protocols/chromatin-preparation-from-tissues':
        '/epigenetics/chromatin-preparation-from-tissues-for-chromatin-immunoprecipitation-chip',
    '/technical-resources/protocols/clarity-staining':
        '/protocols/clarity-protocol',
    '/technical-resources/protocols/clip':
        '/protocols/uv-cross-linking-and-immunoprecipitation-clip',
    '/technical-resources/protocols/competitive-dot-blot':
        '/protocols/competitive-dot-blot-protocol',
    '/technical-resources/protocols/counting-cells-using-a-haemocytometer':
        '/protocols/counting-cells-using-a-haemocytometer',
    '/technical-resources/protocols/cross-linking-chip-seq':
        '/protocols/cross-linking-chromatin-immunoprecipitation-x-chip-protocol',
    '/technical-resources/protocols/cryopreservation-of-mammalian-cell-lines':
        '/protocols/cryopreservation-of-mammalian-cell-lines-video-protocol',
    '/technical-resources/protocols/cut-and-run-protocol':
        '/protocols/chic-cut-and-run-seq-protocol',
    '/technical-resources/protocols/deproteinization':
        '/protocols/deproteinization-protocol',
    '/technical-resources/protocols/differentiation-of-3t3-l1-cells-into-adipocyte-like-cells':
        '/protocols/differentiation-of-3t3-l1-cells-into-adipocyte-like-cells-protocol',
    '/technical-resources/protocols/direct-and-indirect-elisa':
        '/protocols/direct-elisa-using-primary-antibody-protocol',
    '/technical-resources/protocols/dna-rna-ip':
        '/protocols/dna-rna-immunoprecipitation-drip-protocol',
    '/technical-resources/protocols/dot-blot': '/protocols/dot-blot-protocol',
    '/technical-resources/protocols/dual-x-chip':
        '/protocols/dual-cross-linking-chip-protocol',
    '/technical-resources/protocols/elispot': '/protocols/elispot-protocol',
    '/technical-resources/protocols/flisa':
        '/protocols/direct-elisa-using-fluorescent-substrate-protocol',
    '/technical-resources/protocols/flow-cytometry&nbsp;for-intracellular-and-extracellular-targets':
        '/protocols/flow-cytometry-intracellular-staining-protocol',
    '/technical-resources/protocols/flow-cytometry-design-and-sample-preparation':
        '/secondary-antibodies/flow-cytometry-experimental-design-and-sample-preparation',
    '/technical-resources/protocols/flow-cytometry-with-propidium-iodide-staining':
        '/protocols/flow-cytometric-analysis-of-cell-cycle-with-propidium-iodide-dna-staining',
    '/technical-resources/protocols/fluorescent-western-blot':
        '/secondary-antibodies/fluorescent-western-blot-protocol--irdye-secondary-antibodies',
    '/technical-resources/protocols/fura-2-am-imaging':
        '/protocols/fura-2-am-imaging-protocol',
    '/technical-resources/protocols/gelatin-zymography':
        '/protocols/gelatin-zymography-protocol',
    '/technical-resources/protocols/histone-western-blot':
        '/protocols/histone-extraction-protocol-for-western-blot',
    '/technical-resources/protocols/hrp-antibody-conjugation':
        '/protocols/hrp-antibody-labeling-protocol',
    '/technical-resources/protocols/icc':
        '/protocols/immunocytochemistry-immunofluorescence-protocol',
    '/technical-resources/protocols/ihc-antigen-retrieval':
        '/protocols/ihc-antigen-retrieval-protocol',
    '/technical-resources/protocols/ihc-with-samples-in-paraffin':
        '/protocols/ihc-deparaffinization-protocol',
    '/technical-resources/protocols/immunofluorescence-to-detect-caspases':
        '/protocols/caspase-apoptosis-detection-protocol',
    '/technical-resources/protocols/immunoprecipitation':
        '/protocols/immunoprecipitation-protocol',
    '/technical-resources/protocols/in-cell-elisa':
        '/protocols/in-cell-elisa-ice',
    '/technical-resources/protocols/in-situ-hybridization':
        '/protocols/ish-in-situ-hybridization-protocol',
    '/technical-resources/protocols/induce-apopotosis':
        '/protocols/induction-of-apoptosis-in-cells',
    '/technical-resources/protocols/isolation-of-bone-marrow-dervied-dendritic-cells':
        '/protocols/bmdc-isolation-protocol',
    '/technical-resources/protocols/isolation-of-human-platelets-from-whole-blood':
        '/protocols/isolation-of-human-platelets-from-whole-blood',
    '/technical-resources/protocols/mitochondrial-purification-for-western-blot':
        '/protocols/mitochondrial-purification-protocol-for-western-blot-samples',
    '/technical-resources/protocols/mouse-on-mouse-staining':
        '/protocols/mouse-on-mouse-staining-protocol',
    '/technical-resources/protocols/mtt-assay': '/kits/mtt-assay-protocol',
    '/technical-resources/protocols/native-chip':
        '/protocols/native-chromatin-immunoprecipitation-protocol',
    '/technical-resources/protocols/nuclear-extraction-and-fractionation':
        '/protocols/nuclear-extraction-protocol-nuclear-fractionation-protocol',
    '/technical-resources/protocols/phalloidin-staining':
        '/protocols/phalloidin-staining-protocol',
    '/technical-resources/protocols/protein-dephosphorylation':
        '/protocols/protein-dephosphorylation-protocol',
    '/technical-resources/protocols/rna-dot-blot':
        '/protocols/rna-dot-blot-protocol',
    '/technical-resources/protocols/rna-immunoprecipitation':
        '/epigenetics/rna-immunoprecipitation-rip-protocol',
    '/technical-resources/protocols/rna-isolation-and-reverse-transcription':
        '/protocols/rna-isolation-protocol-cells-in-culture',
    '/technical-resources/protocols/sandwich-elisa':
        '/kits/how-to-use-matched-antibody-pair-kits-for-sandwich-elisa',
    '/technical-resources/protocols/sodium-azide-removal':
        '/protocols/sodium-azide-removal-protocol',
    '/technical-resources/protocols/subcellular-fractination':
        '/protocols/subcellular-fractionation-protocol',
    '/technical-resources/protocols/western-blot':
        '/protocols/general-western-blot-protocol',
    '/technical-resources/protocols/western-blot-for-high-molecular-weights':
        '/protocols/western-blot-protocol-for-high-molecular-weight-proteins---150-300-kda',
    '/technical-resources/protocols/western-blot-for-phosporylated-proteins':
        '/protocols/procedure-for-detection-of-phosphorylated-proteins-in-western-blot',
    '/technical-resources/protocols/wholemount-staining-for-ihc':
        '/protocols/whole-mount-staining-protocol',
}

export { yetiToPWSurlsMap };
/* eslint-enable */
