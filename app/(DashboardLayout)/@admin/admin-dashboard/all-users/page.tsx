/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import { changeUserRoleAction } from "@/actions/admin.action";
import { User, ShieldCheck, Mail, Fingerprint, ArrowRightLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AllUsersPage() {
  const response = await adminService.getAllUsers();
  const users = response?.data?.data || [];

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case "ADMIN": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "RIDER": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
              User Management Console
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            User <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Matrix</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl">
            Manage user roles and permissions across the platform. Assign ADMIN, RIDER, or USER privileges.
          </p>
        </div>

        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-20 text-center">
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
                  <User className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  No users are registered in the system yet.
                </p>
              </div>
            </div>
          ) : (
            users.map((user: any) => (
              <div 
                key={user.id} 
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    <div className="flex items-start gap-5">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                        <User className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {user.name}
                          </h3>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Fingerprint className="w-3.5 h-3.5" />
                            ID: {user.id.slice(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>

              <form 
  action={async (formData: FormData) => {
    "use server"; 
    await changeUserRoleAction(formData);
  }}
>
  <input type="hidden" name="userId" value={user.id} />
  
  <div className="bg-black/40 p-2 pl-5 rounded-xl border border-white/10">
    <div className="flex items-center gap-3">
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
        Change Role:
      </p>
      
      <select 
        name="role" 
        defaultValue={user.role}
        className="bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-white uppercase outline-none focus:border-blue-500/50 transition-all cursor-pointer"
      >
        <option value="USER">👤 USER</option>
        <option value="RIDER">🏍️ RIDER</option>
        <option value="ADMIN">🛡️ ADMIN</option>
      </select>

      <Button 
        type="submit" 
        size="sm"
        className="h-9 w-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-0 flex items-center justify-center"
      >
        <ArrowRightLeft size={16} />
      </Button>
    </div>
  </div>
</form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}