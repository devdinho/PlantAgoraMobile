import React from 'react';
import DynamicForm from '../../../components/forms/DynamicForm';


const tempConfig = {
  id: "socioeconomic",
  title: "Questionário Socioeconômico",
  icon: "people",
  storageKey: "socioeconomic",
  fields: [
    {
      id: "development_notice",
      question: "Este questionário está em desenvolvimento e será implementado em breve.",
      type: "text",
      required: false,
      placeholder: "Aguarde futuras atualizações..."
    }
  ]
};

export default function SocioeconomicScreen() {
  return <DynamicForm config={tempConfig} />;
}
