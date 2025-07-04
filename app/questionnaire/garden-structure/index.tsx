import React from 'react';
import DynamicForm from '../../../components/forms/DynamicForm';
import { BedsAndAreaSelector } from '../../../components/forms';
import config from './config.json';

export default function GardenStructureScreen() {
  const customComponents = {
    BedsAndAreaSelector: BedsAndAreaSelector
  };

  return <DynamicForm config={config} customComponents={customComponents} />;
} 