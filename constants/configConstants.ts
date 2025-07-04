export interface ConfigMenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  hasChevron?: boolean;
  iconColor?: string;
  action: string;
}

export const MANAGEMENT_MENU: ConfigMenuItem[] = [
  {
    id: 'notifications',
    icon: 'notifications-outline',
    title: 'Notificações',
    subtitle: 'Configure como receber notificações',
    iconColor: '#46A56C',
    action: 'notifications'
  },
  {
    id: 'privacy',
    icon: 'shield-checkmark-outline',
    title: 'Privacidade e Segurança',
    subtitle: 'Configure suas preferências de privacidade',
    iconColor: '#46A56C',
    action: 'privacy'
  },
  {
    id: 'clear-data',
    icon: 'trash-outline',
    title: 'Limpar Dados do Formulário',
    subtitle: 'Remove vendas e dados temporários',
    hasChevron: false,
    iconColor: '#e74c3c',
    action: 'clearData'
  },
  /*{
    id: 'theme',
    icon: 'color-palette-outline',
    title: 'Tema',
    subtitle: 'Escolha entre claro e escuro',
    iconColor: '#46A56C',
    action: 'theme'
  },
  {
    id: 'language',
    icon: 'language-outline',
    title: 'Idioma',
    subtitle: 'Português (Brasil)',
    iconColor: '#46A56C',
    action: 'language'
  },*/
];

export const DATA_MENU: ConfigMenuItem[] = [
  {
    id: 'backup',
    icon: 'cloud-upload-outline',
    title: 'Backup dos Dados',
    subtitle: 'Faça backup das suas informações',
    iconColor: '#3498db',
    action: 'backup'
  },
];

export const SUPPORT_MENU: ConfigMenuItem[] = [
  {
    id: 'help',
    icon: 'help-circle-outline',
    title: 'Ajuda e Suporte',
    subtitle: 'Central de ajuda e contato',
    iconColor: '#46A56C',
    action: 'help'
  },
  {
    id: 'about',
    icon: 'information-circle-outline',
    title: 'Sobre o Aplicativo',
    subtitle: 'Versão 1.0.0',
    iconColor: '#46A56C',
    action: 'about'
  },
];

export const ACCOUNT_MENU: ConfigMenuItem[] = [
  {
    id: 'logout',
    icon: 'log-out-outline',
    title: 'Sair da Conta',
    hasChevron: false,
    iconColor: '#e74c3c',
    action: 'logout'
  },
]; 