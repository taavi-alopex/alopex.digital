"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AssessmentModal } from "./AssessmentModal";

type AssessmentContextValue = {
  isOpen: boolean;
  openAssessment: () => void;
  closeAssessment: () => void;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openAssessment = useCallback(() => setIsOpen(true), []);
  const closeAssessment = useCallback(() => setIsOpen(false), []);

  return (
    <AssessmentContext.Provider value={{ isOpen, openAssessment, closeAssessment }}>
      {children}
      <AssessmentModal isOpen={isOpen} onClose={closeAssessment} />
    </AssessmentContext.Provider>
  );
}
