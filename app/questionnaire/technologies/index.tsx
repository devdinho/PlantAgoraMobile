import React from 'react';
import DynamicForm from '../../../components/forms/DynamicForm';
import config from './config.json';

export default function TechnologiesScreen() {
  return <DynamicForm config={config} />;
} 