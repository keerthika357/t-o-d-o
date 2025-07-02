
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Mail, Calendar } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface DashboardProps {
  user: SupabaseUser;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { toast } = useToast();

  const handleLogout = async () => {
    console.log('Logging out user:', user.email);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "You have been logged out successfully!",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.user_metadata?.full_name || 'User'}!</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Information</CardTitle>
              <User className="h-4 w-4 text-purple-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-gray-600">
                Your account is verified and active
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
              </div>
              <p className="text-xs text-gray-600">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleTimeString() : 'First login'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have successfully logged in. This is your personalized dashboard where you can manage
              your account and access all the features available to authenticated users.
            </p>
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Getting Started</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your authentication is working perfectly</li>
                <li>• You can now access protected features</li>
                <li>• Your session is managed securely</li>
                <li>• Use the logout button when you're done</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
