import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6" data-testid="text-page-title">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Currently enabled by default</p>
              </div>
              <Switch checked={true} disabled data-testid="switch-dark-mode" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Recommendation Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified about new recommendations</p>
              </div>
              <Switch data-testid="switch-recommendations" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Asset Updates</Label>
                <p className="text-sm text-muted-foreground">Receive updates when assets are modified</p>
              </div>
              <Switch data-testid="switch-asset-updates" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Agents</CardTitle>
            <CardDescription>Configure AI agent behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-suggestions</Label>
                <p className="text-sm text-muted-foreground">Show suggested questions for agents</p>
              </div>
              <Switch defaultChecked data-testid="switch-suggestions" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Typing Indicators</Label>
                <p className="text-sm text-muted-foreground">Display typing animation during responses</p>
              </div>
              <Switch defaultChecked data-testid="switch-typing" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
