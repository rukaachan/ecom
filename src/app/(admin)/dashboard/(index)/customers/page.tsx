import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <div className="px-4 py-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage customer accounts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customers Overview</CardTitle>
          <CardDescription>View and manage customer accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Customer management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
