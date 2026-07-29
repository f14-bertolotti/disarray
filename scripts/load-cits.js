
function bibtexToIeee(bibtex) {
    const { author, title, journal, year, volume, number, pages, publisher } = bibtex;
    let citationParts = [];
    if (author) citationParts.push(`${author}`);
    if (title) citationParts.push(`"${title}"`);
    if (journal) citationParts.push(`${journal}`);
    if (volume) citationParts.push(`vol. ${volume}`);
    if (number) citationParts.push(`no. ${number}`);
    if (pages) citationParts.push(`pp. ${pages}`);
    if (year) citationParts.push(`${year}`);
    let citation = citationParts.join(', ');
    if (publisher) citation += ` ${publisher}`;

    return citation + "." ;
}

function replaceCitations() {
    const citeElements = document.querySelectorAll('.cite');
    const bibliographyElement = document.querySelector('.bibliography');
    const references = [];

    citeElements.forEach((citeElement, index) => {
        const bibtex_id = citeElement.getAttribute('value');
        references.push(bibtexToIeee(bibliography[bibtex_id]));

        // Replace the cite element with a clickable link to the bibliography entry
        const citationLink = document.createElement('a');
        citationLink.classList.add('cite');
        citationLink.setAttribute('href', `#ref-${index + 1}`);
        citationLink.textContent = `[${index + 1}]`;

        citeElement.parentNode.replaceChild(citationLink, citeElement)
    });

    // Generate the bibliography list
    const listElement = document.createElement('ol');
    const bibliography_header = document.createElement('h3');
    bibliography_header.textContent = "Bibliography";

    listElement.classList.add("bibliography");
    references.forEach((ref, index) => {
        const listItem = document.createElement('li');
        listItem.id = `ref-${index + 1}`;
        listItem.textContent = ref;
        listElement.appendChild(listItem);
    });

    // Replace bibliography content with the list of references
    bibliographyElement.innerHTML = '';
    bibliographyElement.appendChild(bibliography_header);
    bibliographyElement.appendChild(listElement);
}

document.addEventListener('DOMContentLoaded', () => {
    replaceCitations();
});

