export const useHomeUtils = () => {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
      return 'Boa tarde';
    } else if (hour >= 18 && hour < 22) {
      return 'Boa noite';
    } else {
      return 'Boa madrugada';
    }
  };

  return {
    getGreeting,
  };
}; 