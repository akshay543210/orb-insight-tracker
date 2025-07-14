import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const LondonSession = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">London ORB Session</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Trade Idea
        </Button>
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
                <span className="text-card-foreground">08:00 - 17:00 GMT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Pairs</span>
                <span className="text-card-foreground">GBP/USD, EUR/GBP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volatility</span>
                <span className="text-card-foreground">High</span>
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
                <span className="text-card-foreground">28</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="text-success">71%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg R:R</span>
                <span className="text-card-foreground">1:2.1</span>
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
              London session provides highest volatility. Best setups during London open 08:00-10:00 GMT.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Trade Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No trade ideas logged yet. Click "New Trade Idea" to get started.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LondonSession