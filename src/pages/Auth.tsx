import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'react-router-dom';
import { lovable } from '@/integrations/lovable/index';
import logoOption3 from '@/assets/logo-option-3.png';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== '/signup');
  const [showReset, setShowReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmedAge, setConfirmedAge] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();

  const canSignUp = agreedToTerms && confirmedAge;

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result?.error) {
      toast({ title: 'Error', description: (result.error as Error).message, variant: 'destructive' });
    }
    setGoogleLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (showReset) {
      const { error } = await resetPassword(email);
      setLoading(false);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Check your email', description: 'We sent you a password reset link.' });
        setShowReset(false);
      }
      return;
    }

    const { error } = isLogin ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else if (!isLogin) {
      toast({ title: 'Check your email', description: 'We sent you a confirmation link to verify your account.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-5xl mb-2">🥦</div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Happy Little Bites
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {showReset
              ? 'Enter your email to reset your password'
              : isLogin
                ? 'Welcome back! Sign in to your account'
                : 'Start your free month — no credit card needed'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showReset && (
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full py-5 text-sm font-medium"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? '...' : (
                  <>
                    <GoogleIcon className="mr-2" />
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3 my-5">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
                <Separator className="flex-1" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {!showReset && (
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            )}

            {!isLogin && !showReset && (
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="age"
                    checked={confirmedAge}
                    onCheckedChange={(checked) => setConfirmedAge(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="age" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                    I confirm I am 18 years of age or older
                  </label>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading || (!isLogin && !showReset && !canSignUp)}>
              {loading
                ? '...'
                : showReset
                  ? 'Send Reset Link'
                  : isLogin
                    ? 'Sign In'
                    : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            {!showReset && (
              <button
                onClick={() => setShowReset(true)}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Forgot password?
              </button>
            )}
            <div>
              <button
                onClick={() => { setShowReset(false); setIsLogin(!isLogin); setAgreedToTerms(false); setConfirmedAge(false); }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                {showReset
                  ? 'Back to sign in'
                  : isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
