
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Users, Calendar as CalendarIcon, Save, Eye, UserCheck, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface StaffModuleProps {
  showFinancials: boolean;
}

interface StaffEntry {
  id: string;
  date: Date;
  staffName: string;
  type: 'attendance' | 'advance' | 'salary';
  attendance?: 'present' | 'absent';
  advanceAmount?: number;
  salaryAmount?: number;
  monthlySalary?: number;
  description: string;
}

const StaffModule = ({ showFinancials }: StaffModuleProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [staffName, setStaffName] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [entryType, setEntryType] = useState<'attendance' | 'advance' | 'salary'>('attendance');
  const [attendance, setAttendance] = useState<'present' | 'absent'>('present');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [salaryAmount, setSalaryAmount] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState<StaffEntry[]>([]);
  const [showAddStaff, setShowAddStaff] = useState(false);

  const staff = ['Ali Hassan', 'Usman Malik', 'Asad Khan', 'Bilal Sheikh'];

  const handleSubmit = () => {
    if (!staffName) {
      alert('Please select staff member');
      return;
    }

    if (entryType === 'advance' && !advanceAmount) {
      alert('Please enter advance amount');
      return;
    }

    if (entryType === 'salary' && (!salaryAmount || !monthlySalary)) {
      alert('Please enter salary amount and monthly salary');
      return;
    }

    const newEntry: StaffEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      staffName,
      type: entryType,
      attendance: entryType === 'attendance' ? attendance : undefined,
      advanceAmount: entryType === 'advance' ? parseFloat(advanceAmount) : undefined,
      salaryAmount: entryType === 'salary' ? parseFloat(salaryAmount) : undefined,
      monthlySalary: entryType === 'salary' ? parseFloat(monthlySalary) : undefined,
      description
    };

    setEntries([...entries, newEntry]);
    
    // Reset form
    setStaffName('');
    setAdvanceAmount('');
    setSalaryAmount('');
    setMonthlySalary('');
    setDescription('');
    setSelectedDate(new Date());
  };

  const handleAddStaff = () => {
    if (newStaffName.trim()) {
      staff.push(newStaffName.trim());
      setStaffName(newStaffName.trim());
      setNewStaffName('');
      setShowAddStaff(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff Management Entry
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

            {/* Staff Selection */}
            <div className="space-y-2">
              <Label>Staff Member</Label>
              <div className="flex gap-2">
                <Select value={staffName} onValueChange={setStaffName}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setShowAddStaff(!showAddStaff)}
                >
                  <Users className="h-4 w-4" />
                </Button>
              </div>
              {showAddStaff && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="New staff member name"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                  />
                  <Button onClick={handleAddStaff}>Add</Button>
                </div>
              )}
            </div>

            {/* Entry Type */}
            <div className="space-y-2">
              <Label>Entry Type</Label>
              <Select value={entryType} onValueChange={(value: 'attendance' | 'advance' | 'salary') => setEntryType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="advance">Advance Salary</SelectItem>
                  <SelectItem value="salary">Monthly Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Entry Type Specific Fields */}
          {entryType === 'attendance' && (
            <div className="space-y-4">
              <Label>Attendance Status</Label>
              <RadioGroup value={attendance} onValueChange={(value: 'present' | 'absent') => setAttendance(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="present" id="present" />
                  <Label htmlFor="present" className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    Present
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absent" id="absent" />
                  <Label htmlFor="absent" className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-red-500" />
                    Absent
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {entryType === 'advance' && (
            <div className="space-y-2">
              <Label>Advance Amount (PKR)</Label>
              <Input
                type="number"
                placeholder="e.g., 5000"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
              />
            </div>
          )}

          {entryType === 'salary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Salary Amount Paid (PKR)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 15000"
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Monthly Salary (PKR)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 20000"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <Input
              placeholder="e.g., Late arrival, extra hours, etc..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Staff Entry
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Staff Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Staff</th>
                  <th className="border border-gray-300 p-2 text-left">Type</th>
                  <th className="border border-gray-300 p-2 text-left">Details</th>
                  <th className="border border-gray-300 p-2 text-left">Amount</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border border-gray-300 p-2">
                      {format(entry.date, "dd/MM/yyyy")}
                    </td>
                    <td className="border border-gray-300 p-2">{entry.staffName}</td>
                    <td className="border border-gray-300 p-2 capitalize">{entry.type}</td>
                    <td className="border border-gray-300 p-2">
                      {entry.type === 'attendance' && (
                        <span className={`flex items-center gap-1 ${entry.attendance === 'present' ? 'text-green-600' : 'text-red-600'}`}>
                          {entry.attendance === 'present' ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
                          {entry.attendance}
                        </span>
                      )}
                      {entry.type === 'salary' && entry.monthlySalary && (
                        <span className="text-sm">Monthly: {showFinancials ? entry.monthlySalary.toLocaleString() : '***'}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold">
                      {entry.advanceAmount && (
                        <span className="text-red-600">
                          {showFinancials ? entry.advanceAmount.toLocaleString() : '***'}
                        </span>
                      )}
                      {entry.salaryAmount && (
                        <span className="text-green-600">
                          {showFinancials ? entry.salaryAmount.toLocaleString() : '***'}
                        </span>
                      )}
                      {entry.type === 'attendance' && '-'}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.description || '-'}
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border border-gray-300 p-4 text-center text-gray-500">
                      No staff entries yet. Add your first staff entry above.
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

export default StaffModule;