const bibliography = {
    "Guo17" : {
        "title"   : "On Calibration of Modern Neural Networks",
        "author"  : "Guo, C and Pleiss, G and Sun, Y and Weinberger, K",
        "journal" : "ICML 2017",
        "year"    :  "2017"
    },

    "Oord18" : {
        "title"   : "Representation learning with contrastive predictive coding",
        "author"  : "Oord, Aaron van den and Li, Yazhe and Vinyals, Oriol",
        "journal" : "arXiv preprint arXiv:1807.03748",
        "year"    : "2018"
    },

    "Hastie09" : {
        "title"     : "Multi-class adaboost",
        "author"    : "Hastie, Trevor and Rosset, Saharon and Zhu, Ji and Zou, Hui",
        "journal"   : "Statistics and its Interface",
        "volume"    : "2",
        "number"    : "3",
        "pages"     : "349--360",
        "year"      : "2009",
        "publisher" : "International Press of Boston"
    },

    "Deiseroth24" : {
        "title"   : "T-FREE: Tokenizer-Free Generative LLMs via Sparse Representations for Memory-Efficient Embeddings",
        "author"  : "Deiseroth, Bjorn and Brack, Manuel and Schramowski, Patrick and Kersting, Kristian and Weinbach, Samuel",
        "journal" : "arXiv preprint arXiv:2406.19223",
        "year"    : "2024"
    },

    "Sennrich17" : {
        "title"   : "How Grammatical is Character-level Neural Machine Translation? Assessing MT Quality with Contrastive Translation Pairs",
        "author"  : "Sennrich, Rico",
        "journal" : "Proceedings of the 15th Conference of the European Chapter of the Association for Computational Linguistics: Volume 2, Short Papers",
        "pages"   : "376--382",
        "year"    : "2017"
    },

    "Kudo18" : {
        "title"   : "Sentencepiece: A simple and language independent subword tokenizer and detokenizer for neural text processing",
        "author"  : "Kudo, T",
        "journal" : "arXiv preprint arXiv:1808.06226",
        "year"    : "2018"
    },

    "Elhage22" : {
        "title"   : "Toy models of superposition",
        "author"  : "Elhage, Nelson and Hume, Tristan and Olsson, Catherine and Schiefer, Nicholas and Henighan, Tom and Kravec, Shauna and Hatfield-Dodds, Zac and Lasenby, Robert and Drain, Dawn and Chen, Carol and others",
        "journal" : "arXiv preprint arXiv:2209.10652",
        "year"    : "2022"
    },

    "Press16" : {
        "title"   : "Using the Output Embedding to Improve Language Models",
        "author"  : "Ofir Press and Lior Wolf",
        "journal" : "Conference of the European Chapter of the Association for Computational Linguistics",
        "year"    : "2016",
        "url"     : "api.semanticscholar.org/CorpusID:836219",
    },

    "Bertolotti24" : {
        "title"   : "By Tying Embeddings You Are Assuming the Distributional Hypothesis",
        "author"  : "Francesco Bertolotti and Walter Cazzola",
        "journal" : "International Conference on Machine Learning",
        "year"    : "2024",
        "url"     : "api.semanticscholar.org/CorpusID:272330175"
    },

    "Alligood98" : {
        "title"   : "Chaos: an introduction to dynamical systems",
        "author"  : "Alligood, Kathleen T and Sauer, Tim D and Yorke, James A and Chillingworth, David",
        "journal" : "SIAM Review",
        "year"    : "1998",
    },

    "Devlin19" : {
        "title"   : "Bert: Pre-training of deep bidirectional transformers for language understanding",
        "author"  : "Devlin, Jacob and Chang, Ming-Wei and Lee, Kenton and Toutanova, Kristina",
        "journal" : "Proceedings of the 2019 conference of the North American chapter of the association for computational linguistics: human language technologies",
        "year"    : "2019"
    },

    "Merity16" : {
        "title"   : "Pointer Sentinel Mixture Models",
        "author"  : "Stephen Merity and Caiming Xiong and James Bradbury and Richard Socher",
        "journal" : "arXiv preprint arXiv:1609.07843",
        "year"    : "2016"
    },

    "Zhao23" : {
        "title"   : "Pytorch fsdp: experiences on scaling fully sharded data parallel",
        "author"  : "Zhao, Yanli and Gu, Andrew and Varma, Rohan and Luo, Liang and Huang, Chien-Chin and Xu, Min and Wright, Less and Shojanazeri, Hamid and Ott, Myle and Shleifer, Sam and others",
        "journal" : "arXiv preprint arXiv:2304.11277",
        "year"    : "2023",
        "url"     : "arxiv.org/pdf/2304.11277"
    },
    "Reddi25" : {
        "title"   : "$K$-Level Policy Gradients for Multi-Agent Reinforcement Learning",
        "author"  : "Reddi, Aryaman and Tiboni, Gabriele and Peters, Jan and D'Eramo, Carlo",
        "journal" : "arXiv preprint arXiv:2509.12117",
        "year"    : "2025"
    },
    "Kaddour23" : {
        "title"   : "The MiniPile Challenge for Data-Efficient Language Models",
        "author"  : "Kaddour, Jean",
        "journal" : "arXiv preprint arXiv:2304.08442",
        "year"    : "2023"
    },
    "Schulman17" : {
        "title"   : "Proximal policy optimization algorithms",
        "author"  : "Schulman, John and Wolski, Filip and Dhariwal, Prafulla and Radford, Alec and Klimov, Oleg",
        "journal" : "arXiv preprint arXiv:1707.06347",
        "year"    : "2017"
    },
    "Xu22" : {
        "title"   : "Accelerated Policy Learning with Parallel Differentiable Simulation",
        "author"  : "Jie Xu and Miles Macklin and Viktor Makoviychuk and Yashraj Narang and Animesh Garg and Fabio Ramos and Wojciech Matusik",
        "journal" : "International Conference on Learning Representations",
        "year"    : "2022",
        "url"     : "https://openreview.net/forum?id=ZSKRQMvttc"
    },
    "Casadei22" : {
        "title"   : "Scafi: A scala DSL and toolkit for aggregate programming",
        "author"  : "Roberto Casadei and Mirko Viroli and Gianluca Aguzzi and Danilo Pianini",
        "journal" : "SoftwareX",
        "year"    : "2022",
        "publisher" : "Elsevier"
    },
    "Bertolotti25" : {
        "title"   : "SHAC++: A Neural Network to Rule All Differentiable Simulators",
        "author"  : "Francesco Bertolotti and Gianluca Aguzzi and Walter Cazzola and Mirko Viroli and others",
        "journal" : "frontiers in artificial intelligence and applications",
        "year"    : "2025",
        "publisher": "IOS Press"
    },
    "Bettini22" : {
        "title" : "VMAS: A Vectorized Multi-Agent Simulator for Collective Robot Learning",
        "author" : "Bettini, Matteo and Kortvelesy, Ryan and Blumenkamp, Jan and Prorok, Amanda",
        "year" : "2022",
        "journal" : "The 16th International Symposium on Distributed Autonomous Robotic Systems",
        "publisher" : "Springer"
    },
    "Ma24" : {
        "title"   : "Do Transformer World Models Give Better Policy Gradients?",
        "author"  : "Michel Ma and Tianwei Ni and Clement Gehring and Pierluca D'Oro and Pierre-Luc Bacon",
        "journal" : "Proceedings of the 41st International Conference on Machine Learning",
        "year"    : "2024",
        "publisher": "PMLR"
    },
    "Shengyi22" : {
        "title" : "The 37 Implementation Details of Proximal Policy Optimization",
        "author" : "Huang, Shengyi and Dossa, Rousslan Fernand Julien and Raffin, Antonin and Kanervisto, Anssi and Wang, Weixun",
        "year" : "2022",
        "journal" : "ICLR Blog Track"
    },
    "Yu22" : {
        "title"   : "The surprising effectiveness of ppo in cooperative multi-agent games",
        "author"  : "Chao Yu and Akash Velu and Eugene Vinitsky and Jiaxuan Gao and Yu Wang and Alexandre Bayen and Yi Wu",
        "journal" : "Advances in neural information processing systems",
        "year"    : "2022"
    },
    "Kalamkar19" : {
        "title"   : "A Study of BFLOAT16 for Deep Learning Training",
        "author"  : "Kalamkar, Dhiraj and Mudigere, Dheevatsa and Mellempudi, Naveen and others",
        "journal" : "arXiv preprint arXiv:1905.12322",
        "year"    : "2019"
    },
    "Liang24" : {
        "title"   : "TorchTitan: One-stop PyTorch native solution for production ready LLM pre-training",
        "author"  : "Liang, Wanchao and Liu, Tianyu and Wright, Less and Constable, Will and Gu, Andrew and Huang, Chien-Chin and Zhang, Iris and Feng, Wei and Huang, Howard and Wang, Junjie and Purandare, Sanket and Nadathur, Gokul and Idreos, Stratos",
        "journal" : "arXiv preprint arXiv:2410.06511",
        "year"    : "2024"
    },
    "Elhage21" : {
        "title"   : "A Mathematical Framework for Transformer Circuits",
        "author"  : "Elhage, Nelson and Nanda, Neel and Olsson, Catherine and Henighan, Tom and Joseph, Nicholas and Mann, Ben and others",
        "journal" : "Transformer Circuits Thread",
        "year"    : "2021"
    },
    "Micikevicius22" : {
        "title"   : "FP8 Formats for Deep Learning",
        "author"  : "Micikevicius, Paulius and Stosic, Dusan and others",
        "journal" : "arXiv preprint arXiv:2209.05433",
        "year"    : "2022"
    },
    "Nvidia25" : {
        "title"   : "Pretraining Large Language Models with NVFP4",
        "author"  : "NVIDIA and others",
        "journal" : "arXiv preprint arXiv:2509.25149",
        "year"    : "2025"
    },
    "Grattafiori24" : {
        "title"   : "The Llama 3 Herd of Models",
        "author"  : "Grattafiori, Aaron and Dubey, Abhimanyu and others",
        "journal" : "arXiv preprint arXiv:2407.21783",
        "year"    : "2024"
    },
    "Penedo24" : {
        "title"   : "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale",
        "author"  : "Penedo, Guilherme and Kydlicek, Hynek and Ben Allal, Loubna and Lozhkov, Anton and Mitchell, Margaret and Raffel, Colin and Von Werra, Leandro and Wolf, Thomas",
        "journal" : "Advances in Neural Information Processing Systems",
        "year"    : "2024"
    },
    "Loshchilov19" : {
        "title"   : "Decoupled Weight Decay Regularization",
        "author"  : "Loshchilov, Ilya and Hutter, Frank",
        "journal" : "International Conference on Learning Representations",
        "year"    : "2019"
    },
    "Hu24" : {
        "title"   : "MiniCPM: Unveiling the Potential of Small Language Models with Scalable Training Strategies",
        "author"  : "Hu, Shengding and Tu, Yuge and Han, Xu and others",
        "journal" : "arXiv preprint arXiv:2404.06395",
        "year"    : "2024"
    },
    "Sakaguchi19" : {
        "title"   : "WinoGrande: An Adversarial Winograd Schema Challenge at Scale",
        "author"  : "Sakaguchi, Keisuke and Le Bras, Ronan and Bhagavatula, Chandra and Choi, Yejin",
        "journal" : "arXiv preprint arXiv:1907.10641",
        "year"    : "2019"
    }
}
