import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface BedsAndAreaSelectorProps {
  value?: { beds: number; area: number; unit: string } | null;
  onValueChange: (value: { beds: number; area: number; unit: string }) => void;
}

// Gerar opções de área de 10 em 10, de 10 até 200
const AREA_OPTIONS = Array.from({ length: 20 }, (_, i) => (i + 1) * 10);

const BedsAndAreaSelector: React.FC<BedsAndAreaSelectorProps> = ({
  value,
  onValueChange,
}) => {
  // Garantir valor padrão seguro
  const safeValue = value || { beds: 1, area: 10, unit: 'm2' };
  const [showAreaModal, setShowAreaModal] = useState(false);
  
  // Animações
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(300)).current;

  const incrementBeds = () => {
    const newValue = { ...safeValue, beds: safeValue.beds + 1 };
    onValueChange(newValue);
  };

  const decrementBeds = () => {
    if (safeValue.beds > 1) {
      const newValue = { ...safeValue, beds: safeValue.beds - 1 };
      onValueChange(newValue);
    }
  };

  const handleAreaChange = (area: number) => {
    const newValue = { ...safeValue, area, unit: 'm2' };
    onValueChange(newValue);
    closeModal();
  };

  const openModal = () => {
    setShowAreaModal(true);
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(modalTranslateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setShowAreaModal(false);
    });
  };

  // Animar quando o modal abre
  useEffect(() => {
    if (showAreaModal) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [showAreaModal]);

  return (
    <View style={styles.container}>
      {/* Interface compacta numa linha */}
      <View style={styles.compactRow}>
        {/* Botão decrementar */}
        <TouchableOpacity 
          style={[styles.compactButton, safeValue.beds <= 1 && styles.compactButtonDisabled]} 
          onPress={decrementBeds}
          disabled={safeValue.beds <= 1}
        >
          <Text style={[styles.compactButtonText, safeValue.beds <= 1 && styles.compactButtonTextDisabled]}>
            −
          </Text>
        </TouchableOpacity>
        
        {/* Quantidade */}
        <View style={styles.quantityDisplay}>
          <Text style={styles.quantityText}>{safeValue.beds}</Text>
        </View>
        
        {/* Botão incrementar */}
        <TouchableOpacity style={styles.compactButton} onPress={incrementBeds}>
          <Text style={styles.compactButtonText}>+</Text>
        </TouchableOpacity>
        
        {/* Área com dropdown */}
                 <TouchableOpacity 
           style={styles.areaSelector}
           onPress={openModal}
         >
           <Text style={styles.areaSelectorText}>
             {safeValue.area} m²
           </Text>
           <Ionicons name="chevron-down" size={16} color="#666" />
         </TouchableOpacity>
      </View>

            {/* Modal animado para seleção de área */}
      {showAreaModal && (
        <Modal
          visible={showAreaModal}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}
        >
          <Animated.View 
            style={[
              styles.modalOverlay,
              { opacity: overlayOpacity }
            ]}
          >
            <TouchableOpacity 
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={closeModal}
            />
            <Animated.View 
              style={[
                styles.modalContent,
                { transform: [{ translateY: modalTranslateY }] }
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecionar Área</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                <Text style={styles.modalLabel}>Escolha a área em m²:</Text>
                <ScrollView style={styles.areaOptions} showsVerticalScrollIndicator={false}>
                  {AREA_OPTIONS.map((area) => (
                    <TouchableOpacity
                      key={area}
                      style={[
                        styles.areaOption,
                        area === safeValue.area && styles.areaOptionSelected
                      ]}
                      onPress={() => handleAreaChange(area)}
                    >
                      <Text style={[
                        styles.areaOptionText,
                        area === safeValue.area && styles.areaOptionTextSelected
                      ]}>
                        {area} m²
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Animated.View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

export default BedsAndAreaSelector; 