import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)) // July 2025

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Sample trade data - in real app this would come from a database
  const tradeData: Record<string, "win" | "loss" | "breakeven"> = {
    "14": "win",
    "21": "loss",
    "28": "win"
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
    const dayStr = day.toString()
    const tradeResult = tradeData[dayStr]
    
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
                  return (
                    <div
                      key={day}
                      className={cn(
                        "p-2 h-16 border rounded-md cursor-pointer transition-colors",
                        "flex items-center justify-center text-sm font-medium",
                        getDayColor(day)
                      )}
                    >
                      {day}
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
              <div className="text-center">
                <div className="text-2xl font-bold text-success">$94.00</div>
                <div className="text-sm text-success">0.0%</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trades</span>
                  <span className="text-card-foreground">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="text-card-foreground">67%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Best Day</span>
                  <span className="text-success">+$242</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Worst Day</span>
                  <span className="text-destructive">-$198</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar