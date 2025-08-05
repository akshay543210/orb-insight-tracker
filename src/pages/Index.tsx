import { Suspense, useMemo } from "react";
import { StatsCard } from "@/components/StatsCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { RecentTradesTable } from "@/components/RecentTradesTable";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrades } from "@/hooks/useTrades";
import { useAccounts } from "@/hooks/useAccounts";
import { generateEquityCurve } from "@/lib/tradingUtils";

const Index = () => {
  const {
    trades,
    calculateStats,
    calculatePnL,
    loading,
    refetchTrades
  } = useTrades();
  const {
    getActiveAccount
  } = useAccounts();
  const stats = calculateStats;
  const activeAccount = getActiveAccount();

  // Memoize equity curve generation for performance
  const equityCurveData = useMemo(() => generateEquityCurve(trades), [trades]);
  
  if (loading) {
    return <LoadingSpinner fullScreen text="Loading dashboard..." />;
  }
  
  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Professional Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              PropFirm Knowledge Journal
            </h1>
            <p className="text-muted-foreground">Trading Dashboard</p>
          </div>
          <div className="text-right bg-card p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-foreground">
              {activeAccount ? `$${activeAccount.current_balance.toLocaleString()}` : '$0'}
            </div>
            <div className="text-sm text-muted-foreground">
              {activeAccount ? activeAccount.name : 'No Active Account'}
            </div>
            {activeAccount && (
              <div className={`text-sm font-medium ${
                activeAccount.current_balance >= activeAccount.starting_balance 
                  ? 'text-success' 
                  : 'text-destructive'
              }`}>
                P&L: {activeAccount.current_balance >= activeAccount.starting_balance ? '+' : ''}
                ${(activeAccount.current_balance - activeAccount.starting_balance).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <StatsCard 
            title="WINS" 
            value={stats.wins.toString()} 
            change={`${stats.winRate.toFixed(0)}%`} 
            positive={true} 
            icon={<TrendingUp className="w-5 h-5" />} 
          />
          <StatsCard 
            title="LOSSES" 
            value={stats.losses.toString()} 
            change={`${(100 - stats.winRate).toFixed(0)}%`} 
            positive={false} 
            icon={<TrendingDown className="w-5 h-5" />} 
          />
          <StatsCard 
            title="BREAKEVEN" 
            value={stats.breakevens.toString()} 
            change={`${stats.totalTrades > 0 ? (stats.breakevens / stats.totalTrades * 100).toFixed(0) : 0}%`} 
            icon={<Target className="w-5 h-5" />} 
          />
          <StatsCard 
            title="AVG WIN" 
            value={`${stats.avgWinRR.toFixed(1)}R`} 
            positive={true} 
            icon={<DollarSign className="w-5 h-5" />} 
          />
          <StatsCard 
            title="AVG LOSS" 
            value={`-${stats.avgLossRR.toFixed(1)}R`} 
            positive={false} 
            icon={<DollarSign className="w-5 h-5" />} 
          />
          <StatsCard 
            title="TOTAL" 
            value={`${stats.totalRR > 0 ? '+' : ''}${stats.totalRR.toFixed(1)}R`} 
            positive={stats.totalRR >= 0} 
            icon={<BarChart3 className="w-5 h-5" />} 
          />
        </div>

        {/* Equity Curve */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Daily Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallback={
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <BarChart3 className="w-8 h-8 mr-2" />
                Chart unavailable
              </div>
            }>
              <Suspense fallback={<LoadingSpinner text="Loading chart..." />}>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={equityCurveData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12} 
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12} 
                        domain={stats.totalTrades > 0 ? ['dataMin - 1', 'dataMax + 1'] : [0, 1]}
                        label={{
                          value: 'Balance',
                          angle: -90,
                          position: 'insideLeft'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2} 
                        dot={{
                          fill: "hsl(var(--primary))",
                          strokeWidth: 1,
                          r: 3
                        }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>

        {/* Trades Table */}
        <div>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner text="Loading trades..." />}>
              <RecentTradesTable trades={trades} onTradeUpdate={refetchTrades} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Demo Notice - only show if no trades */}
        {stats.totalTrades === 0 && (
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-4">
              <p className="text-destructive text-sm text-center">
                NO TRADES LOGGED YET. START BY ADDING TRADES IN THE TRADING SESSIONS 
                (ASIA, LONDON, NY OPEN, NY CLOSE) TO SEE YOUR STATISTICS HERE.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  )
};
export default Index;