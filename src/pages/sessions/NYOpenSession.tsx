import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TradeEntryForm } from '@/components/TradeEntryForm';
import { TradingTable } from '@/components/TradingTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NYOpenSession = () => {
  const { user } = useAuth();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrades = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .eq('user_id', user.id)
      .eq('session', 'NY Open')
      .order('date', { ascending: false });

    if (!error && data) {
      setTrades(data.map(trade => ({
        id: trade.id,
        date: new Date(trade.date).toLocaleDateString(),
        session: trade.session,
        symbol: trade.strategy_tag || 'N/A',
        side: 'LONG',
        entry: 0,
        exit: 0,
        rr: trade.rr || 0,
        result: trade.result.toUpperCase(),
        pnl: trade.rr && trade.result === 'Win' ? trade.rr * 100 : trade.result === 'Loss' ? -100 : 0,
        notes: trade.notes
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrades();
  }, [user]);

  const stats = {
    totalTrades: trades.length,
    wins: trades.filter(t => t.result === 'WIN').length,
    winRate: trades.length > 0 ? ((trades.filter(t => t.result === 'WIN').length / trades.length) * 100).toFixed(1) : '0'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">NY Open ORB Session</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Session Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Hours</span>
                <span className="text-card-foreground">13:30 - 17:00 GMT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Pairs</span>
                <span className="text-card-foreground">USD/JPY, EUR/USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volatility</span>
                <span className="text-card-foreground">Very High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Trades</span>
                <span className="text-card-foreground">{stats.totalTrades}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="text-success">{stats.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wins</span>
                <span className="text-card-foreground">{stats.wins}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Strategy Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              NY open creates explosive moves. Focus on first 30 minutes for best ORB setups.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <TradeEntryForm defaultSession="NY Open" onSuccess={fetchTrades} />
        <TradingTable trades={trades} />
      </div>
    </div>
  )
}

export default NYOpenSession