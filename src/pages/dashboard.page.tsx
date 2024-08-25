import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Plus,
  Send,
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const prevMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  }, [currentMonth]);

  const formattedMonth = useMemo(
    () =>
      currentMonth.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      }),
    [currentMonth],
  );

  return (
    <main className="overflow-y-auto p-4 space-y-6">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$2,500.00</div>
          <p className="text-sm opacity-85">+$250 this month</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20"
        >
          <Send className="h-6 w-6 mb-2" />
          <span className="text-xs">Send</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20"
        >
          <ArrowDownIcon className="h-6 w-6 mb-2" />
          <span className="text-xs">Receive</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20"
        >
          <CreditCard className="h-6 w-6 mb-2" />
          <span className="text-xs">Cards</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-20"
        >
          <Plus className="h-6 w-6 mb-2" />
          <span className="text-xs">Top Up</span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">{formattedMonth}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Grocery Store', amount: -45.5, date: 'Today' },
            { name: 'Salary Deposit', amount: 2500.0, date: 'Yesterday' },
            { name: 'Electric Bill', amount: -75.2, date: '3 days ago' },
            { name: 'Online Shopping', amount: -120.99, date: '1 week ago' },
            { name: 'Grocery Store', amount: -45.5, date: 'Today' },
            { name: 'Salary Deposit', amount: 2500.0, date: 'Yesterday' },
            { name: 'Electric Bill', amount: -75.2, date: '3 days ago' },
            { name: 'Online Shopping', amount: -120.99, date: '1 week ago' },
            { name: 'Grocery Store', amount: -45.5, date: 'Today' },
            { name: 'Salary Deposit', amount: 2500.0, date: 'Yesterday' },
            { name: 'Electric Bill', amount: -75.2, date: '3 days ago' },
            { name: 'Online Shopping', amount: -120.99, date: '1 week ago' },
            { name: 'Grocery Store', amount: -45.5, date: 'Today' },
            { name: 'Salary Deposit', amount: 2500.0, date: 'Yesterday' },
            { name: 'Electric Bill', amount: -75.2, date: '3 days ago' },
            { name: 'Online Shopping', amount: -120.99, date: '1 week ago' },
            { name: 'Grocery Store', amount: -45.5, date: 'Today' },
            { name: 'Salary Deposit', amount: 2500.0, date: 'Yesterday' },
            { name: 'Electric Bill', amount: -75.2, date: '3 days ago' },
            { name: 'Online Shopping', amount: -120.99, date: '1 week ago' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  {transaction.amount > 0 ? (
                    <ArrowDownIcon className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {transaction.amount > 0 ? '+' : ''}
                {transaction.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
