
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon, Save, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FarmerInventoryProps {
  showFinancials: boolean;
}

interface FarmerEntry {
  id: string;
  date: Date;
  farmerName: string;
  crates: number;
  totalWeight: number;
  ratePerKg: number;
  totalAmount: number;
}

const FarmerInventory = ({ showFinancials }: FarmerInventoryProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [farmerName, setFarmerName] = useState('');
  const [newFarmerName, setNewFarmerName] = useState('');
  const [crates, setCrates] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [ratePerKg, setRatePerKg] = useState('');
  const [entries, setEntries] = useState<FarmerEntry[]>([]);
  const [showAddFarmer, setShowAddFarmer] = useState(false);

  const farmers = ['Ahmed Khan', 'Muhammad Ali', 'Hassan Sheikh', 'Bilal Ahmad'];

  const calculateTotal = () => {
    const weight = parseFloat(totalWeight) || 0;
    const rate = parseFloat(ratePerKg) || 0;
    return weight * rate;
  };

  const handleSubmit = () => {
    if (!farmerName || !crates || !totalWeight || !ratePerKg) {
      alert('Please fill all fields');
      return;
    }

    const newEntry: FarmerEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      farmerName,
      crates: parseInt(crates),
      totalWeight: parseFloat(totalWeight),
      ratePerKg: parseFloat(ratePerKg),
      totalAmount: calculateTotal()
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setFarmerName('');
    setCrates('');
    setTotalWeight('');
    setRatePerKg('');
    setSelectedDate(new Date());
  };

  const handleAddFarmer = () => {
    if (newFarmerName.trim()) {
      farmers.push(newFarmerName.trim());
      setFarmerName(newFarmerName.trim());
      setNewFarmerName('');
      setShowAddFarmer(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Farmer Inventory Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

            {/* Farmer Selection */}
            <div className="space-y-2">
              <Label>Farmer Name</Label>
              <div className="flex gap-2">
                <Select value={farmerName} onValueChange={setFarmerName}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select farmer" />
                  </SelectTrigger>
                  <SelectContent>
                    {farmers.map((farmer) => (
                      <SelectItem key={farmer} value={farmer}>
                        {farmer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setShowAddFarmer(!showAddFarmer)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {showAddFarmer && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="New farmer name"
                    value={newFarmerName}
                    onChange={(e) => setNewFarmerName(e.target.value)}
                  />
                  <Button onClick={handleAddFarmer}>Add</Button>
                </div>
              )}
            </div>

            {/* Crates */}
            <div className="space-y-2">
              <Label>Crates</Label>
              <Input
                type="number"
                placeholder="e.g., 100"
                value={crates}
                onChange={(e) => setCrates(e.target.value)}
              />
            </div>

            {/* Total Weight */}
            <div className="space-y-2">
              <Label>Total Weight (KG)</Label>
              <Input
                type="number"
                placeholder="e.g., 1000"
                value={totalWeight}
                onChange={(e) => setTotalWeight(e.target.value)}
              />
            </div>

            {/* Rate per KG */}
            <div className="space-y-2">
              <Label>Rate per KG (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 500"
                value={ratePerKg}
                onChange={(e) => setRatePerKg(e.target.value)}
              />
            </div>

            {/* Auto-calculated Total */}
            <div className="space-y-2">
              <Label>Total Amount (PKR)</Label>
              <div className="p-3 bg-gray-100 rounded-md text-lg font-bold">
                {showFinancials ? calculateTotal().toLocaleString() : '***'}
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Farmer Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Farmer</th>
                  <th className="border border-gray-300 p-2 text-left">Crates</th>
                  <th className="border border-gray-300 p-2 text-left">Weight (KG)</th>
                  <th className="border border-gray-300 p-2 text-left">Rate/KG</th>
                  <th className="border border-gray-300 p-2 text-left">Total (PKR)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-300 p-2">
                      {format(entry.date, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.farmerName}</td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.crates : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.totalWeight : '***'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {showFinancials ? entry.ratePerKg : '***'}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold">
                      {showFinancials ? entry.totalAmount.toLocaleString() : '***'}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border border-gray-300 p-4 text-center text-gray-500">
                      No entries yet. Add your first farmer entry above.
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

export default FarmerInventory;
