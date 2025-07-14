import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface Trade {
  id: string
  date: string
  session: string
  symbol: string
  side: "LONG" | "SHORT"
  entry: number
  exit: number
  rr: number
  result: "WIN" | "LOSS"
  pnl: number
  notes?: string
}

interface TradingTableProps {
  trades: Trade[]
}

export function TradingTable({ trades }: TradingTableProps) {
  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Session</TableHead>
              <TableHead className="text-muted-foreground">Symbol</TableHead>
              <TableHead className="text-muted-foreground">Side</TableHead>
              <TableHead className="text-muted-foreground">Entry</TableHead>
              <TableHead className="text-muted-foreground">Exit</TableHead>
              <TableHead className="text-muted-foreground">R:R</TableHead>
              <TableHead className="text-muted-foreground">Result</TableHead>
              <TableHead className="text-muted-foreground">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id} className="border-border hover:bg-muted/50">
                <TableCell className="text-card-foreground">{trade.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {trade.session}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-card-foreground">{trade.symbol}</TableCell>
                <TableCell>
                  <Badge 
                    variant={trade.side === "LONG" ? "default" : "secondary"}
                    className={trade.side === "LONG" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}
                  >
                    {trade.side}
                  </Badge>
                </TableCell>
                <TableCell className="text-card-foreground">${trade.entry.toFixed(2)}</TableCell>
                <TableCell className="text-card-foreground">${trade.exit.toFixed(2)}</TableCell>
                <TableCell className="text-card-foreground">1:{trade.rr}</TableCell>
                <TableCell>
                  <Badge 
                    variant={trade.result === "WIN" ? "default" : "destructive"}
                    className={trade.result === "WIN" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}
                  >
                    {trade.result}
                  </Badge>
                </TableCell>
                <TableCell className={cn(
                  "font-semibold",
                  trade.pnl >= 0 ? "text-success" : "text-destructive"
                )}>
                  ${trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}