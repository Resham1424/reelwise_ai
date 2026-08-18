import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

export type InteractionState = { liked: string[]; skipped: string[]; rewatched: Record<string, number>; watchPercent: Record<string, number>; demoMode: boolean };
type InteractionContextValue = InteractionState & { likeReel: (id: string) => void; skipReel: (id: string) => void; rewatchReel: (id: string) => void; advanceWatch: (id: string) => void; toggleDemoMode: () => void; resetDemo: () => void };
const STORAGE_KEY = '@reelwise/interactions';
const DEFAULT_STATE: InteractionState = { liked: [], skipped: [], rewatched: {}, watchPercent: { java: 38, lifestyle: 72, interview: 24, laptop: 58 }, demoMode: true };
const InteractionContext = createContext<InteractionContextValue | null>(null);

export function InteractionProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<InteractionState>(DEFAULT_STATE);
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then((stored) => { if (!stored) return; try { setState({ ...DEFAULT_STATE, ...JSON.parse(stored) }); } catch { setState(DEFAULT_STATE); } }); }, []);
  useEffect(() => { AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined); }, [state]);
  const value = useMemo<InteractionContextValue>(() => ({
    ...state,
    likeReel: (id) => setState((current) => ({ ...current, liked: current.liked.includes(id) ? current.liked.filter((item) => item !== id) : [...current.liked, id] })),
    skipReel: (id) => setState((current) => ({ ...current, skipped: current.skipped.includes(id) ? current.skipped : [...current.skipped, id] })),
    rewatchReel: (id) => setState((current) => ({ ...current, rewatched: { ...current.rewatched, [id]: (current.rewatched[id] ?? 0) + 1 }, watchPercent: { ...current.watchPercent, [id]: 100 } })),
    advanceWatch: (id) => setState((current) => ({ ...current, watchPercent: { ...current.watchPercent, [id]: Math.min(100, (current.watchPercent[id] ?? 0) + 7) } })),
    toggleDemoMode: () => setState((current) => ({ ...current, demoMode: !current.demoMode })),
    resetDemo: () => setState(DEFAULT_STATE),
  }), [state]);
  return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>;
}
export function useInteractions() { const context = useContext(InteractionContext); if (!context) throw new Error('useInteractions must be used inside InteractionProvider'); return context; }
