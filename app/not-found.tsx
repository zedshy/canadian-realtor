import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-200">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-slate-600 mb-8">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the
            URL or the page has been moved.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/properties">
              <Search className="mr-2 w-5 h-5" />
              Browse Properties
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

