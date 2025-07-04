import React from 'react';
import DynamicForm from '../../../components/forms/DynamicForm';
import { IncomeSelector } from '../../../components/forms';
import config from './config.json';

export default function ProductionScreen() {
  const customComponents = {
    IncomeSelector: IncomeSelector
  };

  return <DynamicForm config={config} customComponents={customComponents} />;
} 