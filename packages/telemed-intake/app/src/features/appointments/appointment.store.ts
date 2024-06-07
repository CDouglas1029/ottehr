import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppointmentState {
  appointmentID?: string;
  appointmentDate?: string;
  // appointmentSlot?: string;
}

const APOINTMENT_STATE_INITIAL: AppointmentState = {};

interface AppointmentStateActions {
  setState: (state: Partial<AppointmentState>) => void;
}

export const useAppointmentStore = create<AppointmentState & AppointmentStateActions>()(
  persist((set) => ({ ...APOINTMENT_STATE_INITIAL, setState: (state) => set({ ...state }) }), {
    name: 'telemed-appointment-storage',
  })
);

export const usePastVisitsStore = create<AppointmentState & AppointmentStateActions>()(
  persist((set) => ({ ...APOINTMENT_STATE_INITIAL, setState: (state) => set({ ...state }) }), {
    name: 'telemed-past-visits-storage',
  })
);
