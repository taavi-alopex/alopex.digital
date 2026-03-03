"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { RecruitmentModal } from "./RecruitmentModal";

type RecruitmentContextValue = {
  isOpen: boolean;
  openRecruitment: () => void;
  closeRecruitment: () => void;
};

const RecruitmentContext = createContext<RecruitmentContextValue | null>(null);

export function useRecruitment() {
  const ctx = useContext(RecruitmentContext);
  if (!ctx) throw new Error("useRecruitment must be used within RecruitmentProvider");
  return ctx;
}

export function RecruitmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openRecruitment = useCallback(() => setIsOpen(true), []);
  const closeRecruitment = useCallback(() => setIsOpen(false), []);

  return (
    <RecruitmentContext.Provider value={{ isOpen, openRecruitment, closeRecruitment }}>
      {children}
      <RecruitmentModal isOpen={isOpen} onClose={closeRecruitment} />
    </RecruitmentContext.Provider>
  );
}
