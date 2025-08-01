import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTrades } from "@/hooks/useTrades"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { trades, calculateStats, loading } = useTrades()

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get trades for the current month
  const getTradesForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateStr = date.toDateString()
    
    return trades.filter(trade => {
      const tradeDate = new Date(trade.date)
      return tradeDate.toDateString() === dateStr
    })
  }

  const getDayResult = (dayTrades: any[]) => {
    if (dayTrades.length === 0) return null
    
    const wins = dayTrades.filter(t => t.result.toLowerCase() === 'win').length
    const losses = dayTrades.filter(t => t.result.toLowerCase() === 'loss').length
    const breakevens = dayTrades.filter(t => t.result.toLowerCase() === 'breakeven').length
    
    if (wins > losses && wins > breakevens) return "win"
    if (losses > wins && losses > breakevens) return "loss"
    if (breakevens > 0) return "breakeven"
    return wins > losses ? "win" : "loss"
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const getDayColor = (day: number) => {
    const dayTrades = getTradesForDay(day)
    const tradeResult = getDayResult(dayTrades)
    
    if (!tradeResult) return "bg-card hover:bg-muted/50"
    
    switch (tradeResult) {
      case "win":
        return "bg-success/20 hover:bg-success/30 border-success"
      case "loss":
        return "bg-destructive/20 hover:bg-destructive/30 border-destructive"
      case "breakeven":
        return "bg-warning/20 hover:bg-warning/30 border-warning"
      default:
        return "bg-card hover:bg-muted/50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Trading Calendar</h1>
        <div className="text-sm text-muted-foreground">
          <span className="inline-block w-3 h-3 bg-success rounded mr-2"></span>Win
          <span className="inline-block w-3 h-3 bg-destructive rounded mr-2 ml-4"></span>Loss
          <span className="inline-block w-3 h-3 bg-warning rounded mr-2 ml-4"></span>Breakeven
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-card shadow-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-card-foreground">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateMonth("prev")}
                    className="border-border hover:bg-muted"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateMonth("next")}
                    className="border-border hover:bg-muted"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2 h-16"></div>
                ))}
                
                {/* Calendar days */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const dayTrades = getTradesForDay(day)
                  return (
                    <div
                      key={day}
                      className={cn(
                        "p-2 h-16 border rounded-md cursor-pointer transition-colors",
                        "flex flex-col items-center justify-center text-sm font-medium",
                        getDayColor(day)
                      )}
                      title={dayTrades.length > 0 ? `${dayTrades.length} trade(s)` : ''}
                    >
                      <span>{day}</span>
                      {dayTrades.length > 0 && (
                        <span className="text-xs opacity-70">{dayTrades.length}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Summary */}
        <div className="space-y-4">
          <Card className="bg-gradient-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading...</div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {calculateStats.totalRR > 0 ? '+' : ''}{calculateStats.totalRR.toFixed(1)}R
                    </div>
                    <div className="text-sm text-muted-foreground">Total R/R</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trades</span>
                      <span className="text-card-foreground">{calculateStats.totalTrades}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="text-card-foreground">{calculateStats.winRate.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Best Win</span>
                      <span className="text-success">+{calculateStats.topWinRR.toFixed(1)}R</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Worst Loss</span>
                      <span className="text-destructive">-{calculateStats.topLossRR.toFixed(1)}R</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar