import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

interface QuestionSectionProps {
  question: string;
  children: React.ReactNode;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  question,
  children
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.questionText}>{question}</Text>
      {children}
    </View>
  );
};

export default QuestionSection; 