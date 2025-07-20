import { StatsCard } from "@/components/StatsCard"
import { PerformanceChart } from "@/components/PerformanceChart"
import { RecentTradesTable } from "@/components/RecentTradesTable"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Target, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTrades } from "@/hooks/useTrades"
import { useAccounts } from "@/hooks/useAccounts"

// Generate equity curve from real trades data
const generateEquityCurve = (trades: any[]) => {
  if (trades.length === 0) {
    return [{ date: 'Start', value: 0 }]
  }

  // Sort trades by date
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  let runningTotal = 0
  const equityData = [{ date: 'Start', value: 0 }]
  
  sortedTrades.forEach(trade => {
    const rr = trade.rr || 0
    if (trade.result.toLowerCase() === 'win') {
      runningTotal += rr
    } else if (trade.result.toLowerCase() === 'loss') {
      runningTotal -= rr
    }
    // breakeven doesn't change the total
    
    equityData.push({
      date: new Date(trade.date).toLocaleDateString(),
      value: runningTotal
    })
  })
  
  return equityData
}

const Index = () => {
  const { trades, calculateStats, calculatePnL, loading, refetchTrades } = useTrades()
  const { getActiveAccount } = useAccounts()
  const stats = calculateStats()
  const activeAccount = getActiveAccount()

  // Generate equity curve from trades
  const equityCurveData = generateEquityCurve(trades)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
          <p className="text-muted-foreground">Track your ORB trading performance</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">
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
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading trades...</div>
      ) : (
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
            change={`${stats.totalTrades > 0 ? ((stats.breakevens / stats.totalTrades) * 100).toFixed(0) : 0}%`}
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
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>
      )}

      {/* Equity Curve */}
      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={stats.totalTrades > 0 ? ['dataMin - 1', 'dataMax + 1'] : [0, 1]}
                  label={{ value: 'R/R', angle: -90, position: 'insideLeft' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      <RecentTradesTable trades={trades} onTradeUpdate={refetchTrades} />

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
  );
};

export default Index;
