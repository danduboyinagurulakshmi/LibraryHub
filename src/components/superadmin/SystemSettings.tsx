import { useState } from "react";
import { useLibrary } from "@/context/LibraryContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save } from "lucide-react";
import { toast } from "sonner";

const SystemSettings = () => {
  const { settings, updateSettings } = useLibrary();
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    updateSettings(form);
    toast.success("Settings saved successfully");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-secondary" />
            Library Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <Label>Library Name</Label>
            <Input value={form.libraryName} onChange={(e) => setForm({ ...form, libraryName: e.target.value })} className="mt-1 bg-card" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Max Books Per User</Label>
              <Input type="number" min={1} max={10} value={form.maxBooksPerUser} onChange={(e) => setForm({ ...form, maxBooksPerUser: Number(e.target.value) })} className="mt-1 bg-card" />
            </div>
            <div>
              <Label>Loan Period (Days)</Label>
              <Input type="number" min={1} max={90} value={form.loanPeriodDays} onChange={(e) => setForm({ ...form, loanPeriodDays: Number(e.target.value) })} className="mt-1 bg-card" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fine Per Day (₹)</Label>
              <Input type="number" min={0} value={form.finePerDay} onChange={(e) => setForm({ ...form, finePerDay: Number(e.target.value) })} className="mt-1 bg-card" />
            </div>
            <div>
              <Label>Operating Hours</Label>
              <Input value={form.operatingHours} onChange={(e) => setForm({ ...form, operatingHours: e.target.value })} className="mt-1 bg-card" />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
