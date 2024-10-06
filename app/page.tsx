"use client";

import MarkdownDisplay from '@/components/MarkdownDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import conventionContent from '@/data/convention.md';
import { AlertCircle, Info, Loader2, Search } from 'lucide-react';
import { useState } from 'react';

// Définissez une interface pour la structure de la convention collective
interface ConventionCollective {
  title: string;
  num: number;
  shortTitle: string;
  synonymes: string[];
}

export default function Home() {
  const [siret, setSiret] = useState('');
  // Modifiez le type de conventionCollective
  const [conventionCollective, setConventionCollective] = useState<ConventionCollective | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [markdownContent] = useState(conventionContent);

  const handleSearch = async () => {
    if (!siret.trim()) {
      setError('Indiquez votre numéro SIRET');
      return;
    }

    setLoading(true);
    setError('');
    setConventionCollective(null);

    try {
      const response = await fetch(`https://siret2idcc.fabrique.social.gouv.fr/api/v2/${siret}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      // Assurez-vous que la convention collective est correctement extraite
      setConventionCollective(data[0].conventions[0] || null);
    } catch (err) {
      console.log(err);
      setError('Une erreur est survenue lors de la récupération des données. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex justify-center">
      {/* Left AdSense column */}
      <div className="hidden lg:block w-1/6 p-4">
        <div className="bg-gray-300 h-full flex items-center justify-center">
          <p className="text-gray-600">AdSense Gauche</p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full lg:w-2/3 p-4 flex flex-col items-center justify-start">
        <Card className="w-full max-w-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Trouver ma convention collective</CardTitle>
            <CardDescription className="text-center">
              Tapez votre numéro SIRET pour trouver votre convention collective
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siret">Numéro SIRET</Label>
                <div className="flex space-x-2">
                  <Input
                    id="siret"
                    type="number "
                    placeholder="Entrez votre numéro SIRET"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                    {loading ? 'Recherche en cours' : 'Rechercher'}
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* AdSense Space 1 */}
        <div className="w-full max-w-2xl h-24 bg-gray-300 my-8 flex items-center justify-center">
          <p className="text-gray-600">Espace AdSense</p>
        </div>

        {conventionCollective && (
          <Card className="w-full max-w-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{conventionCollective.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>IDCC: <strong>{conventionCollective.num}</strong></AlertTitle>
                <AlertDescription>
                  <p>Nom court : <strong>{conventionCollective.shortTitle || 'N/A'}</strong></p>
                  <p>Synonymes : <strong>{conventionCollective.synonymes && conventionCollective.synonymes.length > 0
                    ? conventionCollective.synonymes.map(synonym =>
                        synonym.charAt(0).toUpperCase() + synonym.slice(1)
                      ).join(', ')
                    : 'N/A'}</strong></p>
                  <p className="mt-2">Cette convention collective s&apos;applique aux entreprises du secteur {conventionCollective.title.toLowerCase()}. Elle définit les droits et obligations de l&apos;employeur et du salarié, couvrant des aspects tels que les heures de travail, les congés, la rémunération et d&apos;autres conditions spécifiques de l&apos;emploi dans ce secteur.</p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Display markdown content */}
        {markdownContent && <MarkdownDisplay content={markdownContent} />}

        {/* AdSense Space 2 */}
        <div className="w-full max-w-2xl h-24 bg-gray-300 mt-8 flex items-center justify-center">
          <p className="text-gray-600">Espace AdSense</p>
        </div>
      </div>

      {/* Right AdSense column */}
      <div className="hidden lg:block w-1/6 p-4">
        <div className="bg-gray-300 h-full flex items-center justify-center">
          <p className="text-gray-600">AdSense Droite</p>
        </div>
      </div>
    </div>
  );
}