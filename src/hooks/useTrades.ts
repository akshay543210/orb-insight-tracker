import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Trade {
  id: string;
  date: string;
  session: string;
  strategy_tag?: string;
  rr?: number;
  result: string;
  notes?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TradeStats {
  totalTrades: number;
  wins: number;
  losses: number;
  breakevens: number;
  winRate: number;
  avgWinRR: number;
  avgLossRR: number;
  profitFactor: number;
  currentWinStreak: number;
  currentLossStreak: number;
  topWinRR: number;
  topLossRR: number;
  totalRR: number;
}

export function useTrades() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrades = async () => {
    if (!user) {
      setTrades([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      setTrades(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching trades:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [user]);

  const calculateStats = (): TradeStats => {
    if (trades.length === 0) {
      return {
        totalTrades: 0,
        wins: 0,
        losses: 0,
        breakevens: 0,
        winRate: 0,
        avgWinRR: 0,
        avgLossRR: 0,
        profitFactor: 0,
        currentWinStreak: 0,
        currentLossStreak: 0,
        topWinRR: 0,
        topLossRR: 0,
        totalRR: 0,
      };
    }

    const wins = trades.filter(t => t.result.toLowerCase() === 'win');
    const losses = trades.filter(t => t.result.toLowerCase() === 'loss');
    const breakevens = trades.filter(t => t.result.toLowerCase() === 'breakeven');

    const winRRs = wins.map(t => t.rr || 0).filter(rr => rr > 0);
    const lossRRs = losses.map(t => Math.abs(t.rr || 0)).filter(rr => rr > 0);

    const avgWinRR = winRRs.length > 0 ? winRRs.reduce((a, b) => a + b, 0) / winRRs.length : 0;
    const avgLossRR = lossRRs.length > 0 ? lossRRs.reduce((a, b) => a + b, 0) / lossRRs.length : 0;
    
    const totalWinRR = winRRs.reduce((a, b) => a + b, 0);
    const totalLossRR = lossRRs.reduce((a, b) => a + b, 0);
    const profitFactor = totalLossRR > 0 ? totalWinRR / totalLossRR : totalWinRR > 0 ? Infinity : 0;

    // Calculate streaks
    let currentWinStreak = 0;
    let currentLossStreak = 0;
    
    for (let i = 0; i < trades.length; i++) {
      const result = trades[i].result.toLowerCase();
      if (result === 'win') {
        currentWinStreak++;
        currentLossStreak = 0;
      } else if (result === 'loss') {
        currentLossStreak++;
        currentWinStreak = 0;
      } else {
        currentWinStreak = 0;
        currentLossStreak = 0;
      }
      
      if (currentWinStreak > 0 || currentLossStreak > 0) break;
    }

    const topWinRR = winRRs.length > 0 ? Math.max(...winRRs) : 0;
    const topLossRR = lossRRs.length > 0 ? Math.max(...lossRRs) : 0;
    const totalRR = totalWinRR - totalLossRR;

    return {
      totalTrades: trades.length,
      wins: wins.length,
      losses: losses.length,
      breakevens: breakevens.length,
      winRate: trades.length > 0 ? (wins.length / trades.length) * 100 : 0,
      avgWinRR,
      avgLossRR,
      profitFactor,
      currentWinStreak,
      currentLossStreak,
      topWinRR,
      topLossRR,
      totalRR,
    };
  };

  const getTradesByDate = () => {
    const tradesByDate: Record<string, Trade[]> = {};
    
    trades.forEach(trade => {
      const date = new Date(trade.date).toDateString();
      if (!tradesByDate[date]) {
        tradesByDate[date] = [];
      }
      tradesByDate[date].push(trade);
    });

    return tradesByDate;
  };

  const getTradesBySession = (session: string) => {
    return trades.filter(trade => trade.session.toLowerCase() === session.toLowerCase());
  };

  return {
    trades,
    loading,
    error,
    refetchTrades: fetchTrades,
    calculateStats,
    getTradesByDate,
    getTradesBySession,
  };
}