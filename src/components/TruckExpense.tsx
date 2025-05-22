import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Truck, Calendar as CalendarIcon, Save, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TruckExpenseProps {
  showFinancials: boolean;
}

interface TruckExpenseEntry {
  id: string;
  date: Date;
  truckLabor: number;
  driverCut: number;
  maintenance: number;
  fuel: number;
  other: number;
  description: string;
  totalExpense: number;
}

const TruckExpense = ({ showFinancials }: TruckExpenseProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [truckLabor, setTruckLabor] = useState('');
  const [driverCut, setDriverCut] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [fuel, setFuel] = useState('');
  const [other, setOther] = useState('');
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState<TruckExpenseEntry[]>([]);

  const calculateTotal = () => {
    const labor = parseFloat(truckLabor) || 0;
    const driver = parseFloat(driverCut) || 0;
    const maint = parseFloat(maintenance) || 0;
    const fuelCost = parseFloat(fuel) || 0;
    const otherCost = parseFloat(other) || 0;
    return labor + driver + maint + fuelCost + otherCost;
  };

  const handleSubmit = () => {
    if (!truckLabor && !driverCut && !maintenance && !fuel && !other) {
      alert('Please enter at least one expense amount');
      return;
    }

    const newEntry: TruckExpenseEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      truckLabor: parseFloat(truckLabor) || 0,
      driverCut: parseFloat(driverCut) || 0,
      maintenance: parseFloat(maintenance) || 0,
      fuel: parseFloat(fuel) || 0,
      other: parseFloat(other) || 0,
      description,
      totalExpense: calculateTotal()
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setTruckLabor('');
    setDriverCut('');
    setMaintenance('');
    setFuel('');
    setOther('');
    setDescription('');
    setSelectedDate(new Date());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Truck Expense Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Truck Labor */}
            <div className="space-y-2">
              <Label>Truck Labor (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 5000"
                value={truckLabor}
                onChange={(e) => setTruckLabor(e.target.value)}
              />
            </div>

            {/* Driver Cut */}
            <div className="space-y-2">
              <Label>Driver Cut (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 3000"
                value={driverCut}
                onChange={(e) => setDriverCut(e.target.value)}
              />
            </div>

            {/* Maintenance */}
            <div className="space-y-2">
              <Label>Maintenance (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 2000"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
              />
            </div>

            {/* Fuel */}
            <div className="space-y-2">
              <Label>Fuel (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 4000"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              />
            </div>

            {/* Other Expenses */}
            <div className="space-y-2">
              <Label>Other Expenses (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 1000"
                value={other}
                onChange={(e) => setOther(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label>Description (Optional)</Label>
              <Input
                placeholder="e.g., Daily delivery expenses..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Total Calculation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Truck Expense:</span>
              <span className="text-2xl font-bold text-red-600">
                PKR {showFinancials ? calculateTotal().toLocaleString() : '***'}
              </span>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Truck Expense
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Truck Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Labor</th>
                  <th className="border border-gray-300 p-2 text-left">Driver</th>
                  <th className="border border-gray-300 p-2 text-left">Maintenance</th>
                  <th className="border border-gray-300 p-2 text-left">Fuel</th>
                  <th className="border border-gray-300 p-2 text-left">Other</th>
                  <th className="border border-gray-300 p-2 text-left">Total</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-300 p-2">
                      {format(entry.date, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.truckLabor.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.driverCut.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.maintenance.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.fuel.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.other.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold text-red-600">
                      {showFinancials ? entry.totalExpense.toLocaleString() : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.description || '-'}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="border border-gray-300 p-4 text-center text-gray-500">
                      No truck expenses yet. Add your first truck expense above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckExpense;
