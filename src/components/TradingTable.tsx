import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Edit, Trash2, Share, Image } from 'lucide-react'

interface FormattedTrade {
  id: string
  date: string
  symbol: string
  side: "LONG" | "SHORT"
  entry_price: number
  exit_price: number
  quantity: number
  setup_tag: string
  rr: number
  result: "Win" | "Loss" | "Breakeven"
  pnl_dollar: number
  notes?: string
  image_url?: string
  commission: number
}

interface TradingTableProps {
  trades: FormattedTrade[]
}

export function TradingTable({ trades }: TradingTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Trading History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/50">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Symbol</TableHead>
                <TableHead className="text-muted-foreground">Side</TableHead>
                <TableHead className="text-muted-foreground">Entry</TableHead>
                <TableHead className="text-muted-foreground">Exit</TableHead>
                <TableHead className="text-muted-foreground">Setup Tag</TableHead>
                <TableHead className="text-muted-foreground">Qty</TableHead>
                <TableHead className="text-muted-foreground">R:R</TableHead>
                <TableHead className="text-muted-foreground">Result</TableHead>
                <TableHead className="text-muted-foreground">P&L</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade, index) => (
                <motion.tr
                  key={trade.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="border-border hover:bg-muted/50 group"
                >
                  <TableCell className="text-foreground">{trade.date}</TableCell>
                  <TableCell className="font-mono text-foreground font-medium">{trade.symbol}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={trade.side === "LONG" ? "default" : "secondary"}
                      className={`${
                        trade.side === "LONG" 
                          ? "bg-success text-success-foreground" 
                          : "bg-destructive text-destructive-foreground"
                      } transition-colors`}
                    >
                      {trade.side}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground font-mono">
                    {trade.entry_price.toFixed(5)}
                  </TableCell>
                  <TableCell className="text-foreground font-mono">
                    {trade.exit_price.toFixed(5)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {trade.setup_tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{trade.quantity}</TableCell>
                  <TableCell className="text-foreground">
                    {trade.rr ? `1:${trade.rr}` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        trade.result === "Win" ? "default" : 
                        trade.result === "Loss" ? "destructive" : "secondary"
                      }
                      className={`${
                        trade.result === "Win" 
                          ? "bg-success text-success-foreground" 
                          : trade.result === "Loss"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      } transition-colors`}
                    >
                      {trade.result}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(
                    "font-semibold font-mono",
                    trade.pnl_dollar >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {trade.pnl_dollar > 0 ? '+' : ''}${trade.pnl_dollar.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share className="h-3 w-3" />
                        </Button>
                      </motion.div>
                      {trade.image_url && (
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Image className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {trades.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No trades found for the selected time period.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}