import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      
      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Settings Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Settings configuration coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings