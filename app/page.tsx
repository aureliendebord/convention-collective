"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertCircle, Info } from 'lucide-react';

export default function Home() {
  const [siret, setSiret] = useState('');
  const [conventionCollective, setConventionCollective] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!siret.trim()) {
      setError('Please enter a SIRET number');
      return;
    }

    setLoading(true);
    setError('');
    setConventionCollective('');

    try {
      const response = await fetch(`https://siret2idcc.fabrique.social.gouv.fr/api/v2/${siret}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setConventionCollective(data.conventions[0] || null);
    } catch (err) {
      setError('An error occurred while fetching the data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-start p-4">
      <Card className="w-full max-w-2xl mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">SIRET Search</CardTitle>
          <CardDescription className="text-center">
            Find the convention collective for a French company
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siret">SIRET Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="siret"
                  type="text"
                  placeholder="Enter SIRET number"
                  value={siret}
                  onChange={(e) => setSiret(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {loading ? 'Searching' : 'Search'}
                </Button>
              </div>
            </div>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* AdSense Space 1 */}
      <div className="w-full max-w-2xl h-24 bg-gray-300 mb-8 flex items-center justify-center">
        <p className="text-gray-600">AdSense Space</p>
      </div>

      {conventionCollective && (
        <Card className="w-full max-w-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Convention Collective Found</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>{conventionCollective.name}</AlertTitle>
              <AlertDescription>
                <p><strong>IDCC:</strong> {conventionCollective.idcc}</p>
                <p><strong>Short Name:</strong> {conventionCollective.shortName || 'N/A'}</p>
                <p className="mt-2">This convention collective applies to companies in the {conventionCollective.name.toLowerCase()} sector. It outlines the rights and obligations of both employers and employees, covering aspects such as working hours, leave, remuneration, and other specific conditions of employment in this industry.</p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* AdSense Space 2 */}
      <div className="w-full max-w-2xl h-24 bg-gray-300 mb-8 flex items-center justify-center">
        <p className="text-gray-600">AdSense Space</p>
      </div>
    </div>
  );
}