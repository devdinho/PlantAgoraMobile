const cards = [
    { 
      id: 'dados', 
      title: 'Dados Pessoais', 
      icon: 'person-outline',
      description: 'Gerencie suas informações pessoais e de contato',
      route: '../questionnaire/personaldata'
    },
    { 
      id: 'estrutura', 
      title: 'Estrutura da Horta', 
      icon: 'leaf-outline',
      description: 'Configure detalhes sobre sua horta e plantações',
      route: '../questionnaire/garden-structure'
    },
    { 
      id: 'producao', 
      title: 'Produção e Comercialização', 
      icon: 'bar-chart-outline',
      description: 'Acompanhe sua produção e vendas',
      route: '../questionnaire/production'
    },
    {
      id: 'tecnologias', 
      title: 'Tecnologias', 
      icon: 'laptop-outline',
      description: '',
      route: '../questionnaire/technologies'
    }
    /*{ 
      id: 'tecnologias', 
      title: 'Questionário Socioeconômico', 
      icon: 'clipboard-outline',
      description: 'Garanta que os seus dados estejam atualizados',
      route: '../questionnaire/socioeconomic'
    },*/
    { 
      id: 'infraestrutura', 
      title: 'Infraestrutura e Apoio', 
      icon: 'construct-outline',
      description: 'Solicite recursos e/ou suporte para sua produção',
      route: '../questionnaire/infrastructure'
    },
    { 
      id: 'sugestoes', 
      title: 'Contatar Suporte', 
      icon: 'chatbubble-ellipses-outline',
      description: 'Envie perguntas ou sugestões para nossa equipe',
      route: '../questionnaire/feedback'
    }
];

export default cards;