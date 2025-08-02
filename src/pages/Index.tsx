import { Suspense, useMemo } from "react"
import { StatsCard } from "@/components/StatsCard"
import { PerformanceChart } from "@/components/PerformanceChart"
import { RecentTradesTable } from "@/components/RecentTradesTable"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { FloatingParticles } from "@/components/FloatingParticles"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Target, Calendar, DollarSign, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTrades } from "@/hooks/useTrades"
import { useAccounts } from "@/hooks/useAccounts"
import { generateEquityCurve } from "@/lib/tradingUtils"
import { motion } from "framer-motion"

const Index = () => {
  const { trades, calculateStats, calculatePnL, loading, refetchTrades } = useTrades()
  const { getActiveAccount } = useAccounts()
  const stats = calculateStats // This is now a memoized value, not a function
  const activeAccount = getActiveAccount()

  // Memoize equity curve generation for performance
  const equityCurveData = useMemo(() => generateEquityCurve(trades), [trades])

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading dashboard..." />
  }

  return (
    <ErrorBoundary>
      <FloatingParticles />
      <motion.div 
        className="space-y-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Cyberpunk Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <motion.h1 
              className="text-4xl font-bold font-cyber text-glow-primary mb-2"
              animate={{ textShadow: ["var(--text-glow-primary)", "var(--text-glow-accent)", "var(--text-glow-primary)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              PropFirm Knowledge Journal
            </motion.h1>
            <p className="text-muted-foreground font-tech text-lg">Cyberpunk Trading Dashboard</p>
            <div className="flex items-center gap-2 mt-2">
              <Zap className="w-4 h-4 text-primary animate-neon-pulse" />
              <span className="text-sm text-primary font-tech">Neural Network Powered Analytics</span>
            </div>
          </div>
          <motion.div 
            className="text-right bg-gradient-card p-4 rounded-lg border border-primary/30 shadow-primary/20"
            whileHover={{ scale: 1.05, boxShadow: "var(--shadow-primary)" }}
          >
            <div className="text-3xl font-bold font-cyber text-glow-accent">
              {activeAccount ? `$${activeAccount.current_balance.toLocaleString()}` : '$0'}
            </div>
            <div className="text-sm text-muted-foreground font-tech">
              {activeAccount ? activeAccount.name : 'No Active Account'}
            </div>
            {activeAccount && (
              <div className={`text-sm font-medium font-tech ${
                activeAccount.current_balance >= activeAccount.starting_balance 
                  ? 'text-success text-glow-accent' 
                  : 'text-destructive text-glow-pink'
              }`}>
                P&L: {activeAccount.current_balance >= activeAccount.starting_balance ? '+' : ''}
                ${(activeAccount.current_balance - activeAccount.starting_balance).toLocaleString()}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
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
        </motion.div>

        {/* Cyberpunk Equity Curve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-gradient-card shadow-primary/20 border-primary/30 hover:shadow-primary/40 transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-card-foreground font-cyber text-glow-primary">
                🚀 Neural Portfolio Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary fallback={
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <Zap className="w-8 h-8 text-destructive animate-neon-pulse mr-2" />
                  Chart unavailable
                </div>
              }>
                <Suspense fallback={<LoadingSpinner text="Loading neural chart..." />}>
                  <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={equityCurveData}>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="hsl(var(--primary))" 
                          opacity={0.2} 
                        />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--primary))"
                          fontSize={12}
                          fontFamily="Rajdhani"
                        />
                        <YAxis 
                          stroke="hsl(var(--primary))"
                          fontSize={12}
                          fontFamily="Rajdhani"
                          domain={stats.totalTrades > 0 ? ['dataMin - 1', 'dataMax + 1'] : [0, 1]}
                          label={{ value: 'R/R', angle: -90, position: 'insideLeft' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ 
                            fill: "hsl(var(--primary))", 
                            strokeWidth: 2, 
                            r: 5,
                            filter: "drop-shadow(0 0 4px hsl(var(--primary)))"
                          }}
                          filter="drop-shadow(0 0 8px hsl(var(--primary)))"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trades Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner text="Loading trades..." />}>
              <RecentTradesTable trades={trades} onTradeUpdate={refetchTrades} />
            </Suspense>
          </ErrorBoundary>
        </motion.div>

        {/* Demo Notice - only show if no trades */}
        {stats.totalTrades === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4">
                <p className="text-destructive text-sm text-center">
                  NO TRADES LOGGED YET. START BY ADDING TRADES IN THE TRADING SESSIONS 
                  (ASIA, LONDON, NY OPEN, NY CLOSE) TO SEE YOUR STATISTICS HERE.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </ErrorBoundary>
  );
};

export default Index;
