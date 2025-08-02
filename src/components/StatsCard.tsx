import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  positive?: boolean
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({ title, value, change, positive, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("bg-gradient-card shadow-card border-border/50 hover:shadow-primary/20 hover:border-primary/30 group transition-all duration-500 animate-float", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1 font-tech">{title}</p>
            <p className="text-2xl font-bold text-card-foreground font-cyber text-glow-primary transition-all duration-300 group-hover:text-glow-accent">{value}</p>
            {change && (
              <p className={cn(
                "text-sm font-medium font-tech transition-all duration-300",
                positive ? "text-success text-glow-accent" : "text-destructive text-glow-pink"
              )}>
                {change}
              </p>
            )}
          </div>
          {icon && (
            <div className={cn(
              "transition-all duration-300 group-hover:scale-110",
              positive ? "text-success" : change ? "text-destructive" : "text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}