// app/context/BottomNavContext.tsx
import React, { createContext, useContext, useState } from 'react';

type BottomNavContextType = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const BottomNavContext = createContext<BottomNavContextType>({
  visible: true,
  setVisible: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
});

export const BottomNavProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <BottomNavContext.Provider value={{ visible, setVisible, selectedIndex, setSelectedIndex }}>
      {children}
    </BottomNavContext.Provider>
  );
};

export default BottomNavProvider;

export const useBottomNav = () => useContext(BottomNavContext);
