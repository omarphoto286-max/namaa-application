import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type PomodoroSettings = {
  workDuration: number;     // مدة العمل بالدقائق
  shortBreak: number;       // الراحة القصيرة
  longBreak: number;        // الراحة الطويلة
  cyclesBeforeLongBreak: number; // عدد الجولات قبل الراحة الطويلة
  autoStart: boolean;       // بدء تلقائي
};

type PomodoroSettingsContextType = {
  settings: PomodoroSettings;
  updateSettings: (newSettings: Partial<PomodoroSettings>) => void;
};

const defaultSettings: PomodoroSettings = {
  workDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  cyclesBeforeLongBreak: 4,
  autoStart: false,
};

const SettingsContext = createContext<PomodoroSettingsContextType | undefined>(
  undefined
);

export const PomodoroSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const saved = localStorage.getItem("pomodoro_settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("pomodoro_settings", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem("pomodoro_settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const usePomodoroSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("usePomodoroSettings must be used within PomodoroSettingsProvider");
  return context;
};
