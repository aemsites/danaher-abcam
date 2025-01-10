export const data = {
  items: [
    {
      authors: [
        'Hyun Sik Lee,Injin Bang,Junghyun You,Tae-Kyeong Jeong,Chang Rok Kim,Minsang Hwang,Jong-Seo Kim,Sung Hee Baek,Ji-Joon Song,Hee-Jung Choi',
      ],
      journal: 'Genes & development',
      name: 'Molecular basis for PHF7-mediated ubiquitination of histone H3.',
      pages: '984-997',
      productCode: 'AB1791',
      publicationDate: '2023-12-26T00:00:00+00:00',
      pubmedId: '37993255',
      volume: '37',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
    {
      authors: [
        'Mirna Barsoum,Roksaneh Sayadi-Boroujeni,Alexander T Stenzel,Philip Bussmann,Juliane Lüscher-Firzlaff,Bernhard Lüscher',
      ],
      journal: 'Scientific reports',
      name: 'Sequential deregulation of histone marks, chromatin accessibility and gene expression in response to PROTAC-induced degradation of ASH2L.',
      pages: '22565',
      productCode: 'AB1791',
      publicationDate: '2024-12-19T00:00:00+00:00',
      pubmedId: '38114530',
      volume: '13',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
    {
      authors: [
        'Benjamin Liffner,Ana Karla Cepeda Diaz,James Blauwkamp,David Anaguano,Sonja Frolich,Vasant Muralidharan,Danny W Wilson,Jeffrey D Dvorin,Sabrina Absalon',
      ],
      journal: 'eLife',
      name: 'Atlas of  intraerythrocytic development using expansion microscopy.',
      pages: '',
      productCode: 'AB1791',
      publicationDate: '2020-12-18T00:00:00+00:00',
      pubmedId: '38108809',
      volume: '12',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
    {
      authors: [
        'Changlin Zhang,Lixiang Liu,Weizhao Li,Mengxiong Li,Xunzhi Zhang,Chi Zhang,Huan Yang,Jiayuan Xie,Wei Pan,Xue Guo,Peng She,Li Zhong,Tian Li',
      ],
      journal: 'Cell death & disease',
      name: 'Upregulation of FAM83F by c-Myc promotes cervical cancer growth and aerobic glycolysis via Wnt/β-catenin signaling activation.',
      pages: '837',
      productCode: 'AB1791',
      publicationDate: '2023-12-16T00:00:00+00:00',
      pubmedId: '38104106',
      volume: '14',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
    {
      authors: [
        'Agnieszka Pierzynska-Mach,Christina Czada,Christopher Vogel,Eva Gwosch,Xenia Osswald,Denis Bartoschek,Alberto Diaspro,Ferdinand Kappes,Elisa Ferrando-May',
      ],
      journal: 'Journal of cell science',
      name: 'DEK oncoprotein participates in heterochromatin replication via SUMO-dependent nuclear bodies.',
      pages: '',
      productCode: 'AB1791',
      publicationDate: '2024-12-15T00:00:00+00:00',
      pubmedId: '37997922',
      volume: '136',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
    {
      authors: [
        'Liping Chen,Shihao Zhu,Tianyuan Liu,Xuan Zhao,Tao Xiang,Xiao Hu,Chen Wu,Dongxin Lin',
      ],
      journal: 'Signal transduction and targeted therapy',
      name: 'Aberrant epithelial cell interaction promotes esophageal squamous-cell carcinoma development and progression.',
      pages: '453',
      productCode: 'AB1791',
      publicationDate: '2026-12-15T00:00:00+00:00',
      pubmedId: '38097539',
      volume: '8',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
    {
      authors: [
        'Hao Zhang,Zhiyuan Jin,Fa Cui,Long Zhao,Xiaoyu Zhang,Jinchao Chen,Jing Zhang,Yanyan Li,Yongpeng Li,Yanxiao Niu,Wenli Zhang,Caixia Gao,Xiangdong Fu,Yiping Tong,Lei Wang,Hong-Qing Ling,Junming Li,Jun Xiao',
      ],
      journal: 'Nature communications',
      name: 'Epigenetic modifications regulate cultivar-specific root development and metabolic adaptation to nitrogen availability in wheat.',
      pages: '8238',
      productCode: 'AB1791',
      publicationDate: '2023-12-12T00:00:00+00:00',
      pubmedId: '38086830',
      volume: '14',
      references: [
        {
          application: 'WB',
          species: 'Mouse',
        },
      ],
    },
    {
      authors: [
        'Joana R C Faria,Michele Tinti,Catarina A Marques,Martin Zoltner,Harunori Yoshikawa,Mark C Field,David Horn',
      ],
      journal: 'Nature communications',
      name: 'An allele-selective inter-chromosomal protein bridge supports monogenic antigen expression in the African trypanosome.',
      pages: '8200',
      productCode: 'AB1791',
      publicationDate: '2023-12-11T00:00:00+00:00',
      pubmedId: '38081826',
      volume: '14',
      references: [
        {
          application: 'Unspecified application',
          species: 'Unspecified reactive species',
        },
      ],
    },
  ],
};



// export default async function decorate(block) {
//   console.log('Block: ', block);

//   // Function to get query parameters
//   function getQueryParams() {
//     const params = new URLSearchParams(window.location.search);
//     return params.get('apiUrl');
//   }

//   async function fetchApi() {
//     const apiUrl = getQueryParams();
//     // const apiUrl = 'https://main--danaher-abcam--aemsites.hlx.page/en-us/query-index.json';
//     if (apiUrl) {
//       console.log('API URL:', apiUrl);
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     } else {
//       console.error('No API URL provided');
//     }
//   }

//   fetchApi(); // Call fetchApi and wait for it to resolve
// }
