
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Mail, Calendar, CheckSquare } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import TaskManager from './TaskManager';

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
              Task Manager
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.user_metadata?.full_name || user.email}!</p>
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

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
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
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-gray-600">
                Account verified and ready
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-blue-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Ready</div>
              <p className="text-xs text-gray-600">
                Manage your tasks below
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-purple-600" />
              Your Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskManager user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
