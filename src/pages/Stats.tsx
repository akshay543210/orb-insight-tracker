import { StatsCard } from "@/components/StatsCard"
import { PerformanceChart } from "@/components/PerformanceChart"
import { TrendingUp, TrendingDown, Target, Calendar } from "lucide-react"

const dayPerformanceData = [
  { name: 'Sunday', value: 0 },
  { name: 'Monday', value: -150 },
  { name: 'Tuesday', value: 200 },
  { name: 'Wednesday', value: 0 },
  { name: 'Thursday', value: 150 },
  { name: 'Friday', value: 0 },
  { name: 'Saturday', value: 0 },
]

const hourPerformanceData = [
  { name: '3 AM', value: 300 },
  { name: '9 AM', value: -150 },
  { name: '1 PM', value: 0 },
  { name: '7 PM', value: 0 },
  { name: '12:30 AM', value: 0 },
]

const Stats = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Trading Statistics</h1>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard
          title="WIN RATE"
          value="67%"
          icon={<TrendingUp className="w-5 h-5" />}
          positive={true}
        />
        <StatsCard
          title="EXPECTANCY"
          value="31"
          icon={<Target className="w-5 h-5" />}
          positive={true}
        />
        <StatsCard
          title="PROFIT FACTOR"
          value="1.47"
          icon={<TrendingUp className="w-5 h-5" />}
          positive={true}
        />
        <StatsCard
          title="AVG WIN HOLD"
          value="8.0 Days"
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatsCard
          title="AVG LOSS"
          value="-$198.00"
          change="(-3.7%)"
          icon={<TrendingDown className="w-5 h-5" />}
          positive={false}
        />
        <StatsCard
          title="AVG WIN"
          value="$146.00"
          change="(10.1%)"
          icon={<TrendingUp className="w-5 h-5" />}
          positive={true}
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatsCard
          title="WIN STREAK"
          value="2"
          positive={true}
        />
        <StatsCard
          title="LOSS STREAK"
          value="1"
          positive={false}
        />
        <StatsCard
          title="TOP LOSS"
          value="-$198.00"
          change="(-3.7%)"
          positive={false}
        />
        <StatsCard
          title="TOP WIN"
          value="$242.00"
          change="(11.0%)"
          positive={true}
        />
        <StatsCard
          title="AVG DAILY VOL"
          value="300"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-card shadow-card border border-border rounded-lg p-6 h-96">
          <PerformanceChart 
            data={dayPerformanceData}
            title="PERFORMANCE BY DAY OF WEEK"
          />
        </div>
        <div className="bg-gradient-card shadow-card border border-border rounded-lg p-6 h-96">
          <PerformanceChart 
            data={hourPerformanceData}
            title="PERFORMANCE BY HOUR"
          />
        </div>
      </div>
    </div>
  )
}

export default Stats