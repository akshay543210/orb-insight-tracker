import { StatsCard } from "@/components/StatsCard"
import { PerformanceChart } from "@/components/PerformanceChart"
import { TradingTable } from "@/components/TradingTable"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Target, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data - in real app this would come from a database
const equityCurveData = [
  { date: 'Dec 1', value: 10000 },
  { date: 'Dec 8', value: 9850 },
  { date: 'Jan 6', value: 10208 },
  { date: 'Jan 12', value: 10093 },
  { date: 'Feb 12', value: 10093 },
  { date: 'Mar 17', value: 10093 },
]

const sampleTrades = [
  {
    id: '1',
    date: '3/11/2022',
    session: 'PLTR',
    symbol: 'PLTR',
    side: 'LONG' as const,
    entry: 10.80,
    exit: 11.80,
    rr: 2,
    result: 'WIN' as const,
    pnl: 50.00
  },
  {
    id: '2', 
    date: '3/10/2022',
    session: 'BROS',
    symbol: 'BROS',
    side: 'LONG' as const,
    entry: 44.16,
    exit: 49.00,
    rr: 2.5,
    result: 'WIN' as const,
    pnl: 242.00
  },
  {
    id: '3',
    date: '11/9/2021',
    session: 'PLTR',
    symbol: 'PLTR', 
    side: 'LONG' as const,
    entry: 26.89,
    exit: 25.90,
    rr: 1.5,
    result: 'LOSS' as const,
    pnl: -198.00
  }
]

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
          <p className="text-muted-foreground">Track your ORB trading performance</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">$94.00</div>
          <div className="text-sm text-success">0.0%</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <StatsCard
          title="WINS"
          value="2"
          change="67%"
          positive={true}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatsCard
          title="LOSSES"
          value="1"
          change="33%"
          positive={false}
          icon={<TrendingDown className="w-5 h-5" />}
        />
        <StatsCard
          title="OPEN"
          value="0"
          change="0%"
          icon={<Target className="w-5 h-5" />}
        />
        <StatsCard
          title="AVG W"
          value="$146"
          change="10%"
          positive={true}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatsCard
          title="AVG L"
          value="-$198"
          change="-4%"
          positive={false}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatsCard
          title="PnL"
          value="$94.00"
          change="0.0%"
          positive={true}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

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
                  domain={['dataMin - 100', 'dataMax + 100']}
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
      <TradingTable trades={sampleTrades} />

      {/* Demo Notice */}
      <Card className="bg-destructive/10 border-destructive/20">
        <CardContent className="p-4">
          <p className="text-destructive text-sm text-center">
            THE ABOVE TRADES ARE FOR DEMO PURPOSES. YOU MAY ADD YOUR OWN 
            TRADES BY CLICKING ON THE "+" BUTTON IN THE SIDEBAR TO THE LEFT. THE 
            DEMO TRADES WILL GO AWAY ON THEIR OWN AFTER YOU LOG A TRADE.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
